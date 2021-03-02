type EventHandler<Data> = (data: Data) => Promise<void> | void;

export default class EventManager {
  #events = {};
  
  publish = async <T>(eventName: EventName, data?: T) =>
    this.#events[eventName](data);

  on = <T>(eventName: EventName, handler: EventHandler<T>) =>
    this.#events[eventName] = handler;
}

let events = new EventManager();

export {
  events,
};