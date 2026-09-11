import * as socketIOParser from 'socket.io-parser';
import Vector from '../lib/Vector.js';
import { getReplacerReviver } from './CustomObjectSerialization.js';
const { replacer, reviver } = getReplacerReviver({ Vector });
export class Encoder extends socketIOParser.Encoder {
    constructor() {
        super(replacer);
    }
}
export class Decoder extends socketIOParser.Decoder {
    constructor() {
        super(reviver);
    }
}
