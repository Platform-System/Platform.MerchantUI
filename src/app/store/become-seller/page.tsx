"use client"

import * as React from "react"
import { Button } from "@/features/store/components/ui/button"
import { Input } from "@/features/store/components/ui/input"
import { ShieldCheck, Rocket, Percent, CheckCircle2 } from "lucide-react"

export default function BecomeSellerPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  return (
    <div className="relative z-10 flex min-h-screen items-center bg-background pt-24 pb-12 text-foreground">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        
        {/* Benefits */}
        <div className="flex flex-col gap-6">
          <span className="store-accent-subtitle text-sm font-medium uppercase tracking-widest">Gia nhập cộng đồng</span>
          <h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Biến đam mê thủ công thành cửa hàng chuyên nghiệp
          </h1>
          <p className="text-muted-foreground text-lg">
            Tiếp cận hàng triệu người mua đang tìm kiếm sản phẩm chất lượng, thủ công và khác biệt.
          </p>

          <div className="flex flex-col gap-4 mt-4 text-muted-foreground">
            <div className="flex items-start gap-3">
              <Percent className="store-accent-text h-6 w-6 shrink-0 mt-1" />
              <div>
                <strong className="block font-medium text-foreground">Phí hoa hồng cạnh tranh</strong>
                Giữ lại tới 95% doanh thu với mức phí minh bạch và hợp lý.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="store-accent-text h-6 w-6 shrink-0 mt-1" />
              <div>
                <strong className="block font-medium text-foreground">Bảo vệ nhà bán hàng</strong>
                Thanh toán an toàn và cơ chế chống gian lận giúp bảo vệ dòng tiền của bạn.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Rocket className="store-accent-text h-6 w-6 shrink-0 mt-1" />
              <div>
                <strong className="block font-medium text-foreground">Công cụ mở rộng kinh doanh</strong>
                Hỗ trợ vận hành và phát triển cửa hàng dễ dàng hơn khi quy mô tăng lên.
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="store-surface-panel rounded-3xl p-8 shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <CheckCircle2 className="store-accent-text h-16 w-16" />
              <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">Đã nhận đơn đăng ký!</h3>
              <p className="text-muted-foreground max-w-xs">
                Cảm ơn bạn đã đăng ký. Đội ngũ của chúng tôi sẽ xem xét hồ sơ gian hàng và phản hồi trong vòng 2-3 ngày làm việc.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setIsSubmitted(true)
              }}
              className="flex flex-col gap-5"
            >
              <h3 className="mb-2 font-serif text-2xl font-semibold text-foreground">Biểu mẫu đăng ký</h3>
              
              <div className="flex flex-col gap-1">
                <label className="store-muted-text text-sm font-medium">Họ và tên</label>
                <Input required placeholder="Nguyễn Văn A" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="store-muted-text text-sm font-medium">Địa chỉ email</label>
                <Input required type="email" placeholder="ban@example.com" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="store-muted-text text-sm font-medium">Tên gian hàng</label>
                <Input required placeholder="Xưởng Thủ Công Mộc" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="store-muted-text text-sm font-medium">Ngành hàng chính</label>
                <Input required placeholder="Thời trang, trang sức, nhà cửa..." />
              </div>

              <Button type="submit" className="store-accent-button store-accent-button-strong h-12 mt-4 rounded-xl font-semibold">
                Gửi đăng ký
              </Button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
