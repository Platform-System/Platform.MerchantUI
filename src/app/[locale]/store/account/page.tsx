"use client"

import * as React from "react"
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
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Saved Items", icon: Heart },
  ]

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 text-white relative z-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8">Account Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible shrink-0 pb-4 md:pb-0 border-b md:border-b-0 border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    activeTab === tab.id
                      ? "bg-white/10 text-white border border-white/10"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${activeTab === tab.id ? "text-gold" : ""}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all mt-0 md:mt-auto pt-4 border-t border-white/5">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Main Panel */}
          <div className="md:col-span-3 bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            {activeTab === "profile" && (
              <div className="flex flex-col">
                <h3 className="font-serif text-2xl font-semibold text-white mb-6">Personal Details</h3>
                
                <div className="flex items-center gap-4 pb-6 border-b border-white/5 mb-6">
                  <div className="relative size-20 rounded-full overflow-hidden border border-white/20">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{user.name}</h4>
                    <p className="text-xs text-muted-foreground">Member since {user.joinedDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Full Name</span>
                    <span className="text-sm font-medium py-2 px-3 bg-white/5 border border-white/10 rounded-xl">{user.name}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Email Address</span>
                    <span className="text-sm font-medium py-2 px-3 bg-white/5 border border-white/10 rounded-xl">{user.email}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button variant="default" className="bg-gold text-charcoal font-semibold hover:bg-gold/90 rounded-xl">
                    <Settings className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="flex flex-col">
                <h3 className="font-serif text-2xl font-semibold text-white mb-6">Purchase History</h3>
                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm text-white">{order.id}</span>
                        <span className="text-xs text-muted-foreground">{order.date} • {order.items} items</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-semibold text-gold">${order.total}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered" ? "bg-emerald-500/20 text-emerald-400" : "bg-gold/20 text-gold"
                        }`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <Heart className="h-12 w-12 text-gold fill-charcoal" />
                <h3 className="font-serif text-xl font-bold text-white">Your Wishlist is Empty</h3>
                <p className="text-muted-foreground max-w-xs text-sm">
                  Start browsing the store to find unique products you want to save for later.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
