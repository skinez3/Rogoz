import * as Constants from '../lib/Constants'
import Entity from '../lib/Entity'
import Player from '../server/Player'
import Vector from '../lib/Vector'

class Viewport extends Entity {
  playerPosition: Vector
  canvasOffset: Vector


  constructor(
    position: Vector,
    velocity: Vector,
    canvasWidth: number,
    canvasHeight: number,
  ) {
    super(position, velocity, Vector.zero(), 0)

    this.playerPosition = Vector.zero()
    this.canvasOffset = new Vector(canvasWidth / 2, canvasHeight / 2)
  }

  static create(canvas: HTMLCanvasElement): Viewport {
    return new Viewport(
      Vector.zero(),
      Vector.zero(),
      canvas.width,
      canvas.height,
    )
  }

  updateTrackingPosition(player: Player): void {
    this.playerPosition = Vector.sub(player.position, this.canvasOffset)
  }

  update(deltaTime: number): void {
    this.velocity = Vector.sub(this.playerPosition, this.position).scale(
      Constants.VIEWPORT_STICKINESS * deltaTime,
    )
    this.position.add(this.velocity)
  }

  toCanvas(position: Vector): Vector {
    return Vector.sub(position, this.position)
  }

  toWorld(position: Vector): Vector {
    return Vector.add(position, this.position)
  }
}

export default Viewport
