
'use server';

import { generateImage } from '@/ai/flows/generate-image';
import { generateLogo } from '@/ai/flows/generate-logo';
import { generateVideo } from '@/ai/flows/generate-video';

export async function handleImageGeneration(prompt: string, count: number): Promise<{ imageUrls?: string[]; error?: string }> {
  if (!prompt) {
    return {
      error: 'Prompt is required.',
    };
  }
  
  try {
    const result = await generateImage({ prompt, count });
    if (!result.imageUrls || result.imageUrls.length === 0) {
        throw new Error("Image generation failed to return any URLs.");
    }
    return { imageUrls: result.imageUrls };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to generate image. The model might be unavailable. Please try again later.',
    };
  }
}


export async function handleLogoGeneration(prompt: string, count: number): Promise<{ imageUrls?: string[]; error?: string }> {
  if (!prompt) {
    return {
      error: 'Prompt is required.',
    };
  }
  
  try {
    const result = await generateLogo({ prompt, count });
    if (!result.imageUrls || result.imageUrls.length === 0) {
        throw new Error("Logo generation failed to return any URLs.");
    }
    return { imageUrls: result.imageUrls };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to generate logo. The model might be unavailable. Please try again later.',
    };
  }
}

export async function handleVideoGeneration(prompt: string): Promise<{ videoUrl?: string; error?: string }> {
    if (!prompt) {
      return {
        error: 'Prompt is required.',
      };
    }
  
    try {
      const result = await generateVideo({ prompt });
      if (!result.videoUrl) {
          throw new Error("Video generation failed to return a URL.");
      }
      return { videoUrl: result.videoUrl };
    } catch (error) {
      console.error(error);
      return {
        error: 'Failed to generate video. The model might be unavailable or the content could not be processed. Please try again later.',
      };
    }
  }
