import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MatTableDataSource,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { LogisticCenterEntity } from "src/app/entity/Logistic_Center";
import {
  RainbowUbliqueActivationEntity,
  RainbowUbliqueActivationEntity_List,
} from "src/app/entity/Rainbow_Ublique_Activation.entity";
import { SocietaEntity } from "src/app/entity/Societa.entity";
import { EOTArtBaseEntity } from "src/app/entity/Tart_Base_entity";
import { ApiService } from "src/app/services/api.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-edit-centri-automezzi-prodotto-dialog",
  templateUrl: "./add-edit-centri-automezzi-prodotto-dialog.component.html",
  styleUrls: ["./add-edit-centri-automezzi-prodotto-dialog.component.css"],
})
export class AddEditCentriAutomezziProdottoDialogComponent implements OnInit {
  selectedLogisticCenter:string ;
  filterLogistic: any;
  selectedProduct: string;
  listLogisticCenter: LogisticCenterEntity[] = [];
  listProducts: EOTArtBaseEntity[] = [];
  filteredListLogistica: LogisticCenterEntity[] = [];
  filteredListProducts: EOTArtBaseEntity[] = [];
  entity: RainbowUbliqueActivationEntity = new RainbowUbliqueActivationEntity();
  demandplanningactive: boolean;
  logisticCenter: string;
  error: boolean = false;
  private _unsubscribeAll: Subject<any>;
  usersDataSource: MatTableDataSource<SocietaEntity> =
    new MatTableDataSource<SocietaEntity>();
  dataSource: MatTableDataSource<RainbowUbliqueActivationEntity> =
    new MatTableDataSource<RainbowUbliqueActivationEntity>();

  constructor(
    private _apiservice: ApiService,
    private selfDialogRef: MatDialogRef<AddEditCentriAutomezziProdottoDialogComponent>
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._apiservice.ListArtBase().subscribe((products: EOTArtBaseEntity[]) => {
      this.listProducts = products;
      this.filteredListProducts = this.listProducts;
        this.selectedProduct="00021"

    });

    this._apiservice
      .ListLogisticCenter()
      .subscribe((centers: LogisticCenterEntity[]) => {
        this.listLogisticCenter = centers;
        this.filteredListLogistica = this.listLogisticCenter;
         this.selectedLogisticCenter="00"
      });

  }

  onCloseClick() {
    this.selfDialogRef.close();
  }

  onSaveClick() {
    let entity: RainbowUbliqueActivationEntity =
      new RainbowUbliqueActivationEntity();
    console.log("logisticcenter", this.selectedLogisticCenter);
    console.log("product", this.selectedProduct);

    entity.logisticcenter = this.selectedLogisticCenter;
    entity.baseproduct = this.selectedProduct;

    entity.demandplanningactive = this.demandplanningactive;

    if (this.error == false) {
      this._apiservice
        .SetRainbowUbliqueActivation(entity)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res) => {
          if (res) {
            this.selfDialogRef.close();
          }
        });
    }
  }

  filterLogisticOption(event: string) {
    if (!this.listLogisticCenter) {
      return;
    }

    if (!event) {
      this.filteredListLogistica = this.listLogisticCenter;
      return;
    } else {
      event = event.toLowerCase();
    }
      this.filteredListLogistica = this.listLogisticCenter.filter(
      (x) =>{ return x.CABreve.toLowerCase().indexOf(event) > -1 ||
        x.CA.toLowerCase().indexOf(event) > -1

      })

    console.log("filteredLogistica", this.filteredListLogistica);
  }

  filterProductOption(event: string) {
    if (!this.listProducts) {
      return;
    }

    if (!event) {
      this.filteredListProducts = this.listProducts;
      return;
    } else {
      event = event.toLowerCase();
    }

    console.log("event", event);
    this.filteredListProducts = this.listProducts.filter(
      (x) =>

      { return x.artbase.breve.toLowerCase().indexOf(event) > -1||
         x.artbase.art_base.toLowerCase().indexOf(event) > -1
      })

    console.log("filteredproduct", this.filteredListProducts);
  }


}
