import { Injectable } from '@nestjs/common';
import { EcsService } from './ecs.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
