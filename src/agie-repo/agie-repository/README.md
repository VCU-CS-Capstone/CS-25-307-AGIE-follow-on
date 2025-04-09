This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/). This endpoint can be edited in `pages/api/`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## env File (IMPORTANT)
Login credentials should be located in a .env file. 
Example .env file: 
```
DB_HOST=HOST
DB_USER=USERNAME
DB_PASS=PASSWORD
DB_DB=DATABASE

OPENAI_API_KEY=YOUR_API_KEY_HERE
```

## Deployment on Firebase

**IMPORTANT: This is a server-side rendered Next.js application using Firebase Functions.**

When deploying this application, you must deploy both Firebase Functions and Hosting components together. Deploying only the hosting component will result in "Page not found" errors.

### Recommended Deployment Commands

```bash
# Complete deployment (recommended)
npm run deploy:complete

# OR use fixed deployment script with verification
npm run deploy:fixed
```

For detailed deployment instructions and troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
