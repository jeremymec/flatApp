import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedCreatepostPage } from './newsfeed-createpost.page';

describe('NewsfeedCreatepostPage', () => {
  let component: NewsfeedCreatepostPage;
  let fixture: ComponentFixture<NewsfeedCreatepostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedCreatepostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedCreatepostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
