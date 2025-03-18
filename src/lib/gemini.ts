import { GoogleGenerativeAI } from '@google/generative-ai';
import { Destination } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

function cleanAndParseJSON(text: string) {
  // Remove markdown code blocks if present
  const jsonString = text.replace(/```(json)?\n?/g, '').trim();
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw error;
  }
}

export async function generateDestinations(preferences: {
  budget: string;
  interests: string[];
  duration: number;
  travelStyle: string;
  country?: string;
  state?: string;
}, p0: number) {
  const locationPrompt = preferences.country
    ? `in ${preferences.country}${preferences.state ? `, specifically in ${preferences.state}` : ''}`
    : 'worldwide';

  const prompt = `As an AI travel expert, recommend 3 destinations ${locationPrompt} based on these preferences:
    - Budget: ${preferences.budget}
    - Interests: ${preferences.interests.join(', ')}
    - Duration: ${preferences.duration} days
    - Travel Style: ${preferences.travelStyle}

    For each destination, provide:
    - Name
    - Description
    - Current weather
    - Budget category
    - 4 popular activities
    - Country
    - State/Region (if applicable)

    Format as JSON array with properties: id, name, description, weather, budget, activities, country, state`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error('Error generating destinations:', error);
    return [];
  }
}

export async function generateItinerary(destination: string, duration: number, interests: string[]) {
  const prompt = `Create a ${duration}-day itinerary for ${destination} focusing on: ${interests.join(', ')}.
    Include 3 activities per day with times and locations.
    Format as JSON array with properties: day, activities (array of {time, activity, location})`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return [];
  }
}

export async function recommendAccommodations(destination: string, budget: string) {
  const prompt = `Recommend 3 accommodations in ${destination} for ${budget} budget.
    Include details:
    - Name
    - Type (hotel, hostel, etc.)
    - Price range
    - Rating (1-5)
    - Location
    - Amenities (list)
    
    Format as JSON array with properties: id, name, type, price, rating, location, amenities`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error('Error recommending accommodations:', error);
    return [];
  }
}

export async function generateEmailContent(
  destination: Destination,
  // itineraries: Itinerary[],
  // accommodations: Accommodation[]
) {
  const prompt = `Create a detailed email summary for a trip to ${destination.name}.
    Include:
    - Destination overview
    - Weather and best time to visit
    - Top activities
    - Recommended accommodations
    - Daily itinerary highlights
    
    Format the response as a well-structured, friendly email.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating email content:', error);
    return '';
  }
}