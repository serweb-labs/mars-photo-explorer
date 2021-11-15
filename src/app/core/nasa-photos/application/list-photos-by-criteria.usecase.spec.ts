import { TestBed } from '@angular/core/testing';
import { UnavailableError } from '@core/shared/domain/errors';
import { PhotoCriteria } from '../domain/photo-criteria.dto';
import { PhotoRepo } from '../domain/photo-repo.port';
import { Photo } from '../domain/photo.entity';
import { DummyPhotoRepo } from '../infra/dummy-photo-repo.adapter.repo';

import { ListPhotosByCriteriaUseCase } from './list-photos-by-criteria.usecase';

describe('ListPhotosByCriteriaUseCase', () => {
  let service: ListPhotosByCriteriaUseCase;
  let repo: PhotoRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PhotoRepo, useClass: DummyPhotoRepo}
      ]
    });
    service = TestBed.inject(ListPhotosByCriteriaUseCase);
    repo = TestBed.inject(PhotoRepo)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be resolve with photos[]', async () => {
    spyOn(repo, 'getPhotosByCriteria').withArgs({...criteriaExample})
    .and.resolveTo([...photosExample])
    return expectAsync(
      service.execute({...criteriaExample})
    )
    .toBeResolvedTo([...photosExample]);
  });

  it('should be rejected', async () => {
    spyOn(repo, 'getPhotosByCriteria').and.rejectWith(new UnavailableError());
    return expectAsync(
      service.execute({...criteriaExample})
    )
    .toBeRejectedWith(new UnavailableError());
  });

  it('should call the repository', () => {
    spyOn(repo, 'getPhotosByCriteria').and.resolveTo([...photosExample])
    service.execute({...criteriaExample})
    expect(repo.getPhotosByCriteria).toHaveBeenCalled();
  });
});

const criteriaExample: PhotoCriteria =  {
  rover: 'curiosity',
  camera: 'FHAZ',
  sol: 1,
}
const photosExample: Photo[] = [
  {
    date: new Date(),
    sol: 1,
    cameraId: 'FHAZ',
    cameraName: 'Front Hazard Avoidance Camera',
    src: '',
    rover: 'curiosity',
    id: 1,
  }
]