import { TestBed } from '@angular/core/testing';
import { UnavailableError } from '@core/shared/domain/errors';
import { Manifest } from '../domain/manifest.entity';

import { PhotoRepo } from '../domain/photo-repo.port';
import { DummyPhotoRepo } from '../infra/dummy-photo-repo.adapter.repo';
import { RetrieveManifestByRoverUseCase } from './retrieve-manifest-by-rover.usecase';

describe('RetrieveManifestByRoverUseCase', () => {
  let service: RetrieveManifestByRoverUseCase;
  let repo: PhotoRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PhotoRepo, useClass: DummyPhotoRepo},
      ]
    });
    service = TestBed.inject(RetrieveManifestByRoverUseCase);
    repo = TestBed.inject(PhotoRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be resolve with manifiest', async () => {
    spyOn(repo, 'getManifestByRover')
    .and.resolveTo({...manifestExample})
    return expectAsync(
      service.execute('opportunity')
    )
    .toBeResolvedTo({...manifestExample});
  });

  it('should be rejected', async () => {
    spyOn(repo, 'getManifestByRover')
    .and.rejectWith(new UnavailableError());
    return expectAsync(
      service.execute('spirit')
    )
    .toBeRejectedWith(new UnavailableError());
  });

  it('should call the repository', () => {
    spyOn(repo, 'getManifestByRover')
    .and.resolveTo({...manifestExample})
    service.execute('opportunity')
    expect(repo.getManifestByRover).toHaveBeenCalled();
  });
});

const manifestExample: Manifest = {
  rover: 'opportunity',
  maxEarthDate: new Date(2021, 11, 10),
  maxSol: 650,
}
