import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionGeneraleComponent } from './condition-generale.component';

describe('ConditionGeneraleComponent', () => {
  let component: ConditionGeneraleComponent;
  let fixture: ComponentFixture<ConditionGeneraleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionGeneraleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionGeneraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
