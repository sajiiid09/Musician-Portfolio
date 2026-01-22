'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { STORE_PRODUCTS, ALBUM_DEAR_MELANCHOLIA } from '@/lib/assets';

// --- Types ---
type Product = {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  isSale?: boolean;
};

// --- Cremain Products ---
const PRODUCTS: Product[] = [...STORE_PRODUCTS].map((product, index) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  originalPrice: product.originalPrice,
  image: product.image,
  category: product.category,
  isSale: product.isSale || false,
}));

const CATEGORIES = ['All Products', 'Digital', 'Vinyl', 'Clothing', 'Merch'];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('All Products');

  // Simple filtering logic
  const filteredProducts = activeCategory === 'All Products'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main className="bg-black min-h-screen text-white pt-32">

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-20">

        {/* --- HEADER SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">

          {/* Title Area */}
          <div>
            <span className="block text-xs font-medium uppercase tracking-[0.2em] text-white/60 mb-4">
              Store
            </span>
            <h1 className="text-6xl md:text-8xl font-semibold uppercase leading-[0.9] tracking-tighter">
              Support <br /> The Music
            </h1>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end pt-4">
            {CATEGORIES.map((cat, index) => (
              <React.Fragment key={cat}>
                {index > 0 && <span className="text-white/20 text-xl font-light">/</span>}
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`text-lg md:text-xl uppercase tracking-wide transition-colors ${
                    activeCategory === cat
                      ? 'text-white border-b border-white'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col cursor-pointer">

              {/* Image Container */}
              <div className="relative aspect-[0.8] w-full overflow-hidden bg-neutral-900 mb-6">

                {/* Sale Badge */}
                {product.isSale && (
                  <div className="absolute top-4 right-4 z-10 bg-white text-black text-[10px] font-semibold uppercase tracking-widest px-3 py-1">
                    Sale
                  </div>
                )}

                {/* Main Image using standard <img> tag */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none" />
              </div>

              {/* Product Info */}
              <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-semibold uppercase tracking-tight leading-tight group-hover:text-white/70 transition-colors">
                  {product.title}
                </h3>

                <div className="flex items-center gap-3 text-sm font-medium tracking-wide">
                  <span className="text-white/90">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-white/40 line-through decoration-white/40">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No products found in this category.</p>
            <button
              onClick={() => setActiveCategory('All Products')}
              className="mt-4 text-white underline hover:text-white/70 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}