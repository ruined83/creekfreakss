import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Shield, TreePine } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const REMEMBER_EMAIL_KEY = "admin_remembered_email";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

const AdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [rememberMe, setRememberMe] = useState(false);
  const { user, isAdmin, loading, adminCheckLoading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
    if (rememberedEmail) {
      form.setValue("email", rememberedEmail);
      setRememberMe(true);
    }
  }, [form]);

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, loading, navigate]);

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    
    // Handle remember me
    if (rememberMe) {
      localStorage.setItem(REMEMBER_EMAIL_KEY, data.email);
    } else {
      localStorage.removeItem(REMEMBER_EMAIL_KEY);
    }
    
    try {
      if (activeTab === "login") {
        const { error } = await signIn(data.email, data.password);
        if (error) {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "Checking admin access...",
          });
        }
      } else {
        const { error } = await signUp(data.email, data.password);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account exists",
              description: "This email is already registered. Please login instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Signup failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Account created!",
            description: "Contact the site owner to get admin access.",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || adminCheckLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 border border-border shadow-soft text-center">
          <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
            Access Denied
          </h1>
          <p className="text-muted-foreground mb-6">
            Your account doesn't have admin privileges. Contact the site owner if you believe this is an error.
          </p>
          <Button variant="outline" onClick={() => navigate("/")}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TreePine className="w-8 h-8 text-primary" />
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Admin Access
          </h1>
          <p className="text-muted-foreground">
            Manage tributes and confirm donations
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="admin@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {activeTab === "login" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm text-muted-foreground cursor-pointer select-none"
                    >
                      Remember me
                    </label>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {activeTab === "login" ? "Logging in..." : "Creating account..."}
                    </>
                  ) : (
                    activeTab === "login" ? "Login" : "Create Account"
                  )}
                </Button>
              </form>
            </Form>
          </Tabs>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/")}>
            ← Back to site
          </Button>
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;
