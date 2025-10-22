import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { 
  Settings, 
  Bell, 
  Mail, 
  Lock, 
  Globe, 
  Shield, 
  Calendar,
  Palette,
  Moon,
  Sun,
  User,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { state, dispatch } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: state.user?.firstName || '',
    lastName: state.user?.lastName || '',
    email: state.user?.email || '',
    newPassword: '',
    confirmPassword: '',
    denomination: state.user?.denomination || '',
    role: state.user?.role || '',
    church: state.user?.church || '',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profilePublic: false,
      showEmail: true,
      showPhone: false
    },
    theme: 'system'
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: value
      }
    }));
  };

  const handlePrivacyChange = (setting: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value
      }
    }));
  };

  const handleThemeChange = (theme: string) => {
    setFormData(prev => ({ ...prev, theme }));
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      // For now, we'll just update the local profile
      // In a real app, you would make an API call to update the user profile
      const profileUpdates = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      if (formData.newPassword) {
        profileUpdates.password = formData.newPassword;
      }

      const updatedProfile = await authService.updateProfile(profileUpdates);
      dispatch({ type: 'LOGIN_SUCCESS', payload: updatedProfile });
      
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Failed to update settings:', error);
      alert('Failed to update settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, you would make an API call to delete the account
      console.log('Delete account');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'account' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setActiveTab('account')}
                    >
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5" />
                        <span>Account</span>
                      </div>
                    </button>
                    
                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'notifications' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setActiveTab('notifications')}
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5" />
                        <span>Notifications</span>
                      </div>
                    </button>
                    
                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'privacy' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setActiveTab('privacy')}
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5" />
                        <span>Privacy</span>
                      </div>
                    </button>
                    
                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'security' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setActiveTab('security')}
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5" />
                        <span>Security</span>
                      </div>
                    </button>
                    
                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'appearance' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setActiveTab('appearance')}
                    >
                      <div className="flex items-center gap-3">
                        <Palette className="w-5 h-5" />
                        <span>Appearance</span>
                      </div>
                    </button>
                    
                    <button
                      className="w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-destructive/10 text-destructive"
                      onClick={handleLogout}
                    >
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5" />
                        <span>Log Out</span>
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'account' && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Update your account information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label className="mb-4 block">Church Information</Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="denomination">Denomination</Label>
                          <Select value={formData.denomination} onValueChange={(value) => setFormData(prev => ({ ...prev, denomination: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select denomination" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rccg">Redeemed Christian Church of God</SelectItem>
                              <SelectItem value="winners">Winners' Chapel</SelectItem>
                              <SelectItem value="daystar">Daystar Christian Centre</SelectItem>
                              <SelectItem value="cit">Church of Christ in Nations</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="member">Member</SelectItem>
                              <SelectItem value="pastor">Pastor</SelectItem>
                              <SelectItem value="deacon">Deacon</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="volunteer">Volunteer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleSave} disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'notifications' && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-primary" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Choose how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={formData.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications in the app</p>
                      </div>
                      <Switch
                        checked={formData.notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={formData.notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={handleSave}>Save Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'privacy' && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Control your privacy preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">Make profile public</p>
                      </div>
                      <Switch
                        checked={formData.privacy.profilePublic}
                        onCheckedChange={(checked) => handlePrivacyChange('profilePublic', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Email</Label>
                        <p className="text-sm text-muted-foreground">Allow others to see your email</p>
                      </div>
                      <Switch
                        checked={formData.privacy.showEmail}
                        onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Phone</Label>
                        <p className="text-sm text-muted-foreground">Allow others to see your phone</p>
                      </div>
                      <Switch
                        checked={formData.privacy.showPhone}
                        onCheckedChange={(checked) => handlePrivacyChange('showPhone', checked)}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={handleSave}>Save Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'security' && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="Leave blank to keep current password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Sessions</Label>
                      <p className="text-sm text-muted-foreground mb-2">Manage active sessions across all devices</p>
                      <Button variant="outline">View Active Sessions</Button>
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={handleSave} variant="destructive">
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'appearance' && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5 text-primary" />
                      Appearance
                    </CardTitle>
                    <CardDescription>
                      Customize the look and feel of the app
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          className={`flex flex-col items-center p-4 rounded-lg border-2 ${
                            formData.theme === 'light' ? 'border-primary' : 'border-border'
                          }`}
                          onClick={() => handleThemeChange('light')}
                        >
                          <Sun className="w-8 h-8 mb-2" />
                          <span>Light</span>
                        </button>
                        <button
                          className={`flex flex-col items-center p-4 rounded-lg border-2 ${
                            formData.theme === 'dark' ? 'border-primary' : 'border-border'
                          }`}
                          onClick={() => handleThemeChange('dark')}
                        >
                          <Moon className="w-8 h-8 mb-2" />
                          <span>Dark</span>
                        </button>
                        <button
                          className={`flex flex-col items-center p-4 rounded-lg border-2 ${
                            formData.theme === 'system' ? 'border-primary' : 'border-border'
                          }`}
                          onClick={() => handleThemeChange('system')}
                        >
                          <Globe className="w-8 h-8 mb-2" />
                          <span>System</span>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={handleSave}>Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;