
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const prompts = {
    image: [
        "A hyper-realistic portrait of an ancient warrior queen, intricate armor, piercing gaze, dramatic lighting, 8k",
        "A surreal, floating island in a vibrant sky, waterfalls cascading into the clouds, mystical creatures flying around, fantasy art style",
        "An elegant art deco lobby of a futuristic space hotel, sleek golden lines, holographic displays, robots in bellhop uniforms",
        "A cozy, cluttered bookstore on a rainy day, warm light from a fireplace, steam rising from a coffee cup, impressionist painting style"
    ],
    logo: [
        "A minimalist logo for a coffee brand named 'Aura', using a simple coffee bean and steam lines, modern and clean",
        "An emblem-style logo for 'Summit Financial', featuring a stylized mountain peak inside a circle, conveying stability and growth",
        "A wordmark logo for a tech startup 'Innovate', with the 'o' replaced by a lightbulb icon, energetic and smart",
        "A mascot logo for a gaming team called 'The Crimson Vipers', featuring a fierce, stylized viper head, red and black color scheme"
    ],
    video: [
        "A cinematic time-lapse of a bustling city from day to night, showing traffic streaks and buildings lighting up",
        "A slow-motion shot of a drop of water hitting a surface and creating a beautiful splash crown",
        "An animated scene of a rocket launching from a lush, alien planet with two suns in the sky",
        "A drone shot flying over a majestic mountain range at sunrise, with golden light hitting the peaks"
    ],
    story: [
        "A detective in a cyberpunk city who has to solve a murder where the only witness is an android parrot that can only mimic sounds.",
        "A young librarian discovers a book that writes itself, documenting the life of whoever holds it in real-time.",
        "In a world where memories can be bottled and sold, a thief steals a collection of a lost loved one's memories, only to find they are not what they expected.",
        "The last two robots on Earth, one an optimist and one a pessimist, go on a road trip to find a rumored data center containing the consciousness of humanity."
    ]
}

export default function PromptsPage() {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add a toast notification here if you have one set up
  }

  return (
    <main className="container mx-auto flex min-h-[calc(100vh-5rem)] flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl font-bold font-headline tracking-tighter sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-accent/80">
          Prompt Library
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
          Stuck for ideas? Use these expertly crafted prompts as inspiration for your next masterpiece. Click any prompt to copy it to your clipboard.
        </p>
      </div>

      <div className="mt-16 w-full max-w-4xl">
        <Accordion type="multiple" className="w-full space-y-4">
            <PromptCategory title="Image Prompts" prompts={prompts.image} />
            <PromptCategory title="Logo Prompts" prompts={prompts.logo} />
            <PromptCategory title="Video Prompts" prompts={prompts.video} />
            <PromptCategory title="Story Prompts" prompts={prompts.story} />
        </Accordion>
      </div>
    </main>
  );
}


function PromptCategory({ title, prompts }: { title: string; prompts: string[] }) {
    const copyToClipboard = (text: string) => {
        if(typeof window !== 'undefined'){
            navigator.clipboard.writeText(text);
            // You might want to show a toast here
        }
    }
    return (
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
            <AccordionItem value={title} className="border-b-0">
                <AccordionTrigger className="p-6 text-xl font-bold font-headline">
                    {title}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                    <ul className="space-y-4">
                        {prompts.map((prompt, index) => (
                            <li key={index} className="flex items-center justify-between gap-4 p-4 rounded-md bg-secondary/50">
                                <p className="text-muted-foreground text-left">{prompt}</p>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(prompt)} title="Copy prompt">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Card>
    )
}
