import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRescuePostComponent } from './add-rescue-post.component';

describe('AddRescuePostComponent', () => {
  let component: AddRescuePostComponent;
  let fixture: ComponentFixture<AddRescuePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRescuePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRescuePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
