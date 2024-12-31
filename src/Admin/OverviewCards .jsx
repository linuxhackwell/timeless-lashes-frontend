import React from "react";
import { motion } from "framer-motion";
import "./Dashboard.css";
import { FaCalendarAlt, FaMoneyBillWave, FaConciergeBell, FaUsers } from "react-icons/fa";

const OverviewCards = () => {
  const cards = [
    { title: "Total Bookings", value: "1,234", icon: <FaCalendarAlt />, color: "blue" },
    { title: "Revenue", value: "$12,345", icon: <FaMoneyBillWave />, color: "green" },
    { title: "Services Offered", value: "15", icon: <FaConciergeBell />, color: "orange" },
    { title: "Customers Served", value: "520", icon: <FaUsers />, color: "purple" },
  ];

  return (
    <motion.div
      className="overview-cards"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="card"
          style={{ borderColor: card.color }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-icon" style={{ color: card.color }}>
            {card.icon}
          </div>
          <div className="card-details">
            <h3>{card.value}</h3>
            <p>{card.title}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OverviewCards;
