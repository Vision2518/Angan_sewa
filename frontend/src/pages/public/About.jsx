import React from "react";
import AboutHero from "../../components/Aboutcomponents/HeroSection";

const About = () => {
  return (
    <div className="w-full bg-white text-gray-900">

      {/* HERO */}
      <AboutHero />

      {/* STORY SECTION */}
      <section className="py-14 md:py-20 border border-amber-500">
        <div className=" max-w-7xl mx-auto px-6 border border-amber-500 ">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Why Aagan Sewa Was Created
            </h2>

            <div className="w-16 h-1 bg-orange-500 mx-auto mt-5" />
          </div>

          <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">

            <p>
              Finding the right local service should be simple. But in many places,
              people still struggle to know which branch to contact, which services
              are available in their area, or where to even begin.
            </p>

            <p>
              Information is often scattered across different sources, shared by
              word of mouth, or difficult to verify. Users spend unnecessary time
              searching, asking others, or visiting the wrong place.
            </p>

            <p>
              Aagan Sewa was built to reduce that confusion.
            </p>

            <p>
              The platform helps users discover services based on their district
              and connect with the correct local branch through a more structured
              and accessible system.
            </p>

            <p>
              Instead of overwhelming users with too much information,
              Aagan Sewa focuses on clarity — showing only what is relevant
              to a user's selected location.
            </p>

            <p>
              The goal is simple:
              make local service information easier to access,
              easier to understand,
              and easier to trust.
            </p>

          </div>
        </div>
      </section>

      {/* PURPOSE SECTION */}
      <section className="py-14 md:py-20 px-6 bg-gray-50 border border-amber-600">
        <div className="max-w-6xl mx-auto border border-amber-600">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What We Aim To Improve
            </h2>

            <p className="text-gray-600 mt-4 text-base md:text-lg max-w-2xl mx-auto">
              Aagan Sewa is designed to create a clearer connection between
              users, local branches, and available services.
            </p>

            <div className="w-16 h-1 bg-orange-500 mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">
                Clear Service Discovery
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Users can explore services available in their selected district
                without navigating unnecessary information.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">
                Better Local Connection
              </h3>

              <p className="text-gray-600 leading-relaxed">
                The platform helps connect users with the appropriate branch
                responsible for their location.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">
                Simpler Access
              </h3>

              <p className="text-gray-600 leading-relaxed">
                A clean and guided interface reduces confusion and makes the
                experience easier for all users.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-14 md:py-20 border border-amber-600 px-6">
        <div className="max-w-7xl   border border-amber-600">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Principles Behind The Platform
            </h2>

            <div className="w-16 h-1 bg-orange-500 mx-auto mt-5" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">

            <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h4 className="font-semibold mb-2 text-lg">
                Clarity
              </h4>

              <p className="text-gray-600 text-sm leading-relaxed">
                Information should be easy to understand and easy to find.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h4 className="font-semibold mb-2 text-lg">
                Simplicity
              </h4>

              <p className="text-gray-600 text-sm leading-relaxed">
                Users should reach important information with minimal steps.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h4 className="font-semibold mb-2 text-lg">
                Relevance
              </h4>

              <p className="text-gray-600 text-sm leading-relaxed">
                Services shown should match the user’s selected location.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h4 className="font-semibold mb-2 text-lg">
                Reliability
              </h4>

              <p className="text-gray-600 text-sm leading-relaxed">
                Information should remain structured and consistent.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-gray-900 text-white">

        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Explore Services Available In Your Area
          </h2>

          <p className="text-gray-300 mt-5 text-base md:text-lg leading-relaxed">
            Select your district, connect with your nearest branch,
            and discover services relevant to your location.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

            <button className="px-7 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition font-semibold">
              Find Services
            </button>

            <button className="px-7 py-3 rounded-lg border border-orange-400 hover:bg-white/5 transition">
              View Branches
            </button>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;