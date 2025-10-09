import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Director } from './director.component';

describe('Director', () => {
  let component: Director;
  let fixture: ComponentFixture<Director>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Director]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Director);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
