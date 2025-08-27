import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

interface ServicesSectionProps {
  onReserve?: (serviceId: string) => void;
  showReserveButtons?: boolean;
}

const ServicesSection = ({ onReserve, showReserveButtons = false }: ServicesSectionProps) => {
  const services = [
    {
      id: 'electricite',
      title: 'Électricité',
      provider: 'David Electric',
      image: 'https://cdn.pixabay.com/photo/2015/12/07/10/55/electric-1080584_1280.jpg',
      category: 'Technique',
      rating: 4.8,
    },
    {
      id: 'plomberie',
      title: 'Plomberie à domicile',
      provider: 'Propre & Net',
      image: 'https://media.istockphoto.com/id/1835093714/fr/photo/plombier-homme-noir-entretien-de-la-cuisine-et-de-l%C3%A9vier-avec-outils-mise-au-point-et.jpg?s=612x612&w=0&k=20&c=_z6vm0Z33Y4Co5pmMPCIEIw0lcOKxKf4-o8K2RsCZiI=',
      category: 'Réparation',
      rating: 4.9,
    },
    {
      id: 'menage',
      title: 'Ménage à domicile',
      provider: 'Aqua Service',
      image: 'https://lessaintes.fr/wp-content/uploads/2024/06/menage-domicile.jpg',
      category: 'Entretien',
      rating: 4.7,
    },
    {
      id: 'jardinage',
      title: 'Jardinage & Entretien',
      provider: 'Vert Nature',
      image: 'https://img.freepik.com/photos-premium/jolie-jeune-portrait-jardinier-africain-serre_255667-10041.jpg',
      category: 'Jardinage',
      rating: 4.6,
    },
    {
      id: 'informatique',
      title: 'Dépannage Informatique',
      provider: 'PC Express',
      image: 'https://th.bing.com/th/id/R.25ee7bf8408679e04f87a5b2c009488c?rik=TpS6Ww8YXY1iFA&pid=ImgRaw&r=0',
      category: 'Technique',
      rating: 4.5,
    },
    {
      id: 'chauffe-eau',
      title: 'Réparation des chauffe-eau',
      provider: 'Jordan Marc',
      image: 'https://tse2.mm.bing.net/th/id/OIP.ciUAx9eMOWj5fSEtzvs50gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
      category: 'Réparation',
      rating: 4.8,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Nos services populaires
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les services les plus demandés par nos clients
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              onReserve={onReserve}
              showReserveButton={showReserveButtons}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="bg-primary hover:bg-primary-700 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir tous les services
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;