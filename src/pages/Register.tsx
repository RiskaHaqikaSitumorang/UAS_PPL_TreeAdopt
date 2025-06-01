import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trees, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    userType: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await register(formData.name, formData.email, formData.password, formData.phone);
    if (success) {
      toast.success('Registrasi berhasil!');
      navigate('/dashboard');
    } else {
      toast.error('Terjadi kesalahan saat registrasi');
    }
  };

  return (
    <div className="min-h-screen forest-bg">
      <div className="min-h-screen bg-gradient-to-b from-black/50 via-black/30 to-black/50 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md glass-effect-dark border-white/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 mb-4">
                <Trees className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Buat Akun</h1>
              <p className="text-gray-300 text-sm">
                buat akunmu dan mulai tangkah kecilmu untuk menghijaukan bumi
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="No Hp"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Select onValueChange={(value) => setFormData({...formData, userType: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Jenis Pengguna" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-white/20 text-white">
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="organization">Organisasi</SelectItem>
                    <SelectItem value="company">Perusahaan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Alamat Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Kata Sandi"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mt-6"
                disabled={isLoading}
              >
                {isLoading ? 'Membuat Akun...' : 'Buat Akun'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Sudah memiliki Akun?{' '}
                <Link to="/login" className="text-green-400 hover:text-green-300 underline">
                  Masuk
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
