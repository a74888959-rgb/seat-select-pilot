import { Flight, Seat, Passenger, Booking } from '../types/airline';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { CheckCircle, CreditCard, User, MapPin, Clock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface BookingSummaryProps {
  flight: Flight;
  seat: Seat;
  passenger: Passenger;
  onConfirmBooking: (booking: Booking) => void;
}

const BookingSummary = ({ flight, seat, passenger, onConfirmBooking }: BookingSummaryProps) => {
  const { toast } = useToast();
  
  const taxes = Math.round(seat.price * 0.15); // 15% taxes
  const fees = 25; // Fixed booking fee
  const totalPrice = seat.price + taxes + fees;

  const handleConfirmBooking = () => {
    const booking: Booking = {
      id: crypto.randomUUID(),
      flight,
      passenger,
      seat: { ...seat, isSelected: true },
      totalPrice,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };

    onConfirmBooking(booking);
    
    toast({
      title: "Booking Confirmed! ✈️",
      description: `Your seat ${seat.id} has been successfully reserved.`,
    });
  };

  const getSeatClassDisplay = (seatClass: string) => {
    switch (seatClass) {
      case 'business': return 'Business Class';
      case 'premium': return 'Premium Economy';
      default: return 'Economy';
    }
  };

  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader className="bg-gradient-to-r from-airline-blue to-airline-blue-light text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Flight Details */}
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold flex items-center gap-2">
            <MapPin className="h-4 w-4 text-airline-blue" />
            Flight Details
          </h3>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Flight</span>
              <span className="font-medium">{flight.flightNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Route</span>
              <span className="font-medium">{flight.departure} → {flight.arrival}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="font-medium">{new Date(flight.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="font-medium">{flight.departureTime} - {flight.arrivalTime}</span>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-airline-blue" />
            Passenger Details
          </h3>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="font-medium">{passenger.firstName} {passenger.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="font-medium">{passenger.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Phone</span>
              <span className="font-medium">{passenger.phone}</span>
            </div>
          </div>
        </div>

        {/* Seat Details */}
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-airline-blue" />
            Seat Selection
          </h3>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Seat</span>
              <span className="font-medium">{seat.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Class</span>
              <span className="font-medium">{getSeatClassDisplay(seat.class)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="font-medium capitalize">{seat.type}</span>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4">
          <h3 className="font-semibold">Price Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Fare</span>
              <span>${seat.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes & Fees</span>
              <span>${taxes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking Fee</span>
              <span>${fees}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-airline-blue">${totalPrice}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleConfirmBooking}
          className="w-full mt-6 bg-gradient-to-r from-airline-gold to-accent hover:opacity-90 transition-opacity text-foreground"
          size="lg"
        >
          Confirm Booking - ${totalPrice}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;