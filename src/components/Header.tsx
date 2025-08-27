import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header = ({ currentPage, onPageChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
  ];

  const userTypeButtons = [
    { id: 'client', label: 'Client', variant: 'outline' as const },
    { id: 'prestataire', label: 'Prestataire', variant: 'default' as const },
    { id: 'admin', label: 'Admin', variant: 'outline' as const },
  ];

  return (
    <motion.header 
      className="bg-primary shadow-lg sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center cursor-pointer"
            onClick={() => onPageChange('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              GeoService
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`text-primary-foreground hover:text-orange-400 transition-colors duration-300 font-medium ${
                  currentPage === item.id ? 'text-orange-400' : ''
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* User Type Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {userTypeButtons.map((button) => (
              <motion.div key={button.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={button.variant}
                  size="sm"
                  onClick={() => onPageChange(button.id)}
                  className={`
                    ${button.variant === 'default' 
                      ? 'bg-orange hover:bg-orange-600 text-orange-foreground border-0 shadow-orange' 
                      : 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'
                    }
                    transition-all duration-300 font-semibold px-6 py-2 rounded-full
                  `}
                >
                  {button.label}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden py-4 border-t border-primary-600"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="text-primary-foreground hover:text-orange-400 transition-colors text-left py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-primary-600">
                {userTypeButtons.map((button) => (
                  <Button
                    key={button.id}
                    variant={button.variant}
                    size="sm"
                    onClick={() => {
                      onPageChange(button.id);
                      setIsMenuOpen(false);
                    }}
                    className={`
                      ${button.variant === 'default' 
                        ? 'bg-orange hover:bg-orange-600 text-orange-foreground' 
                        : 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'
                      }
                      transition-all duration-300 font-semibold rounded-full
                    `}
                  >
                    {button.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;