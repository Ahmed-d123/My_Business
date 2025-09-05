'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/contexts/language-context'

const messages = [
  { key: 'info.weekly_picks', duration: 4000 },
  { key: 'info.exclusive_discounts', duration: 4000 },
  { key: 'info.vip_access', duration: 4000 }
]

export function InfoBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, messages[currentIndex]?.duration || 4000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="bg-gold/10 border-b border-gold/20 py-2">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-gold font-medium">
            {t(messages[currentIndex]?.key)}
          </p>
        </div>
      </div>
    </div>
  )
}
