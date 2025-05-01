import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ShoppingBag, Users, TrendingUp, Calendar, Share2, X, ChevronLeft, ChevronRight, ChevronDown, Search, Filter } from "lucide-react";
import { useState, useEffect, useRef, forwardRef, ForwardedRef } from "react";

const slides = [
  {
    title: "Create Your Pool",
    description: "Start by naming your pool and selecting products from our extensive catalog.",
    image: "/slides/create-pool.png",
    icon: ShoppingBag,
    color: "from-amber-500 to-sangh-600"
  },
  {
    title: "Browse Pools",
    description: "Explore and join existing pools to unlock wholesale prices together.",
    image: "/slides/browse-pools.png",
    icon: Search,
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "Set Pool Details",
    description: "Choose your pool duration and set the maximum number of participants.",
    image: "/slides/pool-details.png",
    icon: Calendar,
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Invite Participants",
    description: "Share your pool link with other retailers to join and save together.",
    image: "/slides/invite.png",
    icon: Users,
    color: "from-rose-500 to-pink-600"
  },
  {
    title: "Track Progress",
    description: "Monitor pool participation and watch the savings grow in real-time.",
    image: "/slides/track.png",
    icon: TrendingUp,
    color: "from-amber-500 to-sangh-600"
  }
];

const PreviewModal = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 m-4"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mt-6">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-full h-full p-8 bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-gray-50 to-gray-100">
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${slides[currentSlide].color} flex items-center justify-center`}>
                          {(() => {
                            const IconComponent = slides[currentSlide].icon;
                            return <IconComponent size={40} className="text-white" />;
                          })()}
                        </div>
                        <h3 className="text-2xl font-bold">{slides[currentSlide].title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 max-w-md">
                          {slides[currentSlide].description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      currentSlide === index
                        ? "bg-sangh-600 dark:bg-sangh-400"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <NavLink to="/signup">
                <Button className="bg-sangh-600 hover:bg-sangh-700 text-white px-8">
                  Get Started Now
                </Button>
              </NavLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Hero = forwardRef<HTMLElement>((props, ref) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeCard, setActiveCard] = useState('create-pool');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => {
        switch(prev) {
          case 'create-pool':
            return 'browse-pools';
          case 'browse-pools':
            return 'group-order';
          default:
            return 'create-pool';
        }
      });
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen">
      {/* Main Content Section - Compact and Above Fold */}
      <div className="relative h-screen flex flex-col justify-start items-center px-4 md:px-6 lg:px-8 pt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sangh-50/50 to-white dark:from-gray-900/50 dark:to-gray-950"></div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-sangh-400/10 dark:bg-sangh-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-300/10 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-4xl w-full mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-2"
                  >
                    <span className="text-sangh-600 dark:text-sangh-400">
                      SanghBuy
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-4xl md:text-4xl lg:text-5xl"
                  >
                    Powering Offline Retailers with{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sangh-600 to-amber-500 dark:from-sangh-400 dark:to-amber-400">
                      Smarter Buying!
                    </span>
                  </motion.div>
                </h1>
              </motion.div>
      </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="block mb-2"
                >
                  Transform your retail business through the power of collective purchasing.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="inline-block"
                >
                  <span className="font-medium text-sangh-700 dark:text-sangh-300">
                    Unlock wholesale prices
                  </span>
                  ,{" "}
                  <span className="font-medium text-amber-700 dark:text-amber-300">
                    minimize procurement costs
                  </span>
                  , and{" "}
                  <span className="font-medium text-emerald-700 dark:text-emerald-300">
                    maximize your profits
                  </span>
                  {" "}
                  by joining forces with other retailers in your community.
                </motion.span>
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
                <NavLink to="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-sangh-600 hover:bg-sangh-700 text-white h-12 px-8 text-lg shadow-lg relative overflow-hidden group">
                  <motion.span
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    className="relative z-10 flex items-center gap-2"
                  >
                    Get Started for Free
                    <motion.div
                      animate={{ x: [-10, 0, -10] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 rounded-full bg-white/20"
                    />
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-sangh-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
              </motion.div>
                </NavLink>
                <NavLink to="/features">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="h-12 px-8 text-lg border-sangh-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 relative overflow-hidden group">
                  <span className="relative z-10">Explore Features</span>
                  <div className="absolute inset-0 bg-sangh-100 dark:bg-sangh-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
              </motion.div>
                </NavLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            <motion.div 
              className="flex flex-col gap-3 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sangh-50 to-amber-50 dark:from-sangh-900/30 dark:to-amber-900/30 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full bg-sangh-100 dark:bg-sangh-800 flex items-center justify-center"
                  >
                    <TrendingUp className="text-sangh-600 dark:text-sangh-400 w-6 h-6" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-sangh-700 dark:text-sangh-300">30% Average Savings</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">On Every Purchase</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Join thousands of retailers who are saving big through collective buying power. 
                  Our platform consistently delivers substantial cost reductions across all categories.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col gap-3 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-sangh-50 dark:from-amber-900/30 dark:to-sangh-900/30 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center"
                  >
                    <Users className="text-amber-600 dark:text-amber-400 w-6 h-6" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-amber-700 dark:text-amber-300">10k+ Active Retailers</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Growing Community</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Be part of India's fastest-growing retail community. Connect with peers, 
                  share insights, and leverage collective bargaining power for better deals.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
          </div>

      {/* Slideshow Section */}
      <div data-ref="slideshowRef" className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8">
        <div className="w-full relative overflow-hidden rounded-2xl">
          {/* Slideshow Container */}
          <div className="relative h-[650px] w-full">
            <AnimatePresence initial={false} mode="wait">
          <motion.div
                key={activeCard}
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -1000, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full"
              >
                {activeCard === 'create-pool' ? (
                  <div className="relative w-full h-full bg-gradient-to-tr from-amber-200/30 to-sangh-200/30 dark:from-amber-900/30 dark:to-sangh-900/30 rounded-2xl p-4">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xl h-full max-w-3xl mx-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-sangh-600 flex items-center justify-center">
                            <ShoppingBag className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-base">Create Pool</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Smart Group Buying</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-dashed hover:bg-amber-50 dark:hover:bg-amber-900/20 text-sm"
                          onClick={() => setIsPreviewOpen(true)}
                        >
                          Preview
                        </Button>
                      </div>

                      <div className="space-y-4 mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          Create a buying pool in minutes and unlock wholesale prices. 
                          <span className="italic text-sangh-600 dark:text-sangh-400"> For </span> 
                          retailers who dream bigger, buy smarter, and profit together.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          Join the revolution in retail purchasing:
                          <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li className="text-xs">Access exclusive manufacturer deals</li>
                            <li className="text-xs">Leverage collective buying power</li>
                            <li className="text-xs">Streamline your inventory management</li>
                          </ul>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-3 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">Bulk Savings</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Up to 40% off on bulk orders</p>
                        </div>
                        <div className="p-3 bg-sangh-50/50 dark:bg-sangh-900/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-4 h-4 text-sangh-600 dark:text-sangh-400" />
                            <span className="text-sm font-medium text-sangh-800 dark:text-sangh-200">Group Power</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Join forces with other retailers</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Pool Duration</span>
                              <span className="text-xs font-medium">Flexible Timeline</span>
                            </div>
                            <div className="h-2 bg-amber-200/50 dark:bg-amber-700/50 rounded-full w-3/4"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-sangh-100 dark:bg-sangh-900/50 flex items-center justify-center">
                            <Users className="w-4 h-4 text-sangh-600 dark:text-sangh-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Pool Size</span>
                              <span className="text-xs font-medium">Unlimited Potential</span>
                            </div>
                            <div className="h-2 bg-sangh-200/50 dark:bg-sangh-700/50 rounded-full w-1/2"></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-sangh-50 dark:from-amber-900/20 dark:to-sangh-900/20 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium">Pool Status</span>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Start your journey to better profits</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">Ready to Launch</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeCard === 'browse-pools' ? (
                  <div className="relative w-full h-full bg-gradient-to-tr from-blue-200/30 to-purple-200/30 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-4">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xl h-full max-w-3xl mx-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Search className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-base">Browse Pools</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Find & Join Pools</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-dashed hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm"
                          onClick={() => setIsPreviewOpen(true)}
                        >
                          Preview
                        </Button>
                      </div>

                      <div className="space-y-4 mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          Discover and join active buying pools that match your inventory needs. 
                          <span className="italic text-blue-600 dark:text-blue-400"> Connect </span> 
                          with other retailers and unlock wholesale discounts together.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          Key benefits of joining pools:
                          <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li className="text-xs">Instant access to bulk pricing</li>
                            <li className="text-xs">Wide variety of product categories</li>
                            <li className="text-xs">Real-time pool status tracking</li>
                          </ul>
                        </p>

                        <div className="flex items-center gap-3 mb-4">
                          <div className="relative flex-grow">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search pools by name or category..."
                              className="w-full pl-10 pr-4 py-2 bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-600 rounded-lg"
                            />
                          </div>
                          <Button variant="outline" className="flex items-center gap-2">
                            <Filter size={16} />
                            <span>Filter</span>
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                            <div className="flex items-center gap-2 mb-2">
                              <ShoppingBag className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">Electronics Bundle</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              5 slots remaining
                            </div>
                          </div>
                          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                            <div className="flex items-center gap-2 mb-2">
                              <ShoppingBag className="w-4 h-4 text-purple-600" />
                              <span className="font-medium">Furniture Set</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              3 slots remaining
                            </div>
                          </div>
                        </div>
                      </div>

                <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Active Participants</span>
                              <span className="text-xs font-medium">Growing Fast</span>
                            </div>
                            <div className="h-2 bg-blue-200/50 dark:bg-blue-700/50 rounded-full w-3/4"></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Quick Join</span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Join pools in one click</p>
                          </div>
                          <div className="p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Live Updates</span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Real-time pool tracking</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                        <div className="flex items-center justify-between">
                      <div>
                            <span className="text-sm font-medium">Pool Status</span>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Multiple active pools available</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">Ready to Join</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full bg-gradient-to-tr from-sangh-200/50 to-blue-200/30 dark:from-sangh-900/30 dark:to-blue-800/20 rounded-2xl p-8">
                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl h-full max-w-4xl mx-auto">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between pb-6 border-b dark:border-gray-700">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 rounded-full bg-sangh-100 dark:bg-sangh-900 flex items-center justify-center">
                              <span className="text-sangh-600 dark:text-sangh-400 font-semibold text-xl">SB</span>
                            </div>
                            <div>
                              <p className="font-medium text-xl">Group Order #45928</p>
                              <p className="text-base text-gray-500 dark:text-gray-400">Mumbai Retailers Association</p>
                            </div>
                          </div>
                          <span className="px-4 py-2 text-base bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">Completed</span>
                  </div>
                  
                        <div className="space-y-4">
                          <div className="flex justify-between text-lg">
                      <span className="text-gray-600 dark:text-gray-400">Order Value:</span>
                      <span className="font-semibold">₹4,58,000</span>
                    </div>
                          <div className="flex justify-between text-lg">
                      <span className="text-gray-600 dark:text-gray-400">Discount:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">- ₹1,37,400</span>
                    </div>
                          <div className="flex justify-between text-lg">
                      <span className="text-gray-600 dark:text-gray-400">Participants:</span>
                      <span className="font-semibold">24 retailers</span>
                    </div>
                  </div>

                        <div className="pt-6 border-t dark:border-gray-700">
                    <div className="flex justify-between items-center">
                            <span className="font-medium text-xl">Savings per retailer:</span>
                            <span className="text-3xl font-bold text-green-600 dark:text-green-400">₹5,725</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                )}
          </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={() => setActiveCard(prev => {
                switch(prev) {
                  case 'create-pool':
                    return 'browse-pools';
                  case 'browse-pools':
                    return 'group-order';
                  default:
                    return 'create-pool';
                }
              })}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>
            <button
              onClick={() => setActiveCard(prev => {
                switch(prev) {
                  case 'create-pool':
                    return 'browse-pools';
                  case 'browse-pools':
                    return 'group-order';
                  default:
                    return 'create-pool';
                }
              })}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
              <button
                onClick={() => setActiveCard('create-pool')}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeCard === 'create-pool'
                    ? 'bg-sangh-600 dark:bg-sangh-400'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
              <button
                onClick={() => setActiveCard('browse-pools')}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeCard === 'browse-pools'
                    ? 'bg-sangh-600 dark:bg-sangh-400'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
              <button
                onClick={() => setActiveCard('group-order')}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeCard === 'group-order'
                    ? 'bg-sangh-600 dark:bg-sangh-400'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PreviewModal */}
      <PreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
