import ServiceCard from "../../components/Servicecomponents/ServiceCard";
import FilterService from "../../components/Servicecomponents/FilterService";

const Services = () => {
  return (
    <div className="w-full text-gray-800">
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1552664730-d307ca884978')",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(25, 45, 85, 0.6) 0%, rgba(25, 45, 85, 0.5) 60%, rgba(255, 107, 53, 0.2) 100%)",
          }}
        />

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
         Find  Nearby trusted local services
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
           Search by location and connect with trusted local professionals in minutes.
          </p>
           <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            <span className="text-orange-500">✓</span> Verified local professionals  
            <span className="text-orange-500">✓</span> Fast response  
            <span className="text-orange-500">✓</span> Nearby availability
          </p>
          <div className="mt-8">
            <button
              className="px-8 py-3 font-semibold text-base  shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-white group"
              style={{ backgroundColor: "#FF6B35" }}
            >
              Browse All Services
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ✅ FilterService handles everything — fetching, filtering, and displaying */}
      <FilterService />
    </div>
  );
};

export default Services;
