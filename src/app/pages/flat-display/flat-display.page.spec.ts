import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatDisplayPage } from './flat-display.page';

describe('FlatDisplayPage', () => {
  let component: FlatDisplayPage;
  let fixture: ComponentFixture<FlatDisplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatDisplayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
