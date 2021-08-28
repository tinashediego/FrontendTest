/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoldStandsComponent } from './sold-stands.component';

describe('SoldStandsComponent', () => {
  let component: SoldStandsComponent;
  let fixture: ComponentFixture<SoldStandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldStandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldStandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
