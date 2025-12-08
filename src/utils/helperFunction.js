export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const getDateStatus = (startDate, endDate) => {
  const currentDate = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (currentDate < start) {
    return 'Upcoming';
  } else if (currentDate > end) {
    return 'Inactive';
  } else {
    return 'active';
  }
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
  // Convert to number if it's a string
  const numScore = typeof score === 'string' ? parseFloat(score) : score;
  
  // Handle undefined, null, or non-numeric scores as unrated (blue)
  if (numScore === undefined || numScore === null || isNaN(numScore)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('calculateIconType: Invalid score value:', score);
    }
    return "";
  }
  
  // Score >= 4 = accessible (green marker)
  // API returns 5 for accessible venues
  if (numScore >= 4) {
    return "-good";
  }
  
  // Score >= 2 and < 4 = caution (yellow marker)
  // API returns 3 for caution venues
  if (numScore >= 2) {
    return "-average";
  }
  
  // Score 1 = bad (red marker)
  if (numScore === 1) {
    return "-bad";
  }
  
  // Any other score including 0 = unrated (blue marker)
  return "";
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getLanguageDisplayName = (code) => {
  switch (code) {
    case "en":
      return "English";
    case "fr":
      return "Français";
    case "es":
      return "Español";
    case "jp":
      return "日本語";
    default:
      return code;
  }
};



export const disability = [
  {
    value: 'yes',
    label: 'Yes',
  },
  {
    value: 'no',
    label: 'No',
  },
  {
    value: 'not-to-say',
    label: 'Prefer Not to Say',
  },
]


export const races = [
  {
    label: 'Black/African American',
    value: 'black/african american',
  },
  {
    label: 'Caucasian',
    value: 'caucasian',
  },
  {
    label: 'Indigenous/First Nation/Native American',
    value: 'indigenous/first nation/native american',
  },
  {
    label: 'Latino/Hispanic',
    value: 'latino/hispanic',
  },
  {
    label: 'Middle Eastern/North African',
    value: 'middle eastern/north african',
  },
  {
    label: 'Native Hawaiian/Pacific Islander',
    value: 'native hawaiian/pacific islander',
  },
  {
    label: 'Biracial/multiracial',
    value: 'biracial/multiracial',
  },
  {
    label: 'Asian',
    value: 'asian',
  },
  {
    label: 'Other Non-Caucasian',
    value: 'non-naucasian',
  },
  {
    value: 'not-to-disclose',
    label: 'Prefer not to disclose',
  },
]

export const genders = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'non-binary',
    label: 'Non-Binary',
  },
  {
    value: 'gender-fluid',
    label: 'Gender Fluid',
  },
  {
    value: 'agender',
    label: 'Agender',
  },
  {
    value: 'not-to-say',
    label: 'Prefer Not to Say',
  },
]