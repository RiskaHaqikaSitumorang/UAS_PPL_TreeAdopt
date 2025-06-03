import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle, Leaf, Trees, User, Mail, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const DetailPohon = () => {
  const { id } = useParams<{ id: string }>();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTree = async () => {
      if (!id) {
        console.error('No tree ID provided in URL');
        toast.error('ID pohon tidak valid');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        console.log(`Fetching tree with ID: ${id}`);
        const response = await axios.get(`http://localhost:5000/api/trees/${id}`);
        console.log('Tree data:', response.data);
        setTree(response.data);
        if (user) {
          setFormData(prev => ({
            ...prev,
            adopterName: user.name || '',
            email: user.email || ''
          }));
        }
      } catch (error: any) {
        console.error('Error fetching tree:', error.response?.data || error.message);
        toast.error(error.response?.status === 404 ? 'Pohon tidak ditemukan' : 'Gagal memuat data pohon');
      } finally {
        setLoading(false);
      }
    };
    fetchTree();
  }, [id, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

    if (!id) {
      console.error('Tree ID is undefined');
      toast.error('ID pohon tidak valid');
      return;
    }

    if (!tree) {
      console.error('Tree data is not loaded', { id });
      toast.error('Data pohon tidak tersedia');
      return;
    }

    console.log(`Navigating to payment with ID: ${id}`, { treeName: tree.name });
    navigate(`/payment/${id}`, {
      state: {
        adopterName: formData.adopterName,
        email: formData.email,
        phone: formData.phone,
        treeName: formData.treeName,
        message: formData.message,
      },
    });
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

  if (!tree) {
    return (
      <div className="min-h-screen forest-bg">
        <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40 flex items-center justify-center">
          <div className="text-white text-xl">Pohon tidak ditemukan</div>
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
                    src={`http://localhost:5000/uploads/${tree.image}`} 
                    alt={tree.name}
                    className="max-w-full h-auto object-cover"
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
                      {tree.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start text-gray-200">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Lokasi Penanaman</h3>
                    <div className="w-full h-48 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-semibold">{tree.location}</p>
                        <p className="text-sm opacity-80">Koordinat: {tree.coordinates?.join(', ') || 'Tidak tersedia'}</p>
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
                          name="adopterName"
                          value={formData.adopterName}
                          onChange={handleInputChange}
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
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
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
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
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
                          name="treeName"
                          value={formData.treeName}
                          onChange={handleInputChange}
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
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
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
                <Card className="glass-effect border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Yang Akan Anda Terima</h3>
                    <div className="space-y-4 text-gray-300">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Sertifikat adopsi pohon digital</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Update progress pohon bulanan</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Akses ke dashboard monitoring</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
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