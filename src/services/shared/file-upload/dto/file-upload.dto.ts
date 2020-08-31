import { BaseDto } from '@/core';
import { UPLOAD_TYPE } from '../file-upload.service';

export enum ATTACHMENT_REASON_TYPE {
  SUCCESS = 'SUCCESS',
  CONTENT_TYPE = 'CONTENT_TYPE',
  SIZE = 'SIZE',
  ETC = 'ETC',
}

export class FileAttachmentDto extends BaseDto<FileAttachmentDto> {
  constructor(partial?: any) {
    super(partial);
  }

  attachmentReasonType: ATTACHMENT_REASON_TYPE;
  originFilename: string;
  source?: string;
  key?: string;
  endpoint?: string;
  uploadType?: UPLOAD_TYPE;
  mimetype?: string;
}

// export class PresignedUrl {
//   url: string;
//   source: string;
//   key: string;
// }
