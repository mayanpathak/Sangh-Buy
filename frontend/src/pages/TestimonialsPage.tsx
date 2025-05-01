
import { motion } from "framer-motion";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const TestimonialsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16"
    >
      <div className="bg-gradient-to-b from-sangh-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories from SanghBuy Users
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Hear from retailers who have transformed their businesses with our platform.
            </p>
          </div>
        </div>
      </div>
      
      <Testimonials />
      <CTA />
      <Footer />
    </motion.div>
  );
};

export default TestimonialsPage;
