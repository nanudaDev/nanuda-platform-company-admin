import { BaseService } from '@/core';
import {
  UploadOption,
  FileType,
  FileAccessType,
  ACL,
  MimeTypes,
  FileAttachmentDto,
  ATTACHMENT_REASON_TYPE,
} from '.';
import axios from 'axios';
import {
  EnvironmentType,
  ProductionEnvironment,
  DevelopmentEnvironment,
} from '../../../../environments';

export enum UPLOAD_TYPE {
  DELIVERY_SPACE = 'delivery-space',
  BANNER = 'banner',
  POPUP = 'popup',
  INQUIRY = 'inquiry',
  COMPANY_LOGO = 'company-logo',
}

type UploadOptionConfig = {
  [key in UPLOAD_TYPE]: UploadOption;
};

// TODO: Image resize
class FileUploadService extends BaseService {
  private static UPLOAD_OPTIONS: UploadOptionConfig = {
    [UPLOAD_TYPE.DELIVERY_SPACE]: {
      path: 'delivery-space',
      sizeLimit: 1024 * 1024 * 10,
      fileType: FileType.IMAGE,
      mimeType: FileType.IMAGE,
      accessType: FileAccessType.PUBLIC,
      acl: ACL.PUBLIC,
    },
    [UPLOAD_TYPE.BANNER]: {
      path: 'banner',
      sizeLimit: 1024 * 1024 * 30,
      fileType: FileType.IMAGE,
      mimeType: FileType.IMAGE,
      accessType: FileAccessType.PUBLIC,
      acl: ACL.PUBLIC,
      // imageSizeArray: [[200, null]], // 원본,W200 리사이즈 저장
      // resized: true,
      // squared: false,
      // cropped: false,
    },
    [UPLOAD_TYPE.POPUP]: {
      path: 'popup',
      sizeLimit: 1024 * 1024 * 10,
      fileType: FileType.IMAGE,
      mimeType: FileType.IMAGE,
      accessType: FileAccessType.PUBLIC,
      acl: ACL.PUBLIC,
      // resized: false,
      // squared: false,
      // cropped: false,
    },
    [UPLOAD_TYPE.INQUIRY]: {
      path: 'popup',
      sizeLimit: 1024 * 1024 * 10,
      fileType: FileType.DOCUMENT,
      mimeType: FileType.DOCUMENT,
      accessType: FileAccessType.PUBLIC,
      acl: ACL.PRIVATE,
    },
    [UPLOAD_TYPE.COMPANY_LOGO]: {
      path: 'company-logo',
      sizeLimit: 1024 * 1024 * 10,
      fileType: FileType.IMAGE,
      mimeType: FileType.IMAGE,
      accessType: FileAccessType.PUBLIC,
      acl: ACL.PUBLIC,
    },
  };
  private readonly mimeTypes: MimeTypes = {
    [FileType.IMAGE]: ['image/gif', 'image/png', 'image/jpeg', 'image/jpg'],
    [FileType.DOCUMENT]: [
      'image/gif',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/heic',
      'application/octet-stream',
      'application/vnd.ms-excel', // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-powerpoint', // .ppt
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/pdf', // .pdf
      'application/zip', // .zip
      'text/csv', // .csv
      'text/plain', // .txt
    ],
  };

  constructor() {
    super();
  }

  /**
   * upload type
   * @param uploadType
   * @param files
   */
  async upload(uploadType: UPLOAD_TYPE, files: FileList | File[]) {
    const attachments: FileAttachmentDto[] = [];
    const uploadOption = FileUploadService.UPLOAD_OPTIONS[uploadType];
    const endpointUrl =
      process.env.NODE_ENV === EnvironmentType.production
        ? ProductionEnvironment.s3BaseUrl
        : DevelopmentEnvironment.s3BaseUrl;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > uploadOption.sizeLimit) {
        attachments.push({
          attachmentReasonType: ATTACHMENT_REASON_TYPE.SIZE,
          originFilename: file.name,
          mimetype: file.type,
        });
        return;
      }
      if (!this.mimeTypes[uploadOption.mimeType].includes(file.type)) {
        attachments.push({
          attachmentReasonType: ATTACHMENT_REASON_TYPE.CONTENT_TYPE,
          originFilename: file.name,
          mimetype: file.type,
        });
        return;
      }

      const presigned = await this.filePost(
        'file-upload/retrieve-s3-presigned',
        {
          uploadType,
          filename: file.name,
          mimetype: file.type,
        },
      );
      if (!presigned || !presigned.data.url) {
        attachments.push({
          attachmentReasonType: ATTACHMENT_REASON_TYPE.ETC,
          originFilename: file.name,
          mimetype: file.type,
        });
        return;
      }
      //   toPromise()
      await axios.put(presigned.data.url, file, {
        headers: {
          'Content-Type': file.type,
          // required for public read - 버킷 타입에 따라 public 또는 private
          'x-amz-acl': uploadOption.acl,
        },
      });

      attachments.push({
        attachmentReasonType: ATTACHMENT_REASON_TYPE.SUCCESS,
        originFilename: file.name,
        mimetype: file.type,
        source: presigned.data.source,
        key: presigned.data.key,
        endpoint: `${endpointUrl}/${presigned.data.source}`,
        uploadType,
      });
    }
    return attachments;
  }
}

export default new FileUploadService();
