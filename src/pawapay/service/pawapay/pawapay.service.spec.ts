import { Test, TestingModule } from '@nestjs/testing';
import { PawapayService } from './pawapay.service';

describe('PawapayService', () => {
  let service: PawapayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PawapayService],
    }).compile();

    service = module.get<PawapayService>(PawapayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
