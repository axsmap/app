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

const EditAccountForm = () => {
  const router = useRouter();
  const { showToast } = useToast();
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
        avatar: user?.avatar || "", // Use the existing avatar if available
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

      // If a new file is uploaded
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
      showToast("User updated successfully", "success");
      router.push("/my-account");
    } catch (err) {
      console.error("Error updating user:", err);
      showToast("Error updating user", "error");
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
        Edit Account Details
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
          <span className="text-gray-500">Upload</span>
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
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        placeholder="Enter first name"
      />

      <CustomInput
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        placeholder="Enter last name"
      />

      <CustomSelect
        name="gender"
        label="Gender"
        value={formData.gender}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
          { label: "Not to say", value: "not-to-say" },
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
          I want the AXS Newsletter
        </label>
      </div>

      <CustomSelect
        name="language"
        label="Language"
        value={formData.language}
        options={[{ label: "English", value: "en" }]}
        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
      />

      <CustomInput
        label="Phone Number"
        type="text"
        name="phone"
        placeholder="Enter phone number"
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
          Show my disabilities in profile
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
          Show my email in profile
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
          Show my phone number in profile
        </label>
      </div>

      <CustomInput
        name="username"
        label="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />

      <CustomInput
        type="text"
        name="zip"
        label="ZIP"
        value={formData.zip}
        placeholder="Enter zip code"
        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
      />

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || isPhotoUploading}
          className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-[#363537] font-medium"
        >
          {isLoading || isPhotoUploading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditAccountForm;
