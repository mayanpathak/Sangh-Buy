import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, Calendar, Users, ShoppingCart, ChevronDown, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow, format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";

// Types
interface Pool {
  id: number;
  name: string;
  category: string;
  endTime: string;
  minParticipants: number;
  remainingSlots: number;
  description?: string;
  products?: string[];
  priceDiscount?: number;
}

// Mock data
const mockPools: Pool[] = [
  {
    id: 1,
    name: "Summer Electronics Bundle",
    category: "Electronics",
    endTime: "2024-04-15T10:00:00",
    minParticipants: 10,
    remainingSlots: 5,
    description: "Join our electronics buying pool for the best summer deals!",
    products: ["Smartphones", "Laptops", "Tablets"],
    priceDiscount: 25
  },
  {
    id: 2,
    name: "Premium Furniture Collection",
    category: "Furniture",
    endTime: "2024-04-20T15:30:00",
    minParticipants: 8,
    remainingSlots: 3,
    description: "Exclusive furniture collection at wholesale prices",
    products: ["Sofas", "Dining Sets", "Bedroom Sets"],
    priceDiscount: 30
  },
  {
    id: 3,
    name: "Seasonal Apparel Group Buy",
    category: "Fashion",
    endTime: "2024-04-25T18:00:00",
    minParticipants: 15,
    remainingSlots: 8,
    description: "Latest fashion trends at wholesale prices",
    products: ["Summer Wear", "Accessories", "Footwear"],
    priceDiscount: 20
  },
  {
    id: 4,
    name: "Kitchen Appliances Bundle",
    category: "Home",
    endTime: "2024-04-18T12:00:00",
    minParticipants: 12,
    remainingSlots: 6,
    description: "Premium kitchen appliances at group buying prices",
    products: ["Mixers", "Ovens", "Coffee Makers"],
    priceDiscount: 35
  },
  {
    id: 5,
    name: "Gaming Accessories Pool",
    category: "Electronics",
    endTime: "2024-04-22T14:00:00",
    minParticipants: 20,
    remainingSlots: 12,
    description: "Latest gaming peripherals and accessories",
    products: ["Gaming Mice", "Keyboards", "Headsets"],
    priceDiscount: 28
  },
  {
    id: 6,
    name: "Office Supplies Bulk Buy",
    category: "Stationery",
    endTime: "2024-04-16T16:00:00",
    minParticipants: 15,
    remainingSlots: 2,
    description: "Essential office supplies at wholesale rates",
    products: ["Paper", "Printers", "Office Furniture"],
    priceDiscount: 22
  },
  {
    id: 7,
    name: "Beauty & Cosmetics Collection",
    category: "Beauty",
    endTime: "2024-04-19T11:00:00",
    minParticipants: 25,
    remainingSlots: 15,
    description: "Premium beauty and skincare products",
    products: ["Skincare", "Makeup", "Hair Care"],
    priceDiscount: 32
  },
  {
    id: 8,
    name: "Sports Equipment Bundle",
    category: "Sports",
    endTime: "2024-04-21T13:30:00",
    minParticipants: 18,
    remainingSlots: 9,
    description: "High-quality sports gear and equipment",
    products: ["Fitness Gear", "Sports Wear", "Equipment"],
    priceDiscount: 27
  },
  {
    id: 9,
    name: "Home Decor Essentials",
    category: "Home",
    endTime: "2024-04-17T15:45:00",
    minParticipants: 15,
    remainingSlots: 4,
    description: "Transform your space with premium decor items",
    products: ["Wall Art", "Lighting", "Decorative Items"],
    priceDiscount: 25
  },
  {
    id: 10,
    name: "Kids Toys & Games",
    category: "Toys",
    endTime: "2024-04-23T17:15:00",
    minParticipants: 20,
    remainingSlots: 11,
    description: "Educational toys and fun games for children",
    products: ["Educational Toys", "Board Games", "Outdoor Games"],
    priceDiscount: 30
  },
  {
    id: 11,
    name: "Smart Home Devices",
    category: "Electronics",
    endTime: "2024-04-24T10:30:00",
    minParticipants: 15,
    remainingSlots: 7,
    description: "Latest smart home automation products",
    products: ["Smart Speakers", "Security Cameras", "Smart Lights"],
    priceDiscount: 33
  },
  {
    id: 12,
    name: "Outdoor Furniture Set",
    category: "Furniture",
    endTime: "2024-04-26T12:45:00",
    minParticipants: 10,
    remainingSlots: 5,
    description: "Premium outdoor and garden furniture",
    products: ["Garden Sets", "Patio Furniture", "Umbrellas"],
    priceDiscount: 35
  }
];

// CountdownTimer Component
const CountdownTimer = ({ endTime }: { endTime: string }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      setIsEnding(difference < 24 * 60 * 60 * 1000);
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = () => {
    const { days, hours, minutes, seconds } = timeLeft;
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    if (minutes > 0) return `${minutes}m ${seconds}s left`;
    if (seconds > 0) return `${seconds}s left`;
    return 'Ended';
  };

  return (
    <span className={isEnding ? 'text-orange-600 font-medium' : ''}>
      {formatTime()}
    </span>
  );
};

// FilterDropdown Component
const FilterDropdown = ({ 
  label, 
  options, 
  value, 
  onChange, 
  icon 
}: { 
  label: string;
  options: { value: string; label: string; }[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value)?.label || 'Select...';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <span>{label}: <span className="font-semibold">{selectedOption}</span></span>
        <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    value === option.value
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// PoolCard Component
const PoolCard = ({ pool, onJoin }: { pool: Pool; onJoin: () => void }) => {
  const isAlmostFull = pool.remainingSlots <= 3;
  const isFilling = pool.minParticipants - pool.remainingSlots > pool.minParticipants * 0.5;
  const filledPercentage = ((pool.minParticipants - pool.remainingSlots) / pool.minParticipants) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
    >
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mb-2">
              {pool.category}
            </span>
            <h3 className="text-xl font-bold text-gray-900">{pool.name}</h3>
          </div>
          {isAlmostFull && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              Almost Full
            </span>
          )}
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">
              Ends on {format(new Date(pool.endTime), "dd MMM, h:mm a")}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">
              Min {pool.minParticipants} participants • {pool.remainingSlots} slots left
            </span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">
              <CountdownTimer endTime={pool.endTime} />
            </span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className={`h-2.5 rounded-full ${
              filledPercentage > 80 ? 'bg-green-500' : 
              filledPercentage > 50 ? 'bg-blue-500' : 'bg-blue-400'
            }`}
            style={{ width: `${filledPercentage}%` }}
          ></div>
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
          {isFilling ? (
            <span className="text-green-600 font-medium">
              Filling fast! {pool.minParticipants - pool.remainingSlots} retailers already joined
            </span>
          ) : (
            <span>
              Join this pool to unlock bulk pricing on {pool.category.toLowerCase()} inventory
            </span>
          )}
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <button
          onClick={onJoin}
          disabled={pool.remainingSlots <= 0}
          className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-all duration-200 ${
            pool.remainingSlots <= 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
          }`}
        >
          {pool.remainingSlots <= 0 ? 'Pool Full' : 'Join Pool'}
        </button>
      </div>
    </motion.div>
  );
};

// JoinPoolModal Component
const JoinPoolModal = ({ 
  pool, 
  isOpen, 
  onClose, 
  onConfirm 
}: { 
  pool: Pool;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const estimatedDiscount = Math.min(10 + Math.floor((pool.minParticipants / 2)), 35);
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 relative z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="bg-blue-50 rounded-t-2xl p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Join "{pool.name}"</h3>
              <p className="text-blue-700 font-medium">{pool.category} Pool</p>
            </div>

            <div className="p-6">
              <div className="mb-6 space-y-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                  <span>Ends on {format(new Date(pool.endTime), "dd MMM, h:mm a")}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Users className="h-5 w-5 mr-3 text-blue-500" />
                  <span>{pool.minParticipants - pool.remainingSlots} participants already joined</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-3 text-blue-500" />
                  <span>
                    {pool.remainingSlots} {pool.remainingSlots === 1 ? 'slot' : 'slots'} remaining
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Pool Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Estimated {estimatedDiscount}% discount on regular wholesale prices</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Priority shipping from manufacturers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Access to limited edition inventory</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-3 px-4 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors shadow-md"
                >
                  Confirm Join
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Main BrowsePools Component
const BrowsePools: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>(mockPools);
  const [filteredPools, setFilteredPools] = useState<Pool[]>(mockPools);
  const [searchQuery, setSearchQuery] = useState('');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const { toast } = useToast();

  useEffect(() => {
    let result = pools;
    
    if (searchQuery) {
      result = result.filter(pool => 
        pool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        pool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterCategory !== 'all') {
      result = result.filter(pool => pool.category === filterCategory);
    }
    
    switch(sortBy) {
      case 'popularity':
        result = [...result].sort((a, b) => 
          (b.minParticipants - b.remainingSlots) - (a.minParticipants - a.remainingSlots)
        );
        break;
      case 'endingSoon':
        result = [...result].sort((a, b) => 
          new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
        );
        break;
      case 'newlyAdded':
        result = [...result].sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    
    setFilteredPools(result);
  }, [pools, searchQuery, filterCategory, sortBy]);

  const handleJoinPool = (pool: Pool) => {
    setSelectedPool(pool);
    setIsJoinModalOpen(true);
  };

  const confirmJoinPool = () => {
    if (selectedPool) {
      setPools(pools.map(pool => 
        pool.id === selectedPool.id 
          ? { ...pool, remainingSlots: pool.remainingSlots - 1 }
          : pool
      ));
      
      // Show success toast
      toast({
        title: "Successfully Joined Pool! 🎉",
        description: `You have joined "${selectedPool.name}". You will be notified when the pool is ready.`,
        variant: "default",
        className: "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800",
      });

      setIsJoinModalOpen(false);
      setSelectedPool(null);
    }
  };

  const categories = ['all', ...Array.from(new Set(pools.map(pool => pool.category)))];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse Buying Pools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join forces with other retailers to unlock volume discounts on premium inventory
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Search pools by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center md:justify-end">
            <FilterDropdown 
              label="Category"
              options={categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))}
              value={filterCategory}
              onChange={setFilterCategory}
              icon={<Filter className="h-4 w-4 mr-2" />}
            />
            
            <FilterDropdown 
              label="Sort By"
              options={[
                { value: 'default', label: 'Default' },
                { value: 'popularity', label: 'Most Popular' },
                { value: 'endingSoon', label: 'Ending Soon' },
                { value: 'newlyAdded', label: 'Newly Added' }
              ]}
              value={sortBy}
              onChange={setSortBy}
              icon={<Filter className="h-4 w-4 mr-2" />}
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPools.length} {filteredPools.length === 1 ? 'pool' : 'pools'}
          </p>
        </div>

        {filteredPools.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPools.map((pool) => (
              <PoolCard 
                key={pool.id} 
                pool={pool} 
                onJoin={() => handleJoinPool(pool)} 
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-md max-w-md mx-auto"
            >
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No pools found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {selectedPool && (
        <JoinPoolModal
          pool={selectedPool}
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
          onConfirm={confirmJoinPool}
        />
      )}
    </div>
  );
};

export default BrowsePools;

