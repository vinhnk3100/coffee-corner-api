import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadFileToAws {
  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}
}
