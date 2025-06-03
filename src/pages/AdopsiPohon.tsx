import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MapPin, Leaf, LogIn } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AdopsiPohon = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/trees');
        setTrees(response.data);
      } catch (error) {
        console.error('Error fetching trees:', error);
        toast.error('Gagal memuat daftar pohon');
      } finally {
        setLoading(false);
      }
    };
    fetchTrees();
  }, []);

  const handleAdoptClick = (treeId: number) => {
    if (!user) {
      toast.error('Silakan masuk terlebih dahulu untuk mengadopsi pohon');
      navigate('/login');
      return;
    }
    navigate(`/detail-pohon/${treeId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen forest-bg">
        <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

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
              {!user && (
                <div className="mt-6">
                  <Card className="glass-effect border-yellow-400/50 p-4 max-w-md mx-auto">
                    <div className="flex items-center justify-center text-yellow-400">
                      <LogIn className="w-5 h-5 mr-2" />
                      <span className="text-sm">Silakan masuk untuk mengadopsi pohon</span>
                    </div>
                  </Card>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trees.map((tree: any) => (
                <Card key={tree._id} className="glass-effect border-white/20 overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                  <img 
                    src={`http://localhost:5000/uploads/${tree.image}`} 
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
                      {tree.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-center text-gray-200 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-2xl font-bold text-green-400 mb-4">
                      Rp{tree.price.toLocaleString('id-ID')}
                    </div>

                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                      onClick={() => handleAdoptClick(tree._id)}
                    >
                      <Leaf className="w-4 h-4 mr-2" />
                      Adopsi Sekarang
                    </Button>
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