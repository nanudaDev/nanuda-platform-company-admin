export enum FileType {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
}

export enum FileAccessType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum ACL {
  PUBLIC = 'public-read',
  PRIVATE = 'private',
}

export interface S3BucketInfo {
  bucketName: string;
  cloudFrontUrl?: string;
}

export interface UploadOption {
  path: string;
  sizeLimit: number;
  fileType: FileType;
  mimeType: FileType;
  // imageSizeArray?: [[number, number], [number, number]?];
  // resized?: boolean;
  // squared?: boolean;
  // cropped?: boolean;
  accessType: FileAccessType;
  acl: ACL;
}

export type MimeTypes = {
  [key in FileType]: string[];
};
