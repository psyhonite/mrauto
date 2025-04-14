'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
// Remove Header import as it's already in layout.tsx
// import Header from '@/components/Header'
// Remove Footer import as it's already in layout.tsx
// import Footer from '@/components/Footer'

const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: false
})
const CatalogSection = dynamic(() => import('@/components/CatalogSection'), {
  ssr: false
})
const ServicesSection = dynamic(() => import('@/components/ServicesSection'), {
  ssr: false
})
const AdvantagesSection = dynamic(() => import('@/components/AdvantagesSection'), {
  ssr: false
})
const ReviewsSection = dynamic(() => import('@/components/ReviewsSection'), {
  ssr: false
})
const NewsBanner = dynamic(() => import('@/components/NewsBanner'), {
  ssr: false
})
const ContactsSection = dynamic(() => import('@/components/ContactsSection'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-dark-blue">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-30" 
          style={{ 
            backgroundImage: 'url(/images/solid-grid.svg)',
            backgroundSize: '20px 20px'
          }} 
        />
        
        {/* Digital circuit lines */}
        <div className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'url(/images/grid-pattern.svg)' }}
        />
        
        {/* Diagonal accent lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
        
        {/* Stars - fixed points */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => {
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;
            const size = Math.random() * 2 + 1;
            const opacity = Math.random() * 0.5 + 0.3;
            
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top,
                  left,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                }}
              />
            );
          })}
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => {
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;
            const size = Math.random() * 3 + 2;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            return (
              <div
                key={i}
                className="absolute rounded-full bg-blue-400"
                style={{
                  top,
                  left,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: 0.4,
                  animation: `float ${duration}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Ambient background effects that stay fixed while scrolling */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {/* Digital circuit lines */}
        <div className="absolute left-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent opacity-70" />
        <div className="absolute right-0 h-full w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent opacity-70" />
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-70" />
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-70" />
        
        {/* Diagonal accent lines */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -rotate-45 origin-top-left" />
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden opacity-10">
          <div className="absolute bottom-0 right-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -rotate-45 origin-bottom-right" />
        </div>
      </div>
      
      <HeroSection />
      
      {/* Apply a small negative margin to create a better transition between sections */}
      <div className="relative z-10 mt-[-50px]">
        <ServicesSection />
        <CatalogSection />
        <AdvantagesSection />
        <ReviewsSection />
        <NewsBanner />
        <ContactsSection />
      </div>
    </main>
  )
} 