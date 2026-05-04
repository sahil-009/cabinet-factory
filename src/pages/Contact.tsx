import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(4, "Phone is required").max(40),
  email: z.string().trim().email("Invalid email").max(255),
  requirements: z.string().trim().min(10, "Tell us a little more").max(1500),
});

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      requirements: fd.get("requirements"),
    });
    if (!parsed.success) {
      toast({ title: "Please check the form", description: parsed.error.errors[0]?.message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast({ title: "Thanks — we'll be in touch", description: "Our team will reply within one working day." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <section className="container py-16 md:py-24">
        <span className="eyebrow"><span className="h-px w-8 bg-foreground/40" /> Contact</span>
        <h1 className="mt-3 font-serif text-5xl md:text-7xl leading-[1] max-w-3xl">
          Let's design something <em className="text-accent not-italic">enduring</em>.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Tell us about your space and what you'd like to create — we'll respond within one working day.
        </p>
      </section>

      <section className="container pb-24 grid lg:grid-cols-5 gap-8">
        <RevealOnScroll className="lg:col-span-3">
          <form onSubmit={onSubmit} className="rounded-[2rem] bg-card border border-border p-6 md:p-10 shadow-soft space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" maxLength={100} required className="mt-1.5 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" maxLength={40} required className="mt-1.5 rounded-xl" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" maxLength={255} required className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea id="requirements" name="requirements" maxLength={1500} required rows={6} className="mt-1.5 rounded-xl" placeholder="Tell us about your project — rooms, style, timeline." />
            </div>
            <Button type="submit" disabled={submitting} size="lg" className="rounded-full bg-primary hover:bg-primary/90 hover:scale-[1.03] hover:shadow-glow transition-all">
              {submitting ? "Sending..." : (<>Send Enquiry <Send className="ml-2 h-4 w-4" /></>)}
            </Button>
          </form>
        </RevealOnScroll>

        <RevealOnScroll delay={120} className="lg:col-span-2">
          <aside className="rounded-[2rem] bg-secondary/60 border border-border p-6 md:p-10 h-full">
            <h3 className="font-serif text-2xl">Studio</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3"><MapPin className="h-5 w-5 text-accent shrink-0" /> 14 Atelier Lane, Lisbon, Portugal</li>
              <li className="flex gap-3"><Phone className="h-5 w-5 text-accent shrink-0" /> +351 910 000 000</li>
              <li className="flex gap-3"><Mail className="h-5 w-5 text-accent shrink-0" /> hello@cabinetfactory.co</li>
            </ul>
            <div className="mt-6 rounded-2xl overflow-hidden border border-border">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-9.16%2C38.70%2C-9.10%2C38.74&layer=mapnik"
                className="w-full h-[260px]"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Visits by appointment, Tuesday to Saturday.</p>
          </aside>
        </RevealOnScroll>
      </section>
    </>
  );
};

export default Contact;
