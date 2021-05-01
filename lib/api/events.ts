import EventEmitter from 'events';
import TypedEmitter from 'typed-emitter';
import { GameMessageEvent } from 'lib/types';

export const events: TypedEmitter<GameMessageEvent> =
  new EventEmitter() as TypedEmitter<GameMessageEvent>;