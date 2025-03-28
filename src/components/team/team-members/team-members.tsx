import React from "react";
import Image from "next/image";
import davidAvatar from "@/components/team/images/david.png";
import nancyAvatar from "@/components/team/images/nancy.png";
import lanaAvatar from "@/components/team/images/lana.png";

import type { StaticImageData } from "next/image";

type Member = {
  name: string;
  image: string | StaticImageData;
  description: string;
  reviews: number;
  teamCount: number;
  participants: string;
};

const members: Member[] = [
  {
    name: "David Perryn",
    participants: "12th",
    reviews: 155,
    teamCount: 12,
    image: davidAvatar,
    description:
      "I'm in support of people with disabilities. I map places for accessible buildings.",
  },
  {
    name: "Nancy Macqueen",
    image: nancyAvatar,
    participants: "12th",
    reviews: 155,
    teamCount: 12,
    description:
      "I'm in support of people with disabilities. I map places for accessible buildings.",
  },
  {
    name: "Lana Steiner",
    participants: "12th",
    reviews: 155,
    teamCount: 12,
    image: lanaAvatar,
    description:
      "I'm in support of people with disabilities. I map places for accessible buildings.",
  },
  {
    name: "Drew Cano",
    image: davidAvatar,
    participants: "12th",
    reviews: 155,
    teamCount: 12,
    description:
      "I'm in support of people with disabilities. I map places for accessible buildings.",
  },
  {
    name: "Candice Wu",
    image: nancyAvatar,
    participants: "12th",
    reviews: 155,
    teamCount: 12,
    description:
      "I'm in support of people with disabilities. I map places for accessible buildings.",
  },
  {
    name: "Natsai Craig",
    image: lanaAvatar,
    participants: "12th",
    reviews: 155,
    teamCount: 12,
    description:
      "I'm in support of people with disabilities. I map places for accessible buildings.",
  },
  {
    name: "Derrel Wilkinson",
    image: davidAvatar,
    participants: "12th",
    reviews: 155,
    teamCount: 12,
    description:
      "I'm in support of people with disabilities. I map places for accessible buildings.",
  },
  {
    name: "Orlando Diggs",
    image: lanaAvatar,
    participants: "12th",
    teamCount: 12,

    reviews: 155,
    description:
      "I'm in support of people with disabilities. I map places for accessible buildings.",
  },
];

export default function TeamMembers() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Our Team Members</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member, idx) => (
          <div
            key={idx}
            className=" p-4 text-center space-y-2"
          >
            <div className="flex justify-center">
              <Image
                src={member.image}
                alt={member.name}
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <h4 className="font-semibold">{member.name}</h4>
            <p className="text-sm text-[#FDDF00] text-center font-poppins text-base">
              {member.participants} ranked for {member.reviews} reviews made
            </p>
            <p className="text-sm text-gray-600">{member.description}</p>
            <p className="text-sm text-gray-600">
              {member.teamCount} team participation
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
