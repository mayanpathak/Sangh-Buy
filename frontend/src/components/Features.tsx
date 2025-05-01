
import { motion } from "framer-motion";
import { Users, Factory, Calculator, BarChart3, PackageSearch } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  delay: number;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    whileHover={{ 
      y: -15, 
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      } 
    }}
    className="feature-card bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800"
  >
    <div className="h-12 w-12 rounded-lg bg-sangh-100 dark:bg-sangh-900/50 text-sangh-600 dark:text-sangh-400 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      title: "Group Buying Made Easy",
      description: "Join forces with nearby retailers to unlock bulk discounts and increase your purchasing power.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Direct Manufacturer Access",
      description: "Buy at wholesale rates with no middlemen, reducing costs by up to 30% on your inventory purchases.",
      icon: <Factory className="h-6 w-6" />,
    },
    {
      title: "Financial Services",
      description: "Get AI-powered insights for better loan access and financial management of your retail business.",
      icon: <Calculator className="h-6 w-6" />,
    },
    {
      title: "Smart Inventory Management",
      description: "Reduce stock losses and optimize planning with our intelligent inventory prediction system.",
      icon: <PackageSearch className="h-6 w-6" />,
    },
    {
      title: "Data-Driven Insights",
      description: "Make smarter business decisions with comprehensive analytics and performance reports.",
      icon: <BarChart3 className="h-6 w-6" />,
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Powerful Features for Retailers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Everything you need to optimize your purchasing and grow your business
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
