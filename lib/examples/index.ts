import { rotate270 } from '2d-array-rotation';
import { createApiClient } from 'lib/client';
import { getState } from 'lib/state';

async function main() {
  let api = await createApiClient();

  api.events.on('join_room', () => {
    let objects = getState().currentRoom?.entities;
    let grid = new Array(31).fill(null).map(() => new Array(31).fill(null));

    objects?.forEach((args) => {
      let x = args.position.x + 15;
      let y = args.position.y + 15;
      grid[x][y] = args.imageUrl;
    });
    
    grid = rotate270(grid);
  });

  api.events.on('boop', ({ roomId }: BoopData) => {
    api.rooms.join({ roomId });
  });

  let { requests } = await api.friends.listFriends();



  for (let user of requests) {
    await api.friends.confirmFriend(user.id);
  }
}

main();

// enum Room {
//   Lobby = 122,
//   SonarArena = 3398,
//   SonargramHome = 5028,
//   ScottSonargramRoom = 12326,
// }
