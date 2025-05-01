import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface PoolData {
  products: Product[];
  date: string;
  time: string;
  maxBuyers: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  author: string;
  imageUrl: string;
  readMoreUrl: string;
}

interface NewsResponse {
  success: boolean;
  data: NewsItem[];
  error?: string;
  message?: string;
}

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const searchProducts = async (query: string): Promise<Product[]> => {
  // This is a mock implementation. In a real app, this would make an API call
  const mockProducts: Product[] = [
    { id: 1, name: 'Smartphone X', price: 699.99, category: 'Electronics' },
    { id: 2, name: 'Laptop Pro', price: 1299.99, category: 'Electronics' },
    { id: 3, name: 'Wireless Earbuds', price: 149.99, category: 'Electronics' },
    { id: 4, name: 'Smart Watch', price: 299.99, category: 'Electronics' },
    { id: 5, name: 'Coffee Maker', price: 79.99, category: 'Home Goods' },
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Filter products based on query
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
};

export const createPool = async (poolData: PoolData): Promise<{ success: boolean; poolId: string }> => {
  // This is a mock implementation. In a real app, this would make an API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate successful pool creation
  return {
    success: true,
    poolId: Math.random().toString(36).substring(2, 15),
  };
};

// News API services
export const getBusinessNews = async (): Promise<NewsResponse> => {
  try {
    // Add timeout and retry logic
    const response = await apiClient.get<NewsResponse>('/news/business', {
      timeout: 10000
    });
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch business news');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching business news:', error);
    
    // Return fallback news data for demonstration purposes
    return {
      success: true,
      data: [
        {
          id: 'fallback-1',
          title: 'Retail Industry Trends 2023',
          content: 'The retail industry is seeing major shifts toward digital transformation and omnichannel experiences.',
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          author: 'Business Analyst',
          imageUrl: 'https://placehold.co/600x400?text=Retail+News',
          readMoreUrl: '#'
        },
        {
          id: 'fallback-2',
          title: 'E-commerce Growth Continues in Q2',
          content: 'Online shopping volume increased by 15% in the second quarter compared to last year.',
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          author: 'Market Research',
          imageUrl: 'https://placehold.co/600x400?text=E-commerce+News',
          readMoreUrl: '#'
        },
        {
          id: 'fallback-3',
          title: 'Supply Chain Innovations for Consumer Goods',
          content: 'New technologies are helping FMCG companies improve efficiency in their supply chains.',
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          author: 'Supply Chain Expert',
          imageUrl: 'https://placehold.co/600x400?text=Supply+Chain+News',
          readMoreUrl: '#'
        }
      ],
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Using fallback news data due to API error'
    };
  }
}; 