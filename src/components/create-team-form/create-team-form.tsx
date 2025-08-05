"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import CustomInput from "../ui/custom-input/custom-input";
import CustomFileUpload from "../ui/custom-file-upload/custom-file-upload";
import UploadIcon from "@/assets/icons/upload-icon";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import {
  useCreateTeamMutation,
  useTeamDetailsQuery,
  useTeamPhotoMutation,
  useUpdateTeamMutation,
} from "@/Services/modules/team";
import { useTranslation } from "react-i18next";
import { showToast } from "../toast";

const CreateTeamForm: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { t } = useTranslation();

  const { data: teamData, refetch } = useTeamDetailsQuery(id as string, {
    skip: !isEditMode,
  });
  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();
  const [uploadPhoto] = useTeamPhotoMutation();

  const [file, setFile] = useState<any | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [formData, setFormData] = useState<FormData>(new FormData());

  useEffect(() => {
    if (teamData && isEditMode) {
      const updatedFormData = new FormData();
      updatedFormData.set("name", teamData.name || "");
      updatedFormData.set("description", teamData.description || "");
      setFormData(updatedFormData);
      setPhotoUrl(teamData.avatar || "");
    }
  }, [teamData, isEditMode]);

  useEffect(() => {
    if (file) {
      const upload = async () => {
        try {
          const data = await uploadPhoto({ photo: file }).unwrap();
          setPhotoUrl(data?.url);
          showToast({message:t("createTeamPhotoUploadSuccess"), type:'success'});
        } catch (error) {
          showToast({message:t("createTeamPhotoUploadError"), type:'error'});
        }
      };
      upload();
    }
  }, [file, uploadPhoto, isEditMode]);

  const handleFileChange = (file: any | null) => {
    setFile(file);
  };

  const handleRemovePhoto = () => {
    setPhotoUrl("");
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const teamPayload = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        avatar: photoUrl,
      };

      const editTeamPayload = (teamData: any) => {
        return {
          id: teamData.id || null,
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          avatar: photoUrl,
          managers: teamData.managers.map((manager: any) => manager.id),
          members: teamData.members || [],
        };
      };

      if (isEditMode) {
        const payload = editTeamPayload(teamData);
        const response = await updateTeam(payload).unwrap();
        refetch();
        showToast({message:t("editTeamSuccessMessage"), type:'success'});
        router.push(`/teams/${response?.id}`);
      } else {
        const response = await createTeam(teamPayload).unwrap();
        showToast({message:t("createTeamSuccessMessage"), type:'success'});
        router.push(`/teams/${response.id}`);
      }
    } catch (err) {
      console.error("Error submitting form: ", err);
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      router.push(`/teams/${id}`);
    } else {
      router.push("/teams");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? t("editTeamTitle") : t("createTeamTitle")}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CustomInput
            name="name"
            label={t("createTeamNameLabel")}
            placeholder={t("createTeamNamePlaceholder")}
            value={(formData.get("name") as string) || ""}
            onChange={(e) => {
              const updated = new FormData();
              formData.forEach((v, k) => updated.append(k, v));
              updated.set("name", e.target.value);
              setFormData(updated);
            }}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            name="description"
            label={t("createTeamDescriptionLabel")}
            placeholder={t("createTeamDescriptionPlaceholder")}
            value={(formData.get("description") as string) || ""}
            onChange={(e) => {
              const updated = new FormData();
              formData.forEach((v, k) => updated.append(k, v));
              updated.set("description", e.target.value);
              setFormData(updated);
            }}
          />
        </div>

        <div className="mb-4">
          {photoUrl ? (
            <div className="items-center flex justify-center relative mt-10">
              <Image
                src={photoUrl}
                alt="Avatar Preview"
                width={140}
                height={140}
                className="rounded-full"
              />
              <button
                type="button"
                className="absolute top-[-10px] bg-gray-500 text-white rounded-full p-1"
                onClick={handleRemovePhoto}
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <CustomFileUpload
              icon={<UploadIcon />}
              label={t("createTeamAvatarLabel")}
              fileTypeDescription={t("createTeamAvatarFileTypeDescription")}
              onFileChange={handleFileChange}
            />
          )}
        </div>

        <div className="mt-4 flex justify-left gap-4">
          <button
            type="submit"
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg"
          >
            {isCreating || isUpdating ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : isEditMode ? (
              t("editTeamSubmitButton")
            ) : (
              t("createTeamSubmitButton")
            )}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              {t("createTeamCancelButton")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateTeamForm;
