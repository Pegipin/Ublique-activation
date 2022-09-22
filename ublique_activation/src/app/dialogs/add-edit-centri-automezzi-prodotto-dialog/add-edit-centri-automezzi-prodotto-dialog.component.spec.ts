import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCentriAutomezziProdottoDialogComponent } from './add-edit-centri-automezzi-prodotto-dialog.component';

describe('AddEditCentriAutomezziProdottoDialogComponent', () => {
  let component: AddEditCentriAutomezziProdottoDialogComponent;
  let fixture: ComponentFixture<AddEditCentriAutomezziProdottoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCentriAutomezziProdottoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCentriAutomezziProdottoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
