import { getState, updateState } from '../../state';
import { generateId } from '../../utils/generateId';
import { dispatchAction } from './send-message';

let horn = () => dispatchAction('horn');
let muteSelf = () => dispatchAction('is_self_muted_update', { isSelfMuted: true });
let unmuteSelf = () => dispatchAction('is_self_muted_update', { isSelfMuted: false });

let move = (x: number, y: number) => {
  updateState(s => {
    if (!s.currentRoom) return;
    s.currentRoom.x = x;
    s.currentRoom.y = y;
  });
  
  let moveId = updateState(s => s.moveId! += 1).moveId!; 
  
  return dispatchAction('move', { x, y, moveId });
};

let updateStatusText = (statusText: string) => dispatchAction('status_text_update', { statusText });

let updateColor = (color: string) => dispatchAction('color_update', { color });

let dropItem = (name: string, x?: number, y?: number) => {
  let { currentRoom } = getState();
  
  // Drop item at user's position, provided coordinates, or default to center
  x ??= currentRoom?.x ?? 0;
  y ??= currentRoom?.y ?? 0;

  return dispatchAction('drop_droppable', { 
    name, 
    clientGeneratedId: generateId(),
    desiredX: x!, 
    desiredY: y!, 
  });
};

let closeWebsocket = (reason = 'join_room') => {
  dispatchAction('close_websocket', { reason });
};

export {
  horn,
  move,
  updateStatusText,
  updateColor,
  muteSelf,
  unmuteSelf,
  dropItem,
  closeWebsocket,
};
