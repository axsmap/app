import step1 from "../components/custom-modal/images/step1.png";
import step2 from "../components/custom-modal/images/step2.png";
import step3 from "../components/custom-modal/images/step3.png";
import step4 from "../components/custom-modal/images/step4.png";
import step5 from "../components/custom-modal/images/step5.png";
import step6 from "../components/custom-modal/images/step6.png";
import step7 from "../components/custom-modal/images/step7.png";
import step8 from "../components/custom-modal/images/step8.png";
import step9 from "../components/custom-modal/images/step9.png";
import step10 from "../components/custom-modal/images/step10.png";
import step11 from "../components/custom-modal/images/step11.png";
import step12 from "../components/custom-modal/images/step12.png";
import step13 from "../components/custom-modal/images/step13.png";
import step14 from "../components/custom-modal/images/step14.png";
import step15 from "../components/custom-modal/images/step15.png";
import step16 from "../components/custom-modal/images/step16.png";
import step17 from "../components/custom-modal/images/step17.png";
import step18 from "../components/custom-modal/images/step18.png";

export const stepsData = [
  {
    image: step1,
    title: "Does this location have no steps?",
    description: "The entrance to the venue has no steps.",
  },
  {
    image: step2,
    title: "Does this location have a permanents ramp??",
    description:
      "A ramp is inclined plane installed in addition to or instead of stairs.",
  },
  {
    image: step3,
    title: "Does this location have a portable ramp?",
    description:
      "A ramp is inclined plane installed in addition to or instead of stairs.",
  },
  {
    image: step4,
    title: "Does this location have 1 step?",
    description:
      "Any number of steps can seriously limit the possiblity of easy navigation for wheelchairs, walkers, and other modes of mobility.",
  },
  {
    image: step5,
    title: "Does this location have +2 step?",
    description:
      "Any number of steps can seriously limit the possiblity of easy navigation for wheelchairs, walkers, and other modes of mobility.",
  },
  {
    image: step6,
    title: "Does this location have reserved parking?",
    description:
      "Reserved parking spots at least 96 in. wide with adjacent access aisles, and built on the shortest accessible route of travel from the point of parking to the venue entrance. Marked with the standard blue accessibility logo.",
  },
  {
    image: step7,
    title: "Does this location have second entry?",
    description:
      "An establishment with more than one entry point to the interior.",
  },
  {
    image: step8,
    title: "Does this location have a wide exterior?",
    description:
      "For a wheelchair to comfortably fit through a doorway, the doorway should be 32 inches wide. Commonly, doorways measure about 23 to 27 inches wide; this would not be wide enough for a wheelchair to fit through.",
  },
  {
    image: step9,
    title: "Does this location have interior room to move?",
    description:
      "The aisles between fixed seats must be at least 36 inches wide, and restaurants should provide wheelchair accessible seats throughout the dining room.",
  },
  {
    image: step10,
    title: "Does this location have interior ramp?",
    description:
      "A route inside of a building which slopes measurably from one flat surface to another. The ramp must be at least 36 in. wide.",
  },
  {
    image: step11,
    title: "Does this location have accessible elevator?",
    description:
      "Elevator doors should measure at least 36 inches, the depth of the elevator 51, and the width at least 68. The entrance and exit to and from the elevator must be readily accessible.",
  },
  {
    image: step12,
    title: "Does this location have Interior accessible table height?",
    description:
      "The surface height should be no more than 34 inches and no less than 28 inches above the floor.",
  },
  {
    image: step13,
    title: "Does this location have restroom door swings out?",
    description:
      "Current guidelines for bathrooms allow the bathroom door to swing inward “as long as there is a clear floor space” beyond the door swing, when open.",
  },
  {
    image: step14,
    title: "Does this location have restroom large stalls?",
    description:
      "The minimum floorspace should be 30 inches by 48 inches, with plenty of room for a wheelchair next to the toilet.",
  },
  {
    image: step15,
    title: "Does this location have restroom support around toilet?",
    description: "Metal handrail mounted on the wall behind the toilet.",
  },
  {
    image: step16,
    title: "Does this location have restroom lowered sinks?",
    description: "Sinks mounted no more than 34 inches from the floor.",
  },
  {
    image: step17,
    title: "Does this location have interior bright light?",
    description: "The venue is well-lit, and bright enough to easily navigate.",
  },
  {
    image: step18,
    title: "Does this location have interior high noise level?",
    description:
      "The venue is at times slightly noisy, or louder than average.",
  },
  {
    image: "",
    description: "",
    title: "Comments",
    isFinalStep: true,
  },
];

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const venuesCategories = [
  {
    value: "all",
    options: ["all"],
  },
  {
    value: "foodsAndDrinks",
    options: ["bakery", "cafe", "meal_delivery", "meal_takeaway", "restaurant"],
  },
  {
    value: "nightLife",
    options: ["bar", "night_club"],
  },
  {
    value: "shopping",
    options: [
      "bicycle_store",
      "book_store",
      "clothing_store",
      "convenience_store",
      "department_store",
      "electronics_store",
      "florist",
      "furniture_store",
      "hardware_store",
      "home_goods_store",
      "jewelry_store",
      "liquor_store",
      "movie_rental",
      "pet_store",
      "shoe_store",
      "shopping_mall",
      "store",
    ],
  },
  {
    value: "beautyAndSpas",
    options: ["beauty_salon", "hair_care", "spa"],
  },
  {
    value: "artsAndEntertainment",
    options: [
      "amusement_park",
      "aquarium",
      "art_gallery",
      "casino",
      "movie_theater",
      "museum",
      "stadium",
      "zoo",
    ],
  },
  {
    value: "hotelsAndTravel",
    options: [
      "airport",
      "bus_station",
      "lodging",
      "subway_station",
      "taxi_stand",
      "train_station",
      "transit_station",
      "travel_agency",
    ],
  },
  {
    value: "publicService",
    options: [
      "city_hall",
      "courthouse",
      "embassy",
      "fire_station",
      "local_government_office",
      "park",
      "police",
      "post_office",
    ],
  },
  {
    value: "education",
    options: ["library", "school", "university"],
  },
  {
    value: "healthAndFitness",
    options: [
      "dentist",
      "doctor",
      "gym",
      "hospital",
      "pharmacy",
      "physiotherapist",
      "veterinary_care",
    ],
  },
  {
    value: "financialServices",
    options: ["accounting", "atm", "bank"],
  },
  {
    value: "religiousOrganization",
    options: ["cemetery", "church", "hindu_temple", "mosque", "synagogue"],
  },
  {
    value: "automotive",
    options: [
      "car_dealer",
      "car_rental",
      "car_repair",
      "car_wash",
      "gas_station",
    ],
  },
];

export function getGeneralType(venuesTypes) {
  let generalType = "establishment";

  for (let i = 0; i < venuesTypes.length; i += 1) {
    for (let j = 0; j < venuesCategories.length; j += 1) {
      const venuesOptions = venuesCategories[j].options;
      const type = venuesOptions.find((o) => o === venuesTypes[i]);
      if (type) {
        generalType = venuesCategories[j].value;
        break;
      }
    }

    if (generalType !== "establishment") break;
  }

  return generalType;
}
