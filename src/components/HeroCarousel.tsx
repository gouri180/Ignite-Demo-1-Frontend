import { useEffect, useState, useRef, useCallback } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import img1 from '../assets/img1.jpeg'
import img2 from '../assets/img2.jpeg'
import img3 from '../assets/img3.jpeg'
import img4 from '../assets/img4.jpeg'
import img6 from '../assets/img6.jpeg'
import img7 from '../assets/img7.jpeg'
import img8 from '../assets/img8.jpeg'

export interface CarouselSlide {
  id: number
  title: string
  subtitle: string
  tag: string
  image: string
}

const defaultSlides: CarouselSlide[] = [
  {
    id: 1,
    tag: 'ROBOTICS WORKSHOP',
    title: 'Hands-On Building',
    subtitle: 'Students designing and assembling advanced mechanical components and control systems in our specialized labs.',
    image: img1,
  },
  {
    id: 2,
    tag: 'AI INNOVATION',
    title: 'Intelligent Systems',
    subtitle: 'Developing advanced neural models and autonomous algorithms to tackle complex real-world challenges.',
    image: img2,
  },
  {
    id: 3,
    tag: 'HARDWARE HACKATHON',
    title: 'Rapid Prototyping',
    subtitle: 'Engineers collaborating live during 36 hours of non-stop innovation and circuit design.',
    image: img3,
  },
  {
    id: 4,
    tag: 'COMPETITION FINALE',
    title: 'Grand Showcase',
    subtitle: 'Teams presenting high-impact solutions to industry leaders and expert panels.',
    image: img4,
  },
  {
    id: 5,
    tag: 'MENTORSHIP LABS',
    title: 'Expert Guidance',
    subtitle: 'Direct feedback and technical direction from robotics pioneers and investors.',
    image: img6,
  },
  {
    id: 6,
    tag: 'EXCELLENCE AWARDS',
    title: 'Honoring Winners',
    subtitle: 'Celebrating outstanding engineering achievements and top cash prizes.',
    image: img7,
  },
  {
    id: 7,
    tag: 'COMMUNITY IMPACT',
    title: 'Igniting the Future',
    subtitle: 'Empowering next-generation architects of AI, IoT, and autonomous hardware.',
    image: img8,
  },
]

interface HeroCarouselProps {
  slides?: CarouselSlide[]
  autoPlayInterval?: number
}

export function HeroCarousel({ slides = defaultSlides, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const showSlide = useCallback(
    (index: number) => {
      setCurrent(() => {
        if (index < 0) return slides.length - 1
        if (index >= slides.length) return 0
        return index
      })
    },
    [slides.length]
  )

  const nextSlide = useCallback(() => {
    showSlide(current + 1)
  }, [current, showSlide])

  const prevSlide = useCallback(() => {
    showSlide(current - 1)
  }, [current, showSlide])

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startAutoPlay = useCallback(() => {
    stopAutoPlay()
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1 >= slides.length ? 0 : prev + 1))
    }, autoPlayInterval)
  }, [slides.length, autoPlayInterval, stopAutoPlay])

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [startAutoPlay, stopAutoPlay])

  const handleNextClick = () => {
    stopAutoPlay()
    nextSlide()
    startAutoPlay()
  }

  const handlePrevClick = () => {
    stopAutoPlay()
    prevSlide()
    startAutoPlay()
  }

  const handleDotClick = (index: number) => {
    stopAutoPlay()
    showSlide(index)
    startAutoPlay()
  }

  return (
    <div className="hero-carousel relative mx-auto w-full max-w-5xl py-6">
      {/* Main Slide Container */}
      <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-2xl">
        {slides.map((slide, i) => {
          const isActive = i === current
          return (
            <div
              key={slide.id}
              className={`showcase-slide absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? 'active opacity-100 scale-100 z-10 pointer-events-auto'
                  : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
            >
              {/* Full-Bleed Slide Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover object-center"
              />

              {/* Gradient tint overlay at bottom-left */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />

              {/* Frosted Glass Overlay Card (Bottom-Left) */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md lg:max-w-lg rounded-3xl border border-white/15 bg-[#121614]/90 sm:bg-[#121614]/40 p-6 sm:p-8 sm:backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <span className="font-orbitron text-xs font-bold tracking-widest text-[#84E325]">
                  {slide.tag}
                </span>

                <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {slide.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-gray-300">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          )
        })}

        {/* Overlaid Floating Arrow Buttons */}
        <button
          type="button"
          aria-label="Previous Slide"
          onClick={handlePrevClick}
          className="showcase-prev absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-[#84E325] hover:bg-[#84E325]/20 hover:text-[#84E325] cursor-pointer"
        >
          <FaChevronLeft className="text-sm" />
        </button>

        <button
          type="button"
          aria-label="Next Slide"
          onClick={handleNextClick}
          className="showcase-next absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-[#84E325] hover:bg-[#84E325]/20 hover:text-[#84E325] cursor-pointer"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>

      {/* Centered Pagination Dots (Below Main Box) */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {slides.map((_, index) => {
          const isActive = index === current
          return (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => handleDotClick(index)}
              className={`pagination-dot h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'active w-8 bg-[#84E325] shadow-[0_0_15px_rgba(132,227,37,0.9)]'
                  : 'w-2.5 bg-white/20 hover:bg-white/50'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
