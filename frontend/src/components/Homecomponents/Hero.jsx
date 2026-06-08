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
import { Container } from "../../components/Container.jsx";
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop",
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // TYPEWRITER
  const words = [
    "Electricians",
    "Plumbers",
    "Cleaners",
    "Technicians",
    "Carpenters",
  ];

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);

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
    setCurrentSlide((p) => (p - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // TYPEWRITER EFFECT
  useEffect(() => {
    const currentWord = words[wordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));

        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), 900);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setWordIndex((p) => (p + 1) % words.length);
        }
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  // cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursor((p) => !p), 500);
    return () => clearInterval(interval);
  }, []);

  const handleExplore = () => {
    const branch = availablePlaces.find((p) => p.id === selectedPlace);

    if (branch) {
      navigate(`/services/${branch.slug}`, {
        state: { branchId: branch.id },
      });
    }
  };

  return (
    <Container >

    <div className=" h-140 overflow-hidden bg-gray-900">

      {/* overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* background images */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={img} className="w-full h-full object-cover" />
        </div>
      ))}
   
      {/* content */}
      <div className="relative z-20">
          {/* MAIN HEADING */}
          <h1 className="text-4xl md:text-6xl text-white font-black leading-tight">
            Trusted Home Services <br />

            <span className="text-orange-400">
              {text}
              <span className={`${cursor ? "opacity-100" : "opacity-0"}`}>
                |
              </span>
            </span>

            <br />
            At Your Doorstep
          </h1>

          {/* ENHANCED TEXT */}
          <p className="mt-3 text-lg md:text-2xl text-gray-200 font-medium">
            Fast, Verified & Reliable Home Services Platform
          </p>

      
          {/* CARD */}
          <div className="mt-2 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-5 md:p-6 text-gray-800">

            {/* REQUIRED TEXT (KEPT) */}
            <p className="text-l font-semibold text-center mb-4 text-black-700">
              Select your location to continue
            </p>

            <div className="grid md:grid-cols-3 gap-4">

              {/* district */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <FaMapMarkerAlt className="text-orange-500" />
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

              {/* branch */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <FaBuilding className="text-orange-500" />
                <Select
                  options={availablePlaces}
                  value={selectedPlace}
                  onChange={(e) => setSelectedPlace(e.target.value)}
                  placeholder="Choose Branch"
                  disabled={!selectedDistrict}
                />
              </div>

              {/* button */}
              <button
                onClick={handleExplore}
                disabled={!selectedPlace}
                className={`px-2 py-0 rounded-xl justify-self-center font-bold transition ${
                  selectedPlace
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                Explore Services
              </button>
            </div>
            </div>

            {/* STEP TEXT (KEPT) */}
            <p className="text-l text-center mt-4 text-gray-600 font-medium">
              Select Area → Choose Branch → Discover Services
            </p>
            </div>
      {/* arrows */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 z-20 text-white">
        <FaChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 z-20 text-white">
        <FaChevronRight />
      </button>
    </div>
</Container>
  );
};

export default Hero;