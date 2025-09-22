import { useState } from 'react';
import { Seat, Passenger, Booking } from '../types/airline';
import { mockFlight, mockSeats } from '../data/mockData';
import FlightInfo from '../components/FlightInfo';
import SeatMap from '../components/SeatMap';
import PassengerForm from '../components/PassengerForm';
import BookingSummary from '../components/BookingSummary';
import BookingConfirmation from '../components/BookingConfirmation';
import { Button } from '../components/ui/button';
import { ArrowLeft, Plane } from 'lucide-react';

type BookingStep = 'seat-selection' | 'passenger-info' | 'booking-summary' | 'confirmation';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('seat-selection');
  const [seats, setSeats] = useState<Seat[]>(mockSeats);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const handleSeatSelect = (seat: Seat) => {
    // Deselect previously selected seat
    setSeats(prevSeats => 
      prevSeats.map(s => ({ ...s, isSelected: false }))
    );
    
    // Select new seat
    setSeats(prevSeats => 
      prevSeats.map(s => s.id === seat.id ? { ...s, isSelected: true } : s)
    );
    
    setSelectedSeat(seat);
  };

  const handleContinueToPassengerInfo = () => {
    if (selectedSeat) {
      setCurrentStep('passenger-info');
    }
  };

  const handlePassengerSubmit = (passengerData: Passenger) => {
    setPassenger(passengerData);
    setCurrentStep('booking-summary');
  };

  const handleConfirmBooking = (booking: Booking) => {
    // Update seat availability
    setSeats(prevSeats => 
      prevSeats.map(s => 
        s.id === booking.seat.id 
          ? { ...s, isAvailable: false, isSelected: false }
          : s
      )
    );
    
    setConfirmedBooking(booking);
    setCurrentStep('confirmation');
  };

  const handleStartNewBooking = () => {
    setCurrentStep('seat-selection');
    setSelectedSeat(null);
    setPassenger(null);
    setConfirmedBooking(null);
  };

  const handleBackStep = () => {
    switch (currentStep) {
      case 'passenger-info':
        setCurrentStep('seat-selection');
        break;
      case 'booking-summary':
        setCurrentStep('passenger-info');
        break;
      default:
        break;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'seat-selection': return 'Select Your Seat';
      case 'passenger-info': return 'Passenger Information';
      case 'booking-summary': return 'Review & Confirm';
      case 'confirmation': return 'Booking Confirmed';
    }
  };

  if (currentStep === 'confirmation' && confirmedBooking) {
    return <BookingConfirmation booking={confirmedBooking} onStartNewBooking={handleStartNewBooking} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-airline-blue to-airline-blue-light rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">SkyBooker</h1>
                <p className="text-muted-foreground">Premium Airline Seat Management</p>
              </div>
            </div>
            {currentStep !== 'seat-selection' && (
              <Button variant="outline" onClick={handleBackStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              {(['seat-selection', 'passenger-info', 'booking-summary'] as const).map((step, index) => {
                const isActive = currentStep === step;
                const isCompleted = ['passenger-info', 'booking-summary'].includes(currentStep) && index < ['seat-selection', 'passenger-info', 'booking-summary'].indexOf(currentStep);
                
                return (
                  <div key={step} className="flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${isActive ? 'bg-airline-blue text-white' : 
                        isCompleted ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}
                    `}>
                      {index + 1}
                    </div>
                    {index < 2 && (
                      <div className={`w-16 h-0.5 mx-2 ${
                        isCompleted ? 'bg-green-500' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-center mt-2">
            <h2 className="text-lg font-semibold">{getStepTitle()}</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flight Info - Always visible */}
          <div className="lg:col-span-1">
            <FlightInfo flight={mockFlight} />
          </div>

          {/* Dynamic Content */}
          <div className="lg:col-span-2">
            {currentStep === 'seat-selection' && (
              <div className="space-y-6">
                <SeatMap 
                  seats={seats} 
                  onSeatSelect={handleSeatSelect}
                  selectedSeat={selectedSeat}
                />
                {selectedSeat && (
                  <div className="bg-card p-6 rounded-xl shadow-[var(--shadow-card)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Selected: Seat {selectedSeat.id}</h3>
                        <p className="text-muted-foreground">
                          {selectedSeat.class === 'business' ? 'Business Class' : 
                           selectedSeat.class === 'premium' ? 'Premium Economy' : 'Economy'} • 
                          {selectedSeat.type} seat • ${selectedSeat.price}
                        </p>
                      </div>
                      <Button 
                        onClick={handleContinueToPassengerInfo}
                        className="bg-gradient-to-r from-airline-blue to-airline-blue-light hover:opacity-90 transition-opacity"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 'passenger-info' && (
              <PassengerForm onSubmit={handlePassengerSubmit} />
            )}

            {currentStep === 'booking-summary' && selectedSeat && passenger && (
              <BookingSummary
                flight={mockFlight}
                seat={selectedSeat}
                passenger={passenger}
                onConfirmBooking={handleConfirmBooking}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;