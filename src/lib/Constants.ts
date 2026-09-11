import Entity from './Entity'
import Player from '../server/Player'
import Powerup from '../server/Powerup'

// Socket events we can listen for.
export enum SOCKET {
  UPDATE = 'update',
  NEW_PLAYER = 'newPlayer',
  PLAYER_ACTION = 'playerAction',
  CHAT_CLIENT_SERVER = 'chatClientToServer',
  CHAT_SERVER_CLIENT = 'chatServerToClient',
  DISCONNECT = 'disconnect',
}
// Interfaces for objects that can be sent via socket
export interface PLAYER_INPUTS {
  up: boolean
  down: boolean
  right: boolean
  left: boolean
  handAngle: number
  shoot: boolean
}
export interface CHAT_MESSAGE {
  name: string
  message: string
  isNotification: boolean
}
export interface GAME_STATE {
  self: Player
  players: Player[]
  projectiles: Entity[]
  powerups: Powerup[]
}

// Interfaces for each of the socket.io communication types
export interface SERVER_TO_CLIENT_EVENTS {
  [SOCKET.UPDATE]: (state: GAME_STATE) => void
  [SOCKET.CHAT_SERVER_CLIENT]: (data: CHAT_MESSAGE) => void
}
export interface CLIENT_TO_SERVER_EVENTS {
  [SOCKET.NEW_PLAYER]: (name: string, callback: () => void) => void
  [SOCKET.PLAYER_ACTION]: (data: PLAYER_INPUTS) => void
  [SOCKET.CHAT_CLIENT_SERVER]: (data: CHAT_MESSAGE) => void
  [SOCKET.DISCONNECT]: () => void
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SERVER_TO_SERVER_EVENTS {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SOCKET_DATA {}

export const PLAYER_TURN_RATE = 0.01;
export const PLAYER_DEFAULT_SPEED = 0.2;
export const PLAYER_SHOT_COOLDOWN = 800;
export const PLAYER_DEFAULT_HITBOX_SIZE = 20;
export const PLAYER_MAX_HEALTH = 10;
export const BULLET_DEFAULT_DAMAGE = 1;
export const BULLET_SPEED = 0.8;
export const BULLET_MAX_TRAVEL_DISTANCE = 1000;
export const BULLET_HITBOX_SIZE = 10;
export const POWERUP_HITBOX_SIZE = 5;
export const POWERUP_MAX_COUNT = 200;
export const POWERUP_MIN_DURATION = 500;
export const POWERUP_MAX_DURATION = 3000;
// This enum cannot share any values with DRAWING_IMG_KEYS below since they will
// both be used to key a map to the image asset paths.
export enum POWERUP_TYPES {
  HEALTH_PACK = 'HEALTH_PACK',
  SHOTGUN = 'SHOTGUN',
  RAPIDFIRE = 'RAPIDFIRE',
  SPEEDBOOST = 'SPEEDBOOST',
  IDLE1 = 'IDLE1',
  IDLE2 = 'IDLE2',
  IDLE3 = 'IDLE3',
  IDLE4 = 'IDLE4',
  IDLE5 = 'IDLE5',
  IDLE6 = 'IDLE6',
  IDLE7 = 'IDLE7',
  IDLE8 = 'IDLE8',
  IDLE9 = 'IDLE9',
}

export interface POWERUP_DATA {
  min: number
  max: number
}
export const POWERUP_DATA_RANGES = new Map<POWERUP_TYPES, POWERUP_DATA>([
  [POWERUP_TYPES.HEALTH_PACK, { min: 1, max: 1 }],
  [POWERUP_TYPES.SHOTGUN, { min: 1, max: 2 }],
  [POWERUP_TYPES.RAPIDFIRE, { min: 2, max: 4 }],
  [POWERUP_TYPES.SPEEDBOOST, { min: 1.2, max: 1.8 }],
  [POWERUP_TYPES.IDLE1, { min: 1, max: 1 }],
  [POWERUP_TYPES.IDLE2, { min: 1, max: 1 }],
  [POWERUP_TYPES.IDLE3, { min: 1, max: 1 }],
  [POWERUP_TYPES.IDLE4, { min: 1, max: 1 }],
  [POWERUP_TYPES.IDLE5, { min: 1, max: 1 }],
  [POWERUP_TYPES.IDLE6, { min: 1, max: 1 }],
  [POWERUP_TYPES.IDLE7, { min: 1, max: 1 }],
  [POWERUP_TYPES.IDLE8, { min: 1, max: 1 }],
  [POWERUP_TYPES.IDLE9, { min: 1, max: 1 }],
])

export const WORLD_MIN = 0;
export const WORLD_MAX = 1000;
export const WORLD_PADDING = 6;
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const DRAWING_NAME_FONT = '14px Helvetica';
export const DRAWING_NAME_COLOR = 'black';
export const DRAWING_HP_COLOR = 'red';
export const DRAWING_HP_MISSING_COLOR = 'grey';
export const DRAWING_IMG_BASE_PATH = '/img';
// This enum cannot share any values with POWERUP_TYPES above since they will
// both be used to key a map to the image asset paths.
export enum DRAWING_IMG_KEYS {
  SELF_MAN = 'SELF_MAN',
  SELF_HAND = 'SELF_HAND',
  OTHER_MAN = 'OTHER_MAN',
  OTHER_HAND = 'OTHER_HAND',
  BULLET = 'BULLET',
  TILE = 'TILE',
}
export const DRAWING_IMG_KEY_TO_ASSET = new Map<
  DRAWING_IMG_KEYS | POWERUP_TYPES,
  string
>([
  [DRAWING_IMG_KEYS.SELF_MAN, 'self_man.png'],
  [DRAWING_IMG_KEYS.SELF_HAND, 'self_hand.png'],
  [DRAWING_IMG_KEYS.OTHER_MAN, 'other_man.png'],
  [DRAWING_IMG_KEYS.OTHER_HAND, 'other_hand.png'],
  [DRAWING_IMG_KEYS.BULLET, 'bullet.png'],
  [DRAWING_IMG_KEYS.TILE, 'tile.png'],
  [POWERUP_TYPES.HEALTH_PACK, 'health_pack_powerup.png'],
  [POWERUP_TYPES.RAPIDFIRE, 'rapidfire_powerup.png'],
  [POWERUP_TYPES.SHOTGUN, 'shotgun_powerup.png'],
  [POWERUP_TYPES.SPEEDBOOST, 'speedboost_powerup.png'],
  [POWERUP_TYPES.IDLE1, 'idle1.png'],
  [POWERUP_TYPES.IDLE2, 'idle2.png'],
  [POWERUP_TYPES.IDLE3, 'idle3.png'],
  [POWERUP_TYPES.IDLE4, 'idle4.png'],
  [POWERUP_TYPES.IDLE5, 'idle5.png'],
  [POWERUP_TYPES.IDLE6, 'idle6.png'],
  [POWERUP_TYPES.IDLE7, 'idle7.png'],
  [POWERUP_TYPES.IDLE8, 'idle8.png'],
  [POWERUP_TYPES.IDLE9, 'idle9.png'],
])
export const DRAWING_TILE_SIZE = 100
export const VIEWPORT_STICKINESS = 0.004

// Validation code in anonymous function, module will break on import if invalid
;((): void => {
  const m = new Set(Object.keys(DRAWING_IMG_KEYS))
  for (const v in POWERUP_TYPES) {
    if (m.has(v)) {
      throw new Error(
        'Keys in POWERUP_TYPES cannot intersect with DRAWING_IMG_KEYS',
      )
    }
  }
})()
