import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatListPage } from './flat-list.page';

describe('FlatListPage', () => {
  let component: FlatListPage;
  let fixture: ComponentFixture<FlatListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
