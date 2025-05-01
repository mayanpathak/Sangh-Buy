import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBusinessNews } from '@/api';

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

const BusinessNews = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getBusinessNews();
                
                if (!response.success) {
                    throw new Error(response.message || 'Failed to fetch news');
                }
                
                setNews(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch news');
                console.error('Error fetching news:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                <p>Error: {error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (news.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                <p>No news articles found. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
                <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                >
                    {item.imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                                }}
                            />
                        </div>
                    )}
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                            {item.content}
                        </p>
                        <a
                            href={item.readMoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        >
                            Read more →
                        </a>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700">
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{item.author || 'Unknown Author'}</span>
                            <span>{`${item.date || 'N/A'} ${item.time ? '| ' + item.time : ''}`}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default BusinessNews; 