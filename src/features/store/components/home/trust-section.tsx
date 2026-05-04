"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import Image from "next/image"
import { RatingStars } from "@/features/store/components/ui/rating-stars"

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Khách hàng thời trang",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "Nyxoris đã thay đổi cách tôi mua sắm. Chất lượng sản phẩm và quy trình xác minh nhà bán hàng giúp tôi yên tâm hơn trong mọi đơn hàng.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    role: "Người yêu thích trang trí nhà cửa",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "Sự chọn lọc kỹ càng cùng chất lượng tốt làm cho khu chợ này rất khác biệt. Tôi tìm thấy nhiều món đồ rất riêng mà khó thấy ở nơi khác.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Người sưu tầm nghệ thuật",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "Là người sưu tầm nghệ thuật, tôi rất đánh giá quy trình xác thực và đảm bảo chất lượng mà Nyxoris mang lại. Đây là nơi tôi ưu tiên khi tìm món đồ độc đáo.",
    rating: 5,
  },
]

export function TrustSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="store-muted-text text-sm font-medium uppercase tracking-widest">
            Cảm nhận khách hàng
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 mb-4 text-balance">
            Khách hàng nói gì về Nyxoris
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="store-surface-panel rounded-2xl p-6 shadow-[0_18px_32px_rgb(15_23_42/0.1)] sm:p-8"
            >
              {/* Quote Icon */}
              <Quote className="store-muted-text mb-4 h-8 w-8" />

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Rating */}
              <RatingStars rating={testimonial.rating} className="mb-6" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "4.9/5", label: "Đánh giá trung bình" },
            { value: "98%", label: "Mức độ hài lòng" },
            { value: "24/7", label: "Hỗ trợ khách hàng" },
            { value: "100%", label: "Thanh toán an toàn" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
