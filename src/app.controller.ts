import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getMovieParentGuide(@Param('id') id: string) {
    return await this.appService.getParentGuide(id);
  }
}
