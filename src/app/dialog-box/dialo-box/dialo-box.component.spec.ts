import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoBoxComponent } from './dialo-box.component';

describe('DialoBoxComponent', () => {
  let component: DialoBoxComponent;
  let fixture: ComponentFixture<DialoBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
