"use client";
import { useState, useEffect } from "react";
import CustomInput from "@/components/ui/custom-input/custom-input";
import CustomSelect from "@/components/ui/custom-select/custom-select";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import {
  useTeamPhotoMutation,
  useFetchOneQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/Services/modules/users";
import { useDeleteAccountMutation } from "@/Services/modules/auth";
import { useTranslation } from "react-i18next";
import { disability, genders, races } from "@/utils/helperFunction";
import { showToast } from "@/components/toast";
import DeleteAccountModal from "@/components/ui/delete-account-modal";

const EditAccountForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: user, refetch } = useGetUserQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  const [teamPhoto, { isLoading: isPhotoUploading }] = useTeamPhotoMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    aboutMe: "",
    avatar: "",
    gender: "",
    birthday: "",
    username: "",
    race: "",
    disability: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        aboutMe: user?.aboutMe || "",
        avatar: user?.avatar || "",
        gender: user?.gender || "male",
        birthday: user?.birthday || "",
        username: user?.username || "",
        race: user?.race || "",
        disability: user?.disability || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(formData)
      await updateUser({ id: user?.id ?? '', user: formData }).unwrap();
      refetch();
      showToast({message:t("editAccountSuccessMessage"), type:'success'});
      router.push("/my-account");
    } catch (err) {
      console.error("Error updating user:", err);
      showToast({message:t("editAccountErrorMessage"), type:'error'});
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const response = await teamPhoto({ photo: file }).unwrap();
    console.log(response);
    if (response) {
      setFormData({ ...formData, avatar: response?.url });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Call deactivate endpoint (same as mobile app)
      await deleteAccount(true).unwrap();
      showToast({
        message: t("editAccountDeleteSuccessMessage"),
        type: "success",
      });
      // Clear local storage and redirect to login
      localStorage.clear();
      router.push("/login");
    } catch (err) {
      console.error("Error deleting account:", err);
      showToast({
        message: t("editAccountDeleteErrorMessage"),
        type: "error",
      });
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleCancel = () => {
    router.push("/my-account");
  };

  return (
    <>
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        isDeleting={isDeleting}
      />
      <form
        onSubmit={handleSubmit}
        className="px-6 py-8 items-center flex flex-col bg-white rounded-xl space-y-5"
      >
      <h2 className="text-xl font-semibold text-gray-800">
        {t("editAccountTitle")}
      </h2>
      <div className="w-[50%]">
        <div className="flex items-center justify-center">
          <div
            className="w-[90px] h-[90px] self-center bg-gray-200 rounded-full cursor-pointer flex items-center justify-center"
            onClick={() => document.getElementById("avatar-upload")?.click()}
          >
            {formData.avatar ? (
              <Image
                src={formData.avatar}
                alt="avatar"
                width={36}
                height={36}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-gray-500">
                {t("editAccountAvatarPlaceholder")}
              </span>
            )}
          </div>

          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-between gap-x-3 mt-5">
          <CustomInput
            label={t("editAccountFirstNameLabel")}
            name="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            placeholder={t("editAccountFirstNamePlaceholder")}
            className="w-[100%]"
          />

          <CustomInput
            label={t("editAccountLastNameLabel")}
            name="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-[100%]"
            placeholder={t("editAccountLastNamePlaceholder")}
          />
        </div>

        <CustomInput
          name="username"
          label={t("editAccountUsernameLabel")}
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />

        <CustomInput
          name="birthday"
          label={t("editAccountBirthdayLabel")}
          type="date"
          value={formData.birthday ? formData.birthday.split('T')[0] : ''}
          onChange={(e) =>
            setFormData({ ...formData, birthday: e.target.value })
          }
        />

        <CustomSelect
          name="disability"
          label={t("editAccountDisabilityLabel")}
          value={formData.disability}
          options={disability}
          onChange={(e) =>
            setFormData({ ...formData, disability: e.target.value })
          }
        />
        <CustomSelect
          name="race"
          label={t("editAccountRaceLabel")}
          value={formData.race}
          options={races}
          onChange={(e) => setFormData({ ...formData, race: e.target.value })}
        />
        <CustomSelect
          name="gender"
          label={t("editAccountGenderLabel")}
          value={formData.gender}
          options={genders}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
        <CustomInput
          name="aboutMe"
          label={t("editAccountAboutMeLabel")}
          value={formData.aboutMe}
          multiline
          onChange={(e) =>
            setFormData({ ...formData, aboutMe: e.target.value })
          }
        />
        {/* <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isSubscribed"
          checked={formData.isSubscribed}
          onChange={(e) =>
            setFormData({ ...formData, isSubscribed: e.target.checked })
          }
          className="w-4 h-4"
        />
        <label className="text-sm text-gray-600">
          {t("editAccountNewsletterLabel")}
        </label>
      </div> */}

        {/* <CustomSelect
        name="language"
        label={t("editAccountLanguageLabel")}
        value={formData.language}
        options={[
          { label: t("editAccountLanguageOptions.english"), value: "en" },
        ]}
        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
      /> */}

        {/* <CustomInput
        label={t("editAccountPhoneNumberLabel")}
        type="text"
        name="phone"
        placeholder={t("editAccountPhoneNumberPlaceholder")}
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      /> */}

        {/* <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="showDisabilities"
            checked={formData.showDisabilities}
            onChange={(e) =>
              setFormData({ ...formData, showDisabilities: e.target.checked })
            }
            className="w-4 h-4"
          />
          {t("editAccountShowDisabilitiesLabel")}
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="showEmail"
            checked={formData.showEmail}
            onChange={(e) =>
              setFormData({ ...formData, showEmail: e.target.checked })
            }
            className="w-4 h-4"
          />
          {t("editAccountShowEmailLabel")}
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="showPhone"
            checked={formData.showPhone}
            onChange={(e) =>
              setFormData({ ...formData, showPhone: e.target.checked })
            }
            className="w-4 h-4"
          />
          {t("editAccountShowPhoneLabel")}
        </label>
      </div> */}

        {/* <CustomInput
        type="text"
        name="zip"
        label={t("editAccountZipLabel")}
        value={formData.zip}
        placeholder={t("editAccountZipPlaceholder")}
        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
      /> */}

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
            onClick={handleCancel}
          >
            {t("editAccountCancelButton")}
          </button>
          <button
            type="submit"
            disabled={isLoading || isPhotoUploading}
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-[#363537] font-medium"
          >
            {isLoading || isPhotoUploading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              t("editAccountSaveButton")
            )}
          </button>
        </div>

        {/* Delete Account Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium"
            onClick={() => setShowDeleteModal(true)}
          >
            {t("editAccountDeleteButton")}
          </button>
        </div>
      </div>
    </form>
    </>
  );
};

export default EditAccountForm;
