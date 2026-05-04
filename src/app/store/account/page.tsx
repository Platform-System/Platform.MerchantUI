"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/features/store/components/ui/button"
import { User, Package, Heart, Settings, LogOut } from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = React.useState("profile")

  const user = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    joinedDate: "October 2024"
  }

  const orders = [
    { id: "ORD-99281X", date: "2026-04-15", total: 388, status: "Delivered", items: 2 },
    { id: "ORD-48390A", date: "2026-03-22", total: 89, status: "Shipped", items: 1 },
  ]

  const tabs = [
    { id: "profile", label: "Hồ sơ", icon: User },
    { id: "orders", label: "Đơn hàng", icon: Package },
    { id: "wishlist", label: "Mục đã lưu", icon: Heart },
  ]

  return (
    <div className="relative z-10 min-h-screen bg-background pt-24 pb-12 text-foreground">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8">Tài khoản của tôi</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="flex shrink-0 flex-row gap-2 overflow-x-auto border-b border-[rgb(var(--store-border-rgb)/0.7)] pb-4 md:flex-col md:overflow-visible md:border-b-0 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    activeTab === tab.id
                      ? "store-accent-soft border border-[rgb(var(--store-accent-rgb)/0.18)] text-foreground"
                      : "text-muted-foreground hover:bg-[rgb(var(--store-accent-rgb)/0.08)] hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${activeTab === tab.id ? "store-accent-text" : ""}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
            <button className="mt-0 flex items-center gap-3 border-t border-[rgb(var(--store-border-rgb)/0.6)] px-4 pt-4 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10 md:mt-auto">
              <LogOut className="h-5 w-5" />
              <span>Đăng xuất</span>
            </button>
          </div>

          {/* Main Panel */}
          <div className="store-surface-panel md:col-span-3 rounded-3xl p-6 shadow-2xl sm:p-8">
            {activeTab === "profile" && (
              <div className="flex flex-col">
                <h3 className="mb-6 font-serif text-2xl font-semibold text-foreground">Thông tin cá nhân</h3>
                
                <div className="mb-6 flex items-center gap-4 border-b border-[rgb(var(--store-border-rgb)/0.6)] pb-6">
                  <div className="relative size-20 overflow-hidden rounded-full border border-[rgb(var(--store-border-rgb)/0.85)]">
                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{user.name}</h4>
                    <p className="text-xs text-muted-foreground">Tham gia từ {user.joinedDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Họ và tên</span>
                    <span className="store-surface-soft rounded-xl border px-3 py-2 text-sm font-medium">{user.name}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Địa chỉ email</span>
                    <span className="store-surface-soft rounded-xl border px-3 py-2 text-sm font-medium">{user.email}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button variant="default" className="store-accent-button store-accent-button-strong rounded-xl font-semibold">
                    <Settings className="mr-2 h-4 w-4" /> Chỉnh sửa hồ sơ
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="flex flex-col">
                <h3 className="mb-6 font-serif text-2xl font-semibold text-foreground">Lịch sử mua hàng</h3>
                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div key={order.id} className="store-surface-soft flex items-center justify-between rounded-2xl border p-4 transition-all hover:bg-[rgb(var(--store-accent-rgb)/0.08)]">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-foreground">{order.id}</span>
                        <span className="text-xs text-muted-foreground">{order.date} • {order.items} sản phẩm</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="store-accent-text font-semibold">${order.total}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered" ? "bg-emerald-500/20 text-emerald-400" : "bg-gold/20 text-gold"
                        }`}>{order.status === "Delivered" ? "Đã giao" : "Đang giao"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <Heart className="store-accent-text h-12 w-12" />
                <h3 className="font-serif text-xl font-bold text-foreground">Danh sách yêu thích đang trống</h3>
                <p className="text-muted-foreground max-w-xs text-sm">
                  Hãy khám phá cửa hàng để lưu lại những sản phẩm bạn muốn mua sau.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
