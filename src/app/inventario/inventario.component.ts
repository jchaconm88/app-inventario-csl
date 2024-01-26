import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { MatDialog } from '@angular/material/dialog';
import { InventarioLecturaComponent } from './inventario-lectura/inventario-lectura.component';
import { Inventario } from '../inventario';

const ELEMENT_DATA: Inventario[] = [
  {canal: '1', folio: 'Hydrogen', etiquetaRansa: '1.0079', etiquetaCliente: 'H'},
  {canal: '2', folio: 'Helium', etiquetaRansa: '4.0026', etiquetaCliente: 'He'},
  {canal: '3', folio: 'Lithium', etiquetaRansa: '6.941', etiquetaCliente: 'Li'},
  {canal: '4', folio: 'Beryllium', etiquetaRansa: '9.0122', etiquetaCliente: 'Be'},
  {canal: '5', folio: 'Boron', etiquetaRansa: '10.811', etiquetaCliente: 'B'},
  {canal: '6', folio: 'Carbon', etiquetaRansa: '12.0107', etiquetaCliente: 'C'},
  {canal: '7', folio: 'Nitrogen', etiquetaRansa: '14.0067', etiquetaCliente: 'N'},
  {canal: '8', folio: 'Oxygen', etiquetaRansa: '15.9994', etiquetaCliente: 'O'},
  {canal: '9', folio: 'Fluorine', etiquetaRansa: '18.9984', etiquetaCliente: 'F'},
  {canal: '10', folio: 'Neon', etiquetaRansa: '20.1797', etiquetaCliente: 'Ne'},
];

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  dialog: MatDialog
  columns = [
    {
      columnDef: 'canal',
      header: 'Canal',
      cell: (element: Inventario) => `${element.canal}`,
    },
    {
      columnDef: 'folio',
      header: 'Folio',
      cell: (element: Inventario) => `${element.folio}`,
    },
    {
      columnDef: 'etiquetaRansa',
      header: 'Etiqueta Ransa',
      cell: (element: Inventario) => `${element.etiquetaRansa}`,
    },
    {
      columnDef: 'etiquetaCliente',
      header: 'Etiqueta Cliente',
      cell: (element: Inventario) => `${element.etiquetaCliente}`,
    },
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private localService: LocalService
    , dialog: MatDialog) {  
      this.dialog = dialog;
   }

  ngOnInit(): void {
  }

  create() {
    const dialogRef = this.dialog.open(InventarioLecturaComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.load();
      }
    });
  }
}


