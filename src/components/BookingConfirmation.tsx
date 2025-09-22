import { Booking } from '../types/airline';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, Download, Mail, Plane } from 'lucide-react';

interface BookingConfirmationProps {
  booking: Booking;
  onStartNewBooking: () => void;
}

const BookingConfirmation = ({ booking, onStartNewBooking }: BookingConfirmationProps) => {
  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Ticket download would start here!');
  };

  const handleEmailTicket = () => {
    // In a real app, this would send the ticket via email
    alert(`Ticket sent to ${booking.passenger.email}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-airline-blue/5 to-accent/5 p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-[var(--shadow-card)]">
        <CardHeader className="text-center bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
          <p className="text-green-100">Your flight has been successfully booked</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <p className="text-lg font-semibold text-airline-blue">
              Confirmation Number: {booking.id.slice(0, 8).toUpperCase()}
            </p>
            <p className="text-muted-foreground">
              Please save this confirmation number for your records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Plane className="h-4 w-4 text-airline-blue" />
                Flight Information
              </h3>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Flight</span>
                  <span className="font-medium">{booking.flight.flightNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Route</span>
                  <span className="font-medium">{booking.flight.departure} → {booking.flight.arrival}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="font-medium">{new Date(booking.flight.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Seat</span>
                  <span className="font-medium">{booking.seat.id}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Passenger Details</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="font-medium">{booking.passenger.firstName} {booking.passenger.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="font-medium">{booking.passenger.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Paid</span>
                  <span className="font-medium text-airline-blue">${booking.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              onClick={handleDownloadTicket}
              variant="outline"
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Download E-Ticket
            </Button>
            <Button 
              onClick={handleEmailTicket}
              variant="outline"
              className="flex-1"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Ticket
            </Button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-amber-800 mb-2">Important Reminders:</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Arrive at the airport at least 2 hours before domestic flights</li>
              <li>• Check-in online 24 hours before your flight</li>
              <li>• Ensure your ID matches the name on your ticket</li>
              <li>• Review baggage policies before arriving at the airport</li>
            </ul>
          </div>

          <Button 
            onClick={onStartNewBooking}
            className="w-full bg-gradient-to-r from-airline-blue to-airline-blue-light hover:opacity-90 transition-opacity"
            size="lg"
          >
            Book Another Flight
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingConfirmation;