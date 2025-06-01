
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trees, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Trees className="w-8 h-8 text-green-400" />
            <span className="text-xl font-bold text-white">TreeAdopt</span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Beranda
              </Link>
              {user?.role !== 'admin' && (
                <>
                  <Link to="/adopsi-pohon" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Adopsi Pohon
                  </Link>
                  <a href="#" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Edukasi
                  </a>
                </>
              )}
              {user && (
                <Link to="/dashboard" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {user.role === 'admin' ? 'Dashboard Admin' : 'Dashboard Saya'}
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Kelola Pohon
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-green-400">
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black/80 border-white/20 text-white">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-green-400">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Daftar
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-green-400 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/20">
              <Link to="/" className="text-white hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                Beranda
              </Link>
              {user?.role !== 'admin' && (
                <>
                  <Link to="/adopsi-pohon" className="text-white hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                    Adopsi Pohon
                  </Link>
                  <a href="#" className="text-white hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                    Edukasi
                  </a>
                </>
              )}
              {user && (
                <Link to="/dashboard" className="text-white hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                  {user.role === 'admin' ? 'Dashboard Admin' : 'Dashboard Saya'}
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-white hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                  Kelola Pohon
                </Link>
              )}
              {!user && (
                <div className="space-y-2 pt-4">
                  <Link to="/login">
                    <Button variant="ghost" className="w-full text-white hover:text-green-400">
                      Masuk
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Daftar
                    </Button>
                  </Link>
                </div>
              )}
              {user && (
                <div className="pt-4 space-y-2">
                  <div className="text-white px-3 py-2">
                    Halo, {user.name}
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full text-white hover:text-green-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
