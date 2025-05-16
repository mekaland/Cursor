"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function Favorites() {
  const { favorites, addToCart } = useCart();

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Favorilerim</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Favori ürününüz bulunmamaktadır.</p>
            <Link
              href="/products"
              className="inline-block bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.weight}</p>
                  <p className="text-yellow-600 font-bold text-2xl mb-4">₺{product.price.toLocaleString()}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Sepete Ekle
                    </button>
                    <Link
                      href="/cart"
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                    >
                      Sepete Git
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 