'use client';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/**
 * Check if we're in a development environment
 */
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Loaded directly from .env.local file
 * These are hard-coded for development environments only
 */
const developmentConfig = {
  apiKey: 'AIzaSyBXfSluKvFxErpie68P4Yl27Q5g8UJE03s',
  authDomain: 'agie-backend.firebaseapp.com',
  projectId: 'agie-backend',
  storageBucket: 'agie-backend.firebasestorage.app',
  messagingSenderId: '220952675266',
  appId: '1:220952675266:web:33b3c017ba9aefcbd00c5b'
};

/**
 * Firebase configuration - prioritizes environment variables,
 * falls back to development config when in development mode
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || (isDevelopment ? developmentConfig.apiKey : null),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || (isDevelopment ? developmentConfig.authDomain : null),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || (isDevelopment ? developmentConfig.projectId : null),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || (isDevelopment ? developmentConfig.storageBucket : null),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || (isDevelopment ? developmentConfig.messagingSenderId : null),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || (isDevelopment ? developmentConfig.appId : null)
};

/**
 * Verify that the config has all required values
 */
const isConfigValid = Object.values(firebaseConfig).every(value => value !== null && value !== undefined);
console.log(`Firebase config status: ${isConfigValid ? 'Valid' : 'Invalid'}`);

let firebaseApp = null;

if (isConfigValid) {
  try {
    if (!getApps().length) {
      firebaseApp = initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
    } else {
      firebaseApp = getApps()[0];
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

export const app = firebaseApp;
export const auth = (typeof window !== 'undefined' && firebaseApp) ? getAuth(firebaseApp) : null;
