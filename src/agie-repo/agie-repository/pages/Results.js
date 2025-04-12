"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CardContainer } from "../components/Card";
import { useRouter } from "next/router";
import styles from "../styles/admin.module.css";
import PaginationControls from "../components/PaginationControls";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

export default function SearchPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("publishDate");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("Title");
  const [loading, setLoading] = useState(false);
  const [visibleAbstractId, setVisibleAbstractId] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Reference to track active requests
  const activeRequestRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(6845);

  // Available fields for searching
  const searchFields = ["Title", "Authors", "Abstract", "Journal", "Tags"];

  // State for API errors
  const [categoryError, setCategoryError] = useState(false);

  // Define fetchCategories as useCallback for consistency
  const fetchCategories = useCallback(async () => {
    try {
      console.log("Fetching categories...");
      const response = await fetch("/api/allCategories");

      // Log the response status for debugging
      console.log("Categories API response status:", response.status);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: "Failed to parse error response" };
        }
        console.error("Categories API returned an error:", errorData);
        setCategoryError(true);

        // Fallback to mock data on error
        setCategories([
          "Belonging",
          "Career & Life Integration",
          "Evaluation & Workload",
          "Harassment",
          "Inclusive Culture",
          "Leadership & Advancement",
          "Mentorship",
          "Pay Equity",
          "Recruitment",
          "Retention",
          "Tenure & Promotion",
        ]);
        return;
      }

      const data = await response.json();
      console.log("Categories data received:", data);

      // Check if data is an array and has content
      if (Array.isArray(data) && data.length > 0) {
        setCategories(data);
        setCategoryError(false);
      } else {
        console.error("Categories data is empty or not an array:", data);
        // Use mock data when API returns empty results
        setCategories([
          "Belonging",
          "Career & Life Integration",
          "Evaluation & Workload",
          "Harassment",
          "Inclusive Culture",
          "Leadership & Advancement",
          "Mentorship",
          "Pay Equity",
          "Recruitment",
          "Retention",
          "Tenure & Promotion",
        ]);
        setCategoryError(false);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryError(true);

      // Fallback to using mock data on error
      setCategories([
        "Belonging",
        "Career & Life Integration",
        "Evaluation & Workload",
        "Harassment",
        "Inclusive Culture",
        "Leadership & Advancement",
        "Mentorship",
        "Pay Equity",
        "Recruitment",
        "Retention",
        "Tenure & Promotion",
      ]);
      setCategoryError(false);
    }
  }, []);

  // Cancel any active requests when component unmounts or when dependencies change
  const cancelActiveRequest = useCallback(() => {
    if (activeRequestRef.current) {
      console.log("Cancelling previous request");
      activeRequestRef.current.abort();
      activeRequestRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelActiveRequest();
    };
  }, [cancelActiveRequest]);

  // Initial results fetching function - defined before it's used in useEffect
  const fetchInitialResults = useCallback(async () => {
    // Cancel any ongoing requests
    cancelActiveRequest();

    setLoading(true);
    setError(null);

    // Create a new AbortController for this request
    const controller = new AbortController();
    activeRequestRef.current = controller;

    // Timeouts
    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      if (controller && !controller.signal.aborted) {
        console.log("Timing out initial results request after 60 seconds");
        controller.abort();
      }
    }, 60000); // 60 second timeout - increased for better user experience

    try {
      console.log("Fetching initial results...");
      const url = new URL(`${window.location.origin}/api/searchCsv`);
      url.searchParams.append("field", searchField);
      url.searchParams.append("limit", "1000");

      const response = await fetch(url, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Initial results received:", data ? data.length : 0, "items");

      // Only update results and clear error if we have valid data
      const validData = Array.isArray(data) ? data : [];
      if (validData.length > 0) {
        setResults(validData);
        setTotalItems(Math.max(validData.length, 6845));
        setError(null); // Clear any error message when we successfully get data
        setCurrentPage(1);
      } else {
        setResults([]);
        setError("No results found. Please try different search criteria.");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        if (isTimeout) {
          console.error("Request timed out after 60 seconds");
          // Don't clear results if we might have partial data
          if (results.length === 0) {
            setError("Request timed out. Try refining your search criteria.");
          } else {
            // Still show partial results with a warning
            setError(
              "Request took longer than expected. Showing available results."
            );
          }
        } else {
          console.error("Request was cancelled by user");
          // Don't show error for user cancellation
        }
      } else {
        console.error("Error fetching initial results:", error);
        // Don't clear results if we might have partial data
        if (results.length === 0) {
          setError("Failed to fetch results. Please try again.");
        }
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
      // Clear the reference if this is still the active request
      if (
        activeRequestRef.current &&
        activeRequestRef.current.signal === controller.signal
      ) {
        activeRequestRef.current = null;
      }
    }
  }, [searchField, cancelActiveRequest, results.length]);

  // Load initial results when the page loads (only on client side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (tempSelectedCategories.length === 0 && searchTerm.trim() === "") {
        fetchInitialResults();
      }
      fetchCategories();
    }
  }, [
    searchField,
    fetchInitialResults,
    fetchCategories,
    tempSelectedCategories,
    searchTerm,
  ]);

  const handleCategoryToggle = (category) => {
    setTempSelectedCategories((prev) => {
      const updated = prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category];
      console.log("Updated tempSelectedCategories:", updated);
      return updated;
    });
  };

  const applyFilters = async () => {
    // Cancel any ongoing requests
    cancelActiveRequest();

    setLoading(true);
    setError(null);

    if (tempSelectedCategories.length === 0 && searchTerm.trim() === "") {
      await fetchInitialResults();
      setSelectedCategories([]);
      return;
    } else if (tempSelectedCategories.length === 0) {
      await fetchResults();
      setSelectedCategories([]);
      return;
    }

    // Create a new AbortController for this request
    const controller = new AbortController();
    activeRequestRef.current = controller;

    // Timeouts
    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      if (controller && !controller.signal.aborted) {
        console.log("Timing out category filter request after 60 seconds");
        controller.abort();
      }
    }, 60000); // 60 second timeout

    try {
      console.log("Applying category filters:", tempSelectedCategories);
      const queryParams = new URLSearchParams();
      tempSelectedCategories.forEach((cat) =>
        queryParams.append("categoryName", cat)
      );

      console.log(
        "Calling paperByCategory API with params:",
        queryParams.toString()
      );

      const response = await fetch(
        `/api/paperByCategory?${queryParams.toString()}`,
        {
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        "Category filter results received:",
        data ? data.length : 0,
        "items"
      );

      // Only update results and clear error if we have valid data
      const validData = Array.isArray(data) ? data : [];
      if (validData.length > 0) {
        setResults(validData);
        setTotalItems((prev) => Math.max(validData.length, prev));
        setError(null); // Clear any error message when we successfully get data
        setSelectedCategories(tempSelectedCategories);
        setCurrentPage(1);
      } else {
        setResults([]);
        setError(
          "No papers found for selected categories. Please try different categories."
        );
        setSelectedCategories([]); // Clear selected categories as they had no results
      }
    } catch (error) {
      if (error.name === "AbortError") {
        if (isTimeout) {
          console.error("Category filter request timed out after 60 seconds");
          // Don't clear results if we might have partial data
          if (results.length === 0) {
            setError(
              "Filter request timed out. Try selecting fewer categories."
            );
          } else {
            // Still show partial results with a warning
            setError(
              "Request took longer than expected. Showing available results."
            );
          }
        } else {
          console.error("Request was cancelled by user");
          // Don't show error for user cancellation
        }
      } else {
        console.error("Error fetching papers by categories:", error);
        setError("Failed to filter papers. Please try again.");
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
      // Clear the reference if this is still the active request
      if (
        activeRequestRef.current &&
        activeRequestRef.current.signal === controller.signal
      ) {
        activeRequestRef.current = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchResults();
  };

  const fetchResults = useCallback(async () => {
    // Cancel any ongoing requests
    cancelActiveRequest();

    setLoading(true);
    setError(null);

    // Create a new AbortController for this request
    const controller = new AbortController();
    activeRequestRef.current = controller;

    // Timeouts
    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      if (controller && !controller.signal.aborted) {
        console.log("Timing out search request after 60 seconds");
        controller.abort();
      }
    }, 60000); // 60 second timeout

    try {
      console.log("Fetching search results:", searchTerm, searchField);
      const url = new URL(`${window.location.origin}/api/searchCsv`);

      if (searchTerm) {
        url.searchParams.append("term", searchTerm);
      }
      url.searchParams.append("field", searchField);
      url.searchParams.append("limit", "1000");

      const response = await fetch(url, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search results received:", data ? data.length : 0, "items");

      // Only update results and clear error if we have valid data
      const validData = Array.isArray(data) ? data : [];
      if (validData.length > 0) {
        setResults(validData);
        setTotalItems((prev) => Math.max(validData.length, prev));
        setError(null); // Clear any error message when we successfully get data
        setCurrentPage(1);
      } else {
        setResults([]);
        setError(
          `No results found for "${searchTerm}" in ${searchField}. Please try different search terms.`
        );
      }
    } catch (error) {
      if (error.name === "AbortError") {
        if (isTimeout) {
          console.error("Search request timed out after 60 seconds");
          // Don't clear results if we might have partial data
          if (results.length === 0) {
            setError(
              "Search request timed out. Try a more specific search term."
            );
          } else {
            // Still show partial results with a warning
            setError(
              "Request took longer than expected. Showing available results."
            );
          }
        } else {
          console.error("Request was cancelled by user");
          // Don't show error for user cancellation
        }
      } else {
        console.error("Error fetching results:", error);
        // Don't clear results if we might have partial data
        if (results.length === 0) {
          setError("Failed to fetch results. Please try again.");
        }
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
      // Clear the reference if this is still the active request
      if (
        activeRequestRef.current &&
        activeRequestRef.current.signal === controller.signal
      ) {
        activeRequestRef.current = null;
      }
    }
  }, [searchTerm, searchField, cancelActiveRequest, results.length]);

  useEffect(() => {
    if (router.isReady && router.query.query) {
      setSearchTerm(router.query.query);
      fetchResults();
    }
  }, [router.isReady, router.query, fetchResults]);

  const toggleAbstract = (id) => {
    setVisibleAbstractId((currentId) => (currentId === id ? null : id));
  };

  // Function to safely sort results based on criteria
  const getSortedResults = (data, criteria) => {
    try {
      if (!Array.isArray(data) || data.length === 0) return [];

      return [...data].sort((a, b) => {
        if (criteria === "publishDate") {
          if (a["Published Year"] && b["Published Year"]) {
            return (
              parseInt(b["Published Year"]) - parseInt(a["Published Year"])
            );
          } else {
            return (
              new Date(b.publishedDate || "2000-01-01") -
              new Date(a.publishedDate || "2000-01-01")
            );
          }
        } else if (criteria === "recentlyAdded") {
          return (
            new Date(b.addedDate || "2000-01-01") -
            new Date(a.addedDate || "2000-01-01")
          );
        }
        return 0;
      });
    } catch (error) {
      console.error("Error sorting results:", error);
      return data || []; // Return unsorted results if sorting fails
    }
  };

  // Use a useMemo to get sorted results to avoid modifying state in useEffect
  const sortedResults = useMemo(() => {
    return getSortedResults(results, sortCriteria);
  }, [results, sortCriteria]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const getPaginatedResults = useCallback(() => {
    try {
      if (!Array.isArray(sortedResults)) return [];
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return sortedResults.slice(startIndex, endIndex);
    } catch (error) {
      console.error("Error getting paginated results:", error);
      return []; // Return empty array on error
    }
  }, [sortedResults, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="relative bg-gradient-to-r from-yellow-500/90 to-yellow-400/90 py-16 pt-24 md:pt-32 mt-16 md:mt-20">
        <div className="container mx-auto px-4">
          <div className="items-center justify-center text-center">
            <h1 className="text-5xl md:text-7xl uppercase font-bold text-black mb-4">
              Search Database
            </h1>
            <div className="w-24 h-1 bg-black mx-auto mt-2 mb-6"></div>
            <p className="text-xl text-black/80 max-w-2xl mx-auto mb-8">
              Explore the AGIE Research Repository
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-black/10 rounded-tl-full"></div>
      </div>
      <CardContainer className="py-12 mb-20 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-1">
            <div
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 border-t-4 sticky top-40 hover:shadow-xl transition-all"
              style={{ borderTopColor: "#CDAE5E" }}
            >
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#CDAE5E" }}
              >
                <FaFilter className="inline-block mr-2 mb-1" />
                Categories
              </h2>
              <div className="border-b border-gray-200 mb-4 pb-2"></div>
              {Array.isArray(categories) && categories.length > 0 ? (
                <>
                  <div className="max-h-[60vh] overflow-y-auto pr-2 mb-4">
                    <ul className="space-y-2">
                      {categories.map((category, index) => (
                        <li key={index} className="flex items-center">
                          <input
                            id={`checkbox-${category}`}
                            type="checkbox"
                            checked={tempSelectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="mr-2 h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold"
                          />
                          <label
                            htmlFor={`checkbox-${category}`}
                            className="text-gray-700 cursor-pointer text-sm"
                          >
                            {category}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={applyFilters}
                    className="w-full px-4 py-2 rounded-lg text-white font-medium transition-colors duration-300 hover:bg-opacity-90"
                    style={{ backgroundColor: "#CDAE5E" }}
                    disabled={loading}
                  >
                    Apply Filters
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Categories unavailable</p>
                  <p className="text-sm text-gray-400">
                    Please try again later
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="bg-white rounded-lg shadow-lg p-5 mb-6 border border-gray-200 hover:shadow-xl transition-all">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#CDAE5E" }}
              >
                <FaSearch className="inline-block mr-2 mb-1" />
                Search Papers
              </h2>
              <form onSubmit={handleSubmit} className="mb-5">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex flex-grow">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Enter search term"
                      className="w-full px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{ focusRing: "#CDAE5E" }}
                    />
                    <select
                      value={searchField}
                      onChange={(e) => setSearchField(e.target.value)}
                      className="px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-white"
                    >
                      {searchFields.map((field) => (
                        <option key={field} value={field}>
                          {field}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg text-white font-medium transition-colors duration-300 hover:bg-opacity-90 min-w-[120px]"
                    style={{ backgroundColor: "#CDAE5E" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className={styles.loader}></div>
                        <span className="ml-2">Searching...</span>
                      </div>
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>
              </form>
              <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-4 mb-3 md:mb-0">
                  <div className="flex items-center">
                    <FaSortAmountDown className="mr-2 text-gray-600" />
                    <span className="text-gray-600 mr-2">Sort by:</span>
                    <select
                      onChange={(e) => setSortCriteria(e.target.value)}
                      className="p-1 border rounded bg-white text-gray-700"
                    >
                      <option value="publishDate">Publish Date</option>
                      <option value="recentlyAdded">Recently Added</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      className="p-1 border rounded bg-white text-gray-700"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>
                <div className="text-gray-600">
                  Showing {getPaginatedResults().length} of{" "}
                  {sortedResults.length} results
                </div>
              </div>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              <div className="space-y-4 mb-8 min-h-[300px]">
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-5 bg-white animate-pulse"
                    >
                      <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                        <div className="h-5 bg-gray-200 rounded"></div>
                        <div className="h-5 bg-gray-200 rounded"></div>
                        <div className="h-5 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
                    </div>
                  ))
                ) : getPaginatedResults().length === 0 ? (
                  <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-lg">No results found</p>
                    <p className="text-gray-500 mt-2">
                      Try adjusting your search criteria
                    </p>
                  </div>
                ) : (
                  getPaginatedResults().map((item, index) => {
                    const absoluteIndex =
                      (currentPage - 1) * itemsPerPage + index;
                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow duration-300"
                        onClick={() => toggleAbstract(absoluteIndex)}
                      >
                        <h3
                          className="text-xl font-semibold mb-2"
                          style={{ color: "#CDAE5E" }}
                        >
                          {item.Title || item.title || "No title available"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                          <div>
                            <span className="text-gray-600 font-medium">
                              Authors:
                            </span>{" "}
                            <span className="text-gray-800">
                              {item.Authors || "Unknown"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 font-medium">
                              Journal:
                            </span>{" "}
                            <span className="text-gray-800">
                              {item.Journal || "Unknown"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 font-medium">
                              Year:
                            </span>{" "}
                            <span className="text-gray-800">
                              {item["Published Year"] ||
                                (item.publishedDate
                                  ? new Date(item.publishedDate).getFullYear()
                                  : "Unknown")}
                            </span>
                          </div>
                        </div>
                        {visibleAbstractId === absoluteIndex ? (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium mb-2 text-gray-800">
                              Abstract
                            </h4>
                            <p className="text-gray-700">
                              {item.Abstract ||
                                item.content ||
                                "No abstract available"}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-4">
                              {item.DOI && (
                                <a
                                  href={`https://doi.org/${item.DOI}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  View Full Article (DOI)
                                </a>
                              )}
                              {item.paperURL && (
                                <a
                                  href={item.paperURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Read More
                                </a>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-sm mt-2"
                            style={{ color: "#CDAE5E" }}
                          >
                            Click to view abstract
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
              {sortedResults.length > itemsPerPage && (
                <div className="flex justify-center mt-8 mb-6">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={Math.ceil(sortedResults.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContainer>
      <Footer />
    </div>
  );
}
