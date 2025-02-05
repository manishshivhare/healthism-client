import Header from "../components/Header";
import AboutUs from "../components/AboutUs";
import ParallaxSlider from "../components/ParallaxSlider";
import SubscriptionCards from "../components/SubscriptionCards";
import SubscriptionTiers from "../components/SubscriptionTiers";
import Footer from "../components/Footer";
import GymHeroSection from "../components/GymHeroSection";
import VideoBackground from "../components/VideoBackground";
import InstagramGallery from "../components/InstagramGallery";

const Home = () => {
  return (
    <div >
      <Header />

      <AboutUs />
      <VideoBackground />
      <ParallaxSlider />
      <SubscriptionTiers />
      <SubscriptionCards />
      <InstagramGallery />
      <GymHeroSection />
      <Footer />
    </div>
  );
};
export default Home;
