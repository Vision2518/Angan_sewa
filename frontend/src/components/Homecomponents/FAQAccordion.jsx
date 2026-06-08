import React, { useMemo, useState } from "react";
import { Container } from "../../components/Container.jsx";
const FAQAccordion = () => {
  const faqs = useMemo(
    () => [
      {
        q: "How do I find the right service?",
        a: "Select your district and place from the homepage. We’ll guide you to the relevant branch and available services.",
      },
      {
        q: "Do I need to create an account?",
        a: "No account is required to browse services. If you need direct support, use the WhatsApp/Contact options to connect with local managers.",
      },
      {
        q: "How fast will I get a response?",
        a: "Response time depends on branch availability. The goal is quick assistance from nearby local managers.",
      },
      {
        q: "Is the service delivery transparent?",
        a: "Yes. Aagan Sewa focuses on clear service steps and transparent communication between citizens and local teams.",
      },
    ],
    [],
  );
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <Container>
      <section className="py-16 bg-gray-50">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "#0a1628" }}
          >
            Frequently Asked <span style={{ color: "#FF6B35" }}>Questions</span>
          </h2>
          <p className="text-gray-600 mt-4">
            Quick answers to help you get started.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqs.map((item, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl mb-4 overflow-hidden"
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                >
                  <span className="font-semibold" style={{ color: "#0a1628" }}>
                    {item.q}
                  </span>
                  <span
                    className="shrink-0"
                    style={{ color: "#FF6B35", fontSize: 20, lineHeight: 1 }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed text-sm">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
};
export default FAQAccordion;
