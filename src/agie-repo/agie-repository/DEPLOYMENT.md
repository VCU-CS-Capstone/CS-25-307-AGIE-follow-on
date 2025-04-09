# Deployment and Development Guide

This document provides instructions for both local development with API routes and Firebase deployment.

## Local Development

### Setup and Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Update browserslist database** (to fix deprecation warnings):
   ```bash
   npm run update-browserslist
   ```

3. **Install Firebase tools** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

4. **Install Functions dependencies**:
   ```bash
   cd functions
   npm install
   cd ..
   ```

### Running Locally

You have two options for local development:

#### Option 1: Standard Next.js Development Server
This works for most development tasks but won't fully simulate the Firebase hosting environment:

```bash
npm run dev
```

Your app will be available at http://localhost:3000

#### Option 2: Firebase Emulators (Full Environment Simulation)
This approach simulates the complete Firebase hosting + functions environment:

1. **Initialize Firebase Emulators** (first time only):
   ```bash
   firebase init emulators
   ```
   Select at minimum the Functions and Hosting emulators.

2. **Run the emulators**:
   ```bash
   npm run emulators
   ```

Your app will typically be available at http://localhost:5000

## Production Deployment

### Understanding the Architecture

This project uses server-side rendering (SSR) with Firebase:

1. **Firebase Hosting**: Serves static assets (.js, .css, images) from the `.next` directory
2. **Firebase Functions**: Handles server-side rendering of pages and API routes
3. **Rewrites** in firebase.json direct requests to the appropriate Cloud Function

⚠️ **IMPORTANT**: Both components (Hosting AND Functions) must be deployed together for the application to work properly. If only one component is deployed, users will encounter "Page not found" errors.

### Recommended Deployment Methods

For the most reliable deployments, use one of these methods:

1. **Complete Deployment** (recommended for most cases):
   ```bash
   npm run deploy:complete
   ```
   This builds the application and deploys both functions and hosting in one command.

2. **Fixed Deployment Script** (includes additional verification):
   ```bash
   npm run deploy:fixed
   ```
   This script verifies the build was successful before deploying functions first, then hosting.

3. **Standard Full Deployment**:
   ```bash
   npm run deploy
   ```
   This builds the application and deploys all Firebase resources.

### Partial Deployments (Use with Caution)

⚠️ **WARNING**: Partial deployments should only be used by experienced team members who understand the deployment architecture.

- **Deploy only the Functions**:
  ```bash
  npm run deploy:functions
  ```

- **Deploy only the Hosting** (NOT RECOMMENDED - will break the application if used alone):
  ```bash
  npm run deploy:hosting
  ```
  Only use this if you've already deployed functions and are only updating static assets.

## Configuration Files

- **firebase.json**: Configures Firebase hosting and rewrites for API routes
- **functions/index.js**: Handles server-side rendering and API route requests
- **next.config.mjs**: Configures Next.js build options (do not add 'output: export' as it would disable API routes)

## Troubleshooting

### "Page not found" or "Forbidden" errors after deployment
These errors typically occur when:
1. Only hosting was deployed without functions (`npm run deploy:hosting` was used without deploying functions)
2. The function deployment failed or has errors
3. There's a mismatch between the Firebase function name in firebase.json and functions/index.js
4. CORS or permission issues with the Cloud Function

To fix:
1. Check Firebase console for function deployment errors
2. **Always** deploy both components together using `npm run deploy:complete` or `npm run deploy:fixed`
3. Clear browser cache with a hard refresh (Ctrl+F5 or Cmd+Shift+R)
4. If you see a "Forbidden" error, check that:
   - The function name in firebase.json matches the export in functions/index.js
   - The region is specified correctly in both files
   - CORS headers are properly set in the function

### Other common issues
- If you encounter 404 errors on API routes, make sure the Firebase Functions are properly deployed
- For CORS issues, check the headers configuration in firebase.json
- If static assets aren't loading, verify the `.next/static` directory is correctly built and deployed

## Verification After Deployment

After deployment, perform the following tests:
1. Visit the main website URL
2. Test navigation between pages
3. Test any API routes
4. Verify any dynamic functionality works correctly
