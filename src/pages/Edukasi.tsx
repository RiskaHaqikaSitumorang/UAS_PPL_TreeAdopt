
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar, User, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Edukasi = () => {
  const [articles] = useState([
    {
      id: 1,
      title: 'Pentingnya Konservasi Hutan untuk Masa Depan',
      description: 'Memahami mengapa hutan adalah paru-paru dunia dan bagaimana kita bisa berkontribusi dalam pelestariannya.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=500&q=80',
      author: 'Dr. Siti Nurhaliza',
      date: '15 Maret 2024',
      category: 'Konservasi',
      url: 'https://www.mertani.co.id/post/pentingnya-konservasi-hutan-untuk-menanggulangi-krisis-lingkungan'
    },
    {
      id: 2,
      title: 'Dampak Perubahan Iklim terhadap Ekosistem',
      description: 'Mengenal lebih dalam tentang perubahan iklim dan dampaknya terhadap kehidupan di bumi.',
      image: 'https://cybex.id/xms/files/1/202410/6c8570a148e9af30e39a5cf866f5e788.jpg',
      author: 'Prof. Ahmad Wijaya',
      date: '10 Maret 2024',
      category: 'Perubahan Iklim',
      url: 'https://www.bmkg.go.id/iklim/perubahan-iklim.bmkg'
    },
    {
      id: 3,
      title: 'Manfaat Pohon bagi Kehidupan Sehari-hari',
      description: 'Memahami berbagai manfaat pohon yang mungkin tidak kita sadari dalam kehidupan sehari-hari.',
      image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=500&q=80',
      author: 'Drs. Bambang Susilo',
      date: '5 Maret 2024',
      category: 'Lingkungan',
      url: 'https://www.menlhk.go.id/site/single_post/1234'
    },
    {
      id: 4,
      title: 'Program Rehabilitasi Hutan dan Lahan',
      description: 'Mengenal program pemerintah dalam rehabilitasi hutan dan lahan yang rusak.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqIL3efHBbWF8t18RTiMpbb23WwCiXdgZezw&s',
      author: 'Tim Kemenhut',
      date: '28 Februari 2024',
      category: 'Program Pemerintah',
      url: 'https://www.menlhk.go.id/site/post/rehabilitasi-hutan'
    },
    {
      id: 5,
      title: 'Teknologi Hijau untuk Masa Depan Berkelanjutan',
      description: 'Inovasi teknologi yang ramah lingkungan untuk mendukung pembangunan berkelanjutan.',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=500&q=80',
      author: 'Dr. Rini Teknologi',
      date: '20 Februari 2024',
      category: 'Teknologi',
      url: 'https://www.esdm.go.id/id/media-center/arsip-berita/teknologi-hijau'
    },
    {
      id: 6,
      title: 'Keanekaragaman Hayati Indonesia',
      description: 'Memahami kekayaan flora dan fauna Indonesia serta upaya pelestariannya.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSLfkwYJGXGHSgv6FBDk1k-rVdp_lfBDRnv5fkdFAtP86O-ZomH6s3-aCQoDW1nGPA87k&usqp=CAU',
      author: 'Prof. Maria Biodiversitas',
      date: '15 Februari 2024',
      category: 'Biodiversitas',
      url: 'https://www.lipi.go.id/berita/keanekaragaman-hayati-indonesia'
    }
  ]);

  const categories = ['Semua', 'Konservasi', 'Perubahan Iklim', 'Lingkungan', 'Program Pemerintah', 'Teknologi', 'Biodiversitas'];
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredArticles = selectedCategory === 'Semua' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen forest-bg">
      <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40">
        <Navbar />
        
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                📚 Edukasi Lingkungan
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Pelajari tentang lingkungan, konservasi, dan cara berkontribusi untuk bumi yang lebih hijau
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`${
                    selectedCategory === category 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="glass-effect border-white/20 overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                      {article.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{article.title}</h3>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-400 text-xs">
                        <User className="w-3 h-3 mr-2" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-xs">
                        <Calendar className="w-3 h-3 mr-2" />
                        <span>{article.date}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Baca Selengkapnya
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <Card className="glass-effect border-white/20 p-8 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ingin Berkontribusi Langsung?
                </h2>
                <p className="text-gray-200 mb-6">
                  Mulai adopsi pohon sekarang dan jadilah bagian dari gerakan penghijauan Indonesia
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Adopsi Pohon Sekarang
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edukasi;
