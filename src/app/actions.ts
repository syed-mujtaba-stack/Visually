
'use server';

import { generateImage } from '@/ai/flows/generate-image';
import { generateLogo } from '@/ai/flows/generate-logo';
import { generateSpeech } from '@/ai/flows/generate-speech';
import { generateStory, GenerateStoryOutput } from '@/ai/flows/generate-story';
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

  export async function handleSpeechGeneration(prompt: string): Promise<{ audioUrl?: string; error?: string }> {
    if (!prompt) {
      return {
        error: 'Prompt is required.',
      };
    }
  
    try {
      const result = await generateSpeech({ prompt });
      if (!result.audioUrl) {
          throw new Error("Speech generation failed to return a URL.");
      }
      return { audioUrl: result.audioUrl };
    } catch (error) {
      console.error(error);
      return {
        error: 'Failed to generate speech. The model might be unavailable or the content could not be processed. Please try again later.',
      };
    }
  }

  export async function handleStoryGeneration(prompt: string): Promise<{ story?: GenerateStoryOutput; error?: string }> {
    if (!prompt) {
      return {
        error: 'Prompt is required.',
      };
    }
  
    try {
      const result = await generateStory({ prompt });
      if (!result) {
          throw new Error("Story generation failed to return a result.");
      }
      return { story: result };
    } catch (error) {
      console.error(error);
      return {
        error: 'Failed to generate story. The model might be unavailable or the content could not be processed. Please try again later.',
      };
    }
  }
