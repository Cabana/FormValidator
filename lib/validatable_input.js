this.InputWithValidations = (function() {
  function InputWithValidations(input) {
    var parser;
    parser = new Parser;
    this.parser = parser;
    this.input = input;
    this.customMessage = this.input.getAttribute('data-custom-error-message');
    if (this.isInGroup()) {
      this.group = new Group(this.groupName());
    }
  }

  InputWithValidations.prototype.setupErrorMessage = function(fullMessages) {
    return this.input.setAttribute('data-error-message', this.customMessage || fullMessages);
  };

  InputWithValidations.prototype.resetErrorMessages = function() {
    return this.input.removeAttribute('data-error-message');
  };

  InputWithValidations.prototype.validations = function() {
    if (this.input.getAttribute('data-validation')) {
      return this.parser.parse(this.input.getAttribute('data-validation'));
    } else {
      return {};
    }
  };

  InputWithValidations.prototype.asHtmlNode = function() {
    return this.input;
  };

  InputWithValidations.prototype.isInGroup = function() {
    return this.validations().group;
  };

  InputWithValidations.prototype.withoutGroup = function() {
    var clone, validationAttribute, validationAttributeWithoutGroups;
    clone = this.input.cloneNode(false);
    validationAttribute = clone.getAttribute("data-validation");
    validationAttributeWithoutGroups = validationAttribute.replace(' ', '').split(",").filter(function(e) {
      return !/group:/.test(e);
    }).join(",");
    clone.setAttribute("data-validation", validationAttributeWithoutGroups);
    return new InputWithValidations(clone);
  };

  InputWithValidations.prototype.groupName = function() {
    return this.validations().group;
  };

  InputWithValidations.prototype.isEmpty = function() {
    if (this.input.nodeName.toLowerCase() === "select") {
      if (this.input.querySelector("option").text === this.input.value || this.input.value === '') {
        return true;
      } else {
        return false;
      }
    } else if (!/^.+$/.test(this.input.value)) {
      return true;
    } else {
      return false;
    }
  };

  return InputWithValidations;

})();
