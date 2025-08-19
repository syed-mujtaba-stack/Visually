
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
    });
    (e.target as HTMLFormElement).reset();
  }

  const buttonStyle = "transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--accent)/0.7)] hover:text-accent-foreground hover:bg-accent";

  return (
    <main className="container mx-auto flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl font-bold font-headline tracking-tighter sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-accent/80">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
          Have a question, a project idea, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl shadow-black/50">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Fill out the form and we'll get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Textarea placeholder="Your Message" rows={5} required />
              <Button type="submit" className={`w-full ${buttonStyle}`}>Send Message</Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-6">
            <h3 className="text-2xl font-bold font-headline">Contact Information</h3>
            <div className="flex items-center gap-4">
                <Mail className="text-primary"/>
                <a href="mailto:contact@visually.ai" className="text-muted-foreground hover:text-foreground">contact@visually.ai</a>
            </div>
            <div className="flex items-center gap-4">
                <Phone className="text-primary"/>
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
            </div>
            <h3 className="text-2xl font-bold font-headline mt-8">Follow Us</h3>
            <div className="flex gap-6">
                <Link href="#" className={`p-3 rounded-full bg-secondary ${buttonStyle}`}>
                    <Twitter />
                </Link>
                <Link href="#" className={`p-3 rounded-full bg-secondary ${buttonStyle}`}>
                    <Facebook />
                </Link>
                <Link href="#" className={`p-3 rounded-full bg-secondary ${buttonStyle}`}>
                    <Instagram />
                </Link>
            </div>
        </div>
      </div>
    </main>
  );
}
