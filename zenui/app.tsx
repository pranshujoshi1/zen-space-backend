import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { ParentDetails } from './components/ParentDetails';
import { DailyCheckin } from './components/DailyCheckin';
import { Dashboard } from './components/dashboard';
import { AIInsights } from './components/Allnsights';
import { SupportHub } from './components/SupportHub';
import { MeditationJournal } from './components/MeditationJournal';
import { ProgressAnalytics } from './components/ProgressAnalytics';
import { ProfileSettings } from './components/ProfileSettings';
import { ZenTools } from './components/ZenTools';
import { BottomNavigation } from './components/BottomNavigation';
import { Button } from './components/ui/button';
import { Logo } from './components/Logo';
import { BackButton } from './components/BackButton';
import { Card, CardContent } from './components/ui/card';
import { Wifi, WifiOff } from 'lucide-react';

type Screen = 'splash' | 'auth' | 'parentDetails' | 'checkin' | 'dashboard' | 'insights' | 'support' | 'meditation' | 'journal' | 'analytics' | 'profile' | 'zentools';

interface User {
  name: string;
  email: string;
  userId?: string;
  firstName?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    return savedUser ? 'dashboard' : 'splash';
  });
  const [user, setUser] = useState<User | null>(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        return {
          name: userData.name,
          email: userData.email,
          userId: userData._id || userData.userId,
          firstName: userData.firstName || userData.name?.split(' ')[0] || userData.name
        };
      } catch (e) {
        console.error('Error loading user from localStorage:', e);
      }
    }
    return null;
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);

  // PWA and connectivity management
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authPayload = params.get('auth');
    if (authPayload) {
      try {
        const normalized = authPayload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(normalized));
        const { user: payloadUser, tokens } = decoded;
        if (payloadUser && tokens) {
          localStorage.setItem('user', JSON.stringify(payloadUser));
          localStorage.setItem('access_token', tokens.access_token);
          localStorage.setItem('refresh_token', tokens.refresh_token);
          setUser({
            name: payloadUser.name,
            email: payloadUser.email,
            userId: payloadUser._id || payloadUser.userId,
            firstName: payloadUser.firstName || payloadUser.name?.split(' ')[0],
          });
          setCurrentScreen('dashboard');
        }
      } catch (error) {
        console.error('Failed to parse auth payload', error);
      } finally {
        params.delete('auth');
        const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}${window.location.hash}`;
        window.history.replaceState({}, '', newUrl);
      }
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setShowPWAPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      document.documentElement.classList.add('dark');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleGetStarted = () => {
    setCurrentScreen('auth');
  };

  const handleAuthenticated = (userData: User) => {
    setUser(userData);
    setCurrentScreen('parentDetails');
  };

  const handleParentDetailsComplete = (parentData: any) => {
    // Store parent details
    localStorage.setItem('parentDetails', JSON.stringify(parentData));
    // Check if user completed today's check-in (mock logic)
    const hasCompletedCheckin = localStorage.getItem('lastCheckin') === new Date().toISOString().split('T')[0];
    setCurrentScreen(hasCompletedCheckin ? 'dashboard' : 'checkin');
  };

  const handleCheckinComplete = (data: any) => {
    // Store check-in data
    localStorage.setItem('lastCheckin', new Date().toISOString().split('T')[0]);
    localStorage.setItem('checkinData', JSON.stringify(data));
    setCurrentScreen('dashboard');
  };

  const handleNavigation = (screen: string) => {
    // Map navigation items to screen names
    const screenMap: { [key: string]: Screen } = {
      'dashboard': 'dashboard',
      'zentools': 'zentools',
      'analytics': 'analytics',
      'support': 'support',
      'profile': 'profile',
      'insights': 'insights',
      'meditation': 'meditation',
      'journal': 'meditation' // Both meditation and journal are in the same component
    };
    
    const targetScreen = screenMap[screen] || 'dashboard';
    setCurrentScreen(targetScreen);
  };

  const handleBackNavigation = () => {
    // Handle back navigation based on current screen
    switch (currentScreen) {
      case 'dashboard':
        setCurrentScreen('splash');
        break;
      case 'auth':
        setCurrentScreen('splash');
        break;
      case 'parentDetails':
        setCurrentScreen('auth');
        break;
      case 'checkin':
        setCurrentScreen('parentDetails');
        break;
      case 'zentools':
      case 'insights':
      case 'support':
      case 'meditation':
      case 'analytics':
      case 'profile':
        setCurrentScreen('dashboard');
        break;
      default:
        setCurrentScreen('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('splash');
    localStorage.clear();
  };

  const getNavigationScreen = () => {
    switch (currentScreen) {
      case 'dashboard': return 'dashboard';
      case 'zentools': return 'zentools';
      case 'analytics': return 'analytics';
      case 'support': return 'support';
      case 'profile': return 'profile';
      case 'insights': return 'analytics';
      case 'meditation': return 'support';
      default: return 'dashboard';
    }
  };

  const shouldShowBottomNav = user && !['splash', 'auth', 'parentDetails', 'checkin'].includes(currentScreen);

  return (
    <div className="min-h-screen relative">
      {/* Fixed top-left header cluster: Logo only */}
      <div className="fixed top-3 left-3 z-[60]">
          <div className="relative z-[61]">
          <Logo onClick={() => setCurrentScreen('dashboard')} />
        </div>
      </div>
      {/* Offline Indicator */}
      {!isOnline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white p-2 text-center text-sm"
        >
          <WifiOff className="w-4 h-4 inline mr-2" />
          You're offline. Using cached version.
        </motion.div>
      )}

      {/* PWA Install Prompt */}
      {showPWAPrompt && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-20 left-4 right-4 z-50"
        >
          <Card className="zen-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">Install ZEN SPACE</h3>
                  <p className="text-sm text-muted-foreground">Add to your home screen for quick access</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPWAPrompt(false)}
                  >
                    Later
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-secondary"
                    onClick={() => {
                      // Trigger PWA install
                      setShowPWAPrompt(false);
                    }}
                  >
                    Install
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {currentScreen === 'splash' && (
            <SplashScreen onGetStarted={handleGetStarted} />
          )}
          
          {currentScreen === 'auth' && (
            <AuthScreen onAuthenticated={handleAuthenticated} />
          )}
          
          {currentScreen === 'parentDetails' && (
            <ParentDetails onComplete={handleParentDetailsComplete} onBack={handleBackNavigation} />
          )}
          
          {currentScreen === 'checkin' && user && (
            <DailyCheckin onComplete={handleCheckinComplete} />
          )}
          
          {currentScreen === 'dashboard' && user && (
            <Dashboard user={user} onNavigate={handleNavigation} />
          )}
          
          {currentScreen === 'zentools' && (
            <ZenTools onBack={handleBackNavigation} />
          )}
          
          {currentScreen === 'insights' && user && (
            <AIInsights user={user} />
          )}
          
          {currentScreen === 'support' && (
            <SupportHub />
          )}
          
          {currentScreen === 'meditation' && (
            <MeditationJournal />
          )}
          
          {currentScreen === 'analytics' && (
            <ProgressAnalytics user={user || undefined} />
          )}
          
          {currentScreen === 'profile' && user && (
            <ProfileSettings user={user} onLogout={handleLogout} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      {shouldShowBottomNav && (
        <BottomNavigation
          activeScreen={getNavigationScreen()}
          onNavigate={handleNavigation}
        />
      )}
    </div>
  );
}