import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdetailsPageComponent } from './orderdetails-page.component';

describe('OrderdetailsPageComponent', () => {
  let component: OrderdetailsPageComponent;
  let fixture: ComponentFixture<OrderdetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderdetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
