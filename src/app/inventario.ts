export class Inventario {

    constructor() {
        this.aplicativo = ''
        this.canal = ''
        this.folioEtiqueta = ''
        this.dun = ''
        this.tipo = ''
        this.lote = ''
        this.cantidad = 0
        this.usuario = ''
        this.fecha = new Date()
     }

    public aplicativo: string
    public canal: string
    public folioEtiqueta: string
    public dun: string
    public tipo: string
    public lote: string
    public cantidad: number
    public usuario: string
    public fecha: Date
}
