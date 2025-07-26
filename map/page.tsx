'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import Link from 'next/link'

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

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
}

export default function MapPage() {
  const [searchLocation, setSearchLocation] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('india')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [chargerType, setChargerType] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  // Mock charging stations data (in real app, this would come from Google Places API)
  const chargingStations: ChargingStation[] = [
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
      amenities: ['WiFi', 'Cafe', 'Restroom']
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
      amenities: ['WiFi', 'Parking']
    },
    {
      id: '3',
      name: 'ChargePoint Station',
      address: 'Bandra West, Mumbai, India',
      lat: 19.0596,
      lng: 72.8295,
      price: 15,
      availability: 'busy',
      chargerType: 'DC Fast',
      rating: 4.7,
      distance: 3.1,
      amenities: ['WiFi', 'Cafe', 'Shopping']
    },
    {
      id: '4',
      name: 'Fortum Charge & Drive',
      address: 'Anna Nagar, Chennai, India',
      lat: 13.0843,
      lng: 80.2705,
      price: 10,
      availability: 'available',
      chargerType: 'AC Fast',
      rating: 4.3,
      distance: 4.2,
      amenities: ['Parking', 'Restroom']
    },
    {
      id: '5',
      name: 'Tesla Supercharger',
      address: 'Cyber City, Gurgaon, India',
      lat: 28.4595,
      lng: 77.0266,
      price: 20,
      availability: 'available',
      chargerType: 'DC Super Fast',
      rating: 4.8,
      distance: 5.5,
      amenities: ['WiFi', 'Cafe', 'Lounge']
    }
  ]

  const filteredStations = chargingStations.filter(station => {
    const priceMatch = station.price >= priceRange[0] && station.price <= priceRange[1]
    const chargerMatch = chargerType === 'all' || station.chargerType.toLowerCase().includes(chargerType.toLowerCase())
    const availabilityMatch = availability === 'all' || station.availability === availability
    return priceMatch && chargerMatch && availabilityMatch
  })

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log('Error getting location:', error)
          // Default to Delhi if location access denied
          setUserLocation({ lat: 28.6139, lng: 77.2090 })
        }
      )
    }
  }, [])

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (mapRef.current && userLocation && !map && window.google) {
        const googleMap = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 12,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

        // Add user location marker
        new window.google.maps.Marker({
          position: userLocation,
          map: googleMap,
          title: 'Your Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24)
          }
        })

        setMap(googleMap)
      }
    }

    if (userLocation) {
      loadGoogleMaps()
    }
  }, [userLocation, map])

  useEffect(() => {
    // Add charging station markers
    if (map && window.google) {
      // Clear existing markers first
      filteredStations.forEach(station => {
        const marker = new window.google.maps.Marker({
          position: { lat: station.lat, lng: station.lng },
          map: map,
          title: station.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="${station.availability === 'available' ? '#10B981' : station.availability === 'busy' ? '#F59E0B' : '#EF4444'}" stroke="white" stroke-width="2"/>
                <path d="M12 10h8v12h-8z" fill="white"/>
                <rect x="14" y="12" width="4" height="2" fill="${station.availability === 'available' ? '#10B981' : station.availability === 'busy' ? '#F59E0B' : '#EF4444'}"/>
                <rect x="14" y="16" width="4" height="2" fill="${station.availability === 'available' ? '#10B981' : station.availability === 'busy' ? '#F59E0B' : '#EF4444'}"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32)
          }
        })

        marker.addListener('click', () => {
          setSelectedStation(station)
        })
      })
    }
  }, [map, filteredStations])

  const handleSearch = () => {
    if (searchLocation.trim() && map && window.google) {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ address: searchLocation }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location
          map.setCenter(location)
          map.setZoom(14)
        }
      })
    }
  }

  const handleNavigate = (station: ChargingStation) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${station.lat},${station.lng}`
      window.open(url, '_blank')
    }
  }

  const handleBookStation = (station: ChargingStation) => {
    window.location.href = `/booking/${station.id}`
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
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
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

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Search */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Find Charging Stations</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Search location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </div>

            {/* Country Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filters */}
            <div>
              <h3 className="text-md font-medium mb-3">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}/kWh
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Charger Type */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Charger Type</label>
                <Select value={chargerType} onValueChange={setChargerType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="ac">AC Charging</SelectItem>
                    <SelectItem value="dc">DC Fast Charging</SelectItem>
                    <SelectItem value="super">Super Fast Charging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Availability</label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stations</SelectItem>
                    <SelectItem value="available">Available Now</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Station List */}
            <div>
              <h3 className="text-md font-medium mb-3">
                Nearby Stations ({filteredStations.length})
              </h3>
              <div className="space-y-3">
                {filteredStations.map((station) => (
                  <Card 
                    key={station.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedStation?.id === station.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedStation(station)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{station.name}</h4>
                        <Badge 
                          variant={
                            station.availability === 'available' ? 'default' : 
                            station.availability === 'busy' ? 'secondary' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {station.availability}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{station.address}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span>₹{station.price}/kWh</span>
                        <span>{station.distance}km away</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{station.chargerType}</span>
                        <div className="flex items-center">
                          <span className="text-xs">⭐ {station.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <div ref={mapRef} className="w-full h-full" />
          
          {/* Station Details Popup */}
          {selectedStation && (
            <div className="absolute bottom-4 left-4 right-4 max-w-md mx-auto">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{selectedStation.name}</CardTitle>
                      <CardDescription>{selectedStation.address}</CardDescription>
                    </div>
                    <Badge 
                      variant={
                        selectedStation.availability === 'available' ? 'default' : 
                        selectedStation.availability === 'busy' ? 'secondary' : 'destructive'
                      }
                    >
                      {selectedStation.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Price:</span>
                      <div className="font-medium">₹{selectedStation.price}/kWh</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Distance:</span>
                      <div className="font-medium">{selectedStation.distance}km</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <div className="font-medium">{selectedStation.chargerType}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Rating:</span>
                      <div className="font-medium">⭐ {selectedStation.rating}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm text-gray-600">Amenities:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedStation.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleBookStation(selectedStation)}
                      className="flex-1"
                      disabled={selectedStation.availability !== 'available'}
                    >
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleNavigate(selectedStation)}
                      className="flex-1"
                    >
                      Navigate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Map Legend */}
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md">
            <h4 className="font-medium text-sm mb-2">Station Status</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Busy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
