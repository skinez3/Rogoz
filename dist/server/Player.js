import * as Constants from '../lib/Constants.js';
import Bullet from './Bullet.js';
import Entity from '../lib/Entity.js';
import Util from '../lib/Util.js';
import Vector from '../lib/Vector.js';
class Player extends Entity {
    constructor(name, socketID) {
        super(Vector.zero(), Vector.zero(), Vector.zero(), Constants.PLAYER_DEFAULT_HITBOX_SIZE);
        this.name = name;
        this.socketID = socketID;
        this.lastUpdateTime = 0;
        this.manAngle = 0;
        this.handAngle = 0;
        this.turnRate = 0;
        this.speed = Constants.PLAYER_DEFAULT_SPEED;
        this.shotCooldown = Constants.PLAYER_SHOT_COOLDOWN;
        this.lastShotTime = 0;
        this.health = Constants.PLAYER_MAX_HEALTH;
        this.powerups = new Map();
        this.kills = 0;
        this.deaths = 0;
    }
    static create(name, socketID) {
        const player = new Player(name, socketID);
        player.spawn();
        return player;
    }
    updateOnInput(data) {
        let dx = 0;
        let dy = 0;
        if (data.up)
            dy -= 1;
        if (data.down)
            dy += 1;
        if (data.left)
            dx -= 1;
        if (data.right)
            dx += 1;
        if (dx !== 0 || dy !== 0) {
            this.manAngle = Math.atan2(dy, dx);
            this.velocity = Vector.fromPolar(this.speed, this.manAngle);
        }
        else {
            this.velocity = Vector.zero();
        }
        this.handAngle = data.handAngle;
    }
    update(lastUpdateTime, deltaTime) {
        this.lastUpdateTime = lastUpdateTime;
        this.position.add(Vector.scale(this.velocity, deltaTime));
        this.boundToWorld();
        this.manAngle = Util.normalizeAngle(this.manAngle + (this.turnRate * deltaTime));
        this.updatePowerups();
    }
    updatePowerups() {
        for (const [type, powerup] of this.powerups) {
            const expired = this.lastUpdateTime > powerup.expirationTime;
            switch (type) {
                case Constants.POWERUP_TYPES.HEALTH_PACK:
                    this.health = Math.min(this.health + powerup.data, Constants.PLAYER_MAX_HEALTH);
                    this.powerups.delete(type);
                    break;
                case Constants.POWERUP_TYPES.SHOTGUN:
                    if (expired) {
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.RAPIDFIRE:
                    if (!expired) {
                        this.shotCooldown = Constants.PLAYER_SHOT_COOLDOWN / powerup.data;
                    }
                    else {
                        this.shotCooldown = Constants.PLAYER_SHOT_COOLDOWN;
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.SPEEDBOOST:
                    if (!expired) {
                        this.speed = Constants.PLAYER_DEFAULT_SPEED * powerup.data;
                    }
                    else {
                        this.speed = Constants.PLAYER_DEFAULT_SPEED;
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.IDLE1:
                    if (expired || powerup.data <= 0) {
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.IDLE2:
                    if (expired || powerup.data <= 0) {
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.IDLE3:
                    if (expired || powerup.data <= 0) {
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.IDLE4:
                    if (expired || powerup.data <= 0) {
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.IDLE5:
                    if (expired || powerup.data <= 0) {
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.IDLE6:
                    if (expired || powerup.data <= 0) {
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.IDLE7:
                    if (expired || powerup.data <= 0) {
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.IDLE8:
                    if (expired || powerup.data <= 0) {
                        this.powerups.delete(type);
                    }
                    break;
                case Constants.POWERUP_TYPES.IDLE9:
                    if (expired || powerup.data <= 0) {
                        this.powerups.delete(type);
                    }
                    break;
            }
        }
    }
    applyPowerup(powerup) {
        powerup.expirationTime = this.lastUpdateTime + powerup.duration;
        this.powerups.set(powerup.type, powerup);
    }
    canShoot() {
        return this.lastUpdateTime > this.lastShotTime + this.shotCooldown;
    }
    getProjectilesFromShot() {
        const bullets = [Bullet.createFromPlayer(this, 0)];
        const shotgunPowerup = this.powerups.get(Constants.POWERUP_TYPES.SHOTGUN);
        if (shotgunPowerup) {
            for (let i = 1; i <= shotgunPowerup.data; ++i) {
                const angleDeviation = (i * Math.PI) / 9;
                bullets.push(Bullet.createFromPlayer(this, -angleDeviation));
                bullets.push(Bullet.createFromPlayer(this, angleDeviation));
            }
        }
        this.lastShotTime = this.lastUpdateTime;
        return bullets;
    }
    isDead() {
        return this.health <= 0;
    }
    damage(amount) {
        this.health -= amount;
    }
    spawn() {
        this.position = new Vector(Util.randRange(Constants.WORLD_MIN + Constants.WORLD_PADDING, Constants.WORLD_MAX - Constants.WORLD_PADDING), Util.randRange(Constants.WORLD_MIN + Constants.WORLD_PADDING, Constants.WORLD_MAX - Constants.WORLD_PADDING));
        this.manAngle = Util.randRange(0, 2 * Math.PI);
        this.health = Constants.PLAYER_MAX_HEALTH;
    }
}
export default Player;
