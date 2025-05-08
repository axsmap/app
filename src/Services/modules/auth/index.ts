import { api } from "../../api";
import login from "./login";
import deleteAccount from "./delete";
import register from "./register";
import forgotPassword from "./forgotPassword";
import resetPasswordMutation from "./resetPassword";
import activateAccount from "./activateAccount";
import contactUsMutation from "./contact";
import loginWithGoogle from "./loginWithGoogle";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: login(build),
    deleteAccount: deleteAccount(build),
    loginWithGoogle: loginWithGoogle(build),
    register: register(build),
    forgotPassword: forgotPassword(build),
    resetPassword: resetPasswordMutation(build),
    activeAccount: activateAccount(build),
    contact: contactUsMutation(build),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useDeleteAccountMutation,
  useLoginWithGoogleMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useActiveAccountQuery,
  useLazyActiveAccountQuery,
  useContactMutation,
} = authApi;
