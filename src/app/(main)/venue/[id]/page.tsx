"use client";
import { useVenueOneQuery } from "@/Services/modules/mapathon";
import { useParams } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaClock,
  FaRegClock,
  FaStar,
} from "react-icons/fa";

const hours = [
  { day: "Monday", hours: "9 AM - 5 PM" },
  { day: "Tuesday", hours: "9 AM - 5 PM" },
  { day: "Wednesday", hours: "9 AM - 5 PM" },
  { day: "Thursday", hours: "9 AM - 5 PM" },
  { day: "Friday", hours: "9 AM - 5 PM" },
  { day: "Saturday", hours: "10 AM - 4 PM" },
  { day: "Sunday", hours: "Closed" },
];
const venueData: React.FC = () => {
  const { id: placeId } = useParams();

  const { data: venueData } = useVenueOneQuery({
    placeId: placeId as string,
  });
  return (
    <div className="p-4">
      {venueData && (
        <>
          <div className="relative w-full h-[60vh]">
            <img
              src={venueData?.coverPhoto}
              alt={venueData.name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-3xl font-semibold">{venueData.name}</h1>
              <p className="text-yellow-400 mt-2 flex items-center">
                <FaStar className="w-4 h-4 mr-1" />
                {venueData?.reviews?.length || 0} reviews
              </p>
            </div>
          </div>

          <div className="mt-6 p-4">
            <div className="mb-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="w-5 h-5 text-gray-600 mr-2" />
                <p className="font-bold">Address</p>
              </div>
              <p className="ml-7">{venueData.address}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <FaPhoneAlt className="w-5 h-5 text-gray-600 mr-2" />
                <p className="font-bold">Phone</p>
              </div>
              <p className="flex items-center ml-7">
                {venueData.internationalPhone}
              </p>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <FaGlobe className="w-5 h-5 text-gray-600 mr-2" />
                <p className="font-bold">Website</p>
              </div>
              <div className="ml-7">
                <a
                  href={venueData.website}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {venueData.website}
                </a>
              </div>
            </div>
          </div>
          <div className="mb-4 p-4">
            <div className="flex items-center">
              <FaRegClock className="w-5 h-5 text-gray-600 mr-2" />
              <p className="font-bold">Hours</p>
            </div>
            <ul className="space-y-2 ml-7">
              {hours.map(
                (hour: { day: string; hours: string }, index: number) => (
                  <li key={index} className="text-gray-700">
                    {hour.day}: {hour.hours}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mb-4 p-4">
            <div className="flex items-center">
              <FaRegClock className="w-5 h-5 text-gray-600 mr-2" />
              <p className="font-bold">Reviews</p>
            </div>
            <p className="ml-7">No reviews yet.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default venueData;
