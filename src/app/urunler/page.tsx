import Image from 'next/image'
import Link from 'next/link'

const products = [
  {
    id: 1,
    title: 'Altın Bilezik',
    category: 'Altın Takılar',
    price: '12.500 ₺',
    image: '/products/gold-bracelet.jpg',
    description: '22 ayar altın bilezik, klasik tasarım'
  },
  {
    id: 2,
    title: 'Gümüş Kolye',
    category: 'Gümüş Takılar',
    price: '1.200 ₺',
    image: '/products/silver-necklace.jpg',
    description: '925 ayar gümüş kolye, modern tasarım'
  },
  {
    id: 3,
    title: 'Pırlanta Yüzük',
    category: 'Pırlanta',
    price: '25.000 ₺',
    image: '/products/diamond-ring.jpg',
    description: '0.5 karat pırlanta, altın kaplama'
  },
  // Daha fazla ürün eklenebilir
]

export default function Products() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Ürünlerimiz</h1>
        
        {/* Filtreler */}
        <div className="flex justify-center space-x-4 mb-8">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors">
            Tümü
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
            Altın Takılar
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
            Gümüş Takılar
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
            Pırlanta
          </button>
        </div>

        {/* Ürün Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                <span className="text-6xl">
                  {product.category === 'Altın Takılar' ? '💍' : 
                   product.category === 'Gümüş Takılar' ? '📿' : '💎'}
                </span>
              </div>
              <div className="p-6">
                <span className="text-sm text-yellow-600 font-semibold">{product.category}</span>
                <h3 className="text-xl font-bold mt-2 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition-colors">
                    İncele
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 