import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-800">
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Altın ve Gümüşün En Seçkin Adresi</h1>
          <p className="text-xl md:text-2xl mb-8">Kaliteli ürünler, uygun fiyatlar ve profesyonel hizmet</p>
          <Link 
            href="/urunler" 
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Ürünlerimizi Keşfedin
          </Link>
        </div>
      </section>

      {/* Öne Çıkan Kategoriler */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Öne Çıkan Kategoriler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.title} className="group relative overflow-hidden rounded-lg">
                <div className="w-full h-80 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                  <span className="text-4xl">💍</span>
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hakkımızda */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Hakkımızda</h2>
              <p className="text-lg text-gray-600 mb-6">
                20 yılı aşkın tecrübemizle müşterilerimize en kaliteli altın ve gümüş ürünleri sunuyoruz. 
                Uzman ekibimiz ve modern mağazamız ile sizlere en iyi hizmeti vermekten gurur duyuyoruz.
              </p>
              <Link 
                href="/hakkimizda" 
                className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="relative h-[400px] bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
              <span className="text-6xl">🏪</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const categories = [
  {
    title: 'Altın Takılar',
    image: '/gold-jewelry.jpg'
  },
  {
    title: 'Gümüş Takılar',
    image: '/silver-jewelry.jpg'
  },
  {
    title: 'Pırlanta',
    image: '/diamond.jpg'
  }
] 