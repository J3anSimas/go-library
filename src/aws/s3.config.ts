
import { S3Client } from '@aws-sdk/client-s3';

export const S3_CLIENT = 'S3_CLIENT';

export const s3ClientProvider = {
    provide: S3_CLIENT,
    useFactory: () => {
        const env = process.env.NODE_ENV ?? 'development'
        if (env === 'production') {
            return new S3Client({
                region: process.env.AWS_REGION || '',
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
                },
            });
        }
        return new S3Client({
            region: process.env.AWS_REGION || '',
            endpoint: 'http://localhost:9000',
            forcePathStyle: true,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
        });
    },
};