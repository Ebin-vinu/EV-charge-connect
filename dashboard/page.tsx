'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

interface Booking {
  id: string
  stationName: string
  address: string
  date: string
  time: string
  duration: string
  status: 'upcoming' | 'completed' | 'cancelled'
  amount: number
}

interface FavoriteStation {
  id: string
  name: string
  address: string
  distance: number
  rating: number
  availability: 'available' | 'busy' | 'offline'
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data
  const user = {
    name: 'Ebin Vinu',
    email: 'ebinvinu1@email.com',
    phone: '+91 98765 43210',
    vehicleType: 'Electric Car',
    joinDate: 'January 2024',
    totalBookings: 24,
    totalSpent: 2850,
    carbonSaved: 45.2
  }

  const recentBookings: Booking[] = [
    {
      id: '1',
      stationName: 'Tata Power Charging Station',
      address: 'Connaught Place, New Delhi',
      date: '2024-01-25',
      time: '10:00 AM',
      duration: '2 hours',
      status: 'upcoming',
      amount: 240
    },
    {
      id: '2',
      stationName: 'Ather Grid Station',
      address: 'Koramangala, Bangalore',
      date: '2024-01-20',
      time: '2:00 PM',
      duration: '1.5 hours',
      status: 'completed',
      amount: 180
    },
    {
      id: '3',
      stationName: 'ChargePoint Station',
      address: 'Bandra West, Mumbai',
      date: '2024-01-18',
      time: '6:00 PM',
      duration: '3 hours',
      status: 'completed',
      amount: 450
    }
  ]

  const favoriteStations: FavoriteStation[] = [
    {
      id: '1',
      name: 'Tata Power Charging Station',
      address: 'Connaught Place, New Delhi',
      distance: 2.3,
      rating: 4.5,
      availability: 'available'
    },
    {
      id: '2',
      name: 'Tesla Supercharger',
      address: 'Cyber City, Gurgaon',
      distance: 5.5,
      rating: 4.8,
      availability: 'busy'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'default'
      case 'completed': return 'secondary'
      case 'cancelled': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">EV</span>
              </div>
              <span className="text-xl font-bold">EV Charge Connect</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/map" className="text-sm font-medium hover:text-primary">
                Find Stations
              </Link>
              <Link href="/chat" className="text-sm font-medium hover:text-primary">
                AI Assistant
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-gray-600">Manage your EV charging activities and explore new stations.</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Bookings</p>
                        <p className="text-2xl font-bold">{user.totalBookings}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">📅</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold">₹{user.totalSpent}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">💰</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Carbon Saved</p>
                        <p className="text-2xl font-bold">{user.carbonSaved}kg</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">🌱</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="text-2xl font-bold">{user.joinDate}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">⭐</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Your latest charging sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{booking.stationName}</h4>
                            <p className="text-xs text-gray-600">{booking.address}</p>
                            <p className="text-xs text-gray-500">{booking.date} at {booking.time}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={getStatusColor(booking.status)} className="text-xs mb-1">
                              {booking.status}
                            </Badge>
                            <p className="text-sm font-medium">₹{booking.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/dashboard" onClick={() => setActiveTab('bookings')}>
                      <Button variant="outline" className="w-full mt-4">
                        View All Bookings
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/map">
                      <Button className="w-full justify-start">
                        🗺️ Find Charging Stations
                      </Button>
                    </Link>
                    <Link href="/chat">
                      <Button variant="outline" className="w-full justify-start">
                        🤖 Chat with AI Assistant
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      📊 View Usage Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      💳 Payment Methods
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Environmental Impact */}
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Your contribution to a greener planet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{user.carbonSaved}kg</div>
                      <p className="text-sm text-gray-600">CO₂ Emissions Saved</p>
                      <Progress value={75} className="mt-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">1,250</div>
                      <p className="text-sm text-gray-600">kWh Clean Energy Used</p>
                      <Progress value={60} className="mt-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">18</div>
                      <p className="text-sm text-gray-600">Trees Equivalent Saved</p>
                      <Progress value={45} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                  <CardDescription>Complete history of your charging sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{booking.stationName}</h4>
                          <p className="text-sm text-gray-600">{booking.address}</p>
                          <p className="text-sm text-gray-500">
                            {booking.date} at {booking.time} • {booking.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusColor(booking.status)} className="mb-2">
                            {booking.status}
                          </Badge>
                          <p className="font-medium">₹{booking.amount}</p>
                          {booking.status === 'upcoming' && (
                            <Button size="sm" variant="outline" className="mt-2">
                              Modify
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Favorite Stations</CardTitle>
                  <CardDescription>Your most frequently used charging stations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {favoriteStations.map((station) => (
                      <div key={station.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{station.name}</h4>
                          <p className="text-sm text-gray-600">{station.address}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span>⭐ {station.rating}</span>
                            <span>{station.distance}km away</span>
                            <Badge 
                              variant={station.availability === 'available' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {station.availability}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/booking/${station.id}`}>
                            <Button size="sm">Book Now</Button>
                          </Link>
                          <Button size="sm" variant="outline">Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <p className="text-sm text-gray-600 mt-1">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-sm text-gray-600 mt-1">{user.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Vehicle Type</label>
                      <p className="text-sm text-gray-600 mt-1">{user.vehicleType}</p>
                    </div>
                    <Button className="w-full">Edit Profile</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Preferences and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      🔔 Notification Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      💳 Payment Methods
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      🔒 Privacy Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      📱 App Preferences
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      🆘 Help & Support
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
