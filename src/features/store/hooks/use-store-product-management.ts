import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import {
  approveManagedProductByOwner,
  createManagedProduct,
  deleteManagedProduct,
  fetchMyPendingProducts,
  fetchOwnerReviewProducts,
  fetchProductCategoryOptions,
  storeProductManageQueryKeys,
  updateManagedProduct,
} from "../queries/store-product-manage-queries"
import type { CatalogProductResponse } from "@/shared/lib/storefront-normalizers"

function createEmptyProductForm() {
  return {
    id: "",
    title: "",
    author: "",
    price: "",
    categoryId: "",
    stock: "0",
  }
}

export function useStoreProductManagement(defaultAuthor?: string, enabled = false) {
  const t = useTranslations("Account.store.products")
  const queryClient = useQueryClient()

  const [productForm, setProductForm] = React.useState(createEmptyProductForm)
  const [editingProductId, setEditingProductId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!editingProductId && defaultAuthor && !productForm.author) {
      const timer = window.setTimeout(() => {
        setProductForm((current) => ({
          ...current,
          author: defaultAuthor,
        }))
      }, 0)

      return () => window.clearTimeout(timer)
    }
  }, [defaultAuthor, editingProductId, productForm.author])

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: storeProductManageQueryKeys.categories,
    queryFn: fetchProductCategoryOptions,
    staleTime: 10 * 60 * 1000,
    enabled,
    retry: false,
  })

  const { data: myPendingProducts = [], isLoading: isLoadingMyPending } = useQuery({
    queryKey: storeProductManageQueryKeys.myPending,
    queryFn: fetchMyPendingProducts,
    staleTime: 60 * 1000,
    enabled,
    retry: false,
  })

  const { data: ownerReviewProducts = [], isLoading: isLoadingOwnerReview } = useQuery({
    queryKey: storeProductManageQueryKeys.ownerReview,
    queryFn: fetchOwnerReviewProducts,
    staleTime: 60 * 1000,
    enabled,
    retry: false,
  })

  const refreshProducts = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: storeProductManageQueryKeys.myPending }),
      queryClient.invalidateQueries({ queryKey: storeProductManageQueryKeys.ownerReview }),
    ])
  }

  const resetProductForm = React.useCallback(() => {
    setEditingProductId(null)
    setProductForm({
      ...createEmptyProductForm(),
      author: defaultAuthor || "",
    })
  }, [defaultAuthor])

  const createProductMutation = useMutation({
    mutationFn: createManagedProduct,
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(t("created"))
        resetProductForm()
        await refreshProducts()
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const updateProductMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ReturnType<typeof buildProductPayload> }) =>
      updateManagedProduct(id, payload),
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(t("updated"))
        resetProductForm()
        await refreshProducts()
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const deleteProductMutation = useMutation({
    mutationFn: deleteManagedProduct,
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(t("deleted"))
        if (editingProductId) {
          resetProductForm()
        }
        await refreshProducts()
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const approveProductMutation = useMutation({
    mutationFn: approveManagedProductByOwner,
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(t("approved"))
        await refreshProducts()
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  function buildProductPayload() {
    return {
      title: productForm.title.trim(),
      author: productForm.author.trim(),
      price: Number(productForm.price),
      categoryId: productForm.categoryId,
      stock: Number(productForm.stock),
    }
  }

  function startEditingProduct(product: CatalogProductResponse) {
    setEditingProductId(product.id)
    const matchedCategory = categories.find((category) => category.name === product.categoryName)

    setProductForm({
      id: product.id,
      title: product.title,
      author: product.author,
      price: String(product.price),
      categoryId: matchedCategory?.id || "",
      stock: String(product.stock),
    })
  }

  return {
    categories,
    isLoadingCategories,
    myPendingProducts,
    ownerReviewProducts,
    isLoadingMyPending,
    isLoadingOwnerReview,
    productForm,
    setProductForm,
    editingProductId,
    resetProductForm,
    saveProduct: () => {
      const payload = buildProductPayload()
      if (editingProductId) {
        updateProductMutation.mutate({
          id: editingProductId,
          payload,
        })
        return
      }
      createProductMutation.mutate(payload)
    },
    isSavingProduct: createProductMutation.isPending || updateProductMutation.isPending,
    deleteProduct: (productId: string) => deleteProductMutation.mutate(productId),
    isDeletingProduct: deleteProductMutation.isPending,
    approveProduct: (productId: string) => approveProductMutation.mutate(productId),
    isApprovingProduct: approveProductMutation.isPending,
    startEditingProduct,
  }
}
