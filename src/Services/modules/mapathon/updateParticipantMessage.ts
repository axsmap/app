import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

export type Payload = {
  eventId: string;
  userId: string;
  personalMessage: string;
};

export type Response = {
  id: string;
  event: string;
  user: string;
  personalMessage: string;
  updatedAt: string;
};

const updateParticipantMessage = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<Response, Payload>({
    query: ({ eventId, userId, personalMessage }) => ({
      url: `events/${eventId}/participants/${userId}/message`,
      method: "PATCH",
      body: { personalMessage },
    }),
  });

export default updateParticipantMessage;
