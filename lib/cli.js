var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  __markAsModule(target);
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true}), module2);
};

// node_modules/.pnpm/dotenv@8.2.0/node_modules/dotenv/lib/main.js
var require_main = __commonJS((exports2, module2) => {
  var fs5 = require("fs");
  var path5 = require("path");
  function log(message) {
    console.log(`[dotenv][DEBUG] ${message}`);
  }
  var NEWLINE = "\n";
  var RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
  var RE_NEWLINES = /\\n/g;
  var NEWLINES_MATCH = /\n|\r|\r\n/;
  function parse(src, options) {
    const debug = Boolean(options && options.debug);
    const obj = {};
    src.toString().split(NEWLINES_MATCH).forEach(function(line, idx) {
      const keyValueArr = line.match(RE_INI_KEY_VAL);
      if (keyValueArr != null) {
        const key = keyValueArr[1];
        let val = keyValueArr[2] || "";
        const end = val.length - 1;
        const isDoubleQuoted = val[0] === '"' && val[end] === '"';
        const isSingleQuoted = val[0] === "'" && val[end] === "'";
        if (isSingleQuoted || isDoubleQuoted) {
          val = val.substring(1, end);
          if (isDoubleQuoted) {
            val = val.replace(RE_NEWLINES, NEWLINE);
          }
        } else {
          val = val.trim();
        }
        obj[key] = val;
      } else if (debug) {
        log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
      }
    });
    return obj;
  }
  function config(options) {
    let dotenvPath = path5.resolve(process.cwd(), ".env");
    let encoding = "utf8";
    let debug = false;
    if (options) {
      if (options.path != null) {
        dotenvPath = options.path;
      }
      if (options.encoding != null) {
        encoding = options.encoding;
      }
      if (options.debug != null) {
        debug = true;
      }
    }
    try {
      const parsed = parse(fs5.readFileSync(dotenvPath, {encoding}), {debug});
      Object.keys(parsed).forEach(function(key) {
        if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
          process.env[key] = parsed[key];
        } else if (debug) {
          log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
        }
      });
      return {parsed};
    } catch (e) {
      return {error: e};
    }
  }
  module2.exports.config = config;
  module2.exports.parse = parse;
});

// node_modules/.pnpm/colorette@1.2.1/node_modules/colorette/index.cjs
var require_colorette = __commonJS((exports2) => {
  var enabled = !("NO_COLOR" in process.env) && ("FORCE_COLOR" in process.env || process.platform === "win32" || process.stdout != null && process.stdout.isTTY && process.env.TERM && process.env.TERM !== "dumb");
  var raw = (open, close, searchRegex, replaceValue) => (s) => enabled ? open + (~(s += "").indexOf(close, 4) ? s.replace(searchRegex, replaceValue) : s) + close : s;
  var init = (open, close) => {
    return raw(`[${open}m`, `[${close}m`, new RegExp(`\\x1b\\[${close}m`, "g"), `[${open}m`);
  };
  exports2.options = Object.defineProperty({}, "enabled", {
    get: () => enabled,
    set: (value) => enabled = value
  });
  exports2.reset = init(0, 0);
  exports2.bold = raw("[1m", "[22m", /\x1b\[22m/g, "[22m[1m");
  exports2.dim = raw("[2m", "[22m", /\x1b\[22m/g, "[22m[2m");
  exports2.italic = init(3, 23);
  exports2.underline = init(4, 24);
  exports2.inverse = init(7, 27);
  exports2.hidden = init(8, 28);
  exports2.strikethrough = init(9, 29);
  exports2.black = init(30, 39);
  exports2.red = init(31, 39);
  exports2.green = init(32, 39);
  exports2.yellow = init(33, 39);
  exports2.blue = init(34, 39);
  exports2.magenta = init(35, 39);
  exports2.cyan = init(36, 39);
  exports2.white = init(37, 39);
  exports2.gray = init(90, 39);
  exports2.bgBlack = init(40, 49);
  exports2.bgRed = init(41, 49);
  exports2.bgGreen = init(42, 49);
  exports2.bgYellow = init(43, 49);
  exports2.bgBlue = init(44, 49);
  exports2.bgMagenta = init(45, 49);
  exports2.bgCyan = init(46, 49);
  exports2.bgWhite = init(47, 49);
  exports2.blackBright = init(90, 39);
  exports2.redBright = init(91, 39);
  exports2.greenBright = init(92, 39);
  exports2.yellowBright = init(93, 39);
  exports2.blueBright = init(94, 39);
  exports2.magentaBright = init(95, 39);
  exports2.cyanBright = init(96, 39);
  exports2.whiteBright = init(97, 39);
  exports2.bgBlackBright = init(100, 49);
  exports2.bgRedBright = init(101, 49);
  exports2.bgGreenBright = init(102, 49);
  exports2.bgYellowBright = init(103, 49);
  exports2.bgBlueBright = init(104, 49);
  exports2.bgMagentaBright = init(105, 49);
  exports2.bgCyanBright = init(106, 49);
  exports2.bgWhiteBright = init(107, 49);
});

// src/cli.ts
__export(exports, {
  run: () => run
});

// src/input.ts
var dotenv = __toModule(require_main());
var fs = __toModule(require("fs"));

// node_modules/.pnpm/node-fetch@2.6.1/node_modules/node-fetch/lib/index.mjs
var stream = __toModule(require("stream"));
var http = __toModule(require("http"));
var url = __toModule(require("url"));
var https = __toModule(require("https"));
var zlib = __toModule(require("zlib"));
var Readable = stream.default.Readable;
var BUFFER = Symbol("buffer");
var TYPE = Symbol("type");
var Blob = class {
  constructor() {
    this[TYPE] = "";
    const blobParts = arguments[0];
    const options = arguments[1];
    const buffers = [];
    let size = 0;
    if (blobParts) {
      const a = blobParts;
      const length = Number(a.length);
      for (let i = 0; i < length; i++) {
        const element = a[i];
        let buffer;
        if (element instanceof Buffer) {
          buffer = element;
        } else if (ArrayBuffer.isView(element)) {
          buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
        } else if (element instanceof ArrayBuffer) {
          buffer = Buffer.from(element);
        } else if (element instanceof Blob) {
          buffer = element[BUFFER];
        } else {
          buffer = Buffer.from(typeof element === "string" ? element : String(element));
        }
        size += buffer.length;
        buffers.push(buffer);
      }
    }
    this[BUFFER] = Buffer.concat(buffers);
    let type = options && options.type !== void 0 && String(options.type).toLowerCase();
    if (type && !/[^\u0020-\u007E]/.test(type)) {
      this[TYPE] = type;
    }
  }
  get size() {
    return this[BUFFER].length;
  }
  get type() {
    return this[TYPE];
  }
  text() {
    return Promise.resolve(this[BUFFER].toString());
  }
  arrayBuffer() {
    const buf = this[BUFFER];
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return Promise.resolve(ab);
  }
  stream() {
    const readable = new Readable();
    readable._read = function() {
    };
    readable.push(this[BUFFER]);
    readable.push(null);
    return readable;
  }
  toString() {
    return "[object Blob]";
  }
  slice() {
    const size = this.size;
    const start = arguments[0];
    const end = arguments[1];
    let relativeStart, relativeEnd;
    if (start === void 0) {
      relativeStart = 0;
    } else if (start < 0) {
      relativeStart = Math.max(size + start, 0);
    } else {
      relativeStart = Math.min(start, size);
    }
    if (end === void 0) {
      relativeEnd = size;
    } else if (end < 0) {
      relativeEnd = Math.max(size + end, 0);
    } else {
      relativeEnd = Math.min(end, size);
    }
    const span = Math.max(relativeEnd - relativeStart, 0);
    const buffer = this[BUFFER];
    const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
    const blob = new Blob([], {type: arguments[2]});
    blob[BUFFER] = slicedBuffer;
    return blob;
  }
};
Object.defineProperties(Blob.prototype, {
  size: {enumerable: true},
  type: {enumerable: true},
  slice: {enumerable: true}
});
Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
  value: "Blob",
  writable: false,
  enumerable: false,
  configurable: true
});
function FetchError(message, type, systemError) {
  Error.call(this, message);
  this.message = message;
  this.type = type;
  if (systemError) {
    this.code = this.errno = systemError.code;
  }
  Error.captureStackTrace(this, this.constructor);
}
FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = "FetchError";
var convert;
try {
  convert = require("encoding").convert;
} catch (e) {
}
var INTERNALS = Symbol("Body internals");
var PassThrough = stream.default.PassThrough;
function Body(body) {
  var _this = this;
  var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
  let size = _ref$size === void 0 ? 0 : _ref$size;
  var _ref$timeout = _ref.timeout;
  let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
  if (body == null) {
    body = null;
  } else if (isURLSearchParams(body)) {
    body = Buffer.from(body.toString());
  } else if (isBlob(body))
    ;
  else if (Buffer.isBuffer(body))
    ;
  else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
    body = Buffer.from(body);
  } else if (ArrayBuffer.isView(body)) {
    body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
  } else if (body instanceof stream.default)
    ;
  else {
    body = Buffer.from(String(body));
  }
  this[INTERNALS] = {
    body,
    disturbed: false,
    error: null
  };
  this.size = size;
  this.timeout = timeout;
  if (body instanceof stream.default) {
    body.on("error", function(err) {
      const error = err.name === "AbortError" ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
      _this[INTERNALS].error = error;
    });
  }
}
Body.prototype = {
  get body() {
    return this[INTERNALS].body;
  },
  get bodyUsed() {
    return this[INTERNALS].disturbed;
  },
  arrayBuffer() {
    return consumeBody.call(this).then(function(buf) {
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    });
  },
  blob() {
    let ct = this.headers && this.headers.get("content-type") || "";
    return consumeBody.call(this).then(function(buf) {
      return Object.assign(new Blob([], {
        type: ct.toLowerCase()
      }), {
        [BUFFER]: buf
      });
    });
  },
  json() {
    var _this2 = this;
    return consumeBody.call(this).then(function(buffer) {
      try {
        return JSON.parse(buffer.toString());
      } catch (err) {
        return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
      }
    });
  },
  text() {
    return consumeBody.call(this).then(function(buffer) {
      return buffer.toString();
    });
  },
  buffer() {
    return consumeBody.call(this);
  },
  textConverted() {
    var _this3 = this;
    return consumeBody.call(this).then(function(buffer) {
      return convertBody(buffer, _this3.headers);
    });
  }
};
Object.defineProperties(Body.prototype, {
  body: {enumerable: true},
  bodyUsed: {enumerable: true},
  arrayBuffer: {enumerable: true},
  blob: {enumerable: true},
  json: {enumerable: true},
  text: {enumerable: true}
});
Body.mixIn = function(proto) {
  for (const name of Object.getOwnPropertyNames(Body.prototype)) {
    if (!(name in proto)) {
      const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
      Object.defineProperty(proto, name, desc);
    }
  }
};
function consumeBody() {
  var _this4 = this;
  if (this[INTERNALS].disturbed) {
    return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
  }
  this[INTERNALS].disturbed = true;
  if (this[INTERNALS].error) {
    return Body.Promise.reject(this[INTERNALS].error);
  }
  let body = this.body;
  if (body === null) {
    return Body.Promise.resolve(Buffer.alloc(0));
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return Body.Promise.resolve(body);
  }
  if (!(body instanceof stream.default)) {
    return Body.Promise.resolve(Buffer.alloc(0));
  }
  let accum = [];
  let accumBytes = 0;
  let abort = false;
  return new Body.Promise(function(resolve, reject) {
    let resTimeout;
    if (_this4.timeout) {
      resTimeout = setTimeout(function() {
        abort = true;
        reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
      }, _this4.timeout);
    }
    body.on("error", function(err) {
      if (err.name === "AbortError") {
        abort = true;
        reject(err);
      } else {
        reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
      }
    });
    body.on("data", function(chunk) {
      if (abort || chunk === null) {
        return;
      }
      if (_this4.size && accumBytes + chunk.length > _this4.size) {
        abort = true;
        reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
        return;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    });
    body.on("end", function() {
      if (abort) {
        return;
      }
      clearTimeout(resTimeout);
      try {
        resolve(Buffer.concat(accum, accumBytes));
      } catch (err) {
        reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
      }
    });
  });
}
function convertBody(buffer, headers) {
  if (typeof convert !== "function") {
    throw new Error("The package `encoding` must be installed to use the textConverted() function");
  }
  const ct = headers.get("content-type");
  let charset = "utf-8";
  let res, str;
  if (ct) {
    res = /charset=([^;]*)/i.exec(ct);
  }
  str = buffer.slice(0, 1024).toString();
  if (!res && str) {
    res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
  }
  if (!res && str) {
    res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
    if (!res) {
      res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
      if (res) {
        res.pop();
      }
    }
    if (res) {
      res = /charset=(.*)/i.exec(res.pop());
    }
  }
  if (!res && str) {
    res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
  }
  if (res) {
    charset = res.pop();
    if (charset === "gb2312" || charset === "gbk") {
      charset = "gb18030";
    }
  }
  return convert(buffer, "UTF-8", charset).toString();
}
function isURLSearchParams(obj) {
  if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
    return false;
  }
  return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
}
function isBlob(obj) {
  return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}
function clone(instance) {
  let p1, p2;
  let body = instance.body;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof stream.default && typeof body.getBoundary !== "function") {
    p1 = new PassThrough();
    p2 = new PassThrough();
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS].body = p1;
    body = p2;
  }
  return body;
}
function extractContentType(body) {
  if (body === null) {
    return null;
  } else if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  } else if (isURLSearchParams(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  } else if (isBlob(body)) {
    return body.type || null;
  } else if (Buffer.isBuffer(body)) {
    return null;
  } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
    return null;
  } else if (ArrayBuffer.isView(body)) {
    return null;
  } else if (typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  } else if (body instanceof stream.default) {
    return null;
  } else {
    return "text/plain;charset=UTF-8";
  }
}
function getTotalBytes(instance) {
  const body = instance.body;
  if (body === null) {
    return 0;
  } else if (isBlob(body)) {
    return body.size;
  } else if (Buffer.isBuffer(body)) {
    return body.length;
  } else if (body && typeof body.getLengthSync === "function") {
    if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || body.hasKnownLength && body.hasKnownLength()) {
      return body.getLengthSync();
    }
    return null;
  } else {
    return null;
  }
}
function writeToStream(dest, instance) {
  const body = instance.body;
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
}
Body.Promise = global.Promise;
var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
function validateName(name) {
  name = `${name}`;
  if (invalidTokenRegex.test(name) || name === "") {
    throw new TypeError(`${name} is not a legal HTTP header name`);
  }
}
function validateValue(value) {
  value = `${value}`;
  if (invalidHeaderCharRegex.test(value)) {
    throw new TypeError(`${value} is not a legal HTTP header value`);
  }
}
function find(map, name) {
  name = name.toLowerCase();
  for (const key in map) {
    if (key.toLowerCase() === name) {
      return key;
    }
  }
  return void 0;
}
var MAP = Symbol("map");
var Headers = class {
  constructor() {
    let init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
    this[MAP] = Object.create(null);
    if (init instanceof Headers) {
      const rawHeaders = init.raw();
      const headerNames = Object.keys(rawHeaders);
      for (const headerName of headerNames) {
        for (const value of rawHeaders[headerName]) {
          this.append(headerName, value);
        }
      }
      return;
    }
    if (init == null)
      ;
    else if (typeof init === "object") {
      const method = init[Symbol.iterator];
      if (method != null) {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        const pairs = [];
        for (const pair of init) {
          if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
            throw new TypeError("Each header pair must be iterable");
          }
          pairs.push(Array.from(pair));
        }
        for (const pair of pairs) {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          this.append(pair[0], pair[1]);
        }
      } else {
        for (const key of Object.keys(init)) {
          const value = init[key];
          this.append(key, value);
        }
      }
    } else {
      throw new TypeError("Provided initializer must be an object");
    }
  }
  get(name) {
    name = `${name}`;
    validateName(name);
    const key = find(this[MAP], name);
    if (key === void 0) {
      return null;
    }
    return this[MAP][key].join(", ");
  }
  forEach(callback) {
    let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
    let pairs = getHeaders(this);
    let i = 0;
    while (i < pairs.length) {
      var _pairs$i = pairs[i];
      const name = _pairs$i[0], value = _pairs$i[1];
      callback.call(thisArg, value, name, this);
      pairs = getHeaders(this);
      i++;
    }
  }
  set(name, value) {
    name = `${name}`;
    value = `${value}`;
    validateName(name);
    validateValue(value);
    const key = find(this[MAP], name);
    this[MAP][key !== void 0 ? key : name] = [value];
  }
  append(name, value) {
    name = `${name}`;
    value = `${value}`;
    validateName(name);
    validateValue(value);
    const key = find(this[MAP], name);
    if (key !== void 0) {
      this[MAP][key].push(value);
    } else {
      this[MAP][name] = [value];
    }
  }
  has(name) {
    name = `${name}`;
    validateName(name);
    return find(this[MAP], name) !== void 0;
  }
  delete(name) {
    name = `${name}`;
    validateName(name);
    const key = find(this[MAP], name);
    if (key !== void 0) {
      delete this[MAP][key];
    }
  }
  raw() {
    return this[MAP];
  }
  keys() {
    return createHeadersIterator(this, "key");
  }
  values() {
    return createHeadersIterator(this, "value");
  }
  [Symbol.iterator]() {
    return createHeadersIterator(this, "key+value");
  }
};
Headers.prototype.entries = Headers.prototype[Symbol.iterator];
Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
  value: "Headers",
  writable: false,
  enumerable: false,
  configurable: true
});
Object.defineProperties(Headers.prototype, {
  get: {enumerable: true},
  forEach: {enumerable: true},
  set: {enumerable: true},
  append: {enumerable: true},
  has: {enumerable: true},
  delete: {enumerable: true},
  keys: {enumerable: true},
  values: {enumerable: true},
  entries: {enumerable: true}
});
function getHeaders(headers) {
  let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
  const keys = Object.keys(headers[MAP]).sort();
  return keys.map(kind === "key" ? function(k) {
    return k.toLowerCase();
  } : kind === "value" ? function(k) {
    return headers[MAP][k].join(", ");
  } : function(k) {
    return [k.toLowerCase(), headers[MAP][k].join(", ")];
  });
}
var INTERNAL = Symbol("internal");
function createHeadersIterator(target, kind) {
  const iterator = Object.create(HeadersIteratorPrototype);
  iterator[INTERNAL] = {
    target,
    kind,
    index: 0
  };
  return iterator;
}
var HeadersIteratorPrototype = Object.setPrototypeOf({
  next() {
    if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
      throw new TypeError("Value of `this` is not a HeadersIterator");
    }
    var _INTERNAL = this[INTERNAL];
    const target = _INTERNAL.target, kind = _INTERNAL.kind, index = _INTERNAL.index;
    const values = getHeaders(target, kind);
    const len = values.length;
    if (index >= len) {
      return {
        value: void 0,
        done: true
      };
    }
    this[INTERNAL].index = index + 1;
    return {
      value: values[index],
      done: false
    };
  }
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
  value: "HeadersIterator",
  writable: false,
  enumerable: false,
  configurable: true
});
function exportNodeCompatibleHeaders(headers) {
  const obj = Object.assign({__proto__: null}, headers[MAP]);
  const hostHeaderKey = find(headers[MAP], "Host");
  if (hostHeaderKey !== void 0) {
    obj[hostHeaderKey] = obj[hostHeaderKey][0];
  }
  return obj;
}
function createHeadersLenient(obj) {
  const headers = new Headers();
  for (const name of Object.keys(obj)) {
    if (invalidTokenRegex.test(name)) {
      continue;
    }
    if (Array.isArray(obj[name])) {
      for (const val of obj[name]) {
        if (invalidHeaderCharRegex.test(val)) {
          continue;
        }
        if (headers[MAP][name] === void 0) {
          headers[MAP][name] = [val];
        } else {
          headers[MAP][name].push(val);
        }
      }
    } else if (!invalidHeaderCharRegex.test(obj[name])) {
      headers[MAP][name] = [obj[name]];
    }
  }
  return headers;
}
var INTERNALS$1 = Symbol("Response internals");
var STATUS_CODES = http.default.STATUS_CODES;
var Response = class {
  constructor() {
    let body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    Body.call(this, body, opts);
    const status = opts.status || 200;
    const headers = new Headers(opts.headers);
    if (body != null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: opts.url,
      status,
      statusText: opts.statusText || STATUS_CODES[status],
      headers,
      counter: opts.counter
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  clone() {
    return new Response(clone(this), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected
    });
  }
};
Body.mixIn(Response.prototype);
Object.defineProperties(Response.prototype, {
  url: {enumerable: true},
  status: {enumerable: true},
  ok: {enumerable: true},
  redirected: {enumerable: true},
  statusText: {enumerable: true},
  headers: {enumerable: true},
  clone: {enumerable: true}
});
Object.defineProperty(Response.prototype, Symbol.toStringTag, {
  value: "Response",
  writable: false,
  enumerable: false,
  configurable: true
});
var INTERNALS$2 = Symbol("Request internals");
var parse_url = url.default.parse;
var format_url = url.default.format;
var streamDestructionSupported = "destroy" in stream.default.Readable.prototype;
function isRequest(input2) {
  return typeof input2 === "object" && typeof input2[INTERNALS$2] === "object";
}
function isAbortSignal(signal) {
  const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
  return !!(proto && proto.constructor.name === "AbortSignal");
}
var Request = class {
  constructor(input2) {
    let init = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let parsedURL;
    if (!isRequest(input2)) {
      if (input2 && input2.href) {
        parsedURL = parse_url(input2.href);
      } else {
        parsedURL = parse_url(`${input2}`);
      }
      input2 = {};
    } else {
      parsedURL = parse_url(input2.url);
    }
    let method = init.method || input2.method || "GET";
    method = method.toUpperCase();
    if ((init.body != null || isRequest(input2) && input2.body !== null) && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    let inputBody = init.body != null ? init.body : isRequest(input2) && input2.body !== null ? clone(input2) : null;
    Body.call(this, inputBody, {
      timeout: init.timeout || input2.timeout || 0,
      size: init.size || input2.size || 0
    });
    const headers = new Headers(init.headers || input2.headers || {});
    if (inputBody != null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input2) ? input2.signal : null;
    if ("signal" in init)
      signal = init.signal;
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS$2] = {
      method,
      redirect: init.redirect || input2.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init.follow !== void 0 ? init.follow : input2.follow !== void 0 ? input2.follow : 20;
    this.compress = init.compress !== void 0 ? init.compress : input2.compress !== void 0 ? input2.compress : true;
    this.counter = init.counter || input2.counter || 0;
    this.agent = init.agent || input2.agent;
  }
  get method() {
    return this[INTERNALS$2].method;
  }
  get url() {
    return format_url(this[INTERNALS$2].parsedURL);
  }
  get headers() {
    return this[INTERNALS$2].headers;
  }
  get redirect() {
    return this[INTERNALS$2].redirect;
  }
  get signal() {
    return this[INTERNALS$2].signal;
  }
  clone() {
    return new Request(this);
  }
};
Body.mixIn(Request.prototype);
Object.defineProperty(Request.prototype, Symbol.toStringTag, {
  value: "Request",
  writable: false,
  enumerable: false,
  configurable: true
});
Object.defineProperties(Request.prototype, {
  method: {enumerable: true},
  url: {enumerable: true},
  headers: {enumerable: true},
  redirect: {enumerable: true},
  clone: {enumerable: true},
  signal: {enumerable: true}
});
function getNodeRequestOptions(request) {
  const parsedURL = request[INTERNALS$2].parsedURL;
  const headers = new Headers(request[INTERNALS$2].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  if (!parsedURL.protocol || !parsedURL.hostname) {
    throw new TypeError("Only absolute URLs are supported");
  }
  if (!/^https?:$/.test(parsedURL.protocol)) {
    throw new TypeError("Only HTTP(S) protocols are supported");
  }
  if (request.signal && request.body instanceof stream.default.Readable && !streamDestructionSupported) {
    throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
  }
  let contentLengthValue = null;
  if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body != null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number") {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate");
  }
  let agent = request.agent;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  return Object.assign({}, parsedURL, {
    method: request.method,
    headers: exportNodeCompatibleHeaders(headers),
    agent
  });
}
function AbortError(message) {
  Error.call(this, message);
  this.type = "aborted";
  this.message = message;
  Error.captureStackTrace(this, this.constructor);
}
AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = "AbortError";
var PassThrough$1 = stream.default.PassThrough;
var resolve_url = url.default.resolve;
function fetch(url2, opts) {
  if (!fetch.Promise) {
    throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
  }
  Body.Promise = fetch.Promise;
  return new fetch.Promise(function(resolve, reject) {
    const request = new Request(url2, opts);
    const options = getNodeRequestOptions(request);
    const send = (options.protocol === "https:" ? https.default : http.default).request;
    const signal = request.signal;
    let response = null;
    const abort = function abort2() {
      let error = new AbortError("The user aborted a request.");
      reject(error);
      if (request.body && request.body instanceof stream.default.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body)
        return;
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = function abortAndFinalize2() {
      abort();
      finalize();
    };
    const req = send(options);
    let reqTimeout;
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    function finalize() {
      req.abort();
      if (signal)
        signal.removeEventListener("abort", abortAndFinalize);
      clearTimeout(reqTimeout);
    }
    if (request.timeout) {
      req.once("socket", function(socket) {
        reqTimeout = setTimeout(function() {
          reject(new FetchError(`network timeout at: ${request.url}`, "request-timeout"));
          finalize();
        }, request.timeout);
      });
    }
    req.on("error", function(err) {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    req.on("response", function(res) {
      clearTimeout(reqTimeout);
      const headers = createHeadersLenient(res.headers);
      if (fetch.isRedirect(res.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : resolve_url(request.url, location);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (err) {
                reject(err);
              }
            }
            break;
          case "follow":
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOpts = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              timeout: request.timeout,
              size: request.size
            };
            if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
              requestOpts.method = "GET";
              requestOpts.body = void 0;
              requestOpts.headers.delete("content-length");
            }
            resolve(fetch(new Request(locationURL, requestOpts)));
            finalize();
            return;
        }
      }
      res.once("end", function() {
        if (signal)
          signal.removeEventListener("abort", abortAndFinalize);
      });
      let body = res.pipe(new PassThrough$1());
      const response_options = {
        url: request.url,
        status: res.statusCode,
        statusText: res.statusMessage,
        headers,
        size: request.size,
        timeout: request.timeout,
        counter: request.counter
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
        response = new Response(body, response_options);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.default.Z_SYNC_FLUSH,
        finishFlush: zlib.default.Z_SYNC_FLUSH
      };
      if (codings == "gzip" || codings == "x-gzip") {
        body = body.pipe(zlib.default.createGunzip(zlibOptions));
        response = new Response(body, response_options);
        resolve(response);
        return;
      }
      if (codings == "deflate" || codings == "x-deflate") {
        const raw = res.pipe(new PassThrough$1());
        raw.once("data", function(chunk) {
          if ((chunk[0] & 15) === 8) {
            body = body.pipe(zlib.default.createInflate());
          } else {
            body = body.pipe(zlib.default.createInflateRaw());
          }
          response = new Response(body, response_options);
          resolve(response);
        });
        return;
      }
      if (codings == "br" && typeof zlib.default.createBrotliDecompress === "function") {
        body = body.pipe(zlib.default.createBrotliDecompress());
        response = new Response(body, response_options);
        resolve(response);
        return;
      }
      response = new Response(body, response_options);
      resolve(response);
    });
    writeToStream(req, request);
  });
}
fetch.isRedirect = function(code) {
  return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};
fetch.Promise = global.Promise;
var lib_default = fetch;

// src/input.ts
var path = __toModule(require("path"));
dotenv.default.config();
var Input = class {
  constructor(data) {
    this.data = data;
  }
  strings(separator = "\n") {
    return this.data.trim().split(separator);
  }
  numbers(separator = "\n") {
    return this.strings(separator).map((n) => +n);
  }
  static async get(day2) {
    const cacheFile = path.default.resolve(__dirname, "..", "cache", `day${day2}.txt`);
    if (!fs.default.existsSync(cacheFile))
      fs.default.writeFileSync(cacheFile, await this._fetch(day2), {encoding: "utf-8"});
    return new Input(fs.default.readFileSync(cacheFile, {encoding: "utf-8"}));
  }
  static async _fetch(day2) {
    const session = process.env.AOC_SESSION;
    if (!session)
      throw new Error("Please specify AOC_SESSION in your .env file");
    return await lib_default(`https://adventofcode.com/2020/day/${day2}/input`, {
      headers: {cookie: `session=${session}`}
    }).then((res) => {
      if (!res.ok)
        throw new Error(`${res.status}: ${res.statusText}`);
      return res;
    }).then((res) => res.text());
  }
};

// src/day.ts
var path3 = __toModule(require("path"));
var colorette = __toModule(require_colorette());
var perf_hooks = __toModule(require("perf_hooks"));
var Day = class {
  constructor(day2, mod, input2) {
    this.day = day2;
    this.input = input2;
    this.part1 = mod.part1;
    this.part2 = mod.part2;
  }
  static async load(day2) {
    let mod;
    try {
      mod = require(path3.default.resolve(__dirname, `day${day2}`));
    } catch {
      throw new Error(`day ${day2} does not exist yet`);
    }
    const input2 = await Input.get(day2);
    const ret = new Day(day2, mod, input2);
    if (!ret.part1)
      throw new Error(`day${day2}:part1 is missing`);
    return ret;
  }
  run() {
    console.log(`${colorette.default.cyan(`\u276F Day ${this.day}`)}`);
    console.log(colorette.default.blue("  \u25CF Part 1"));
    this.runPart(this.part1);
    if (this.part2) {
      console.log(colorette.default.blue("  \u25CF Part 2"));
      this.runPart(this.part2);
    }
  }
  runPart(part) {
    if (part.examples) {
      for (const example of part.examples) {
        const need = example[1];
        const found = part(new Input(example[0]));
        if (`${need}` != `${found}`) {
          throw new Error(`${colorette.default.red("example failed") + colorette.default.dim(` (found: ${found}, need: ${need})`)}
${example[0]}`);
        }
      }
      console.log(`${colorette.default.green("    \u2714 ") + part.examples.length.toString()} examples`);
    }
    const start = perf_hooks.performance.now();
    const answer = part(this.input);
    const duration = perf_hooks.performance.now() - start;
    const durationStr = Math.round(duration * 100) / 100;
    if (answer === void 0)
      throw new Error("no solution was found");
    if (part.answer !== answer)
      throw new Error(colorette.default.red("solution failed") + colorette.default.dim(` (found: ${answer}, need: ${part.answer})`));
    console.log(`${colorette.default.green("    \u2714 ")}answer: ${answer} (${durationStr}ms)`);
  }
};

// src/cli.ts
var colorette2 = __toModule(require_colorette());
var fs3 = __toModule(require("fs"));
async function run(day2) {
  try {
    if (day2)
      (await Day.load(day2)).run();
    else {
      for (let d = 1; d <= 25; d++) {
        const f = `src/day${d}.ts`;
        if (fs3.default.existsSync(f))
          (await Day.load(d)).run();
      }
    }
    console.log("\u{1F385} \u{1F384} done!");
  } catch (error) {
    if (error instanceof Error)
      console.log(colorette2.default.red("    \u2716 ") + error.message);
    else
      console.log(`${colorette2.default.red("    \u2716 error: ")}${error}`);
  }
}
void run(+process.argv[2]);
