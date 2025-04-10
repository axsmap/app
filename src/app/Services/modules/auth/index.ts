import { api } from "../../api";
import login from "./login";
import deleteAccount from "./delete";
import register from "./register";
import forgotPassword from "./forgotPassword";
import loginWithFacebook from "./loginWithFacebook";
import resetPasswordMutation from "./resetPassword";
import activateAccountMutation from "./activateAccount";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: login(build),
    deleteAccount: deleteAccount(build),
    loginWithFacebook: loginWithFacebook(build),
    register: register(build),
    forgotPassword: forgotPassword(build),
    resetPassword: resetPasswordMutation(build),
    activeAccount: activateAccountMutation(build),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useDeleteAccountMutation,
  useLoginWithFacebookMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useActiveAccountMutation,
} = authApi;
