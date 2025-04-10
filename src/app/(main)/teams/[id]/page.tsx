"use client";
import { useTeamDetailsQuery } from "@/app/Services/modules/team";
import TeamDetailOverview from "@/components/team/team-detail-overview/team-detail-overview";
import TeamMembers from "@/components/team/team-members/team-members";
import { useParams } from "next/navigation";
import React from "react";

export default function TeamsDetailPage() {
  const id = useParams()?.id;
  const { data: team } = useTeamDetailsQuery(id as string);
  const teamMembers = team?.events || [];
  return (
    <div className="p-6 space-y-10">
      <TeamDetailOverview />
      {teamMembers.length > 0 && <TeamMembers members={team} />}
    </div>
  );
}
