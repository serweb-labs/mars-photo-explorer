import { TestBed } from '@angular/core/testing';
import { UnavailableError } from '@core/shared/domain/errors';
import { SavedFilterRepo } from '../domain/saved-filter-repo.port';
import { DummySavedFilterRepo } from '../infra/dummy-saved-filter-repo.adapter.repo';

import { SaveFilterUseCase } from './save-filter.usecase';

describe('SaveFilterUseCase', () => {
  let service: SaveFilterUseCase;
  let repo: SavedFilterRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: SavedFilterRepo, useClass: DummySavedFilterRepo},
      ]
    });
    service = TestBed.inject(SaveFilterUseCase);
    repo = TestBed.inject(SavedFilterRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be resolve with void', async () => {
    spyOn(repo, 'saveByRover').and.resolveTo()
    return expectAsync(service.execute(
      'curiosity',
      'date',
      new Date(),
    ))
    .toBeResolvedTo();
  });

  it('should be rejected', async () => {
    spyOn(repo, 'saveByRover').and.rejectWith(new UnavailableError())
    return expectAsync(service.execute(
      'curiosity',
      'date',
      new Date(),
    )).toBeRejectedWith(new UnavailableError())
  });

  it('should call the repository', () => {
    spyOn(repo, 'saveByRover').and.resolveTo()
    service.execute(
      'curiosity',
      'date',
      new Date(),
    );
    expect(repo.saveByRover).toHaveBeenCalled();
  });

});
