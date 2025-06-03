import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trees, Calendar, MapPin, Award } from 'lucide-react';

interface CertificateProps {
  certificate: {
    _id: string;
    name: string;
    treeName: string;
    treeId?: {
      category?: string;
      location?: string;
      price?: number;
    };
    date: string;
  };
  showBorder?: boolean;
}

const Certificate = ({ certificate, showBorder = true }: CertificateProps) => {
  // Format date for display
  const formattedDate = certificate.date
    ? new Date(certificate.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

  return (
    <Card className={`relative overflow-hidden ${showBorder ? 'border-4 border-green-600' : 'border-0'} bg-gradient-to-br from-green-50 to-emerald-50 max-w-4xl mx-auto`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 opacity-10">
        <div className="w-full h-full bg-green-600 rounded-br-full"></div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
        <div className="w-full h-full bg-green-600 rounded-bl-full"></div>
      </div>

      <CardContent className="relative p-8 text-center">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-green-600 rounded-full">
              <Trees className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">SERTIFIKAT ADOPSI POHON</h1>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-3"></div>
          <p className="text-lg text-green-700 font-medium">TreeAdopt Indonesia</p>
        </div>

        {/* Certificate ID */}
        <div className="mb-6">
          <Badge className="bg-green-600 text-white px-4 py-1 text-base font-semibold">
            ID: {certificate._id || 'Tidak tersedia'}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="mb-6 space-y-4">
          <p className="text-lg text-gray-700">
            Dengan bangga kami menyatakan bahwa
          </p>
          
          <div className="text-2xl font-bold text-green-800 py-3 border-t-2 border-b-2 border-green-300">
            {certificate.name || 'Tidak tersedia'}
          </div>
          
          <p className="text-lg text-gray-700">
            telah berpartisipasi dalam program konservasi lingkungan dengan mengadopsi pohon
          </p>
          
          <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
            <div className="text-xl font-bold text-green-800 mb-1">
              "{certificate.treeName || 'Tidak tersedia'}"
            </div>
            <div className="text-base text-green-700">
              {certificate.treeId?.category || 'Tidak tersedia'}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6 text-left">
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <div className="flex items-center mb-1">
              <Calendar className="w-4 h-4 text-green-600 mr-2" />
              <span className="font-semibold text-green-800 text-sm">Tanggal Adopsi</span>
            </div>
            <p className="text-gray-700 text-sm">{formattedDate}</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <div className="flex items-center mb-1">
              <MapPin className="w-4 h-4 text-green-600 mr-2" />
              <span className="font-semibold text-green-800 text-sm">Lokasi</span>
            </div>
            <p className="text-gray-700 text-sm">{certificate.treeId?.location || 'Tidak tersedia'}</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <div className="flex items-center mb-1">
              <Award className="w-4 h-4 text-green-600 mr-2" />
              <span className="font-semibold text-green-800 text-sm">Kontribusi</span>
            </div>
            <p className="text-gray-700 text-sm">Rp{(certificate.treeId?.price || 0).toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Signature Section */}
        <div className="flex justify-between items-end pt-6 border-t-2 border-green-200">
          <div className="text-left">
            <p className="text-gray-600 mb-1 text-sm">Jakarta, {new Date().toLocaleDateString('id-ID')}</p>
            <p className="text-gray-600 mb-4 text-sm">Direktur TreeAdopt Indonesia</p>
            
            {/* Signature */}
            <div className="mb-2">
              <svg width="120" height="40" viewBox="0 0 120 40" className="text-green-800">
                <path
                  d="M10 30 Q20 15 30 25 T50 20 Q60 10 70 25 Q80 15 90 30 Q100 20 110 25"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            <div className="w-28 h-0.5 bg-green-600 mb-1"></div>
            <p className="text-sm font-semibold text-green-800">Dr. Budi Santoso</p>
          </div>
          
          <div className="text-right">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-2">
              <Trees className="w-8 h-8 text-white" />
            </div>
            <p className="text-xs text-gray-600">Stempel Resmi</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-green-200">
          <p className="text-xs text-gray-600">
            Sertifikat ini dikeluarkan secara digital oleh TreeAdopt Indonesia sebagai bukti partisipasi
            dalam program konservasi hutan dan lingkungan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Certificate;