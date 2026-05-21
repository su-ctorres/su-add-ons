import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuUserLinksComponent } from './su-user-links.component';

describe('SuUserLinksComponent', () => {
  let component: SuUserLinksComponent;
  let fixture: ComponentFixture<SuUserLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuUserLinksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuUserLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
