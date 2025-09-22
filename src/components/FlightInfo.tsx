import { Flight } from '../types/airline';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plane, Clock, Calendar, MapPin } from 'lucide-react';

interface FlightInfoProps {
  flight: Flight;
}

const FlightInfo = ({ flight }: FlightInfoProps) => {
  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader className="bg-gradient-to-r from-airline-blue to-airline-blue-light text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Plane className="h-5 w-5" />
          Flight {flight.flightNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-airline-blue" />
              <div>
                <p className="font-semibold">{flight.departure}</p>
                <p className="text-sm text-muted-foreground">Departure</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-airline-blue" />
              <div>
                <p className="font-semibold">{flight.departureTime}</p>
                <p className="text-sm text-muted-foreground">Local Time</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-airline-gold" />
              <div>
                <p className="font-semibold">{flight.arrival}</p>
                <p className="text-sm text-muted-foreground">Arrival</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-airline-gold" />
              <div>
                <p className="font-semibold">{flight.arrivalTime}</p>
                <p className="text-sm text-muted-foreground">Local Time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(flight.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-muted-foreground" />
              <span>{flight.aircraft}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{flight.duration}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightInfo;