# DevXP - Technology Learning Platform

A modern React-based web application providing structured learning paths for various technology domains including frontend development, machine learning, cloud computing, and more.

![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![Vite](https://img.shields.io/badge/Vite-Build-purple)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styling-cyan)

## Features

- **Interactive 3D Globe**: Explore global technology connections with an interactive Three.js globe
- **Content Management**: Dynamic content fetching from Contentful CMS
- **Responsive Design**: Mobile-first responsive interface with Tailwind CSS
- **Rich Content Rendering**: Support for rich text, code syntax highlighting, and embedded media
- **Multiple Learning Domains**: 
  - Frontend & Backend Development
  - Machine Learning & Deep Learning
  - Cloud Computing & DevOps
  - Database Management Systems
  - Data Engineering & Mining
  - Coding Essentials
  - Future Technologies (Web3, Blockchain)
- **Carousel Components**: Smooth content browsing with animated carousels
- **Error Boundaries**: Robust error handling with custom 404 pages
- **Authentication Ready**: Clerk authentication integration
- **State Management**: Recoil for global state management

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Contentful account and API credentials

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd src
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CONTENTFUL_SPACE_ID=your_contentful_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
```

4. Start the development server:
```bash
npm run dev
```

## Configuration

### Environment Variables

The application requires the following environment variables:

- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk authentication public key
- `VITE_CONTENTFUL_SPACE_ID`: Contentful CMS space identifier
- `VITE_CONTENTFUL_ACCESS_TOKEN`: Contentful delivery API access token

### Contentful Content Types

The application expects specific content types in Contentful:
- `frontendEssentials`
- `backendEssentials`
- `dataPreprocessing`
- `supervisedAlgorithms`
- `cloudComputing`
- `aws`
- `web3`
- And more (see Content directory for complete list)

## Usage

### Basic Navigation

```typescript
// Navigate between different learning domains
import { Link } from "react-router-dom";

<Link to="/machine-learning">Machine Learning</Link>
<Link to="/frontend">Frontend Development</Link>
<Link to="/cloud-computing">Cloud Computing</Link>
```

### Content Fetching

```typescript
// Fetch content from Contentful
import { fetchContentfulData } from './Content/ContentfulDataFetching';

const data = await fetchContentfulData('frontendEssentials');
```

### Using Custom Hooks

```typescript
// Fetch data with authentication
import useFetch from './hooks/useFetch';

const { data, loading, error } = useFetch<DataType>('/api/endpoint');
```

### Globe Component

```typescript
import { GlobeDemo } from './Components/globe';

// Display interactive 3D globe
<GlobeDemo />
```

## Project Structure

```
src/
├── App.tsx                 # Main application component
├── Components/             # Reusable UI components
│   ├── BentoGrid/         # Grid layout components
│   ├── Carousal/          # Content carousel components
│   ├── globe/             # 3D globe visualization
│   ├── Navbar/            # Navigation component
│   ├── LinkPreview/       # URL preview component
│   ├── Error/             # Error handling components
│   └── Loader/            # Loading indicators
├── Content/                # Content management layer
│   ├── ContentfulClient.ts      # Contentful API client
│   ├── ContentfulDataFetching.ts # Data fetching utilities
│   ├── documentToReactComponents(options).tsx # Rich text rendering
│   └── [domain]/          # Domain-specific content handlers
├── Routes/                 # Application routes
│   ├── route.tsx          # Route configuration
│   ├── Home/              # Homepage components
│   └── [domain]/          # Domain-specific pages
├── Layouts/                # Layout components
│   ├── RootLayout.tsx     # Main layout wrapper
│   └── ErrorBoundary.tsx  # Error boundary component
├── hooks/                  # Custom React hooks
│   ├── useFetch.tsx       # Data fetching hook
│   └── use-outside-click.ts # Outside click detection
├── lib/                    # Utility functions
│   ├── utils.ts           # General utilities
│   └── globe.json         # Globe configuration data
├── assets/                 # Static assets
│   └── index.css          # Global styles
└── main.tsx               # Application entry point
```

### Key Directories

- **Components/**: Modular UI components with their own styling and logic
- **Content/**: Contentful CMS integration and content type handlers
- **Routes/**: React Router pages for different learning domains
- **Layouts/**: Shared layout components and error boundaries
- **hooks/**: Custom React hooks for data fetching and UI interactions

## Development

### Adding New Content Types

1. Create content type in Contentful
2. Add fetching function in `Content/[domain]/index.tsx`:
```typescript
import { fetchContentfulData } from '../ContentfulDataFetching';

const get_NewContentType_data = () => fetchContentfulData('newContentType');
export { get_NewContentType_data };
```

3. Create corresponding route in `Routes/[domain]/index.tsx`
4. Update route configuration in `Routes/route.tsx`

### Custom Components

The application uses several custom components:
- **BentoGrid**: Responsive grid layout for content cards
- **Carousel**: Horizontal scrolling content display
- **Globe**: Interactive 3D visualization using Three.js
- **LinkPreview**: Hover preview for external links

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature-name'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

### Code Style

- Use TypeScript for all new components
- Follow existing naming conventions
- Ensure responsive design compatibility
- Add proper error handling and loading states
