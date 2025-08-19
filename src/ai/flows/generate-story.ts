
'use server';

/**
 * @fileOverview Generates a story with a cover image and audio narration.
 * 
 * - generateStory - A function that handles the story generation process.
 * - GenerateStoryInput - The input type for the generateStory function.
 * - GenerateStoryOutput - The return type for the generateStory function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { generateImage } from './generate-image';
import { generateSpeech } from './generate-speech';

const GenerateStoryInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate a story from.'),
});
export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

const GenerateStoryOutputSchema = z.object({
  title: z.string().describe('The title of the story.'),
  story: z.string().describe('The generated story.'),
  imagePrompt: z.string().describe('A prompt for generating a cover image for the story.'),
  imageUrl: z.string().describe('The URL of the generated cover image.'),
  audioUrl: z.string().describe('The URL of the generated audio narration.'),
});
export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

export async function generateStory(input: GenerateStoryInput): Promise<GenerateStoryOutput> {
  return generateStoryFlow(input);
}

const storyPrompt = ai.definePrompt({
    name: 'storyPrompt',
    input: { schema: GenerateStoryInputSchema },
    output: { schema: z.object({
        title: z.string().describe('The title of the story.'),
        story: z.string().describe('The generated story.'),
        imagePrompt: z.string().describe('A prompt for generating a cover image for the story.'),
    })},
    prompt: `Generate a short story based on the following prompt: {{{prompt}}}. Also generate a title and an image prompt for the story.`,
});


const generateStoryFlow = ai.defineFlow(
  {
    name: 'generateStoryFlow',
    inputSchema: GenerateStoryInputSchema,
    outputSchema: GenerateStoryOutputSchema,
  },
  async (input) => {
    const { output: storyData } = await storyPrompt(input);
    if (!storyData) {
        throw new Error('Failed to generate story data.');
    }
    
    const { title, story, imagePrompt } = storyData;

    const [imageResult, speechResult] = await Promise.all([
        generateImage({ prompt: imagePrompt, count: 1 }),
        generateSpeech({ prompt: `${title}. ${story}` }),
    ]);

    if (!imageResult.imageUrls || imageResult.imageUrls.length === 0) {
        throw new Error('Failed to generate image.');
    }

    if (!speechResult.audioUrl) {
        throw new Error('Failed to generate audio.');
    }

    return {
      title,
      story,
      imagePrompt,
      imageUrl: imageResult.imageUrls[0],
      audioUrl: speechResult.audioUrl,
    };
  }
);
