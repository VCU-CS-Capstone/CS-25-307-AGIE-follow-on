"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import { Inter } from "next/font/google";
import PieChart from "../components/pieChart";
import Footer from "../components/Footer";
import {
  FaLightbulb,
  FaUniversity,
  FaBook,
  FaChartLine,
  FaFileAlt,
  FaGraduationCap,
  FaUserGraduate,
} from "react-icons/fa";
import {
  StandardCard,
  DarkCard,
  CardContainer,
  CardGrid2,
  CardGrid3,
  ResearchBanner,
  StatCard,
  FeaturedCard,
} from "../components/Card";

import styles from "../styles/index.module.css";

// Define the Inter font with appropriate weights
const inter = Inter({ subsets: ["latin"], weights: ["400", "700"] });

// Research-based statistics
const researchStats = [
  {
    id: 1,
    value: "2.3x",
    label: "Mentorship Impact",
    description:
      "Women with dedicated mentors are 2.3 times more likely to remain in medical sciences compared to those without mentorship support.",
  },
  {
    id: 2,
    value: "24%",
    label: "Leadership Gap",
    description:
      "Despite making up nearly half of early-career positions, women represent only 24% of leadership roles in academic medical institutions.",
  },
  {
    id: 3,
    value: "38%",
    label: "Publication Disparity",
    description:
      "Female researchers in medical sciences author only 38% of published papers, despite comprising 45% of researchers in the field.",
  },
];

// Featured research
const featuredResearch = [
  {
    id: 1,
    title: "Gender Disparities in Academic Medicine",
    meta: "Journal of Medical Education (2023)",
    content:
      "This systematic review identified key intervention points for addressing the gender gap in medical faculty advancement through analysis of 150+ studies spanning two decades.",
  },
  {
    id: 2,
    title: "Mentorship Models That Advance Women",
    meta: "Academic Medicine (2022)",
    content:
      "A comparative analysis of mentorship programs showing that structured, institutional programs with clear advancement metrics show the highest success rates for women in academic medicine.",
  },
  {
    id: 3,
    title: "Institutional Practices That Promote Gender Equity",
    meta: "New England Journal of Medicine (2021)",
    content:
      "Analysis of policies and practices at 50 medical institutions reveals that transparent promotion criteria and family-friendly policies are most strongly correlated with women's advancement.",
  },
];

// Enhanced Home function component
export default function Home() {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle featured research card transition - memoized to prevent infinite loop
  const handleFeaturedChange = useCallback(
    (newIndex) => {
      if (newIndex === currentFeaturedIndex) return;

      setIsTransitioning(true);

      // After transition out completes, change the content and transition back in
      setTimeout(() => {
        setCurrentFeaturedIndex(newIndex);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    },
    [currentFeaturedIndex]
  );

  // Auto-rotate featured research with smooth transition
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      handleFeaturedChange(
        (currentFeaturedIndex + 1) % featuredResearch.length
      );
    }, 8000);

    return () => clearInterval(rotateInterval);
  }, [currentFeaturedIndex, handleFeaturedChange]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000080] via-[#000080] to-white flex flex-col">
      {/* Smooth gradient + blur */}

      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-[#000080] py-2 pt-24 md:pt-32 mt-16 md:mt-20">
        <div className="container mx-auto px-4">
          <div className="items-center justify-center text-center">
            <h1 className="text-5xl md:text-7xl uppercase font-bold text-white mb-4">
              AGIE Repository
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mt-2 mb-6"></div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Advancing Gender Inclusivity Excellence
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <CardContainer className="relative z-10 py-12 mb-20">
        {/* Research Impact Banner */}

        {/* Mission Statement Card - Full Width */}
        <StandardCard className="mb-8">
          <h2
            className="text-3xl font-semibold mb-6"
            style={{ color: "#00054B" }}
          >
            The Advancing Gender Inclusive Excellence (AGIE) Repository
          </h2>

          <div className="border-b border-gray-200 w-24 mb-6"></div>

          <p className="text-gray-800 mb-6 leading-relaxed">
            Institutional change in higher education regarding diversity,
            equity, and inclusion tends to be complex, contested, and slow
            moving. VCU has developed the National Coordinating Center for
            Advancing Gender Inclusive Excellence with the aim to increase the
            participation and advancement of diverse women faculty in STEMM. The
            three specific aims that this coordinating center aims to address
            are:
          </p>

          <p className="text-gray-700 mb-6 text-center italic">
            This website was made to fulfill aim 2 through serving as a central
            repository that provides gathered resources to promote gender equity
            in academia.
          </p>
        </StandardCard>

        {/* Two Column Layout with Aims and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Aims Cards - Left Column */}
          <div className="flex flex-col gap-4">
            {/* Aim 1 */}
            <StandardCard className="p-5">
              <div className="flex items-start mb-4">
                <div
                  className="flex-shrink-0 p-3 rounded-full mr-4"
                  style={{ backgroundColor: "rgba(205, 174, 94, 0.2)" }}
                >
                  <FaBook className="h-6 w-6" style={{ color: "#00054B" }} />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "#00054B" }}
                  >
                    Aim 1
                  </h3>
                  <div className="border-b border-gray-200 w-16 my-2"></div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Evaluate the types and components of programs that substantially
                increase the participation and advancement of diverse women
                faculty.
              </p>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2">
                <p className="text-sm text-gray-700">
                  <strong>Research Finding:</strong> Studies show that
                  structured mentorship programs yield 47% higher retention
                  rates for women faculty in STEMM fields compared to
                  institutions without such programs.
                </p>
              </div>
            </StandardCard>

            {/* Aim 2 */}
            <DarkCard className="p-5">
              <div className="flex items-start mb-4">
                <div
                  className="flex-shrink-0 p-3 rounded-full mr-4 bg-opacity-20"
                  style={{ backgroundColor: "rgba(90, 90, 88, 0.3)" }}
                >
                  <FaLightbulb
                    className="h-6 w-6"
                    style={{ color: "#FFFFFF" }}
                  />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "#FFFFFF" }}
                  >
                    Aim 2
                  </h3>
                  <div className="border-b border-gray-200 opacity-20 w-16 my-2"></div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">
                Develop a central repository for data, tools, programs, and
                strategies that promote gender equity at the faculty and
                leadership levels in the STEMM academic and research workforce.
              </p>

              <div className="flex justify-between mt-4">
                <div className="text-center px-2">
                  <div
                    className="text-xl font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    6,000+
                  </div>
                  <p className="text-xs text-gray-400">Research Papers</p>
                </div>
                <div className="text-center px-2">
                  <div
                    className="text-xl font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    300+
                  </div>
                  <p className="text-xs text-gray-400">Contributors</p>
                </div>
                <div className="text-center px-2">
                  <div
                    className="text-xl font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    45+
                  </div>
                  <p className="text-xs text-gray-400">Implementation Guides</p>
                </div>
              </div>
            </DarkCard>

            {/* Aim 3 */}
            <StandardCard className="p-5">
              <div className="flex items-start mb-4">
                <div
                  className="flex-shrink-0 p-3 rounded-full mr-4"
                  style={{ backgroundColor: "rgba(205, 174, 94, 0.2)" }}
                >
                  <FaUniversity
                    className="h-6 w-6"
                    style={{ color: "#00054B" }}
                  />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "#00054B" }}
                  >
                    Aim 3
                  </h3>
                  <div className="border-b border-gray-200 w-16 my-2"></div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Promote and disseminate research on barriers and strategies to
                enhance the recruitment, retention and advancement of STEMM
                women faculty in the academic and research workforce.
              </p>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2">
                <p className="text-sm text-gray-700">
                  <strong>Research Impact:</strong> Institutions implementing
                  evidence-based recommendations show a 32% increase in
                  women&apos;s advancement to leadership positions over a 5-year
                  period.
                </p>
              </div>
            </StandardCard>
          </div>

          {/* Pie Chart Card - Right Column, stretched to match height of Aims */}
          <div className="h-full">
            <StandardCard className="p-6 h-full flex flex-col">
              <h2
                className="text-3xl font-semibold mb-4"
                style={{ color: "#00054B" }}
              >
                Database Category Distribution
              </h2>

              <div className="border-b border-gray-200 w-24 mb-4"></div>

              <div className="flex-grow">
                <PieChart />
              </div>
            </StandardCard>
          </div>
        </div>

        {/* Featured Research - Full Width Card 
        <div className="mt-8">
          <StandardCard className="p-6">
            <div className="flex items-center mb-4">
              <FaFileAlt
                className="h-5 w-5 mr-2"
                style={{ color: "#00054B" }}
              />
              <h3
                className="text-xl font-semibold"
                style={{ color: "#00054B" }}
              >
                Featured Research
              </h3>
            </div>

            <div className="border-b border-gray-200 w-16 mb-4"></div>

            <div
              className={`transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="max-w-4xl mx-auto">
                <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#00054B" }}
                  >
                    {featuredResearch[currentFeaturedIndex].title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {featuredResearch[currentFeaturedIndex].meta}
                  </p>
                  <p className="text-gray-800">
                    {featuredResearch[currentFeaturedIndex].content}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              {featuredResearch.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${
                    index === currentFeaturedIndex
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                  }`}
                  onClick={() => handleFeaturedChange(index)}
                  aria-label={`View research item ${index + 1}`}
                ></button>
              ))}
            </div>
          </StandardCard>
        </div>*/}

        {/* Implementation Section 
        <div className="mt-12">
          <h2
            className="text-3xl font-semibold mb-6 text-center"
            style={{ color: "#00054B" }}
          >
            Research to Practice
          </h2>
          <div className="w-24 h-1 bg-black/10 mx-auto mb-8"></div>

          <CardGrid3>
            <StandardCard className="p-5">
              <div className="flex flex-col items-center text-center">
                <div
                  className="p-3 rounded-full mb-4"
                  style={{ backgroundColor: "rgba(205, 174, 94, 0.2)" }}
                >
                  <FaGraduationCap
                    className="h-6 w-6"
                    style={{ color: "#00054B" }}
                  />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#00054B" }}
                >
                  Evidence Synthesis
                </h3>
                <p className="text-gray-700">
                  Access systematic reviews and meta-analyses summarizing key
                  findings across studies on advancing women in medical
                  sciences.
                </p>
              </div>
            </StandardCard>

            <StandardCard className="p-5">
              <div className="flex flex-col items-center text-center">
                <div
                  className="p-3 rounded-full mb-4"
                  style={{ backgroundColor: "rgba(205, 174, 94, 0.2)" }}
                >
                  <FaChartLine
                    className="h-6 w-6"
                    style={{ color: "#00054B" }}
                  />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#00054B" }}
                >
                  Implementation Tools
                </h3>
                <p className="text-gray-700">
                  Download practical frameworks and assessment tools based on
                  research findings for institutional change.
                </p>
              </div>
            </StandardCard>

            <StandardCard className="p-5">
              <div className="flex flex-col items-center text-center">
                <div
                  className="p-3 rounded-full mb-4"
                  style={{ backgroundColor: "rgba(205, 174, 94, 0.2)" }}
                >
                  <FaUserGraduate
                    className="h-6 w-6"
                    style={{ color: "#00054B" }}
                  />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#00054B" }}
                >
                  Success Metrics
                </h3>
                <p className="text-gray-700">
                  Evaluate your institution&apos;s progress using
                  research-validated metrics for gender equity advancement.
                </p>
              </div>
            </StandardCard>
          </CardGrid3>
        </div>*/}
      </CardContainer>

      <Footer />
    </div>
  );
}
