/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(elArray) {\n    this.elArray = elArray;\n  }\n\n  html(string) {\n    if (string === undefined) {\n      return this.first().innerHTML;\n    } else {\n      this.elArray.forEach( function (el) {\n        el.innerHTML = string;\n      });\n    }\n  }\n\n  empty() {\n    this.html('');\n  }\n\n  append(element) {\n    this.each( function (prospectiveParents) {\n      if (typeof element === 'string') {\n        prospectiveParents.innerHTML += element;\n      }\n      else if (element instanceof HTMLElement) {\n        prospectiveParents.innerHTML += element.outerHTML;\n      }\n      else if (element instanceof DOMNodeCollection) {\n        element.each( function (addedElement) {\n          prospectiveParents.innerHTML += addedElement.outerHTML;\n        });\n      }\n    });\n  }\n\n\n  attr (attributeName, changedValue) {\n    if (changedValue === undefined) {\n      return this.first().attributes[attributeName];\n    } else {\n      return this.each( (el) => {\n        el.attributes[attributeName] = changedValue;\n      });\n    }\n  }\n\n  addClass(...classes) {\n    classes.forEach( (classToAdd) => {\n      this.addOneClass(classToAdd);\n    });\n  }\n\n  addOneClass(classToAdd) {\n    return this.each( (el) => el.className += classToAdd + ' ');\n  }\n\n  removeClass(...classes) {\n    classes.forEach( (classToRemove) => {\n      this.removeOneClass(classToRemove);\n    });\n  }\n\n  removeOneClass(classToRemove) {\n    return this.each( (el) => el.className = el.className.replace(classToRemove, ''));\n  }\n\n  find (selector) {\n    let stuffHolder =[];\n    this.each( (parent) => {\n        stuffHolder = stuffHolder.concat(Array.from(parent.querySelectorAll(selector)));\n    });\n    return new DOMNodeCollection(stuffHolder);\n  }\n\n  remove () {\n    this.each( (el) => {\n      el.outerHTML = '';\n    });\n    return this;\n  }\n\n  children() {\n    let childs = [];\n    this.each( (parent) => childs = childs.concat(Array.from(parent.children)));\n    return new DOMNodeCollection(childs);\n  }\n\n  parent() {\n    let parents = [];\n    this.each( (child) => {\n      parents.push(child.parentElement);\n    });\n    return new DOMNodeCollection(parents);\n  }\n\n  on(type, callback) {\n    this.each( (el) => {\n      el.addEventListener(type, callback);\n      el[`jqlCb${type}`] = callback;\n    });\n  }\n\n  off(type) {\n    this.each( (el) => {\n      el.removeEventListener(type, el[`jqlCb${type}`]);\n    });\n  }\n\n  each(callback) {\n    this.elArray.forEach(callback);\n    return this;\n  }\n\n  first () {\n    return this.elArray[0];\n  }\n\n  // removeChildren(parent) {\n  //   const children = Array.from(parent.childNodes);\n  //   children.forEach( (child) => parent.removeChild(child) );\n  // }\n}\n\n\n\nmodule.exports = DOMNodeCollection;\n\n\n\n\n\n\n\n\n\n// html(string) {\n//\n//\n//   if (string === undefined) {\n//     return this.elArray[0];\n//   } else {\n//     const element = document.createTextNode(string);\n//     for (let i = 0; i < this.elArray.length; i++) {\n//       const currEl = this.elArray[i];\n//       this.removeChildren(currEl);\n//\n//     }\n//   }\n// }\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nconst delayedFunctions = [];\n\ndocument.addEventListener('DOMContentLoaded', delayedInvoker );\n\n\nwindow.$l = function (el) {\n  if ( (typeof el) === 'string' ) {\n    const elArray = Array.from(document.querySelectorAll(el));\n    return new DOMNodeCollection(elArray);\n  } else if (el instanceof HTMLElement) {\n    return new DOMNodeCollection([el]);\n  } else if (typeof el === 'function') {\n\n    delayedFunctions.push(el);\n  }\n};\n\nwindow.$l.extend = function (obj, ...objs) {\n  for (let i = 0; i < objs.length; i++) {\n    const currObj = objs[i];\n    Object.keys(currObj).forEach( (key) => obj[key] = currObj[key]);\n  }\n  return obj;\n};\n\nwindow.$l.ajax = function(options) {\n  const defaults = {\n    url: window.location.href,\n    success: function() {console.log('no callback given');},\n    method: 'GET',\n    data: {},\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    error: function() {console.log('no callback given');}\n  };\n  const ajaxValues = window.$l.extend(defaults, options);\n  const xhr = new XMLHttpRequest();\n  xhr.open(ajaxValues.method, ajaxValues.url);\n  xhr.onload = function() {\n    if (xhr.status < 400) {\n      ajaxValues.success(JSON.parse(xhr.response).data);\n    } else {\n      ajaxValues.error(xhr);\n    }\n  };\n  xhr.send(ajaxValues);\n};\n\nfunction delayedInvoker(e) {\n  delayedFunctions.forEach( (el) => {\n    el(e);\n  });\n}\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });