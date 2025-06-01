import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trees, Download, Calendar, MapPin, Award, TrendingUp, Leaf } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const storedCertificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    setCertificates(storedCertificates);
  }, []);

  const downloadCertificate = (certificate: any) => {
    // In a real app, this would generate and download a PDF certificate
    const blob = new Blob([`
      SERTIFIKAT ADOPSI POHON
      
      ID Sertifikat: ${certificate.certificateId}
      Nama Pengadopsi: ${certificate.adopterName}
      Nama Pohon: ${certificate.treeName}
      Jenis Pohon: ${certificate.treeType}
      Lokasi: ${certificate.location}
      Tanggal Adopsi: ${certificate.adoptionDate}
      Jumlah Donasi: Rp${certificate.amount.toLocaleString('id-ID')}
      
      Terima kasih telah berkontribusi untuk bumi yang lebih hijau!
    `], { type: 'text/plain' });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sertifikat-${certificate.certificateId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const monthlyUpdates = [
    {
      month: 'Januari 2024',
      trees: [
        {
          name: 'Jati Berkah',
          type: 'Pohon Jati',
          height: '45 cm',
          status: 'Sehat',
          image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=80'
        }
      ]
    },
    {
      month: 'Februari 2024',
      trees: [
        {
          name: 'Jati Berkah',
          type: 'Pohon Jati',
          height: '52 cm',
          status: 'Berkembang Baik',
          image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=300&q=80'
        }
      ]
    },
    {
      month: 'Maret 2024',
      trees: [
        {
          name: 'Jati Berkah',
          type: 'Pohon Jati',
          height: '61 cm',
          status: 'Sangat Sehat',
          image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=300&q=80'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen forest-bg">
      <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40">
        <Navbar />
        
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                Dashboard Saya
              </h1>
              <p className="text-gray-200">
                Pantau perkembangan pohon yang telah Anda adopsi
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-effect border-white/20 text-center p-6">
                <Trees className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{certificates.length}</div>
                <div className="text-gray-300 text-sm">Pohon Teradopsi</div>
              </Card>
              
              <Card className="glass-effect border-white/20 text-center p-6">
                <Leaf className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{certificates.length * 48}</div>
                <div className="text-gray-300 text-sm">kg CO₂/tahun</div>
              </Card>
              
              <Card className="glass-effect border-white/20 text-center p-6">
                <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-gray-300 text-sm">Bulan Adopsi</div>
              </Card>
              
              <Card className="glass-effect border-white/20 text-center p-6">
                <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{certificates.length}</div>
                <div className="text-gray-300 text-sm">Sertifikat</div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Monthly Progress */}
              <Card className="glass-effect border-white/20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Laporan Bulanan Pohon
                  </h2>
                  
                  <div className="space-y-6">
                    {monthlyUpdates.map((update, index) => (
                      <div key={index} className="border-l-2 border-green-400 pl-4">
                        <h3 className="font-semibold text-white mb-3">{update.month}</h3>
                        {update.trees.map((tree, treeIndex) => (
                          <div key={treeIndex} className="flex gap-4 mb-4">
                            <img 
                              src={tree.image} 
                              alt={tree.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-white">{tree.name}</h4>
                              <p className="text-gray-300 text-sm">{tree.type}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="text-green-400 border-green-400">
                                  Tinggi: {tree.height}
                                </Badge>
                                <Badge variant="outline" className="text-blue-400 border-blue-400">
                                  {tree.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certificates */}
              <Card className="glass-effect border-white/20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Sertifikat Adopsi
                  </h2>
                  
                  {certificates.length === 0 ? (
                    <div className="text-center py-8">
                      <Trees className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-4">Belum ada pohon yang diadopsi</p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Adopsi Pohon Pertama
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {certificates.map((cert: any, index) => (
                        <Card key={index} className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-semibold text-white">{cert.treeName}</h3>
                                <p className="text-gray-300 text-sm">{cert.treeType}</p>
                                <div className="flex items-center text-gray-400 text-xs mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {cert.location}
                                </div>
                              </div>
                              <Badge className="bg-green-600 text-white">
                                {cert.certificateId}
                              </Badge>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-300">
                                Adopsi: {cert.adoptionDate}
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                                onClick={() => downloadCertificate(cert)}
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Environmental Impact */}
            <Card className="glass-effect border-white/20 mt-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">Dampak Lingkungan Anda</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {certificates.length * 48} kg
                    </div>
                    <div className="text-gray-300">CO₂ Diserap per Tahun</div>
                    <p className="text-xs text-gray-400 mt-2">
                      Setara dengan emisi kendaraan sejauh {certificates.length * 200} km
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {certificates.length * 12} L
                    </div>
                    <div className="text-gray-300">Air Hujan Diserap per Hari</div>
                    <p className="text-xs text-gray-400 mt-2">
                      Membantu mencegah banjir dan erosi tanah
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {certificates.length * 5}
                    </div>
                    <div className="text-gray-300">Habitat Satwa Tercipta</div>
                    <p className="text-xs text-gray-400 mt-2">
                      Rumah bagi burung, serangga, dan mamalia kecil
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
