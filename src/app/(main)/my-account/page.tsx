"use client";
import AccountParticipationIcon from "@/assets/icons/account-participation-icon";
import AccountRankedIcon from "@/assets/icons/account-ranked-icon";
import AccountReviewsIcon from "@/assets/icons/account-reviews-icon";
import EditIcon from "@/assets/icons/edit-icon";
import LogoutIcon from "@/assets/icons/logout-icon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useFetchOneQuery,
  useGetUserQuery,
} from "@/app/Services/modules/users";
import Cookies from "js-cookie";

const AccountPage = () => {
  const router = useRouter();
  const { data: userProfile } = useGetUserQuery();
  console.log({ userProfile });

  const handleEditAccount = () => {
    router.push("/edit-account");
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    router.push("/");
  };
  return (
    <div className="px-10 py-10">
      <h2 className="text-2xl font-semibold mb-4">My Account</h2>
      <div className="flex w-[120px] h-[120px] p-[40px] justify-center items-center rounded-[20px] bg-[#F5F4F5]">
        {userProfile?.avatar && (
          <Image
            src={userProfile?.avatar}
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        )}
      </div>
      <div className="text-lg font-medium mt-2">
        {userProfile?.firstName} {userProfile?.lastName}
      </div>

      <div className="flex w-[600px] items-start gap-[20px]">
        <div className="flex gap-4 mb-4 mt-4">
          {/* Box 1 */}
          <div className="flex flex-col justify-center items-center p-4 gap-1 flex-1 bg-[#F9F9F9] rounded-[12px]">
            <AccountRankedIcon />
            <p className="text-sm font-medium text-gray-700">Ranked</p>
            <p className="text-sm text-gray-500">{userProfile?.ranking}</p>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col justify-center items-center p-4 gap-1 flex-1 bg-[#F9F9F9] rounded-[12px]">
            <AccountReviewsIcon />
            <p className="text-sm font-medium text-gray-700">Reviews</p>
            <p className="text-sm text-gray-500">
              {userProfile?.reviewsAmount}
            </p>
          </div>

          {/* Box 3 */}
          <div className="flex flex-col justify-center items-center p-4 gap-1 flex-1 bg-[#F9F9F9] rounded-[12px]">
            <AccountParticipationIcon />
            <p className="text-sm font-medium text-gray-700">Participation</p>
            <p className="text-sm text-gray-500">{userProfile?.teams}</p>
          </div>
        </div>
      </div>

      <p className="font-semibold mt-4">Disabilities</p>
      <p>{userProfile?.disabilities}</p>

      <p className="font-semibold mt-4">Race</p>
      <p>{userProfile?.race}</p>

      <p className="font-semibold mt-4">About Me</p>
      <p className="text-sm text-gray-700 mt-1">
        {userProfile?.description || "I am a software engineer."}
      </p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={logout}
          className="bg-red-500 text-white inline-flex gap-4 px-3 py-3 rounded-lg"
        >
          <LogoutIcon /> Sign out
        </button>
        <button
          className="bg-yellow-400 text-black inline-flex gap-4 px-3 py-3 rounded-lg"
          onClick={handleEditAccount}
        >
          <EditIcon /> Edit Account
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
