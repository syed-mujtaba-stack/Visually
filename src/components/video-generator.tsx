
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Download, Twitter, Facebook, Sparkles, Video, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { handleVideoGeneration } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

const FormSchema = z.object({
  prompt: z.string(),
});

export function VideoGenerator() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
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
    setVideoUrl(null);
    const result = await handleVideoGeneration(data.prompt);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error,
      });
    } else if (result.videoUrl) {
      setVideoUrl(result.videoUrl);
      toast({
        title: 'Generated video!',
        description: 'Your vision has been brought to life.',
      });
    }
  }

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `visually-generated-video-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const shareOnTwitter = () => {
    const text = encodeURIComponent('Check out this video I generated with Visually! ✨');
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
          Video Generation
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
                      placeholder="e.g., A majestic dragon soaring over a mystical forest at dawn."
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
                  Generating... (this may take a minute)
                </>
              ) : (
                'Generate Video'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

        {(isLoading || videoUrl) && (
            <CardFooter className="flex-col gap-4 !pt-0">
              <div className="w-full aspect-video relative">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center rounded-lg bg-black/20 border-2 border-dashed border-border">
                        <Skeleton className="h-full w-full"/>
                    </div>
                ) : videoUrl ? (
                    <div className="w-full aspect-video rounded-lg bg-black/20 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                        <video
                            src={videoUrl}
                            controls
                            className="object-contain w-full h-full"
                            data-ai-hint="futuristic city"
                        />
                    </div>
                ) : (
                  <div className="w-full aspect-video rounded-lg bg-black/20 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center gap-4 text-muted-foreground">
                        <Video size={48} />
                        <p>Your generated video will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              {videoUrl && !isLoading && (
              <div className="flex w-full gap-2 justify-center">
                  <Button variant="outline" onClick={() => handleDownload(videoUrl)} className={buttonStyle}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" onClick={shareOnTwitter} className={buttonStyle}>
                      <Twitter className="mr-2 h-4 w-4" />
                      Share
                  </Button>
                  <Button variant="outline" onClick={shareOnFacebook} className={buttonStyle}>
                      <Facebook className="mr-2 h-4 w-4" />
                      Share
                  </Button>
              </div>
              )}
            </CardFooter>
        )}
    </Card>
  );
}
