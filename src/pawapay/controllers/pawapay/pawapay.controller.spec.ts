import { Test, TestingModule } from '@nestjs/testing';
import { PawapayController } from './pawapay.controller';

describe('PawapayController', () => {
  let controller: PawapayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PawapayController],
    }).compile();

    controller = module.get<PawapayController>(PawapayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
