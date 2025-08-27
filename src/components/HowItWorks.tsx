import { motion } from 'framer-motion';
import { Search, CreditCard, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Trouvez votre service',
      description: 'Parcourez notre catalogue de services et trouvez le prestataire qui vous convient.',
      icon: Search,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      title: 'Réservez en ligne',
      description: 'Réservez et payez un acompte de 50% en toute sécurité.',
      icon: CreditCard,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      id: 3,
      title: 'Payez le solde',
      description: 'Une fois le service terminé, payez le reste du montant.',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <section className="py-20 bg-background">
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
            Comment ça marche ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Réservez un service en 3 étapes simples
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <motion.div
                key={step.id}
                className="relative text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                
                {/* Connecting Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-muted to-transparent z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                  />
                )}

                {/* Step Container */}
                <motion.div
                  className="relative bg-card rounded-3xl p-8 shadow-soft hover-scale transition-all duration-300 group-hover:shadow-medium"
                  whileHover={{ y: -5 }}
                >
                  
                  {/* Step Number */}
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange text-orange-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-orange"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.2, type: "spring" }}
                  >
                    {step.id}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 ${step.bgColor} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.2, type: "spring" }}
                  >
                    <IconComponent className={`w-10 h-10 ${step.color}`} />
                  </motion.div>

                  {/* Content */}
                  <motion.h3
                    className="text-2xl font-bold text-primary mb-4 group-hover:text-orange transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-orange/30 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary/20 rounded-full"
                    animate={{ scale: [1.5, 1, 1.5], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 + index * 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Prêt à commencer ?
          </p>
          <motion.button
            className="bg-primary hover:bg-primary-700 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-medium transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(44, 62, 80, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Trouver un service
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;