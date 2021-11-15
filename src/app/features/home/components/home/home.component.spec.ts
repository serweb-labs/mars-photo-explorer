import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { ExplorerComponent } from '@feat/photo-explorer/components/explorer/explorer.component';
import { MockComponent } from 'ng-mocks';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
      ],
      declarations: [
        HomeComponent,
        MockComponent(ExplorerComponent),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has a child', () => {
    const explorer = fixture.debugElement.query(By.css('app-explorer'));
    expect(explorer).toBeTruthy();
  });

});
