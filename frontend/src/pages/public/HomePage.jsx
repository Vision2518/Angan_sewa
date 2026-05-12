import { useState } from "react";


import { useNavigate } from "react-router-dom";
import {
  useGetAllDistrictQuery,
  useGetBranchByDistrictQuery,
} from "../../redux/features/districtSlice";

import AboutAaganSewa from "../../components/Servicecomponents/Intro";
import GallerySlider from "../../components/Gallerycomponents/GallerySlider";
import Hero from "../../components/Homecomponents/Hero";
import Testimonials from "../../components/Homecomponents/Testonomials";
import CustomerScroll from "../../components/Homecomponents/TrustedCostumer";

import FeaturedServices from "../../components/Homecomponents/FeaturedServices";
import HowItWorks from "../../components/Homecomponents/HowItWorks";
import TrustStrip from "../../components/Homecomponents/TrustStrip";
import LeadCapture from "../../components/Homecomponents/LeadCapture";
import FAQAccordion from "../../components/Homecomponents/FAQAccordion";

const Home = () => {
  // We keep this RTK state so Hero can use the same district query internally
  // and this page can optionally extend later.
  const [selectedDistrict] = useState("");
  const [, setSelectedPlace] = useState("");

  const { isLoading, data, error } = useGetAllDistrictQuery();

  const { data: branchData } = useGetBranchByDistrictQuery(selectedDistrict, {
    skip: !selectedDistrict,
  });

  const navigate = useNavigate();

  const districts =
    data?.data?.map((d) => ({
      value: d.district_id,
      label: d.district_name,
    })) || [];

  // IMPORTANT: Don't block homepage rendering if backend isn't connected.
  // Hero and branch-related sections can still work when data is available.
  if (isLoading || error) {
    return (
      <>
        <div className="relative w-full h-125 overflow-hidden">
          <Hero />
        </div>
        <div className="">
          <AboutAaganSewa />
          <FeaturedServices />
          <HowItWorks />
          <TrustStrip />
          <GallerySlider />
          <Testimonials />
          <CustomerScroll />
          <LeadCapture />
          <FAQAccordion />
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center text-gray-600">
                Content is available. Connect backend to load
                districts/branches.
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  const availablePlaces =
    branchData?.data?.map((b) => ({
      id: b.branch_id,
      value: b.branch_id,
      label: b.branch_name,
      slug: b.branch_slug,
    })) || [];

  // Light no-op so currentSlide logic from the earlier version doesn’t exist here.
  // (Hero already handles its own carousel.)

  const handleBranchRedirect = (branchId) => {
    const branch = availablePlaces.find((p) => p.id === Number(branchId));
    setSelectedPlace(branchId);
    if (branch) {
      navigate(`/services/${branch.slug}`, {
        state: { branchId: branch.id },
      });
    }
  };

  // Featured branches demo (static for now)
  const featuredBranches = [
    {
      branchId: availablePlaces[0]?.id,
      title: "Nearby Branch Assistance",
      note: "Get guidance from local managers.",
    },
    {
      branchId: availablePlaces[1]?.id,
      title: "Fast Service Connect",
      note: "Quick response and transparent delivery.",
    },
    {
      branchId: availablePlaces[2]?.id,
      title: "District-level Support",
      note: "Help across multiple district requirements.",
    },
  ].filter((b) => b.branchId);

  return (
    <>
      <div className=" ">
        <div className="relative w-full h-125 overflow-hidden ">
          <Hero />
        </div>

        <div className="">
          {/* INTRO */}
          <AboutAaganSewa />

          {/* conversion sections */}
          <FeaturedServices />
          <HowItWorks />
          <TrustStrip />

          {/* existing sections */}
          <GallerySlider />
          <Testimonials />
          <CustomerScroll />

          {/* lead capture + FAQ */}
          <LeadCapture />
          <FAQAccordion />

          {/* Featured branches (static/demo; uses availablePlaces when present) */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <h2
                    className="text-4xl md:text-5xl font-bold"
                    style={{ color: "#0a1628" }}
                  >
                    Featured <span style={{ color: "#FF6B35" }}>Branches</span>
                  </h2>
                  <p className="text-gray-600 mt-3 max-w-2xl">
                    Choose a branch to connect quickly with local managers.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/Gallery")}
                  className="px-8 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-white"
                  style={{ backgroundColor: "#FF6B35" }}
                >
                  View all gallery <span className="ml-2">→</span>
                </button>
              </div>

              {featuredBranches.length === 0 ? (
                <div className="text-center text-gray-600">
                  No branch data available yet.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredBranches.map((b, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBranchRedirect(b.branchId)}
                      className="text-left border border-gray-200 rounded-2xl p-6 bg-gray-50 hover:bg-white hover:shadow-xl transition-shadow"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          backgroundColor: "rgba(255,107,53,0.12)",
                          color: "#FF6B35",
                        }}
                      >
                        ✓
                      </div>
                      <div
                        className="text-xl font-semibold"
                        style={{ color: "#0a1628" }}
                      >
                        {b.title}
                      </div>
                      <div className="text-gray-600 mt-2 text-sm leading-relaxed">
                        {b.note}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Optional: use districts variable to prevent unused lint if needed */}
          <div className="hidden">{districts.length}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
