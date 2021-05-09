import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBestProductsComponent } from './all-best-products.component';

describe('AllBestProductsComponent', () => {
  let component: AllBestProductsComponent;
  let fixture: ComponentFixture<AllBestProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBestProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBestProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
