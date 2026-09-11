export var SOCKET;
(function (SOCKET) {
    SOCKET["UPDATE"] = "update";
    SOCKET["NEW_PLAYER"] = "newPlayer";
    SOCKET["PLAYER_ACTION"] = "playerAction";
    SOCKET["CHAT_CLIENT_SERVER"] = "chatClientToServer";
    SOCKET["CHAT_SERVER_CLIENT"] = "chatServerToClient";
    SOCKET["DISCONNECT"] = "disconnect";
})(SOCKET || (SOCKET = {}));
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
export var POWERUP_TYPES;
(function (POWERUP_TYPES) {
    POWERUP_TYPES["HEALTH_PACK"] = "HEALTH_PACK";
    POWERUP_TYPES["SHOTGUN"] = "SHOTGUN";
    POWERUP_TYPES["RAPIDFIRE"] = "RAPIDFIRE";
    POWERUP_TYPES["SPEEDBOOST"] = "SPEEDBOOST";
    POWERUP_TYPES["IDLE1"] = "IDLE1";
    POWERUP_TYPES["IDLE2"] = "IDLE2";
    POWERUP_TYPES["IDLE3"] = "IDLE3";
    POWERUP_TYPES["IDLE4"] = "IDLE4";
    POWERUP_TYPES["IDLE5"] = "IDLE5";
    POWERUP_TYPES["IDLE6"] = "IDLE6";
    POWERUP_TYPES["IDLE7"] = "IDLE7";
    POWERUP_TYPES["IDLE8"] = "IDLE8";
    POWERUP_TYPES["IDLE9"] = "IDLE9";
})(POWERUP_TYPES || (POWERUP_TYPES = {}));
export const POWERUP_DATA_RANGES = new Map([
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
]);
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
export var DRAWING_IMG_KEYS;
(function (DRAWING_IMG_KEYS) {
    DRAWING_IMG_KEYS["SELF_MAN"] = "SELF_MAN";
    DRAWING_IMG_KEYS["SELF_HAND"] = "SELF_HAND";
    DRAWING_IMG_KEYS["OTHER_MAN"] = "OTHER_MAN";
    DRAWING_IMG_KEYS["OTHER_HAND"] = "OTHER_HAND";
    DRAWING_IMG_KEYS["BULLET"] = "BULLET";
    DRAWING_IMG_KEYS["TILE"] = "TILE";
})(DRAWING_IMG_KEYS || (DRAWING_IMG_KEYS = {}));
export const DRAWING_IMG_KEY_TO_ASSET = new Map([
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
]);
export const DRAWING_TILE_SIZE = 100;
export const VIEWPORT_STICKINESS = 0.004;
(() => {
    const m = new Set(Object.keys(DRAWING_IMG_KEYS));
    for (const v in POWERUP_TYPES) {
        if (m.has(v)) {
            throw new Error('Keys in POWERUP_TYPES cannot intersect with DRAWING_IMG_KEYS');
        }
    }
})();
