"use client";
import { useVenueOneQuery } from "@/Services/modules/mapathon";
import { formatDate } from "@/utils/helperFunction";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaRegClock,
  FaStar,
} from "react-icons/fa";

const venueData: React.FC = () => {
  const { id: placeId } = useParams();
  console.log("venue id ");

  const { data: venueData } = useVenueOneQuery({
    placeId: placeId as string,
  });
  console.log({ venueData });
  const venueDetails = venueData?.data;
  return (
    <div className="p-4">
      {venueDetails && (
        <>
          <div className="relative w-full h-[60vh]">
            <img
              src={venueDetails?.googleData?.photo}
              alt={"Place Image"}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-3xl font-semibold">
                {venueDetails?.googleData?.name}
              </h1>
              <p className="text-yellow-400 mt-2 flex items-center">
                <FaStar className="w-4 h-4 mr-1" />
                {venueDetails?.googleData?.rating || 0} (
                {venueDetails?.googleData?.user_ratings_total}) reviews
              </p>
            </div>
          </div>

          {venueDetails?.googleData && (
            <div className="mt-6 p-4">
              <div className="mb-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-600 mr-2" />
                  <p className="font-bold">Address</p>
                </div>
                <p className="ml-7">
                  {venueDetails?.googleData?.formatted_address}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <FaPhoneAlt className="w-5 h-5 text-gray-600 mr-2" />
                  <p className="font-bold">Phone</p>
                </div>
                <p className="flex items-center ml-7">
                  {venueDetails?.googleData?.international_phone_number}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <FaGlobe className="w-5 h-5 text-gray-600 mr-2" />
                  <p className="font-bold">Website</p>
                </div>
                <div className="ml-7">
                  <a
                    href={venueDetails?.googleData?.website}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {venueDetails?.googleData?.website}
                  </a>
                </div>
              </div>
            </div>
          )}
          {venueDetails?.googleData?.opening_hours && (
            <div className="mb-4 p-4">
              <div className="flex items-center">
                <FaRegClock className="w-5 h-5 text-gray-600 mr-2" />
                <p className="font-bold">Hours</p>
              </div>
              <ul className="space-y-2 ml-7">
                {venueDetails.googleData?.opening_hours.weekday_text.map(
                  (text: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {text}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {venueDetails?.axsReviews?.filter((r: any) => r.comment)?.length >
            0 && (
            <div>
              <div className="mb-4 p-4">
                <div className="flex items-center">
                  <FaRegClock className="w-5 h-5 text-gray-600 mr-2" />
                  <p className="font-bold">Axs Reviews</p>
                </div>
              </div>
              <ul className="space-y-4 ml-7">
                {venueDetails?.axsReviews
                  .filter((axsReview: any) => axsReview.comment)
                  .map((axsReview: any, index: number) => (
                    <li
                      key={index}
                      className="bg-white p-4 rounded-2xl shadow-md flex flex-col md:flex-row gap-4"
                    >
                      <Image
                        width={100}
                        height={100}
                        src={axsReview.avatar}
                        alt="Axs Review Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <a
                          href={axsReview.author_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {axsReview.firstName} {axsReview.lastName}
                        </a>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{formatDate(axsReview.createdAt)}</span>
                        </div>
                        <p className="mt-2 text-gray-700">
                          {axsReview.comment}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="mb-4 p-4">
            {(venueDetails?.axsReviews ??[])?.filter((r: any) => r.comment)?.length === 0  &&
              (venueDetails?.googleData?.reviews ??[])?.length > 0 &&
               (
                <div>
                  <div className="mb-4 p-4">
                    <div className="flex items-center">
                      <FaRegClock className="w-5 h-5 text-gray-600 mr-2" />
                      <p className="font-bold">Reviews</p>
                    </div>
                  </div>
                  <ul className="space-y-4 ml-7">
                    {venueDetails?.googleData?.reviews.map(
                      (review: any, index: number) => (
                        <li
                          key={index}
                          className="bg-white p-4 rounded-2xl shadow-md flex flex-col md:flex-row gap-4"
                        >
                          <Image
                            width={100}
                            height={100}
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <a
                              href={review.author_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-blue-600 hover:underline"
                            >
                              {review.author_name}
                            </a>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <div className="flex items-center text-yellow-500">
                                {[...Array(review.rating)].map((_, i) => (
                                  <FaStar key={i} />
                                ))}
                              </div>
                              <span>· {review.relative_time_description}</span>
                            </div>
                            <p className="mt-2 text-gray-700">{review.text}</p>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default venueData;
