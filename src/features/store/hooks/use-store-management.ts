import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import {
  acceptStoreInvitation,
  fetchMyStore,
  inviteStoreMember,
  setMyStoreImage,
  requestMyStoreActivation,
  storeManageQueryKeys,
  updateStoreMemberPublishPermission,
  updateMyStorePolicy,
  updateMyStoreProfile,
} from "../queries/store-manage-queries"

export function useStoreManagement() {
  const t = useTranslations("Account.store")
  const queryClient = useQueryClient()

  const [profileForm, setProfileForm] = React.useState({
    name: "",
    tagline: "",
    description: "",
    location: "",
    responseTime: "",
  })

  const [policyForm, setPolicyForm] = React.useState({
    shippingPolicy: "",
    returnPolicy: "",
    warrantyPolicy: "",
  })

  const [inviteForm, setInviteForm] = React.useState({
    userId: "",
    role: 1 as 1 | 2,
    canPublishProductDirectly: false,
  })

  const [avatarForm, setAvatarForm] = React.useState({
    blobName: "",
    containerName: "",
    fileName: "",
    contentType: "",
    size: 0,
    altText: "",
    url: "",
  })

  const [coverForm, setCoverForm] = React.useState({
    blobName: "",
    containerName: "",
    fileName: "",
    contentType: "",
    size: 0,
    altText: "",
    url: "",
  })

  const [acceptInviteStoreId, setAcceptInviteStoreId] = React.useState("")

  const [publishPermissionForm, setPublishPermissionForm] = React.useState({
    userId: "",
    canPublishProductDirectly: false,
  })

  const { data: myStore, isLoading, isFetching } = useQuery({
    queryKey: storeManageQueryKeys.me,
    queryFn: fetchMyStore,
    staleTime: 60 * 1000,
  })

  React.useEffect(() => {
    if (!myStore) return

    const timer = window.setTimeout(() => {
      setProfileForm({
        name: myStore.profile.name || "",
        tagline: myStore.profile.tagline || "",
        description: myStore.profile.description || "",
        location: myStore.profile.location || "",
        responseTime: myStore.profile.responseTime || "",
      })

      setPolicyForm({
        shippingPolicy: myStore.policy?.shippingPolicy || "",
        returnPolicy: myStore.policy?.returnPolicy || "",
        warrantyPolicy: myStore.policy?.warrantyPolicy || "",
      })

      setAvatarForm((current) => ({
        ...current,
        url: myStore.profile.avatar?.url || "",
        altText: myStore.profile.name ? `${myStore.profile.name} avatar` : "",
      }))

      setCoverForm((current) => ({
        ...current,
        url: myStore.profile.cover?.url || "",
        altText: myStore.profile.name ? `${myStore.profile.name} cover` : "",
      }))
    }, 0)

    return () => window.clearTimeout(timer)
  }, [myStore])

  const refreshStore = async () => {
    await queryClient.invalidateQueries({ queryKey: storeManageQueryKeys.me })
  }

  const updateProfileMutation = useMutation({
    mutationFn: updateMyStoreProfile,
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(t("profileSaved"))
        await refreshStore()
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const updatePolicyMutation = useMutation({
    mutationFn: updateMyStorePolicy,
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(t("policySaved"))
        await refreshStore()
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const requestActivationMutation = useMutation({
    mutationFn: requestMyStoreActivation,
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(t("activationRequested"))
        await refreshStore()
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const inviteMemberMutation = useMutation({
    mutationFn: ({ storeId, payload }: { storeId: string; payload: typeof inviteForm }) => inviteStoreMember(storeId, payload),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(t("inviteSent"))
        setInviteForm({
          userId: "",
          role: 1,
          canPublishProductDirectly: false,
        })
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const setAvatarMutation = useMutation({
    mutationFn: (payload: typeof avatarForm) => setMyStoreImage("avatar", payload),
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(t("avatarSaved"))
        await refreshStore()
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const setCoverMutation = useMutation({
    mutationFn: (payload: typeof coverForm) => setMyStoreImage("cover", payload),
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(t("coverSaved"))
        await refreshStore()
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const acceptInviteMutation = useMutation({
    mutationFn: acceptStoreInvitation,
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(t("inviteAccepted"))
        await refreshStore()
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const publishPermissionMutation = useMutation({
    mutationFn: ({ userId, canPublishProductDirectly }: typeof publishPermissionForm) =>
      updateStoreMemberPublishPermission(userId, { canPublishProductDirectly }),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(t("publishPermissionSaved"))
        setPublishPermissionForm({
          userId: "",
          canPublishProductDirectly: false,
        })
      } else {
        toast.error(result.message || t("requestFailed"))
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || t("requestFailed"))
    },
  })

  const storeStatus = myStore?.profile.status || ""
  const normalizedStatus = storeStatus.toLowerCase()
  const isActiveStore = normalizedStatus === "active"

  return {
    myStore,
    hasStore: Boolean(myStore),
    isLoading,
    isFetching,
    profileForm,
    setProfileForm,
    policyForm,
    setPolicyForm,
    inviteForm,
    setInviteForm,
    avatarForm,
    setAvatarForm,
    coverForm,
    setCoverForm,
    acceptInviteStoreId,
    setAcceptInviteStoreId,
    publishPermissionForm,
    setPublishPermissionForm,
    saveProfile: () => updateProfileMutation.mutate(profileForm),
    savePolicy: () => updatePolicyMutation.mutate(policyForm),
    requestActivation: () => {
      if (myStore?.profile.id) {
        requestActivationMutation.mutate(myStore.profile.id)
      }
    },
    isSavingProfile: updateProfileMutation.isPending,
    isSavingPolicy: updatePolicyMutation.isPending,
    isRequestingActivation: requestActivationMutation.isPending,
    inviteMember: () => {
      if (myStore?.profile.id) {
        inviteMemberMutation.mutate({
          storeId: myStore.profile.id,
          payload: inviteForm,
        })
      }
    },
    isInvitingMember: inviteMemberMutation.isPending,
    saveAvatar: () => setAvatarMutation.mutate(avatarForm),
    saveCover: () => setCoverMutation.mutate(coverForm),
    isSavingAvatar: setAvatarMutation.isPending,
    isSavingCover: setCoverMutation.isPending,
    acceptInvitation: () => {
      if (acceptInviteStoreId.trim()) {
        acceptInviteMutation.mutate(acceptInviteStoreId.trim())
      }
    },
    isAcceptingInvitation: acceptInviteMutation.isPending,
    savePublishPermission: () => {
      if (publishPermissionForm.userId.trim()) {
        publishPermissionMutation.mutate({
          userId: publishPermissionForm.userId.trim(),
          canPublishProductDirectly: publishPermissionForm.canPublishProductDirectly,
        })
      }
    },
    isSavingPublishPermission: publishPermissionMutation.isPending,
    normalizedStatus,
    isActiveStore,
    canRequestActivation: Boolean(
      myStore?.profile.id &&
      normalizedStatus !== "active" &&
      normalizedStatus !== "pendingactive"
    ),
    isPolicyLocked: normalizedStatus === "active",
  }
}
