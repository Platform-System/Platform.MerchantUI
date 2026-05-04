"use client"

import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Store, TrendingUp, Users, Shield } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { sellerStats } from "@/features/store/lib/data"

const benefits = [
  {
    icon: Store,
    title: "Gian hàng mang dấu ấn riêng",
    description: "Tạo một gian hàng có bản sắc thương hiệu và trưng bày sản phẩm một cách chuyên nghiệp.",
  },
  {
    icon: TrendingUp,
    title: "Phân tích để theo dõi tăng trưởng",
    description: "Theo dõi doanh số, hành vi khách hàng và hiệu quả kinh doanh với dữ liệu rõ ràng.",
  },
  {
    icon: Users,
    title: "Tiếp cận khách hàng rộng hơn",
    description: "Mở rộng tiếp cận đến hàng triệu khách hàng tiềm năng từ nhiều khu vực.",
  },
  {
    icon: Shield,
    title: "Thanh toán an toàn",
    description: "Nhận tiền đúng hạn và an tâm vận hành với hệ thống thanh toán đáng tin cậy.",
  },
]

export function SellerCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[rgb(var(--store-ink-rgb))] py-24 text-white">
      {/* Các lớp nền phụ trợ */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="store-accent-glow absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="store-accent-glow-subtle absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Phần tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="store-accent-subtitle text-sm font-medium uppercase tracking-widest">
            Dành cho nhà bán hàng
          </span>
          <h2 className="mt-3 mb-4 text-balance font-serif text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Bắt đầu bán hàng trên Nyxoris
          </h2>
          <p className="mx-auto max-w-2xl text-white/72">
            Đồng hành cùng hàng nghìn nhà bán hàng đang phát triển tốt. Chúng tôi cung cấp đầy đủ công cụ để bạn mở rộng kinh doanh.
          </p>
        </motion.div>

        {/* Các chỉ số */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {sellerStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="store-accent-text font-serif text-3xl sm:text-4xl font-semibold mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/65">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Các lợi ích */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-white/6 p-6 shadow-[0_16px_36px_rgb(0_0_0/0.14)] transition-all hover:bg-white/10"
            >
              <div className="store-accent-soft-hover w-fit rounded-xl p-3 mb-4">
                <benefit.icon className="store-accent-text h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-white">{benefit.title}</h3>
              <p className="text-sm text-white/65">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Khối kêu gọi hành động */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="store-accent-button h-14 px-10 text-base font-semibold"
          >
            <Link href="/store/become-seller" scroll={false}>
              Trở thành nhà bán hàng
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-white/58">
            Đăng ký miễn phí. Không thu phí hàng tháng. Chỉ tính phí khi bạn có đơn.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

