import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trees, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (success) {
      toast.success('Login berhasil!');
      navigate('/dashboard');
    } else {
      toast.error('Email atau password salah');
    }
  };

  return (
    <div className="min-h-screen forest-bg">
      <div className="min-h-screen bg-gradient-to-b from-black/50 via-black/30 to-black/50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md glass-effect-dark border-white/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 mb-4">
                <Trees className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">WELCOME</h1>
              <p className="text-gray-300 text-sm">
                masuk dan jadilah berdampak bagi hijau bumi
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Alamat Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Masuk...' : 'Masuk'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Belum memiliki Akun?{' '}
                <Link to="/register" className="text-green-400 hover:text-green-300 underline">
                  Daftar di sini
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">Demo accounts:</p>
              <p className="text-xs text-gray-300">Admin: admin@treeadopt.com / admin123</p>
              <p className="text-xs text-gray-300">User: any email / any password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
