import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[400px] mb-16 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-lg flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 rounded-lg" />
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-white">Hakkımızda</h1>
          </div>
        </div>

        {/* İçerik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Biz Kimiz?</h2>
            <p className="text-gray-600 mb-4">
              20 yılı aşkın tecrübemizle müşterilerimize en kaliteli altın ve gümüş ürünleri sunuyoruz. 
              Kurulduğumuz günden bu yana, müşteri memnuniyetini ön planda tutarak, kaliteli ürünleri 
              uygun fiyatlarla sunmayı hedefledik.
            </p>
            <p className="text-gray-600 mb-4">
              Uzman ekibimiz ve modern mağazamız ile sizlere en iyi hizmeti vermekten gurur duyuyoruz. 
              Her bir ürünümüz, en yüksek kalite standartlarında üretilmekte ve müşterilerimize 
              sunulmaktadır.
            </p>
          </div>
          <div className="relative h-[400px] bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
            <span className="text-6xl">🏪</span>
          </div>
        </div>

        {/* Değerlerimiz */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Kalite</h3>
              <p className="text-gray-600">
                En kaliteli malzemeleri kullanarak, müşterilerimize en iyi ürünleri sunuyoruz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Güven</h3>
              <p className="text-gray-600">
                Müşterilerimizle güvene dayalı ilişkiler kurarak, uzun vadeli iş birlikleri geliştiriyoruz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Müşteri Memnuniyeti</h3>
              <p className="text-gray-600">
                Müşterilerimizin memnuniyeti için her zaman en iyi hizmeti sunmaya çalışıyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Ekibimiz */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Uzman Ekibimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

const team = [
  {
    name: 'Ahmet Yılmaz',
    position: 'Genel Müdür',
    image: '/team/ceo.jpg'
  },
  {
    name: 'Ayşe Demir',
    position: 'Satış Müdürü',
    image: '/team/sales-manager.jpg'
  },
  {
    name: 'Mehmet Kaya',
    position: 'Usta Kuyumcu',
    image: '/team/jeweler.jpg'
  },
  {
    name: 'Zeynep Şahin',
    position: 'Müşteri İlişkileri',
    image: '/team/customer-service.jpg'
  }
] 