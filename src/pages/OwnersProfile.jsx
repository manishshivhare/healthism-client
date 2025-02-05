import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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

const GymOwnerProfile = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black w-full ">
      <div className="fixed top-0 z-50 w-full ">
        <Navbar />
      </div>
      <div className="bg-gradient-to-r from-orange-900 to-orange-600 text-white pt-10">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div
              data-aos="fade-right"
              className="w-48 h-48 rounded-full overflow-hidden border-4 border-orange-400"
            >
              <img
                src="https://res.cloudinary.com/dkhwvrr2w/image/upload/v1738225371/satvik-pandey_bzbnlf.jpg"
                alt="Satvik Pandey"
                className="w-full h-full object-cover"
              />
            </div>
            <div data-aos="fade-left">
              <h1 className="text-4xl font-bold mb-2">Satvik Pandey</h1>
              <p className="text-xl mb-4">Heathism Founder & Head Coach</p>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  Lucknow
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  5+ Years Experience
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div
              data-aos="fade-up"
              className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-orange-400">
                About Me
              </h2>
              <p className="text-gray-300 mb-4">
                Satvik, the Founder of Healthism24x7 Gym, is a certified
                Bodybuilding Specialist with over five years of experience. As
                an accredited S&H Coach, he has built a strong online presence,
                amassing over 192k followers. With a passion for transforming
                lives through fitness, he has guided hundreds of individuals on
                their journey to better health. Committed to elevating the
                fitness industry, Satvik founded his own gym to provide the best
                possible support for people striving to achieve their health and
                wellness goals.
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-orange-400">
                Major Accomplishments
              </h2>
              <div className="grid gap-6">
                {[
                  {
                    icon: (
                      <Trophy className="text-orange-500 w-8 h-8 flex-shrink-0" />
                    ),
                    title: "Professional Coach (Certified S&H Coach)",

                    delay: 0,
                  },
                  {
                    icon: (
                      <Medal className="text-orange-500 w-8 h-8 flex-shrink-0" />
                    ),
                    title:
                      "Bodybuilding Specialist (International Sports Science Association)",

                    delay: 100,
                  },
                  {
                    icon: (
                      <Users className="text-orange-500 w-8 h-8 flex-shrink-0" />
                    ),
                    title: "Accredited S&H Coach",

                    delay: 200,
                  },
                  {
                    icon: (
                      <Star className="text-orange-500 w-8 h-8 flex-shrink-0" />
                    ),
                    title: "Educator | YT- 160k+ Subscribers",

                    delay: 300,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    data-aos="fade-left"
                    data-aos-delay={item.delay}
                    className="flex gap-4"
                  >
                    {item.icon}
                    <div>
                      <h3 className="font-semibold mb-1 text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div
              data-aos="fade-left"
              className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
            >
              <h2 className="text-xl font-bold mb-4 text-orange-400">
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="text-orange-500" size={20} />
                  <a href="mailto:healthism24x7@gmail.com"><span>healthism24x7@gmail.com</span></a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-orange-500" size={20} />
                  <a href="tel:8187906088"><span>+91-8187906088</span></a>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="text-orange-500" size={20} />
                  <a
                    href="https://www.instagram.com/satvikpandey8/"
                    target="_blank"
                  >
                    <span>@satvikpandey8</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GymOwnerProfile;
