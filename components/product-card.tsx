'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ExternalLink, Copy, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/lib/contexts/language-context'
import { formatPrice, copyToClipboard } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { t } = useLanguage()
  const { toast } = useToast()

  const handleCopyCoupon = async (code: string) => {
    try {
      await copyToClipboard(code)
      toast({
        title: "Coupon Copied!",
        description: `Code ${code} has been copied to your clipboard`,
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy the coupon code manually",
        variant: "destructive"
      })
    }
  }

  const handleGetDeal = () => {
    window.open(product.affiliate_url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card className="card-hover overflow-hidden bg-card/50 backdrop-blur">
      <div className="relative">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
        </Link>
        
        {product.discount_badge && (
          <Badge variant="success" className="absolute top-3 left-3">
            {product.discount_badge}
          </Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{product.merchant}</p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:text-gold transition-colors">
              {product.title}
            </h3>
          </Link>
        </div>

        {product.rating && (
          <div className="flex items-center space-x-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating!)
                      ? 'fill-gold text-gold'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.review_count})
            </span>
          </div>
        )}

        <p className="text-xs text-muted-foreground line-clamp-2">
          {product.short_blurb}
        </p>

        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gold">
            {formatPrice(product.displayed_price, product.currency)}
          </span>
          {product.old_price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.old_price, product.currency)}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleGetDeal}
          >
            {t('action.get_deal')}
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
          
          {product.coupon_code && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCoupon(product.coupon_code!)}
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          {t('common.affiliate_badge')}
        </div>
      </CardContent>
    </Card>
  )
}
