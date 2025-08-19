
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from "lucide-react";

const blogPosts = [
    {
        title: "The Art of the Perfect Prompt: Getting the Most Out of AI",
        date: "August 18, 2025",
        tags: ["AI", "Creativity", "Tips"],
        summary: "Learn how to craft prompts that will unlock the full potential of our AI generators. From image details to story plots, we cover it all.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "abstract art",
    },
    {
        title: "Behind the Pixels: How Our Video Generation AI Works",
        date: "August 15, 2025",
        tags: ["Video", "Tech", "Deep Dive"],
        summary: "Take a journey into the complex world of AI video generation. We break down the technology that powers your creations.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "glowing circuit",
    },
    {
        title: "Visually for Business: Creating Logos That Stand Out",
        date: "August 10, 2025",
        tags: ["Business", "Logos", "Branding"],
        summary: "Discover how you can leverage Visually to create a professional and memorable brand identity for your business in minutes.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "modern office",
    },
];

export default function BlogsPage() {
  return (
    <main className="container mx-auto flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl font-bold font-headline tracking-tighter sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-accent/80">
          The Visually Blog
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
          Insights, tutorials, and inspiration from the frontiers of AI-powered creativity.
        </p>
      </div>

      <div className="mt-16 w-full max-w-4xl grid grid-cols-1 gap-8">
        {blogPosts.map((post, index) => (
          <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl shadow-black/50 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    data-ai-hint={post.imageHint}
                />
            </div>
            <div className="md:w-2/3 flex flex-col">
              <CardHeader>
                <div className="flex gap-2 mb-2">
                    {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link href="#" className="flex items-center gap-2 text-primary font-bold hover:underline">
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
