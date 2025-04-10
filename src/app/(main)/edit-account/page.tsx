"use client";
import {
  useGetUserQuery,
  useFetchOneQuery,
  useUpdateUserMutation,
} from "@/app/Services/modules/users"; // Import the query and mutation hooks
import { useToast } from "@/components/context/toast-context";
import CustomInput from "@/components/custom-input/custom-input";
import CustomSelect from "@/components/custom-select/custom-select";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const EditAccountForm = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: user } = useGetUserQuery();
  const { data: userProfile } = useFetchOneQuery(user?.id || "");
  const [updateUser, { isLoading }] = useUpdateUserMutation();
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

  // Log user data and form data to ensure they're correct
  console.log("user", userProfile);
  console.log("formData", formData);

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
      await updateUser({ id: userProfile?.id, user: formData }).unwrap();
      showToast("User updated successfully", "success");
      router.push("/my-account");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 py-8 bg-white rounded-xl space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Edit Account Details
      </h2>
      {/* Avatar Section */}
      <div className="w-[60px] h-[60px] bg-gray-200 rounded-full" />

      {/* First Name Input */}
      <CustomInput
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        placeholder="Enter first name"
      />

      {/* Last Name Input */}
      <CustomInput
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        placeholder="Enter last name"
      />

      {/* Gender Select */}
      <CustomSelect
        name="gender"
        label="Gender"
        value={formData.gender}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
          { label: "Not to say", value: "not-to-say" },
          { label: "Private", value: "private" },
          { label: "Transgender", value: "transgender" },
          { label: "Non Binary", value: "non-binary" },
          { label: "Gender Fluid", value: "gender-fluid" },
          { label: "Agender", value: "agender" },
        ]}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
      />

      {/* Newsletter Checkbox */}
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

      {/* Language Select */}
      <CustomSelect
        name="language"
        label="Language"
        value={formData.language}
        options={[{ label: "English", value: "en" }]}
        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
      />

      {/* Phone Number Input */}
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

      {/* Show Disabilities Checkbox */}
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

      {/* Username Input */}
      <CustomInput
        name="username"
        label="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />

      {/* ZIP Input */}
      <CustomInput
        type="text"
        name="zip"
        label="ZIP"
        value={formData.zip}
        placeholder="Enter zip code"
        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
      />

      {/* Submit Button */}
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-[#363537] font-medium"
        >
          {isLoading ? (
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
