import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductPageComponent } from './editproduct-page.component';

describe('EditproductPageComponent', () => {
  let component: EditproductPageComponent;
  let fixture: ComponentFixture<EditproductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditproductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditproductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
