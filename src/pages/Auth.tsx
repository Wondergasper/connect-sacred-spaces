import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { Church, ArrowLeft, Mail, Lock, User, Building2, MapPin, Phone, AlertCircle, Users, Heart, Shield, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, loginSchema } from "@/lib/validation";
import { RegisterFormData, LoginFormData } from "@/lib/validation";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";

const Auth = () => {
  const [selectedRole, setSelectedRole] = useState<'member' | 'admin' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  // Login form setup
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
    reset: resetLogin
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const [step1Data, setStep1Data] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  // Handler functions for role selection
  const handleRoleSelection = (role: 'member' | 'admin') => {
    setSelectedRole(role);
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    resetLogin();
  };

  // Separate states for other steps
  const [denomination, setDenomination] = useState("");
  const [branch, setBranch] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useAuth();

  // Mock denominations and branches data
  const denominations = [
    { id: "rccg", name: "Redeemed Christian Church of God", branches: ["Lagos Mainland", "Ikoyi", "VI", "Abuja"] },
    { id: "winners", name: "Winners' Chapel", branches: ["Sabo", "Lekki", "Gbagada", "Ikeja"] },
    { id: "daystar", name: "Daystar Christian Centre", branches: ["Lekki", "VI", "Ikoyi", "Ikate"] },
    { id: "cit", name: "Church of Christ in Nations", branches: ["Gbagada", "Ikorodu", "Surulere", "Yaba"] }
  ];

  const roles = [
    { id: "pastor", name: "Pastor/Minister" },
    { id: "deacon", name: "Deacon/Deaconess" },
    { id: "leader", name: "Department Leader" },
    { id: "member", name: "Member" },
    { id: "volunteer", name: "Volunteer" }
  ];

  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password
      });
      
      // Update auth context with user data
      dispatch({ type: 'LOGIN_SUCCESS', payload: response });
      
      // Navigate based on user role
      if (response.role === 'admin' || response.role === 'pastor') {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      // Handle login error appropriately
      // Check if it's a network error
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        alert("Cannot connect to the server. Please make sure the backend is running.");
      } else {
        // Show specific error message if available
        const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
        alert(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle step 1 submission (registration info)
  const handleStep1Submit = () => {
    // Simple validation
    if (!step1Data.firstName || !step1Data.lastName || !step1Data.email || !step1Data.password || step1Data.password !== step1Data.confirmPassword) {
      alert("Please fill all required fields and ensure passwords match.");
      return;
    }
    
    setCurrentStep(2); // Move to church selection
  };

  // Handle church selection
  const handleChurchSelection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!denomination) {
      alert("Please select a denomination");
      return;
    }
    setCurrentStep(3); // Move to role assignment
  };

  // Handle role assignment and final registration
  const handleRoleAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role");
      return;
    }
    
    setIsLoading(true);
    try {
      // Combine all data for registration
      const registerData = {
        firstName: step1Data.firstName,
        lastName: step1Data.lastName,
        email: step1Data.email,
        phone: step1Data.phone, // Only include if authMethod is phone
        password: step1Data.password,
        role: role || "member",
        denomination: denomination || denominations[0]?.name
      };
      
      await authService.register(registerData);
      
      // Move to dashboard after successful registration
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration failed:", error);
      // Handle registration error appropriately
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        alert("Cannot connect to the server. Please make sure the backend is running.");
      } else {
        // Show specific error message if available
        const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
        alert(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in" role="main">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors" aria-label="Return to home page">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        
        {!selectedRole ? (
          // Role Selection Screen
          <Card className="shadow-card border-border/50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                <Church className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome to ChurchConnect</CardTitle>
              <CardDescription>
                Select your role to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground text-sm">
                All users use the same login portal. The system will direct you to your personalized dashboard based on your role.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mt-6">
                <Button 
                  variant="outline" 
                  className="h-auto p-6 flex flex-col items-center justify-center gap-3 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  onClick={() => handleRoleSelection('member')}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">Church Member</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Access community features, events, and personal dashboard
                    </p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto p-6 flex flex-col items-center justify-center gap-3 hover:border-red-300 hover:bg-red-50 transition-all"
                  onClick={() => handleRoleSelection('admin')}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">Church Administrator</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage members, events, donations, and church operations
                    </p>
                  </div>
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-center text-xs text-muted-foreground">
                  Not sure which option to select? Contact your church administrator for guidance.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div>
            {/* Role-specific header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {selectedRole === 'admin' ? (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">
                    {selectedRole === 'admin' ? 'Administrator Login' : 'Member Login'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedRole === 'admin' 
                      ? 'Access church administration tools' 
                      : 'Connect with your faith community'}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToRoleSelection}
                className="text-xs"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Change Role
              </Button>
            </div>
            
            {/* Add a role indicator */}
            <div className={`mb-6 p-3 rounded-lg text-center ${
              selectedRole === 'admin' 
                ? 'bg-red-50 text-red-800 border border-red-200' 
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              <span className="text-sm font-medium">
                {selectedRole === 'admin' ? '.ADMIN DASHBOARD' : '.MEMBER DASHBOARD'}
              </span>
            </div>
            
            {/* Original Auth Content */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Church className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ChurchConnect</h1>
                <p className="text-sm text-muted-foreground">Unified Access Portal</p>
              </div>
            </div>
        
            {/* Role Clarification */}
            <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Universal Access Portal</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    All users - members, pastors, and administrators - use this same portal to sign in. 
                    The system will automatically direct you to your personalized dashboard based on your assigned role.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Dashboard Preview */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card className="shadow-sm border-blue-200">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900">Member Dashboard</h4>
                  <p className="text-xs text-muted-foreground mt-1">For church members</p>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-red-200">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900">Admin Dashboard</h4>
                  <p className="text-xs text-muted-foreground mt-1">For pastors & admins</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-between items-center mb-8" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3} aria-label="Registration progress">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`} aria-label="Step 1: Authentication">
                  1
                </div>
                <div className={`h-1 w-12 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`} aria-label="Step 2: Church Selection">
                  2
                </div>
                <div className={`h-1 w-12 ${currentStep >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`} aria-label="Step 3: Role Selection">
                  3
                </div>
              </div>
            </div>

            {currentStep === 1 && (
              <Tabs defaultValue="signup" className="w-full" role="tablist">
                <TabsList className="grid w-full grid-cols-2" role="tablist" aria-orientation="horizontal">
                  <TabsTrigger value="signin" role="tab">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" role="tab">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" role="tabpanel" aria-labelledby="signin">
                  <Card className="shadow-card border-border/50" aria-labelledby="signin-card-title">
                    <CardHeader>
                      <CardTitle id="signin-card-title" className="flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-500" />
                        Welcome Back
                      </CardTitle>
                      <CardDescription>
                        Sign in to connect with your faith community. You'll be automatically directed to your personalized dashboard.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitLogin(handleLoginSubmit)} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="loginEmail">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                            <Input 
                              id="loginEmail" 
                              type="email" 
                              placeholder="you@church.com" 
                              className={`pl-10 ${loginErrors.email ? 'border-red-500' : ''}`}
                              {...registerLogin("email")}
                            />
                          </div>
                          {loginErrors.email && (
                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                              <AlertCircle className="w-4 h-4" />
                              {loginErrors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="loginPassword">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                            <Input 
                              id="loginPassword" 
                              type="password" 
                              className={`pl-10 ${loginErrors.password ? 'border-red-500' : ''}`}
                              {...registerLogin("password")}
                            />
                          </div>
                          {loginErrors.password && (
                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                              <AlertCircle className="w-4 h-4" />
                              {loginErrors.password.message}
                            </p>
                          )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading}>
                          {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                      </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                      <Button variant="link" className="text-sm text-muted-foreground" aria-label="Reset your password">
                        Forgot password?
                      </Button>
                      <div className="text-center text-xs text-muted-foreground pt-2 border-t">
                        By signing in, you agree to our <Button variant="link" className="p-0 h-auto text-xs">Terms of Service</Button> and <Button variant="link" className="p-0 h-auto text-xs">Privacy Policy</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="signup" role="tabpanel" aria-labelledby="signup">
                  <Card className="shadow-card border-border/50" aria-labelledby="signup-card-title">
                    <CardHeader>
                      <CardTitle id="signup-card-title">Join the community</CardTitle>
                      <CardDescription>Create your account to get started</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                              <Input 
                                id="firstName" 
                                className="pl-10"
                                value={step1Data.firstName}
                                onChange={(e) => setStep1Data({...step1Data, firstName: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                              <Input 
                                id="lastName" 
                                className="pl-10"
                                value={step1Data.lastName}
                                onChange={(e) => setStep1Data({...step1Data, lastName: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="authMethod">Contact Method</Label>
                          <div className="flex gap-2" role="radiogroup" aria-label="Select contact method">
                            <Button 
                              type="button" 
                              variant={authMethod === "email" ? "default" : "outline"} 
                              className="flex-1"
                              onClick={() => setAuthMethod("email")}
                              role="radio"
                              aria-checked={authMethod === "email"}
                            >
                              Email
                            </Button>
                            <Button 
                              type="button" 
                              variant={authMethod === "phone" ? "default" : "outline"} 
                              className="flex-1"
                              onClick={() => setAuthMethod("phone")}
                              role="radio"
                              aria-checked={authMethod === "phone"}
                            >
                              Phone
                            </Button>
                          </div>
                        </div>
                        
                        {authMethod === "email" ? (
                          <div className="space-y-2">
                            <Label htmlFor="signupEmail">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                              <Input 
                                id="signupEmail" 
                                type="email" 
                                placeholder="you@church.com" 
                                className="pl-10"
                                value={step1Data.email}
                                onChange={(e) => setStep1Data({...step1Data, email: e.target.value})}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor="signupPhone">Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                              <Input 
                                id="signupPhone" 
                                type="tel" 
                                placeholder="+1 (234) 567-8900" 
                                className="pl-10"
                                value={step1Data.phone}
                                onChange={(e) => setStep1Data({...step1Data, phone: e.target.value})}
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="signupPassword">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                            <Input 
                              id="signupPassword" 
                              type="password" 
                              className="pl-10"
                              value={step1Data.password}
                              onChange={(e) => setStep1Data({...step1Data, password: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                            <Input 
                              id="confirmPassword" 
                              type="password" 
                              className="pl-10"
                              value={step1Data.confirmPassword}
                              onChange={(e) => setStep1Data({...step1Data, confirmPassword: e.target.value})}
                            />
                          </div>
                          {step1Data.password !== step1Data.confirmPassword && step1Data.password && step1Data.confirmPassword && (
                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                              <AlertCircle className="w-4 h-4" />
                              Passwords don't match
                            </p>
                          )}
                        </div>
                        
                        <Button 
                          type="button" 
                          className="w-full" 
                          disabled={isLoading} 
                          onClick={handleStep1Submit}
                        >
                          Continue to Church Selection
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}

            {currentStep === 2 && (
              <Card className="shadow-card border-border/50">
                <CardHeader>
                  <CardTitle>Join Your Church</CardTitle>
                  <CardDescription>Select your denomination and branch</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChurchSelection} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="denomination">Denomination</Label>
                      <Select value={denomination} onValueChange={setDenomination}>
                        <SelectTrigger className="w-full" id="denomination">
                          <SelectValue placeholder="Select your denomination" />
                        </SelectTrigger>
                        <SelectContent id="denomination-options" role="listbox">
                          {denominations.map((denom) => (
                            <SelectItem key={denom.id} value={denom.id} role="option">{denom.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch/Location</Label>
                      <Select value={branch} onValueChange={setBranch}>
                        <SelectTrigger className="w-full" id="branch">
                          <SelectValue placeholder="Select your branch" />
                        </SelectTrigger>
                        <SelectContent id="branch-options" role="listbox">
                          {denominations.find(d => d.id === denomination)?.branches.map(branch => (
                            <SelectItem key={branch} value={branch} role="option">{branch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <Input 
                          id="location" 
                          type="text" 
                          placeholder="Enter your city or region" 
                          className="pl-10"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setCurrentStep(1)} aria-label="Go back to previous step">
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Continue"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="shadow-card border-border/50">
                <CardHeader>
                  <CardTitle>Finalize Your Profile</CardTitle>
                  <CardDescription>Choose your role in the church community</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRoleAssignment} className="space-y-6">
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="radiogroup" aria-label="Select your role in the church">
                        {roles.map((roleOption) => (
                          <div 
                            key={roleOption.id}
                            className={`p-4 rounded-lg cursor-pointer border-2 ${role === roleOption.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'} transition-all`}
                            onClick={() => setRole(roleOption.id)}
                            role="radio"
                            aria-checked={role === roleOption.id}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                setRole(roleOption.id);
                              }
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${role === roleOption.id ? 'border-primary' : 'border-muted-foreground'}`}>
                                {role === roleOption.id && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                              </div>
                              <span className="font-medium">{roleOption.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Church Information</Label>
                      <div className="p-4 rounded-lg bg-muted/50" aria-label="Selected church information">
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="w-4 h-4" aria-hidden="true" />
                          <span className="font-medium">{denomination ? denominations.find(d => d.id === denomination)?.name : denominations[0]?.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Main Branch</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setCurrentStep(2)} aria-label="Go back to previous step">
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isLoading} aria-busy={isLoading}>
                        {isLoading ? "Creating profile..." : "Complete Registration"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;