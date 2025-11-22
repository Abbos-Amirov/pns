import { Injectable } from '@nestjs/common';

@Injectable()
export class PnsBatchService {


  public async batchRollback(): Promise<void> {
    console.log('batchRollback');
  }

  public async batchProperties(): Promise<void> {
    console.log('batchProperties');
  }

  public async batchAgents(): Promise<void> {
    console.log('batchAgents');
  }

  
  getHello(): string {
    return 'Hello PNS - BATCH';
  }
}
