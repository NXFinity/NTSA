import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RegisterDto } from '../security/dto/auth.dto';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
      .setTitle('NXFINITY | NXF & NX BaaS [Blockchain as a Service]')
      .setLicense('NXFINITY', 'https://opensource.org/license/mit/')
      .setVersion('1.0')
      .setDescription(
          'Everything provided by the BaaS API, can be accessed through our SaaS.',
      )
      .setContact('NXFINITY Support Team', 'mailto:support@nxfinity.live', '')
      .setTermsOfService('https://nxfinity.live/terms')
      .setExternalDoc('NXFINITY Documentation', 'https://docs.nxfinity.live')
      .addSecurity('bearer', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      })
      .addSecurityRequirements('bearer')
      .addBearerAuth()
      .addTag('NXFINITY BaaS API', 'SaaS [nxfinity.live]')
      .build();
  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [RegisterDto],
  });
  const extraOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customFavicon: 'https://nxfinity.live/favicon.ico',
    customSiteTitle: 'NXF BaaS API',
    url: 'https://api.nxfinity.live/v1',
    servers: [
      {
        url: 'https://api.nxfinity.live/v1',
        description: 'Production',
      },
      {
        url: 'http://localhost:3021/v1',
        description: 'Development',
      },
    ],
  };
  SwaggerModule.setup('/v1', app, document, extraOptions);
}
