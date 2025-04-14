import { api } from "@/app/Services/api";
import teamDetails from "./teamDetails";
import createTeamMutation from "./createTeam";
import team from "./team";
import teamPhoto from "./teamPhoto";
import updateTeam from "./updateTeam";

export const allApi = api.injectEndpoints({
  endpoints: (build) => ({
    team: team(build),
    teamDetails: teamDetails(build),
    updateTeam: updateTeam(build),
    createTeam: createTeamMutation(build),
    teamPhoto: teamPhoto(build),
  }),
  overrideExisting: true,
});

export const {
  useTeamQuery,
  useTeamPhotoMutation,
  useUpdateTeamMutation,
  useCreateTeamMutation,
  useTeamDetailsQuery,
  useLazyTeamDetailsQuery,
} = allApi;
