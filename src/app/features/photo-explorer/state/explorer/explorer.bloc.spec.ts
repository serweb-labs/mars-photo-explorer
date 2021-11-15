import { TestBed } from '@angular/core/testing';
import { Manifest } from '@core/nasa-photos/domain/manifest.entity';
import { PhotoRepo } from '@core/nasa-photos/domain/photo-repo.port';
import { Photo } from '@core/nasa-photos/domain/photo.entity';
import { SavedFilterRepo } from '@core/nasa-photos/domain/saved-filter-repo.port';
import { SavedFilter } from '@core/nasa-photos/domain/saved-filter.entity';
import { DummyPhotoRepo } from '@core/nasa-photos/infra/dummy-photo-repo.adapter.repo';
import { DummySavedFilterRepo } from '@core/nasa-photos/infra/dummy-saved-filter-repo.adapter.repo';
import { PermissionError, UnavailableError } from '@core/shared/domain/errors';
import { Subscription } from 'rxjs';
import { skip, take } from 'rxjs/operators';

import { FilterByDateAction, FilterBySolAction, SaveFilterHistoryAction, SetRoverAction } from './explorer.actions';
import { ExplorerBloc } from './explorer.bloc';
import { ExplorerStateController, explorerStateFactory, StateName } from './explorer.state';

describe('ExplorerBloc', () => {
  let service: ExplorerBloc;
  let photoRepo: PhotoRepo;
  let filterRepo: SavedFilterRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PhotoRepo, useClass: DummyPhotoRepo},
        {provide: SavedFilterRepo, useClass: DummySavedFilterRepo},
        {provide: ExplorerStateController, useValue: DummyPhotoRepo},
        {
          provide: ExplorerStateController,
          useValue: new ExplorerStateController(explorerStateFactory())
        }
      ],
    });
    service = TestBed.inject(ExplorerBloc);
    photoRepo = TestBed.inject(PhotoRepo);
    filterRepo = TestBed.inject(SavedFilterRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('the state name should be "initial"', (done) => {
    service.state.pipe(take(1)).subscribe((state) => {
      expect(state.name).toBe(StateName.Initial);
      done();
    });

  });

  it('the state name should be "rate error"', (done) => {
    spyOn(photoRepo, 'getPhotosByCriteria').and.rejectWith(new PermissionError())
    spyOn(filterRepo, 'retrieveByRover').and.resolveTo([
      {...filterExample1},
    ]);

    service.state.pipe(skip(2))
    .pipe(take(1))
    .subscribe((state) => {
      expect(state.name).toBe(StateName.RateError);
      done();
    });

    service.add(new SetRoverAction('curiosity'))
  });

  it('the state name should be "results"', (done) => {
    spyOn(photoRepo, 'getManifestByRover').and.resolveTo(manifestExample)
    spyOn(photoRepo, 'getPhotosByCriteria').and.resolveTo(photosExample)
    spyOn(filterRepo, 'retrieveByRover').and.resolveTo([
      {...filterExample1},
    ]);

    service.state.pipe(skip(2))
    .pipe(take(1))
    .subscribe((state) => {
      expect(state.name).toBe(StateName.Results);
      expect(state.data?.photos.length).toBe(2);
      done();
    });

    service.add(new SetRoverAction('curiosity'))
  });

  it('the state date should be the correct', (done) => {
    spyOn(photoRepo, 'getManifestByRover').and.resolveTo(manifestExample)
    spyOn(photoRepo, 'getPhotosByCriteria').and.resolveTo([])
    spyOn(filterRepo, 'retrieveByRover').and.resolveTo([
      {...filterExample1},
    ]);

    service.state.pipe(skip(3))
    .pipe(take(1))
    .subscribe((state) => {
      expect(state.name).toBe(StateName.Results);
      expect(state.date).toEqual(new Date(2021, 5, 5));
      done();
    });

    service.add(new SetRoverAction('curiosity'))
    service.add(new FilterByDateAction(new Date(2021, 5, 5)))
  });

  it('the state sol be the correct', (done) => {
    spyOn(photoRepo, 'getManifestByRover').and.resolveTo(manifestExample)
    spyOn(photoRepo, 'getPhotosByCriteria').and.resolveTo([])
    spyOn(filterRepo, 'retrieveByRover').and.resolveTo([
      {...filterExample1},
    ]);

    service.state.pipe(skip(3))
    .pipe(take(1))
    .subscribe((state) => {
      expect(state.name).toBe(StateName.Results);
      expect(state.sol).toBe(200);
      expect(state.date).toBeNull()
      done();
    });

    service.add(new SetRoverAction('curiosity'))
    service.add(new FilterBySolAction(200))
  });

  it('should save date filter', (done) => {
    spyOn(filterRepo, 'saveByRover').and.resolveTo()
    spyOn(filterRepo, 'retrieveByRover').and.resolveTo([
      {...filterExample1},
      {...filterExample2},
    ])

    service.state.pipe(skip(1)).subscribe((state) => {
      expect(state.savedFilters.length).toBe(2);
      expect(
        (state.savedFilters[0].value as Date).getTime() ===
        (filterExample2.value as Date).getTime()).toBeTrue();
      done();
    });

    service.add(new SaveFilterHistoryAction('curiosity', 'date', filterExample2.value))
  });

  it('the state name should be "loading"', (done) => {
    spyOn(photoRepo, 'getManifestByRover').and.resolveTo(manifestExample)
    spyOn(photoRepo, 'getPhotosByCriteria').and.resolveTo(photosExample)
    spyOn(filterRepo, 'retrieveByRover').and.resolveTo([
      {...filterExample1},
    ]);

    const sub = service.state.pipe(skip(1))
    .pipe(take(1))
    .subscribe((state) => {
      expect(state.name).toBe(StateName.Loading);
      done();
      sub.unsubscribe();
    });
    

    service.add(new SetRoverAction('curiosity'));
  });

  it('the state name should be "connection error"', (done) => {
    spyOn(photoRepo, 'getPhotosByCriteria').and.rejectWith(new UnavailableError())

    service.state.pipe(skip(2)).subscribe((state) => {
      expect(state.name).toBe(StateName.ConnectionError);
      done();
    });

    service.add(new SetRoverAction('curiosity'))
  });

  it('the state name should be "unknown error"', (done) => {
    spyOn(photoRepo, 'getPhotosByCriteria').and.rejectWith(new Error())

    service.state.pipe(skip(2)).subscribe((state) => {
      expect(state.name).toBe(StateName.UnknownError);
      done();
    });

    service.add(new SetRoverAction('curiosity'))
  });

});

const manifestExample: Manifest = {
  rover: 'opportunity',
  maxEarthDate: new Date(2021, 11, 10),
  maxSol: 650,
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
  },
  {
    date: new Date(),
    sol: 1,
    cameraId: 'FHAZ',
    cameraName: 'Front Hazard Avoidance Camera',
    src: '',
    rover: 'curiosity',
    id: 2,
  }
]

const filterExample1: SavedFilter = {
  addedDate: new Date(2021, 1, 2),
  rover: 'spirit',
  type: 'date',
  value: new Date(2021, 1, 2)
}

const filterExample2: SavedFilter = {
  addedDate: new Date(2021, 1, 10),
  rover: 'spirit',
  type: 'date',
  value: new Date(2021, 1, 10)
}