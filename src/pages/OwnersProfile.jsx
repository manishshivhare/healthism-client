import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  // Initialize AOS
  AOS.init({ duration: 1000, easing: "ease-in-out" });

  return (
    <div className="relative h-full w-full overflow-hidden">
      <section className="flex flex-col items-center justify-center text-center py-20 bg-black relative mx-auto">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            loading="lazy"
          >
            <source src='https://asset.cloudinary.com/dkhwvrr2w/455b6d7191ca7f90c512f526f19e66cb' type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient Overlay with Blur */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent blur-sm"></div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 px-4 text-center">
          {/* ABOUT US Heading */}
          <h1
            className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold font-outline-2 absolute w-full leading-none text-transparent tracking-wide"
            data-aos="fade-up"
            style={{
              
              opacity: 0.2,
            }}
          >
            ABOUT US
          </h1>

          <div className="relative z-20 mt-28 sm:mt-32">
            <span
              className="block text-orange-500 text-xl sm:text-2xl md:text-4xl font-bold -translate-y-8 px-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              WE ARE NOT JUST A GYM, WE ARE A WHOLE COMMUNITY
            </span>
            <p
              className="mt-8 text-gray-300 text-base sm:text-lg md:text-xl max-w-xl mx-auto px-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Not everyone can wake up every day feeling energized and motivated
              to put in the hard work that it takes to stay fit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
