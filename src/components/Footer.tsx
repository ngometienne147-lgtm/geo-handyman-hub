import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Services',
      links: [
        'Électricité',
        'Plomberie', 
        'Ménage',
        'Jardinage',
        'Informatique'
      ]
    },
    {
      title: 'Zones Couvertes',
      links: [
        'Douala',
        'Yaoundé',
        'Bafoussam',
        'Garoua'
      ]
    },
    {
      title: 'Support',
      links: [
        'Centre d\'aide',
        'FAQ',
        'Contact',
        'Conditions d\'utilisation',
        'Politique de confidentialité'
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-orange">GeoService</h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed max-w-md">
              Connecter les clients et les prestataires de services de manière simple et sécurisée au Cameroun.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Mail className="w-5 h-5 text-orange" />
                <span className="text-primary-foreground/80">contact@geoservice.com</span>
              </motion.div>
              
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Phone className="w-5 h-5 text-orange" />
                <span className="text-primary-foreground/80">+237 6 XX XX XX XX</span>
              </motion.div>
              
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <MapPin className="w-5 h-5 text-orange" />
                <span className="text-primary-foreground/80">Douala, Cameroun</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Links Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-orange">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <motion.a
                      href="#"
                      className="text-primary-foreground/80 hover:text-orange transition-colors duration-300 block"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6 mt-12 pt-8 border-t border-primary-600/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.url}
                className="w-12 h-12 bg-primary-700 hover:bg-orange rounded-full flex items-center justify-center transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              >
                <IconComponent className="w-5 h-5 text-primary-foreground group-hover:text-orange-foreground transition-colors" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-primary-600/30 py-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              &copy; 2025 GeoService. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <motion.a
                href="#"
                className="text-primary-foreground/60 hover:text-orange transition-colors"
                whileHover={{ y: -1 }}
              >
                Mentions Légales
              </motion.a>
              <motion.a
                href="#"
                className="text-primary-foreground/60 hover:text-orange transition-colors"
                whileHover={{ y: -1 }}
              >
                Politique de confidentialité
              </motion.a>
              <motion.a
                href="#"
                className="text-primary-foreground/60 hover:text-orange transition-colors"
                whileHover={{ y: -1 }}
              >
                CGU
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-20 left-10 w-2 h-2 bg-orange/30 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-1.5 h-1.5 bg-primary-foreground/20 rounded-full"
        animate={{ scale: [1.5, 1, 1.5], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />
    </footer>
  );
};

export default Footer;