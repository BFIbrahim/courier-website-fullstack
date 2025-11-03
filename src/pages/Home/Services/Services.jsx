import React from "react";
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";

const servicesData = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaMapMarkedAlt />,
    highlight: true,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaWarehouse />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaBuilding />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndoAlt />,
  },
];

const Services = () => {
  return (
    <section className="bg-secondary text-white py-16 px-6 md:px-12 rounded-2xl font-urbanist my-14">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Our Services</h2>
        <p className="text-white max-w-2xl mx-auto leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={`group p-8 rounded-xl text-center shadow-sm transition-all duration-300 border cursor-pointer border-transparent hover:-translate-y-1 ${
              service.highlight
                ? "bg-primary text-gray-900 hover:bg-white"
                : "bg-white text-gray-800 hover:bg-primary hover:text-gray-900"
            }`}
          >
            <div
              className={`flex justify-center items-center w-16 h-16 mx-auto mb-5 rounded-full transition-all duration-300 text-3xl ${
                service.highlight
                  ? "bg-white text-primary group-hover:bg-primary group-hover:text-white"
                  : "bg-primary/20 text-primary group-hover:bg-white group-hover:text-primary"
              }`}
            >
              {service.icon}
            </div>

            <h3 className="font-bold text-lg mb-2 text-secondary">{service.title}</h3>
            <p className="text-sm text-accent leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
