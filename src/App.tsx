import React, { useState } from "react";
import { Plane, Map, Bed, Loader2 } from "lucide-react";
import PreferencesForm from "./components/PreferencesForm";
import DestinationCard from "./components/DestinationCard";
import ItineraryPlanner from "./components/ItineraryPlanner";
import AccommodationList from "./components/AccommodationList";
import {
  UserPreferences,
  Destination,
  Itinerary,
  Accommodation,
} from "./types";
import {
  generateDestinations,
  generateItinerary,
  recommendAccommodations,
} from "./lib/gemini";

function App() {
  const [activeTab, setActiveTab] = useState<
    "preferences" | "destinations" | "accommodations"
  >("preferences");
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(false);
  const defaultPreferences: UserPreferences = {
    country: "India",
    state: "Maharashtra",
    budget: "Medium",
    interests: ["Nature"],
    duration: 4,
    travelStyle: "Balanced",
  };
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(defaultPreferences);
  const [page, setPage] = useState(1);
  const [noMoreDestinations, setNoMoreDestinations] = useState(false);

  React.useEffect(() => {
    const storedDestinations = localStorage.getItem("destinations");
    if (storedDestinations) {
      setDestinations(JSON.parse(storedDestinations));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }, [destinations]);

  const handlePreferencesSubmit = async (preferences: UserPreferences) => {
    setLoading(true);
    setUserPreferences(preferences);
    try {
      const storedDestinations = JSON.parse(
        localStorage.getItem("destinations") || "[]"
      );
      const filteredDestinations = storedDestinations.filter(
        (destination: Destination) =>
          destination.country === preferences.country
      );

      if (filteredDestinations.length > 0) {
        setDestinations(filteredDestinations);
      } else {
        const generatedDestinations = await generateDestinations(
          preferences,
          1
        );
        setDestinations(generatedDestinations);
        localStorage.setItem(
          "destinations",
          JSON.stringify(generatedDestinations)
        );
      }
      setActiveTab("destinations");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDestinationSelect = async (destination: Destination) => {
    setLoading(true);
    setSelectedDestination(destination);
    try {
      if (userPreferences) {
        const [generatedItinerary, generatedAccommodations] = await Promise.all(
          [
            generateItinerary(
              destination.name,
              userPreferences.duration,
              userPreferences.interests
            ),
            recommendAccommodations(destination.name, userPreferences.budget),
          ]
        );
        setItineraries(generatedItinerary);
        setAccommodations(generatedAccommodations);
      }
      setActiveTab("accommodations");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccommodationSelect = (accommodation: Accommodation) => {
    console.log("Selected accommodation:", accommodation);
    // Handle booking logic here
  };

  const loadMoreDestinations = async () => {
    setLoading(true);
    try {
      if (userPreferences) {
        const moreDestinations = await generateDestinations(
          userPreferences,
          page + 1
        );
        if (moreDestinations.length === 0) {
          setNoMoreDestinations(true);
        } else {
          const updatedDestinations = [...destinations, ...moreDestinations];
          setDestinations(updatedDestinations);
          localStorage.setItem(
            "destinations",
            JSON.stringify(updatedDestinations)
          );
          setPage(page + 1);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-col sm:flex-row">
            <div className="flex items-center">
              <Plane className="w-8 h-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                <a href="/" className="block sm:hidden">
                  AITravel
                </a>
                <a href="/" className="hidden sm:block">
                  AI Travel Planner
                </a>
              </h1>
            </div>

            <nav className="flex sm:flex-row flex-wrap space-x-4 sm:space-x-0 sm:flex-wrap text-sm flex-col sm:items-end sm:mt-4">
              <button
                onClick={() => setActiveTab("preferences")}
                className={`px-3 py-2 rounded-md ${
                  activeTab === "preferences"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                } sm:mr-2`}
              >
                Preferences
              </button>
              <button
                onClick={() => setActiveTab("destinations")}
                className={`px-3 py-2 rounded-md ${
                  activeTab === "destinations"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                } sm:mr-2`}
              >
                Destinations
              </button>
              <button
                onClick={() => setActiveTab("accommodations")}
                className={`px-3 py-2 rounded-md ${
                  activeTab === "accommodations"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                } sm:mr-2`}
              >
                Accommodations
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Generating recommendations...</span>
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">
                Tell us about your dream trip
              </h2>
              <PreferencesForm
                onSubmit={handlePreferencesSubmit}
                defaultValues={defaultPreferences}
              />
            </div>
          </div>
        )}

        {activeTab === "destinations" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Recommended Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination, index) => (
                <DestinationCard
                  key={`${destination.id}-${index}`}
                  destination={destination}
                  onSelect={handleDestinationSelect}
                />
              ))}
            </div>
            <div className="flex justify-center mt-6">
              {noMoreDestinations ? (
                <span className="text-gray-600">
                  No more destinations to load.
                </span>
              ) : (
                <button
                  onClick={loadMoreDestinations}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Load More Destinations
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "accommodations" && selectedDestination && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">
                Your Trip to {selectedDestination.name}
              </h2>
              <ItineraryPlanner itineraries={itineraries} />
            </div>

            <AccommodationList
              accommodations={accommodations}
              onSelect={handleAccommodationSelect}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
