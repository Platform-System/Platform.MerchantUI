"use client"

import React from "react"
import { motion } from "framer-motion"
import { AccountSidebar } from "@/features/store/components/account/account-sidebar"

interface AccountLayoutProps {
  children: React.ReactNode
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <main className="h-screen w-full overflow-y-auto scroll-smooth pt-24 pb-16 bg-muted/30 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl font-semibold text-white">My Account</h1>
          <p className="text-white/60 mt-1">Manage your profile and account settings</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
