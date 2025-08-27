import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  CheckCircle,
  XCircle,
  Trash2,
  UserCheck,
  UserX
} from 'lucide-react';

interface Reservation {
  id: string;
  service: string;
  client: string;
  provider: string;
  status: 'pending' | 'accepted' | 'refused' | 'completed';
  date: string;
  price: number;
}

interface Provider {
  id: string;
  name: string;
  service: string;
  rating: number;
  status: 'active' | 'inactive' | 'pending';
  totalJobs: number;
}

const AdminPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'res-1',
      service: 'Électricité',
      client: 'Jean Dupont',
      provider: 'David Electric',
      status: 'pending',
      date: '2025-01-15',
      price: 25000
    },
    {
      id: 'res-2',
      service: 'Plomberie',
      client: 'Marie Kouam',
      provider: 'Propre & Net',
      status: 'accepted',
      date: '2025-01-14',
      price: 30000
    },
    {
      id: 'res-3',
      service: 'Ménage',
      client: 'Paul Mbarga',
      provider: 'Aqua Service',
      status: 'completed',
      date: '2025-01-13',
      price: 15000
    }
  ]);

  const [providers, setProviders] = useState<Provider[]>([
    {
      id: 'prov-1',
      name: 'David Electric',
      service: 'Électricité',
      rating: 4.8,
      status: 'active',
      totalJobs: 156
    },
    {
      id: 'prov-2',
      name: 'Propre & Net',
      service: 'Plomberie',
      rating: 4.9,
      status: 'active',
      totalJobs: 203
    },
    {
      id: 'prov-3',
      name: 'Jordan Marc',
      service: 'Réparation chauffe-eau',
      rating: 4.7,
      status: 'pending',
      totalJobs: 0
    }
  ]);

  const [stats, setStats] = useState({
    totalReservations: 0,
    activeProviders: 0,
    totalRevenue: 0,
    completedJobs: 0
  });

  useEffect(() => {
    const total = reservations.length;
    const active = providers.filter(p => p.status === 'active').length;
    const revenue = reservations
      .filter(r => r.status === 'completed')
      .reduce((sum, r) => sum + r.price, 0);
    const completed = reservations.filter(r => r.status === 'completed').length;

    setStats({
      totalReservations: total,
      activeProviders: active,
      totalRevenue: revenue,
      completedJobs: completed
    });
  }, [reservations, providers]);

  // Reservation actions
  const acceptReservation = (id: string) => {
    setReservations(prev => 
      prev.map(res => 
        res.id === id ? { ...res, status: 'accepted' } : res
      )
    );
  };

  const refuseReservation = (id: string) => {
    setReservations(prev => 
      prev.map(res => 
        res.id === id ? { ...res, status: 'refused' } : res
      )
    );
  };

  const deleteReservation = (id: string) => {
    setReservations(prev => prev.filter(res => res.id !== id));
  };

  // Provider actions
  const approveProvider = (id: string) => {
    setProviders(prev => 
      prev.map(prov => 
        prov.id === id ? { ...prov, status: 'active' } : prov
      )
    );
  };

  const suspendProvider = (id: string) => {
    setProviders(prev => 
      prev.map(prov => 
        prov.id === id ? { ...prov, status: 'inactive' } : prov
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Calendar className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'refused':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange text-orange-foreground';
      case 'accepted':
        return 'bg-blue-500 text-white';
      case 'refused':
        return 'bg-red-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'active':
        return 'bg-green-500 text-white';
      case 'inactive':
        return 'bg-red-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Tableau de bord Admin
          </h1>
          <p className="text-xl text-muted-foreground">
            Gérez les réservations et les prestataires
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Réservations
              </CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{stats.totalReservations}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Prestataires Actifs
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.activeProviders}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">
                Revenus Totaux
              </CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">
                {stats.totalRevenue.toLocaleString()} FCFA
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                Travaux Terminés
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{stats.completedJobs}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Management Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="reservations" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="reservations">Réservations</TabsTrigger>
              <TabsTrigger value="providers">Prestataires</TabsTrigger>
            </TabsList>

            {/* Reservations Tab */}
            <TabsContent value="reservations">
              <motion.div
                className="bg-card rounded-3xl p-8 shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Gestion des réservations
                </h3>
                
                <div className="space-y-4">
                  {reservations.map((reservation, index) => (
                    <motion.div
                      key={reservation.id}
                      className="border border-border rounded-2xl p-6 hover:shadow-soft transition-shadow duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-card-foreground">
                              Réservation #{reservation.id.split('-')[1]}
                            </h4>
                            <Badge className={getStatusColor(reservation.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(reservation.status)}
                                {reservation.status === 'pending' ? 'En attente' :
                                 reservation.status === 'accepted' ? 'Acceptée' :
                                 reservation.status === 'refused' ? 'Refusée' : 'Terminée'}
                              </div>
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
                            <p><strong>Service :</strong> {reservation.service}</p>
                            <p><strong>Client :</strong> {reservation.client}</p>
                            <p><strong>Prestataire :</strong> {reservation.provider}</p>
                            <p><strong>Date :</strong> {reservation.date}</p>
                            <p><strong>Prix :</strong> {reservation.price.toLocaleString()} FCFA</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {reservation.status === 'pending' && (
                            <>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  size="sm"
                                  onClick={() => acceptReservation(reservation.id)}
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Accepter
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => refuseReservation(reservation.id)}
                                  className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Refuser
                                </Button>
                              </motion.div>
                            </>
                          )}
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteReservation(reservation.id)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Providers Tab */}
            <TabsContent value="providers">
              <motion.div
                className="bg-card rounded-3xl p-8 shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Liste des prestataires
                </h3>
                
                <div className="space-y-4">
                  {providers.map((provider, index) => (
                    <motion.div
                      key={provider.id}
                      className="border border-border rounded-2xl p-6 hover:shadow-soft transition-shadow duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-card-foreground">
                              {provider.name}
                            </h4>
                            <Badge className={getStatusColor(provider.status)}>
                              {provider.status === 'active' ? 'Actif' :
                               provider.status === 'inactive' ? 'Suspendu' : 'En attente'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-muted-foreground">
                            <p><strong>Service :</strong> {provider.service}</p>
                            <p><strong>Note :</strong> ⭐ {provider.rating}/5</p>
                            <p><strong>Travaux réalisés :</strong> {provider.totalJobs}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {provider.status === 'pending' && (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                onClick={() => approveProvider(provider.id)}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <UserCheck className="w-4 h-4 mr-1" />
                                Approuver
                              </Button>
                            </motion.div>
                          )}
                          {provider.status === 'active' && (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => suspendProvider(provider.id)}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <UserX className="w-4 h-4 mr-1" />
                                Suspendre
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminPage;