import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actor } from './actor';

describe('Actor', () => {
  let component: Actor;
  let fixture: ComponentFixture<Actor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
