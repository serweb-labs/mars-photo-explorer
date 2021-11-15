import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { PhotoComponent } from './photo.component';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [ PhotoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    component.photo = {
      date: new Date(),
      sol: 1,
      cameraId: 'FHAZ',
      cameraName: 'Front Hazard Avoidance Camera',
      src: '',
      rover: 'curiosity',
      id: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
