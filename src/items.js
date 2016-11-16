'use strict';

function Item(name, effect) {
  this.name = name;
  this.effect = effect;
}

function Weapon(name, damage, extraEffect) {
  Item.call(this,name,extraEffect);
  this.effect = extraEffect || new Effect({});
  this.damage = damage;
  this.effect.hp = -damage;
}
Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

function Scroll(name, cost, effect) {
  Item.call(this, name, effect);
  this.cost = cost;
}
Scroll.prototype = Object.create(Item.prototype);
Scroll.prototype.constructor = Scroll;

Scroll.prototype.canBeUsed = function (mp) {
  if(mp >= this.cost){
    return true;
  }else {
    return false;
  }
};

function Effect(variations) {
  variations = variations || {};

  this.initiative = variations.initiative || 0;
  this.defense = variations.defense || 0;
  this.hp = variations.hp || 0;
  this.maxHp = variations.maxHp || 0;
  this.mp = variations.mp || 0;
  this.maxMp = variations.maxMp || 0;
}

module.exports = {
  Item: Item,
  Weapon: Weapon,
  Scroll: Scroll,
  Effect: Effect
};
