import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatJoinPage } from './flat-join.page';

describe('FlatJoinPage', () => {
  let component: FlatJoinPage;
  let fixture: ComponentFixture<FlatJoinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatJoinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatJoinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
