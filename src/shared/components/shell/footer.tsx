"use client"

import { Icon } from "@iconify/react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

const SOCIAL_LINKS = [
  { icon: "mdi:instagram", href: "#", label: "Instagram" },
  { icon: "mdi:twitter",   href: "#", label: "Twitter" },
  { icon: "mdi:facebook",  href: "#", label: "Facebook" },
]

export function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="relative bg-background border-t border-primary/5 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand Info - Left Side (3/12) */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-8">
              <span className="font-serif text-2xl font-bold tracking-tighter text-foreground uppercase">
                {t("brandName")}<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed mb-8 max-w-[240px]">
              {t("brandDescription")}
            </p>
            <div className="flex gap-6">
              {SOCIAL_LINKS.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.label} className="text-muted-foreground/60 hover:text-primary transition-all duration-300 hover:-translate-y-1">
                  <Icon icon={social.icon} className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns - Center (6/12) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:gap-8">
              <div className="border-b border-primary/5 pb-10 sm:border-none sm:pb-0">
                <h4 className="font-serif text-[12px] font-bold uppercase tracking-[0.25em] text-foreground mb-8">
                  {t("sections.brand")}
                </h4>
                <ul className="space-y-5">
                  <li><Link href="#" className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 hover:text-primary transition-colors">{t("links.story")}</Link></li>
                  <li><Link href="#" className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 hover:text-primary transition-colors">{t("links.craftsmanship")}</Link></li>
                  <li><Link href="#" className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 hover:text-primary transition-colors">{t("links.philosophy")}</Link></li>
                </ul>
              </div>
              <div className="border-b border-primary/5 pb-10 sm:border-none sm:pb-0">
                <h4 className="font-serif text-[12px] font-bold uppercase tracking-[0.25em] text-foreground mb-8">
                  {t("sections.support")}
                </h4>
                <ul className="space-y-5">
                  <li><Link href="#" className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 hover:text-primary transition-colors">{t("links.helpCenter")}</Link></li>
                  <li><Link href="#" className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 hover:text-primary transition-colors">{t("links.shippingReturns")}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-serif text-[12px] font-bold uppercase tracking-[0.25em] text-foreground mb-8">
                  {t("sections.connect")}
                </h4>
                <ul className="space-y-5">
                  <li className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 leading-loose">
                    {t("links.hotline")}: <br/>
                    <span className="text-foreground font-semibold tracking-normal text-sm">{t("links.hotlineValue")}</span>
                  </li>
                  <li className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 leading-loose">
                    {t("links.email")}: <br/>
                    <span className="text-foreground font-semibold tracking-normal break-all">{t("links.emailValue")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter - Right Side (3/12) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-[12px] font-bold uppercase tracking-[0.25em] text-foreground mb-8">
              {t("sections.subscribe")}
            </h4>
            <p className="text-xs font-medium text-muted-foreground/60 mb-8 leading-relaxed">
              {t("newsletter.description")}
            </p>
            <div className="relative group">
              <div className="flex items-center p-1 bg-muted/30 border border-primary/10 rounded-full focus-within:bg-muted/50 focus-within:border-primary/30 transition-all duration-300">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="w-full bg-transparent border-none pl-5 pr-28 h-11 text-xs font-medium placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0"
                />
                <button className="absolute right-1 bg-foreground text-background h-9 px-5 rounded-full font-serif text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300">
                  {t("newsletter.button")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
