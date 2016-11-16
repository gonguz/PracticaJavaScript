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
  var firstTurn = this.turnNumber;
  var characterDead = false;
  this.turnNumber++;

  while(!characterDead){
    firstTurn = firstTurn % this.list.length;
    if(!this._charactersById[this.list[firstTurn]].isDead()) {
      this.activeCharacterId = this.list[firstTurn];
      characterDead = true;
    }
    firstTurn++;
  }

  var nextTurn = {
    number: this.turnNumber,
    party: this._charactersById[this.activeCharacterId].party,
    activeCharacterId: this.activeCharacterId
  };

  return nextTurn;


};

TurnList.prototype._sortByInitiative = function () {
  var list = [];
  var auxList = [];

  for(var characterName in this._charactersById){
    auxList.push({
      name: characterName,
      initiative: this._charactersById[characterName].initiative
    });
  }

  auxList.sort(function (a, b) {
    if(a.initiative < b.initiative){
      return 1;
    }else if(a.initiative > b.initiative){
      return -1;
    }else{
      return 0;
    }
  });

  list = auxList.map(function(character){
    return character.name;
  });
  return list;
};
module.exports = TurnList;
