import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, User, Calendar, CreditCard } from 'lucide-react';

interface ReservationRequest {
  id: string;
  service: string;
  clientName: string;
  date: string;
  price: number;
  status: 'pending' | 'accepted' | 'refused';
  address: string;
  phone: string;
}

const ProviderPage = () => {
  const [requests, setRequests] = useState<ReservationRequest[]>([
    {
      id: 'req-1',
      service: 'Électricité',
      clientName: 'Jean Dupont',
      date: '2025-01-15',
      price: 25000,
      status: 'pending',
      address: 'Akwa, Douala',
      phone: '+237 6 XX XX XX XX'
    },
    {
      id: 'req-2',
      service: 'Réparation chauffe-eau',
      clientName: 'Marie Kouam',
      date: '2025-01-16',
      price: 40000,
      status: 'pending',
      address: 'Bonanjo, Douala',
      phone: '+237 6 YY YY YY YY'
    }
  ]);

  const [stats, setStats] = useState({
    totalRequests: 0,
    acceptedRequests: 0,
    revenue: 0
  });

  useEffect(() => {
    const total = requests.length;
    const accepted = requests.filter(req => req.status === 'accepted').length;
    const revenue = requests
      .filter(req => req.status === 'accepted')
      .reduce((sum, req) => sum + req.price, 0);

    setStats({ totalRequests: total, acceptedRequests: accepted, revenue });
  }, [requests]);

  const handleAccept = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' } : req
      )
    );
  };

  const handleRefuse = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'refused' } : req
      )
    );
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const processedRequests = requests.filter(req => req.status !== 'pending');

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
            Espace Prestataire
          </h1>
          <p className="text-xl text-muted-foreground">
            Gérez vos demandes de réservation et votre activité
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Demandes totales
              </CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{stats.totalRequests}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Demandes acceptées
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.acceptedRequests}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">
                Revenus
              </CardTitle>
              <CreditCard className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">
                {stats.revenue.toLocaleString()} FCFA
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Requests */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-primary mb-6">
            Demandes en attente
          </h2>
          
          {pendingRequests.length === 0 ? (
            <motion.div
              className="bg-card rounded-3xl p-8 shadow-soft text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">
                Aucune nouvelle demande de réservation pour le moment.
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {pendingRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  className="bg-card rounded-3xl p-6 shadow-soft hover-scale"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-card-foreground">
                          {request.service}
                        </h3>
                        <Badge className="bg-orange text-orange-foreground">
                          Nouvelle demande
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span><strong>Client :</strong> {request.clientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span><strong>Date :</strong> {request.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          <span><strong>Prix :</strong> {request.price.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span><strong>Adresse :</strong> {request.address}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() => handleAccept(request.id)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          Accepter
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          onClick={() => handleRefuse(request.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Refuser
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Processed Requests */}
        {processedRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-primary mb-6">
              Historique des demandes
            </h2>
            
            <div className="grid gap-4">
              {processedRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  className="bg-card rounded-2xl p-4 shadow-soft border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        {request.service} - {request.clientName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {request.date} • {request.price.toLocaleString()} FCFA
                      </p>
                    </div>
                    <Badge 
                      className={
                        request.status === 'accepted' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }
                    >
                      {request.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProviderPage;