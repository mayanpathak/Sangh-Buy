import React, { useEffect } from 'react';
import BusinessNews from "@/components/BusinessNews";

const News = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Business News
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Stay updated with the latest business news and market trends
            </p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <BusinessNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News; 