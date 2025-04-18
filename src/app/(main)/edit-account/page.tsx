"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/components/context/toast-context";
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
import { useTranslation } from "react-i18next";

const EditAccountForm = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { data: user, refetch } = useGetUserQuery();
  const { data: userProfile } = useFetchOneQuery(user?.id || "");
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [teamPhoto, { isLoading: isPhotoUploading }] = useTeamPhotoMutation();

  const [formData, setFormData] = useState({
    avatar: "",
    firstName: "",
    lastName: "",
    email: "",
    disabilities: [],
    gender: "",
    race: "",
    description: "",
    isSubscribed: true,
    language: "",
    phoneNumber: "",
    showDisabilities: false,
    showEmail: false,
    showPhone: false,
    username: "",
    zip: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        disabilities: user?.disabilities || [],
        gender: user?.gender || "",
        race: user?.race || "",
        avatar: user?.avatar || "",
        description: user?.description || "",
        isSubscribed: user?.isSubscribed || false,
        language: user?.language || "",
        phoneNumber: user?.phoneNumber || "",
        showDisabilities: user?.showDisabilities || false,
        showEmail: user?.showEmail || false,
        showPhone: user?.showPhone || false,
        username: user?.username || "",
        zip: user?.zip || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let updatedAvatarUrl = formData.avatar;

      if (formData.avatar instanceof File) {
        const response = await teamPhoto({ photo: formData.avatar }).unwrap();
        updatedAvatarUrl = response.url;
      }

      const payload = {
        ...formData,
        avatar: updatedAvatarUrl,
      };

      await updateUser({ id: userProfile?.id, user: payload }).unwrap();
      refetch();
      showToast(t("editAccountSuccessMessage"), "success");
      router.push("/my-account");
    } catch (err) {
      console.error("Error updating user:", err);
      showToast(t("editAccountErrorMessage"), "error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
    }
  };

  const handleCancel = () => {
    router.push("/my-account");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 py-8 bg-white rounded-xl space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {t("editAccountTitle")}
      </h2>

      <div
        className="w-[60px] h-[60px] bg-gray-200 rounded-full cursor-pointer flex items-center justify-center"
        onClick={() => document.getElementById("avatar-upload")?.click()}
      >
        {formData.avatar instanceof File || formData.avatar ? (
          <Image
            src={
              formData.avatar instanceof File
                ? URL.createObjectURL(formData.avatar)
                : formData.avatar
            }
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

      <CustomInput
        label={t("editAccountFirstNameLabel")}
        name="firstName"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        placeholder={t("editAccountFirstNamePlaceholder")}
      />

      <CustomInput
        label={t("editAccountLastNameLabel")}
        name="lastName"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        placeholder={t("editAccountLastNamePlaceholder")}
      />

      <CustomSelect
        name="gender"
        label={t("editAccountGenderLabel")}
        value={formData.gender}
        options={[
          { label: t("editAccountGenderOptions.male"), value: "male" },
          { label: t("editAccountGenderOptions.female"), value: "female" },
          { label: t("editAccountGenderOptions.other"), value: "other" },
          {
            label: t("editAccountGenderOptions.notToSay"),
            value: "not-to-say",
          },
        ]}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
      />

      <div className="flex items-center gap-2">
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
      </div>

      <CustomSelect
        name="language"
        label={t("editAccountLanguageLabel")}
        value={formData.language}
        options={[
          { label: t("editAccountLanguageOptions.english"), value: "en" },
        ]}
        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
      />

      <CustomInput
        label={t("editAccountPhoneNumberLabel")}
        type="text"
        name="phone"
        placeholder={t("editAccountPhoneNumberPlaceholder")}
        value={formData.phoneNumber}
        onChange={(e) =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
      />

      <div className="space-y-2">
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
      </div>

      <CustomInput
        name="username"
        label={t("editAccountUsernameLabel")}
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />

      <CustomInput
        type="text"
        name="zip"
        label={t("editAccountZipLabel")}
        value={formData.zip}
        placeholder={t("editAccountZipPlaceholder")}
        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
      />

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
    </form>
  );
};

export default EditAccountForm;
