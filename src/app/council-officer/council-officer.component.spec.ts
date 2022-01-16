import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilOfficerComponent } from './council-officer.component';

describe('CouncilOfficerComponent', () => {
  let component: CouncilOfficerComponent;
  let fixture: ComponentFixture<CouncilOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouncilOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
