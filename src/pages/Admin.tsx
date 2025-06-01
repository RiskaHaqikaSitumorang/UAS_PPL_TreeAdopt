import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Trees, Users, Award, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Admin = () => {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [trees, setTrees] = useState([
    {
      id: 1,
      name: 'Pohon Jati',
      category: 'Pencegahan Erosi',
      price: 250000,
      location: 'Jakarta Selatan',
      status: 'Tersedia',
      adopted: 45
    },
    {
      id: 2,
      name: 'Pohon Mangrove',
      category: 'Ekosistem Vital',
      price: 175000,
      location: 'Pantai Utara Jakarta',
      status: 'Tersedia',
      adopted: 32
    }
  ]);
  
  const [newTree, setNewTree] = useState({
    name: '',
    category: '',
    price: '',
    location: '',
    description: '',
    benefits: ''
  });

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen forest-bg">
        <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40 flex items-center justify-center">
          <Card className="glass-effect border-white/20 p-8">
            <div className="text-center text-white">
              <h1 className="text-2xl font-bold mb-4">Akses Ditolak</h1>
              <p>Anda tidak memiliki izin untuk mengakses halaman admin.</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const handleAddTree = () => {
    if (!newTree.name || !newTree.category || !newTree.price || !newTree.location) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    const tree = {
      id: Date.now(),
      name: newTree.name,
      category: newTree.category,
      price: parseInt(newTree.price),
      location: newTree.location,
      status: 'Tersedia',
      adopted: 0
    };

    setTrees([...trees, tree]);
    setNewTree({
      name: '',
      category: '',
      price: '',
      location: '',
      description: '',
      benefits: ''
    });
    setShowAddForm(false);
    toast.success('Pohon berhasil ditambahkan');
  };

  const deleteTree = (id: number) => {
    setTrees(trees.filter(tree => tree.id !== id));
    toast.success('Pohon berhasil dihapus');
  };

  return (
    <div className="min-h-screen forest-bg">
      <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40">
        <Navbar />
        
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                Admin Dashboard
              </h1>
              <p className="text-gray-200">
                Kelola pohon dan pantau adopsi secara keseluruhan
              </p>
            </div>

            {/* Admin Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-effect border-white/20 text-center p-6">
                <Trees className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{trees.length}</div>
                <div className="text-gray-300 text-sm">Total Pohon</div>
              </Card>
              
              <Card className="glass-effect border-white/20 text-center p-6">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{trees.reduce((sum, tree) => sum + tree.adopted, 0)}</div>
                <div className="text-gray-300 text-sm">Total Adopsi</div>
              </Card>
              
              <Card className="glass-effect border-white/20 text-center p-6">
                <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">89</div>
                <div className="text-gray-300 text-sm">Sertifikat Terbit</div>
              </Card>
              
              <Card className="glass-effect border-white/20 text-center p-6">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">Rp52.5M</div>
                <div className="text-gray-300 text-sm">Total Revenue</div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Tree Management */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-effect border-white/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-white">Manajemen Pohon</h2>
                      <Button 
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Pohon
                      </Button>
                    </div>

                    {showAddForm && (
                      <Card className="bg-white/5 border-white/10 mb-6">
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold text-white mb-4">Tambah Pohon Baru</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <Input
                              placeholder="Nama Pohon"
                              value={newTree.name}
                              onChange={(e) => setNewTree({...newTree, name: e.target.value})}
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            />
                            <Select onValueChange={(value) => setNewTree({...newTree, category: value})}>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Kategori" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-white/20 text-white">
                                <SelectItem value="Pencegahan Erosi">Pencegahan Erosi</SelectItem>
                                <SelectItem value="Ekosistem Vital">Ekosistem Vital</SelectItem>
                                <SelectItem value="Menghasilkan Buah">Menghasilkan Buah</SelectItem>
                                <SelectItem value="Konservasi">Konservasi</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="Harga (Rp)"
                              type="number"
                              value={newTree.price}
                              onChange={(e) => setNewTree({...newTree, price: e.target.value})}
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            />
                            <Input
                              placeholder="Lokasi"
                              value={newTree.location}
                              onChange={(e) => setNewTree({...newTree, location: e.target.value})}
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            />
                            <div className="md:col-span-2">
                              <Textarea
                                placeholder="Deskripsi pohon"
                                value={newTree.description}
                                onChange={(e) => setNewTree({...newTree, description: e.target.value})}
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Textarea
                                placeholder="Manfaat pohon (pisahkan dengan koma)"
                                value={newTree.benefits}
                                onChange={(e) => setNewTree({...newTree, benefits: e.target.value})}
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button onClick={handleAddTree} className="bg-green-600 hover:bg-green-700">
                              Simpan
                            </Button>
                            <Button variant="outline" onClick={() => setShowAddForm(false)}>
                              Batal
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="space-y-4">
                      {trees.map((tree) => (
                        <Card key={tree.id} className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-white">{tree.name}</h3>
                                  <Badge className="bg-green-600 text-white">
                                    {tree.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-green-400 border-green-400">
                                    {tree.status}
                                  </Badge>
                                </div>
                                <p className="text-gray-300 text-sm mb-1">{tree.location}</p>
                                <div className="flex gap-4 text-sm">
                                  <span className="text-green-400 font-semibold">
                                    Rp{tree.price.toLocaleString('id-ID')}
                                  </span>
                                  <span className="text-gray-400">
                                    {tree.adopted} adopsi
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="border-blue-400 text-blue-400">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="border-red-400 text-red-400"
                                  onClick={() => deleteTree(tree.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="space-y-6">
                <Card className="glass-effect border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Kelola Pengguna
                      </Button>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                        <Award className="w-4 h-4 mr-2" />
                        Generate Laporan
                      </Button>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Analisis Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Aktivitas Terbaru</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Adopsi baru</span>
                        <span className="text-green-400">+3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Sertifikat terbit</span>
                        <span className="text-blue-400">+5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Revenue hari ini</span>
                        <span className="text-yellow-400">Rp1.2M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Pengguna baru</span>
                        <span className="text-purple-400">+8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
