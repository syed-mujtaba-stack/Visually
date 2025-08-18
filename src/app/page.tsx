import { ImageGenerator } from "@/components/image-generator";
import { LogoGenerator } from "@/components/logo-generator";
import { ThreeScene } from "@/components/three-scene";
import { VideoGenerator } from "@/components/video-generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <>
      <ThreeScene />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-12 p-4 sm:p-8">
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
        <Tabs defaultValue="image" className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="image">Image Generator</TabsTrigger>
            <TabsTrigger value="logo">Logo Generator</TabsTrigger>
            <TabsTrigger value="video">Video Generator</TabsTrigger>
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
        </Tabs>
      </main>
    </>
  );
}
