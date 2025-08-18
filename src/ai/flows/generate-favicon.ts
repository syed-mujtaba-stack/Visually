
'use server';

/**
 * @fileOverview Generates a favicon based on a text prompt using the Gemini Vision API.
 *
 * - generateFavicon - A function that handles the favicon generation process.
 * - GenerateFaviconInput - The input type for the generateFavicon function.
 * - GenerateFaviconOutput - The return type for the generateFavicon function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFaviconInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate a favicon from.'),
  count: z.number().optional().default(1).describe('The number of favicons to generate.'),
});
export type GenerateFaviconInput = z.infer<typeof GenerateFaviconInputSchema>;

const GenerateFaviconOutputSchema = z.object({
  imageUrls: z.array(z.string()).describe('The data URIs of the generated favicons.'),
});
export type GenerateFaviconOutput = z.infer<typeof GenerateFaviconOutputSchema>;

export async function generateFavicon(input: GenerateFaviconInput): Promise<GenerateFaviconOutput> {
  return generateFaviconFlow(input);
}

const generateFaviconFlow = ai.defineFlow(
  {
    name: 'generateFaviconFlow',
    inputSchema: GenerateFaviconInputSchema,
    outputSchema: GenerateFaviconOutputSchema,
  },
  async (input) => {
    const generationPromises = Array.from({ length: input.count }, () =>
      ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Create a simple, modern, and iconic favicon for a website about: ${input.prompt}. The favicon should be clear at small sizes, square, and on a solid background.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      })
    );

    const results = await Promise.all(generationPromises);
    const imageUrls = results.map(result => result.media?.url!).filter(Boolean);

    return { imageUrls };
  }
);
