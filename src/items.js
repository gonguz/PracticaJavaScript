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
  this.initiative = variations.initiative;
  this.defense = variations.defense;
  this.hp = variations.hp;
  this.maxHp = variations.maxHp;
  this.mp = variations.mp;
  this.maxMp = variations.maxMp;
}

module.exports = {
  Item: Item,
  Weapon: Weapon,
  Scroll: Scroll,
  Effect: Effect
};
