"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "./context/CartContext";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { cart, favorites, addToCart, addToFavorites, removeFromFavorites } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<{[key: string]: boolean}>({});
  const [addedToFavorites, setAddedToFavorites] = useState<{[key: string]: boolean}>({});

  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const element = document.getElementById(searchQuery.toLowerCase().replace(/\s+/g, "-"));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setAddedToCart(prev => ({...prev, [product.id]: true}));
  };

  const handleAddToFavorites = (product: any) => {
    if (addedToFavorites[product.id]) {
      removeFromFavorites(product.id);
      setAddedToFavorites(prev => ({...prev, [product.id]: false}));
    } else {
      addToFavorites(product);
      setAddedToFavorites(prev => ({...prev, [product.id]: true}));
    }
  };

  const allProducts = [
    {
      id: "eski-cumhuriyet-altin",
      name: "Eski Cumhuriyet Altını",
      title: "Eski Cumhuriyet Altını",
      description: "22 Ayar, 7.216 gr",
      image: "/images/cumhuriyet-altin.jpg",
      price: 45000,
      weight: "22 Ayar, 7.216 gr"
    },
    {
      id: "yeni-cumhuriyet-altin",
      name: "Yeni Cumhuriyet Altını",
      title: "Yeni Cumhuriyet Altını",
      description: "22 Ayar, 7.216 gr",
      image: "/images/cumhuriyet-altin.jpg",
      price: 45000,
      weight: "22 Ayar, 7.216 gr"
    },
    {
      id: "eski-yarim-altin",
      name: "Eski Yarım Altın",
      title: "Eski Yarım Altın",
      description: "22 Ayar, 3.608 gr",
      image: "/images/yarim-altin.webp",
      price: 22500,
      weight: "22 Ayar, 3.608 gr"
    },
    {
      id: "yeni-yarim-altin",
      name: "Yeni Yarım Altın",
      title: "Yeni Yarım Altın",
      description: "22 Ayar, 3.608 gr",
      image: "/images/yarim-altin.webp",
      price: 22500,
      weight: "22 Ayar, 3.608 gr"
    },
    {
      id: "eski-ceyrek-altin",
      name: "Eski Çeyrek Altın",
      title: "Eski Çeyrek Altın",
      description: "22 Ayar, 1.804 gr",
      image: "/images/ceyrek-altin.avif",
      price: 11250,
      weight: "22 Ayar, 1.804 gr"
    },
    {
      id: "yeni-ceyrek-altin",
      name: "Yeni Çeyrek Altın",
      title: "Yeni Çeyrek Altın",
      description: "22 Ayar, 1.804 gr",
      image: "/images/ceyrek-altin.avif",
      price: 11250,
      weight: "22 Ayar, 1.804 gr"
    },
  ];

  const filteredProducts = search
    ? allProducts.filter(product =>
        product.title.toLowerCase().includes(search) ||
        product.name?.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search)
      )
    : allProducts;

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#products") {
      const el = document.getElementById("products");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-yellow-600">
                Dağlı Kuyumculuk
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-yellow-600">
                Ana Sayfa
              </Link>
              <a href="#products" className="text-gray-600 hover:text-yellow-600">
                Ürünler
              </a>
              <a href="#about" className="text-gray-600 hover:text-yellow-600">
                Hakkımızda
              </a>
              <a href="#contact" className="text-gray-600 hover:text-yellow-600">
                İletişim
              </a>
            </nav>

            {/* Search, Favorites, Cart, and Account Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-600 hover:text-yellow-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link href="/favorites" className="text-gray-600 hover:text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>
              <Link href="/account" className="text-gray-600 hover:text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-yellow-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="py-4">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-600 text-white rounded-r-lg hover:bg-yellow-700"
                >
                  Ara
                </button>
              </form>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-600 hover:text-yellow-600">
                  Ana Sayfa
                </Link>
                <a href="#products" className="text-gray-600 hover:text-yellow-600">
                  Ürünler
                </a>
                <a href="#about" className="text-gray-600 hover:text-yellow-600">
                  Hakkımızda
                </a>
                <a href="#contact" className="text-gray-600 hover:text-yellow-600">
                  İletişim
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Değerli Metallerin Adresi</h1>
          <p className="text-xl mb-8">Güvenilir alım satım için doğru adres</p>
          <a
            href="#products"
            className="bg-yellow-600 text-white px-8 py-3 rounded-full hover:bg-yellow-700 transition-colors"
          >
            Ürünleri Keşfet
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Öne Çıkan Ürünler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-yellow-600 font-bold text-2xl mb-4">₺{product.price}</p>
                    <div className="flex space-x-2">
                      {addedToCart[product.id] ? (
                        <Link
                          href="/cart"
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                        >
                          Sepete Git
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                          >
                            Sepete Ekle
                          </button>
                          <button
                            onClick={() => handleAddToFavorites(product)}
                            className={`p-2 ${addedToFavorites[product.id] ? 'text-red-600' : 'text-gray-600 hover:text-yellow-600'}`}
                          >
                            <svg className="w-6 h-6" fill={addedToFavorites[product.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">Aradığınız ürün bulunamadı.</div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Hakkımızda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Dağlı Kuyumculuk</h3>
              <p className="text-gray-600 mb-6">
                20 yılı aşkın tecrübemizle Gaziantep'te hizmet veren Dağlı Kuyumculuk, müşterilerimize en kaliteli ürünleri en uygun fiyatlarla sunmaktadır. Uzman kadromuz ve güvenilir hizmet anlayışımızla, değerli metallerin alım satımında tercih edilen adres olmaya devam ediyoruz.
              </p>
              <p className="text-gray-600 mb-6">
                Müşteri memnuniyetini ön planda tutan yaklaşımımız ve şeffaf iş anlayışımızla, her zaman en iyi hizmeti sunmayı hedefliyoruz. Profesyonel ekibimiz, değerli metaller konusundaki uzmanlığıyla size en doğru yönlendirmeyi yapmaktadır.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-yellow-600 mb-2">20+</h4>
                  <p className="text-gray-600">Yıllık Tecrübe</p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-yellow-600 mb-2">1000+</h4>
                  <p className="text-gray-600">Mutlu Müşteri</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/about-image.png"
                alt="Dağlı Kuyumculuk"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Dağlı Kuyumculuk</h3>
              <p className="text-gray-400">
                Kaliteli ürünler, uygun fiyatlar ve profesyonel hizmet.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <a href="#products" className="text-gray-400 hover:text-white">
                    Ürünler
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white">
                    İletişim
                  </a>
                </li>
              </ul>
            </div>
            <div id="contact">
              <h3 className="text-xl font-bold mb-4">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <p className="flex items-center text-gray-400">
                  <svg className="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Kolejtepe, Mühendis Evleri Sk., 27070 Şahinbey/Gaziantep
                </p>
                <p className="flex items-center text-gray-400">
                  <svg className="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  05347043478
                </p>
                <p className="flex items-center text-gray-400">
                  <svg className="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  kadoland34@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Çalışma Saatleri</h3>
              <div className="space-y-2 text-gray-400">
                <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                <p>Cumartesi: 09:00 - 14:00</p>
                <p>Pazar: Kapalı</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2024 Dağlı Kuyumculuk. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
