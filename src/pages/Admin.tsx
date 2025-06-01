
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Trees, Users, Award, Save, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Admin = () => {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTree, setEditingTree] = useState<number | null>(null);
  const [trees, setTrees] = useState([
    {
      id: 1,
      name: 'Pohon Jati Berkah',
      category: 'Pencegahan Erosi',
      price: 250000,
      location: 'Jakarta Selatan',
      status: 'Tersedia',
      adopted: 45,
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=500&q=80',
      description: 'Pohon jati yang berumur 3 tahun dengan tinggi sekitar 2 meter. Sangat baik untuk mencegah erosi tanah.',
      benefits: 'Mencegah erosi tanah, Menyerap karbon, Menghasilkan oksigen, Habitat satwa',
      co2Absorption: 48,
      oxygenProduction: 12,
      waterAbsorption: 15
    },
    {
      id: 2,
      name: 'Pohon Mangrove Lestari',
      category: 'Ekosistem Vital',
      price: 175000,
      location: 'Pantai Utara Jakarta',
      status: 'Tersedia',
      adopted: 32,
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=500&q=80',
      description: 'Pohon mangrove muda yang berperan penting dalam ekosistem pesisir.',
      benefits: 'Melindungi pantai dari abrasi, Habitat ikan dan udang, Menyerap karbon tinggi, Filter air laut',
      co2Absorption: 35,
      oxygenProduction: 8,
      waterAbsorption: 25
    }
  ]);
  
  const [newTree, setNewTree] = useState({
    name: '',
    category: '',
    price: '',
    location: '',
    description: '',
    benefits: '',
    image: '',
    co2Absorption: '',
    oxygenProduction: '',
    waterAbsorption: ''
  });

  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    price: '',
    location: '',
    description: '',
    benefits: '',
    image: '',
    co2Absorption: '',
    oxygenProduction: '',
    waterAbsorption: ''
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
    if (!newTree.name || !newTree.category || !newTree.price || !newTree.location || !newTree.image) {
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
      adopted: 0,
      image: newTree.image,
      description: newTree.description,
      benefits: newTree.benefits,
      co2Absorption: parseInt(newTree.co2Absorption) || 48,
      oxygenProduction: parseInt(newTree.oxygenProduction) || 12,
      waterAbsorption: parseInt(newTree.waterAbsorption) || 15
    };

    setTrees([...trees, tree]);
    setNewTree({
      name: '',
      category: '',
      price: '',
      location: '',
      description: '',
      benefits: '',
      image: '',
      co2Absorption: '',
      oxygenProduction: '',
      waterAbsorption: ''
    });
    setShowAddForm(false);
    toast.success('Pohon berhasil ditambahkan');
  };

  const startEdit = (tree: any) => {
    setEditingTree(tree.id);
    setEditForm({
      name: tree.name,
      category: tree.category,
      price: tree.price.toString(),
      location: tree.location,
      description: tree.description,
      benefits: tree.benefits,
      image: tree.image,
      co2Absorption: tree.co2Absorption.toString(),
      oxygenProduction: tree.oxygenProduction.toString(),
      waterAbsorption: tree.waterAbsorption.toString()
    });
  };

  const saveEdit = () => {
    setTrees(trees.map(tree => 
      tree.id === editingTree 
        ? {
            ...tree,
            name: editForm.name,
            category: editForm.category,
            price: parseInt(editForm.price),
            location: editForm.location,
            description: editForm.description,
            benefits: editForm.benefits,
            image: editForm.image,
            co2Absorption: parseInt(editForm.co2Absorption),
            oxygenProduction: parseInt(editForm.oxygenProduction),
            waterAbsorption: parseInt(editForm.waterAbsorption)
          }
        : tree
    ));
    setEditingTree(null);
    toast.success('Pohon berhasil diperbarui');
  };

  const cancelEdit = () => {
    setEditingTree(null);
    setEditForm({
      name: '',
      category: '',
      price: '',
      location: '',
      description: '',
      benefits: '',
      image: '',
      co2Absorption: '',
      oxygenProduction: '',
      waterAbsorption: ''
    });
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
                Kelola Pohon
              </h1>
              <p className="text-gray-200">
                Tambah, edit, dan kelola pohon yang tersedia untuk adopsi
              </p>
            </div>

            {/* Admin Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
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
            </div>

            {/* Tree Management */}
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
                          <Input
                            placeholder="URL Gambar (https://...)"
                            value={newTree.image}
                            onChange={(e) => setNewTree({...newTree, image: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <Input
                          placeholder="Penyerapan CO₂ (kg/tahun)"
                          type="number"
                          value={newTree.co2Absorption}
                          onChange={(e) => setNewTree({...newTree, co2Absorption: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                        <Input
                          placeholder="Produksi Oksigen (kg/hari)"
                          type="number"
                          value={newTree.oxygenProduction}
                          onChange={(e) => setNewTree({...newTree, oxygenProduction: e.target.value})}
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
                        {editingTree === tree.id ? (
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <Input
                                placeholder="Nama Pohon"
                                value={editForm.name}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                              />
                              <Select onValueChange={(value) => setEditForm({...editForm, category: value})} value={editForm.category}>
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
                                value={editForm.price}
                                onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                              />
                              <Input
                                placeholder="Lokasi"
                                value={editForm.location}
                                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                              />
                              <div className="md:col-span-2">
                                <Input
                                  placeholder="URL Gambar"
                                  value={editForm.image}
                                  onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={saveEdit} className="bg-green-600 hover:bg-green-700">
                                <Save className="w-4 h-4 mr-2" />
                                Simpan
                              </Button>
                              <Button variant="outline" onClick={cancelEdit}>
                                <X className="w-4 h-4 mr-2" />
                                Batal
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-start">
                            <div className="flex gap-4 flex-1">
                              <img 
                                src={tree.image} 
                                alt={tree.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
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
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-blue-400 text-blue-400"
                                onClick={() => startEdit(tree)}
                              >
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
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
