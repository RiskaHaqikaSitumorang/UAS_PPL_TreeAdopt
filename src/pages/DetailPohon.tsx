import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle, Leaf, Trees, Calendar, User, Mail, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const DetailPohon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tree, setTree] = useState<any>(null);
  const [formData, setFormData] = useState({
    adopterName: '',
    email: '',
    phone: '',
    treeName: '',
    message: ''
  });

  const trees = [
    {
      id: 1,
      name: 'Pohon Jati',
      category: 'Pencegahan Erosi',
      price: 250000,
      benefits: ['Penyerap CO₂ tinggi', 'Umur hingga 100 tahun', 'Hutan Kota Jakarta'],
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      location: 'Jakarta Selatan',
      coordinates: [-6.2088, 106.8456],
      description: 'Pohon jati adalah salah satu jenis pohon keras yang memiliki kualitas kayu terbaik. Pohon ini tidak hanya indah dipandang, tetapi juga memiliki peran vital dalam menjaga keseimbangan ekosistem bumi. Dengan mengadopsi pohon jati, Anda berkontribusi dalam upaya konservasi hutan dan mengurangi dampak perubahan iklim.',
      features: [
        'Dapat menyerap hingga 48 kg CO₂ per tahun',
        'Memiliki umur hingga 100+ tahun',
        'Kayu berkualitas tinggi untuk generasi mendatang',
        'Habitat bagi berbagai spesies burung dan serangga'
      ]
    },
    {
      id: 2,
      name: 'Pohon Mangrove',
      category: 'Ekosistem Vital',
      price: 175000,
      benefits: ['Pencegah abrasi pantai', 'Habitat biota laut', 'Pesisir Utara Jakarta'],
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
      location: 'Pantai Utara Jakarta',
      coordinates: [-6.1276, 106.8354],
      description: 'Pohon mangrove adalah penjaga pantai yang melindungi daratan dari abrasi air laut. Ekosistem mangrove juga menjadi rumah bagi berbagai spesies ikan, kepiting, dan burung. Adopsi pohon mangrove adalah investasi untuk melindungi garis pantai Indonesia.',
      features: [
        'Mencegah abrasi pantai hingga 70%',
        'Habitat untuk 200+ spesies biota laut',
        'Menyerap 4x lebih banyak karbon dibanding hutan tropis',
        'Sumber mata pencaharian nelayan lokal'
      ]
    }
  ];

  useEffect(() => {
    const foundTree = trees.find(t => t.id === parseInt(id || '0'));
    setTree(foundTree);
    
    if (user) {
      setFormData(prev => ({
        ...prev,
        adopterName: user.name,
        email: user.email
      }));
    }
  }, [id, user]);

  const handleAdopt = () => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    if (!formData.treeName.trim()) {
      toast.error('Mohon isi nama untuk pohon Anda');
      return;
    }

    // Store adoption data for payment page
    const adoptionData = {
      tree,
      formData,
      totalPrice: tree?.price
    };
    
    localStorage.setItem('adoptionData', JSON.stringify(adoptionData));
    navigate('/payment');
  };

  if (!tree) {
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
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Side - Tree Details */}
              <div className="space-y-6">
                <Card className="glass-effect border-white/20 overflow-hidden">
                  <img 
                    src={tree.image} 
                    alt={tree.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl font-bold text-white">{tree.name}</h1>
                      <Badge className="bg-green-600 text-white">{tree.category}</Badge>
                    </div>
                    
                    <div className="flex items-center text-gray-300 mb-4">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{tree.location}</span>
                    </div>

                    <p className="text-gray-200 mb-6 leading-relaxed">
                      {tree.description}
                    </p>

                    <div className="text-3xl font-bold text-green-400 mb-6">
                      Rp{tree.price.toLocaleString('id-ID')}
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white mb-3">Manfaat Pohon:</h3>
                      {tree.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start text-gray-200">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Simple Map Placeholder */}
                <Card className="glass-effect border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Lokasi Penanaman</h3>
                    <div className="w-full h-48 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-semibold">{tree.location}</p>
                        <p className="text-sm opacity-80">Koordinat: {tree.coordinates.join(', ')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side - Adoption Form */}
              <div className="space-y-6">
                <Card className="glass-effect border-white/20">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Form Adopsi Pohon</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Nama Pengadopsi
                        </label>
                        <Input
                          value={formData.adopterName}
                          onChange={(e) => setFormData({...formData, adopterName: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Masukkan nama Anda"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Nomor Telepon
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="+62 812 3456 7890"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Trees className="w-4 h-4 inline mr-2" />
                          Nama untuk Pohon
                        </label>
                        <Input
                          value={formData.treeName}
                          onChange={(e) => setFormData({...formData, treeName: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Beri nama pohon Anda"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Pesan (Opsional)
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Tulis pesan atau alasan adopsi pohon..."
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-white/5 rounded-lg">
                      <div className="flex justify-between items-center text-white">
                        <span className="text-lg">Total Adopsi:</span>
                        <span className="text-2xl font-bold text-green-400">
                          Rp{tree.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleAdopt}
                      className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg"
                    >
                      <Leaf className="w-5 h-5 mr-2" />
                      Lanjutkan ke Pembayaran
                    </Button>

                    <p className="text-xs text-gray-400 mt-4 text-center">
                      Dengan mengadopsi pohon, Anda setuju dengan syarat dan ketentuan yang berlaku
                    </p>
                  </CardContent>
                </Card>

                {/* Additional Info */}
                <Card className="glass-effect border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Yang Akan Anda Terima:</h3>
                    <div className="space-y-3 text-gray-200">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <span>Sertifikat adopsi pohon digital</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <span>Update progress pohon bulanan</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <span>Akses ke dashboard monitoring</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <span>Laporan dampak lingkungan</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPohon;
