import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConnectionOptions, createConnection } from 'typeorm';
// import { ConfigService } from './config/config.service';
//import config from 'config';
import { useContainer } from 'class-validator';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { json } from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {



  const app = await NestFactory.create(AppModule, {
  });
app.use(function (req: any, res: any, next: any) {
  const requestDetails = `${req.method} ${req.hostname}${req.path}, Content-Length: ${req.headers['content-length'] ? req.headers['content-length'] : 0}, Origin: ${req.connection.remoteAddress}, User-Agent: ${req.headers['user-agent']}`;
  const DEFAULT_TIMEOUT = 3 * 60 * 60000;
  res.setTimeout(DEFAULT_TIMEOUT, function () {
    // callback function is called when request exceeds timeout.
  });
  next();
});


app.use(json({ limit: '1024mb' }));
const configService = app.get(ConfigService);

const port = configService.get<number>('PORT');
const host = configService.get<string>('HOST');
app.enableCors({
  origin: [ 
  'http://localhost:3000/api', 
], // CORS enabled for localhost only. TODO: to be replaced with recording UI deployed URL if needed
  optionsSuccessStatus: 200
});

app.enableShutdownHooks();
useContainer(app.select(AppModule), { fallbackOnErrors: true });


let swaggerHost;

try {
  swaggerHost = configService.get<string>('SWAGGER_HOST');
} catch (ex) {
  console.log(`Unable to find swagger host.`);
}

if (swaggerHost) {
  const options = new DocumentBuilder()
    .setTitle('Recording API')
    .setDescription('Recording REST API Server')
    .setVersion("1")
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
} else {
  const options = new DocumentBuilder()
    .setTitle('TEST API')
    .setDescription('TEST REST API Server')
    .setVersion("1")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

await app.listen(
  port,
  host,
  () => {
    console.log(`Swagger UI available at: http://${host}:${port}/api`);
  }
);
}
bootstrap();
