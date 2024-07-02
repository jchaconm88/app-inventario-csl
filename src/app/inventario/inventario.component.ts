import { Inventario } from 'src/app/inventario';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalService } from '../local.service';
import { MatDialog } from '@angular/material/dialog';
import { InventarioLecturaComponent } from './inventario-lectura/inventario-lectura.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InventarioUsuarioComponent } from './inventario-usuario/inventario-usuario.component';
import { InventarioLecturaCajaComponent } from './inventario-lectura-caja/inventario-lectura-caja.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  @ViewChild('paginatorPalets') paginator!: MatPaginator;
  @ViewChild('paginatorCajas') paginatorCajas!: MatPaginator;
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
  columnsCajas = [
    {
      columnDef: 'canal',
      header: 'Canal',
      cell: (element: Inventario) => `${element.canal}`,
    },
    {
      columnDef: 'dun',
      header: 'Dun',
      cell: (element: Inventario) => `${element.dun}`,
    },
    {
      columnDef: 'lote',
      header: 'Lote',
      cell: (element: Inventario) => `${element.lote}`,
    },
    {
      columnDef: 'cantidad',
      header: 'Cantidad',
      cell: (element: Inventario) => `${element.cantidad}`,
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
  dataSourceCajas: MatTableDataSource<Inventario>
  displayedColumns = this.columns.map(c => c.columnDef);
  displayedColumnsCajas = this.columnsCajas.map(c => c.columnDef);
  inventarioList: Inventario[] = []
  inventarioCajaList: Inventario[] = []

  constructor(private localService: LocalService
    , dialog: MatDialog) {  
      this.dialog = dialog;
      this.dataSource = new MatTableDataSource()
      this.dataSourceCajas = new MatTableDataSource()
   }

  ngOnInit(): void {
    this.load()
  }

  load(): void {
    //this.isWait = true;
    this.inventarioList = JSON.parse(this.localService.getData('inventario')? this.localService.getData('inventario')!: '[]')
    this.inventarioCajaList = JSON.parse(this.localService.getData('inventarioCajas')? this.localService.getData('inventarioCajas')!: '[]')
    this.setDatasource()
    this.setDatasourceCajas()
    //this.isWait = false;
  }

  filter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterCajas(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCajas.filter = filterValue

    if (this.dataSourceCajas.paginator) {
      this.dataSourceCajas.paginator.firstPage();
    }
  }

  setDatasource(): void {
    this.dataSource = new MatTableDataSource(this.inventarioList);
    this.dataSource.paginator = this.paginator;
  }

  setDatasourceCajas(): void {
    this.dataSourceCajas = new MatTableDataSource(this.inventarioCajaList);
    this.dataSourceCajas.paginator = this.paginatorCajas;
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

  createCajas() {    
    const dialogUserRef = this.dialog.open(InventarioUsuarioComponent);
    dialogUserRef.afterClosed().subscribe(user => {
      if (user) {
        const dialogRef = this.dialog.open(InventarioLecturaCajaComponent, { data: user });
        dialogRef.afterClosed().subscribe(result => {
          this.load();
        });
      }
    });    
  }

  clear() {
    this.localService.removeData('inventario')
    this.load()
  }

  clearCajas() {
    this.localService.removeData('inventarioCajas')
    this.load()
  }

  download() {
    let downString = ''
    let contador = 0

    this.inventarioList = this.inventarioList.sort(function (a, b) {
      if (a.canal > b.canal) return 1;
      if (a.canal < b.canal) return -1;
      return 0;
    });

    let canal = this.inventarioList[0].canal
    for (const inventario of this.inventarioList) {
      if (canal != inventario.canal) {
        contador = 0
        canal = inventario.canal
      }
      contador++
      downString = downString + `${contador}|PALET|${inventario.canal}|${inventario.folioEtiqueta}|${inventario.dun}|${inventario.tipo}|||${inventario.usuario}|${inventario.fecha}` + '\n'
    }
    const blob = new Blob([downString], { type: 'application/octet-stream' });
    const url= window.URL.createObjectURL(blob)
    var link = document.createElement("a")
    link.href = url
    link.download = `INV_PALET_${new Date().toISOString()}.txt`;
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  downloadCajas() {
    let downString = ''
    let contador = 0
    
    this.inventarioCajaList = this.inventarioCajaList.sort(function (a, b) {
      if (a.canal > b.canal) return 1;
      if (a.canal < b.canal) return -1;
      return 0;
    });

    let canal = this.inventarioCajaList[0].canal
    for (const inventario of this.inventarioCajaList) {
      if (canal != inventario.canal) {
        contador = 0
        canal = inventario.canal
      }
      contador++
      downString = downString + `${contador}|CAJA|${inventario.canal}||${inventario.dun}||${inventario.lote}|${inventario.cantidad}|${inventario.usuario}|${inventario.fecha}` + '\n'
    }
    const blob = new Blob([downString], { type: 'application/octet-stream' });
    const url= window.URL.createObjectURL(blob)
    var link = document.createElement("a")
    link.href = url
    link.download = `INV_CAJA_${new Date().toISOString()}.txt`;
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}