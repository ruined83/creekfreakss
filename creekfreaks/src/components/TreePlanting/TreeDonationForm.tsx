import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Upload, TreePine, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const tributeSchema = z.object({
  honoreeName: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  dedicationMessage: z.string().max(500, "Message must be less than 500 characters").optional(),
  birthDate: z.date().optional(),
  passingDate: z.date().optional(),
  donorName: z.string().min(1, "Your name is required").max(100, "Name must be less than 100 characters"),
  donorEmail: z.string().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  donationAmount: z.string().optional(),
  paymentMethod: z.enum(["venmo", "cashapp"]),
});

type TributeFormData = z.infer<typeof tributeSchema>;

export function TreeDonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<TributeFormData>({
    resolver: zodResolver(tributeSchema),
    defaultValues: {
      honoreeName: "",
      dedicationMessage: "",
      donorName: "",
      donorEmail: "",
      donationAmount: "",
      paymentMethod: "venmo",
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: TributeFormData) => {
    setIsSubmitting(true);
    try {
      let photoUrl: string | null = null;

      // Upload photo if provided
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('honoree-photos')
          .upload(fileName, photoFile);

        if (uploadError) {
          console.error("Photo upload error:", uploadError);
          toast({
            title: "Photo upload failed",
            description: "We couldn't upload the photo, but will continue with the tribute.",
            variant: "destructive",
          });
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('honoree-photos')
            .getPublicUrl(fileName);
          photoUrl = publicUrl;
        }
      }

      // Insert tribute
      const { error } = await supabase.from('tree_tributes').insert({
        honoree_name: data.honoreeName,
        dedication_message: data.dedicationMessage || null,
        honoree_photo_url: photoUrl,
        birth_date: data.birthDate ? format(data.birthDate, 'yyyy-MM-dd') : null,
        passing_date: data.passingDate ? format(data.passingDate, 'yyyy-MM-dd') : null,
        donor_name: data.donorName,
        donor_email: data.donorEmail,
        donation_amount: data.donationAmount ? parseFloat(data.donationAmount) : null,
        payment_method: data.paymentMethod,
        payment_confirmed: false,
        is_public: true,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Tribute Submitted!",
        description: "Thank you for honoring your loved one. Please complete your donation below.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-16 bg-background" id="donate-form">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft text-center">
              <TreePine className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Thank You for Your Tribute!
              </h2>
              <p className="text-muted-foreground mb-8">
                Your tribute has been submitted. To complete the tree planting, 
                please send your donation using one of the methods below.
              </p>
              
              <div className="space-y-6">
                <div className="bg-secondary/50 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">Venmo</h3>
                  <p className="text-2xl font-bold text-primary">@brice1983</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Include the honoree's name in the note
                  </p>
                </div>
                
                <div className="bg-secondary/50 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">CashApp</h3>
                  <p className="text-2xl font-bold text-accent">$Williambrian1983</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Include the honoree's name in the note
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-8">
                Once we confirm your donation, your tribute will appear on the memorial wall.
              </p>

              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {
                  setSubmitted(false);
                  form.reset();
                  setPhotoFile(null);
                  setPhotoPreview(null);
                }}
              >
                Submit Another Tribute
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background" id="donate-form">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Create a Tribute
            </h2>
            <p className="text-muted-foreground">
              Share the story of someone special and plant a tree in their memory
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                  About Your Loved One
                </h3>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="honoreeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Their Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter their name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dedicationMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dedication Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share a memory, quote, or message in their honor..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Photo Upload */}
                  <div>
                    <Label>Photo (Optional)</Label>
                    <div className="mt-2">
                      {photoPreview ? (
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-border">
                          <img 
                            src={photoPreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoFile(null);
                              setPhotoPreview(null);
                            }}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : "Select date"}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date()}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="passingDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Passing</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : "Select date"}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date()}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                  Your Information
                </h3>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="donorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="donorEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="donationAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Donation Amount (Optional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input 
                                type="number" 
                                placeholder="0.00" 
                                className="pl-7"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method *</FormLabel>
                          <div className="flex gap-3">
                            <Button
                              type="button"
                              variant={field.value === "venmo" ? "default" : "outline"}
                              className="flex-1"
                              onClick={() => field.onChange("venmo")}
                            >
                              Venmo
                            </Button>
                            <Button
                              type="button"
                              variant={field.value === "cashapp" ? "default" : "outline"}
                              className="flex-1"
                              onClick={() => field.onChange("cashapp")}
                            >
                              CashApp
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <TreePine className="mr-2 h-5 w-5" />
                    Submit Tribute & Get Payment Info
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
