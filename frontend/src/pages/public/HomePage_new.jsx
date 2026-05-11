import { useState } from "react";

import { useGetAllDistrictQuery, useGetBranchByDistrictQuery } from "../../redux/features/districtSlice";

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

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [selectedDistrict] = useState("");

  const { isLoading, data, error } = useGetAllDistrictQuery();
  const { data: branchData } = useGetBranchByDistrictQuery(selectedDistrict, {
    skip: !selectedDistrict,
  });

  const navigate = useNavigate();

  if (isLoading) return <div>Loading.........</div>;
  if (error) return <div className="py-16 text-center">Failed to load data.</div>;

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
          <Testimonials />
          <CustomerScroll />

          <LeadCapture />
          <FAQAccordion />

          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#0a1628" }}>
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

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(branchData?.data || []).slice(0, 3).map((b) => (
                  <button
                    key={b.branch_id}
                    onClick={() =>
                      navigate(`/services/${b.branch_slug}`, {
                        state: { branchId: b.branch_id },
                      })
                    }
                    className="text-left border border-gray-200 rounded-2xl p-6 bg-gray-50 hover:bg-white hover:shadow-xl transition-shadow"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: "rgba(255,107,53,0.12)", color: "#FF6B35" }}
                    >
                      ✓
                    </div>
                    <div className="text-xl font-semibold" style={{ color: "#0a1628" }}>
                      {b.branch_name}
                    </div>
                    <div className="text-gray-600 mt-2 text-sm leading-relaxed">{b.branch_description || "Connect for assistance."}</div>
                  </button>
                ))}

                {(branchData?.data || []).length === 0 && (
                  <div className="text-center text-gray-600">No branch data available yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

