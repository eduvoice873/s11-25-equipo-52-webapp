// components/RatingStars.tsx
import { Star } from "lucide-react"
import { theme } from "../theme"

interface RatingStarsProps {
  rating: number
  size?: number
  className?: string
}

export function RatingStars({ rating, size = 16, className = "" }: RatingStarsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1,2,3,4,5].map((n) => (
        <Star
          key={n}
          size={size}
          style={{
            color: theme.colors.yellow,
            fill: n <= rating ? theme.colors.yellow : "transparent"
          }}
          className={n <= rating ? "stroke-current" : "stroke-current opacity-40"}
        />
      ))}
    </div>
  )
}
