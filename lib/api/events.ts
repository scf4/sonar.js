import EventEmitter from 'events';
import TypedEmitter from 'typed-emitter';
import { GameMessageEvent } from 'lib/types';

const events: TypedEmitter<GameMessageEvent> = new EventEmitter();

export { events, TypedEmitter, GameMessageEvent };
