describe('Validator', function() {
  var validator;
  validator = '';
  beforeEach(function() {
    return validator = new FormValidator;
  });
  return describe('#validateForm', function() {
    it('returns true if all the inputs with validation within the form are valid', function() {
      var formHTML, formNode;
      formHTML = "<form action=\"javascript:void()\">\n  <input data-validation=\"format:[email]\" type=\"email\" value=\"david.pdrsn@gmail.com\">\n  <input type=\"email\" value=\"david.pdrsn@gmail.com\">\n  <input type=\"submit\">\n</form>";
      formNode = sandbox(formHTML);
      return expect(validator.validateForm(formNode)).toBe(true);
    });
    return it('returns false if the form contains invalid inputs', function() {
      var formHTML, formNode;
      formHTML = "<form action=\"javascript:void()\">\n  <input data-validation=\"format:[email]\" type=\"email\" value=\"invalid email\">\n  <input type=\"email\" value=\"david.pdrsn@gmail.com\">\n  <input type=\"submit\">\n</form>";
      formNode = sandbox(formHTML);
      return expect(validator.validateForm(formNode)).toBe(false);
    });
  });
});
