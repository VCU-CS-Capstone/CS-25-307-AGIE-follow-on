import React from "react";
import "../styles/AboutUs.css"; // Import the styles

export default function AboutUs() {
  const Imageheight = 30;
  return (
    <div className="about-page">
      <div className="content-wrapper">
        {/* Image Section */}
        <div className="agie-image">
          <img
            src="../Images/AGIEteam.jpg"
            alt="AGIE Team"
            height={Imageheight}
          />
        </div>

        {/* Text Section */}
        <div className="content-container">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              We aim to create a vibrant community committed to fostering the
              success and advancement of women in the ever-evolving world of
              technology. Our mission is to bridge the gender gap in STEMM
              fields, empower women to thrive in tech careers, and create a
              supportive network that encourages collaboration and innovation.
            </p>

            <h2>Our Vision</h2>
            <p>
              We envision a future where women are not only well-represented in
              technology but are also leaders, influencers, and pioneers in
              shaping the industry's landscape. We believe in a world where
              every woman has equal opportunities to succeed and make impactful
              contributions to the field.
            </p>

            <h2>Acknowledgements</h2>
            <p>
              Prototype website and database developed by Team CS-24-333
              including:
              <br />
              Alina Minor <br />
              Stef Henry <br />
              Sofanyas Genene <br />
              Nahome Kifle
            </p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 My Website</p>
      </footer>
    </div>
  );
}
