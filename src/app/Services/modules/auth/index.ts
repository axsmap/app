import { api } from "../../api";
import login from "./login";
import deleteAccount from "./delete";
import register from "./register";
import forgotPassword from "./forgotPassword";
import loginWithFacebook from "./loginWithFacebook";
import resetPasswordMutation from "./resetPassword";
import activateAccount from "./activateAccount";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: login(build),
    deleteAccount: deleteAccount(build),
    loginWithFacebook: loginWithFacebook(build),
    register: register(build),
    forgotPassword: forgotPassword(build),
    resetPassword: resetPasswordMutation(build),
    activeAccount: activateAccount(build),
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
  useActiveAccountQuery,
  useLazyActiveAccountQuery,
} = authApi;
