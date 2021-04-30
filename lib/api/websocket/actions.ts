import { getState, updateState } from 'lib/state';
import { generateUniqueSonarId } from 'utils/uid';
import { sendAction } from './send-message';

const horn = () => sendAction('horn');

const muteSelf = () => sendAction('is_self_muted_update', { isSelfMuted: true });

const unmuteSelf = () => sendAction('is_self_muted_update', { isSelfMuted: false });

const move = async (x: number, y: number) => {
  updateState(state => {
    if (!state.room) {
      return console.error('The global state object doesn\'t contain any room data');
    }
    state.room.position = { x, y };
  });

  const moveId = updateState(state => (state.moveId += 1)).moveId!;

  void sendAction('move', { x, y, moveId });
};

const updateStatusText = (statusText: string) => sendAction('status_text_update', { statusText });

const updateColor = (color: string) => sendAction('color_update', { color });

const dropItem = (name: string, x?: number, y?: number, signText?: string) => {
  const { room } = getState();

  if (!signText && name.replaceAll(' ', '').startsWith('🪧')) {
    name = '🪧';
    signText = name.split('🪧')?.[1];
  }

  // Drop item at provided coordinates, user's position, or default to center
  x ??= room?.position.x ?? 0;
  y ??= room?.position.y ?? 0;

  const moveId = updateState(state => (state.moveId += 1)).moveId!;

  return sendAction('drop_droppable', {
    name,
    signText,
    clientGeneratedId: generateUniqueSonarId(),
    desiredX: x!,
    desiredY: y!,
    moveId,
  });
};

const dropSign = (text: string, x?: number, y?: number) => {
  return dropItem('🪧', x, y, text);
};

const removeItem = (id: string) => sendAction('remove_droppable', { id });

export { horn, move, updateStatusText, updateColor, muteSelf, unmuteSelf, dropItem, dropSign, removeItem };
