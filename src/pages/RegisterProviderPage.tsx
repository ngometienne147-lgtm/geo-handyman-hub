import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Eye, EyeOff, Upload, X } from 'lucide-react';

interface RegisterProviderPageProps {
  onPageChange: (page: string) => void;
}

const RegisterProviderPage = ({ onPageChange }: RegisterProviderPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    businessName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    description: '',
    experience: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    documents: [] as File[]
  });

  const cameroonCities = [
    'Douala', 'Yaoundé', 'Garoua', 'Bamenda', 'Bafoussam', 'Maroua', 
    'Ngaoundéré', 'Kribi', 'Ebolowa', 'Bertoua', 'Foumban', 'Kumbo', 
    'Mbalmayo', 'Bengui', 'Autre'
  ];

  const availableServices = [
    'Électricité', 'Plomberie', 'Ménage à domicile', 'Jardinage & Entretien',
    'Dépannage Informatique', 'Réparation chauffe-eau', 'Climatisation',
    'Maçonnerie', 'Peinture', 'Menuiserie', 'Soudure', 'Mécanique auto'
  ];

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, documents: [...formData.documents, ...files] });
  };

  const removeDocument = (index: number) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (selectedServices.length === 0) {
      alert('Veuillez sélectionner au moins un service');
      return;
    }
    // Handle registration logic here
    console.log('Provider registration:', { ...formData, services: selectedServices });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-large border-0">
          <CardHeader className="bg-orange text-orange-foreground rounded-t-lg text-center py-8">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Briefcase className="h-6 w-6" />
              Inscription Prestataire
            </CardTitle>
            <CardDescription className="text-orange-foreground/80">
              Rejoignez notre réseau de professionnels
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Nom de l'entreprise / Activité</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre ville" />
                    </SelectTrigger>
                    <SelectContent>
                      {cameroonCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">Quartier</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Services proposés</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableServices.map((service) => (
                    <div
                      key={service}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedServices.includes(service)
                          ? 'bg-orange text-orange-foreground border-orange'
                          : 'border-border hover:bg-accent'
                      }`}
                      onClick={() => handleServiceToggle(service)}
                    >
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
                {selectedServices.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedServices.map((service) => (
                      <Badge key={service} variant="secondary" className="bg-orange text-orange-foreground">
                        {service}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0 text-orange-foreground hover:bg-orange-600"
                          onClick={() => handleServiceToggle(service)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description de votre activité</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez votre expertise et vos services..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Années d'expérience</Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre expérience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 an</SelectItem>
                    <SelectItem value="2-5">2-5 ans</SelectItem>
                    <SelectItem value="6-10">6-10 ans</SelectItem>
                    <SelectItem value="10+">Plus de 10 ans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documents">Documents justificatifs (diplômes, certifications)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <input
                    type="file"
                    id="documents"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('documents')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Télécharger des documents
                  </Button>
                  {formData.documents.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDocument(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-orange/10 p-4 rounded-lg">
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-2">
                  Frais d'adhésion : 15 000 FCFA
                </p>
                <p className="text-xs text-muted-foreground">
                  Ce montant sera demandé après validation de votre dossier et vous permettra d'accéder à notre plateforme pendant 1 an.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: !!checked })}
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  J'accepte les{' '}
                  <Button variant="link" className="p-0 h-auto text-orange">
                    conditions générales d'utilisation
                  </Button>
                  {' '}et je comprends les frais d'adhésion
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-orange hover:bg-orange-600 text-orange-foreground font-semibold rounded-full"
                disabled={!formData.acceptTerms || selectedServices.length === 0}
              >
                Soumettre ma candidature
              </Button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <p className="text-muted-foreground">
                Vous avez déjà un compte ?{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-orange hover:text-orange-600"
                  onClick={() => onPageChange('login')}
                >
                  Connectez-vous
                </Button>
              </p>
              <p className="text-muted-foreground">
                Vous êtes un client ?{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary hover:text-primary-600"
                  onClick={() => onPageChange('register-client')}
                >
                  Créer un compte client
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterProviderPage;