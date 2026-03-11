import event from "./event";
import oldEvents from "./oldEvents";
import eventDetails from "./eventDetails";
import mapathon from "./mapathon";
import createReview from "./review";
import review from "./venueOne";
import join from "./join";
import joinedMapathons from "./joinedMapathons";
import placeDetails from "./placeDetails";
import location from "./location";
import { api } from "@/Services/api";
import { venue } from "./venue";
import upcomingEventsQuery from "./upcomingEvents";
import createVenueOneQuery from "./venueOne";
import createMapathonSurvey from "./survey";
import aiComment from "./aiComment";
import publishMapathon from "./publishMapathon";
import deleteMapathon from "./deleteMapathon";

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
    joinedMapathon: joinedMapathons(build),
    location: location(build),
    placeDetails: placeDetails(build),
    aiReview: aiComment(build),
    publishMapathon: publishMapathon(build),
    deleteMapathon: deleteMapathon(build),
  }),
  overrideExisting: true,
});

export const {
  useVenueQuery,
  useLazyVenueQuery,
  useLazyJoinedMapathonQuery,
  useVenueOneQuery,
  useCreateMapathonMutation,
  useEventQuery,
  useLazyEventQuery,
  useLazyOldEventQuery,
  useLazyUpcomingEventQuery,
  useOldEventQuery,
  useAiReviewMutation,
  useEventDetailsQuery,
  useReviewQuery,
  useJoinMapathonMutation,
  useCreateReviewMutation,
  useLazyLocationQuery,
  useLazyPlaceDetailsQuery,
  useCreateMapathonSurveyMutation,
  usePublishMapathonMutation,
  useDeleteMapathonMutation,
} = allApi;
