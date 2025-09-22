# JAGGAER E-commerce App

A modern e-commerce application built with Next.js and GraphQL, designed for unified deployment on Vercel.

## Architecture

This application combines both frontend and backend functionality into a single Next.js application:

- **Frontend**: React with Next.js, Material-UI, Apollo Client
- **Backend**: GraphQL API built with Apollo Server running as Next.js API routes
- **Data**: In-memory storage for demonstration purposes
- **Assets**: Static product images served from `/public/assets`

## Deployment on Vercel

### Prerequisites

- Node.js 18+
- npm 8+
- Vercel account

### Quick Deploy

1. **Connect to Vercel**:

   ```bash
   # Install Vercel CLI (if not already installed)
   npm install -g vercel

   # Deploy from the root directory
   vercel
   ```

2. **Manual Deployment**:
   - Push your code to GitHub/GitLab/Bitbucket
   - Import the repository in Vercel dashboard
   - Vercel will automatically detect the Next.js framework and deploy

### Environment Configuration

The application is pre-configured to work without additional environment variables. The GraphQL endpoint automatically points to `/api/graphql` in production.

### Project Structure

```
├── README.md
├── package.json            # Root package.json for Vercel
├── vercel.json            # Vercel deployment configuration
├── backend/               # Original backend (now deprecated)
├── frontend/              # Next.js application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── lib/
│   │   │   ├── data/      # GraphQL data services
│   │   │   └── graphql/   # GraphQL schema and resolvers
│   │   └── pages/
│   │       └── api/
│   │           └── graphql.ts  # GraphQL API endpoint
│   ├── public/
│   │   └── assets/        # Product images
│   └── package.json       # Frontend dependencies
└── design/               # Design specifications
```

## Development

### Local Development

1. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - GraphQL Playground: http://localhost:3000/api/graphql

### API Endpoints

- **GraphQL API**: `/api/graphql`
- **Static Assets**: `/assets/*` (product images)

### Key Features

- Product catalog with search and filtering
- Shopping cart functionality
- Responsive design with Material-UI
- GraphQL API with real-time cart updates
- Image gallery and product details
- Error boundaries and loading states

## Technical Highlights

- **Unified Deployment**: Single repository deployment on Vercel
- **Modern Stack**: Next.js 15, React 19, Apollo Server v4
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized images and lazy loading
- **SEO**: Server-side rendering with Next.js

## Post-Deployment

After deployment, the application will be available at your Vercel domain with:

- Full product catalog functionality
- Working shopping cart
- GraphQL API endpoints
- Static asset serving

The application is production-ready and scales automatically with Vercel's infrastructure.
