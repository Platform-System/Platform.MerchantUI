"use client"

import * as React from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Star,
  MapPin,
  Calendar,
  Package,
  Users,
  MessageCircle,
  Share2,
  ChevronDown,
  Grid3X3,
  LayoutGrid,
  ArrowLeft,
} from "lucide-react"
import {
  popularSellers,
  featuredProducts,
  trendingProducts,
  newArrivals,
} from "@/features/store/lib/data"
import { ProductCard, type Product } from "@/features/store/components/product/product-card"
import { Button } from "@/features/store/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/store/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/features/store/components/ui/dropdown-menu"
import { FilterBar } from "@/features/store/components/ui/filter-bar"
import { RatingStars } from "@/features/store/components/ui/rating-stars"
import { cn } from "@/features/store/lib/utils"

type SellerReview = {
  id: number
  author: string
  avatar: string
  rating: number
  date: string
  content: string
  product: string
}

type SellerProduct = Product & {
  sellerCategory: string
}

const sellerMetaBySlug: Record<
  string,
  {
    followers: number
    memberSince: string
    reviews: SellerReview[]
  }
> = {
  "luxe-leather-co": {
    followers: 12500,
    memberSince: "January 2020",
    reviews: [
      {
        id: 1,
        author: "Sarah M.",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        rating: 5,
        date: "2 weeks ago",
        content: "Excellent quality and amazing customer service. Will definitely buy again!",
        product: "Premium Leather Tote Bag",
      },
      {
        id: 2,
        author: "Michael R.",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        rating: 5,
        date: "1 month ago",
        content:
          "The craftsmanship is impeccable. You can tell these are made with love and care.",
        product: "Classic Leather Wallet",
      },
    ],
  },
  "nordic-home": {
    followers: 9800,
    memberSince: "March 2021",
    reviews: [
      {
        id: 1,
        author: "Elena V.",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        rating: 5,
        date: "1 week ago",
        content: "Beautiful proportions and the finish feels extremely premium in person.",
        product: "Minimalist Ceramic Vase Set",
      },
      {
        id: 2,
        author: "David K.",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        rating: 4,
        date: "3 weeks ago",
        content: "Fast shipping and the design language matches the photos perfectly.",
        product: "Linen Throw Blanket",
      },
    ],
  },
  techvault: {
    followers: 18400,
    memberSince: "August 2019",
    reviews: [
      {
        id: 1,
        author: "Chris T.",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        rating: 5,
        date: "5 days ago",
        content: "Packaging was immaculate and setup took only a few minutes.",
        product: "Wireless Noise-Canceling Headphones",
      },
      {
        id: 2,
        author: "Monica S.",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        rating: 4,
        date: "2 weeks ago",
        content: "Strong product knowledge and very responsive before purchase.",
        product: "Smart Home Speaker",
      },
    ],
  },
  "artisan-gems": {
    followers: 7600,
    memberSince: "November 2020",
    reviews: [
      {
        id: 1,
        author: "Nina R.",
        avatar:
          "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop",
        rating: 5,
        date: "4 days ago",
        content: "The finish and packaging felt like opening a true couture piece.",
        product: "Handcrafted Gold Earrings",
      },
      {
        id: 2,
        author: "Olivia P.",
        avatar:
          "https://images.unsplash.com/photo-1542204625-de293a2f8ff0?w=100&h=100&fit=crop",
        rating: 5,
        date: "1 month ago",
        content: "Exactly as pictured and the seller answered every question quickly.",
        product: "Signature Stone Pendant",
      },
    ],
  },
}

function mapSellerProducts(slug: string): SellerProduct[] {
  const allProducts = [...featuredProducts, ...trendingProducts, ...newArrivals]

  switch (slug) {
    case "luxe-leather-co":
      return [
        { ...featuredProducts[0], sellerCategory: "Bags" },
        {
          ...featuredProducts[6],
          seller: { name: "Luxe Leather Co.", verified: true },
          sellerCategory: "Accessories",
        },
        {
          ...newArrivals[0],
          seller: { name: "Luxe Leather Co.", verified: true },
          sellerCategory: "Accessories",
        },
        {
          ...featuredProducts[7],
          name: "Classic Leather Wallet",
          seller: { name: "Luxe Leather Co.", verified: true },
          sellerCategory: "Wallets",
        },
        {
          ...trendingProducts[1],
          name: "Heritage Leather Belt",
          seller: { name: "Luxe Leather Co.", verified: true },
          sellerCategory: "Belts",
        },
        {
          ...featuredProducts[0],
          id: "101",
          name: "Structured Weekender Bag",
          seller: { name: "Luxe Leather Co.", verified: true },
          sellerCategory: "Bags",
        },
      ]
    case "nordic-home":
      return [
        { ...featuredProducts[1], sellerCategory: "Home Decor" },
        { ...featuredProducts[7], seller: { name: "Nordic Home", verified: true }, sellerCategory: "Furniture" },
        { ...trendingProducts[3], seller: { name: "Nordic Home", verified: true }, sellerCategory: "Lighting" },
        {
          ...featuredProducts[1],
          id: "201",
          name: "Oak Side Table",
          seller: { name: "Nordic Home", verified: true },
          sellerCategory: "Furniture",
        },
        {
          ...featuredProducts[7],
          id: "202",
          name: "Textured Floor Lamp",
          seller: { name: "Nordic Home", verified: true },
          sellerCategory: "Lighting",
        },
        {
          ...trendingProducts[3],
          id: "203",
          name: "Stoneware Serving Set",
          seller: { name: "Nordic Home", verified: true },
          sellerCategory: "Home Decor",
        },
      ]
    case "techvault":
      return allProducts
        .filter((product) =>
          ["TechVault", "Tech Vault"].includes(product.seller.name),
        )
        .map((product, index) => ({
          ...product,
          sellerCategory: index % 3 === 0 ? "Electronics" : index % 3 === 1 ? "Gadgets" : "Audio",
        }))
    case "artisan-gems":
      return [
        { ...featuredProducts[3], sellerCategory: "Jewelry" },
        {
          ...featuredProducts[3],
          id: "401",
          name: "Pearl Drop Necklace",
          seller: { name: "Artisan Gems", verified: true },
          sellerCategory: "Handcrafted",
        },
        {
          ...featuredProducts[3],
          id: "402",
          name: "Sculpted Signet Ring",
          seller: { name: "Artisan Gems", verified: true },
          sellerCategory: "Accessories",
        },
        {
          ...featuredProducts[3],
          id: "403",
          name: "Atelier Chain Bracelet",
          seller: { name: "Artisan Gems", verified: true },
          sellerCategory: "Jewelry",
        },
      ]
    default:
      return featuredProducts.slice(0, 6).map((product) => ({
        ...product,
        seller: { name: popularSellers[0].name, verified: true },
        sellerCategory: popularSellers[0].categories[0] ?? "Featured",
      }))
  }
}

export default function SellerStorefrontPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const seller = popularSellers.find((item) => item.slug === slug) || popularSellers[0]
  const sellerMeta = sellerMetaBySlug[seller.slug] || sellerMetaBySlug["luxe-leather-co"]
  const sellerProducts = mapSellerProducts(seller.slug)

  const [isFollowing, setIsFollowing] = React.useState(false)
  const [gridCols, setGridCols] = React.useState<3 | 4>(4)
  const [sortBy, setSortBy] = React.useState("featured")
  const [activeCategory, setActiveCategory] = React.useState("Tất cả")
  const [activeTab, setActiveTab] = React.useState("products")
  const [searchQuery, setSearchQuery] = React.useState("")

  const sortedProducts = [...sellerProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "newest") return Number(b.id) - Number(a.id)
    return 0
  })

  const filteredProducts = sortedProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "Tất cả" || product.sellerCategory === activeCategory
    return matchesSearch && matchesCategory
  })

  const ratingDistribution = [
    { stars: 5, width: 78 },
    { stars: 4, width: 18 },
    { stars: 3, width: 6 },
    { stars: 2, width: 3 },
    { stars: 1, width: 2 },
  ]

  return (
    <div className="relative z-10 min-h-screen bg-transparent pb-28 pt-32 text-foreground">
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="store-surface-soft mb-5 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-foreground transition-colors hover:bg-[rgb(var(--store-accent-rgb)/0.1)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lai
          </button>

          <div className="relative h-64 overflow-hidden rounded-[2rem] shadow-[0_28px_60px_rgb(15_23_42/0.12)] sm:h-80 lg:h-96">
            <Image
              src={seller.coverImage}
              alt={`${seller.name} cover`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative -mt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="store-surface-panel rounded-[2rem] p-6 shadow-[0_24px_56px_rgb(15_23_42/0.12)] sm:p-8"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="relative">
                <div className="store-surface-soft relative h-24 w-24 overflow-hidden rounded-[1.5rem] shadow-[0_18px_36px_rgb(15_23_42/0.12)] sm:h-32 sm:w-32">
                  <Image src={seller.avatar} alt={seller.name} fill className="object-cover" />
                </div>
                {seller.verified && (
                  <div className="store-surface-panel absolute -bottom-2 -right-2 rounded-full px-2.5 py-2 shadow-lg">
                    <svg className="store-accent-text h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                        {seller.name}
                      </h1>
                      {seller.verified && (
                        <span className="store-accent-soft rounded-full px-3 py-1 text-xs font-medium">
                          Nhà bán hàng đã xác minh
                        </span>
                      )}
                    </div>

                    <p className="store-muted-text mt-1">{seller.tagline}</p>

                    <div className="store-muted-text mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Star
                          className="h-4 w-4"
                          style={{ fill: "var(--color-star)", color: "var(--color-star)" }}
                        />
                        <span className="font-medium text-foreground">{seller.rating}</span>
                        <span>({seller.reviewCount} đánh giá)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Package className="h-4 w-4" />
                        <span>{seller.productCount} sản phẩm</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span>{sellerMeta.followers.toLocaleString()} người theo dõi</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{seller.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>Tham gia từ {sellerMeta.memberSince}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => setIsFollowing((current) => !current)}
                      className={cn(
                        "rounded-xl px-5 shadow-none",
                        isFollowing
                          ? "store-surface-soft text-foreground hover:bg-[rgb(var(--store-accent-rgb)/0.1)]"
                          : "store-accent-button"
                      )}
                    >
                      {isFollowing ? "Đang theo dõi" : "Theo dõi"}
                    </Button>
                    <Button variant="outline" className="rounded-xl px-5">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Liên hệ
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-xl">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="store-muted-text mt-6 max-w-4xl leading-relaxed">{seller.description}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {Object.values(seller.policies).map((policy, index) => (
                    <span
                      key={index}
                      className="store-surface-soft store-muted-text rounded-full px-4 py-2 text-sm"
                    >
                      {policy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <TabsList className="store-surface-panel h-auto w-full rounded-[1.75rem] p-1 xl:w-auto">
                <TabsTrigger
                  value="products"
                  className="store-muted-text rounded-[1.3rem] px-6 py-3 data-[state=active]:bg-[rgb(var(--store-accent-rgb)/0.12)] data-[state=active]:text-foreground"
                >
                  Sản phẩm ({seller.productCount})
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="store-muted-text rounded-[1.3rem] px-6 py-3 data-[state=active]:bg-[rgb(var(--store-accent-rgb)/0.12)] data-[state=active]:text-foreground"
                >
                  Danh gia ({seller.reviewCount})
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="store-muted-text rounded-[1.3rem] px-6 py-3 data-[state=active]:bg-[rgb(var(--store-accent-rgb)/0.12)] data-[state=active]:text-foreground"
                >
                  Giới thiệu
                </TabsTrigger>
              </TabsList>

              {activeTab === "products" && (
                <FilterBar
                  variant="inline"
                  className="xl:justify-end"
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  categories={seller.categories}
                  includeAllOption
                  searchPlaceholder="Tìm sản phẩm..."
                />
              )}
            </div>

            <TabsContent value="products" className="mt-0">
              <div className="mb-6 flex items-center justify-between">
                <p className="store-muted-text text-sm">
                  Hiện có <span className="font-medium text-foreground">{filteredProducts.length}</span> sản phẩm
                </p>

                <div className="flex items-center gap-3">
                  <div className="store-surface-soft hidden items-center gap-1 rounded-xl p-1 md:flex">
                    <button
                      onClick={() => setGridCols(3)}
                      className={cn(
                        "rounded-lg p-2 transition-colors",
                        gridCols === 3 ? "store-accent-soft text-foreground" : "store-muted-text hover:bg-[rgb(var(--store-accent-rgb)/0.08)]"
                      )}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setGridCols(4)}
                      className={cn(
                        "rounded-lg p-2 transition-colors",
                        gridCols === 4 ? "store-accent-soft text-foreground" : "store-muted-text hover:bg-[rgb(var(--store-accent-rgb)/0.08)]"
                      )}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="min-w-[156px] justify-between rounded-xl">
                        {sortBy === "featured"
                          ? "Nổi bật"
                          : sortBy === "newest"
                            ? "Mới nhất"
                            : sortBy === "price-low"
                              ? "Giá: Thấp đến cao"
                              : "Giá: Cao đến thấp"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[190px]">
                      <DropdownMenuItem onClick={() => setSortBy("featured")}>Nổi bật</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("newest")}>Mới nhất</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price-low")}>Giá: Thấp đến cao</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price-high")}>Giá: Cao đến thấp</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div
                className={cn(
                  "grid gap-4 sm:gap-6",
                  gridCols === 3 && "grid-cols-2 md:grid-cols-3",
                  gridCols === 4 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="grid gap-8 xl:grid-cols-[340px_minmax(0,1fr)]">
                <div className="store-surface-panel rounded-[1.75rem] p-6 shadow-[0_18px_36px_rgb(15_23_42/0.1)]">
                  <div className="flex items-start gap-6">
                    <div className="min-w-[96px]">
                      <div className="text-5xl font-semibold tracking-[-0.03em]">{seller.rating}</div>
                      <div className="mt-3">
                        <RatingStars rating={seller.rating} />
                      </div>
                      <p className="store-muted-text mt-2 text-sm">{seller.reviewCount} đánh giá</p>
                    </div>

                    <div className="flex-1 space-y-3">
                      {ratingDistribution.map((item) => (
                        <div key={item.stars} className="flex items-center gap-3">
                          <span className="store-muted-text flex min-w-[44px] items-center gap-1 text-sm">
                            {item.stars}
                            <Star
                              className="h-3.5 w-3.5"
                              style={{ fill: "var(--color-star)", color: "var(--color-star)" }}
                            />
                          </span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[rgb(var(--store-border-rgb)/0.5)]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${item.width}%`,
                                backgroundColor: "var(--color-star)",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {sellerMeta.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="store-surface-panel rounded-[1.5rem] p-5 shadow-[0_18px_36px_rgb(15_23_42/0.1)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                          <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between gap-4">
                            <p className="font-medium text-foreground">{review.author}</p>
                            <span className="store-muted-text text-sm">{review.date}</span>
                          </div>
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <RatingStars rating={review.rating} size="sm" />
                            <span className="store-muted-text text-sm">Đã mua: {review.product}</span>
                          </div>
                          <p className="store-muted-text leading-relaxed">{review.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-0">
              <div className="space-y-10">
                <div className="max-w-5xl">
                  <h3 className="mb-4 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                    Về {seller.name}
                  </h3>
                  <p className="store-muted-text max-w-4xl leading-relaxed">{seller.description}</p>
                </div>

                <div>
                  <h3 className="mb-5 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                    Chính sách gian hàng
                  </h3>
                  <div className="grid gap-5 md:grid-cols-3">
                    <div className="store-surface-panel rounded-[1.5rem] p-5 shadow-[0_16px_32px_rgb(15_23_42/0.08)]">
                      <h4 className="mb-2 text-lg font-medium text-foreground">Vận chuyển</h4>
                      <p className="store-muted-text text-sm leading-relaxed">{seller.policies.shipping}</p>
                    </div>
                    <div className="store-surface-panel rounded-[1.5rem] p-5 shadow-[0_16px_32px_rgb(15_23_42/0.08)]">
                      <h4 className="mb-2 text-lg font-medium text-foreground">Đổi trả</h4>
                      <p className="store-muted-text text-sm leading-relaxed">{seller.policies.returns}</p>
                    </div>
                    <div className="store-surface-panel rounded-[1.5rem] p-5 shadow-[0_16px_32px_rgb(15_23_42/0.08)]">
                      <h4 className="mb-2 text-lg font-medium text-foreground">Bảo hành</h4>
                      <p className="store-muted-text text-sm leading-relaxed">{seller.policies.warranty}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                    Thời gian phản hồi
                  </h3>
                  <p className="store-muted-text">{seller.responseTime}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
