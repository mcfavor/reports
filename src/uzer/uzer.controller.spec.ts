import { Test, TestingModule } from '@nestjs/testing';
import { UzerController } from './uzer.controller';

describe('UzerController', () => {
  let controller: UzerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UzerController],
    }).compile();

    controller = module.get<UzerController>(UzerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
