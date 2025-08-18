
'use server';

import { generateImage } from '@/ai/flows/generate-image';

export async function handleImageGeneration(prompt: string): Promise<{ imageUrl?: string; error?: string }> {
  if (!prompt) {
    return {
      error: 'Prompt is required.',
    };
  }
  
  if (prompt.length < 10) {
      return { error: 'Prompt must be at least 10 characters long.' };
  }

  try {
    const result = await generateImage({ prompt });
    if (!result.imageUrl) {
        throw new Error("Image generation failed to return a URL.");
    }
    return { imageUrl: result.imageUrl };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to generate image. The model might be unavailable. Please try again later.',
    };
  }
}
