import React from "react";
import Image from "next/image";

type Member = {
  firstName: string;
  lastName: string;
  avatar: string;
};

type TeamMembersProps = {
  members: Member[];
};

export default function TeamMembers({ members }: TeamMembersProps) {
  const teamMember = members?.members;
  console.log({ teamMember });
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Our Team Members</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMember.map((member: Member, idx: number) => (
          <div key={idx} className=" p-4 text-center space-y-2">
            <div className="flex justify-center">
              <Image
                src={member.avatar || null}
                alt="Member"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <h4 className="font-semibold">
              {member.firstName} {member.lastName}
            </h4>

            {/* <p className="text-sm text-[#FDDF00] text-center font-poppins text-base">
              {member.participants} ranked for {member.reviews} reviews made
            </p>
            <p className="text-sm text-gray-600">{member.description}</p>
            <p className="text-sm text-gray-600">
              {member.teamCount} team participation
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
