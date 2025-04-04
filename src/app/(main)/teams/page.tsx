"use client";
import RankIcon from "@/assets/icons/rank-icon";
import RefereshIcon from "@/assets/icons/refresh-icon";
import TeamStarIcon from "@/assets/icons/star-team-icon";
import TeamUserIcon from "@/assets/icons/team-user-icon";
import { teams } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Teams = () => {
  const router = useRouter();
  const handleCreate = () => {
    router.push("/teams/create-teams");
  };
  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Teams</h2>

        <div className="flex gap-4 items-center">
          <button
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg"
            onClick={handleCreate}
          >
            + Create New Team
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teams.map((team, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl flex flex-col"
          >
            <Link href={`/teams/${team.id}`} key={team.id}>
              <div className="w-full">
                <Image
                  src={team.teamImage}
                  alt="Team Image"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="w-full p-4">
                <h3 className="font-semibold text-lg">{team.title}</h3>
                <p className="text-sm text-gray-600">{team.description}</p>
                <div className="w-full p-1 flex justify-between items-center ">
                  <div className="flex flex-col items-center mt-2 ">
                    <RankIcon />
                    <p className="text-sm text-gray-600 text-[10px] text-center items-left">
                      Rank: {team.rank}
                    </p>
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <TeamStarIcon />
                    <p className="text-sm text-gray-600 text-[10px] text-center items-left">
                      Reviews: {team.reviews}
                    </p>
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <TeamUserIcon />
                    <p className="text-sm text-gray-600 text-[10px] text-center items-left">
                      Members: {team.members}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button className="inline-flex items-center justify-center gap-2 px-5 py-3.5 pl-[14px] rounded-lg bg-[#FDDF00] text-[#363537]">
          <RefereshIcon />
          <span>Load More</span>
        </button>
      </div>
    </div>
  );
};

export default Teams;
