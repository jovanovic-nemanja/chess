
this.createjs = this.createjs || {},
function () {
	var e = createjs.SoundJS = createjs.SoundJS || {};
	e.version = "1.0.0";
	e.buildDate = "Thu, 11 Dec 2018 21:40:33 GMT";
}(), this.createjs = this.createjs || {}, createjs.extend = function (e, t) {
	"use strict";

	function s() {
		this.constructor = e
	}
	return s.prototype = t.prototype, e.prototype = new s
}, this.createjs = this.createjs || {}, createjs.promote = function (e, t) {
	"use strict";
	var s = e.prototype,
		i = Object.getPrototypeOf && Object.getPrototypeOf(s) || s.__proto__;
	if(i)
		for(var n in s[(t += "_") + "constructor"] = i.constructor, i) s.hasOwnProperty(n) && "function" == typeof i[n] && (s[t + n] = i[n]);
	return e
}, this.createjs = this.createjs || {}, createjs.indexOf = function (e, t) {
	"use strict";
	for(var s = 0, i = e.length; i > s; s++)
		if(t === e[s]) return s;
	return -1
}, this.createjs = this.createjs || {},
function () {
	"use strict";
	createjs.proxy = function (e, t) {
		var s = Array.prototype.slice.call(arguments, 2);
		return function () {
			return e.apply(t, Array.prototype.slice.call(arguments, 0).concat(s))
		}
	}
}(), this.createjs = this.createjs || {},
function () {
	"use strict";
	var e = !!Object.defineProperty;
	try {
		Object.defineProperty({}, "bar", {
			get: function () {
				return this._bar
			},
			set: function (e) {
				this._bar = e
			}
		})
	} catch (t) {
		e = !1
	}
	createjs.definePropertySupported = e
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e() {
		throw "BrowserDetect cannot be instantiated"
	}
	var t = e.agent = window.navigator.userAgent;
	e.isWindowPhone = t.indexOf("IEMobile") > -1 || t.indexOf("Windows Phone") > -1, e.isFirefox = t.indexOf("Firefox") > -1, e.isOpera = null != window.opera, e.isChrome = t.indexOf("Chrome") > -1, e.isIOS = (t.indexOf("iPod") > -1 || t.indexOf("iPhone") > -1 || t.indexOf("iPad") > -1) && !e.isWindowPhone, e.isAndroid = t.indexOf("Android") > -1 && !e.isWindowPhone, e.isBlackberry = t.indexOf("Blackberry") > -1, createjs.BrowserDetect = e
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e() {
		this._listeners = null, this._captureListeners = null
	}
	var t = e.prototype;
	e.initialize = function (e) {
		e.addEventListener = t.addEventListener, e.on = t.on, e.removeEventListener = e.off = t.removeEventListener, e.removeAllEventListeners = t.removeAllEventListeners, e.hasEventListener = t.hasEventListener, e.dispatchEvent = t.dispatchEvent, e._dispatchEvent = t._dispatchEvent, e.willTrigger = t.willTrigger
	}, t.addEventListener = function (e, t, s) {
		var i, n = (i = s ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {})[e];
		return n && this.removeEventListener(e, t, s), (n = i[e]) ? n.push(t) : i[e] = [t], t
	}, t.on = function (e, t, s, i, n, r) {
		return t.handleEvent && (s = s || t, t = t.handleEvent), s = s || this, this.addEventListener(e, function (e) {
			t.call(s, e, n), i && e.remove()
		}, r)
	}, t.removeEventListener = function (e, t, s) {
		var i = s ? this._captureListeners : this._listeners;
		if(i) {
			var n = i[e];
			if(n)
				for(var r = 0, a = n.length; a > r; r++)
					if(n[r] == t) {
						1 == a ? delete i[e] : n.splice(r, 1);
						break
					}
		}
	}, t.off = t.removeEventListener, t.removeAllEventListeners = function (e) {
		e ? (this._listeners && delete this._listeners[e], this._captureListeners && delete this._captureListeners[e]) : this._listeners = this._captureListeners = null
	}, t.dispatchEvent = function (e) {
		if("string" == typeof e) {
			var t = this._listeners;
			if(!t || !t[e]) return !1;
			e = new createjs.Event(e)
		} else e.target && e.clone && (e = e.clone());
		try {
			e.target = this
		} catch (e) {}
		if(e.bubbles && this.parent) {
			for(var s = this, i = [s]; s.parent;) i.push(s = s.parent);
			var n, r = i.length;
			for(n = r - 1; n >= 0 && !e.propagationStopped; n--) i[n]._dispatchEvent(e, 1 + (0 == n));
			for(n = 1; r > n && !e.propagationStopped; n++) i[n]._dispatchEvent(e, 3)
		} else this._dispatchEvent(e, 2);
		return e.defaultPrevented
	}, t.hasEventListener = function (e) {
		var t = this._listeners,
			s = this._captureListeners;
		return !!(t && t[e] || s && s[e])
	}, t.willTrigger = function (e) {
		for(var t = this; t;) {
			if(t.hasEventListener(e)) return !0;
			t = t.parent
		}
		return !1
	}, t.toString = function () {
		return "[EventDispatcher]"
	}, t._dispatchEvent = function (e, t) {
		var s, i = 1 == t ? this._captureListeners : this._listeners;
		if(e && i) {
			var n = i[e.type];
			if(!n || !(s = n.length)) return;
			try {
				e.currentTarget = this
			} catch (e) {}
			try {
				e.eventPhase = t
			} catch (e) {}
			e.removed = !1, n = n.slice();
			for(var r = 0; s > r && !e.immediatePropagationStopped; r++) {
				var a = n[r];
				a.handleEvent ? a.handleEvent(e) : a(e), e.removed && (this.off(e.type, a, 1 == t), e.removed = !1)
			}
		}
	}, createjs.EventDispatcher = e
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e, t, s) {
		this.type = e, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!t, this.cancelable = !!s, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1
	}
	var t = e.prototype;
	t.preventDefault = function () {
		this.defaultPrevented = this.cancelable && !0
	}, t.stopPropagation = function () {
		this.propagationStopped = !0
	}, t.stopImmediatePropagation = function () {
		this.immediatePropagationStopped = this.propagationStopped = !0
	}, t.remove = function () {
		this.removed = !0
	}, t.clone = function () {
		return new e(this.type, this.bubbles, this.cancelable)
	}, t.set = function (e) {
		for(var t in e) this[t] = e[t];
		return this
	}, t.toString = function () {
		return "[Event (type=" + this.type + ")]"
	}, createjs.Event = e
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e, t, s) {
		this.Event_constructor("error"), this.title = e, this.message = t, this.data = s
	}
	createjs.extend(e, createjs.Event).clone = function () {
		return new createjs.ErrorEvent(this.title, this.message, this.data)
	}, createjs.ErrorEvent = createjs.promote(e, "Event")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e, t) {
		this.Event_constructor("progress"), this.loaded = e, this.total = null == t ? 1 : t, this.progress = 0 == t ? 0 : this.loaded / this.total
	}
	createjs.extend(e, createjs.Event).clone = function () {
		return new createjs.ProgressEvent(this.loaded, this.total)
	}, createjs.ProgressEvent = createjs.promote(e, "Event")
}(window), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e() {
		this.src = null, this.type = null, this.id = null, this.maintainOrder = !1, this.callback = null, this.data = null, this.method = createjs.LoadItem.GET, this.values = null, this.headers = null, this.withCredentials = !1, this.mimeType = null, this.crossOrigin = "Anonymous", this.loadTimeout = 8e3
	}
	var t = e.prototype = {},
		s = e;
	s.create = function (t) {
		if("string" == typeof t) {
			var i = new e;
			return i.src = t, i
		}
		if(t instanceof s) return t;
		if(t instanceof Object) return t;
		throw new Error("Type not recognized.")
	}, t.set = function (e) {
		for(var t in e) this[t] = e[t];
		return this
	}, createjs.LoadItem = s
}(),
function () {
	var e = {
		ABSOLUTE_PATT: /^(?:\w+:)?\/{2}/i,
		RELATIVE_PATT: /^[./]*?\//i,
		EXTENSION_PATT: /\/?[^/]+\.(\w{1,5})$/i,
		parseURI: function (t) {
			var s = {
				absolute: !1,
				relative: !1
			};
			if(null == t) return s;
			var i, n = t.indexOf("?");
			return n > -1 && (t = t.substr(0, n)), e.ABSOLUTE_PATT.test(t) ? s.absolute = !0 : e.RELATIVE_PATT.test(t) && (s.relative = !0), (i = t.match(e.EXTENSION_PATT)) && (s.extension = i[1].toLowerCase()), s
		},
		formatQueryString: function (e, t) {
			if(null == e) throw new Error("You must specify data.");
			var s = [];
			for(var i in e) s.push(i + "=" + escape(e[i]));
			return t && (s = s.concat(t)), s.join("&")
		},
		buildPath: function (e, t) {
			if(null == t) return e;
			var s = [],
				i = e.indexOf("?");
			if(-1 != i) {
				var n = e.slice(i + 1);
				s = s.concat(n.split("&"))
			}
			return -1 != i ? e.slice(0, i) + "?" + this._formatQueryString(t, s) : e + "?" + this._formatQueryString(t, s)
		},
		isCrossDomain: function (e) {
			var t = document.createElement("a");
			t.href = e.src;
			var s = document.createElement("a");
			return s.href = location.href, "" != t.hostname && (t.port != s.port || t.protocol != s.protocol || t.hostname != s.hostname)
		},
		isLocal: function (e) {
			var t = document.createElement("a");
			return t.href = e.src, "" == t.hostname && "file:" == t.protocol
		},
		isBinary: function (e) {
			switch (e) {
			case createjs.AbstractLoader.IMAGE:
			case createjs.AbstractLoader.BINARY:
				return !0;
			default:
				return !1
			}
		},
		isImageTag: function (e) {
			return e instanceof HTMLImageElement
		},
		isAudioTag: function (e) {
			return !!window.HTMLAudioElement && e instanceof HTMLAudioElement
		},
		isVideoTag: function (e) {
			return window.HTMLVideoElement ? e instanceof HTMLVideoElement : void 0
		},
		isText: function (e) {
			switch (e) {
			case createjs.AbstractLoader.TEXT:
			case createjs.AbstractLoader.JSON:
			case createjs.AbstractLoader.MANIFEST:
			case createjs.AbstractLoader.XML:
			case createjs.AbstractLoader.CSS:
			case createjs.AbstractLoader.SVG:
			case createjs.AbstractLoader.JAVASCRIPT:
				return !0;
			default:
				return !1
			}
		},
		getTypeByExtension: function (e) {
			if(null == e) return createjs.AbstractLoader.TEXT;
			switch (e.toLowerCase()) {
			case "jpeg":
			case "jpg":
			case "gif":
			case "png":
			case "webp":
			case "bmp":
				return createjs.AbstractLoader.IMAGE;
			case "ogg":
			case "mp3":
			case "webm":
				return createjs.AbstractLoader.SOUND;
			case "mp4":
			case "webm":
			case "ts":
				return createjs.AbstractLoader.VIDEO;
			case "json":
				return createjs.AbstractLoader.JSON;
			case "xml":
				return createjs.AbstractLoader.XML;
			case "css":
				return createjs.AbstractLoader.CSS;
			case "js":
				return createjs.AbstractLoader.JAVASCRIPT;
			case "svg":
				return createjs.AbstractLoader.SVG;
			default:
				return createjs.AbstractLoader.TEXT
			}
		}
	};
	createjs.RequestUtils = e
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e, t, s) {
		this.EventDispatcher_constructor(), this.loaded = !1, this.canceled = !1, this.progress = 0, this.type = s, this.resultFormatter = null, this._item = e ? createjs.LoadItem.create(e) : null, this._preferXHR = t, this._result = null, this._rawResult = null, this._loadedItems = null, this._tagSrcAttribute = null, this._tag = null
	}
	var t = createjs.extend(e, createjs.EventDispatcher),
		s = e;
	s.POST = "POST", s.GET = "GET", s.BINARY = "binary", s.CSS = "css", s.IMAGE = "image", s.JAVASCRIPT = "javascript", s.JSON = "json", s.JSONP = "jsonp", s.MANIFEST = "manifest", s.SOUND = "sound", s.VIDEO = "video", s.SPRITESHEET = "spritesheet", s.SVG = "svg", s.TEXT = "text", s.XML = "xml", t.getItem = function () {
		return this._item
	}, t.getResult = function (e) {
		return e ? this._rawResult : this._result
	}, t.getTag = function () {
		return this._tag
	}, t.setTag = function (e) {
		this._tag = e
	}, t.load = function () {
		this._createRequest(), this._request.on("complete", this, this), this._request.on("progress", this, this), this._request.on("loadStart", this, this), this._request.on("abort", this, this), this._request.on("timeout", this, this), this._request.on("error", this, this);
		var e = new createjs.Event("initialize");
		e.loader = this._request, this.dispatchEvent(e), this._request.load()
	}, t.cancel = function () {
		this.canceled = !0, this.destroy()
	}, t.destroy = function () {
		this._request && (this._request.removeAllEventListeners(), this._request.destroy()), this._request = null, this._item = null, this._rawResult = null, this._result = null, this._loadItems = null, this.removeAllEventListeners()
	}, t.getLoadedItems = function () {
		return this._loadedItems
	}, t._createRequest = function () {
		this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
	}, t._createTag = function () {
		return null
	}, t._sendLoadStart = function () {
		this._isCanceled() || this.dispatchEvent("loadstart")
	}, t._sendProgress = function (e) {
		if(!this._isCanceled()) {
			var t = null;
			"number" == typeof e ? (this.progress = e, t = new createjs.ProgressEvent(this.progress)) : (t = e, this.progress = e.loaded / e.total, t.progress = this.progress, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0)), this.hasEventListener("progress") && this.dispatchEvent(t)
		}
	}, t._sendComplete = function () {
		if(!this._isCanceled()) {
			this.loaded = !0;
			var e = new createjs.Event("complete");
			e.rawResult = this._rawResult, null != this._result && (e.result = this._result), this.dispatchEvent(e)
		}
	}, t._sendError = function (e) {
		!this._isCanceled() && this.hasEventListener("error") && (null == e && (e = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")), this.dispatchEvent(e))
	}, t._isCanceled = function () {
		return !(null != window.createjs && !this.canceled)
	}, t.resultFormatter = null, t.handleEvent = function (e) {
		switch (e.type) {
		case "complete":
			this._rawResult = e.target._response;
			var t = this.resultFormatter && this.resultFormatter(this),
				s = this;
			t instanceof Function ? t(function (e) {
				s._result = e, s._sendComplete()
			}) : (this._result = t || this._rawResult, this._sendComplete());
			break;
		case "progress":
			this._sendProgress(e);
			break;
		case "error":
			this._sendError(e);
			break;
		case "loadstart":
			this._sendLoadStart();
			break;
		case "abort":
		case "timeout":
			this._isCanceled() || this.dispatchEvent(e.type)
		}
	}, t.buildPath = function (e, t) {
		return createjs.RequestUtils.buildPath(e, t)
	}, t.toString = function () {
		return "[PreloadJS AbstractLoader]"
	}, createjs.AbstractLoader = createjs.promote(e, "EventDispatcher")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e, t, s) {
		this.AbstractLoader_constructor(e, t, s), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src"
	}
	var t = createjs.extend(e, createjs.AbstractLoader);
	t.load = function () {
		this._tag || (this._tag = this._createTag(this._item.src)), this._tag.preload = "auto", this._tag.load(), this.AbstractLoader_load()
	}, t._createTag = function () {}, t._createRequest = function () {
		this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
	}, t._formatResult = function (e) {
		return this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR && (e.getTag().src = e.getResult(!0)), e.getTag()
	}, createjs.AbstractMediaLoader = createjs.promote(e, "AbstractLoader")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";
	var e = function (e) {
			this._item = e
		},
		t = createjs.extend(e, createjs.EventDispatcher);
	t.load = function () {}, t.destroy = function () {}, t.cancel = function () {}, createjs.AbstractRequest = createjs.promote(e, "EventDispatcher")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e, t, s) {
		this.AbstractRequest_constructor(e), this._tag = t, this._tagSrcAttribute = s, this._loadedHandler = createjs.proxy(this._handleTagComplete, this), this._addedToDOM = !1, this._startTagVisibility = null
	}
	var t = createjs.extend(e, createjs.AbstractRequest);
	t.load = function () {
		null == this._tag.parentNode && (window.document.body.appendChild(this._tag), this._addedToDOM = !0), this._tag.onload = createjs.proxy(this._handleTagComplete, this), this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
		var e = new createjs.Event("initialize");
		e.loader = this._tag, this.dispatchEvent(e), this._hideTag(), this._tag[this._tagSrcAttribute] = this._item.src
	}, t.destroy = function () {
		this._clean(), this._tag = null, this.AbstractRequest_destroy()
	}, t._handleReadyStateChange = function () {
		clearTimeout(this._loadTimeout);
		var e = this._tag;
		("loaded" == e.readyState || "complete" == e.readyState) && this._handleTagComplete()
	}, t._handleTagComplete = function () {
		this._rawResult = this._tag, this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult, this._clean(), this._showTag(), this.dispatchEvent("complete")
	}, t._clean = function () {
		this._tag.onload = null, this._tag.onreadystatechange = null, this._addedToDOM && null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag)
	}, t._hideTag = function () {
		this._startTagVisibility = this._tag.style.visibility, this._tag.style.visibility = "hidden"
	}, t._showTag = function () {
		this._tag.style.visibility = this._startTagVisibility
	}, t._handleStalled = function () {}, createjs.TagRequest = createjs.promote(e, "AbstractRequest")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e, t, s) {
		this.AbstractRequest_constructor(e), this._tag = t, this._tagSrcAttribute = s, this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
	}
	var t = createjs.extend(e, createjs.TagRequest);
	t.load = function () {
		this._tag.onstalled = createjs.proxy(this._handleStalled, this), this._tag.onprogress = createjs.proxy(this._handleProgress, this), this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1), this.TagRequest_load()
	}, t._handleReadyStateChange = function () {
		clearTimeout(this._loadTimeout);
		var e = this._tag;
		("loaded" == e.readyState || "complete" == e.readyState) && this._handleTagComplete()
	}, t._handleStalled = function () {}, t._handleProgress = function (e) {
		if(e && !(e.loaded > 0 && 0 == e.total)) {
			var t = new createjs.ProgressEvent(e.loaded, e.total);
			this.dispatchEvent(t)
		}
	}, t._clean = function () {
		this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._tag.onprogress = null, this.TagRequest__clean()
	}, createjs.MediaTagRequest = createjs.promote(e, "TagRequest")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e) {
		this.AbstractRequest_constructor(e), this._request = null, this._loadTimeout = null, this._xhrLevel = 1, this._response = null, this._rawResponse = null, this._canceled = !1, this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this), this._handleProgressProxy = createjs.proxy(this._handleProgress, this), this._handleAbortProxy = createjs.proxy(this._handleAbort, this), this._handleErrorProxy = createjs.proxy(this._handleError, this), this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this), this._handleLoadProxy = createjs.proxy(this._handleLoad, this), this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this), this._createXHR(e)
	}
	var t = createjs.extend(e, createjs.AbstractRequest);
	e.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], t.getResult = function (e) {
		return e && this._rawResponse ? this._rawResponse : this._response
	}, t.cancel = function () {
		this.canceled = !0, this._clean(), this._request.abort()
	}, t.load = function () {
		if(null != this._request) {
			this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1), this._request.addEventListener("progress", this._handleProgressProxy, !1), this._request.addEventListener("abort", this._handleAbortProxy, !1), this._request.addEventListener("error", this._handleErrorProxy, !1), this._request.addEventListener("timeout", this._handleTimeoutProxy, !1), this._request.addEventListener("load", this._handleLoadProxy, !1), this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1), 1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));
			try {
				this._item.values && this._item.method != createjs.AbstractLoader.GET ? this._item.method == createjs.AbstractLoader.POST && this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)) : this._request.send()
			} catch (e) {
				this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, e))
			}
		} else this._handleError()
	}, t.setResponseType = function (e) {
		this._request.responseType = e
	}, t.getAllResponseHeaders = function () {
		return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
	}, t.getResponseHeader = function (e) {
		return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(e) : null
	}, t._handleProgress = function (e) {
		if(e && !(e.loaded > 0 && 0 == e.total)) {
			var t = new createjs.ProgressEvent(e.loaded, e.total);
			this.dispatchEvent(t)
		}
	}, t._handleLoadStart = function () {
		clearTimeout(this._loadTimeout), this.dispatchEvent("loadstart")
	}, t._handleAbort = function (e) {
		this._clean(), this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, e))
	}, t._handleError = function (e) {
		this._clean(), this.dispatchEvent(new createjs.ErrorEvent(e.message))
	}, t._handleReadyStateChange = function () {
		4 == this._request.readyState && this._handleLoad()
	}, t._handleLoad = function () {
		if(!this.loaded) {
			this.loaded = !0;
			var e = this._checkError();
			if(e) return void this._handleError(e);
			this._response = this._getResponse(), this._clean(), this.dispatchEvent(new createjs.Event("complete"))
		}
	}, t._handleTimeout = function (e) {
		this._clean(), this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, e))
	}, t._checkError = function () {
		var e = parseInt(this._request.status);
		switch (e) {
		case 404:
		case 0:
			return new Error(e)
		}
		return null
	}, t._getResponse = function () {
		if(null != this._response) return this._response;
		if(null != this._request.response) return this._request.response;
		try {
			if(null != this._request.responseText) return this._request.responseText
		} catch (e) {}
		try {
			if(null != this._request.responseXML) return this._request.responseXML
		} catch (e) {}
		return null
	}, t._createXHR = function (e) {
		var t = createjs.RequestUtils.isCrossDomain(e),
			i = {},
			n = null;
		if(window.XMLHttpRequest) n = new XMLHttpRequest, t && void 0 === n.withCredentials && window.XDomainRequest && (n = new XDomainRequest);
		else {
			for(var r = 0, a = s.ACTIVEX_VERSIONS.length; a > r; r++) {
				s.ACTIVEX_VERSIONS[r];
				try {
					n = new ActiveXObject(axVersions);
					break
				} catch (e) {}
			}
			if(null == n) return !1
		}
		e.mimeType && n.overrideMimeType && n.overrideMimeType(e.mimeType), this._xhrLevel = "string" == typeof n.responseType ? 2 : 1;
		var o;
		if(o = e.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(e.src, e.values) : e.src, n.open(e.method || createjs.AbstractLoader.GET, o, !0), t && n instanceof XMLHttpRequest && 1 == this._xhrLevel && (i.Origin = location.origin), e.values && e.method == createjs.AbstractLoader.POST && (i["Content-Type"] = "application/x-www-form-urlencoded"), t || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), e.headers)
			for(var u in e.headers) i[u] = e.headers[u];
		for(u in i) n.setRequestHeader(u, i[u]);
		return n instanceof XMLHttpRequest && void 0 !== e.withCredentials && (n.withCredentials = e.withCredentials), this._request = n, !0
	}, t._clean = function () {
		clearTimeout(this._loadTimeout), this._request.removeEventListener("loadstart", this._handleLoadStartProxy), this._request.removeEventListener("progress", this._handleProgressProxy), this._request.removeEventListener("abort", this._handleAbortProxy), this._request.removeEventListener("error", this._handleErrorProxy), this._request.removeEventListener("timeout", this._handleTimeoutProxy), this._request.removeEventListener("load", this._handleLoadProxy), this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)
	}, t.toString = function () {
		return "[PreloadJS XHRRequest]"
	}, createjs.XHRRequest = createjs.promote(e, "AbstractRequest")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e, t) {
		this.AbstractMediaLoader_constructor(e, t, createjs.AbstractLoader.SOUND), createjs.RequestUtils.isAudioTag(e) ? this._tag = e : createjs.RequestUtils.isAudioTag(e.src) ? this._tag = e : createjs.RequestUtils.isAudioTag(e.tag) && (this._tag = createjs.RequestUtils.isAudioTag(e) ? e : e.src), null != this._tag && (this._preferXHR = !1)
	}
	var t = createjs.extend(e, createjs.AbstractMediaLoader);
	e.canLoadItem = function (e) {
		return e.type == createjs.AbstractLoader.SOUND
	}, t._createTag = function (e) {
		var t = document.createElement("audio");
		return t.autoplay = !1, t.preload = "none", t.src = e, t
	}, createjs.SoundLoader = createjs.promote(e, "AbstractMediaLoader")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e() {
		throw "Sound cannot be instantiated"
	}

	function t(e, t) {
		this.init(e, t)
	}
	var s = e;
	s.INTERRUPT_ANY = "any", s.INTERRUPT_EARLY = "early", s.INTERRUPT_LATE = "late", s.INTERRUPT_NONE = "none", s.PLAY_INITED = "playInited", s.PLAY_SUCCEEDED = "playSucceeded", s.PLAY_INTERRUPTED = "playInterrupted", s.PLAY_FINISHED = "playFinished", s.PLAY_FAILED = "playFailed", s.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"], s.EXTENSION_MAP = {
		m4a: "mp4"
	}, s.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/, s.defaultInterruptBehavior = s.INTERRUPT_NONE, s.alternateExtensions = [], s.activePlugin = null, s._pluginsRegistered = !1, s._lastID = 0, s._masterVolume = 1, s._masterMute = !1, s._instances = [], s._idHash = {}, s._preloadHash = {}, s.addEventListener = null, s.removeEventListener = null, s.removeAllEventListeners = null, s.dispatchEvent = null, s.hasEventListener = null, s._listeners = null, createjs.EventDispatcher.initialize(s), s.getPreloadHandlers = function () {
		return {
			callback: createjs.proxy(s.initLoad, s),
			types: ["sound"],
			extensions: s.SUPPORTED_EXTENSIONS
		}
	}, s._handleLoadComplete = function (e) {
		var t = e.target.getItem().src;
		if(s._preloadHash[t])
			for(var i = 0, n = s._preloadHash[t].length; n > i; i++) {
				var r = s._preloadHash[t][i];
				if(s._preloadHash[t][i] = !0, s.hasEventListener("fileload"))(e = new createjs.Event("fileload")).src = r.src, e.id = r.id, e.data = r.data, e.sprite = r.sprite, s.dispatchEvent(e)
			}
	}, s._handleLoadError = function (e) {
		var t = e.target.getItem().src;
		if(s._preloadHash[t])
			for(var i = 0, n = s._preloadHash[t].length; n > i; i++) {
				var r = s._preloadHash[t][i];
				if(s._preloadHash[t][i] = !1, s.hasEventListener("fileerror"))(e = new createjs.Event("fileerror")).src = r.src, e.id = r.id, e.data = r.data, e.sprite = r.sprite, s.dispatchEvent(e)
			}
	}, s._registerPlugin = function (e) {
		return !!e.isSupported() && (s.activePlugin = new e, !0)
	}, s.registerPlugins = function (e) {
		s._pluginsRegistered = !0;
		for(var t = 0, i = e.length; i > t; t++)
			if(s._registerPlugin(e[t])) return !0;
		return !1
	}, s.initializeDefaultPlugins = function () {
		return null != s.activePlugin || !s._pluginsRegistered && !!s.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin])
	}, s.isReady = function () {
		return null != s.activePlugin
	}, s.getCapabilities = function () {
		return null == s.activePlugin ? null : s.activePlugin._capabilities
	}, s.getCapability = function (e) {
		return null == s.activePlugin ? null : s.activePlugin._capabilities[e]
	}, s.initLoad = function (e) {
		return s._registerSound(e)
	}, s._registerSound = function (e) {
		if(!s.initializeDefaultPlugins()) return !1;
		var i = s._parsePath(e.src);
		if(null == i) return !1;
		e.src = i.src, e.type = "sound";
		var n = e.data,
			r = s.activePlugin.defaultNumChannels || null;
		if(null != n && (isNaN(n.channels) ? isNaN(n) || (r = parseInt(n)) : r = parseInt(n.channels), n.audioSprite))
			for(var a, o = n.audioSprite.length; o--;) a = n.audioSprite[o], s._idHash[a.id] = {
				src: e.src,
				startTime: parseInt(a.startTime),
				duration: parseInt(a.duration)
			};
		null != e.id && (s._idHash[e.id] = {
			src: e.src
		});
		var u = s.activePlugin.register(e, r);
		return t.create(e.src, r), null != n && isNaN(n) ? e.data.channels = r || t.maxPerChannel() : e.data = r || t.maxPerChannel(), u.type && (e.type = u.type), u
	}, s.registerSound = function (e, t, i, n) {
		var r = {
			src: e,
			id: t,
			data: i
		};
		e instanceof Object && (n = t, r = e), r = createjs.LoadItem.create(r), null != n && (r.src = n + e);
		var a = s._registerSound(r);
		if(!a) return !1;
		if(s._preloadHash[r.src] || (s._preloadHash[r.src] = []), s._preloadHash[r.src].push(r), 1 == s._preloadHash[r.src].length) a.on("complete", createjs.proxy(this._handleLoadComplete, this)), a.on("error", createjs.proxy(this._handleLoadError, this)), s.activePlugin.preload(a);
		else if(1 == s._preloadHash[r.src][0]) return !0;
		return r
	}, s.registerSounds = function (e, t) {
		var s = [];
		e.path && (t ? t += e.path : t = e.path);
		for(var i = 0, n = e.length; n > i; i++) s[i] = createjs.Sound.registerSound(e[i].src, e[i].id, e[i].data, t);
		return s
	}, s.registerManifest = function (e, t) {
		try {
			console.log("createjs.Sound.registerManifest is deprecated, please use createjs.Sound.registerSounds.")
		} catch (e) {}
		return this.registerSounds(e, t)
	}, s.removeSound = function (e, i) {
		if(null == s.activePlugin) return !1;
		e instanceof Object && (e = e.src), e = s._getSrcById(e).src, null != i && (e = i + e);
		var n = s._parsePath(e);
		if(null == n) return !1;
		for(var r in e = n.src, s._idHash) s._idHash[r].src == e && delete s._idHash[r];
		return t.removeSrc(e), delete s._preloadHash[e], s.activePlugin.removeSound(e), !0
	}, s.removeSounds = function (e, t) {
		var s = [];
		e.path && (t ? t += e.path : t = e.path);
		for(var i = 0, n = e.length; n > i; i++) s[i] = createjs.Sound.removeSound(e[i].src, t);
		return s
	}, s.removeManifest = function (e, t) {
		try {
			console.log("createjs.Sound.removeManifest is deprecated, please use createjs.Sound.removeSounds.")
		} catch (e) {}
		return s.removeSounds(e, t)
	}, s.removeAllSounds = function () {
		s._idHash = {}, s._preloadHash = {}, t.removeAll(), s.activePlugin && s.activePlugin.removeAllSounds()
	}, s.loadComplete = function (e) {
		if(!s.isReady()) return !1;
		var t = s._parsePath(e);
		return e = t ? s._getSrcById(t.src).src : s._getSrcById(e).src, 1 == s._preloadHash[e][0]
	}, s._parsePath = function (e) {
		"string" != typeof e && (e = e.toString());
		var t = e.match(s.FILE_PATTERN);
		if(null == t) return !1;
		for(var i = t[4], n = t[5], r = s.getCapabilities(), a = 0; !r[n];)
			if(n = s.alternateExtensions[a++], a > s.alternateExtensions.length) return null;
		return {
			name: i,
			src: e = e.replace("." + t[5], "." + n),
			extension: n
		}
	}, s.play = function (e, t, i, n, r, a, o, u, c) {
		t instanceof Object && (i = t.delay, n = t.offset, r = t.loop, a = t.volume, o = t.pan, u = t.startTime, c = t.duration, t = t.interrupt);
		var l = s.createInstance(e, u, c);
		return s._playInstance(l, t, i, n, r, a, o) || l._playFailed(), l
	}, s.createInstance = function (e, i, n) {
		if(!s.initializeDefaultPlugins()) return new createjs.DefaultSoundInstance(e, i, n);
		e = s._getSrcById(e);
		var r = s._parsePath(e.src),
			a = null;
		return null != r && null != r.src ? (t.create(r.src), null == i && (i = e.startTime), a = s.activePlugin.create(r.src, i, n || e.duration)) : a = new createjs.DefaultSoundInstance(e, i, n), a.uniqueId = s._lastID++, a
	}, s.setVolume = function (e) {
		if(null == Number(e)) return !1;
		if(e = Math.max(0, Math.min(1, e)), s._masterVolume = e, !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(e))
			for(var t = this._instances, i = 0, n = t.length; n > i; i++) t[i].setMasterVolume(e)
	}, s.getVolume = function () {
		return s._masterVolume
	}, s.setMute = function (e) {
		if(null == e) return !1;
		if(this._masterMute = e, !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(e))
			for(var t = this._instances, s = 0, i = t.length; i > s; s++) t[s].setMasterMute(e);
		return !0
	}, s.getMute = function () {
		return this._masterMute
	}, s.stop = function () {
		for(var e = this._instances, t = e.length; t--;) e[t].stop()
	}, s._playInstance = function (e, t, i, n, r, a, o) {
		if(t instanceof Object && (i = t.delay, n = t.offset, r = t.loop, a = t.volume, o = t.pan, t = t.interrupt), t = t || s.defaultInterruptBehavior, null == i && (i = 0), null == n && (n = e.getPosition()), null == r && (r = e.loop), null == a && (a = e.volume), null == o && (o = e.pan), 0 == i) {
			if(!s._beginPlaying(e, t, n, r, a, o)) return !1
		} else {
			var u = setTimeout(function () {
				s._beginPlaying(e, t, n, r, a, o)
			}, i);
			e.delayTimeoutId = u
		}
		return this._instances.push(e), !0
	}, s._beginPlaying = function (e, s, i, n, r, a) {
		if(!t.add(e, s)) return !1;
		if(!e._beginPlaying(i, n, r, a)) {
			var o = createjs.indexOf(this._instances, e);
			return o > -1 && this._instances.splice(o, 1), !1
		}
		return !0
	}, s._getSrcById = function (e) {
		return s._idHash[e] || {
			src: e
		}
	}, s._playFinished = function (e) {
		t.remove(e);
		var s = createjs.indexOf(this._instances, e);
		s > -1 && this._instances.splice(s, 1)
	}, createjs.Sound = e, t.channels = {}, t.create = function (e, s) {
		return null == t.get(e) && (t.channels[e] = new t(e, s), !0)
	}, t.removeSrc = function (e) {
		var s = t.get(e);
		return null != s && (s._removeAll(), delete t.channels[e], !0)
	}, t.removeAll = function () {
		for(var e in t.channels) t.channels[e]._removeAll();
		t.channels = {}
	}, t.add = function (e, s) {
		var i = t.get(e.src);
		return null != i && i._add(e, s)
	}, t.remove = function (e) {
		var s = t.get(e.src);
		return null != s && (s._remove(e), !0)
	}, t.maxPerChannel = function () {
		return i.maxDefault
	}, t.get = function (e) {
		return t.channels[e]
	};
	var i = t.prototype;
	i.constructor = t, i.src = null, i.max = null, i.maxDefault = 100, i.length = 0, i.init = function (e, t) {
		this.src = e, this.max = t || this.maxDefault, -1 == this.max && (this.max = this.maxDefault), this._instances = []
	}, i._get = function (e) {
		return this._instances[e]
	}, i._add = function (e, t) {
		return !!this._getSlot(t, e) && (this._instances.push(e), this.length++, !0)
	}, i._remove = function (e) {
		var t = createjs.indexOf(this._instances, e);
		return -1 != t && (this._instances.splice(t, 1), this.length--, !0)
	}, i._removeAll = function () {
		for(var e = this.length - 1; e >= 0; e--) this._instances[e].stop()
	}, i._getSlot = function (t) {
		var s, i;
		if(t != e.INTERRUPT_NONE && null == (i = this._get(0))) return !0;
		for(var n = 0, r = this.max; r > n; n++) {
			if(null == (s = this._get(n))) return !0;
			if(s.playState == e.PLAY_FINISHED || s.playState == e.PLAY_INTERRUPTED || s.playState == e.PLAY_FAILED) {
				i = s;
				break
			}
			t != e.INTERRUPT_NONE && (t == e.INTERRUPT_EARLY && s.getPosition() < i.getPosition() || t == e.INTERRUPT_LATE && s.getPosition() > i.getPosition()) && (i = s)
		}
		return null != i && (i._interrupt(), this._remove(i), !0)
	}, i.toString = function () {
		return "[Sound SoundChannel]"
	}
}(), this.createjs = this.createjs || {},
function () {
	"use strict";
	var e = function (e, t, s, i) {
			this.EventDispatcher_constructor(), this.src = e, this.uniqueId = -1, this.playState = null, this.delayTimeoutId = null, this._startTime = Math.max(0, t || 0), this._volume = 1, createjs.definePropertySupported && Object.defineProperty(this, "volume", {
				get: this.getVolume,
				set: this.setVolume
			}), this._pan = 0, createjs.definePropertySupported && Object.defineProperty(this, "pan", {
				get: this.getPan,
				set: this.setPan
			}), this._duration = Math.max(0, s || 0), createjs.definePropertySupported && Object.defineProperty(this, "duration", {
				get: this.getDuration,
				set: this.setDuration
			}), this._playbackResource = null, createjs.definePropertySupported && Object.defineProperty(this, "playbackResource", {
				get: this.getPlaybackResource,
				set: this.setPlaybackResource
			}), !1 !== i && !0 !== i && this.setPlaybackResource(i), this._position = 0, createjs.definePropertySupported && Object.defineProperty(this, "position", {
				get: this.getPosition,
				set: this.setPosition
			}), this._loop = 0, createjs.definePropertySupported && Object.defineProperty(this, "loop", {
				get: this.getLoop,
				set: this.setLoop
			}), this._muted = !1, createjs.definePropertySupported && Object.defineProperty(this, "muted", {
				get: this.getMuted,
				set: this.setMuted
			}), this._paused = !1, createjs.definePropertySupported && Object.defineProperty(this, "paused", {
				get: this.getPaused,
				set: this.setPaused
			})
		},
		t = createjs.extend(e, createjs.EventDispatcher);
	t.play = function (e, t, s, i, n, r) {
		return this.playState == createjs.Sound.PLAY_SUCCEEDED ? (e instanceof Object && (s = e.offset, i = e.loop, n = e.volume, r = e.pan), null != s && this.setPosition(s), null != i && this.setLoop(i), null != n && this.setVolume(n), null != r && this.setPan(r), void(this._paused && this.setPaused(!1))) : (this._cleanUp(), createjs.Sound._playInstance(this, e, t, s, i, n, r), this)
	}, t.pause = function () {
		return !this._paused && this.playState == createjs.Sound.PLAY_SUCCEEDED && (this.setPaused(!0), !0)
	}, t.resume = function () {
		return !!this._paused && (this.setPaused(!1), !0)
	}, t.stop = function () {
		return this._position = 0, this._paused = !1, this._handleStop(), this._cleanUp(), this.playState = createjs.Sound.PLAY_FINISHED, this
	}, t.destroy = function () {
		this._cleanUp(), this.src = null, this.playbackResource = null, this.removeAllEventListeners()
	}, t.toString = function () {
		return "[AbstractSoundInstance]"
	}, t.getPaused = function () {
		return this._paused
	}, t.setPaused = function (e) {
		return !0 !== e && !1 !== e || this._paused == e || 1 == e && this.playState != createjs.Sound.PLAY_SUCCEEDED ? void 0 : (this._paused = e, e ? this._pause() : this._resume(), clearTimeout(this.delayTimeoutId), this)
	}, t.setVolume = function (e) {
		return e == this._volume ? this : (this._volume = Math.max(0, Math.min(1, e)), this._muted || this._updateVolume(), this)
	}, t.getVolume = function () {
		return this._volume
	}, t.setMute = function (e) {
		this.setMuted(e)
	}, t.getMute = function () {
		return this._muted
	}, t.setMuted = function (e) {
		return !0 === e || !1 === e ? (this._muted = e, this._updateVolume(), this) : void 0
	}, t.getMuted = function () {
		return this._muted
	}, t.setPan = function (e) {
		return e == this._pan ? this : (this._pan = Math.max(-1, Math.min(1, e)), this._updatePan(), this)
	}, t.getPan = function () {
		return this._pan
	}, t.getPosition = function () {
		return this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED ? this._position : this._calculateCurrentPosition()
	}, t.setPosition = function (e) {
		return this._position = Math.max(0, e), this.playState == createjs.Sound.PLAY_SUCCEEDED && this._updatePosition(), this
	}, t.getDuration = function () {
		return this._duration
	}, t.setDuration = function (e) {
		return e == this._duration ? this : (this._duration = Math.max(0, e || 0), this._updateDuration(), this)
	}, t.setPlaybackResource = function (e) {
		return this._playbackResource = e, 0 == this._duration && this._setDurationFromSource(), this
	}, t.getPlaybackResource = function () {
		return this._playbackResource
	}, t.getLoop = function () {
		return this._loop
	}, t.setLoop = function (e) {
		null != this._playbackResource && (0 != this._loop && 0 == e && this._removeLooping(e), 0 == this._loop && 0 != e && this._addLooping(e)), this._loop = e
	}, t._sendEvent = function (e) {
		var t = new createjs.Event(e);
		this.dispatchEvent(t)
	}, t._cleanUp = function () {
		clearTimeout(this.delayTimeoutId), this._handleCleanUp(), this._paused = !1, createjs.Sound._playFinished(this)
	}, t._interrupt = function () {
		this._cleanUp(), this.playState = createjs.Sound.PLAY_INTERRUPTED, this._sendEvent("interrupted")
	}, t._beginPlaying = function (e, t, s, i) {
		return this.setPosition(e), this.setLoop(t), this.setVolume(s), this.setPan(i), null != this._playbackResource && this._position < this._duration ? (this._paused = !1, this._handleSoundReady(), this.playState = createjs.Sound.PLAY_SUCCEEDED, this._sendEvent("succeeded"), !0) : (this._playFailed(), !1)
	}, t._playFailed = function () {
		this._cleanUp(), this.playState = createjs.Sound.PLAY_FAILED, this._sendEvent("failed")
	}, t._handleSoundComplete = function () {
		return this._position = 0, 0 != this._loop ? (this._loop--, this._handleLoop(), void this._sendEvent("loop")) : (this._cleanUp(), this.playState = createjs.Sound.PLAY_FINISHED, void this._sendEvent("complete"))
	}, t._handleSoundReady = function () {}, t._updateVolume = function () {}, t._updatePan = function () {}, t._updateDuration = function () {}, t._setDurationFromSource = function () {}, t._calculateCurrentPosition = function () {}, t._updatePosition = function () {}, t._removeLooping = function () {}, t._addLooping = function () {}, t._pause = function () {}, t._resume = function () {}, t._handleStop = function () {}, t._handleCleanUp = function () {}, t._handleLoop = function () {}, createjs.AbstractSoundInstance = createjs.promote(e, "EventDispatcher"), createjs.DefaultSoundInstance = createjs.AbstractSoundInstance
}(), this.createjs = this.createjs || {},
function () {
	"use strict";
	var e = function () {
			this._capabilities = null, this._loaders = {}, this._audioSources = {}, this._soundInstances = {}, this._loaderClass, this._soundInstanceClass
		},
		t = e.prototype;
	e._capabilities = null, e.isSupported = function () {
		return !0
	}, t.register = function (e) {
		if(this._audioSources[e.src] = !0, this._soundInstances[e.src] = [], this._loaders[e.src]) return this._loaders[e.src];
		var t = new this._loaderClass(e);
		return t.on("complete", createjs.proxy(this._handlePreloadComplete, this)), this._loaders[e.src] = t, t
	}, t.preload = function (e) {
		e.on("error", createjs.proxy(this._handlePreloadError, this)), e.load()
	}, t.isPreloadStarted = function (e) {
		return null != this._audioSources[e]
	}, t.isPreloadComplete = function (e) {
		return !(null == this._audioSources[e] || 1 == this._audioSources[e])
	}, t.removeSound = function (e) {
		if(this._soundInstances[e]) {
			for(var t = this._soundInstances[e].length; t--;) {
				this._soundInstances[e][t].destroy()
			}
			delete this._soundInstances[e], delete this._audioSources[e], this._loaders[e] && this._loaders[e].destroy(), delete this._loaders[e]
		}
	}, t.removeAllSounds = function () {
		for(var e in this._audioSources) this.removeSound(e)
	}, t.create = function (e, t, s) {
		this.isPreloadStarted(e) || this.preload(this.register(e));
		var i = new this._soundInstanceClass(e, t, s, this._audioSources[e]);
		return this._soundInstances[e].push(i), i
	}, t.setVolume = function (e) {
		return this._volume = e, this._updateVolume(), !0
	}, t.getVolume = function () {
		return this._volume
	}, t.setMute = function () {
		return this._updateVolume(), !0
	}, t.toString = function () {
		return "[AbstractPlugin]"
	}, t._handlePreloadComplete = function (e) {
		var t = e.target.getItem().src;
		this._audioSources[t] = e.result;
		for(var s = 0, i = this._soundInstances[t].length; i > s; s++) {
			this._soundInstances[t][s].setPlaybackResource(this._audioSources[t])
		}
	}, t._handlePreloadError = function () {}, t._updateVolume = function () {}, createjs.AbstractPlugin = e
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e) {
		this.AbstractLoader_constructor(e, !0, createjs.AbstractLoader.SOUND)
	}
	var t = createjs.extend(e, createjs.AbstractLoader);
	e.context = null, t.toString = function () {
		return "[WebAudioLoader]"
	}, t._createRequest = function () {
		this._request = new createjs.XHRRequest(this._item, !1), this._request.setResponseType("arraybuffer")
	}, t._sendComplete = function () {
		e.context.decodeAudioData(this._rawResult, createjs.proxy(this._handleAudioDecoded, this), createjs.proxy(this._handleError, this))
	}, t._handleAudioDecoded = function (e) {
		this._result = e, this.AbstractLoader__sendComplete()
	}, createjs.WebAudioLoader = createjs.promote(e, "AbstractLoader")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e, t, i, n) {
		this.AbstractSoundInstance_constructor(e, t, i, n), this.gainNode = s.context.createGain(), this.panNode = s.context.createPanner(), this.panNode.panningModel = s._panningModel, this.panNode.connect(this.gainNode), this.sourceNode = null, this._soundCompleteTimeout = null, this._sourceNodeNext = null, this._playbackStartTime = 0, this._endedHandler = createjs.proxy(this._handleSoundComplete, this)
	}
	var t = createjs.extend(e, createjs.AbstractSoundInstance),
		s = e;
	s.context = null, s.destinationNode = null, s._panningModel = "equalpower", t.destroy = function () {
		this.AbstractSoundInstance_destroy(), this.panNode.disconnect(0), this.panNode = null, this.gainNode.disconnect(0), this.gainNode = null
	}, t.toString = function () {
		return "[WebAudioSoundInstance]"
	}, t._updatePan = function () {
		this.panNode.setPosition(this._pan, 0, -.5)
	}, t._removeLooping = function () {
		this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)
	}, t._addLooping = function () {
		this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0))
	}, t._setDurationFromSource = function () {
		this._duration = 1e3 * this.playbackResource.duration
	}, t._handleCleanUp = function () {
		this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED && (this.sourceNode = this._cleanUpAudioNode(this.sourceNode), this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)), 0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0), clearTimeout(this._soundCompleteTimeout), this._playbackStartTime = 0
	}, t._cleanUpAudioNode = function (e) {
		return e && (e.stop(0), e.disconnect(0), e = null), e
	}, t._handleSoundReady = function () {
		this.gainNode.connect(s.destinationNode);
		var e = .001 * this._duration,
			t = .001 * this._position;
		this.sourceNode = this._createAndPlayAudioNode(s.context.currentTime - e, t), this._playbackStartTime = this.sourceNode.startTime - t, this._soundCompleteTimeout = setTimeout(this._endedHandler, 1e3 * (e - t)), 0 != this._loop && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0))
	}, t._createAndPlayAudioNode = function (e, t) {
		var i = s.context.createBufferSource();
		i.buffer = this.playbackResource, i.connect(this.panNode);
		var n = .001 * this._duration;
		return i.startTime = e + n, i.start(i.startTime, t + .001 * this._startTime, n - t), i
	}, t._pause = function () {
		this._position = 1e3 * (s.context.currentTime - this._playbackStartTime), this.sourceNode = this._cleanUpAudioNode(this.sourceNode), this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext), 0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0), clearTimeout(this._soundCompleteTimeout)
	}, t._resume = function () {
		this._handleSoundReady()
	}, t._updateVolume = function () {
		var e = this._muted ? 0 : this._volume;
		e != this.gainNode.gain.value && (this.gainNode.gain.value = e)
	}, t._calculateCurrentPosition = function () {
		return 1e3 * (s.context.currentTime - this._playbackStartTime)
	}, t._updatePosition = function () {
		this.sourceNode = this._cleanUpAudioNode(this.sourceNode), this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext), clearTimeout(this._soundCompleteTimeout), this._paused || this._handleSoundReady()
	}, t._handleLoop = function () {
		this._cleanUpAudioNode(this.sourceNode), this.sourceNode = this._sourceNodeNext, this._playbackStartTime = this.sourceNode.startTime, this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0), this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration)
	}, t._updateDuration = function () {
		this._pause(), this._resume()
	}, createjs.WebAudioSoundInstance = createjs.promote(e, "AbstractSoundInstance")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e() {
		this.AbstractPlugin_constructor(), this._panningModel = s._panningModel, this._volume = 1, this.context = s.context, this.dynamicsCompressorNode = this.context.createDynamicsCompressor(), this.dynamicsCompressorNode.connect(this.context.destination), this.gainNode = this.context.createGain(), this.gainNode.connect(this.dynamicsCompressorNode), createjs.WebAudioSoundInstance.destinationNode = this.gainNode, this._capabilities = s._capabilities, this._loaderClass = createjs.WebAudioLoader, this._soundInstanceClass = createjs.WebAudioSoundInstance, this._addPropsToClasses()
	}
	var t = createjs.extend(e, createjs.AbstractPlugin),
		s = e;
	s._capabilities = null, s._panningModel = "equalpower", s.context = null, s.isSupported = function () {
		var e = createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry;
		return !("file:" == location.protocol && !e && !this._isFileXHRSupported()) && (s._generateCapabilities(), null != s.context)
	}, s.playEmptySound = function () {
		var e = s.context.createBufferSource();
		e.buffer = s.context.createBuffer(1, 1, 22050), e.connect(s.context.destination), e.start(0, 0, 0)
	}, s._isFileXHRSupported = function () {
		var e = !0,
			t = new XMLHttpRequest;
		try {
			t.open("GET", "WebAudioPluginTest.fail", !1)
		} catch (t) {
			return e = !1
		}
		t.onerror = function () {
			e = !1
		}, t.onload = function () {
			e = 404 == this.status || 200 == this.status || 0 == this.status && "" != this.response
		};
		try {
			t.send()
		} catch (t) {
			e = !1
		}
		return e
	}, s._generateCapabilities = function () {
		if(null == s._capabilities) {
			var e = document.createElement("audio");
			if(null == e.canPlayType) return null;
			if(null == s.context)
				if(window.AudioContext) s.context = new AudioContext;
				else {
					if(!window.webkitAudioContext) return null;
					s.context = new webkitAudioContext
				} s._compatibilitySetUp(), s.playEmptySound(), s._capabilities = {
				panning: !0,
				volume: !0,
				tracks: -1
			};
			for(var t = createjs.Sound.SUPPORTED_EXTENSIONS, i = createjs.Sound.EXTENSION_MAP, n = 0, r = t.length; r > n; n++) {
				var a = t[n],
					o = i[a] || a;
				s._capabilities[a] = "no" != e.canPlayType("audio/" + a) && "" != e.canPlayType("audio/" + a) || "no" != e.canPlayType("audio/" + o) && "" != e.canPlayType("audio/" + o)
			}
			s.context.destination.numberOfChannels < 2 && (s._capabilities.panning = !1)
		}
	}, s._compatibilitySetUp = function () {
		if(s._panningModel = "equalpower", !s.context.createGain) {
			s.context.createGain = s.context.createGainNode;
			var e = s.context.createBufferSource();
			e.__proto__.start = e.__proto__.noteGrainOn, e.__proto__.stop = e.__proto__.noteOff, s._panningModel = 0
		}
	}, t.toString = function () {
		return "[WebAudioPlugin]"
	}, t._addPropsToClasses = function () {
		var e = this._soundInstanceClass;
		e.context = this.context, e.destinationNode = this.gainNode, e._panningModel = this._panningModel, this._loaderClass.context = this.context
	}, t._updateVolume = function () {
		var e = createjs.Sound._masterMute ? 0 : this._volume;
		e != this.gainNode.gain.value && (this.gainNode.gain.value = e)
	}, createjs.WebAudioPlugin = createjs.promote(e, "AbstractPlugin")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e) {
		this.src = e, this.length = 0, this.available = 0, this.tags = [], this.duration = 0
	}
	var t = e.prototype;
	t.constructor = e;
	var s = e;
	s.tags = {}, s.get = function (t) {
		var i = s.tags[t];
		return null == i && (i = s.tags[t] = new e(t)), i
	}, s.remove = function (e) {
		var t = s.tags[e];
		return null != t && (t.removeAll(), delete s.tags[e], !0)
	}, s.getInstance = function (e) {
		var t = s.tags[e];
		return null == t ? null : t.get()
	}, s.setInstance = function (e, t) {
		var i = s.tags[e];
		return null == i ? null : i.set(t)
	}, s.getDuration = function (e) {
		var t = s.tags[e];
		return null == t ? 0 : t.getDuration()
	}, t.add = function (e) {
		this.tags.push(e), this.length++, this.available++
	}, t.removeAll = function () {
		for(var e; this.length--;)(e = this.tags[this.length]).parentNode && e.parentNode.removeChild(e), delete this.tags[this.length];
		this.src = null, this.tags.length = 0
	}, t.get = function () {
		if(0 == this.tags.length) return null;
		this.available = this.tags.length;
		var e = this.tags.pop();
		return null == e.parentNode && document.body.appendChild(e), e
	}, t.set = function (e) {
		-1 == createjs.indexOf(this.tags, e) && this.tags.push(e), this.available = this.tags.length
	}, t.getDuration = function () {
		return this.duration || (this.duration = 1e3 * this.tags[this.tags.length - 1].duration), this.duration
	}, t.toString = function () {
		return "[HTMLAudioTagPool]"
	}, createjs.HTMLAudioTagPool = e
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e(e, t, s, i) {
		this.AbstractSoundInstance_constructor(e, t, s, i), this._audioSpriteStopTime = null, this._delayTimeoutId = null, this._endedHandler = createjs.proxy(this._handleSoundComplete, this), this._readyHandler = createjs.proxy(this._handleTagReady, this), this._stalledHandler = createjs.proxy(this.playFailed, this), this._audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteLoop, this), this._loopHandler = createjs.proxy(this._handleSoundComplete, this), s ? this._audioSpriteStopTime = .001 * (t + s) : this._duration = createjs.HTMLAudioTagPool.getDuration(this.src)
	}
	var t = createjs.extend(e, createjs.AbstractSoundInstance);
	t.setMasterVolume = function () {
		this._updateVolume()
	}, t.setMasterMute = function () {
		this._updateVolume()
	}, t.toString = function () {
		return "[HTMLAudioSoundInstance]"
	}, t._removeLooping = function () {
		null != this._playbackResource && (this._playbackResource.loop = !1, this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
	}, t._addLooping = function () {
		null == this._playbackResource || this._audioSpriteStopTime || (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.loop = !0)
	}, t._handleCleanUp = function () {
		var e = this._playbackResource;
		if(null != e) {
			e.pause(), e.loop = !1, e.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), e.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), e.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), e.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), e.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1);
			try {
				e.currentTime = this._startTime
			} catch (e) {}
			createjs.HTMLAudioTagPool.setInstance(this.src, e), this._playbackResource = null
		}
	}, t._beginPlaying = function (e, t, s, i) {
		return this._playbackResource = createjs.HTMLAudioTagPool.getInstance(this.src), this.AbstractSoundInstance__beginPlaying(e, t, s, i)
	}, t._handleSoundReady = function () {
		if(4 !== this._playbackResource.readyState) {
			var e = this._playbackResource;
			return e.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), e.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), e.preload = "auto", void e.load()
		}
		this._updateVolume(), this._playbackResource.currentTime = .001 * (this._startTime + this._position), this._audioSpriteStopTime ? this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1) : (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), 0 != this._loop && (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.loop = !0)), this._playbackResource.play()
	}, t._handleTagReady = function () {
		this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), this._handleSoundReady()
	}, t._pause = function () {
		this._playbackResource.pause()
	}, t._resume = function () {
		this._playbackResource.play()
	}, t._updateVolume = function () {
		if(null != this._playbackResource) {
			var e = this._muted || createjs.Sound._masterMute ? 0 : this._volume * createjs.Sound._masterVolume;
			e != this._playbackResource.volume && (this._playbackResource.volume = e)
		}
	}, t._calculateCurrentPosition = function () {
		return 1e3 * this._playbackResource.currentTime - this._startTime
	}, t._updatePosition = function () {
		this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1);
		try {
			this._playbackResource.currentTime = .001 * (this._position + this._startTime)
		} catch (e) {
			this._handleSetPositionSeek(null)
		}
	}, t._handleSetPositionSeek = function () {
		null != this._playbackResource && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
	}, t._handleAudioSpriteLoop = function () {
		this._playbackResource.currentTime <= this._audioSpriteStopTime || (this._playbackResource.pause(), 0 == this._loop ? this._handleSoundComplete(null) : (this._position = 0, this._loop--, this._playbackResource.currentTime = .001 * this._startTime, this._paused || this._playbackResource.play(), this._sendEvent("loop")))
	}, t._handleLoop = function () {
		0 == this._loop && (this._playbackResource.loop = !1, this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
	}, t._updateDuration = function () {
		this._audioSpriteStopTime = .001 * (startTime + duration), this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1))
	}, createjs.HTMLAudioSoundInstance = createjs.promote(e, "AbstractSoundInstance")
}(), this.createjs = this.createjs || {},
function () {
	"use strict";

	function e() {
		this.AbstractPlugin_constructor(), this.defaultNumChannels = 2, this._capabilities = s._capabilities, this._loaderClass = createjs.SoundLoader, this._soundInstanceClass = createjs.HTMLAudioSoundInstance
	}
	var t = createjs.extend(e, createjs.AbstractPlugin),
		s = e;
	s.MAX_INSTANCES = 30, s._AUDIO_READY = "canplaythrough", s._AUDIO_ENDED = "ended", s._AUDIO_SEEKED = "seeked", s._AUDIO_STALLED = "stalled", s._TIME_UPDATE = "timeupdate", s._capabilities = null, s.enableIOS = !1, s.isSupported = function () {
		return s._generateCapabilities(), null != s._capabilities
	}, s._generateCapabilities = function () {
		if(null == s._capabilities) {
			var e = document.createElement("audio");
			if(null == e.canPlayType) return null;
			s._capabilities = {
				panning: !0,
				volume: !0,
				tracks: -1
			};
			for(var t = createjs.Sound.SUPPORTED_EXTENSIONS, i = createjs.Sound.EXTENSION_MAP, n = 0, r = t.length; r > n; n++) {
				var a = t[n],
					o = i[a] || a;
				s._capabilities[a] = "no" != e.canPlayType("audio/" + a) && "" != e.canPlayType("audio/" + a) || "no" != e.canPlayType("audio/" + o) && "" != e.canPlayType("audio/" + o)
			}
		}
	}, t.register = function (e, t) {
		for(var s = createjs.HTMLAudioTagPool.get(e.src), i = null, n = 0; t > n; n++) i = this._createTag(e.src), s.add(i);
		var r = this.AbstractPlugin_register(e, t);
		return r.setTag(i), r
	}, t.removeSound = function (e) {
		this.AbstractPlugin_removeSound(e), createjs.HTMLAudioTagPool.remove(e)
	}, t.create = function (e, t, s) {
		var i = this.AbstractPlugin_create(e, t, s);
		return i.setPlaybackResource(null), i
	}, t.toString = function () {
		return "[HTMLAudioPlugin]"
	}, t.setVolume = t.getVolume = t.setMute = null, t._createTag = function (e) {
		var t = document.createElement("audio");
		return t.autoplay = !1, t.preload = "none", t.src = e, t
	}, createjs.HTMLAudioPlugin = createjs.promote(e, "AbstractPlugin")
}();

