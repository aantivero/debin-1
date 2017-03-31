import { Sucursal } from '../sucursal';
import { Banco } from '../banco';
import { User } from '../../shared';
export class AliasCBU {
    constructor(
        public id?: number,
        public cbu?: string,
        public sucursal?: Sucursal,
        public banco?: Banco,
        public user?: User,
    ) {
    }
}
