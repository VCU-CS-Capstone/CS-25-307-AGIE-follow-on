import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase-client';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  setPersistence, 
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { app } from '../lib/firebase-client';

/**
 * Context for authentication state and methods
 */
const AuthContext = createContext();

/**
 * AuthProvider component for managing authentication state
 * Implements robust error handling and proper state persistence
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Initialize user from localStorage if available to prevent flicker on page load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    }
  }, []);

  // Set up Firebase auth state listener
  useEffect(() => {
    // Only set up the listener if auth is available
    if (!auth) {
      console.warn('Firebase Auth is not available. Check Firebase configuration.');
      setLoading(false);
      return;
    }

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        if (user) {
          // Store the user data in localStorage for persistence across pages
          try {
            localStorage.setItem('currentUser', JSON.stringify(user));
          } catch (error) {
            console.error('Error storing user in localStorage:', error);
          }
        } else {
          // Clear localStorage when user signs out
          try {
            localStorage.removeItem('currentUser');
          } catch (error) {
            console.error('Error removing user from localStorage:', error);
          }
        }
        
        setUser(user);
        setLoading(false);
        setAuthError(null);
      },
      (error) => {
        console.error('Auth state change error:', error);
        setAuthError(error.message);
        setLoading(false);
      }
    );

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  /**
   * Enhanced Google sign-in function with robust error handling
   * @returns {Promise<UserCredential|null>} The auth result or null if failed
   */
  const loginWithGoogle = async () => {
    // Clear any previous errors
    setAuthError(null);
    setLoading(true);
    
    try {
      // Validate Firebase configuration
      if (!app || !auth) {
        console.error('Firebase not properly configured');
        setAuthError('Firebase configuration is missing or invalid');
        throw new Error('Firebase is not properly configured. Check your .env.local file.');
      }
      
      // Create Google auth provider with custom parameters for better UX
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'  // Always show account selection dialog
      });
      
      // Set authentication persistence to local (survives browser restart)
      await setPersistence(auth, browserLocalPersistence);
      
      // Attempt sign in with popup
      const result = await signInWithPopup(auth, provider);
      
      // Manual persistence in localStorage
      if (result.user) {
        localStorage.setItem('currentUser', JSON.stringify(result.user));
      }
      
      return result;
    } catch (error) {
      // Handle specific Firebase errors with appropriate user feedback
      setAuthError(error.message);
      console.error('Login error details:', error);
      
      // Provide user-friendly error messages based on error code
      let errorMessage = 'Login failed';
      
      switch(error.code) {
        case 'auth/configuration-not-found':
          errorMessage = 'Authentication service is not properly configured';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Login popup was blocked by your browser';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'Login was cancelled';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Login process was interrupted';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
        default:
          errorMessage = `Login failed: ${error.message}`;
      }
      
      // Use alert for immediate feedback (could be replaced with a UI component)
      alert(errorMessage);
      
      // Return null instead of throwing to prevent app crashes
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Enhanced logout function with error handling
   */
  const logout = async () => {
    setLoading(true);
    try {
      // Only attempt logout if auth is available
      if (auth) {
        await signOut(auth);
      }
      
      // Always clear localStorage regardless of auth state
      localStorage.removeItem('currentUser');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setAuthError('Failed to log out properly');
      alert('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      loginWithGoogle, 
      logout,
      authError
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication context
 * @returns {Object} Auth context value
 */
export const useAuth = () => useContext(AuthContext);
