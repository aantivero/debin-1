import { Banco } from '../banco';
export class Sucursal {
    constructor(
        public id?: number,
        public denominacion?: string,
        public codigo?: string,
        public banco?: Banco,
    ) {
    }
}
