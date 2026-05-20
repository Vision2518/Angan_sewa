import { useCallback, useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

import Select from "../shared/Select";
import { useNavigate } from "react-router-dom";

import {
  useGetAllDistrictQuery,
  useGetBranchByDistrictQuery,
} from "../../redux/features/districtSlice";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop",
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  const navigate = useNavigate();

  const { isLoading, data } = useGetAllDistrictQuery();

  const { data: branchData } = useGetBranchByDistrictQuery(
    selectedDistrict,
    { skip: !selectedDistrict }
  );

  const districts =
    data?.data?.map((d) => ({
      value: String(d.district_id),
      label: d.district_name,
    })) || [];

  const availablePlaces =
    branchData?.data?.map((b) => ({
      id: String(b.branch_id),
      value: String(b.branch_id),
      label: b.branch_name,
      slug: b.branch_slug,
    })) || [];

  const nextSlide = useCallback(() => {
    setCurrentSlide((p) => (p + 1) % HERO_IMAGES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(
      (p) => (p - 1 + HERO_IMAGES.length) % HERO_IMAGES.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleExplore = () => {
    const branch = availablePlaces.find((p) => p.id === selectedPlace);
    if (branch) {
      navigate(`/services/${branch.slug}`, {
        state: { branchId: branch.id },
      });
    }
  };

  return (
    <div className="relative w-full h-screen min-h-[650px] overflow-hidden bg-gray-900">
      
      {/* Background Dimming Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Background Images */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            className="w-full h-full object-cover"
            alt={`Background slide ${i + 1}`}
          />
        </div>
      ))}

      {/* Main Content Wrapper */}
      {/* ADJUSTED: pt-2 sm:pt-4 md:pt-6 forces the entire container tightly upward against the top window frame */}
      <div className="absolute inset-0 z-20 flex flex-col justify-start items-center px-4 md:px-8 h-full pt-2 sm:pt-4 md:pt-6">
        <div className="max-w-5xl w-full text-center text-white flex flex-col">
          
          {/* SECTION 1: Top Aligned Headers */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-1 sm:mb-2 leading-tight drop-shadow-md">
              Trusted Home Services <br />
              <span className="text-orange-400">At Your Doorstep</span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl font-medium text-gray-200 mb-0.5 tracking-wide">
              Electricians • Plumbers • Cleaners • Technicians
            </p>

            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-light">
              Fast booking • Verified professionals • Near your location
            </p>
          </div>

          {/* SECTION 2: Tightened Booking Card */}
          {/* ADJUSTED: Changed margin-top to mt-4 md:mt-6 to close up internal content gap */}
          <div className="w-full mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-5 md:p-6 text-gray-800 mt-4 sm:mt-5 md:mt-6 transform transition-all">
            
            <p className="text-xs sm:text-sm font-semibold text-black uppercase tracking-wider mb-4 text-left">
              Select your location to continue
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              
              {/* District Select */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 transition focus-within:bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200">
                <FaMapMarkerAlt className="text-orange-500 text-lg flex-shrink-0" />
                <div className="w-full text-left">
                  <Select
                    options={districts}
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedPlace("");
                    }}
                    placeholder="Choose District"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Branch Select */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 transition focus-within:bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200">
                <FaBuilding className="text-orange-500 text-lg flex-shrink-0" />
                <div className="w-full text-left">
                  <Select
                    options={availablePlaces}
                    value={selectedPlace}
                    onChange={(e) => setSelectedPlace(e.target.value)}
                    placeholder="Choose Branch"
                    disabled={!selectedDistrict}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleExplore}
                disabled={!selectedPlace}
                className={`h-[50px] w-full rounded-xl font-bold tracking-wide text-base transition-all duration-200 shadow-md ${
                  selectedPlace
                    ? "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg active:scale-[0.98] cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Explore Services
              </button>
            </div>

            {/* Stepper Helper Footer */}
            <p className="text-s text-pure-black mt-4 text-center font-medium">
               Select Area &rarr; Choose local branch &rarr; Discover services
            </p>
          </div>
          
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full z-20 shadow-lg transition active:scale-95 cursor-pointer"
        aria-label="Previous image"
      >
        <FaChevronLeft size={16} />
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full z-20 shadow-lg transition active:scale-95 cursor-pointer"
        aria-label="Next image"
      >
        <FaChevronRight size={16} />
      </button>

      {/* Slider Carousel Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === currentSlide
                ? "w-8 h-2 bg-orange-500"
                : "w-2 h-2 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Show slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;