import React from 'react';
import { Destination } from '../types';
import { MapPin, Cloud, Wallet } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}

export default function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4">{destination.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm">
              {destination.state 
                ? `${destination.state}, ${destination.country}`
                : destination.country}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{destination.weather}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{destination.budget}</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Popular Activities:</h4>
          <div className="flex flex-wrap gap-2">
            {destination.activities.map((activity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onSelect(destination)}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}