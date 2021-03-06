describe('Validator', function() {
  var validator;
  validator = '';
  beforeEach(function() {
    return validator = new FormValidator;
  });
  afterEach(function() {
    return $('#sandbox').html('');
  });
  return describe('#validateInput', function() {
    describe('format validation', function() {
      describe('email', function() {
        it('returns true if the input contains a valid email', function() {
          var node;
          node = sandbox('<input data-validation="format:[email]" value="david.pdrsn@gmail.com" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if the input contains an invalid email', function() {
          var node;
          node = sandbox('<input data-validation="format:[email]" value="invalid email" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      describe('telephone', function() {
        it('returns true if the input contains a valid telephone number', function() {
          var node;
          node = sandbox('<input data-validation="format:[tel]" value="12345678" type="tel">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if the input contains an invalid telephone number', function() {
          var node;
          node = sandbox('<input data-validation="format:[tel]" value="123" type="tel">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      return describe('a custom format', function() {
        return it('returns true if the format matches', function() {
          var node;
          validator.defineValidation('cpr', /\d{6}-\d{4}/);
          node = sandbox('<input data-validation="format:[cpr]" value="060890-1234" type="text">');
          return expect(validator.validateInput(node)).toBe(true);
        });
      });
    });
    describe('required validation', function() {
      it('returns true if the input has a value', function() {
        var node;
        node = sandbox('<input data-validation="required" value="some value" type="email">');
        return expect(validator.validateInput(node)).toBe(true);
      });
      it('returns false if the input does not have a value', function() {
        var node;
        node = sandbox('<input data-validation="required" value="" type="email">');
        return expect(validator.validateInput(node)).toBe(false);
      });
      describe('with a select box', function() {
        it('returns true is it has a value', function() {
          var html, node;
          html = "<select data-validation=\"required\">\n  <option value=\"\">Please select something</option>\n  <option value=\"foo\" selected>Foo</option>\n</select>";
          node = sandbox(html);
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false is it does not a value', function() {
          var html, node;
          html = "<select data-validation=\"required\">\n  <option value=\"\" selected>Please select something</option>\n  <option value=\"foo\">Foo</option>\n</select>";
          node = sandbox(html);
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      describe('with a select box where the first field is not empty but still invalid', function() {
        it('returns true is it has a value', function() {
          var html, node;
          html = "<select data-validation=\"required\" name=\"foo\">\n  <option value=\"Pick something\">Pick something</option>\n  <option value=\"foo\" selected>Foo</option>\n</select>";
          node = sandbox(html);
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false is it does not a value', function() {
          var html, node;
          html = "<select data-validation=\"required\" name=\"foo\">\n  <option value=\"Pick something\">Pick something</option>\n  <option value=\"foo\">Foo</option>\n</select>";
          node = sandbox(html);
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      describe('with a checkbox', function() {
        it('returns true is it is checked', function() {
          var node;
          node = sandbox('<input data-validation="required" type="checkbox" checked>');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if it is not checked', function() {
          var node;
          node = sandbox('<input data-validation="required" type="checkbox">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      return describe('with a radiobutton', function() {
        it('returns true is it is checked', function() {
          var node;
          node = sandbox('<input data-validation="required" type="radio" checked>');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if it is not checked', function() {
          var node;
          node = sandbox('<input data-validation="required" type="radio">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
    });
    describe('length validation', function() {
      describe('with only a min attribute', function() {
        it('returns true if the input value is within range', function() {
          var node;
          node = sandbox('<input data-validation="length:[min:3]" value="fkasdjfasjfkg" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        it('returns false if the input value is out of range', function() {
          var node;
          node = sandbox('<input data-validation="length:[min:3]" value="f" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
        return it('returns true if the input value is exactly the min length', function() {
          var node;
          node = sandbox('<input data-validation="length:[min:3]" value="fff" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
      });
      describe('with only a max attribute', function() {
        it('returns true if the input value is within range', function() {
          var node;
          node = sandbox('<input data-validation="length:[max:3]" value="f" type="email">');
          expect(validator.validateInput(node)).toBe(true);
          node = sandbox('<input data-validation="length:[max:3]" value="fff" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if the input value is out of range', function() {
          var node;
          node = sandbox('<input data-validation="length:[max:3]" value="aiudshfiuahsdlifuah" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      describe('with both a min and max range', function() {
        it('returns true if the input value is within range', function() {
          var node;
          node = sandbox('<input data-validation="length:[min:2, max:10]" value="valid" type="email">');
          expect(validator.validateInput(node)).toBe(true);
          node = sandbox('<input data-validation="length:[min:2, max:10]" value="fo" type="email">');
          expect(validator.validateInput(node)).toBe(true);
          node = sandbox('<input data-validation="length:[min:2, max:10]" value="qwertyuiop" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if the input value is out of range', function() {
          var node;
          node = sandbox('<input data-validation="length:[min:2, max:10]" value="ahdsfoiuagosyudgfoausyhdf" type="email">');
          expect(validator.validateInput(node)).toBe(false);
          node = sandbox('<input data-validation="length:[min:2, max:10]" value="f" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      return describe('with an exact length', function() {
        it('returns true if the input value is exactly the specified length', function() {
          var node;
          node = sandbox('<input data-validation="length:[min:3, max:3]" value="fff" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if the input value is out of the range', function() {
          var node;
          node = sandbox('<input data-validation="length:[min:3, max:3]" value="f" type="email">');
          expect(validator.validateInput(node)).toBe(false);
          node = sandbox('<input data-validation="length:[min:3, max:3]" value="fffffff" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
    });
    describe('allow empty', function() {
      it('returns true if the input is invalid even though it has a format validation', function() {
        var node;
        node = sandbox('<input data-validation="format:[email], allowEmpty" value="" type="email">');
        return expect(validator.validateInput(node)).toBe(true);
      });
      return it('returns false if the input contains an invalid value', function() {
        var node;
        node = sandbox('<input data-validation="format:[email], allowEmpty" value="invalid emai" type="email">');
        return expect(validator.validateInput(node)).toBe(false);
      });
    });
    describe('word count', function() {
      describe('with only a min attribute', function() {
        it('returns true if the word count is within range', function() {
          var node;
          node = sandbox('<input data-validation="wordCount:[min:2]" value="foo bar baz" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if the word count is out of range', function() {
          var node;
          node = sandbox('<input data-validation="wordCount:[min:2]" value="foo" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      describe('with only a max attribute', function() {
        it('returns true if the input value is within range', function() {
          var node;
          node = sandbox('<input data-validation="wordCount:[max:2]" value="foo" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if the input value out of range', function() {
          var node;
          node = sandbox('<input data-validation="wordCount:[max:2]" value="foo foo bar baz" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      describe('with both a min and a max attribute', function() {
        it('returns true if the input value is within range', function() {
          var node;
          node = sandbox('<input data-validation="wordCount:[min:2, max:5]" value="foo foo foo foo" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        it('returns false if the input value out of range', function() {
          var node;
          node = sandbox('<input data-validation="wordCount:[min:2, max:5]" value="foo" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
        return describe('when min and max are the same', function() {
          it('returns true if the input value is within range', function() {
            var node;
            node = sandbox('<input data-validation="wordCount:[min:2, max:2]" value="foo bar" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
          return it('returns false if the input value is out of range', function() {
            var node;
            node = sandbox('<input data-validation="wordCount:[min:2, max:2]" value="foo bar foo" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
        });
      });
      return describe('when input value is an empty string', function() {
        describe('min:1 validation', function() {
          return it('does not validate', function() {
            var node;
            node = sandbox('<input data-validation="wordCount:[min:1]" value="" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
        });
        describe('with only a max attribute', function() {
          return it('does validate', function() {
            var node;
            node = sandbox('<input data-validation="wordCount:[max:3]" value="" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
        });
        return describe('with both a min and max value of 1', function() {
          return it('does not validate', function() {
            var node;
            node = sandbox('<input data-validation="wordCount:[min:1, max:1]" value="" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
        });
      });
    });
    describe('validation depends on', function() {
      afterEach(function() {
        return $('#sandbox').remove();
      });
      it('returns true if the checkbox is checked and the input is valid', function() {
        var html, input, nodes;
        html = "<div id=\"sandbox\">\n  <input type=\"checkbox\" id=\"checkbox\" checked>\n  <input data-validation=\"format:[email], onlyIfChecked:checkbox\" value=\"david@gmail.com\" id=\"input\" type=\"email\">\n</div>";
        nodes = sandbox(html);
        $('body').append(html);
        input = $('#input')[0];
        return expect(validator.validateInput(input)).toBe(true);
      });
      it('returns true if the checkbox is not checked and the input is valid', function() {
        var html, input, nodes;
        html = "<div id=\"sandbox\">\n  <input type=\"checkbox\" id=\"checkbox\">\n  <input data-validation=\"format:[email], onlyIfChecked:checkbox\" value=\"david@gmail.com\" id=\"input\" type=\"email\">\n</div>";
        nodes = sandbox(html);
        $('body').append(html);
        input = $('#input')[0];
        return expect(validator.validateInput(input)).toBe(true);
      });
      it('returns true if the checkbox is not checked and the input is invalid', function() {
        var html, input, nodes;
        html = "<div id=\"sandbox\">\n  <input type=\"checkbox\" id=\"checkbox\">\n  <input data-validation=\"format:[email], onlyIfChecked:checkbox\" value=\"invalid email\" id=\"input\" type=\"email\">\n</div>";
        nodes = sandbox(html);
        $('body').append(html);
        input = $('#input')[0];
        return expect(validator.validateInput(input)).toBe(true);
      });
      return it('returns false if the checkbox is checked and the input is invalid', function() {
        var html, input, nodes;
        html = "<div id=\"sandbox\">\n  <input type=\"checkbox\" id=\"checkbox\" checked>\n  <input data-validation=\"format:[email], onlyIfChecked:checkbox\" value=\"invalid email\" id=\"input\" type=\"email\">\n</div>";
        nodes = sandbox(html);
        $('body').append(html);
        input = $('#input')[0];
        return expect(validator.validateInput(input)).toBe(false);
      });
    });
    describe('onlyIfEmpty', function() {
      afterEach(function() {
        return $('#sandbox').remove();
      });
      it('returns true if the other input is not empty no matter what the value of the main input is', function() {
        var html, input, nodes;
        html = "<div id=\"sandbox\">\n  <input id=\"someId\" value=\"foo\" type=\"text\">\n  <input data-validation=\"format:[email], onlyIfEmpty:someId\" value=\"\" id=\"input\" type=\"email\">\n</div>";
        nodes = sandbox(html);
        $('body').append(html);
        input = $('#input')[0];
        return expect(validator.validateInput(input)).toBe(true);
      });
      it('returns true if the other input is empty and the main input is valid', function() {
        var html, input, nodes;
        html = "<div id=\"sandbox\">\n  <input id=\"someId\" value=\"\" type=\"text\">\n  <input data-validation=\"format:[email], onlyIfEmpty:someId\" value=\"valid@email.com\" id=\"input\" type=\"email\">\n</div>";
        nodes = sandbox(html);
        $('body').append(html);
        input = $('#input')[0];
        return expect(validator.validateInput(input)).toBe(true);
      });
      it('returns false if the other input is empty and the main input is invalid', function() {
        var html, input, nodes;
        html = "<div id=\"sandbox\">\n  <input id=\"someId\" value=\"\" type=\"text\">\n  <input data-validation=\"format:[email], onlyIfEmpty:someId\" value=\"invalid email\" id=\"input\" type=\"email\">\n</div>";
        nodes = sandbox(html);
        $('body').append(html);
        input = $('#input')[0];
        return expect(validator.validateInput(input)).toBe(false);
      });
      describe('with a select field', function() {
        it('returns true if the other input is not empty no matter what the value of the main input is', function() {
          var html, input, nodes;
          html = "<div id=\"sandbox\">\n  <select id=\"someId\">\n    <option value=\"\">Pick something</option>\n    <option value=\"foo\" selected>Foo</option>\n  </select>\n  <input data-validation=\"format:[email], onlyIfEmpty:someId\" value=\"\" id=\"input\" type=\"email\">\n</div>";
          nodes = sandbox(html);
          $('body').append(html);
          input = $('#input')[0];
          return expect(validator.validateInput(input)).toBe(true);
        });
        it('returns true if the other input is empty and the main input is valid', function() {
          var html, input, nodes;
          html = "<div id=\"sandbox\">\n  <select id=\"someId\">\n    <option value=\"\" selected>Pick something</option>\n    <option value=\"foo\">Foo</option>\n  </select>\n  <input data-validation=\"format:[email], onlyIfEmpty:someId\" value=\"valid@email.com\" id=\"input\" type=\"email\">\n</div>";
          nodes = sandbox(html);
          $('body').append(html);
          input = $('#input')[0];
          return expect(validator.validateInput(input)).toBe(true);
        });
        return it('returns false if the other input is empty and the main input is invalid', function() {
          var html, input, nodes;
          html = "<div id=\"sandbox\">\n  <select id=\"someId\">\n    <option value=\"\" selected>Pick something</option>\n    <option value=\"foo\">Foo</option>\n  </select>\n  <input data-validation=\"format:[email], onlyIfEmpty:someId\" value=\"invalid email\" id=\"input\" type=\"email\">\n</div>";
          nodes = sandbox(html);
          $('body').append(html);
          input = $('#input')[0];
          return expect(validator.validateInput(input)).toBe(false);
        });
      });
      return describe('with select field where the first option is actually empty even though there is text in it', function() {
        it('returns true if the other input is not empty no matter what the value of the main input is', function() {
          var html, input, nodes;
          html = "<div id=\"sandbox\">\n  <select id=\"someId\">\n    <option value=\"Pick something\">Pick something</option>\n    <option value=\"foo\" selected>Foo</option>\n  </select>\n  <input data-validation=\"format:[email], onlyIfEmpty:someId\" value=\"\" id=\"input\" type=\"email\">\n</div>";
          nodes = sandbox(html);
          $('body').append(html);
          input = $('#input')[0];
          return expect(validator.validateInput(input)).toBe(true);
        });
        it('returns true if the other input is empty and the main input is valid', function() {
          var html, input, nodes;
          html = "<div id=\"sandbox\">\n  <select id=\"someId\">\n    <option value=\"Pick something\">Pick something</option>\n    <option value=\"foo\">Foo</option>\n  </select>\n  <input data-validation=\"format:[email], onlyIfEmpty:someId\" value=\"valid@email.com\" id=\"input\" type=\"email\">\n</div>";
          nodes = sandbox(html);
          $('body').append(html);
          input = $('#input')[0];
          return expect(validator.validateInput(input)).toBe(true);
        });
        return it('returns false if the other input is empty and the main input is invalid', function() {
          var html, input, nodes;
          html = "<div id=\"sandbox\">\n  <select id=\"someId\">\n    <option value=\"Pick something\">Pick something</option>\n    <option value=\"foo\">Foo</option>\n  </select>\n  <input data-validation=\"format:[email], onlyIfEmpty:someId\" value=\"invalid email\" id=\"input\" type=\"email\">\n</div>";
          nodes = sandbox(html);
          $('body').append(html);
          input = $('#input')[0];
          return expect(validator.validateInput(input)).toBe(false);
        });
      });
    });
    describe('number format', function() {
      it('returns true if the string contains only numeric values', function() {
        var node;
        node = sandbox('<input data-validation="format:[number]" value="123" type="email">');
        return expect(validator.validateInput(node)).toBe(true);
      });
      return it('returns false if the string contains non numeric values', function() {
        var node;
        node = sandbox('<input data-validation="format:[number]" value="1f23" type="email">');
        return expect(validator.validateInput(node)).toBe(false);
      });
    });
    describe('group', function() {
      it('returns true if one of the inputs are valid', function() {
        var formHtml, formNode, invalid, noGroup, valid;
        formHtml = "<form action=\"javascript:void()\">\n  <input id=\"valid\" data-validation=\"required, group:name\" value=\"foo\">\n  <input id=\"invalid\" data-validation=\"required, group:name\">\n  <input id=\"no-group\" data-validation=\"required\">\n  <input type=\"submit\">\n</form>";
        formNode = sandbox(formHtml);
        $('body').append(formNode);
        valid = document.querySelector("#valid");
        invalid = document.querySelector("#invalid");
        noGroup = document.querySelector("#no-group");
        expect(validator.validateInput(valid)).toBe(true);
        expect(validator.validateInput(invalid)).toBe(true);
        return expect(validator.validateInput(noGroup)).toBe(false);
      });
      return it('returns false if all the inputs are invalid', function() {
        var formHtml, formNode, input;
        formHtml = "<form action=\"javascript:void()\">\n  <input id=\"field\" data-validation=\"required, group:name\">\n  <input data-validation=\"required, group:name\">\n  <input type=\"submit\">\n</form>";
        formNode = sandbox(formHtml);
        $('body').append(formNode);
        input = document.querySelector("#field");
        return expect(validator.validateInput(input)).toBe(false);
      });
    });
    return describe('with a custom validator', function() {
      describe('a format validation', function() {
        it('can be used to validate a valid field', function() {
          var node;
          node = sandbox('<input data-validation="format:[cpr]" value="090909-6677" type="email">');
          validator.defineValidation('cpr', /\d{6}-\d{4}/, 'Invalid CPR number');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('can be used to validate an invalid field', function() {
          var node;
          node = sandbox('<input data-validation="format:[cpr]" value="invalid" type="email">');
          validator.defineValidation('cpr', /\d{6}-\d{4}/, 'Invalid CPR number');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      return describe('a function based validation', function() {
        it('can be used to validate a valid field', function() {
          var node;
          node = sandbox('<input data-validation="newRequired" value="valid value" type="email">');
          validator.defineValidation('newRequired', function(input, data) {
            if (!/^.+$/.test(input.value)) {
              return errors.add("Can't be blank");
            }
          });
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('can be used to validate an invalid field', function() {
          var node;
          node = sandbox('<input data-validation="newRequired" value="" type="email">');
          validator.defineValidation('newRequired', function(input, data) {
            if (!/^.+$/.test(input.value)) {
              return errors.add("Can't be blank");
            }
          });
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
    });
  });
});
