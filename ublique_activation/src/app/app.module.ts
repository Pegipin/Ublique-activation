import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Interceptor } from '../Http/interceptor';
import { DemoService } from '../Service/demo.service';
import { Context } from '../Service/DNN/context.service';
import { AppComponent } from './app.component';
import { ListCentriAutomezziProdottoComponent } from './components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component';
import { AngularMaterialModule } from './modules/angular-material-module';
import { AddEditCentriAutomezziProdottoDialogComponent } from './dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatIcon } from '@angular/material';


@NgModule({
  entryComponents: [
    AddEditCentriAutomezziProdottoDialogComponent,
  ],
  declarations: [
    AppComponent,
    ListCentriAutomezziProdottoComponent,
    AddEditCentriAutomezziProdottoDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // important - this changed in Angular 4.3
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,MatPaginatorModule,
    NgxMatSelectSearchModule
  ],

  providers: [
    Context,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    DemoService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
