import { createApiClient } from '..';
import { getState } from '../state';
import { rotate270 } from '2d-array-rotation';

// enum Room {
//   Lobby = 122,
//   SonarArena = 3398,
//   SonargramHome = 5028,
//   ScottsSonargramRoom = 12326,
// }

async function main() {
  let api = await createApiClient();

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

  api.events.on('boop', async ({ roomId }: OnBoopData) => {
    await api.rooms.join({ roomId });
  });

  let friendList = await api.friends.listFriends();

  for (let requestedUser of friendList.requests) {
    await api.friends.confirmFriend(requestedUser.id);
  }
}

main();
