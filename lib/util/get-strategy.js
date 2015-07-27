module.exports = function(selector) {
  var value = selector, using, query, tag, classOrId, classOrIdName;

  if (value.indexOf('#') === 0 && value.search(/(\s|>|\.|[|])/) === -1) {
    using = 'id';
    value = value.slice(1);

  } else if (value.indexOf('/') === 0 || value.indexOf('(') === 0 || value.indexOf('../') === 0 || value.indexOf('./') === 0 || value.indexOf('*/') === 0) {
    using = 'xpath';

  } else if (value.indexOf('=') === 0) {
    using = 'link text';
    value = value.slice(1);

  } else if (value.indexOf('*=') === 0) {
    using = 'partial link text';
    value = value.slice(2);

  } else if (value.search(/<[a-zA-Z\-]+( \/)*>/g) >= 0) {
    using = 'tag name';
    value = value.replace(/<|>|\/|\s/g, '');

  } else if (value.search(/^\[name=("|')([a-zA-z0-9\-_ ]+)("|')\]$/) >= 0) {
    using = 'name';
    value = value.match(/^\[name=("|')([a-zA-z0-9\-_ ]+)("|')\]$/)[2];

  } else if (value.search(/^[a-z0-9]*=(.)+$/) >= 0) {
    query = value.split(/=/);
    tag = query.shift();

    using = 'xpath';
    value = '//' + (tag.length ? tag : '*') + '[normalize-space() = "' + query.join('=') + '"]';

  } else if (value.search(/^[a-z0-9]*\*=(.)+$/) >= 0) {
    query = value.split(/\*=/);
    tag = query.shift();

    using = 'xpath';
    value = '//' + (tag.length ? tag : '*') + '[contains(., "' + query.join('*=') + '")]';

  } else if (value.search(/^[a-z0-9]*(\.|#)-?[_a-zA-Z]+[_a-zA-Z0-9-]*=(.)+$/) >= 0) {
    query = value.split(/=/);
    tag = query.shift();

    classOrId = tag.substr(tag.search(/(\.|#)/), 1) === '#' ? 'id' : 'class';
    classOrIdName = tag.slice(tag.search(/(\.|#)/) + 1);

    tag = tag.substr(0, tag.search(/(\.|#)/));
    using = 'xpath';
    value = '//' + (tag.length ? tag : '*') + '[contains(@' + classOrId + ', "' + classOrIdName + '") and normalize-space() = "' + query.join('=') + '"]';

  } else if (value.search(/^[a-z0-9]*(\.|#)-?[_a-zA-Z]+[_a-zA-Z0-9-]*\*=(.)+$/) >= 0) {
    query = value.split(/\*=/);
    tag = query.shift();

    classOrId = tag.substr(tag.search(/(\.|#)/), 1) === '#' ? 'id' : 'class';
    classOrIdName = tag.slice(tag.search(/(\.|#)/) + 1);

    tag = tag.substr(0, tag.search(/(\.|#)/));
    using = 'xpath';
    value = '//' + (tag.length ? tag : '*') + '[contains(@' + classOrId + ', "' + classOrIdName + '") and contains(., "' + query.join('*=') + '")]';
  } else {
    using = 'css selector';
  }

  return {
    'using': using,
    'value': value
  };
}
