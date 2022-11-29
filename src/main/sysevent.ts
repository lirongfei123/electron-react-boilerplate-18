var EventEmitter = require('eventemitter3');
var EE = new EventEmitter()
  , context = { foo: 'bar' };
 
export function addIohookListener(callback) {
  EE.on('active', callback);
}
export function removeIohookListener(callback) {
  EE.removeListener('active', callback);
}
export function emitIohookEvent(event) {
  EE.emit('active', event);
}