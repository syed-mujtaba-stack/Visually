
export interface User {
  id: string;
  displayName: string;
  createdAt: Date;
  email?: string;
  photoUrl?: string;
  bio?: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: Date;
  isPublic?: boolean;
  likesCount?: number;
  commentsCount?: number;
  userId: string;
  user?: User;
}

export interface Collection {
  id: string;
  name: string;
  createdAt: Date;
  description?: string;
  userId: string;
  user?: User;
}

export interface CollectionImage {
  collectionId: string;
  generatedImageId: string;
  addedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  user?: User;
  generatedImageId: string;
  generatedImage?: GeneratedImage;
}

export interface Like {
  userId: string;
  generatedImageId: string;
  createdAt: Date;
}
