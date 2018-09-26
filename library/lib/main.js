import DOMNodeCollection from "./dom_node_collection.js";


const delayedFunctions = [];
let documentUp = false;

document.addEventListener('DOMContentLoaded', delayedInvoker );

function findSelector(cssSelector) {
  const elArray = Array.from(document.querySelectorAll(cssSelector));
  return new DOMNodeCollection(elArray);
}

function buildWrap(el) {
  return new DOMNodeCollection([el]);
}

function pileOn(el) {
  if (document.readyState === 'complete') {
    el();
  } else {
    delayedFunctions.push(el);
  }
}

window.$l = function (el) {
  if ( (typeof el) === 'string' ) {
    return findSelector(el);
  } else if (el instanceof HTMLElement) {
    return buildWrap(el);
  } else if (typeof el === 'function') {
    pileOn(el);
  }
};


window.$l.extend = function (obj, ...objs) {
  for (let i = 0; i < objs.length; i++) {
    const currObj = objs[i];
    Object.keys(currObj).forEach( (key) => obj[key] = currObj[key]);
  }
  return obj;
};

window.$l.ajax = function(options) {
  const defaults = {
    url: window.location.href,
    success: function() {console.log('no callback given');},
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    error: function() {console.log('no callback given');}
  };
  const ajaxValues = window.$l.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(ajaxValues.method, ajaxValues.url);
  xhr.onload = function() {
    if (xhr.status < 400) {
      ajaxValues.success(JSON.parse(xhr.response));
    } else {
      ajaxValues.error(xhr);
    }
  };
  xhr.send(ajaxValues);
};

function delayedInvoker(e) {
  delayedFunctions.forEach( (el) => {
    el(e);
  });
}
