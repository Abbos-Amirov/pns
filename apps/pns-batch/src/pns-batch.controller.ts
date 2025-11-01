import { Controller, Get } from '@nestjs/common';
import { PnsBatchService } from './pns-batch.service';

@Controller()
export class PnsBatchController {
  constructor(private readonly pnsBatchService: PnsBatchService) {}

  @Get()
  getHello(): string {
    return this.pnsBatchService.getHello();
  }
}
