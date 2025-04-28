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

export const calculateIconType = (score) => {
  if (score === 1) {
    return "-bad";
  }
  if (score > 1 && score <= 3) {
    return "-average";
  }
  if (score > 3) {
    return "-good";
  }

  if (score < 1) {
    return "";
  }
  return "";
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
