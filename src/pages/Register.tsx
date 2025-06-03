
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trees, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    userType: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Nama minimal 3 karakter';
    }

    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Format: 08xxxxxxxxx atau +628xxxxxxxxx';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password = 'Minimal 6 karakter, kombinasi huruf dan angka';
    }

    if (!formData.userType) {
      newErrors.userType = 'Pilih jenis pengguna';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Mohon perbaiki kesalahan pada form');
      return;
    }

    const success = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
      formData.userType
    );
    if (success) {
      navigate('/dashboard');
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
                  placeholder="Nama Lengkap (min. 3 karakter)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 ${errors.name ? 'border-red-500' : ''}`}
                  required
                />
                {errors.name && (
                  <div className="flex items-center mt-1 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="08xxxxxxxxx atau +628xxxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 ${errors.phone ? 'border-red-500' : ''}`}
                  required
                />
                {errors.phone && (
                  <div className="flex items-center mt-1 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.phone}
                  </div>
                )}
              </div>

              <div>
                <Select onValueChange={(value) => setFormData({ ...formData, userType: value })}>
                  <SelectTrigger className={`bg-white/10 border-white/20 text-white ${errors.userType ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Jenis Pengguna" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-white/20 text-white">
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="organization">Organisasi</SelectItem>
                    <SelectItem value="company">Perusahaan</SelectItem>
                  </SelectContent>
                </Select>
                {errors.userType && (
                  <div className="flex items-center mt-1 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.userType}
                  </div>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                  required
                />
                {errors.email && (
                  <div className="flex items-center mt-1 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 karakter, huruf + angka"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {errors.password && (
                  <div className="flex items-center mt-1 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.password}
                  </div>
                )}
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
