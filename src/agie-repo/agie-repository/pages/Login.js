import React, { useState, useEffect } from 'react';
import styles from '../styles/login.module.css';
import { useAuth } from '../Auth/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { FaGoogle, FaChartLine, FaBookReader, FaDatabase, FaLightbulb } from 'react-icons/fa';
import { CardContainer } from '../components/Card';

// Research platform statistics
const platformStats = [
  {
    id: 1,
    label: "Research Papers",
    value: "6,000+",
    description: "Curated publications on gender equity in medical sciences"
  },
  {
    id: 2,
    label: "Contributors",
    value: "300+",
    description: "Researchers and institutions sharing evidence-based approaches"
  },
  {
    id: 3,
    label: "Implementation Guides",
    value: "45+",
    description: "Practical frameworks derived from research findings"
  }
];

// Recent research highlights for ticker
const recentResearch = [
  "New mentorship model shows 42% increase in women faculty retention",
  "Study reveals institutional policy changes with highest impact on gender equity",
  "Research collaboration framework establishes best practices for inclusive teams",
  "Longitudinal study identifies key metrics for tracking gender equity progress",
  "Systematic review ranks top evidence-based interventions for advancing women in medical sciences"
];

/**
 * Enhanced LoginForm component with improved design and user experience
 */
function LoginForm() {
  const { loginWithGoogle, loading, user, authError } = useAuth();
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [currentResearchIndex, setCurrentResearchIndex] = useState(0);
  const router = useRouter();

  // Handle auth errors from context
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // Handle redirect after successful login
  useEffect(() => {
    if (user && loginSuccess) {
      const timer = setTimeout(() => {
        router.push('/Profile');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [user, loginSuccess, router]);

  /**
   * Enhanced login handler with proper error management
   */
  const handleLogin = async () => {
    setError(null); // Clear any previous errors
    
    try {
      const result = await loginWithGoogle();
      
      if (result && result.user) {
        console.log('Successfully logged in');
        setLoginSuccess(true);
      }
    } catch (err) {
      // This should not happen as errors are handled inside loginWithGoogle
      // But just in case something slips through
      setError('Login failed. Please try again later.');
      console.error('Unexpected login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-yellow-500/90 to-yellow-400/90 py-16 pt-24 md:pt-32 mt-16 md:mt-20">
        <div className="container mx-auto px-4">
          <div className="items-center justify-center text-center">
            <h1 className="text-5xl md:text-7xl uppercase font-bold text-black mb-4">
              Admin Login
            </h1>
            <div className="w-24 h-1 bg-black mx-auto mt-2 mb-6"></div>
            <p className="text-xl text-black/80 max-w-2xl mx-auto mb-8">
              Access the AGIE Repository administration panel
            </p>
          </div>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-black/10 rounded-tl-full"></div>
      </div>
      
      {/* Main Content with Login Card */}
      <CardContainer className="py-12 mb-20 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                  Research Database Access
                </h2>
                
                <div className="border-b border-gray-200 w-16 mb-6"></div>
                
                {/* Error message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    <p className="font-medium">Authentication Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                
                {/* Success message */}
                {user ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                    <p className="font-medium">Successfully Authenticated</p>
                    <p>You are logged in as {user.displayName || user.email}</p>
                    {loginSuccess && (
                      <p className="text-sm mt-2">Redirecting to your profile...</p>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Login with your Google account to access enhanced research features, save papers to your profile, and contribute to our growing repository of evidence-based approaches.
                    </p>
                    
                    {/* Research ticker */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 overflow-hidden relative border border-gray-200">
                      <div className="flex items-center mb-2">
                        <FaBookReader className="text-lg mr-2" style={{ color: '#CDAE5E' }} />
                        <h3 className="font-medium text-gray-700">Latest Research Updates</h3>
                      </div>
                      <p className="text-gray-600 italic">{recentResearch[currentResearchIndex]}</p>
                    </div>
                    
                    {/* Enhanced Google Button */}
                    <button 
                      onClick={handleLogin}
                      disabled={loading}
                      className="w-full py-3 px-4 bg-black hover:bg-black/80 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <FaGoogle className="text-lg" />
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Authenticating...
                        </span>
                      ) : (
                        'Continue with Google'
                      )}
                    </button>
                  </>
                )}
                
                {/* Information about access */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Research Access Benefits</h3>
                  <p className="text-sm text-gray-600">
                    Registered users gain access to advanced filtering tools, downloadable implementation guides, and the ability to save research collections for later reference.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right side statistics column */}
            <div className="md:col-span-1">
              <div className="bg-black rounded-lg shadow-lg p-6 h-full flex flex-col justify-between hover:shadow-xl transition-all">
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                    Research Impact
                  </h3>
                  
                  <div className="border-b border-gray-700 w-12 mb-6"></div>
                  
                  <div className="space-y-6">
                    {platformStats.map(stat => (
                      <div key={stat.id} className="text-center">
                        <p className="text-3xl font-bold" style={{ color: '#CDAE5E' }}>{stat.value}</p>
                        <p className="text-white font-medium mb-1">{stat.label}</p>
                        <p className="text-gray-400 text-sm">{stat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="flex justify-center space-x-4">
                    <FaDatabase className="text-gray-500" />
                    <FaChartLine className="text-gray-500" />
                    <FaLightbulb className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Research implementation cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-medium mb-2" style={{ color: '#CDAE5E' }}>Evidence Synthesis</h3>
              <p className="text-sm text-gray-600">
                Access systematic reviews and meta-analyses summarizing key findings across studies.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-medium mb-2" style={{ color: '#CDAE5E' }}>Implementation Tools</h3>
              <p className="text-sm text-gray-600">
                Download practical frameworks and assessment tools based on research findings.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-medium mb-2" style={{ color: '#CDAE5E' }}>Research Networks</h3>
              <p className="text-sm text-gray-600">
                Connect with researchers and practitioners implementing evidence-based approaches.
              </p>
            </div>
          </div>
        </div>
      </CardContainer>
      
      <Footer />
    </div>
  );
}

export default LoginForm;
