import { AliasCBU } from '../alias-cbu';
export class Debin {
    constructor(
        public id?: number,
        public desde?: any,
        public hasta?: any,
        public activo?: boolean,
        public monto?: number,
        public pagador?: AliasCBU,
        public cobrador?: AliasCBU,
    ) {
        this.activo = false;
    }
}
