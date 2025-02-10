import { memo } from "react";
import {
  Trophy,
  Medal,
  Users,
  Star,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Instagram,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Extracted constant data
const ACCOMPLISHMENTS = [
  {
    icon: <Trophy className="text-orange-500 w-8 h-8" />,
    title: "Professional Coach (Certified S&H Coach)",
  },
  {
    icon: <Medal className="text-orange-500 w-8 h-8" />,
    title: "Bodybuilding Specialist (International Sports Science Association)",
  },
  {
    icon: <Users className="text-orange-500 w-8 h-8" />,
    title: "Accredited S&H Coach",
  },
  {
    icon: <Star className="text-orange-500 w-8 h-8" />,
    title: "Educator | YT- 160k+ Subscribers",
  },
];

const CONTACT_INFO = [
  {
    icon: <Mail className="text-orange-500" size={24} />,
    text: "healthism24x7@gmail.com",
    href: "mailto:healthism24x7@gmail.com",
  },
  {
    icon: <Phone className="text-orange-500" size={24} />,
    text: "+91-8187906088",
    href: "tel:8187906088",
  },
  {
    icon: <Instagram className="text-orange-500" size={24} />,
    text: "@satvikpandey8",
    href: "https://www.instagram.com/satvikpandey8/",
  },
];

const ProfileImage = memo(() => (
  <div>
    <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-orange-400">
      <img
        src="https://res.cloudinary.com/dkhwvrr2w/image/upload/v1738225371/satvik-pandey_bzbnlf.jpg"
        alt="Satvik Pandey"
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  </div>
));

const InfoBadge = memo(({ icon, text }) => (
  <span className="flex items-center gap-2 bg-black bg-opacity-20 px-4 py-2 rounded-full">
    {icon}
    {text}
  </span>
));

const AccomplishmentCard = memo(({ icon, title }) => (
  <div className="flex gap-4 items-center p-4 rounded-lg bg-gray-700 bg-opacity-50">
    {icon}
    <h3 className="font-semibold text-base lg:text-lg text-white">{title}</h3>
  </div>
));

const ContactCard = memo(({ icon, text, href }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className="flex items-center gap-4 p-4 rounded-lg bg-gray-700 bg-opacity-50 text-gray-300"
  >
    {icon}
    <span className="text-base lg:text-lg">{text}</span>
  </a>
));

const GymOwnerProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black w-full">
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="relative bg-gradient-to-r from-orange-900 to-orange-600 text-white pt-24 lg:pt-32">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <ProfileImage />

            <div className="text-center lg:text-left space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold mb-2">
                Satvik Pandey
              </h1>
              <p className="text-xl lg:text-2xl mb-6 text-orange-200">
                Heathism Founder & Head Coach
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-base">
                <InfoBadge icon={<MapPin size={18} />} text="Lucknow" />
                <InfoBadge
                  icon={<Calendar size={18} />}
                  text="5+ Years Experience"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-gray-800 rounded-lg shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-orange-400">
                About Me
              </h2>
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                Satvik Pandey is the founder of Healthism24x7 Gym and a
                certified Bodybuilding Specialist with over 5 years of
                experience. He is also an accredited S&H Coach and has gained a
                following of 192k+ people online. Satvik has helped numerous
                individuals improve their fitness through his coaching. He
                opened his gym to address challenges within the fitness industry
                and aims to help people achieve their health and fitness goals.
              </p>
            </section>

            <section className="bg-gray-800 rounded-lg shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-orange-400">
                Major Accomplishments
              </h2>
              <div className="grid gap-6">
                {ACCOMPLISHMENTS.map((item, index) => (
                  <AccomplishmentCard key={index} {...item} />
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-orange-400">
                Contact Information
              </h2>
              <div className="space-y-6">
                {CONTACT_INFO.map((item, index) => (
                  <ContactCard key={index} {...item} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GymOwnerProfile;
