import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/bg1.jpeg",
  "/images/bg2.jpg",
  "/images/me.jpg",
  "/images/R.jpeg",
  "/images/test.jpeg"
];

const logo = "/images/person.png"; // Replace with your actual logo path

const Partnership = () => {
  const [converged, setConverged] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setConverged(true);
      setTimeout(() => setConverged(false), 3000); // Restart animation after convergence
    }, 10000); // Converge every 10s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center bg-transparent justify-center  h-60 overflow-hidden">
      {/* Circular Borders */}
      {[100, 200, 300].map((size, index) => (
        <motion.div
          key={index}
          className="absolute border border-white rounded-full"
          style={{ width: size, height: size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.5 }}
        />
      ))}

      {/* Center Logo */}
      <motion.img
        src={logo}
        alt="logo"
        className="absolute w-24 h-24 rounded-full shadow-lg"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting Images */}
      {images.map((src, i) => {
        const angle = (i * (360 / images.length)) * (Math.PI / 180);
        const radius = converged ? 0 : 150; // Move to center when converged

        return (
          <motion.img
            key={i}
            src={src}
            alt="partner"
            className="absolute w-16 h-16 rounded-full shadow-lg"
            animate={{
              x: converged
                ? [Math.cos(angle) * 150, Math.cos(angle) * 180, Math.cos(angle) * 150, Math.cos(angle) * 180, Math.cos(angle) * 150, 0]
                : [0, Math.cos(angle) * 200, Math.cos(angle) * 150, Math.cos(angle) * 200, Math.cos(angle) * 150],
              y: converged
                ? [Math.sin(angle) * 150, Math.sin(angle) * 180, Math.sin(angle) * 150, Math.sin(angle) * 180, Math.sin(angle) * 150, 0]
                : [0, Math.sin(angle) * 200, Math.sin(angle) * 150, Math.sin(angle) * 200, Math.sin(angle) * 150]
            }}
            transition={{
              duration: converged ? 3 : 5,
              ease: "easeInOut",
              repeat: converged ? 0 : Infinity
            }}
          />
        );
      })}
    </div>
  );
};

export default Partnership;
