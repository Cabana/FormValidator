!function(){var defineProperty=Object.defineProperty;Object.defineProperty=function(object,property,descriptor){delete descriptor.configurable;delete descriptor.enumerable;delete descriptor.writable;return defineProperty(object,property,descriptor)}}();Object.defineProperties=function defineProperties(object,descriptors){for(var property in descriptors){Object.defineProperty(object,property,descriptors[property])}return object};Object.getPrototypeOf=function getPrototypeOf(object){return object&&object.constructor&&object.constructor.prototype||null};Object.keys=function keys(object){var buffer=[],key;for(key in object){if(Object.prototype.hasOwnProperty.call(object,key)){buffer.push(key)}}return buffer};Object.getOwnPropertyNames=function getOwnPropertyNames(object){var buffer=[],key;for(key in object){buffer.push(key)}return buffer};Date.prototype.toISOStrings=function toISOString(){var date=this;return((date.getUTCMonth()+1)/100+date.toUTCString()+date/1e3).replace(/..(..).+?(\d+)\D+(\d+).(\S+).*(...)/,"$3-$1-$2T$4.$5Z")};Date.now=function now(){return(new Date).getTime()};Array.isArray=function isArray(array){return array&&Object.prototype.toString.call(array)==="[Object Array]"};Function.prototype.bind=function bind(scope){var callback=this,prepend=Array.prototype.slice.call(arguments,1),Constructor=function(){},bound=function(){return callback.apply(this instanceof Constructor&&scope?this:scope,Array.prototype.concat.apply(prepend,arguments))};Constructor.prototype=bound.prototype=callback.prototype;return bound};String.prototype.trim=function trim(){return this.replace(/^\s+|\s+$/g,"")};Array.prototype.every=function every(callback,scope){for(var array=this,index=0,length=array.length;index<length;++index){if(!callback.call(scope||window,array[index],index,array)){break}}return index===length};Array.prototype.filter=function filter(callback,scope){for(var array=this,arrayB=[],index=0,length=array.length,element;index<length;++index){element=array[index];if(callback.call(scope||window,element,index,array)){arrayB.push(element)}}return arrayB};Array.prototype.forEach=function forEach(callback,scope){for(var array=this,index=0,length=array.length;index<length;++index){callback.call(scope||window,array[index],index,array)}};Array.prototype.indexOf=function indexOf(searchElement){for(var array=this,index=0,length=array.length;index<length;++index){if(array[index]===searchElement){return index}}return-1};Array.prototype.lastIndexOf=function lastIndexOf(searchElement){for(var array=this,index=array.length-1;index>-1;--index){if(array[index]===searchElement){return index}}return-1};Array.prototype.map=function map(callback,scope){for(var array=this,arrayB=[],index=0,length=array.length,element;index<length;++index){element=array[index];arrayB.push(callback.call(scope||window,array[index],index,array))}return arrayB};Array.prototype.reduce=function reduce(callback,initialValue){var array=this,previousValue=initialValue||0;for(var index=0,length=array.length;index<length;++index){previousValue=callback.call(window,previousValue,array[index],index,array)}return previousValue};Array.prototype.reduceRight=function reduceRight(callback,initialValue){var array=this,previousValue=initialValue||0;for(var index=array.length-1;index>-1;--index){previousValue=callback.call(window,previousValue,array[index],index,array)}return previousValue};Array.prototype.some=function some(callback,scope){for(var array=this,index=0,length=array.length;index<length;++index){if(callback.call(scope||window,array[index],index,array)){break}}return index===length};!function(){var keys="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",keysRe=new RegExp("[^"+keys+"]");Window.prototype.atob=function atob(input){var output=[],buffer,bufferB,chrs,index=0,indexB,length=input.length;if(length%4>0||keysRe.test(input)||/=/.test(input)&&(/=[^=]/.test(input)||/={3}/.test(input))){throw new Error("Invalid base64 data")}while(index<length){for(bufferB=[],indexB=index;index<indexB+4;){bufferB.push(keys.indexOf(input.charAt(index++)))}buffer=(bufferB[0]<<18)+(bufferB[1]<<12)+((bufferB[2]&63)<<6)+(bufferB[3]&63);chrs=[(buffer&255<<16)>>16,bufferB[2]===64?-1:(buffer&255<<8)>>8,bufferB[3]===64?-1:buffer&255];for(indexB=0;indexB<3;++indexB){if(chrs[indexB]>=0||indexB===0){output.push(String.fromCharCode(chrs[indexB]))}}}return output.join("")};Window.prototype.btoa=function btoa(input){var output=[],buffer,chrs,index=0,length=input.length;while(index<length){chrs=[input.charCodeAt(index++),input.charCodeAt(index++),input.charCodeAt(index++)];buffer=(chrs[0]<<16)+((chrs[1]||0)<<8)+(chrs[2]||0);output.push(keys.charAt((buffer&63<<18)>>18),keys.charAt((buffer&63<<12)>>12),keys.charAt(isNaN(chrs[1])?64:(buffer&63<<6)>>6),keys.charAt(isNaN(chrs[2])?64:buffer&63))}return output.join("")}}();!function(){function getStringTokenIndex(list,token){if(validator.test(token)){return Array.prototype.indexOf.call(list,token)}else{throw new Error("InvalidCharacterError: DOM Exception 5")}}var DOMTokenList=window.DOMTokenList=Window.prototype.DOMTokenList=function DOMTokenList(){throw new Error("Illegal constructor")},validator=/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;DOMTokenList.prototype={constructor:DOMTokenList,length:Array.prototype.length,item:function item(index){return this[parseFloat(index)]},contains:function contains(){var token=String(arguments[0]),index=getStringTokenIndex(this,token);return index!==-1},add:function add(){var token=String(arguments[0]),index=getStringTokenIndex(this,token);if(index===-1){Array.prototype.push.call(this,token);this._element.setAttribute("class",this.toString())}},remove:function remove(){var token=String(arguments[0]),index=getStringTokenIndex(this,token);if(index!==-1){Array.prototype.splice.call(this,index,1);this._element.setAttribute("class",this.toString())}},toggle:function toggle(){var token=String(arguments[0]),index=getStringTokenIndex(this,token);if(index===-1){Array.prototype.push.call(this,token)}else{Array.prototype.splice.call(this,index,1)}this._element.setAttribute("class",this.toString())},toString:function(){return Array.prototype.join.call(this," ")}}}();!function(){window.Event=Window.prototype.Event=function Event(type,eventInitDict){if(!type){throw new Error("Not enough arguments")}var event=document.createEventObject();event.type=type;event.bubbles=eventInitDict&&eventInitDict.bubbles!==undefined?eventInitDict.bubbles:false;event.cancelable=eventInitDict&&eventInitDict.cancelable!==undefined?eventInitDict.cancelable:true;return event};window.CustomEvent=Window.prototype.CustomEvent=function CustomEvent(type,eventInitDict){var event=new Event(type,eventInitDict);event.detail=eventInitDict&&eventInitDict.detail||{};return event};window.addEventListener=Window.prototype.addEventListener=HTMLDocument.prototype.addEventListener=Element.prototype.addEventListener=function addEventListener(type,listener){var element=this;if(!element._events){element._events={}}if(!element._events[type]){element._events[type]=function(event){var list=element._events[event.type].list,events=Array.prototype.concat.call([],list);event.preventDefault=function preventDefault(){if(event.cancelable){event.returnValue=false}};event.stopPropagation=function stopPropagation(){event.cancelBubble=true};event.stopImmediatePropagation=function stopImmediatePropagation(){event.cancelBubble=true;event.cancelImmediate=true};event.currentTarget=element;event.relatedTarget=event.fromElement||null;event.target=event.srcElement||element;event.timeStamp=(new Date).getTime();if(event.clientX){event.pageX=event.clientX+document.documentElement.scrollLeft;event.pageY=event.clientY+document.documentElement.scrollTop}for(var index=0,length=events.length;index<length&&!event.cancelImmediate;++index){if(list.indexOf(events[index])>-1){events[index].call(element,event)}}};element._events[type].list=[];element.attachEvent("on"+type,element._events[type])}element._events[type].list.push(listener)};window.removeEventListener=Window.prototype.removeEventListener=HTMLDocument.prototype.removeEventListener=Element.prototype.removeEventListener=function removeEventListener(type,listener){var element=this;if(element._events&&element._events[type]&&element._events[type].list){var index=element._events[type].list.indexOf(listener);if(index>-1){element._events[type].list.splice(index,1);if(!element._events[type].list.length){element.detachEvent("on"+type,element._events[type])}}}};window.dispatchEvent=Window.prototype.dispatchEvent=HTMLDocument.prototype.dispatchEvent=Element.prototype.dispatchEvent=function dispatchEvent(event){if(!arguments.length){throw new Error("Not enough arguments")}if(!event||typeof event.type!=="string"){throw new Error("DOM Events Exception 0")}var element=this,type=event.type;try{if(!event.bubbles){event.cancelBubble=true;var cancelBubbleEvent=function(event){event.cancelBubble=true;(element||window).detachEvent("on"+type,cancelBubbleEvent)};this.attachEvent("on"+type,cancelBubbleEvent)}this.fireEvent("on"+type,event)}catch(error){do{if(element._events&&element._events[type]){element._events[type].call(element,event)}element=element.nodeType===9?element.parentWindow:element.parentNode}while(element&&!event.cancelBubble)}}}();document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.dispatchEvent(new Event("DOMContentLoaded",{bubbles:true}))}});!function(){function getComputedStylePixel(element,property,fontSize){var value=element.currentStyle[property].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/)||[0,0,""],size=value[1],suffix=value[2],rootSize;fontSize=!fontSize?fontSize:/%|em/.test(suffix)&&element.parentElement?getComputedStylePixel(element.parentElement,"fontSize",null):16;rootSize=property=="fontSize"?fontSize:/width/i.test(property)?element.clientWidth:element.clientHeight;return suffix=="%"?size/100*rootSize:suffix=="cm"?size*.3937*96:suffix=="em"?size*fontSize:suffix=="in"?size*96:suffix=="mm"?size*.3937*96/10:suffix=="pc"?size*12*96/72:suffix=="pt"?size*96/72:size}function setShortStyleProperty(style,property){var borderSuffix=property=="border"?"Width":"",t=property+"Top"+borderSuffix,r=property+"Right"+borderSuffix,b=property+"Bottom"+borderSuffix,l=property+"Left"+borderSuffix;style[property]=(style[t]==style[r]&&style[t]==style[b]&&style[t]==style[l]?[style[t]]:style[t]==style[b]&&style[l]==style[r]?[style[t],style[r]]:style[l]==style[r]?[style[t],style[r],style[b]]:[style[t],style[r],style[b],style[l]]).join(" ")}function CSSStyleDeclaration(element){var style=this,currentStyle=element.currentStyle,fontSize=getComputedStylePixel(element,"fontSize"),unCamelCase=function(match){return"-"+match.toLowerCase()},property;for(property in currentStyle){Array.prototype.push.call(style,property=="styleFloat"?"float":property.replace(/[A-Z]/,unCamelCase));if(property=="width"){style[property]=element.offsetWidth+"px"}else if(property=="height"){style[property]=element.offsetHeight+"px"}else if(property=="styleFloat"){style.float=currentStyle[property]}else if(/margin.|padding.|border.+W/.test(property)&&style[property]!="auto"){style[property]=Math.round(getComputedStylePixel(element,property,fontSize))+"px"}else{style[property]=currentStyle[property]}}setShortStyleProperty(style,"margin");setShortStyleProperty(style,"padding");setShortStyleProperty(style,"border");style.fontSize=Math.round(fontSize)+"px"}CSSStyleDeclaration.prototype={constructor:CSSStyleDeclaration,getPropertyPriority:function(){throw new Error("NotSupportedError: DOM Exception 9")},getPropertyValue:function(property){return this[property.replace(/-\w/g,function(match){return match[1].toUpperCase()})]},item:function(index){return this[index]},removeProperty:function(){throw new Error("NoModificationAllowedError: DOM Exception 7")},setProperty:function(){throw new Error("NoModificationAllowedError: DOM Exception 7")},getPropertyCSSValue:function(){throw new Error("NotSupportedError: DOM Exception 9")}};window.getComputedStyle=Window.prototype.getComputedStyle=function(element){return new CSSStyleDeclaration(element)}}();!function(){function evalQuery(window,query){return new Function("media","return "+query.replace(/(device)-([\w.]+)/g,"$1.$2").replace(/([\w.]+)\s*:/g,"media.$1 ===").replace(/min-([\w.]+)\s*===/g,"$1 >=").replace(/max-([\w.]+)\s*===/g,"$1 <=").replace(/all|screen/g,"1").replace(/print/g,"0").replace(/,/g,"||").replace(/and/g,"&&").replace(/(\d+)(cm|em|in|mm|pc|pt|px|rem)/,function($0,$1,$2){return $1*($2==="cm"?.3937*96:$2==="em"||$2==="rem"?16:$2==="in"?96:$2==="mm"?.3937*96/10:$2==="pc"?12*96/72:$2==="pt"?96/72:1)}))({width:window.innerWidth,height:window.innerHeight,orientation:window.orientation||"landscape",device:{width:window.screen.width,height:window.screen.height,orientation:window.screen.orientation||window.orientation||"landscape"}})}function MediaQueryList(){this.matches=false;this.media="invalid"}MediaQueryList.prototype.addListener=function addListener(listener){this.addListener.listeners.push(listener)};MediaQueryList.prototype.removeListener=function removeListener(listener){this.addListener.listeners.splice(this.addListener.listeners.indexof(listener),1)};window.matchMedia=Window.prototype.matchMedia=function matchMedia(query){var window=this,list=new MediaQueryList;list.media=String(query);list.matches=evalQuery(window,list.media);list.addListener.listeners=[];window.addEventListener("resize",function(){var listeners=[].concat(list.addListener.listeners),matches=evalQuery(window,list.media);if(matches!=list.matches){list.matches=matches;for(var index=0,length=listeners.length;index<length;++index){listeners[index].call(window,list)}}});return list}}();!function(){function scrollX(){var document=this.document,documentElement=document.documentElement,body=document.body||document.createElement("body");return(documentElement.scrollLeft||body.scrollLeft||0)-(documentElement.clientLeft||body.clientLeft||0)}function scrollY(){var document=this.document,documentElement=document.documentElement,body=document.body||document.createElement("body");return(documentElement.scrollTop||body.scrollTop||0)-(documentElement.clientTop||body.clientTop||0)}function innerWidth(){return this.document.documentElement.clientWidth}function innerHeight(){return this.document.documentElement.clientHeight}Object.defineProperties(Window.prototype,{innerWidth:{get:innerWidth},innerHeight:{get:innerHeight},pageXOffset:{get:scrollX},pageYOffset:{get:scrollY},scrollX:{get:scrollX},scrollY:{get:scrollY}})}();!function(){function Geolocation(){this.getCurrentPosition=getCurrentPosition}function Position(response){var date=new Date;this.coords=new Coordinates(response);this.timestamp=date.getTime()}function PositionError(){this.code=3;this.message="Timeout"}function PositionOptions(options){this.timeout=parseFloat(options.timeout)||timeout}function Coordinates(response){this.latitude=response.latitude;this.longitude=response.longitude}function getCurrentPosition(success,error,options){confirmed=confirmed||window.confirm(request);if(!confirmed){return}var script=document.head.appendChild(document.createElement("script")),positionOptions=new PositionOptions(options||{});geolocation.timeout=setTimeout(function(){setTimeout(function(){document.head.removeChild(script)});delete geolocation.callback;error.call(window,new PositionError)},positionOptions.timeout);geolocation.callback=function(response){clearTimeout(geolocation.timeout);setTimeout(function(){document.head.removeChild(script)});delete geolocation.callback;success.call(window,new Position(response))};script.addEventListener("error",function(){setTimeout(function(){document.head.removeChild(script)});delete geolocation.callback;error.call(window,new PositionError)});script.src=url_geoip}var url_geoip="http://freegeoip.net/json/?callback=window.navigator.geolocation.callback",timeout=1e3*60,request="This Webpage wants to track your physical location.\nDo you allow it?",confirmed=false,navigator=window.navigator.constructor&&window.navigator.constructor!==Object?window.navigator.constructor.prototype:window.navigator,geolocation=navigator.geolocation=new Geolocation}();Object.defineProperty(HTMLDocument.prototype,"head",{get:function(){return this.getElementsByTagName("head")[0]}});Object.defineProperty(Element.prototype,"classList",{get:function(){var element=this,DOMTokenList=function DOMTokenList(){this._element=element},array=String(element.className).trim().split(/\s+/),list;DOMTokenList.prototype=window.DOMTokenList.prototype;list=new DOMTokenList;Array.prototype.splice.apply(list,[0,list.length].concat(array[0]?array:[]));return Object.defineProperties(element,{className:{get:function(){return element.getAttribute("class")||""},set:function(name){var array=name!==undefined&&name!==null&&String(name).trim().split(/\s+/)||[];Array.prototype.splice.apply(list,[0,list.length].concat(array[0]?array:[]));element.setAttribute("class",list.toString())}},classList:{get:function(){return list}}}).classList}});Element.prototype.matches=function matches(selector){var element=this,elements=(element.document||element.ownerDocument).querySelectorAll(selector),index=0;while(elements[index]&&elements[index]!==element){++index}return elements[index]?true:false};!function(){function mutation(nodes){if(!nodes.length){throw new Error("DOM Exception 8")}else if(nodes.length===1){return nodes[0]}else{var fragment=document.createDocumentFragment(),index,node;for(index in arguments){node=arguments[index];fragment.appendChild(typeof node==="string"?document.createTextNode(node):node)}return fragment}}Element.prototype.prepend=function prepend(){this.insertBefore(mutation(arguments),this.firstChild)};Element.prototype.append=function append(){this.appendChild(mutation(arguments))};Element.prototype.before=function before(){if(this.parentNode){this.parentNode.insertBefore(mutation(arguments),this)}};Element.prototype.after=function append(){if(this.parentNode){this.parentNode.insertBefore(mutation(arguments),this.nextSibling)}};Element.prototype.replace=function append(){if(this.parentNode){this.parentNode.replaceChild(mutation(arguments),this.nextSibling)}};Element.prototype.remove=function remove(){if(this.parentNode){this.parentNode.removeChild(this.nextSibling)}}}();Object.defineProperty(Element.prototype,"placeholder",{set:function(value){if(!value||!/^(input|textarea)$/i.test(this.nodeName)||!/^(email|number|password|search|tel|text|url|)$/i.test(this.getAttribute("type"))){return}var element=this,xInput=document.createElement("-ms-input"),xPlaceholder=xInput.appendChild(document.createElement("-ms-placeholder")),xInputRuntimeStyle=xInput.runtimeStyle,xPlaceholderRuntimeStyle=xPlaceholder.runtimeStyle,elementCurrentStyle=element.currentStyle;xPlaceholder.appendChild(document.createTextNode(value));xInputRuntimeStyle.display="inline-block";xInputRuntimeStyle.fontSize=elementCurrentStyle.fontSize;xInputRuntimeStyle.margin=elementCurrentStyle.margin;xInputRuntimeStyle.width=elementCurrentStyle.width;element.parentNode.insertBefore(xInput,element).appendChild(element);xPlaceholderRuntimeStyle.backgroundColor="transparent";xPlaceholderRuntimeStyle.fontFamily=elementCurrentStyle.fontFamily;xPlaceholderRuntimeStyle.fontSize=elementCurrentStyle.fontSize;xPlaceholderRuntimeStyle.margin="2px 0 0 2px";xPlaceholderRuntimeStyle.padding=elementCurrentStyle.padding;xPlaceholderRuntimeStyle.position="absolute";xPlaceholderRuntimeStyle.display=element.value?"none":"inline-block";element.runtimeStyle.margin="0";xPlaceholder.attachEvent("onclick",function(){element.focus()});element.attachEvent("onkeypress",function(){xPlaceholderRuntimeStyle.display="none"});element.attachEvent("onkeyup",function(){xPlaceholderRuntimeStyle.display=element.value?"none":"inline-block"});Object.defineProperty(element,"placeholder",{get:function(){return xPlaceholder.innerHTML},set:function(value){xPlaceholder.innerHTML=value}})}});document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){for(var elements=document.querySelectorAll("input,textarea"),index=0,length=elements.length;index<length;++index){if(elements[index].placeholder){elements[index].placeholder=elements[index].placeholder}}}});!function(){"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section subline summary time video".replace(/\w+/g,function(nodeName){document.createElement(nodeName)});Object.defineProperty(Element.prototype,"cloneNode",{value:function(deep){var element=this,xElement=this.document.createElement("x");xElement.innerHTML=element.outerHTML;if(!deep){xElement.firstChild.innerHTML=""}return xElement.removeChild(xElement.firstChild)}});var innerHTMLSetter=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML").set;Object.defineProperty(Element.prototype,"innerHTML",{set:function(value){var element=this;String(value).replace(/<\w+/g,function(tagName){element.document.createElement(tagName.slice(1))});innerHTMLSetter.call(element,value)}})}();