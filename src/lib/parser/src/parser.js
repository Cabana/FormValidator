// Generated by CoffeeScript 1.6.2
(function() {
  Array.prototype.clean = function(deleteValue) {
    var i;

    i = 0;
    while (i < this.length) {
      if (this[i] === deleteValue) {
        this.splice(i, 1);
        i--;
      }
      i++;
    }
    return this;
  };

  String.prototype.wrapInBraces = function() {
    return this.replace(/^/, '{').replace(/$/, '}');
  };

  String.prototype.replaceSquareBracketsWithBraces = function() {
    return this.replace(/\[/g, '{').replace(/\]/g, '}');
  };

  String.prototype.removeWhitespace = function() {
    return this.replace(/\s+/g, '');
  };

  this.Parser = (function() {
    function Parser(defaults) {
      this.defaults = defaults;
    }

    Parser.prototype.parse = function(string) {
      var result;

      result = {};
      if (string === '') {
        return result;
      }
      string = this._prepareString(string);
      return this._toJSON(string);
    };

    Parser.prototype.addDefaultValue = function(value, key) {
      this.defaults || (this.defaults = {});
      return this.defaults[value] = key;
    };

    Parser.prototype._prepareString = function(string) {
      string = string.removeWhitespace();
      if (this.defaults) {
        string = this._applyOptionValues(string);
      }
      string = this._setUndefinedValues(string);
      string = this._wrapWordsInQuotes(string);
      return string;
    };

    Parser.prototype._applyOptionValues = function(string) {
      var newString, splitString,
        _this = this;

      newString = '';
      splitString = this._splitIntoWords(string);
      splitString.forEach(function(word, index) {
        var nextWord;

        nextWord = splitString[index + 1];
        if (_this.defaults[word] && nextWord !== ':') {
          word += ":" + _this.defaults[word];
        }
        return newString += word;
      });
      return newString;
    };

    Parser.prototype._setUndefinedValues = function(string) {
      var newString, splitString;

      splitString = this._splitIntoWords(string);
      splitString.forEach(function(word, index) {
        var nextWord, prevWord;

        nextWord = splitString[index + 1];
        prevWord = splitString[index - 1];
        if (/\]+/.test(nextWord) && prevWord !== ':' || nextWord === ',' || nextWord === void 0 && !/\]+/.test(word)) {
          return splitString[index] += ":undefined";
        }
      });
      string = splitString.join('');
      newString = '';
      string.split(/(\[|,|\])/).forEach(function(string) {
        if (/.*:.*:.*/.test(string)) {
          string = string.replace(':undefined', '');
        }
        return newString += string;
      });
      return newString;
    };

    Parser.prototype._splitIntoWords = function(string) {
      string.split(/(\w+)/).clean('');
      return string.split(/(:\[?|\]+,?|,)/).clean('');
    };

    Parser.prototype._wrapWordsInQuotes = function(string) {
      var splitString;

      splitString = this._splitIntoWords(string);
      splitString.forEach(function(word, index) {
        if (!(word === ':' || /\]+/.test(word) || word === ':[' || word === ',')) {
          if (/^\d+$/.test(word)) {
            return splitString[index] = parseInt(word);
          } else if (word === 'true') {
            return splitString[index] = true;
          } else if (word === 'false') {
            return splitString[index] = false;
          } else {
            return splitString[index] = "\"" + word + "\"";
          }
        }
      });
      return splitString.join('');
    };

    Parser.prototype._toJSON = function(string) {
      if (!/\.*:\.*/.test(string)) {
        string += ":\"undefined\"";
      }
      string = string.replaceSquareBracketsWithBraces().wrapInBraces();
      string = string.replace(/\\/g, "\\\\");
      return JSON.parse(string);
    };

    return Parser;

  })();

}).call(this);