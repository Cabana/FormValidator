var split;
split=split||function(a){var e=String.prototype.split,c=/()??/.exec("")[1]===a,d;d=function(b,d,f){if("[object RegExp]"!==Object.prototype.toString.call(d))return e.call(b,d,f);var h=[],k=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.extended?"x":"")+(d.sticky?"y":""),l=0;d=RegExp(d.source,k+"g");var n,m,p;b+="";c||(n=RegExp("^"+d.source+"$(?!\\s)",k));for(f=f===a?4294967295:f>>>0;m=d.exec(b);){k=m.index+m[0].length;if(k>l&&(h.push(b.slice(l,m.index)),!c&&1<m.length&&m[0].replace(n,function(){for(var d=1;d<
arguments.length-2;d++)arguments[d]===a&&(m[d]=a)}),1<m.length&&m.index<b.length&&Array.prototype.push.apply(h,m.slice(1)),p=m[0].length,l=k,h.length>=f))break;d.lastIndex===m.index&&d.lastIndex++}l===b.length?(p||!d.test(""))&&h.push(""):h.push(b.slice(l));return h.length>f?h.slice(0,f):h};String.prototype.split=function(b,e){return d(this,b,e)};return d}();
(function(){Array.prototype.clean=function(a){var e;for(e=0;e<this.length;)this[e]===a&&(this.splice(e,1),e--),e++;return this};String.prototype.wrapInBraces=function(){return this.replace(/^/,"{").replace(/$/,"}")};String.prototype.replaceSquareBracketsWithBraces=function(){return this.replace(/\[/g,"{").replace(/\]/g,"}")};String.prototype.removeWhitespace=function(){return this.replace(/\s+/g,"")};this.Parser=function(){function a(e){this.defaults=e}a.prototype.parse=function(e){var a;a={};if(""===
e)return a;e=this._prepareString(e);return this._toJSON(e)};a.prototype.addDefaultValue=function(e,a){this.defaults||(this.defaults={});return this.defaults[e]=a};a.prototype._prepareString=function(e){e=e.removeWhitespace();this.defaults&&(e=this._applyOptionValues(e));e=this._setUndefinedValues(e);return this._wrapWordsInQuotes(e)};a.prototype._applyOptionValues=function(e){var a,d,b,g,f;d="";e=this._splitIntoWords(e);a=g=0;for(f=e.length;g<f;a=++g)b=e[a],a=e[a+1],this.defaults[b]&&":"!==a&&(b+=
":"+this.defaults[b]),d+=b;return d};a.prototype._setUndefinedValues=function(a){var c,d,b,g,f,h;b=this._splitIntoWords(a);c=f=0;for(h=b.length;f<h;c=++f)if(g=b[c],a=b[c+1],d=b[c-1],/\]+/.test(a)&&":"!==d||","===a||void 0===a&&!/\]+/.test(g))b[c]+=":undefined";a=b.join("");c="";g=a.split(/(\[|,|\])/);d=0;for(b=g.length;d<b;d++)a=g[d],/.*:.*:.*/.test(a)&&(a=a.replace(":undefined","")),c+=a;return c};a.prototype._splitIntoWords=function(a){return split(a,/(:\[?|\]+,?|,)/).clean("")};a.prototype._wrapWordsInQuotes=
function(a){var c,d,b,g;c=this._splitIntoWords(a);a=b=0;for(g=c.length;b<g;a=++b)d=c[a],":"===d||/\]+/.test(d)||(":["===d||","===d)||(/^\d+$/.test(d)?c[a]=parseInt(d):c[a]="true"===d?!0:"false"===d?!1:'"'+d+'"');return c.join("")};a.prototype._toJSON=function(a){/\.*:\.*/.test(a)||(a+=':"undefined"');a=a.replaceSquareBracketsWithBraces().wrapInBraces();a=a.replace(/\\/g,"\\\\");return JSON.parse(a)};return a}()}).call(this);
(function(){Object.keys||(Object.keys=function(a){var e,c;e=[];c=void 0;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&e.push(c);return e});String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};window.toSentence=function(a){switch(a.length){case 0:a="";break;case 1:a=a[0];break;case 2:a=a[0]+" and "+a[1];break;default:a=a.slice(0,-1).join(", ")+", and "+a[a.length-1]}return a}}).call(this);
(function(){this.Errors=function(){function a(){this.errors=[]}a.prototype.add=function(a){var c,d,b,g;if(a){if("string"===typeof a)return this.errors.push(a);g=[];d=0;for(b=a.length;d<b;d++)c=a[d],g.push(this.errors.push(c));return g}};a.prototype.none=function(){return 0===this.errors.length?!0:!1};a.prototype.fullMessages=function(){return toSentence(this.errors).toLowerCase().capitalize()};a.prototype.all=function(){return this.errors};a.prototype.alwaysReturn=function(a){return this.none=function(){return a}};
a.prototype.alwaysNoneIf=function(a){if(a)return this.alwaysReturn([])};a.prototype.alwaysNone=function(){return this.alwaysReturn([])};return a}()}).call(this);
(function(){this.Group=function(){function a(a){this.name=a}a.prototype.fields=function(){return this._findInputs()};a.prototype.invalidFields=function(){return this._findInputs("[data-error-message]")};a.prototype.validFields=function(){return this._findInputs(":not([data-error-message])")};a.prototype.containsValidFields=function(){return this.fields().length!==this.invalidFields().length};a.prototype._findInputs=function(a){null==a&&(a="");return document.querySelectorAll('[data-validation*="group:'+
this.name+'"]'+a)};return a}()}).call(this);
(function(){this.InputWithValidations=function(){function a(a){this.parser=new Parser;this.input=a;this.customMessage=this.input.getAttribute("data-custom-error-message");this.isInGroup()&&(this.group=new Group(this.groupName()))}a.prototype.setupErrorMessage=function(a){return this.input.setAttribute("data-error-message",this.customMessage||a)};a.prototype.resetErrorMessages=function(){return this.input.removeAttribute("data-error-message")};a.prototype.validations=function(){return this.input.getAttribute("data-validation")?
this.parser.parse(this.input.getAttribute("data-validation")):{}};a.prototype.asHtmlNode=function(){return this.input};a.prototype.isInGroup=function(){return this.validations().group?!0:!1};a.prototype.groupName=function(){return this.validations().group};a.prototype.isEmpty=function(){return"select"===this.input.nodeName.toLowerCase()?this.input.querySelector("option").text===this.input.value||""===this.input.value?!0:!1:/^.+$/.test(this.input.value)?!1:!0};return a}()}).call(this);
(function(){var a=[].indexOf||function(a){for(var c=0,d=this.length;c<d;c++)if(c in this&&this[c]===a)return c;return-1};this.RangeValidation=function(){function e(a,d,b){this.length=a;this.min=d;this.max=b}e.prototype.validate=function(){var c,d,b;if(this.max&&this.min&&(c=this.length,0>a.call(function(){b=[];for(var a=d=this.min,c=this.max;d<=c?a<=c:a>=c;d<=c?a++:a--)b.push(a);return b}.apply(this),c)))return this.mixedMessage();if(this.min&&this.length<this.min)return this.tooShortMessage();if(this.max&&
this.length>this.max)return this.tooLongMessage()};return e}()}).call(this);
(function(){var a,e={}.hasOwnProperty,c=function(a,b){function c(){this.constructor=a}for(var f in b)e.call(b,f)&&(a[f]=b[f]);c.prototype=b.prototype;a.prototype=new c;a.__super__=b.prototype;return a};this.CharacterCountValidation=function(d){function b(){return a=b.__super__.constructor.apply(this,arguments)}c(b,d);b.prototype.mixedMessage=function(){return"Value most be at least "+this.min+" and maximum "+this.max+" characters long"};b.prototype.tooShortMessage=function(){return"Value most be at least "+
this.min};b.prototype.tooLongMessage=function(){return"Value can't be longer than "+this.max};return b}(RangeValidation)}).call(this);
(function(){var a,e={}.hasOwnProperty,c=function(a,b){function c(){this.constructor=a}for(var f in b)e.call(b,f)&&(a[f]=b[f]);c.prototype=b.prototype;a.prototype=new c;a.__super__=b.prototype;return a};this.WordCountValidation=function(d){function b(){return a=b.__super__.constructor.apply(this,arguments)}c(b,d);b.prototype.mixedMessage=function(){return"Can't contain less than "+this.min+" or more than "+this.max+" words"};b.prototype.tooShortMessage=function(){return"Can't contain less than "+this.min+
" words"};b.prototype.tooLongMessage=function(){return"Can't contain more than "+this.max+" words"};return b}(RangeValidation)}).call(this);
(function(){var a,e=[].indexOf||function(a){for(var d=0,b=this.length;d<b;d++)if(d in this&&this[d]===a)return d;return-1};a={};this.FormValidator=function(){function c(){this._setupBuiltInValidations()}c.prototype.defineValidation=function(a,b,c){return this._validations[a]={validationHandler:b,errorMessage:c}};c.prototype.validateForm=function(a){var b,c,f,h,k;b=a.querySelectorAll("[data-validation]");f=[];c=0;for(h=b.length;c<h;c++)a=b[c],this.validateInput(a);h=0;for(k=b.length;h<k;h++)a=b[h],
c=new InputWithValidations(a),c.isInGroup()&&c.group.containsValidFields()&&c.input.removeAttribute("data-error-message"),a.hasAttribute("data-error-message")?f.push(!1):f.push(!0);return 0<=e.call(f,!1)?!1:!0};c.prototype.validateInput=function(d){d=new InputWithValidations(d);a=new Errors;this._performBuiltinValidations(d.asHtmlNode(),d.validations());this._performFormatValidation(d.asHtmlNode(),d.validations().format);d.resetErrorMessages();if(a.none())return!0;d.setupErrorMessage(a.fullMessages());
return!1};c.prototype._validations={};c.prototype._performFormatValidation=function(d,b){var c,e,h,k,l;if(b){k=Object.keys(b);l=[];e=0;for(h=k.length;e<h;e++)c=k[e],this._validations[c].validationHandler.test(d.value)?l.push(void 0):l.push(a.add(this._validations[c].errorMessage));return l}};c.prototype._performBuiltinValidations=function(d,b){var c,e,h,k,l;k=Object.keys(b);l=[];e=0;for(h=k.length;e<h;e++)c=k[e],"format"!==c?(c=this._validations[c].validationHandler(d,b),l.push(a.add(c))):l.push(void 0);
return l};c.prototype._setupBuiltInValidations=function(){this.defineValidation("email",/.+@.+\..+/,"Email is invalid");this.defineValidation("tel",/^\d{8}$/,"Telephone number is invalid");this.defineValidation("number",/^\d+$/,"Invalid");this.defineValidation("required",function(a,b){if((new InputWithValidations(a)).isEmpty())return"Can't be blank";if("checkbox"===a.getAttribute("type")&&!a.checked)return"Most be checked"});this.defineValidation("length",function(a,b){return(new CharacterCountValidation(a.value.length,
b.length.min,b.length.max)).validate()});this.defineValidation("wordCount",function(a,b){var c;c=""===a.value?c=0:a.value.split(/[ ]+/).length;return(new WordCountValidation(c,b.wordCount.min,b.wordCount.max)).validate()});this.defineValidation("allowEmpty",function(c,b){return a.alwaysNoneIf(""===c.value)});this.defineValidation("onlyIfChecked",function(c,b){return a.alwaysNoneIf(!document.getElementById(b.onlyIfChecked).checked)});this.defineValidation("onlyIfEmpty",function(c,b){if(!(new InputWithValidations(document.getElementById(b.onlyIfEmpty))).isEmpty())return a.alwaysNone()});
return this.defineValidation("group",function(a,b){})};return c}()}).call(this);
(function(a,e,c,d){function b(b,c){this.element=b;this.options=a.extend({},f,c);this._defaults=f;this._name=g;this.init()}var g="validate",f={validator:new FormValidator,onBlur:!1,selectorClasses:{field:".field"},errorClasses:{input:"input-with-error",field:"field-with-error",form:"form-with-error"},beforeValidation:function(){},afterValidation:function(){},ifValid:function(){},ifInvalid:function(){}};b.prototype={init:function(){var b=this,d=b.element,e=b.options,f=e.validator,g=!0;d.setAttribute("novalidate",
"true");a(c).on("keydown",function(b){var c;c=13===b.keyCode?!0:void 0;c&&(b=b.target.nodeName.toLowerCase(),c="input"==b||"textarea"==b||"select"==b?!0:!1);c&&a('input[type="submit"]:not([data-skip-validation])').trigger("click")});a("input[data-skip-validation]").hover(function(){g=!1},function(){g=!0}).on("click",function(a){g&&a.preventDefault()});a(d).on("submit",function(c){g&&(e.beforeValidation(),f.validateForm(d)?e.ifValid():(c.preventDefault(),e.ifInvalid()),b.setErrorClasses(d,e),b.setErrorMessages(d,
e),a(".input-with-error").first().focus(),e.afterValidation())});if(e.onBlur)a(d).find("[data-validation]").on("blur",function(a){f.validateInput(this);b.setErrorClasses(d,e);b.setErrorMessages(d,e)})},setErrorClasses:function(b,c){a("."+c.errorClasses.input).removeClass(c.errorClasses.input);a("."+c.errorClasses.field).removeClass(c.errorClasses.field);a("."+c.errorClasses.form).removeClass(c.errorClasses.form);a(b).find("[data-error-message]").each(function(){var d=a(this),e=d.parents(c.selectorClasses.field),
f=a(b);d.addClass(c.errorClasses.input);e.addClass(c.errorClasses.field);f.addClass(c.errorClasses.form)})},setErrorMessages:function(b,c){a(b).find("small.error-message").remove();a(b).find("[data-error-message]").each(function(){var b=this.dataset.errorMessage;a(this).after('<small class="error-message">'+b+"</small>")})}};a.fn[g]=function(c){return this.each(function(){a.data(this,"plugin_"+g)||a.data(this,"plugin_"+g,new b(this,c))})}})(jQuery,window,document);
