import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuHideSummitComponent } from './su-hide-summit.component';

describe('SuHideSummitComponent', () => {
  let component: SuHideSummitComponent;
  let fixture: ComponentFixture<SuHideSummitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuHideSummitComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SuHideSummitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
