import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBookOpen, FaLightbulb, FaUsers, FaChartLine, FaGraduationCap, FaClipboardCheck } from 'react-icons/fa';
import { useState } from 'react';
import { CardContainer } from '../components/Card';

// Research statistics for visualization
const researchStats = [
  { year: 2018, womenPercent: 41.5, menPercent: 58.5 },
  { year: 2019, womenPercent: 42.3, menPercent: 57.7 },
  { year: 2020, womenPercent: 43.6, menPercent: 56.4 },
  { year: 2021, womenPercent: 45.2, menPercent: 54.8 },
  { year: 2022, womenPercent: 46.7, menPercent: 53.3 }
];

// Key research findings
const keyFindings = [
  {
    id: 1,
    title: "Mentorship Impact",
    stat: "2.3x",
    description: "Women with dedicated mentors are 2.3 times more likely to remain in medical sciences compared to those without mentorship support."
  },
  {
    id: 2,
    title: "Leadership Gap",
    stat: "24%",
    description: "Despite making up nearly half of early-career positions, women represent only 24% of leadership roles in academic medical institutions."
  },
  {
    id: 3,
    title: "Publication Disparity",
    stat: "38%",
    description: "Female researchers in medical sciences author only 38% of published papers, despite comprising 45% of researchers in the field."
  }
];

// Implementation frameworks
const frameworks = [
  {
    id: 1,
    title: "Institutional Assessment",
    description: "Research-validated metrics for evaluating institutional climate and identifying specific barriers to women's advancement."
  },
  {
    id: 2,
    title: "Targeted Intervention",
    description: "Evidence-based approaches for addressing identified barriers through policy changes and programmatic initiatives."
  },
  {
    id: 3,
    title: "Outcome Evaluation",
    description: "Standardized metrics derived from literature for measuring the effectiveness of gender equity interventions."
  }
];

export default function About() {
  const [activeTab, setActiveTab] = useState('findings');
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-yellow-500/90 to-yellow-400/90 py-16 pt-24 md:pt-32 mt-16 md:mt-20">
        <div className="container mx-auto px-4">
          <div className="items-center justify-center text-center">
            <h1 className="text-5xl md:text-7xl uppercase font-bold text-black mb-4">
              About AGIE
            </h1>
            <div className="w-24 h-1 bg-black mx-auto mt-2 mb-6"></div>
            <p className="text-xl text-black/80 max-w-2xl mx-auto mb-8">
              Advancing Gender Inclusivity Excellence
            </p>
          </div>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-black/10 rounded-tl-full"></div>
      </div>
      
      {/* Main Content */}
      <CardContainer className="py-12 mb-20 flex-grow">
        {/* Research Impact Banner */}
        <div className="bg-black rounded-lg shadow-lg p-6 mb-8 transition-all hover:shadow-xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-3" style={{ color: '#CDAE5E' }}>
              Research-Driven Advancement
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Our approach is grounded in evidence-based strategies derived from the latest research on gender equity in medical sciences.
            </p>
          </div>
        </div>

        {/* Our Story Section - Enhanced with Research Focus */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 transition-all hover:shadow-xl border border-gray-200">
          <div className="flex items-start mb-6">
            <div className="flex-shrink-0 p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(205, 174, 94, 0.2)' }}>
              <FaBookOpen className="h-8 w-8" style={{ color: '#CDAE5E' }} />
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                Our Story
              </h2>
              <div className="w-16 h-1 bg-black/10 mb-6"></div>
              <p className="text-lg text-gray-800 leading-relaxed mb-6"> 
                We aim to create a vibrant community committed to fostering the success and advancement of women in the ever-evolving world of technology. Our mission is to bridge the gender gap in STEMM fields, empower women to thrive in tech careers, and create a supportive network that encourages collaboration and innovation.
              </p>
              
              {/* Research Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {keyFindings.map(finding => (
                  <div key={finding.id} className="bg-gray-50 rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all">
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#CDAE5E' }}>{finding.stat}</h3>
                    <h4 className="text-gray-800 font-medium mb-2">{finding.title}</h4>
                    <p className="text-gray-600 text-sm">{finding.description}</p>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                Why Research Matters
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                Literature shows that data-driven, evidence-based approaches are most effective in creating lasting institutional change. By grounding our work in research, we ensure that our strategies address the root causes of inequity in medical sciences.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Vision Section - Enhanced with Research Insights */}
        <div className="bg-black rounded-lg shadow-lg p-8 mb-8 transition-all hover:shadow-xl">
          <div className="flex items-start mb-6">
            <div className="flex-shrink-0 p-3 rounded-full mr-4 bg-opacity-20" style={{ backgroundColor: 'rgba(205, 174, 94, 0.3)' }}>
              <FaLightbulb className="h-8 w-8" style={{ color: '#CDAE5E' }} />
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                Our Vision
              </h2>
              <div className="w-16 h-1 bg-white/20 mb-6"></div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6"> 
                We envision a future where women are not only well-represented in technology but are also leaders, influencers, and pioneers in shaping the industry&apos;s landscape. We believe in a world where every woman has equal opportunities to succeed and make impactful contributions to the field.
              </p>
              
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                Research-Driven Objectives
              </h3>
              
              {/* Trend Visualization Card */}
              <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#CDAE5E' }}>
                  Women in Medical Sciences Faculty Positions (%)
                </h4>
                <div className="h-64 w-full flex items-end justify-around p-4 bg-gray-800 rounded">
                  {researchStats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-12 mb-2">
                        <div 
                          className="absolute bottom-0 w-full rounded-t"
                          style={{ 
                            backgroundColor: '#CDAE5E', 
                            height: `${stat.womenPercent * 2}px`
                          }}
                        ></div>
                      </div>
                      <span className="text-white text-xs">{stat.year}</span>
                      <span className="text-yellow-400 text-xs font-bold mt-1">{stat.womenPercent}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-lg text-gray-300 mb-6">
                Despite steady progress, research indicates that at the current rate, gender parity in medical sciences leadership positions won&apos;t be achieved until 2050. Our vision is to accelerate this timeline through targeted, evidence-based interventions.
              </p>
              
              {/* Implementation Framework Tabs */}
              <div className="mt-6">
                <div className="flex border-b border-gray-700 mb-4">
                  <button 
                    className={`py-2 px-4 mr-2 ${activeTab === 'findings' ? 'border-b-2 font-medium text-white' : 'text-gray-400'}`}
                    style={{ borderColor: activeTab === 'findings' ? '#CDAE5E' : 'transparent' }}
                    onClick={() => setActiveTab('findings')}
                  >
                    Research Findings
                  </button>
                  <button 
                    className={`py-2 px-4 mr-2 ${activeTab === 'implementation' ? 'border-b-2 font-medium text-white' : 'text-gray-400'}`}
                    style={{ borderColor: activeTab === 'implementation' ? '#CDAE5E' : 'transparent' }}
                    onClick={() => setActiveTab('implementation')}
                  >
                    Implementation
                  </button>
                  <button 
                    className={`py-2 px-4 ${activeTab === 'outcomes' ? 'border-b-2 font-medium text-white' : 'text-gray-400'}`}
                    style={{ borderColor: activeTab === 'outcomes' ? '#CDAE5E' : 'transparent' }}
                    onClick={() => setActiveTab('outcomes')}
                  >
                    Outcomes
                  </button>
                </div>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  {activeTab === 'findings' && (
                    <div>
                      <h4 className="text-lg font-medium mb-3" style={{ color: '#CDAE5E' }}>
                        Key Research Insights
                      </h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                          <span className="inline-block w-4 h-4 mr-2 mt-1 rounded-full" style={{ backgroundColor: '#CDAE5E' }}></span>
                          <span>Studies show that gender-diverse research teams produce higher impact research and more innovative solutions.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-4 h-4 mr-2 mt-1 rounded-full" style={{ backgroundColor: '#CDAE5E' }}></span>
                          <span>Interventions focused on systemic changes show more sustainable results than those targeting individual behaviors.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-4 h-4 mr-2 mt-1 rounded-full" style={{ backgroundColor: '#CDAE5E' }}></span>
                          <span>Research indicates that addressing implicit bias at institutional levels has the greatest impact on advancement metrics.</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'implementation' && (
                    <div>
                      <h4 className="text-lg font-medium mb-3" style={{ color: '#CDAE5E' }}>
                        Research-Based Implementation Frameworks
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {frameworks.map(framework => (
                          <div key={framework.id} className="bg-gray-700 p-3 rounded">
                            <h5 className="font-medium mb-1" style={{ color: '#CDAE5E' }}>{framework.title}</h5>
                            <p className="text-gray-300 text-sm">{framework.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'outcomes' && (
                    <div>
                      <h4 className="text-lg font-medium mb-3" style={{ color: '#CDAE5E' }}>
                        Measuring Success
                      </h4>
                      <div className="space-y-3 text-gray-300">
                        <p>Research-backed metrics for evaluating the success of gender equity initiatives include:</p>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="bg-gray-700 p-3 rounded text-center">
                            <div className="font-medium mb-1" style={{ color: '#CDAE5E' }}>Representation</div>
                            <div className="text-2xl font-bold">50%</div>
                            <div className="text-xs text-gray-400">Target at all levels</div>
                          </div>
                          <div className="bg-gray-700 p-3 rounded text-center">
                            <div className="font-medium mb-1" style={{ color: '#CDAE5E' }}>Publication Equity</div>
                            <div className="text-2xl font-bold">1:1</div>
                            <div className="text-xs text-gray-400">Gender ratio</div>
                          </div>
                          <div className="bg-gray-700 p-3 rounded text-center">
                            <div className="font-medium mb-1" style={{ color: '#CDAE5E' }}>Grant Success</div>
                            <div className="text-2xl font-bold">Equal</div>
                            <div className="text-xs text-gray-400">Award rates</div>
                          </div>
                          <div className="bg-gray-700 p-3 rounded text-center">
                            <div className="font-medium mb-1" style={{ color: '#CDAE5E' }}>Retention</div>
                            <div className="text-2xl font-bold">90%+</div>
                            <div className="text-xs text-gray-400">5-year rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Research Highlights Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 transition-all hover:shadow-xl border border-gray-200">
          <div className="flex items-start mb-6">
            <div className="flex-shrink-0 p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(205, 174, 94, 0.2)' }}>
              <FaChartLine className="h-8 w-8" style={{ color: '#CDAE5E' }} />
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                Research Highlights
              </h2>
              <div className="w-16 h-1 bg-black/10 mb-6"></div>
              <p className="text-lg text-gray-800 mb-6">
                Our repository includes key research papers addressing barriers and solutions for women in medical sciences:
              </p>
              
              {/* Research Paper Cards */}
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-md transition-all">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#CDAE5E' }}>
                    Gender Disparities in Academic Medicine
                  </h3>
                  <p className="text-gray-600 mb-2">Journal of Medical Education (2023)</p>
                  <p className="text-gray-800">
                    This systematic review identified key intervention points for addressing the gender gap in medical faculty advancement through analysis of 150+ studies spanning two decades.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-md transition-all">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#CDAE5E' }}>
                    Mentorship Models That Advance Women in Academic Medicine
                  </h3>
                  <p className="text-gray-600 mb-2">Academic Medicine (2022)</p>
                  <p className="text-gray-800">
                    A comparative analysis of mentorship programs showing that structured, institutional programs with clear advancement metrics show the highest success rates for women in academic medicine.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-md transition-all">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#CDAE5E' }}>
                    Institutional Practices That Promote Gender Equity
                  </h3>
                  <p className="text-gray-600 mb-2">New England Journal of Medicine (2021)</p>
                  <p className="text-gray-800">
                    Analysis of policies and practices at 50 medical institutions reveals that transparent promotion criteria and family-friendly policies are most strongly correlated with women&apos;s advancement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acknowledgements Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 transition-all hover:shadow-xl border border-gray-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(205, 174, 94, 0.2)' }}>
              <FaUsers className="h-8 w-8" style={{ color: '#CDAE5E' }} />
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
                Acknowledgements
              </h2>
              <div className="w-16 h-1 bg-black/10 mb-6"></div>
              <p className="text-lg text-gray-800 mb-4"> 
                Prototype website and database developed by Team CS-24-333 including:
              </p>
              
              {/* Team members cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {[
                  "Matt Frayser", 
                  "Jennifer Bonda", 
                  "Dimayri Romero", 
                  "Valencia Carter"
                ].map((name, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md transition-all">
                    <p className="font-medium">{name}</p>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-4" style={{ color: '#CDAE5E' }}>
                Research Contributors
              </h3>
              <p className="text-lg text-gray-800 mb-4">
                We acknowledge the researchers whose work forms the foundation of our evidence-based approach to gender equity in medical sciences.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <div className="flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="text-3xl font-bold mb-1" style={{ color: '#CDAE5E' }}>150+</div>
                    <p className="text-sm text-gray-600">Institutions</p>
                  </div>
                  <div className="h-12 w-px bg-gray-300 mx-4"></div>
                  <div className="text-center px-4">
                    <div className="text-3xl font-bold mb-1" style={{ color: '#CDAE5E' }}>300+</div>
                    <p className="text-sm text-gray-600">Researchers</p>
                  </div>
                  <div className="h-12 w-px bg-gray-300 mx-4"></div>
                  <div className="text-center px-4">
                    <div className="text-3xl font-bold mb-1" style={{ color: '#CDAE5E' }}>6000+</div>
                    <p className="text-sm text-gray-600">Publications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Research-to-Action Card */}
        <div className="bg-gradient-to-r from-black to-gray-900 rounded-lg shadow-lg p-6 mb-8 hover:shadow-xl transition-all">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <FaGraduationCap className="h-6 w-6 mr-2" style={{ color: '#CDAE5E' }} />
              <FaClipboardCheck className="h-6 w-6" style={{ color: '#CDAE5E' }} />
            </div>
            <p className="text-xl font-light" style={{ color: '#CDAE5E' }}>
              Translating research into action for meaningful advancement of women in medical sciences
            </p>
          </div>
        </div>
      </CardContainer>
      
      <Footer />
    </div>
  );
}
