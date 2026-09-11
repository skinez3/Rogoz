import * as Constants from '../lib/Constants'
import Bullet from '../server/Bullet'
import Player from '../server/Player'
import Powerup from '../server/Powerup'
import Vector from '../lib/Vector'
import Viewport from './Viewport'

class Drawing {
  context: CanvasRenderingContext2D
  images: Map<
    Constants.DRAWING_IMG_KEYS | Constants.POWERUP_TYPES,
    HTMLImageElement
  >

  viewport: Viewport

  width: number
  height: number

  constructor(
    context: CanvasRenderingContext2D,
    images: Map<Constants.DRAWING_IMG_KEYS, HTMLImageElement>,
    viewport: Viewport,
  ) {
    this.context = context
    this.images = images
    this.viewport = viewport

    this.width = context.canvas.width
    this.height = context.canvas.height
  }

  static create(canvas: HTMLCanvasElement, viewport: Viewport): Drawing {
    const context = canvas.getContext('2d')!
    const images = new Map()
    for (const [key, filename] of Constants.DRAWING_IMG_KEY_TO_ASSET) {
      const img = new Image()
      
      let imagePath = `${Constants.DRAWING_IMG_BASE_PATH}/${filename}`
      if (imagePath.startsWith('/')) {
        imagePath = imagePath.substring(1)
      }
      
      img.src = imagePath
      images.set(key, img)
    }
    return new Drawing(context, images, viewport)
  }


  drawCenteredImage(image: HTMLImageElement): void {
    this.context.drawImage(image, -image.width / 2, -image.height / 2)
  }

  clear(): void {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  drawMan(isSelf: boolean, player: Player): void {
    this.context.save()
    const canvasCoords = this.viewport.toCanvas(player.position)
    this.context.translate(canvasCoords.x, canvasCoords.y)

    this.context.textAlign = 'center'
    this.context.font = Constants.DRAWING_NAME_FONT
    this.context.fillStyle = Constants.DRAWING_NAME_COLOR
    this.context.fillText(player.name as string, 0, -50)

    for (let i = 0; i < 10; ++i) {
      if (i < player.health) {
        this.context.fillStyle = Constants.DRAWING_HP_COLOR
      } else {
        this.context.fillStyle = Constants.DRAWING_HP_MISSING_COLOR
      }
      // prettier-ignore
      this.context.fillRect(-25 + (5 * i), -40, 5, 4)
    }

    this.context.rotate(player.manAngle)
    this.drawCenteredImage(
      this.images.get(
        isSelf
          ? Constants.DRAWING_IMG_KEYS.SELF_MAN
          : Constants.DRAWING_IMG_KEYS.OTHER_MAN,
      )!,
    )
    this.context.rotate(-player.manAngle)

    this.context.rotate(player.handAngle)
    this.drawCenteredImage(
      this.images.get(
        isSelf
          ? Constants.DRAWING_IMG_KEYS.SELF_HAND
          : Constants.DRAWING_IMG_KEYS.OTHER_HAND,
      )!,
    )

    this.context.restore()
  }


  drawBullet(bullet: Bullet): void {
    this.context.save()
    const canvasCoords = this.viewport.toCanvas(bullet.position)
    this.context.translate(canvasCoords.x, canvasCoords.y)
    this.context.rotate(bullet.angle)
    this.drawCenteredImage(this.images.get(Constants.DRAWING_IMG_KEYS.BULLET)!)
    this.context.restore()
  }

  drawPowerup(powerup: Powerup): void {
    this.context.save()
    const canvasCoords = this.viewport.toCanvas(powerup.position)
    this.context.translate(canvasCoords.x, canvasCoords.y)
    // Reverse lookup enum since it becomes the JSONified value in the request.
    const powerupType = Object.entries(Constants.POWERUP_TYPES).find(
      ([k]) => k === powerup.type,
    )![1]
    this.drawCenteredImage(this.images.get(powerupType)!)
    this.context.restore()
  }


  drawTiles(): void {
    const start = this.viewport.toCanvas(
      new Vector(Constants.WORLD_MIN, Constants.WORLD_MIN),
    )
    const end = this.viewport.toCanvas(
      new Vector(Constants.WORLD_MAX, Constants.WORLD_MAX),
    )
    for (let x = start.x; x < end.x; x += Constants.DRAWING_TILE_SIZE) {
      for (let y = start.y; y < end.y; y += Constants.DRAWING_TILE_SIZE) {
        this.context.drawImage(
          this.images.get(Constants.DRAWING_IMG_KEYS.TILE)!,
          x,
          y,
        )
      }
    }
  }
}

export default Drawing
