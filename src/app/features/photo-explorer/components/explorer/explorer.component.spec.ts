import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PhotoRepo } from '@core/nasa-photos/domain/photo-repo.port';
import { SavedFilterRepo } from '@core/nasa-photos/domain/saved-filter-repo.port';
import { DummyPhotoRepo } from '@core/nasa-photos/infra/dummy-photo-repo.adapter.repo';
import { DummySavedFilterRepo } from '@core/nasa-photos/infra/dummy-saved-filter-repo.adapter.repo';
import { ExplorerBloc } from '@feat/photo-explorer/state/explorer/explorer.bloc';
import { ExplorerState, ExplorerStateController, explorerStateFactory, StateName } from '@feat/photo-explorer/state/explorer/explorer.state';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { DateFilterComponent } from '../date-filter/date-filter.component';
import { PhotoComponent } from '../photo/photo.component';

import { ExplorerComponent } from './explorer.component';

describe('ExplorerComponent', () => {
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;
  let stateCtrl: ExplorerStateController;
  let bloc: ExplorerBloc;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExplorerComponent, 
        MockComponent(DateFilterComponent),
        MockComponent(PhotoComponent),
      ],
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSelectModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
      providers: [
        {provide: PhotoRepo, useClass: DummyPhotoRepo},
        {provide: SavedFilterRepo, useClass: DummySavedFilterRepo},
        { 
          provide: ExplorerStateController,
          useValue: new BehaviorSubject<ExplorerState>(explorerStateFactory())
        },
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerComponent);
    stateCtrl = TestBed.inject(ExplorerStateController);
    bloc = TestBed.inject(ExplorerBloc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should don't have an app-date-filter child", () => {
    const child = fixture.debugElement.query(By.css('app-date-filter'));
    expect(child).toBeNull();
  });


  it('should have an app-date-filter child', () => {
    component.state.rover = 'curiosity';
    fixture.detectChanges();
    const child = fixture.debugElement.query(By.css('app-date-filter'));
    expect(child).toBeTruthy();
  });

  it("should don't have any app-photo child", () => {
    const child = fixture.debugElement.query(By.css('app-photo'));
    expect(child).toBeNull();
  });

  it('should have one app-photo child', () => {
    stateCtrl.next({
      ...component.state,
      name: StateName.Results,
      rover: 'curiosity',
      data: {
        photos: [{
          cameraId: 'FHAZ',
          date: new Date(),
          cameraName: '',
          rover: 'curiosity',
          id: 1,
          sol: 5,
          src: ''
        }],
        cameras: [],
      }
    });

    fixture.detectChanges();
    const explorer = fixture.debugElement.queryAll(By.css('app-photo'));
    expect(explorer.length).toBe(1);
  });


});
