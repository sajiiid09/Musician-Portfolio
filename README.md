# Artist Website

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Docker

To run this project in a production-ready container:

### 1. Build the image
```bash
docker build -t artist-website .
```

### 2. Run the container
```bash
docker run -p 3000:3000 artist-website
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion & GSAP
