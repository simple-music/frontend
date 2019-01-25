import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubscribersComponent } from './user-subscribers.component';

describe('UserSubscribersComponent', () => {
  let component: UserSubscribersComponent;
  let fixture: ComponentFixture<UserSubscribersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubscribersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
