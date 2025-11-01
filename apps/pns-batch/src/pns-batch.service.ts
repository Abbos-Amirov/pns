import { Injectable } from '@nestjs/common';

@Injectable()
export class PnsBatchService {
  getHello(): string {
    return 'Hello PNS - BATCH';
  }
}
