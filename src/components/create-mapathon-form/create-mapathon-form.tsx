// "use client";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import CustomInput from "../custom-input/custom-input";
// import CustomFileUpload from "../custom-file-upload/custom-file-upload";
// import UploadIcon from "@/assets/icons/upload-icon";

// const CreateMapathonForm: React.FC = () => {
//   const router = useRouter();
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (file: File | null) => {
//     setFile(file);
//   };
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     adress: "",
//     location: "",
//     duration: "",
//     participants: "",
//     reviewGoal: "",
//     isPublic: false,
//     hostAs: "",
//     isFundraising: false,
//   });
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     router.push("/mapathons");
//   };

//   return (
//     <div className="p-10">
//       <h2 className="text-2xl font-bold mb-4">Create A Mapathon</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <CustomInput
//             name="name"
//             label="Name"
//             placeholder="Name of your Mapathon"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           />
//         </div>

//         <div className="mb-4">
//           <CustomInput
//             name="description"
//             label="Mapathon Description"
//             value={formData.description}
//             multiline
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//             placeholder="Short Description here..."
//           />
//         </div>
//         <div className="mb-4">
//           <CustomFileUpload
//             icon={<UploadIcon />}
//             label="Add Poster"
//             fileTypeDescription="Files should be less than 5MB."
//             onFileChange={handleFileChange}
//           />
//         </div>

//         <div className="mb-4">
//           <CustomInput
//             name="adress"
//             label="Starting Point"
//             placeholder="Starting Point Address"
//             value={formData.adress}
//             onChange={(e) =>
//               setFormData({ ...formData, adress: e.target.value })
//             }
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="location"
//             className="block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8"
//           >
//             Location
//           </label>
//           <input
//             type="text"
//             id="location"
//             className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-[#969596] font-poppinsRegular text-lg font-normal leading-8"
//             placeholder="Enter location"
//             value={formData.location}
//             onChange={(e) =>
//               setFormData({ ...formData, location: e.target.value })
//             }
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <CustomInput
//             name="duration"
//             label="Duration"
//             placeholder="Select Duration"
//             value={formData.duration}
//             onChange={(e) =>
//               setFormData({ ...formData, duration: e.target.value })
//             }
//           />
//         </div>

//         <div className="mb-4">
//           <CustomInput
//             type="number"
//             label=" How many participants will be joining?"
//             placeholder="Number of participants"
//             value={formData.participants}
//             onChange={(e) =>
//               setFormData({ ...formData, participants: e.target.value })
//             }
//           />
//         </div>

//         <div className="mb-4">
//           <CustomInput
//             type="number"
//             label=" What's your review goal?"
//             placeholder="Number of participants"
//             value={formData.reviewGoal}
//             onChange={(e) =>
//               setFormData({ ...formData, reviewGoal: e.target.value })
//             }
//           />
//         </div>

//         <div className="mb-4 flex items-center">
//           <input
//             type="checkbox"
//             id="isPublic"
//             checked={formData.isPublic}
//             onChange={() =>
//               setFormData({ ...formData, isPublic: !formData.isPublic })
//             }
//             className="h-4 w-4 text-yellow-500 border-gray-300 rounded peer peer-checked:bg-yellow-500 peer-checked:border-yellow-500"
//           />
//           <label
//             htmlFor="isPublic"
//             className="ml-2 block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8"
//           >
//             Make this Mapathon open to the public
//           </label>
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="hostAs"
//             className="block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8"
//           >
//             Host As
//           </label>
//           <input
//             type="number"
//             id="hostAs"
//             placeholder="An Individual"
//             className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-[#969596] font-poppinsRegular text-lg font-normal leading-8"
//             value={formData.hostAs}
//             onChange={(e) =>
//               setFormData({ ...formData, hostAs: e.target.value })
//             }
//             required
//           />
//         </div>

//         <div className="mb-4 flex items-center">
//           <input
//             type="checkbox"
//             id="isFundraising"
//             checked={formData.isFundraising}
//             onChange={() =>
//               setFormData({
//                 ...formData,
//                 isFundraising: !formData.isFundraising,
//               })
//             }
//             className="h-4 w-4 text-yellow-500 border-gray-300 rounded peer focus:ring-0 peer-checked:bg-yellow-500 peer-checked:border-yellow-500"
//           />
//           <label
//             htmlFor="isFundraising"
//             className="ml-2 block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8"
//           >
//             Yes! I want to make this Fundraising Event for AXS Lab
//           </label>
//         </div>

//         <div className="mt-4 flex justify-left">
//           <button
//             type="submit"
//             className="bg-yellow-400 text-black px-6 py-2 rounded-lg"
//           >
//             Create Mapathon
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateMapathonForm;
"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import CustomInput from "../custom-input/custom-input";
import CustomFileUpload from "../custom-file-upload/custom-file-upload";
import UploadIcon from "@/assets/icons/upload-icon";
import { useLazyLocationQuery } from "@/app/Services/modules/mapathon";

const CreateMapathonForm: React.FC = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [getLocation, { data: locationData, isLoading }] =
    useLazyLocationQuery();
  console.log({ locationData });
  const [locations, setLocations] = useState<any[]>([]); // State for location suggestions
  console.log({ locations });
  const handleLocationChange = useCallback(
    (search: string) => {
      console.log("search", search);
      if (search.trim()) {
        // Trigger the API call only if the search term is not empty
        getLocation(search)
          .then((response) => {
            // Ensure that location data is returned
            if (response && response.predictions) {
              setLocations(response.predictions); // Set the location suggestions
            } else {
              console.error("No predictions found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching location data:", error); // Log the error for debugging
          });
      }
    },
    [getLocation]
  );
  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    location: "",
    donationEnabled: false,
    donationAmounts: [{ value: 5 }, { value: 10 }, { value: 15 }],
    donationGoal: "",
    endDate: "",
    isOpen: true,
    participantsGoal: "",
    reviewsGoal: "",
    startDate: "",
    teamManager: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
    };
    setFormData(payload);

    router.push("/mapathons");
  };

  useEffect(() => {
    if (locationData?.predictions) {
      setLocations(locationData.predictions);
    }
  }, [locationData]);

  const handleLocationSelect = useCallback(
    async (placeId: string, description: string) => {
      try {
        const { data } = await getLocation(placeId).unwrap();
        console.log({ data });
        if (data?.result?.geometry?.location) {
          const location = data.result.geometry.location;
          setFormData({
            ...formData,
            lat: location.lat,
            lng: location.lng,
            address: description,
          });
        } else {
          console.error("No location geometry found.");
        }
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    },
    [formData]
  );
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
            value={formData.description}
            multiline
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Short Description here..."
          />
        </div>

        <div className="mb-4">
          <CustomFileUpload
            icon={<UploadIcon />}
            label="Add Poster"
            fileTypeDescription="Files should be less than 5MB."
            onFileChange={handleFileChange}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            name="adress"
            label="Starting Point"
            placeholder="Starting Point Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <CustomInput
            name="location"
            label="Location"
            placeholder="Enter location"
            value={formData.location}
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value });
              handleLocationChange(e.target.value);
            }}
          />
          {/* Show location suggestions */}
          {locations && locations.length > 0 && (
            <ul className="location-suggestions">
              {locations.map((loc) => (
                <li
                  key={loc.place_id}
                  onClick={() =>
                    handleLocationSelect(loc.place_id, loc.description)
                  }
                >
                  {loc.description}
                </li>
              ))}
            </ul>
          )}
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
            label="What's your review goal?"
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
            id="isPublic"
            checked={formData.isOpen}
            onChange={() =>
              setFormData({ ...formData, isOpen: !formData.isOpen })
            }
            className="h-4 w-4 text-yellow-500 border-gray-300 rounded peer peer-checked:bg-yellow-500 peer-checked:border-yellow-500"
          />
          <label
            htmlFor="isPublic"
            className="ml-2 block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8"
          >
            Make this Mapathon open to the public
          </label>
        </div>

        <div className="mb-4">
          <CustomInput
            name="teamManager"
            label="Team Manager"
            placeholder="Manager Name"
            value={formData.teamManager}
            onChange={(e) =>
              setFormData({ ...formData, teamManager: e.target.value })
            }
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isFundraising"
            checked={formData.donationEnabled}
            onChange={() =>
              setFormData({
                ...formData,
                donationEnabled: !formData.donationEnabled,
              })
            }
            className="h-4 w-4 text-yellow-500 border-gray-300 rounded peer focus:ring-0 peer-checked:bg-yellow-500 peer-checked:border-yellow-500"
          />
          <label
            htmlFor="isFundraising"
            className="ml-2 block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8"
          >
            Yes! I want to make this Fundraising Event for AXS Lab
          </label>
        </div>

        <div className="mt-4 flex justify-left">
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
