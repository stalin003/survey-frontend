import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentUserComponent } from './resident-user.component';

describe('ResidentUserComponent', () => {
  let component: ResidentUserComponent;
  let fixture: ComponentFixture<ResidentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
