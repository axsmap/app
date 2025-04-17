"use client";
import CustomInput from "@/components/ui/custom-input/custom-input";
import React, { useState } from "react";
import { useToast } from "@/components/context/toast-context";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContactMutation } from "@/Services/modules/auth";

interface ApiError {
  data: {
    general: string;
  };
  status: number;
}

const ContactUs: React.FC = () => {
  const { showToast } = useToast();
  const [contact, { isLoading }] = useContactMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contact(formData).unwrap();
      showToast("you have sent a message", "success");
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.data?.general || "An unexpected error occurred.";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="w-full relative max-w-[700px] mx-auto bg-white rounded-2xl shadow-md mt-8 mb-8 sm:px-6 md:px-10 md:py-10 space-y-6">
      <h2 className="text-2xl font-semibold text-center">Contact Us</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomInput
          type="name"
          name="name"
          label="Password"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <CustomInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <CustomInput
          type="text"
          name="message"
          label="Message"
          placeholder="Enter a message"
          multiline
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-[#FDDF00] text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition items-center flex justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
