import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/admin.module.css';
import { useAuth } from '../Auth/AuthContext';

export default function BigQuerySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('Title');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleAbstractId, setVisibleAbstractId] = useState(null);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Available fields for searching
  const searchFields = [
    'Title',
    'Authors',
    'Abstract',
    'Journal',
    'Tags'
  ];

  // Authentication check disabled for static export
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push('/Login');  // Redirect to login if not authenticated
  //   }
  // }, [isLoggedIn, router]);

  // Load initial results when the page loads (only on client side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // We'll define fetchInitialResults inside the effect to avoid dependency issues
      const fetchInitialResults = async () => {
        setLoading(true);
        try {
          // Construct the URL with query parameters
          const url = new URL('https://us-central1-agie-backend.cloudfunctions.net/searchCsv');
          url.searchParams.append('field', searchField);
          url.searchParams.append('limit', '20');

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Error fetching initial results:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchInitialResults();
    }
  }, [searchField]); // Include searchField as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchResults();
  };

  const fetchResults = async () => {
    setLoading(true);
    try {
      // Construct the URL with query parameters
      const url = new URL('https://us-central1-agie-backend.cloudfunctions.net/searchCsv');
      if (searchTerm) {
        url.searchParams.append('term', searchTerm);
      }
      url.searchParams.append('field', searchField);
      url.searchParams.append('limit', '20');

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
      alert('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAbstract = (id) => {
    setVisibleAbstractId(currentId => currentId === id ? null : id);
  };

  return (
    <div>
      <div className={styles.htmlAdmin}>
        <h1 className={styles.mainAdmin}>Research Database Search</h1>
        
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.searchControls}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term"
              className={styles.searchInput}
            />
            
            <select 
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className={styles.searchSelect}
            >
              {searchFields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
          
          {loading ? (
            <div>
              <div className={styles.loader}></div>
              <p className={styles.mainAdmin}>Searching...</p>
            </div>
          ) : (
            <button type="submit" className={styles.searchButton}>Search</button>
          )}
        </form>

        <div className={styles.resultsCount}>
          {results.length > 0 && (
            <p>Found {results.length} results</p>
          )}
        </div>

        <ul className={styles.resultsList}>
          {results.map((item, index) => (
            <li key={index} className={styles.resultItem} onClick={() => toggleAbstract(index)}>
              <p className={styles.mainAdmin}><strong>Title:</strong> {item.Title}</p>
              <p className={styles.mainAdmin}><strong>Authors:</strong> {item.Authors}</p>
              <p className={styles.mainAdmin}><strong>Journal:</strong> {item.Journal}</p>
              <p className={styles.mainAdmin}><strong>Year:</strong> {item.Published_Year}</p>
              
              {visibleAbstractId === index && (
                <div className={styles.abstractContainer}>
                  <p className={styles.mainAdmin}><strong>Abstract:</strong> {item.Abstract}</p>
                  {item.DOI && (
                    <a 
                      href={`https://doi.org/${item.DOI}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.doiLink}
                    >
                      View Full Article (DOI: {item.DOI})
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
