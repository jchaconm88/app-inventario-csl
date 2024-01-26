import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Inventario } from 'src/app/inventario';
import { LocalService } from 'src/app/local.service';

@Component({
  selector: 'app-inventario-lectura',
  templateUrl: './inventario-lectura.component.html',
  styleUrls: ['./inventario-lectura.component.css']
})
export class InventarioLecturaComponent implements OnInit {
  inventarioFormGroup: FormGroup
  inventario: Inventario
  dialogRef: MatDialogRef<InventarioLecturaComponent>;

  constructor(private localService: LocalService
    , dialogRef: MatDialogRef<InventarioLecturaComponent>) {    
    
    this.dialogRef = dialogRef;
    this.inventario = new Inventario();
    this.inventarioFormGroup = new FormGroup({
      canal: new FormControl(this.inventario.canal, Validators.required),
      folio: new FormControl(this.inventario.folio, Validators.required),
      etiquetaRansa: new FormControl(this.inventario.etiquetaRansa, Validators.required),
      etiquetaCliente: new FormControl(this.inventario.etiquetaCliente, Validators.required)
    });
   }

  ngOnInit(): void {
  }

  save() {
    let refinventario = this.inventarioFormGroup.value
    this.localService.saveData('inventario', JSON.stringify(refinventario))
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.inventarioFormGroup.controls['folio'].setValue('')
    this.inventarioFormGroup.controls['etiquetaRansa'].setValue('')
    this.inventarioFormGroup.controls['etiquetaCliente'].setValue('')
  }

  cancel() {
    this.dialogRef.close();
  }
}