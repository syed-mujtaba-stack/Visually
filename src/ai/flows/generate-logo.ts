
'use server';

/**
 * @fileOverview Generates a logo based on a text prompt using the Gemini Vision API.
 *
 * - generateLogo - A function that handles the logo generation process.
 * - GenerateLogoInput - The input type for the generateLogo function.
 * - GenerateLogoOutput - The return type for the generateLogo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLogoInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate a logo from.'),
  count: z.number().optional().default(1).describe('The number of logos to generate.'),
});
export type GenerateLogoInput = z.infer<typeof GenerateLogoInputSchema>;

const GenerateLogoOutputSchema = z.object({
  imageUrls: z.array(z.string()).describe('The data URIs of the generated logos.'),
});
export type GenerateLogoOutput = z.infer<typeof GenerateLogoOutputSchema>;

export async function generateLogo(input: GenerateLogoInput): Promise<GenerateLogoOutput> {
  return generateLogoFlow(input);
}

const generateLogoFlow = ai.defineFlow(
  {
    name: 'generateLogoFlow',
    inputSchema: GenerateLogoInputSchema,
    outputSchema: GenerateLogoOutputSchema,
  },
  async (input) => {
    const generationPromises = Array.from({ length: input.count }, () =>
      ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Create a professional, minimalist, and iconic logo for: ${input.prompt}. The logo should be on a clean, solid background.`,
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
