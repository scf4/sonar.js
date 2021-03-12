declare let horn: () => Promise<void>;
declare let muteSelf: () => Promise<void>;
declare let unmuteSelf: () => Promise<void>;
declare let move: (x: number, y: number) => Promise<void>;
declare let updateStatusText: (statusText: string) => Promise<void>;
declare let updateColor: (color: string) => Promise<void>;
declare let dropItem: (name: string, x?: number | undefined, y?: number | undefined) => Promise<void>;
export { horn, move, updateStatusText, updateColor, muteSelf, unmuteSelf, dropItem, };
