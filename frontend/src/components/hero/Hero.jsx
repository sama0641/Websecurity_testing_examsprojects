import React from "react";
import heroImage from "../../assets/hero.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <motion.div
      className="hero-section h-[88vh] relative"
      initial={{
        top: "-100vh",
        opacity: 0,
      }}
      animate={{
        top: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
          delay: 0.2,
        },
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center h-full text-center z-50">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-play text-white leading-tight mb-4">
          Welcome to EcoGrow AgroTech Solutions
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-slate-200 mb-6">
          Empowering Farmers, Enhancing Agriculture
        </p>
        <div className="flex items-center gap-3">
          <button className="px-8 py-2 bg-darkGreen text-white rounded-md hover:bg-lightGreen">
            <Link to="/ecoshop">Explore Now</Link>
          </button>
          <button className="px-8 py-2 bg-white text-darkGreen rounded-md hover:bg-slate-200">
            <Link to="/forum">Disuss</Link>
          </button>
        </div>
      </div>
      <img
        src={heroImage}
        alt="Green fields"
        className="w-full h-full object-cover object-center absolute top-0 left-0 -z-10"
      />
    </motion.div>
  );
};

export default HeroSection;
