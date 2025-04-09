/**
 * API handler for retrieving papers by category
 * Uses the BigQuery API which is already working for search functionality
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed', data: [] });
  }

  // This assumes that the category names come as a comma-separated list or a single string.
  let { categoryName } = req.query;

  if (!categoryName) {
    return res.status(400).json({ error: 'Missing categoryName query parameter', data: [] });
  }

  // Ensure that categoryName is treated as an array.
  const categories = Array.isArray(categoryName) ? categoryName : [categoryName];

  try {
    // Prepare the BigQuery Cloud Function request
    // The cloud function already accepts 'term' and 'field' parameters for searching
    // We'll use the category name as the search term and set the field to 'Title'
    // This effectively searches for papers with category names in their titles
    
    // Construct the URL with query parameters
    const requests = categories.map(category => {
      const url = new URL('https://us-central1-agie-backend.cloudfunctions.net/searchCsv');
      url.searchParams.append('term', category);
      url.searchParams.append('field', 'Title'); // Search in Title field
      url.searchParams.append('limit', '100'); // Get more results for comprehensive filtering
      
      return fetch(url.toString())
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .catch(error => {
          console.error(`Error fetching results for category ${category}:`, error);
          return []; // Return empty array for this category
        });
    });
    
    // Wait for all requests to complete
    const results = await Promise.all(requests);
    
    // Combine and deduplicate results
    const allPapers = results.flat();
    
    // Remove duplicates based on some unique identifier
    const uniquePapers = Array.from(new Map(
      allPapers.map(paper => [paper.Title || paper.title, paper])
    ).values());
    
    // Return the combined results
    res.status(200).json(uniquePapers);
    
  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Return an empty array instead of an error object to prevent frontend map() errors
    res.status(500).json([]);
  }
}
