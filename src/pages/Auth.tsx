import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { Church, ArrowLeft, Mail, Lock, User, Building2, MapPin, Phone, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, loginSchema } from "@/lib/validation";
import { RegisterFormData, LoginFormData } from "@/lib/validation";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Auth, 2: Church Selection, 3: Role Assignment
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");

  // Login form setup
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
    reset: resetLogin
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  // Registration form setup
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors },
    watch: watchRegister,
    reset: resetRegister
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      denomination: "",
      branch: "",
      role: "",
      location: ""
    }
  });

  // Watch for password confirmation match
  const password = watchRegister("password");
  const confirmPassword = watchRegister("confirmPassword");

  const navigate = useNavigate();

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

  const handleLoginSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleRegisterSubmit = (data: RegisterFormData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2); // Move to church selection
      resetRegister(); // Reset just the registration form
    }, 1000);
  };

  const handleChurchSelection = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3); // Move to role assignment
    }, 1000);
  };

  const handleRoleAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call finalizing registration
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard"); // Redirect to dashboard after successful registration
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in" role="main">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors" aria-label="Return to home page">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        
        <div className="flex items-center justify-center gap-2 mb-8">
          <Church className="w-8 h-8 text-primary" aria-hidden="true" />
          <h1 className="text-2xl font-bold">ChurchConnect</h1>
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
          <Tabs defaultValue="signin" className="w-full" role="tablist">
            <TabsList className="grid w-full grid-cols-2" role="tablist" aria-orientation="horizontal">
              <TabsTrigger value="signin" role="tab">Sign In</TabsTrigger>
              <TabsTrigger value="signup" role="tab">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" role="tabpanel" aria-labelledby="signin">
              <Card className="shadow-card border-border/50" aria-labelledby="signin-card-title">
                <CardHeader>
                  <CardTitle id="signin-card-title">Welcome back</CardTitle>
                  <CardDescription>Sign in to connect with your faith community</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitLogin(handleLoginSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail">Email</Label>
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
                <CardFooter className="flex justify-center">
                  <Button variant="link" className="text-sm text-muted-foreground" aria-label="Reset your password">
                    Forgot password?
                  </Button>
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
                  <form onSubmit={handleSubmitRegister(handleRegisterSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                          <Input 
                            id="firstName" 
                            className={`pl-10 ${registerErrors.firstName ? 'border-red-500' : ''}`}
                            {...registerRegister("firstName")}
                          />
                        </div>
                        {registerErrors.firstName && (
                          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {registerErrors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                          <Input 
                            id="lastName" 
                            className={`pl-10 ${registerErrors.lastName ? 'border-red-500' : ''}`}
                            {...registerRegister("lastName")}
                          />
                        </div>
                        {registerErrors.lastName && (
                          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {registerErrors.lastName.message}
                          </p>
                        )}
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
                            className={`pl-10 ${registerErrors.email ? 'border-red-500' : ''}`}
                            {...registerRegister("email")}
                          />
                        </div>
                        {registerErrors.email && (
                          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {registerErrors.email.message}
                          </p>
                        )}
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
                            className={`pl-10 ${registerErrors.phone ? 'border-red-500' : ''}`}
                            {...registerRegister("phone")}
                          />
                        </div>
                        {registerErrors.phone && (
                          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {registerErrors.phone.message}
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <Input 
                          id="signupPassword" 
                          type="password" 
                          className={`pl-10 ${registerErrors.password ? 'border-red-500' : ''}`}
                          {...registerRegister("password")}
                        />
                      </div>
                      {registerErrors.password && (
                        <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {registerErrors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          className={`pl-10 ${registerErrors.confirmPassword ? 'border-red-500' : ''}`}
                          {...registerRegister("confirmPassword")}
                        />
                      </div>
                      {registerErrors.confirmPassword && (
                        <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {registerErrors.confirmPassword.message}
                        </p>
                      )}
                      {password !== confirmPassword && !registerErrors.confirmPassword && password && confirmPassword && (
                        <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          Passwords don't match
                        </p>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading}>
                      {isLoading ? "Creating account..." : "Continue to Church Selection"}
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
                  <Select name="denomination" onValueChange={(value) => {
                    // Update the field using React Hook Form's setValue if needed
                    // For now, we'll just update the state
                  }}>
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
                  <Select name="branch" onValueChange={(value) => {
                    // Update the field using React Hook Form's setValue if needed
                    // For now, we'll just update the state
                  }} disabled={true}>
                    <SelectTrigger className="w-full" id="branch" aria-disabled={true}>
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent id="branch-options" role="listbox">
                      {denominations[0]?.branches.map(branch => (
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
                    {roles.map((role) => (
                      <div 
                        key={role.id}
                        className="p-4 rounded-lg cursor-pointer border-2 border-border hover:border-primary/30 transition-all"
                        onClick={() => {
                          // Update the field using React Hook Form's setValue if needed
                          // For now, we'll just update the state
                        }}
                        role="radio"
                        aria-checked={false}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            // Update the field using React Hook Form's setValue if needed
                            // For now, we'll just update the state
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border border-muted-foreground flex items-center justify-center">
                          </div>
                          <span className="font-medium">{role.name}</span>
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
                      <span className="font-medium">{denominations[0]?.name}</span>
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
    </div>
  );
};

export default Auth;
