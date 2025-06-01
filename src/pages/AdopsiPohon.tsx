
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MapPin, Leaf } from 'lucide-react';
import Navbar from '@/components/Navbar';

const AdopsiPohon = () => {
  const [trees] = useState([
    {
      id: 1,
      name: 'Pohon Jati',
      category: 'Pencegahan Erosi',
      price: 250000,
      benefits: ['Penyerap CO₂ tinggi', 'Umur hingga 100 tahun', 'Hutan Kota Jakarta'],
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=500&q=80',
      location: 'Jakarta Selatan'
    },
    {
      id: 2,
      name: 'Pohon Mangrove',
      category: 'Ekosistem Vital',
      price: 175000,
      benefits: ['Pencegah abrasi pantai', 'Habitat biota laut', 'Pesisir Utara Jakarta'],
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=500&q=80',
      location: 'Pantai Utara Jakarta'
    },
    {
      id: 3,
      name: 'Pohon Buah Lokal',
      category: 'Menghasilkan Buah',
      price: 300000,
      benefits: ['Panen buah organik', 'Penyerapan air hujan', 'Lahan Mitra Petani Banda Aceh'],
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=500&q=80',
      location: 'Banda Aceh'
    },
    {
      id: 4,
      name: 'Pohon Pinus',
      category: 'Konservasi',
      price: 200000,
      benefits: ['Tahan cuaca ekstrem', 'Habitat satwa', 'Pegunungan Jawa Barat'],
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=500&q=80',
      location: 'Bandung'
    },
    {
      id: 5,
      name: 'Pohon Bambu',
      category: 'Ramah Lingkungan',
      price: 150000,
      benefits: ['Pertumbuhan cepat', 'Material berkelanjutan', 'Desa Hijau Yogyakarta'],
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=500&q=80',
      location: 'Yogyakarta'
    },
    {
      id: 6,
      name: 'Pohon Mahoni',
      category: 'Hutan Kota',
      price: 275000,
      benefits: ['Peneduh alami', 'Kualitas kayu tinggi', 'Taman Kota Surabaya'],
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=500&q=80',
      location: 'Surabaya'
    }
  ]);

  return (
    <div className="min-h-screen forest-bg">
      <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40">
        <Navbar />
        
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🌱 Adopsi Pohon Sekarang
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Pilih pohon yang ingin Anda adopsi dan berkontribusi untuk masa depan bumi yang lebih hijau
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trees.map((tree) => (
                <Card key={tree.id} className="glass-effect border-white/20 overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img 
                      src={tree.image} 
                      alt={tree.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                      {tree.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{tree.name}</h3>
                    
                    <div className="flex items-center text-gray-300 mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{tree.location}</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      {tree.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center text-gray-200 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-2xl font-bold text-green-400 mb-4">
                      Rp{tree.price.toLocaleString('id-ID')}
                    </div>

                    <Link to={`/detail-pohon/${tree.id}`}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                        <Leaf className="w-4 h-4 mr-2" />
                        Adopsi Sekarang
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <Card className="glass-effect border-white/20 p-8 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Tidak Menemukan Pohon yang Cocok?
                </h2>
                <p className="text-gray-200 mb-6">
                  Hubungi tim kami untuk mendiskusikan kebutuhan adopsi pohon khusus Anda
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Hubungi Kami
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdopsiPohon;
