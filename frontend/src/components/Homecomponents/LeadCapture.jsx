import React from "react";

const WHATSAPP_PHONE_PLACEHOLDER = "0000000000"; // TODO: replace with your official number (no +, digits only)

const LeadCapture = () => {
  const whatsAppLink = `https://wa.me/${WHATSAPP_PHONE_PLACEHOLDER}?text=${encodeURIComponent(
    "Hi Aagan Sewa, I need help with a service. Please contact me.",
  )}`;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-[#0a1628] to-[#122a4a] rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden relative">
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(255,107,53,0.25)" }}
          />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ color: "white" }}
              >
                Get <span style={{ color: "#FF6B35" }}>Assistance</span>
              </h2>
              <p className="text-gray-200 mt-4 leading-relaxed">
                Tell us your district and service. We’ll connect you with the
                right local branch for quick assistance.
              </p>
              <ul className="mt-6 space-y-3 text-gray-100">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF6B35] font-bold">✓</span>
                  <span>Fast response from nearby managers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF6B35] font-bold">✓</span>
                  <span>Clear next steps and guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF6B35] font-bold">✓</span>
                  <span>Transparent service delivery</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl p-6 md:p-7">
              <div className="space-y-4">
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center px-8 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-white"
                  style={{ backgroundColor: "#FF6B35" }}
                >
                  Chat on WhatsApp
                </a>

                <a
                  href="/contact"
                  className="block w-full text-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 hover:bg-white/10 text-white border border-white/20"
                >
                  Contact Us
                </a>

                <p className="text-gray-200 text-xs leading-relaxed">
                  Note: WhatsApp number is a placeholder. Update
                  `WHATSAPP_PHONE_PLACEHOLDER` in this file.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
