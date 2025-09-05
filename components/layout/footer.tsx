'use client'

import Link from 'next/link'
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/contexts/language-context'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-charcoal/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-charcoal font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-gradient">WEIT</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('footer.about_short')}
            </p>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gold">{t('footer.newsletter_title')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('footer.newsletter_subtitle')}
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
              />
              <Button size="sm" variant="secondary">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link href="/latest-picks" className="text-muted-foreground hover:text-gold transition-colors">
                {t('nav.latest')}
              </Link>
              <Link href="/collections" className="text-muted-foreground hover:text-gold transition-colors">
                {t('nav.collections')}
              </Link>
              <Link href="/courses-ebooks" className="text-muted-foreground hover:text-gold transition-colors">
                {t('nav.courses')}
              </Link>
              <Link href="/guides" className="text-muted-foreground hover:text-gold transition-colors">
                {t('nav.guides')}
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link href="/affiliate-disclosure" className="text-muted-foreground hover:text-gold transition-colors">
                Affiliate Disclosure
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 What Ever It Takes. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="icon">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
