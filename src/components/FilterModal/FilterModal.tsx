import { venuesCategories } from "@/utils/constants";
import React from "react";
import { FaTimes } from "react-icons/fa";

interface FilterModalProps {
  filters: {
    venueType: string;
    participant: string;
    interiorScore: string;
    restroomScore: string;
    parking: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onFilterChange: (filterName: string, value: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  filters,
  isOpen,
  onClose,
  onApplyFilters,
  onClearFilters,
  onFilterChange,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed mt-1 top-0 right-0 bg-black bg-opacity-50 flex justify-center items-start z-50 max-h-full">
      <div className="bg-white rounded-lg w-full max-w-[400px] p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Filter</h3>
          <button onClick={onClose} className="text-gray-500">
            <FaTimes />
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Venue Type</label>
          <select
            className="w-full p-2 border rounded-lg mt-2"
            value={filters.venueType}
            onChange={(e) => onFilterChange("venueType", e.target.value)}
          >
            <option value="all">All</option>

            {venuesCategories
              .filter((category) => category.value !== "all")
              .map((category) => (
                <optgroup
                  key={category.value}
                  label={category.value
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^\w/, (char) => char.toUpperCase())}
                >
                  {category.options.map((option) => (
                    <option key={option} value={option}>
                      {option
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </option>
                  ))}
                </optgroup>
              ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Participant</label>
          <div className="flex mt-2">
            {["Any", "At least Yellow", "Accessible"].map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-lg mr-2 border-[1px] border-[#838799] ${
                  filters.participant === option ? "font-bold" : ""
                }`}
                onClick={() => onFilterChange("participant", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Interior Score</label>
          <div className="flex mt-2">
            {["Any", "At least Yellow", "Accessible"].map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-lg mr-2 border-[1px] border-[#838799] ${
                  filters.interiorScore === option ? "font-bold" : ""
                }`}
                onClick={() => onFilterChange("interiorScore", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Restroom Score</label>
          <div className="flex mt-2">
            {["Any", "At least Yellow", "Accessible"].map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-lg mr-2 border-[1px] border-[#838799] ${
                  filters.restroomScore === option ? "font-bold" : ""
                }`}
                onClick={() => onFilterChange("restroomScore", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Parking</label>
          <div className="flex mt-2">
            {["Allowed"].map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-lg mr-2 border-[1px] border-[#838799] ${
                  filters.parking === option ? "font-bold" : ""
                }`}
                onClick={() => {
                  const newFilterValue =
                    filters.parking === option ? "" : option;
                  onFilterChange("parking", newFilterValue);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Clear
          </button>
          <button
            onClick={onApplyFilters}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
