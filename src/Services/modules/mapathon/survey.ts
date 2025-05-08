import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const createMapathonSurvey = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<MapathonSurveyResponse, MapathonSurveyPayload>({
    query: (data) => ({
      url: `mapathon/survey`,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["mapathon"],
  });

export default createMapathonSurvey;

export type MapathonSurveyResponse = {
  general: string;
};

export type MapathonSurveyPayload = {
  features: string;
  navigationEase: string;
  motivation: string;
  accessibility: string;
  additionalFeatures: string;
  satisfaction: string;
  challenges: string;
  recommend: string;
  frequency: string;
};
