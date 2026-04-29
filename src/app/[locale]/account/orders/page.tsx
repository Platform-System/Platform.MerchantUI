"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Package, Truck, CheckCircle, Clock, Eye, ChevronDown } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/features/store/components/ui/dropdown-menu"
import { cn } from "@/features/store/lib/utils"
import { Link } from "@/i18n/navigation"
import { PillToggle } from "@/features/store/components/ui/pill-toggle"

const orders = [
  {
    id: "ORD-2024-001",
    date: "December 15, 2024",
    status: "delivered",
    total: 299,
    items: [
      {
        name: "Premium Leather Tote Bag",
        seller: "Luxe Leather Co.",
        price: 299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop",
      },
    ],
    tracking: "1Z999AA10123456784",
    deliveredDate: "December 18, 2024",
  },
  {
    id: "ORD-2024-002",
    date: "December 10, 2024",
    status: "in_transit",
    total: 189,
    items: [
      {
        name: "Classic Mechanical Watch",
        seller: "TimeKeeper",
        price: 189,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      },
    ],
    tracking: "1Z999AA10123456785",
    estimatedDelivery: "December 20, 2024",
  },
  {
    id: "ORD-2024-003",
    date: "December 5, 2024",
    status: "processing",
    total: 158,
    items: [
      {
        name: "Handcrafted Gold Earrings",
        seller: "Artisan Gems",
        price: 79,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop",
      },
    ],
    estimatedShipDate: "December 21, 2024",
  },
]

const statusConfig = {
  delivered: {
    label: "Delivered",
    color: "bg-green-500/10 text-green-600",
    icon: CheckCircle,
  },
  in_transit: {
    label: "In Transit",
    color: "bg-blue-500/10 text-blue-600",
    icon: Truck,
  },
  processing: {
    label: "Processing",
    color: "bg-gold/10 text-gold",
    icon: Clock,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-destructive/10 text-destructive",
    icon: Package,
  },
}

export default function AccountOrdersPage() {
  const [filter, setFilter] = useState<string>("all")

  const filteredOrders =
    filter === "all" ? orders : orders.filter((order) => order.status === filter)

  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-between mb-6"
      >
        <PillToggle
          items={["Processing", "In Transit", "Delivered"]}
          activeItem={
            filter === "all"
              ? "All"
              : filter === "in_transit"
              ? "In Transit"
              : filter.charAt(0).toUpperCase() + filter.slice(1)
          }
          onItemChange={(item) => {
            if (item === null || item === "All") {
              setFilter("all")
            } else {
              setFilter(item.toLowerCase().replace(" ", "_"))
            }
          }}
          allLabel="All Orders"
        />
      </motion.div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-md"
            >
              {/* Order Header */}
              <div className="p-4 sm:p-6 border-b border-border bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-white">{order.id}</h3>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                          statusConfig[order.status as keyof typeof statusConfig].color
                        )}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                    <p className="text-sm text-white/40 mt-1">
                      Ordered on {order.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                          Actions
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#18181b] border-white/10 text-white">
                        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">Track Order</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">Download Invoice</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">Contact Seller</DropdownMenuItem>
                        {order.status === "delivered" && (
                          <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">Write Review</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 sm:p-6">
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden shrink-0 bg-white/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href="/store/marketplace"
                        className="font-medium text-white hover:text-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-white/40 mt-0.5">
                        by {item.seller}
                      </p>
                      <p className="text-sm text-white/40 mt-0.5">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-white">${item.price}</p>
                  </div>
                ))}

                {/* Order Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-6 border-t border-white/10 gap-4">
                  <div className="text-sm text-white/40">
                    {order.status === "delivered" && (
                      <span>Delivered on {order.deliveredDate}</span>
                    )}
                    {order.status === "in_transit" && (
                      <span>Estimated delivery: {order.estimatedDelivery}</span>
                    )}
                    {order.status === "processing" && (
                      <span>Estimated ship date: {order.estimatedShipDate}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/40">Total</p>
                    <p className="font-semibold text-lg text-white">${order.total}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-16">
          <Package className="h-12 w-12 text-white/20 mx-auto mb-4" />
          <h3 className="font-semibold text-lg text-white mb-2">No orders found</h3>
          <p className="text-white/40 mb-6">
            You don&apos;t have any orders matching this filter.
          </p>
          <Button asChild className="bg-gold text-charcoal hover:bg-gold/90 font-semibold rounded-full px-6">
            <Link href="/store/marketplace">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
