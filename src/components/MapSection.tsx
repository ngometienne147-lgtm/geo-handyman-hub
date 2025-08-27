import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  const providers = [
    {
      name: 'Jordan Marc',
      service: 'Réparation chauffe-eau',
      lat: 4.07,
      lng: 9.73,
      rating: 4.8,
    },
    {
      name: 'KAMANI NOUPOUE Martin Merlin',
      service: 'Déclaration des revenus',
      lat: 4.071,
      lng: 9.731,
      rating: 4.7,
    },
    {
      name: 'David Electric',
      service: 'Services d\'électricité',
      lat: 4.068,
      lng: 9.728,
      rating: 4.9,
    },
    {
      name: 'Propre & Net',
      service: 'Ménage à domicile',
      lat: 4.072,
      lng: 9.735,
      rating: 4.6,
    },
    {
      name: 'Aqua Service',
      service: 'Services de plomberie',
      lat: 4.065,
      lng: 9.732,
      rating: 4.8,
    },
    {
      name: 'Vert Nature',
      service: 'Jardinage & Entretien',
      lat: 4.075,
      lng: 9.725,
      rating: 4.5,
    },
    {
      name: 'PC Express',
      service: 'Dépannage Informatique',
      lat: 4.069,
      lng: 9.738,
      rating: 4.7,
    },
  ];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    const centerCoord: [number, number] = [4.07, 9.73];
    map.current = L.map(mapContainer.current).setView(centerCoord, 14);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.current);

    // Add markers for each provider
    providers.forEach((provider, index) => {
      const marker = L.marker([provider.lat, provider.lng]).addTo(map.current!);
      
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #2C3E50;">
            ${provider.name}
          </h3>
          <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
            ${provider.service}
          </p>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="color: #F39C12; font-size: 14px;">★</span>
            <span style="font-size: 14px; font-weight: 500;">${provider.rating}</span>
          </div>
          <button 
            style="
              background: #F39C12; 
              color: white; 
              border: none; 
              padding: 8px 16px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: 600; 
              cursor: pointer; 
              margin-top: 8px;
              transition: background 0.3s;
            "
            onmouseover="this.style.background='#e67e22'"
            onmouseout="this.style.background='#F39C12'"
          >
            Contacter
          </button>
        </div>
      `;
      
      marker.bindPopup(popupContent);

      // Open first popup by default
      if (index === 0) {
        setTimeout(() => marker.openPopup(), 1000);
      }
    });

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

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
            Retrouvez nos prestataires 🗺️
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les prestataires disponibles près de chez vous
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-card rounded-3xl p-4 shadow-large">
            <div
              ref={mapContainer}
              className="h-[500px] w-full rounded-2xl overflow-hidden shadow-medium"
              style={{ minHeight: '500px' }}
            />
          </div>
          
          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-orange rounded-full opacity-80"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full opacity-60"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { label: 'Prestataires', value: '500+', icon: '👥' },
            { label: 'Services', value: '100+', icon: '🔧' },
            { label: 'Villes', value: '4', icon: '🏙️' },
            { label: 'Satisfaction', value: '98%', icon: '⭐' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center bg-card rounded-2xl p-6 shadow-soft hover-scale"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;