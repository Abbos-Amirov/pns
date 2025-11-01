import { Test, TestingModule } from '@nestjs/testing';
import { PnsBatchController } from './pns-batch.controller';
import { PnsBatchService } from './pns-batch.service';

describe('PnsBatchController', () => {
  let pnsBatchController: PnsBatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PnsBatchController],
      providers: [PnsBatchService],
    }).compile();

    pnsBatchController = app.get<PnsBatchController>(PnsBatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pnsBatchController.getHello()).toBe('Hello World!');
    });
  });
});
