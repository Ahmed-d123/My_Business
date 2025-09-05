'use client'

import Link from 'next/link'
import { Search, Globe, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/contexts/language-context'

export function Header() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
              <span className="text-charcoal font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-gradient">WEIT</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/latest-picks" 
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              {t('nav.latest')}
            </Link>
            <Link 
              href="/collections" 
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              {t('nav.collections')}
            </Link>
            <Link 
              href="/courses-ebooks" 
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              {t('nav.courses')}
            </Link>
            <Link 
              href="/guides" 
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              {t('nav.guides')}
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              {t('nav.about')}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleLanguage}
            >
              <Globe className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>

            <Button variant="secondary" size="sm">
              {t('nav.join_vip')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
