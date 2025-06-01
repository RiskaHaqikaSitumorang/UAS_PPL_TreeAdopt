import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trees, Leaf, Users, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen forest-bg">
      <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-600 mb-6">
                <Trees className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Selamat Datang di <span className="text-green-400">TreeAdopt</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Bersama kita bisa menanam harapan dengan mengadopsi pohon dan 
              menjaga lingkungan kita.
            </p>
            <Link to="/adopsi-pohon">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                🌱 Adopsi Pohon Sekarang
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Galeri Sertifikat</h2>
              <p className="text-xl text-gray-200">
                Lihat beragam sertifikat adopsi pohon yang telah diterbitkan untuk para pengguna kami yang telah berkontribusi untuk bumi.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="glass-effect border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                    <Award className="w-16 h-16 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Tree Adoption Certificate</h3>
                  <p className="text-gray-200 text-sm">Sertifikat adopsi pohon jati</p>
                  <p className="text-green-400 font-bold">Rp250.000</p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                    <Award className="w-16 h-16 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Tree Adoption Certificate</h3>
                  <p className="text-gray-200 text-sm">Sertifikat adopsi pohon mangrove</p>
                  <p className="text-green-400 font-bold">Rp175.000</p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                    <Award className="w-16 h-16 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Green Certificate</h3>
                  <p className="text-gray-200 text-sm">Sertifikat pohon buah lokal</p>
                  <p className="text-green-400 font-bold">Rp300.000</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link to="/adopsi-pohon">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Lihat Semua Opsi →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">Tentang TreeAdopt</h2>
                  <p className="text-gray-200 mb-6">
                    TreeAdopt adalah platform inovatif untuk mengadopsi pohon dan menjaga lingkungan. 
                    Dengan bergabung bersama kami, Anda tidak hanya menanam pohon tetapi juga 
                    memantau perkembangannya secara real-time.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Trees className="w-5 h-5 text-green-400" />
                      <span className="text-gray-200">Adopsi pohon dengan mudah</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Leaf className="w-5 h-5 text-green-400" />
                      <span className="text-gray-200">Pantau pertumbuhan pohon Anda</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-green-400" />
                      <span className="text-gray-200">Bergabung dengan komunitas peduli lingkungan</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <img 
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=500&q=80" 
                    alt="Penanaman pohon" 
                    className="rounded-lg w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Mengapa TreeAdopt?</h2>
              <p className="text-xl text-gray-200">
                Mengapa memilih TreeAdopt? Karena kami menawarkan cara paling mudah dan transparan 
                untuk berkontribusi terhadap lingkungan.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="glass-effect border-white/20 text-center p-6">
                <Trees className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Pilihan Pohon</h3>
                <p className="text-gray-200 text-sm">
                  Berbagai jenis pohon tersedia untuk diadopsi sesuai preferensi Anda
                </p>
              </Card>

              <Card className="glass-effect border-white/20 text-center p-6">
                <Leaf className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Investasi Hijau</h3>
                <p className="text-gray-200 text-sm">
                  Adopsi pohon adalah investasi terbaik untuk masa depan planet kita
                </p>
              </Card>

              <Card className="glass-effect border-white/20 text-center p-6">
                <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Sertifikat Resmi</h3>
                <p className="text-gray-200 text-sm">
                  Dapatkan sertifikat adopsi pohon yang dapat dibagikan kepada teman
                </p>
              </Card>

              <Card className="glass-effect border-white/20 text-center p-6">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Berbasis Komunitas</h3>
                <p className="text-gray-200 text-sm">
                  Bergabung dengan ribuan orang yang peduli lingkungan di seluruh Indonesia
                </p>
              </Card>
            </div>

            <div className="mt-12 glass-effect rounded-2xl p-8">
              <div className="flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Mari Bersama Menyelamatkan Bumi</h3>
              </div>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">1000+</div>
                  <div className="text-gray-200">Pohon Teradopsi</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
                  <div className="text-gray-200">Pengguna Aktif</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                  <div className="text-gray-200">Lokasi Penanaman</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                  <div className="text-gray-200">Transparan</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Bagaimana Cara Kerjanya</h2>
              <p className="text-xl text-gray-200">
                Proses adopsi pohon kami dibuat mudah dalam 4 langkah sederhana.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Pilih Pohon",
                  description: "Pilih jenis pohon yang ingin Anda adopsi dari berbagai pilihan yang tersedia."
                },
                {
                  step: "2", 
                  title: "Selesaikan Pembayaran",
                  description: "Selesaikan proses pembayaran melalui metode yang telah kami sediakan."
                },
                {
                  step: "3",
                  title: "Dapatkan Sertifikat", 
                  description: "Dapatkan sertifikat adopsi pohon digital yang dapat dibagikan."
                },
                {
                  step: "4",
                  title: "Pantau Progres",
                  description: "Pantau pertumbuhan pohon Anda melalui dashboard dengan laporan berkala."
                }
              ].map((item) => (
                <Card key={item.step} className="glass-effect border-white/20 text-center p-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-200 text-sm">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/80 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Trees className="w-8 h-8 text-green-400 mr-2" />
                <span className="text-2xl font-bold">TreeAdopt</span>
              </div>
              <p className="text-gray-400 mb-6">
                Platform adopsi pohon terdepan untuk masa depan bumi yang lebih hijau
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-400">
                <span>© 2024 TreeAdopt</span>
                <span>•</span>
                <span>Made with ❤️ for Earth</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
