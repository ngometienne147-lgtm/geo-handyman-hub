import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Kouam',
      location: 'Douala',
      service: 'Plomberie',
      rating: 5,
      text: 'Excellent service ! J\'ai trouvé un plombier compétent en quelques minutes. Je recommande GeoService.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Jean Paul Mbarga',
      location: 'Yaoundé',
      service: 'Électricité',
      rating: 5,
      text: 'Service rapide et professionnel. L\'électricien était très compétent et le prix était raisonnable.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Fatima Nkomo',
      location: 'Bafoussam',
      service: 'Ménage',
      rating: 5,
      text: 'Équipe très professionnelle pour le ménage. Ma maison n\'a jamais été aussi propre !',
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face'
    }
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
            Ce que nos clients disent
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="relative bg-card rounded-3xl p-8 shadow-soft hover-scale group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              
              {/* Quote Icon */}
              <motion.div
                className="absolute -top-4 left-8 w-8 h-8 bg-orange rounded-full flex items-center justify-center shadow-orange"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2, type: "spring" }}
              >
                <Quote className="w-4 h-4 text-orange-foreground" />
              </motion.div>

              {/* Stars */}
              <motion.div
                className="flex items-center space-x-1 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.2 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-orange text-orange" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Testimonial Text */}
              <motion.p
                className="text-card-foreground mb-6 leading-relaxed italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
              >
                "{testimonial.text}"
              </motion.p>

              {/* User Info */}
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
              >
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange/20"
                  />
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange rounded-full border-2 border-card"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.2 }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location} • {testimonial.service}</p>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute top-6 right-6 w-2 h-2 bg-orange/30 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              />
              <motion.div
                className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-primary/20 rounded-full"
                animate={{ scale: [1.5, 1, 1.5], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 + index * 0.3 }}
              />

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-orange/20 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
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
            Rejoignez des milliers de clients satisfaits
          </p>
          <motion.button
            className="bg-orange hover:bg-orange-600 text-orange-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-orange transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer maintenant
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;