class DOMNodeCollection {
  constructor(elArray) {
    this.elArray = elArray;
  }

  html(string) {
    if (string === undefined) {
      return this.first().innerHTML;
    } else {
      this.elArray.forEach( function (el) {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.html('');
  }

  append(element) {
    this.each( function (prospectiveParents) {
      if (typeof element === 'string') {
        prospectiveParents.innerHTML += element;
      }
      else if (element instanceof HTMLElement) {
        prospectiveParents.innerHTML += element.outerHTML;
      }
      else if (element instanceof DOMNodeCollection) {
        element.each( function (addedElement) {
          prospectiveParents.innerHTML += addedElement.outerHTML;
        });
      }
    });
  }


  attr (attributeName, changedValue) {
    if (changedValue === undefined) {
      return this.first().attributes[attributeName];
    } else {
      return this.each( (el) => {
        el.attributes[attributeName] = changedValue;
      });
    }
  }

  addClass(...classes) {
    classes.forEach( (classToAdd) => {
      this.addOneClass(classToAdd);
    });
  }

  addOneClass(classToAdd) {
    return this.each( (el) => el.className += classToAdd + ' ');
  }

  removeClass(...classes) {
    classes.forEach( (classToRemove) => {
      this.removeOneClass(classToRemove);
    });
  }

  removeOneClass(classToRemove) {
    return this.each( (el) => el.className = el.className.replace(classToRemove, ''));
  }

  find (selector) {
    let stuffHolder =[];
    this.each( (parent) => {
        stuffHolder = stuffHolder.concat(Array.from(parent.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(stuffHolder);
  }

  remove () {
    this.each( (el) => {
      el.outerHTML = '';
    });
    return this;
  }

  children() {
    let childs = [];
    this.each( (parent) => childs = childs.concat(Array.from(parent.children)));
    return new DOMNodeCollection(childs);
  }

  parent() {
    let parents = [];
    this.each( (child) => {
      parents.push(child.parentElement);
    });
    return new DOMNodeCollection(parents);
  }

  on(type, callback) {
    this.each( (el) => {
      el.addEventListener(type, callback);
      el[`jqlCb${type}`] = callback;
    });
  }

  off(type) {
    this.each( (el) => {
      el.removeEventListener(type, el[`jqlCb${type}`]);
    });
  }

  each(callback) {
    this.elArray.forEach(callback);
    return this;
  }

  first () {
    return this.elArray[0];
  }

  // removeChildren(parent) {
  //   const children = Array.from(parent.childNodes);
  //   children.forEach( (child) => parent.removeChild(child) );
  // }
}



module.exports = DOMNodeCollection;









// html(string) {
//
//
//   if (string === undefined) {
//     return this.elArray[0];
//   } else {
//     const element = document.createTextNode(string);
//     for (let i = 0; i < this.elArray.length; i++) {
//       const currEl = this.elArray[i];
//       this.removeChildren(currEl);
//
//     }
//   }
// }
