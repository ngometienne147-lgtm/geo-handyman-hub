import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    provider: string;
    image: string;
    category?: string;
    rating?: number;
  };
  onReserve?: (serviceId: string) => void;
  showReserveButton?: boolean;
  index?: number;
}

const ServiceCard = ({ service, onReserve, showReserveButton = false, index = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover-scale"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        {service.category && (
          <motion.div
            className="absolute top-3 left-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Badge className="bg-orange text-orange-foreground shadow-lg">
              {service.category}
            </Badge>
          </motion.div>
        )}

        {/* Rating */}
        {service.rating && (
          <motion.div
            className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex items-center space-x-1">
              <span className="text-orange-400 text-sm">★</span>
              <span className="text-white text-xs font-medium">{service.rating}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {service.title}
        </motion.h3>
        
        <motion.p
          className="text-muted-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          Prestataire : <span className="font-medium text-primary">{service.provider}</span>
        </motion.p>

        {/* Reserve Button */}
        {showReserveButton && onReserve && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Button
              onClick={() => onReserve(service.id)}
              className="w-full bg-orange hover:bg-orange-600 text-orange-foreground shadow-orange transition-all duration-300 rounded-xl font-semibold"
              size="lg"
            >
              Réserver maintenant
            </Button>
          </motion.div>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange/20 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ServiceCard;