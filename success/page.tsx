'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const stationId = searchParams.get('stationId')
  const amount = searchParams.get('amount')
  
  const [bookingDetails] = useState({
    bookingId: 'EVC' + Date.now().toString().slice(-8),
    stationName: stationId === '1' ? 'Tata Power Charging Station' : 'Ather Grid Station',
    address: stationId === '1' ? 'Connaught Place, New Delhi' : 'Koramangala, Bangalore',
    date: new Date().toLocaleDateString(),
    time: '10:00 AM - 12:00 PM',
    amount: amount || '240',
    paymentMethod: 'UPI',
    transactionId: 'TXN' + Date.now().toString().slice(-10)
  })

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
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="bg-green-600">Payment Successful</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">✓</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">
              Your charging slot has been booked successfully. You will receive a confirmation email shortly.
            </p>
          </div>

          {/* Booking Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Booking Confirmation</CardTitle>
              <CardDescription>
                Booking ID: {bookingDetails.bookingId}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Station:</span>
                  <div className="font-medium">{bookingDetails.stationName}</div>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <div className="font-medium">{bookingDetails.date}</div>
                </div>
                <div>
                  <span className="text-gray-600">Time Slot:</span>
                  <div className="font-medium">{bookingDetails.time}</div>
                </div>
                <div>
                  <span className="text-gray-600">Amount Paid:</span>
                  <div className="font-medium text-green-600">₹{bookingDetails.amount}</div>
                </div>
              </div>

              <Separator />

              <div>
                <span className="text-sm text-gray-600">Address:</span>
                <div className="font-medium">{bookingDetails.address}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Payment Method:</span>
                  <div className="font-medium">{bookingDetails.paymentMethod}</div>
                </div>
                <div>
                  <span className="text-gray-600">Transaction ID:</span>
                  <div className="font-medium">{bookingDetails.transactionId}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Check Your Email</h4>
                    <p className="text-sm text-gray-600">
                      A confirmation email with QR code has been sent to your registered email address.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Navigate to Station</h4>
                    <p className="text-sm text-gray-600">
                      Use the navigation feature to reach the charging station on time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Start Charging</h4>
                    <p className="text-sm text-gray-600">
                      Show the QR code at the station to start your charging session.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Button 
              onClick={() => {
                const url = `https://www.google.com/maps/dir//${stationId === '1' ? '28.6315,77.2167' : '12.9352,77.6245'}`
                window.open(url, '_blank')
              }}
              className="w-full"
            >
              Get Directions
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                View in Dashboard
              </Button>
            </Link>
          </div>

          {/* Additional Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/map">
              <Button variant="outline" className="w-full">
                Find More Stations
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" className="w-full">
                Chat Support
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              Download Receipt
            </Button>
          </div>

          {/* Important Notes */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">⚠️</span>
                  <span>Please arrive at the station 5 minutes before your scheduled time.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">ℹ️</span>
                  <span>Free cancellation is available up to 1 hour before your slot.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">💡</span>
                  <span>Contact our AI assistant if you need any help during charging.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">📱</span>
                  <span>Keep your phone handy to show the QR code at the station.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <div className="text-center mt-8 p-6 bg-gray-100 rounded-lg">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our AI assistant is available 24/7 to help you with any questions or issues.
            </p>
            <Link href="/chat">
              <Button variant="outline">
                Chat with AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
