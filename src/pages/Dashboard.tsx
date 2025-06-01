import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trees, Download, Calendar, MapPin, Award, TrendingUp, Leaf, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Certificate from '@/components/Certificate';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    const storedCertificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    setCertificates(storedCertificates);
  }, []);

  const downloadCertificate = (certificate: any) => {
    // Create a new window/tab to show the certificate for printing/saving as PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Sertifikat Adopsi Pohon - ${certificate.certificateId}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              .no-print { display: none !important; }
              @page { margin: 0; }
              body { margin: 0; }
            }
          </style>
        </head>
        <body class="bg-white">
          <div id="certificate-content"></div>
          <div class="no-print p-4 text-center">
            <button onclick="window.print()" class="bg-green-600 text-white px-6 py-2 rounded-lg mr-4">Print/Save as PDF</button>
            <button onclick="window.close()" class="bg-gray-600 text-white px-6 py-2 rounded-lg">Tutup</button>
          </div>
        </body>
        </html>
      `);
      
      // We'll render the certificate component here using innerHTML
      // This is a simplified version for PDF generation
      const certificateHTML = `
        <div class="max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-600 relative overflow-hidden">
          <!-- Certificate content here -->
          <div class="p-12 text-center relative">
            <div class="mb-8">
              <div class="text-4xl font-bold text-green-800 mb-2">SERTIFIKAT ADOPSI POHON</div>
              <div class="w-32 h-1 bg-green-600 mx-auto mb-4"></div>
              <p class="text-lg text-green-700 font-medium">TreeAdopt Indonesia</p>
            </div>
            
            <div class="mb-8">
              <span class="bg-green-600 text-white px-6 py-2 text-lg font-semibold rounded">
                ID: ${certificate.certificateId}
              </span>
            </div>
            
            <div class="mb-8 space-y-6">
              <p class="text-xl text-gray-700">Dengan bangga kami menyatakan bahwa</p>
              <div class="text-3xl font-bold text-green-800 py-4 border-t-2 border-b-2 border-green-300">
                ${certificate.adopterName}
              </div>
              <p class="text-xl text-gray-700">telah berpartisipasi dalam program konservasi lingkungan dengan mengadopsi pohon</p>
              <div class="bg-green-100 p-6 rounded-lg border-2 border-green-300">
                <div class="text-2xl font-bold text-green-800 mb-2">"${certificate.treeName}"</div>
                <div class="text-lg text-green-700">${certificate.treeType}</div>
              </div>
            </div>
            
            <div class="grid grid-cols-3 gap-6 mb-8">
              <div class="bg-white p-4 rounded-lg border border-green-200">
                <div class="font-semibold text-green-800 mb-2">Tanggal Adopsi</div>
                <p class="text-gray-700">${certificate.adoptionDate}</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-green-200">
                <div class="font-semibold text-green-800 mb-2">Lokasi</div>
                <p class="text-gray-700">${certificate.location}</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-green-200">
                <div class="font-semibold text-green-800 mb-2">Kontribusi</div>
                <p class="text-gray-700">Rp${certificate.amount.toLocaleString('id-ID')}</p>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-lg mb-8">
              <h3 class="text-xl font-bold mb-2">Dampak Lingkungan</h3>
              <p class="text-green-100">Pohon ini akan menyerap sekitar 48 kg CO₂ per tahun dan memberikan oksigen untuk 2 orang. Terima kasih telah berkontribusi untuk bumi yang lebih hijau!</p>
            </div>
            
            <div class="flex justify-between items-end mt-12">
              <div class="text-left">
                <p class="text-gray-600 mb-1">Jakarta, ${new Date().toLocaleDateString('id-ID')}</p>
                <p class="text-gray-600 mb-8">Direktur TreeAdopt Indonesia</p>
                <div class="w-32 h-0.5 bg-green-600 mb-1"></div>
                <p class="text-sm font-semibold text-green-800">Dr. Budi Santoso</p>
              </div>
              <div class="text-right">
                <div class="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mb-2">
                  <span class="text-white text-2xl">🌳</span>
                </div>
                <p class="text-xs text-gray-600">Stempel Resmi</p>
              </div>
            </div>
          </div>
        </div>
      `;
      
      printWindow.document.getElementById('certificate-content').innerHTML = certificateHTML;
      printWindow.document.close();
    }
  };

  const viewCertificate = (certificate: any) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  // Sample certificates for branding (showing other adoptions)
  const brandingCertificates = [
    {
      certificateId: 'TRE-2024-001',
      adopterName: 'PT. Teknologi Hijau Indonesia',
      treeName: 'Hutan Korporat Berkelanjutan',
      adoptionDate: '15 Januari 2024',
      amount: 5000000
    },
    {
      certificateId: 'TRE-2024-015',
      adopterName: 'Yayasan Lingkungan Bersih',
      treeName: 'Mangrove Pantai Indah',
      adoptionDate: '22 Februari 2024',
      amount: 2500000
    },
    {
      certificateId: 'TRE-2024-032',
      adopterName: 'CV. Green Solutions',
      treeName: 'Jati Emas Berkelanjutan',
      adoptionDate: '10 Maret 2024',
      amount: 1750000
    }
  ];

  // ... keep existing code (monthlyUpdates array)
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
                {user?.role === 'admin' ? 'Dashboard Admin' : 'Dashboard Saya'}
              </h1>
              <p className="text-gray-200">
                {user?.role === 'admin' 
                  ? 'Pantau keseluruhan adopsi pohon dan sertifikat yang diterbitkan'
                  : 'Pantau perkembangan pohon yang telah Anda adopsi'
                }
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-effect border-white/20 text-center p-6">
                <Trees className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">
                  {user?.role === 'admin' ? '156' : certificates.length}
                </div>
                <div className="text-gray-300 text-sm">
                  {user?.role === 'admin' ? 'Total Pohon Teradopsi' : 'Pohon Teradopsi'}
                </div>
              </Card>
              
              <Card className="glass-effect border-white/20 text-center p-6">
                <Leaf className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">
                  {user?.role === 'admin' ? '7,488' : certificates.length * 48}
                </div>
                <div className="text-gray-300 text-sm">kg CO₂/tahun</div>
              </Card>
              
              <Card className="glass-effect border-white/20 text-center p-6">
                <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">
                  {user?.role === 'admin' ? '89' : '3'}
                </div>
                <div className="text-gray-300 text-sm">
                  {user?.role === 'admin' ? 'Pengguna Aktif' : 'Bulan Adopsi'}
                </div>
              </Card>
              
              <Card className="glass-effect border-white/20 text-center p-6">
                <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">
                  {user?.role === 'admin' ? '156' : certificates.length}
                </div>
                <div className="text-gray-300 text-sm">Sertifikat</div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Monthly Progress or Branding Certificates */}
              {user?.role === 'admin' ? (
                <Card className="glass-effect border-white/20">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Sertifikat Terbaru yang Diterbitkan
                    </h2>
                    
                    <div className="space-y-4">
                      {brandingCertificates.map((cert, index) => (
                        <Card key={index} className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-semibold text-white">{cert.adopterName}</h3>
                                <p className="text-gray-300 text-sm">{cert.treeName}</p>
                                <div className="flex items-center text-gray-400 text-xs mt-1">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {cert.adoptionDate}
                                </div>
                              </div>
                              <Badge className="bg-green-600 text-white">
                                {cert.certificateId}
                              </Badge>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-green-400 font-semibold">
                                Rp{cert.amount.toLocaleString('id-ID')}
                              </div>
                              <Badge variant="outline" className="text-green-400 border-green-400">
                                Terverifikasi
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
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
              )}

              {/* Certificates */}
              <Card className="glass-effect border-white/20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    {user?.role === 'admin' ? 'Manajemen Sertifikat' : 'Sertifikat Adopsi'}
                  </h2>
                  
                  {certificates.length === 0 && user?.role !== 'admin' ? (
                    <div className="text-center py-8">
                      <Trees className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-4">Belum ada pohon yang diadopsi</p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Adopsi Pohon Pertama
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(user?.role === 'admin' ? brandingCertificates : certificates).map((cert: any, index) => (
                        <Card key={index} className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-semibold text-white">
                                  {cert.treeName || cert.adopterName}
                                </h3>
                                <p className="text-gray-300 text-sm">
                                  {cert.treeType || cert.treeName}
                                </p>
                                <div className="flex items-center text-gray-400 text-xs mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {cert.location || 'Jakarta'}
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
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                                  onClick={() => viewCertificate(cert)}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  Lihat
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                                  onClick={() => downloadCertificate(cert)}
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  PDF
                                </Button>
                              </div>
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
                <h2 className="text-xl font-bold text-white mb-6">
                  {user?.role === 'admin' ? 'Dampak Lingkungan Keseluruhan' : 'Dampak Lingkungan Anda'}
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {user?.role === 'admin' ? '7,488' : certificates.length * 48} kg
                    </div>
                    <div className="text-gray-300">CO₂ Diserap per Tahun</div>
                    <p className="text-xs text-gray-400 mt-2">
                      Setara dengan emisi kendaraan sejauh {user?.role === 'admin' ? '31,200' : certificates.length * 200} km
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {user?.role === 'admin' ? '1,872' : certificates.length * 12} L
                    </div>
                    <div className="text-gray-300">Air Hujan Diserap per Hari</div>
                    <p className="text-xs text-gray-400 mt-2">
                      Membantu mencegah banjir dan erosi tanah
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {user?.role === 'admin' ? '780' : certificates.length * 5}
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

        {/* Certificate Modal */}
        {showCertificateModal && selectedCertificate && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <Button
                  onClick={() => setShowCertificateModal(false)}
                  className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white"
                >
                  Tutup
                </Button>
                <Certificate certificate={selectedCertificate} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
