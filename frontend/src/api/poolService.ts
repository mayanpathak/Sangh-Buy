export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface PoolData {
  name: string;
  productId: string;
  startDate: Date;
  endDate: Date;
  maxBuyers: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 999,
    category: "electronics"
  },
  {
    id: "2",
    name: "Samsung 4K TV",
    price: 799,
    category: "electronics"
  },
  {
    id: "3",
    name: "Nike Air Max",
    price: 129,
    category: "clothing"
  },
  {
    id: "4",
    name: "Peloton Bike",
    price: 1495,
    category: "fitness"
  },
  {
    id: "5",
    name: "IKEA Sofa",
    price: 499,
    category: "home"
  },
  {
    id: "6",
    name: "MacBook Pro",
    price: 1299,
    category: "electronics"
  },
  {
    id: "7",
    name: "Dyson Vacuum",
    price: 399,
    category: "home"
  },
  {
    id: "8",
    name: "Lululemon Leggings",
    price: 98,
    category: "clothing"
  }
];

export const fetchProducts = async (query: string, filters: { category: string; priceRange: [number, number] }): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay

  return mockProducts.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = filters.category === 'all' || product.category === filters.category;
    const matchesPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    
    return matchesQuery && matchesCategory && matchesPriceRange;
  });
};

export const createPool = async (poolData: PoolData): Promise<{ poolId: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  
  // Generate a more realistic pool ID using timestamp and random string
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  const poolId = `pool_${timestamp}_${randomStr}`;
  
  // Log the pool creation for debugging
  console.log('Created pool:', { poolId, ...poolData });
  
  return { poolId };
};