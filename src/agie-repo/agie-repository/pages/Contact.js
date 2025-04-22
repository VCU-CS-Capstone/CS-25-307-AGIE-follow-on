import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaResearchgate,
  FaBook,
  FaFileAlt,
  FaUsers,
  FaHandshake,
} from "react-icons/fa";
import { CardContainer } from "../components/Card";

// Research Collaboration opportunities
const collaborationOpportunities = [
  {
    id: 1,
    title: "Data Contribution",
    description:
      "Share your research findings or datasets related to gender equity in medical sciences to help build a more comprehensive evidence base.",
  },
  {
    id: 2,
    title: "Research Partnerships",
    description:
      "Partner with our network of researchers to design and implement studies addressing critical gaps in gender equity research.",
  },
  {
    id: 3,
    title: "Implementation Studies",
    description:
      "Collaborate on research examining the effectiveness of gender equity initiatives at your institution.",
  },
];

// Research briefs available for download
const researchBriefs = [
  {
    id: 1,
    title: "Mentorship Impact on Women Faculty Retention",
    type: "Research Brief",
    pages: 4,
  },
  {
    id: 2,
    title: "Evidence-Based Policies for Gender Equity",
    type: "Best Practices Guide",
    pages: 6,
  },
  {
    id: 3,
    title: "Institutional Assessment Toolkit",
    type: "Implementation Guide",
    pages: 8,
  },
];

// Research-based FAQs
const researchFaqs = [
  {
    id: 1,
    question: "What interventions show the strongest evidence base?",
    answer:
      "According to systematic reviews, interventions addressing systemic and structural barriers consistently show stronger outcomes than those targeting individual behaviors. Specifically, transparent promotion criteria, formal mentorship programs, and family-friendly policies have the strongest evidence base.",
  },
  {
    id: 2,
    question: "How long does institutional change typically take?",
    answer:
      "Research across multiple institutions indicates that meaningful change in gender representation metrics typically requires 3-5 years of sustained implementation, with leadership advancement metrics taking 5-7 years to show significant change.",
  },
  {
    id: 3,
    question: "What metrics should we track to measure progress?",
    answer:
      "Evidence suggests tracking both quantitative metrics (representation percentages, promotion rates, salary equity) and qualitative measures (climate surveys, experience sampling) provides the most comprehensive view of progress.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedFaq, setSelectedFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000080] via-[#000080] to-white flex flex-col">
      <Navbar />

      {/* Main Content */}
      <CardContainer className="mt-40 py-12 mb-20 flex-grow">
        {/* Responsive grid for cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Contact Form Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 transition-all hover:shadow-xl border border-gray-200">
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "#00054B" }}
              >
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-medium text-gray-800"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ focusRing: "#FFFFFF" }}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-gray-800"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ focusRing: "#FFFFFF" }}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 font-medium text-gray-800"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none"
                    style={{ focusRing: "#FFFFFF" }}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white font-medium transition-colors duration-300 hover:bg-opacity-90"
                  style={{ backgroundColor: "#00054B" }}
                >
                  Submit Message
                </button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Information Card */}
            <div className="bg-black rounded-lg shadow-lg p-8 transition-all hover:shadow-xl">
              <h2
                className="text-2xl font-semibold mb-8"
                style={{ color: "#FFFFFF" }}
              >
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 mt-1"
                    style={{ color: "#FFFFFF" }}
                  >
                    <FaEnvelope className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p
                      className="text-lg font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      Email
                    </p>
                    <a
                      href="mailto:agie@vcu.edu"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      agie@vcu.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 mt-1"
                    style={{ color: "#FFFFFF" }}
                  >
                    <FaPhone className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p
                      className="text-lg font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      Phone
                    </p>
                    <a
                      href="tel:(000)0000000"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      (000) 000-0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 mt-1"
                    style={{ color: "#FFFFFF" }}
                  >
                    <FaMapMarkerAlt className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p
                      className="text-lg font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      Address
                    </p>
                    <p className="text-gray-300">
                      907 Floyd Ave
                      <br />
                      Richmond, VA 23284
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-900 rounded-lg">
                <p className="text-white text-center">
                  We're here to help and answer any questions you might have.
                  Whether you're looking for more information, need assistance
                  navigating the repository, or simply want to connect, our team
                  is ready to support you. Don't hesitate to reach out — we look
                  forward to hearing from you and working together to advance
                  gender inclusivity and excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContainer>

      <Footer />
    </div>
  );
}
