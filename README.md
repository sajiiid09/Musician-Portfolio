# Artist Website

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Docker

### 1. Build the image
```bash
docker build -t artist-website .
```

### 2. Run the container
```bash
docker run -p 3000:3000 artist-website
```

Live website available at [cremainband.com](http://cremainband.com).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion & GSAP
