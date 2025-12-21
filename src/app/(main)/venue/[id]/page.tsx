"use client";
import { useVenueOneQuery } from "@/Services/modules/mapathon";
import { formatDate } from "@/utils/helperFunction";
import { getScoreColor, getScoreLabel } from "@/utils/accessibility";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaRegClock,
  FaStar,
  FaDoorOpen,
  FaWarehouse,
  FaRestroom,
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

          {/* Accessibility Scores Section */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Accessibility Scores</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Entrance Score */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center ${getScoreColor(
                    venueDetails?.entranceScore
                  )}`}
                >
                  <FaDoorOpen className="text-white text-2xl" />
                </div>
                <p className="mt-2 text-sm font-semibold text-center">
                  Entrance
                </p>
                <p className="text-xs text-gray-600 text-center">
                  {getScoreLabel(venueDetails?.entranceScore)}
                </p>
              </div>

              {/* Interior Score */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center ${getScoreColor(
                    venueDetails?.interiorScore
                  )}`}
                >
                  <FaWarehouse className="text-white text-2xl" />
                </div>
                <p className="mt-2 text-sm font-semibold text-center">
                  Interior
                </p>
                <p className="text-xs text-gray-600 text-center">
                  {getScoreLabel(venueDetails?.interiorScore)}
                </p>
              </div>

              {/* Restroom Score */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center ${getScoreColor(
                    venueDetails?.restroomScore
                  )}`}
                >
                  <FaRestroom className="text-white text-2xl" />
                </div>
                <p className="mt-2 text-sm font-semibold text-center">
                  Restroom
                </p>
                <p className="text-xs text-gray-600 text-center">
                  {getScoreLabel(venueDetails?.restroomScore)}
                </p>
              </div>
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

          {/* AXS Map User Reviews Section */}
          {Array.isArray(venueDetails?.axsReviews) && venueDetails.axsReviews.length > 0 && (
            <div className="mt-6 p-4">
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <FaStar className="w-5 h-5 text-primary mr-2" />
                  <h2 className="text-xl font-bold" id="axs-reviews-heading">
                    AXS Map Reviews ({venueDetails.axsReviews.length})
                  </h2>
                </div>
                <p className="text-sm text-gray-600">
                  Community accessibility reviews from AXS Map users
                </p>
              </div>
              <ul 
                className="space-y-4" 
                aria-labelledby="axs-reviews-heading"
                role="list"
              >
                {venueDetails.axsReviews.map((axsReview: any, index: number) => (
                  <li
                    key={`axs-review-${index}`}
                    className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                    role="article"
                    aria-label={`Review by ${axsReview.firstName} ${axsReview.lastName}`}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* User Avatar */}
                      <div className="flex-shrink-0">
                        <Image
                          width={48}
                          height={48}
                          src={axsReview.avatar || '/default-avatar.png'}
                          alt={`${axsReview.firstName} ${axsReview.lastName}'s profile picture`}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      </div>
                      
                      {/* Review Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {axsReview.firstName} {axsReview.lastName}
                          </h3>
                          <time 
                            className="text-sm text-gray-500 mt-1 md:mt-0"
                            dateTime={axsReview.createdAt}
                          >
                            {formatDate(axsReview.createdAt)}
                          </time>
                        </div>
                        
                        {/* Review Comment */}
                        {axsReview.comments ? (
                          <p className="mt-3 text-gray-700 leading-relaxed">
                            {axsReview.comments}
                          </p>
                        ) : (
                          <p className="mt-3 text-gray-500 italic">
                            User provided accessibility ratings without a written comment.
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Google Reviews Section - Show only if no AXS reviews */}
          {(venueDetails?.axsReviews?.length === 0 || !venueDetails?.axsReviews) &&
            (venueDetails?.googleData?.reviews ?? [])?.length > 0 && (
              <div className="mt-6 p-4">
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <FaStar className="w-5 h-5 text-yellow-500 mr-2" />
                    <h2 className="text-xl font-bold" id="google-reviews-heading">
                      Google Reviews ({venueDetails.googleData.reviews.length})
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600">
                    General reviews from Google users
                  </p>
                </div>
                <ul 
                  className="space-y-4"
                  aria-labelledby="google-reviews-heading"
                  role="list"
                >
                  {venueDetails.googleData.reviews.map(
                    (review: any, index: number) => (
                      <li
                        key={`google-review-${index}`}
                        className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                        role="article"
                        aria-label={`Review by ${review.author_name}`}
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* User Avatar */}
                          <div className="flex-shrink-0">
                            <img
                              width={48}
                              height={48}
                              src={review.profile_photo_url}
                              alt={`${review.author_name}'s profile picture`}
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                            />
                          </div>
                          
                          {/* Review Content */}
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                              <a
                                href={review.author_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-blue-600 hover:underline text-lg"
                              >
                                {review.author_name}
                              </a>
                              <time 
                                className="text-sm text-gray-500 mt-1 md:mt-0"
                                aria-label={`Posted ${review.relative_time_description}`}
                              >
                                {review.relative_time_description}
                              </time>
                            </div>
                            
                            {/* Star Rating */}
                            <div 
                              className="flex items-center gap-1 my-2"
                              role="img"
                              aria-label={`Rating: ${review.rating} out of 5 stars`}
                            >
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-500'
                                      : 'text-gray-300'
                                  }`}
                                  aria-hidden="true"
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">
                                {review.rating}/5
                              </span>
                            </div>
                            
                            {/* Review Text */}
                            <p className="mt-3 text-gray-700 leading-relaxed">
                              {review.text}
                            </p>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default venueData;
