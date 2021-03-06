var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.CharacterCountValidation = (function(_super) {
  __extends(CharacterCountValidation, _super);

  function CharacterCountValidation() {
    return CharacterCountValidation.__super__.constructor.apply(this, arguments);
  }

  CharacterCountValidation.prototype.mixedMessage = function() {
    return "Value most be at least " + this.min + " and maximum " + this.max + " characters long";
  };

  CharacterCountValidation.prototype.tooShortMessage = function() {
    return "Value most be at least " + this.min;
  };

  CharacterCountValidation.prototype.tooLongMessage = function() {
    return "Value can't be longer than " + this.max;
  };

  return CharacterCountValidation;

})(RangeValidation);
