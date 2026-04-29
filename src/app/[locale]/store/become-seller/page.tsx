"use client"

import * as React from "react"
import { Button } from "@/features/store/components/ui/button"
import { Input } from "@/features/store/components/ui/input"
import { ShieldCheck, Rocket, Percent, CheckCircle2 } from "lucide-react"

export default function BecomeSellerPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 text-white relative z-10 flex items-center">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Benefits */}
        <div className="flex flex-col gap-6">
          <span className="text-gold font-medium uppercase tracking-widest text-sm">Join Our Community</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight text-white">
            Turn Your Craft Into a Global Business
          </h1>
          <p className="text-muted-foreground text-lg">
            Reach millions of premium shoppers looking for high-quality, handcrafted, and unique products.
          </p>

          <div className="flex flex-col gap-4 mt-4 text-muted-foreground">
            <div className="flex items-start gap-3">
              <Percent className="h-6 w-6 text-gold shrink-0 mt-1" />
              <div>
                <strong className="block text-white font-medium">Industry-Low Commissions</strong>
                Keep up to 95% of your earnings with fair pricing tiers.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-gold shrink-0 mt-1" />
              <div>
                <strong className="block text-white font-medium">Full Seller Protection</strong>
                Secure payouts and anti-fraud measures to keep your funds safe.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Rocket className="h-6 w-6 text-gold shrink-0 mt-1" />
              <div>
                <strong className="block text-white font-medium">Global Scaling Tools</strong>
                Hassle-free international shipping networks managed on your behalf.
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <CheckCircle2 className="h-16 w-16 text-gold fill-charcoal" />
              <h3 className="font-serif text-2xl font-bold text-white mt-2">Application Received!</h3>
              <p className="text-muted-foreground max-w-xs">
                Thank you for applying. Our onboarding specialists will review your store profile and email you within 2-3 business days.
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
              <h3 className="font-serif text-2xl font-semibold text-white mb-2">Application Form</h3>
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-white/70">Full Name</label>
                <Input required placeholder="John Doe" className="bg-white/5 border-white/10 text-white" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-white/70">Email Address</label>
                <Input required type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-white/70">Store Name</label>
                <Input required placeholder="Elegant Crafts Inc." className="bg-white/5 border-white/10 text-white" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-white/70">Primary Category</label>
                <Input required placeholder="Fashion, Jewelry, Home Decor..." className="bg-white/5 border-white/10 text-white" />
              </div>

              <Button type="submit" className="h-12 mt-4 bg-gold text-charcoal font-semibold hover:bg-gold/90 shadow-[0_4px_20px_rgba(212,175,55,0.2)] rounded-xl">
                Submit Application
              </Button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
