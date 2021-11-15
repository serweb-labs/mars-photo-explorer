import { TestBed } from '@angular/core/testing';
import { UnavailableError } from '@core/shared/domain/errors';
import { SavedFilterRepo } from '../domain/saved-filter-repo.port';
import { SavedFilter } from '../domain/saved-filter.entity';
import { DummySavedFilterRepo } from '../infra/dummy-saved-filter-repo.adapter.repo';

import { RetrieveSavedFiltersUseCase } from './retrieve-saved-filters.usacase';

describe('RetrieveSavedFiltersUseCase', () => {
  let service: RetrieveSavedFiltersUseCase;
  let repo: SavedFilterRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: SavedFilterRepo, useClass: DummySavedFilterRepo},
      ]
    });
    service = TestBed.inject(RetrieveSavedFiltersUseCase);
    repo = TestBed.inject(SavedFilterRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be resolve with filters', async () => {
    const res: SavedFilter[] = [
      {addedDate: new Date(), value: new Date(), rover: 'spirit', type: 'date'}
    ];
    spyOn(repo, 'retrieveByRover').and.resolveTo([...res])
    return expectAsync(service.execute('spirit'))
    .toBeResolvedTo([...res]);
  });

  it('should be rejected', async () => {
    spyOn(repo, 'retrieveByRover').and.rejectWith(new UnavailableError());
    return expectAsync(
      service.execute('spirit')
    )
    .toBeRejectedWith(new UnavailableError());
  });

  it('should call the repository', () => {
    const res: SavedFilter[] = [
      {addedDate: new Date(), value: new Date(), rover: 'spirit', type: 'date'}
    ];
    spyOn(repo, 'retrieveByRover').and.resolveTo([...res])
    service.execute('curiosity');
    expect(repo.retrieveByRover).toHaveBeenCalled();
  });
  
});
