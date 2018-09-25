const DOMNodeCollection = require("./dom_node_collection.js");

const delayedFunctions = [];

document.addEventListener('DOMContentLoaded', delayedInvoker );


window.$l = function (el) {
  if ( (typeof el) === 'string' ) {
    const elArray = Array.from(document.querySelectorAll(el));
    return new DOMNodeCollection(elArray);
  } else if (el instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  } else if (typeof el === 'function') {

    delayedFunctions.push(el);
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
      ajaxValues.success(JSON.parse(xhr.response).data);
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
