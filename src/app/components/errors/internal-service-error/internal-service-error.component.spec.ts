import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalServiceErrorComponent } from './internal-service-error.component';

describe('InternalServiceErrorComponent', () => {
  let component: InternalServiceErrorComponent;
  let fixture: ComponentFixture<InternalServiceErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalServiceErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalServiceErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
