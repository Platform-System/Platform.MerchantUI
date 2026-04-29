"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Camera, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { Input } from "@/features/store/components/ui/input"
import { Label } from "@/features/store/components/ui/label"

const user = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, USA",
  memberSince: "March 2023",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
}

const stats = [
  { label: "Total Orders", value: "24" },
  { label: "Wishlist Items", value: "12" },
  { label: "Reviews Given", value: "8" },
  { label: "Member Since", value: "2023" },
]

export default function AccountProfilePage() {
  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="relative h-24 w-24 rounded-2xl overflow-hidden">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <Button
              size="icon"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gold text-charcoal hover:bg-gold/90 transition-all cursor-pointer flex items-center justify-center p-0 border-none"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-xl text-white">{user.name}</h2>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {user.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Member since {user.memberSince}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-semibold text-lg text-white">{stat.value}</p>
                  <p className="text-sm text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg text-white">Personal Information</h3>
          <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <Label className="text-white/60">First Name</Label>
            <Input value="Sarah" readOnly className="mt-1.5 bg-white/5 border-white/10 text-white" />
          </div>
          <div>
            <Label className="text-white/60">Last Name</Label>
            <Input value="Johnson" readOnly className="mt-1.5 bg-white/5 border-white/10 text-white" />
          </div>
          <div>
            <Label className="text-white/60">Email</Label>
            <Input value={user.email} readOnly className="mt-1.5 bg-white/5 border-white/10 text-white" />
          </div>
          <div>
            <Label className="text-white/60">Phone</Label>
            <Input value={user.phone} readOnly className="mt-1.5 bg-white/5 border-white/10 text-white" />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-white/60">Bio</Label>
            <Input
              value="Fashion enthusiast and home decor lover. Always on the lookout for unique finds!"
              readOnly
              className="mt-1.5 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
