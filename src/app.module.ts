import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EcsController } from './ecs.controller';
import { EcsService } from './ecs.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController, EcsController],
  providers: [AppService, EcsService],
})
export class AppModule {}
