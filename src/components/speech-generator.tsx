
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Download, Twitter, Facebook, Sparkles, AudioLines, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { handleSpeechGeneration } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

const FormSchema = z.object({
  prompt: z.string(),
});

export function SpeechGenerator() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
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
    setAudioUrl(null);
    const result = await handleSpeechGeneration(data.prompt);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error,
      });
    } else if (result.audioUrl) {
      setAudioUrl(result.audioUrl);
      toast({
        title: 'Generated speech!',
        description: 'Your text has been converted to audio.',
      });
    }
  }

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `visually-generated-speech-${Date.now()}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const shareOnTwitter = () => {
    const text = encodeURIComponent('Check out this audio I generated with Visually! ✨');
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
          Speech Generation
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
                      placeholder="e.g., Hello, world! This is a test of the text-to-speech generator."
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
                  Generating...
                </>
              ) : (
                'Generate Speech'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

        {(isLoading || audioUrl) && (
            <CardFooter className="flex-col gap-4 !pt-0">
              <div className="w-full relative">
                {isLoading ? (
                    <div className="w-full h-24 flex items-center justify-center rounded-lg bg-black/20 border-2 border-dashed border-border">
                        <Skeleton className="h-12 w-full"/>
                    </div>
                ) : audioUrl ? (
                    <div className="w-full rounded-lg bg-black/20 border-2 border-dashed border-border flex items-center justify-center p-4">
                        <audio
                            src={audioUrl}
                            controls
                            className="w-full"
                        />
                    </div>
                ) : (
                  <div className="w-full h-24 rounded-lg bg-black/20 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center gap-4 text-muted-foreground">
                        <AudioLines size={48} />
                        <p>Your generated audio will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              {audioUrl && !isLoading && (
              <div className="flex w-full gap-2 justify-center">
                  <Button variant="outline" onClick={() => handleDownload(audioUrl)} className={buttonStyle}>
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
