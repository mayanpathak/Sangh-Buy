import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Share2, ShoppingBag, Search, Filter, Check, Copy, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import DateTimePicker from '@/components/DateTimePicker';
import { Product, PoolData, createPool as createPoolApi, fetchProducts as fetchProductsApi } from "@/api/poolService";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

interface Filters {
  category: string;
  priceRange: [number, number];
}

export default function CreatePool() {
  const { toast } = useToast();
  const [poolName, setPoolName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [maxBuyers, setMaxBuyers] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    priceRange: [0, 2000] as [number, number]
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [poolLink, setPoolLink] = useState('');
  
  const searchInputRef = useRef(null);
  const poolLinkRef = useRef(null);

  // Update toast calls
  const showErrorToast = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: "destructive"
    });
  };

  const showSuccessToast = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: "default"
    });
  };

  // Fetch products on component mount and when search/filters change
  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchProductsData();
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchQuery, filters]);

  // Handle go live button click
  const handleGoLive = async () => {
    if (!validateForm()) return;
    
    setIsCreating(true);
    
    try {
      if (!selectedProduct) return;

      const poolData = {
        name: poolName,
        productId: selectedProduct.id,
        startDate,
        endDate,
        maxBuyers
      };
      
      const response = await createPoolApi(poolData);
      const newPoolLink = `https://retailpool.com/join/${response.poolId}`;
      setPoolLink(newPoolLink);
      
      // Show success toast
      showSuccessToast(
        "Pool Created Successfully! 🎉",
        "Your pool is now live and ready to share"
      );

      // Show temporary success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm';
      successMessage.innerHTML = `
        <div class="bg-green-500 text-white p-8 rounded-lg shadow-xl transform scale-100 animate-bounce">
          <h2 class="text-3xl font-bold mb-2">Your Pool is Live! 🎉</h2>
          <p>Successfully created and ready to share</p>
        </div>
      `;
      document.body.appendChild(successMessage);

      // Remove success message after animation and transition to success state
      setTimeout(() => {
        document.body.removeChild(successMessage);
        setIsSuccess(true);
        console.log('Pool created:', { poolLink: newPoolLink, poolData });
      }, 2000);
      
    } catch (error) {
      showErrorToast(
        "Error creating pool",
        error instanceof Error ? error.message : "Please try again"
      );
    } finally {
      setIsCreating(false);
    }
  };

  // Update error handling
  const fetchProductsData = async () => {
    try {
      const data = await fetchProductsApi(searchQuery, filters);
      setProducts(data);
    } catch (error) {
      showErrorToast(
        "Error fetching products",
        "Please try again later"
      );
    }
  };

  // Update form validation
  const validateForm = () => {
    if (!poolName.trim()) {
      showErrorToast(
        "Pool name required",
        "Please enter a name for your pool"
      );
      return false;
    }
    
    if (!selectedProduct) {
      showErrorToast(
        "Product selection required",
        "Please select a product for your pool"
      );
      return false;
    }
    
    if (maxBuyers < 2) {
      showErrorToast(
        "Invalid number of buyers",
        "You need at least 2 buyers for a pool"
      );
      return false;
    }
    
    return true;
  };

  // Update copy link handler
  const handleCopyLink = () => {
    if (poolLinkRef.current) {
      navigator.clipboard.writeText(poolLink);
      showSuccessToast(
        "Link Copied!",
        "Pool link copied to clipboard"
      );
    }
  };

  // Animation variants for components
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        duration: 0.7
      }
    }
  };

  const pulseAnimation = {
    initial: { scale: 1, boxShadow: "0 0 0 0 rgba(129, 140, 248, 0.7)" },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0 0 rgba(129, 140, 248, 0.7)",
        "0 0 0 15px rgba(129, 140, 248, 0)",
        "0 0 0 0 rgba(129, 140, 248, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  const floatAnimation = {
    initial: { y: 0 },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  // Update filter handlers
  const handlePriceRangeChange = (range: [number, number]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: range
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50 dark:from-stone-900 dark:to-amber-900 flex items-center justify-center">
      <div className="w-full py-24 px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-4xl mx-auto rounded-xl bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm shadow-xl p-6 sm:p-8 overflow-hidden border border-stone-200 dark:border-stone-700"
        >
          {!isSuccess ? (
            <>
              <motion.div
                variants={titleVariants}
                className="flex items-center justify-center mb-8 space-x-3"
              >
    <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                >
                  <ShoppingBag size={36} className="text-amber-600 dark:text-amber-400" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-center text-stone-800 dark:text-stone-100">
                  Create Your Pool
                </h1>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-center text-stone-600 dark:text-stone-300 mb-8 max-w-2xl mx-auto"
              >
                Set up a group buying pool for your retail customers to purchase products together at better prices.
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-6">
                {/* Pool Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Pool Name</label>
                  <Input
                    type="text"
                    value={poolName}
                    onChange={(e) => setPoolName(e.target.value)}
                    placeholder="Enter a catchy name for your pool"
                    className="w-full px-4 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Product Search with Filters */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Select Product</label>
                  
                  <div className="relative">
                    <div className="flex">
        <div className="relative flex-grow">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-stone-400 dark:text-stone-500" />
                        <Input
                          ref={searchInputRef}
            type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for products to add to your pool"
                          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-l-lg text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        />
        </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center justify-center px-4 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 rounded-r-lg text-white transition-all duration-300"
                      >
                        <Filter size={20} />
                      </motion.button>
      </div>
      
      <AnimatePresence>
                      {isFilterOpen && (
          <motion.div 
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-10 mt-2 w-full bg-white dark:bg-stone-800 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-stone-200 dark:border-stone-700"
                        >
                          <div className="space-y-4">
              <div>
                              <label className="block text-sm font-medium text-stone-100 mb-1">Category</label>
                              <select 
                                className="w-full bg-white/20 border border-stone-300/30 rounded-lg text-stone-800 px-3 py-2"
                                value={filters.category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                              >
                                <option value="all" className="bg-stone-700">All Categories</option>
                                <option value="electronics" className="bg-stone-700">Electronics</option>
                                <option value="clothing" className="bg-stone-700">Clothing</option>
                                <option value="home" className="bg-stone-700">Home & Garden</option>
                                <option value="food" className="bg-stone-700">Food & Groceries</option>
                </select>
              </div>
                            
              <div>
                              <label className="block text-sm font-medium text-stone-100 mb-1">
                                Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                              </label>
                              <div className="flex space-x-4">
                                <input
                                  type="range"
                                  min="0"
                                  max="2000"
                                  value={filters.priceRange[0]}
                                  onChange={(e) => handlePriceRangeChange([parseInt(e.target.value), filters.priceRange[1]])}
                                  className="w-full"
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="2000"
                                  value={filters.priceRange[1]}
                                  onChange={(e) => handlePriceRangeChange([filters.priceRange[0], parseInt(e.target.value)])}
                                  className="w-full"
                                />
                              </div>
              </div>
                            
                            <div className="flex justify-end">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsFilterOpen(false)}
                                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 rounded-lg text-white text-sm transition-all duration-300"
                              >
                                Apply Filters
                              </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
                  </div>
      
                  {products.length > 0 && (
        <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="max-h-60 overflow-y-auto rounded-lg"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {products.map((product) => (
              <motion.div 
                key={product.id} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedProduct(product)}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                              selectedProduct?.id === product.id
                                ? "bg-amber-100 dark:bg-amber-900 border-2 border-amber-500"
                                : "bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-stone-200 rounded-md flex items-center justify-center">
                                {/* Placeholder for product image */}
                                <ShoppingBag className="text-stone-700" size={24} />
                              </div>
                <div>
                                <h3 className="font-medium text-stone-800 dark:text-stone-100">{product.name}</h3>
                                <p className="text-sm text-stone-200">${product.price.toFixed(2)}</p>
                              </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
                  {selectedProduct && (
        <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Check className="text-green-400" size={20} />
                          <span className="text-stone-800 dark:text-stone-100 font-medium">Selected: {selectedProduct.name}</span>
                        </div>
                        <span className="text-stone-200 dark:text-stone-800">${selectedProduct.price.toFixed(2)}</span>
          </div>
        </motion.div>
      )}
      </div>
      
                {/* Date and Time Selector */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-stone-700 dark:text-stone-300">
                      <Calendar size={16} />
                      <span>Start Date & Time</span>
                    </label>
                    <DateTimePicker
                      selectedDate={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={new Date()}
                      className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-800 dark:text-stone-200"
          />
        </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-stone-700 dark:text-stone-300">
                      <Clock size={16} />
                      <span>End Date & Time</span>
                    </label>
                    <DateTimePicker
                      selectedDate={endDate}
                      onChange={(date) => setEndDate(date)}
                      minDate={new Date()}
                      className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-800 dark:text-stone-200"
          />
        </div>
      </div>
      
                {/* Max Buyers Input */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-stone-700 dark:text-stone-300">
                      <Users size={16} />
                      <span>Maximum Buyers</span>
                    </label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
    <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="cursor-help"
                          >
                            <AlertCircle size={16} className="text-stone-400 dark:text-stone-500" />
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          Setting a maximum number of buyers creates urgency and helps you plan inventory
                        </TooltipContent>
        </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    type="number"
                    min="2"
                    value={maxBuyers}
                    onChange={(e) => setMaxBuyers(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
      </div>
      
                {/* Go Live Button */}
                <div className="pt-6">
                  <motion.button
                    variants={pulseAnimation}
                    initial="initial"
                    animate="pulse"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGoLive}
                    disabled={isCreating}
                    className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-stone-600 dark:from-amber-600 dark:to-stone-700 rounded-lg text-white font-medium text-lg shadow-lg hover:shadow-amber-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isCreating ? (
                      <span className="flex items-center justify-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Creating Pool...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <span>Go Live with Your Pool</span>
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center"
              >
                <Check size={40} className="text-white" />
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Your Pool is Live!</h2>
                <p className="text-stone-600 dark:text-stone-300">
                  Share the link below with potential buyers to join your pool
                </p>
              </div>
              
              <div className="bg-stone-100 dark:bg-stone-800 p-4 rounded-lg mx-auto max-w-lg">
                <div className="flex items-center space-x-2">
                  <Input
                    ref={poolLinkRef}
                    readOnly
                    value={poolLink}
                    className="flex-grow px-4 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyLink}
                    className="p-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 rounded-lg text-white transition-all duration-300"
                  >
                    <Copy size={20} />
                  </motion.button>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium text-stone-800 dark:text-stone-100 mb-3">Share your pool:</h3>
                <div className="flex items-center justify-center space-x-4">
                  {['facebook', 'twitter', 'instagram', 'whatsapp'].map((platform) => (
          <motion.button 
                      key={platform}
                      variants={floatAnimation}
                      initial="initial"
                      animate="float"
                      whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-full text-white ${
                        platform === 'facebook' ? 'bg-blue-600' :
                        platform === 'twitter' ? 'bg-sky-500' :
                        platform === 'instagram' ? 'bg-gradient-to-tr from-amber-500 via-stone-600 to-amber-700' :
                        'bg-green-500'
                      }`}
                    >
                      <Share2 size={20} />
          </motion.button>
        ))}
                </div>
      </div>
      
      <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setIsSuccess(false);
                  setSelectedProduct(null);
                  setSearchQuery('');
                }}
                className="mt-8 px-6 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 rounded-lg text-white transition-all duration-300"
              >
                Create Another Pool
      </motion.button>
    </motion.div>
      )}
    </motion.div>
      </div>
    </div>
  );
}