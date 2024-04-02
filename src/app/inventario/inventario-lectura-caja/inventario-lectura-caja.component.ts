import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inventario } from 'src/app/inventario';
import { LocalService } from 'src/app/local.service';
import { InventarioDunComponent } from '../inventario-dun/inventario-dun.component';

@Component({
  selector: 'app-inventario-lectura-caja',
  templateUrl: './inventario-lectura-caja.component.html',
  styleUrls: ['./inventario-lectura-caja.component.css']
})
export class InventarioLecturaCajaComponent implements OnInit {
  inventarioFormGroup: FormGroup
  inventario: Inventario
  dialogRef: MatDialogRef<InventarioLecturaCajaComponent>
  dialog: MatDialog
  @ViewChild('txtCanal') txtCanal!: ElementRef
  @ViewChild('txtDun') txtDun!: ElementRef
  usuario: string = ''
  dun: string = ''
  tipo: string = ''
  numeroFolios: number = 0
  inventarioList: Inventario[] = []

  constructor(private localService: LocalService
    , private _snackBar: MatSnackBar
    , dialogRef: MatDialogRef<InventarioLecturaCajaComponent>
    , @Inject(MAT_DIALOG_DATA) usuario: string
    , dialog: MatDialog) {    
    
    this.dialogRef = dialogRef 
    this.dialog = dialog
    this.usuario = usuario
    this.inventario = new Inventario();
    this.inventarioFormGroup = new FormGroup({
      canal: new FormControl(this.inventario.canal, Validators.required),
      dun: new FormControl(this.inventario.dun, Validators.required),
      lote: new FormControl(this.inventario.lote, Validators.required),
      cantidad: new FormControl('', Validators.required)
    });
    this.inventarioList = JSON.parse(this.localService.getData('inventarioCajas')? this.localService.getData('inventarioCajas')!: '[]')
    this.contarFolios()
   }

  ngOnInit(): void {
  }

  contarFolios() {
    let invList = this.inventarioList.filter(o => 
      o.canal == this.inventarioFormGroup.controls['canal'].value)
    this.numeroFolios = invList.length
  }

  nuevoCanal() {
    this.inventarioFormGroup.controls['canal'].setValue('')
    this.txtCanal.nativeElement.focus()
  }

  validarFolio(){      
    this.save()
  }

  save() {
    try {
      //let inventarioList = JSON.parse(this.localService.getData('inventario')? this.localService.getData('inventario')!: '[]')
      let inventario = this.inventarioFormGroup.value
      inventario.usuario = this.usuario
      inventario.fecha = new Date()
  
      this.inventarioList.push(this.inventarioFormGroup.value)
      this.contarFolios()
      this.localService.saveData('inventarioCajas', JSON.stringify(this.inventarioList))
      this.limpiarFormulario();
    } catch (error) {
      this._snackBar.open(error as string, 'Cerrar', {
        duration: 5000,
      });
    }
  }

  limpiarFormulario() {
    this.inventarioFormGroup.controls['dun'].setValue('')
    this.inventarioFormGroup.controls['lote'].setValue('')
    this.inventarioFormGroup.controls['cantidad'].setValue('')
    this.txtDun.nativeElement.focus()
  }

  cancel() {
    this.dialogRef.close();
  }
}
