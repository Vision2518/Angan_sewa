import React from "react";
import AboutHero from "../../components/Aboutcomponents/HeroSection";

const About = () => {
  const missionVisionData = [
    {
      title: "Our Mission",
      description:
        "To help users access service information based on their district and connect them with the correct local branch quickly and clearly.",
      highlights: [
        "Organized service access by location",
        "Reduce confusion in selecting services",
        "Improve connection with local branches",
      ],
    },
    {
      title: "Our Vision",
      description:
        "To build a structured and reliable system for accessing local services through a simple and accessible digital platform.",
      highlights: [
        "Clear service structure across regions",
        "Consistent and reliable information",
        "Accessible platform for all users",
      ],
    },
  ];

  const coreValues = [
    {
      name: "Clarity",
      description: "Information is presented in a simple and understandable way.",
    },
    {
      name: "Relevance",
      description: "Users only see services available in their selected location.",
    },
    {
      name: "Simplicity",
      description: "Interface designed to reduce complexity and improve usability.",
    },
    {
      name: "Reliability",
      description: "Data is structured and managed to maintain accuracy.",
    },
  ];

  const keyFeatures = [
    {
      title: "Branch-Based System",
      description: "Services are organized by district and local branch structure",
    },
    {
      title: "Guided Navigation",
      description: "Users are helped step-by-step to find relevant services",
    },
    {
      title: "Simple Interface",
      description: "Clean and responsive design for all devices",
    },
    {
      title: "Secure Handling",
      description: "User information is managed with standard security practices",
    },
  ];

  return (
    <div className="w-full bg-white">

      {/* HERO */}
      <AboutHero />
      {/*why exists */}
      <section className="py-12 md:py-16 px-6 bg-white">
  <div className="max-w-4xl mx-auto text-center">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
      Why Aagan Sewa Exists
    </h2>

    <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 mb-8" />

    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
      In many areas, people often struggle to find the right service or the correct local branch.
      Information is scattered, unclear, or depends on word of mouth.
    </p>

    <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4">
      Aagan Sewa was created to organize this information in a simple way — so users can select their location,
      see only relevant services, and connect directly with the right branch without confusion.
    </p>

    <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4">
      The goal is not to add complexity, but to make access to local services more structured, clear, and accessible.
    </p>

  </div>
</section>

      {/* MISSION & VISION */}
      <section className="py-12 md:py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          {/* Section Title */}
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Our Purpose
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">

            {missionVisionData.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-5">
                  {item.description}
                </p>

                <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                  {item.highlights.map((h, idx) => (
                    <li key={idx}>• {h}</li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-12 md:py-16 px-6">

        <div className="max-w-6xl mx-auto text-center mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Core Values
          </h2>
          <p className="text-gray-600 mt-3 text-base md:text-lg">
            Principles that guide how the platform is designed and used
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {coreValues.map((v, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-lg border border-gray-100"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
                {v.name}
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-20 px-6 bg-gray-50">

        <div className="max-w-6xl mx-auto text-center mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Platform Overview
          </h2>
          <p className="text-gray-600 mt-3 text-base md:text-lg">
            Key aspects of how Aagan Sewa operates
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {keyFeatures.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg border border-gray-100"
            >
              <h4 className="font-semibold text-lg text-gray-900 mb-2 tracking-tight">
                {f.title}
              </h4>
              <p className="text-sm md:text-base text-gray-600">
                {f.description}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-gray-900 text-white">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Access Services Based on Your Location
          </h2>

          <p className="text-gray-300 text-base md:text-lg mb-10 leading-relaxed">
            Aagan Sewa helps users find service information from their nearest
            branch in a structured and simple way.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600  font-semibold">
              Find Services
            </button>

            <button className="px-6 py-3 border border-orange-500 ">
              View Branches
            </button>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;