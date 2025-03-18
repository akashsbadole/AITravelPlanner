export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  budget: string;
  activities: string[];
  country: string;
  state?: string;
  weather: {
    description: string;
    temperature: string;
  };
}

export interface UserPreferences {
  budget: string;
  interests: string[];
  duration: number;
  travelStyle: string;
  country?: string;
  state?: string;
  email?: string;
}

export interface Itinerary {
  day: number;
  activities: {
    time: string;
    activity: string;
    location: string;
  }[];
}

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  price: string;
  rating: number;
  location: string;
  amenities: string[];
  image: string;
}