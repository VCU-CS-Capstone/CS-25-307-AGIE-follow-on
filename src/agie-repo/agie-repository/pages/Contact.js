import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaResearchgate, FaBook, FaFileAlt, FaUsers, FaHandshake } from 'react-icons/fa';
import { CardContainer } from '../components/Card';

// Research Collaboration opportunities
const collaborationOpportunities = [
    {
        id: 1,
        title: "Data Contribution",
        description: "Share your research findings or datasets related to gender equity in medical sciences to help build a more comprehensive evidence base."
    },
    {
        id: 2,
        title: "Research Partnerships",
        description: "Partner with our network of researchers to design and implement studies addressing critical gaps in gender equity research."
    },
    {
        id: 3,
        title: "Implementation Studies",
        description: "Collaborate on research examining the effectiveness of gender equity initiatives at your institution."
    }
];

// Research briefs available for download
const researchBriefs = [
    {
        id: 1,
        title: "Mentorship Impact on Women Faculty Retention",
        type: "Research Brief",
        pages: 4
    },
    {
        id: 2,
        title: "Evidence-Based Policies for Gender Equity",
        type: "Best Practices Guide",
        pages: 6
    },
    {
        id: 3,
        title: "Institutional Assessment Toolkit",
        type: "Implementation Guide",
        pages: 8
    }
];

// Research-based FAQs
const researchFaqs = [
    {
        id: 1,
        question: "What interventions show the strongest evidence base?",
        answer: "According to systematic reviews, interventions addressing systemic and structural barriers consistently show stronger outcomes than those targeting individual behaviors. Specifically, transparent promotion criteria, formal mentorship programs, and family-friendly policies have the strongest evidence base."
    },
    {
        id: 2,
        question: "How long does institutional change typically take?",
        answer: "Research across multiple institutions indicates that meaningful change in gender representation metrics typically requires 3-5 years of sustained implementation, with leadership advancement metrics taking 5-7 years to show significant change."
    },
    {
        id: 3,
        question: "What metrics should we track to measure progress?",
        answer: "Evidence suggests tracking both quantitative metrics (representation percentages, promotion rates, salary equity) and qualitative measures (climate surveys, experience sampling) provides the most comprehensive view of progress."
    }
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [selectedFaq, setSelectedFaq] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-r from-yellow-500/90 to-yellow-400/90 py-16 pt-24 md:pt-32 mt-16 md:mt-20">
                <div className="container mx-auto px-4">
                    <div className="items-center justify-center text-center">
                        <h1 className="text-5xl md:text-7xl uppercase font-bold text-black mb-4">
                            Contact Us
                        </h1>
                        <div className="w-24 h-1 bg-black mx-auto mt-2 mb-6"></div>
                        <p className="text-xl text-black/80 max-w-2xl mx-auto mb-8">
                            Connecting with the AGIE Community
                        </p>
                    </div>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-black/10 rounded-tl-full"></div>
            </div>
            
            {/* Main Content */}
            <CardContainer className="py-12 mb-20 flex-grow">
                {/* Research Collaboration Banner */}
                <div className="bg-black rounded-lg shadow-lg p-6 mb-8 transition-all hover:shadow-xl">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-3" style={{ color: '#CDAE5E' }}>
                            Research to Practice Network
                        </h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Join our community of researchers, practitioners, and advocates working to apply evidence-based approaches to advance women in medical sciences.
                        </p>
                    </div>
                </div>
                
                {/* Responsive grid for cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
                    
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Contact Form Card */}
                        <div className="bg-white rounded-lg shadow-lg p-8 transition-all hover:shadow-xl border border-gray-200">
                            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#CDAE5E' }}>
                                Send Us a Message
                            </h2>
                        
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="name" className="block mb-2 font-medium text-gray-800">
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
                                        style={{ focusRing: '#CDAE5E' }}
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 font-medium text-gray-800">
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
                                        style={{ focusRing: '#CDAE5E' }}
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block mb-2 font-medium text-gray-800">
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
                                        style={{ focusRing: '#CDAE5E' }}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-lg text-white font-medium transition-colors duration-300 hover:bg-opacity-90"
                                    style={{ backgroundColor: '#CDAE5E' }}
                                >
                                    Submit Message
                                </button>
                            </form>
                        </div>
                        
                        {/* Research Collaboration Opportunities */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all border border-gray-200">
                            <div className="flex items-start mb-6">
                                <div className="flex-shrink-0 p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(205, 174, 94, 0.2)' }}>
                                    <FaResearchgate className="h-6 w-6" style={{ color: '#CDAE5E' }} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                                        Research Collaboration
                                    </h2>
                                    <div className="w-16 h-1 bg-black/10 mb-6"></div>
                                    
                                    <p className="text-gray-800 mb-6">
                                        Our evidence-based approach relies on ongoing research collaborations. Join our network of researchers and practitioners working to advance gender equity through rigorous research.
                                    </p>
                                    
                                    <div className="space-y-4">
                                        {collaborationOpportunities.map(opportunity => (
                                            <div key={opportunity.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                <h3 className="font-medium mb-2" style={{ color: '#CDAE5E' }}>{opportunity.title}</h3>
                                                <p className="text-gray-700 text-sm">{opportunity.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Contact Information Card */}
                        <div className="bg-black rounded-lg shadow-lg p-8 transition-all hover:shadow-xl">
                            <h2 className="text-2xl font-semibold mb-8" style={{ color: '#CDAE5E' }}>
                                Contact Information
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1" style={{ color: '#CDAE5E' }}>
                                        <FaEnvelope className="h-6 w-6" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-lg font-medium" style={{ color: '#CDAE5E' }}>Email</p>
                                        <a href="mailto:agie@vcu.edu" className="text-gray-300 hover:text-white transition-colors">
                                            agie@vcu.edu
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1" style={{ color: '#CDAE5E' }}>
                                        <FaPhone className="h-6 w-6" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-lg font-medium" style={{ color: '#CDAE5E' }}>Phone</p>
                                        <a href="tel:(000)0000000" className="text-gray-300 hover:text-white transition-colors">
                                            (000) 000-0000
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1" style={{ color: '#CDAE5E' }}>
                                        <FaMapMarkerAlt className="h-6 w-6" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-lg font-medium" style={{ color: '#CDAE5E' }}>Address</p>
                                        <p className="text-gray-300">
                                            907 Floyd Ave<br />
                                            Richmond, VA 23284
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 p-6 bg-gray-900 rounded-lg">
                                    <p className="text-white text-center">
                                        We&apos;re here to help and answer any questions you might have. 
                                        We look forward to hearing from you!
                                    </p>
                            </div>
                        </div>
                        
                        {/* Knowledge Translation Resources */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all border border-gray-200">
                            <div className="flex items-start mb-6">
                                <div className="flex-shrink-0 p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(205, 174, 94, 0.2)' }}>
                                    <FaBook className="h-6 w-6" style={{ color: '#CDAE5E' }} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                                        Research Resources
                                    </h2>
                                    <div className="w-16 h-1 bg-black/10 mb-6"></div>
                                    
                                    <p className="text-gray-800 mb-6">
                                        Access our collection of research-based resources to help implement evidence-based practices at your institution:
                                    </p>
                                    
                                    <div className="space-y-4">
                                        {researchBriefs.map(brief => (
                                            <div key={brief.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                                                <div className="flex items-center">
                                                    <FaFileAlt className="h-5 w-5 mr-3" style={{ color: '#CDAE5E' }} />
                                                    <div>
                                                        <h3 className="font-medium">{brief.title}</h3>
                                                        <p className="text-sm text-gray-600">{brief.type} • {brief.pages} pages</p>
                                                    </div>
                                                </div>
                                                <button
                                                    className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
                                                >
                                                    Download
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Research-Based FAQ Section */}
                <div className="mt-12 bg-white rounded-lg shadow-lg p-8 transition-all hover:shadow-xl border border-gray-200">
                    <div className="flex items-start mb-6">
                        <div className="flex-shrink-0 p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(205, 174, 94, 0.2)' }}>
                            <FaUsers className="h-6 w-6" style={{ color: '#CDAE5E' }} />
                        </div>
                        <div className="w-full">
                            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                                Research-Based FAQs
                            </h2>
                            <div className="w-16 h-1 bg-black/10 mb-6"></div>
                            
                            <p className="text-gray-800 mb-6">
                                Common questions about implementing evidence-based approaches to advance women in medical sciences:
                            </p>
                            
                            <div className="space-y-4 mb-6">
                                {researchFaqs.map(faq => (
                                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <button 
                                            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                                            onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
                                        >
                                            <span className="font-medium text-gray-800">{faq.question}</span>
                                            <span className="text-gray-500 text-lg">
                                                {selectedFaq === faq.id ? '−' : '+'}
                                            </span>
                                        </button>
                                        
                                        {selectedFaq === faq.id && (
                                            <div className="px-6 py-4 bg-white">
                                                <p className="text-gray-700">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Community of Practice Banner */}
                <div className="mt-8 bg-gradient-to-r from-black to-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center justify-center mb-4">
                        <FaHandshake className="h-8 w-8 mr-3" style={{ color: '#CDAE5E' }} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2" style={{ color: '#CDAE5E' }}>Join Our Community of Practice</h3>
                        <p className="text-white max-w-3xl mx-auto">
                            Connect with researchers and practitioners implementing evidence-based approaches to advance women in medical sciences.
                        </p>
                        <button 
                            className="mt-4 px-6 py-2 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition-colors font-medium"
                        >
                            Sign Up for Updates
                        </button>
                    </div>
                </div>
            </CardContainer>
            
            <Footer />
        </div>
    );
}
