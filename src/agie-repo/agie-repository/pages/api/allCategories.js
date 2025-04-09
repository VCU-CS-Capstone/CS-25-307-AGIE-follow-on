import connectDB from './db'; 

/**
 * API handler for retrieving all categories
 * Implements robust error handling and proper response management
 */
export default async function handler(req, res) {
  let connection = null;
  
  try {
    // Establish database connection - pass endpoint name for potential mock data
    connection = await connectDB('allCategories');

    // Check if we're using mock data
    if (connection.mockData) {
      return res.status(200).json(connection.mockData);
    }

    // Regular database query
    const query = `SELECT DISTINCT categoryName 
                   FROM agieCategory`;

    const [data] = await connection.query(query);

    // Return successful response
    res.status(200).json(data.map(item => item.categoryName));
    
  } catch (error) {
    // Log the error with details for server-side debugging
    console.error('Categories API error:', error);
    
    // Check if it's a specific database connection error
    if (error.message && error.message.includes('Database connection error')) {
      return res.status(503).json({ 
        error: 'Database service unavailable',
        message: 'Database connection failed. The service is temporarily unavailable.'
      });
    }
    
    // Default error response
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing your request.'
    });
  } finally {
    // Safely release the connection if it exists
    if (connection && !connection.mockData) {
      try {
        connection.release();
      } catch (releaseError) {
        console.error('Error releasing database connection:', releaseError);
      }
    }
  }
}
