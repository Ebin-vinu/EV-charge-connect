'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function FounderAbout() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Vision Behind EV Charge Connect</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the story of how a student's passion for technology and sustainability 
            is revolutionizing EV charging in India.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8">
                <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl font-bold">EV</span>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Ebin Vinu PA</h3>
                  <Badge variant="secondary" className="mb-2">Founder & Developer</Badge>
                  <p className="text-gray-600">B.Tech Student • Programmer • EV Enthusiast</p>
                </div>
              </div>
              
              <div className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4">The Journey</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    As a B.Tech student passionate about both technology and sustainable transportation, 
                    I recognized the gap in community-based EV charging solutions in India. This platform 
                    was born from the vision to connect EV owners with local charging stations, making 
                    electric vehicle adoption more accessible and convenient for everyone.
                  </CardDescription>
                  
                  <CardDescription className="text-base">
                    Combining my programming skills with a deep understanding of community needs, 
                    I've built EV Charge Connect to bridge the gap between EV owners and charging 
                    infrastructure, promoting green mobility through technology-driven solutions.
                  </CardDescription>

                  <div className="pt-4">
                    <Link href="/about">
                      <Badge className="cursor-pointer hover:bg-primary/90">
                        Read Full Story →
                      </Badge>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
