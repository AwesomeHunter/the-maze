import Maze from "../Maze";
import { HostileEntity } from ".";
import Entity from "./Entity";

export default class Thief extends HostileEntity {
  stolenItem: boolean = false;

  constructor(id: number, x: number, y: number) {
    super(id, "dirt");
    this.x = x;
    this.y = y;
    this.defaultTarget = [x, y];
    this.baseStats.add({ speed: 2.0, damage: 1.0, view: 5 });
    this.updateStats();
  }

  attack(entity: Entity): void {
    // Tutaj kradnie itemek
    this.stolenItem = true;
  }

  isPlayerInAttackRange(maze: Maze) {
    const intersects = (
      a: [number, number, number, number],
      b: [number, number, number, number]
    ) => {
      const [x1, y1, w1, h1] = a;
      const [x2, y2, w2, h2] = b;
      return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
    };
    const [x, y, sizeX, sizeY] = super.getCollisionData();
    const newData: [number, number, number, number] = [
      x - 0.1,
      y - 0.1,
      sizeX + 0.2,
      sizeY + 0.2,
    ];
    return intersects(newData, maze.player.getCollisionData());
  }

  chooseTarget(maze: Maze) {
    if (this.isPlayerNearby(maze, this.stats.get("view")) && !this.stolenItem)
      return maze.player.middlePosition();
    return this.defaultTarget; // Albo gdzieś indziej gdzie ma uciekać
  }
}
