import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const documentBuilder = new DocumentBuilder()
        .setTitle('API')
        .setVersion('1.0')
        .setContact("Tanishq Chawda", "https://joinjumbo.apiurl.in", "tanishq.happy@gmail.com")
        .setDescription(
            `###REST API for JoinJumbo Assignment`,
        )
        .addBearerAuth({
            description: `Please enter token in following format: Bearer <JWT>`,
            name: 'Authorization',
            bearerFormat: 'Bearer',
            scheme: 'Bearer',
            type: 'http',
            in: 'Header'
        }, 'access-token');

    if (process.env.API_VERSION) {
        documentBuilder.setVersion(process.env.API_VERSION);
    }

    const document = SwaggerModule.createDocument(app, documentBuilder.build());
    SwaggerModule.setup('api/documentation', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    console.info(
        `Documentation: http://localhost:${process.env.PORT}/api/documentation`,
    );
}
