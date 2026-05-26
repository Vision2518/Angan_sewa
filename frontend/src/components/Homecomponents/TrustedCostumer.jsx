import React from "react";

const CustomerScroll = () => {
  const customers = [
    { name: "Rastriya Banijya Bank", img: "https://www.rbb.com.np/uploads/config/1731390437-339067.png" },
    { name: "Gita Rai", img: "https://i.pravatar.cc/150?u=gita" },
    { name: "Anil Gurung", img: "https://i.pravatar.cc/150?u=anil" },
    { name: "Pratiksha KC", img: "https://i.pravatar.cc/150?u=pkc" },
      { name: "Nepal gUnj Medical College kohalpur", img: "https://www.ngmc.edu.np/frontend/images/logo.png" },
    { name: "Suman Lama", img: "https://i.pravatar.cc/150?u=suman" },
    { name: "Nabina Sharma", img: "https://i.pravatar.cc/150?u=nabina" },
    { name: "Rohan Chaudhary", img: "https://i.pravatar.cc/150?u=rohan" },
     { name: "Central Plaza Kohalpur", img: "https://www.hotelcentralplaza.com/images/preference/7l2Dd-logo.jpg" },
    { name: "Ishwor Neupane", img: "https://i.pravatar.cc/150?u=ishwor" },
  ];

  // Seamless loop ko lagi array double garne
  const fullList = [...customers, ...customers];

  return (
    <div className="w-full py-16 overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "#0a1628" }}>
          Clients We've Served
        </h2>
      </div>

      {/* Scrolling Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10"
          style={{
            background: "linear-gradient(to right, #f8fafc, transparent)",
          }}
        />

        {/* Gradient Right */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10"
          style={{
            background: "linear-gradient(to left, #f8fafc, transparent)",
          }}
        />

        {/* Scrolling Content */}
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            display: flex;
            animation: scroll 40s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="animate-scroll">
          {fullList.map((customer, index) => (
            <div
              key={index}
              className="flex flex-col items-center mx-6 min-w-[140px] transition-transform duration-300 hover:scale-110"
            >
              {/* Profile Image */}
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-3 shadow-lg mb-3 hover:shadow-xl transition-shadow"
                style={{ borderColor: "#FF6B35" }}
              >
                <img
                  src={customer.img}
                  alt={customer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name Below Profile */}
              <span className="text-gray-700 font-semibold text-sm text-center whitespace-nowrap">
                {customer.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom text */}
    </div>
  );
};

export default CustomerScroll;