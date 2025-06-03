import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trees, Download, MapPin, Award, TrendingUp, Eye, Users, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Certificate from '@/components/Certificate';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface TreeData {
  category?: string;
  location?: string;
  price?: number;
  co2Absorption?: number;
  oxygenProduction?: number;
  waterAbsorption?: number;
}

interface CertificateData {
  _id: string;
  name: string;
  treeName: string;
  treeId?: TreeData;
  date: string;
  paymentMethod: string;
  certificateUrl?: string | null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [recentCertificates, setRecentCertificates] = useState<CertificateData[]>([]);
  const [stats, setStats] = useState({
    totalAdoptedTrees: 0,
    activeUsers: 0,
    totalCertificates: 0,
    totalCO2Absorbed: 0,
    totalHabitatsCreated: 0,
  });
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        fetchAdminData();
      } else {
        fetchUserData();
      }
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const [treesResponse, certificatesResponse, usersResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/trees', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:5000/api/certificates/all', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const trees = treesResponse.data;
      const certificates: CertificateData[] = certificatesResponse.data;
      const users = usersResponse.data;

      const totalAdoptedTrees = certificates.length;
      const totalCO2Absorbed = certificates.reduce((sum: number, cert: CertificateData) => {
        const co2 = Number(cert.treeId?.co2Absorption) || 48;
        return sum + co2;
      }, 0);
      const totalHabitatsCreated = certificates.length * 5;
      const activeUsers = users.filter((u: any) => u.adoptedTrees?.length > 0).length;

      setStats({
        totalAdoptedTrees,
        activeUsers,
        totalCertificates: certificates.length,
        totalCO2Absorbed,
        totalHabitatsCreated,
      });
      setCertificates(certificates);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal memuat data dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/certificates/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userCertificates: CertificateData[] = response.data;

      const totalAdoptedTrees = userCertificates.length;
      const totalCO2Absorbed = userCertificates.reduce((sum: number, cert: CertificateData) => {
        const co2 = Number(cert.treeId?.co2Absorption) || 48;
        return sum + co2;
      }, 0);
      const totalHabitatsCreated = userCertificates.length * 5;

      setStats({
        totalAdoptedTrees,
        activeUsers: 0,
        totalCertificates: userCertificates.length,
        totalCO2Absorbed,
        totalHabitatsCreated,
      });
      setCertificates(userCertificates);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal memuat data pengguna');
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (certificateId: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus sertifikat ini?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/certificates/${certificateId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update certificates state by filtering out the deleted certificate
      setCertificates(certificates.filter((cert) => cert._id !== certificateId));

      // Update stats
      setStats((prevStats) => ({
        ...prevStats,
        totalAdoptedTrees: prevStats.totalAdoptedTrees - 1,
        totalCertificates: prevStats.totalCertificates - 1,
        totalCO2Absorbed: prevStats.totalCO2Absorbed - (certificates.find((cert) => cert._id === certificateId)?.treeId?.co2Absorption || 48),
        totalHabitatsCreated: prevStats.totalHabitatsCreated - 5,
      }));

      toast.success('Sertifikat berhasil dihapus');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal menghapus sertifikat');
    }
  };

  const downloadCertificate = (certificate: CertificateData) => {
    const certificateText = `
SERTIFIKAT ADOPSI POHON
TreeAdopt Indonesia

ID Sertifikat: ${certificate._id}
Nama Pengadopsi: ${certificate.name}
Nama Pohon: ${certificate.treeName}
Jenis Pohon: ${certificate.treeId?.category || 'Tidak tersedia'}
Lokasi: ${certificate.treeId?.location || 'Tidak tersedia'}
Tanggal Adopsi: ${new Date(certificate.date).toLocaleDateString('id-ID')}
Jumlah Donasi: Rp${(Number(certificate.treeId?.price) || 0).toLocaleString('id-ID')}

Dampak Lingkungan:
Pohon ini akan menyerap sekitar ${Number(certificate.treeId?.co2Absorption) || 48} kg CO₂ per tahun dan memberikan oksigen untuk 2 orang.

Jakarta, ${new Date().toLocaleDateString('id-ID')}
Direktur TreeAdopt Indonesia

Dr. Budi Santoso

Terima kasih telah berkontribusi untuk bumi yang lebih hijau!
    `;
    
    const blob = new Blob([certificateText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sertifikat-${certificate._id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const viewCertificate = (certificate: CertificateData) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
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
              <h1 className="text-3xl font-bold text-white mb-4">
                {user?.role === 'admin' ? 'Dashboard Admin' : 'Dashboard Saya'}
              </h1>
              <p className="text-gray-200">
                {user?.role === 'admin'
                  ? 'Pantau keseluruhan adopsi pohon dan sertifikat yang diterbitkan'
                  : 'Pantau perkembangan pohon yang telah Anda adopsi'}
              </p>
            </div>

            {/* Stats cards section */}
            <div className="flex flex-col items-center mb-12">
              {user?.role === 'admin' ? (
                <div className="grid md:grid-cols-3 gap-6 w-full">
                  <Card className="glass-effect border-white/20 text-center p-6">
                    <Trees className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{stats.totalAdoptedTrees}</div>
                    <div className="text-gray-300 text-sm">Total Pohon Teradopsi</div>
                  </Card>
                  
                  <Card className="glass-effect border-white/20 text-center p-6">
                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
                    <div className="text-gray-300 text-sm">Pengguna Aktif</div>
                  </Card>
                  
                  <Card className="glass-effect border-white/20 text-center p-6">
                    <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{stats.totalCertificates}</div>
                    <div className="text-gray-300 text-sm">Sertifikat</div>
                  </Card>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                  <Card className="glass-effect border-white/20 text-center p-6 w-full md:w-auto md:min-w-[250px]">
                    <Trees className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{stats.totalAdoptedTrees}</div>
                    <div className="text-gray-300 text-sm">Pohon Teradopsi</div>
                  </Card>
                  
                  <Card className="glass-effect border-white/20 text-center p-6 w-full md:w-auto md:min-w-[250px]">
                    <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{stats.totalCertificates}</div>
                    <div className="text-gray-300 text-sm">Sertifikat</div>
                  </Card>
                </div>
              )}
            </div>

            <Card className="glass-effect border-white/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  {user?.role === 'admin' ? 'Manajemen Sertifikat' : 'Sertifikat Adopsi'}
                </h2>
                {certificates.length === 0 && user?.role !== 'admin' ? (
                  <div className="text-center py-12">
                    <p className="text-gray-300 mb-4">Belum ada pohon yang diadopsi</p>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                      <Link to="/adopsi-pohon">Adopsi Pohon Pertama</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {certificates.map((cert) => (
                      <Card key={cert._id} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-white">{cert.treeName}</h3>
                                <Badge className="bg-green-600 text-white">{cert.treeId?.category || 'Tidak tersedia'}</Badge>
                              </div>
                              <p className="text-gray-300 text-sm">{cert.treeId?.location || 'Tidak tersedia'}</p>
                              <p className="text-gray-400 text-sm">{cert._id}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-400 text-green-400"
                                onClick={() => viewCertificate(cert)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Lihat
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-400 text-blue-400"
                                onClick={() => downloadCertificate(cert)}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                PDF
                              </Button>
                              {user?.role === 'admin' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-400 text-red-400"
                                  onClick={() => deleteCertificate(cert._id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Hapus
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/20 mt-12">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  {user?.role === 'admin' ? 'Dampak Lingkungan Keseluruhan' : 'Dampak Lingkungan Anda'}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{stats.totalCO2Absorbed} kg</div>
                    <div className="text-gray-300">CO₂ Diserap per Tahun</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Setara dengan emisi kendaraan sejauh {(Number(stats.totalCO2Absorbed) * 200 / 48).toLocaleString('id-ID')} km
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <Trees className="w-6 h-6 text-green-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{stats.totalHabitatsCreated}</div>
                    <div className="text-gray-300">Habitat Satwa Tercipta</div>
                    <div className="text-sm text-gray-400 mt-1">Rumah bagi burung, serangga, dan mamalia kecil</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {showCertificateModal && selectedCertificate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <Card className="glass-effect border-white/20 max-w-2xl w-full relative">
              <CardContent className="p-6">
                <Button
                  variant="ghost"
                  onClick={() => setShowCertificateModal(false)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                >
                  Tutup
                </Button>
                <div className="max-h-[80vh] overflow-y-auto">
                  <Certificate certificate={selectedCertificate} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;