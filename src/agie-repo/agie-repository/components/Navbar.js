import React from 'react';
import Link from "next/link";
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import { BiSearch } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const[menuOpen, setMenuOpen] = useState(false);
  const[searchOpen, setSearchOpen] = useState(false);
  const[searchQuery, setSearchQuery] = useState('');
  const[menuAnimState, setMenuAnimState] = useState('visible'); // 'visible', 'hiding', 'hidden'
  const[searchAnimState, setSearchAnimState] = useState('hidden'); // 'hidden', 'showing', 'visible'
  const[isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
  // Set initial mobile state and update on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchToggle = () => {
    if (searchOpen) {
      // Closing search
      setSearchAnimState('hiding');
      setTimeout(() => {
        setSearchAnimState('hidden');
        setSearchOpen(false);
        
        // Only show menu on desktop - skip this step on mobile
        if (!isMobile) {
          setTimeout(() => {
            setMenuAnimState('showing');
            setTimeout(() => {
              setMenuAnimState('visible');
            }, 266);
          }, 33);
        }
      }, 200);
    } else {
      // Opening search
      if (isMobile) {
        // Skip menu hiding on mobile
        setSearchOpen(true);
        setSearchAnimState('showing');
        setTimeout(() => {
          setSearchAnimState('visible');
        }, 266);
      } else {
        // Desktop flow - hide menu first
        setMenuAnimState('hiding');
        setTimeout(() => {
          setMenuAnimState('hidden');
          
          // Small delay for visual effect
          setTimeout(() => {
            setSearchOpen(true);
            setSearchAnimState('showing');
            setTimeout(() => {
              setSearchAnimState('visible');
            }, 266);
          }, 33);
        }, 200);
      }
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/Results',
        query: {query: searchQuery}
      });
      setSearchOpen(false);
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Custom navigation handler to ensure proper routing
  const handleNavigation = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Use shallow routing to prevent unnecessary data fetching during navigation
    router.push(href, undefined, { shallow: true });
    
    // Close menus if open
    if (menuOpen) {
      setMenuOpen(false);
    }
    if (searchOpen) {
      setSearchOpen(false);
    }
    
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50"> 
      {/* Main navigation bar */}
      <div className="bg-gradient-to-r from-black to-gray-900 shadow-lg relative z-20"> 
        <div className="flex justify-between items-center h-20 w-full px-6 md:px-10 2xl:px-16"> 
        
          {/* Agie Project link with hover effect */}
          <div className="flex items-center"> 
            <Link 
              href="/" 
              className="uppercase text-2xl md:text-3xl font-bold transition-colors duration-300 hover:opacity-90" 
              style={{ color: '#CDAE5E' }}
              onClick={(e) => handleNavigation(e, '/')}
            >
              Agie Repository
            </Link>
          </div>

          {/* This flex-grow div helps with spacing */}
          <div className="flex-grow"></div>

          {/* Combined icons container with even spacing */}
          <div className="flex items-center space-x-6">
            {/* Search icon */}
            <div onClick={handleSearchToggle} className="cursor-pointer">
              <BiSearch size={24} style={{ color: '#CDAE5E' }}/>
            </div>

            {/* Admin Login icon with hover effect */}
            <div className="flex items-center">
              <Link 
                href="/Login" 
                className="transition-colors duration-300 hover:opacity-90 flex items-center" 
                style={{ color: '#CDAE5E' }}
                title="Admin Login"
                onClick={(e) => handleNavigation(e, '/Login')}
              >
                <BiLogIn size={24} />
              </Link>
            </div>

            {/* Mobile menu button - stays at the rightmost position */}
            <div onClick={handleNav} className="lg:hidden cursor-pointer">
              <AiOutlineMenu size={24} style={{ color: '#CDAE5E' }}/>
            </div>
          </div>
        </div>
      </div>

      {/* Search Dropdown - Completely transparent with improved sliding animations */}
      <div className={`absolute w-full top-20 left-0 z-10 overflow-hidden origin-top
        ${searchAnimState === 'hidden' ? 'search-hidden opacity-0 h-0 pointer-events-none' : 'opacity-100'}
        ${searchAnimState === 'showing' ? 'search-showing' : ''}
        ${searchAnimState === 'hiding' ? 'search-hiding' : ''}
        ${searchAnimState === 'visible' ? 'search-visible' : ''}
      `}>
        <div className="py-3 px-6 md:px-10 2xl:px-16">
          <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto">
            <input
              type="text"
              placeholder="Search our database for papers to advance gender equity in STEMM..."
              value={searchQuery}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="w-full md:flex-1 px-6 py-3 rounded-lg md:rounded-r-none border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black/20 bg-white"
            />
            <button
              onClick={handleSearch}
              className="w-full md:w-auto mt-3 md:mt-0 px-8 py-3 bg-black text-white rounded-lg md:rounded-l-none md:rounded-r-lg hover:bg-black/80 transition-all duration-300 flex items-center justify-center"
            >
              <BiSearch size={30} className="mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>
      
      {/* Secondary nav with styled links */}
      <div className={
        searchAnimState !== 'hidden'
        ? "hidden" // Hide completely when search is open
        : `secondNav hidden lg:flex shadow-xl bg-white rounded-br-3xl overflow-hidden z-10 relative
          ${menuAnimState === 'hidden' ? 'menu-hidden' : ''}
          ${menuAnimState === 'hiding' ? 'menu-hiding' : ''}
          ${menuAnimState === 'showing' ? 'menu-showing' : ''}
          ${menuAnimState === 'visible' ? 'menu-visible' : ''}`
      }>
        <div className="hidden lg:flex items-center justify-start">
          <ul className="hidden lg:flex">
            <li className="ml-9 my-3">
              <Link 
                href="/About" 
                className="uppercase text-xl transition-all duration-300 hover:opacity-80 font-medium" 
                style={{ color: '#CDAE5E' }}
                onClick={(e) => handleNavigation(e, '/About')}
              >
                About
              </Link>
            </li>
            <li className="ml-9 my-3">
              <Link 
                href="/Contact" 
                className="uppercase text-xl transition-all duration-300 hover:opacity-80 font-medium" 
                style={{ color: '#CDAE5E' }}
                onClick={(e) => handleNavigation(e, '/Contact')}
              >
                Contact Us
              </Link>
            </li>
            <li className="ml-9 my-3">
              <Link 
                href="/Results" 
                className="uppercase text-xl transition-all duration-300 hover:opacity-80 font-medium" 
                style={{ color: '#CDAE5E' }}
                onClick={(e) => handleNavigation(e, '/Results')}
              >
                Search Database
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Mobile Menu with minimal width and balanced text spacing */}
      <div className={`
        fixed top-0 h-screen w-auto lg:hidden bg-white rounded-r-lg shadow-2xl z-50
        transition-transform duration-300 ease-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex w-full items-center justify-end pt-5 pr-4">
          <div onClick={handleNav} className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all">
            <AiOutlineClose size={24} />
          </div>
        </div>  
        <div className="flex-col py-4">
          <ul className="space-y-4 px-5" style={{ width: '135px' }}>
            <li className="border-b border-gray-200 pb-4">
              <Link 
                href="/" 
                className="block py-2 text-lg font-medium transition-colors hover:text-opacity-80" 
                style={{ color: '#CDAE5E' }}
                onClick={(e) => {
                  setMenuOpen(false);
                  return handleNavigation(e, '/');
                }}
              >
                Home
              </Link>
            </li>
            <li className="border-b border-gray-200 pb-4">
              <Link 
                href="/About" 
                className="block py-2 text-lg font-medium transition-colors hover:text-opacity-80" 
                style={{ color: '#CDAE5E' }}
                onClick={(e) => {
                  setMenuOpen(false);
                  return handleNavigation(e, '/About');
                }}
              >
                About
              </Link>
            </li>
            <li className="pb-4">
              <Link 
                href="/Contact" 
                className="block py-2 text-lg font-medium transition-colors hover:text-opacity-80" 
                style={{ color: '#CDAE5E' }}
                onClick={(e) => {
                  setMenuOpen(false);
                  return handleNavigation(e, '/Contact');
                }}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Custom CSS for animations and proper mobile display */}
      <style jsx>{`
        @media (max-width: 1023px) {
          .secondNav {
            display: none !important;
          }
        }
        
        /* Menu animations - slowed to 75% */
        .menu-hidden {
          transform: translateY(-30px);
          opacity: 0;
        }
        
        .menu-hiding {
          transform: translateY(-100%);
          opacity: 0;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: top center;
          will-change: transform, opacity;
        }
        
        .menu-showing {
          transform: translateY(0);
          opacity: 1;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: top center;
          will-change: transform, opacity;
        }
        
        .menu-visible {
          transform: translateY(0);
          opacity: 1;
        }
        
        /* Search animations - slowed to 75% */
        .search-hidden {
          transform: translateY(-30px);
          opacity: 0;
        }
        
        .search-showing {
          transform: translateY(0);
          opacity: 1;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: top center;
          will-change: transform, opacity;
        }
        
        .search-hiding {
          transform: translateY(-100%);
          opacity: 0;
          transition: transform 0.33s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.33s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: top center;
          will-change: transform, opacity;
        }
        
        .search-visible {
          transform: translateY(0);
          opacity: 1;
        }
        
      `}</style>
    </nav>
  );
};

export default Navbar;
