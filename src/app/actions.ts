
'use server';

import { generateImage } from '@/ai/flows/generate-image';
import { generateLogo } from '@/ai/flows/generate-logo';
import { generateFavicon } from '@/ai/flows/generate-favicon';

export async function handleImageGeneration(prompt: string, count: number): Promise<{ imageUrls?: string[]; error?: string }> {
  if (!prompt) {
    return {
      error: 'Prompt is required.',
    };
  }
  
  if (prompt.length < 10) {
      return { error: 'Prompt must be at least 10 characters long.' };
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
  
  if (prompt.length < 3) {
      return { error: 'Prompt must be at least 3 characters long.' };
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

export async function handleFaviconGeneration(prompt: string, count: number): Promise<{ imageUrls?: string[]; error?: string }> {
    if (!prompt) {
      return {
        error: 'Prompt is required.',
      };
    }
    
    if (prompt.length < 3) {
        return { error: 'Prompt must be at least 3 characters long.' };
    }
  
    try {
      const result = await generateFavicon({ prompt, count });
      if (!result.imageUrls || result.imageUrls.length === 0) {
          throw new Error("Favicon generation failed to return any URLs.");
      }
      return { imageUrls: result.imageUrls };
    } catch (error) {
      console.error(error);
      return {
        error: 'Failed to generate favicon. The model might be unavailable. Please try again later.',
      };
    }
  }
