import { Controller, Get, Logger } from '@nestjs/common';
import { PnsBatchService } from './pns-batch.service';
import { BATCH_ROLLBACK, BATCH_TOP_AGENTS, BATCH_TOP_PRODUCTS } from './lib/config';
import { Cron, Timeout } from '@nestjs/schedule';

@Controller()
export class PnsBatchController {
  private logger: Logger = new Logger('PnsBatchController');

  constructor(private readonly pnsBatchService: PnsBatchService) {}


  @Timeout(1000)
  handleTimeout() {
    this.logger.debug('BATCH SERVER READY!');
  }

  @Cron('00 00 01 * * *', { name: BATCH_ROLLBACK })
  public async batchRollback() {
    try {
      this.logger['context'] = BATCH_ROLLBACK;
      this.logger.debug('EXECUTED!');
      await this.pnsBatchService.batchRollback();
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Cron('20 00 01 * * *', { name: BATCH_TOP_PRODUCTS })
  public async batchProducts() {
    try {
      this.logger['context'] = BATCH_TOP_PRODUCTS;
      this.logger.debug('EXECUTED!');
      await this.pnsBatchService.batchTopProducts();
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Cron('50 00 01 * * *', { name: BATCH_TOP_AGENTS })

  public async batchAgents() {
    try {
      this.logger['context'] = BATCH_TOP_AGENTS;
      this.logger.debug('EXECUTED!');
      await this.pnsBatchService.batchTopAgents();
    } catch (err) {
      this.logger.error(err);
    }
  }


  @Get()
  getHello(): string {
    return this.pnsBatchService.getHello();
  }
}
