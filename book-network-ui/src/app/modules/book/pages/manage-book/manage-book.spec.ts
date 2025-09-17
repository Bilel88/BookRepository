import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBook } from './manage-book';

describe('ManageBook', () => {
  let component: ManageBook;
  let fixture: ComponentFixture<ManageBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
