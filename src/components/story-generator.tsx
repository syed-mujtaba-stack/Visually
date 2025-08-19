
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Download, Twitter, Facebook, Sparkles, LoaderCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { handleStoryGeneration } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import type { GenerateStoryOutput } from '@/ai/flows/generate-story';

const FormSchema = z.object({
  prompt: z.string(),
});

export function StoryGenerator() {
  const [story, setStory] = useState<GenerateStoryOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.prompt) {
        form.setError("prompt", {
            type: "manual",
            message: "Prompt is required.",
        });
        return;
    }
    setIsLoading(true);
    setStory(null);
    const result = await handleStoryGeneration(data.prompt);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error,
      });
    } else if (result.story) {
        setStory(result.story);
      toast({
        title: 'Generated story!',
        description: 'Your story has been created.',
      });
    }
  }

  const handleDownloadImage = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `visually-generated-story-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDownloadAudio = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `visually-generated-story-audio-${Date.now()}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent('Check out this story I generated with Visually! ✨');
    const url = encodeURIComponent('https://github.com/firebase/studio');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent('https://github.com/firebase/studio');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };
  
  const buttonStyle = "transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--accent)/0.7)] hover:text-accent-foreground hover:bg-accent";

  return (
    <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl shadow-black/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Sparkles className="text-primary" />
          Story Generation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A lost robot searching for its creator in a post-apocalyptic world."
                      className="resize-none min-h-[100px] text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className={`w-full font-bold ${buttonStyle}`}>
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Generating Story... (this can take a moment)
                </>
              ) : (
                'Generate Story'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

        {(isLoading || story) && (
            <CardFooter className="flex-col gap-4 !pt-0">
                {isLoading ? (
                    <div className="w-full flex flex-col gap-4">
                        <Skeleton className="h-8 w-1/2 self-center" />
                        <Skeleton className="w-full aspect-video" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                ) : story ? (
                    <div className="w-full flex flex-col gap-4 items-center text-left">
                        <h2 className="text-2xl font-bold font-headline">{story.title}</h2>
                        <div className="w-full aspect-video rounded-lg bg-black/20 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                            <Image
                                src={story.imageUrl}
                                alt="Generated story cover"
                                width={512}
                                height={288}
                                className="object-contain"
                                data-ai-hint="story cover"
                            />
                        </div>
                        <div className="w-full rounded-lg bg-black/20 border-2 border-dashed border-border flex items-center justify-center p-4">
                            <audio
                                src={story.audioUrl}
                                controls
                                className="w-full"
                            />
                        </div>
                        <p className="w-full text-base text-foreground/90 whitespace-pre-wrap">{story.story}</p>
                        
                        <div className="flex w-full gap-2 justify-center">
                            <Button variant="outline" onClick={() => handleDownloadImage(story.imageUrl)} className={buttonStyle}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Image
                            </Button>
                            <Button variant="outline" onClick={() => handleDownloadAudio(story.audioUrl)} className={buttonStyle}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Audio
                            </Button>
                        </div>
                        <div className="flex w-full gap-2 justify-center">
                            <Button variant="outline" onClick={shareOnTwitter} className={buttonStyle}>
                                <Twitter className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                            <Button variant="outline" onClick={shareOnFacebook} className={buttonStyle}>
                                <Facebook className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                        </div>
                    </div>
                ) : (
                  <div className="w-full aspect-square rounded-lg bg-black/20 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center gap-4 text-muted-foreground">
                        <BookOpen size={48} />
                        <p>Your generated story will appear here</p>
                    </div>
                  </div>
                )}
            </CardFooter>
        )}
    </Card>
  );
}
