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
    return this.each( (el) =>
      el.className = el.className.replace(classToRemove, ''));
  }

  find (selector) {
    let gathered =[];
    this.each( (parent) => {
        gathered = gathered
          .concat(Array.from(parent.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(gathered);
  }

  remove () {
    this.each( (el) => {
      el.outerHTML = '';
    });
    return this;
  }

  children() {
    let scamps = [];
    this.each( (parent) => scamps = scamps.concat(Array.from(parent.children)));
    return new DOMNodeCollection(scamps);
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
      el[`clerkdomCb${type}`] = callback;
    });
  }

  off(type) {
    this.each( (el) => {
      el.removeEventListener(type, el[`clerkdomCb${type}`]);
    });
  }

  each(callback) {
    this.elArray.forEach(callback);
    return this;
  }

  first() {
    return this.elArray[0];
  }


}



export default DOMNodeCollection;
