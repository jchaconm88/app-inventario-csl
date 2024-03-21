import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inventario-dun',
  templateUrl: './inventario-dun.component.html',
  styleUrls: ['./inventario-dun.component.css']
})
export class InventarioDunComponent implements OnInit {
  inventarioFormGroup: FormGroup
  dialogRef: MatDialogRef<InventarioDunComponent>

  constructor(dialogRef: MatDialogRef<InventarioDunComponent>) {
    this.dialogRef = dialogRef
    this.inventarioFormGroup = new FormGroup({
      dun: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.inventarioFormGroup.controls['dun'].value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
