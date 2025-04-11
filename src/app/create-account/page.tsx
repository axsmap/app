import CreateAccountForm from "@/components/create-account-form/create-account-form";
import { AuthModalScreenProps } from "@/utils/types";
import React from "react";

const CreateAccount = () => {
  return (
    <div>
      <CreateAccountForm setPage={() => {}} closeAuthModal={() => {}} />
    </div>
  );
};

export default CreateAccount;
