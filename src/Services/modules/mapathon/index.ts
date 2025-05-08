import event from "./event";
import oldEvents from "./oldEvents";
import eventDetails from "./eventDetails";
import mapathon from "./mapathon";
import createReview from "./review";
import review from "./venueOne";
import join from "./join";
import placeDetails from "./placeDetails";
import location from "./location";
import { api } from "@/Services/api";
import { venue } from "./venue";
import upcomingEventsQuery from "./upcomingEvents";
import createVenueOneQuery from "./venueOne";
import createMapathonSurvey from "./survey";

export const allApi = api.injectEndpoints({
  endpoints: (build) => ({
    venue: venue(build),
    venueOne: createVenueOneQuery(build),
    event: event(build),
    oldEvent: oldEvents(build),
    upcomingEvent: upcomingEventsQuery(build),
    eventDetails: eventDetails(build),
    createMapathonSurvey: createMapathonSurvey(build),
    createMapathon: mapathon(build),
    createReview: createReview(build),
    review: review(build),
    joinMapathon: join(build),
    location: location(build),
    placeDetails: placeDetails(build),
  }),
  overrideExisting: false,
});

export const {
  useVenueQuery,
  useLazyVenueQuery,
  useVenueOneQuery,
  useEventQuery,
  useLazyEventQuery,
  useLazyOldEventQuery,
  useLazyUpcomingEventQuery,
  useOldEventQuery,
  useEventDetailsQuery,
  useReviewQuery,
  useCreateMapathonMutation,
  useJoinMapathonMutation,
  useCreateReviewMutation,
  useLazyLocationQuery,
  useLazyPlaceDetailsQuery,
  useCreateMapathonSurveyMutation,
} = allApi;
