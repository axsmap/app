"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ReviewThankYouProps {
  route: {
    params: {
      userReviewFieldsAmount: number;
      userReviewsAmount: number;
      venue: string;
    };
  };
}

const ReviewThankYouContainer: FC<ReviewThankYouProps> = () => {
  const router = useRouter();
  const params = useParams();
  const { userReviewFieldsAmount, userReviewsAmount, venue } = params;
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white shadow-md p-4">
        <h1 className="text-xl font-semibold flex flex items-center justify-center">
          {t("ThankYouReviewDetailsHeader")}
        </h1>
      </div>

      <div className="flex flex-col items-center py-8">
        <div className="mb-8">
          <Image
            src="/thank-you.png"
            alt="Thank you image"
            width={400}
            height={300}
          />
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold">
            {t("ThankYouReviewDetailsPageTitle")}
          </h2>
          <p className="text-lg">{t("ThankYouReviewDetailsPageDescription")}</p>
        </div>

        <div className="mb-8 text-center">
          <h3 className="text-xl font-medium uppercase">
            {t("ThankYouReviewRatingsHeader")}
          </h3>

          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <p className="text-3xl font-semibold">{userReviewFieldsAmount}</p>
              <p className="uppercase text-sm">
                {t("ThankYouReviewItemsPlaceholder")}
              </p>
            </div>
            <div className="border-l-2 border-gray-300 h-16"></div>
            <div className="text-center">
              <p className="text-3xl font-semibold">{userReviewsAmount}</p>
              <p className="uppercase text-sm">
                {t("ThankYouReviewLocationsPlaceholder")}
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-4">
          <button
            title={t("ThankYouReviewClose").toUpperCase()}
            onClick={() => router.push("Places", {})}
            className="btn-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewThankYouContainer;
