import { createApiClient } from '..';
import { getState } from '../state';
import { rotate270 } from '2d-array-rotation';

export enum Room {
  Lobby = 122,
  Sonarena = 3398,
  ColesHell = 3852,
  SnapbotHome = 5028,
  ScottSnapbotRoom = 12326,
}

export enum UserId {
  SnapBot = 3563,
  Scott = 954,
}

async function main() {
  let api = await createApiClient(Room.ScottSnapbotRoom);

  api.events.on('join_room', async () => {
    let objects = getState().currentRoom?.entities ?? [];
    let grid: (string | null)[][] = new Array(31).fill(null).map(() => new Array(31).fill(null));

    objects.forEach((args) => {
      let x = args.position.x + 15;
      let y = args.position.y + 15;
      grid[x][y] = args.imageUrl;
    });
    
    grid = rotate270(grid);
  });

  api.events.on('boop', async (data: OnBoopData) => {
    await api.rooms.join(data);
  });

  let friendList = await api.friends.listFriends();

  for (let requestedUser of friendList.requests) {
    await new Promise(res => setTimeout(res, 5000));
    await api.friends.confirmFriend(requestedUser.id);
  }

  // await api.actions.updateStatusText('');
  // await api.actions.updateColor('FFFFFF');
  // await api.actions.muteSelf();
  // await api.actions.unmuteSelf();
}

main();
