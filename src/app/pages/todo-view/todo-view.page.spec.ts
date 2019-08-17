import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoViewPage } from './todo-view.page';

describe('TodoViewPage', () => {
  let component: TodoViewPage;
  let fixture: ComponentFixture<TodoViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
