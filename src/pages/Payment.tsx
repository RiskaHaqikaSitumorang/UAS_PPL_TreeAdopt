
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, CreditCard, Wallet, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Certificate from '@/components/Certificate';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Payment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [adoptionData, setAdoptionData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [generatedCertificate, setGeneratedCertificate] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('adoptionData');
    if (storedData) {
      setAdoptionData(JSON.parse(storedData));
    } else {
      navigate('/adopsi-pohon');
    }
  }, [navigate]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Ukuran file maksimal 5MB');
        return;
      }
      setUploadedFile(file);
      toast.success('Bukti pembayaran berhasil diupload');
    }
  };

  const downloadCertificate = () => {
    if (!generatedCertificate) return;
    
    // Create a simple text version for download
    const certificateText = `
SERTIFIKAT ADOPSI POHON
TreeAdopt Indonesia

ID Sertifikat: ${generatedCertificate.certificateId}
Nama Pengadopsi: ${generatedCertificate.adopterName}
Nama Pohon: ${generatedCertificate.treeName}
Jenis Pohon: ${generatedCertificate.treeType}
Lokasi: ${generatedCertificate.location}
Tanggal Adopsi: ${generatedCertificate.adoptionDate}
Jumlah Donasi: Rp${generatedCertificate.amount.toLocaleString('id-ID')}

Dampak Lingkungan:
Pohon ini akan menyerap sekitar 48 kg CO₂ per tahun dan memberikan oksigen untuk 2 orang.

Jakarta, ${new Date().toLocaleDateString('id-ID')}
Direktur TreeAdopt Indonesia

Dr. Budi Santoso

Terima kasih telah berkontribusi untuk bumi yang lebih hijau!
    `;
    
    const blob = new Blob([certificateText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sertifikat-${generatedCertificate.certificateId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handlePayment = async () => {
    if (!uploadedFile) {
      toast.error('Mohon upload bukti pembayaran terlebih dahulu');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate certificate data
    const certificateData = {
      certificateId: `TREE-${Date.now()}`,
      adopterName: adoptionData.formData.adopterName,
      treeName: adoptionData.formData.treeName,
      treeType: adoptionData.tree.name,
      location: adoptionData.tree.location,
      adoptionDate: new Date().toLocaleDateString('id-ID'),
      amount: adoptionData.totalPrice
    };
    
    setGeneratedCertificate(certificateData);
    
    // Store certificate data
    const existingCertificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    existingCertificates.push(certificateData);
    localStorage.setItem('certificates', JSON.stringify(existingCertificates));
    
    setIsProcessing(false);
    setShowCertificate(true);
    toast.success('Pembayaran berhasil! Sertifikat Anda telah diterbitkan.');
  };

  const goToDashboard = () => {
    localStorage.removeItem('adoptionData');
    navigate('/dashboard');
  };

  if (!adoptionData) {
    return (
      <div className="min-h-screen forest-bg">
        <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (showCertificate && generatedCertificate) {
    return (
      <div className="min-h-screen forest-bg">
        <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40">
          <Navbar />
          
          <div className="pt-20 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">🎉 Selamat! Adopsi Berhasil</h1>
                <p className="text-gray-200">
                  Sertifikat adopsi pohon Anda telah berhasil diterbitkan
                </p>
              </div>

              <div className="mb-8">
                <Certificate certificate={generatedCertificate} />
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={downloadCertificate}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Download Sertifikat
                </Button>
                <Button 
                  onClick={goToDashboard}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Lihat Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: 'bank_transfer',
      name: 'Transfer Bank',
      icon: CreditCard,
      details: 'Bank BCA: 1234567890 a.n TreeAdopt Indonesia'
    },
    {
      id: 'e_wallet',
      name: 'E-Wallet',
      icon: Wallet,
      details: 'GoPay/OVO: 081234567890'
    },
    {
      id: 'credit_card',
      name: 'Kartu Kredit',
      icon: CreditCard,
      details: 'Visa, Mastercard, JCB'
    }
  ];

  return (
    <div className="min-h-screen forest-bg">
      <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40">
        <Navbar />
        
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Validasi Pembayaran</h1>
              <p className="text-gray-200">
                Selesaikan pembayaran dan upload bukti transfer untuk mendapatkan sertifikat adopsi pohon
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <Card className="glass-effect border-white/20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Ringkasan Adopsi</h2>
                  
                  <div className="flex gap-4 mb-6">
                    <img 
                      src={adoptionData.tree.image} 
                      alt={adoptionData.tree.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{adoptionData.tree.name}</h3>
                      <p className="text-gray-300 text-sm">{adoptionData.tree.location}</p>
                      <Badge className="bg-green-600 text-white mt-1">
                        {adoptionData.tree.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-200">
                      <span>Nama Pohon:</span>
                      <span className="text-white font-medium">{adoptionData.formData.treeName}</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span>Pengadopsi:</span>
                      <span className="text-white font-medium">{adoptionData.formData.adopterName}</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span>Email:</span>
                      <span className="text-white font-medium">{adoptionData.formData.email}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-white">Total Pembayaran:</span>
                      <span className="text-2xl font-bold text-green-400">
                        Rp{adoptionData.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Form */}
              <Card className="glass-effect border-white/20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Metode Pembayaran</h2>
                  
                  <div className="space-y-4 mb-6">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === method.id 
                            ? 'border-green-400 bg-green-400/10' 
                            : 'border-white/20 bg-white/5'
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <method.icon className="w-5 h-5 text-green-400" />
                          <div className="flex-1">
                            <div className="font-medium text-white">{method.name}</div>
                            <div className="text-sm text-gray-300">{method.details}</div>
                          </div>
                          {paymentMethod === method.id && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment Instructions */}
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-400 mb-2">Instruksi Pembayaran:</h4>
                        <ol className="text-sm text-gray-300 space-y-1">
                          <li>1. Transfer ke rekening yang tertera di atas</li>
                          <li>2. Upload bukti pembayaran di bawah ini</li>
                          <li>3. Klik tombol "Konfirmasi Pembayaran"</li>
                          <li>4. Sertifikat akan diterbitkan otomatis</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Upload Bukti Pembayaran */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Upload Bukti Pembayaran
                    </label>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="payment-proof"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="payment-proof" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-300 mb-2">
                          {uploadedFile ? uploadedFile.name : 'Klik untuk upload bukti pembayaran'}
                        </p>
                        <p className="text-xs text-gray-400">
                          Format: JPG, PNG (Maks. 5MB)
                        </p>
                      </label>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePayment}
                    disabled={!uploadedFile || isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  >
                    {isProcessing ? (
                      'Memproses...'
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Konfirmasi Pembayaran
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-400 mt-4 text-center">
                    Pembayaran akan diverifikasi dalam 1x24 jam. Sertifikat akan diterbitkan otomatis setelah verifikasi.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
