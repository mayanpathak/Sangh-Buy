
import { motion } from "framer-motion";
import { User, MapPin, Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  name: string;
  location: string;
  delay: number;
}

const Testimonial = ({ quote, name, location, delay }: TestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: delay * 0.2 }}
    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 relative overflow-hidden"
  >
    <Quote className="absolute top-4 right-4 text-gray-200 dark:text-gray-800 h-12 w-12" />
    <div className="relative">
      <p className="text-gray-700 dark:text-gray-300 mb-6 relative z-10">"{quote}"</p>
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-sangh-100 dark:bg-sangh-800 flex items-center justify-center mr-3">
          <User className="h-5 w-5 text-sangh-600 dark:text-sangh-400" />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-3 w-3 mr-1" /> 
            {location}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const testimonials = [
    {
      quote: "SanghBuy helped me cut costs by 30%! My small electronics store can now compete with bigger retailers on pricing. Absolute game-changer!",
      name: "Ramesh Gupta",
      location: "Mumbai",
    },
    {
      quote: "Finally, a platform that truly supports small retailers! With SanghBuy, I've gotten access to premium inventory that was previously out of reach.",
      name: "Priya Singh",
      location: "Delhi",
    },
    {
      quote: "The group buying feature has connected me with other shop owners in my area. We're not just saving money, we're building a community!",
      name: "Ahmed Khan",
      location: "Bangalore",
    },
    {
      quote: "My shop's profitability has increased by 25% since joining SanghBuy. The analytics features help me make smarter inventory decisions.",
      name: "Lakshmi Reddy",
      location: "Hyderabad",
    },
    {
      quote: "Getting manufacturer-direct pricing through SanghBuy has been revolutionary for my family business. Highly recommend to all retailers!",
      name: "Vikram Patel",
      location: "Ahmedabad",
    },
    {
      quote: "The financial services offered through SanghBuy helped me secure a business loan to expand my store. The platform does much more than just group buying.",
      name: "Sanjay Mehra",
      location: "Pune",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Hear from retailers who have transformed their businesses with SanghBuy
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
