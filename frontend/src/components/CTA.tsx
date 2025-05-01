
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sangh-50 to-sky-50 dark:from-gray-900 dark:to-sangh-950/40"></div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-sangh-200/30 dark:bg-sangh-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-blue-200/30 dark:bg-blue-700/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Join SanghBuy & Start Saving Today!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Join thousands of retailers who are already saving money and growing their businesses with SanghBuy's collective buying power.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            <NavLink to="/signup">
              <Button className="bg-sangh-600 hover:bg-sangh-700 text-white h-12 px-8 text-lg shadow-lg glow-button">
                Sign Up Now
              </Button>
            </NavLink>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
          >
            No credit card required. Start with our free plan and upgrade anytime.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
