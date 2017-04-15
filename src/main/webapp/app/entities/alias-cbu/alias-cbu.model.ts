
const enum Moneda {
    'PESO',
    ' DOLAR'

};
import { Sucursal } from '../sucursal';
import { Banco } from '../banco';
import { User } from '../../shared';
export class AliasCBU {
    constructor(
        public id?: number,
        public cbu?: string,
        public nombre?: string,
        public moneda?: Moneda,
        public saldo?: number,
        public debin?: boolean,
        public pagador?: boolean,
        public cobrador?: boolean,
        public sucursal?: Sucursal,
        public banco?: Banco,
        public user?: User,
    ) {
        this.debin = false;
        this.pagador = false;
        this.cobrador = false;
    }
}
