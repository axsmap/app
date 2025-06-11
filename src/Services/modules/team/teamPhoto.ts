import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const teamPhoto = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<TeamResponse, TeamPayload>({
    query: (data) => {
      const formData = new FormData();
      formData.append("photo", data.photo);

      return {
        url: `photos`,
        method: "POST",
        body: formData,
      };
    },
    invalidatesTags: ["team"],
  });

export default teamPhoto;

export type TeamResponse = {
  id: string;
  fileName: string;
  url: string;
  user: string;
};

export type TeamPayload = {
  photo: any;
};
