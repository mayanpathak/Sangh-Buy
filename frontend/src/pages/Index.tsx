import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { forwardRef } from 'react';

const Landing = forwardRef((props, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero ref={ref} />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </motion.div>
  );
});

Landing.displayName = 'Landing';

export default Landing;
