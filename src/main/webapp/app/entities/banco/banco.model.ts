import { Sucursal } from '../sucursal';
export class Banco {
    constructor(
        public id?: number,
        public denominacion?: string,
        public codigo?: string,
        public sucursal?: Sucursal,
    ) {
    }
}
