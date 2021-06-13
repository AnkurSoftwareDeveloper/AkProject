import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductlistPageComponent } from './productlist-page.component';

describe('ProductlistPageComponent', () => {
  let component: ProductlistPageComponent;
  let fixture: ComponentFixture<ProductlistPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductlistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
