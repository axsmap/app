import TeamDetailOverview from "@/components/team/team-detail-overview/team-detail-overview";
import TeamMembers from "@/components/team/team-members/team-members";
import { teams } from "@/utils/constants";
import React from "react";

interface TeamPageProps {
  params: { id: string };
}
export default function TeamsDetailPage({ params }: TeamPageProps) {
  const team = teams.find((t) => t.id === params.id);
  if (!team) return <div>Team not found</div>;

  return (
    <div className="p-6 space-y-10">
      <TeamDetailOverview team={team} />
      <TeamMembers />
    </div>
  );
}
