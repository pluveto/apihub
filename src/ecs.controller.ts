import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EcsService } from './ecs.service';

@Controller('ecs')
export class EcsController {
  constructor(private readonly ecsService: EcsService) {}

  @Get('info')
  async getStatus(@Res() res: Response) {
    const info = await this.ecsService.getInfo();
    res.status(HttpStatus.OK).json(info);
  }

  @Post('start')
  async start(@Res() res: Response) {
    const resp = await this.ecsService.start();
    res.status(HttpStatus.OK).json(resp);
  }

  @Post('stop')
  async stop(@Res() res: Response) {
    const resp = await this.ecsService.stop();
    res.status(HttpStatus.OK).json(resp);
  }
}
