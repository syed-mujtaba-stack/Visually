
'use client';

import { useAuth } from "@/hooks/use-auth";
import { ImageGenerator } from "@/components/image-generator";
import { LogoGenerator } from "@/components/logo-generator";
import { SpeechGenerator } from "@/components/speech-generator";
import { StoryGenerator } from "@/components/story-generator";
import { ThreeScene } from "@/components/three-scene";
import { VideoGenerator } from "@/components/video-generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";


export default function Home() {
  const { user, loading } = useAuth();
  
  const buttonStyle = "transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--accent)/0.7)] hover:text-accent-foreground hover:bg-accent";

  return (
    <>
      <ThreeScene />
      <main className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-12 p-4 sm:p-8">
        <div className="w-full max-w-4xl text-center">
          <h1 
            className="text-5xl font-bold font-headline tracking-tighter sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-accent/80"
            style={{textShadow: '0 0 20px hsl(var(--primary) / 0.5)'}}
          >
            Visually
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Transform your ideas into stunning visuals. Just type a prompt and let our AI do the magic.
          </p>
        </div>

        {loading ? (
          <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl shadow-black/50">
            <CardContent className="p-12 flex items-center justify-center">
                <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            </CardContent>
          </Card>
        ) : user ? (
          <Tabs defaultValue="image" className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="logo">Logo</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="speech">Speech</TabsTrigger>
              <TabsTrigger value="story">Story</TabsTrigger>
            </TabsList>
            <TabsContent value="image">
              <ImageGenerator />
            </TabsContent>
            <TabsContent value="logo">
              <LogoGenerator />
            </TabsContent>
            <TabsContent value="video">
              <VideoGenerator />
            </TabsContent>
            <TabsContent value="speech">
              <SpeechGenerator />
            </TabsContent>
            <TabsContent value="story">
              <StoryGenerator />
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl shadow-black/50 text-center">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Welcome to Visually</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">Please log in or create an account to access the AI generators.</p>
                <div className="flex gap-4 justify-center">
                    <Button asChild className={buttonStyle}>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild variant="outline" className={buttonStyle}>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
