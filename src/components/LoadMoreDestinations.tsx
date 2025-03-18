import React from "react";

interface Destination {
  id: number;
  name: string;
  details: {
    temperature: string;
    condition: string;
  };
}

interface LoadMoreDestinationsProps {
  destinations: Destination[];
  onLoadMore: () => void;
}

export default function LoadMoreDestinations({
  destinations,
  onLoadMore,
}: LoadMoreDestinationsProps) {
  return (
    <div>
      <ul>
        {destinations.map((destination) => (
          <li key={destination.id}>
            <h3>{destination.name}</h3>
            <p>Temperature: {destination.details.temperature}</p>
            <p>Condition: {destination.details.condition}</p>
          </li>
        ))}
      </ul>
      <button onClick={onLoadMore}>Load More Destinations</button>
    </div>
  );
}
