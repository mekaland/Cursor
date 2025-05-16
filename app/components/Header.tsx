"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<any>(null);
  const { data: session, status } = useSession();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  // Dropdown'u gecikmeli kapat
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 1000); // 1 saniye gecikme
  };

  // Mouse tekrar menüye gelirse timeout'u temizle
  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setIsDropdownOpen(true);
  };

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/?search=${encodeURIComponent(searchValue.trim())}#products`);
      setSearchValue("");
    }
  };

  if (status === "loading") return null;

  return (
    <header className="fixed top-0 w-full z-[99999] bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4">
        {/* Sol: Logo */}
        <div>
          <Link href="/" className="text-2xl font-bold text-yellow-600 hover:text-yellow-700 transition-colors">
            Dağlı Kuyumculuk
          </Link>
        </div>
        {/* Orta: Navigasyon */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-800 hover:text-yellow-600 font-medium transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/#products" className="text-gray-800 hover:text-yellow-600 font-medium transition-colors">
            Ürünler
          </Link>
          <Link href="/#about" className="text-gray-800 hover:text-yellow-600 font-medium transition-colors">
            Hakkımızda
          </Link>
          <Link href="/#contact" className="text-gray-800 hover:text-yellow-600 font-medium transition-colors">
            İletişim
          </Link>
        </nav>
        {/* Sağ: Arama, Favoriler, Sepet, Hesap */}
        <div className="flex items-center space-x-4">
          {/* Arama kutusu ve ikonu */}
          <form onSubmit={handleHeaderSearch} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Ara..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="pl-8 pr-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 bg-white"
            />
            <span className="absolute left-2 top-1.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </span>
          </form>
          {/* Favoriler */}
          <Link href="/favorites" className="text-gray-800 hover:text-pink-500 transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                className="transition-colors"
              />
            </svg>
          </Link>
          {/* Sepet */}
          <Link href="/cart" className="text-gray-800 hover:text-yellow-600 transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                className="transition-colors"
              />
            </svg>
          </Link>
          {/* Hesap Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="flex items-center text-yellow-600"
              tabIndex={-1}
              style={{ background: "none", border: "none" }}
            >
              {/* Heroicons User */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-[99999]"
                onClick={e => e.stopPropagation()}
              >
                {session?.user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{session.user.name || session.user.email}</div>
                      <div className="text-gray-500 text-xs mt-1">{session.user.email}</div>
                    </div>
                    <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-100">Hesabım</Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">Siparişlerim</Link>
                    <Link href="/account/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profil Bilgilerim</Link>
                    <Link href="/account/addresses" className="block px-4 py-2 text-sm hover:bg-gray-100">Adreslerim</Link>
                    <button
                      onClick={() => { signOut(); setIsDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">Giriş Yap</Link>
                    <Link href="/register" className="block px-4 py-2 text-sm hover:bg-gray-100">Kayıt Ol</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 