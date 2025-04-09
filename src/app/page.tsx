'use client'

import dynamic from 'next/dynamic'

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
    <main className="min-h-screen">
      <HeroSection />
      <CatalogSection />
      <ServicesSection />
      <AdvantagesSection />
      <ReviewsSection />
      <ContactsSection />
    </main>
  )
} 