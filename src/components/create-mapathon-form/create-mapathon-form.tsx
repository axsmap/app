"use client";
import React, { useCallback, useEffect, useState } from "react";
import CustomInput from "../ui/custom-input/custom-input";
import Config from "../../../config/config";

import { useToast } from "../context/toast-context";
import CustomDateRangePicker from "../ui/custom-date-range-picker/custom-date-range-picker";
import { useRouter } from "next/navigation";
import { useCreateMapathonMutation } from "@/Services/modules/mapathon";

export interface ApiError {
  data: {
    general: string;
  };
}

const CreateMapathonForm: React.FC = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const [locations, setLocations] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [createMapathon] = useCreateMapathonMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    locationCoordinates: [null, null],
    startDate: "",
    endDate: "",
    isOpen: true,
    participantsGoal: "",
    donationGoal: 10,
    reviewsGoal: "",
    donationEnabled: false,
    donationAmounts: [{ value: 5 }, { value: 10 }, { value: 15 }],
    teamManager: "",
  });

  const getGeoCode = useCallback(async (placeId: string, address: string) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${Config.MAP_KEY}&place_id=${placeId}`,
        { method: "GET" }
      );
      const location = (await res.json())?.result?.geometry?.location;
      if (location) {
        setFormData((prev) => ({
          ...prev,
          locationCoordinates: [location.lat, location.lng],
          address,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAddress = useCallback(async () => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${Config.MAP_KEY}&input=${search}&types=geocode`
      );
      const address = (await res.json())?.predictions;
      setLocations(address);
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  useEffect(() => {
    if (search) getAddress();
  }, [search, getAddress]);

  const handleLocationSelect = (placeId: string, description: string) => {
    setSearch(description);
    setLocations([]);
    getGeoCode(placeId, description);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      locationCoordinates: formData.locationCoordinates.map(Number),
      participantsGoal: parseInt(formData.participantsGoal),
      reviewsGoal: parseInt(formData.reviewsGoal),
      donationAmounts: formData.donationAmounts,
    };
    try {
      const response = await createMapathon(payload).unwrap();
      showToast("Mapathon is created successfully", "success");
      router.push(`/mapathons/${response?.id}`);
    } catch (error) {
      const apiError = error as ApiError;
      const errMessage =
        apiError?.data?.general || "An unexpected error occurred";
      showToast(errMessage, "error");
    }
  };

  const handleDonationAmountChange = (index: number, value: string) => {
    const updated = [...formData.donationAmounts];
    updated[index].value = parseInt(value) || 0;
    setFormData({ ...formData, donationAmounts: updated });
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Create A Mapathon</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CustomInput
            name="name"
            label="Name"
            placeholder="Name of your Mapathon"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <CustomInput
            name="description"
            label="Mapathon Description"
            multiline
            placeholder="Short Description here..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <CustomInput
            name="address"
            label="Location"
            placeholder="Enter Location"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {locations.length > 0 && (
            <ul className="bg-white border rounded shadow-md max-h-48 overflow-y-auto z-10 w-full">
              {locations.map((loc) => (
                <li
                  key={loc.place_id}
                  onClick={() =>
                    handleLocationSelect(loc.place_id, loc.description)
                  }
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {loc.description}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <CustomDateRangePicker
            label="Duration"
            onChange={({ startDate, endDate }) =>
              setFormData((prev) => ({
                ...prev,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
              }))
            }
          />
        </div>
        <div className="mb-4">
          <CustomInput
            type="number"
            label="How many participants will be joining?"
            placeholder="Number of participants"
            value={formData.participantsGoal}
            onChange={(e) =>
              setFormData({ ...formData, participantsGoal: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <CustomInput
            type="number"
            label="What’s your review goal?"
            placeholder="Number of reviews"
            value={formData.reviewsGoal}
            onChange={(e) =>
              setFormData({ ...formData, reviewsGoal: e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isOpen"
            checked={formData.isOpen}
            onChange={() =>
              setFormData({ ...formData, isOpen: !formData.isOpen })
            }
            className="h-4 w-4 text-yellow-500 border-gray-300 rounded"
          />
          <label htmlFor="isOpen" className="ml-2 text-sm text-gray-600">
            Make this Mapathon open to the public
          </label>
        </div>

        <div className="mb-4">
          <CustomInput
            name="teamManager"
            label="Host As"
            value={formData.teamManager}
            onChange={(e) =>
              setFormData({ ...formData, teamManager: e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="donationEnabled"
            checked={formData.donationEnabled}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                donationEnabled: !prev.donationEnabled,
                donationGoal: 10,
              }))
            }
            className="h-4 w-4 text-yellow-500 border-gray-300 rounded"
          />
          <label
            htmlFor="donationEnabled"
            className="ml-2 text-sm text-gray-600"
          >
            Yes! I want to make this Fundraising Event for AXS Lab
          </label>
        </div>

        {formData.donationEnabled && (
          <>
            <div className="mb-4">
              <CustomInput
                type="number"
                label="Donation Goal"
                value={formData.donationGoal.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    donationGoal: parseInt(e.target.value) || 10,
                  })
                }
              />
            </div>
            <div className="mb-4 flex gap-4">
              {formData.donationAmounts.map((amount, index) => (
                <div className="flex-1" key={index}>
                  <CustomInput
                    type="number"
                    label={`Donation Amount ${index + 1}`}
                    value={amount.value.toString()}
                    onChange={(e) =>
                      handleDonationAmountChange(index, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mb-4">
          <button
            type="submit"
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg"
          >
            Create Mapathon
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMapathonForm;
