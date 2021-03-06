describe('Validator', function() {
  var validator;
  validator = '';
  beforeEach(function() {
    return validator = new FormValidator;
  });
  return describe('setting error messages', function() {
    it('sets the error message on an input with email validation', function() {
      var node;
      node = sandbox('<input data-validation="format:[email]" value="aksjdf" type="email">');
      validator.validateInput(node);
      return expect(node.getAttribute('data-error-message')).toBe('Email is invalid');
    });
    it('sets the error message on an input with a tel validation', function() {
      var node;
      node = sandbox('<input data-validation="format:[tel]" value="aksjdf" type="email">');
      validator.validateInput(node);
      return expect(node.getAttribute('data-error-message')).toBe('Telephone number is invalid');
    });
    it('changes the error message if it has to', function() {
      var node;
      node = sandbox('<input data-validation="format:[email], required:true" value="" type="email">');
      validator.validateInput(node);
      node.setAttribute('value', 'invalid email');
      validator.validateInput(node);
      return expect(node.getAttribute('data-error-message')).toBe('Email is invalid');
    });
    it('removes the error messages if the input becomes valid', function() {
      var node;
      node = sandbox('<input data-validation="format:[email]" value="foobar" type="email">');
      validator.validateInput(node);
      node.setAttribute('value', 'david.pdrsn@gmail.com');
      validator.validateInput(node);
      return expect(node.getAttribute('data-error-message')).toBe(null);
    });
    it('sets multiple error messages with the correct format', function() {
      var node;
      node = sandbox('<input data-validation="format:[tel], required" value="" type="email">');
      validator.validateInput(node);
      return expect(node.getAttribute('data-error-message')).toBe("Can't be blank and telephone number is invalid");
    });
    it('adds the correct error messages', function() {
      var node;
      node = sandbox('<input data-validation="format:[tel], required" value="foobar" type="email">');
      validator.validateInput(node);
      return expect(node.getAttribute('data-error-message')).toBe('Telephone number is invalid');
    });
    describe('with range validations', function() {
      describe('both min and max', function() {
        return it('sets the error message correctly', function() {
          var node;
          node = sandbox('<input data-validation="length:[min:3, max:10]" value="r" type="email">');
          validator.validateInput(node);
          return expect(node.getAttribute('data-error-message')).toBe('Value most be at least 3 and maximum 10 characters long');
        });
      });
      describe('only min', function() {
        return it('sets the error message correctly', function() {
          var node;
          node = sandbox('<input data-validation="length:[min:3]" value="r" type="email">');
          validator.validateInput(node);
          return expect(node.getAttribute('data-error-message')).toBe('Value most be at least 3');
        });
      });
      return describe('only max', function() {
        return it('sets the error message correctly', function() {
          var node;
          node = sandbox('<input data-validation="length:[max:3]" value="kajsdhfkaj" type="email">');
          validator.validateInput(node);
          return expect(node.getAttribute('data-error-message')).toBe("Value can't be longer than 3");
        });
      });
    });
    describe('with word count validation', function() {
      describe('both min and max', function() {
        return it('sets the error message correctly', function() {
          var node;
          node = sandbox('<input data-validation="wordCount:[min:2, max:5]" value="f" type="email">');
          validator.validateInput(node);
          return expect(node.getAttribute('data-error-message')).toBe("Can't contain less than 2 or more than 5 words");
        });
      });
      describe('only min', function() {
        return it('sets the error message correctly', function() {
          var node;
          node = sandbox('<input data-validation="wordCount:[min:2]" value="f" type="email">');
          validator.validateInput(node);
          return expect(node.getAttribute('data-error-message')).toBe("Can't contain less than 2 words");
        });
      });
      return describe('only max', function() {
        return it('sets the error message correctly', function() {
          var node;
          node = sandbox('<input data-validation="wordCount:[max:2]" value="foo bar foo" type="email">');
          validator.validateInput(node);
          return expect(node.getAttribute('data-error-message')).toBe("Can't contain more than 2 words");
        });
      });
    });
    describe('with required validation', function() {
      return it('sets the error message correctly', function() {
        var node;
        node = sandbox('<input data-validation="required:true" value="" type="email">');
        validator.validateInput(node);
        return expect(node.getAttribute('data-error-message')).toBe("Can't be blank");
      });
    });
    describe('with allow empty validation', function() {
      return it('does not set an error message when allow empty is true and field is empty', function() {
        var node;
        node = sandbox('<input data-validation="format:[email], allowEmpty" value="" type="email">');
        validator.validateInput(node);
        return expect(node.getAttribute('data-error-message')).toBe(null);
      });
    });
    describe('with validation depends on', function() {
      return it('does not set an error message when checkbox is unchecked and field is invalid', function() {
        var html, input, nodes;
        html = "<div id=\"sandbox\">\n  <input type=\"checkbox\" id=\"checkbox\">\n  <input data-validation=\"format:[email], onlyIfChecked:checkbox\" value=\"invalid email\" id=\"input\" type=\"email\">\n</div>";
        nodes = sandbox(html);
        $('body').append(html);
        input = $('#input')[0];
        validator.validateInput(input);
        expect(input.getAttribute('data-error-message')).toBe(null);
        return $('#sandbox').remove();
      });
    });
    describe('with a custom validator', function() {
      describe('a format validation', function() {
        it('can be used to validate a valid field', function() {
          var node;
          node = sandbox('<input data-validation="format:[cpr]" value="090909-6677" type="email">');
          validator.defineValidation('cpr', /\d{6}-\d{4}/, 'Invalid cpr number');
          validator.validateInput(node);
          return expect(node.getAttribute('data-error-message')).toBe(null);
        });
        return it('can be used to validate an invalid field', function() {
          var node;
          node = sandbox('<input data-validation="format:[cpr]" value="invalid value" type="email">');
          validator.defineValidation('cpr', /\d{6}-\d{4}/, 'Invalid cpr number');
          validator.validateInput(node);
          return expect(node.getAttribute('data-error-message')).toBe('Invalid cpr number');
        });
      });
      return describe('a function based validation', function() {
        it('can be used to validate a valid field', function() {
          var node;
          node = sandbox('<input data-validation="newRequired" value="valid value" type="email">');
          validator.defineValidation('newRequired', function(input, data) {
            if (!/^.+$/.test(input.value)) {
              return "Can't be blank";
            }
          });
          validator.validateInput(node);
          return expect(node.getAttribute('data-error-message')).toBe(null);
        });
        it('can be used to validate an invalid field', function() {
          var node;
          node = sandbox('<input data-validation="newRequired" value="" type="email">');
          validator.defineValidation('newRequired', function(input, data) {
            if (!/^.+$/.test(input.value)) {
              return "Can't be blank";
            }
          });
          validator.validateInput(node);
          return expect(node.getAttribute('data-error-message')).toBe("Can't be blank");
        });
        return describe('a validation with multiple different error messages', function() {
          return it('can be used to validate an invalid field', function() {
            var node;
            node = sandbox('<input data-validation="myValidation, required" value="" type="email">');
            validator.defineValidation('myValidation', function(input, data) {
              return ['foo', 'bar'];
            });
            validator.validateInput(node);
            return expect(node.getAttribute('data-error-message')).toBe("Foo, bar, and can't be blank");
          });
        });
      });
    });
    return describe('with custom error messages', function() {
      return it('overrides the other error message', function() {
        var node;
        node = sandbox('<input data-validation="format:[email]" data-custom-error-message="custom message" value="invalid email" type="email">');
        validator.validateInput(node);
        return expect(node.getAttribute('data-error-message')).toBe('custom message');
      });
    });
  });
});
