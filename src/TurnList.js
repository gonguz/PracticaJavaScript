'use strict';

function TurnList() {}

TurnList.prototype.reset = function (charactersById) {
  this._charactersById = charactersById;

  this._turnIndex = -1;
  this.turnNumber = 0;
  this.activeCharacterId = null;
  this.list = this._sortByInitiative();
};

TurnList.prototype.next = function () {
  // Haz que calcule el siguiente turno y devuelva el resultado
  // según la especificación. Recuerda que debe saltar los personajes
  // muertos.
  this.turnNumber++;
  var aux = 0;
  var flag = false;
  var length = this.list.length;

  while(!flag){
    aux = aux % length;
    var characterDead = this._charactersById[this.list[aux]]._isDead;

    if(!characterDead){
      this.activeCharacterId = this.list[aux];
      flag = true;
    }
    ++aux;
  }

  var turn = {
    number: this.turnNumber,
    party: this._charactersById[this.activeCharacterId].party,
    activeCharacterId: this.activeCharacterId
  }
  return turn;
};

TurnList.prototype._sortByInitiative = function () {
var list = [];
var auxList = [];

  for(var object in this._charactersById){
    auxList.push({name: object, inititative: this._charactersById[object].inititative})
  }

  auxList.sort(function (a, b) {
    if(a.initiative < b.initiative){
      return  1;
    }
    if(a.inititative > b.inititative){
      return -1;
    }
    return 0;
  });

  for(var name in auxList){
    list.push(auxList[name].name);
  }
  return list.reverse();
};
module.exports = TurnList;
