import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcaTestBannerComponent } from './orca-test-banner.component';

describe('OrcaTestBannerComponent', () => {
  let component: OrcaTestBannerComponent;
  let fixture: ComponentFixture<OrcaTestBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcaTestBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcaTestBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
