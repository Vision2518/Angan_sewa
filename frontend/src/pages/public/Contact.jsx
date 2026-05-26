import React, { useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Building2,
} from "lucide-react";

const Contact = () => {
  // 🇳🇵 REAL CONTEXT BRANCHES (NEPAL SAMPLE)
  const branches = [
    { branch_id: 1, name: "Kathmandu Main Branch" },
    { branch_id: 2, name: "Pokhara Service Center" },
    { branch_id: 3, name: "Butwal Branch Office" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    description: "",
    branch_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted:", formData);

    alert("Thank you! We will contact you within 24 hours.");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a2b4b] mb-2">
            Contact Us
          </h2>

          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            We usually respond within <b>24 hours</b>. For urgent help,
            use WhatsApp or call directly.
          </p>

          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 border border-gray-100">

          {/* FORM */}
          <div className="md:col-span-2 p-8 lg:p-12">

            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Send us a message
            </h3>

            <p className="text-gray-500 mb-6">
              Please select a branch if you know it — otherwise we will route it automatically.
            </p>

            {/* EXPECTATION BOX */}
            <div className="mb-6 p-4 rounded-xl bg-orange-50 border border-orange-100 text-sm text-gray-700">
              📌 After submission, our team will review your request and contact you within 24 hours.
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME + BRANCH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <input
                  name="name"
                  required
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="px-4 py-2.5 rounded-lg border"
                />

                {/* OPTIONAL BRANCH */}
                <div className="relative">
                  <select
                    name="branch_id"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border bg-white"
                  >
                    <option value="">Select Branch (Optional)</option>
                    {branches.map((b) => (
                      <option key={b.branch_id} value={b.branch_id}>
                        {b.name}
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-3 top-3 text-gray-400">
                    <Building2 size={16} />
                  </div>
                </div>
              </div>

              {/* EMAIL + PHONE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="Email (optional)"
                  className="px-4 py-2.5 rounded-lg border"
                />

                <input
                  name="phone"
                  required
                  onChange={handleChange}
                  placeholder="+977 98XXXXXXXX"
                  className="px-4 py-2.5 rounded-lg border"
                />
              </div>

              {/* ADDRESS (OPTIONAL) */}
              <input
                name="address"
                onChange={handleChange}
                placeholder="Address (optional)"
                className="w-full px-4 py-2.5 rounded-lg border"
              />

              {/* MESSAGE */}
              <textarea
                name="description"
                onChange={handleChange}
                rows="4"
                placeholder="How can we help you?"
                className="w-full px-4 py-2.5 rounded-lg border"
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="bg-[#1a2b4b] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#253d6b] transition"
              >
                Submit Inquiry
              </button>
            </form>
          </div>

          {/* INFO SIDE */}
          <div className="bg-[#1a2b4b] p-8 text-white flex flex-col justify-between m-4 rounded-3xl">

            <div>
              <h3 className="text-xl font-bold mb-8">
                We are always here to help you.
              </h3>

              <div className="space-y-6">

                <ContactInfo label="Hotline" value="+977 9800000000" />
                <ContactInfo label="WhatsApp" value="+977 9811111111" />
                <ContactInfo label="Email" value="support@aagansewa.com" />

              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-300 mb-3">
                Connect with us
              </p>

              <div className="flex gap-4">
                <Facebook size={18} />
                <Instagram size={18} />
                <Youtube size={18} />
                <Twitter size={18} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// helper
const ContactInfo = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

export default Contact;