import { Inject, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3_CLIENT } from './s3.config';

@Injectable()
export class S3Service {
    constructor(
        @Inject(S3_CLIENT) private readonly s3: S3Client,
    ) { }

    async upload(file: Express.Multer.File, folder = 'employees'): Promise<string> {
        const key = `${folder}/${crypto.randomUUID()}-${file.originalname}`;

        await this.s3.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            }),
        );

        return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }
}

