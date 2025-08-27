import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ServicesSection from '@/components/ServicesSection';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface Reservation {
  id: string;
  service: string;
  provider: string;
  status: 'pending' | 'accepted' | 'refused' | 'completed';
  date: string;
  price: number;
}

const ClientPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleReserve = (serviceId: string) => {
    const serviceMap: { [key: string]: { title: string; provider: string; price: number } } = {
      electricite: { title: 'Électricité', provider: 'David Electric', price: 25000 },
      plomberie: { title: 'Plomberie à domicile', provider: 'Propre & Net', price: 30000 },
      menage: { title: 'Ménage à domicile', provider: 'Aqua Service', price: 15000 },
      jardinage: { title: 'Jardinage & Entretien', provider: 'Vert Nature', price: 20000 },
      informatique: { title: 'Dépannage Informatique', provider: 'PC Express', price: 35000 },
      'chauffe-eau': { title: 'Réparation des chauffe-eau', provider: 'Jordan Marc', price: 40000 },
    };

    const service = serviceMap[serviceId];
    if (service) {
      const newReservation: Reservation = {
        id: `res-${Date.now()}`,
        service: service.title,
        provider: service.provider,
        status: 'pending',
        date: new Date().toLocaleDateString('fr-FR'),
        price: service.price,
      };

      setReservations(prev => [newReservation, ...prev]);
      
      // Simulate reservation confirmation
      setTimeout(() => {
        alert('Réservation confirmée ! Vous recevrez une notification lorsque le prestataire acceptera votre demande.');
      }, 500);
    }
  };

  const getStatusIcon = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'refused':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-orange text-orange-foreground';
      case 'accepted':
        return 'bg-blue-500 text-white';
      case 'refused':
        return 'bg-destructive text-destructive-foreground';
      case 'completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'accepted':
        return 'Acceptée';
      case 'refused':
        return 'Refusée';
      case 'completed':
        return 'Terminée';
      default:
        return status;
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
            Espace Client
          </h1>
          <p className="text-xl text-muted-foreground">
            Trouvez des services et gérez vos réservations
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="services" className="text-sm font-medium">
                Trouver un service
              </TabsTrigger>
              <TabsTrigger value="reservations" className="text-sm font-medium">
                Mes réservations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ServicesSection onReserve={handleReserve} showReserveButtons={true} />
              </motion.div>
            </TabsContent>

            <TabsContent value="reservations">
              <motion.div
                className="bg-card rounded-3xl p-8 shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Mes réservations
                </h3>
                
                {reservations.length === 0 ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-lg">
                      Vous n'avez aucune réservation pour le moment.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Consultez nos services pour faire votre première réservation !
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {reservations.map((reservation, index) => (
                      <motion.div
                        key={reservation.id}
                        className="border border-border rounded-2xl p-6 hover:shadow-soft transition-shadow duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-semibold text-card-foreground">
                                {reservation.service}
                              </h4>
                              <Badge className={getStatusColor(reservation.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(reservation.status)}
                                  {getStatusText(reservation.status)}
                                </div>
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">
                              <strong>Prestataire :</strong> {reservation.provider}
                            </p>
                            <p className="text-muted-foreground">
                              <strong>Date :</strong> {reservation.date}
                            </p>
                            <p className="text-muted-foreground">
                              <strong>Prix :</strong> {reservation.price.toLocaleString()} FCFA
                            </p>
                          </div>
                          
                          {reservation.status === 'accepted' && (
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              Contacter le prestataire
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClientPage;