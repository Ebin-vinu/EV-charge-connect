'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    vehicleType: '',
    city: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }

    // Handle signup logic here
    console.log('Signup attempt:', formData)
    // Redirect to dashboard on successful signup
    window.location.href = '/dashboard'
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <Link href="/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Signup Form */}
      <div className="flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
            <CardDescription>
              Join the EV Charge Connect community and start your sustainable journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Select onValueChange={(value) => handleSelectChange('vehicleType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your EV type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Electric Car</SelectItem>
                      <SelectItem value="bike">Electric Bike</SelectItem>
                      <SelectItem value="scooter">Electric Scooter</SelectItem>
                      <SelectItem value="auto">Electric Auto</SelectItem>
                      <SelectItem value="bus">Electric Bus</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Terms and Newsletter */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                    required
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, subscribeNewsletter: checked as boolean }))
                    }
                  />
                  <Label htmlFor="subscribeNewsletter" className="text-sm">
                    Subscribe to our newsletter for updates and offers
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Create Account
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  Phone
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Join Thousands of EV Owners</h2>
            <p className="text-gray-600">Experience the benefits of community-driven charging</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">5,000+</div>
              <p className="text-sm text-gray-600">Charging Stations</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">50+</div>
              <p className="text-sm text-gray-600">Cities Covered</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-gray-600">AI Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
