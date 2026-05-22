import AboutAaganSewa from "../../components/Homecomponents/Intro";
import GallerySlider from "../../components/Gallerycomponents/GallerySlider";
import Hero from "../../components/Homecomponents/Hero";
import Testimonials from "../../components/Homecomponents/Testonomials";
import CustomerScroll from "../../components/Homecomponents/TrustedCostumer";
import FeaturedServices from "../../components/Homecomponents/FeaturedServices";
import HowItWorks from "../../components/Homecomponents/HowItWorks";
import TrustStrip from "../../components/Homecomponents/TrustStrip";
import LeadCapture from "../../components/Homecomponents/LeadCapture";
import FAQAccordion from "../../components/Homecomponents/FAQAccordion";

import { FeaturedBranches } from "../../features/branches";

const Home = () => {
  return (
    <>
      <div className=" ">
        <div className="relative w-full h-125 overflow-hidden ">
          <Hero />
        </div>
        <div className="">
          <AboutAaganSewa />
          <FeaturedServices />
          <HowItWorks />
          <TrustStrip />
          <GallerySlider />
          <LeadCapture />
          <FAQAccordion />
          <FeaturedBranches />
        </div>
        <Testimonials />
        <CustomerScroll />
      </div>
    </>
  );
};

export default Home;
