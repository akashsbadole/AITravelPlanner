import React, { useState } from "react";
import { UserPreferences } from "../types";
import { Sliders, Heart, Clock, Compass, Globe, Mail } from "lucide-react";

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  defaultValues: UserPreferences;
}

export default function PreferencesForm({
  onSubmit,
  defaultValues,
}: PreferencesFormProps) {
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultValues);
  const [error, setError] = useState<string | null>(null);

  const interests = [
    "Culture",
    "Nature",
    "Adventure",
    "Food",
    "History",
    "Relaxation",
    "Shopping",
    "Nightlife",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit(preferences);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-lg font-semibold mb-2">
            <Globe className="w-5 h-5" />
            Country (Optional)
          </label>
          <input
            type="text"
            name="country"
            value={preferences.country}
            onChange={handleChange}
            placeholder="Enter country name"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-lg font-semibold mb-2">
            <Globe className="w-5 h-5" />
            State/Region (Optional)
          </label>
          <input
            type="text"
            name="state"
            value={preferences.state}
            onChange={handleChange}
            placeholder="Enter state or region"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Sliders className="w-5 h-5" />
          Budget Range
        </label>
        <select
          name="budget"
          value={preferences.budget}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="budget">Budget</option>
          <option value="medium">Medium</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Heart className="w-5 h-5" />
          Interests
        </label>
        <div className="grid grid-cols-2 gap-2">
          {interests.map((interest) => (
            <label key={interest} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.interests.includes(interest)}
                onChange={(e) => {
                  const newInterests = e.target.checked
                    ? [...preferences.interests, interest]
                    : preferences.interests.filter((i) => i !== interest);
                  setPreferences({ ...preferences, interests: newInterests });
                }}
                className="rounded"
              />
              <span>{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Clock className="w-5 h-5" />
          Trip Duration (Days)
        </label>
        <input
          type="number"
          name="duration"
          min="1"
          max="30"
          value={preferences.duration}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Compass className="w-5 h-5" />
          Travel Style
        </label>
        <select
          name="travelStyle"
          value={preferences.travelStyle}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="relaxed">Relaxed</option>
          <option value="balanced">Balanced</option>
          <option value="intensive">Intensive</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Mail className="w-5 h-5" />
          Email (Optional)
        </label>
        <input
          type="email"
          name="email"
          value={preferences.email}
          onChange={handleChange}
          placeholder="Enter your email to receive recommendations"
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Generate Recommendations
      </button>
    </form>
  );
}
