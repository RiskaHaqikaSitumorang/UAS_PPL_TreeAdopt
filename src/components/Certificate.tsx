
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trees, Award, Calendar, MapPin, User, Signature } from 'lucide-react';

interface CertificateProps {
  certificate: {
    certificateId: string;
    adopterName: string;
    treeName: string;
    treeType: string;
    location: string;
    adoptionDate: string;
    amount: number;
  };
  showBorder?: boolean;
}

const Certificate = ({ certificate, showBorder = true }: CertificateProps) => {
  return (
    <Card className={`relative overflow-hidden ${showBorder ? 'border-4 border-green-600' : 'border-0'} bg-gradient-to-br from-green-50 to-emerald-50`}>
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-10">
        <div className="w-full h-full bg-green-600 rounded-br-full"></div>
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <div className="w-full h-full bg-green-600 rounded-bl-full"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-20 h-20 opacity-10">
        <div className="w-full h-full bg-green-600 rounded-tr-full"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10">
        <div className="w-full h-full bg-green-600 rounded-tl-full"></div>
      </div>

      <CardContent className="relative p-12 text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-600 rounded-full">
              <Trees className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">SERTIFIKAT ADOPSI POHON</h1>
          <div className="w-32 h-1 bg-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-green-700 font-medium">TreeAdopt Indonesia</p>
        </div>

        {/* Certificate ID */}
        <div className="mb-8">
          <Badge className="bg-green-600 text-white px-6 py-2 text-lg font-semibold">
            ID: {certificate.certificateId}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="mb-8 space-y-6">
          <p className="text-xl text-gray-700 leading-relaxed">
            Dengan bangga kami menyatakan bahwa
          </p>
          
          <div className="text-3xl font-bold text-green-800 py-4 border-t-2 border-b-2 border-green-300">
            {certificate.adopterName}
          </div>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            telah berpartisipasi dalam program konservasi lingkungan dengan mengadopsi pohon
          </p>
          
          <div className="bg-green-100 p-6 rounded-lg border-2 border-green-300">
            <div className="text-2xl font-bold text-green-800 mb-2">
              "{certificate.treeName}"
            </div>
            <div className="text-lg text-green-700">
              {certificate.treeType}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-800">Tanggal Adopsi</span>
            </div>
            <p className="text-gray-700">{certificate.adoptionDate}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-800">Lokasi</span>
            </div>
            <p className="text-gray-700">{certificate.location}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <Award className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-800">Kontribusi</span>
            </div>
            <p className="text-gray-700">Rp{certificate.amount.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Impact Statement */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-2">Dampak Lingkungan</h3>
          <p className="text-green-100">
            Pohon ini akan menyerap sekitar 48 kg CO₂ per tahun dan memberikan oksigen untuk 2 orang.
            Terima kasih telah berkontribusi untuk bumi yang lebih hijau!
          </p>
        </div>

        {/* Signature Section */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-left">
            <p className="text-gray-600 mb-1">Jakarta, {new Date().toLocaleDateString('id-ID')}</p>
            <p className="text-gray-600 mb-8">Direktur TreeAdopt Indonesia</p>
            <div className="flex items-center">
              <Signature className="w-16 h-8 text-green-600 mr-2" />
              <div>
                <div className="w-32 h-0.5 bg-green-600 mb-1"></div>
                <p className="text-sm font-semibold text-green-800">Dr. Budi Santoso</p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mb-2">
              <Trees className="w-12 h-12 text-white" />
            </div>
            <p className="text-xs text-gray-600">Stempel Resmi</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t-2 border-green-200">
          <p className="text-sm text-gray-600">
            Sertifikat ini dikeluarkan secara digital oleh TreeAdopt Indonesia sebagai bukti partisipasi
            dalam program konservasi hutan dan lingkungan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Certificate;
