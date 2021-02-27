let lib = 'sonarjs';

let getPlatform = () => (() => (lib + '-' + (() => {
  if (globalThis?.window && (!globalThis.process || globalThis.process['browser'])) return 'web';
  
  if (globalThis?.navigator?.product === 'ReactNative') return 'reactnative'; 
  
  if (globalThis?.process.versions.electron) return 'electron';
  
  if (globalThis?.process.versions.node) return 'node';
  
  return 'unknown';
})()))();



export {
  getPlatform,
};
