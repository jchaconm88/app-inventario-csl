import { Inventario } from 'src/app/inventario';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalService } from '../local.service';
import { MatDialog } from '@angular/material/dialog';
import { InventarioLecturaComponent } from './inventario-lectura/inventario-lectura.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InventarioUsuarioComponent } from './inventario-usuario/inventario-usuario.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('linkDwnl') linkDwnl!: ElementRef
  dialog: MatDialog
  columns = [
    {
      columnDef: 'canal',
      header: 'Canal',
      cell: (element: Inventario) => `${element.canal}`,
    },
    {
      columnDef: 'folioEtiqueta',
      header: 'Folio/Etiqueta',
      cell: (element: Inventario) => `${element.folioEtiqueta}`,
    },
    {
      columnDef: 'dun',
      header: 'Dun',
      cell: (element: Inventario) => `${element.dun}`,
    },
    {
      columnDef: 'tipo',
      header: 'Tipo',
      cell: (element: Inventario) => `${element.tipo}`,
    },
    {
      columnDef: 'usuario',
      header: 'Usuario',
      cell: (element: Inventario) => `${element.usuario}`,
    },
    {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (element: Inventario) => `${element.fecha}`,
    },
  ];
  dataSource: MatTableDataSource<Inventario>
  displayedColumns = this.columns.map(c => c.columnDef);
  inventarioList: Inventario[] = []

  constructor(private localService: LocalService
    , dialog: MatDialog) {  
      this.dialog = dialog;
      this.dataSource = new MatTableDataSource()
   }

  ngOnInit(): void {
    this.load()
  }

  load(): void {
    //this.isWait = true;
    this.inventarioList = JSON.parse(this.localService.getData('inventario')? this.localService.getData('inventario')!: '[]')    
    this.setDatasource();
    //this.isWait = false;
  }

  filter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setDatasource(): void {
    this.dataSource = new MatTableDataSource(this.inventarioList);
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;

    // this.dataSource.filterPredicate = function (data, filter: string): boolean {
    //   let filterObject = JSON.parse(filter)
    //   return getFilterPredicate(data, filterObject.value, filterObject.columnData)
    // };
  }

  create() {
    
    const dialogUserRef = this.dialog.open(InventarioUsuarioComponent);

    dialogUserRef.afterClosed().subscribe(user => {
      if (user) {
        const dialogRef = this.dialog.open(InventarioLecturaComponent, { data: user });
        dialogRef.afterClosed().subscribe(result => {
          this.load();
        });
      }
    });
    
  }

  clear() {
    this.localService.clearData()
    this.load()
  }

  download() {
    let downString = ''
    let contador = 0
    for (const inventario of this.inventarioList) {
      contador++
      downString = downString + `${contador}|PALLET|${inventario.canal}|${inventario.folioEtiqueta}|${inventario.dun}|${inventario.tipo}|${inventario.usuario}|${inventario.fecha}` + '\n'
    }
    const blob = new Blob([downString], { type: 'application/octet-stream' });
    const url= window.URL.createObjectURL(blob)
    var link = document.createElement("a")
    link.href = url
    link.download = `INV_${new Date().toISOString()}.txt`;
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}