"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Star,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
  MapPin,
  MessageCircle,
} from "lucide-react"
import { Link } from "@/i18n/navigation"
import { ProductCard } from "@/features/store/components/product/product-card"
import { Button } from "@/features/store/components/ui/button"
import { useCart } from "@/features/store/context/CartContext"
import { useWishlist } from "@/features/store/context/WishlistContext"
import { toast } from "@/features/store/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/store/components/ui/tabs"
import { Calendar } from "@/features/store/components/ui/calendar"
import { RatingStars } from "@/features/store/components/ui/rating-stars"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/features/store/components/ui/chart"
import { featuredProducts, trendingProducts, newArrivals } from "@/features/store/lib/data"
import { cn } from "@/features/store/lib/utils"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const reviews = [
  {
    id: 1,
    author: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    date: "2 tuần trước",
    title: "Tuyệt đối hoàn mỹ!",
    content:
      "Chất lượng của chiếc túi này vượt quá mong đợi của tôi. Da mềm như bơ và tay nghề thủ công thật hoàn hảo. Đáng từng xu!",
    helpful: 24,
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop"],
  },
  {
    id: 2,
    author: "Michael R.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    date: "1 tháng trước",
    title: "Hoàn hảo cho nhu cầu hàng ngày",
    content:
      "Tôi mua chiếc túi này tặng vợ và cô ấy cực kỳ thích. Túi đủ rộng để đựng mọi thứ cần thiết và trông rất sang trọng.",
    helpful: 18,
  },
  {
    id: 3,
    author: "Emma L.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4,
    date: "1 tháng trước",
    title: "Chất lượng tuyệt vời, hơi nhỏ hơn mong đợi",
    content:
      "Túi đẹp với tay nghề thủ công xuất sắc. Lý do duy nhất tôi tặng 4 sao là nó nhỏ hơn một chút so với tôi tưởng tượng. Tuy nhiên vẫn rất thích!",
    helpful: 12,
  },
]

const priceHistory = [
  { month: "Th1", price: 399 },
  { month: "Th2", price: 385 },
  { month: "Th3", price: 399 },
  { month: "Th4", price: 350 },
  { month: "Th5", price: 320 },
  { month: "Hiện tại", price: 299 },
]

const priceChartConfig = {
  price: {
    label: "Giá",
    color: "rgb(var(--store-accent-rgb))",
  },
} satisfies ChartConfig

export default function ProductDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const allProducts = [...featuredProducts, ...trendingProducts, ...newArrivals]
  const baseProduct = allProducts.find((item) => item.id === id) || featuredProducts[0]

  const product = {
    ...baseProduct,
    description:
      "Được chế tác từ loại da Ý tốt nhất, chiếc túi tote cao cấp này kết hợp vẻ đẹp sang trọng vượt thời gian với tính năng hiện đại. Hoàn hảo cho những chuyên gia tinh tế, những người coi trọng cả phong cách và chất lượng.",
    images:
      baseProduct.images && baseProduct.images.length > 0
        ? [baseProduct.image, ...baseProduct.images]
        : [
            baseProduct.image,
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1000&fit=crop",
          ],
    seller: {
      ...baseProduct.seller,
      slug: baseProduct.seller.name.toLowerCase().replace(/\s+/g, "-"),
      avatar: baseProduct.seller.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rating: baseProduct.seller.rating || 4.9,
      productCount: baseProduct.seller.productCount || 156,
      location: baseProduct.seller.location || "Milan, Ý",
      responseTime: "Thường phản hồi trong vòng 2 giờ",
    },
    variants: {
      colors: [
        { name: "Đen", value: "#1a1a1a" },
        { name: "Nâu", value: "#8B4513" },
        { name: "Vàng đồng", value: "#D2B48C" },
        { name: "Xanh Navy", value: "#000080" },
      ],
      sizes: ["Nhỏ", "Vừa", "Lớn"],
    },
    features: [
      "100% Da Ý cao cấp",
      "Chi tiết khâu tay tỉ mỉ",
      'Ngăn đựng laptop (vừa 15")',
      "Nhiều ngăn tiện dụng",
      "Phụ kiện kim loại mạ vàng",
      "Quai đeo vai tháo rời",
    ],
    stock: 12,
    category:
      baseProduct.category === "fashion"
        ? "Túi xách"
        : baseProduct.category === "home"
          ? "Trang trí"
          : baseProduct.category === "electronics"
            ? "Điện tử"
            : "Phụ kiện",
  }

  const careInstructions = {
    fashion: "Để duy trì vẻ đẹp cho sản phẩm da, hãy bảo quản trong túi chống bụi khi không sử dụng. Làm sạch bằng vải mềm và khô. Tránh tiếp xúc với nước và ánh nắng trực tiếp quá lâu.",
    home: "Vệ sinh nhẹ nhàng bằng khăn ẩm hoặc máy hút bụi cầm tay. Tránh sử dụng hóa chất tẩy rửa mạnh để bảo vệ bề mặt và màu sắc sản phẩm.",
    electronics: "Bảo quản nơi khô ráo, thoáng mát. Sử dụng bộ vệ sinh chuyên dụng cho thiết bị điện tử. Tránh va đập mạnh và tiếp xúc với chất lỏng.",
    accessories: "Bảo quản trong hộp trang sức hoặc túi mềm để tránh trầy xước. Tránh tiếp xúc với nước hoa, mỹ phẩm và hóa chất để giữ độ sáng bóng.",
  }

  const currentCare = careInstructions[baseProduct.category as keyof typeof careInstructions] || careInstructions.fashion

  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes[1])
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Date | undefined>(() => {
    const defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() + 4)
    return defaultDate
  })
  const { addToCart, setIsOpen: setIsCartOpen } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(Number(product.id))

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleAddToCart = () => {
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor.name,
      size: selectedSize,
      quantity,
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    setIsCartOpen(true)
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(Number(product.id))
      return
    }

    addToWishlist({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: product.images[0],
      rating: product.rating,
      reviews: product.reviewCount,
      category: baseProduct.category,
    })
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/store/product/${product.id}`

    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: "Đã sao chép liên kết",
        description: "Liên kết sản phẩm đã được sao chép vào bộ nhớ tạm.",
      })
    } catch {
      toast({
        title: "Chưa thể sao chép",
        description: "Trình duyệt hiện không cho phép sao chép liên kết.",
      })
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgb(var(--store-accent-rgb)/0.12),transparent_42%),radial-gradient(circle_at_20%_30%,rgb(var(--store-border-rgb)/0.18),transparent_30%),linear-gradient(180deg,rgb(var(--store-surface-strong-rgb)/0.88)_0%,rgb(var(--store-surface-rgb)/0.96)_45%,rgb(241_244_246)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-32" />
      </div>

      <div className="relative pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <Link href="/store/home" className="hover:text-foreground">
                  Trang chủ
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/store/marketplace" className="hover:text-foreground">
                  Cửa hàng
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/store/marketplace?category=${baseProduct.category}`} className="hover:text-foreground">
                  {product.category}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{product.name}</li>
            </ol>
          </motion.nav>

          <div className="grid gap-8 lg:grid-cols-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="store-surface-panel relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[currentImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={prevImage}
                  className="store-icon-button absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="store-icon-button absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {discount > 0 && (
                  <div className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-sm font-semibold text-white">
                    -{discount}%
                  </div>
                )}

                <div className="store-surface-panel absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-sm text-foreground">
                  {currentImage + 1} / {product.images.length}
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={cn(
                      "store-surface-soft relative h-20 w-20 shrink-0 overflow-hidden rounded-xl transition-all",
                      currentImage === index
                        ? "shadow-[0_0_0_2px_rgb(var(--store-accent-rgb)/0.45)]"
                        : "hover:bg-[rgb(var(--store-accent-rgb)/0.08)]"
                    )}
                  >
                    <Image src={image} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start"
            >
              <Link
                href={`/store/seller/${product.seller.slug}`}
                className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                  <Image src={product.seller.avatar} alt={product.seller.name} fill className="object-cover" />
                </div>
                {product.seller.name}
                {product.seller.verified && (
                    <span className="store-accent-soft rounded-full px-2 py-0.5 text-xs font-medium">
                    Đã xác minh
                  </span>
                )}
              </Link>

              <h1 className="mb-4 font-serif text-3xl font-semibold sm:text-4xl">{product.name}</h1>

              <div className="mb-6 flex items-center gap-3">
                <RatingStars rating={product.rating} size="lg" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} đánh giá)</span>
              </div>

              <div className="mb-6 flex items-center gap-4">
                <span className="text-3xl font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                    Tiết kiệm ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <p className="mb-8 leading-relaxed text-muted-foreground">{product.description}</p>

              <div className="mb-6">
                <p className="mb-3 text-sm font-medium">
                  Màu sắc: <span className="text-muted-foreground">{selectedColor.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "relative h-10 w-10 rounded-full transition-all",
                        selectedColor.name === color.name ? "scale-110 shadow-[0_0_0_2px_rgb(var(--store-accent-rgb)/0.45)]" : "hover:scale-105"
                      )}
                      style={{ backgroundColor: color.value }}
                    >
                      {selectedColor.name === color.name && (
                        <Check
                          className={cn(
                            "absolute inset-0 m-auto h-5 w-5",
                            color.value === "#1a1a1a" || color.value === "#000080" ? "text-[var(--color-primary-foreground)]" : "text-[var(--color-charcoal)]"
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="mb-3 text-sm font-medium">Kích thước</p>
                <div className="flex gap-3">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "rounded-xl px-6 py-3 text-sm font-medium transition-all",
                        selectedSize === size
                          ? "store-accent-soft store-accent-text shadow-[inset_0_0_0_1px_rgb(var(--store-accent-rgb)/0.14)]"
                          : "store-surface-soft text-foreground hover:bg-[rgb(var(--store-accent-rgb)/0.08)]"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="mb-3 text-sm font-medium">Số lượng</p>
                <div className="flex items-center gap-4">
                  <div className="store-surface-soft flex items-center rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 transition-colors hover:bg-muted"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-3 transition-colors hover:bg-muted"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">Còn {product.stock} sản phẩm</span>
                </div>
              </div>

              <div className="mb-8 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] gap-3">
                <Button
                  size="lg"
                  className="store-accent-button store-accent-button-strong h-14 w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Thêm vào giỏ
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 w-full"
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-14 w-14"
                  onClick={handleWishlistToggle}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-destructive text-destructive")} />
                </Button>
                <Button size="icon" variant="outline" className="h-14 w-14" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="store-surface-panel grid grid-cols-3 gap-4 rounded-2xl p-4">
                <div className="flex flex-col items-center text-center">
                  <Truck className="store-accent-text mb-2 h-5 w-5" />
                  <span className="text-xs font-medium">Giao hàng miễn phí</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="store-accent-text mb-2 h-5 w-5" />
                  <span className="text-xs font-medium">Thanh toán an toàn</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw className="store-accent-text mb-2 h-5 w-5" />
                  <span className="text-xs font-medium">Đổi trả 30 ngày</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="store-surface-panel mt-16 overflow-hidden rounded-[28px] p-6 shadow-[0_20px_48px_rgb(15_23_42/0.1)]"
          >
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image src={product.seller.avatar} alt={product.seller.name} fill className="object-cover" />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">{product.seller.name}</h3>
                    {product.seller.verified && (
                        <span className="store-surface-soft store-muted-text rounded-full px-2.5 py-1 text-[11px] font-medium">
                        Nhà bán hàng đã xác minh
                      </span>
                    )}
                  </div>
                  <div className="store-muted-text flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                      {product.seller.rating} điểm
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      {product.seller.productCount} sản phẩm
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {product.seller.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" asChild className="rounded-2xl px-5">
                  <Link href={`/store/seller/${product.seller.slug}`}>Xem gian hàng</Link>
                </Button>
                <Button className="store-accent-button rounded-2xl">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Nhắn tin nhà bán hàng
                </Button>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="features" className="mt-16">
            <TabsList className="store-surface-panel grid h-auto w-full grid-cols-1 gap-2 rounded-[26px] p-2 sm:grid-cols-2 lg:grid-cols-5">
              <TabsTrigger
                value="features"
                className="store-muted-text h-12 w-full rounded-[18px] border-none bg-transparent px-5 data-[state=active]:bg-[rgb(var(--store-accent-rgb)/0.12)] data-[state=active]:text-foreground"
              >
                Tính năng
              </TabsTrigger>
              <TabsTrigger
                value="delivery"
                className="store-muted-text h-12 w-full rounded-[18px] border-none bg-transparent px-5 data-[state=active]:bg-[rgb(var(--store-accent-rgb)/0.12)] data-[state=active]:text-foreground"
              >
                Giao hàng
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="store-muted-text h-12 w-full rounded-[18px] border-none bg-transparent px-5 data-[state=active]:bg-[rgb(var(--store-accent-rgb)/0.12)] data-[state=active]:text-foreground"
              >
                Vận chuyển & Đổi trả
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="store-muted-text h-12 w-full rounded-[18px] border-none bg-transparent px-5 data-[state=active]:bg-[rgb(var(--store-accent-rgb)/0.12)] data-[state=active]:text-foreground"
              >
                Đánh giá ({reviews.length})
              </TabsTrigger>
              <TabsTrigger
                value="pricing"
                className="store-muted-text h-12 w-full rounded-[18px] border-none bg-transparent px-5 data-[state=active]:bg-[rgb(var(--store-accent-rgb)/0.12)] data-[state=active]:text-foreground"
              >
                Biến động giá
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-8">
                  <div>
                  <h3 className="mb-4 text-lg font-semibold">Điểm nổi bật</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="store-accent-text h-5 w-5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Hướng dẫn bảo quản</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {currentCare}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="mt-8">
              <div className="store-surface-panel rounded-[30px] p-6 shadow-[0_18px_44px_rgb(15_23_42/0.1)]">
                <div className="flex flex-col gap-4 pb-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                      <p className="store-muted-text text-[11px] uppercase tracking-[0.18em]">Khung giao dự kiến</p>
                    <h3 className="mt-3 text-2xl font-semibold">
                      {selectedDeliveryDate
                        ? selectedDeliveryDate.toLocaleDateString("vi-VN", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })
                        : "Chọn ngày giao hàng"}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                      Đơn hàng được đóng gói trong vòng 24 giờ và vận chuyển với mã theo dõi cao cấp.
                    </p>
                  </div>
                  <div className="store-muted-text flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <span>Dự kiến nhận: 5-7 ngày</span>
                    <span>Khung ưu tiên: 2-4 ngày</span>
                    <span className="store-accent-text">Ưu tiên vận chuyển</span>
                  </div>
                </div>

                <div className="grid gap-8 pt-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                  <div>
                    <h4 className="mb-2 text-base font-semibold">Lịch giao hàng</h4>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Chọn ngày giao hàng mong muốn. Các khung giờ cao cấp được tự động làm nổi bật.
                    </p>
                    <Calendar
                      mode="single"
                      selected={selectedDeliveryDate}
                      onSelect={setSelectedDeliveryDate}
                      className="mx-auto w-full max-w-[300px] rounded-xl bg-transparent p-0"
                      classNames={{
                        root: "w-full",
                        months: "w-full",
                        month: "w-full flex flex-col gap-4",
                        nav: "relative flex w-full items-center justify-between mb-4",
                        button_previous: "store-surface-soft h-8 w-8 rounded-full flex items-center justify-center hover:bg-[rgb(var(--store-accent-rgb)/0.1)] transition-colors",
                        button_next: "store-surface-soft h-8 w-8 rounded-full flex items-center justify-center hover:bg-[rgb(var(--store-accent-rgb)/0.1)] transition-colors",
                        month_caption: "flex h-8 items-center justify-center px-8",
                        caption_label: "text-sm font-semibold text-foreground",
                        table: "w-full border-collapse table-fixed",
                        weekdays: "flex w-full mb-2",
                        weekday: "store-muted-text flex-1 text-center text-[10px] font-medium uppercase tracking-[0.14em]",
                        week: "flex w-full mt-1.5",
                        day: "flex-1 text-center p-0",
                        day_button: "mx-auto flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-xs transition-all hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:text-foreground",
                        selected: "store-accent-button !text-white font-bold",
                        today: "store-accent-soft store-accent-text font-bold",
                      }}
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="store-muted-text text-[11px] uppercase tracking-[0.18em]">Cam kết đóng gói</p>
                        <p className="mt-3 text-base font-medium text-foreground">Đóng gói bảo vệ cao cấp</p>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          Mỗi đơn hàng đều được chuẩn bị với túi chống bụi, khung hỗ trợ và hộp gia cố để bảo vệ hình dáng và bề mặt sản phẩm.
                        </p>
                      </div>
                      <div>
                        <p className="store-muted-text text-[11px] uppercase tracking-[0.18em]">Ghi chú vận chuyển</p>
                        <p className="mt-3 text-base font-medium text-foreground">Theo dõi xuyên suốt hành trình</p>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          Thời gian giao hàng có thể thay đổi nhẹ trong các ngày lễ hoặc ở các khu vực vùng sâu vùng xa, nhưng cập nhật theo dõi vẫn sẽ hiển thị trực tiếp trong suốt quá trình vận chuyển.
                        </p>
                      </div>
                    </div>

                    <div className="pt-5">
                      <p className="store-muted-text text-[11px] uppercase tracking-[0.18em]">Lưu ý giao hàng</p>
                      <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                        <li>Các mặt hàng xa xỉ được đóng gói với túi chống bụi và lớp bọc bảo vệ gia cố.</li>
                        <li>Cần xác nhận chữ ký đối với các đơn hàng có giá trị cao.</li>
                        <li>Lịch giao hàng cuối tuần tùy thuộc vào sự sẵn có của đơn vị vận chuyển địa phương.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                <div className="px-1 py-2">
                    <h3 className="mb-4 text-lg font-semibold">Thông tin vận chuyển</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Miễn phí vận chuyển tiêu chuẩn cho đơn hàng trên $100.</p>
                    <p>Có tùy chọn vận chuyển hỏa tốc khi thanh toán.</p>
                    <p>Dự kiến giao hàng: 5-7 ngày làm việc (tiêu chuẩn)</p>
                    <p>Hỗ trợ vận chuyển quốc tế đến một số quốc gia.</p>
                  </div>
                </div>
                <div className="px-1 py-2">
                    <h3 className="mb-4 text-lg font-semibold">Chính sách đổi trả</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Chính sách đổi trả trong 30 ngày cho các mặt hàng chưa qua sử dụng, còn nguyên bao bì.</p>
                    <p>Miễn phí đổi trả cho tất cả đơn hàng.</p>
                    <p>Hoàn tiền được xử lý trong vòng 5-7 ngày làm việc.</p>
                    <p>Liên hệ trực tiếp với người bán nếu có bất kỳ câu hỏi nào về sản phẩm.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-5">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="store-surface-panel rounded-[28px] p-6 shadow-[0_16px_36px_rgb(15_23_42/0.08)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                        <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                              <p className="text-lg font-semibold tracking-[-0.02em]">{review.author}</p>
                              <span className="store-surface-soft store-muted-text rounded-full px-2.5 py-1 text-xs">
                                {review.date}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      "h-4 w-4",
                                      i < review.rating ? "fill-gold text-gold" : "fill-muted text-muted"
                                    )}
                                  />
                                ))}
                              </div>
                              <span className="store-muted-text text-sm">Đã mua xác minh</span>
                            </div>
                          </div>

                          {review.images && (
                            <div className="flex gap-2 lg:pl-4">
                              {review.images.map((img, idx) => (
                                <div
                                  key={idx}
                                    className="store-surface-soft relative h-20 w-20 overflow-hidden rounded-2xl"
                                >
                                  <Image src={img} alt="" fill className="object-cover" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="store-surface-soft mt-4 rounded-[22px] px-5 py-4">
                          <h4 className="mb-2 text-lg font-medium tracking-[-0.01em]">{review.title}</h4>
                          <p className="text-sm leading-7 text-muted-foreground">{review.content}</p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <button className="store-surface-soft store-muted-text rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:text-foreground">
                            Hữu ích ({review.helpful})
                          </button>
                          <button className="store-muted-text rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-[rgb(var(--store-accent-rgb)/0.08)] hover:text-foreground">
                            Trả lời
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-8">
              <div className="store-surface-panel rounded-[30px] p-6 shadow-[0_18px_44px_rgb(15_23_42/0.08)]">
                <div className="mb-6 flex flex-col gap-4 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Biến động giá</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Theo dõi các đợt giảm giá gần đây.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <span className="store-muted-text">Hiện tại: ${product.price}</span>
                    <span className="store-muted-text">Giá gốc: ${product.originalPrice ?? product.price}</span>
                    <span className="store-accent-text">
                      {discount > 0 ? `Tiết kiệm $${product.originalPrice ? product.originalPrice - product.price : 0}` : "Giá ổn định"}
                    </span>
                  </div>
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
                  <div>
                    <ChartContainer config={priceChartConfig} className="h-[240px] w-full">
                      <AreaChart data={priceHistory} margin={{ left: 8, right: 8, top: 20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="rgb(var(--store-border-rgb) / 0.45)" strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={12}
                          tick={{ fill: "rgb(var(--store-muted-rgb))", fontSize: 11, fontWeight: 500 }}
                        />
                        <ChartTooltip 
                          cursor={{ stroke: 'rgb(var(--store-accent-rgb) / 0.2)', strokeWidth: 1 }} 
                          content={<ChartTooltipContent indicator="dot" />} 
                        />
                        <Area
                          dataKey="price"
                          type="monotone"
                          fill="url(#fillPrice)"
                          stroke="var(--color-price)"
                          strokeWidth={3}
                          activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-price)" }}
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <p className="store-muted-text text-[11px] uppercase tracking-[0.18em]">Thời điểm mua</p>
                      <h4 className="mt-3 text-lg font-semibold">Đang là lúc mua khá tốt</h4>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Giá đã giảm dần đều đặn và hiện tại đang ở gần mức thấp nhất trong chu kỳ này.
                      </p>
                    </div>

                    <div className="pt-5">
                      <p className="store-muted-text text-[11px] uppercase tracking-[0.18em]">Ghi chú giá</p>
                      <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                        <li>Các bộ sưu tập cao cấp thường giữ giá lâu hơn sau khi giảm giá.</li>
                        <li>Một số phiên bản có thể trở lại giá gốc khi số lượng hàng còn ít.</li>
                        <li>Giá tốt nhất thường rơi vào thời điểm các chiến dịch khuyến mãi hiện tại.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <section className="mt-20">
            <h2 className="mb-8 font-serif text-2xl font-semibold">Có thể bạn sẽ thích</h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {featuredProducts.slice(0, 4).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
