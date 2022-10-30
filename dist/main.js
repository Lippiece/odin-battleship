/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Middleware.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Parser.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");





var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      break;
    }

    (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)();
  }

  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.slice)(begin, stylis__WEBPACK_IMPORTED_MODULE_3__.position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      case 0:
        // &\f
        if (character === 38 && (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(stylis__WEBPACK_IMPORTED_MODULE_3__.position - 1, points, index);
        break;

      case 2:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.delimit)(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_4__.from)(character);
    }
  } while (character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)());

  return parsed;
};

var getRules = function getRules(value, points) {
  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.dealloc)(toRules((0,stylis__WEBPACK_IMPORTED_MODULE_3__.alloc)(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule' || cache.compat) return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses) {
      var isNested = element.parent === children[0]; // in nested rules comments become children of the "auto-inserted" rule
      //
      // considering this input:
      // .a {
      //   .b /* comm */ {}
      //   color: hotpink;
      // }
      // we get output corresponding to this:
      // .a {
      //   & {
      //     /* comm */
      //     color: hotpink;
      //   }
      //   .b {}
      // }

      var commentContainer = isNested ? children[0].children : // global rule at the root level
      children;

      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node = commentContainer[i];

        if (node.line < element.line) {
          break;
        } // it is quite weird but comments are *usually* put at `column: element.column - 1`
        // so we seek *from the end* for the node that is earlier than the rule's `element` and check that
        // this will also match inputs like this:
        // .a {
        //   /* comm */
        //   .b {}
        // }
        //
        // but that is fine
        //
        // it would be the easiest to change the placement of the comment to be the first child of the rule:
        // .a {
        //   .b { /* comm */ }
        // }
        // with such inputs we wouldn't have to search for the comment at all
        // TODO: consider changing this comment placement in the next major version


        if (node.column < element.column) {
          if (isIgnoringComment(node)) {
            return;
          }

          break;
        }
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

var defaultStylisPlugins = [stylis__WEBPACK_IMPORTED_MODULE_5__.prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if ( true && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if ( key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (true) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  {
    var currentSheet;
    var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_6__.stringify,  true ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_7__.COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : 0];
    var serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_5__.middleware)(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_8__.compile)(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if ( true && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCache);


/***/ }),

/***/ "./node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");




function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true);
  }
}

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_2__.getRegisteredStyles)(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var createEmotion = function createEmotion(options) {
  var cache = (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_0__["default"])(options); // $FlowFixMe

  cache.sheet.speedy = function (value) {
    if ( true && this.ctr !== 0) {
      throw new Error('speedy must be changed before any rules are inserted');
    }

    this.isSpeedy = value;
  };

  cache.compat = true;

  var css = function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_1__.serializeStyles)(args, cache.registered, undefined);
    (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_2__.insertStyles)(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var keyframes = function keyframes() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_1__.serializeStyles)(args, cache.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };

  var injectGlobal = function injectGlobal() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_1__.serializeStyles)(args, cache.registered);
    insertWithoutScoping(cache, serialized);
  };

  var cx = function cx() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return merge(cache.registered, css, classnames(args));
  };

  return {
    css: css,
    cx: cx,
    injectGlobal: injectGlobal,
    keyframes: keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function (key) {
        cache.inserted[key] = true;
      });
    },
    flush: function flush() {
      cache.registered = {};
      cache.inserted = {};
      cache.sheet.flush();
    },
    // $FlowFixMe
    sheet: cache.sheet,
    cache: cache,
    getRegisteredStyles: _emotion_utils__WEBPACK_IMPORTED_MODULE_2__.getRegisteredStyles.bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css)
  };
};

var classnames = function classnames(args) {
  var cls = '';

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createEmotion);


/***/ }),

/***/ "./node_modules/@emotion/css/dist/emotion-css.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@emotion/css/dist/emotion-css.esm.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cache": () => (/* binding */ cache),
/* harmony export */   "css": () => (/* binding */ css),
/* harmony export */   "cx": () => (/* binding */ cx),
/* harmony export */   "flush": () => (/* binding */ flush),
/* harmony export */   "getRegisteredStyles": () => (/* binding */ getRegisteredStyles),
/* harmony export */   "hydrate": () => (/* binding */ hydrate),
/* harmony export */   "injectGlobal": () => (/* binding */ injectGlobal),
/* harmony export */   "keyframes": () => (/* binding */ keyframes),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "sheet": () => (/* binding */ sheet)
/* harmony export */ });
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _create_instance_dist_emotion_css_create_instance_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../create-instance/dist/emotion-css-create-instance.esm.js */ "./node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js");





var _createEmotion = (0,_create_instance_dist_emotion_css_create_instance_esm_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
  key: 'css'
}),
    flush = _createEmotion.flush,
    hydrate = _createEmotion.hydrate,
    cx = _createEmotion.cx,
    merge = _createEmotion.merge,
    getRegisteredStyles = _createEmotion.getRegisteredStyles,
    injectGlobal = _createEmotion.injectGlobal,
    keyframes = _createEmotion.keyframes,
    css = _createEmotion.css,
    sheet = _createEmotion.sheet,
    cache = _createEmotion.cache;




/***/ }),

/***/ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/emotion-hash.esm.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (murmur2);


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serializeStyles": () => (/* binding */ serializeStyles)
/* harmony export */ });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");




var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__["default"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(var|attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error(noComponentSelectorMessage);
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = (0,_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(styles) + identifierName;

  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};




/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleSheet": () => (/* binding */ StyleSheet)
/* harmony export */ });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (true) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if ( true && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unitlessKeys);


/***/ }),

/***/ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": () => (/* binding */ getRegisteredStyles),
/* harmony export */   "insertStyles": () => (/* binding */ insertStyles),
/* harmony export */   "registerStyles": () => (/* binding */ registerStyles)
/* harmony export */ });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weakMemoize);


/***/ }),

/***/ "./node_modules/ramda/es/F.js":
/*!************************************!*\
  !*** ./node_modules/ramda/es/F.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.T
 * @example
 *
 *      R.F(); //=> false
 */
var F = function () {
  return false;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (F);

/***/ }),

/***/ "./node_modules/ramda/es/T.js":
/*!************************************!*\
  !*** ./node_modules/ramda/es/T.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.F
 * @example
 *
 *      R.T(); //=> true
 */
var T = function () {
  return true;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (T);

/***/ }),

/***/ "./node_modules/ramda/es/__.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/__.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @name __
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      const greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  '@@functional/placeholder': true
});

/***/ }),

/***/ "./node_modules/ramda/es/add.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/add.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */

var add =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function add(a, b) {
  return Number(a) + Number(b);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (add);

/***/ }),

/***/ "./node_modules/ramda/es/addIndex.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/addIndex.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");



/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig (((a ...) -> b) ... -> [a] -> *) -> (((a ..., Int, [a]) -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      const mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */

var addIndex =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function addIndex(fn) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fn.length, function () {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);

    args[0] = function () {
      var result = origFn.apply(this, (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arguments, [idx, list]));
      idx += 1;
      return result;
    };

    return fn.apply(this, args);
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addIndex);

/***/ }),

/***/ "./node_modules/ramda/es/adjust.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/adjust.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");


/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> (a -> a) -> [a] -> [a]
 * @param {Number} idx The index.
 * @param {Function} fn The function to apply.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd']);      //=> ['a', 'B', 'c', 'd']
 *      R.adjust(-1, R.toUpper, ['a', 'b', 'c', 'd']);     //=> ['a', 'b', 'c', 'D']
 * @symb R.adjust(-1, f, [a, b]) = [a, f(b)]
 * @symb R.adjust(0, f, [a, b]) = [f(a), b]
 */

var adjust =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function adjust(idx, fn, list) {
  var len = list.length;

  if (idx >= len || idx < -len) {
    return list;
  }

  var _idx = (len + idx) % len;

  var _list = (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list);

  _list[_idx] = fn(list[_idx]);
  return _list;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adjust);

/***/ }),

/***/ "./node_modules/ramda/es/all.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/all.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xall_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xall.js */ "./node_modules/ramda/es/internal/_xall.js");



/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      const equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */

var all =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['all'], _internal_xall_js__WEBPACK_IMPORTED_MODULE_2__["default"], function all(fn, list) {
  var idx = 0;

  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }

    idx += 1;
  }

  return true;
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (all);

/***/ }),

/***/ "./node_modules/ramda/es/allPass.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/allPass.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");





/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      const isQueen = R.propEq('rank', 'Q');
 *      const isSpade = R.propEq('suit', '♠︎');
 *      const isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */

var allPass =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function allPass(preds) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_reduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_2__["default"], 0, (0,_pluck_js__WEBPACK_IMPORTED_MODULE_3__["default"])('length', preds)), function () {
    var idx = 0;
    var len = preds.length;

    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }

      idx += 1;
    }

    return true;
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allPass);

/***/ }),

/***/ "./node_modules/ramda/es/always.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/always.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      const t = R.always('Tee');
 *      t(); //=> 'Tee'
 */

var always =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function always(val) {
  return function () {
    return val;
  };
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (always);

/***/ }),

/***/ "./node_modules/ramda/es/and.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/and.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns the first argument if it is falsy, otherwise the second argument.
 * Acts as the boolean `and` statement if both inputs are `Boolean`s.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any}
 * @see R.both, R.or
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */

var and =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function and(a, b) {
  return a && b;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (and);

/***/ }),

/***/ "./node_modules/ramda/es/andThen.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/andThen.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_assertPromise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_assertPromise.js */ "./node_modules/ramda/es/internal/_assertPromise.js");


/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Function
 * @sig (a -> b) -> (Promise e a) -> (Promise e b)
 * @sig (a -> (Promise e b)) -> (Promise e a) -> (Promise e b)
 * @param {Function} onSuccess The function to apply. Can return a value or a promise of a value.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(onSuccess)`
 * @see R.otherwise
 * @example
 *
 *      const makeQuery = email => ({ query: { email }});
 *      const fetchMember = request =>
 *        Promise.resolve({ firstName: 'Bob', lastName: 'Loblaw', id: 42 });
 *
 *      //getMemberName :: String -> Promise ({ firstName, lastName })
 *      const getMemberName = R.pipe(
 *        makeQuery,
 *        fetchMember,
 *        R.andThen(R.pick(['firstName', 'lastName']))
 *      );
 *
 *      getMemberName('bob@gmail.com').then(console.log);
 */

var andThen =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function andThen(f, p) {
  (0,_internal_assertPromise_js__WEBPACK_IMPORTED_MODULE_1__["default"])('andThen', p);

  return p.then(f);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (andThen);

/***/ }),

/***/ "./node_modules/ramda/es/any.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/any.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xany_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xany.js */ "./node_modules/ramda/es/internal/_xany.js");



/**
 * Returns `true` if at least one of the elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      const lessThan0 = R.flip(R.lt)(0);
 *      const lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */

var any =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['any'], _internal_xany_js__WEBPACK_IMPORTED_MODULE_2__["default"], function any(fn, list) {
  var idx = 0;

  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (any);

/***/ }),

/***/ "./node_modules/ramda/es/anyPass.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/anyPass.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");





/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      const isClub = R.propEq('suit', '♣');
 *      const isSpade = R.propEq('suit', '♠');
 *      const isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */

var anyPass =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function anyPass(preds) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_reduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_2__["default"], 0, (0,_pluck_js__WEBPACK_IMPORTED_MODULE_3__["default"])('length', preds)), function () {
    var idx = 0;
    var len = preds.length;

    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }

      idx += 1;
    }

    return false;
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (anyPass);

/***/ }),

/***/ "./node_modules/ramda/es/ap.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/ap.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");




/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (r -> a -> b) -> (r -> a) -> (r -> b)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */

var ap =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } : (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (acc, f) {
    return (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(acc, (0,_map_js__WEBPACK_IMPORTED_MODULE_3__["default"])(f, applyX));
  }, [], applyF);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ap);

/***/ }),

/***/ "./node_modules/ramda/es/aperture.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/aperture.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_aperture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_aperture.js */ "./node_modules/ramda/es/internal/_aperture.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xaperture_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xaperture.js */ "./node_modules/ramda/es/internal/_xaperture.js");




/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */

var aperture =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_2__["default"])([], _internal_xaperture_js__WEBPACK_IMPORTED_MODULE_3__["default"], _internal_aperture_js__WEBPACK_IMPORTED_MODULE_0__["default"]));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (aperture);

/***/ }),

/***/ "./node_modules/ramda/es/append.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/append.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */

var append =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function append(el, list) {
  return (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list, [el]);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (append);

/***/ }),

/***/ "./node_modules/ramda/es/apply.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/apply.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      const nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */

var apply =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function apply(fn, args) {
  return fn.apply(this, args);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apply);

/***/ }),

/***/ "./node_modules/ramda/es/applySpec.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/applySpec.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _apply_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apply.js */ "./node_modules/ramda/es/apply.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./values.js */ "./node_modules/ramda/es/values.js");








 // Use custom mapValues function to avoid issues with specs that include a "map" key and R.map
// delegating calls to .map

function mapValues(fn, obj) {
  return (0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj) ? obj.map(fn) : (0,_keys_js__WEBPACK_IMPORTED_MODULE_7__["default"])(obj).reduce(function (acc, key) {
    acc[key] = fn(obj[key]);
    return acc;
  }, {});
}
/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      const getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */


var applySpec =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function applySpec(spec) {
  spec = mapValues(function (v) {
    return typeof v == 'function' ? v : applySpec(v);
  }, spec);
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_reduce_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_4__["default"], 0, (0,_pluck_js__WEBPACK_IMPORTED_MODULE_5__["default"])('length', (0,_values_js__WEBPACK_IMPORTED_MODULE_8__["default"])(spec))), function () {
    var args = arguments;
    return mapValues(function (f) {
      return (0,_apply_js__WEBPACK_IMPORTED_MODULE_2__["default"])(f, args);
    }, spec);
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applySpec);

/***/ }),

/***/ "./node_modules/ramda/es/applyTo.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/applyTo.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Takes a value and applies a function to it.
 *
 * This function is also known as the `thrush` combinator.
 *
 * @func
 * @memberOf R
 * @since v0.25.0
 * @category Function
 * @sig a -> (a -> b) -> b
 * @param {*} x The value
 * @param {Function} f The function to apply
 * @return {*} The result of applying `f` to `x`
 * @example
 *
 *      const t42 = R.applyTo(42);
 *      t42(R.identity); //=> 42
 *      t42(R.add(1)); //=> 43
 */

var applyTo =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function applyTo(x, f) {
  return f(x);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyTo);

/***/ }),

/***/ "./node_modules/ramda/es/ascend.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/ascend.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @see R.descend
 * @example
 *
 *      const byAge = R.ascend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByYoungestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */

var ascend =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ascend);

/***/ }),

/***/ "./node_modules/ramda/es/assoc.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/assoc.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _assocPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assocPath.js */ "./node_modules/ramda/es/assocPath.js");


/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig Idx -> a -> {k: v} -> {k: v}
 * @param {String|Number} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc, R.pick
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */

var assoc =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function assoc(prop, val, obj) {
  return (0,_assocPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])([prop], val, obj);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (assoc);

/***/ }),

/***/ "./node_modules/ramda/es/assocPath.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/assocPath.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");
/* harmony import */ var _internal_assoc_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_assoc.js */ "./node_modules/ramda/es/internal/_assoc.js");
/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isNil.js */ "./node_modules/ramda/es/isNil.js");





/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */

var assocPath =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }

  var idx = path[0];

  if (path.length > 1) {
    var nextObj = !(0,_isNil_js__WEBPACK_IMPORTED_MODULE_4__["default"])(obj) && (0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(idx, obj) ? obj[idx] : (0,_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_2__["default"])(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }

  return (0,_internal_assoc_js__WEBPACK_IMPORTED_MODULE_3__["default"])(idx, val, obj);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (assocPath);

/***/ }),

/***/ "./node_modules/ramda/es/binary.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/binary.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _nAry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nAry.js */ "./node_modules/ramda/es/nAry.js");


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (a -> b -> c -> ... -> z) -> ((a, b) -> z)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @see R.nAry, R.unary
 * @example
 *
 *      const takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      const takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */

var binary =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function binary(fn) {
  return (0,_nAry_js__WEBPACK_IMPORTED_MODULE_1__["default"])(2, fn);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (binary);

/***/ }),

/***/ "./node_modules/ramda/es/bind.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/bind.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      const log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */

var bind =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function bind(fn, thisObj) {
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bind);

/***/ }),

/***/ "./node_modules/ramda/es/both.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/both.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _and_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./and.js */ "./node_modules/ramda/es/and.js");
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lift.js */ "./node_modules/ramda/es/lift.js");




/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.either, R.and
 * @example
 *
 *      const gt10 = R.gt(R.__, 10)
 *      const lt20 = R.lt(R.__, 20)
 *      const f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 *
 *      R.both(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(false)
 *      R.both([false, false, 'a'], [11]); //=> [false, false, 11]
 */

var both =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function both(f, g) {
  return (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : (0,_lift_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_and_js__WEBPACK_IMPORTED_MODULE_2__["default"])(f, g);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (both);

/***/ }),

/***/ "./node_modules/ramda/es/call.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/call.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig ((*... -> a), *...) -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      const indentN = R.pipe(
 *        R.repeat(' '),
 *        R.join(''),
 *        R.replace(/^(?!$)/gm)
 *      );
 *
 *      const format = R.converge(
 *        R.call,
 *        [
 *          R.pipe(R.prop('indent'), indentN),
 *          R.prop('value')
 *        ]
 *      );
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */

var call =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (call);

/***/ }),

/***/ "./node_modules/ramda/es/chain.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/chain.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_makeFlat.js */ "./node_modules/ramda/es/internal/_makeFlat.js");
/* harmony import */ var _internal_xchain_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xchain.js */ "./node_modules/ramda/es/internal/_xchain.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");





/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      const duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */

var chain =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['fantasy-land/chain', 'chain'], _internal_xchain_js__WEBPACK_IMPORTED_MODULE_3__["default"], function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }

  return (0,_internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_2__["default"])(false)((0,_map_js__WEBPACK_IMPORTED_MODULE_4__["default"])(fn, monad));
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chain);

/***/ }),

/***/ "./node_modules/ramda/es/clamp.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/clamp.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */

var clamp =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }

  return value < min ? min : value > max ? max : value;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clamp);

/***/ }),

/***/ "./node_modules/ramda/es/clone.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/clone.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_clone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_clone.js */ "./node_modules/ramda/es/internal/_clone.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");


/**
 * Creates a deep copy of the source that can be used in place of the source
 * object without retaining any references to it.
 * The source object may contain (nested) `Array`s and `Object`s,
 * `Number`s, `String`s, `Boolean`s and `Date`s.
 * `Function`s are assigned by reference rather than copied.
 *
 * Dispatches to a `clone` method if present.
 *
 * Note that if the source object has multiple nodes that share a reference,
 * the returned object will have the same structure, but the references will
 * be pointed to the location within the cloned value.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      const objects = [{}, {}, {}];
 *      const objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */

var clone =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : (0,_internal_clone_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, [], [], true);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clone);

/***/ }),

/***/ "./node_modules/ramda/es/collectBy.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/collectBy.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");


/**
 * Splits a list into sub-lists, based on the result of calling a key-returning function on each element,
 * and grouping the results according to values returned.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category List
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx a => (b -> a) -> [b] -> [[b]]
 * @param {Function} fn Function :: a -> Idx
 * @param {Array} list The array to group
 * @return {Array}
 *    An array of arrays where each sub-array contains items for which
 *    the String-returning function has returned the same value.
 * @see R.groupBy, R.partition
 * @example
 *      R.collectBy(R.prop('type'), [
 *        {type: 'breakfast', item: '☕️'},
 *        {type: 'lunch', item: '🌯'},
 *        {type: 'dinner', item: '🍝'},
 *        {type: 'breakfast', item: '🥐'},
 *        {type: 'lunch', item: '🍕'}
 *      ]);
 *
 *      // [ [ {type: 'breakfast', item: '☕️'},
 *      //     {type: 'breakfast', item: '🥐'} ],
 *      //   [ {type: 'lunch', item: '🌯'},
 *      //     {type: 'lunch', item: '🍕'} ],
 *      //   [ {type: 'dinner', item: '🍝'} ] ]
 */

var collectBy =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function collectBy(fn, list) {
  var group = (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (o, x) {
    var tag = fn(x);

    if (o[tag] === undefined) {
      o[tag] = [];
    }

    o[tag].push(x);
    return o;
  }, {}, list);

  var newList = [];

  for (var tag in group) {
    newList.push(group[tag]);
  }

  return newList;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (collectBy);

/***/ }),

/***/ "./node_modules/ramda/es/comparator.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/comparator.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b) -> Boolean) -> ((a, b) -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      const byAge = R.comparator((a, b) => a.age < b.age);
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByIncreasingAge = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */

var comparator =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function comparator(pred) {
  return function (a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (comparator);

/***/ }),

/***/ "./node_modules/ramda/es/complement.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/complement.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lift.js */ "./node_modules/ramda/es/lift.js");
/* harmony import */ var _not_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./not.js */ "./node_modules/ramda/es/not.js");


/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      const isNotNil = R.complement(R.isNil);
 *      R.isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      R.isNil(7); //=> false
 *      isNotNil(7); //=> true
 */

var complement =
/*#__PURE__*/
(0,_lift_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_not_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (complement);

/***/ }),

/***/ "./node_modules/ramda/es/compose.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/compose.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compose)
/* harmony export */ });
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipe.js */ "./node_modules/ramda/es/pipe.js");
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/ramda/es/reverse.js");


/**
 * Performs right-to-left function composition. The last argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      const yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 * @symb R.compose(f, g, h)(a)(b) = f(g(h(a)))(b)
 */

function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }

  return _pipe_js__WEBPACK_IMPORTED_MODULE_0__["default"].apply(this, (0,_reverse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arguments));
}

/***/ }),

/***/ "./node_modules/ramda/es/composeWith.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/composeWith.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _pipeWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pipeWith.js */ "./node_modules/ramda/es/pipeWith.js");
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/ramda/es/reverse.js");



/**
 * Performs right-to-left function composition using transforming function. The last function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of composeWith is not automatically curried. Transforming function is not used
 * on the last argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [(y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)]) -> ((a, b, ..., n) -> z)
 * @param {Function} transformer The transforming function
 * @param {Array} functions The functions to compose
 * @return {Function}
 * @see R.compose, R.pipeWith
 * @example
 *
 *      const composeWhileNotNil = R.composeWith((f, res) => R.isNil(res) ? res : f(res));
 *
 *      composeWhileNotNil([R.inc, R.prop('age')])({age: 1}) //=> 2
 *      composeWhileNotNil([R.inc, R.prop('age')])({}) //=> undefined
 *
 * @symb R.composeWith(f)([g, h, i])(...args) = f(g, f(h, i(...args)))
 */

var composeWith =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function composeWith(xf, list) {
  return _pipeWith_js__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, [xf, (0,_reverse_js__WEBPACK_IMPORTED_MODULE_2__["default"])(list)]);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (composeWith);

/***/ }),

/***/ "./node_modules/ramda/es/concat.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/concat.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isString.js */ "./node_modules/ramda/es/internal/_isString.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toString.js */ "./node_modules/ramda/es/toString.js");





/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */

var concat =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function concat(a, b) {
  if ((0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a)) {
    if ((0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b)) {
      return a.concat(b);
    }

    throw new TypeError((0,_toString_js__WEBPACK_IMPORTED_MODULE_4__["default"])(b) + ' is not an array');
  }

  if ((0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(a)) {
    if ((0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(b)) {
      return a + b;
    }

    throw new TypeError((0,_toString_js__WEBPACK_IMPORTED_MODULE_4__["default"])(b) + ' is not a string');
  }

  if (a != null && (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }

  if (a != null && (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a.concat)) {
    return a.concat(b);
  }

  throw new TypeError((0,_toString_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (concat);

/***/ }),

/***/ "./node_modules/ramda/es/cond.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/cond.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");





/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * **Please note**: This is not a direct substitute for a `switch` statement.
 * Remember that both elements of every pair passed to `cond` are *functions*,
 * and `cond` returns a function.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @see R.ifElse, R.unless, R.when
 * @example
 *
 *      const fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */

var cond =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function cond(pairs) {
  var arity = (0,_reduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_3__["default"], 0, (0,_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (pair) {
    return pair[0].length;
  }, pairs));
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arity, function () {
    var idx = 0;

    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }

      idx += 1;
    }
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cond);

/***/ }),

/***/ "./node_modules/ramda/es/construct.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/construct.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _constructN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructN.js */ "./node_modules/ramda/es/constructN.js");


/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @see R.invoker
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      const AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      const animalTypes = ["Lion", "Tiger", "Bear"];
 *      const animalSighting = R.invoker(0, 'sighting');
 *      const sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */

var construct =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function construct(Fn) {
  return (0,_constructN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Fn.length, Fn);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (construct);

/***/ }),

/***/ "./node_modules/ramda/es/constructN.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/constructN.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curry.js */ "./node_modules/ramda/es/curry.js");
/* harmony import */ var _nAry_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nAry.js */ "./node_modules/ramda/es/nAry.js");



/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      }
 *
 *      Salad.prototype.recipe = function() {
 *        const instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *        return R.join('\n', instructions);
 *      };
 *
 *      const ThreeLayerSalad = R.constructN(3, Salad);
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      const salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 *      console.log(salad.recipe());
 *      // Add a dollop of Mayonnaise
 *      // Add a dollop of Potato Chips
 *      // Add a dollop of Ketchup
 */

var constructN =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }

  if (n === 0) {
    return function () {
      return new Fn();
    };
  }

  return (0,_curry_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_nAry_js__WEBPACK_IMPORTED_MODULE_2__["default"])(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case 1:
        return new Fn($0);

      case 2:
        return new Fn($0, $1);

      case 3:
        return new Fn($0, $1, $2);

      case 4:
        return new Fn($0, $1, $2, $3);

      case 5:
        return new Fn($0, $1, $2, $3, $4);

      case 6:
        return new Fn($0, $1, $2, $3, $4, $5);

      case 7:
        return new Fn($0, $1, $2, $3, $4, $5, $6);

      case 8:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);

      case 9:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);

      case 10:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constructN);

/***/ }),

/***/ "./node_modules/ramda/es/converge.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/converge.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");






/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      const average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */

var converge =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function converge(after, fns) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_reduce_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_3__["default"], 0, (0,_pluck_js__WEBPACK_IMPORTED_MODULE_4__["default"])('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, (0,_internal_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (converge);

/***/ }),

/***/ "./node_modules/ramda/es/count.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/count.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curry.js */ "./node_modules/ramda/es/curry.js");


/**
 * Returns the number of items in a given `list` matching the predicate `f`
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} predicate to match items against
 * @return {Array} list of items to count in
 * @example
 *
 *      const even = x => x % 2 == 0;
 *
 *      R.count(even, [1, 2, 3, 4, 5]); // => 2
 *      R.map(R.count(even), [[1, 1, 1], [2, 3, 4, 5], [6]]); // => [0, 2, 1]
 */

var count =
/*#__PURE__*/
(0,_curry_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (pred, list) {
  return (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (a, e) {
    return pred(e) ? a + 1 : a;
  }, 0, list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (count);

/***/ }),

/***/ "./node_modules/ramda/es/countBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/countBy.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reduceBy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reduceBy.js */ "./node_modules/ramda/es/reduceBy.js");

/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      const numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      const letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */

var countBy =
/*#__PURE__*/
(0,_reduceBy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (acc, elem) {
  return acc + 1;
}, 0);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countBy);

/***/ }),

/***/ "./node_modules/ramda/es/curry.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/curry.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");


/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN, R.partial
 * @example
 *
 *      const addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      const curriedAddFourNumbers = R.curry(addFourNumbers);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */

var curry =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function curry(fn) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, fn);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (curry);

/***/ }),

/***/ "./node_modules/ramda/es/curryN.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/curryN.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");




/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      const sumArgs = (...args) => R.sum(args);
 *
 *      const curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */

var curryN =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function curryN(length, fn) {
  if (length === 1) {
    return (0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn);
  }

  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(length, (0,_internal_curryN_js__WEBPACK_IMPORTED_MODULE_3__["default"])(length, [], fn));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (curryN);

/***/ }),

/***/ "./node_modules/ramda/es/dec.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/dec.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add.js */ "./node_modules/ramda/es/add.js");

/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */

var dec =
/*#__PURE__*/
(0,_add_js__WEBPACK_IMPORTED_MODULE_0__["default"])(-1);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dec);

/***/ }),

/***/ "./node_modules/ramda/es/defaultTo.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/defaultTo.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      const defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42(false);  //=> false
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */

var defaultTo =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultTo);

/***/ }),

/***/ "./node_modules/ramda/es/descend.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/descend.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @see R.ascend
 * @example
 *
 *      const byAge = R.descend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByOldestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Peter', age: 78 }, { name: 'Emma', age: 70 }, { name: 'Mikhail', age: 62 }]
 */

var descend =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (descend);

/***/ }),

/***/ "./node_modules/ramda/es/difference.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/difference.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_Set_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_Set.js */ "./node_modules/ramda/es/internal/_Set.js");


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */

var difference =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  var secondLen = second.length;
  var toFilterOut = new _internal_Set_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

  for (var i = 0; i < secondLen; i += 1) {
    toFilterOut.add(second[i]);
  }

  while (idx < firstLen) {
    if (toFilterOut.add(first[idx])) {
      out[out.length] = first[idx];
    }

    idx += 1;
  }

  return out;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (difference);

/***/ }),

/***/ "./node_modules/ramda/es/differenceWith.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/differenceWith.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includesWith.js */ "./node_modules/ramda/es/internal/_includesWith.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      const cmp = (x, y) => x.a === y.a;
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      const l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */

var differenceWith =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;

  while (idx < firstLen) {
    if (!(0,_internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pred, first[idx], second) && !(0,_internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pred, first[idx], out)) {
      out.push(first[idx]);
    }

    idx += 1;
  }

  return out;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceWith);

/***/ }),

/***/ "./node_modules/ramda/es/dissoc.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/dissoc.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _dissocPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dissocPath.js */ "./node_modules/ramda/es/dissocPath.js");


/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc, R.omit
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */

var dissoc =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function dissoc(prop, obj) {
  return (0,_dissocPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])([prop], obj);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dissoc);

/***/ }),

/***/ "./node_modules/ramda/es/dissocPath.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/dissocPath.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dissoc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dissoc.js */ "./node_modules/ramda/es/internal/_dissoc.js");
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _assoc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assoc.js */ "./node_modules/ramda/es/assoc.js");





/**
 * Makes a shallow clone of an object. Note that this copies and flattens
 * prototype properties onto the new object as well. All non-primitive
 * properties are copied by reference.
 *
 * @private
 * @param {String|Integer} prop The prop operating
 * @param {Object|Array} obj The object to clone
 * @return {Object|Array} A new object equivalent to the original.
 */

function _shallowCloneObject(prop, obj) {
  if ((0,_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_2__["default"])(prop) && (0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(obj)) {
    return [].concat(obj);
  }

  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  return result;
}
/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */


var dissocPath =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function dissocPath(path, obj) {
  if (obj == null) {
    return obj;
  }

  switch (path.length) {
    case 0:
      return obj;

    case 1:
      return (0,_internal_dissoc_js__WEBPACK_IMPORTED_MODULE_1__["default"])(path[0], obj);

    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);

      if (obj[head] == null) {
        return _shallowCloneObject(head, obj);
      } else {
        return (0,_assoc_js__WEBPACK_IMPORTED_MODULE_4__["default"])(head, dissocPath(tail, obj[head]), obj);
      }

  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dissocPath);

/***/ }),

/***/ "./node_modules/ramda/es/divide.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/divide.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      const half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      const reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */

var divide =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function divide(a, b) {
  return a / b;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (divide);

/***/ }),

/***/ "./node_modules/ramda/es/drop.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/drop.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xdrop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdrop.js */ "./node_modules/ramda/es/internal/_xdrop.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");




/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */

var drop =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['drop'], _internal_xdrop_js__WEBPACK_IMPORTED_MODULE_2__["default"], function drop(n, xs) {
  return (0,_slice_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Math.max(0, n), Infinity, xs);
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (drop);

/***/ }),

/***/ "./node_modules/ramda/es/dropLast.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/dropLast.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_dropLast_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dropLast.js */ "./node_modules/ramda/es/internal/_dropLast.js");
/* harmony import */ var _internal_xdropLast_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xdropLast.js */ "./node_modules/ramda/es/internal/_xdropLast.js");




/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */

var dropLast =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xdropLast_js__WEBPACK_IMPORTED_MODULE_3__["default"], _internal_dropLast_js__WEBPACK_IMPORTED_MODULE_2__["default"]));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropLast);

/***/ }),

/***/ "./node_modules/ramda/es/dropLastWhile.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/dropLastWhile.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_dropLastWhile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dropLastWhile.js */ "./node_modules/ramda/es/internal/_dropLastWhile.js");
/* harmony import */ var _internal_xdropLastWhile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xdropLastWhile.js */ "./node_modules/ramda/es/internal/_xdropLastWhile.js");




/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} predicate The function to be called on each element
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      const lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *
 *      R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 */

var dropLastWhile =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xdropLastWhile_js__WEBPACK_IMPORTED_MODULE_3__["default"], _internal_dropLastWhile_js__WEBPACK_IMPORTED_MODULE_2__["default"]));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropLastWhile);

/***/ }),

/***/ "./node_modules/ramda/es/dropRepeats.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/dropRepeats.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xdropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdropRepeatsWith.js */ "./node_modules/ramda/es/internal/_xdropRepeatsWith.js");
/* harmony import */ var _dropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropRepeatsWith.js */ "./node_modules/ramda/es/dropRepeatsWith.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");





/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */

var dropRepeats =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([],
/*#__PURE__*/
(0,_internal_xdropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_equals_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/*#__PURE__*/
(0,_dropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_equals_js__WEBPACK_IMPORTED_MODULE_4__["default"])));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropRepeats);

/***/ }),

/***/ "./node_modules/ramda/es/dropRepeatsWith.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/dropRepeatsWith.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xdropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdropRepeatsWith.js */ "./node_modules/ramda/es/internal/_xdropRepeatsWith.js");
/* harmony import */ var _last_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./last.js */ "./node_modules/ramda/es/last.js");




/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      const l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */

var dropRepeatsWith =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xdropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_2__["default"], function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;

  if (len !== 0) {
    result[0] = list[0];

    while (idx < len) {
      if (!pred((0,_last_js__WEBPACK_IMPORTED_MODULE_3__["default"])(result), list[idx])) {
        result[result.length] = list[idx];
      }

      idx += 1;
    }
  }

  return result;
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropRepeatsWith);

/***/ }),

/***/ "./node_modules/ramda/es/dropWhile.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/dropWhile.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xdropWhile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdropWhile.js */ "./node_modules/ramda/es/internal/_xdropWhile.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");




/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      const lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *
 *      R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 */

var dropWhile =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['dropWhile'], _internal_xdropWhile_js__WEBPACK_IMPORTED_MODULE_2__["default"], function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }

  return (0,_slice_js__WEBPACK_IMPORTED_MODULE_3__["default"])(idx, Infinity, xs);
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropWhile);

/***/ }),

/***/ "./node_modules/ramda/es/either.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/either.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lift.js */ "./node_modules/ramda/es/lift.js");
/* harmony import */ var _or_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./or.js */ "./node_modules/ramda/es/or.js");




/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.both, R.or
 * @example
 *
 *      const gt10 = x => x > 10;
 *      const even = x => x % 2 === 0;
 *      const f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 *
 *      R.either(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(55)
 *      R.either([false, false, 'a'], [11]) // => [11, 11, "a"]
 */

var either =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function either(f, g) {
  return (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : (0,_lift_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_or_js__WEBPACK_IMPORTED_MODULE_3__["default"])(f, g);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (either);

/***/ }),

/***/ "./node_modules/ramda/es/empty.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/empty.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_isArguments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArguments.js */ "./node_modules/ramda/es/internal/_isArguments.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isObject.js */ "./node_modules/ramda/es/internal/_isObject.js");
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_isString.js */ "./node_modules/ramda/es/internal/_isString.js");
/* harmony import */ var _internal_isTypedArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/_isTypedArray.js */ "./node_modules/ramda/es/internal/_isTypedArray.js");






/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`),
 * TypedArray (`Uint8Array []`, `Float32Array []`, etc), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));               //=> Nothing()
 *      R.empty([1, 2, 3]);              //=> []
 *      R.empty('unicorns');             //=> ''
 *      R.empty({x: 1, y: 2});           //=> {}
 *      R.empty(Uint8Array.from('123')); //=> Uint8Array []
 */

var empty =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : (0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x) ? [] : (0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_4__["default"])(x) ? '' : (0,_internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(x) ? {} : (0,_internal_isArguments_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x) ? function () {
    return arguments;
  }() : (0,_internal_isTypedArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(x) ? x.constructor.from('') : void 0 // else
  ;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (empty);

/***/ }),

/***/ "./node_modules/ramda/es/endsWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/endsWith.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");
/* harmony import */ var _takeLast_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./takeLast.js */ "./node_modules/ramda/es/takeLast.js");



/**
 * Checks if a list ends with the provided sublist.
 *
 * Similarly, checks if a string ends with the provided substring.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> [a] -> Boolean
 * @sig String -> String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @see R.startsWith
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */

var endsWith =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (suffix, list) {
  return (0,_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_takeLast_js__WEBPACK_IMPORTED_MODULE_2__["default"])(suffix.length, list), suffix);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (endsWith);

/***/ }),

/***/ "./node_modules/ramda/es/eqBy.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/eqBy.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");


/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */

var eqBy =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function eqBy(f, x, y) {
  return (0,_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f(x), f(y));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eqBy);

/***/ }),

/***/ "./node_modules/ramda/es/eqProps.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/eqProps.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");


/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      const o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      const o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */

var eqProps =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function eqProps(prop, obj1, obj2) {
  return (0,_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj1[prop], obj2[prop]);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eqProps);

/***/ }),

/***/ "./node_modules/ramda/es/equals.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/equals.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_equals.js */ "./node_modules/ramda/es/internal/_equals.js");


/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      const a = {}; a.v = a;
 *      const b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */

var equals =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function equals(a, b) {
  return (0,_internal_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a, b, [], []);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (equals);

/***/ }),

/***/ "./node_modules/ramda/es/evolve.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/evolve.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isObject.js */ "./node_modules/ramda/es/internal/_isObject.js");



/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      const transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */

var evolve =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function evolve(transformations, object) {
  if (!(0,_internal_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(object) && !(0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object)) {
    return object;
  }

  var result = object instanceof Array ? [] : {};
  var transformation, key, type;

  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key]) : transformation && type === 'object' ? evolve(transformation, object[key]) : object[key];
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (evolve);

/***/ }),

/***/ "./node_modules/ramda/es/filter.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/filter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_filter.js */ "./node_modules/ramda/es/internal/_filter.js");
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isObject.js */ "./node_modules/ramda/es/internal/_isObject.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_xfilter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/_xfilter.js */ "./node_modules/ramda/es/internal/_xfilter.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");







/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */

var filter =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['fantasy-land/filter', 'filter'], _internal_xfilter_js__WEBPACK_IMPORTED_MODULE_5__["default"], function (pred, filterable) {
  return (0,_internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(filterable) ? (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }

    return acc;
  }, {}, (0,_keys_js__WEBPACK_IMPORTED_MODULE_6__["default"])(filterable)) : // else
  (0,_internal_filter_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pred, filterable);
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filter);

/***/ }),

/***/ "./node_modules/ramda/es/find.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/find.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xfind_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfind.js */ "./node_modules/ramda/es/internal/_xfind.js");



/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */

var find =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['find'], _internal_xfind_js__WEBPACK_IMPORTED_MODULE_2__["default"], function find(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx += 1;
  }
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (find);

/***/ }),

/***/ "./node_modules/ramda/es/findIndex.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/findIndex.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xfindIndex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfindIndex.js */ "./node_modules/ramda/es/internal/_xfindIndex.js");



/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce, R.indexOf
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */

var findIndex =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xfindIndex_js__WEBPACK_IMPORTED_MODULE_2__["default"], function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findIndex);

/***/ }),

/***/ "./node_modules/ramda/es/findLast.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/findLast.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xfindLast_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfindLast.js */ "./node_modules/ramda/es/internal/_xfindLast.js");



/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */

var findLast =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xfindLast_js__WEBPACK_IMPORTED_MODULE_2__["default"], function findLast(fn, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx -= 1;
  }
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findLast);

/***/ }),

/***/ "./node_modules/ramda/es/findLastIndex.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/findLastIndex.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xfindLastIndex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfindLastIndex.js */ "./node_modules/ramda/es/internal/_xfindLastIndex.js");



/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce, R.lastIndexOf
 * @example
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */

var findLastIndex =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xfindLastIndex_js__WEBPACK_IMPORTED_MODULE_2__["default"], function findLastIndex(fn, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }

    idx -= 1;
  }

  return -1;
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findLastIndex);

/***/ }),

/***/ "./node_modules/ramda/es/flatten.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/flatten.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_makeFlat.js */ "./node_modules/ramda/es/internal/_makeFlat.js");


/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */

var flatten =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(true));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flatten);

/***/ }),

/***/ "./node_modules/ramda/es/flip.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/flip.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");


/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      const mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */

var flip =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function flip(fn) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flip);

/***/ }),

/***/ "./node_modules/ramda/es/forEach.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/forEach.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      const printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */

var forEach =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
(0,_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__["default"])('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;

  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }

  return list;
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forEach);

/***/ }),

/***/ "./node_modules/ramda/es/forEachObjIndexed.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/forEachObjIndexed.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");


/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */

var forEachObjIndexed =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function forEachObjIndexed(fn, obj) {
  var keyList = (0,_keys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj);
  var idx = 0;

  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }

  return obj;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forEachObjIndexed);

/***/ }),

/***/ "./node_modules/ramda/es/fromPairs.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/fromPairs.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */

var fromPairs =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function fromPairs(pairs) {
  var result = {};
  var idx = 0;

  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fromPairs);

/***/ }),

/***/ "./node_modules/ramda/es/groupBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/groupBy.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduceBy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reduceBy.js */ "./node_modules/ramda/es/reduceBy.js");



/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a key-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx a => (b -> a) -> [b] -> {a: [b]}
 * @param {Function} fn Function :: a -> Idx
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.reduceBy, R.transduce, R.indexBy
 * @example
 *
 *      const byGrade = R.groupBy(function(student) {
 *        const score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      const students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */

var groupBy =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
(0,_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__["default"])('groupBy',
/*#__PURE__*/
(0,_reduceBy_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (acc, item) {
  acc.push(item);
  return acc;
}, [])));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (groupBy);

/***/ }),

/***/ "./node_modules/ramda/es/groupWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/groupWith.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * const isVowel = R.test(/^[aeiou]$/i);
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */

var groupWith =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    var nextidx = idx + 1;

    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }

    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }

  return res;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (groupWith);

/***/ }),

/***/ "./node_modules/ramda/es/gt.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/gt.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */

var gt =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function gt(a, b) {
  return a > b;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gt);

/***/ }),

/***/ "./node_modules/ramda/es/gte.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/gte.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */

var gte =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function gte(a, b) {
  return a >= b;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gte);

/***/ }),

/***/ "./node_modules/ramda/es/has.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/has.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _hasPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hasPath.js */ "./node_modules/ramda/es/hasPath.js");


/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      const hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      const point = {x: 0, y: 0};
 *      const pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */

var has =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function has(prop, obj) {
  return (0,_hasPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])([prop], obj);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (has);

/***/ }),

/***/ "./node_modules/ramda/es/hasIn.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/hasIn.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNil.js */ "./node_modules/ramda/es/isNil.js");


/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      const square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */

var hasIn =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function hasIn(prop, obj) {
  if ((0,_isNil_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj)) {
    return false;
  }

  return prop in obj;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hasIn);

/***/ }),

/***/ "./node_modules/ramda/es/hasPath.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/hasPath.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isNil.js */ "./node_modules/ramda/es/isNil.js");



/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array} path The path to use.
 * @param {Object} obj The object to check the path in.
 * @return {Boolean} Whether the path exists.
 * @see R.has
 * @example
 *
 *      R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
 *      R.hasPath(['a', 'b'], {a: {b: undefined}}); // => true
 *      R.hasPath(['a', 'b'], {a: {c: 2}});         // => false
 *      R.hasPath(['a', 'b'], {});                  // => false
 */

var hasPath =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function hasPath(_path, obj) {
  if (_path.length === 0 || (0,_isNil_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj)) {
    return false;
  }

  var val = obj;
  var idx = 0;

  while (idx < _path.length) {
    if (!(0,_isNil_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val) && (0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_path[idx], val)) {
      val = val[_path[idx]];
      idx += 1;
    } else {
      return false;
    }
  }

  return true;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hasPath);

/***/ }),

/***/ "./node_modules/ramda/es/head.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/head.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */

var head =
/*#__PURE__*/
(0,_nth_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (head);

/***/ }),

/***/ "./node_modules/ramda/es/identical.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/identical.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_objectIs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_objectIs.js */ "./node_modules/ramda/es/internal/_objectIs.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * Note this is merely a curried version of ES6 `Object.is`.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      const o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */

var identical =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_internal_objectIs_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (identical);

/***/ }),

/***/ "./node_modules/ramda/es/identity.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/identity.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_identity.js */ "./node_modules/ramda/es/internal/_identity.js");


/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      const obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */

var identity =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (identity);

/***/ }),

/***/ "./node_modules/ramda/es/ifElse.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/ifElse.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");


/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when, R.cond
 * @example
 *
 *      const incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({ count: 1 }); //=> { count: 2 }
 *      incCount({});           //=> { count: 1 }
 */

var ifElse =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function ifElse(condition, onTrue, onFalse) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ifElse);

/***/ }),

/***/ "./node_modules/ramda/es/inc.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/inc.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add.js */ "./node_modules/ramda/es/add.js");

/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */

var inc =
/*#__PURE__*/
(0,_add_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (inc);

/***/ }),

/***/ "./node_modules/ramda/es/includes.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/includes.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includes.js */ "./node_modules/ramda/es/internal/_includes.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Also works with strings.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.includes(3, [1, 2, 3]); //=> true
 *      R.includes(4, [1, 2, 3]); //=> false
 *      R.includes({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.includes([42], [[42]]); //=> true
 *      R.includes('ba', 'banana'); //=>true
 */

var includes =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_internal_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (includes);

/***/ }),

/***/ "./node_modules/ramda/es/index.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* reexport safe */ _F_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "T": () => (/* reexport safe */ _T_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "__": () => (/* reexport safe */ _js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "add": () => (/* reexport safe */ _add_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "addIndex": () => (/* reexport safe */ _addIndex_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "adjust": () => (/* reexport safe */ _adjust_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "all": () => (/* reexport safe */ _all_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "allPass": () => (/* reexport safe */ _allPass_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "always": () => (/* reexport safe */ _always_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "and": () => (/* reexport safe */ _and_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "andThen": () => (/* reexport safe */ _andThen_js__WEBPACK_IMPORTED_MODULE_219__["default"]),
/* harmony export */   "any": () => (/* reexport safe */ _any_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "anyPass": () => (/* reexport safe */ _anyPass_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   "ap": () => (/* reexport safe */ _ap_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   "aperture": () => (/* reexport safe */ _aperture_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "append": () => (/* reexport safe */ _append_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   "apply": () => (/* reexport safe */ _apply_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   "applySpec": () => (/* reexport safe */ _applySpec_js__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   "applyTo": () => (/* reexport safe */ _applyTo_js__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   "ascend": () => (/* reexport safe */ _ascend_js__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   "assoc": () => (/* reexport safe */ _assoc_js__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   "assocPath": () => (/* reexport safe */ _assocPath_js__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   "binary": () => (/* reexport safe */ _binary_js__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   "bind": () => (/* reexport safe */ _bind_js__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   "both": () => (/* reexport safe */ _both_js__WEBPACK_IMPORTED_MODULE_23__["default"]),
/* harmony export */   "call": () => (/* reexport safe */ _call_js__WEBPACK_IMPORTED_MODULE_24__["default"]),
/* harmony export */   "chain": () => (/* reexport safe */ _chain_js__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   "clamp": () => (/* reexport safe */ _clamp_js__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   "clone": () => (/* reexport safe */ _clone_js__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   "collectBy": () => (/* reexport safe */ _collectBy_js__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   "comparator": () => (/* reexport safe */ _comparator_js__WEBPACK_IMPORTED_MODULE_29__["default"]),
/* harmony export */   "complement": () => (/* reexport safe */ _complement_js__WEBPACK_IMPORTED_MODULE_30__["default"]),
/* harmony export */   "compose": () => (/* reexport safe */ _compose_js__WEBPACK_IMPORTED_MODULE_31__["default"]),
/* harmony export */   "composeWith": () => (/* reexport safe */ _composeWith_js__WEBPACK_IMPORTED_MODULE_32__["default"]),
/* harmony export */   "concat": () => (/* reexport safe */ _concat_js__WEBPACK_IMPORTED_MODULE_33__["default"]),
/* harmony export */   "cond": () => (/* reexport safe */ _cond_js__WEBPACK_IMPORTED_MODULE_34__["default"]),
/* harmony export */   "construct": () => (/* reexport safe */ _construct_js__WEBPACK_IMPORTED_MODULE_35__["default"]),
/* harmony export */   "constructN": () => (/* reexport safe */ _constructN_js__WEBPACK_IMPORTED_MODULE_36__["default"]),
/* harmony export */   "converge": () => (/* reexport safe */ _converge_js__WEBPACK_IMPORTED_MODULE_37__["default"]),
/* harmony export */   "count": () => (/* reexport safe */ _count_js__WEBPACK_IMPORTED_MODULE_38__["default"]),
/* harmony export */   "countBy": () => (/* reexport safe */ _countBy_js__WEBPACK_IMPORTED_MODULE_39__["default"]),
/* harmony export */   "curry": () => (/* reexport safe */ _curry_js__WEBPACK_IMPORTED_MODULE_40__["default"]),
/* harmony export */   "curryN": () => (/* reexport safe */ _curryN_js__WEBPACK_IMPORTED_MODULE_41__["default"]),
/* harmony export */   "dec": () => (/* reexport safe */ _dec_js__WEBPACK_IMPORTED_MODULE_42__["default"]),
/* harmony export */   "defaultTo": () => (/* reexport safe */ _defaultTo_js__WEBPACK_IMPORTED_MODULE_43__["default"]),
/* harmony export */   "descend": () => (/* reexport safe */ _descend_js__WEBPACK_IMPORTED_MODULE_44__["default"]),
/* harmony export */   "difference": () => (/* reexport safe */ _difference_js__WEBPACK_IMPORTED_MODULE_45__["default"]),
/* harmony export */   "differenceWith": () => (/* reexport safe */ _differenceWith_js__WEBPACK_IMPORTED_MODULE_46__["default"]),
/* harmony export */   "dissoc": () => (/* reexport safe */ _dissoc_js__WEBPACK_IMPORTED_MODULE_47__["default"]),
/* harmony export */   "dissocPath": () => (/* reexport safe */ _dissocPath_js__WEBPACK_IMPORTED_MODULE_48__["default"]),
/* harmony export */   "divide": () => (/* reexport safe */ _divide_js__WEBPACK_IMPORTED_MODULE_49__["default"]),
/* harmony export */   "drop": () => (/* reexport safe */ _drop_js__WEBPACK_IMPORTED_MODULE_50__["default"]),
/* harmony export */   "dropLast": () => (/* reexport safe */ _dropLast_js__WEBPACK_IMPORTED_MODULE_51__["default"]),
/* harmony export */   "dropLastWhile": () => (/* reexport safe */ _dropLastWhile_js__WEBPACK_IMPORTED_MODULE_52__["default"]),
/* harmony export */   "dropRepeats": () => (/* reexport safe */ _dropRepeats_js__WEBPACK_IMPORTED_MODULE_53__["default"]),
/* harmony export */   "dropRepeatsWith": () => (/* reexport safe */ _dropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_54__["default"]),
/* harmony export */   "dropWhile": () => (/* reexport safe */ _dropWhile_js__WEBPACK_IMPORTED_MODULE_55__["default"]),
/* harmony export */   "either": () => (/* reexport safe */ _either_js__WEBPACK_IMPORTED_MODULE_56__["default"]),
/* harmony export */   "empty": () => (/* reexport safe */ _empty_js__WEBPACK_IMPORTED_MODULE_57__["default"]),
/* harmony export */   "endsWith": () => (/* reexport safe */ _endsWith_js__WEBPACK_IMPORTED_MODULE_58__["default"]),
/* harmony export */   "eqBy": () => (/* reexport safe */ _eqBy_js__WEBPACK_IMPORTED_MODULE_59__["default"]),
/* harmony export */   "eqProps": () => (/* reexport safe */ _eqProps_js__WEBPACK_IMPORTED_MODULE_60__["default"]),
/* harmony export */   "equals": () => (/* reexport safe */ _equals_js__WEBPACK_IMPORTED_MODULE_61__["default"]),
/* harmony export */   "evolve": () => (/* reexport safe */ _evolve_js__WEBPACK_IMPORTED_MODULE_62__["default"]),
/* harmony export */   "filter": () => (/* reexport safe */ _filter_js__WEBPACK_IMPORTED_MODULE_63__["default"]),
/* harmony export */   "find": () => (/* reexport safe */ _find_js__WEBPACK_IMPORTED_MODULE_64__["default"]),
/* harmony export */   "findIndex": () => (/* reexport safe */ _findIndex_js__WEBPACK_IMPORTED_MODULE_65__["default"]),
/* harmony export */   "findLast": () => (/* reexport safe */ _findLast_js__WEBPACK_IMPORTED_MODULE_66__["default"]),
/* harmony export */   "findLastIndex": () => (/* reexport safe */ _findLastIndex_js__WEBPACK_IMPORTED_MODULE_67__["default"]),
/* harmony export */   "flatten": () => (/* reexport safe */ _flatten_js__WEBPACK_IMPORTED_MODULE_68__["default"]),
/* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_69__["default"]),
/* harmony export */   "forEach": () => (/* reexport safe */ _forEach_js__WEBPACK_IMPORTED_MODULE_70__["default"]),
/* harmony export */   "forEachObjIndexed": () => (/* reexport safe */ _forEachObjIndexed_js__WEBPACK_IMPORTED_MODULE_71__["default"]),
/* harmony export */   "fromPairs": () => (/* reexport safe */ _fromPairs_js__WEBPACK_IMPORTED_MODULE_72__["default"]),
/* harmony export */   "groupBy": () => (/* reexport safe */ _groupBy_js__WEBPACK_IMPORTED_MODULE_73__["default"]),
/* harmony export */   "groupWith": () => (/* reexport safe */ _groupWith_js__WEBPACK_IMPORTED_MODULE_74__["default"]),
/* harmony export */   "gt": () => (/* reexport safe */ _gt_js__WEBPACK_IMPORTED_MODULE_75__["default"]),
/* harmony export */   "gte": () => (/* reexport safe */ _gte_js__WEBPACK_IMPORTED_MODULE_76__["default"]),
/* harmony export */   "has": () => (/* reexport safe */ _has_js__WEBPACK_IMPORTED_MODULE_77__["default"]),
/* harmony export */   "hasIn": () => (/* reexport safe */ _hasIn_js__WEBPACK_IMPORTED_MODULE_78__["default"]),
/* harmony export */   "hasPath": () => (/* reexport safe */ _hasPath_js__WEBPACK_IMPORTED_MODULE_79__["default"]),
/* harmony export */   "head": () => (/* reexport safe */ _head_js__WEBPACK_IMPORTED_MODULE_80__["default"]),
/* harmony export */   "identical": () => (/* reexport safe */ _identical_js__WEBPACK_IMPORTED_MODULE_81__["default"]),
/* harmony export */   "identity": () => (/* reexport safe */ _identity_js__WEBPACK_IMPORTED_MODULE_82__["default"]),
/* harmony export */   "ifElse": () => (/* reexport safe */ _ifElse_js__WEBPACK_IMPORTED_MODULE_83__["default"]),
/* harmony export */   "inc": () => (/* reexport safe */ _inc_js__WEBPACK_IMPORTED_MODULE_84__["default"]),
/* harmony export */   "includes": () => (/* reexport safe */ _includes_js__WEBPACK_IMPORTED_MODULE_85__["default"]),
/* harmony export */   "indexBy": () => (/* reexport safe */ _indexBy_js__WEBPACK_IMPORTED_MODULE_86__["default"]),
/* harmony export */   "indexOf": () => (/* reexport safe */ _indexOf_js__WEBPACK_IMPORTED_MODULE_87__["default"]),
/* harmony export */   "init": () => (/* reexport safe */ _init_js__WEBPACK_IMPORTED_MODULE_88__["default"]),
/* harmony export */   "innerJoin": () => (/* reexport safe */ _innerJoin_js__WEBPACK_IMPORTED_MODULE_89__["default"]),
/* harmony export */   "insert": () => (/* reexport safe */ _insert_js__WEBPACK_IMPORTED_MODULE_90__["default"]),
/* harmony export */   "insertAll": () => (/* reexport safe */ _insertAll_js__WEBPACK_IMPORTED_MODULE_91__["default"]),
/* harmony export */   "intersection": () => (/* reexport safe */ _intersection_js__WEBPACK_IMPORTED_MODULE_92__["default"]),
/* harmony export */   "intersperse": () => (/* reexport safe */ _intersperse_js__WEBPACK_IMPORTED_MODULE_93__["default"]),
/* harmony export */   "into": () => (/* reexport safe */ _into_js__WEBPACK_IMPORTED_MODULE_94__["default"]),
/* harmony export */   "invert": () => (/* reexport safe */ _invert_js__WEBPACK_IMPORTED_MODULE_95__["default"]),
/* harmony export */   "invertObj": () => (/* reexport safe */ _invertObj_js__WEBPACK_IMPORTED_MODULE_96__["default"]),
/* harmony export */   "invoker": () => (/* reexport safe */ _invoker_js__WEBPACK_IMPORTED_MODULE_97__["default"]),
/* harmony export */   "is": () => (/* reexport safe */ _is_js__WEBPACK_IMPORTED_MODULE_98__["default"]),
/* harmony export */   "isEmpty": () => (/* reexport safe */ _isEmpty_js__WEBPACK_IMPORTED_MODULE_99__["default"]),
/* harmony export */   "isNil": () => (/* reexport safe */ _isNil_js__WEBPACK_IMPORTED_MODULE_100__["default"]),
/* harmony export */   "join": () => (/* reexport safe */ _join_js__WEBPACK_IMPORTED_MODULE_101__["default"]),
/* harmony export */   "juxt": () => (/* reexport safe */ _juxt_js__WEBPACK_IMPORTED_MODULE_102__["default"]),
/* harmony export */   "keys": () => (/* reexport safe */ _keys_js__WEBPACK_IMPORTED_MODULE_103__["default"]),
/* harmony export */   "keysIn": () => (/* reexport safe */ _keysIn_js__WEBPACK_IMPORTED_MODULE_104__["default"]),
/* harmony export */   "last": () => (/* reexport safe */ _last_js__WEBPACK_IMPORTED_MODULE_105__["default"]),
/* harmony export */   "lastIndexOf": () => (/* reexport safe */ _lastIndexOf_js__WEBPACK_IMPORTED_MODULE_106__["default"]),
/* harmony export */   "length": () => (/* reexport safe */ _length_js__WEBPACK_IMPORTED_MODULE_107__["default"]),
/* harmony export */   "lens": () => (/* reexport safe */ _lens_js__WEBPACK_IMPORTED_MODULE_108__["default"]),
/* harmony export */   "lensIndex": () => (/* reexport safe */ _lensIndex_js__WEBPACK_IMPORTED_MODULE_109__["default"]),
/* harmony export */   "lensPath": () => (/* reexport safe */ _lensPath_js__WEBPACK_IMPORTED_MODULE_110__["default"]),
/* harmony export */   "lensProp": () => (/* reexport safe */ _lensProp_js__WEBPACK_IMPORTED_MODULE_111__["default"]),
/* harmony export */   "lift": () => (/* reexport safe */ _lift_js__WEBPACK_IMPORTED_MODULE_112__["default"]),
/* harmony export */   "liftN": () => (/* reexport safe */ _liftN_js__WEBPACK_IMPORTED_MODULE_113__["default"]),
/* harmony export */   "lt": () => (/* reexport safe */ _lt_js__WEBPACK_IMPORTED_MODULE_114__["default"]),
/* harmony export */   "lte": () => (/* reexport safe */ _lte_js__WEBPACK_IMPORTED_MODULE_115__["default"]),
/* harmony export */   "map": () => (/* reexport safe */ _map_js__WEBPACK_IMPORTED_MODULE_116__["default"]),
/* harmony export */   "mapAccum": () => (/* reexport safe */ _mapAccum_js__WEBPACK_IMPORTED_MODULE_117__["default"]),
/* harmony export */   "mapAccumRight": () => (/* reexport safe */ _mapAccumRight_js__WEBPACK_IMPORTED_MODULE_118__["default"]),
/* harmony export */   "mapObjIndexed": () => (/* reexport safe */ _mapObjIndexed_js__WEBPACK_IMPORTED_MODULE_119__["default"]),
/* harmony export */   "match": () => (/* reexport safe */ _match_js__WEBPACK_IMPORTED_MODULE_120__["default"]),
/* harmony export */   "mathMod": () => (/* reexport safe */ _mathMod_js__WEBPACK_IMPORTED_MODULE_121__["default"]),
/* harmony export */   "max": () => (/* reexport safe */ _max_js__WEBPACK_IMPORTED_MODULE_122__["default"]),
/* harmony export */   "maxBy": () => (/* reexport safe */ _maxBy_js__WEBPACK_IMPORTED_MODULE_123__["default"]),
/* harmony export */   "mean": () => (/* reexport safe */ _mean_js__WEBPACK_IMPORTED_MODULE_124__["default"]),
/* harmony export */   "median": () => (/* reexport safe */ _median_js__WEBPACK_IMPORTED_MODULE_125__["default"]),
/* harmony export */   "memoizeWith": () => (/* reexport safe */ _memoizeWith_js__WEBPACK_IMPORTED_MODULE_126__["default"]),
/* harmony export */   "mergeAll": () => (/* reexport safe */ _mergeAll_js__WEBPACK_IMPORTED_MODULE_127__["default"]),
/* harmony export */   "mergeDeepLeft": () => (/* reexport safe */ _mergeDeepLeft_js__WEBPACK_IMPORTED_MODULE_128__["default"]),
/* harmony export */   "mergeDeepRight": () => (/* reexport safe */ _mergeDeepRight_js__WEBPACK_IMPORTED_MODULE_129__["default"]),
/* harmony export */   "mergeDeepWith": () => (/* reexport safe */ _mergeDeepWith_js__WEBPACK_IMPORTED_MODULE_130__["default"]),
/* harmony export */   "mergeDeepWithKey": () => (/* reexport safe */ _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_131__["default"]),
/* harmony export */   "mergeLeft": () => (/* reexport safe */ _mergeLeft_js__WEBPACK_IMPORTED_MODULE_132__["default"]),
/* harmony export */   "mergeRight": () => (/* reexport safe */ _mergeRight_js__WEBPACK_IMPORTED_MODULE_133__["default"]),
/* harmony export */   "mergeWith": () => (/* reexport safe */ _mergeWith_js__WEBPACK_IMPORTED_MODULE_134__["default"]),
/* harmony export */   "mergeWithKey": () => (/* reexport safe */ _mergeWithKey_js__WEBPACK_IMPORTED_MODULE_135__["default"]),
/* harmony export */   "min": () => (/* reexport safe */ _min_js__WEBPACK_IMPORTED_MODULE_136__["default"]),
/* harmony export */   "minBy": () => (/* reexport safe */ _minBy_js__WEBPACK_IMPORTED_MODULE_137__["default"]),
/* harmony export */   "modify": () => (/* reexport safe */ _modify_js__WEBPACK_IMPORTED_MODULE_138__["default"]),
/* harmony export */   "modifyPath": () => (/* reexport safe */ _modifyPath_js__WEBPACK_IMPORTED_MODULE_139__["default"]),
/* harmony export */   "modulo": () => (/* reexport safe */ _modulo_js__WEBPACK_IMPORTED_MODULE_140__["default"]),
/* harmony export */   "move": () => (/* reexport safe */ _move_js__WEBPACK_IMPORTED_MODULE_141__["default"]),
/* harmony export */   "multiply": () => (/* reexport safe */ _multiply_js__WEBPACK_IMPORTED_MODULE_142__["default"]),
/* harmony export */   "nAry": () => (/* reexport safe */ _nAry_js__WEBPACK_IMPORTED_MODULE_143__["default"]),
/* harmony export */   "negate": () => (/* reexport safe */ _negate_js__WEBPACK_IMPORTED_MODULE_145__["default"]),
/* harmony export */   "none": () => (/* reexport safe */ _none_js__WEBPACK_IMPORTED_MODULE_146__["default"]),
/* harmony export */   "not": () => (/* reexport safe */ _not_js__WEBPACK_IMPORTED_MODULE_147__["default"]),
/* harmony export */   "nth": () => (/* reexport safe */ _nth_js__WEBPACK_IMPORTED_MODULE_148__["default"]),
/* harmony export */   "nthArg": () => (/* reexport safe */ _nthArg_js__WEBPACK_IMPORTED_MODULE_149__["default"]),
/* harmony export */   "o": () => (/* reexport safe */ _o_js__WEBPACK_IMPORTED_MODULE_150__["default"]),
/* harmony export */   "objOf": () => (/* reexport safe */ _objOf_js__WEBPACK_IMPORTED_MODULE_151__["default"]),
/* harmony export */   "of": () => (/* reexport safe */ _of_js__WEBPACK_IMPORTED_MODULE_152__["default"]),
/* harmony export */   "omit": () => (/* reexport safe */ _omit_js__WEBPACK_IMPORTED_MODULE_153__["default"]),
/* harmony export */   "on": () => (/* reexport safe */ _on_js__WEBPACK_IMPORTED_MODULE_154__["default"]),
/* harmony export */   "once": () => (/* reexport safe */ _once_js__WEBPACK_IMPORTED_MODULE_155__["default"]),
/* harmony export */   "or": () => (/* reexport safe */ _or_js__WEBPACK_IMPORTED_MODULE_156__["default"]),
/* harmony export */   "otherwise": () => (/* reexport safe */ _otherwise_js__WEBPACK_IMPORTED_MODULE_157__["default"]),
/* harmony export */   "over": () => (/* reexport safe */ _over_js__WEBPACK_IMPORTED_MODULE_158__["default"]),
/* harmony export */   "pair": () => (/* reexport safe */ _pair_js__WEBPACK_IMPORTED_MODULE_159__["default"]),
/* harmony export */   "partial": () => (/* reexport safe */ _partial_js__WEBPACK_IMPORTED_MODULE_160__["default"]),
/* harmony export */   "partialObject": () => (/* reexport safe */ _partialObject_js__WEBPACK_IMPORTED_MODULE_144__["default"]),
/* harmony export */   "partialRight": () => (/* reexport safe */ _partialRight_js__WEBPACK_IMPORTED_MODULE_161__["default"]),
/* harmony export */   "partition": () => (/* reexport safe */ _partition_js__WEBPACK_IMPORTED_MODULE_162__["default"]),
/* harmony export */   "path": () => (/* reexport safe */ _path_js__WEBPACK_IMPORTED_MODULE_163__["default"]),
/* harmony export */   "pathEq": () => (/* reexport safe */ _pathEq_js__WEBPACK_IMPORTED_MODULE_165__["default"]),
/* harmony export */   "pathOr": () => (/* reexport safe */ _pathOr_js__WEBPACK_IMPORTED_MODULE_166__["default"]),
/* harmony export */   "pathSatisfies": () => (/* reexport safe */ _pathSatisfies_js__WEBPACK_IMPORTED_MODULE_167__["default"]),
/* harmony export */   "paths": () => (/* reexport safe */ _paths_js__WEBPACK_IMPORTED_MODULE_164__["default"]),
/* harmony export */   "pick": () => (/* reexport safe */ _pick_js__WEBPACK_IMPORTED_MODULE_168__["default"]),
/* harmony export */   "pickAll": () => (/* reexport safe */ _pickAll_js__WEBPACK_IMPORTED_MODULE_169__["default"]),
/* harmony export */   "pickBy": () => (/* reexport safe */ _pickBy_js__WEBPACK_IMPORTED_MODULE_170__["default"]),
/* harmony export */   "pipe": () => (/* reexport safe */ _pipe_js__WEBPACK_IMPORTED_MODULE_171__["default"]),
/* harmony export */   "pipeWith": () => (/* reexport safe */ _pipeWith_js__WEBPACK_IMPORTED_MODULE_172__["default"]),
/* harmony export */   "pluck": () => (/* reexport safe */ _pluck_js__WEBPACK_IMPORTED_MODULE_173__["default"]),
/* harmony export */   "prepend": () => (/* reexport safe */ _prepend_js__WEBPACK_IMPORTED_MODULE_174__["default"]),
/* harmony export */   "product": () => (/* reexport safe */ _product_js__WEBPACK_IMPORTED_MODULE_175__["default"]),
/* harmony export */   "project": () => (/* reexport safe */ _project_js__WEBPACK_IMPORTED_MODULE_176__["default"]),
/* harmony export */   "promap": () => (/* reexport safe */ _promap_js__WEBPACK_IMPORTED_MODULE_177__["default"]),
/* harmony export */   "prop": () => (/* reexport safe */ _prop_js__WEBPACK_IMPORTED_MODULE_178__["default"]),
/* harmony export */   "propEq": () => (/* reexport safe */ _propEq_js__WEBPACK_IMPORTED_MODULE_179__["default"]),
/* harmony export */   "propIs": () => (/* reexport safe */ _propIs_js__WEBPACK_IMPORTED_MODULE_180__["default"]),
/* harmony export */   "propOr": () => (/* reexport safe */ _propOr_js__WEBPACK_IMPORTED_MODULE_181__["default"]),
/* harmony export */   "propSatisfies": () => (/* reexport safe */ _propSatisfies_js__WEBPACK_IMPORTED_MODULE_182__["default"]),
/* harmony export */   "props": () => (/* reexport safe */ _props_js__WEBPACK_IMPORTED_MODULE_183__["default"]),
/* harmony export */   "range": () => (/* reexport safe */ _range_js__WEBPACK_IMPORTED_MODULE_184__["default"]),
/* harmony export */   "reduce": () => (/* reexport safe */ _reduce_js__WEBPACK_IMPORTED_MODULE_185__["default"]),
/* harmony export */   "reduceBy": () => (/* reexport safe */ _reduceBy_js__WEBPACK_IMPORTED_MODULE_186__["default"]),
/* harmony export */   "reduceRight": () => (/* reexport safe */ _reduceRight_js__WEBPACK_IMPORTED_MODULE_187__["default"]),
/* harmony export */   "reduceWhile": () => (/* reexport safe */ _reduceWhile_js__WEBPACK_IMPORTED_MODULE_188__["default"]),
/* harmony export */   "reduced": () => (/* reexport safe */ _reduced_js__WEBPACK_IMPORTED_MODULE_189__["default"]),
/* harmony export */   "reject": () => (/* reexport safe */ _reject_js__WEBPACK_IMPORTED_MODULE_190__["default"]),
/* harmony export */   "remove": () => (/* reexport safe */ _remove_js__WEBPACK_IMPORTED_MODULE_191__["default"]),
/* harmony export */   "repeat": () => (/* reexport safe */ _repeat_js__WEBPACK_IMPORTED_MODULE_192__["default"]),
/* harmony export */   "replace": () => (/* reexport safe */ _replace_js__WEBPACK_IMPORTED_MODULE_193__["default"]),
/* harmony export */   "reverse": () => (/* reexport safe */ _reverse_js__WEBPACK_IMPORTED_MODULE_194__["default"]),
/* harmony export */   "scan": () => (/* reexport safe */ _scan_js__WEBPACK_IMPORTED_MODULE_195__["default"]),
/* harmony export */   "sequence": () => (/* reexport safe */ _sequence_js__WEBPACK_IMPORTED_MODULE_196__["default"]),
/* harmony export */   "set": () => (/* reexport safe */ _set_js__WEBPACK_IMPORTED_MODULE_197__["default"]),
/* harmony export */   "slice": () => (/* reexport safe */ _slice_js__WEBPACK_IMPORTED_MODULE_198__["default"]),
/* harmony export */   "sort": () => (/* reexport safe */ _sort_js__WEBPACK_IMPORTED_MODULE_199__["default"]),
/* harmony export */   "sortBy": () => (/* reexport safe */ _sortBy_js__WEBPACK_IMPORTED_MODULE_200__["default"]),
/* harmony export */   "sortWith": () => (/* reexport safe */ _sortWith_js__WEBPACK_IMPORTED_MODULE_201__["default"]),
/* harmony export */   "split": () => (/* reexport safe */ _split_js__WEBPACK_IMPORTED_MODULE_202__["default"]),
/* harmony export */   "splitAt": () => (/* reexport safe */ _splitAt_js__WEBPACK_IMPORTED_MODULE_203__["default"]),
/* harmony export */   "splitEvery": () => (/* reexport safe */ _splitEvery_js__WEBPACK_IMPORTED_MODULE_204__["default"]),
/* harmony export */   "splitWhen": () => (/* reexport safe */ _splitWhen_js__WEBPACK_IMPORTED_MODULE_205__["default"]),
/* harmony export */   "splitWhenever": () => (/* reexport safe */ _splitWhenever_js__WEBPACK_IMPORTED_MODULE_206__["default"]),
/* harmony export */   "startsWith": () => (/* reexport safe */ _startsWith_js__WEBPACK_IMPORTED_MODULE_207__["default"]),
/* harmony export */   "subtract": () => (/* reexport safe */ _subtract_js__WEBPACK_IMPORTED_MODULE_208__["default"]),
/* harmony export */   "sum": () => (/* reexport safe */ _sum_js__WEBPACK_IMPORTED_MODULE_209__["default"]),
/* harmony export */   "symmetricDifference": () => (/* reexport safe */ _symmetricDifference_js__WEBPACK_IMPORTED_MODULE_210__["default"]),
/* harmony export */   "symmetricDifferenceWith": () => (/* reexport safe */ _symmetricDifferenceWith_js__WEBPACK_IMPORTED_MODULE_211__["default"]),
/* harmony export */   "tail": () => (/* reexport safe */ _tail_js__WEBPACK_IMPORTED_MODULE_212__["default"]),
/* harmony export */   "take": () => (/* reexport safe */ _take_js__WEBPACK_IMPORTED_MODULE_213__["default"]),
/* harmony export */   "takeLast": () => (/* reexport safe */ _takeLast_js__WEBPACK_IMPORTED_MODULE_214__["default"]),
/* harmony export */   "takeLastWhile": () => (/* reexport safe */ _takeLastWhile_js__WEBPACK_IMPORTED_MODULE_215__["default"]),
/* harmony export */   "takeWhile": () => (/* reexport safe */ _takeWhile_js__WEBPACK_IMPORTED_MODULE_216__["default"]),
/* harmony export */   "tap": () => (/* reexport safe */ _tap_js__WEBPACK_IMPORTED_MODULE_217__["default"]),
/* harmony export */   "test": () => (/* reexport safe */ _test_js__WEBPACK_IMPORTED_MODULE_218__["default"]),
/* harmony export */   "thunkify": () => (/* reexport safe */ _thunkify_js__WEBPACK_IMPORTED_MODULE_260__["default"]),
/* harmony export */   "times": () => (/* reexport safe */ _times_js__WEBPACK_IMPORTED_MODULE_220__["default"]),
/* harmony export */   "toLower": () => (/* reexport safe */ _toLower_js__WEBPACK_IMPORTED_MODULE_221__["default"]),
/* harmony export */   "toPairs": () => (/* reexport safe */ _toPairs_js__WEBPACK_IMPORTED_MODULE_222__["default"]),
/* harmony export */   "toPairsIn": () => (/* reexport safe */ _toPairsIn_js__WEBPACK_IMPORTED_MODULE_223__["default"]),
/* harmony export */   "toString": () => (/* reexport safe */ _toString_js__WEBPACK_IMPORTED_MODULE_224__["default"]),
/* harmony export */   "toUpper": () => (/* reexport safe */ _toUpper_js__WEBPACK_IMPORTED_MODULE_225__["default"]),
/* harmony export */   "transduce": () => (/* reexport safe */ _transduce_js__WEBPACK_IMPORTED_MODULE_226__["default"]),
/* harmony export */   "transpose": () => (/* reexport safe */ _transpose_js__WEBPACK_IMPORTED_MODULE_227__["default"]),
/* harmony export */   "traverse": () => (/* reexport safe */ _traverse_js__WEBPACK_IMPORTED_MODULE_228__["default"]),
/* harmony export */   "trim": () => (/* reexport safe */ _trim_js__WEBPACK_IMPORTED_MODULE_229__["default"]),
/* harmony export */   "tryCatch": () => (/* reexport safe */ _tryCatch_js__WEBPACK_IMPORTED_MODULE_230__["default"]),
/* harmony export */   "type": () => (/* reexport safe */ _type_js__WEBPACK_IMPORTED_MODULE_231__["default"]),
/* harmony export */   "unapply": () => (/* reexport safe */ _unapply_js__WEBPACK_IMPORTED_MODULE_232__["default"]),
/* harmony export */   "unary": () => (/* reexport safe */ _unary_js__WEBPACK_IMPORTED_MODULE_233__["default"]),
/* harmony export */   "uncurryN": () => (/* reexport safe */ _uncurryN_js__WEBPACK_IMPORTED_MODULE_234__["default"]),
/* harmony export */   "unfold": () => (/* reexport safe */ _unfold_js__WEBPACK_IMPORTED_MODULE_235__["default"]),
/* harmony export */   "union": () => (/* reexport safe */ _union_js__WEBPACK_IMPORTED_MODULE_236__["default"]),
/* harmony export */   "unionWith": () => (/* reexport safe */ _unionWith_js__WEBPACK_IMPORTED_MODULE_237__["default"]),
/* harmony export */   "uniq": () => (/* reexport safe */ _uniq_js__WEBPACK_IMPORTED_MODULE_238__["default"]),
/* harmony export */   "uniqBy": () => (/* reexport safe */ _uniqBy_js__WEBPACK_IMPORTED_MODULE_239__["default"]),
/* harmony export */   "uniqWith": () => (/* reexport safe */ _uniqWith_js__WEBPACK_IMPORTED_MODULE_240__["default"]),
/* harmony export */   "unless": () => (/* reexport safe */ _unless_js__WEBPACK_IMPORTED_MODULE_241__["default"]),
/* harmony export */   "unnest": () => (/* reexport safe */ _unnest_js__WEBPACK_IMPORTED_MODULE_242__["default"]),
/* harmony export */   "until": () => (/* reexport safe */ _until_js__WEBPACK_IMPORTED_MODULE_243__["default"]),
/* harmony export */   "unwind": () => (/* reexport safe */ _unwind_js__WEBPACK_IMPORTED_MODULE_244__["default"]),
/* harmony export */   "update": () => (/* reexport safe */ _update_js__WEBPACK_IMPORTED_MODULE_245__["default"]),
/* harmony export */   "useWith": () => (/* reexport safe */ _useWith_js__WEBPACK_IMPORTED_MODULE_246__["default"]),
/* harmony export */   "values": () => (/* reexport safe */ _values_js__WEBPACK_IMPORTED_MODULE_247__["default"]),
/* harmony export */   "valuesIn": () => (/* reexport safe */ _valuesIn_js__WEBPACK_IMPORTED_MODULE_248__["default"]),
/* harmony export */   "view": () => (/* reexport safe */ _view_js__WEBPACK_IMPORTED_MODULE_249__["default"]),
/* harmony export */   "when": () => (/* reexport safe */ _when_js__WEBPACK_IMPORTED_MODULE_250__["default"]),
/* harmony export */   "where": () => (/* reexport safe */ _where_js__WEBPACK_IMPORTED_MODULE_251__["default"]),
/* harmony export */   "whereAny": () => (/* reexport safe */ _whereAny_js__WEBPACK_IMPORTED_MODULE_252__["default"]),
/* harmony export */   "whereEq": () => (/* reexport safe */ _whereEq_js__WEBPACK_IMPORTED_MODULE_253__["default"]),
/* harmony export */   "without": () => (/* reexport safe */ _without_js__WEBPACK_IMPORTED_MODULE_254__["default"]),
/* harmony export */   "xor": () => (/* reexport safe */ _xor_js__WEBPACK_IMPORTED_MODULE_255__["default"]),
/* harmony export */   "xprod": () => (/* reexport safe */ _xprod_js__WEBPACK_IMPORTED_MODULE_256__["default"]),
/* harmony export */   "zip": () => (/* reexport safe */ _zip_js__WEBPACK_IMPORTED_MODULE_257__["default"]),
/* harmony export */   "zipObj": () => (/* reexport safe */ _zipObj_js__WEBPACK_IMPORTED_MODULE_258__["default"]),
/* harmony export */   "zipWith": () => (/* reexport safe */ _zipWith_js__WEBPACK_IMPORTED_MODULE_259__["default"])
/* harmony export */ });
/* harmony import */ var _F_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./F.js */ "./node_modules/ramda/es/F.js");
/* harmony import */ var _T_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./T.js */ "./node_modules/ramda/es/T.js");
/* harmony import */ var _js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./__.js */ "./node_modules/ramda/es/__.js");
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add.js */ "./node_modules/ramda/es/add.js");
/* harmony import */ var _addIndex_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addIndex.js */ "./node_modules/ramda/es/addIndex.js");
/* harmony import */ var _adjust_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./adjust.js */ "./node_modules/ramda/es/adjust.js");
/* harmony import */ var _all_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./all.js */ "./node_modules/ramda/es/all.js");
/* harmony import */ var _allPass_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./allPass.js */ "./node_modules/ramda/es/allPass.js");
/* harmony import */ var _always_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./always.js */ "./node_modules/ramda/es/always.js");
/* harmony import */ var _and_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./and.js */ "./node_modules/ramda/es/and.js");
/* harmony import */ var _any_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./any.js */ "./node_modules/ramda/es/any.js");
/* harmony import */ var _anyPass_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./anyPass.js */ "./node_modules/ramda/es/anyPass.js");
/* harmony import */ var _ap_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ap.js */ "./node_modules/ramda/es/ap.js");
/* harmony import */ var _aperture_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./aperture.js */ "./node_modules/ramda/es/aperture.js");
/* harmony import */ var _append_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./append.js */ "./node_modules/ramda/es/append.js");
/* harmony import */ var _apply_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./apply.js */ "./node_modules/ramda/es/apply.js");
/* harmony import */ var _applySpec_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./applySpec.js */ "./node_modules/ramda/es/applySpec.js");
/* harmony import */ var _applyTo_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./applyTo.js */ "./node_modules/ramda/es/applyTo.js");
/* harmony import */ var _ascend_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ascend.js */ "./node_modules/ramda/es/ascend.js");
/* harmony import */ var _assoc_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./assoc.js */ "./node_modules/ramda/es/assoc.js");
/* harmony import */ var _assocPath_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./assocPath.js */ "./node_modules/ramda/es/assocPath.js");
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./binary.js */ "./node_modules/ramda/es/binary.js");
/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./bind.js */ "./node_modules/ramda/es/bind.js");
/* harmony import */ var _both_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./both.js */ "./node_modules/ramda/es/both.js");
/* harmony import */ var _call_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./call.js */ "./node_modules/ramda/es/call.js");
/* harmony import */ var _chain_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./chain.js */ "./node_modules/ramda/es/chain.js");
/* harmony import */ var _clamp_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./clamp.js */ "./node_modules/ramda/es/clamp.js");
/* harmony import */ var _clone_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./clone.js */ "./node_modules/ramda/es/clone.js");
/* harmony import */ var _collectBy_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./collectBy.js */ "./node_modules/ramda/es/collectBy.js");
/* harmony import */ var _comparator_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./comparator.js */ "./node_modules/ramda/es/comparator.js");
/* harmony import */ var _complement_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./complement.js */ "./node_modules/ramda/es/complement.js");
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./compose.js */ "./node_modules/ramda/es/compose.js");
/* harmony import */ var _composeWith_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./composeWith.js */ "./node_modules/ramda/es/composeWith.js");
/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./concat.js */ "./node_modules/ramda/es/concat.js");
/* harmony import */ var _cond_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./cond.js */ "./node_modules/ramda/es/cond.js");
/* harmony import */ var _construct_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./construct.js */ "./node_modules/ramda/es/construct.js");
/* harmony import */ var _constructN_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./constructN.js */ "./node_modules/ramda/es/constructN.js");
/* harmony import */ var _converge_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./converge.js */ "./node_modules/ramda/es/converge.js");
/* harmony import */ var _count_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./count.js */ "./node_modules/ramda/es/count.js");
/* harmony import */ var _countBy_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./countBy.js */ "./node_modules/ramda/es/countBy.js");
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./curry.js */ "./node_modules/ramda/es/curry.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _dec_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./dec.js */ "./node_modules/ramda/es/dec.js");
/* harmony import */ var _defaultTo_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./defaultTo.js */ "./node_modules/ramda/es/defaultTo.js");
/* harmony import */ var _descend_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./descend.js */ "./node_modules/ramda/es/descend.js");
/* harmony import */ var _difference_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./difference.js */ "./node_modules/ramda/es/difference.js");
/* harmony import */ var _differenceWith_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./differenceWith.js */ "./node_modules/ramda/es/differenceWith.js");
/* harmony import */ var _dissoc_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./dissoc.js */ "./node_modules/ramda/es/dissoc.js");
/* harmony import */ var _dissocPath_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./dissocPath.js */ "./node_modules/ramda/es/dissocPath.js");
/* harmony import */ var _divide_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./divide.js */ "./node_modules/ramda/es/divide.js");
/* harmony import */ var _drop_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./drop.js */ "./node_modules/ramda/es/drop.js");
/* harmony import */ var _dropLast_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./dropLast.js */ "./node_modules/ramda/es/dropLast.js");
/* harmony import */ var _dropLastWhile_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./dropLastWhile.js */ "./node_modules/ramda/es/dropLastWhile.js");
/* harmony import */ var _dropRepeats_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./dropRepeats.js */ "./node_modules/ramda/es/dropRepeats.js");
/* harmony import */ var _dropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./dropRepeatsWith.js */ "./node_modules/ramda/es/dropRepeatsWith.js");
/* harmony import */ var _dropWhile_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./dropWhile.js */ "./node_modules/ramda/es/dropWhile.js");
/* harmony import */ var _either_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./either.js */ "./node_modules/ramda/es/either.js");
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./empty.js */ "./node_modules/ramda/es/empty.js");
/* harmony import */ var _endsWith_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./endsWith.js */ "./node_modules/ramda/es/endsWith.js");
/* harmony import */ var _eqBy_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./eqBy.js */ "./node_modules/ramda/es/eqBy.js");
/* harmony import */ var _eqProps_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./eqProps.js */ "./node_modules/ramda/es/eqProps.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");
/* harmony import */ var _evolve_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./evolve.js */ "./node_modules/ramda/es/evolve.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./filter.js */ "./node_modules/ramda/es/filter.js");
/* harmony import */ var _find_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./find.js */ "./node_modules/ramda/es/find.js");
/* harmony import */ var _findIndex_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./findIndex.js */ "./node_modules/ramda/es/findIndex.js");
/* harmony import */ var _findLast_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./findLast.js */ "./node_modules/ramda/es/findLast.js");
/* harmony import */ var _findLastIndex_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./findLastIndex.js */ "./node_modules/ramda/es/findLastIndex.js");
/* harmony import */ var _flatten_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./flatten.js */ "./node_modules/ramda/es/flatten.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./flip.js */ "./node_modules/ramda/es/flip.js");
/* harmony import */ var _forEach_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./forEach.js */ "./node_modules/ramda/es/forEach.js");
/* harmony import */ var _forEachObjIndexed_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./forEachObjIndexed.js */ "./node_modules/ramda/es/forEachObjIndexed.js");
/* harmony import */ var _fromPairs_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./fromPairs.js */ "./node_modules/ramda/es/fromPairs.js");
/* harmony import */ var _groupBy_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./groupBy.js */ "./node_modules/ramda/es/groupBy.js");
/* harmony import */ var _groupWith_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./groupWith.js */ "./node_modules/ramda/es/groupWith.js");
/* harmony import */ var _gt_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./gt.js */ "./node_modules/ramda/es/gt.js");
/* harmony import */ var _gte_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./gte.js */ "./node_modules/ramda/es/gte.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./has.js */ "./node_modules/ramda/es/has.js");
/* harmony import */ var _hasIn_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./hasIn.js */ "./node_modules/ramda/es/hasIn.js");
/* harmony import */ var _hasPath_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./hasPath.js */ "./node_modules/ramda/es/hasPath.js");
/* harmony import */ var _head_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./head.js */ "./node_modules/ramda/es/head.js");
/* harmony import */ var _identical_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./identical.js */ "./node_modules/ramda/es/identical.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./identity.js */ "./node_modules/ramda/es/identity.js");
/* harmony import */ var _ifElse_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./ifElse.js */ "./node_modules/ramda/es/ifElse.js");
/* harmony import */ var _inc_js__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./inc.js */ "./node_modules/ramda/es/inc.js");
/* harmony import */ var _includes_js__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./includes.js */ "./node_modules/ramda/es/includes.js");
/* harmony import */ var _indexBy_js__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./indexBy.js */ "./node_modules/ramda/es/indexBy.js");
/* harmony import */ var _indexOf_js__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./indexOf.js */ "./node_modules/ramda/es/indexOf.js");
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./init.js */ "./node_modules/ramda/es/init.js");
/* harmony import */ var _innerJoin_js__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./innerJoin.js */ "./node_modules/ramda/es/innerJoin.js");
/* harmony import */ var _insert_js__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./insert.js */ "./node_modules/ramda/es/insert.js");
/* harmony import */ var _insertAll_js__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./insertAll.js */ "./node_modules/ramda/es/insertAll.js");
/* harmony import */ var _intersection_js__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./intersection.js */ "./node_modules/ramda/es/intersection.js");
/* harmony import */ var _intersperse_js__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./intersperse.js */ "./node_modules/ramda/es/intersperse.js");
/* harmony import */ var _into_js__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./into.js */ "./node_modules/ramda/es/into.js");
/* harmony import */ var _invert_js__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./invert.js */ "./node_modules/ramda/es/invert.js");
/* harmony import */ var _invertObj_js__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./invertObj.js */ "./node_modules/ramda/es/invertObj.js");
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/es/invoker.js");
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./is.js */ "./node_modules/ramda/es/is.js");
/* harmony import */ var _isEmpty_js__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./isEmpty.js */ "./node_modules/ramda/es/isEmpty.js");
/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./isNil.js */ "./node_modules/ramda/es/isNil.js");
/* harmony import */ var _join_js__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./join.js */ "./node_modules/ramda/es/join.js");
/* harmony import */ var _juxt_js__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./juxt.js */ "./node_modules/ramda/es/juxt.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");
/* harmony import */ var _keysIn_js__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./keysIn.js */ "./node_modules/ramda/es/keysIn.js");
/* harmony import */ var _last_js__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./last.js */ "./node_modules/ramda/es/last.js");
/* harmony import */ var _lastIndexOf_js__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./lastIndexOf.js */ "./node_modules/ramda/es/lastIndexOf.js");
/* harmony import */ var _length_js__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./length.js */ "./node_modules/ramda/es/length.js");
/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./lens.js */ "./node_modules/ramda/es/lens.js");
/* harmony import */ var _lensIndex_js__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./lensIndex.js */ "./node_modules/ramda/es/lensIndex.js");
/* harmony import */ var _lensPath_js__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./lensPath.js */ "./node_modules/ramda/es/lensPath.js");
/* harmony import */ var _lensProp_js__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./lensProp.js */ "./node_modules/ramda/es/lensProp.js");
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./lift.js */ "./node_modules/ramda/es/lift.js");
/* harmony import */ var _liftN_js__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./liftN.js */ "./node_modules/ramda/es/liftN.js");
/* harmony import */ var _lt_js__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./lt.js */ "./node_modules/ramda/es/lt.js");
/* harmony import */ var _lte_js__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./lte.js */ "./node_modules/ramda/es/lte.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _mapAccum_js__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./mapAccum.js */ "./node_modules/ramda/es/mapAccum.js");
/* harmony import */ var _mapAccumRight_js__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./mapAccumRight.js */ "./node_modules/ramda/es/mapAccumRight.js");
/* harmony import */ var _mapObjIndexed_js__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./mapObjIndexed.js */ "./node_modules/ramda/es/mapObjIndexed.js");
/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./match.js */ "./node_modules/ramda/es/match.js");
/* harmony import */ var _mathMod_js__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./mathMod.js */ "./node_modules/ramda/es/mathMod.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _maxBy_js__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./maxBy.js */ "./node_modules/ramda/es/maxBy.js");
/* harmony import */ var _mean_js__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./mean.js */ "./node_modules/ramda/es/mean.js");
/* harmony import */ var _median_js__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./median.js */ "./node_modules/ramda/es/median.js");
/* harmony import */ var _memoizeWith_js__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./memoizeWith.js */ "./node_modules/ramda/es/memoizeWith.js");
/* harmony import */ var _mergeAll_js__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./mergeAll.js */ "./node_modules/ramda/es/mergeAll.js");
/* harmony import */ var _mergeDeepLeft_js__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./mergeDeepLeft.js */ "./node_modules/ramda/es/mergeDeepLeft.js");
/* harmony import */ var _mergeDeepRight_js__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./mergeDeepRight.js */ "./node_modules/ramda/es/mergeDeepRight.js");
/* harmony import */ var _mergeDeepWith_js__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./mergeDeepWith.js */ "./node_modules/ramda/es/mergeDeepWith.js");
/* harmony import */ var _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./mergeDeepWithKey.js */ "./node_modules/ramda/es/mergeDeepWithKey.js");
/* harmony import */ var _mergeLeft_js__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./mergeLeft.js */ "./node_modules/ramda/es/mergeLeft.js");
/* harmony import */ var _mergeRight_js__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./mergeRight.js */ "./node_modules/ramda/es/mergeRight.js");
/* harmony import */ var _mergeWith_js__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./mergeWith.js */ "./node_modules/ramda/es/mergeWith.js");
/* harmony import */ var _mergeWithKey_js__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./mergeWithKey.js */ "./node_modules/ramda/es/mergeWithKey.js");
/* harmony import */ var _min_js__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./min.js */ "./node_modules/ramda/es/min.js");
/* harmony import */ var _minBy_js__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! ./minBy.js */ "./node_modules/ramda/es/minBy.js");
/* harmony import */ var _modify_js__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! ./modify.js */ "./node_modules/ramda/es/modify.js");
/* harmony import */ var _modifyPath_js__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! ./modifyPath.js */ "./node_modules/ramda/es/modifyPath.js");
/* harmony import */ var _modulo_js__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(/*! ./modulo.js */ "./node_modules/ramda/es/modulo.js");
/* harmony import */ var _move_js__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(/*! ./move.js */ "./node_modules/ramda/es/move.js");
/* harmony import */ var _multiply_js__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(/*! ./multiply.js */ "./node_modules/ramda/es/multiply.js");
/* harmony import */ var _nAry_js__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(/*! ./nAry.js */ "./node_modules/ramda/es/nAry.js");
/* harmony import */ var _partialObject_js__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(/*! ./partialObject.js */ "./node_modules/ramda/es/partialObject.js");
/* harmony import */ var _negate_js__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__(/*! ./negate.js */ "./node_modules/ramda/es/negate.js");
/* harmony import */ var _none_js__WEBPACK_IMPORTED_MODULE_146__ = __webpack_require__(/*! ./none.js */ "./node_modules/ramda/es/none.js");
/* harmony import */ var _not_js__WEBPACK_IMPORTED_MODULE_147__ = __webpack_require__(/*! ./not.js */ "./node_modules/ramda/es/not.js");
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_148__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");
/* harmony import */ var _nthArg_js__WEBPACK_IMPORTED_MODULE_149__ = __webpack_require__(/*! ./nthArg.js */ "./node_modules/ramda/es/nthArg.js");
/* harmony import */ var _o_js__WEBPACK_IMPORTED_MODULE_150__ = __webpack_require__(/*! ./o.js */ "./node_modules/ramda/es/o.js");
/* harmony import */ var _objOf_js__WEBPACK_IMPORTED_MODULE_151__ = __webpack_require__(/*! ./objOf.js */ "./node_modules/ramda/es/objOf.js");
/* harmony import */ var _of_js__WEBPACK_IMPORTED_MODULE_152__ = __webpack_require__(/*! ./of.js */ "./node_modules/ramda/es/of.js");
/* harmony import */ var _omit_js__WEBPACK_IMPORTED_MODULE_153__ = __webpack_require__(/*! ./omit.js */ "./node_modules/ramda/es/omit.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_154__ = __webpack_require__(/*! ./on.js */ "./node_modules/ramda/es/on.js");
/* harmony import */ var _once_js__WEBPACK_IMPORTED_MODULE_155__ = __webpack_require__(/*! ./once.js */ "./node_modules/ramda/es/once.js");
/* harmony import */ var _or_js__WEBPACK_IMPORTED_MODULE_156__ = __webpack_require__(/*! ./or.js */ "./node_modules/ramda/es/or.js");
/* harmony import */ var _otherwise_js__WEBPACK_IMPORTED_MODULE_157__ = __webpack_require__(/*! ./otherwise.js */ "./node_modules/ramda/es/otherwise.js");
/* harmony import */ var _over_js__WEBPACK_IMPORTED_MODULE_158__ = __webpack_require__(/*! ./over.js */ "./node_modules/ramda/es/over.js");
/* harmony import */ var _pair_js__WEBPACK_IMPORTED_MODULE_159__ = __webpack_require__(/*! ./pair.js */ "./node_modules/ramda/es/pair.js");
/* harmony import */ var _partial_js__WEBPACK_IMPORTED_MODULE_160__ = __webpack_require__(/*! ./partial.js */ "./node_modules/ramda/es/partial.js");
/* harmony import */ var _partialRight_js__WEBPACK_IMPORTED_MODULE_161__ = __webpack_require__(/*! ./partialRight.js */ "./node_modules/ramda/es/partialRight.js");
/* harmony import */ var _partition_js__WEBPACK_IMPORTED_MODULE_162__ = __webpack_require__(/*! ./partition.js */ "./node_modules/ramda/es/partition.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_163__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");
/* harmony import */ var _paths_js__WEBPACK_IMPORTED_MODULE_164__ = __webpack_require__(/*! ./paths.js */ "./node_modules/ramda/es/paths.js");
/* harmony import */ var _pathEq_js__WEBPACK_IMPORTED_MODULE_165__ = __webpack_require__(/*! ./pathEq.js */ "./node_modules/ramda/es/pathEq.js");
/* harmony import */ var _pathOr_js__WEBPACK_IMPORTED_MODULE_166__ = __webpack_require__(/*! ./pathOr.js */ "./node_modules/ramda/es/pathOr.js");
/* harmony import */ var _pathSatisfies_js__WEBPACK_IMPORTED_MODULE_167__ = __webpack_require__(/*! ./pathSatisfies.js */ "./node_modules/ramda/es/pathSatisfies.js");
/* harmony import */ var _pick_js__WEBPACK_IMPORTED_MODULE_168__ = __webpack_require__(/*! ./pick.js */ "./node_modules/ramda/es/pick.js");
/* harmony import */ var _pickAll_js__WEBPACK_IMPORTED_MODULE_169__ = __webpack_require__(/*! ./pickAll.js */ "./node_modules/ramda/es/pickAll.js");
/* harmony import */ var _pickBy_js__WEBPACK_IMPORTED_MODULE_170__ = __webpack_require__(/*! ./pickBy.js */ "./node_modules/ramda/es/pickBy.js");
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_171__ = __webpack_require__(/*! ./pipe.js */ "./node_modules/ramda/es/pipe.js");
/* harmony import */ var _pipeWith_js__WEBPACK_IMPORTED_MODULE_172__ = __webpack_require__(/*! ./pipeWith.js */ "./node_modules/ramda/es/pipeWith.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_173__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony import */ var _prepend_js__WEBPACK_IMPORTED_MODULE_174__ = __webpack_require__(/*! ./prepend.js */ "./node_modules/ramda/es/prepend.js");
/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_175__ = __webpack_require__(/*! ./product.js */ "./node_modules/ramda/es/product.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_176__ = __webpack_require__(/*! ./project.js */ "./node_modules/ramda/es/project.js");
/* harmony import */ var _promap_js__WEBPACK_IMPORTED_MODULE_177__ = __webpack_require__(/*! ./promap.js */ "./node_modules/ramda/es/promap.js");
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_178__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");
/* harmony import */ var _propEq_js__WEBPACK_IMPORTED_MODULE_179__ = __webpack_require__(/*! ./propEq.js */ "./node_modules/ramda/es/propEq.js");
/* harmony import */ var _propIs_js__WEBPACK_IMPORTED_MODULE_180__ = __webpack_require__(/*! ./propIs.js */ "./node_modules/ramda/es/propIs.js");
/* harmony import */ var _propOr_js__WEBPACK_IMPORTED_MODULE_181__ = __webpack_require__(/*! ./propOr.js */ "./node_modules/ramda/es/propOr.js");
/* harmony import */ var _propSatisfies_js__WEBPACK_IMPORTED_MODULE_182__ = __webpack_require__(/*! ./propSatisfies.js */ "./node_modules/ramda/es/propSatisfies.js");
/* harmony import */ var _props_js__WEBPACK_IMPORTED_MODULE_183__ = __webpack_require__(/*! ./props.js */ "./node_modules/ramda/es/props.js");
/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_184__ = __webpack_require__(/*! ./range.js */ "./node_modules/ramda/es/range.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_185__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");
/* harmony import */ var _reduceBy_js__WEBPACK_IMPORTED_MODULE_186__ = __webpack_require__(/*! ./reduceBy.js */ "./node_modules/ramda/es/reduceBy.js");
/* harmony import */ var _reduceRight_js__WEBPACK_IMPORTED_MODULE_187__ = __webpack_require__(/*! ./reduceRight.js */ "./node_modules/ramda/es/reduceRight.js");
/* harmony import */ var _reduceWhile_js__WEBPACK_IMPORTED_MODULE_188__ = __webpack_require__(/*! ./reduceWhile.js */ "./node_modules/ramda/es/reduceWhile.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_189__ = __webpack_require__(/*! ./reduced.js */ "./node_modules/ramda/es/reduced.js");
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_190__ = __webpack_require__(/*! ./reject.js */ "./node_modules/ramda/es/reject.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_191__ = __webpack_require__(/*! ./remove.js */ "./node_modules/ramda/es/remove.js");
/* harmony import */ var _repeat_js__WEBPACK_IMPORTED_MODULE_192__ = __webpack_require__(/*! ./repeat.js */ "./node_modules/ramda/es/repeat.js");
/* harmony import */ var _replace_js__WEBPACK_IMPORTED_MODULE_193__ = __webpack_require__(/*! ./replace.js */ "./node_modules/ramda/es/replace.js");
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_194__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/ramda/es/reverse.js");
/* harmony import */ var _scan_js__WEBPACK_IMPORTED_MODULE_195__ = __webpack_require__(/*! ./scan.js */ "./node_modules/ramda/es/scan.js");
/* harmony import */ var _sequence_js__WEBPACK_IMPORTED_MODULE_196__ = __webpack_require__(/*! ./sequence.js */ "./node_modules/ramda/es/sequence.js");
/* harmony import */ var _set_js__WEBPACK_IMPORTED_MODULE_197__ = __webpack_require__(/*! ./set.js */ "./node_modules/ramda/es/set.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_198__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_199__ = __webpack_require__(/*! ./sort.js */ "./node_modules/ramda/es/sort.js");
/* harmony import */ var _sortBy_js__WEBPACK_IMPORTED_MODULE_200__ = __webpack_require__(/*! ./sortBy.js */ "./node_modules/ramda/es/sortBy.js");
/* harmony import */ var _sortWith_js__WEBPACK_IMPORTED_MODULE_201__ = __webpack_require__(/*! ./sortWith.js */ "./node_modules/ramda/es/sortWith.js");
/* harmony import */ var _split_js__WEBPACK_IMPORTED_MODULE_202__ = __webpack_require__(/*! ./split.js */ "./node_modules/ramda/es/split.js");
/* harmony import */ var _splitAt_js__WEBPACK_IMPORTED_MODULE_203__ = __webpack_require__(/*! ./splitAt.js */ "./node_modules/ramda/es/splitAt.js");
/* harmony import */ var _splitEvery_js__WEBPACK_IMPORTED_MODULE_204__ = __webpack_require__(/*! ./splitEvery.js */ "./node_modules/ramda/es/splitEvery.js");
/* harmony import */ var _splitWhen_js__WEBPACK_IMPORTED_MODULE_205__ = __webpack_require__(/*! ./splitWhen.js */ "./node_modules/ramda/es/splitWhen.js");
/* harmony import */ var _splitWhenever_js__WEBPACK_IMPORTED_MODULE_206__ = __webpack_require__(/*! ./splitWhenever.js */ "./node_modules/ramda/es/splitWhenever.js");
/* harmony import */ var _startsWith_js__WEBPACK_IMPORTED_MODULE_207__ = __webpack_require__(/*! ./startsWith.js */ "./node_modules/ramda/es/startsWith.js");
/* harmony import */ var _subtract_js__WEBPACK_IMPORTED_MODULE_208__ = __webpack_require__(/*! ./subtract.js */ "./node_modules/ramda/es/subtract.js");
/* harmony import */ var _sum_js__WEBPACK_IMPORTED_MODULE_209__ = __webpack_require__(/*! ./sum.js */ "./node_modules/ramda/es/sum.js");
/* harmony import */ var _symmetricDifference_js__WEBPACK_IMPORTED_MODULE_210__ = __webpack_require__(/*! ./symmetricDifference.js */ "./node_modules/ramda/es/symmetricDifference.js");
/* harmony import */ var _symmetricDifferenceWith_js__WEBPACK_IMPORTED_MODULE_211__ = __webpack_require__(/*! ./symmetricDifferenceWith.js */ "./node_modules/ramda/es/symmetricDifferenceWith.js");
/* harmony import */ var _tail_js__WEBPACK_IMPORTED_MODULE_212__ = __webpack_require__(/*! ./tail.js */ "./node_modules/ramda/es/tail.js");
/* harmony import */ var _take_js__WEBPACK_IMPORTED_MODULE_213__ = __webpack_require__(/*! ./take.js */ "./node_modules/ramda/es/take.js");
/* harmony import */ var _takeLast_js__WEBPACK_IMPORTED_MODULE_214__ = __webpack_require__(/*! ./takeLast.js */ "./node_modules/ramda/es/takeLast.js");
/* harmony import */ var _takeLastWhile_js__WEBPACK_IMPORTED_MODULE_215__ = __webpack_require__(/*! ./takeLastWhile.js */ "./node_modules/ramda/es/takeLastWhile.js");
/* harmony import */ var _takeWhile_js__WEBPACK_IMPORTED_MODULE_216__ = __webpack_require__(/*! ./takeWhile.js */ "./node_modules/ramda/es/takeWhile.js");
/* harmony import */ var _tap_js__WEBPACK_IMPORTED_MODULE_217__ = __webpack_require__(/*! ./tap.js */ "./node_modules/ramda/es/tap.js");
/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_218__ = __webpack_require__(/*! ./test.js */ "./node_modules/ramda/es/test.js");
/* harmony import */ var _andThen_js__WEBPACK_IMPORTED_MODULE_219__ = __webpack_require__(/*! ./andThen.js */ "./node_modules/ramda/es/andThen.js");
/* harmony import */ var _times_js__WEBPACK_IMPORTED_MODULE_220__ = __webpack_require__(/*! ./times.js */ "./node_modules/ramda/es/times.js");
/* harmony import */ var _toLower_js__WEBPACK_IMPORTED_MODULE_221__ = __webpack_require__(/*! ./toLower.js */ "./node_modules/ramda/es/toLower.js");
/* harmony import */ var _toPairs_js__WEBPACK_IMPORTED_MODULE_222__ = __webpack_require__(/*! ./toPairs.js */ "./node_modules/ramda/es/toPairs.js");
/* harmony import */ var _toPairsIn_js__WEBPACK_IMPORTED_MODULE_223__ = __webpack_require__(/*! ./toPairsIn.js */ "./node_modules/ramda/es/toPairsIn.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_224__ = __webpack_require__(/*! ./toString.js */ "./node_modules/ramda/es/toString.js");
/* harmony import */ var _toUpper_js__WEBPACK_IMPORTED_MODULE_225__ = __webpack_require__(/*! ./toUpper.js */ "./node_modules/ramda/es/toUpper.js");
/* harmony import */ var _transduce_js__WEBPACK_IMPORTED_MODULE_226__ = __webpack_require__(/*! ./transduce.js */ "./node_modules/ramda/es/transduce.js");
/* harmony import */ var _transpose_js__WEBPACK_IMPORTED_MODULE_227__ = __webpack_require__(/*! ./transpose.js */ "./node_modules/ramda/es/transpose.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_228__ = __webpack_require__(/*! ./traverse.js */ "./node_modules/ramda/es/traverse.js");
/* harmony import */ var _trim_js__WEBPACK_IMPORTED_MODULE_229__ = __webpack_require__(/*! ./trim.js */ "./node_modules/ramda/es/trim.js");
/* harmony import */ var _tryCatch_js__WEBPACK_IMPORTED_MODULE_230__ = __webpack_require__(/*! ./tryCatch.js */ "./node_modules/ramda/es/tryCatch.js");
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_231__ = __webpack_require__(/*! ./type.js */ "./node_modules/ramda/es/type.js");
/* harmony import */ var _unapply_js__WEBPACK_IMPORTED_MODULE_232__ = __webpack_require__(/*! ./unapply.js */ "./node_modules/ramda/es/unapply.js");
/* harmony import */ var _unary_js__WEBPACK_IMPORTED_MODULE_233__ = __webpack_require__(/*! ./unary.js */ "./node_modules/ramda/es/unary.js");
/* harmony import */ var _uncurryN_js__WEBPACK_IMPORTED_MODULE_234__ = __webpack_require__(/*! ./uncurryN.js */ "./node_modules/ramda/es/uncurryN.js");
/* harmony import */ var _unfold_js__WEBPACK_IMPORTED_MODULE_235__ = __webpack_require__(/*! ./unfold.js */ "./node_modules/ramda/es/unfold.js");
/* harmony import */ var _union_js__WEBPACK_IMPORTED_MODULE_236__ = __webpack_require__(/*! ./union.js */ "./node_modules/ramda/es/union.js");
/* harmony import */ var _unionWith_js__WEBPACK_IMPORTED_MODULE_237__ = __webpack_require__(/*! ./unionWith.js */ "./node_modules/ramda/es/unionWith.js");
/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_238__ = __webpack_require__(/*! ./uniq.js */ "./node_modules/ramda/es/uniq.js");
/* harmony import */ var _uniqBy_js__WEBPACK_IMPORTED_MODULE_239__ = __webpack_require__(/*! ./uniqBy.js */ "./node_modules/ramda/es/uniqBy.js");
/* harmony import */ var _uniqWith_js__WEBPACK_IMPORTED_MODULE_240__ = __webpack_require__(/*! ./uniqWith.js */ "./node_modules/ramda/es/uniqWith.js");
/* harmony import */ var _unless_js__WEBPACK_IMPORTED_MODULE_241__ = __webpack_require__(/*! ./unless.js */ "./node_modules/ramda/es/unless.js");
/* harmony import */ var _unnest_js__WEBPACK_IMPORTED_MODULE_242__ = __webpack_require__(/*! ./unnest.js */ "./node_modules/ramda/es/unnest.js");
/* harmony import */ var _until_js__WEBPACK_IMPORTED_MODULE_243__ = __webpack_require__(/*! ./until.js */ "./node_modules/ramda/es/until.js");
/* harmony import */ var _unwind_js__WEBPACK_IMPORTED_MODULE_244__ = __webpack_require__(/*! ./unwind.js */ "./node_modules/ramda/es/unwind.js");
/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_245__ = __webpack_require__(/*! ./update.js */ "./node_modules/ramda/es/update.js");
/* harmony import */ var _useWith_js__WEBPACK_IMPORTED_MODULE_246__ = __webpack_require__(/*! ./useWith.js */ "./node_modules/ramda/es/useWith.js");
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_247__ = __webpack_require__(/*! ./values.js */ "./node_modules/ramda/es/values.js");
/* harmony import */ var _valuesIn_js__WEBPACK_IMPORTED_MODULE_248__ = __webpack_require__(/*! ./valuesIn.js */ "./node_modules/ramda/es/valuesIn.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_249__ = __webpack_require__(/*! ./view.js */ "./node_modules/ramda/es/view.js");
/* harmony import */ var _when_js__WEBPACK_IMPORTED_MODULE_250__ = __webpack_require__(/*! ./when.js */ "./node_modules/ramda/es/when.js");
/* harmony import */ var _where_js__WEBPACK_IMPORTED_MODULE_251__ = __webpack_require__(/*! ./where.js */ "./node_modules/ramda/es/where.js");
/* harmony import */ var _whereAny_js__WEBPACK_IMPORTED_MODULE_252__ = __webpack_require__(/*! ./whereAny.js */ "./node_modules/ramda/es/whereAny.js");
/* harmony import */ var _whereEq_js__WEBPACK_IMPORTED_MODULE_253__ = __webpack_require__(/*! ./whereEq.js */ "./node_modules/ramda/es/whereEq.js");
/* harmony import */ var _without_js__WEBPACK_IMPORTED_MODULE_254__ = __webpack_require__(/*! ./without.js */ "./node_modules/ramda/es/without.js");
/* harmony import */ var _xor_js__WEBPACK_IMPORTED_MODULE_255__ = __webpack_require__(/*! ./xor.js */ "./node_modules/ramda/es/xor.js");
/* harmony import */ var _xprod_js__WEBPACK_IMPORTED_MODULE_256__ = __webpack_require__(/*! ./xprod.js */ "./node_modules/ramda/es/xprod.js");
/* harmony import */ var _zip_js__WEBPACK_IMPORTED_MODULE_257__ = __webpack_require__(/*! ./zip.js */ "./node_modules/ramda/es/zip.js");
/* harmony import */ var _zipObj_js__WEBPACK_IMPORTED_MODULE_258__ = __webpack_require__(/*! ./zipObj.js */ "./node_modules/ramda/es/zipObj.js");
/* harmony import */ var _zipWith_js__WEBPACK_IMPORTED_MODULE_259__ = __webpack_require__(/*! ./zipWith.js */ "./node_modules/ramda/es/zipWith.js");
/* harmony import */ var _thunkify_js__WEBPACK_IMPORTED_MODULE_260__ = __webpack_require__(/*! ./thunkify.js */ "./node_modules/ramda/es/thunkify.js");






































































































































































































































































/***/ }),

/***/ "./node_modules/ramda/es/indexBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/indexBy.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reduceBy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reduceBy.js */ "./node_modules/ramda/es/reduceBy.js");

/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx a => (b -> a) -> [b] -> {a: b}
 * @param {Function} fn Function :: a -> Idx
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @see R.groupBy
 * @example
 *
 *      const list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */

var indexBy =
/*#__PURE__*/
(0,_reduceBy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (acc, elem) {
  return elem;
}, null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (indexBy);

/***/ }),

/***/ "./node_modules/ramda/es/indexOf.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/indexOf.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_indexOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_indexOf.js */ "./node_modules/ramda/es/internal/_indexOf.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");



/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf, R.findIndex
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */

var indexOf =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !(0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(xs) ? xs.indexOf(target) : (0,_internal_indexOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(xs, target, 0);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (indexOf);

/***/ }),

/***/ "./node_modules/ramda/es/init.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/init.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");

/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */

var init =
/*#__PURE__*/
(0,_slice_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0, -1);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);

/***/ }),

/***/ "./node_modules/ramda/es/innerJoin.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/innerJoin.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includesWith.js */ "./node_modules/ramda/es/internal/_includesWith.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_filter.js */ "./node_modules/ramda/es/internal/_filter.js");



/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 *
 * `pred` must be a binary function expecting an element from each list.
 *
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Relation
 * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]
 * @param {Function} pred
 * @param {Array} xs
 * @param {Array} ys
 * @return {Array}
 * @see R.intersection
 * @example
 *
 *      R.innerJoin(
 *        (record, id) => record.id === id,
 *        [{id: 824, name: 'Richie Furay'},
 *         {id: 956, name: 'Dewey Martin'},
 *         {id: 313, name: 'Bruce Palmer'},
 *         {id: 456, name: 'Stephen Stills'},
 *         {id: 177, name: 'Neil Young'}],
 *        [177, 456, 999]
 *      );
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */

var innerJoin =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function innerJoin(pred, xs, ys) {
  return (0,_internal_filter_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (x) {
    return (0,_internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pred, x, ys);
  }, xs);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (innerJoin);

/***/ }),

/***/ "./node_modules/ramda/es/insert.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/insert.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that

 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */

var insert =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (insert);

/***/ }),

/***/ "./node_modules/ramda/es/insertAll.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/insertAll.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */

var insertAll =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (insertAll);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_Set.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_Set.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_includes.js */ "./node_modules/ramda/es/internal/_includes.js");


var _Set =
/*#__PURE__*/
function () {
  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  }

  // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //
  _Set.prototype.add = function (item) {
    return !hasOrAdd(item, true, this);
  }; //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //


  _Set.prototype.has = function (item) {
    return hasOrAdd(item, false, this);
  }; //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //


  return _Set;
}();

function hasOrAdd(item, shouldAdd, set) {
  var type = typeof item;
  var prevSize, newSize;

  switch (type) {
    case 'string':
    case 'number':
      // distinguish between +0 and -0
      if (item === 0 && 1 / item === -Infinity) {
        if (set._items['-0']) {
          return true;
        } else {
          if (shouldAdd) {
            set._items['-0'] = true;
          }

          return false;
        }
      } // these types can all utilise the native Set


      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;

          set._nativeSet.add(item);

          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = {};
            set._items[type][item] = true;
          }

          return false;
        } else if (item in set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][item] = true;
          }

          return false;
        }
      }

    case 'boolean':
      // set._items['boolean'] holds a two element array
      // representing [ falseExists, trueExists ]
      if (type in set._items) {
        var bIdx = item ? 1 : 0;

        if (set._items[type][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][bIdx] = true;
          }

          return false;
        }
      } else {
        if (shouldAdd) {
          set._items[type] = item ? [false, true] : [true, false];
        }

        return false;
      }

    case 'function':
      // compare functions for reference equality
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;

          set._nativeSet.add(item);

          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }

          return false;
        }

        if (!(0,_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }

          return false;
        }

        return true;
      }

    case 'undefined':
      if (set._items[type]) {
        return true;
      } else {
        if (shouldAdd) {
          set._items[type] = true;
        }

        return false;
      }

    case 'object':
      if (item === null) {
        if (!set._items['null']) {
          if (shouldAdd) {
            set._items['null'] = true;
          }

          return false;
        }

        return true;
      }

    /* falls through */

    default:
      // reduce the search size of heterogeneous sets by creating buckets
      // for each type.
      type = Object.prototype.toString.call(item);

      if (!(type in set._items)) {
        if (shouldAdd) {
          set._items[type] = [item];
        }

        return false;
      } // scan through all previously applied items


      if (!(0,_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }

        return false;
      }

      return true;
  }
} // A simple Set type that honours R.equals semantics


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Set);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_aperture.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_aperture.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _aperture)
/* harmony export */ });
function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);

  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }

  return acc;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_arity.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_arity.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arity)
/* harmony export */ });
function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_arrayFromIterator.js":
/*!**************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_arrayFromIterator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayFromIterator)
/* harmony export */ });
function _arrayFromIterator(iter) {
  var list = [];
  var next;

  while (!(next = iter.next()).done) {
    list.push(next.value);
  }

  return list;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_assertPromise.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_assertPromise.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertPromise)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_toString.js */ "./node_modules/ramda/es/internal/_toString.js");


function _assertPromise(name, p) {
  if (p == null || !(0,_isFunction_js__WEBPACK_IMPORTED_MODULE_0__["default"])(p.then)) {
    throw new TypeError('`' + name + '` expected a Promise, received ' + (0,_toString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p, []));
  }
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_assoc.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_assoc.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assoc)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");


/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @private
 * @param {String|Number} prop The property name to set
 * @param {*} val The new value
 * @param {Object|Array} obj The object to clone
 * @return {Object|Array} A new object equivalent to the original except for the changed property.
 */

function _assoc(prop, val, obj) {
  if ((0,_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop) && (0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj)) {
    var arr = [].concat(obj);
    arr[prop] = val;
    return arr;
  }

  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  result[prop] = val;
  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_checkForMethod.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_checkForMethod.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _checkForMethod)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implementation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */

function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;

    if (length === 0) {
      return fn();
    }

    var obj = arguments[length - 1];
    return (0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_clone.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_clone.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _clone)
/* harmony export */ });
/* harmony import */ var _cloneRegExp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cloneRegExp.js */ "./node_modules/ramda/es/internal/_cloneRegExp.js");
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type.js */ "./node_modules/ramda/es/type.js");


/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */

function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;

    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }

      idx += 1;
    }

    refFrom[idx] = value;
    refTo[idx] = copiedValue;

    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
      }
    }

    return copiedValue;
  };

  switch ((0,_type_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value)) {
    case 'Object':
      return copy(Object.create(Object.getPrototypeOf(value)));

    case 'Array':
      return copy([]);

    case 'Date':
      return new Date(value.valueOf());

    case 'RegExp':
      return (0,_cloneRegExp_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value);

    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'BigInt64Array':
    case 'BigUint64Array':
      return value.slice();

    default:
      return value;
  }
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_cloneRegExp.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_cloneRegExp.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _cloneRegExp)
/* harmony export */ });
function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_complement.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_complement.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _complement)
/* harmony export */ });
function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_concat.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_concat.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _concat)
/* harmony export */ });
/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];
  idx = 0;

  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }

  idx = 0;

  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }

  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_createPartialApplicator.js":
/*!********************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_createPartialApplicator.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createPartialApplicator)
/* harmony export */ });
/* harmony import */ var _arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


function _createPartialApplicator(concat) {
  return (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (fn, args) {
    return (0,_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry1.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry1.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curry1)
/* harmony export */ });
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry2.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry2.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curry2)
/* harmony export */ });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a) ? f2 : (0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_b) {
          return fn(a, _b);
        });

      default:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b) ? f2 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_a) {
          return fn(_a, b);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry3.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry3.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curry3)
/* harmony export */ });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");



/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) ? f3 : (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) ? f3 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a, _c) {
          return fn(_a, b, _c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b, _c) {
          return fn(a, _b, _c);
        }) : (0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(c) ? f3 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a, _b) {
          return fn(_a, _b, c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(c) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a, _c) {
          return fn(_a, b, _c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(c) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b, _c) {
          return fn(a, _b, _c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_a) {
          return fn(_a, b, c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_b) {
          return fn(a, _b, c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(c) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curryN.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curryN.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curryN)
/* harmony export */ });
/* harmony import */ var _arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;

    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;

      if (combinedIdx < received.length && (!(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }

      combined[combinedIdx] = result;

      if (!(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result)) {
        left -= 1;
      }

      combinedIdx += 1;
    }

    return left <= 0 ? fn.apply(this, combined) : (0,_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(left, _curryN(length, combined, fn));
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dispatchable.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dispatchable.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _dispatchable)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _isTransformer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isTransformer.js */ "./node_modules/ramda/es/internal/_isTransformer.js");


/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer created by [transducerCreator] to return a new transformer
 * (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} transducerCreator transducer factory if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */

function _dispatchable(methodNames, transducerCreator, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }

    var obj = arguments[arguments.length - 1];

    if (!(0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj)) {
      var idx = 0;

      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }

        idx += 1;
      }

      if ((0,_isTransformer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }

    return fn.apply(this, arguments);
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dissoc.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dissoc.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _dissoc)
/* harmony export */ });
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../remove.js */ "./node_modules/ramda/es/remove.js");



/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @private
 * @param {String|Number} prop The name of the property to dissociate
 * @param {Object|Array} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 */

function _dissoc(prop, obj) {
  if (obj == null) {
    return obj;
  }

  if ((0,_isInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(prop) && (0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj)) {
    return (0,_remove_js__WEBPACK_IMPORTED_MODULE_2__["default"])(prop, 1, obj);
  }

  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  delete result[prop];
  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dropLast.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dropLast.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dropLast)
/* harmony export */ });
/* harmony import */ var _take_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../take.js */ "./node_modules/ramda/es/take.js");

function dropLast(n, xs) {
  return (0,_take_js__WEBPACK_IMPORTED_MODULE_0__["default"])(n < xs.length ? xs.length - n : 0, xs);
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dropLastWhile.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dropLastWhile.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dropLastWhile)
/* harmony export */ });
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slice.js */ "./node_modules/ramda/es/slice.js");

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;

  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }

  return (0,_slice_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0, idx + 1, xs);
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_equals.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_equals.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _equals)
/* harmony export */ });
/* harmony import */ var _arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arrayFromIterator.js */ "./node_modules/ramda/es/internal/_arrayFromIterator.js");
/* harmony import */ var _includesWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_includesWith.js */ "./node_modules/ramda/es/internal/_includesWith.js");
/* harmony import */ var _functionName_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_functionName.js */ "./node_modules/ramda/es/internal/_functionName.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _objectIs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_objectIs.js */ "./node_modules/ramda/es/internal/_objectIs.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../keys.js */ "./node_modules/ramda/es/keys.js");
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../type.js */ "./node_modules/ramda/es/type.js");







/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparison of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = (0,_arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(aIterator);

  var b = (0,_arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  } // if *a* array contains any element that is not included in *b*


  return !(0,_includesWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (b, aItem) {
    return !(0,_includesWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if ((0,_objectIs_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a, b)) {
    return true;
  }

  var typeA = (0,_type_js__WEBPACK_IMPORTED_MODULE_6__["default"])(a);

  if (typeA !== (0,_type_js__WEBPACK_IMPORTED_MODULE_6__["default"])(b)) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && (0,_functionName_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a.constructor) === 'Promise') {
        return a === b;
      }

      break;

    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && (0,_objectIs_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a.valueOf(), b.valueOf()))) {
        return false;
      }

      break;

    case 'Date':
      if (!(0,_objectIs_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a.valueOf(), b.valueOf())) {
        return false;
      }

      break;

    case 'Error':
      return a.name === b.name && a.message === b.message;

    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }

      break;
  }

  var idx = stackA.length - 1;

  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }

    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));

    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));

    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;

    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__["default"])(a);

  if (keysA.length !== (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__["default"])(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;

  while (idx >= 0) {
    var key = keysA[idx];

    if (!((0,_has_js__WEBPACK_IMPORTED_MODULE_3__["default"])(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }

    idx -= 1;
  }

  return true;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_filter.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_filter.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _filter)
/* harmony export */ });
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }

    idx += 1;
  }

  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_flatCat.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_flatCat.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _forceReduced_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_forceReduced.js */ "./node_modules/ramda/es/internal/_forceReduced.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/ramda/es/internal/_isArrayLike.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");





var preservingReduced = function (xf) {
  return {
    '@@transducer/init': _xfBase_js__WEBPACK_IMPORTED_MODULE_3__["default"].init,
    '@@transducer/result': function (result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? (0,_forceReduced_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ret) : ret;
    }
  };
};

var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase_js__WEBPACK_IMPORTED_MODULE_3__["default"].init,
    '@@transducer/result': function (result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      return !(0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__["default"])(input) ? (0,_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(rxf, result, [input]) : (0,_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(rxf, result, input);
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_flatCat);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_forceReduced.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_forceReduced.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _forceReduced)
/* harmony export */ });
function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_functionName.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_functionName.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _functionName)
/* harmony export */ });
function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_has.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_has.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _has)
/* harmony export */ });
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_identity.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_identity.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _identity)
/* harmony export */ });
function _identity(x) {
  return x;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_includes.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_includes.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _includes)
/* harmony export */ });
/* harmony import */ var _indexOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_indexOf.js */ "./node_modules/ramda/es/internal/_indexOf.js");

function _includes(a, list) {
  return (0,_indexOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list, a, 0) >= 0;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_includesWith.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_includesWith.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _includesWith)
/* harmony export */ });
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_indexOf.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_indexOf.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _indexOf)
/* harmony export */ });
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../equals.js */ "./node_modules/ramda/es/equals.js");

function _indexOf(list, a, idx) {
  var inf, item; // Array.prototype.indexOf doesn't exist below IE9

  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;

          while (idx < list.length) {
            item = list[idx];

            if (item === 0 && 1 / item === inf) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];

            if (typeof item === 'number' && item !== item) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } // non-zero numbers can utilise Set


        return list.indexOf(a, idx);
      // all these types can utilise Set

      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }

    }
  } // anything else not covered above, defer to R.equals


  while (idx < list.length) {
    if ((0,_equals_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list[idx], a)) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArguments.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArguments.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_has.js */ "./node_modules/ramda/es/internal/_has.js");

var toString = Object.prototype.toString;

var _isArguments =
/*#__PURE__*/
function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return (0,_has_js__WEBPACK_IMPORTED_MODULE_0__["default"])('callee', x);
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isArguments);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArray.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArray.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
});

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArrayLike.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArrayLike.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isString.js */ "./node_modules/ramda/es/internal/_isString.js");



/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 *      _isArrayLike({nodeType: 1, length: 1}) // => false
 */

var _isArrayLike =
/*#__PURE__*/
(0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function isArrayLike(x) {
  if ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x)) {
    return true;
  }

  if (!x) {
    return false;
  }

  if (typeof x !== 'object') {
    return false;
  }

  if ((0,_isString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x)) {
    return false;
  }

  if (x.length === 0) {
    return true;
  }

  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }

  return false;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isArrayLike);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isFunction.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isFunction.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isFunction)
/* harmony export */ });
function _isFunction(x) {
  var type = Object.prototype.toString.call(x);
  return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object AsyncGeneratorFunction]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isInteger.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isInteger.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
});

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isNumber.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isNumber.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNumber)
/* harmony export */ });
function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isObject.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isObject)
/* harmony export */ });
function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isPlaceholder.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isPlaceholder.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isPlaceholder)
/* harmony export */ });
function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isRegExp.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isRegExp.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isRegExp)
/* harmony export */ });
function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isString.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isString.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isString)
/* harmony export */ });
function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isTransformer.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isTransformer.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isTransformer)
/* harmony export */ });
function _isTransformer(obj) {
  return obj != null && typeof obj['@@transducer/step'] === 'function';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isTypedArray.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isTypedArray.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isTypedArray)
/* harmony export */ });
/**
 * Tests whether or not an object is a typed array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is a typed array, `false` otherwise.
 * @example
 *
 *      _isTypedArray(new Uint8Array([])); //=> true
 *      _isTypedArray(new Float32Array([])); //=> true
 *      _isTypedArray([]); //=> false
 *      _isTypedArray(null); //=> false
 *      _isTypedArray({}); //=> false
 */
function _isTypedArray(val) {
  var type = Object.prototype.toString.call(val);
  return type === '[object Uint8ClampedArray]' || type === '[object Int8Array]' || type === '[object Uint8Array]' || type === '[object Int16Array]' || type === '[object Uint16Array]' || type === '[object Int32Array]' || type === '[object Uint32Array]' || type === '[object Float32Array]' || type === '[object Float64Array]' || type === '[object BigInt64Array]' || type === '[object BigUint64Array]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_makeFlat.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_makeFlat.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _makeFlat)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/ramda/es/internal/_isArrayLike.js");

/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */

function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;

        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }

      idx += 1;
    }

    return result;
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_map.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_map.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _map)
/* harmony export */ });
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);

  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }

  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_modify.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_modify.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _modify)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");


/**
 * Makes a shallow clone of an object, applying the given fn to the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @private
 * @param {String|Number} prop The property name to set
 * @param {Function} fn The function to apply to the property
 * @param {Object|Array} obj The object to clone
 * @return {Object|Array} A new object equivalent to the original except for the changed property.
 */

function _modify(prop, fn, obj) {
  if ((0,_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop) && (0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj)) {
    var arr = [].concat(obj);
    arr[prop] = fn(arr[prop]);
    return arr;
  }

  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  result[prop] = fn(result[prop]);
  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_objectAssign.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_objectAssign.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_has.js */ "./node_modules/ramda/es/internal/_has.js");
 // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;

  while (idx < length) {
    var source = arguments[idx];

    if (source != null) {
      for (var nextKey in source) {
        if ((0,_has_js__WEBPACK_IMPORTED_MODULE_0__["default"])(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }

    idx += 1;
  }

  return output;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof Object.assign === 'function' ? Object.assign : _objectAssign);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_objectIs.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_objectIs.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function _objectIs(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof Object.is === 'function' ? Object.is : _objectIs);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_of.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/internal/_of.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _of)
/* harmony export */ });
function _of(x) {
  return [x];
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_pipe.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_pipe.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _pipe)
/* harmony export */ });
function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_promap.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_promap.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _promap)
/* harmony export */ });
function _promap(f, g, profunctor) {
  return function (x) {
    return g(profunctor(f(x)));
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_quote.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_quote.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _quote)
/* harmony export */ });
function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_reduce.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_reduce.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _reduce)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/ramda/es/internal/_isArrayLike.js");
/* harmony import */ var _xwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xwrap.js */ "./node_modules/ramda/es/internal/_xwrap.js");
/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bind.js */ "./node_modules/ramda/es/bind.js");




function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    idx += 1;
  }

  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();

  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    step = iter.next();
  }

  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName]((0,_bind_js__WEBPACK_IMPORTED_MODULE_2__["default"])(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = (0,_xwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn);
  }

  if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list)) {
    return _arrayReduce(fn, acc, list);
  }

  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }

  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }

  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }

  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_reduced.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_reduced.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _reduced)
/* harmony export */ });
function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_stepCat.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_stepCat.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _stepCat)
/* harmony export */ });
/* harmony import */ var _objectAssign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_objectAssign.js */ "./node_modules/ramda/es/internal/_objectAssign.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_identity.js */ "./node_modules/ramda/es/internal/_identity.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/ramda/es/internal/_isArrayLike.js");
/* harmony import */ var _isTransformer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_isTransformer.js */ "./node_modules/ramda/es/internal/_isTransformer.js");
/* harmony import */ var _objOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../objOf.js */ "./node_modules/ramda/es/objOf.js");





var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function (xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function (a, b) {
    return a + b;
  },
  '@@transducer/result': _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function (result, input) {
    return (0,_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__["default"])(result, (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_2__["default"])(input) ? (0,_objOf_js__WEBPACK_IMPORTED_MODULE_4__["default"])(input[0], input[1]) : input);
  },
  '@@transducer/result': _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};
function _stepCat(obj) {
  if ((0,_isTransformer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(obj)) {
    return obj;
  }

  if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj)) {
    return _stepCatArray;
  }

  if (typeof obj === 'string') {
    return _stepCatString;
  }

  if (typeof obj === 'object') {
    return _stepCatObject;
  }

  throw new Error('Cannot create transformer for ' + obj);
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_toISOString.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_toISOString.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_toISOString);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_toString.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_toString.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toString)
/* harmony export */ });
/* harmony import */ var _includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_includes.js */ "./node_modules/ramda/es/internal/_includes.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _quote_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_quote.js */ "./node_modules/ramda/es/internal/_quote.js");
/* harmony import */ var _toISOString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_toISOString.js */ "./node_modules/ramda/es/internal/_toISOString.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../keys.js */ "./node_modules/ramda/es/keys.js");
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reject.js */ "./node_modules/ramda/es/reject.js");






function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return (0,_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(y, xs) ? '<Circular>' : _toString(y, xs);
  }; //  mapPairs :: (Object, [String]) -> [String]


  var mapPairs = function (obj, keys) {
    return (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (k) {
      return (0,_quote_js__WEBPACK_IMPORTED_MODULE_2__["default"])(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(recur, x).join(', ') + '))';

    case '[object Array]':
      return '[' + (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(recur, x).concat(mapPairs(x, (0,_reject_js__WEBPACK_IMPORTED_MODULE_5__["default"])(function (k) {
        return /^\d+$/.test(k);
      }, (0,_keys_js__WEBPACK_IMPORTED_MODULE_4__["default"])(x)))).join(', ') + ']';

    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();

    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : (0,_quote_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_toISOString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(x))) + ')';

    case '[object Null]':
      return 'null';

    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);

    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : (0,_quote_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x);

    case '[object Undefined]':
      return 'undefined';

    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();

        if (repr !== '[object Object]') {
          return repr;
        }
      }

      return '{' + mapPairs(x, (0,_keys_js__WEBPACK_IMPORTED_MODULE_4__["default"])(x)).join(', ') + '}';
  }
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xall.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xall.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XAll =
/*#__PURE__*/
function () {
  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }

  XAll.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }

    return this.xf['@@transducer/result'](result);
  };

  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = (0,_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'](result, false));
    }

    return result;
  };

  return XAll;
}();

var _xall =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xall(f, xf) {
  return new XAll(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xall);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xany.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xany.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XAny =
/*#__PURE__*/
function () {
  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }

  XAny.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XAny.prototype['@@transducer/result'] = function (result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }

    return this.xf['@@transducer/result'](result);
  };

  XAny.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.any = true;
      result = (0,_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'](result, true));
    }

    return result;
  };

  return XAny;
}();

var _xany =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xany(f, xf) {
  return new XAny(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xany);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xaperture.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xaperture.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XAperture =
/*#__PURE__*/
function () {
  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }

  XAperture.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XAperture.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };

  XAperture.prototype['@@transducer/step'] = function (result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };

  XAperture.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;

    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  XAperture.prototype.getCopy = function () {
    return (0,_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return XAperture;
}();

var _xaperture =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function _xaperture(n, xf) {
  return new XAperture(n, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xaperture);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xchain.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xchain.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _flatCat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_flatCat.js */ "./node_modules/ramda/es/internal/_flatCat.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../map.js */ "./node_modules/ramda/es/map.js");




var _xchain =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xchain(f, xf) {
  return (0,_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(f, (0,_flatCat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(xf));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xchain);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdrop.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdrop.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XDrop =
/*#__PURE__*/
function () {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }

  XDrop.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XDrop.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

var _xdrop =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xdrop(n, xf) {
  return new XDrop(n, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xdrop);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropLast.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropLast.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XDropLast =
/*#__PURE__*/
function () {
  function XDropLast(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }

  XDropLast.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;

  XDropLast.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };

  XDropLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }

    this.store(input);
    return result;
  };

  XDropLast.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;

    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return XDropLast;
}();

var _xdropLast =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xdropLast(n, xf) {
  return new XDropLast(n, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xdropLast);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropLastWhile.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropLastWhile.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XDropLastWhile =
/*#__PURE__*/
function () {
  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }

  XDropLastWhile.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XDropLastWhile.prototype['@@transducer/result'] = function (result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };

  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };

  XDropLastWhile.prototype.flush = function (result, input) {
    result = (0,_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'], result, this.retained);
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };

  XDropLastWhile.prototype.retain = function (result, input) {
    this.retained.push(input);
    return result;
  };

  return XDropLastWhile;
}();

var _xdropLastWhile =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xdropLastWhile(fn, xf) {
  return new XDropLastWhile(fn, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xdropLastWhile);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropRepeatsWith.js":
/*!*************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropRepeatsWith.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XDropRepeatsWith =
/*#__PURE__*/
function () {
  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
    var sameAsLast = false;

    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }

    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return XDropRepeatsWith;
}();

var _xdropRepeatsWith =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xdropRepeatsWith(pred, xf) {
  return new XDropRepeatsWith(pred, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xdropRepeatsWith);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropWhile.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropWhile.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XDropWhile =
/*#__PURE__*/
function () {
  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XDropWhile.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XDropWhile.prototype['@@transducer/step'] = function (result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }

      this.f = null;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDropWhile;
}();

var _xdropWhile =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xdropWhile(f, xf) {
  return new XDropWhile(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xdropWhile);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfBase.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfBase.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
});

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfilter.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfilter.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XFilter =
/*#__PURE__*/
function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFilter.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XFilter.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xfilter);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfind.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfind.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XFind =
/*#__PURE__*/
function () {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }

  XFind.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = (0,_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'](result, input));
    }

    return result;
  };

  return XFind;
}();

var _xfind =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xfind(f, xf) {
  return new XFind(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xfind);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfindIndex.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfindIndex.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XFindIndex =
/*#__PURE__*/
function () {
  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }

  XFindIndex.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.found = true;
      result = (0,_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'](result, this.idx));
    }

    return result;
  };

  return XFindIndex;
}();

var _xfindIndex =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xfindIndex(f, xf) {
  return new XFindIndex(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xfindIndex);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfindLast.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfindLast.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XFindLast =
/*#__PURE__*/
function () {
  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFindLast.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;

  XFindLast.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };

  XFindLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.last = input;
    }

    return result;
  };

  return XFindLast;
}();

var _xfindLast =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xfindLast(f, xf) {
  return new XFindLast(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xfindLast);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfindLastIndex.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfindLastIndex.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XFindLastIndex =
/*#__PURE__*/
function () {
  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }

  XFindLastIndex.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;

  XFindLastIndex.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };

  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.lastIdx = this.idx;
    }

    return result;
  };

  return XFindLastIndex;
}();

var _xfindLastIndex =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xfindLastIndex(f, xf) {
  return new XFindLastIndex(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xfindLastIndex);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xmap.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xmap.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XMap =
/*#__PURE__*/
function () {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XMap.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XMap.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xmap(f, xf) {
  return new XMap(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xmap);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xpromap.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xpromap.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");
/* harmony import */ var _promap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_promap.js */ "./node_modules/ramda/es/internal/_promap.js");




var XPromap =
/*#__PURE__*/
function () {
  function XPromap(f, g, xf) {
    this.xf = xf;
    this.f = f;
    this.g = g;
  }

  XPromap.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XPromap.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XPromap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, (0,_promap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.f, this.g, input));
  };

  return XPromap;
}();

var _xpromap =
/*#__PURE__*/
(0,_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xpromap(f, g, xf) {
  return new XPromap(f, g, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xpromap);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xreduceBy.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xreduceBy.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XReduceBy =
/*#__PURE__*/
function () {
  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }

  XReduceBy.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XReduceBy.prototype['@@transducer/result'] = function (result) {
    var key;

    for (key in this.inputs) {
      if ((0,_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);

        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }

    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };

  XReduceBy.prototype['@@transducer/step'] = function (result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return XReduceBy;
}();

var _xreduceBy =
/*#__PURE__*/
(0,_curryN_js__WEBPACK_IMPORTED_MODULE_0__["default"])(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
  return new XReduceBy(valueFn, valueAcc, keyFn, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xreduceBy);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xtake.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xtake.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XTake =
/*#__PURE__*/
function () {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }

  XTake.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;
  XTake.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].result;

  XTake.prototype['@@transducer/step'] = function (result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.n >= 0 && this.i >= this.n ? (0,_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ret) : ret;
  };

  return XTake;
}();

var _xtake =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xtake(n, xf) {
  return new XTake(n, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xtake);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xtakeWhile.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xtakeWhile.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XTakeWhile =
/*#__PURE__*/
function () {
  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XTakeWhile.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].result;

  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : (0,_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result);
  };

  return XTakeWhile;
}();

var _xtakeWhile =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xtakeWhile(f, xf) {
  return new XTakeWhile(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xtakeWhile);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xtap.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xtap.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XTap =
/*#__PURE__*/
function () {
  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XTap.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XTap.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XTap.prototype['@@transducer/step'] = function (result, input) {
    this.f(input);
    return this.xf['@@transducer/step'](result, input);
  };

  return XTap;
}();

var _xtap =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xtap(f, xf) {
  return new XTap(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xtap);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xuniqBy.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xuniqBy.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _Set_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_Set.js */ "./node_modules/ramda/es/internal/_Set.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XUniqBy =
/*#__PURE__*/
function () {
  function XUniqBy(f, xf) {
    this.xf = xf;
    this.f = f;
    this.set = new _Set_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  XUniqBy.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;
  XUniqBy.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].result;

  XUniqBy.prototype['@@transducer/step'] = function (result, input) {
    return this.set.add(this.f(input)) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XUniqBy;
}();

var _xuniqBy =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xuniqBy(f, xf) {
  return new XUniqBy(f, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xuniqBy);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xuniqWith.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xuniqWith.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _includesWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_includesWith.js */ "./node_modules/ramda/es/internal/_includesWith.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XUniqWith =
/*#__PURE__*/
function () {
  function XUniqWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.items = [];
  }

  XUniqWith.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;
  XUniqWith.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].result;

  XUniqWith.prototype['@@transducer/step'] = function (result, input) {
    if ((0,_includesWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.pred, input, this.items)) {
      return result;
    } else {
      this.items.push(input);
      return this.xf['@@transducer/step'](result, input);
    }
  };

  return XUniqWith;
}();

var _xuniqWith =
/*#__PURE__*/
(0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xuniqWith(pred, xf) {
  return new XUniqWith(pred, xf);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xuniqWith);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xwrap.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xwrap.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xwrap)
/* harmony export */ });
var XWrap =
/*#__PURE__*/
function () {
  function XWrap(fn) {
    this.f = fn;
  }

  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };

  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };

  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}

/***/ }),

/***/ "./node_modules/ramda/es/intersection.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/intersection.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includes.js */ "./node_modules/ramda/es/internal/_includes.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_filter.js */ "./node_modules/ramda/es/internal/_filter.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flip.js */ "./node_modules/ramda/es/flip.js");
/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uniq.js */ "./node_modules/ramda/es/uniq.js");





/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */

var intersection =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function intersection(list1, list2) {
  var lookupList, filteredList;

  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }

  return (0,_uniq_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_internal_filter_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_flip_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_internal_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(lookupList), filteredList));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (intersection);

/***/ }),

/***/ "./node_modules/ramda/es/intersperse.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/intersperse.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('a', ['b', 'n', 'n', 's']); //=> ['b', 'a', 'n', 'a', 'n', 'a', 's']
 */

var intersperse =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
(0,_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__["default"])('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;

  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }

    idx += 1;
  }

  return out;
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (intersperse);

/***/ }),

/***/ "./node_modules/ramda/es/into.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/into.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_clone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_clone.js */ "./node_modules/ramda/es/internal/_clone.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_isTransformer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isTransformer.js */ "./node_modules/ramda/es/internal/_isTransformer.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_stepCat_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_stepCat.js */ "./node_modules/ramda/es/internal/_stepCat.js");





/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.transduce
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      const intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */

var into =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function into(acc, xf, list) {
  return (0,_internal_isTransformer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(acc) ? (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__["default"])(xf(acc), acc['@@transducer/init'](), list) : (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__["default"])(xf((0,_internal_stepCat_js__WEBPACK_IMPORTED_MODULE_4__["default"])(acc)), (0,_internal_clone_js__WEBPACK_IMPORTED_MODULE_0__["default"])(acc, [], [], false), list);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (into);

/***/ }),

/***/ "./node_modules/ramda/es/invert.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/invert.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");



/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys in an array.
 * @see R.invertObj
 * @example
 *
 *      const raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */

var invert =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function invert(obj) {
  var props = (0,_keys_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = (0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }

  return out;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invert);

/***/ }),

/***/ "./node_modules/ramda/es/invertObj.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/invertObj.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");


/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @see R.invert
 * @example
 *
 *      const raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      const raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */

var invertObj =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function invertObj(obj) {
  var props = (0,_keys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }

  return out;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invertObj);

/***/ }),

/***/ "./node_modules/ramda/es/invoker.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/invoker.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toString.js */ "./node_modules/ramda/es/toString.js");




/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of any of the target object's methods to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      const sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      const sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 *
 *      const dog = {
 *        speak: async () => 'Woof!'
 *      };
 *      const speak = R.invoker(0, 'speak');
 *      speak(dog).then(console.log) //~> 'Woof!'
 *
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */

var invoker =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function invoker(arity, method) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arity + 1, function () {
    var target = arguments[arity];

    if (target != null && (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }

    throw new TypeError((0,_toString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target) + ' does not have a method named "' + method + '"');
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invoker);

/***/ }),

/***/ "./node_modules/ramda/es/is.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/is.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * See if an object (i.e. `val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 * If `val` was created using `Object.create`, `R.is(Object, val) === true`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */

var is =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function is(Ctor, val) {
  return val instanceof Ctor || val != null && (val.constructor === Ctor || Ctor.name === 'Object' && typeof val === 'object');
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (is);

/***/ }),

/***/ "./node_modules/ramda/es/isEmpty.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/isEmpty.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty.js */ "./node_modules/ramda/es/empty.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");



/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);           //=> false
 *      R.isEmpty([]);                  //=> true
 *      R.isEmpty('');                  //=> true
 *      R.isEmpty(null);                //=> false
 *      R.isEmpty({});                  //=> true
 *      R.isEmpty({length: 0});         //=> false
 *      R.isEmpty(Uint8Array.from('')); //=> true
 */

var isEmpty =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function isEmpty(x) {
  return x != null && (0,_equals_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x, (0,_empty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEmpty);

/***/ }),

/***/ "./node_modules/ramda/es/isNil.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/isNil.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */

var isNil =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function isNil(x) {
  return x == null;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNil);

/***/ }),

/***/ "./node_modules/ramda/es/join.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/join.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/es/invoker.js");

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      const spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */

var join =
/*#__PURE__*/
(0,_invoker_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 'join');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (join);

/***/ }),

/***/ "./node_modules/ramda/es/juxt.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/juxt.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _converge_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./converge.js */ "./node_modules/ramda/es/converge.js");


/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      const getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */

var juxt =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function juxt(fns) {
  return (0,_converge_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function () {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (juxt);

/***/ }),

/***/ "./node_modules/ramda/es/keys.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/keys.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _internal_isArguments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArguments.js */ "./node_modules/ramda/es/internal/_isArguments.js");


 // cover IE < 9 keys issues

var hasEnumBug = !
/*#__PURE__*/
{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

var hasArgsEnumBug =
/*#__PURE__*/
function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;

  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }

    idx += 1;
  }

  return false;
};
/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values, R.toPairs
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */


var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ?
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) :
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }

  var prop, nIdx;
  var ks = [];

  var checkArgsLength = hasArgsEnumBug && (0,_internal_isArguments_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj);

  for (prop in obj) {
    if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }

  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;

    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];

      if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }

      nIdx -= 1;
    }
  }

  return ks;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keys);

/***/ }),

/***/ "./node_modules/ramda/es/keysIn.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/keysIn.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @see R.keys, R.valuesIn
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */

var keysIn =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function keysIn(obj) {
  var prop;
  var ks = [];

  for (prop in obj) {
    ks[ks.length] = prop;
  }

  return ks;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keysIn);

/***/ }),

/***/ "./node_modules/ramda/es/last.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/last.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");

/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */

var last =
/*#__PURE__*/
(0,_nth_js__WEBPACK_IMPORTED_MODULE_0__["default"])(-1);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (last);

/***/ }),

/***/ "./node_modules/ramda/es/lastIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/lastIndexOf.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");



/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf, R.findLastIndex
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */

var lastIndexOf =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !(0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;

    while (idx >= 0) {
      if ((0,_equals_js__WEBPACK_IMPORTED_MODULE_2__["default"])(xs[idx], target)) {
        return idx;
      }

      idx -= 1;
    }

    return -1;
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lastIndexOf);

/***/ }),

/***/ "./node_modules/ramda/es/length.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/length.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isNumber.js */ "./node_modules/ramda/es/internal/_isNumber.js");


/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */

var length =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function length(list) {
  return list != null && (0,_internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list.length) ? list.length : NaN;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (length);

/***/ }),

/***/ "./node_modules/ramda/es/lens.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/lens.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");


/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */

var lens =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lens(getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lens);

/***/ }),

/***/ "./node_modules/ramda/es/lensIndex.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/lensIndex.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lens.js */ "./node_modules/ramda/es/lens.js");
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");
/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./update.js */ "./node_modules/ramda/es/update.js");




/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over, R.nth
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */

var lensIndex =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lensIndex(n) {
  return (0,_lens_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_nth_js__WEBPACK_IMPORTED_MODULE_2__["default"])(n), (0,_update_js__WEBPACK_IMPORTED_MODULE_3__["default"])(n));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensIndex);

/***/ }),

/***/ "./node_modules/ramda/es/lensPath.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/lensPath.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _assocPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assocPath.js */ "./node_modules/ramda/es/assocPath.js");
/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lens.js */ "./node_modules/ramda/es/lens.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");




/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      const xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */

var lensPath =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lensPath(p) {
  return (0,_lens_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_path_js__WEBPACK_IMPORTED_MODULE_3__["default"])(p), (0,_assocPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensPath);

/***/ }),

/***/ "./node_modules/ramda/es/lensProp.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/lensProp.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _assoc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assoc.js */ "./node_modules/ramda/es/assoc.js");
/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lens.js */ "./node_modules/ramda/es/lens.js");
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");




/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */

var lensProp =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lensProp(k) {
  return (0,_lens_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_prop_js__WEBPACK_IMPORTED_MODULE_3__["default"])(k), (0,_assoc_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensProp);

/***/ }),

/***/ "./node_modules/ramda/es/lift.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/lift.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _liftN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liftN.js */ "./node_modules/ramda/es/liftN.js");


/**
 * "lifts" a function of arity >= 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      const madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([100, 200], [30, 40], [5, 6, 7]); //=> [135, 136, 137, 145, 146, 147, 235, 236, 237, 245, 246, 247]
 *
 *      const madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([10, 20], [1], [2, 3], [4], [100, 200]); //=> [117, 217, 118, 218, 127, 227, 128, 228]
 */

var lift =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lift(fn) {
  return (0,_liftN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, fn);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lift);

/***/ }),

/***/ "./node_modules/ramda/es/liftN.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/liftN.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _ap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ap.js */ "./node_modules/ramda/es/ap.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");





/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      const madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */

var liftN =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function liftN(arity, fn) {
  var lifted = (0,_curryN_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arity, fn);
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arity, function () {
    return (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_ap_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,_map_js__WEBPACK_IMPORTED_MODULE_4__["default"])(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (liftN);

/***/ }),

/***/ "./node_modules/ramda/es/lt.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/lt.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */

var lt =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lt(a, b) {
  return a < b;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lt);

/***/ }),

/***/ "./node_modules/ramda/es/lte.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/lte.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */

var lte =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lte(a, b) {
  return a <= b;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lte);

/***/ }),

/***/ "./node_modules/ramda/es/map.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/map.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_xmap_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_xmap.js */ "./node_modules/ramda/es/internal/_xmap.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");







/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex, R.pluck, R.project
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */

var map =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['fantasy-land/map', 'map'], _internal_xmap_js__WEBPACK_IMPORTED_MODULE_4__["default"], function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_5__["default"])(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });

    case '[object Object]':
      return (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__["default"])(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, (0,_keys_js__WEBPACK_IMPORTED_MODULE_6__["default"])(functor));

    default:
      return (0,_internal_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fn, functor);
  }
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (map);

/***/ }),

/***/ "./node_modules/ramda/es/mapAccum.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/mapAccum.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.scan, R.addIndex, R.mapAccumRight
 * @example
 *
 *      const digits = ['1', '2', '3', '4'];
 *      const appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */

var mapAccum =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];

  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }

  return [tuple[0], result];
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mapAccum);

/***/ }),

/***/ "./node_modules/ramda/es/mapAccumRight.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mapAccumRight.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      const digits = ['1', '2', '3', '4'];
 *      const appender = (a, b) => [b + a, b + a];
 *
 *      R.mapAccumRight(appender, 5, digits); //=> ['12345', ['12345', '2345', '345', '45']]
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   f(f(f(a, d)[0], c)[0], b)[0],
 *   [
 *     f(a, d)[1],
 *     f(f(a, d)[0], c)[1],
 *     f(f(f(a, d)[0], c)[0], b)[1]
 *   ]
 * ]
 */

var mapAccumRight =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];

  while (idx >= 0) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx -= 1;
  }

  return [tuple[0], result];
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mapAccumRight);

/***/ }),

/***/ "./node_modules/ramda/es/mapObjIndexed.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mapObjIndexed.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");



/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      const xyz = { x: 1, y: 2, z: 3 };
 *      const prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, xyz); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */

var mapObjIndexed =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mapObjIndexed(fn, obj) {
  return (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, (0,_keys_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mapObjIndexed);

/***/ }),

/***/ "./node_modules/ramda/es/match.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/match.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */

var match =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function match(rx, str) {
  return str.match(rx) || [];
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (match);

/***/ }),

/***/ "./node_modules/ramda/es/mathMod.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/mathMod.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");


/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @see R.modulo
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      const clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      const seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */

var mathMod =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mathMod(m, p) {
  if (!(0,_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(m)) {
    return NaN;
  }

  if (!(0,_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p) || p < 1) {
    return NaN;
  }

  return (m % p + p) % p;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mathMod);

/***/ }),

/***/ "./node_modules/ramda/es/max.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/max.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */

var max =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function max(a, b) {
  return b > a ? b : a;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (max);

/***/ }),

/***/ "./node_modules/ramda/es/maxBy.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/maxBy.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      const square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */

var maxBy =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (maxBy);

/***/ }),

/***/ "./node_modules/ramda/es/mean.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/mean.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _sum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sum.js */ "./node_modules/ramda/es/sum.js");


/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.median
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */

var mean =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mean(list) {
  return (0,_sum_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list) / list.length;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mean);

/***/ }),

/***/ "./node_modules/ramda/es/median.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/median.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _mean_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mean.js */ "./node_modules/ramda/es/mean.js");


/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.mean
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */

var median =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function median(list) {
  var len = list.length;

  if (len === 0) {
    return NaN;
  }

  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return (0,_mean_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Array.prototype.slice.call(list, 0).sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (median);

/***/ }),

/***/ "./node_modules/ramda/es/memoizeWith.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/memoizeWith.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");



/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 * Care must be taken when implementing key generation to avoid key collision,
 * or if tracking references, memory leaks and mutating arguments.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoizeWith(Number, n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */

var memoizeWith =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function memoizeWith(mFn, fn) {
  var cache = {};
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fn.length, function () {
    var key = mFn.apply(this, arguments);

    if (!(0,_internal_has_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }

    return cache[key];
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (memoizeWith);

/***/ }),

/***/ "./node_modules/ramda/es/mergeAll.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/mergeAll.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_objectAssign.js */ "./node_modules/ramda/es/internal/_objectAssign.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");


/**
 * Creates one new object with the own properties from a list of objects.
 * If a key exists in more than one object, the value from the last
 * object it exists in will be used.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */

var mergeAll =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function mergeAll(list) {
  return _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__["default"].apply(null, [{}].concat(list));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeAll);

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepLeft.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepLeft.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeDeepWithKey.js */ "./node_modules/ramda/es/mergeDeepWithKey.js");


/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                      { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */

var mergeDeepLeft =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeDeepLeft(lObj, rObj) {
  return (0,_mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeDeepLeft);

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepRight.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepRight.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeDeepWithKey.js */ "./node_modules/ramda/es/mergeDeepWithKey.js");


/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */

var mergeDeepRight =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeDeepRight(lObj, rObj) {
  return (0,_mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeDeepRight);

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepWith.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepWith.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeDeepWithKey.js */ "./node_modules/ramda/es/mergeDeepWithKey.js");


/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepWith(R.concat,
 *                      { a: true, c: { values: [10, 20] }},
 *                      { b: true, c: { values: [15, 35] }});
 *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */

var mergeDeepWith =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeDeepWith(fn, lObj, rObj) {
  return (0,_mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeDeepWith);

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepWithKey.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepWithKey.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isObject.js */ "./node_modules/ramda/es/internal/_isObject.js");
/* harmony import */ var _mergeWithKey_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mergeWithKey.js */ "./node_modules/ramda/es/mergeWithKey.js");



/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */

var mergeDeepWithKey =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeDeepWithKey(fn, lObj, rObj) {
  return (0,_mergeWithKey_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (k, lVal, rVal) {
    if ((0,_internal_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(lVal) && (0,_internal_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeDeepWithKey);

/***/ }),

/***/ "./node_modules/ramda/es/mergeLeft.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/mergeLeft.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_objectAssign.js */ "./node_modules/ramda/es/internal/_objectAssign.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeRight, R.mergeDeepLeft, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const resetToDefault = R.mergeLeft({x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeLeft(a, b) = {...b, ...a}
 */

var mergeLeft =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function mergeLeft(l, r) {
  return (0,_internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, r, l);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeLeft);

/***/ }),

/***/ "./node_modules/ramda/es/mergeRight.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/mergeRight.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_objectAssign.js */ "./node_modules/ramda/es/internal/_objectAssign.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeLeft, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const withDefaults = R.mergeRight({x: 0, y: 0});
 *      withDefaults({y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeRight(a, b) = {...a, ...b}
 */

var mergeRight =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function mergeRight(l, r) {
  return (0,_internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, l, r);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeRight);

/***/ }),

/***/ "./node_modules/ramda/es/mergeWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/mergeWith.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _mergeWithKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeWithKey.js */ "./node_modules/ramda/es/mergeWithKey.js");


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWith, R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */

var mergeWith =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeWith(fn, l, r) {
  return (0,_mergeWithKey_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeWith);

/***/ }),

/***/ "./node_modules/ramda/es/mergeWithKey.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/mergeWithKey.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */

var mergeWithKey =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k, l)) {
      result[k] = (0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k, r) && !(0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeWithKey);

/***/ }),

/***/ "./node_modules/ramda/es/min.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/min.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */

var min =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function min(a, b) {
  return b < a ? b : a;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (min);

/***/ }),

/***/ "./node_modules/ramda/es/minBy.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/minBy.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      const square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */

var minBy =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (minBy);

/***/ }),

/***/ "./node_modules/ramda/es/modify.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/modify.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _modifyPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifyPath.js */ "./node_modules/ramda/es/modifyPath.js");


/**
 * Creates a copy of the passed object by applying an `fn` function to the given `prop` property.
 *
 * The function will not be invoked, and the object will not change
 * if its corresponding property does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Object
 * @sig Idx -> (v -> v) -> {k: v} -> {k: v}
 * @param {String|Number} prop The property to be modified.
 * @param {Function} fn The function to apply to the property.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      const person = {name: 'James', age: 20, pets: ['dog', 'cat']};
 *      R.modify('age', R.add(1), person); //=> {name: 'James', age: 21, pets: ['dog', 'cat']}
 *      R.modify('pets', R.append('turtle'), person); //=> {name: 'James', age: 20, pets: ['dog', 'cat', 'turtle']}
 */

var modify =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function modify(prop, fn, object) {
  return (0,_modifyPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])([prop], fn, object);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modify);

/***/ }),

/***/ "./node_modules/ramda/es/modifyPath.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/modifyPath.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isObject.js */ "./node_modules/ramda/es/internal/_isObject.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _internal_assoc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_assoc.js */ "./node_modules/ramda/es/internal/_assoc.js");
/* harmony import */ var _internal_modify_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/_modify.js */ "./node_modules/ramda/es/internal/_modify.js");






/**
 * Creates a shallow clone of the passed object by applying an `fn` function
 * to the value at the given path.
 *
 * The function will not be invoked, and the object will not change
 * if its corresponding path does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Object
 * @sig [Idx] -> (v -> v) -> {k: v} -> {k: v}
 * @param {Array} path The path to be modified.
 * @param {Function} fn The function to apply to the path.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      const person = {name: 'James', address: { zipCode: '90216' }};
 *      R.modifyPath(['address', 'zipCode'], R.reverse, person); //=> {name: 'James', address: { zipCode: '61209' }}
 *
 *      // Can handle arrays too
 *      const person = {name: 'James', addresses: [{ zipCode: '90216' }]};
 *      R.modifyPath(['addresses', 0, 'zipCode'], R.reverse, person); //=> {name: 'James', addresses: [{ zipCode: '61209' }]}
 */

var modifyPath =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function modifyPath(path, fn, object) {
  if (!(0,_internal_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(object) && !(0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object) || path.length === 0) {
    return object;
  }

  var idx = path[0];

  if (!(0,_internal_has_js__WEBPACK_IMPORTED_MODULE_3__["default"])(idx, object)) {
    return object;
  }

  if (path.length === 1) {
    return (0,_internal_modify_js__WEBPACK_IMPORTED_MODULE_5__["default"])(idx, fn, object);
  }

  var val = modifyPath(Array.prototype.slice.call(path, 1), fn, object[idx]);

  if (val === object[idx]) {
    return object;
  }

  return (0,_internal_assoc_js__WEBPACK_IMPORTED_MODULE_4__["default"])(idx, val, object);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modifyPath);

/***/ }),

/***/ "./node_modules/ramda/es/modulo.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/modulo.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      const isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */

var modulo =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function modulo(a, b) {
  return a % b;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modulo);

/***/ }),

/***/ "./node_modules/ramda/es/move.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/move.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Move an item, at index `from`, to index `to`, in a list of elements.
 * A new list will be created containing the new elements order.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} from The source index
 * @param {Number} to The destination index
 * @param {Array} list The list which will serve to realise the move
 * @return {Array} The new list reordered
 * @example
 *
 *      R.move(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['b', 'c', 'a', 'd', 'e', 'f']
 *      R.move(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'a', 'b', 'c', 'd', 'e'] list rotation
 */

var move =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (from, to, list) {
  var length = list.length;
  var result = list.slice();
  var positiveFrom = from < 0 ? length + from : from;
  var positiveTo = to < 0 ? length + to : to;
  var item = result.splice(positiveFrom, 1);
  return positiveFrom < 0 || positiveFrom >= list.length || positiveTo < 0 || positiveTo >= list.length ? list : [].concat(result.slice(0, positiveTo)).concat(item).concat(result.slice(positiveTo, list.length));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (move);

/***/ }),

/***/ "./node_modules/ramda/es/multiply.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/multiply.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      const double = R.multiply(2);
 *      const triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */

var multiply =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function multiply(a, b) {
  return a * b;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (multiply);

/***/ }),

/***/ "./node_modules/ramda/es/nAry.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/nAry.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      const takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */

var nAry =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function nAry(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.call(this);
      };

    case 1:
      return function (a0) {
        return fn.call(this, a0);
      };

    case 2:
      return function (a0, a1) {
        return fn.call(this, a0, a1);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };

    default:
      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nAry);

/***/ }),

/***/ "./node_modules/ramda/es/negate.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/negate.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */

var negate =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function negate(n) {
  return -n;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (negate);

/***/ }),

/***/ "./node_modules/ramda/es/none.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/none.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_complement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_complement.js */ "./node_modules/ramda/es/internal/_complement.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _all_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./all.js */ "./node_modules/ramda/es/all.js");



/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *      const isOdd = n => n % 2 !== 0;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 */

var none =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function none(fn, input) {
  return (0,_all_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_internal_complement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fn), input);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (none);

/***/ }),

/***/ "./node_modules/ramda/es/not.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/not.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */

var not =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function not(a) {
  return !a;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (not);

/***/ }),

/***/ "./node_modules/ramda/es/nth.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/nth.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isString.js */ "./node_modules/ramda/es/internal/_isString.js");


/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      const list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */

var nth =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return (0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list) ? list.charAt(idx) : list[idx];
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nth);

/***/ }),

/***/ "./node_modules/ramda/es/nthArg.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/nthArg.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");



/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */

var nthArg =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arity, function () {
    return (0,_nth_js__WEBPACK_IMPORTED_MODULE_2__["default"])(n, arguments);
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nthArg);

/***/ }),

/***/ "./node_modules/ramda/es/o.js":
/*!************************************!*\
  !*** ./node_modules/ramda/es/o.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument. Also, unlike [`compose`](#compose), `o` is
 * limited to accepting only 2 unary functions. The name o was chosen because
 * of its similarity to the mathematical composition operator ∘.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      const classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      const yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */

var o =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function o(f, g, x) {
  return f(g(x));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (o);

/***/ }),

/***/ "./node_modules/ramda/es/objOf.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/objOf.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      const matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */

var objOf =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (objOf);

/***/ }),

/***/ "./node_modules/ramda/es/of.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/of.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_of.js */ "./node_modules/ramda/es/internal/_of.js");


/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */

var of =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_of_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (of);

/***/ }),

/***/ "./node_modules/ramda/es/omit.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/omit.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */

var omit =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (omit);

/***/ }),

/***/ "./node_modules/ramda/es/on.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/on.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");

/**
 * Takes a binary function `f`, a unary function `g`, and two values.
 * Applies `g` to each value, then applies the result of each to `f`.
 *
 * Also known as the P combinator.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Function
 * @sig ((a, a) -> b) -> (c -> a) -> c -> c -> b
 * @param {Function} f a binary function
 * @param {Function} g a unary function
 * @param {any} a any value
 * @param {any} b any value
 * @return {any} The result of `f`
 * @example
 *
 *      const eqBy = R.on((a, b) => a === b);
 *      eqBy(R.prop('a'), {b:0, a:1}, {a:1}) //=> true;
 *
 *      const containsInsensitive = R.on(R.contains, R.toLower);
 *      containsInsensitive('o', 'FOO'); //=> true
 * @symb R.on(f, g, a, b) = f(g(a), g(b))
 */

var on =
/*#__PURE__*/
(0,_internal_curryN_js__WEBPACK_IMPORTED_MODULE_0__["default"])(4, [], function on(f, g, a, b) {
  return f(g(a), g(b));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (on);

/***/ }),

/***/ "./node_modules/ramda/es/once.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/once.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");


/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      const addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */

var once =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function once(fn) {
  var called = false;
  var result;
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fn.length, function () {
    if (called) {
      return result;
    }

    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (once);

/***/ }),

/***/ "./node_modules/ramda/es/or.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/or.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns the first argument if it is truthy, otherwise the second argument.
 * Acts as the boolean `or` statement if both inputs are `Boolean`s.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any}
 * @see R.either, R.and
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */

var or =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function or(a, b) {
  return a || b;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (or);

/***/ }),

/***/ "./node_modules/ramda/es/otherwise.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/otherwise.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_assertPromise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_assertPromise.js */ "./node_modules/ramda/es/internal/_assertPromise.js");


/**
 * Returns the result of applying the onFailure function to the value inside
 * a failed promise. This is useful for handling rejected promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig (e -> b) -> (Promise e a) -> (Promise e b)
 * @sig (e -> (Promise f b)) -> (Promise e a) -> (Promise f b)
 * @param {Function} onFailure The function to apply. Can return a value or a promise of a value.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(null, onFailure)`
 * @see R.andThen
 * @example
 *
 *      const failedFetch = id => Promise.reject('bad ID');
 *      const useDefault = () => ({ firstName: 'Bob', lastName: 'Loblaw' });
 *
 *      //recoverFromFailure :: String -> Promise ({ firstName, lastName })
 *      const recoverFromFailure = R.pipe(
 *        failedFetch,
 *        R.otherwise(useDefault),
 *        R.andThen(R.pick(['firstName', 'lastName'])),
 *      );
 *      recoverFromFailure(12345).then(console.log);
 */

var otherwise =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function otherwise(f, p) {
  (0,_internal_assertPromise_js__WEBPACK_IMPORTED_MODULE_1__["default"])('otherwise', p);

  return p.then(null, f);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (otherwise);

/***/ }),

/***/ "./node_modules/ramda/es/over.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/over.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
 // `Identity` is a functor that holds a single value, where `map` simply
// transforms the held value with the provided function.

var Identity = function (x) {
  return {
    value: x,
    map: function (f) {
      return Identity(f(x));
    }
  };
};
/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.view, R.set, R.lens, R.lensIndex, R.lensProp, R.lensPath
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */


var over =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function over(lens, f, x) {
  // The value returned by the getter function is first transformed with `f`,
  // then set as the value of an `Identity`. This is then mapped over with the
  // setter function of the lens.
  return lens(function (y) {
    return Identity(f(y));
  })(x).value;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (over);

/***/ }),

/***/ "./node_modules/ramda/es/pair.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/pair.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */

var pair =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pair(fst, snd) {
  return [fst, snd];
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pair);

/***/ }),

/***/ "./node_modules/ramda/es/partial.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/partial.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_createPartialApplicator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_createPartialApplicator.js */ "./node_modules/ramda/es/internal/_createPartialApplicator.js");


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight, R.curry
 * @example
 *
 *      const multiply2 = (a, b) => a * b;
 *      const double = R.partial(multiply2, [2]);
 *      double(3); //=> 6
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const sayHello = R.partial(greet, ['Hello']);
 *      const sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */

var partial =
/*#__PURE__*/
(0,_internal_createPartialApplicator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (partial);

/***/ }),

/***/ "./node_modules/ramda/es/partialObject.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/partialObject.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mergeDeepRight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeDeepRight.js */ "./node_modules/ramda/es/mergeDeepRight.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Takes a function `f` and an object, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the object
 * provided initially merged deeply (right) with the object provided as an argument to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Function
 * @sig (({ a, b, c, ..., n }) -> x) -> { a, b, c, ...} -> ({ d, e, f, ..., n } -> x)
 * @param {Function} f
 * @param {Object} props
 * @return {Function}
 * @see R.partial, R.partialRight, R.curry, R.mergeDeepRight
 * @example
 *
 *      const multiply2 = ({ a, b }) => a * b;
 *      const double = R.partialObject(multiply2, { a: 2 });
 *      double({ b: 2 }); //=> 4
 *
 *      const greet = ({ salutation, title, firstName, lastName }) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const sayHello = R.partialObject(greet, { salutation: 'Hello' });
 *      const sayHelloToMs = R.partialObject(sayHello, { title: 'Ms.' });
 *      sayHelloToMs({ firstName: 'Jane', lastName: 'Jones' }); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialObject(f, { a, b })({ c, d }) = f({ a, b, c, d })
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((f, o) => props => f.call(undefined, (0,_mergeDeepRight_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, props))));

/***/ }),

/***/ "./node_modules/ramda/es/partialRight.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/partialRight.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_createPartialApplicator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_createPartialApplicator.js */ "./node_modules/ramda/es/internal/_createPartialApplicator.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flip.js */ "./node_modules/ramda/es/flip.js");



/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */

var partialRight =
/*#__PURE__*/
(0,_internal_createPartialApplicator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
(0,_flip_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"]));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (partialRight);

/***/ }),

/***/ "./node_modules/ramda/es/partition.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/partition.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.js */ "./node_modules/ramda/es/filter.js");
/* harmony import */ var _juxt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./juxt.js */ "./node_modules/ramda/es/juxt.js");
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reject.js */ "./node_modules/ramda/es/reject.js");



/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.includes('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.includes('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */

var partition =
/*#__PURE__*/
(0,_juxt_js__WEBPACK_IMPORTED_MODULE_1__["default"])([_filter_js__WEBPACK_IMPORTED_MODULE_0__["default"], _reject_js__WEBPACK_IMPORTED_MODULE_2__["default"]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (partition);

/***/ }),

/***/ "./node_modules/ramda/es/path.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/path.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _paths_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paths.js */ "./node_modules/ramda/es/paths.js");


/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop, R.nth
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 *      R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
 *      R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
 */

var path =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function path(pathAr, obj) {
  return (0,_paths_js__WEBPACK_IMPORTED_MODULE_1__["default"])([pathAr], obj)[0];
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (path);

/***/ }),

/***/ "./node_modules/ramda/es/pathEq.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/pathEq.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");



/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int | Symbol
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      const user1 = { address: { zipCode: 90210 } };
 *      const user2 = { address: { zipCode: 55555 } };
 *      const user3 = { name: 'Bob' };
 *      const users = [ user1, user2, user3 ];
 *      const isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */

var pathEq =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pathEq(_path, val, obj) {
  return (0,_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_path_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_path, obj), val);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathEq);

/***/ }),

/***/ "./node_modules/ramda/es/pathOr.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/pathOr.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _defaultTo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultTo.js */ "./node_modules/ramda/es/defaultTo.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");



/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */

var pathOr =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pathOr(d, p, obj) {
  return (0,_defaultTo_js__WEBPACK_IMPORTED_MODULE_1__["default"])(d, (0,_path_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p, obj));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathOr);

/***/ }),

/***/ "./node_modules/ramda/es/pathSatisfies.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/pathSatisfies.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");


/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int | Symbol
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 *      R.pathSatisfies(R.is(Object), [], {x: {y: 2}}); //=> true
 */

var pathSatisfies =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pathSatisfies(pred, propPath, obj) {
  return pred((0,_path_js__WEBPACK_IMPORTED_MODULE_1__["default"])(propPath, obj));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathSatisfies);

/***/ }),

/***/ "./node_modules/ramda/es/paths.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/paths.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");



/**
 * Retrieves the values at given paths of an object.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Object
 * @typedefn Idx = [String | Int | Symbol]
 * @sig [Idx] -> {a} -> [a | Undefined]
 * @param {Array} pathsArray The array of paths to be fetched.
 * @param {Object} obj The object to retrieve the nested properties from.
 * @return {Array} A list consisting of values at paths specified by "pathsArray".
 * @see R.path
 * @example
 *
 *      R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
 *      R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
 */

var paths =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function paths(pathsArray, obj) {
  return pathsArray.map(function (paths) {
    var val = obj;
    var idx = 0;
    var p;

    while (idx < paths.length) {
      if (val == null) {
        return;
      }

      p = paths[idx];
      val = (0,_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p) ? (0,_nth_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p, val) : val[p];
      idx += 1;
    }

    return val;
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (paths);

/***/ }),

/***/ "./node_modules/ramda/es/pick.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/pick.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */

var pick =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pick(names, obj) {
  var result = {};
  var idx = 0;

  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }

    idx += 1;
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pick);

/***/ }),

/***/ "./node_modules/ramda/es/pickAll.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/pickAll.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */

var pickAll =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pickAll);

/***/ }),

/***/ "./node_modules/ramda/es/pickBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/pickBy.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      const isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */

var pickBy =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pickBy(test, obj) {
  var result = {};

  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pickBy);

/***/ }),

/***/ "./node_modules/ramda/es/pipe.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/pipe.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pipe)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_pipe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_pipe.js */ "./node_modules/ramda/es/internal/_pipe.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");
/* harmony import */ var _tail_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tail.js */ "./node_modules/ramda/es/tail.js");




/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      const f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 * @symb R.pipe(f, g, h)(a)(b) = h(g(f(a)))(b)
 */

function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }

  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arguments[0].length, (0,_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_internal_pipe_js__WEBPACK_IMPORTED_MODULE_1__["default"], arguments[0], (0,_tail_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arguments)));
}

/***/ }),

/***/ "./node_modules/ramda/es/pipeWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/pipeWith.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _head_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./head.js */ "./node_modules/ramda/es/head.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _tail_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tail.js */ "./node_modules/ramda/es/tail.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./identity.js */ "./node_modules/ramda/es/identity.js");






/**
 * Performs left-to-right function composition using transforming function. The first function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)]) -> ((a, b, ..., n) -> z)
 * @param {Function} transformer The transforming function
 * @param {Array} functions The functions to pipe
 * @return {Function}
 * @see R.composeWith, R.pipe
 * @example
 *
 *      const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
 *      const f = pipeWhileNotNil([Math.pow, R.negate, R.inc])
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipeWith(f)([g, h, i])(...args) = f(i, f(h, g(...args)))
 */

var pipeWith =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function pipeWith(xf, list) {
  if (list.length <= 0) {
    return _identity_js__WEBPACK_IMPORTED_MODULE_5__["default"];
  }

  var headList = (0,_head_js__WEBPACK_IMPORTED_MODULE_2__["default"])(list);
  var tailList = (0,_tail_js__WEBPACK_IMPORTED_MODULE_4__["default"])(list);
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(headList.length, function () {
    return (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__["default"])(function (result, f) {
      return xf.call(this, f, result);
    }, headList.apply(this, arguments), tailList);
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pipeWith);

/***/ }),

/***/ "./node_modules/ramda/es/pluck.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/pluck.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");



/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.project, R.prop, R.props
 * @example
 *
 *      var getAges = R.pluck('age');
 *      getAges([{name: 'fred', age: 29}, {name: 'wilma', age: 27}]); //=> [29, 27]
 *
 *      R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */

var pluck =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pluck(p, list) {
  return (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_prop_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p), list);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pluck);

/***/ }),

/***/ "./node_modules/ramda/es/prepend.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/prepend.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */

var prepend =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function prepend(el, list) {
  return (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])([el], list);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prepend);

/***/ }),

/***/ "./node_modules/ramda/es/product.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/product.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _multiply_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./multiply.js */ "./node_modules/ramda/es/multiply.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");


/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */

var product =
/*#__PURE__*/
(0,_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_multiply_js__WEBPACK_IMPORTED_MODULE_0__["default"], 1);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (product);

/***/ }),

/***/ "./node_modules/ramda/es/project.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/project.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./identity.js */ "./node_modules/ramda/es/identity.js");
/* harmony import */ var _pickAll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pickAll.js */ "./node_modules/ramda/es/pickAll.js");
/* harmony import */ var _useWith_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useWith.js */ "./node_modules/ramda/es/useWith.js");




/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @see R.pluck, R.props, R.prop
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      const kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */

var project =
/*#__PURE__*/
(0,_useWith_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_internal_map_js__WEBPACK_IMPORTED_MODULE_0__["default"], [_pickAll_js__WEBPACK_IMPORTED_MODULE_2__["default"], _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]]); // passing `identity` gives correct arity

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (project);

/***/ }),

/***/ "./node_modules/ramda/es/promap.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/promap.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_promap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_promap.js */ "./node_modules/ramda/es/internal/_promap.js");
/* harmony import */ var _internal_xpromap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xpromap.js */ "./node_modules/ramda/es/internal/_xpromap.js");




/**
 * Takes two functions as pre- and post- processors respectively for a third function,
 * i.e. `promap(f, g, h)(x) === g(h(f(x)))`.
 *
 * Dispatches to the `promap` method of the third argument, if present,
 * according to the [FantasyLand Profunctor spec](https://github.com/fantasyland/fantasy-land#profunctor).
 *
 * Acts as a transducer if a transformer is given in profunctor position.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Function
 * @sig (a -> b) -> (c -> d) -> (b -> c) -> (a -> d)
 * @sig Profunctor p => (a -> b) -> (c -> d) -> p b c -> p a d
 * @param {Function} f The preprocessor function, a -> b
 * @param {Function} g The postprocessor function, c -> d
 * @param {Profunctor} profunctor The profunctor instance to be promapped, e.g. b -> c
 * @return {Profunctor} The new profunctor instance, e.g. a -> d
 * @see R.transduce
 * @example
 *
 *      const decodeChar = R.promap(s => s.charCodeAt(), String.fromCharCode, R.add(-8))
 *      const decodeString = R.promap(R.split(''), R.join(''), R.map(decodeChar))
 *      decodeString("ziuli") //=> "ramda"
 *
 * @symb R.promap(f, g, h) = x => g(h(f(x)))
 * @symb R.promap(f, g, profunctor) = profunctor.promap(f, g)
 */

var promap =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['fantasy-land/promap', 'promap'], _internal_xpromap_js__WEBPACK_IMPORTED_MODULE_3__["default"], _internal_promap_js__WEBPACK_IMPORTED_MODULE_2__["default"]));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promap);

/***/ }),

/***/ "./node_modules/ramda/es/prop.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/prop.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");



/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx -> {s: a} -> a | Undefined
 * @param {String|Number} p The property name or array index
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path, R.props, R.pluck, R.project, R.nth
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 *      R.prop(0, [100]); //=> 100
 *      R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
 */

var prop =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function prop(p, obj) {
  if (obj == null) {
    return;
  }

  return (0,_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p) ? (0,_nth_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p, obj) : obj[p];
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prop);

/***/ }),

/***/ "./node_modules/ramda/es/propEq.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/propEq.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");



/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.whereEq`](#whereEq).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.whereEq, R.propSatisfies, R.equals
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      const alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      const kids = [abby, fred, rusty, alois];
 *      const hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */

var propEq =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function propEq(name, val, obj) {
  return (0,_equals_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val, (0,_prop_js__WEBPACK_IMPORTED_MODULE_1__["default"])(name, obj));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (propEq);

/***/ }),

/***/ "./node_modules/ramda/es/propIs.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/propIs.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is.js */ "./node_modules/ramda/es/is.js");



/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */

var propIs =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function propIs(type, name, obj) {
  return (0,_is_js__WEBPACK_IMPORTED_MODULE_2__["default"])(type, (0,_prop_js__WEBPACK_IMPORTED_MODULE_1__["default"])(name, obj));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (propIs);

/***/ }),

/***/ "./node_modules/ramda/es/propOr.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/propOr.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _defaultTo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultTo.js */ "./node_modules/ramda/es/defaultTo.js");
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");



/**
 * Return the specified property of the given non-null object if the property
 * is present and it's value is not `null`, `undefined` or `NaN`.
 *
 * Otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const favorite = R.prop('favoriteLibrary');
 *      const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */

var propOr =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function propOr(val, p, obj) {
  return (0,_defaultTo_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val, (0,_prop_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p, obj));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (propOr);

/***/ }),

/***/ "./node_modules/ramda/es/propSatisfies.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/propSatisfies.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");


/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.where, R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */

var propSatisfies =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function propSatisfies(pred, name, obj) {
  return pred((0,_prop_js__WEBPACK_IMPORTED_MODULE_1__["default"])(name, obj));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (propSatisfies);

/***/ }),

/***/ "./node_modules/ramda/es/props.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/props.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");


/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @see R.prop, R.pluck, R.project
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      const fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */

var props =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function props(ps, obj) {
  return ps.map(function (p) {
    return (0,_path_js__WEBPACK_IMPORTED_MODULE_1__["default"])([p], obj);
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (props);

/***/ }),

/***/ "./node_modules/ramda/es/range.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/range.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isNumber.js */ "./node_modules/ramda/es/internal/_isNumber.js");


/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in the set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */

var range =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function range(from, to) {
  if (!((0,_internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"])(from) && (0,_internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"])(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }

  var result = [];
  var n = from;

  while (n < to) {
    result.push(n);
    n += 1;
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (range);

/***/ }),

/***/ "./node_modules/ramda/es/reduce.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/reduce.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */

var reduce =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduce);

/***/ }),

/***/ "./node_modules/ramda/es/reduceBy.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/reduceBy.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_clone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_clone.js */ "./node_modules/ramda/es/internal/_clone.js");
/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_reduced_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _internal_xreduceBy_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/_xreduceBy.js */ "./node_modules/ramda/es/internal/_xreduceBy.js");







/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * The value function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to short circuit the iteration.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce, R.reduced
 * @example
 *
 *      const groupNames = (acc, {name}) => acc.concat(name)
 *      const toGrade = ({score}) =>
 *        score < 65 ? 'F' :
 *        score < 70 ? 'D' :
 *        score < 80 ? 'C' :
 *        score < 90 ? 'B' : 'A'
 *
 *      var students = [
 *        {name: 'Abby', score: 83},
 *        {name: 'Bart', score: 62},
 *        {name: 'Curt', score: 88},
 *        {name: 'Dora', score: 92},
 *      ]
 *
 *      reduceBy(groupNames, [], toGrade, students)
 *      //=> {"A": ["Dora"], "B": ["Abby", "Curt"], "F": ["Bart"]}
 */

var reduceBy =
/*#__PURE__*/
(0,_internal_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(4, [],
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_2__["default"])([], _internal_xreduceBy_js__WEBPACK_IMPORTED_MODULE_6__["default"], function reduceBy(valueFn, valueAcc, keyFn, list) {
  return (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(function (acc, elt) {
    var key = keyFn(elt);
    var value = valueFn((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_3__["default"])(key, acc) ? acc[key] : (0,_internal_clone_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valueAcc, [], [], false), elt);

    if (value && value['@@transducer/reduced']) {
      return (0,_internal_reduced_js__WEBPACK_IMPORTED_MODULE_5__["default"])(acc);
    }

    acc[key] = value;
    return acc;
  }, {}, list);
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduceBy);

/***/ }),

/***/ "./node_modules/ramda/es/reduceRight.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/reduceRight.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*. `reduceRight` may use [`reduced`](#reduced)
 * to short circuit the iteration.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex, R.reduced
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *      //    -               -2
 *      //   / \              / \
 *      //  1   -            1   3
 *      //     / \              / \
 *      //    2   -     ==>    2  -1
 *      //       / \              / \
 *      //      3   -            3   4
 *      //         / \              / \
 *      //        4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */

var reduceRight =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    acc = fn(list[idx], acc);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    idx -= 1;
  }

  return acc;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduceRight);

/***/ }),

/***/ "./node_modules/ramda/es/reduceWhile.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/reduceWhile.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_reduced_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");



/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator. `reduceWhile` may alternatively be short-circuited
 * via [`reduced`](#reduced).
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      const isOdd = (acc, x) => x % 2 !== 0;
 *      const xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      const ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */

var reduceWhile =
/*#__PURE__*/
(0,_internal_curryN_js__WEBPACK_IMPORTED_MODULE_0__["default"])(4, [], function _reduceWhile(pred, fn, a, list) {
  return (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (acc, x) {
    return pred(acc, x) ? fn(acc, x) : (0,_internal_reduced_js__WEBPACK_IMPORTED_MODULE_2__["default"])(acc);
  }, a, list);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduceWhile);

/***/ }),

/***/ "./node_modules/ramda/es/reduced.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/reduced.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");


/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * This optimization is available to the below functions:
 * - [`reduce`](#reduce)
 * - [`reduceWhile`](#reduceWhile)
 * - [`reduceBy`](#reduceBy)
 * - [`reduceRight`](#reduceRight)
 * - [`transduce`](#transduce)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.reduceWhile, R.reduceBy, R.reduceRight, R.transduce
 * @example
 *
 *     R.reduce(
 *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *       [],
 *       [1, 2, 3, 4, 5]) // [1, 2, 3]
 */

var reduced =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduced);

/***/ }),

/***/ "./node_modules/ramda/es/reject.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/reject.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_complement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_complement.js */ "./node_modules/ramda/es/internal/_complement.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter.js */ "./node_modules/ramda/es/filter.js");



/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      const isOdd = (n) => n % 2 !== 0;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */

var reject =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function reject(pred, filterable) {
  return (0,_filter_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_internal_complement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pred), filterable);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reject);

/***/ }),

/***/ "./node_modules/ramda/es/remove.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/remove.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @see R.without
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */

var remove =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (remove);

/***/ }),

/***/ "./node_modules/ramda/es/repeat.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/repeat.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _always_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./always.js */ "./node_modules/ramda/es/always.js");
/* harmony import */ var _times_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./times.js */ "./node_modules/ramda/es/times.js");



/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @see R.times
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      const obj = {};
 *      const repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */

var repeat =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function repeat(value, n) {
  return (0,_times_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_always_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value), n);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (repeat);

/***/ }),

/***/ "./node_modules/ramda/es/replace.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/replace.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * The first two parameters correspond to the parameters of the
 * `String.prototype.replace()` function, so the second parameter can also be a
 * function.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */

var replace =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (replace);

/***/ }),

/***/ "./node_modules/ramda/es/reverse.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/reverse.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isString.js */ "./node_modules/ramda/es/internal/_isString.js");


/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */

var reverse =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function reverse(list) {
  return (0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reverse);

/***/ }),

/***/ "./node_modules/ramda/es/scan.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/scan.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @see R.reduce, R.mapAccum
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */

var scan =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];

  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scan);

/***/ }),

/***/ "./node_modules/ramda/es/sequence.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/sequence.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _ap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ap.js */ "./node_modules/ramda/es/ap.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _prepend_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prepend.js */ "./node_modules/ramda/es/prepend.js");
/* harmony import */ var _reduceRight_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduceRight.js */ "./node_modules/ramda/es/reduceRight.js");





/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */

var sequence =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : (0,_reduceRight_js__WEBPACK_IMPORTED_MODULE_4__["default"])(function (x, acc) {
    return (0,_ap_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_prepend_js__WEBPACK_IMPORTED_MODULE_3__["default"], x), acc);
  }, of([]), traversable);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sequence);

/***/ }),

/***/ "./node_modules/ramda/es/set.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/set.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _always_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./always.js */ "./node_modules/ramda/es/always.js");
/* harmony import */ var _over_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./over.js */ "./node_modules/ramda/es/over.js");



/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.view, R.over, R.lens, R.lensIndex, R.lensProp, R.lensPath
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */

var set =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function set(lens, v, x) {
  return (0,_over_js__WEBPACK_IMPORTED_MODULE_2__["default"])(lens, (0,_always_js__WEBPACK_IMPORTED_MODULE_1__["default"])(v), x);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (set);

/***/ }),

/***/ "./node_modules/ramda/es/slice.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/slice.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");


/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */

var slice =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
(0,_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__["default"])('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slice);

/***/ }),

/***/ "./node_modules/ramda/es/sort.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/sort.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, a) -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @see R.ascend, R.descend
 * @example
 *
 *      const diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */

var sort =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sort);

/***/ }),

/***/ "./node_modules/ramda/es/sortBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/sortBy.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      const sortByFirstItem = R.sortBy(R.prop(0));
 *      const pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *
 *      const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      const people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */

var sortBy =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortBy);

/***/ }),

/***/ "./node_modules/ramda/es/sortWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/sortWith.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [(a, a) -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @see R.ascend, R.descend
 * @example
 *
 *      const alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      const bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      const people = [clara, bob, alice];
 *      const ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */

var sortWith =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var result = 0;
    var i = 0;

    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }

    return result;
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortWith);

/***/ }),

/***/ "./node_modules/ramda/es/split.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/split.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/es/invoker.js");

/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `sep`.
 * @see R.join
 * @example
 *
 *      const pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */

var split =
/*#__PURE__*/
(0,_invoker_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 'split');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (split);

/***/ }),

/***/ "./node_modules/ramda/es/splitAt.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/splitAt.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _length_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./length.js */ "./node_modules/ramda/es/length.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");



/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */

var splitAt =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function splitAt(index, array) {
  return [(0,_slice_js__WEBPACK_IMPORTED_MODULE_2__["default"])(0, index, array), (0,_slice_js__WEBPACK_IMPORTED_MODULE_2__["default"])(index, (0,_length_js__WEBPACK_IMPORTED_MODULE_1__["default"])(array), array)];
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (splitAt);

/***/ }),

/***/ "./node_modules/ramda/es/splitEvery.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/splitEvery.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");


/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */

var splitEvery =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }

  var result = [];
  var idx = 0;

  while (idx < list.length) {
    result.push((0,_slice_js__WEBPACK_IMPORTED_MODULE_1__["default"])(idx, idx += n, list));
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (splitEvery);

/***/ }),

/***/ "./node_modules/ramda/es/splitWhen.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/splitWhen.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */

var splitWhen =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (splitWhen);

/***/ }),

/***/ "./node_modules/ramda/es/splitWhenever.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/splitWhenever.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");

/**
 * Splits an array into slices on every occurrence of a value.
 *
 * @func
 * @memberOf R
 * @since v0.26.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhenever(R.equals(2), [1, 2, 3, 2, 4, 5, 2, 6, 7]); //=> [[1], [3], [4, 5], [6, 7]]
 */

var splitWhenever =
/*#__PURE__*/
(0,_internal_curryN_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, [], function splitWhenever(pred, list) {
  var acc = [];
  var curr = [];

  for (var i = 0; i < list.length; i = i + 1) {
    if (!pred(list[i])) {
      curr.push(list[i]);
    }

    if ((i < list.length - 1 && pred(list[i + 1]) || i === list.length - 1) && curr.length > 0) {
      acc.push(curr);
      curr = [];
    }
  }

  return acc;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (splitWhenever);

/***/ }),

/***/ "./node_modules/ramda/es/startsWith.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/startsWith.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");
/* harmony import */ var _take_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./take.js */ "./node_modules/ramda/es/take.js");



/**
 * Checks if a list starts with the provided sublist.
 *
 * Similarly, checks if a string starts with the provided substring.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> [a] -> Boolean
 * @sig String -> String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @see R.endsWith
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */

var startsWith =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prefix, list) {
  return (0,_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_take_js__WEBPACK_IMPORTED_MODULE_2__["default"])(prefix.length, list), prefix);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startsWith);

/***/ }),

/***/ "./node_modules/ramda/es/subtract.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/subtract.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      const minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      const complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */

var subtract =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function subtract(a, b) {
  return Number(a) - Number(b);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (subtract);

/***/ }),

/***/ "./node_modules/ramda/es/sum.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/sum.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add.js */ "./node_modules/ramda/es/add.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");


/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */

var sum =
/*#__PURE__*/
(0,_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_add_js__WEBPACK_IMPORTED_MODULE_0__["default"], 0);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sum);

/***/ }),

/***/ "./node_modules/ramda/es/symmetricDifference.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/symmetricDifference.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./concat.js */ "./node_modules/ramda/es/concat.js");
/* harmony import */ var _difference_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./difference.js */ "./node_modules/ramda/es/difference.js");



/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */

var symmetricDifference =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function symmetricDifference(list1, list2) {
  return (0,_concat_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_difference_js__WEBPACK_IMPORTED_MODULE_2__["default"])(list1, list2), (0,_difference_js__WEBPACK_IMPORTED_MODULE_2__["default"])(list2, list1));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (symmetricDifference);

/***/ }),

/***/ "./node_modules/ramda/es/symmetricDifferenceWith.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/symmetricDifferenceWith.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./concat.js */ "./node_modules/ramda/es/concat.js");
/* harmony import */ var _differenceWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./differenceWith.js */ "./node_modules/ramda/es/differenceWith.js");



/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      const eqA = R.eqBy(R.prop('a'));
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      const l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */

var symmetricDifferenceWith =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function symmetricDifferenceWith(pred, list1, list2) {
  return (0,_concat_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_differenceWith_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pred, list1, list2), (0,_differenceWith_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pred, list2, list1));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (symmetricDifferenceWith);

/***/ }),

/***/ "./node_modules/ramda/es/tail.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/tail.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");



/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */

var tail =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
(0,_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__["default"])('tail',
/*#__PURE__*/
(0,_slice_js__WEBPACK_IMPORTED_MODULE_2__["default"])(1, Infinity)));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tail);

/***/ }),

/***/ "./node_modules/ramda/es/take.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/take.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xtake_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xtake.js */ "./node_modules/ramda/es/internal/_xtake.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");




/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      const personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      const takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */

var take =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['take'], _internal_xtake_js__WEBPACK_IMPORTED_MODULE_2__["default"], function take(n, xs) {
  return (0,_slice_js__WEBPACK_IMPORTED_MODULE_3__["default"])(0, n < 0 ? Infinity : n, xs);
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (take);

/***/ }),

/***/ "./node_modules/ramda/es/takeLast.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/takeLast.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _drop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drop.js */ "./node_modules/ramda/es/drop.js");


/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */

var takeLast =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function takeLast(n, xs) {
  return (0,_drop_js__WEBPACK_IMPORTED_MODULE_1__["default"])(n >= 0 ? xs.length - n : 0, xs);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (takeLast);

/***/ }),

/***/ "./node_modules/ramda/es/takeLastWhile.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/takeLastWhile.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");


/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      const isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 *
 *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 */

var takeLastWhile =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function takeLastWhile(fn, xs) {
  var idx = xs.length - 1;

  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }

  return (0,_slice_js__WEBPACK_IMPORTED_MODULE_1__["default"])(idx + 1, Infinity, xs);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (takeLastWhile);

/***/ }),

/***/ "./node_modules/ramda/es/takeWhile.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/takeWhile.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xtakeWhile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xtakeWhile.js */ "./node_modules/ramda/es/internal/_xtakeWhile.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");




/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      const isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 */

var takeWhile =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['takeWhile'], _internal_xtakeWhile_js__WEBPACK_IMPORTED_MODULE_2__["default"], function takeWhile(fn, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }

  return (0,_slice_js__WEBPACK_IMPORTED_MODULE_3__["default"])(0, idx, xs);
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (takeWhile);

/***/ }),

/***/ "./node_modules/ramda/es/tap.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/tap.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xtap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xtap.js */ "./node_modules/ramda/es/internal/_xtap.js");



/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      const sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */

var tap =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xtap_js__WEBPACK_IMPORTED_MODULE_2__["default"], function tap(fn, x) {
  fn(x);
  return x;
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tap);

/***/ }),

/***/ "./node_modules/ramda/es/test.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/test.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_cloneRegExp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_cloneRegExp.js */ "./node_modules/ramda/es/internal/_cloneRegExp.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isRegExp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isRegExp.js */ "./node_modules/ramda/es/internal/_isRegExp.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toString.js */ "./node_modules/ramda/es/toString.js");




/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */

var test =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function test(pattern, str) {
  if (!(0,_internal_isRegExp_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + (0,_toString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(pattern));
  }

  return (0,_internal_cloneRegExp_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pattern).test(str);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (test);

/***/ }),

/***/ "./node_modules/ramda/es/thunkify.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/thunkify.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");


/**
 * Creates a thunk out of a function. A thunk delays a calculation until
 * its result is needed, providing lazy evaluation of arguments.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((a, b, ..., j) -> k) -> (a, b, ..., j) -> (() -> k)
 * @param {Function} fn A function to wrap in a thunk
 * @return {Function} Expects arguments for `fn` and returns a new function
 *  that, when called, applies those arguments to `fn`.
 * @see R.partial, R.partialRight
 * @example
 *
 *      R.thunkify(R.identity)(42)(); //=> 42
 *      R.thunkify((a, b) => a + b)(25, 17)(); //=> 42
 */

var thunkify =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function thunkify(fn) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fn.length, function createThunk() {
    var fnArgs = arguments;
    return function invokeThunk() {
      return fn.apply(this, fnArgs);
    };
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thunkify);

/***/ }),

/***/ "./node_modules/ramda/es/times.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/times.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */

var times =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }

  list = new Array(len);

  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }

  return list;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (times);

/***/ }),

/***/ "./node_modules/ramda/es/toLower.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/toLower.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/es/invoker.js");

/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */

var toLower =
/*#__PURE__*/
(0,_invoker_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0, 'toLowerCase');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toLower);

/***/ }),

/***/ "./node_modules/ramda/es/toPairs.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/toPairs.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");


/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs, R.keys, R.values
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */

var toPairs =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function toPairs(obj) {
  var pairs = [];

  for (var prop in obj) {
    if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }

  return pairs;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toPairs);

/***/ }),

/***/ "./node_modules/ramda/es/toPairsIn.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/toPairsIn.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */

var toPairsIn =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function toPairsIn(obj) {
  var pairs = [];

  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }

  return pairs;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toPairsIn);

/***/ }),

/***/ "./node_modules/ramda/es/toString.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/toString.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_toString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_toString.js */ "./node_modules/ramda/es/internal/_toString.js");


/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */

var toString =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function toString(val) {
  return (0,_internal_toString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val, []);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toString);

/***/ }),

/***/ "./node_modules/ramda/es/toUpper.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/toUpper.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/es/invoker.js");

/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */

var toUpper =
/*#__PURE__*/
(0,_invoker_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0, 'toUpperCase');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toUpper);

/***/ }),

/***/ "./node_modules/ramda/es/transduce.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/transduce.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_xwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_xwrap.js */ "./node_modules/ramda/es/internal/_xwrap.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");



/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      const isOdd = (x) => x % 2 !== 0;
 *      const firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 */

var transduce =
/*#__PURE__*/
(0,_curryN_js__WEBPACK_IMPORTED_MODULE_2__["default"])(4, function transduce(xf, fn, acc, list) {
  return (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xf(typeof fn === 'function' ? (0,_internal_xwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn) : fn), acc, list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (transduce);

/***/ }),

/***/ "./node_modules/ramda/es/transpose.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/transpose.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 *      // If some of the rows are shorter than the following rows, their elements are skipped:
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */

var transpose =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function transpose(outerlist) {
  var i = 0;
  var result = [];

  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;

    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }

      result[j].push(innerlist[j]);
      j += 1;
    }

    i += 1;
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (transpose);

/***/ }),

/***/ "./node_modules/ramda/es/traverse.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/traverse.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _sequence_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sequence.js */ "./node_modules/ramda/es/sequence.js");



/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Maybe.Nothing` if the given divisor is `0`
 *      const safeDiv = n => d => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Maybe.Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Maybe.Nothing
 */

var traverse =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function traverse(of, f, traversable) {
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](f, of) : typeof traversable.traverse === 'function' ? traversable.traverse(f, of) : (0,_sequence_js__WEBPACK_IMPORTED_MODULE_2__["default"])(of, (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f, traversable));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (traverse);

/***/ }),

/***/ "./node_modules/ramda/es/trim.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/trim.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = typeof String.prototype.trim === 'function';
/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */

var trim = !hasProtoTrim ||
/*#__PURE__*/
ws.trim() || !
/*#__PURE__*/
zeroWidth.trim() ?
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function trim(str) {
  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
  return str.replace(beginRx, '').replace(endRx, '');
}) :
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function trim(str) {
  return str.trim();
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trim);

/***/ }),

/***/ "./node_modules/ramda/es/tryCatch.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/tryCatch.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");



/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send them to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(() => { throw 'foo'}, R.always('caught'))('bar') // =>
 *      'caught'
 *      R.tryCatch(R.times(R.identity), R.always([]))('s') // => []
 *      R.tryCatch(() => { throw 'this is not a valid value'}, (err, value)=>({error : err,  value }))('bar') // => {'error': 'this is not a valid value', 'value': 'bar'}
 */

var tryCatch =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function _tryCatch(tryer, catcher) {
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tryer.length, function () {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_1__["default"])([e], arguments));
    }
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tryCatch);

/***/ }),

/***/ "./node_modules/ramda/es/type.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/type.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */

var type =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (type);

/***/ }),

/***/ "./node_modules/ramda/es/unapply.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/unapply.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */

var unapply =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function unapply(fn) {
  return function () {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unapply);

/***/ }),

/***/ "./node_modules/ramda/es/unary.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/unary.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _nAry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nAry.js */ "./node_modules/ramda/es/nAry.js");


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (a -> b -> c -> ... -> z) -> (a -> z)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @see R.binary, R.nAry
 * @example
 *
 *      const takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */

var unary =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function unary(fn) {
  return (0,_nAry_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1, fn);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unary);

/***/ }),

/***/ "./node_modules/ramda/es/uncurryN.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/uncurryN.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");


/**
 * Returns a function of arity `n` from a (manually) curried function.
 * Note that, the returned function is actually a ramda style
 * curryied function, which can accept one or more arguments in each
 * function calling.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b -> c ... -> z) -> ((a -> b -> c ...) -> z)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry, R.curryN
 * @example
 *
 *      const addFour = a => b => c => d => a + b + c + d;
 *
 *      const uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */

var uncurryN =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function uncurryN(depth, fn) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(depth, function () {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;

    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }

    return value;
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uncurryN);

/***/ }),

/***/ "./node_modules/ramda/es/unfold.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/unfold.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      const f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */

var unfold =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];

  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unfold);

/***/ }),

/***/ "./node_modules/ramda/es/union.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/union.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./compose.js */ "./node_modules/ramda/es/compose.js");
/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uniq.js */ "./node_modules/ramda/es/uniq.js");




/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */

var union =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
(0,_compose_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_uniq_js__WEBPACK_IMPORTED_MODULE_3__["default"], _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"]));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (union);

/***/ }),

/***/ "./node_modules/ramda/es/unionWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/unionWith.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _uniqWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uniqWith.js */ "./node_modules/ramda/es/uniqWith.js");



/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements. If an element exists
 * in both lists, the first element from the first list will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      const l1 = [{a: 1}, {a: 2}];
 *      const l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */

var unionWith =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function unionWith(pred, list1, list2) {
  return (0,_uniqWith_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pred, (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list1, list2));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unionWith);

/***/ }),

/***/ "./node_modules/ramda/es/uniq.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/uniq.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/ramda/es/identity.js");
/* harmony import */ var _uniqBy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uniqBy.js */ "./node_modules/ramda/es/uniqBy.js");


/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */

var uniq =
/*#__PURE__*/
(0,_uniqBy_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_identity_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uniq);

/***/ }),

/***/ "./node_modules/ramda/es/uniqBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/uniqBy.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_Set_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_Set.js */ "./node_modules/ramda/es/internal/_Set.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xuniqBy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xuniqBy.js */ "./node_modules/ramda/es/internal/_xuniqBy.js");




/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */

var uniqBy =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_2__["default"])([], _internal_xuniqBy_js__WEBPACK_IMPORTED_MODULE_3__["default"], function (fn, list) {
  var set = new _internal_Set_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);

    if (set.add(appliedItem)) {
      result.push(item);
    }

    idx += 1;
  }

  return result;
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uniqBy);

/***/ }),

/***/ "./node_modules/ramda/es/uniqWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/uniqWith.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_includesWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_includesWith.js */ "./node_modules/ramda/es/internal/_includesWith.js");
/* harmony import */ var _internal_xuniqWith_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xuniqWith.js */ "./node_modules/ramda/es/internal/_xuniqWith.js");




/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      const strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */

var uniqWith =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xuniqWith_js__WEBPACK_IMPORTED_MODULE_3__["default"], function (pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;

  while (idx < len) {
    item = list[idx];

    if (!(0,_internal_includesWith_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pred, item, result)) {
      result[result.length] = item;
    }

    idx += 1;
  }

  return result;
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uniqWith);

/***/ }),

/***/ "./node_modules/ramda/es/unless.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/unless.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> b) -> a -> a | b
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when, R.cond
 * @example
 *
 *      let safeInc = R.unless(R.isNil, R.inc);
 *      safeInc(null); //=> null
 *      safeInc(1); //=> 2
 */

var unless =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unless);

/***/ }),

/***/ "./node_modules/ramda/es/unnest.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/unnest.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_identity.js */ "./node_modules/ramda/es/internal/_identity.js");
/* harmony import */ var _chain_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chain.js */ "./node_modules/ramda/es/chain.js");


/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */

var unnest =
/*#__PURE__*/
(0,_chain_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_internal_identity_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unnest);

/***/ }),

/***/ "./node_modules/ramda/es/until.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/until.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */

var until =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function until(pred, fn, init) {
  var val = init;

  while (!pred(val)) {
    val = fn(val);
  }

  return val;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (until);

/***/ }),

/***/ "./node_modules/ramda/es/unwind.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/unwind.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _internal_assoc_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_assoc.js */ "./node_modules/ramda/es/internal/_assoc.js");




/**
 *
 * Deconstructs an array field from the input documents to output a document for each element.
 * Each output document is the input document with the value of the array field replaced by the element.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Object
 * @sig String -> {k: [v]} -> [{k: v}]
 * @param {String} key The key to determine which property of the object should be unwind
 * @param {Object} object The object containing list under property named as key which is to unwind
 * @return {List} A new list of object containing the value of input key having list replaced by each element in the object.
 * @example
 *
 * R.unwind('hobbies', {
 *   name: 'alice',
 *   hobbies: ['Golf', 'Hacking'],
 *   colors: ['red', 'green'],
 * });
 * // [
 * //   { name: 'alice', hobbies: 'Golf', colors: ['red', 'green'] },
 * //   { name: 'alice', hobbies: 'Hacking', colors: ['red', 'green'] }
 * // ]
 */

var unwind =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (key, object) {
  // If key is not in object or key is not as a list in object
  if (!(key in object && (0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object[key]))) {
    return [object];
  } // Map over object[key] which is a list and assoc each element with key


  return (0,_internal_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (item) {
    return (0,_internal_assoc_js__WEBPACK_IMPORTED_MODULE_3__["default"])(key, item, object);
  }, object[key]);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unwind);

/***/ }),

/***/ "./node_modules/ramda/es/update.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/update.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _adjust_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adjust.js */ "./node_modules/ramda/es/adjust.js");
/* harmony import */ var _always_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./always.js */ "./node_modules/ramda/es/always.js");



/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, '_', ['a', 'b', 'c']);      //=> ['a', '_', 'c']
 *      R.update(-1, '_', ['a', 'b', 'c']);     //=> ['a', 'b', '_']
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */

var update =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function update(idx, x, list) {
  return (0,_adjust_js__WEBPACK_IMPORTED_MODULE_1__["default"])(idx, (0,_always_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x), list);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (update);

/***/ }),

/***/ "./node_modules/ramda/es/useWith.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/useWith.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");


/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */

var useWith =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function useWith(fn, transformers) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(transformers.length, function () {
    var args = [];
    var idx = 0;

    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }

    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWith);

/***/ }),

/***/ "./node_modules/ramda/es/values.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/values.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");


/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys, R.toPairs
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */

var values =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function values(obj) {
  var props = (0,_keys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;

  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }

  return vals;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (values);

/***/ }),

/***/ "./node_modules/ramda/es/valuesIn.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/valuesIn.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @see R.values, R.keysIn
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */

var valuesIn =
/*#__PURE__*/
(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function valuesIn(obj) {
  var prop;
  var vs = [];

  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }

  return vs;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (valuesIn);

/***/ }),

/***/ "./node_modules/ramda/es/view.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/view.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
 // `Const` is a functor that effectively ignores the function given to `map`.

var Const = function (x) {
  return {
    value: x,
    'fantasy-land/map': function () {
      return this;
    }
  };
};
/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.set, R.over, R.lens, R.lensIndex, R.lensProp, R.lensPath
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */


var view =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function view(lens, x) {
  // Using `Const` effectively ignores the setter function of the `lens`,
  // leaving the value returned by the getter function unmodified.
  return lens(Const)(x).value;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (view);

/***/ }),

/***/ "./node_modules/ramda/es/when.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/when.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> b) -> a -> a | b
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless, R.cond
 * @example
 *
 *      // truncate :: String -> String
 *      const truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */

var when =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (when);

/***/ }),

/***/ "./node_modules/ramda/es/where.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/where.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */

var where =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function where(spec, testObj) {
  for (var prop in spec) {
    if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }

  return true;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (where);

/***/ }),

/***/ "./node_modules/ramda/es/whereAny.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/whereAny.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");


/**
 * Takes a spec object and a test object; each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `whereAny` returns true if at least one of the predicates return true,
 * false otherwise.
 *
 * `whereAny` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.whereAny({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('xxx')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 8, y: 34}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 9, y: 21}); //=> false
 *      pred({a: 'bar', b: 'xxx', x: 10, y: 20}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 10, y: 20}); //=> true
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> true
 */

var whereAny =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function whereAny(spec, testObj) {
  for (var prop in spec) {
    if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop, spec) && spec[prop](testObj[prop])) {
      return true;
    }
  }

  return false;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (whereAny);

/***/ }),

/***/ "./node_modules/ramda/es/whereEq.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/whereEq.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _where_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./where.js */ "./node_modules/ramda/es/where.js");




/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propEq, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */

var whereEq =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function whereEq(spec, testObj) {
  return (0,_where_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"], spec), testObj);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (whereEq);

/***/ }),

/***/ "./node_modules/ramda/es/without.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/without.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includes.js */ "./node_modules/ramda/es/internal/_includes.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flip.js */ "./node_modules/ramda/es/flip.js");
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reject.js */ "./node_modules/ramda/es/reject.js");




/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference, R.remove
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */

var without =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (xs, list) {
  return (0,_reject_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_flip_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_internal_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xs), list);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (without);

/***/ }),

/***/ "./node_modules/ramda/es/xor.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/xor.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Exclusive disjunction logical operation.
 * Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Logic
 * @sig a -> b -> Boolean
 * @param {Any} a
 * @param {Any} b
 * @return {Boolean} true if one of the arguments is truthy and the other is falsy
 * @see R.or, R.and
 * @example
 *
 *      R.xor(true, true); //=> false
 *      R.xor(true, false); //=> true
 *      R.xor(false, true); //=> true
 *      R.xor(false, false); //=> false
 */

var xor =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function xor(a, b) {
  return Boolean(!a ^ !b);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (xor);

/***/ }),

/***/ "./node_modules/ramda/es/xprod.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/xprod.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */

var xprod =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function xprod(a, b) {
  // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];

  while (idx < ilen) {
    j = 0;

    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }

    idx += 1;
  }

  return result;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (xprod);

/***/ }),

/***/ "./node_modules/ramda/es/zip.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/zip.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */

var zip =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);

  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }

  return rv;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (zip);

/***/ }),

/***/ "./node_modules/ramda/es/zipObj.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/zipObj.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */

var zipObj =
/*#__PURE__*/
(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};

  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }

  return out;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (zipObj);

/***/ }),

/***/ "./node_modules/ramda/es/zipWith.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/zipWith.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      const f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */

var zipWith =
/*#__PURE__*/
(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);

  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }

  return rv;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (zipWith);

/***/ }),

/***/ "./node_modules/stylis/src/Enum.js":
/*!*****************************************!*\
  !*** ./node_modules/stylis/src/Enum.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHARSET": () => (/* binding */ CHARSET),
/* harmony export */   "COMMENT": () => (/* binding */ COMMENT),
/* harmony export */   "COUNTER_STYLE": () => (/* binding */ COUNTER_STYLE),
/* harmony export */   "DECLARATION": () => (/* binding */ DECLARATION),
/* harmony export */   "DOCUMENT": () => (/* binding */ DOCUMENT),
/* harmony export */   "FONT_FACE": () => (/* binding */ FONT_FACE),
/* harmony export */   "FONT_FEATURE_VALUES": () => (/* binding */ FONT_FEATURE_VALUES),
/* harmony export */   "IMPORT": () => (/* binding */ IMPORT),
/* harmony export */   "KEYFRAMES": () => (/* binding */ KEYFRAMES),
/* harmony export */   "MEDIA": () => (/* binding */ MEDIA),
/* harmony export */   "MOZ": () => (/* binding */ MOZ),
/* harmony export */   "MS": () => (/* binding */ MS),
/* harmony export */   "NAMESPACE": () => (/* binding */ NAMESPACE),
/* harmony export */   "PAGE": () => (/* binding */ PAGE),
/* harmony export */   "RULESET": () => (/* binding */ RULESET),
/* harmony export */   "SUPPORTS": () => (/* binding */ SUPPORTS),
/* harmony export */   "VIEWPORT": () => (/* binding */ VIEWPORT),
/* harmony export */   "WEBKIT": () => (/* binding */ WEBKIT)
/* harmony export */ });
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'


/***/ }),

/***/ "./node_modules/stylis/src/Middleware.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Middleware.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleware": () => (/* binding */ middleware),
/* harmony export */   "namespace": () => (/* binding */ namespace),
/* harmony export */   "prefixer": () => (/* binding */ prefixer),
/* harmony export */   "rulesheet": () => (/* binding */ rulesheet)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/stylis/src/Prefixer.js");






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_2__.prefix)(element.value, element.length)
					break
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
					return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {value: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT)})], callback)
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
					if (element.length)
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)(element.props, function (value) {
							switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]})], callback)
								// :placeholder
								case '::placeholder':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1')]})
									], callback)
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
			element.props = element.props.map(function (value) {
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.tokenize)(value), function (value, index, children) {
					switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 0)) {
						// \f
						case 12:
							return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) > 1 ? '' : value
								case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}


/***/ }),

/***/ "./node_modules/stylis/src/Parser.js":
/*!*******************************************!*\
  !*** ./node_modules/stylis/src/Parser.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comment": () => (/* binding */ comment),
/* harmony export */   "compile": () => (/* binding */ compile),
/* harmony export */   "declaration": () => (/* binding */ declaration),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "ruleset": () => (/* binding */ ruleset)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)()) {
			// (
			case 40:
				if (previous != 108 && characters.charCodeAt(length - 1) == 58) {
					if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.whitespace)(previous)
				break
			// \
			case 92:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.escaping)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)() - 1, 7)
				continue
			// /
			case 47:
				switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)()) {
					case 42: case 47:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)()), root, parent), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset:
						if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
							(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule) {
									// d m s
									case 100: case 109: case 115:
										parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.prev)() == 125)
						continue

				switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)() === 45)
							characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)())

						atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)(), offset = length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)())), character++
						break
					// -
					case 45:
						if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
			if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
				props[k++] = z

	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_2__.RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length)
}


/***/ }),

/***/ "./node_modules/stylis/src/Prefixer.js":
/*!*********************************************!*\
  !*** ./node_modules/stylis/src/Prefixer.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": () => (/* binding */ prefix)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {string} value
 * @param {number} length
 * @return {string}
 */
function prefix (value, length) {
	switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.hash)(value, length)) {
		// color-adjust
		case 5103:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// flex, flex-direction
		case 6828: case 4268:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// order
		case 6165:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value
		// align-items
		case 5187:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/, '') + value
		// align-content
		case 4675:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /align-content|flex-|-self/, '') + value
		// flex-shrink
		case 5548:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value
		// cursor
		case 6187:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 1 - length > 6)
				switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, 'stretch') ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'stretch', 'fill-available'), length) + value : value
				}
			break
		// position: sticky
		case 4949:
			// (s)ticky?
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1) !== 115)
				break
		// display: (flex|inline-flex)
		case 6444:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 3 - (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, '!important') && 10))) {
				// stic(k)y
				case 107:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT) + value
				// (inline-)?fl(e)x
				case 101:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value
			}
			break
		// writing-mode
		case 5936:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
			}

			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
	}

	return value
}


/***/ }),

/***/ "./node_modules/stylis/src/Serializer.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Serializer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serialize": () => (/* binding */ serialize),
/* harmony export */   "stringify": () => (/* binding */ stringify)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children)

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: return element.return = element.return || element.value
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.COMMENT: return ''
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET: element.value = element.props.join(',')
	}

	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}


/***/ }),

/***/ "./node_modules/stylis/src/Tokenizer.js":
/*!**********************************************!*\
  !*** ./node_modules/stylis/src/Tokenizer.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alloc": () => (/* binding */ alloc),
/* harmony export */   "caret": () => (/* binding */ caret),
/* harmony export */   "char": () => (/* binding */ char),
/* harmony export */   "character": () => (/* binding */ character),
/* harmony export */   "characters": () => (/* binding */ characters),
/* harmony export */   "column": () => (/* binding */ column),
/* harmony export */   "commenter": () => (/* binding */ commenter),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "dealloc": () => (/* binding */ dealloc),
/* harmony export */   "delimit": () => (/* binding */ delimit),
/* harmony export */   "delimiter": () => (/* binding */ delimiter),
/* harmony export */   "escaping": () => (/* binding */ escaping),
/* harmony export */   "identifier": () => (/* binding */ identifier),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "line": () => (/* binding */ line),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "node": () => (/* binding */ node),
/* harmony export */   "peek": () => (/* binding */ peek),
/* harmony export */   "position": () => (/* binding */ position),
/* harmony export */   "prev": () => (/* binding */ prev),
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "token": () => (/* binding */ token),
/* harmony export */   "tokenize": () => (/* binding */ tokenize),
/* harmony export */   "tokenizer": () => (/* binding */ tokenizer),
/* harmony export */   "whitespace": () => (/* binding */ whitespace)
/* harmony export */ });
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");


var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
				break
			case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
				break
			default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character)
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}


/***/ }),

/***/ "./node_modules/stylis/src/Utility.js":
/*!********************************************!*\
  !*** ./node_modules/stylis/src/Utility.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "charat": () => (/* binding */ charat),
/* harmony export */   "combine": () => (/* binding */ combine),
/* harmony export */   "from": () => (/* binding */ from),
/* harmony export */   "hash": () => (/* binding */ hash),
/* harmony export */   "indexof": () => (/* binding */ indexof),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "sizeof": () => (/* binding */ sizeof),
/* harmony export */   "strlen": () => (/* binding */ strlen),
/* harmony export */   "substr": () => (/* binding */ substr),
/* harmony export */   "trim": () => (/* binding */ trim)
/* harmony export */ });
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3)
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");



const Gameboard        = () =>
  Array( 8 )
    .fill( Array( 8 )
      .fill( "_" ) );
const gameboardMethods = {
  createGameboard:
    ( ships = [] ) =>
      ( {
        board: Gameboard(),
        ships,
      } ),
  isGameOver:
    gameboard =>
      ( gameboard.ships.every( ship =>
        ship.isSunk ) ),
  placeShip:
    position =>
      length =>
        direction =>
          gameboard =>
            ( {
              ...gameboard,
              board: gameboard.board.map( ( row, rowIndex ) =>
                row.map( ( column, columnIndex ) =>
                  ( getFullShipCoordinates( position )( length )( direction )
                    .some( ( [row_, column_] ) =>
                      row_ === rowIndex && column_ === columnIndex )
                           && ifLegalPlacement( position )( length )( direction )( gameboard.board )
                    ? _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"].createShip( length )
                    : column ) ) ),
              ships: ifLegalPlacement( position )( length )( direction )( gameboard.board )
                ? [...gameboard.ships, {
                    hitCount: 0,
                    isSunk  : false,
                    length,
                    position: {
                      direction,
                      position,
                    },
                  }]
                : gameboard.ships,
            } ),
  receiveAttack:
    target =>
      gameboard =>
        ( {
          ...registerHit( target )( gameboard ),
          ...registerMiss( target )( gameboard.board ),
        } ),
};
/**
 * "Given a position, a length, and a direction, return
 * an array of coordinates that represent the full
 * ship."
 */
const getFullShipCoordinates
  = position =>
    length =>
      direction =>
        ( direction === "horizontal"
          ? Array( length )
            .fill( position )
            .map( ( position_, index ) =>
              [position_[ 0 ], position_[ 1 ] + index] )
          : Array( length )
            .fill( position )
            .map( ( position_, index ) =>
              [position_[ 0 ] + index, position_[ 1 ]] ) );
const ifLegalPlacement
  = target =>
    length =>
      direction =>
        board =>
          ( checkIfPlacementFits( target )( length )( direction )
            && checkIfPlacementCollides( target )( length )( direction )( board ) );
/**
 * Returns true if the placement fits in the board, and
 * false if it doesn't.
 */
const checkIfPlacementFits
  = position =>
    length =>
      direction =>
        ( direction === "horizontal"
          ? position[ 1 ] + length <= 8
          : position[ 0 ] + length <= 8 );
const checkIfPlacementCollides
  = position =>
    length =>
      direction =>
        board =>
          ( direction === "horizontal"
            ? getAdjacentCells( position )( length )( board )
              .horizontal
              .every( cell =>
                cell === "_" )
            : getAdjacentCells( position )( length )( board )
              .vertical
              .every( cell =>
                cell === "_" ) );
// calculate adjacent cells considering rims of the board
const getAdjacentCells
  = position =>
    length =>
      board =>
        ( {
          horizontal: [
            ...getFullShipCoordinates( position )( length )( "horizontal" )
              .map( ( [row, column] ) =>
                board[ row - 1 ]?.[ column  ] ),
            board[ position[ 0  ] - 1 ]?.[ position[ 1 ] - 1 ],
            board[ position[ 0  ] + 1 ]?.[ position[ 1 ] + length  ],
            ...getFullShipCoordinates( position )( length )( "horizontal" )
              .map( ( [row, column] ) =>
                board[ row + 1 ]?.[ column  ] ),
            board[ position[ 0  ] + 1 ]?.[ position[ 1 ] - 1 ],
            board[ position[ 0  ] - 1 ]?.[ position[ 1 ] + length  ],
            ...getFullShipCoordinates( position )( length )( "horizontal" )
              .map( ( [row, column] ) =>
                board[ row ][ column ] ),
            board[ position[ 0 ] ][ position[ 1 ] - 1 ],
            board[ position[ 0 ] ][ position[ 1 ] + length  ],
          ]
            .filter( cell =>
              cell !== undefined ),
          vertical: [
            ...getFullShipCoordinates( position )( length )( "vertical" )
              .map( ( [row, column] ) =>
                board[ row ]?.[ column - 1 ] ),
            board[ position[ 0 ] - 1 ]?.[ position[ 1 ] - 1 ],
            board[ position[ 0 ] + length  ]?.[ position[ 1 ] - 1 ],
            ...getFullShipCoordinates( position )( length )( "vertical" )
              .map( ( [row, column] ) =>
                board[ row ]?.[ column + 1 ] ),
            board[ position[ 0 ] - 1 ]?.[ position[ 1 ] + 1 ],
            board[ position[ 0 ] + length  ]?.[ position[ 1 ] + 1 ],
            ...getFullShipCoordinates( position )( length )( "vertical" )
              .map( ( [row, column] ) =>
                board[ row ]?.[ column ] ),
            board[ position[ 0 ] - 1 ]?.[ position[ 1 ] ],
            board[ position[ 0 ] + length  ]?.[ position[ 1 ] ],
          ]
            .filter( cell =>
              cell !== undefined ),
        } );
const registerMiss
  = target =>
    board =>
      ( {
        board: board.map( ( row, rowIndex ) =>
          row.map( ( column, columnIndex ) =>
            ( rowIndex === target[ 0 ]
            && columnIndex === target[ 1 ]
              ? ( typeof column === "object" ? "H" : "X" )
              : column ) ) ),
      } );
const registerHit
  = target =>
    gameboard => {

      if ( typeof gameboard.board[ target[ 0 ] ][ target[ 1 ] ] !== "object" ) {

        return gameboard;

      }
      return ( {
        ...gameboard,
        ...registerHitAtShips( target )( gameboard ),
      } );

    };
const registerHitAtShips
  = target =>
    gameboard =>
      ( {

        ships: gameboard.ships.map( ship =>
          ( getFullShipCoordinates( ship.position.position )( ship.length )( ship.position.direction )
            .some( ( [row, column] ) =>
              row === target[ 0 ] && column === target[ 1 ] )
            ? _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"].hit( ship )
            : ship ) ),

      } );
/**
 * If the column is an object, then it's a hit.
 */
const checkIfHit
  = column =>
    typeof column === "object";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboardMethods);


/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/css */ "./node_modules/@emotion/css/dist/emotion-css.esm.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* eslint-disable fp/no-unused-expression,fp/no-mutation,fp/no-nil */

/* create 2 players
   place ships
   render boards
   take turns */







const bodyStyle = _emotion_css__WEBPACK_IMPORTED_MODULE_0__.css`
  font-family     : Rubik, 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color           : hsla(0, 0%, 100%, 0.8);
  display         : flex;
  gap             : 1em;
  flex-direction  : column;
  align-items     : center;
  justify-content : center;
  height          : 100vh;
  background-color: #222;
`;
document.body.classList.add( bodyStyle );

const gameStyle      = _emotion_css__WEBPACK_IMPORTED_MODULE_0__.css`
  display         : flex;
  flex-direction  : column;
  align-items     : center;
  justify-content : center;
  gap             : 1em;
  height          : 90vh;
  width           : 90vh;
  background-color: #222;
`;
const gameboardStyle = _emotion_css__WEBPACK_IMPORTED_MODULE_0__.css`
  display              : grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows   : repeat(8, 1fr);
  grid-gap             : 1px;
  width                : 40vh;
  height               : 40vh;
  background-color     : #222;
  transition           : all 1s ease-in-out;

  &#player1-board {
    div[data-cell="2"] {
      background-color: orange;
    }
    div[data-cell="3"] {
      background-color: red;
    }
    div[data-cell="4"] {
      background-color: blue;
    }
    div[data-cell="5"] {
      background-color: navy;
    }
  }
  `;
const cellStyle      = _emotion_css__WEBPACK_IMPORTED_MODULE_0__.css`
    &[data-cell="X"] {
      background-color: #aaa;
    }
    &[data-cell="H"] {
      background-color: #a44;
    }
    & {
      background-color: #555;
      border          : 1px solid #000;
      width           : 100%;
      height          : 100%;
    }`;
const shipsStyle     = _emotion_css__WEBPACK_IMPORTED_MODULE_0__.css`
  display         : flex;
  flex-direction  : row;
  align-items     : center;
  justify-content : center;
  gap             : 1em;
  background-color: #222;
  margin          : 3em;
`;
const shipStyle      = _emotion_css__WEBPACK_IMPORTED_MODULE_0__.css`
  &[data-ship="2"] {
    width : 4em;
    background-color: orange;
  }
  &[data-ship="3"] {
    width : 6em;
    background-color: red;
  }
  &[data-ship="4"] {
    width : 8em;
    background-color: blue;
  }
  &[data-ship="5"] {
    width : 10em;
    background-color: navy;
  }
  & {
    background-color: #555;
    border          : 1px solid #000;
    width           : 5vh;
    height          : 5vh;
    transition      : all 0.1s ease-in-out;
  }`;
const sampleBoard    = _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"].createGameboard();
const placeShipsRandomly
  = gameboard =>
    ( ships = [ 5, 4, 3, 3, 2 ] ) => {

      const presentShips = gameboard.ships.length;
      const randomRow    = Math.floor( Math.random() * 8 );
      const randomColumn = Math.floor( Math.random() * 8 );
      const axis         = {
        0: "horizontal",
        1: "vertical",
      };
      const randomAxis   = axis[ Math.floor( Math.random() * 2 ) ];
      const newShipBoard = _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"].placeShip( [ randomRow, randomColumn ] )( ships[ 0 ] )( randomAxis )( gameboard );
      if ( newShipBoard.ships.length === presentShips ) {

        return placeShipsRandomly( gameboard )( ships );

      }
      if ( ships.length === 1 ) {

        return newShipBoard;

      }
      return placeShipsRandomly( newShipBoard )( ships.slice( 1 ) );

    };
const handleTurn
  = game_ =>
    attack =>
      ( {
        ...game_,
        player1: {
          ...game_.player1,
          gameboard: _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"].receiveAttack( _player__WEBPACK_IMPORTED_MODULE_2__.aiMethods.selectTarget( game_.player1.gameboard.board ) )( game_.player1.gameboard ),
        },
        player2: {
          ...game_.player2,
          gameboard: _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"].receiveAttack( attack )( game_.player2.gameboard ),
        },
        turn: game_.turn + 2,
      } );
const renderPlayer
  = player =>
    playerBoardElement =>
      game_ =>
        player.gameboard.board.map( ( row, rowIndex ) =>
          row.map( ( column, columnIndex ) =>
            playerBoardElement.append( ( () => {

              const cellElement = document.createElement( "div" );
              cellElement.classList.add( cellStyle );
              cellElement.dataset.row    = rowIndex;
              cellElement.dataset.column = columnIndex;
              const cell                 = {
                default: () =>
                  cellElement.dataset.cell = column,
                ship: () =>
                  cellElement.dataset.cell = column.length,
              };
              cell[ ( typeof column !== "object" ) ? "default" : "ship" ]();

              // if board is not player 1's board, add event listener
              if ( playerBoardElement.id !== "player1-board" ) {

                cellElement.addEventListener( "click", () => {

                  document.body
                    .replaceChildren();
                  render( handleTurn( game_ )( [ rowIndex, columnIndex ] ) );

                } );

              }
              return cellElement;

            } )() ) ) );
const handleEnd
  = game_ =>
    gameElement => {

      if ( _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"].isGameOver( game_.player1.gameboard ) || _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"].isGameOver( game_.player2.gameboard ) ) {

        const gameOverElement       = document.createElement( "div" );
        gameOverElement.textContent = "Game Over!";
        gameElement.append( gameOverElement );

      }

    };
const render = game_ => {

  const gameElement = document.createElement( "div" );
  gameElement.classList.add( gameStyle );

  const player1BoardElement = document.createElement( "div" );
  player1BoardElement.classList.add( gameboardStyle );
  player1BoardElement.id = "player1-board";
  gameElement.append( player1BoardElement );

  renderPlayer( game_.player1 )( player1BoardElement )( game_ );
  handleEnd( game_ )( gameElement );

  const player2BoardElement = document.createElement( "div" );
  player2BoardElement.classList.add( gameboardStyle );
  gameElement.append( player2BoardElement );

  renderPlayer( game_.player2 )( player2BoardElement )( game_ );
  document.body
    .append( gameElement );

};
const preventDefault = event =>
  event.preventDefault();
const renderCells    = ( gameboard, boardElement ) =>
  gameboard.board.reduce( ( accumulator, row, rowIndex ) => {

    row.reduce( ( accumulator_, cell, columnIndex ) => {

      const cellElement = document.createElement( "div" );
      cellElement.classList.add( cellStyle );
      cellElement.dataset.row    = rowIndex;
      cellElement.dataset.column = columnIndex;
      const content              = {
        default: () =>
          cellElement.dataset.cell = cell,
        ship: () =>
          cellElement.dataset.cell = cell.length,
      };
      ( content.ship || content.default )();

      // place ship when dragged into cell
      cellElement.addEventListener( "dragenter", preventDefault );
      cellElement.addEventListener( "dragover", preventDefault );
      cellElement.addEventListener( "drop", event => {

        event.preventDefault();
        const data         = JSON.parse( event.dataTransfer.getData( "text" ) );
        const newGameboard = _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"].placeShip(
          [ Number( cellElement.dataset.row ),
            Number( cellElement.dataset.column ) ]
        )( data.length )( data.axis )( gameboard );
        document.body.replaceChildren();
        renderInitialBoard( newGameboard );

      } );
      accumulator_.append( cellElement );
      return accumulator_;

    }, accumulator );
    return accumulator;

  }, boardElement );
const rotateShip
  = axis =>
    event => {

      event.target.classList.toggle( _emotion_css__WEBPACK_IMPORTED_MODULE_0__.css`
        & {
          transform: rotate(90deg);
        }` );

      axis === "vertical"
        ? event.target.dataset.axis = "horizontal"
        : event.target.dataset.axis = "vertical";

    };
const setupShips = shipsElement =>
  [ 5, 4, 3, 3, 2 ].reduce( ( accumulator, ship ) => {

    const shipElement        = document.createElement( "div" );
    shipElement.dataset.ship = ship;
    shipElement.dataset.axis = "horizontal";
    shipElement.classList.add( shipStyle );
    shipElement.draggable = true;
    accumulator.append( shipElement );
    shipElement.addEventListener( "click", rotateShip( shipElement.dataset.axis ) );
    shipElement.addEventListener( "dragstart", event => {

      const data = {
        axis  : shipElement.dataset.axis,
        length: ship,
      };
      event.dataTransfer.setData( "text/plain", JSON.stringify( data ) );

    } );
    return accumulator;

  }, shipsElement );
const tipStyle             = _emotion_css__WEBPACK_IMPORTED_MODULE_0__.css`
    & {
      height         : 3em;
      margin         : 1rem 0;
      display        : flex;
      flex-direction : column;
      align-items    : center;
      justify-content: space-between;
    }`;
const readyButtonStyle     = _emotion_css__WEBPACK_IMPORTED_MODULE_0__.css`
    & {
      border: 1px inset lightblue;
      border-radius: 5px;
      font-size: 2em;
      padding: 0.25em 0.5em;
      outline: none;
      color: lightblue;
    }`;
const instrumentsStyle     = _emotion_css__WEBPACK_IMPORTED_MODULE_0__.css`
    & {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }`;
const renderAvailableShips = gameboard => {

  const shipsElement = document.createElement( "div" );
  shipsElement.id    = "ships";
  const tip          = document.createElement( "div" );
  tip.id             = "tip";
  const readyButton  = document.createElement( "button" );
  readyButton.classList.add( readyButtonStyle );
  readyButton.textContent = "Ready";
  readyButton.id          = "ready";
  tip.classList.add( tipStyle );
  tip.innerHTML = `
      <p>Drag and drop ships to cells to place them on the board.</p>
      <p>Click the ships to rotate them.</p>
      <p>Press Esc at any time to place ships randomly.</p>
      `;
  shipsElement.classList.add( shipsStyle );
  setupShips( shipsElement );
  const instruments = document.createElement( "div" );
  instruments.classList.add( instrumentsStyle );
  instruments.append( shipsElement );
  instruments.append( tip );
  instruments.append( readyButton );
  document.body
    .append( instruments );
  readyButton.addEventListener( "click", () => { initializeGame( gameboard ) } );

};
const initializeGame = player1Board => {

  document.body.replaceChildren();
  const player2Board = placeShipsRandomly( sampleBoard )();
  const player1      = _player__WEBPACK_IMPORTED_MODULE_2__.playerMethods.createPlayer( "Player 1" )( player1Board );
  const player2      = _player__WEBPACK_IMPORTED_MODULE_2__.playerMethods.createPlayer( "Player 2" )( player2Board );
  const game         = {
    player1,
    player2,
    turn: 0,
  };
  return render( game );

};
const randomizeOnEsc     = event => {

  if ( event.key === "Escape" ) {

    document.body.replaceChildren();
    renderInitialBoard(
      placeShipsRandomly( sampleBoard )()
    );

  }

};
const renderInitialBoard = gameboard => {

  const boardElement = document.createElement( "div" );
  boardElement.classList.add( gameboardStyle );
  boardElement.id = "player1-board";
  renderCells( gameboard, boardElement );
  document.body
    .prepend( boardElement );
  document.addEventListener( "keydown", randomizeOnEsc );

  renderAvailableShips( gameboard );
  return gameboard;

};
renderInitialBoard( sampleBoard );


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aiMethods": () => (/* binding */ aiMethods),
/* harmony export */   "playerMethods": () => (/* binding */ playerMethods)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/index.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/ship.js");





const playerMethods = {
  attack:
    attacker =>
      receiver =>
        coordinates =>
          ( {
            next: attacker,
            turn: {
              ...receiver,
              gameboard: _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"].receiveAttack( coordinates )( receiver.gameboard ),
            },
          } ),
  createPlayer:
    name =>
      board =>
        ( {
          gameboard: board,
          name,
        } ),
};
const getHitCell = board =>
  board.reduce( ( accumulator, row, rowIndex ) => {

    const hit_ = row.reduce( ( accumulator_, cell, cellIndex ) => {

      if ( cell === "H" ) {

        return [ rowIndex, cellIndex ];

      }
      return accumulator_;

    }, false );

    return hit_ || accumulator;

  }, [] );
const getUnhitCells = board =>
  board.reduce( ( accumulator, row, rowIndex ) => {

    const unhit = row.reduce( ( accumulator_, cell, cellIndex ) => {

      if ( cell !== "X" ) {

        return [ ...accumulator_, [ rowIndex, cellIndex ] ];

      }
      return accumulator_;

    }, [] );

    return [ ...accumulator, ...unhit ];

  }, [] )
    .filter( ( [ row, column ] ) =>
      board[ row ]?.[ column ] !== "H" )
    .filter( Boolean );
const aiMethods = {
  getCellNearNearHit:
    board =>
      hit => {

        const unhit     = getUnhitCells( board );
        const validMove = [
          [ hit[ 0 ] - 1, hit[ 1 ] ],
          [ hit[ 0 ] + 1, hit[ 1 ] ],
          [ hit[ 0 ], hit[ 1 ] - 1 ],
          [ hit[ 0 ], hit[ 1 ] + 1 ],
        ]
          .find( availableCell =>
            unhit.find( unhitCell =>
              ramda__WEBPACK_IMPORTED_MODULE_0__.equals( availableCell, unhitCell ) ) );
        const random    = unhit[ Math.floor( Math.random() * unhit.length ) ];
        return validMove || random;

      },
  getRandomCell:
    board =>
      ( [ Math.floor( Math.random() * board.length ),
        Math.floor( Math.random() * board.length ) ] ),
  selectTarget:
    board => {

      const hit = getHitCell( board );

      return aiMethods.getCellNearNearHit( board )( hit );

    },
};


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship        = length =>
  ( {
    hitCount: 0,
    isSunk  : false,
    length,
  } );
const shipMethods = {
  createShip:
    length =>
      Ship( length ),
  hit:
    ship =>
      ( {
        ...ship,
        hitCount: ship.hitCount + 1,
        isSunk  : ship.hitCount + 1 === ship.length,
      } ),
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipMethods);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/gameboard.js");
/******/ 	__webpack_require__("./src/page.js");
/******/ 	__webpack_require__("./src/player.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ship.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map