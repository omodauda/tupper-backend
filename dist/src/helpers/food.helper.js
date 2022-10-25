"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicResponse = void 0;
function _storage(storage) {
    const s = Object.assign(Object.assign({}, storage), { items: storage.items.length });
    return s;
}
const publicResponse = (storages) => storages.map((s) => _storage(s));
exports.publicResponse = publicResponse;
