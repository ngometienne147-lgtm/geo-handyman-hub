import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LogIn, UserPlus, Briefcase } from 'lucide-react';

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

  const authButtons = [
    { id: 'login', label: 'Connexion', variant: 'outline' as const, icon: LogIn },
    { id: 'register-client', label: 'Inscription', variant: 'outline' as const, icon: UserPlus },
    { id: 'register-provider', label: 'Devenir prestataire', variant: 'default' as const, icon: Briefcase },
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

          {/* Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            {authButtons.map((button) => {
              const IconComponent = button.icon;
              return (
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
                      transition-all duration-300 font-semibold px-4 py-2 rounded-full flex items-center gap-2
                    `}
                  >
                    <IconComponent className="h-4 w-4" />
                    {button.label}
                  </Button>
                </motion.div>
              );
            })}
            <ThemeToggle />
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
                {authButtons.map((button) => {
                  const IconComponent = button.icon;
                  return (
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
                        transition-all duration-300 font-semibold rounded-full flex items-center gap-2
                      `}
                    >
                      <IconComponent className="h-4 w-4" />
                      {button.label}
                    </Button>
                  );
                })}
                <div className="flex justify-center pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;