'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ExternalLink, Clock, BookOpen, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/lib/contexts/language-context'
import { formatPrice } from '@/lib/utils'
import type { Course } from '@/lib/types'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const { t } = useLanguage()

  const handleEnroll = () => {
    window.open(course.affiliate_url, '_blank', 'noopener,noreferrer')
  }

  const getFormatIcon = () => {
    switch (course.format) {
      case 'video':
        return <Play className="h-3 w-3" />
      case 'pdf':
        return <BookOpen className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getDifficultyColor = () => {
    switch (course.difficulty_level) {
      case 'beginner':
        return 'bg-green-500'
      case 'intermediate':
        return 'bg-yellow-500'
      case 'advanced':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="card-hover overflow-hidden bg-card/50 backdrop-blur">
      <div className="relative">
        <Link href={`/course/${course.slug}`}>
          <Image
            src={course.cover_image}
            alt={course.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
        </Link>
        
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <Badge variant="secondary" className="flex items-center space-x-1">
            {getFormatIcon()}
            <span className="capitalize">{course.format}</span>
          </Badge>
          
          <div className={`w-3 h-3 rounded-full ${getDifficultyColor()}`} />
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{course.instructor}</p>
          <Link href={`/course/${course.slug}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:text-gold transition-colors">
              {course.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{course.duration}</span>
          <span>•</span>
          <span className="capitalize">{course.difficulty_level}</span>
        </div>

        {course.rating && (
          <div className="flex items-center space-x-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(course.rating!)
                      ? 'fill-gold text-gold'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({course.review_count})
            </span>
          </div>
        )}

        <p className="text-xs text-muted-foreground line-clamp-2">
          {course.short_blurb}
        </p>

        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gold">
            {formatPrice(course.displayed_price, course.currency)}
          </span>
          {course.old_price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(course.old_price, course.currency)}
            </span>
          )}
        </div>

        <Button 
          size="sm" 
          className="w-full"
          onClick={handleEnroll}
        >
          {course.format === 'pdf' ? t('action.get_book') : t('action.enroll')}
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>

        <div className="text-xs text-muted-foreground">
          {t('common.affiliate_badge')}
        </div>
      </CardContent>
    </Card>
  )
}
