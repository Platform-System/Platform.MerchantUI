"use client"

import { motion } from "framer-motion"
import { Input } from "@/features/store/components/ui/input"
import { Button } from "@/features/store/components/ui/button"
import { ArrowRight, CreditCard, ShieldCheck, Truck, Headphones } from "lucide-react"

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
import { Link } from "@/i18n/navigation"

const footerLinks = {
  marketplace: [
    { name: "Xem tất cả", href: "/store/marketplace" },
    { name: "Danh mục", href: "/store/marketplace" },
    { name: "Hàng mới về", href: "/store/marketplace?sort=newest" },
    { name: "Bán chạy", href: "/store/marketplace?sort=popular" },
    { name: "Ưu đãi", href: "/store/marketplace?filter=deals" },
  ],
  sellers: [
    { name: "Trở thành nhà bán hàng", href: "/store/become-seller" },
    { name: "Xem nhà bán hàng", href: "/store/sellers" },
    { name: "Gian hàng nổi bật", href: "/store/sellers" },
    { name: "Trang chủ cửa hàng", href: "/store/home" },
    { name: "Danh sách yêu thích", href: "/store/wishlist" },
  ],
  support: [
    { name: "Trung tâm hỗ trợ", href: "/store/home" },
    { name: "Liên hệ", href: "/store/home" },
    { name: "Câu hỏi thường gặp", href: "/store/home" },
    { name: "Thông tin vận chuyển", href: "/store/home" },
    { name: "Đổi trả", href: "/store/home" },
  ],
  company: [
    { name: "Về cửa hàng", href: "/store/home" },
    { name: "Sản phẩm nổi bật", href: "/store/marketplace" },
    { name: "Nhà bán hàng hàng đầu", href: "/store/sellers" },
    { name: "Bán hàng cùng chúng tôi", href: "/store/become-seller" },
    { name: "Chính sách riêng tư", href: "/store/home" },
  ],
}

const trustBadges = [
  { icon: CreditCard, label: "Thanh toán an toàn" },
  { icon: ShieldCheck, label: "Bảo vệ người mua" },
  { icon: Truck, label: "Giao hàng nhanh" },
  { icon: Headphones, label: "Hỗ trợ 24/7" },
]

const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: TwitterIcon, href: "#", label: "X" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="relative text-foreground">
      {/* Vùng chuyển tiếp: Kết thúc Body bằng màu đậm */}
      <div className="h-24 w-full bg-gradient-to-b from-transparent to-[rgb(var(--store-surface-rgb)/0.95)]" />

      <div className="relative bg-[rgb(var(--store-surface-rgb)/0.96)]">
        {/* Lớp ngắt nhẹ và dải sáng (Glow) rực rỡ bắt đầu Footer */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-[rgb(var(--store-accent-rgb)/0.28)] to-transparent" />
          </div>
          <div className="pointer-events-none mx-auto -mt-20 h-48 w-full max-w-6xl rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--store-accent-rgb),0.14),transparent_70%)] blur-[110px] opacity-80" />
        </div>

        {/* Các điểm tin cậy */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="store-surface-panel flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:border-[rgb(var(--store-accent-rgb)/0.3)] hover:bg-[rgb(var(--store-surface-strong-rgb)/0.98)]"
              >
                <div className="store-accent-soft rounded-full p-3 shadow-inner">
                  <badge.icon className="store-accent-text h-5 w-5" />
                </div>
                <span className="text-sm font-semibold tracking-wide text-foreground">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Khối đăng ký nhận tin */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-2xl font-semibold mb-2">
                Gia nhập cộng đồng Nyxoris
              </h3>
              <p className="text-muted-foreground">
                Nhận ưu đãi độc quyền, sản phẩm mới và cập nhật từ nhà bán hàng qua email.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="lg:w-80"
              />
              <Button className="store-accent-button store-accent-button-strong shrink-0">
                Đăng ký
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Cụm liên kết */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Thương hiệu */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
              <Link href="/" className="inline-block mb-4">
                <span className="font-serif text-2xl font-semibold gradient-text">Nyxoris</span>
              </Link>
              <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                Nơi mua sắm đa nhà bán hàng cao cấp, nơi chất lượng gặp gỡ sự chọn lọc tinh tế.
                Khám phá những sản phẩm độc đáo từ các gian hàng được tuyển chọn.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="store-surface-soft rounded-full p-2 transition-colors hover:bg-[rgb(var(--store-accent-rgb)/0.1)]"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Marketplace */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">
                Cửa hàng
              </h4>
              <ul className="space-y-3">
                {footerLinks.marketplace.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:store-accent-text"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dành cho seller */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">
                Dành cho nhà bán hàng
              </h4>
              <ul className="space-y-3">
                {footerLinks.sellers.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:store-accent-text"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hỗ trợ */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">
                Hỗ trợ
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:store-accent-text"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Công ty */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">
                Thông tin
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:store-accent-text"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Thanh cuối footer */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Nyxoris. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/store/home" className="text-sm text-muted-foreground hover:text-foreground">
                Điều khoản sử dụng
              </Link>
              <Link href="/store/home" className="text-sm text-muted-foreground hover:text-foreground">
                Chính sách riêng tư
              </Link>
              <Link href="/store/home" className="text-sm text-muted-foreground hover:text-foreground">
                Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
