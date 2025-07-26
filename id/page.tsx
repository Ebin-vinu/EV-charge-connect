'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface ChargingStation {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  price: number
  availability: 'available' | 'busy' | 'offline'
  chargerType: string
  rating: number
  distance: number
  amenities: string[]
  operatingHours: string
  totalSlots: number
  availableSlots: number
}

interface BookingData {
  date: Date | undefined
  timeSlot: string
  duration: string
  vehicleType: string
  chargingType: string
  specialRequests: string
}

export default function BookingPage() {
  const params = useParams()
  const stationId = params.id as string
  
  const [station, setStation] = useState<ChargingStation | null>(null)
  const [bookingData, setBookingData] = useState<BookingData>({
    date: undefined,
    timeSlot: '',
    duration: '',
    vehicleType: '',
    chargingType: '',
    specialRequests: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  // Mock station data (in real app, this would be fetched from API)
  const stations: ChargingStation[] = [
    {
      id: '1',
      name: 'Tata Power Charging Station',
      address: 'Connaught Place, New Delhi, India',
      lat: 28.6315,
      lng: 77.2167,
      price: 12,
      availability: 'available',
      chargerType: 'DC Fast',
      rating: 4.5,
      distance: 2.3,
      amenities: ['WiFi', 'Cafe', 'Restroom', 'Parking'],
      operatingHours: '24/7',
      totalSlots: 8,
      availableSlots: 5
    },
    {
      id: '2',
      name: 'Ather Grid Station',
      address: 'Koramangala, Bangalore, India',
      lat: 12.9352,
      lng: 77.6245,
      price: 8,
      availability: 'available',
      chargerType: 'AC Slow',
      rating: 4.2,
      distance: 1.8,
      amenities: ['WiFi', 'Parking'],
      operatingHours: '6:00 AM - 10:00 PM',
      totalSlots: 4,
      availableSlots: 2
    }
  ]

  const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'
  ]

  const durations = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
    { value: '180', label: '3 hours' },
    { value: '240', label: '4 hours' }
  ]

  useEffect(() => {
    // Find station by ID
    const foundStation = stations.find(s => s.id === stationId)
    setStation(foundStation || null)
  }, [stationId])

  const calculateTotal = () => {
    if (!station || !bookingData.duration) return 0
    const hours = parseInt(bookingData.duration) / 60
    return Math.round(station.price * hours * 100) / 100
  }

  const handleBooking = async () => {
    if (!station || !bookingData.date || !bookingData.timeSlot || !bookingData.duration) {
      alert('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    
    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to payment page
      window.location.href = `/payment?stationId=${station.id}&total=${calculateTotal()}&duration=${bookingData.duration}`
    }, 2000)
  }

  const handleNavigate = () => {
    if (station) {
      const url = `https://www.google.com/maps/dir//${station.lat},${station.lng}`
      window.open(url, '_blank')
    }
  }

  if (!station) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Station Not Found</h2>
            <p className="text-gray-600 mb-4">The charging station you're looking for doesn't exist.</p>
            <Link href="/map">
              <Button>Back to Map</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
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
                Back to Map
              </Link>
              <Link href="/chat" className="text-sm font-medium hover:text-primary">
                AI Assistant
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/map" className="hover:text-primary">Map</Link>
            <span>/</span>
            <span>Book Charging Slot</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Station Details */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{station.name}</CardTitle>
                      <CardDescription className="mt-1">{station.address}</CardDescription>
                    </div>
                    <Badge 
                      variant={station.availability === 'available' ? 'default' : 'secondary'}
                    >
                      {station.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Price:</span>
                      <div className="font-medium">₹{station.price}/kWh</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Rating:</span>
                      <div className="font-medium">⭐ {station.rating}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <div className="font-medium">{station.chargerType}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Distance:</span>
                      <div className="font-medium">{station.distance}km</div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-sm text-gray-600">Operating Hours:</span>
                    <div className="font-medium">{station.operatingHours}</div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Available Slots:</span>
                    <div className="font-medium">{station.availableSlots} of {station.totalSlots}</div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Amenities:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {station.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleNavigate} variant="outline" className="w-full">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Book Charging Slot</CardTitle>
                  <CardDescription>
                    Select your preferred date, time, and charging duration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <Label className="text-base font-medium">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-2"
                        >
                          {bookingData.date ? bookingData.date.toDateString() : 'Choose a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={bookingData.date}
                          onSelect={(date) => setBookingData(prev => ({ ...prev, date }))}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time and Duration */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-medium">Time Slot</Label>
                      <Select 
                        value={bookingData.timeSlot} 
                        onValueChange={(value) => setBookingData(prev => ({ ...prev, timeSlot: value }))}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Duration</Label>
                      <Select 
                        value={bookingData.duration} 
                        onValueChange={(value) => setBookingData(prev => ({ ...prev, duration: value }))}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durations.map((duration) => (
                            <SelectItem key={duration.value} value={duration.value}>
                              {duration.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-medium">Vehicle Type</Label>
                      <Select 
                        value={bookingData.vehicleType} 
                        onValueChange={(value) => setBookingData(prev => ({ ...prev, vehicleType: value }))}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Electric Car</SelectItem>
                          <SelectItem value="bike">Electric Bike</SelectItem>
                          <SelectItem value="scooter">Electric Scooter</SelectItem>
                          <SelectItem value="auto">Electric Auto</SelectItem>
                          <SelectItem value="bus">Electric Bus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Charging Type</Label>
                      <Select 
                        value={bookingData.chargingType} 
                        onValueChange={(value) => setBookingData(prev => ({ ...prev, chargingType: value }))}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select charging type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Charging</SelectItem>
                          <SelectItem value="fast">Fast Charging</SelectItem>
                          <SelectItem value="rapid">Rapid Charging</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label className="text-base font-medium">Special Requests (Optional)</Label>
                    <Textarea
                      placeholder="Any special requirements or requests..."
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                      className="mt-2"
                    />
                  </div>

                  <Separator />

                  {/* Pricing Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Station:</span>
                        <span>{station.name}</span>
                      </div>
                      {bookingData.date && (
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span>{bookingData.date.toDateString()}</span>
                        </div>
                      )}
                      {bookingData.timeSlot && (
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span>{bookingData.timeSlot}</span>
                        </div>
                      )}
                      {bookingData.duration && (
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{parseInt(bookingData.duration) / 60} hour(s)</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Estimated Total:</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button 
                    onClick={handleBooking}
                    disabled={isLoading || !bookingData.date || !bookingData.timeSlot || !bookingData.duration}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? 'Processing...' : 'Proceed to Payment'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By booking, you agree to our terms and conditions. 
                    Cancellation is free up to 1 hour before your slot.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
