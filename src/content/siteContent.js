import { Dumbbell, Heart, Flame, Music } from "lucide-react";

export const classes = [
  {
    title: "Power Lifting",
    description:
      "Build strength and muscle with our comprehensive weightlifting program.",
    icon: Dumbbell,
    color: "bg-blue-600",
    backgroundImage:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737971561/power-lifting_irpmwf.jpg",
    difficulty: 3,
    duration: "60 mins",

    type: "strength",
  },
  {
    title: "Cardio Blast",
    description:
      "High-intensity cardio workout to boost your endurance and burn calories.",

    icon: Heart,
    color: "bg-red-600",
    backgroundImage:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737971561/cardio-blast_wemb7k.jpg",
    difficulty: 2,
    duration: "45 mins",

    type: "cardio",
  },
  {
    title: "HIIT Training",
    description:
      "Interval training combining strength and cardio for maximum results.",

    icon: Flame,
    color: "bg-orange-600",
    backgroundImage:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737971561/hitt_tssncr.jpg",
    difficulty: 4,
    duration: "50 mins",

    type: "cardio",
  },
  {
    title: "Zumba Dance",
    description:
      "Fun dance-based workout combining Latin rhythms with cardio exercises.",

    icon: Music,
    color: "bg-purple-600",
    backgroundImage:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737971561/zumba_itpkoe.jpg",
    difficulty: 2,
    duration: "55 mins",

    type: "dance",
  },
  {
    title: "Yoga Flow",
    description:
      "Mindful yoga practices to improve flexibility and mental clarity.",
    icon: Heart,
    color: "bg-green-600",
    backgroundImage:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737972584/yoga_azzddq.jpg",
    difficulty: 1,
    duration: "75 mins",

    type: "yoga",
  },
  {
    title: "Boxing Basics",
    description: "Learn self-defense and boost your stamina with boxing.",

    icon: Flame,
    color: "bg-red-500",
    backgroundImage:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737972590/boxing_bcjgvy.jpg",
    difficulty: 3,
    duration: "60 mins",

    type: "cardio",
  },
  {
    title: "Pilates Stretch",
    description:
      "Core-focused exercises to improve balance and body alignment.",

    icon: Dumbbell,
    color: "bg-blue-500",
    backgroundImage:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737972584/pilates_yuslr2.jpg",
    difficulty: 2,
    duration: "45 mins",

    type: "yoga",
  },
  {
    title: "Spin Class",
    description:
      "High-energy cycling sessions to improve cardiovascular fitness.",

    icon: Music,
    color: "bg-yellow-500",
    backgroundImage:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737972584/cyccle_igsu6w.jpg",
    difficulty: 3,
    duration: "45 mins",

    type: "cardio",
  },
];

export const subscriptionPlans = [
  {
    name: "Basic Plan",
    price: 29,
    description: "Perfect for beginners and casual gym-goers.",
    features: [
      "Access to gym equipment",
      "1 Personal Training Session",
      "Weekly Classes",
    ],
    image:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613678/zn9zv2ihyypgjpnggnyz.jpg",
  },
  {
    name: "Premium Plan",
    price: 49,
    description:
      "For those who want more personalized training and extra benefits.",
    features: [
      "Access to all gym equipment",
      "Unlimited Personal Training",
      "Exclusive Classes",
      "Free Monthly Health Assessment",
    ],
    image:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613677/nshdngue8xklodkeuqcs.jpg",
  },
  {
    name: "Ultimate Plan",
    price: 69,
    description:
      "For those looking for the most exclusive and comprehensive gym experience.",
    features: [
      "Access to VIP equipment",
      "Unlimited Personal Training",
      "Exclusive One-on-One Classes",
      "Free Health & Nutrition Coaching",
      "Priority Booking",
    ],
    image:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613680/z3i8ahy3jh0k706wetyr.jpg",
  },
];

export const instagramImages = [
  {
    id: 1,
    src: `https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613659/lcyz7xk9oivwdyv9j9hh.jpg`,
    alt: "Gallery Image 1",
    link: "https://www.instagram.com/healthism24x7",
    colSpan: { sm: 2, lg: 2 },
    rowSpan: { sm: 1, lg: 2 },
  },
  {
    id: 2,
    src: `https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613661/muivm1srvn7k4eef1utr.jpg`,
    alt: "Gallery Image 2",
    link: "https://www.instagram.com/healthism24x7",
    colSpan: { sm: 2, lg: 1 },
    rowSpan: { sm: 1, lg: 1 },
  },
  {
    id: 5,
    src: `https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613662/bo7vndjs3a8ktdzxwp9w.jpg`,
    alt: "Gallery Image 5",
    link: "https://www.instagram.com/healthism24x7",
    colSpan: { sm: 2, lg: 1 },
    rowSpan: { sm: 1, lg: 2 },
  },
  {
    id: 6,
    src: `https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613664/cly0i8vqxshmfc5o1hk1.jpg`,
    alt: "Gallery Image 6",
    link: "https://www.instagram.com/healthism24x7",
    colSpan: { sm: 2, lg: 1 },
    rowSpan: { sm: 1, lg: 2 },
  },
  {
    id: 7,
    src: `https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613666/bglgef1ca5aujlgi4mcp.jpg`,
    alt: "Gallery Image 7",
    link: "https://www.instagram.com/healthism24x7",
    colSpan: { sm: 2, lg: 1 },
    rowSpan: { sm: 1, lg: 2 },
  },
  {
    id: 8,
    src: `https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613667/myruc0pgrejhxiz2wrs6.jpg`,
    alt: "Gallery Image 8",
    link: "https://www.instagram.com/healthism24x7",
    colSpan: { sm: 2, lg: 1 },
    rowSpan: { sm: 1, lg: 2 },
  },
];
export const features = [
  {
    category: "Equipment",
    items: [
      {
        title: "65+ High Quality Equipments",
        details:
          "State-of-the-art fitness equipment for all your workout needs",
      },
      {
        title: "Equipments Imported from Taiwan",
        details: "Premium quality equipment ensuring safety and effectiveness",
      },
      {
        title: "Spacious 9000sq ft Area",
        details: "Large, open space for comfortable workouts",
      },
      {
        title: "Powerlifting Area",
        details: "Dedicated space for serious strength training",
      },
    ],
  },
  {
    category: "Classes",
    items: [
      {
        title: "Certified Coaches",
        details: "Expert guidance from professional fitness trainers",
      },
      {
        title: "Yoga",
        details: "Find your inner peace with our yoga sessions",
      },
      { title: "Zumba", details: "Fun cardio workouts with dance moves" },
      {
        title: "Bollywood Dance",
        details: "Energetic dance sessions to Bollywood hits",
      },
      {
        title: "Strength Training",
        details: "Build muscle and improve strength",
      },
      { title: "Cardio", details: "Effective cardiovascular workouts" },
      {
        title: "Functional Training",
        details: "Practical fitness for everyday activities",
      },
      {
        title: "1 on 1 Personal Coaching",
        details: "Personalized attention for your fitness goals",
      },
    ],
  },
];

export const plans = {
  MONTHLY: {
    name: "MONTHLY",
    description: "Unlimited access to",
    features: [
      "65+ high quality equipments",
      "Functional training",
      "24x7 access",
      "Cafeteria",
    ],
    image:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613677/nshdngue8xklodkeuqcs.jpg",
  },
  QUARTERLY: {
    name: "QUARTERLY",
    description: "Unlimited access to",
    features: [
      "65+ high quality equipments",
      "Functional training",
      "24x7 access",
      "Cafeteria",
    ],
    image:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613678/zn9zv2ihyypgjpnggnyz.jpg",
  },
  "HALF-YEARLY": {
    name: "HALF-YEARLY",
    description: "Unlimited access to",
    features: [
      "65+ high quality equipments",
      "Functional training",
      "24x7 access",
      "Cafeteria",
    ],
    image:
      "https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613670/imlf0othucm5dy3wnirp.jpg",
  },
  ANNUALLY: {
    name: "ANNUALLY",
    description: "Unlimited access to",
    features: [
      "65+ high quality equipments",
      "Functional training",
      "24x7 access",
      "Cafeteria",
    ],
    image:
      "https://res.cloudinary.com/dzbuyze8t/image/upload/v1738656741/beautiful-young-black-sportswoman-gym_1_toz3xq.jpg",
  },
};
