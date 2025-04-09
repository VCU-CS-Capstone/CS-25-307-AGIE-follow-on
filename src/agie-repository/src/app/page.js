import React from "react";
import "./styles/globals.css"; // Import the styles

export default function Home() {
  return (
    <div className="home-container home-page">
      {" "}
      {/* Add home-page class */}
      <div className="text-container">
        <p>
          Explore our diverse collection of articles on women in STEMM and see
          what the recruitment of women in these fields can bring to companies.
        </p>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Explore Database..."
          className="search-bar"
        />
        <button className="search-button">Search</button>
      </div>
      <footer className="footer">
        <p>© 2024 My Website</p>
      </footer>
    </div>
  );
}
