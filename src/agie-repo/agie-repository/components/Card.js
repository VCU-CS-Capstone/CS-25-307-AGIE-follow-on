import React from 'react';

// Card variants
export const StandardCard = ({ children, className = "", ...props }) => (
  <div 
    className={`bg-white rounded-lg shadow-lg p-8 border border-gray-200 transition-all hover:shadow-xl ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const DarkCard = ({ children, className = "", ...props }) => (
  <div 
    className={`bg-black rounded-lg shadow-lg p-8 transition-all hover:shadow-xl ${className}`} 
    {...props}
  >
    {children}
  </div>
);

// Card Container
export const CardContainer = ({ children, className = "", ...props }) => (
  <div 
    className={`max-w-6xl mx-auto px-4 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

// Grid layouts
export const CardGrid2 = ({ children, className = "", ...props }) => (
  <div 
    className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardGrid3 = ({ children, className = "", ...props }) => (
  <div 
    className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardGrid4 = ({ children, className = "", ...props }) => (
  <div 
    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

// Card Header with Icon
export const CardHeader = ({ icon, title, isDark = false, children }) => (
  <div className="flex items-start mb-6">
    <div 
      className={`flex-shrink-0 p-3 rounded-full mr-4 ${isDark ? 'bg-opacity-20' : ''}`}
      style={{ backgroundColor: isDark ? 'rgba(205, 174, 94, 0.3)' : 'rgba(205, 174, 94, 0.2)' }}
    >
      {icon}
    </div>
    <div>
      <h2 className="text-3xl font-semibold mb-4" style={{ color: '#CDAE5E' }}>
        {title}
      </h2>
      <div className={`w-16 h-1 ${isDark ? 'bg-white/20' : 'bg-black/10'} mb-6`}></div>
      {children}
    </div>
  </div>
);

// Statistic Card
export const StatCard = ({ value, label, description, className = "" }) => (
  <div className={`bg-gray-50 rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all ${className}`}>
    <h3 className="text-xl font-bold mb-2" style={{ color: '#CDAE5E' }}>{value}</h3>
    <h4 className="text-gray-800 font-medium mb-2">{label}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// Featured Research Card with fixed height
export const FeaturedCard = ({ title, meta, children, className = "" }) => (
  <div className={`border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-md transition-all ${className}`}
       style={{ height: '280px' }}>
    <h3 
      className="text-xl font-semibold mb-2 truncate" 
      style={{ color: '#CDAE5E' }}
      title={title} /* Shows full title on hover */
    >
      {title}
    </h3>
    <p className="text-gray-600 mb-2">{meta}</p>
    <div 
      className="text-gray-800 overflow-y-auto pr-1 custom-scrollbar"
      style={{ 
        height: '160px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#CDAE5E transparent'
      }}
    >
      {children}
    </div>
  </div>
);

// Resource Card
export const ResourceCard = ({ icon, title, meta, buttonText = "Download", onButtonClick, className = "" }) => (
  <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all ${className}`}>
    <div className="flex items-center">
      <div className="h-5 w-5 mr-3" style={{ color: '#CDAE5E' }}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{meta}</p>
      </div>
    </div>
    <button
      onClick={onButtonClick}
      className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
    >
      {buttonText}
    </button>
  </div>
);

// Research Banner
export const ResearchBanner = ({ title, children, className = "" }) => (
  <div className={`bg-black rounded-lg shadow-lg p-6 mb-8 transition-all ${className}`}>
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-3" style={{ color: '#CDAE5E' }}>
        {title}
      </h2>
      <p className="text-gray-300 max-w-3xl mx-auto">
        {children}
      </p>
    </div>
  </div>
);

const CardComponents = {
  StandardCard,
  DarkCard,
  CardContainer,
  CardGrid2,
  CardGrid3,
  CardGrid4,
  CardHeader,
  StatCard,
  FeaturedCard,
  ResourceCard,
  ResearchBanner
};

export default CardComponents;
