'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import FounderAbout from '@/components/founder-about'

export default function HomePage() {
  const [searchLocation, setSearchLocation] = useState('')

  const features = [
    {
      title: 'Community-Based Charging',
      description: 'Connect with local EV charger owners and share charging resources in your community.',
      badge: 'Community'
    },
    {
      title: 'Easy Booking & Payments',
      description: 'Book charging slots instantly with UPI payments and bank transfers in Indian currency.',
      badge: 'Convenient'
    },
    {
      title: 'AI Chatbot Assistant',
      description: 'Get instant help with bookings, questions, and EV support from our AI assistant.',
      badge: 'Smart'
    },
    {
      title: 'Smart & Scalable',
      description: 'Advanced filtering, real-time availability, and navigation to charging stations.',
      badge: 'Intelligent'
    }
  ]

  const handleSearch = () => {
    if (searchLocation.trim()) {
      window.location.href = `/map?search=${encodeURIComponent(searchLocation)}`
    }
  }

  return (
    <div className="min-h-screen">
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
              <Link href="/map" className="text-sm font-medium hover:text-primary">
                Find Stations
              </Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
              <Link href="/chat" className="text-sm font-medium hover:text-primary">
                AI Assistant
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            AI-Powered Community-Based
            <br />
            EV Charging Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with community EV charging stations, book slots easily, and get AI assistance 
            for all your electric vehicle charging needs. Promoting green mobility through smart, 
            community-driven charging solutions.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search for EV charging stations near you..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="flex-1 h-12 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} size="lg" className="px-8">
                Search Stations
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/map">
              <Button size="lg" className="px-8">
                View Map
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" size="lg" className="px-8">
                Chat with AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of EV charging with our comprehensive platform designed 
              for the community, by the community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mx-auto mb-2">
                    {feature.badge}
                  </Badge>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start charging your EV</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Stations</h3>
              <p className="text-gray-600">
                Search for EV charging stations near you using our interactive map with real-time data from Google Maps.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Navigate</h3>
              <p className="text-gray-600">
                Book your charging slot and get turn-by-turn navigation to reach the station efficiently.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Pay & Charge</h3>
              <p className="text-gray-600">
                Pay securely using UPI or bank transfer in Indian currency and start charging your vehicle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder About Section */}
      <FounderAbout />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your EV Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of EV owners who trust our platform for their charging needs. 
            Get started today and experience the future of sustainable transportation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/map">
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-black">
                Explore Stations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EV</span>
                </div>
                <span className="text-xl font-bold">EV Charge Connect</span>
              </div>
              <p className="text-gray-600">
                Connecting communities through sustainable EV charging solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/map">Find Stations</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/chat">AI Assistant</Link></li>
                <li><Link href="/about">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/signup">Sign Up</Link></li>
                <li><Link href="/dashboard">Profile</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/chat">Help Center</Link></li>
                <li><Link href="/chat">Contact Support</Link></li>
                <li><Link href="/chat">AI Assistant</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 EV Charge Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
