import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Settings, LifeBuoy, FileText } from "lucide-react";

import { 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Download, 
  Trash2, 
  LogOut, 
  Edit, 
  Mail, 
  School,
  Calendar,
  Globe,
  
} from 'lucide-react';

interface ProfileSettingsProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

export function ProfileSettings({ user, onLogout }: ProfileSettingsProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if dark mode is already enabled
    return document.documentElement.classList.contains('dark');
  });
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyReports: true,
    supportMessages: true,
    achievements: true,
  });

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  const exportData = () => {
    alert('Preparing your data export... This may take a few minutes. 📦');
  };

  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion requested. You will receive a confirmation email shortly.');
    }
  };

  return (
    <div className="min-h-screen zen-gradient relative">
      {/* Old inline Back button removed; using global header Back */}

      <div className="p-4 pb-20 pt-16">
        <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <User className="w-6 h-6 text-primary" />
            <h1 className="text-3xl bg-gradient-to-r from-[#a48bff] to-[#70e1c9] bg-clip-text text-transparent font-semibold">
              Profile & Settings
            </h1>
          </div>
          <p className="text-[#4B5563]">Manage your account and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 rounded-2xl bg-[rgba(255,255,255,0.6)] backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
            <CardContent className="p-8">
              <div className="flex items-center gap-8 flex-wrap md:flex-nowrap">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#a48bff] to-[#70e1c9] rounded-full blur-md opacity-70 scale-110"></div>
                  <Avatar className="w-24 h-24 relative">
                    <AvatarFallback className="bg-gradient-to-r from-[#a48bff] to-[#70e1c9] text-white text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-gradient-to-r from-[#a48bff] to-[#70e1c9] hover:scale-110 transition-transform duration-300"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
                  <p className="text-[#4B5563] mb-4">{user.email}</p>
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#a48bff]" />
                      <span>Member since Sept 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <School className="w-4 h-4 text-[#70e1c9]" />
                      <span>University Student</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-[rgba(255,255,255,0.6)] backdrop-blur-md rounded-full p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
              <TabsTrigger 
                value="profile" 
                className="rounded-full py-2.5 transition-all duration-300 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a48bff] data-[state=active]:to-[#70e1c9] hover:bg-white/70"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="rounded-full py-2.5 transition-all duration-300 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a48bff] data-[state=active]:to-[#70e1c9] hover:bg-white/70"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="rounded-full py-2.5 transition-all duration-300 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a48bff] data-[state=active]:to-[#70e1c9] hover:bg-white/70"
              >
                Privacy
              </TabsTrigger>
              <TabsTrigger 
                value="preferences" 
                className="rounded-full py-2.5 transition-all duration-300 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a48bff] data-[state=active]:to-[#70e1c9] hover:bg-white/70"
              >
                Preferences
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="border-0 rounded-2xl bg-[rgba(255,255,255,0.6)] backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-[#a48bff] to-[#70e1c9] bg-clip-text text-transparent font-semibold">
                    <User className="w-5 h-5 text-[#a48bff]" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-[#4B5563] font-medium mb-2 block">First Name</Label>
                      <Input id="firstName" defaultValue={user.name.split(' ')[0]} className="mt-1 rounded-xl border-[#e5e7eb] focus:border-[#a48bff] focus:ring-[#a48bff]/20" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-[#4B5563] font-medium mb-2 block">Last Name</Label>
                      <Input id="lastName" defaultValue={user.name.split(' ')[1] || ''} className="mt-1 rounded-xl border-[#e5e7eb] focus:border-[#a48bff] focus:ring-[#a48bff]/20" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#4B5563] font-medium mb-2 block">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user.email} className="mt-1 rounded-xl border-[#e5e7eb] focus:border-[#a48bff] focus:ring-[#a48bff]/20" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="university" className="text-[#4B5563] font-medium mb-2 block">University/College</Label>
                      <Input id="university" defaultValue="Sample University" className="mt-1 rounded-xl border-[#e5e7eb] focus:border-[#a48bff] focus:ring-[#a48bff]/20" />
                    </div>
                    <div>
                      <Label htmlFor="year" className="text-[#4B5563] font-medium mb-2 block">Academic Year</Label>
                      <Select defaultValue="junior">
                        <SelectTrigger className="mt-1 rounded-xl border-[#e5e7eb] focus:border-[#a48bff] focus:ring-[#a48bff]/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="freshman">Freshman</SelectItem>
                          <SelectItem value="sophomore">Sophomore</SelectItem>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#34D399] hover:scale-105 transition-all duration-300 text-white rounded-xl px-6 py-2.5 shadow-lg shadow-[#8B5CF6]/20">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="zen-card border-0 bg-gradient-to-br from-[#f8f7ff]/80 to-[#edfcf9]/80 backdrop-blur-lg shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-[#a48bff] to-[#70e1c9] bg-clip-text text-transparent">
                    <Bell className="w-5 h-5 text-[#a48bff]" />
                    Notification Preferences
                  </CardTitle>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#a48bff]/30 to-[#70e1c9]/30 rounded-full mt-1"></div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#4B5563]">Daily Check-in Reminders</h4>
                      <p className="text-sm text-[#6B7280]">Get reminded to complete your daily wellness check-in</p>
                    </div>
                    <div className="relative">
                        <Switch
                          checked={notifications.dailyReminders}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, dailyReminders: checked }))}
                          className={`${
                            notifications.dailyReminders 
                              ? 'bg-gradient-to-r from-[#a36bff] via-[#b88cfb] to-[#d0a4fc] shadow-[0_0_8px_rgba(155,92,246,0.6)]' 
                              : 'bg-[#e8eaf6]'
                          } relative inline-flex h-[24px] w-[48px] md:h-[22px] md:w-[44px] sm:h-[20px] sm:w-[40px] items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#9b5cf6]/20 focus:ring-offset-2 cursor-pointer hover:filter hover:brightness-110`}
                        >
                          <span
                            className={`${
                              notifications.dailyReminders 
                                ? 'translate-x-[26px] md:translate-x-[22px] sm:translate-x-[18px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]' 
                                : 'translate-x-[3px] bg-[#fafafa] shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                            } inline-block h-[18px] w-[18px] md:h-[16px] md:w-[16px] sm:h-[14px] sm:w-[14px] transform rounded-full transition-all duration-300 ease-in-out`}
                          />
                        </Switch>
                      </div>
                  </div>
                  
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#4B5563]">Weekly Progress Reports</h4>
                      <p className="text-sm text-[#6B7280]">Receive your weekly wellness summary</p>
                    </div>
                    <div className="relative">
                        <Switch
                          checked={notifications.weeklyReports}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
                          className={`${
                            notifications.weeklyReports 
                              ? 'bg-gradient-to-r from-[#a36bff] via-[#b88cfb] to-[#d0a4fc] shadow-[0_0_8px_rgba(155,92,246,0.6)]' 
                              : 'bg-[#e8eaf6]'
                          } relative inline-flex h-[24px] w-[48px] md:h-[22px] md:w-[44px] sm:h-[20px] sm:w-[40px] items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#9b5cf6]/20 focus:ring-offset-2 cursor-pointer hover:filter hover:brightness-110`}
                        >
                          <span
                            className={`${
                              notifications.weeklyReports 
                                ? 'translate-x-[26px] md:translate-x-[22px] sm:translate-x-[18px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]' 
                                : 'translate-x-[3px] bg-[#fafafa] shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                            } inline-block h-[18px] w-[18px] md:h-[16px] md:w-[16px] sm:h-[14px] sm:w-[14px] transform rounded-full transition-all duration-300 ease-in-out`}
                          />
                        </Switch>
                      </div>
                  </div>
                  
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#4B5563]">Support Messages</h4>
                      <p className="text-sm text-[#6B7280]">Notifications from peer groups and counselors</p>
                    </div>
                    <div className="relative">
                        <Switch
                          checked={notifications.supportMessages}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, supportMessages: checked }))}
                          className={`${
                            notifications.supportMessages 
                              ? 'bg-gradient-to-r from-[#a36bff] via-[#b88cfb] to-[#d0a4fc] shadow-[0_0_8px_rgba(155,92,246,0.6)]' 
                              : 'bg-[#e8eaf6]'
                          } relative inline-flex h-[24px] w-[48px] md:h-[22px] md:w-[44px] sm:h-[20px] sm:w-[40px] items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#9b5cf6]/20 focus:ring-offset-2 cursor-pointer hover:filter hover:brightness-110`}
                        >
                          <span
                            className={`${
                              notifications.supportMessages 
                                ? 'translate-x-[26px] md:translate-x-[22px] sm:translate-x-[18px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]' 
                                : 'translate-x-[3px] bg-[#fafafa] shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                            } inline-block h-[18px] w-[18px] md:h-[16px] md:w-[16px] sm:h-[14px] sm:w-[14px] transform rounded-full transition-all duration-300 ease-in-out`}
                          />
                        </Switch>
                      </div>
                  </div>
                  
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#4B5563]">Achievement Notifications</h4>
                      <p className="text-sm text-[#6B7280]">Get notified when you earn new achievements</p>
                    </div>
                    <div className="relative">
                        <Switch
                          checked={notifications.achievements}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, achievements: checked }))}
                          className={`${
                            notifications.achievements 
                              ? 'bg-gradient-to-r from-[#a36bff] via-[#b88cfb] to-[#d0a4fc] shadow-[0_0_8px_rgba(155,92,246,0.6)]' 
                              : 'bg-[#e8eaf6]'
                          } relative inline-flex h-[24px] w-[48px] md:h-[22px] md:w-[44px] sm:h-[20px] sm:w-[40px] items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#9b5cf6]/20 focus:ring-offset-2 cursor-pointer hover:filter hover:brightness-110`}
                        >
                          <span
                            className={`${
                              notifications.achievements 
                                ? 'translate-x-[26px] md:translate-x-[22px] sm:translate-x-[18px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]' 
                                : 'translate-x-[3px] bg-[#fafafa] shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                            } inline-block h-[18px] w-[18px] md:h-[16px] md:w-[16px] sm:h-[14px] sm:w-[14px] transform rounded-full transition-all duration-300 ease-in-out`}
                          />
                        </Switch>
                      </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="zen-card border-0 bg-gradient-to-br from-[#f8f7ff]/80 to-[#edfcf9]/80 backdrop-blur-lg shadow-xl">
                <CardHeader>
                  <CardTitle className="bg-gradient-to-r from-[#a48bff] to-[#70e1c9] bg-clip-text text-transparent">Notification Schedule</CardTitle>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#a48bff]/30 to-[#70e1c9]/30 rounded-full mt-1"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="checkInTime" className="text-[#4B5563] font-medium">Daily Check-in Time</Label>
                    <Input id="checkInTime" type="time" defaultValue="09:00" className="mt-1 rounded-xl border-[#e5e7eb] focus:border-[#a48bff] focus:ring-[#a48bff]/20" />
                  </div>
                  <div>
                    <Label htmlFor="timezone" className="text-[#4B5563] font-medium">Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Standard Time</SelectItem>
                        <SelectItem value="mst">Mountain Standard Time</SelectItem>
                        <SelectItem value="cst">Central Standard Time</SelectItem>
                        <SelectItem value="est">Eastern Standard Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <Card className="zen-card border-0 bg-gradient-to-br from-[#f9f9ff] to-[#f3f7ff] shadow-[0_8px_20px_rgba(150,120,255,0.08)] rounded-2xl">
                <CardHeader className="pb-2 px-7 pt-6">
                  <CardTitle className="flex items-center gap-2 font-semibold text-[1.1rem]">
                    <Shield className="w-5 h-5 text-[#9a7cfb]" />
                    Privacy & Security
                  </CardTitle>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#a48bff]/30 to-[#70e1c9]/30 rounded-full mt-1"></div>
                </CardHeader>
                <CardContent className="space-y-4 px-7 pb-6 pt-4 md:px-5 sm:px-4 sm:pb-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[rgba(255,255,255,0.7)] rounded-xl p-4 sm:p-3 shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-md hover:bg-[rgba(255,255,255,0.85)]">
                    <div className="mb-3 md:mb-0">
                      <h4 className="font-semibold text-[#2c2c35] text-base sm:text-sm">Anonymous in Peer Groups</h4>
                      <p className="text-[0.9rem] sm:text-[0.85rem] text-[#667085]">Hide your name in community discussions</p>
                    </div>
                    <Switch defaultChecked className="bg-gradient-to-r from-[#a36bff] via-[#b88cfb] to-[#d0a4fc] shadow-[0_0_8px_rgba(155,92,246,0.5)] data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#a36bff] data-[state=checked]:via-[#b88cfb] data-[state=checked]:to-[#d0a4fc] h-6 w-12 sm:h-5 sm:w-10 transition-all duration-300 hover:brightness-110 cursor-pointer" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[rgba(255,255,255,0.7)] rounded-xl p-4 sm:p-3 shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-md hover:bg-[rgba(255,255,255,0.85)]">
                    <div className="mb-3 md:mb-0">
                      <h4 className="font-semibold text-[#2c2c35] text-base sm:text-sm">Share Progress with Counselors</h4>
                      <p className="text-[0.9rem] sm:text-[0.85rem] text-[#667085]">Allow counselors to view your wellness data</p>
                    </div>
                    <Switch defaultChecked className="bg-gradient-to-r from-[#a36bff] via-[#b88cfb] to-[#d0a4fc] shadow-[0_0_8px_rgba(155,92,246,0.5)] data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#a36bff] data-[state=checked]:via-[#b88cfb] data-[state=checked]:to-[#d0a4fc] h-6 w-12 sm:h-5 sm:w-10 transition-all duration-300 hover:brightness-110 cursor-pointer" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[rgba(255,255,255,0.7)] rounded-xl p-4 sm:p-3 shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-md hover:bg-[rgba(255,255,255,0.85)]">
                    <div className="mb-3 md:mb-0">
                      <h4 className="font-semibold text-[#2c2c35] text-base sm:text-sm">Data Analytics Participation</h4>
                      <p className="text-[0.9rem] sm:text-[0.85rem] text-[#667085]">Help improve the platform with anonymized data</p>
                    </div>
                    <Switch defaultChecked className="bg-gradient-to-r from-[#a36bff] via-[#b88cfb] to-[#d0a4fc] shadow-[0_0_8px_rgba(155,92,246,0.5)] data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#a36bff] data-[state=checked]:via-[#b88cfb] data-[state=checked]:to-[#d0a4fc] h-6 w-12 sm:h-5 sm:w-10 transition-all duration-300 hover:brightness-110 cursor-pointer" />
                  </div>
                </CardContent>
              </Card>

              <Card className="zen-card border-0 bg-gradient-to-br from-[#f9f9ff] to-[#f3f7ff] shadow-[0_8px_20px_rgba(150,120,255,0.08)] rounded-2xl">
                <CardHeader className="pb-2 px-7 pt-6 md:px-5 sm:px-4">
                  <CardTitle className="flex items-center gap-2 font-semibold text-[1.1rem]">
                    {/* <Database className="w-5 h-5 text-[#9a7cfb]" /> */}
                    Data Management
                  </CardTitle>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#a48bff]/30 to-[#70e1c9]/30 rounded-full mt-1"></div>
                </CardHeader>
                <CardContent className="space-y-4 px-7 pb-6 pt-4 md:px-5 sm:px-4 sm:pb-4">
                  <div className="bg-[rgba(255,255,255,0.7)] rounded-xl p-4 sm:p-3 shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-md hover:bg-[rgba(255,255,255,0.85)]">
                    <Button
                      onClick={exportData}
                      variant="outline"
                      className="w-full justify-start bg-transparent hover:bg-white/50"
                    >
                      <Download className="w-4 h-4 mr-2 text-[#9a7cfb]" />
                      Export My Data
                    </Button>
                  </div>
                  
                  <div className="bg-[rgba(255,255,255,0.7)] rounded-xl p-4 sm:p-3 shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-md hover:bg-[rgba(255,255,255,0.85)]">
                    <Button
                      onClick={deleteAccount}
                      variant="outline"
                      className="w-full justify-start text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="group zen-card border-0 bg-gradient-to-br from-[#f9f9ff]/80 to-[#f3f7ff]/80 dark:from-transparent dark:to-transparent backdrop-blur-xl shadow-[0_8px_24px_rgba(164,139,255,0.10)] rounded-2xl transition-all duration-300 hover:shadow-[0_16px_40px_rgba(164,139,255,0.18)] hover:scale-[1.005]">
                <CardHeader className="pb-2 px-7 pt-6 md:px-5 sm:px-4">
                  <CardTitle className="flex items-center gap-2 font-semibold text-[1.15rem] sm:text-[1.05rem] bg-gradient-to-r from-[#a48bff] to-[#70e1c9] bg-clip-text text-transparent">
                    <Settings className="w-5 h-5 text-[#9a7cfb] sm:w-4 sm:h-4" />
                    App Preferences
                  </CardTitle>
                  <div className="h-1 w-28 bg-gradient-to-r from-[#a48bff]/40 to-[#70e1c9]/40 rounded-full mt-1"></div>
                </CardHeader>
                <CardContent className="space-y-6 px-7 pb-6 pt-4 md:px-5 sm:px-4 sm:pb-4">
                  <div className="group/row relative flex items-center justify-between bg-white/60 dark:bg-white/5 rounded-xl p-4 sm:p-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_18px_rgba(164,139,255,0.18)] hover:translate-y-[-1px] ring-1 ring-transparent hover:ring-[#a48bff]/30 focus-within:ring-[#a48bff]/40 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="flex items-center justify-center w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#eef] to-white dark:from-white/10 dark:to-white/5 shadow-sm">
                        {isDarkMode ? <Moon className="w-4 h-4 text-[#a48bff]" /> : <Sun className="w-4 h-4 text-[#a48bff]" />}
                      </span>
                      <div>
                        <h4 className="font-medium text-[#2c2c35] dark:text-slate-100 sm:text-sm">Dark Mode</h4>
                        <p className="text-sm text-[#667085] dark:text-slate-400 sm:text-xs">Switch to dark theme</p>
                      </div>
                    </div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={setIsDarkMode}
                      className="hover:brightness-110 focus-visible:ring-[#a48bff]/40"
                    />
                  </div>
                  <div className="border-b border-[rgba(200,200,255,0.3)] dark:border-white/10"></div>
                  <div className="group/row relative bg-white/60 dark:bg-white/5 rounded-xl p-4 sm:p-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_18px_rgba(164,139,255,0.18)] hover:translate-y-[-1px] ring-1 ring-transparent hover:ring-[#a48bff]/30 focus-within:ring-[#a48bff]/40 transition-all duration-300">
                    <Label htmlFor="language" className="font-medium text-[#2c2c35] mb-2 block sm:text-sm">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="mt-1 bg-white/80 dark:bg-white/10 border-[rgba(200,200,255,0.3)] dark:border-white/10 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-[#a48bff]/30 transition-all">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-[rgba(200,200,255,0.3)] dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="group/row relative bg-white/60 dark:bg-white/5 rounded-xl p-4 sm:p-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_18px_rgba(164,139,255,0.18)] hover:translate-y-[-1px] ring-1 ring-transparent hover:ring-[#a48bff]/30 focus-within:ring-[#a48bff]/40 transition-all duration-300">
                    <Label htmlFor="defaultMeditationLength" className="font-medium text-[#2c2c35] mb-2 block sm:text-sm">Default Meditation Length</Label>
                    <Select defaultValue="10">
                      <SelectTrigger className="mt-1 bg-white/80 dark:bg-white/10 border-[rgba(200,200,255,0.3)] dark:border-white/10 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-[#a48bff]/30 transition-all">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-[rgba(200,200,255,0.3)] dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="20">20 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="group zen-card border-0 bg-gradient-to-br from-[#f9f9ff]/80 to-[#f3f7ff]/80 dark:from-transparent dark:to-transparent backdrop-blur-xl shadow-[0_8px_24px_rgba(164,139,255,0.10)] rounded-2xl transition-all duration-300 hover:shadow-[0_16px_40px_rgba(164,139,255,0.18)] hover:scale-[1.005]">
                <CardHeader className="pb-2 px-7 pt-6 md:px-5 sm:px-4">
                  <CardTitle className="flex items-center gap-2 font-semibold text-[1.15rem] sm:text-[1.05rem] bg-gradient-to-r from-[#a48bff] to-[#70e1c9] bg-clip-text text-transparent">
                    <LifeBuoy className="w-5 h-5 text-[#9a7cfb] sm:w-4 sm:h-4" />
                    Support & Help
                  </CardTitle>
                  <div className="h-1 w-28 bg-gradient-to-r from-[#a48bff]/40 to-[#70e1c9]/40 rounded-full mt-1"></div>
                </CardHeader>
                <CardContent className="space-y-4 px-7 pb-6 pt-4 md:px-5 sm:px-4 sm:pb-4">
                  <Button variant="outline" className="w-full justify-start rounded-full px-5 py-3 sm:py-2.5 bg-white/60 dark:bg-white/5 border-[rgba(200,200,255,0.3)] dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_18px_rgba(164,139,255,0.18)] hover:translate-y-[-1px] ring-1 ring-transparent hover:ring-[#a48bff]/30 transition-all duration-300 ease-in-out">
                    <Mail className="w-4 h-4 mr-2 text-[#9a7cfb]" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-full px-5 py-3 sm:py-2.5 bg-white/60 dark:bg-white/5 border-[rgba(200,200,255,0.3)] dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_18px_rgba(164,139,255,0.18)] hover:translate-y-[-1px] ring-1 ring-transparent hover:ring-[#a48bff]/30 transition-all duration-300 ease-in-out">
                    <Globe className="w-4 h-4 mr-2 text-[#9a7cfb]" />
                    Help Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-full px-5 py-3 sm:py-2.5 bg-white/60 dark:bg-white/5 border-[rgba(200,200,255,0.3)] dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_18px_rgba(164,139,255,0.18)] hover:translate-y-[-1px] ring-1 ring-transparent hover:ring-[#a48bff]/30 transition-all duration-300 ease-in-out">
                    <FileText className="w-4 h-4 mr-2 text-[#9a7cfb]" />
                    Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-full px-5 py-3 sm:py-2.5 bg-white/60 dark:bg-white/5 border-[rgba(200,200,255,0.3)] dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_18px_rgba(164,139,255,0.18)] transition-all duration-300">
                    <FileText className="w-4 h-4 mr-2 text-[#9a7cfb]" />
                    Terms of Service
                  </Button>
                </CardContent>
              </Card>

              <Card className="zen-card border-0 bg-gradient-to-br from-[#f9f9ff]/80 to-[#f3f7ff]/80 dark:from-transparent dark:to-transparent backdrop-blur-xl shadow-[0_8px_24px_rgba(164,139,255,0.10)] rounded-2xl">
                <CardContent className="px-7 py-6 md:px-5 sm:px-4 sm:py-4">
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full sm:w-[232px] justify-start sm:justify-center rounded-xl px-5 py-3 sm:py-2.5 border border-red-400/60 text-red-500 dark:text-red-400 bg-transparent shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-red-400/40 hover:text-white hover:bg-[linear-gradient(135deg,#ef4444,#f87171)] hover:shadow-[0_6px_18px_rgba(239,68,68,0.35)] transition-all duration-300 ease-in-out"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        </div>
      </div>
    </div>
  );
}