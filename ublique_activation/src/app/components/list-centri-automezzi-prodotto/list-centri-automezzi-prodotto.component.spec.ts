import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCentriAutomezziProdottoComponent } from './list-centri-automezzi-prodotto.component';

describe('ListCentriAutomezziProdottoComponent', () => {
  let component: ListCentriAutomezziProdottoComponent;
  let fixture: ComponentFixture<ListCentriAutomezziProdottoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCentriAutomezziProdottoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCentriAutomezziProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
