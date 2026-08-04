import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react'
import {
  FaBars,
  FaBriefcaseMedical,
  FaCheck,
  FaChevronDown,
  FaEnvelope,
  FaEye,
  FaGlobe,
  FaGraduationCap,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaNetworkWired,
  FaPhoneAlt,
  FaRocket,
  FaShareAlt,
  FaShieldAlt,
  FaTicketAlt,
  FaTimes,
  FaUserCheck,
  FaUsers,
  FaYoutube,
  FaTrophy,
  FaExclamationCircle,
} from 'react-icons/fa'

import igniteLogo from './assets/ignite 2.0 - logo.png'
import ihubLogo from './assets/ihub logo.png'
import ihubResearchLogo from './assets/I HUB RESEARCH AND ROBOICS PVT LTD.png'
import { VantaTopologyHero } from './components/VantaTopologyHero'
import { HeroCarousel } from './components/HeroCarousel'

// Uses VITE_API_URL when set (e.g. on Vercel), falls back to localhost for local dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

function Reveal({ children, className = '', delay = 0, id }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  )
}

function FireflyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Firefly {
      x = 0
      y = 0
      radius = 1
      speedX = 0
      speedY = 0
      alpha = 1
      alphaSpeed = 0.01

      constructor() {
        this.reset()
      }

      reset() {
        if (!canvas) return
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 2 + 0.8
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.alpha = Math.random() * 0.7 + 0.2
        this.alphaSpeed = Math.random() * 0.015 + 0.005
      }

      update() {
        if (!canvas) return
        this.x += this.speedX
        this.y += this.speedY
        this.alpha += this.alphaSpeed

        if (this.alpha >= 0.9 || this.alpha <= 0.1) {
          this.alphaSpeed = -this.alphaSpeed
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset()
        }
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha))
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#84E325'
        ctx.shadowColor = '#84E325'
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.restore()
      }
    }

    const fireflies = Array.from({ length: 45 }, () => new Firefly())
    let animationFrameId = 0

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      fireflies.forEach((firefly) => {
        firefly.update()
        firefly.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-40" />
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  const timeUnits = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.55 }}
      className="mt-10 mx-auto w-full max-w-md rounded-2xl border border-[#84E325]/30 bg-[#061008]/80 p-4 shadow-[0_0_30px_rgba(132,227,37,0.15)] backdrop-blur-xl"
    >
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#84E325] opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#84E325]"></span>
        </span>
        <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#84E325] truncate">
          Registration Closes Sep 5, 2026
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 sm:p-2.5"
          >
            <span className="font-orbitron text-xl sm:text-2xl font-black text-white drop-shadow-[0_0_10px_rgba(132,227,37,0.4)]">
              {unit.value}
            </span>
            <span className="font-orbitron mt-1 text-[8px] sm:text-[9px] font-bold tracking-widest text-[#9EB09E]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [registeredSuccess, setRegisteredSuccess] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Registration Form State
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    email: '',
    phone: '',
    members: '1',
    category: 'School Student',
    institutionName: '',
  })

  const [teamMembers, setTeamMembers] = useState([
    { name: '', phone: '', email: '' },
    { name: '', phone: '', email: '' },
    { name: '', phone: '', email: '' }
  ])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(raf)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    frame = window.requestAnimationFrame(raf)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      lenis.destroy()
    }
  }, [])

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeIdeaTab, setActiveIdeaTab] = useState<'participate' | 'objective'>('participate')

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'IGNITE 25', href: '#showcase' },
    { label: 'Contact Us', href: '#contact' },
  ]

  const faqs = [
    {
      q: 'Who can participate in IGNITE 2.0?',
      a: 'IGNITE 2.0 is open to all school and college students, developers, researchers, and tech enthusiasts. Teams can consist of 1 to 4 members.',
    },
    {
      q: 'What kind of projects are expected?',
      a: 'We welcome working software applications, AI/ML models, IoT systems, and robotics hardware prototypes across Healthcare, Education, Defense, Space, and Environment domains.',
    },
    {
      q: 'Will certificates be provided?',
      a: 'Yes, participation certificates will be provided to all attendees.',
    },
    {
      q: 'What is the registration fee?',
      a: 'The registration fee is ₹499 per team of 1-4 members covering Round 01 evaluation and finale entry.',
    },
    {
      q: 'When is the grand finale scheduled to take place?',
      a: 'The final round of the competition is currently scheduled to take place by the end of September. Exact dates and detailed itineraries will be communicated to all shortlisted teams well in advance.',
    },
    {
      q: 'What is the designated venue for the ideathon finale?',
      a: 'The grand finale will be hosted in the vibrant city of Kochi. Comprehensive details regarding the specific venue and accommodations will be shared with the finalists closer to the event date.',
    },
  ]

  const domains = [
    {
      title: 'Healthcare',
      description: 'Create intelligent solutions that improve healthcare accessibility, diagnosis, patient monitoring, treatment, safety, and care.',
      icon: FaBriefcaseMedical,
      tag: 'MED-TECH',
    },
    {
      title: 'Education',
      description: 'Reimagine learning through innovative technologies that make education more accessible, personalized, interactive, and effective.',
      icon: FaGraduationCap,
      tag: 'EDU-TECH',
    },
    {
      title: 'Defence',
      description: 'Develop technology-driven ideas focused on security, surveillance, safety, communication, automation, and operational efficiency.',
      icon: FaShieldAlt,
      tag: 'DEF-TECH',
    },
    {
      title: 'Space Technology',
      description: 'Explore futuristic solutions in space exploration, satellite tech, communication, monitoring, and advanced research.',
      icon: FaRocket,
      tag: 'AERO & SPACE',
    },
    {
      title: 'Tribal Communities & Development',
      description: 'Build inclusive, sustainable solutions addressing challenges in education, healthcare, livelihood, accessibility, and development.',
      icon: FaGlobe,
      tag: 'SOCIAL IMPACT',
    },
  ]

  const journeySteps = [
    {
      num: '1',
      title: 'Register Team',
      desc: 'Form your team of 2-5 members and sign up.',
    },
    {
      num: '2',
      title: 'Submission',
      desc: 'Submit your idea solution to shortlist teams for the final round.',
    },
    {
      num: '3',
      title: 'Shortlisting',
      desc: 'Top selected teams get invited to the 36-hour onsite hackathon.',
    },
    {
      num: '4',
      title: 'Grand Finale',
      desc: 'Build, test & present your prototype to judges and investors.',
    },
  ]

  const handleReturnToHome = () => {
    setIsRegisterOpen(false)
    setRegisteredSuccess(false)
    setFormError(null)

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.8 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    setTimeout(() => {
      setAcceptedTerms(false)
      setFormStep(1)
      setFormData({
        teamName: '',
        leaderName: '',
        email: '',
        phone: '',
        members: '1',
        category: 'School Student',
        institutionName: '',
      })
      setTeamMembers([
        { name: '', phone: '', email: '' },
        { name: '', phone: '', email: '' },
        { name: '', phone: '', email: '' }
      ])
    }, 600)
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!formData.leaderName.trim() || !formData.email.trim()) {
      setFormError('Leader Name and email are required.')
      return
    }

    setIsSubmitting(true)

    const membersCount = parseInt(formData.members, 10) || 1;
    const activeTeamMembers = teamMembers.slice(0, membersCount - 1);

    const payload = {
      teamName: formData.teamName,
      leaderName: formData.leaderName,
      email: formData.email,
      phone: formData.phone,
      members: formData.members,
      teamMembers: activeTeamMembers,
      category: formData.category,
      institutionName: formData.institutionName
    }

    let responseData: { success?: boolean; message?: string } | null = null;

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const text = await res.text()
      try {
        responseData = JSON.parse(text)
      } catch (jErr) {
        // Response wasn't valid JSON
      }
    } catch (err) {
      setIsSubmitting(false)
      setFormError('Could not reach the registration server. Please check your connection and try again.')
      return
    }

    if (responseData && responseData.success === false) {
      setIsSubmitting(false)
      setFormError(responseData.message || 'Registration failed. Please check your details.')
      return
    }

    try {
      const orderRes = await fetch(`${API_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, amount: 499 })
      })
      const orderData = await orderRes.json()

      if (!orderData.success) {
        setIsSubmitting(false)
        setFormError(orderData.message || 'Could not start payment. Please try again.')
        return
      }

      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'IGNITE 2.0',
        description: 'Registration Fee',
        order_id: orderData.order.id,
        prefill: {
          name: formData.leaderName,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#84E325' },
        handler: async function (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) {
          try {
            const verifyRes = await fetch(`${API_URL}/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: formData.email,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            })
            const verifyData = await verifyRes.json()
            if (verifyData.success) {
              setFormError(null)
              setRegisteredSuccess(true)
            } else {
              setFormError('Payment could not be verified. Please contact support with your payment ID.')
            }
          } catch {
            setFormError('Payment verification failed. Please contact support.')
          } finally {
            setIsSubmitting(false)
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false)
          }
        }
      }

      // @ts-expect-error Razorpay is loaded globally via checkout.js script tag
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch {
      setIsSubmitting(false)
      setFormError('Could not start payment. Please check your connection and try again.')
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#030706] text-[#F0F5F0] selection:bg-[#84E325] selection:text-[#030706]">
      <FireflyBackground />

      {/* HEADER / NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-6 sm:pt-4 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 sm:gap-4">
          <nav
            className={`flex flex-1 items-center justify-between rounded-full border border-white/10 bg-[#09100a]/80 px-2 py-1.5 sm:px-4 sm:py-2.5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${isScrolled ? 'border-[#84E325]/30 bg-[#060c07]/90' : ''
              }`}
          >
            {/* Logo */}
            <a href="#home" className="flex items-center group">
              <img
                src={igniteLogo}
                alt="IGNITE 2.0"
                className="h-8 sm:h-11 md:h-12 w-auto max-w-[140px] sm:max-w-none object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Nav Links */}
            <div className="hidden flex-1 items-center justify-center gap-6 lg:gap-10 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8C4B8] transition-colors hover:text-[#84E325]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/Ignite2.0 Prospectus.pdf"
                download
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8C4B8] transition-colors hover:text-[#84E325]"
              >
                INSTRUCTION
              </a>
            </div>

            {/* Register Team Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className="hidden sm:block glow-lime-btn rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                Register Team
              </button>

              <button
                type="button"
                aria-label="Toggle Menu"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#84E325] hover:text-[#84E325] md:hidden shrink-0"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </nav>

          {/* IHUB Logo - Top Right (Disappears on Scroll) */}
          <div
            className={`shrink-0 transition-all duration-500 ease-in-out ${isScrolled
              ? 'opacity-0 scale-95 pointer-events-none -translate-y-2 max-w-0 overflow-hidden'
              : 'opacity-100 scale-100 max-w-[220px]'
              }`}
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center transition-transform duration-300 hover:scale-105">
              <img
                src={ihubLogo}
                alt="IHUB Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto mt-2 max-w-7xl rounded-2xl border border-[#84E325]/20 bg-[#09100a]/95 p-4 text-center backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C0CEC0] hover:text-[#84E325]"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/Ignite2.0 Prospectus.pdf"
                  download
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C0CEC0] hover:text-[#84E325]"
                >
                  INSTRUCTION
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsRegisterOpen(true)
                  }}
                  className="mt-2 w-full glow-lime-btn rounded-full py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer md:hidden"
                >
                  Register Team
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="home" className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center sm:px-6 lg:px-8">
          {/* Topology 3D Background */}
          <div className="hidden md:block absolute inset-0 opacity-40">
            <VantaTopologyHero />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl py-12">
            {/* iHub Logo and Presents */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 flex flex-col items-center justify-center"
            >
              <img src={ihubLogo} alt="iHub School of Learning" className="mb-4 h-16 w-auto object-contain" />
              <p className="font-orbitron text-sm font-semibold tracking-[0.3em] text-[#A8BAA8] uppercase">
                Presents
              </p>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-orbitron text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-9xl"
            >
              IGNITE <span className="text-[#84E325] drop-shadow-[0_0_35px_rgba(132,227,37,0.6)]">2.0</span>
            </motion.h1>

            {/* Subtitle Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-4 text-xl font-bold tracking-[0.15em] text-[#84E325] sm:text-2xl lg:text-3xl"
            >
              Think. Build. Ignite the Future.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mx-auto mt-6 max-w-3xl text-base text-[#A8BAA8] sm:text-lg lg:text-xl leading-relaxed"
            >
              The definitive AI & Robotics hackathon for the next generation of engineers.<br className="hidden sm:block" />
              Solve real-world challenges through cutting-edge automation and intelligent systems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className="glow-lime-btn rounded-full px-8 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] cursor-pointer"
              >
                REGISTER TEAM
              </button>

              <a
                href="#ideas"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 hover:border-[#84E325] hover:bg-[#84E325]/10 hover:text-[#84E325]"
              >
                EXPLORE EVENT
              </a>
            </motion.div>

            {/* Countdown Timer */}
            <CountdownTimer targetDate="2026-09-05T23:59:59+05:30" />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-24 flex flex-col justify-center min-h-[85vh]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <Reveal>
              <div>
                <span className="inline-block rounded-full border border-[#84E325]/30 bg-[#84E325]/10 px-3.5 py-1 font-orbitron text-[10px] font-bold tracking-widest text-[#84E325]">
                  ABOUT IGNITE 2.0
                </span>
                <h2 className="mt-4 font-bold tracking-tight text-[#84E325] drop-shadow-[0_0_15px_rgba(132,227,37,0.3)] leading-tight">
                  <div className="text-3xl sm:text-4xl lg:text-5xl mb-1 sm:mb-2">
                    <span className="text-white">IGNITE 2.0</span> – AI & Robotics
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl">
                    Ideathon
                  </div>
                </h2>
                <p className="font-orbitron mt-3 font-bold tracking-wide text-[#84E325]">
                  Think. Build. Ignite the Future.
                </p>
                {/* Description Paragraphs */}
                <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-white sm:text-base">
                  <p>
                    IGNITE 2.0 is a national-level innovation platform organized by I HUB School of Learning (IHSL), designed to bring together creative minds, problem-solvers, and aspiring innovators from across India. The ideathon challenges undergraduate and postgraduate students to identify real-world problems and develop innovative solutions using Artificial Intelligence, Robotics, and emerging technologies.
                  </p>
                  <p>
                    Through a two-stage competition, participants get the opportunity to present their ideas, receive expert feedback, and transform bold concepts into impactful solutions. The journey culminates in an offline Grand Finale in Kochi, Kerala, where the most promising ideas compete for recognition and exciting prizes.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Key Specifications */}
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full content-center max-w-[320px] sm:max-w-[400px] mx-auto">
                {[
                  { label: 'TEAM SIZE', value: '1 - 4 Members', icon: FaUsers },
                  { label: 'REG. FEE', value: '₹499 / Team', icon: FaTicketAlt },
                  { label: 'ELIGIBILITY', value: 'Open To All', icon: FaUserCheck },
                  { label: 'VENUE', value: 'Kochi', icon: FaMapMarkerAlt },
                ].map((stat) => {
                  const IconComponent = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="glow-card flex flex-col items-center justify-center text-center gap-3 aspect-square rounded-3xl p-4 border border-[#84E325]/20 bg-[#09140a] shadow-[0_0_20px_rgba(132,227,37,0.05)] transition-all duration-300 hover:scale-[1.08] hover:bg-[#84E325]/10 hover:border-[#84E325]/50 hover:shadow-[0_0_40px_rgba(132,227,37,0.25)]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#84E325]/30 bg-[#84E325]/10 text-[#84E325]">
                        <IconComponent className="text-lg" />
                      </div>
                      <div>
                        <p className="font-orbitron text-[9px] sm:text-[10px] font-semibold tracking-widest text-[#84E325]">
                          {stat.label}
                        </p>
                        <p className="text-sm sm:text-base font-bold text-white mt-1">{stat.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* PRIZE POOL SECTION */}
        <section className="relative mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Reveal>
            <div className="group relative z-10 mx-auto rounded-3xl border border-[#84E325]/10 bg-gradient-to-br from-[#84E325]/5 to-transparent p-8 sm:p-10 text-center backdrop-blur-md shadow-[0_0_30px_rgba(132,227,37,0.05)] transition-all duration-500 hover:border-emerald-500/20 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#84E325]/20 bg-[#84E325]/10 px-4 py-1.5 font-orbitron text-[10px] sm:text-xs font-bold tracking-widest text-[#84E325] transition-colors duration-500 group-hover:border-emerald-500/30">
                <FaTrophy className="text-sm" />
                PRIZE POOL
              </div>

              <h3 className="mt-5 text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-wide drop-shadow-sm">
                Innovation Deserves Recognition
              </h3>

              <div className="mt-5 flex justify-center relative">
                <div className="absolute inset-0 bg-emerald-500 blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 rounded-full scale-125"></div>

                <motion.h2
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                  className="relative font-orbitron text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#84E325] to-emerald-400 drop-shadow-[0_0_15px_rgba(132,227,37,0.2)] leading-none transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  ₹10,000
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 flex justify-center relative z-20"
              >
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(true)}
                  className="glow-lime-btn rounded-full px-8 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] cursor-pointer"
                >
                  REGISTER NOW
                </button>
              </motion.div>
            </div>
          </Reveal>
        </section>

        {/* HERO SHOWCASE CAROUSEL */}
        <section id="showcase" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 scroll-mt-24 flex flex-col justify-center min-h-[85vh]">
          <Reveal className="mb-12 flex flex-col items-center justify-center text-center">
            <div className="relative">
              {/* Huge Faint Background Text */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[4.5rem] font-black tracking-widest text-white/[0.03] sm:text-[6rem] md:text-[8rem] pointer-events-none font-orbitron">
                MEMORIES
              </div>

              <div className="relative z-10">
                <span className="mb-3 block font-orbitron text-xs font-bold uppercase tracking-[0.3em] text-[#84E325]">
                  Flashbacks
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Highlights of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#84E325] to-emerald-400 drop-shadow-[0_0_15px_rgba(132,227,37,0.4)]">IGNITE '25</span>
                </h2>
              </div>
            </div>
            {/* Elegant glowing underline */}
            <div className="mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#84E325] to-transparent shadow-[0_0_15px_rgba(132,227,37,0.5)]" />
          </Reveal>
          <Reveal>
            <HeroCarousel />
          </Reveal>
        </section>

        {/* IDEAS, ELIGIBILITY & WHY PARTICIPATE - PRO LAYOUT */}
        <section id="ideas" className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#84E325]/[0.03] blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-20 lg:flex-row lg:items-start lg:justify-between lg:gap-12">

            {/* LEFT SIDE: Header & Eligibility */}
            <div className="lg:sticky lg:top-32 lg:w-[45%]">
              <Reveal>
                <h2 className="text-4xl font-extrabold tracking-tighter text-white sm:text-6xl lg:text-[4.5rem] lg:leading-[1.05]">
                  Ideas have the <br className="hidden lg:block" /> power to <br className="hidden lg:block" />
                  <span className="bg-gradient-to-r from-[#84E325] to-[#5fd323] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(132,227,37,0.3)]">
                    create change.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-md text-base font-medium leading-relaxed text-[#9EB09E] sm:text-lg">
                  IGNITE 2.0 is more than a competition; it’s a launchpad for visionary minds to turn theoretical concepts into practical applications.
                </p>
              </Reveal>

              {/* Eligibility (Borderless, Inline) */}
              <Reveal delay={0.2}>
                <div className="mt-16 border-t border-white/5 pt-12">
                  <div className="mb-8 flex items-center gap-3">
                    <FaUsers className="text-xl text-[#84E325]" />
                    <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-white">OPEN TO ALL CREATORS</span>
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {['UG & PG Students', 'Creative Thinkers', 'Tech Enthusiasts', 'Researchers'].map((tag) => (
                      <div key={tag} className="group flex cursor-pointer items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#84E325]/30 transition-colors group-hover:bg-[#84E325] group-hover:shadow-[0_0_10px_rgba(132,227,37,0.8)]" />
                        <span className="text-sm font-semibold text-[#8A9A8A] transition-colors group-hover:text-white">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT SIDE: Pillars & Perks (Sliding Tabs) */}
            <div className="flex w-full flex-col lg:w-[50%] lg:pt-4 overflow-hidden min-h-[500px]">

              {/* Tab Toggle Switch */}
              <Reveal delay={0.3}>
                <div className="relative mb-10 flex w-fit rounded-full bg-white/5 p-1 backdrop-blur-md border border-white/10">
                  <div
                    className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#84E325]/20 border border-[#84E325]/30 shadow-[0_0_15px_rgba(132,227,37,0.2)] transition-all duration-300 ease-out ${activeIdeaTab === 'participate' ? 'translate-x-0' : 'translate-x-[102%]'
                      }`}
                  />
                  <button
                    onClick={() => setActiveIdeaTab('participate')}
                    className={`relative z-10 px-6 py-2.5 font-orbitron text-[10px] sm:text-xs font-bold tracking-[0.2em] transition-colors duration-300 ${activeIdeaTab === 'participate' ? 'text-[#84E325]' : 'text-white/60 hover:text-white'
                      }`}
                  >
                    WHY PARTICIPATE
                  </button>
                  <button
                    onClick={() => setActiveIdeaTab('objective')}
                    className={`relative z-10 px-6 py-2.5 font-orbitron text-[10px] sm:text-xs font-bold tracking-[0.2em] transition-colors duration-300 ${activeIdeaTab === 'objective' ? 'text-[#84E325]' : 'text-white/60 hover:text-white'
                      }`}
                  >
                    THE OBJECTIVE
                  </button>
                </div>
              </Reveal>

              {/* Tab Content Container */}
              <div className="relative w-full">
                <AnimatePresence mode="wait">
                  {activeIdeaTab === 'participate' ? (
                    <motion.div
                      key="participate"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="grid gap-x-8 gap-y-12 sm:grid-cols-2"
                    >
                      {[
                        { title: 'Test Ideas', desc: 'Work with mentors on real-world problems.', icon: FaShareAlt },
                        { title: 'Showcase', desc: 'Gain feedback & credibility from investors.', icon: FaEye },
                        { title: 'Network', desc: 'Expand your network in the AI ecosystem.', icon: FaNetworkWired },
                      ].map((item) => {
                        const Icon = item.icon
                        return (
                          <div key={item.title} className="group flex flex-col items-start">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#84E325]/10 to-transparent text-[#84E325] ring-1 ring-white/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#84E325]/20 group-hover:text-[#84E325] group-hover:ring-[#84E325]/50 group-hover:shadow-[0_0_25px_rgba(132,227,37,0.25)]">
                              <Icon className="text-xl" />
                            </div>
                            <h4 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#84E325]">
                              {item.title}
                            </h4>
                            <p className="text-sm leading-relaxed text-[#9EB09E]">
                              {item.desc}
                            </p>
                          </div>
                        )
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="objective"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col"
                    >
                      {[
                        { num: '01', title: 'Identify Problems', desc: 'Focus on high-impact, real-world problems in industry and society, that automation can solve.' },
                        { num: '02', title: 'Engineer Solutions', desc: 'Conceptualize intelligent systems that leverage robotics and AI at the core.' },
                        { num: '03', title: 'Create an Impact', desc: 'Build prototypes that have the potential to scale and redefine human productivity.' },
                      ].map((pillar) => (
                        <div key={pillar.num} className="group border-b border-white/5 py-10 first:pt-0 transition-colors hover:border-[#84E325]/30">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
                            <span className="font-orbitron text-4xl font-black text-white/[0.03] transition-colors group-hover:text-[#84E325]/20">
                              {pillar.num}
                            </span>
                            <div>
                              <h4 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-[#84E325]">
                                {pillar.title}
                              </h4>
                              <p className="text-sm leading-relaxed text-[#9EB09E]">
                                {pillar.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>    </div>
        </section>

        {/* COMPETITION DOMAINS */}
        <section id="domains" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Competition Domains
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#9EB09E]">
              Choose from 5 specialized tracks engineered to tackle critical technological frontiers.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {domains.map((domain, idx) => {
              const Icon = domain.icon
              return (
                <Reveal key={domain.title} delay={idx * 0.08} className="h-full">
                  <div className="group flex h-full flex-col items-center justify-start rounded-3xl p-4 transition-all duration-75 ease-out will-change-transform hover:-translate-y-4 hover:scale-[1.12] hover:bg-[#fffdf5]/5 hover:shadow-[0_15px_40px_-10px_rgba(255,253,245,0.25)]">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#84E325]/30 bg-[#84E325]/10 text-[#84E325] transition-all duration-75 ease-out group-hover:scale-110 group-hover:border-[#fffdf5] group-hover:bg-[#fffdf5]/15 group-hover:text-[#fffdf5] group-hover:shadow-[0_0_30px_rgba(255,253,245,0.6)]">
                      <Icon className="text-2xl" />
                    </div>
                    <span className="mt-4 inline-block font-orbitron text-[11px] font-bold tracking-widest text-[#84E325]">
                      {domain.tag}
                    </span>
                    <h3 className="mt-2 min-h-[5.5rem] flex items-center justify-center text-center text-xl font-bold text-white transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                      {domain.title}
                    </h3>
                    <p className="mt-2 flex-1 text-center text-sm leading-relaxed text-[#9EB09E]">
                      {domain.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* IGNITE JOURNEY (TIMELINE) */}
        <section id="journey" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              IGNITE Journey
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#9EB09E]">
              Step-by-step roadmap from registration to the grand 36-hour finale.
            </p>
          </Reveal>

          {/* Timeline Flowchart */}
          <div className="relative mt-16">

            {/* Desktop Flowchart (S-Curve Wave) */}
            <div className="hidden md:grid grid-cols-4 relative h-[450px]">
              {/* The SVG Wave Path */}
              <svg className="absolute left-0 top-1/2 w-full -translate-y-1/2 h-[200px] drop-shadow-[0_0_15px_rgba(132,227,37,0.3)]" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="3">
                <path className="text-[#84E325]/50" d="M 0,100 Q 150,0 300,100 T 600,100 T 900,100 T 1200,100" />
              </svg>

              {journeySteps.map((step, idx) => {
                const isPeak = idx % 2 === 0;
                return (
                  <Reveal key={step.num} delay={idx * 0.1}>
                    <div className="group relative h-full w-full cursor-pointer">

                      {/* Hexagon Node on the Wave */}
                      <div className={`absolute left-1/2 z-20 -translate-x-1/2 transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_rgba(132,227,37,0.8)] ${isPeak ? 'top-[calc(50%-50px)] -translate-y-1/2' : 'top-[calc(50%+50px)] -translate-y-1/2'}`}>
                        {/* Outer Glow / Border */}
                        <div className="flex h-14 w-16 items-center justify-center bg-gradient-to-b from-[#84E325] to-[#1a2e1f] transition-all duration-500 group-hover:from-[#84E325] group-hover:to-[#84E325]" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                          {/* Inner Fill */}
                          <div className="flex h-[52px] w-[60px] items-center justify-center bg-[#09140a] group-hover:bg-[#84E325] transition-colors duration-500" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                            <span className="font-orbitron text-lg font-bold text-white group-hover:text-black transition-colors">{step.num}</span>
                          </div>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className={`absolute left-1/2 w-[120%] -translate-x-1/2 px-2 text-center transition-all duration-500 group-hover:scale-105 ${isPeak ? 'top-[calc(50%+30px)] group-hover:top-[calc(50%+35px)]' : 'bottom-[calc(50%+30px)] group-hover:bottom-[calc(50%+35px)]'}`}>



                        <div className="relative z-10 flex flex-col text-center">
                          {/* Abstract Pro UI Background for Grand Finale */}
                          {idx === 3 && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full min-w-[250px] min-h-[150px] pointer-events-none z-[-1]">
                              {/* Animated gradient mesh */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-[#84E325]/5 to-transparent rounded-full blur-2xl transition-all duration-700 group-hover:w-64 group-hover:h-64 group-hover:bg-[#84E325]/10 group-hover:blur-2xl animate-pulse"></div>
                              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#84E325]/0 rounded-full blur-xl transition-all duration-1000 delay-100 group-hover:w-48 group-hover:h-48 group-hover:bg-[#84E325]/5"></div>

                              {/* Abstract geometric accents */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] border-[0.5px] border-[#84E325]/0 rounded-full transition-all duration-500 group-hover:border-[#84E325]/10 group-hover:scale-125 group-hover:rotate-12 border-dashed"></div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] border-[0.5px] border-[#84E325]/0 rounded-full transition-all duration-700 delay-75 group-hover:border-[#84E325]/5 group-hover:scale-110 group-hover:-rotate-12"></div>

                              {/* Trophy watermark that magnifies behind text */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 transition-all duration-1000 ease-out group-hover:opacity-10 group-hover:scale-[2.5] pointer-events-none">
                                <FaTrophy className="h-24 w-24 text-[#84E325]" />
                              </div>
                            </div>
                          )}

                          <span className="mb-2 block font-orbitron text-[10px] font-bold tracking-widest text-[#84E325]">
                            PHASE 0{idx + 1}
                          </span>
                          <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#84E325]">{step.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-[#9EB09E] max-w-[220px] mx-auto transition-colors duration-300 group-hover:text-white/80">{step.desc}</p>
                        </div>
                      </div>

                    </div>
                  </Reveal>
                )
              })}
            </div>

            {/* Mobile Flowchart (Vertical) */}
            <div className="relative ml-4 space-y-12 border-l-2 border-[#84E325]/30 py-4 pl-8 md:hidden">
              {journeySteps.map((step, idx) => (
                <Reveal key={step.num} delay={idx * 0.1}>
                  <div className="group relative cursor-pointer">

                    {/* Hexagon Node */}
                    <div className="absolute -left-[48px] top-2 z-20 transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_rgba(132,227,37,0.8)]">
                      <div className="flex h-10 w-12 items-center justify-center bg-gradient-to-b from-[#84E325] to-[#1a2e1f] transition-all duration-500 group-hover:from-[#84E325] group-hover:to-[#84E325]" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                        <div className="flex h-[36px] w-[44px] items-center justify-center bg-[#09140a] group-hover:bg-[#84E325] transition-colors duration-500" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                          <span className="font-orbitron text-sm font-bold text-white group-hover:text-black transition-colors">{step.num}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card */}
                    <div className="relative p-2 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-105">
                      {/* Massive Background Number */}
                      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-[6rem] font-black text-white/[0.03] transition-colors duration-500 group-hover:text-[#84E325]/10 pointer-events-none font-orbitron select-none">
                        {step.num}
                      </div>

                      <div className="relative z-10">
                        <span className="mb-2 block font-orbitron text-[10px] font-bold tracking-widest text-[#84E325]">
                          PHASE 0{idx + 1}
                        </span>
                        <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-white/90">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#9EB09E] transition-colors duration-300 group-hover:text-white/70">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHY PARTICIPATE AND IDEAS ARE NOW BLENDED ABOVE */}

        {/* CTA BANNER */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-[#84E325]/40 bg-gradient-to-b from-[#09140a] to-[#040804] p-8 text-center sm:p-12 shadow-[0_0_50px_rgba(132,227,37,0.15)]">
              <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#84E325]/20 blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  Ready to Ignite Your Innovation?
                </h2>

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(true)}
                    className="glow-lime-btn rounded-full px-9 py-4 text-xs font-extrabold uppercase tracking-[0.2em] cursor-pointer"
                  >
                    Register Your Team
                  </button>
                </div>

                {/* Footer specs inside CTA */}
                <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
                  <div>
                    <p className="font-orbitron text-[10px] font-semibold text-[#84E325]">
                      VENUE LOCATION
                    </p>
                    <p className="mt-1 text-xs font-bold text-white">Kochi</p>
                  </div>
                  <div>
                    <p className="font-orbitron text-[10px] font-semibold text-[#84E325]">
                      REGISTRATION FEE
                    </p>
                    <p className="mt-1 text-xs font-bold text-white">₹499</p>
                  </div>
                  <div>
                    <p className="font-orbitron text-[10px] font-semibold text-[#84E325]">
                      TEAM SIZE
                    </p>
                    <p className="mt-1 text-xs font-bold text-white">1 - 4 Members</p>
                  </div>
                  <div>
                    <p className="font-orbitron text-[10px] font-semibold text-[#84E325]">
                      PRIZE POOL
                    </p>
                    <p className="mt-1 text-xs font-bold text-white">₹10,000</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* F.A.Q SECTION */}
        <section id="faq" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-[#84E325]/10 blur-[80px] pointer-events-none rounded-full"></div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-[0_0_15px_rgba(132,227,37,0.3)]">
                <span className="text-[#84E325]">F.A.Qs</span>
              </h2>
              <p className="mt-4 text-sm text-[#8A9A8A] font-medium tracking-widest uppercase font-orbitron">Everything you need to know about IGNITE 2.0</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto relative z-10">
              {/* Left Column (0, 1, 2) */}
              <div className="space-y-6">
                {faqs.slice(0, 3).map((faq, idx) => {
                  const globalIdx = idx;
                  const isOpen = openFaq === globalIdx;
                  return (
                    <div
                      key={faq.q}
                      onClick={() => setOpenFaq(isOpen ? null : globalIdx)}
                      className={`group cursor-pointer rounded-3xl border transition-all duration-500 overflow-hidden ${isOpen ? 'border-[#84E325]/40 bg-gradient-to-b from-[#84E325]/10 to-[#0a110b]/80 shadow-[0_10px_40px_-10px_rgba(132,227,37,0.15)]' : 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]'} backdrop-blur-xl`}
                    >
                      <div className="p-6 sm:p-8 flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <h3 className={`text-base font-bold sm:text-lg transition-colors duration-300 ${isOpen ? 'text-[#84E325]' : 'text-white group-hover:text-white/90'}`}>
                            {faq.q}
                          </h3>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                              >
                                <p className="mt-4 text-sm leading-relaxed text-[#A0B0A0]">
                                  {faq.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${isOpen ? 'border-[#84E325]/30 bg-[#84E325]/10 text-[#84E325] rotate-180 shadow-[0_0_15px_rgba(132,227,37,0.3)]' : 'border-white/10 bg-white/5 text-white/50 group-hover:bg-white/10'}`}>
                          <FaChevronDown className="text-sm" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Right Column (3, 4, 5) */}
              <div className="space-y-6">
                {faqs.slice(3, 6).map((faq, idx) => {
                  const globalIdx = idx + 3;
                  const isOpen = openFaq === globalIdx;
                  return (
                    <div
                      key={faq.q}
                      onClick={() => setOpenFaq(isOpen ? null : globalIdx)}
                      className={`group cursor-pointer rounded-3xl border transition-all duration-500 overflow-hidden ${isOpen ? 'border-[#84E325]/40 bg-gradient-to-b from-[#84E325]/10 to-[#0a110b]/80 shadow-[0_10px_40px_-10px_rgba(132,227,37,0.15)]' : 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]'} backdrop-blur-xl`}
                    >
                      <div className="p-6 sm:p-8 flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <h3 className={`text-base font-bold sm:text-lg transition-colors duration-300 ${isOpen ? 'text-[#84E325]' : 'text-white group-hover:text-white/90'}`}>
                            {faq.q}
                          </h3>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                              >
                                <p className="mt-4 text-sm leading-relaxed text-[#A0B0A0]">
                                  {faq.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${isOpen ? 'border-[#84E325]/30 bg-[#84E325]/10 text-[#84E325] rotate-180 shadow-[0_0_15px_rgba(132,227,37,0.3)]' : 'border-white/10 bg-white/5 text-white/50 group-hover:bg-white/10'}`}>
                          <FaChevronDown className="text-sm" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </section>

        {/* GET IN TOUCH SECTION */}
        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[3rem] border border-white/10 bg-white/[0.02] p-8 md:p-16 backdrop-blur-md">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  Get in Touch
                </h2>
                <p className="mt-4 text-[#9EB09E]">Have more questions? Reach out to us!</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto text-left">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                  {/* Phone */}
                  <a href="tel:+917902899111" className="glow-card flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a110b]/80 p-6 backdrop-blur-md transition-all hover:border-[#84E325]/40 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#84E325]/30 bg-[#84E325]/15 text-[#84E325]">
                      <FaPhoneAlt className="text-xl" />
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-white group-hover:text-[#84E325] transition-colors">
                        +91 7902 899 111
                      </span>
                    </div>
                  </a>

                  {/* Address */}
                  <a href="https://maps.app.goo.gl/sV6ZbqEj6fvFgwHN9?g_st=iw" target="_blank" rel="noreferrer" className="glow-card flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a110b]/80 p-6 backdrop-blur-md transition-all hover:border-[#84E325]/40 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#84E325]/30 bg-[#84E325]/15 text-[#84E325]">
                      <FaMapMarkerAlt className="text-xl" />
                    </div>
                    <div>
                      <p className="block text-sm font-bold text-white group-hover:text-[#84E325] transition-colors leading-relaxed">
                        I hub school, Marottichuvadu,<br />Edappally Kerala 682024
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a href="mailto:teamihsl31@gmail.com" className="glow-card flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a110b]/80 p-6 backdrop-blur-md transition-all hover:border-[#84E325]/40 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#84E325]/30 bg-[#84E325]/15 text-[#84E325]">
                      <FaEnvelope className="text-xl" />
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-white group-hover:text-[#84E325] transition-colors">
                        teamihsl31@gmail.com
                      </span>
                    </div>
                  </a>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                  {/* Website */}
                  <a href="https://ihubschool.com/" target="_blank" rel="noreferrer" className="glow-card flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a110b]/80 p-6 backdrop-blur-md transition-all hover:border-[#84E325]/40 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#84E325]/30 bg-[#84E325]/15 text-[#84E325]">
                      <FaGlobe className="text-xl" />
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-white group-hover:text-[#84E325] transition-colors">
                        ihubschool.com
                      </span>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/company/ihubschool/" target="_blank" rel="noreferrer" className="glow-card flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a110b]/80 p-6 backdrop-blur-md transition-all hover:border-[#84E325]/40 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#84E325]/30 bg-[#84E325]/15 text-[#84E325]">
                      <FaLinkedin className="text-xl" />
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-white group-hover:text-[#84E325] transition-colors">
                        I Hub School of Learning
                      </span>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a href="https://www.instagram.com/ihub_school_of_learning/" target="_blank" rel="noreferrer" className="glow-card flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a110b]/80 p-6 backdrop-blur-md transition-all hover:border-[#84E325]/40 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#84E325]/30 bg-[#84E325]/15 text-[#84E325]">
                      <FaInstagram className="text-xl" />
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-white group-hover:text-[#84E325] transition-colors">
                        ihub_school_of_learning
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
              <div className="flex flex-col items-center text-center">
                <span className="mb-4 text-xs font-bold tracking-widest text-[#8A9A8A] uppercase">Organized By</span>
                <a href="https://ihubschool.com/" target="_blank" rel="noreferrer" className="group flex flex-col items-center">
                  <img src={ihubLogo} alt="iHub School of Learning" className="h-16 w-auto object-contain transition-transform group-hover:scale-105" />
                  <p className="mt-3 text-xs font-medium text-white transition-colors group-hover:text-[#84E325]">iHub School of Learning</p>
                </a>
              </div>

              <div className="flex flex-col items-center text-center">
                <span className="mb-4 text-xs font-bold tracking-widest text-[#8A9A8A] uppercase">Founded By</span>
                <a href="https://www.ihubrobotics.com/" target="_blank" rel="noreferrer" className="group flex flex-col items-center">
                  <div className="rounded-xl bg-white p-2.5 shadow-md transition-transform group-hover:scale-105">
                    <img src={ihubResearchLogo} alt="I Hub Research and Robotics Pvt Ltd" className="h-14 w-auto object-contain" />
                  </div>
                  <p className="mt-4 text-xs font-medium text-white transition-colors group-hover:text-[#84E325]">I Hub Research & Robotics Pvt Ltd</p>
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020503] pt-16 pb-8 text-[#9EB09E]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">
            {/* Col 1 */}
            <div className="lg:col-span-2">
              <a href="#home" className="inline-block">
                <img src={igniteLogo} alt="IGNITE 2.0" className="h-12 sm:h-14 w-auto object-contain" />
              </a>
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#8A9A8A]">
                Building the future of Robotics & AI. Empowering the next generation of visionary engineers one idea at a time.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <p className="font-orbitron text-xs font-bold tracking-widest text-white">
                CONTACT
              </p>
              <ul className="mt-4 space-y-2 text-xs">
                <li>
                  <a href="tel:+917902899111" className="hover:text-[#84E325] transition-colors">
                    +91 7902 899 111
                  </a>
                </li>
                <li className="text-[#8A9A8A]">
                  I hub school, Marottichuvadu,<br />Edappally Kerala 682024
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <p className="font-orbitron text-xs font-bold tracking-widest text-white">
                FOLLOW US
              </p>
              <div className="mt-4 flex items-center gap-3">
                {[
                  { icon: FaGlobe, href: 'https://ihubschool.com/' },
                  { icon: FaYoutube, href: 'https://youtube.com/@ihubschool?si=iWxIllnXda_RXdlF' },
                  { icon: FaLinkedin, href: 'https://www.linkedin.com/company/ihubschool/' },
                  { icon: FaInstagram, href: 'https://www.instagram.com/ihub_school_of_learning/' },
                ].map((social, i) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-[#84E325] hover:bg-[#84E325]/10 hover:text-[#84E325]"
                    >
                      <Icon className="text-sm" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-[11px] sm:flex-row">
            <p>© 2026 IGNITE 2.0. All Rights Reserved. Think. Build. Ignite the Future.</p>
            <div className="flex items-center gap-6">
              <a href="#home" className="hover:text-[#84E325] transition-colors">
                Privacy Policy
              </a>
              <a href="#home" className="hover:text-[#84E325] transition-colors">
                Terms of Service
              </a>
              <a href="#home" className="hover:text-[#84E325] transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {isRegisterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleReturnToHome}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl p-10 transition-all duration-700 ${registeredSuccess
                ? 'border-2 border-[#84E325] bg-[#07130a] shadow-[0_0_90px_rgba(132,227,37,0.5)]'
                : 'border border-[#84E325]/40 bg-[#080f09] shadow-[0_0_60px_rgba(132,227,37,0.25)]'
                }`}
            >
              <button
                type="button"
                onClick={handleReturnToHome}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white transition-all hover:bg-white/10"
              >
                <FaTimes className="text-lg" />
              </button>

              <AnimatePresence mode="wait">
                {registeredSuccess ? (
                  <motion.div
                    key="successView"
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="py-6 text-center"
                  >
                    {/* Tick Mark FX Container with Neon Ripple Shockwaves & Particles */}
                    <div className="relative mx-auto mb-3 flex h-24 w-24 items-center justify-center">
                      {/* Concentric Neon Ripple Rings */}
                      <motion.div
                        initial={{ scale: 0.7, opacity: 1 }}
                        animate={{ scale: [0.8, 1.9, 2.6], opacity: [1, 0.4, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full border-2 border-[#84E325]"
                      />
                      <motion.div
                        initial={{ scale: 0.7, opacity: 1 }}
                        animate={{ scale: [0.8, 1.5, 2.2], opacity: [1, 0.3, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: 0.7, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full border-2 border-[#84E325]/70"
                      />

                      {/* Floating Sparkle Particles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                          animate={{
                            scale: [0, 1.4, 0],
                            x: [0, (i % 2 === 0 ? 1 : -1) * (24 + i * 10)],
                            y: [0, (i < 3 ? -1 : 1) * (22 + i * 8)],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.2 + i * 0.25,
                            ease: 'easeOut'
                          }}
                          className="absolute h-2 w-2 rounded-full bg-[#84E325] shadow-[0_0_14px_#84E325]"
                        />
                      ))}

                      {/* Glowing Checkmark Badge FX */}
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: [0, 1.3, 1], rotate: [-90, 15, 0] }}
                        transition={{ duration: 0.8, delay: 0.15, type: 'spring', stiffness: 140 }}
                        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#84E325] text-black shadow-[0_0_50px_rgba(132,227,37,0.9)]"
                      >
                        <FaCheck className="text-3xl text-black font-black" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className="mt-4 inline-block rounded-full bg-[#84E325]/15 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-[#84E325] border border-[#84E325]/40 shadow-[0_0_20px_rgba(132,227,37,0.35)]">
                        ✓ Registration Successful
                      </div>
                      <h3 className="mt-3 text-2xl font-extrabold text-white tracking-tight">
                        Welcome to IGNITE 2.0! 🎉
                      </h3>
                      <p className="mt-2 text-xs text-[#9EB09E] leading-relaxed max-w-sm mx-auto">
                        We've registered your team and sent your official event pass to <strong className="text-[#84E325]">{formData.email || 'your email'}</strong>.
                        <br />
                        <span className="text-[11px] mt-3 inline-block rounded-md bg-[#84E325]/10 border border-[#84E325]/20 px-3 py-1.5 text-[#84E325] font-medium">
                          Note: Please do check your spam folder if you didn't receive the mail.
                        </span>
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row justify-center gap-4"
                    >
                      <button
                        type="button"
                        onClick={handleReturnToHome}
                        className="glow-lime-btn rounded-xl px-8 py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 hover:scale-105 bg-[#84E325] text-black shadow-[0_0_20px_rgba(132,227,37,0.4)]"
                      >
                        Return to Home
                      </button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="formView"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <span className="font-orbitron text-xs font-bold tracking-widest text-[#84E325]">
                        IGNITE 2.0 HACKATHON
                      </span>
                      <h3 className="mt-2 text-3xl font-extrabold text-white tracking-tight">Register Your Team</h3>
                      <p className="mt-2 text-sm text-[#9EB09E]">
                        Fill in details to secure your spot for Round 01 evaluation.
                      </p>
                    </div>

                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 rounded-xl border border-red-500/50 bg-red-500/15 p-3.5 text-xs text-red-300 font-semibold flex items-center gap-2.5 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                      >
                        <FaExclamationCircle className="text-red-400 shrink-0 text-lg" />
                        <span className="leading-snug">{formError}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      {formStep === 1 && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Team Name
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.teamName}
                                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                placeholder="e.g. CyberDynasty"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Team Size
                              </label>
                              <select
                                value={formData.members}
                                onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                                className="w-full rounded-xl border border-white/10 bg-[#0d180f] px-5 py-3 text-base text-white focus:border-[#84E325] focus:outline-none"
                              >
                                <option value="1">1 Member</option>
                                <option value="2">2 Members</option>
                                <option value="3">3 Members</option>
                                <option value="4">4 Members</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Leader Name
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.leaderName}
                                onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                                placeholder="Full Name"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Leader Phone Number
                              </label>
                              <input
                                type="tel"
                                required
                                maxLength={10}
                                value={formData.phone}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                  setFormData({ ...formData, phone: val });
                                }}
                                placeholder="9876543210"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Leader Email Address
                              </label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="leader@team.com"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>
                          </div>


                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Category
                              </label>
                              <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full rounded-xl border border-white/10 bg-[#0d180f] px-5 py-3 text-base text-white focus:border-[#84E325] focus:outline-none"
                              >
                                <option value="School Student">School Student</option>
                                <option value="UG Student">UG Student</option>
                                <option value="PG Student">PG Student</option>
                                <option value="Organisation">Organisation</option>
                                <option value="Others">Others (Innovators/Enthusiasts)</option>
                              </select>
                            </div>

                            {formData.category !== 'Others' && (
                              <div>
                                <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                  {formData.category === 'School Student' ? 'School Name' :
                                    formData.category === 'Organisation' ? 'Company Name' : 'College Name'}
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={formData.institutionName}
                                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                                  placeholder={`Enter ${formData.category === 'School Student' ? 'School' : formData.category === 'Organisation' ? 'Company' : 'College'} Name`}
                                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                                />
                              </div>
                            )}
                          </div>

                          <div className="pt-3">
                            <button
                              type="button"
                              onClick={() => {
                                // Basic validation before next step
                                if (!formData.teamName.trim() || !formData.leaderName.trim() || !formData.email.trim() || !formData.phone.trim()) {
                                  setFormError('Please fill out all required team details.');
                                  return;
                                }
                                if (formData.phone.length !== 10) {
                                  setFormError('Please enter a valid 10-digit phone number for the leader.');
                                  return;
                                }
                                if (formData.category !== 'Others' && !formData.institutionName.trim()) {
                                  setFormError(`Please enter your ${formData.category === 'School Student' ? 'School' : formData.category === 'Organisation' ? 'Company' : 'College'} Name.`);
                                  return;
                                }
                                setFormError(null);
                                if (parseInt(formData.members, 10) > 1) {
                                  setFormStep(2);
                                } else {
                                  setFormStep(3);
                                }
                              }}
                              className="w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                            >
                              Next Step
                            </button>
                          </div>
                        </>
                      )}

                      {formStep === 2 && (
                        <>
                          {parseInt(formData.members, 10) > 1 && (
                            <div className="p-4 rounded-xl border border-white/10 bg-[#0d180f]">
                              <h4 className="text-xs font-bold text-[#84E325] mb-3 uppercase tracking-wider">Team Members Details</h4>
                              {teamMembers.slice(0, parseInt(formData.members, 10) - 1).map((member, index) => (
                                <div key={index} className="mb-4 last:mb-0 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                  <p className="text-[10px] text-gray-400 mb-2 uppercase">Member {index + 1}</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                      type="text"
                                      required
                                      value={member.name}
                                      onChange={(e) => {
                                        const newMembers = [...teamMembers];
                                        newMembers[index].name = e.target.value;
                                        setTeamMembers(newMembers);
                                      }}
                                      placeholder="Full Name"
                                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#84E325] focus:outline-none"
                                    />
                                    <input
                                      type="tel"
                                      required
                                      maxLength={10}
                                      value={member.phone}
                                      onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        const newMembers = [...teamMembers];
                                        newMembers[index].phone = val;
                                        setTeamMembers(newMembers);
                                      }}
                                      placeholder="Phone Number"
                                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#84E325] focus:outline-none"
                                    />
                                    <input
                                      type="email"
                                      required
                                      value={member.email}
                                      onChange={(e) => {
                                        const newMembers = [...teamMembers];
                                        newMembers[index].email = e.target.value;
                                        setTeamMembers(newMembers);
                                      }}
                                      placeholder="Email Address"
                                      className="md:col-span-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#84E325] focus:outline-none"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="pt-3 flex gap-4">
                            <button
                              type="button"
                              onClick={() => setFormStep(1)}
                              className="w-1/3 rounded-xl border border-white/20 bg-transparent py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/5 cursor-pointer"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const membersToValidate = teamMembers.slice(0, parseInt(formData.members, 10) - 1);
                                const isMembersValid = membersToValidate.every(m => m.name.trim() && m.phone.trim() && m.email.trim());
                                if (!isMembersValid) {
                                  setFormError('Please fill out all team member details.');
                                  return;
                                }
                                const isPhoneValid = membersToValidate.every(m => m.phone.length === 10);
                                if (!isPhoneValid) {
                                  setFormError('Please enter valid 10-digit phone numbers for all team members.');
                                  return;
                                }
                                setFormError(null);
                                setFormStep(3);
                              }}
                              className="w-2/3 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                            >
                              Next
                            </button>
                          </div>
                        </>
                      )}

                      {formStep === 3 && (
                        <>




                          {/* Terms and Conditions Checkbox */}
                          <div className="pt-2 flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="termsCheckbox"
                              required
                              checked={acceptedTerms}
                              onChange={(e) => setAcceptedTerms(e.target.checked)}
                              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#84E325] focus:ring-[#84E325] accent-[#84E325] cursor-pointer"
                            />
                            <label htmlFor="termsCheckbox" className="leading-snug select-none text-[11px] text-gray-300 cursor-pointer">
                              I agree to the{' '}
                              <button
                                type="button"
                                onClick={() => setShowTermsModal(true)}
                                className="font-semibold text-[#84E325] underline cursor-pointer hover:text-white"
                              >
                                Terms & Conditions
                              </button>{' '}
                              and rules of IGNITE 2.0 Hackathon.
                            </label>
                          </div>

                          <div className="pt-3 flex gap-4">
                            <button
                              type="button"
                              onClick={() => setFormStep(parseInt(formData.members, 10) > 1 ? 2 : 1)}
                              className="w-1/3 rounded-xl border border-white/20 bg-transparent py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/5 cursor-pointer"
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`w-2/3 rounded-xl px-5 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${isSubmitting
                                ? 'bg-[#84E325]/50 text-black/50 cursor-not-allowed'
                                : 'glow-lime-btn bg-[#84E325] text-black cursor-pointer hover:scale-[1.02]'
                                }`}
                            >
                              {isSubmitting ? 'Processing...' : 'Submit and Pay ₹499'}
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTermsModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative z-10 w-full max-w-md rounded-2xl border border-[#84E325]/40 bg-[#080f09] p-6 shadow-[0_0_50px_rgba(132,227,37,0.2)]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-base font-bold text-[#84E325]">IGNITE 2.0 Terms & Conditions</h4>
                <button type="button" onClick={() => setShowTermsModal(false)} className="text-gray-400 hover:text-white">
                  <FaTimes />
                </button>
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto text-xs text-gray-300 space-y-2.5 pr-2 leading-relaxed">
                <p>1. <strong>Team Composition:</strong> All team members must be registered under a single team leader submission.</p>
                <p>2. <strong>Originality:</strong> All ideas and prototype submissions must consist of original work developed for IGNITE 2.0.</p>
                <p>3. <strong>Code of Conduct:</strong> Participants must maintain professional and ethical standards throughout the hackathon.</p>
                <p>4. <strong>Evaluation:</strong> Shortlisting decisions by panel judges and organizers are final.</p>
                <p>5. <strong>Confirmation:</strong> Official pass and updates will be dispatched to the team leader's registered email address.</p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setAcceptedTerms(true)
                    setShowTermsModal(false)
                  }}
                  className="glow-lime-btn rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Accept & Agree
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
