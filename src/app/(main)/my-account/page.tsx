"use client";

import AccountParticipationIcon from "@/assets/icons/account-participation-icon";
import AccountRankedIcon from "@/assets/icons/account-ranked-icon";
import AccountReviewsIcon from "@/assets/icons/account-reviews-icon";
import EditIcon from "@/assets/icons/edit-icon";
import LogoutIcon from "@/assets/icons/logout-icon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "@/Services/modules/users";
import { clearToken } from "@/Store/Auth/tokenSlice";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "@/utils/helperFunction";
import { useState } from "react";
import SurveyModal, {
  showServeyModal,
  surveyRef,
} from "@/components/surveyModal/surveyModal";
import { clearUser } from "@/Store/Auth/userSlice";

const AccountPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: userProfile } = useGetUserQuery();
  const dispatch = useDispatch();

  const handleEditAccount = () => {
    router.push("/edit-account");
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    dispatch(clearToken());
    dispatch(clearUser());
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t("accountPageTitle")}
          </h2>
          <p className="text-gray-600">
            Manage your profile and account settings
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 py-4 md:p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                {userProfile?.avatar ? (
                  <Image
                    src={userProfile.avatar || "/placeholder.svg"}
                    alt="User Avatar"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {userProfile?.firstName?.charAt(0)}
                      {userProfile?.lastName?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-3 border-white shadow-sm"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {userProfile?.firstName} {userProfile?.lastName}
              </h3>
              <p className="text-gray-600 text-lg mb-3">
                @{userProfile?.username}
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Active Member
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  Mapathon
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {userProfile?.events?.length || 0}
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <AccountRankedIcon />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  {t("accountReviewsLabel")}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {userProfile?.reviewsAmount || 0}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <AccountReviewsIcon />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  Teams
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {userProfile?.teams?.length || 0}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <AccountParticipationIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {t("accountUserNameLabel")}
                </p>
                <div className="bg-gray-50 px-4 py-3 rounded-lg border">
                  <p className="text-gray-900">{userProfile?.username}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {t("accountDisabilitiesLabel")}
                </p>
                <div className="bg-gray-50 px-4 py-3 rounded-lg border">
                  <p className="text-gray-900">
                    {capitalizeFirstLetter(userProfile?.disability) ||
                      "Not specified"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {t("accountRaceLabel")}
                </p>
                <div className="bg-gray-50 px-4 py-3 rounded-lg border">
                  <p className="text-gray-900">
                    {capitalizeFirstLetter(userProfile?.race) ||
                      "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {t("accountGenderLabel")}
                </p>
                <div className="bg-gray-50 px-4 py-3 rounded-lg border">
                  <p className="text-gray-900">
                    {capitalizeFirstLetter(userProfile?.gender) ||
                      "Not specified"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {t("accountAboutMeLabel")}
                </p>
                <div className="bg-gray-50 px-4 py-3 rounded-lg border min-h-[100px]">
                  <p className="text-gray-900">
                    {userProfile?.aboutMe || "No description provided yet."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Account Actions
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={showServeyModal}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Take a Survey
              </button>

              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-black inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium transition-colors"
                onClick={handleEditAccount}
              >
                <EditIcon /> {t("accountEditAccountButton")}
              </button>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <LogoutIcon /> {t("accountSignOutButton")}
              </button>
            </div>
          </div>
        </div>
        {/* Survey Modal */}

        <SurveyModal ref={surveyRef} />
      </div>
    </div>
  );
};

export default AccountPage;
