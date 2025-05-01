const express = require('express');
const axios = require('axios');

const router = express.Router();

// Using NewsData.io API
const NEWS_API_KEY = 'pub_80753a30abdff628168eef9f47241d49a1a08';
const NEWS_API_URL = `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&category=business&language=en&size=10`;

// Route to get business news
router.get('/business', async (req, res) => {
    try {
        console.log('Fetching news from NewsData.io API...');
        console.log(`API URL: ${NEWS_API_URL}`);
        
        // Add additional headers and timeout
        const response = await axios.get(NEWS_API_URL, {
            timeout: 15000, // Increased timeout to 15 seconds
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
            }
        });
        
        console.log('API Response Status:', response.status);
        
        // Check if API request was successful
        if (!response.data || response.data.status !== 'success') {
            console.error('API returned error response:', JSON.stringify(response.data));
            throw new Error(`API returned error status: ${JSON.stringify(response.data)}`);
        }
        
        if (!response.data.results || response.data.results.length === 0) {
            console.error('API returned no results');
            throw new Error('API returned no results');
        }
        
        console.log(`API returned ${response.data.results.length} total articles`);
        
        // Transform NewsData.io response to our format
        const allArticles = response.data.results.map((article, index) => ({
            id: article.article_id || `news-${index}`,
            title: article.title || "No title available",
            content: article.description || article.content || "No description available",
            author: article.creator?.[0] || article.source_id || "Unknown",
            date: article.pubDate ? new Date(article.pubDate).toLocaleDateString() : "Unknown date",
            time: article.pubDate ? new Date(article.pubDate).toLocaleTimeString() : "Unknown time",
            imageUrl: article.image_url,
            readMoreUrl: article.link || '#' // Set default value for readMoreUrl
        }));
        
        // Filter for retail, wholesale, FMCG keywords
        let filteredArticles = allArticles.filter(item => {
            const text = `${item.title} ${item.content}`.toLowerCase();
            return text.includes('retail') ||
                   text.includes('wholesale') ||
                   text.includes('fmcg') ||
                   text.includes('consumer') ||
                   text.includes('goods') ||
                   text.includes('market') ||
                   text.includes('shop') ||
                   text.includes('store');
        });
        
        console.log(`Found ${filteredArticles.length} articles matching keywords`);
        
        // If we don't have enough articles after filtering, use the most recent ones
        if (filteredArticles.length < 10) {
            console.log(`Not enough filtered articles, using ${Math.max(10, filteredArticles.length)} most recent articles`);
            
            // Sort all articles by date (newest first)
            allArticles.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
            
            // Combine filtered articles with recent ones to reach at least 10
            const recentArticles = allArticles.filter(article => 
                !filteredArticles.some(filtered => filtered.id === article.id)
            );
            
            // Combine filtered articles with enough recent ones to reach at least 10
            filteredArticles = [
                ...filteredArticles,
                ...recentArticles.slice(0, Math.max(10 - filteredArticles.length, 0))
            ];
        }
        
        // Limit to 30 articles maximum
        const articles = filteredArticles.slice(0, 30);
        
        const news = {
            success: true,
            data: articles,
            totalCount: articles.length,
            fetchedAt: new Date().toISOString()
        };
        
        console.log(`Returning ${news.data.length} news articles`);
        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        
        // More detailed error logging
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
        }
        
        res.status(500).json({
            success: false,
            error: 'Failed to fetch news',
            message: error.message,
            details: error.response ? error.response.data : null
        });
    }
});

// Fallback route for testing
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'News API test endpoint is working',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;