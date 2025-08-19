
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="container mx-auto flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl font-bold font-headline tracking-tighter sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-accent/80">
          About Visually
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
          We are a passionate team of developers and AI enthusiasts dedicated to pushing the boundaries of creativity. Our mission is to empower everyone to bring their ideas to life through the magic of artificial intelligence.
        </p>
      </div>

      <div className="w-full max-w-5xl mt-16">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="Team collaboration"
          width={1200}
          height={400}
          className="rounded-lg shadow-2xl"
          data-ai-hint="team collaboration"
        />
      </div>

      <div className="w-full max-w-4xl mt-16 text-center">
        <h2 className="text-4xl font-bold font-headline">Our Mission</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          In a world where visual content is king, we believe that the tools to create it should be accessible to all. Visually is designed to be an intuitive and powerful platform for generating images, logos, videos, and more, without needing any specialized design skills. We handle the technical complexity so you can focus on your vision.
        </p>
      </div>

      <div className="w-full max-w-4xl mt-16 text-center">
        <h2 className="text-4xl font-bold font-headline">Meet the Team</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          The brilliant minds making the magic happen.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">Jane Doe</h3>
            <p className="text-muted-foreground">Chief AI Officer</p>
          </div>
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">John Smith</h3>
            <p className="text-muted-foreground">Lead Frontend Engineer</p>
          </div>
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">Alex Brown</h3>
            <p className="text-muted-foreground">UX/UI Designer</p>
          </div>
        </div>
      </div>
    </main>
  );
}
