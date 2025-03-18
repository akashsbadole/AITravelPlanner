import React from 'react';
import { Accommodation } from '../types';
import { Star, Wifi, Coffee, Tv, MapPin } from 'lucide-react';

interface AccommodationListProps {
  accommodations: Accommodation[];
  onSelect: (accommodation: Accommodation) => void;
}

export default function AccommodationList({ accommodations, onSelect }: AccommodationListProps) {
  const renderRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ));
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'breakfast':
        return <Coffee className="w-4 h-4" />;
      case 'tv':
        return <Tv className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Recommended Accommodations</h2>
      
      {accommodations.map((accommodation) => (
        <div
          key={accommodation.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={accommodation.image}
                alt={accommodation.name}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            
            <div className="p-4 md:w-2/3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{accommodation.name}</h3>
                  <p className="text-gray-500">{accommodation.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{accommodation.price}</div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
              </div>

              <div className="flex items-center mt-2">
                {renderRating(accommodation.rating)}
              </div>

              <div className="flex items-center gap-1 mt-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{accommodation.location}</span>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-3">
                  {accommodation.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-sm text-gray-600"
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelect(accommodation)}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}