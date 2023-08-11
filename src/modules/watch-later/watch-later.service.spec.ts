import { Test, TestingModule } from '@nestjs/testing';
import { WatchLaterService } from './watch-later.service';

describe('WatchLaterService', () => {
  let service: WatchLaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatchLaterService],
    }).compile();

    service = module.get<WatchLaterService>(WatchLaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
