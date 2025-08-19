
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Download, Twitter, Facebook, Sparkles, Image as ImageIcon, LoaderCircle, DownloadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { handleLogoGeneration } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const FormSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required.',
  }).max(50, {
      message: 'Prompt cannot exceed 50 characters.'
  }),
  count: z.coerce.number().min(1).max(10),
});

export function LogoGenerator() {
  const [imageUrls, setImageUrls] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: '',
      count: 1,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setImageUrls(null);
    const result = await handleLogoGeneration(data.prompt, data.count);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error,
      });
    } else if (result.imageUrls) {
      setImageUrls(result.imageUrls);
      toast({
        title: `Generated ${result.imageUrls.length} logo(s)!`,
        description: 'Your vision has been brought to life.',
      });
    }
  }

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `visually-generated-logo-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDownloadAll = () => {
    imageUrls?.forEach((url, index) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `visually-generated-logo-${Date.now()}-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent('Check out this logo I generated with Visually! ✨');
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
          Logo Generation
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
                    <Input
                      placeholder="e.g., A minimalist logo for 'Visually'"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of logos" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                          <SelectItem key={num} value={String(num)}>
                            {num} Logo{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className={`w-2/3 font-bold ${buttonStyle}`}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Logo'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

        {(isLoading || imageUrls) && (
            <CardFooter className="flex-col gap-4 !pt-0">
              <div className="w-full aspect-square relative">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center rounded-lg bg-black/20 border-2 border-dashed border-border">
                        <Skeleton className="h-[512px] w-[512px]"/>
                    </div>
                ) : imageUrls && imageUrls.length > 0 ? (
                  <Carousel className="w-full max-w-full">
                    <CarouselContent>
                      {imageUrls.map((url, index) => (
                        <CarouselItem key={index} className="flex flex-col items-center justify-center gap-4">
                          <div className="w-full aspect-square rounded-lg bg-black/20 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                            <Image
                              src={url}
                              alt={`Generated logo ${index + 1}`}
                              width={512}
                              height={512}
                              className="object-contain"
                              data-ai-hint="logo"
                            />
                           </div>
                           <Button variant="outline" onClick={() => handleDownload(url)} className={buttonStyle}>
                              <Download className="mr-2 h-4 w-4" />
                              Download Logo {index + 1}
                           </Button>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {imageUrls.length > 1 && (
                      <>
                        <CarouselPrevious />
                        <CarouselNext />
                      </>
                    )}
                  </Carousel>
                ) : (
                  <div className="w-full aspect-square rounded-lg bg-black/20 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center gap-4 text-muted-foreground">
                        <ImageIcon size={48} />
                        <p>Your generated logo will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              {imageUrls && !isLoading && (
              <div className="flex w-full gap-2 justify-center">
                  {imageUrls.length > 1 && (
                    <Button variant="outline" onClick={handleDownloadAll} className={buttonStyle}>
                      <DownloadCloud className="mr-2 h-4 w-4" />
                      Download All
                    </Button>
                  )}
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
