export let sleep = (ms: number) =>
  new Promise(res => setTimeout(res, ms));
