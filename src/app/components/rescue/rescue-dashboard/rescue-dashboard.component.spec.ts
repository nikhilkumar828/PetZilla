import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescueDashboardComponent } from './rescue-dashboard.component';

describe('RescueDashboardComponent', () => {
  let component: RescueDashboardComponent;
  let fixture: ComponentFixture<RescueDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescueDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
