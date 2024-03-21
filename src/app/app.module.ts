import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventarioComponent } from './inventario/inventario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { InventarioLecturaComponent } from './inventario/inventario-lectura/inventario-lectura.component';
import { InventarioUsuarioComponent } from './inventario/inventario-usuario/inventario-usuario.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InventarioDunComponent } from './inventario/inventario-dun/inventario-dun.component';

@NgModule({
  declarations: [
    AppComponent,
    InventarioComponent,
    InventarioLecturaComponent,
    InventarioUsuarioComponent,
    InventarioDunComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
