import { Hero } from '../components/sections/Hero'
import { Features } from '../components/sections/Features'
import { Stats } from '../components/sections/Stats'
import { Testimonials } from '../components/sections/Testimonials'
import { CTA } from '../components/sections/CTA'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}