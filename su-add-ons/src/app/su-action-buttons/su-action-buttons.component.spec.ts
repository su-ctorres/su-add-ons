import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuActionButtonsComponent } from './su-action-buttons.component';

describe('SuActionButtonsComponent', () => {
  let component: SuActionButtonsComponent;
  let fixture: ComponentFixture<SuActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuActionButtonsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
