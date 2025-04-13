'use client'

import dynamic from 'next/dynamic'
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
const ContactsSection = dynamic(() => import('@/components/ContactsSection'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="relative min-h-screen">
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
        <ContactsSection />
      </div>
    </main>
  )
} 