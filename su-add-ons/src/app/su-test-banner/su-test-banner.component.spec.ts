import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuTestBannerComponent } from './su-test-banner.component';

describe('SuTestBannerComponent', () => {
  let component: SuTestBannerComponent;
  let fixture: ComponentFixture<SuTestBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuTestBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuTestBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
