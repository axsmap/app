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

const AccountPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: userProfile } = useGetUserQuery();
  console.log({ userProfile });
  const dispatch = useDispatch();

  const handleEditAccount = () => {
    router.push("/edit-account");
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    dispatch(clearToken());
    router.push("/");
  };

  return (
    <div className="px-10 py-10">
      <h2 className="text-2xl font-semibold mb-4">{t("accountPageTitle")}</h2>
      <div className="w-[60px] h-[60px] bg-gray-200 rounded-full cursor-pointer flex items-center justify-center">
        {userProfile?.avatar && (
          <Image
            src={userProfile?.avatar}
            alt="User Avatar"
            width={36}
            height={36}
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>
      <div className="text-lg font-medium mt-2">
        {userProfile?.firstName} {userProfile?.lastName}
      </div>

      <div className="flex w-[600px] items-start gap-[20px]">
        <div className="flex gap-4 mb-4 mt-4">
          <div className="flex flex-col justify-center items-center p-4 gap-1 flex-1 bg-[#F9F9F9] rounded-[12px]">
            <AccountRankedIcon />
            <p className="text-sm font-medium text-gray-700">
              {t("accountRankedLabel")}
            </p>
            <p className="text-sm text-gray-500">{userProfile?.ranking}</p>
          </div>
          <div className="flex flex-col justify-center items-center p-4 gap-1 flex-1 bg-[#F9F9F9] rounded-[12px]">
            <AccountReviewsIcon />
            <p className="text-sm font-medium text-gray-700">
              {t("accountReviewsLabel")}
            </p>
            <p className="text-sm text-gray-500">
              {userProfile?.reviewsAmount}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center p-4 gap-1 flex-1 bg-[#F9F9F9] rounded-[12px]">
            <AccountParticipationIcon />
            <p className="text-sm font-medium text-gray-700">
              {t("accountParticipationLabel")}
            </p>
            <p className="text-sm text-gray-500">{userProfile?.teams.length}</p>
          </div>
        </div>
      </div>

      <p className="font-semibold mt-4">{t("accountUserNameLabel")}</p>
      <p>{userProfile?.username}</p>
      <p className="font-semibold mt-4">{t("accountDisabilitiesLabel")}</p>
      <p>{capitalizeFirstLetter(userProfile?.disability)}</p>

      <p className="font-semibold mt-4">{t("accountRaceLabel")}</p>
      <p>{capitalizeFirstLetter(userProfile?.race)}</p>
      <p className="font-semibold mt-4">{t("accountGenderLabel")}</p>
      <p>{capitalizeFirstLetter(userProfile?.gender)}</p>
      <p className="font-semibold mt-4">{t("accountAboutMeLabel")}</p>
      <p className="text-sm text-gray-700 mt-1">{userProfile?.aboutMe || ""}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={logout}
          className="bg-red-500 text-white inline-flex gap-4 px-3 py-3 rounded-lg"
        >
          <LogoutIcon /> {t("accountSignOutButton")}
        </button>
        <button
          className="bg-yellow-400 text-black inline-flex gap-4 px-3 py-3 rounded-lg"
          onClick={handleEditAccount}
        >
          <EditIcon /> {t("accountEditAccountButton")}
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
