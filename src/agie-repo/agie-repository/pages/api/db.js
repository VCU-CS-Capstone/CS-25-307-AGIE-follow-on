import mysql from "mysql2/promise";

/**
 * Check if we're in a development environment
 */
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Create database connection pool with robust configuration
 * The acquireTimeout warning is fixed by removing that option
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds
  // acquireTimeout removed as it's causing warnings
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

/**
 * Mock data for development mode when database is unavailable
 */
const getCategoryMockData = (endpoint) => {
  if (endpoint === 'allCategories') {
    return [
      "Belonging", "Career & Life Integration", "Evaluation & Workload",
      "Harassment", "Inclusive Culture", "Leadership & Advancement",
      "Mentorship", "Pay Equity", "Recruitment", "Retention", "Tenure & Promotion"
    ];
  } else if (endpoint === 'dataCategories') {
    return [
      { categoryName: "Belonging", categoryCount: 15 },
      { categoryName: "Career & Life Integration", categoryCount: 23 },
      { categoryName: "Evaluation & Workload", categoryCount: 18 },
      { categoryName: "Harassment", categoryCount: 12 },
      { categoryName: "Inclusive Culture", categoryCount: 29 },
      { categoryName: "Leadership & Advancement", categoryCount: 31 },
      { categoryName: "Mentorship", categoryCount: 20 },
      { categoryName: "Pay Equity", categoryCount: 14 },
      { categoryName: "Recruitment", categoryCount: 25 },
      { categoryName: "Retention", categoryCount: 17 },
      { categoryName: "Tenure & Promotion", categoryCount: 22 }
    ];
  }
  return null;
};

/**
 * Variable to track database availability status
 */
let isDatabaseAvailable = true;

/**
 * Enhanced connectDB function with fallback for development
 * @param {string} endpoint - The API endpoint requesting the connection
 * @returns {Promise<Connection|null>} A database connection or null with mockData attached
 * @throws {Error} If connection fails in production
 */
const connectDB = async (endpoint = '') => {
  // If we've already determined the database is unavailable and we're in development,
  // don't waste time trying to connect again
  if (isDevelopment && !isDatabaseAvailable) {
    const mockData = getCategoryMockData(endpoint);
    
    // Create a fake connection object with the mockData
    if (mockData) {
      console.log(`Using mock data for ${endpoint} (database unavailable)`);
      return {
        mockData,
        // Mock the release method
        release: () => {},
        // Mock the query method to return mockData
        query: async () => [mockData]
      };
    }
  }

  try {
    // Get a connection from the pool with timeout
    const connection = await Promise.race([
      pool.getConnection(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 5000)
      )
    ]);
    
    // Mark database as available
    isDatabaseAvailable = true;
    
    // Return the connection to be used
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    
    // Don't expose internal error details, but log them for debugging
    const errorCode = error.code || 'UNKNOWN_ERROR';
    const errorMessage = error.message || 'Unknown database error';
    
    // Log detailed error for server-side debugging
    console.error(`[DB Error] Code: ${errorCode}, Message: ${errorMessage}`);
    
    // If in development, return null to indicate error but continue with mock data
    if (isDevelopment) {
      // Flag that database is unavailable to prevent future connection attempts
      isDatabaseAvailable = false;
      
      // Check if we have mock data for this endpoint
      const mockData = getCategoryMockData(endpoint);
      if (mockData) {
        console.log(`Using mock data for ${endpoint} (database error)`);
        return {
          mockData,
          // Mock the release method
          release: () => {},
          // Mock the query method to return mockData
          query: async () => [mockData]
        };
      }
    }
    
    // Throw a cleaner error for API response handling
    throw new Error(`Database connection error: ${errorCode}`);
  }
};

export default connectDB;
