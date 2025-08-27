import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import ServicesSection from '@/components/ServicesSection';
import MapSection from '@/components/MapSection';
import TestimonialsSection from '@/components/TestimonialsSection';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <HowItWorks />
      <ServicesSection />
      <MapSection />
      <TestimonialsSection />
    </motion.div>
  );
};

export default HomePage;