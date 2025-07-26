'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">EV</span>
              </div>
              <span className="text-xl font-bold">EV Charge Connect</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/map" className="text-sm font-medium hover:text-primary">
                Find Stations
              </Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
              <Link href="/chat" className="text-sm font-medium hover:text-primary">
                AI Assistant
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            About the Founder
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The story behind India's first community-driven EV charging platform
          </p>
        </div>
      </section>

      {/* Founder Profile Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 flex flex-col items-center justify-center">
                <div className="w-48 h-48 bg-black rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-5xl font-bold">EV</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Ebin Vinu PA</h2>
                <Badge variant="secondary" className="mb-4">Founder & Developer</Badge>
                <p className="text-gray-600 text-center">B.Tech Student • Programmer • EV Enthusiast</p>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">The Vision</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    As a B.Tech student passionate about both technology and sustainable transportation, 
                    I recognized the critical gap in community-based EV charging solutions in India. 
                    The vision for EV Charge Connect emerged from a simple observation: while electric 
                    vehicles were becoming more popular, the charging infrastructure wasn't keeping pace 
                    with the needs of everyday users.
                  </p>
                  
                  <p>
                    Growing up in a technology-focused environment, I understood that the solution wasn't 
                    just about building more charging stations—it was about creating connections. 
                    EV Charge Connect bridges the gap between EV owners and available charging resources 
                    through a community-driven platform that makes electric vehicle adoption more 
                    accessible and convenient for everyone.
                  </p>
                  
                  <p>
                    This platform represents more than just a technical solution; it's a movement toward 
                    sustainable transportation powered by community collaboration. By connecting local 
                    charging station owners with EV users, we're not just solving a practical problem—we're 
                    building a network that supports India's transition to cleaner, greener mobility.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">Mission & Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Our Mission</h4>
                  <p className="text-gray-600">
                    To accelerate India's transition to sustainable transportation by creating 
                    a community-driven platform that makes EV charging accessible, affordable, 
                    and convenient for everyone.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Core Values</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Community First</li>
                    <li>• Sustainability</li>
                    <li>• Innovation</li>
                    <li>• Accessibility</li>
                    <li>• Transparency</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">The Journey So Far</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-black pl-4">
                  <h4 className="font-semibold">2024 - The Beginning</h4>
                  <p className="text-gray-600">
                    Started as a final year project, recognizing the need for community-based 
                    EV charging solutions in India.
                  </p>
                </div>
                <div className="border-l-4 border-black pl-4">
                  <h4 className="font-semibold">Present - Growing Community</h4>
                  <p className="text-gray-600">
                    Building a platform that connects thousands of EV owners with local 
                    charging stations across India.
                  </p>
                </div>
                <div className="border-l-4 border-black pl-4">
                  <h4 className="font-semibold">Future - Expanding Horizons</h4>
                  <p className="text-gray-600">
                    Continuing to innovate and expand our reach to make EV charging 
                    accessible to every corner of India.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-white">
        <div className="container mx-auto">
          <div className="text-center">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
