import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSideContentComponent } from './info-side-content.component';

describe('InfoSideContentComponent', () => {
  let component: InfoSideContentComponent;
  let fixture: ComponentFixture<InfoSideContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSideContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSideContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
