import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Shield } from 'lucide-react';

interface ParentDetailsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function ParentDetails({ onComplete, onBack }: ParentDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    relationship: '',
    mobile: '',
    address: ''
  });
  const API_BASE = import.meta.env?.VITE_AI_API_URL?.trim() || '';
  const API_URL = API_BASE ? `${API_BASE.replace(/\/$/, '')}/api` : '/api';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate required fields
    if (!formData.parentName || !formData.parentEmail || !formData.mobile) {
      alert('Please fill in all required fields');
      setIsLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('You must be logged in before adding parent details.');
      }

      const response = await fetch(`${API_URL}/users/me/parent`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.parentName,
          email: formData.parentEmail,
          phone: formData.mobile
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save parent details.');
      }

      const updated = await response.json();
      localStorage.setItem('parentDetails', JSON.stringify(formData));
      onComplete(updated);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Failed to save parent details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen zen-gradient zen-gradient-animate relative">
      {/* Old inline Back button removed; global Back under logo is used */}

      <div className="flex items-center justify-center min-h-screen p-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md md:max-w-lg"
        >
          <Card className="relative border-0 rounded-3xl bg-white/85 backdrop-blur-sm shadow-xl shadow-black/5 ring-1 ring-black/5 before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-br before:from-purple-300/25 before:to-emerald-200/20 before:blur-2xl before:scale-110">
            <CardHeader className="text-center">
              <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-cyan-400 to-green-500 flex items-center justify-center zen-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent font-semibold">
                Parent Details
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                Help us keep you safe by providing emergency contact information
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    placeholder="Full name"
                    className="mt-1"
                    value={formData.parentName}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="parentEmail">Parent/Guardian Email *</Label>
                  <Input
                    id="parentEmail"
                    name="parentEmail"
                    type="email"
                    placeholder="parent@example.com"
                    className="mt-1"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentEmail: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="relationship">Relationship *</Label>
                  <Select 
                    value={formData.relationship} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, relationship: value }))}
                    required
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="guardian">Guardian</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="mt-1"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Residential Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Street address, city, state, zip code"
                    className="mt-1 resize-none"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full btn-zen rounded-[16px] py-6 mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : "Let's Go →"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Safety Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-muted-foreground/70">
              Don't worry, your data is safe with us.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}