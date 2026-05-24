const ContactCard = ({ service }) => {
  const phone = service?.phone;
  const whatsapp = service?.whatsapp;
  return (
    <div className="border rounded-xl p-4 bg-orange-50">

      <h2 className="text-lg font-semibold mb-3">
        Contact Service Provider
      </h2>

      {/* PHONE */}
      {phone && (
        <a
          href={`tel:${phone}`}
          className="block bg-white p-3 rounded-lg mb-2 text-orange-600 font-medium hover:bg-orange-100"
        >
          📞 Call Now: {phone}
        </a>
      )}

      {/* WHATSAPP */}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          className="block bg-white p-3 rounded-lg text-green-600 font-medium hover:bg-green-100"
        >
          💬 WhatsApp Chat
        </a>
      )}

      {!phone && !whatsapp && (
        <p className="text-sm text-gray-500">
          Contact details not available yet.
        </p>
      )}
    </div>
  );
};

export default ContactCard;