"use client";
import React, { useCallback, useEffect, useState } from "react";
import CustomInput from "../ui/custom-input/custom-input";
import Config from "../../../config/config";
import CustomDateRangePicker from "../ui/custom-date-range-picker/custom-date-range-picker";
import { useRouter } from "next/navigation";
import { useCreateMapathonMutation } from "@/Services/modules/mapathon";
import { useTranslation } from "react-i18next";
import { showToast } from "../toast";
import CreateMapathonMap from "./CreateMapathonMap";

export interface ApiError {
  data: {
    general?: string;
    message?: string;
  };
}

const CreateMapathonForm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [locations, setLocations] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [locationSelected, setLocationSelected] = useState(false);
  const [createMapathon] = useCreateMapathonMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    locationCoordinates: [null, null] as [number | null, number | null],
    startDate: "",
    endDate: "",
    isOpen: true,
    participantsGoal: "",
    donationGoal: 10,
    reviewsGoal: "",
    donationEnabled: false,
    donationAmounts: [{ value: 5 }, { value: 10 }, { value: 15 }],
    // teamManager: "",
  });

  const getGeoCode = useCallback(async (placeId: string, address: string) => {
    try {

      const res = await fetch(
        `/api/place-detail?place_id=${placeId}`,
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
    if (!locationSelected) {
      try {
        const res = await fetch(`/api/places?input=${search}`, {
          method: "GET",
        });
        const address = (await res.json())?.predictions;
        setLocations(address);
      } catch (error) {
        console.log(error);
      }
    }
  }, [search, locationSelected]);

  useEffect(() => {
    if (search && !locationSelected) {
      getAddress();
    }
  }, [search, locationSelected, getAddress]);

  const handleLocationSelect = (placeId: string, description: string) => {
    setSearch(description);
    setLocations([]);
    setFormData({ ...formData, address: description,locationCoordinates:[null,null] });
    getGeoCode(placeId, description);
    setLocationSelected(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload:any = {
      ...formData,
      locationCoordinates: formData.locationCoordinates.map(Number),
      participantsGoal: parseInt(formData.participantsGoal),
      reviewsGoal: parseInt(formData.reviewsGoal),
      donationAmounts: formData.donationEnabled ? formData.donationAmounts : undefined,
    };
    try {
      const response:any = await createMapathon(payload).unwrap();
      showToast({
        message: t("createMapathonSuccessMessage"),
        type: "success",
      });
      router.push(`/mapathons/${response?.id}`);
    } catch (error) {
      const apiError = error as ApiError;
      const errMessage =
        apiError?.data?.message || t("createMapathonErrorMessage");
      showToast({ message: errMessage, type: "error" });
    }
  };

  const handleDonationAmountChange = (index: number, value: string) => {
    const updated = [...formData.donationAmounts];
    updated[index].value = parseInt(value) || 0;
    setFormData({ ...formData, donationAmounts: updated });
  };

  const removeDonationAmount = (index: number) => {
    const updated = formData.donationAmounts.filter((_, i) => i !== index);
    setFormData({ ...formData, donationAmounts: updated });
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">{t("createMapathonTitle")}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CustomInput
            name="name"
            label={t("createMapathonNameLabel")}
            placeholder={t("createMapathonNamePlaceholder")}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <CustomInput
            name="description"
            label={t("createMapathonDescriptionLabel")}
            multiline
            placeholder={t("createMapathonDescriptionPlaceholder")}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <CustomInput
            name="address"
            label={t("createMapathonLocationLabel")}
            placeholder={t("createMapathonLocationPlaceholder")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setLocationSelected(false);
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

        {/* Map Preview with Draggable Marker */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("createMapathonMapLabel")}
          </label>
          <CreateMapathonMap
            location={{
              lat: formData.locationCoordinates[0],
              lng: formData.locationCoordinates[1],
            }}
          />
          <p className="text-xs text-gray-500 mt-1">
            {t("createMapathonMapHelperText")}
          </p>
        </div>

        <div className="mb-4">
          <CustomDateRangePicker
            label={t("createMapathonDurationLabel")}
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
            label={t("createMapathonParticipantsLabel")}
            placeholder={t("createMapathonParticipantsPlaceholder")}
            value={formData.participantsGoal}
            onChange={(e) =>
              setFormData({ ...formData, participantsGoal: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <CustomInput
            type="number"
            label={t("createMapathonReviewsLabel")}
            placeholder={t("createMapathonReviewsPlaceholder")}
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
            {t("createMapathonIsOpenLabel")}
          </label>
        </div>

        {/* Fundraising section */}
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
            {t("createMapathonDonationEnabledLabel")}
          </label>
        </div>

        {formData.donationEnabled && (
          <>
            <div className="mb-4">
              <CustomInput
                type="number"
                label={t("createMapathonDonationGoalLabel")}
                value={formData.donationGoal.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    donationGoal: parseInt(e.target.value) || 10,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8 mb-2">
                {t("createMapathonDonationAmountsLabel")}
              </label>
              <div className="flex gap-4">
                {formData.donationAmounts.map((amount, index) => (
                  <div className="flex-1 relative" key={index}>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input
                        type="number"
                        min={5}
                        max={10000}
                        className="block w-full pl-8 pr-10 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        value={amount.value}
                        onChange={(e) =>
                          handleDonationAmountChange(index, e.target.value)
                        }
                      />
                      {formData.donationAmounts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDonationAmount(index)}
                          className="absolute right-2 top-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mb-4">
          <button
            type="submit"
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg"
          >
            {t("createMapathonSubmitButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMapathonForm;
