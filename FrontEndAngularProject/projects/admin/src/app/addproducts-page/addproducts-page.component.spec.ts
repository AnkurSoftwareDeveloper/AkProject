import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductsPageComponent } from './addproducts-page.component';

describe('AddproductsPageComponent', () => {
  let component: AddproductsPageComponent;
  let fixture: ComponentFixture<AddproductsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
