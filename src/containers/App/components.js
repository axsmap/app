import { lazy } from "react";
import SpinnerLoader from "../../components/SpinnerLoader";

export const ContactPage = SpinnerLoader(lazy(() => import("../ContactPage")));
export const CreateMapathonPage = SpinnerLoader(
  lazy(() => import("../CreateMapathonPage"))
);
export const CreateReviewPage = SpinnerLoader(
  lazy(() => import("../CreateReviewPage"))
);
export const CreateTeamPage = SpinnerLoader(
  lazy(() => import("../CreateTeamPage"))
);
export const FaqPage = SpinnerLoader(lazy(() => import("../FaqPage")));
export const ForgottenPasswordPage = SpinnerLoader(
  lazy(() => import("../ForgottenPasswordPage"))
);
export const MapathonPage = SpinnerLoader(
  lazy(() => import("../MapathonPage"))
);
export const MapathonsPage = SpinnerLoader(
  lazy(() => import("../MapathonsPage"))
);
export const NotFoundPage = SpinnerLoader(
  lazy(() => import("../NotFoundPage"))
);
export const ResetPasswordPage = SpinnerLoader(
  lazy(() => import("../ResetPasswordPage"))
);
export const SignInPage = SpinnerLoader(lazy(() => import("../SignInPage")));
export const SignUpPage = SpinnerLoader(lazy(() => import("../SignUpPage")));
export const SocialAuthPage = SpinnerLoader(
  lazy(() => import("../SocialAuthPage"))
);
export const TacPage = SpinnerLoader(lazy(() => import("../TacPage")));
export const TeamPage = SpinnerLoader(lazy(() => import("../TeamPage")));
export const TeamsPage = SpinnerLoader(lazy(() => import("../TeamsPage")));
export const ThankYouReviewPage = SpinnerLoader(
  lazy(() => import("../ThankYouReviewPage"))
);
export const UserPage = SpinnerLoader(lazy(() => import("../UserPage")));
export const VenuePage = SpinnerLoader(lazy(() => import("../VenuePage")));
export const VenuesPage = SpinnerLoader(lazy(() => import("../VenuesPage")));
export const DonatePage = SpinnerLoader(lazy(() => import("../DonatePage")));
