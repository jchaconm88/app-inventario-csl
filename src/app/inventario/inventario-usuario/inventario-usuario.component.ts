import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inventario-usuario',
  templateUrl: './inventario-usuario.component.html',
  styleUrls: ['./inventario-usuario.component.css']
})
export class InventarioUsuarioComponent implements OnInit {
  inventarioFormGroup: FormGroup
  dialogRef: MatDialogRef<InventarioUsuarioComponent>

  constructor(dialogRef: MatDialogRef<InventarioUsuarioComponent>) {
    this.dialogRef = dialogRef
    this.inventarioFormGroup = new FormGroup({
      usuario: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.inventarioFormGroup.controls['usuario'].value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
