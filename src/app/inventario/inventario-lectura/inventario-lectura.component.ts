import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inventario } from 'src/app/inventario';
import { LocalService } from 'src/app/local.service';
import { InventarioDunComponent } from '../inventario-dun/inventario-dun.component';

@Component({
  selector: 'app-inventario-lectura',
  templateUrl: './inventario-lectura.component.html',
  styleUrls: ['./inventario-lectura.component.css']
})
export class InventarioLecturaComponent implements OnInit {
  inventarioFormGroup: FormGroup
  inventario: Inventario
  dialogRef: MatDialogRef<InventarioLecturaComponent>
  dialog: MatDialog
  @ViewChild('txtFolio') txtFolio!: ElementRef
  @ViewChild('txtCanal') txtCanal!: ElementRef
  usuario: string = ''
  dun: string = ''
  tipo: string = ''
  numeroFolios: number = 0
  inventarioList: Inventario[] = []

  constructor(private localService: LocalService
    , private _snackBar: MatSnackBar
    , dialogRef: MatDialogRef<InventarioLecturaComponent>
    , @Inject(MAT_DIALOG_DATA) usuario: string
    , dialog: MatDialog) {    
    
    this.dialogRef = dialogRef 
    this.dialog = dialog
    this.usuario = usuario
    this.inventario = new Inventario();
    this.inventarioFormGroup = new FormGroup({
      canal: new FormControl(this.inventario.canal, Validators.required),
      folioEtiqueta: new FormControl(this.inventario.folioEtiqueta, Validators.required)
    });
    this.inventarioList = JSON.parse(this.localService.getData('inventario')? this.localService.getData('inventario')!: '[]')
    this.contarFolios()
   }

  ngOnInit(): void {
  }

  contarFolios() {
    let invList = this.inventarioList.filter(o => 
      o.canal == this.inventarioFormGroup.controls['canal'].value)
    this.numeroFolios = invList.length
  }

  canalKeypress(event: KeyboardEvent) {
    let x = event.charCode
    switch(x) {
      case 13: 
        this.txtFolio.nativeElement.focus()
        this.contarFolios()
        break;
    }
  }

  folioKeypress(event: KeyboardEvent) {
    let x = event.charCode
    switch(x) {
      case 13: 
        this.validarFolio();
        break;
    }
  }

  nuevoCanal() {
    this.inventarioFormGroup.controls['canal'].setValue('')
    this.txtCanal.nativeElement.focus()
  }

  validarFolio(){
    let folioEtiqueta = this.inventarioFormGroup.controls['folioEtiqueta'].value
    if (folioEtiqueta) {
      if (folioEtiqueta.includes("/")) {
        this.tipo = 'CSL'      
        this.save()
      }
      else {
        this.tipo = 'Ransa'    
        const dialogUserRef = this.dialog.open(InventarioDunComponent);  
        dialogUserRef.afterClosed().subscribe(result => {
          if (result) {
            this.dun = result
            this.save()
          }
        });
      }
    }
  }

  save() {
    try {
      //let inventarioList = JSON.parse(this.localService.getData('inventario')? this.localService.getData('inventario')!: '[]')
      let inventario = this.inventarioFormGroup.value
      inventario.usuario = this.usuario
      inventario.tipo = this.tipo
      inventario.dun = this.tipo == 'CSL'? '': this.dun
      inventario.fecha = new Date()
  
      let folio = this.inventarioList.find((o: { folioEtiqueta: any; }) => o.folioEtiqueta == inventario.folioEtiqueta)
      if (folio) {
        throw `Folio/Etiqueta: ${inventario.folioEtiqueta}, ya se encuentra registrado(a)`
      }
      
      this.inventarioList.push(this.inventarioFormGroup.value)
      this.contarFolios()
      this.localService.saveData('inventario', JSON.stringify(this.inventarioList))
      this.limpiarFormulario();
    } catch (error) {
      this._snackBar.open(error as string, 'Cerrar', {
        duration: 5000,
      });
    }
  }

  limpiarFormulario() {
    this.inventarioFormGroup.controls['folioEtiqueta'].setValue('')
    this.txtFolio.nativeElement.focus()
  }

  cancel() {
    this.dialogRef.close();
  }
}