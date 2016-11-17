'use strict';
var dice = require('./dice');

function Character(name, features) {
  features = features || {};
  this.name = name;
  // Extrae del parámetro features cada característica y alamacénala en
  // una propiedad.
  this._mp = features.mp || 0;
  this._hp = features.hp || 0;
  this._defense = features.defense || 0;

  this.party = features.party || null;
  this.initiative = features.initiative || 0;
  this.defense = features.defense || 0;
  this.weapon = features.weapon || null;
  this.maxMp = features.maxMp || features.mp || 0;
  this.maxHp = features.maxHp || features.hp || 15;
  this.mp = features.mp || 0;
  this.hp = features.hp || 0;
}

Character.prototype._immuneToEffect = ['name', 'weapon'];

Character.prototype.isDead = function () {
  if (this.hp === 0){
     return true;
   }else{
     return false;
   }
};

Character.prototype.assignFeatures = function (effect) {
  var feature;
  for(feature in effect){
    this[feature] += effect[feature];
  }
}

Character.prototype.applyEffect = function (effect, isAlly) {
  var rollDefense = dice.d100();
  if (!isAlly){
    if (this.defense >= rollDefense){
      return false
    }
  }
  this.assignFeatures(effect);
  return true;
};

Object.defineProperty(Character.prototype, 'mp', {
  get: function () {
    return this._mp;
  },
  set: function (newValue) {
    this._mp = Math.max(0, Math.min(newValue, this.maxMp));
  }
});

Object.defineProperty(Character.prototype, 'hp', {
  get: function () {
    return this._hp;
  },
  set: function (newValue) {
    this._hp = Math.max(0, Math.min(newValue, this.maxHp));
  }
});


Object.defineProperty(Character.prototype, 'defense', {
  get: function () {
    return this._defense;
  },
  set: function (newValue) {
    if(newValue < 0){
      this._defense = 0;
    }else if (newValue > 100) {
      this._defense = 100;
    }else {
      this._defense = newValue;
    }
  }
})

module.exports = Character;
