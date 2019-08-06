import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatCreatePage } from './flat-create.page';

describe('FlatCreatePage', () => {
  let component: FlatCreatePage;
  let fixture: ComponentFixture<FlatCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
