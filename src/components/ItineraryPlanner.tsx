import React from 'react';
import { Itinerary } from '../types';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface ItineraryPlannerProps {
  itineraries: Itinerary[];
}

export default function ItineraryPlanner({ itineraries }: ItineraryPlannerProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Travel Itinerary</h2>
      
      {itineraries.map((itinerary) => (
        <div key={itinerary.day} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold">Day {itinerary.day}</h3>
          </div>
          
          <div className="space-y-4">
            {itinerary.activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <div className="font-medium">{activity.time}</div>
                  <div className="text-gray-600">{activity.activity}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    {activity.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}