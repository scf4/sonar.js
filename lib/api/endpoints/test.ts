import { createClient } from '../..';
// import '../../../sonarjs/lib/types/local';
// import '../../../sonarjs/lib/types/index';
// import { rotate270 } from '2d-array-rotation';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

async function main() {
  const sonar = await createClient();
  await sleep(1000);
  await sonar.actions.updateColor('FFF700');
  await sonar.actions.updateStatusText('@sonargram');

  sonar.actions.move(0, 0);
  sonar.actions.move(5, 2);
  sonar.actions.move(1, 5);
  sonar.actions.move(19, -1);
  sonar.actions.move(-1, 10);
  sonar.actions.move(-3, -1);
  
  // sonar.actions.unmuteSelf();

  // const runLoadingIndicator = async (times = 1) => {
  //   times -= 1;
  //   await sonar.actions.updateStatusText('•');
  //   await sleep(300);
  //   await sonar.actions.updateStatusText('••');
  //   await sleep(300);
  //   await sonar.actions.updateStatusText('•••');
  //   await sleep(600);
  //   if (times) runLoadingIndicator(times);
  // };

  // await runLoadingIndicator();


  // sonar.events.on('boop', async ({ roomId, username }) => {
  //   let room = await sonar.rooms.meta(roomId);
  
  //   if (!room || room.isPrivate) return;

  //   let creators = room.moderators
  //     .map(mod => mod.username.toLowerCase())
  //     .concat(room.creator?.username.toLowerCase() ?? 'unknown-creator');

  //   if (creators.includes(username.toLowerCase())) {
  //     await sonar.rooms.join({ roomId });
  //   }
  // });

  // sonar.events.on('join_room', async (room) => {  
  //   if (room.id === 5028) return;

  //   await sonar.actions.updateStatusText('@sonargram');

  //   const objects = room.objects;
  //   const grid = new Array(31).fill(null).map(() => new Array(31).fill(null));

  //   objects.forEach(args => {
  //     const x = args.position.x + 15;
  //     const y = args.position.y + 15;
  //     grid[x][y] = args.name;
  //   });
    
  //   const rotatedGrid = rotate270(grid);


    

  //   sonar.actions.updateStatusText('https://sonargr.am');
  // });

  // const friendRequests = await sonar.friends.requests();

  // for (const user of friendRequests) {
  //   await sonar.friends.confirm(user.id);
  // }
}

main();