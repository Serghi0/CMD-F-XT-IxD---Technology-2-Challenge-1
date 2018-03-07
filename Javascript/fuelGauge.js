! function(n) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = n();
    else if ("function" == typeof define && define.amd) define([], n);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.fuelGauge = n()
    }
}(function() {
    return function n(t, e, r) {
        function i(u, a) {
            if (!e[u]) {
                if (!t[u]) {
                    var c = "function" == typeof require && require;
                    if (!a && c) return c(u, !0);
                    if (o) return o(u, !0);
                    var l = new Error("Cannot find module '" + u + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var s = e[u] = {
                    exports: {}
                };
                t[u][0].call(s.exports, function(n) {
                    var e = t[u][1][n];
                    return i(e ? e : n)
                }, s, s.exports, n, t, e, r)
            }
            return e[u].exports
        }
        for (var o = "function" == typeof require && require, u = 0; u < r.length; u++) i(r[u]);
        return i
    }({
        1: [function(n, t, e) {
            "use strict";

            function r(n, t) {
                return this instanceof r ? (this._el = n, this._opts = i(o, t), this._size = this._opts.size, this._radius = .9 * this._size / 2, this._cx = this._size / 2, this._cy = this._cx, this._preserveAspectRatio = this._opts.preserveAspectRatio, this._min = this._opts.min, this._max = this._opts.max, this._range = this._max - this._min, this._majorTicks = this._opts.majorTicks, this._minorTicks = this._opts.minorTicks, this._needleWidthRatio = this._opts.needleWidthRatio, this._needleContainerRadiusRatio = this._opts.needleContainerRadiusRatio, this._transitionDuration = this._opts.transitionDuration, this._label = this._opts.label, this._zones = this._opts.zones || [], this._clazz = t.clazz, this._initZones(), void this._render()) : new r(n, t)
            }
            var i = n("xtend"),
                o = n("./defaults/simple"),
                u = n("d3"),
                a = (t.exports = r, r.prototype);
            a.write = function(n, t) {
                function e() {
                    var t = n,
                        e = n > r._max,
                        i = n < r._min;
                    e ? t = r._max + .02 * r._range : i && (t = r._min - .02 * r._range);
                    var o = r._toDegrees(t) - 90,
                        u = r._currentRotation || o;
                    return r._currentRotation = o,
                        function(n) {
                            var t = u + (o - u) * n;
                            return "translate(" + r._cx + ", " + r._cy + ") rotate(" + t + ")"
                        }
                }
                var r = this,
                    i = this._gauge.select(".needle-container");
                i.selectAll("text").attr("class", "current-value").text(Math.round(n));
                var o = i.selectAll("path");
                o.transition().duration(t ? t : this._transitionDuration).attrTween("transform", e)
            }, a._initZones = function() {
                function n(n) {
                    return e._min + e._range * n
                }

                function t(t) {
                    return {
                        clazz: t.clazz,
                        from: n(t.from),
                        to: n(t.to)
                    }
                }
                var e = this;
                this._zones = this._zones.map(t)
            }, a._render = function() {
                this._initGauge(), this._drawOuterCircle(), this._drawInnerCircle(), this._drawLabel(), this._drawZones(), this._drawTicks(), this._drawNeedle(), this.write(this._min, 0)
            }, a._initGauge = function() {
                this._gauge = u.select(this._el).append("svg:svg").attr("class", "d3-gauge" + (this._clazz ? " " + this._clazz : "")).attr("width", this._size).attr("height", this._size).attr("viewBox", "0 0 " + this._size + " " + this._size).attr("preserveAspectRatio", this._preserveAspectRatio || "xMinYMin meet")
            }, a._drawOuterCircle = function() {
                this._gauge.append("svg:circle").attr("class", "outer-circle").attr("cx", this._cx).attr("cy", this._cy).attr("r", this._radius)
            }, a._drawInnerCircle = function() {
                this._gauge.append("svg:circle").attr("class", "inner-circle").attr("cx", this._cx).attr("cy", this._cy).attr("r", .9 * this._radius)
            }, a._drawLabel = function() {
                if (void 0 !== typeof this._label) {
                    var n = Math.round(this._size / 9),
                        t = n / 2;
                    this._gauge.append("svg:text").attr("class", "label").attr("x", this._cx).attr("y", this._cy / 2 + t).attr("dy", t).attr("text-anchor", "middle").text(this._label)
                }
            }, a._drawTicks = function() {
                for (var n, t = this._range / (this._majorTicks - 1), e = t / this._minorTicks, r = this._min; r <= this._max; r += t) {
                    for (var i = Math.min(r + t, this._max), o = r + e; o < i; o += e) this._drawLine(this._toPoint(o, .75), this._toPoint(o, .85), "minor-tick");
                    this._drawLine(this._toPoint(r, .7), this._toPoint(r, .85), "major-tick"), r !== this._min && r !== this._max || (n = this._toPoint(r, .63), this._gauge.append("svg:text").attr("class", "major-tick-label").attr("x", n.x).attr("y", n.y).attr("text-anchor", r === this._min ? "start" : "end").text(r))
                }
            }, a._drawLine = function(n, t, e) {
                this._gauge.append("svg:line").attr("class", e).attr("x1", n.x).attr("y1", n.y).attr("x2", t.x).attr("y2", t.y)
            }, a._drawZones = function() {
                function n(n) {
                    t._drawBand(n.from, n.to, n.clazz)
                }
                var t = this;
                this._zones.forEach(n)
            }, a._drawBand = function(n, t, e) {
                function r() {
                    return "translate(" + i._cx + ", " + i._cy + ") rotate(270)"
                }
                var i = this,
                    o = u.svg.arc().startAngle(this._toRadians(n)).endAngle(this._toRadians(t)).innerRadius(.65 * this._radius).outerRadius(.85 * this._radius);
                this._gauge.append("svg:path").attr("class", e).attr("d", o).attr("transform", r)
            }, a._drawNeedle = function() {
                var n = this._gauge.append("svg:g").attr("class", "needle-container"),
                    t = (this._min + this._max) / 2,
                    e = this._buildNeedlePath(t),
                    r = u.svg.line().x(function(n) {
                        return n.x
                    }).y(function(n) {
                        return n.y
                    }).interpolate("basis");
                n.selectAll("path").data([e]).enter().append("svg:path").attr("class", "needle").attr("d", r), n.append("svg:circle").attr("cx", this._cx).attr("cy", this._cy).attr("r", this._radius * this._needleContainerRadiusRatio / 10);
                var i = Math.round(this._size / 10);
                n.selectAll("text").data([t]).enter().append("svg:text").attr("x", this._cx).attr("y", this._size - this._cy / 4 - i).attr("dy", i / 2).attr("text-anchor", "middle")
            }, a._buildNeedlePath = function(n) {
                function t(n, t) {
                    var r = e._toPoint(n, t);
                    return r.x -= e._cx, r.y -= e._cy, r
                }
                var e = this,
                    r = this._range * this._needleWidthRatio / 10,
                    i = n - this._range * (1 / .75) / 2,
                    o = t(n, .85),
                    u = t(n - r, .12),
                    a = t(n + r, .12),
                    c = t(i, .28),
                    l = t(i - r, .12),
                    s = t(i + r, .12);
                return [o, u, s, c, l, a, o]
            }, a._toDegrees = function(n) {
                return n / this._range * 270 - (this._min / this._range * 270 + 45)
            }, a._toRadians = function(n) {
                return this._toDegrees(n) * Math.PI / 180
            }, a._toPoint = function(n, t) {
                var e = this._radius * t,
                    r = this._toRadians(n);
                return {
                    x: this._cx - e * Math.cos(r),
                    y: this._cy - e * Math.sin(r)
                }
            }
        }, {
            "./defaults/simple": 2,
            d3: 4,
            xtend: 6
        }],
        2: [function(n, t, e) {
            "use strict";
            t.exports = {
                size: 300,
                min: 0,
                max: 181437,
                transitionDuration: 500,
                label: "label.text",
                minorTicks: 4,
                majorTicks: 5,
                needleWidthRatio: .6,
                needleContainerRadiusRatio: .7,
                zones: [{
                    clazz: "yellow-zone",
                    from: .1,
                    to: .3
                }, {
                    clazz: "red-zone",
                    from: 0,
                    to: 0.1
                }]
            }
        }, {}],
        3: [function(n, t, e) {
            d3 = function() {
                function n(n) {
                    return null != n && !isNaN(n)
                }

                function t(n) {
                    return n.length
                }

                function e(n) {
                    for (var t = 1; n * t % 1;) t *= 10;
                    return t
                }

                function r(n, t) {
                    try {
                        for (var e in t) Object.defineProperty(n.prototype, e, {
                            value: t[e],
                            enumerable: !1
                        })
                    } catch (e) {
                        n.prototype = t
                    }
                }

                function i() {}

                function o() {}

                function u(n, t, e) {
                    return function() {
                        var r = e.apply(t, arguments);
                        return r === t ? n : r
                    }
                }

                function a(n, t) {
                    if (t in n) return t;
                    t = t.charAt(0).toUpperCase() + t.substring(1);
                    for (var e = 0, r = su.length; e < r; ++e) {
                        var i = su[e] + t;
                        if (i in n) return i
                    }
                }

                function c() {}

                function l() {}

                function s(n) {
                    function t() {
                        for (var t, r = e, i = -1, o = r.length; ++i < o;)(t = r[i].on) && t.apply(this, arguments);
                        return n
                    }
                    var e = [],
                        r = new i;
                    return t.on = function(t, i) {
                        var o, u = r.get(t);
                        return arguments.length < 2 ? u && u.on : (u && (u.on = null, e = e.slice(0, o = e.indexOf(u)).concat(e.slice(o + 1)), r.remove(t)), i && e.push(r.set(t, {
                            on: i
                        })), n)
                    }, t
                }

                function f() {
                    Wo.event.preventDefault()
                }

                function h() {
                    for (var n, t = Wo.event; n = t.sourceEvent;) t = n;
                    return t
                }

                function p(n) {
                    for (var t = new l, e = 0, r = arguments.length; ++e < r;) t[arguments[e]] = s(t);
                    return t.of = function(e, r) {
                        return function(i) {
                            try {
                                var o = i.sourceEvent = Wo.event;
                                i.target = n, Wo.event = i, t[i.type].apply(e, r)
                            } finally {
                                Wo.event = o
                            }
                        }
                    }, t
                }

                function g(n) {
                    return hu(n, yu), n
                }

                function d(n) {
                    return "function" == typeof n ? n : function() {
                        return pu(n, this)
                    }
                }

                function v(n) {
                    return "function" == typeof n ? n : function() {
                        return gu(n, this)
                    }
                }

                function y(n, t) {
                    function e() {
                        this.removeAttribute(n)
                    }

                    function r() {
                        this.removeAttributeNS(n.space, n.local)
                    }

                    function i() {
                        this.setAttribute(n, t)
                    }

                    function o() {
                        this.setAttributeNS(n.space, n.local, t)
                    }

                    function u() {
                        var e = t.apply(this, arguments);
                        null == e ? this.removeAttribute(n) : this.setAttribute(n, e)
                    }

                    function a() {
                        var e = t.apply(this, arguments);
                        null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e)
                    }
                    return n = Wo.ns.qualify(n), null == t ? n.local ? r : e : "function" == typeof t ? n.local ? a : u : n.local ? o : i
                }

                function m(n) {
                    return n.trim().replace(/\s+/g, " ")
                }

                function x(n) {
                    return new RegExp("(?:^|\\s+)" + Wo.requote(n) + "(?:\\s+|$)", "g")
                }

                function _(n) {
                    return n.trim().split(/^|\s+/)
                }

                function M(n, t) {
                    function e() {
                        for (var e = -1; ++e < i;) n[e](this, t)
                    }

                    function r() {
                        for (var e = -1, r = t.apply(this, arguments); ++e < i;) n[e](this, r)
                    }
                    n = _(n).map(b);
                    var i = n.length;
                    return "function" == typeof t ? r : e
                }

                function b(n) {
                    var t = x(n);
                    return function(e, r) {
                        if (i = e.classList) return r ? i.add(n) : i.remove(n);
                        var i = e.getAttribute("class") || "";
                        r ? (t.lastIndex = 0, t.test(i) || e.setAttribute("class", m(i + " " + n))) : e.setAttribute("class", m(i.replace(t, " ")))
                    }
                }

                function w(n, t, e) {
                    function r() {
                        this.style.removeProperty(n)
                    }

                    function i() {
                        this.style.setProperty(n, t, e)
                    }

                    function o() {
                        var r = t.apply(this, arguments);
                        null == r ? this.style.removeProperty(n) : this.style.setProperty(n, r, e)
                    }
                    return null == t ? r : "function" == typeof t ? o : i
                }

                function k(n, t) {
                    function e() {
                        delete this[n]
                    }

                    function r() {
                        this[n] = t
                    }

                    function i() {
                        var e = t.apply(this, arguments);
                        null == e ? delete this[n] : this[n] = e
                    }
                    return null == t ? e : "function" == typeof t ? i : r
                }

                function S(n) {
                    return "function" == typeof n ? n : (n = Wo.ns.qualify(n)).local ? function() {
                        return this.ownerDocument.createElementNS(n.space, n.local)
                    } : function() {
                        return this.ownerDocument.createElementNS(this.namespaceURI, n)
                    }
                }

                function E(n) {
                    return {
                        __data__: n
                    }
                }

                function N(n) {
                    return function() {
                        return vu(this, n)
                    }
                }

                function A(n) {
                    return arguments.length || (n = Wo.ascending),
                        function(t, e) {
                            return t && e ? n(t.__data__, e.__data__) : !t - !e
                        }
                }

                function C(n, t) {
                    for (var e = 0, r = n.length; e < r; e++)
                        for (var i, o = n[e], u = 0, a = o.length; u < a; u++)(i = o[u]) && t(i, u, e);
                    return n
                }

                function z(n) {
                    return hu(n, xu), n
                }

                function T(n) {
                    var t, e;
                    return function(r, i, o) {
                        var u, a = n[o].update,
                            c = a.length;
                        for (o != e && (e = o, t = 0), i >= t && (t = i + 1); !(u = a[t]) && ++t < c;);
                        return u
                    }
                }

                function L() {
                    var n = this.__transition__;
                    n && ++n.active
                }

                function q(n, t, e) {
                    function r() {
                        var t = this[u];
                        t && (this.removeEventListener(n, t, t.$), delete this[u])
                    }

                    function i() {
                        var i = l(t, Jo(arguments));
                        r.call(this), this.addEventListener(n, this[u] = i, i.$ = e), i._ = t
                    }

                    function o() {
                        var t, e = new RegExp("^__on([^.]+)" + Wo.requote(n) + "$");
                        for (var r in this)
                            if (t = r.match(e)) {
                                var i = this[r];
                                this.removeEventListener(t[1], i, i.$), delete this[r]
                            }
                    }
                    var u = "__on" + n,
                        a = n.indexOf("."),
                        l = R;
                    a > 0 && (n = n.substring(0, a));
                    var s = Mu.get(n);
                    return s && (n = s, l = j), a ? t ? i : r : t ? c : o
                }

                function R(n, t) {
                    return function(e) {
                        var r = Wo.event;
                        Wo.event = e, t[0] = this.__data__;
                        try {
                            n.apply(this, t)
                        } finally {
                            Wo.event = r
                        }
                    }
                }

                function j(n, t) {
                    var e = R(n, t);
                    return function(n) {
                        var t = this,
                            r = n.relatedTarget;
                        r && (r === t || 8 & r.compareDocumentPosition(t)) || e.call(t, n)
                    }
                }

                function D() {
                    var n = ".dragsuppress-" + ++wu,
                        t = "click" + n,
                        e = Wo.select(nu).on("touchmove" + n, f).on("dragstart" + n, f).on("selectstart" + n, f);
                    if (bu) {
                        var r = Qo.style,
                            i = r[bu];
                        r[bu] = "none"
                    }
                    return function(o) {
                        function u() {
                            e.on(t, null)
                        }
                        e.on(n, null), bu && (r[bu] = i), o && (e.on(t, function() {
                            f(), u()
                        }, !0), setTimeout(u, 0))
                    }
                }

                function P(n, t) {
                    t.changedTouches && (t = t.changedTouches[0]);
                    var e = n.ownerSVGElement || n;
                    if (e.createSVGPoint) {
                        var r = e.createSVGPoint();
                        if (ku < 0 && (nu.scrollX || nu.scrollY)) {
                            e = Wo.select("body").append("svg").style({
                                position: "absolute",
                                top: 0,
                                left: 0,
                                margin: 0,
                                padding: 0,
                                border: "none"
                            }, "important");
                            var i = e[0][0].getScreenCTM();
                            ku = !(i.f || i.e), e.remove()
                        }
                        return ku ? (r.x = t.pageX, r.y = t.pageY) : (r.x = t.clientX, r.y = t.clientY), r = r.matrixTransform(n.getScreenCTM().inverse()), [r.x, r.y]
                    }
                    var o = n.getBoundingClientRect();
                    return [t.clientX - o.left - n.clientLeft, t.clientY - o.top - n.clientTop]
                }

                function U(n) {
                    return n > 0 ? 1 : n < 0 ? -1 : 0
                }

                function O(n) {
                    return n > 1 ? 0 : n < -1 ? Su : Math.acos(n)
                }

                function F(n) {
                    return n > 1 ? Nu : n < -1 ? -Nu : Math.asin(n)
                }

                function H(n) {
                    return ((n = Math.exp(n)) - 1 / n) / 2
                }

                function I(n) {
                    return ((n = Math.exp(n)) + 1 / n) / 2
                }

                function Y(n) {
                    return ((n = Math.exp(2 * n)) - 1) / (n + 1)
                }

                function Z(n) {
                    return (n = Math.sin(n / 2)) * n
                }

                function V() {}

                function B(n, t, e) {
                    return new X(n, t, e)
                }

                function X(n, t, e) {
                    this.h = n, this.s = t, this.l = e
                }

                function $(n, t, e) {
                    function r(n) {
                        return n > 360 ? n -= 360 : n < 0 && (n += 360), n < 60 ? o + (u - o) * n / 60 : n < 180 ? u : n < 240 ? o + (u - o) * (240 - n) / 60 : o
                    }

                    function i(n) {
                        return Math.round(255 * r(n))
                    }
                    var o, u;
                    return n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n, t = isNaN(t) ? 0 : t < 0 ? 0 : t > 1 ? 1 : t, e = e < 0 ? 0 : e > 1 ? 1 : e, u = e <= .5 ? e * (1 + t) : e + t - e * t, o = 2 * e - u, cn(i(n + 120), i(n), i(n - 120))
                }

                function W(n, t, e) {
                    return new G(n, t, e)
                }

                function G(n, t, e) {
                    this.h = n, this.c = t, this.l = e
                }

                function J(n, t, e) {
                    return isNaN(n) && (n = 0), isNaN(t) && (t = 0), K(e, Math.cos(n *= zu) * t, Math.sin(n) * t)
                }

                function K(n, t, e) {
                    return new Q(n, t, e)
                }

                function Q(n, t, e) {
                    this.l = n, this.a = t, this.b = e
                }

                function nn(n, t, e) {
                    var r = (n + 16) / 116,
                        i = r + t / 500,
                        o = r - e / 200;
                    return i = en(i) * Hu, r = en(r) * Iu, o = en(o) * Yu, cn(on(3.2404542 * i - 1.5371385 * r - .4985314 * o), on(-.969266 * i + 1.8760108 * r + .041556 * o), on(.0556434 * i - .2040259 * r + 1.0572252 * o))
                }

                function tn(n, t, e) {
                    return n > 0 ? W(Math.atan2(e, t) * Tu, Math.sqrt(t * t + e * e), n) : W(NaN, NaN, n)
                }

                function en(n) {
                    return n > .206893034 ? n * n * n : (n - 4 / 29) / 7.787037
                }

                function rn(n) {
                    return n > .008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29
                }

                function on(n) {
                    return Math.round(255 * (n <= .00304 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055))
                }

                function un(n) {
                    return cn(n >> 16, n >> 8 & 255, 255 & n)
                }

                function an(n) {
                    return un(n) + ""
                }

                function cn(n, t, e) {
                    return new ln(n, t, e)
                }

                function ln(n, t, e) {
                    this.r = n, this.g = t, this.b = e
                }

                function sn(n) {
                    return n < 16 ? "0" + Math.max(0, n).toString(16) : Math.min(255, n).toString(16)
                }

                function fn(n, t, e) {
                    var r, i, o, u = 0,
                        a = 0,
                        c = 0;
                    if (r = /([a-z]+)\((.*)\)/i.exec(n)) switch (i = r[2].split(","), r[1]) {
                        case "hsl":
                            return e(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100);
                        case "rgb":
                            return t(dn(i[0]), dn(i[1]), dn(i[2]))
                    }
                    return (o = Bu.get(n)) ? t(o.r, o.g, o.b) : (null != n && "#" === n.charAt(0) && (4 === n.length ? (u = n.charAt(1), u += u, a = n.charAt(2), a += a, c = n.charAt(3), c += c) : 7 === n.length && (u = n.substring(1, 3), a = n.substring(3, 5), c = n.substring(5, 7)), u = parseInt(u, 16), a = parseInt(a, 16), c = parseInt(c, 16)), t(u, a, c))
                }

                function hn(n, t, e) {
                    var r, i, o = Math.min(n /= 255, t /= 255, e /= 255),
                        u = Math.max(n, t, e),
                        a = u - o,
                        c = (u + o) / 2;
                    return a ? (i = c < .5 ? a / (u + o) : a / (2 - u - o), r = n == u ? (t - e) / a + (t < e ? 6 : 0) : t == u ? (e - n) / a + 2 : (n - t) / a + 4, r *= 60) : (r = NaN, i = c > 0 && c < 1 ? 0 : r), B(r, i, c)
                }

                function pn(n, t, e) {
                    n = gn(n), t = gn(t), e = gn(e);
                    var r = rn((.4124564 * n + .3575761 * t + .1804375 * e) / Hu),
                        i = rn((.2126729 * n + .7151522 * t + .072175 * e) / Iu),
                        o = rn((.0193339 * n + .119192 * t + .9503041 * e) / Yu);
                    return K(116 * i - 16, 500 * (r - i), 200 * (i - o))
                }

                function gn(n) {
                    return (n /= 255) <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4)
                }

                function dn(n) {
                    var t = parseFloat(n);
                    return "%" === n.charAt(n.length - 1) ? Math.round(2.55 * t) : t
                }

                function vn(n) {
                    return "function" == typeof n ? n : function() {
                        return n
                    }
                }

                function yn(n) {
                    return n
                }

                function mn(n) {
                    return function(t, e, r) {
                        return 2 === arguments.length && "function" == typeof e && (r = e, e = null), xn(t, e, n, r)
                    }
                }

                function xn(n, t, e, r) {
                    function i() {
                        var n, t = c.status;
                        if (!t && c.responseText || t >= 200 && t < 300 || 304 === t) {
                            try {
                                n = e.call(o, c)
                            } catch (n) {
                                return void u.error.call(o, n)
                            }
                            u.load.call(o, n)
                        } else u.error.call(o, c)
                    }
                    var o = {},
                        u = Wo.dispatch("beforesend", "progress", "load", "error"),
                        a = {},
                        c = new XMLHttpRequest,
                        l = null;
                    return !nu.XDomainRequest || "withCredentials" in c || !/^(http(s)?:)?\/\//.test(n) || (c = new XDomainRequest), "onload" in c ? c.onload = c.onerror = i : c.onreadystatechange = function() {
                        c.readyState > 3 && i()
                    }, c.onprogress = function(n) {
                        var t = Wo.event;
                        Wo.event = n;
                        try {
                            u.progress.call(o, c)
                        } finally {
                            Wo.event = t
                        }
                    }, o.header = function(n, t) {
                        return n = (n + "").toLowerCase(), arguments.length < 2 ? a[n] : (null == t ? delete a[n] : a[n] = t + "", o)
                    }, o.mimeType = function(n) {
                        return arguments.length ? (t = null == n ? null : n + "", o) : t
                    }, o.responseType = function(n) {
                        return arguments.length ? (l = n, o) : l
                    }, o.response = function(n) {
                        return e = n, o
                    }, ["get", "post"].forEach(function(n) {
                        o[n] = function() {
                            return o.send.apply(o, [n].concat(Jo(arguments)))
                        }
                    }), o.send = function(e, r, i) {
                        if (2 === arguments.length && "function" == typeof r && (i = r, r = null), c.open(e, n, !0), null == t || "accept" in a || (a.accept = t + ",*/*"), c.setRequestHeader)
                            for (var s in a) c.setRequestHeader(s, a[s]);
                        return null != t && c.overrideMimeType && c.overrideMimeType(t), null != l && (c.responseType = l), null != i && o.on("error", i).on("load", function(n) {
                            i(null, n)
                        }), u.beforesend.call(o, c), c.send(null == r ? null : r), o
                    }, o.abort = function() {
                        return c.abort(), o
                    }, Wo.rebind(o, u, "on"), null == r ? o : o.get(_n(r))
                }

                function _n(n) {
                    return 1 === n.length ? function(t, e) {
                        n(null == t ? e : null)
                    } : n
                }

                function Mn() {
                    var n = bn(),
                        t = wn() - n;
                    t > 24 ? (isFinite(t) && (clearTimeout(Gu), Gu = setTimeout(Mn, t)), Wu = 0) : (Wu = 1, Ku(Mn))
                }

                function bn() {
                    var n = Date.now();
                    for (Ju = Xu; Ju;) n >= Ju.t && (Ju.f = Ju.c(n - Ju.t)), Ju = Ju.n;
                    return n
                }

                function wn() {
                    for (var n, t = Xu, e = 1 / 0; t;) t.f ? t = n ? n.n = t.n : Xu = t.n : (t.t < e && (e = t.t), t = (n = t).n);
                    return $u = n, e
                }

                function kn(n, t) {
                    var e = Math.pow(10, 3 * au(8 - t));
                    return {
                        scale: t > 8 ? function(n) {
                            return n / e
                        } : function(n) {
                            return n * e
                        },
                        symbol: n
                    }
                }

                function Sn(n, t) {
                    return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1)
                }

                function En(n) {
                    return n + ""
                }

                function Nn() {}

                function An(n, t, e) {
                    var r = e.s = n + t,
                        i = r - n,
                        o = r - i;
                    e.t = n - o + (t - i)
                }

                function Cn(n, t) {
                    n && sa.hasOwnProperty(n.type) && sa[n.type](n, t)
                }

                function zn(n, t, e) {
                    var r, i = -1,
                        o = n.length - e;
                    for (t.lineStart(); ++i < o;) r = n[i], t.point(r[0], r[1], r[2]);
                    t.lineEnd()
                }

                function Tn(n, t) {
                    var e = -1,
                        r = n.length;
                    for (t.polygonStart(); ++e < r;) zn(n[e], t, 1);
                    t.polygonEnd()
                }

                function Ln() {
                    function n(n, t) {
                        n *= zu, t = t * zu / 2 + Su / 4;
                        var e = n - r,
                            u = Math.cos(t),
                            a = Math.sin(t),
                            c = o * a,
                            l = i * u + c * Math.cos(e),
                            s = c * Math.sin(e);
                        ha.add(Math.atan2(s, l)), r = n, i = u, o = a
                    }
                    var t, e, r, i, o;
                    pa.point = function(u, a) {
                        pa.point = n, r = (t = u) * zu, i = Math.cos(a = (e = a) * zu / 2 + Su / 4), o = Math.sin(a)
                    }, pa.lineEnd = function() {
                        n(t, e)
                    }
                }

                function qn(n) {
                    var t = n[0],
                        e = n[1],
                        r = Math.cos(e);
                    return [r * Math.cos(t), r * Math.sin(t), Math.sin(e)]
                }

                function Rn(n, t) {
                    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2]
                }

                function jn(n, t) {
                    return [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]]
                }

                function Dn(n, t) {
                    n[0] += t[0], n[1] += t[1], n[2] += t[2]
                }

                function Pn(n, t) {
                    return [n[0] * t, n[1] * t, n[2] * t]
                }

                function Un(n) {
                    var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
                    n[0] /= t, n[1] /= t, n[2] /= t
                }

                function On(n) {
                    return [Math.atan2(n[1], n[0]), F(n[2])]
                }

                function Fn(n, t) {
                    return au(n[0] - t[0]) < Au && au(n[1] - t[1]) < Au
                }

                function Hn(n, t) {
                    n *= zu;
                    var e = Math.cos(t *= zu);
                    In(e * Math.cos(n), e * Math.sin(n), Math.sin(t))
                }

                function In(n, t, e) {
                    ++ga, va += (n - va) / ga, ya += (t - ya) / ga, ma += (e - ma) / ga
                }

                function Yn() {
                    function n(n, i) {
                        n *= zu;
                        var o = Math.cos(i *= zu),
                            u = o * Math.cos(n),
                            a = o * Math.sin(n),
                            c = Math.sin(i),
                            l = Math.atan2(Math.sqrt((l = e * c - r * a) * l + (l = r * u - t * c) * l + (l = t * a - e * u) * l), t * u + e * a + r * c);
                        da += l, xa += l * (t + (t = u)), _a += l * (e + (e = a)), Ma += l * (r + (r = c)), In(t, e, r)
                    }
                    var t, e, r;
                    Sa.point = function(i, o) {
                        i *= zu;
                        var u = Math.cos(o *= zu);
                        t = u * Math.cos(i), e = u * Math.sin(i), r = Math.sin(o), Sa.point = n, In(t, e, r)
                    }
                }

                function Zn() {
                    Sa.point = Hn
                }

                function Vn() {
                    function n(n, t) {
                        n *= zu;
                        var e = Math.cos(t *= zu),
                            u = e * Math.cos(n),
                            a = e * Math.sin(n),
                            c = Math.sin(t),
                            l = i * c - o * a,
                            s = o * u - r * c,
                            f = r * a - i * u,
                            h = Math.sqrt(l * l + s * s + f * f),
                            p = r * u + i * a + o * c,
                            g = h && -O(p) / h,
                            d = Math.atan2(h, p);
                        ba += g * l, wa += g * s, ka += g * f, da += d, xa += d * (r + (r = u)), _a += d * (i + (i = a)), Ma += d * (o + (o = c)), In(r, i, o)
                    }
                    var t, e, r, i, o;
                    Sa.point = function(u, a) {
                        t = u, e = a, Sa.point = n, u *= zu;
                        var c = Math.cos(a *= zu);
                        r = c * Math.cos(u), i = c * Math.sin(u), o = Math.sin(a), In(r, i, o)
                    }, Sa.lineEnd = function() {
                        n(t, e), Sa.lineEnd = Zn, Sa.point = Hn
                    }
                }

                function Bn() {
                    return !0
                }

                function Xn(n, t, e, r, i) {
                    var o = [],
                        u = [];
                    if (n.forEach(function(n) {
                            if (!((t = n.length - 1) <= 0)) {
                                var t, e = n[0],
                                    r = n[t];
                                if (Fn(e, r)) {
                                    i.lineStart();
                                    for (var a = 0; a < t; ++a) i.point((e = n[a])[0], e[1]);
                                    return void i.lineEnd()
                                }
                                var c = new Wn(e, n, null, !0),
                                    l = new Wn(e, null, c, !1);
                                c.o = l, o.push(c), u.push(l), c = new Wn(r, n, null, !1), l = new Wn(r, null, c, !0), c.o = l, o.push(c), u.push(l)
                            }
                        }), u.sort(t), $n(o), $n(u), o.length) {
                        for (var a = 0, c = e, l = u.length; a < l; ++a) u[a].e = c = !c;
                        for (var s, f, h = o[0];;) {
                            for (var p = h, g = !0; p.v;)
                                if ((p = p.n) === h) return;
                            s = p.z, i.lineStart();
                            do {
                                if (p.v = p.o.v = !0, p.e) {
                                    if (g)
                                        for (var a = 0, l = s.length; a < l; ++a) i.point((f = s[a])[0], f[1]);
                                    else r(p.x, p.n.x, 1, i);
                                    p = p.n
                                } else {
                                    if (g) {
                                        s = p.p.z;
                                        for (var a = s.length - 1; a >= 0; --a) i.point((f = s[a])[0], f[1])
                                    } else r(p.x, p.p.x, -1, i);
                                    p = p.p
                                }
                                p = p.o, s = p.z, g = !g
                            } while (!p.v);
                            i.lineEnd()
                        }
                    }
                }

                function $n(n) {
                    if (t = n.length) {
                        for (var t, e, r = 0, i = n[0]; ++r < t;) i.n = e = n[r], e.p = i, i = e;
                        i.n = e = n[0], e.p = i
                    }
                }

                function Wn(n, t, e, r) {
                    this.x = n, this.z = t, this.o = e, this.e = r, this.v = !1, this.n = this.p = null
                }

                function Gn(n, t, e, r) {
                    return function(i, o) {
                        function u(t, e) {
                            var r = i(t, e);
                            n(t = r[0], e = r[1]) && o.point(t, e)
                        }

                        function a(n, t) {
                            var e = i(n, t);
                            v.point(e[0], e[1])
                        }

                        function c() {
                            m.point = a, v.lineStart()
                        }

                        function l() {
                            m.point = u, v.lineEnd()
                        }

                        function s(n, t) {
                            d.push([n, t]);
                            var e = i(n, t);
                            _.point(e[0], e[1])
                        }

                        function f() {
                            _.lineStart(), d = []
                        }

                        function h() {
                            s(d[0][0], d[0][1]), _.lineEnd();
                            var n, t = _.clean(),
                                e = x.buffer(),
                                r = e.length;
                            if (d.pop(), g.push(d), d = null, r) {
                                if (1 & t) {
                                    n = e[0];
                                    var i, r = n.length - 1,
                                        u = -1;
                                    for (o.lineStart(); ++u < r;) o.point((i = n[u])[0], i[1]);
                                    return void o.lineEnd()
                                }
                                r > 1 && 2 & t && e.push(e.pop().concat(e.shift())), p.push(e.filter(Jn))
                            }
                        }
                        var p, g, d, v = t(o),
                            y = i.invert(r[0], r[1]),
                            m = {
                                point: u,
                                lineStart: c,
                                lineEnd: l,
                                polygonStart: function() {
                                    m.point = s, m.lineStart = f, m.lineEnd = h, p = [], g = [], o.polygonStart()
                                },
                                polygonEnd: function() {
                                    m.point = u, m.lineStart = c, m.lineEnd = l, p = Wo.merge(p);
                                    var n = nt(y, g);
                                    p.length ? Xn(p, Qn, n, e, o) : n && (o.lineStart(), e(null, null, 1, o), o.lineEnd()), o.polygonEnd(), p = g = null
                                },
                                sphere: function() {
                                    o.polygonStart(), o.lineStart(), e(null, null, 1, o), o.lineEnd(), o.polygonEnd()
                                }
                            },
                            x = Kn(),
                            _ = t(x);
                        return m
                    }
                }

                function Jn(n) {
                    return n.length > 1
                }

                function Kn() {
                    var n, t = [];
                    return {
                        lineStart: function() {
                            t.push(n = [])
                        },
                        point: function(t, e) {
                            n.push([t, e])
                        },
                        lineEnd: c,
                        buffer: function() {
                            var e = t;
                            return t = [], n = null, e
                        },
                        rejoin: function() {
                            t.length > 1 && t.push(t.pop().concat(t.shift()))
                        }
                    }
                }

                function Qn(n, t) {
                    return ((n = n.x)[0] < 0 ? n[1] - Nu - Au : Nu - n[1]) - ((t = t.x)[0] < 0 ? t[1] - Nu - Au : Nu - t[1])
                }

                function nt(n, t) {
                    var e = n[0],
                        r = n[1],
                        i = [Math.sin(e), -Math.cos(e), 0],
                        o = 0,
                        u = 0;
                    ha.reset();
                    for (var a = 0, c = t.length; a < c; ++a) {
                        var l = t[a],
                            s = l.length;
                        if (s)
                            for (var f = l[0], h = f[0], p = f[1] / 2 + Su / 4, g = Math.sin(p), d = Math.cos(p), v = 1;;) {
                                v === s && (v = 0), n = l[v];
                                var y = n[0],
                                    m = n[1] / 2 + Su / 4,
                                    x = Math.sin(m),
                                    _ = Math.cos(m),
                                    M = y - h,
                                    b = au(M) > Su,
                                    w = g * x;
                                if (ha.add(Math.atan2(w * Math.sin(M), d * _ + w * Math.cos(M))), o += b ? M + (M >= 0 ? Eu : -Eu) : M, b ^ h >= e ^ y >= e) {
                                    var k = jn(qn(f), qn(n));
                                    Un(k);
                                    var S = jn(i, k);
                                    Un(S);
                                    var E = (b ^ M >= 0 ? -1 : 1) * F(S[2]);
                                    (r > E || r === E && (k[0] || k[1])) && (u += b ^ M >= 0 ? 1 : -1)
                                }
                                if (!v++) break;
                                h = y, g = x, d = _, f = n
                            }
                    }
                    return (o < -Au || o < Au && ha < 0) ^ 1 & u
                }

                function tt(n) {
                    var t, e = NaN,
                        r = NaN,
                        i = NaN;
                    return {
                        lineStart: function() {
                            n.lineStart(), t = 1
                        },
                        point: function(o, u) {
                            var a = o > 0 ? Su : -Su,
                                c = au(o - e);
                            au(c - Su) < Au ? (n.point(e, r = (r + u) / 2 > 0 ? Nu : -Nu), n.point(i, r), n.lineEnd(), n.lineStart(), n.point(a, r), n.point(o, r), t = 0) : i !== a && c >= Su && (au(e - i) < Au && (e -= i * Au), au(o - a) < Au && (o -= a * Au), r = et(e, r, o, u), n.point(i, r), n.lineEnd(), n.lineStart(), n.point(a, r), t = 0), n.point(e = o, r = u), i = a
                        },
                        lineEnd: function() {
                            n.lineEnd(), e = r = NaN
                        },
                        clean: function() {
                            return 2 - t
                        }
                    }
                }

                function et(n, t, e, r) {
                    var i, o, u = Math.sin(n - e);
                    return au(u) > Au ? Math.atan((Math.sin(t) * (o = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (i = Math.cos(t)) * Math.sin(n)) / (i * o * u)) : (t + r) / 2
                }

                function rt(n, t, e, r) {
                    var i;
                    if (null == n) i = e * Nu, r.point(-Su, i), r.point(0, i), r.point(Su, i), r.point(Su, 0), r.point(Su, -i), r.point(0, -i), r.point(-Su, -i), r.point(-Su, 0), r.point(-Su, i);
                    else if (au(n[0] - t[0]) > Au) {
                        var o = n[0] < t[0] ? Su : -Su;
                        i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
                    } else r.point(t[0], t[1])
                }

                function it(n) {
                    function t(n, t) {
                        return Math.cos(n) * Math.cos(t) > o
                    }

                    function e(n) {
                        var e, o, c, l, s;
                        return {
                            lineStart: function() {
                                l = c = !1, s = 1
                            },
                            point: function(f, h) {
                                var p, g = [f, h],
                                    d = t(f, h),
                                    v = u ? d ? 0 : i(f, h) : d ? i(f + (f < 0 ? Su : -Su), h) : 0;
                                if (!e && (l = c = d) && n.lineStart(), d !== c && (p = r(e, g), (Fn(e, p) || Fn(g, p)) && (g[0] += Au, g[1] += Au, d = t(g[0], g[1]))), d !== c) s = 0, d ? (n.lineStart(), p = r(g, e), n.point(p[0], p[1])) : (p = r(e, g), n.point(p[0], p[1]), n.lineEnd()), e = p;
                                else if (a && e && u ^ d) {
                                    var y;
                                    v & o || !(y = r(g, e, !0)) || (s = 0, u ? (n.lineStart(), n.point(y[0][0], y[0][1]), n.point(y[1][0], y[1][1]), n.lineEnd()) : (n.point(y[1][0], y[1][1]), n.lineEnd(), n.lineStart(), n.point(y[0][0], y[0][1])))
                                }!d || e && Fn(e, g) || n.point(g[0], g[1]), e = g, c = d, o = v
                            },
                            lineEnd: function() {
                                c && n.lineEnd(), e = null
                            },
                            clean: function() {
                                return s | (l && c) << 1
                            }
                        }
                    }

                    function r(n, t, e) {
                        var r = qn(n),
                            i = qn(t),
                            u = [1, 0, 0],
                            a = jn(r, i),
                            c = Rn(a, a),
                            l = a[0],
                            s = c - l * l;
                        if (!s) return !e && n;
                        var f = o * c / s,
                            h = -o * l / s,
                            p = jn(u, a),
                            g = Pn(u, f),
                            d = Pn(a, h);
                        Dn(g, d);
                        var v = p,
                            y = Rn(g, v),
                            m = Rn(v, v),
                            x = y * y - m * (Rn(g, g) - 1);
                        if (!(x < 0)) {
                            var _ = Math.sqrt(x),
                                M = Pn(v, (-y - _) / m);
                            if (Dn(M, g), M = On(M), !e) return M;
                            var b, w = n[0],
                                k = t[0],
                                S = n[1],
                                E = t[1];
                            k < w && (b = w, w = k, k = b);
                            var N = k - w,
                                A = au(N - Su) < Au,
                                C = A || N < Au;
                            if (!A && E < S && (b = S, S = E, E = b), C ? A ? S + E > 0 ^ M[1] < (au(M[0] - w) < Au ? S : E) : S <= M[1] && M[1] <= E : N > Su ^ (w <= M[0] && M[0] <= k)) {
                                var z = Pn(v, (-y + _) / m);
                                return Dn(z, g), [M, On(z)]
                            }
                        }
                    }

                    function i(t, e) {
                        var r = u ? n : Su - n,
                            i = 0;
                        return t < -r ? i |= 1 : t > r && (i |= 2), e < -r ? i |= 4 : e > r && (i |= 8), i
                    }
                    var o = Math.cos(n),
                        u = o > 0,
                        a = au(o) > Au,
                        c = Lt(n, 6 * zu);
                    return Gn(t, e, c, u ? [0, -n] : [-Su, n - Su])
                }

                function ot(n, t, e, r) {
                    return function(i) {
                        var o, u = i.a,
                            a = i.b,
                            c = u.x,
                            l = u.y,
                            s = a.x,
                            f = a.y,
                            h = 0,
                            p = 1,
                            g = s - c,
                            d = f - l;
                        if (o = n - c, g || !(o > 0)) {
                            if (o /= g, g < 0) {
                                if (o < h) return;
                                o < p && (p = o)
                            } else if (g > 0) {
                                if (o > p) return;
                                o > h && (h = o)
                            }
                            if (o = e - c, g || !(o < 0)) {
                                if (o /= g, g < 0) {
                                    if (o > p) return;
                                    o > h && (h = o)
                                } else if (g > 0) {
                                    if (o < h) return;
                                    o < p && (p = o)
                                }
                                if (o = t - l, d || !(o > 0)) {
                                    if (o /= d, d < 0) {
                                        if (o < h) return;
                                        o < p && (p = o)
                                    } else if (d > 0) {
                                        if (o > p) return;
                                        o > h && (h = o)
                                    }
                                    if (o = r - l, d || !(o < 0)) {
                                        if (o /= d, d < 0) {
                                            if (o > p) return;
                                            o > h && (h = o)
                                        } else if (d > 0) {
                                            if (o < h) return;
                                            o < p && (p = o)
                                        }
                                        return h > 0 && (i.a = {
                                            x: c + h * g,
                                            y: l + h * d
                                        }), p < 1 && (i.b = {
                                            x: c + p * g,
                                            y: l + p * d
                                        }), i
                                    }
                                }
                            }
                        }
                    }
                }

                function ut(n, t, e, r) {
                    function i(r, i) {
                        return au(r[0] - n) < Au ? i > 0 ? 0 : 3 : au(r[0] - e) < Au ? i > 0 ? 2 : 1 : au(r[1] - t) < Au ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
                    }

                    function o(n, t) {
                        return u(n.x, t.x)
                    }

                    function u(n, t) {
                        var e = i(n, 1),
                            r = i(t, 1);
                        return e !== r ? e - r : 0 === e ? t[1] - n[1] : 1 === e ? n[0] - t[0] : 2 === e ? n[1] - t[1] : t[0] - n[0]
                    }
                    return function(a) {
                        function c(n) {
                            for (var t = 0, e = y.length, r = n[1], i = 0; i < e; ++i)
                                for (var o, u = 1, a = y[i], c = a.length, s = a[0]; u < c; ++u) o = a[u], s[1] <= r ? o[1] > r && l(s, o, n) > 0 && ++t : o[1] <= r && l(s, o, n) < 0 && --t, s = o;
                            return 0 !== t
                        }

                        function l(n, t, e) {
                            return (t[0] - n[0]) * (e[1] - n[1]) - (e[0] - n[0]) * (t[1] - n[1])
                        }

                        function s(o, a, c, l) {
                            var s = 0,
                                f = 0;
                            if (null == o || (s = i(o, c)) !== (f = i(a, c)) || u(o, a) < 0 ^ c > 0) {
                                do l.point(0 === s || 3 === s ? n : e, s > 1 ? r : t); while ((s = (s + c + 4) % 4) !== f)
                            } else l.point(a[0], a[1])
                        }

                        function f(i, o) {
                            return n <= i && i <= e && t <= o && o <= r
                        }

                        function h(n, t) {
                            f(n, t) && a.point(n, t)
                        }

                        function p() {
                            z.point = d, y && y.push(m = []), S = !0, k = !1, b = w = NaN
                        }

                        function g() {
                            v && (d(x, _), M && k && A.rejoin(), v.push(A.buffer())), z.point = h, k && a.lineEnd()
                        }

                        function d(n, t) {
                            n = Math.max(-Na, Math.min(Na, n)), t = Math.max(-Na, Math.min(Na, t));
                            var e = f(n, t);
                            if (y && m.push([n, t]), S) x = n, _ = t, M = e, S = !1, e && (a.lineStart(), a.point(n, t));
                            else if (e && k) a.point(n, t);
                            else {
                                var r = {
                                    a: {
                                        x: b,
                                        y: w
                                    },
                                    b: {
                                        x: n,
                                        y: t
                                    }
                                };
                                C(r) ? (k || (a.lineStart(), a.point(r.a.x, r.a.y)), a.point(r.b.x, r.b.y), e || a.lineEnd(), E = !1) : e && (a.lineStart(), a.point(n, t), E = !1)
                            }
                            b = n, w = t, k = e
                        }
                        var v, y, m, x, _, M, b, w, k, S, E, N = a,
                            A = Kn(),
                            C = ot(n, t, e, r),
                            z = {
                                point: h,
                                lineStart: p,
                                lineEnd: g,
                                polygonStart: function() {
                                    a = A, v = [], y = [], E = !0
                                },
                                polygonEnd: function() {
                                    a = N, v = Wo.merge(v);
                                    var t = c([n, r]),
                                        e = E && t,
                                        i = v.length;
                                    (e || i) && (a.polygonStart(), e && (a.lineStart(), s(null, null, 1, a), a.lineEnd()), i && Xn(v, o, t, s, a), a.polygonEnd()), v = y = m = null
                                }
                            };
                        return z
                    }
                }

                function at(n, t) {
                    function e(e, r) {
                        return e = n(e, r), t(e[0], e[1])
                    }
                    return n.invert && t.invert && (e.invert = function(e, r) {
                        return e = t.invert(e, r), e && n.invert(e[0], e[1])
                    }), e
                }

                function ct(n) {
                    var t = 0,
                        e = Su / 3,
                        r = kt(n),
                        i = r(t, e);
                    return i.parallels = function(n) {
                        return arguments.length ? r(t = n[0] * Su / 180, e = n[1] * Su / 180) : [t / Su * 180, e / Su * 180]
                    }, i
                }

                function lt(n, t) {
                    function e(n, t) {
                        var e = Math.sqrt(o - 2 * i * Math.sin(t)) / i;
                        return [e * Math.sin(n *= i), u - e * Math.cos(n)]
                    }
                    var r = Math.sin(n),
                        i = (r + Math.sin(t)) / 2,
                        o = 1 + r * (2 * i - r),
                        u = Math.sqrt(o) / i;
                    return e.invert = function(n, t) {
                        var e = u - t;
                        return [Math.atan2(n, e) / i, F((o - (n * n + e * e) * i * i) / (2 * i))]
                    }, e
                }

                function st() {
                    function n(n, t) {
                        Ca += i * n - r * t, r = n, i = t
                    }
                    var t, e, r, i;
                    Ra.point = function(o, u) {
                        Ra.point = n, t = r = o, e = i = u
                    }, Ra.lineEnd = function() {
                        n(t, e)
                    }
                }

                function ft(n, t) {
                    n < za && (za = n), n > La && (La = n), t < Ta && (Ta = t), t > qa && (qa = t)
                }

                function ht() {
                    function n(n, t) {
                        u.push("M", n, ",", t, o)
                    }

                    function t(n, t) {
                        u.push("M", n, ",", t), a.point = e
                    }

                    function e(n, t) {
                        u.push("L", n, ",", t)
                    }

                    function r() {
                        a.point = n
                    }

                    function i() {
                        u.push("Z")
                    }
                    var o = pt(4.5),
                        u = [],
                        a = {
                            point: n,
                            lineStart: function() {
                                a.point = t
                            },
                            lineEnd: r,
                            polygonStart: function() {
                                a.lineEnd = i
                            },
                            polygonEnd: function() {
                                a.lineEnd = r, a.point = n
                            },
                            pointRadius: function(n) {
                                return o = pt(n), a
                            },
                            result: function() {
                                if (u.length) {
                                    var n = u.join("");
                                    return u = [], n
                                }
                            }
                        };
                    return a
                }

                function pt(n) {
                    return "m0," + n + "a" + n + "," + n + " 0 1,1 0," + -2 * n + "a" + n + "," + n + " 0 1,1 0," + 2 * n + "z"
                }

                function gt(n, t) {
                    va += n, ya += t, ++ma
                }

                function dt() {
                    function n(n, r) {
                        var i = n - t,
                            o = r - e,
                            u = Math.sqrt(i * i + o * o);
                        xa += u * (t + n) / 2, _a += u * (e + r) / 2, Ma += u, gt(t = n, e = r)
                    }
                    var t, e;
                    Da.point = function(r, i) {
                        Da.point = n, gt(t = r, e = i)
                    }
                }

                function vt() {
                    Da.point = gt
                }

                function yt() {
                    function n(n, t) {
                        var e = n - r,
                            o = t - i,
                            u = Math.sqrt(e * e + o * o);
                        xa += u * (r + n) / 2, _a += u * (i + t) / 2, Ma += u, u = i * n - r * t, ba += u * (r + n), wa += u * (i + t), ka += 3 * u, gt(r = n, i = t)
                    }
                    var t, e, r, i;
                    Da.point = function(o, u) {
                        Da.point = n, gt(t = r = o, e = i = u)
                    }, Da.lineEnd = function() {
                        n(t, e)
                    }
                }

                function mt(n) {
                    function t(t, e) {
                        n.moveTo(t, e), n.arc(t, e, u, 0, Eu)
                    }

                    function e(t, e) {
                        n.moveTo(t, e), a.point = r
                    }

                    function r(t, e) {
                        n.lineTo(t, e)
                    }

                    function i() {
                        a.point = t
                    }

                    function o() {
                        n.closePath()
                    }
                    var u = 4.5,
                        a = {
                            point: t,
                            lineStart: function() {
                                a.point = e
                            },
                            lineEnd: i,
                            polygonStart: function() {
                                a.lineEnd = o
                            },
                            polygonEnd: function() {
                                a.lineEnd = i, a.point = t
                            },
                            pointRadius: function(n) {
                                return u = n, a
                            },
                            result: c
                        };
                    return a
                }

                function xt(n) {
                    function t(n) {
                        return (a ? r : e)(n)
                    }

                    function e(t) {
                        return bt(t, function(e, r) {
                            e = n(e, r), t.point(e[0], e[1])
                        })
                    }

                    function r(t) {
                        function e(e, r) {
                            e = n(e, r), t.point(e[0], e[1])
                        }

                        function r() {
                            x = NaN, k.point = o, t.lineStart()
                        }

                        function o(e, r) {
                            var o = qn([e, r]),
                                u = n(e, r);
                            i(x, _, m, M, b, w, x = u[0], _ = u[1], m = e, M = o[0], b = o[1], w = o[2], a, t), t.point(x, _)
                        }

                        function u() {
                            k.point = e, t.lineEnd()
                        }

                        function c() {
                            r(), k.point = l, k.lineEnd = s
                        }

                        function l(n, t) {
                            o(f = n, h = t), p = x, g = _, d = M, v = b, y = w, k.point = o
                        }

                        function s() {
                            i(x, _, m, M, b, w, p, g, f, d, v, y, a, t), k.lineEnd = u, u()
                        }
                        var f, h, p, g, d, v, y, m, x, _, M, b, w, k = {
                            point: e,
                            lineStart: r,
                            lineEnd: u,
                            polygonStart: function() {
                                t.polygonStart(), k.lineStart = c
                            },
                            polygonEnd: function() {
                                t.polygonEnd(), k.lineStart = r
                            }
                        };
                        return k
                    }

                    function i(t, e, r, a, c, l, s, f, h, p, g, d, v, y) {
                        var m = s - t,
                            x = f - e,
                            _ = m * m + x * x;
                        if (_ > 4 * o && v--) {
                            var M = a + p,
                                b = c + g,
                                w = l + d,
                                k = Math.sqrt(M * M + b * b + w * w),
                                S = Math.asin(w /= k),
                                E = au(au(w) - 1) < Au || au(r - h) < Au ? (r + h) / 2 : Math.atan2(b, M),
                                N = n(E, S),
                                A = N[0],
                                C = N[1],
                                z = A - t,
                                T = C - e,
                                L = x * z - m * T;
                            (L * L / _ > o || au((m * z + x * T) / _ - .5) > .3 || a * p + c * g + l * d < u) && (i(t, e, r, a, c, l, A, C, E, M /= k, b /= k, w, v, y), y.point(A, C), i(A, C, E, M, b, w, s, f, h, p, g, d, v, y))
                        }
                    }
                    var o = .5,
                        u = Math.cos(30 * zu),
                        a = 16;
                    return t.precision = function(n) {
                        return arguments.length ? (a = (o = n * n) > 0 && 16, t) : Math.sqrt(o)
                    }, t
                }

                function _t(n) {
                    var t = xt(function(t, e) {
                        return n([t * Tu, e * Tu])
                    });
                    return function(n) {
                        return St(t(n))
                    }
                }

                function Mt(n) {
                    this.stream = n
                }

                function bt(n, t) {
                    return {
                        point: t,
                        sphere: function() {
                            n.sphere()
                        },
                        lineStart: function() {
                            n.lineStart()
                        },
                        lineEnd: function() {
                            n.lineEnd()
                        },
                        polygonStart: function() {
                            n.polygonStart()
                        },
                        polygonEnd: function() {
                            n.polygonEnd()
                        }
                    }
                }

                function wt(n) {
                    return kt(function() {
                        return n
                    })()
                }

                function kt(n) {
                    function t(n) {
                        return n = a(n[0] * zu, n[1] * zu), [n[0] * h + c, l - n[1] * h]
                    }

                    function e(n) {
                        return n = a.invert((n[0] - c) / h, (l - n[1]) / h), n && [n[0] * Tu, n[1] * Tu]
                    }

                    function r() {
                        a = at(u = At(y, m, x), o);
                        var n = o(d, v);
                        return c = p - n[0] * h, l = g + n[1] * h, i()
                    }

                    function i() {
                        return s && (s.valid = !1, s = null), t
                    }
                    var o, u, a, c, l, s, f = xt(function(n, t) {
                            return n = o(n, t), [n[0] * h + c, l - n[1] * h]
                        }),
                        h = 150,
                        p = 480,
                        g = 250,
                        d = 0,
                        v = 0,
                        y = 0,
                        m = 0,
                        x = 0,
                        _ = Ea,
                        M = yn,
                        b = null,
                        w = null;
                    return t.stream = function(n) {
                            return s && (s.valid = !1), s = St(_(u, f(M(n)))), s.valid = !0, s
                        }, t.clipAngle = function(n) {
                            return arguments.length ? (_ = null == n ? (b = n, Ea) : it((b = +n) * zu), i()) : b
                        }, t.clipExtent = function(n) {
                            return arguments.length ? (w = n, M = n ? ut(n[0][0], n[0][1], n[1][0], n[1][1]) : yn, i()) : w
                        }, t.scale = function(n) {
                            return arguments.length ? (h = +n, r()) : h
                        }, t.translate = function(n) {
                            return arguments.length ? (p = +n[0], g = +n[1], r()) : [p, g]
                        }, t.center = function(n) {
                            return arguments.length ? (d = n[0] % 360 * zu, v = n[1] % 360 * zu, r()) : [d * Tu, v * Tu]
                        }, t.rotate = function(n) {
                            return arguments.length ? (y = n[0] % 360 * zu, m = n[1] % 360 * zu, x = n.length > 2 ? n[2] % 360 * zu : 0, r()) : [y * Tu, m * Tu, x * Tu]
                        }, Wo.rebind(t, f, "precision"),
                        function() {
                            return o = n.apply(this, arguments), t.invert = o.invert && e, r()
                        }
                }

                function St(n) {
                    return bt(n, function(t, e) {
                        n.point(t * zu, e * zu)
                    })
                }

                function Et(n, t) {
                    return [n, t]
                }

                function Nt(n, t) {
                    return [n > Su ? n - Eu : n < -Su ? n + Eu : n, t]
                }

                function At(n, t, e) {
                    return n ? t || e ? at(zt(n), Tt(t, e)) : zt(n) : t || e ? Tt(t, e) : Nt
                }

                function Ct(n) {
                    return function(t, e) {
                        return t += n, [t > Su ? t - Eu : t < -Su ? t + Eu : t, e]
                    }
                }

                function zt(n) {
                    var t = Ct(n);
                    return t.invert = Ct(-n), t
                }

                function Tt(n, t) {
                    function e(n, t) {
                        var e = Math.cos(t),
                            a = Math.cos(n) * e,
                            c = Math.sin(n) * e,
                            l = Math.sin(t),
                            s = l * r + a * i;
                        return [Math.atan2(c * o - s * u, a * r - l * i), F(s * o + c * u)]
                    }
                    var r = Math.cos(n),
                        i = Math.sin(n),
                        o = Math.cos(t),
                        u = Math.sin(t);
                    return e.invert = function(n, t) {
                        var e = Math.cos(t),
                            a = Math.cos(n) * e,
                            c = Math.sin(n) * e,
                            l = Math.sin(t),
                            s = l * o - c * u;
                        return [Math.atan2(c * o + l * u, a * r + s * i), F(s * r - a * i)]
                    }, e
                }

                function Lt(n, t) {
                    var e = Math.cos(n),
                        r = Math.sin(n);
                    return function(i, o, u, a) {
                        var c = u * t;
                        null != i ? (i = qt(e, i), o = qt(e, o), (u > 0 ? i < o : i > o) && (i += u * Eu)) : (i = n + u * Eu, o = n - .5 * c);
                        for (var l, s = i; u > 0 ? s > o : s < o; s -= c) a.point((l = On([e, -r * Math.cos(s), -r * Math.sin(s)]))[0], l[1])
                    }
                }

                function qt(n, t) {
                    var e = qn(t);
                    e[0] -= n, Un(e);
                    var r = O(-e[1]);
                    return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - Au) % (2 * Math.PI)
                }

                function Rt(n, t, e) {
                    var r = Wo.range(n, t - Au, e).concat(t);
                    return function(n) {
                        return r.map(function(t) {
                            return [n, t]
                        })
                    }
                }

                function jt(n, t, e) {
                    var r = Wo.range(n, t - Au, e).concat(t);
                    return function(n) {
                        return r.map(function(t) {
                            return [t, n]
                        })
                    }
                }

                function Dt(n) {
                    return n.source
                }

                function Pt(n) {
                    return n.target
                }

                function Ut(n, t, e, r) {
                    var i = Math.cos(t),
                        o = Math.sin(t),
                        u = Math.cos(r),
                        a = Math.sin(r),
                        c = i * Math.cos(n),
                        l = i * Math.sin(n),
                        s = u * Math.cos(e),
                        f = u * Math.sin(e),
                        h = 2 * Math.asin(Math.sqrt(Z(r - t) + i * u * Z(e - n))),
                        p = 1 / Math.sin(h),
                        g = h ? function(n) {
                            var t = Math.sin(n *= h) * p,
                                e = Math.sin(h - n) * p,
                                r = e * c + t * s,
                                i = e * l + t * f,
                                u = e * o + t * a;
                            return [Math.atan2(i, r) * Tu, Math.atan2(u, Math.sqrt(r * r + i * i)) * Tu]
                        } : function() {
                            return [n * Tu, t * Tu]
                        };
                    return g.distance = h, g
                }

                function Ot() {
                    function n(n, i) {
                        var o = Math.sin(i *= zu),
                            u = Math.cos(i),
                            a = au((n *= zu) - t),
                            c = Math.cos(a);
                        Pa += Math.atan2(Math.sqrt((a = u * Math.sin(a)) * a + (a = r * o - e * u * c) * a), e * o + r * u * c), t = n, e = o, r = u
                    }
                    var t, e, r;
                    Ua.point = function(i, o) {
                        t = i * zu, e = Math.sin(o *= zu), r = Math.cos(o), Ua.point = n
                    }, Ua.lineEnd = function() {
                        Ua.point = Ua.lineEnd = c
                    }
                }

                function Ft(n, t) {
                    function e(t, e) {
                        var r = Math.cos(t),
                            i = Math.cos(e),
                            o = n(r * i);
                        return [o * i * Math.sin(t), o * Math.sin(e)]
                    }
                    return e.invert = function(n, e) {
                        var r = Math.sqrt(n * n + e * e),
                            i = t(r),
                            o = Math.sin(i),
                            u = Math.cos(i);
                        return [Math.atan2(n * o, r * u), Math.asin(r && e * o / r)]
                    }, e
                }

                function Ht(n, t) {
                    function e(n, t) {
                        var e = au(au(t) - Nu) < Au ? 0 : u / Math.pow(i(t), o);
                        return [e * Math.sin(o * n), u - e * Math.cos(o * n)]
                    }
                    var r = Math.cos(n),
                        i = function(n) {
                            return Math.tan(Su / 4 + n / 2)
                        },
                        o = n === t ? Math.sin(n) : Math.log(r / Math.cos(t)) / Math.log(i(t) / i(n)),
                        u = r * Math.pow(i(n), o) / o;
                    return o ? (e.invert = function(n, t) {
                        var e = u - t,
                            r = U(o) * Math.sqrt(n * n + e * e);
                        return [Math.atan2(n, e) / o, 2 * Math.atan(Math.pow(u / r, 1 / o)) - Nu]
                    }, e) : Yt
                }

                function It(n, t) {
                    function e(n, t) {
                        var e = o - t;
                        return [e * Math.sin(i * n), o - e * Math.cos(i * n)]
                    }
                    var r = Math.cos(n),
                        i = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n),
                        o = r / i + n;
                    return au(i) < Au ? Et : (e.invert = function(n, t) {
                        var e = o - t;
                        return [Math.atan2(n, e) / i, o - U(i) * Math.sqrt(n * n + e * e)]
                    }, e)
                }

                function Yt(n, t) {
                    return [n, Math.log(Math.tan(Su / 4 + t / 2))]
                }

                function Zt(n) {
                    var t, e = wt(n),
                        r = e.scale,
                        i = e.translate,
                        o = e.clipExtent;
                    return e.scale = function() {
                        var n = r.apply(e, arguments);
                        return n === e ? t ? e.clipExtent(null) : e : n
                    }, e.translate = function() {
                        var n = i.apply(e, arguments);
                        return n === e ? t ? e.clipExtent(null) : e : n
                    }, e.clipExtent = function(n) {
                        var u = o.apply(e, arguments);
                        if (u === e) {
                            if (t = null == n) {
                                var a = Su * r(),
                                    c = i();
                                o([
                                    [c[0] - a, c[1] - a],
                                    [c[0] + a, c[1] + a]
                                ])
                            }
                        } else t && (u = null);
                        return u
                    }, e.clipExtent(null)
                }

                function Vt(n, t) {
                    return [Math.log(Math.tan(Su / 4 + t / 2)), -n]
                }

                function Bt(n) {
                    return n[0]
                }

                function Xt(n) {
                    return n[1]
                }

                function $t(n, t, e, r) {
                    var i, o, u, a, c, l, s;
                    return i = r[n], o = i[0], u = i[1], i = r[t], a = i[0], c = i[1], i = r[e], l = i[0], s = i[1], (s - u) * (a - o) - (c - u) * (l - o) > 0
                }

                function Wt(n, t, e) {
                    return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0])
                }

                function Gt(n, t, e, r) {
                    var i = n[0],
                        o = e[0],
                        u = t[0] - i,
                        a = r[0] - o,
                        c = n[1],
                        l = e[1],
                        s = t[1] - c,
                        f = r[1] - l,
                        h = (a * (c - l) - f * (i - o)) / (f * u - a * s);
                    return [i + h * u, c + h * s]
                }

                function Jt(n) {
                    var t = n[0],
                        e = n[n.length - 1];
                    return !(t[0] - e[0] || t[1] - e[1])
                }

                function Kt() {
                    xe(this), this.edge = this.site = this.circle = null
                }

                function Qt(n) {
                    var t = Ga.pop() || new Kt;
                    return t.site = n, t
                }

                function ne(n) {
                    se(n), Xa.remove(n), Ga.push(n), xe(n)
                }

                function te(n) {
                    var t = n.circle,
                        e = t.x,
                        r = t.cy,
                        i = {
                            x: e,
                            y: r
                        },
                        o = n.P,
                        u = n.N,
                        a = [n];
                    ne(n);
                    for (var c = o; c.circle && au(e - c.circle.x) < Au && au(r - c.circle.cy) < Au;) o = c.P, a.unshift(c), ne(c), c = o;
                    a.unshift(c), se(c);
                    for (var l = u; l.circle && au(e - l.circle.x) < Au && au(r - l.circle.cy) < Au;) u = l.N, a.push(l), ne(l), l = u;
                    a.push(l), se(l);
                    var s, f = a.length;
                    for (s = 1; s < f; ++s) l = a[s], c = a[s - 1], ve(l.edge, c.site, l.site, i);
                    c = a[0], l = a[f - 1], l.edge = ge(c.site, l.site, null, i), le(c), le(l)
                }

                function ee(n) {
                    for (var t, e, r, i, o = n.x, u = n.y, a = Xa._; a;)
                        if (r = re(a, u) - o, r > Au) a = a.L;
                        else {
                            if (i = o - ie(a, u), !(i > Au)) {
                                r > -Au ? (t = a.P, e = a) : i > -Au ? (t = a, e = a.N) : t = e = a;
                                break
                            }
                            if (!a.R) {
                                t = a;
                                break
                            }
                            a = a.R
                        }
                    var c = Qt(n);
                    if (Xa.insert(t, c), t || e) {
                        if (t === e) return se(t), e = Qt(t.site), Xa.insert(c, e), c.edge = e.edge = ge(t.site, c.site), le(t), void le(e);
                        if (!e) return void(c.edge = ge(t.site, c.site));
                        se(t), se(e);
                        var l = t.site,
                            s = l.x,
                            f = l.y,
                            h = n.x - s,
                            p = n.y - f,
                            g = e.site,
                            d = g.x - s,
                            v = g.y - f,
                            y = 2 * (h * v - p * d),
                            m = h * h + p * p,
                            x = d * d + v * v,
                            _ = {
                                x: (v * m - p * x) / y + s,
                                y: (h * x - d * m) / y + f
                            };
                        ve(e.edge, l, g, _), c.edge = ge(l, n, null, _), e.edge = ge(n, g, null, _), le(t), le(e)
                    }
                }

                function re(n, t) {
                    var e = n.site,
                        r = e.x,
                        i = e.y,
                        o = i - t;
                    if (!o) return r;
                    var u = n.P;
                    if (!u) return -(1 / 0);
                    e = u.site;
                    var a = e.x,
                        c = e.y,
                        l = c - t;
                    if (!l) return a;
                    var s = a - r,
                        f = 1 / o - 1 / l,
                        h = s / l;
                    return f ? (-h + Math.sqrt(h * h - 2 * f * (s * s / (-2 * l) - c + l / 2 + i - o / 2))) / f + r : (r + a) / 2
                }

                function ie(n, t) {
                    var e = n.N;
                    if (e) return re(e, t);
                    var r = n.site;
                    return r.y === t ? r.x : 1 / 0
                }

                function oe(n) {
                    this.site = n, this.edges = []
                }

                function ue(n) {
                    for (var t, e, r, i, o, u, a, c, l, s, f = n[0][0], h = n[1][0], p = n[0][1], g = n[1][1], d = Ba, v = d.length; v--;)
                        if (o = d[v], o && o.prepare())
                            for (a = o.edges, c = a.length, u = 0; u < c;) s = a[u].end(), r = s.x, i = s.y, l = a[++u % c].start(), t = l.x, e = l.y, (au(r - t) > Au || au(i - e) > Au) && (a.splice(u, 0, new ye(de(o.site, s, au(r - f) < Au && g - i > Au ? {
                                x: f,
                                y: au(t - f) < Au ? e : g
                            } : au(i - g) < Au && h - r > Au ? {
                                x: au(e - g) < Au ? t : h,
                                y: g
                            } : au(r - h) < Au && i - p > Au ? {
                                x: h,
                                y: au(t - h) < Au ? e : p
                            } : au(i - p) < Au && r - f > Au ? {
                                x: au(e - p) < Au ? t : f,
                                y: p
                            } : null), o.site, null)), ++c)
                }

                function ae(n, t) {
                    return t.angle - n.angle
                }

                function ce() {
                    xe(this), this.x = this.y = this.arc = this.site = this.cy = null
                }

                function le(n) {
                    var t = n.P,
                        e = n.N;
                    if (t && e) {
                        var r = t.site,
                            i = n.site,
                            o = e.site;
                        if (r !== o) {
                            var u = i.x,
                                a = i.y,
                                c = r.x - u,
                                l = r.y - a,
                                s = o.x - u,
                                f = o.y - a,
                                h = 2 * (c * f - l * s);
                            if (!(h >= -Cu)) {
                                var p = c * c + l * l,
                                    g = s * s + f * f,
                                    d = (f * p - l * g) / h,
                                    v = (c * g - s * p) / h,
                                    f = v + a,
                                    y = Ja.pop() || new ce;
                                y.arc = n, y.site = i, y.x = d + u, y.y = f + Math.sqrt(d * d + v * v), y.cy = f, n.circle = y;
                                for (var m = null, x = Wa._; x;)
                                    if (y.y < x.y || y.y === x.y && y.x <= x.x) {
                                        if (!x.L) {
                                            m = x.P;
                                            break
                                        }
                                        x = x.L
                                    } else {
                                        if (!x.R) {
                                            m = x;
                                            break
                                        }
                                        x = x.R
                                    }
                                Wa.insert(m, y), m || ($a = y)
                            }
                        }
                    }
                }

                function se(n) {
                    var t = n.circle;
                    t && (t.P || ($a = t.N), Wa.remove(t), Ja.push(t), xe(t), n.circle = null)
                }

                function fe(n) {
                    for (var t, e = Va, r = ot(n[0][0], n[0][1], n[1][0], n[1][1]), i = e.length; i--;) t = e[i], (!he(t, n) || !r(t) || au(t.a.x - t.b.x) < Au && au(t.a.y - t.b.y) < Au) && (t.a = t.b = null, e.splice(i, 1))
                }

                function he(n, t) {
                    var e = n.b;
                    if (e) return !0;
                    var r, i, o = n.a,
                        u = t[0][0],
                        a = t[1][0],
                        c = t[0][1],
                        l = t[1][1],
                        s = n.l,
                        f = n.r,
                        h = s.x,
                        p = s.y,
                        g = f.x,
                        d = f.y,
                        v = (h + g) / 2,
                        y = (p + d) / 2;
                    if (d === p) {
                        if (v < u || v >= a) return;
                        if (h > g) {
                            if (o) {
                                if (o.y >= l) return
                            } else o = {
                                x: v,
                                y: c
                            };
                            e = {
                                x: v,
                                y: l
                            }
                        } else {
                            if (o) {
                                if (o.y < c) return
                            } else o = {
                                x: v,
                                y: l
                            };
                            e = {
                                x: v,
                                y: c
                            }
                        }
                    } else if (r = (h - g) / (d - p), i = y - r * v, r < -1 || r > 1)
                        if (h > g) {
                            if (o) {
                                if (o.y >= l) return
                            } else o = {
                                x: (c - i) / r,
                                y: c
                            };
                            e = {
                                x: (l - i) / r,
                                y: l
                            }
                        } else {
                            if (o) {
                                if (o.y < c) return
                            } else o = {
                                x: (l - i) / r,
                                y: l
                            };
                            e = {
                                x: (c - i) / r,
                                y: c
                            }
                        }
                    else if (p < d) {
                        if (o) {
                            if (o.x >= a) return
                        } else o = {
                            x: u,
                            y: r * u + i
                        };
                        e = {
                            x: a,
                            y: r * a + i
                        }
                    } else {
                        if (o) {
                            if (o.x < u) return
                        } else o = {
                            x: a,
                            y: r * a + i
                        };
                        e = {
                            x: u,
                            y: r * u + i
                        }
                    }
                    return n.a = o, n.b = e, !0
                }

                function pe(n, t) {
                    this.l = n, this.r = t, this.a = this.b = null
                }

                function ge(n, t, e, r) {
                    var i = new pe(n, t);
                    return Va.push(i), e && ve(i, n, t, e), r && ve(i, t, n, r), Ba[n.i].edges.push(new ye(i, n, t)), Ba[t.i].edges.push(new ye(i, t, n)), i
                }

                function de(n, t, e) {
                    var r = new pe(n, null);
                    return r.a = t, r.b = e, Va.push(r), r
                }

                function ve(n, t, e, r) {
                    n.a || n.b ? n.l === e ? n.b = r : n.a = r : (n.a = r, n.l = t, n.r = e)
                }

                function ye(n, t, e) {
                    var r = n.a,
                        i = n.b;
                    this.edge = n, this.site = t, this.angle = e ? Math.atan2(e.y - t.y, e.x - t.x) : n.l === t ? Math.atan2(i.x - r.x, r.y - i.y) : Math.atan2(r.x - i.x, i.y - r.y)
                }

                function me() {
                    this._ = null
                }

                function xe(n) {
                    n.U = n.C = n.L = n.R = n.P = n.N = null
                }

                function _e(n, t) {
                    var e = t,
                        r = t.R,
                        i = e.U;
                    i ? i.L === e ? i.L = r : i.R = r : n._ = r, r.U = i, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e
                }

                function Me(n, t) {
                    var e = t,
                        r = t.L,
                        i = e.U;
                    i ? i.L === e ? i.L = r : i.R = r : n._ = r, r.U = i, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e
                }

                function be(n) {
                    for (; n.L;) n = n.L;
                    return n
                }

                function we(n, t) {
                    var e, r, i, o = n.sort(ke).pop();
                    for (Va = [], Ba = new Array(n.length), Xa = new me, Wa = new me;;)
                        if (i = $a, o && (!i || o.y < i.y || o.y === i.y && o.x < i.x)) o.x === e && o.y === r || (Ba[o.i] = new oe(o), ee(o), e = o.x, r = o.y), o = n.pop();
                        else {
                            if (!i) break;
                            te(i.arc)
                        }
                    t && (fe(t), ue(t));
                    var u = {
                        cells: Ba,
                        edges: Va
                    };
                    return Xa = Wa = Va = Ba = null, u
                }

                function ke(n, t) {
                    return t.y - n.y || t.x - n.x
                }

                function Se(n, t, e) {
                    return (n.x - e.x) * (t.y - n.y) - (n.x - t.x) * (e.y - n.y)
                }

                function Ee(n) {
                    return n.x
                }

                function Ne(n) {
                    return n.y
                }

                function Ae() {
                    return {
                        leaf: !0,
                        nodes: [],
                        point: null,
                        x: null,
                        y: null
                    }
                }

                function Ce(n, t, e, r, i, o) {
                    if (!n(t, e, r, i, o)) {
                        var u = .5 * (e + i),
                            a = .5 * (r + o),
                            c = t.nodes;
                        c[0] && Ce(n, c[0], e, r, u, a), c[1] && Ce(n, c[1], u, r, i, a), c[2] && Ce(n, c[2], e, a, u, o), c[3] && Ce(n, c[3], u, a, i, o)
                    }
                }

                function ze(n, t) {
                    n = Wo.rgb(n), t = Wo.rgb(t);
                    var e = n.r,
                        r = n.g,
                        i = n.b,
                        o = t.r - e,
                        u = t.g - r,
                        a = t.b - i;
                    return function(n) {
                        return "#" + sn(Math.round(e + o * n)) + sn(Math.round(r + u * n)) + sn(Math.round(i + a * n))
                    }
                }

                function Te(n, t) {
                    var e, r = {},
                        i = {};
                    for (e in n) e in t ? r[e] = Re(n[e], t[e]) : i[e] = n[e];
                    for (e in t) e in n || (i[e] = t[e]);
                    return function(n) {
                        for (e in r) i[e] = r[e](n);
                        return i
                    }
                }

                function Le(n, t) {
                    return t -= n = +n,
                        function(e) {
                            return n + t * e
                        }
                }

                function qe(n, t) {
                    var e, r, i, o, u, a = 0,
                        c = 0,
                        l = [],
                        s = [];
                    for (n += "", t += "", Qa.lastIndex = 0, r = 0; e = Qa.exec(t); ++r) e.index && l.push(t.substring(a, c = e.index)), s.push({
                        i: l.length,
                        x: e[0]
                    }), l.push(null), a = Qa.lastIndex;
                    for (a < t.length && l.push(t.substring(a)), r = 0, o = s.length;
                        (e = Qa.exec(n)) && r < o; ++r)
                        if (u = s[r], u.x == e[0]) {
                            if (u.i)
                                if (null == l[u.i + 1])
                                    for (l[u.i - 1] += u.x, l.splice(u.i, 1), i = r + 1; i < o; ++i) s[i].i--;
                                else
                                    for (l[u.i - 1] += u.x + l[u.i + 1], l.splice(u.i, 2), i = r + 1; i < o; ++i) s[i].i -= 2;
                            else if (null == l[u.i + 1]) l[u.i] = u.x;
                            else
                                for (l[u.i] = u.x + l[u.i + 1], l.splice(u.i + 1, 1), i = r + 1; i < o; ++i) s[i].i--;
                            s.splice(r, 1), o--, r--
                        } else u.x = Le(parseFloat(e[0]), parseFloat(u.x));
                    for (; r < o;) u = s.pop(), null == l[u.i + 1] ? l[u.i] = u.x : (l[u.i] = u.x + l[u.i + 1], l.splice(u.i + 1, 1)), o--;
                    return 1 === l.length ? null == l[0] ? (u = s[0].x, function(n) {
                        return u(n) + ""
                    }) : function() {
                        return t
                    } : function(n) {
                        for (r = 0; r < o; ++r) l[(u = s[r]).i] = u.x(n);
                        return l.join("")
                    }
                }

                function Re(n, t) {
                    for (var e, r = Wo.interpolators.length; --r >= 0 && !(e = Wo.interpolators[r](n, t)););
                    return e
                }

                function je(n, t) {
                    var e, r = [],
                        i = [],
                        o = n.length,
                        u = t.length,
                        a = Math.min(n.length, t.length);
                    for (e = 0; e < a; ++e) r.push(Re(n[e], t[e]));
                    for (; e < o; ++e) i[e] = n[e];
                    for (; e < u; ++e) i[e] = t[e];
                    return function(n) {
                        for (e = 0; e < a; ++e) i[e] = r[e](n);
                        return i
                    }
                }

                function De(n) {
                    return function(t) {
                        return t <= 0 ? 0 : t >= 1 ? 1 : n(t)
                    }
                }

                function Pe(n) {
                    return function(t) {
                        return 1 - n(1 - t)
                    }
                }

                function Ue(n) {
                    return function(t) {
                        return .5 * (t < .5 ? n(2 * t) : 2 - n(2 - 2 * t))
                    }
                }

                function Oe(n) {
                    return n * n
                }

                function Fe(n) {
                    return n * n * n
                }

                function He(n) {
                    if (n <= 0) return 0;
                    if (n >= 1) return 1;
                    var t = n * n,
                        e = t * n;
                    return 4 * (n < .5 ? e : 3 * (n - t) + e - .75)
                }

                function Ie(n) {
                    return function(t) {
                        return Math.pow(t, n)
                    }
                }

                function Ye(n) {
                    return 1 - Math.cos(n * Nu)
                }

                function Ze(n) {
                    return Math.pow(2, 10 * (n - 1))
                }

                function Ve(n) {
                    return 1 - Math.sqrt(1 - n * n)
                }

                function Be(n, t) {
                    var e;
                    return arguments.length < 2 && (t = .45), arguments.length ? e = t / Eu * Math.asin(1 / n) : (n = 1, e = t / 4),
                        function(r) {
                            return 1 + n * Math.pow(2, -10 * r) * Math.sin((r - e) * Eu / t)
                        }
                }

                function Xe(n) {
                    return n || (n = 1.70158),
                        function(t) {
                            return t * t * ((n + 1) * t - n)
                        }
                }

                function $e(n) {
                    return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
                }

                function We(n, t) {
                    n = Wo.hcl(n), t = Wo.hcl(t);
                    var e = n.h,
                        r = n.c,
                        i = n.l,
                        o = t.h - e,
                        u = t.c - r,
                        a = t.l - i;
                    return isNaN(u) && (u = 0, r = isNaN(r) ? t.c : r), isNaN(o) ? (o = 0, e = isNaN(e) ? t.h : e) : o > 180 ? o -= 360 : o < -180 && (o += 360),
                        function(n) {
                            return J(e + o * n, r + u * n, i + a * n) + ""
                        }
                }

                function Ge(n, t) {
                    n = Wo.hsl(n), t = Wo.hsl(t);
                    var e = n.h,
                        r = n.s,
                        i = n.l,
                        o = t.h - e,
                        u = t.s - r,
                        a = t.l - i;
                    return isNaN(u) && (u = 0, r = isNaN(r) ? t.s : r), isNaN(o) ? (o = 0, e = isNaN(e) ? t.h : e) : o > 180 ? o -= 360 : o < -180 && (o += 360),
                        function(n) {
                            return $(e + o * n, r + u * n, i + a * n) + ""
                        }
                }

                function Je(n, t) {
                    n = Wo.lab(n), t = Wo.lab(t);
                    var e = n.l,
                        r = n.a,
                        i = n.b,
                        o = t.l - e,
                        u = t.a - r,
                        a = t.b - i;
                    return function(n) {
                        return nn(e + o * n, r + u * n, i + a * n) + ""
                    }
                }

                function Ke(n, t) {
                    return t -= n,
                        function(e) {
                            return Math.round(n + t * e)
                        }
                }

                function Qe(n) {
                    var t = [n.a, n.b],
                        e = [n.c, n.d],
                        r = tr(t),
                        i = nr(t, e),
                        o = tr(er(e, t, -i)) || 0;
                    t[0] * e[1] < e[0] * t[1] && (t[0] *= -1, t[1] *= -1, r *= -1, i *= -1), this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * Tu, this.translate = [n.e, n.f], this.scale = [r, o], this.skew = o ? Math.atan2(i, o) * Tu : 0
                }

                function nr(n, t) {
                    return n[0] * t[0] + n[1] * t[1]
                }

                function tr(n) {
                    var t = Math.sqrt(nr(n, n));
                    return t && (n[0] /= t, n[1] /= t), t
                }

                function er(n, t, e) {
                    return n[0] += e * t[0], n[1] += e * t[1], n
                }

                function rr(n, t) {
                    var e, r = [],
                        i = [],
                        o = Wo.transform(n),
                        u = Wo.transform(t),
                        a = o.translate,
                        c = u.translate,
                        l = o.rotate,
                        s = u.rotate,
                        f = o.skew,
                        h = u.skew,
                        p = o.scale,
                        g = u.scale;
                    return a[0] != c[0] || a[1] != c[1] ? (r.push("translate(", null, ",", null, ")"), i.push({
                            i: 1,
                            x: Le(a[0], c[0])
                        }, {
                            i: 3,
                            x: Le(a[1], c[1])
                        })) : c[0] || c[1] ? r.push("translate(" + c + ")") : r.push(""), l != s ? (l - s > 180 ? s += 360 : s - l > 180 && (l += 360), i.push({
                            i: r.push(r.pop() + "rotate(", null, ")") - 2,
                            x: Le(l, s)
                        })) : s && r.push(r.pop() + "rotate(" + s + ")"), f != h ? i.push({
                            i: r.push(r.pop() + "skewX(", null, ")") - 2,
                            x: Le(f, h)
                        }) : h && r.push(r.pop() + "skewX(" + h + ")"), p[0] != g[0] || p[1] != g[1] ? (e = r.push(r.pop() + "scale(", null, ",", null, ")"), i.push({
                            i: e - 4,
                            x: Le(p[0], g[0])
                        }, {
                            i: e - 2,
                            x: Le(p[1], g[1])
                        })) : 1 == g[0] && 1 == g[1] || r.push(r.pop() + "scale(" + g + ")"), e = i.length,
                        function(n) {
                            for (var t, o = -1; ++o < e;) r[(t = i[o]).i] = t.x(n);
                            return r.join("")
                        }
                }

                function ir(n, t) {
                    return t = t - (n = +n) ? 1 / (t - n) : 0,
                        function(e) {
                            return (e - n) * t
                        }
                }

                function or(n, t) {
                    return t = t - (n = +n) ? 1 / (t - n) : 0,
                        function(e) {
                            return Math.max(0, Math.min(1, (e - n) * t))
                        }
                }

                function ur(n) {
                    for (var t = n.source, e = n.target, r = cr(t, e), i = [t]; t !== r;) t = t.parent, i.push(t);
                    for (var o = i.length; e !== r;) i.splice(o, 0, e), e = e.parent;
                    return i
                }

                function ar(n) {
                    for (var t = [], e = n.parent; null != e;) t.push(n), n = e, e = e.parent;
                    return t.push(n), t
                }

                function cr(n, t) {
                    if (n === t) return n;
                    for (var e = ar(n), r = ar(t), i = e.pop(), o = r.pop(), u = null; i === o;) u = i, i = e.pop(), o = r.pop();
                    return u
                }

                function lr(n) {
                    n.fixed |= 2
                }

                function sr(n) {
                    n.fixed &= -7
                }

                function fr(n) {
                    n.fixed |= 4, n.px = n.x, n.py = n.y
                }

                function hr(n) {
                    n.fixed &= -5
                }

                function pr(n, t, e) {
                    var r = 0,
                        i = 0;
                    if (n.charge = 0, !n.leaf)
                        for (var o, u = n.nodes, a = u.length, c = -1; ++c < a;) o = u[c], null != o && (pr(o, t, e), n.charge += o.charge, r += o.charge * o.cx, i += o.charge * o.cy);
                    if (n.point) {
                        n.leaf || (n.point.x += Math.random() - .5, n.point.y += Math.random() - .5);
                        var l = t * e[n.point.index];
                        n.charge += n.pointCharge = l, r += l * n.point.x, i += l * n.point.y
                    }
                    n.cx = r / n.charge, n.cy = i / n.charge
                }

                function gr(n, t) {
                    return Wo.rebind(n, t, "sort", "children", "value"), n.nodes = n, n.links = mr, n
                }

                function dr(n) {
                    return n.children
                }

                function vr(n) {
                    return n.value
                }

                function yr(n, t) {
                    return t.value - n.value
                }

                function mr(n) {
                    return Wo.merge(n.map(function(n) {
                        return (n.children || []).map(function(t) {
                            return {
                                source: n,
                                target: t
                            }
                        })
                    }))
                }

                function xr(n) {
                    return n.x
                }

                function _r(n) {
                    return n.y
                }

                function Mr(n, t, e) {
                    n.y0 = t, n.y = e
                }

                function br(n) {
                    return Wo.range(n.length)
                }

                function wr(n) {
                    for (var t = -1, e = n[0].length, r = []; ++t < e;) r[t] = 0;
                    return r
                }

                function kr(n) {
                    for (var t, e = 1, r = 0, i = n[0][1], o = n.length; e < o; ++e)(t = n[e][1]) > i && (r = e, i = t);
                    return r
                }

                function Sr(n) {
                    return n.reduce(Er, 0)
                }

                function Er(n, t) {
                    return n + t[1]
                }

                function Nr(n, t) {
                    return Ar(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1))
                }

                function Ar(n, t) {
                    for (var e = -1, r = +n[0], i = (n[1] - r) / t, o = []; ++e <= t;) o[e] = i * e + r;
                    return o
                }

                function Cr(n) {
                    return [Wo.min(n), Wo.max(n)]
                }

                function zr(n, t) {
                    return n.parent == t.parent ? 1 : 2
                }

                function Tr(n) {
                    var t = n.children;
                    return t && t.length ? t[0] : n._tree.thread
                }

                function Lr(n) {
                    var t, e = n.children;
                    return e && (t = e.length) ? e[t - 1] : n._tree.thread
                }

                function qr(n, t) {
                    var e = n.children;
                    if (e && (i = e.length))
                        for (var r, i, o = -1; ++o < i;) t(r = qr(e[o], t), n) > 0 && (n = r);
                    return n
                }

                function Rr(n, t) {
                    return n.x - t.x
                }

                function jr(n, t) {
                    return t.x - n.x
                }

                function Dr(n, t) {
                    return n.depth - t.depth
                }

                function Pr(n, t) {
                    function e(n, r) {
                        var i = n.children;
                        if (i && (u = i.length))
                            for (var o, u, a = null, c = -1; ++c < u;) o = i[c], e(o, a), a = o;
                        t(n, r)
                    }
                    e(n, null)
                }

                function Ur(n) {
                    for (var t, e = 0, r = 0, i = n.children, o = i.length; --o >= 0;) t = i[o]._tree, t.prelim += e, t.mod += e, e += t.shift + (r += t.change)
                }

                function Or(n, t, e) {
                    n = n._tree, t = t._tree;
                    var r = e / (t.number - n.number);
                    n.change += r, t.change -= r, t.shift += e, t.prelim += e, t.mod += e
                }

                function Fr(n, t, e) {
                    return n._tree.ancestor.parent == t.parent ? n._tree.ancestor : e
                }

                function Hr(n, t) {
                    return n.value - t.value
                }

                function Ir(n, t) {
                    var e = n._pack_next;
                    n._pack_next = t, t._pack_prev = n, t._pack_next = e, e._pack_prev = t
                }

                function Yr(n, t) {
                    n._pack_next = t, t._pack_prev = n
                }

                function Zr(n, t) {
                    var e = t.x - n.x,
                        r = t.y - n.y,
                        i = n.r + t.r;
                    return .999 * i * i > e * e + r * r
                }

                function Vr(n) {
                    function t(n) {
                        s = Math.min(n.x - n.r, s), f = Math.max(n.x + n.r, f), h = Math.min(n.y - n.r, h), p = Math.max(n.y + n.r, p)
                    }
                    if ((e = n.children) && (l = e.length)) {
                        var e, r, i, o, u, a, c, l, s = 1 / 0,
                            f = -(1 / 0),
                            h = 1 / 0,
                            p = -(1 / 0);
                        if (e.forEach(Br), r = e[0], r.x = -r.r, r.y = 0, t(r), l > 1 && (i = e[1], i.x = i.r, i.y = 0, t(i), l > 2))
                            for (o = e[2], Wr(r, i, o), t(o), Ir(r, o), r._pack_prev = o, Ir(o, i), i = r._pack_next, u = 3; u < l; u++) {
                                Wr(r, i, o = e[u]);
                                var g = 0,
                                    d = 1,
                                    v = 1;
                                for (a = i._pack_next; a !== i; a = a._pack_next, d++)
                                    if (Zr(a, o)) {
                                        g = 1;
                                        break
                                    }
                                if (1 == g)
                                    for (c = r._pack_prev; c !== a._pack_prev && !Zr(c, o); c = c._pack_prev, v++);
                                g ? (d < v || d == v && i.r < r.r ? Yr(r, i = a) : Yr(r = c, i), u--) : (Ir(r, o), i = o, t(o))
                            }
                        var y = (s + f) / 2,
                            m = (h + p) / 2,
                            x = 0;
                        for (u = 0; u < l; u++) o = e[u], o.x -= y, o.y -= m, x = Math.max(x, o.r + Math.sqrt(o.x * o.x + o.y * o.y));
                        n.r = x, e.forEach(Xr)
                    }
                }

                function Br(n) {
                    n._pack_next = n._pack_prev = n
                }

                function Xr(n) {
                    delete n._pack_next, delete n._pack_prev
                }

                function $r(n, t, e, r) {
                    var i = n.children;
                    if (n.x = t += r * n.x, n.y = e += r * n.y, n.r *= r, i)
                        for (var o = -1, u = i.length; ++o < u;) $r(i[o], t, e, r)
                }

                function Wr(n, t, e) {
                    var r = n.r + e.r,
                        i = t.x - n.x,
                        o = t.y - n.y;
                    if (r && (i || o)) {
                        var u = t.r + e.r,
                            a = i * i + o * o;
                        u *= u, r *= r;
                        var c = .5 + (r - u) / (2 * a),
                            l = Math.sqrt(Math.max(0, 2 * u * (r + a) - (r -= a) * r - u * u)) / (2 * a);
                        e.x = n.x + c * i + l * o, e.y = n.y + c * o - l * i
                    } else e.x = n.x + r, e.y = n.y
                }

                function Gr(n) {
                    return 1 + Wo.max(n, function(n) {
                        return n.y
                    })
                }

                function Jr(n) {
                    return n.reduce(function(n, t) {
                        return n + t.x
                    }, 0) / n.length
                }

                function Kr(n) {
                    var t = n.children;
                    return t && t.length ? Kr(t[0]) : n
                }

                function Qr(n) {
                    var t, e = n.children;
                    return e && (t = e.length) ? Qr(e[t - 1]) : n
                }

                function ni(n) {
                    return {
                        x: n.x,
                        y: n.y,
                        dx: n.dx,
                        dy: n.dy
                    }
                }

                function ti(n, t) {
                    var e = n.x + t[3],
                        r = n.y + t[0],
                        i = n.dx - t[1] - t[3],
                        o = n.dy - t[0] - t[2];
                    return i < 0 && (e += i / 2, i = 0), o < 0 && (r += o / 2, o = 0), {
                        x: e,
                        y: r,
                        dx: i,
                        dy: o
                    }
                }

                function ei(n) {
                    var t = n[0],
                        e = n[n.length - 1];
                    return t < e ? [t, e] : [e, t]
                }

                function ri(n) {
                    return n.rangeExtent ? n.rangeExtent() : ei(n.range())
                }

                function ii(n, t, e, r) {
                    var i = e(n[0], n[1]),
                        o = r(t[0], t[1]);
                    return function(n) {
                        return o(i(n))
                    }
                }

                function oi(n, t) {
                    var e, r = 0,
                        i = n.length - 1,
                        o = n[r],
                        u = n[i];
                    return u < o && (e = r, r = i, i = e, e = o, o = u, u = e), n[r] = t.floor(o), n[i] = t.ceil(u), n
                }

                function ui(n) {
                    return n ? {
                        floor: function(t) {
                            return Math.floor(t / n) * n
                        },
                        ceil: function(t) {
                            return Math.ceil(t / n) * n
                        }
                    } : lc
                }

                function ai(n, t, e, r) {
                    var i = [],
                        o = [],
                        u = 0,
                        a = Math.min(n.length, t.length) - 1;
                    for (n[a] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++u <= a;) i.push(e(n[u - 1], n[u])), o.push(r(t[u - 1], t[u]));
                    return function(t) {
                        var e = Wo.bisect(n, t, 1, a) - 1;
                        return o[e](i[e](t))
                    }
                }

                function ci(n, t, e, r) {
                    function i() {
                        var i = Math.min(n.length, t.length) > 2 ? ai : ii,
                            c = r ? or : ir;
                        return u = i(n, t, c, e), a = i(t, n, c, Re), o
                    }

                    function o(n) {
                        return u(n)
                    }
                    var u, a;
                    return o.invert = function(n) {
                        return a(n)
                    }, o.domain = function(t) {
                        return arguments.length ? (n = t.map(Number), i()) : n
                    }, o.range = function(n) {
                        return arguments.length ? (t = n, i()) : t
                    }, o.rangeRound = function(n) {
                        return o.range(n).interpolate(Ke)
                    }, o.clamp = function(n) {
                        return arguments.length ? (r = n, i()) : r
                    }, o.interpolate = function(n) {
                        return arguments.length ? (e = n, i()) : e
                    }, o.ticks = function(t) {
                        return hi(n, t)
                    }, o.tickFormat = function(t, e) {
                        return pi(n, t, e)
                    }, o.nice = function(t) {
                        return si(n, t), i()
                    }, o.copy = function() {
                        return ci(n, t, e, r)
                    }, i()
                }

                function li(n, t) {
                    return Wo.rebind(n, t, "range", "rangeRound", "interpolate", "clamp")
                }

                function si(n, t) {
                    return oi(n, ui(fi(n, t)[2]))
                }

                function fi(n, t) {
                    null == t && (t = 10);
                    var e = ei(n),
                        r = e[1] - e[0],
                        i = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10)),
                        o = t / r * i;
                    return o <= .15 ? i *= 10 : o <= .35 ? i *= 5 : o <= .75 && (i *= 2), e[0] = Math.ceil(e[0] / i) * i, e[1] = Math.floor(e[1] / i) * i + .5 * i, e[2] = i, e
                }

                function hi(n, t) {
                    return Wo.range.apply(Wo, fi(n, t))
                }

                function pi(n, t, e) {
                    var r = fi(n, t);
                    return Wo.format(e ? e.replace(ia, function(n, t, e, i, o, u, a, c, l, s) {
                        return [t, e, i, o, u, a, c, l || "." + di(s, r), s].join("")
                    }) : ",." + gi(r[2]) + "f")
                }

                function gi(n) {
                    return -Math.floor(Math.log(n) / Math.LN10 + .01)
                }

                function di(n, t) {
                    var e = gi(t[2]);
                    return n in sc ? Math.abs(e - gi(Math.max(Math.abs(t[0]), Math.abs(t[1])))) + +("e" !== n) : e - 2 * ("%" === n)
                }

                function vi(n, t, e, r) {
                    function i(n) {
                        return (e ? Math.log(n < 0 ? 0 : n) : -Math.log(n > 0 ? 0 : -n)) / Math.log(t)
                    }

                    function o(n) {
                        return e ? Math.pow(t, n) : -Math.pow(t, -n)
                    }

                    function u(t) {
                        return n(i(t))
                    }
                    return u.invert = function(t) {
                        return o(n.invert(t))
                    }, u.domain = function(t) {
                        return arguments.length ? (e = t[0] >= 0, n.domain((r = t.map(Number)).map(i)), u) : r
                    }, u.base = function(e) {
                        return arguments.length ? (t = +e, n.domain(r.map(i)), u) : t
                    }, u.nice = function() {
                        var t = oi(r.map(i), e ? Math : hc);
                        return n.domain(t), r = t.map(o), u
                    }, u.ticks = function() {
                        var n = ei(r),
                            u = [],
                            a = n[0],
                            c = n[1],
                            l = Math.floor(i(a)),
                            s = Math.ceil(i(c)),
                            f = t % 1 ? 2 : t;
                        if (isFinite(s - l)) {
                            if (e) {
                                for (; l < s; l++)
                                    for (var h = 1; h < f; h++) u.push(o(l) * h);
                                u.push(o(l))
                            } else
                                for (u.push(o(l)); l++ < s;)
                                    for (var h = f - 1; h > 0; h--) u.push(o(l) * h);
                            for (l = 0; u[l] < a; l++);
                            for (s = u.length; u[s - 1] > c; s--);
                            u = u.slice(l, s)
                        }
                        return u
                    }, u.tickFormat = function(n, t) {
                        if (!arguments.length) return fc;
                        arguments.length < 2 ? t = fc : "function" != typeof t && (t = Wo.format(t));
                        var r, a = Math.max(.1, n / u.ticks().length),
                            c = e ? (r = 1e-12, Math.ceil) : (r = -1e-12, Math.floor);
                        return function(n) {
                            return n / o(c(i(n) + r)) <= a ? t(n) : ""
                        }
                    }, u.copy = function() {
                        return vi(n.copy(), t, e, r)
                    }, li(u, n)
                }

                function yi(n, t, e) {
                    function r(t) {
                        return n(i(t))
                    }
                    var i = mi(t),
                        o = mi(1 / t);
                    return r.invert = function(t) {
                        return o(n.invert(t))
                    }, r.domain = function(t) {
                        return arguments.length ? (n.domain((e = t.map(Number)).map(i)), r) : e
                    }, r.ticks = function(n) {
                        return hi(e, n)
                    }, r.tickFormat = function(n, t) {
                        return pi(e, n, t)
                    }, r.nice = function(n) {
                        return r.domain(si(e, n))
                    }, r.exponent = function(u) {
                        return arguments.length ? (i = mi(t = u), o = mi(1 / t), n.domain(e.map(i)), r) : t
                    }, r.copy = function() {
                        return yi(n.copy(), t, e)
                    }, li(r, n)
                }

                function mi(n) {
                    return function(t) {
                        return t < 0 ? -Math.pow(-t, n) : Math.pow(t, n)
                    }
                }

                function xi(n, t) {
                    function e(e) {
                        return u[((o.get(e) || "range" === t.t && o.set(e, n.push(e))) - 1) % u.length]
                    }

                    function r(t, e) {
                        return Wo.range(n.length).map(function(n) {
                            return t + e * n
                        })
                    }
                    var o, u, a;
                    return e.domain = function(r) {
                        if (!arguments.length) return n;
                        n = [], o = new i;
                        for (var u, a = -1, c = r.length; ++a < c;) o.has(u = r[a]) || o.set(u, n.push(u));
                        return e[t.t].apply(e, t.a)
                    }, e.range = function(n) {
                        return arguments.length ? (u = n, a = 0, t = {
                            t: "range",
                            a: arguments
                        }, e) : u
                    }, e.rangePoints = function(i, o) {
                        arguments.length < 2 && (o = 0);
                        var c = i[0],
                            l = i[1],
                            s = (l - c) / (Math.max(1, n.length - 1) + o);
                        return u = r(n.length < 2 ? (c + l) / 2 : c + s * o / 2, s), a = 0, t = {
                            t: "rangePoints",
                            a: arguments
                        }, e
                    }, e.rangeBands = function(i, o, c) {
                        arguments.length < 2 && (o = 0), arguments.length < 3 && (c = o);
                        var l = i[1] < i[0],
                            s = i[l - 0],
                            f = i[1 - l],
                            h = (f - s) / (n.length - o + 2 * c);
                        return u = r(s + h * c, h), l && u.reverse(), a = h * (1 - o), t = {
                            t: "rangeBands",
                            a: arguments
                        }, e
                    }, e.rangeRoundBands = function(i, o, c) {
                        arguments.length < 2 && (o = 0), arguments.length < 3 && (c = o);
                        var l = i[1] < i[0],
                            s = i[l - 0],
                            f = i[1 - l],
                            h = Math.floor((f - s) / (n.length - o + 2 * c)),
                            p = f - s - (n.length - o) * h;
                        return u = r(s + Math.round(p / 2), h), l && u.reverse(), a = Math.round(h * (1 - o)), t = {
                            t: "rangeRoundBands",
                            a: arguments
                        }, e
                    }, e.rangeBand = function() {
                        return a
                    }, e.rangeExtent = function() {
                        return ei(t.a[0])
                    }, e.copy = function() {
                        return xi(n, t)
                    }, e.domain(n)
                }

                function _i(n, t) {
                    function e() {
                        var e = 0,
                            o = t.length;
                        for (i = []; ++e < o;) i[e - 1] = Wo.quantile(n, e / o);
                        return r
                    }

                    function r(n) {
                        if (!isNaN(n = +n)) return t[Wo.bisect(i, n)]
                    }
                    var i;
                    return r.domain = function(t) {
                        return arguments.length ? (n = t.filter(function(n) {
                            return !isNaN(n)
                        }).sort(Wo.ascending), e()) : n
                    }, r.range = function(n) {
                        return arguments.length ? (t = n, e()) : t
                    }, r.quantiles = function() {
                        return i
                    }, r.invertExtent = function(e) {
                        return e = t.indexOf(e), e < 0 ? [NaN, NaN] : [e > 0 ? i[e - 1] : n[0], e < i.length ? i[e] : n[n.length - 1]]
                    }, r.copy = function() {
                        return _i(n, t)
                    }, e()
                }

                function Mi(n, t, e) {
                    function r(t) {
                        return e[Math.max(0, Math.min(u, Math.floor(o * (t - n))))]
                    }

                    function i() {
                        return o = e.length / (t - n), u = e.length - 1, r
                    }
                    var o, u;
                    return r.domain = function(e) {
                        return arguments.length ? (n = +e[0], t = +e[e.length - 1], i()) : [n, t]
                    }, r.range = function(n) {
                        return arguments.length ? (e = n, i()) : e
                    }, r.invertExtent = function(t) {
                        return t = e.indexOf(t), t = t < 0 ? NaN : t / o + n, [t, t + 1 / o]
                    }, r.copy = function() {
                        return Mi(n, t, e)
                    }, i()
                }

                function bi(n, t) {
                    function e(e) {
                        if (e <= e) return t[Wo.bisect(n, e)]
                    }
                    return e.domain = function(t) {
                        return arguments.length ? (n = t, e) : n
                    }, e.range = function(n) {
                        return arguments.length ? (t = n, e) : t
                    }, e.invertExtent = function(e) {
                        return e = t.indexOf(e), [n[e - 1], n[e]]
                    }, e.copy = function() {
                        return bi(n, t)
                    }, e
                }

                function wi(n) {
                    function t(n) {
                        return +n
                    }
                    return t.invert = t, t.domain = t.range = function(e) {
                        return arguments.length ? (n = e.map(t), t) : n
                    }, t.ticks = function(t) {
                        return hi(n, t)
                    }, t.tickFormat = function(t, e) {
                        return pi(n, t, e)
                    }, t.copy = function() {
                        return wi(n)
                    }, t
                }

                function ki(n) {
                    return n.innerRadius
                }

                function Si(n) {
                    return n.outerRadius
                }

                function Ei(n) {
                    return n.startAngle
                }

                function Ni(n) {
                    return n.endAngle
                }

                function Ai(n) {
                    function t(t) {
                        function u() {
                            l.push("M", o(n(s), a))
                        }
                        for (var c, l = [], s = [], f = -1, h = t.length, p = vn(e), g = vn(r); ++f < h;) i.call(this, c = t[f], f) ? s.push([+p.call(this, c, f), +g.call(this, c, f)]) : s.length && (u(), s = []);
                        return s.length && u(), l.length ? l.join("") : null
                    }
                    var e = Bt,
                        r = Xt,
                        i = Bn,
                        o = Ci,
                        u = o.key,
                        a = .7;
                    return t.x = function(n) {
                        return arguments.length ? (e = n, t) : e
                    }, t.y = function(n) {
                        return arguments.length ? (r = n, t) : r
                    }, t.defined = function(n) {
                        return arguments.length ? (i = n, t) : i
                    }, t.interpolate = function(n) {
                        return arguments.length ? (u = "function" == typeof n ? o = n : (o = xc.get(n) || Ci).key, t) : u
                    }, t.tension = function(n) {
                        return arguments.length ? (a = n, t) : a
                    }, t
                }

                function Ci(n) {
                    return n.join("L")
                }

                function zi(n) {
                    return Ci(n) + "Z"
                }

                function Ti(n) {
                    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e;) i.push("H", (r[0] + (r = n[t])[0]) / 2, "V", r[1]);
                    return e > 1 && i.push("H", r[0]), i.join("")
                }

                function Li(n) {
                    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e;) i.push("V", (r = n[t])[1], "H", r[0]);
                    return i.join("")
                }

                function qi(n) {
                    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e;) i.push("H", (r = n[t])[0], "V", r[1]);
                    return i.join("")
                }

                function Ri(n, t) {
                    return n.length < 4 ? Ci(n) : n[1] + Pi(n.slice(1, n.length - 1), Ui(n, t))
                }

                function ji(n, t) {
                    return n.length < 3 ? Ci(n) : n[0] + Pi((n.push(n[0]), n), Ui([n[n.length - 2]].concat(n, [n[1]]), t))
                }

                function Di(n, t) {
                    return n.length < 3 ? Ci(n) : n[0] + Pi(n, Ui(n, t))
                }

                function Pi(n, t) {
                    if (t.length < 1 || n.length != t.length && n.length != t.length + 2) return Ci(n);
                    var e = n.length != t.length,
                        r = "",
                        i = n[0],
                        o = n[1],
                        u = t[0],
                        a = u,
                        c = 1;
                    if (e && (r += "Q" + (o[0] - 2 * u[0] / 3) + "," + (o[1] - 2 * u[1] / 3) + "," + o[0] + "," + o[1], i = n[1], c = 2), t.length > 1) {
                        a = t[1], o = n[c], c++, r += "C" + (i[0] + u[0]) + "," + (i[1] + u[1]) + "," + (o[0] - a[0]) + "," + (o[1] - a[1]) + "," + o[0] + "," + o[1];
                        for (var l = 2; l < t.length; l++, c++) o = n[c], a = t[l], r += "S" + (o[0] - a[0]) + "," + (o[1] - a[1]) + "," + o[0] + "," + o[1]
                    }
                    if (e) {
                        var s = n[c];
                        r += "Q" + (o[0] + 2 * a[0] / 3) + "," + (o[1] + 2 * a[1] / 3) + "," + s[0] + "," + s[1]
                    }
                    return r
                }

                function Ui(n, t) {
                    for (var e, r = [], i = (1 - t) / 2, o = n[0], u = n[1], a = 1, c = n.length; ++a < c;) e = o, o = u, u = n[a], r.push([i * (u[0] - e[0]), i * (u[1] - e[1])]);
                    return r
                }

                function Oi(n) {
                    if (n.length < 3) return Ci(n);
                    var t = 1,
                        e = n.length,
                        r = n[0],
                        i = r[0],
                        o = r[1],
                        u = [i, i, i, (r = n[1])[0]],
                        a = [o, o, o, r[1]],
                        c = [i, ",", o, "L", Yi(bc, u), ",", Yi(bc, a)];
                    for (n.push(n[e - 1]); ++t <= e;) r = n[t], u.shift(), u.push(r[0]), a.shift(), a.push(r[1]), Zi(c, u, a);
                    return n.pop(), c.push("L", r), c.join("")
                }

                function Fi(n) {
                    if (n.length < 4) return Ci(n);
                    for (var t, e = [], r = -1, i = n.length, o = [0], u = [0]; ++r < 3;) t = n[r], o.push(t[0]), u.push(t[1]);
                    for (e.push(Yi(bc, o) + "," + Yi(bc, u)), --r; ++r < i;) t = n[r], o.shift(), o.push(t[0]), u.shift(), u.push(t[1]), Zi(e, o, u);
                    return e.join("")
                }

                function Hi(n) {
                    for (var t, e, r = -1, i = n.length, o = i + 4, u = [], a = []; ++r < 4;) e = n[r % i], u.push(e[0]), a.push(e[1]);
                    for (t = [Yi(bc, u), ",", Yi(bc, a)], --r; ++r < o;) e = n[r % i], u.shift(), u.push(e[0]), a.shift(), a.push(e[1]), Zi(t, u, a);
                    return t.join("")
                }

                function Ii(n, t) {
                    var e = n.length - 1;
                    if (e)
                        for (var r, i, o = n[0][0], u = n[0][1], a = n[e][0] - o, c = n[e][1] - u, l = -1; ++l <= e;) r = n[l], i = l / e, r[0] = t * r[0] + (1 - t) * (o + i * a), r[1] = t * r[1] + (1 - t) * (u + i * c);
                    return Oi(n)
                }

                function Yi(n, t) {
                    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3]
                }

                function Zi(n, t, e) {
                    n.push("C", Yi(_c, t), ",", Yi(_c, e), ",", Yi(Mc, t), ",", Yi(Mc, e), ",", Yi(bc, t), ",", Yi(bc, e))
                }

                function Vi(n, t) {
                    return (t[1] - n[1]) / (t[0] - n[0])
                }

                function Bi(n) {
                    for (var t = 0, e = n.length - 1, r = [], i = n[0], o = n[1], u = r[0] = Vi(i, o); ++t < e;) r[t] = (u + (u = Vi(i = o, o = n[t + 1]))) / 2;
                    return r[t] = u, r
                }

                function Xi(n) {
                    for (var t, e, r, i, o = [], u = Bi(n), a = -1, c = n.length - 1; ++a < c;) t = Vi(n[a], n[a + 1]), au(t) < Au ? u[a] = u[a + 1] = 0 : (e = u[a] / t, r = u[a + 1] / t, i = e * e + r * r, i > 9 && (i = 3 * t / Math.sqrt(i), u[a] = i * e, u[a + 1] = i * r));
                    for (a = -1; ++a <= c;) i = (n[Math.min(c, a + 1)][0] - n[Math.max(0, a - 1)][0]) / (6 * (1 + u[a] * u[a])), o.push([i || 0, u[a] * i || 0]);
                    return o
                }

                function $i(n) {
                    return n.length < 3 ? Ci(n) : n[0] + Pi(n, Xi(n))
                }

                function Wi(n) {
                    for (var t, e, r, i = -1, o = n.length; ++i < o;) t = n[i], e = t[0], r = t[1] + yc, t[0] = e * Math.cos(r), t[1] = e * Math.sin(r);
                    return n
                }

                function Gi(n) {
                    function t(t) {
                        function c() {
                            d.push("M", a(n(y), f), s, l(n(v.reverse()), f), "Z")
                        }
                        for (var h, p, g, d = [], v = [], y = [], m = -1, x = t.length, _ = vn(e), M = vn(i), b = e === r ? function() {
                                return p
                            } : vn(r), w = i === o ? function() {
                                return g
                            } : vn(o); ++m < x;) u.call(this, h = t[m], m) ? (v.push([p = +_.call(this, h, m), g = +M.call(this, h, m)]), y.push([+b.call(this, h, m), +w.call(this, h, m)])) : v.length && (c(), v = [], y = []);
                        return v.length && c(), d.length ? d.join("") : null
                    }
                    var e = Bt,
                        r = Bt,
                        i = 0,
                        o = Xt,
                        u = Bn,
                        a = Ci,
                        c = a.key,
                        l = a,
                        s = "L",
                        f = .7;
                    return t.x = function(n) {
                        return arguments.length ? (e = r = n, t) : r
                    }, t.x0 = function(n) {
                        return arguments.length ? (e = n, t) : e
                    }, t.x1 = function(n) {
                        return arguments.length ? (r = n, t) : r
                    }, t.y = function(n) {
                        return arguments.length ? (i = o = n, t) : o
                    }, t.y0 = function(n) {
                        return arguments.length ? (i = n, t) : i
                    }, t.y1 = function(n) {
                        return arguments.length ? (o = n, t) : o
                    }, t.defined = function(n) {
                        return arguments.length ? (u = n, t) : u
                    }, t.interpolate = function(n) {
                        return arguments.length ? (c = "function" == typeof n ? a = n : (a = xc.get(n) || Ci).key, l = a.reverse || a, s = a.closed ? "M" : "L", t) : c
                    }, t.tension = function(n) {
                        return arguments.length ? (f = n, t) : f
                    }, t
                }

                function Ji(n) {
                    return n.radius
                }

                function Ki(n) {
                    return [n.x, n.y]
                }

                function Qi(n) {
                    return function() {
                        var t = n.apply(this, arguments),
                            e = t[0],
                            r = t[1] + yc;
                        return [e * Math.cos(r), e * Math.sin(r)]
                    }
                }

                function no() {
                    return 64
                }

                function to() {
                    return "circle"
                }

                function eo(n) {
                    var t = Math.sqrt(n / Su);
                    return "M0," + t + "A" + t + "," + t + " 0 1,1 0," + -t + "A" + t + "," + t + " 0 1,1 0," + t + "Z"
                }

                function ro(n, t) {
                    return hu(n, Ac), n.id = t, n
                }

                function io(n, t, e, r) {
                    var i = n.id;
                    return C(n, "function" == typeof e ? function(n, o, u) {
                        n.__transition__[i].tween.set(t, r(e.call(n, n.__data__, o, u)))
                    } : (e = r(e), function(n) {
                        n.__transition__[i].tween.set(t, e)
                    }))
                }

                function oo(n) {
                    return null == n && (n = ""),
                        function() {
                            this.textContent = n
                        }
                }

                function uo(n, t, e, r) {
                    var o = n.__transition__ || (n.__transition__ = {
                            active: 0,
                            count: 0
                        }),
                        u = o[e];
                    if (!u) {
                        var a = r.time;
                        u = o[e] = {
                            tween: new i,
                            time: a,
                            ease: r.ease,
                            delay: r.delay,
                            duration: r.duration
                        }, ++o.count, Wo.timer(function(r) {
                            function i(r) {
                                return o.active > e ? l() : (o.active = e, u.event && u.event.start.call(n, s, t), u.tween.forEach(function(e, r) {
                                    (r = r.call(n, s, t)) && d.push(r)
                                }), void Wo.timer(function() {
                                    return g.c = c(r || 1) ? Bn : c, 1
                                }, 0, a))
                            }

                            function c(r) {
                                if (o.active !== e) return l();
                                for (var i = r / p, a = f(i), c = d.length; c > 0;) d[--c].call(n, a);
                                return i >= 1 ? (u.event && u.event.end.call(n, s, t), l()) : void 0
                            }

                            function l() {
                                return --o.count ? delete o[e] : delete n.__transition__, 1
                            }
                            var s = n.__data__,
                                f = u.ease,
                                h = u.delay,
                                p = u.duration,
                                g = Ju,
                                d = [];
                            return g.t = h + a, h <= r ? i(r - h) : void(g.c = i)
                        }, 0, a)
                    }
                }

                function ao(n, t) {
                    n.attr("transform", function(n) {
                        return "translate(" + t(n) + ",0)"
                    })
                }

                function co(n, t) {
                    n.attr("transform", function(n) {
                        return "translate(0," + t(n) + ")"
                    })
                }

                function lo() {
                    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
                }

                function so(n, t, e) {
                    function r(t) {
                        var e = n(t),
                            r = o(e, 1);
                        return t - e < r - t ? e : r
                    }

                    function i(e) {
                        return t(e = n(new jc(e - 1)), 1), e
                    }

                    function o(n, e) {
                        return t(n = new jc(+n), e), n
                    }

                    function u(n, r, o) {
                        var u = i(n),
                            a = [];
                        if (o > 1)
                            for (; u < r;) e(u) % o || a.push(new Date(+u)), t(u, 1);
                        else
                            for (; u < r;) a.push(new Date(+u)), t(u, 1);
                        return a
                    }

                    function a(n, t, e) {
                        try {
                            jc = lo;
                            var r = new lo;
                            return r._ = n, u(r, t, e)
                        } finally {
                            jc = Date
                        }
                    }
                    n.floor = n, n.round = r, n.ceil = i, n.offset = o, n.range = u;
                    var c = n.utc = fo(n);
                    return c.floor = c, c.round = fo(r), c.ceil = fo(i), c.offset = fo(o), c.range = a, n
                }

                function fo(n) {
                    return function(t, e) {
                        try {
                            jc = lo;
                            var r = new lo;
                            return r._ = t, n(r, e)._
                        } finally {
                            jc = Date
                        }
                    }
                }

                function ho(n) {
                    function t(t) {
                        for (var r, i, o, u = [], a = -1, c = 0; ++a < e;) 37 === n.charCodeAt(a) && (u.push(n.substring(c, a)), null != (i = nl[r = n.charAt(++a)]) && (r = n.charAt(++a)), (o = tl[r]) && (r = o(t, null == i ? "e" === r ? " " : "0" : i)), u.push(r), c = a + 1);
                        return u.push(n.substring(c, a)), u.join("")
                    }
                    var e = n.length;
                    return t.parse = function(t) {
                        var e = {
                                y: 1900,
                                m: 0,
                                d: 1,
                                H: 0,
                                M: 0,
                                S: 0,
                                L: 0,
                                Z: null
                            },
                            r = po(e, n, t, 0);
                        if (r != t.length) return null;
                        "p" in e && (e.H = e.H % 12 + 12 * e.p);
                        var i = null != e.Z && jc !== lo,
                            o = new(i ? lo : jc);
                        return "j" in e ? o.setFullYear(e.y, 0, e.j) : "w" in e && ("W" in e || "U" in e) ? (o.setFullYear(e.y, 0, 1), o.setFullYear(e.y, 0, "W" in e ? (e.w + 6) % 7 + 7 * e.W - (o.getDay() + 5) % 7 : e.w + 7 * e.U - (o.getDay() + 6) % 7)) : o.setFullYear(e.y, e.m, e.d), o.setHours(e.H + Math.floor(e.Z / 100), e.M + e.Z % 100, e.S, e.L), i ? o._ : o
                    }, t.toString = function() {
                        return n
                    }, t
                }

                function po(n, t, e, r) {
                    for (var i, o, u, a = 0, c = t.length, l = e.length; a < c;) {
                        if (r >= l) return -1;
                        if (i = t.charCodeAt(a++), 37 === i) {
                            if (u = t.charAt(a++), o = el[u in nl ? t.charAt(a++) : u], !o || (r = o(n, e, r)) < 0) return -1
                        } else if (i != e.charCodeAt(r++)) return -1
                    }
                    return r
                }

                function go(n) {
                    return new RegExp("^(?:" + n.map(Wo.requote).join("|") + ")", "i")
                }

                function vo(n) {
                    for (var t = new i, e = -1, r = n.length; ++e < r;) t.set(n[e].toLowerCase(), e);
                    return t
                }

                function yo(n, t, e) {
                    var r = n < 0 ? "-" : "",
                        i = (r ? -n : n) + "",
                        o = i.length;
                    return r + (o < e ? new Array(e - o + 1).join(t) + i : i)
                }

                function mo(n, t, e) {
                    Xc.lastIndex = 0;
                    var r = Xc.exec(t.substring(e));
                    return r ? (n.w = $c.get(r[0].toLowerCase()), e + r[0].length) : -1
                }

                function xo(n, t, e) {
                    Vc.lastIndex = 0;
                    var r = Vc.exec(t.substring(e));
                    return r ? (n.w = Bc.get(r[0].toLowerCase()), e + r[0].length) : -1
                }

                function _o(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e, e + 1));
                    return r ? (n.w = +r[0], e + r[0].length) : -1
                }

                function Mo(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e));
                    return r ? (n.U = +r[0], e + r[0].length) : -1
                }

                function bo(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e));
                    return r ? (n.W = +r[0], e + r[0].length) : -1
                }

                function wo(n, t, e) {
                    Jc.lastIndex = 0;
                    var r = Jc.exec(t.substring(e));
                    return r ? (n.m = Kc.get(r[0].toLowerCase()), e + r[0].length) : -1
                }

                function ko(n, t, e) {
                    Wc.lastIndex = 0;
                    var r = Wc.exec(t.substring(e));
                    return r ? (n.m = Gc.get(r[0].toLowerCase()), e + r[0].length) : -1
                }

                function So(n, t, e) {
                    return po(n, tl.c.toString(), t, e)
                }

                function Eo(n, t, e) {
                    return po(n, tl.x.toString(), t, e)
                }

                function No(n, t, e) {
                    return po(n, tl.X.toString(), t, e)
                }

                function Ao(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e, e + 4));
                    return r ? (n.y = +r[0], e + r[0].length) : -1
                }

                function Co(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e, e + 2));
                    return r ? (n.y = To(+r[0]), e + r[0].length) : -1
                }

                function zo(n, t, e) {
                    return /^[+-]\d{4}$/.test(t = t.substring(e, e + 5)) ? (n.Z = +t, e + 5) : -1
                }

                function To(n) {
                    return n + (n > 68 ? 1900 : 2e3)
                }

                function Lo(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e, e + 2));
                    return r ? (n.m = r[0] - 1, e + r[0].length) : -1
                }

                function qo(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e, e + 2));
                    return r ? (n.d = +r[0], e + r[0].length) : -1
                }

                function Ro(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e, e + 3));
                    return r ? (n.j = +r[0], e + r[0].length) : -1
                }

                function jo(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e, e + 2));
                    return r ? (n.H = +r[0], e + r[0].length) : -1
                }

                function Do(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e, e + 2));
                    return r ? (n.M = +r[0], e + r[0].length) : -1
                }

                function Po(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e, e + 2));
                    return r ? (n.S = +r[0], e + r[0].length) : -1
                }

                function Uo(n, t, e) {
                    rl.lastIndex = 0;
                    var r = rl.exec(t.substring(e, e + 3));
                    return r ? (n.L = +r[0], e + r[0].length) : -1
                }

                function Oo(n, t, e) {
                    var r = il.get(t.substring(e, e += 2).toLowerCase());
                    return null == r ? -1 : (n.p = r, e)
                }

                function Fo(n) {
                    var t = n.getTimezoneOffset(),
                        e = t > 0 ? "-" : "+",
                        r = ~~(au(t) / 60),
                        i = au(t) % 60;
                    return e + yo(r, "0", 2) + yo(i, "0", 2)
                }

                function Ho(n, t, e) {
                    Qc.lastIndex = 0;
                    var r = Qc.exec(t.substring(e, e + 1));
                    return r ? e + r[0].length : -1
                }

                function Io(n) {
                    function t(n) {
                        try {
                            jc = lo;
                            var t = new jc;
                            return t._ = n, e(t)
                        } finally {
                            jc = Date
                        }
                    }
                    var e = ho(n);
                    return t.parse = function(n) {
                        try {
                            jc = lo;
                            var t = e.parse(n);
                            return t && t._
                        } finally {
                            jc = Date
                        }
                    }, t.toString = e.toString, t
                }

                function Yo(n) {
                    return n.toISOString()
                }

                function Zo(n, t, e) {
                    function r(t) {
                        return n(t)
                    }

                    function i(n, e) {
                        var r = n[1] - n[0],
                            i = r / e,
                            o = Wo.bisect(ul, i);
                        return o == ul.length ? [t.year, fi(n.map(function(n) {
                            return n / 31536e6
                        }), e)[2]] : o ? t[i / ul[o - 1] < ul[o] / i ? o - 1 : o] : [sl, fi(n, e)[2]]
                    }
                    return r.invert = function(t) {
                        return Vo(n.invert(t))
                    }, r.domain = function(t) {
                        return arguments.length ? (n.domain(t), r) : n.domain().map(Vo)
                    }, r.nice = function(n, t) {
                        function e(e) {
                            return !isNaN(e) && !n.range(e, Vo(+e + 1), t).length
                        }
                        var o = r.domain(),
                            u = ei(o),
                            a = null == n ? i(u, 10) : "number" == typeof n && i(u, n);
                        return a && (n = a[0], t = a[1]), r.domain(oi(o, t > 1 ? {
                            floor: function(t) {
                                for (; e(t = n.floor(t));) t = Vo(t - 1);
                                return t
                            },
                            ceil: function(t) {
                                for (; e(t = n.ceil(t));) t = Vo(+t + 1);
                                return t
                            }
                        } : n))
                    }, r.ticks = function(n, t) {
                        var e = ei(r.domain()),
                            o = null == n ? i(e, 10) : "number" == typeof n ? i(e, n) : !n.range && [{
                                range: n
                            }, t];
                        return o && (n = o[0], t = o[1]), n.range(e[0], Vo(+e[1] + 1), t < 1 ? 1 : t)
                    }, r.tickFormat = function() {
                        return e
                    }, r.copy = function() {
                        return Zo(n.copy(), t, e)
                    }, li(r, n)
                }

                function Vo(n) {
                    return new Date(n)
                }

                function Bo(n) {
                    return function(t) {
                        for (var e = n.length - 1, r = n[e]; !r[1](t);) r = n[--e];
                        return r[0](t)
                    }
                }

                function Xo(n) {
                    return JSON.parse(n.responseText)
                }

                function $o(n) {
                    var t = Ko.createRange();
                    return t.selectNode(Ko.body), t.createContextualFragment(n.responseText)
                }
                var Wo = {
                    version: "3.3.13"
                };
                Date.now || (Date.now = function() {
                    return +new Date
                });
                var Go = [].slice,
                    Jo = function(n) {
                        return Go.call(n)
                    },
                    Ko = document,
                    Qo = Ko.documentElement,
                    nu = window;
                try {
                    Jo(Qo.childNodes)[0].nodeType
                } catch (n) {
                    Jo = function(n) {
                        for (var t = n.length, e = new Array(t); t--;) e[t] = n[t];
                        return e
                    }
                }
                try {
                    Ko.createElement("div").style.setProperty("opacity", 0, "")
                } catch (n) {
                    var tu = nu.Element.prototype,
                        eu = tu.setAttribute,
                        ru = tu.setAttributeNS,
                        iu = nu.CSSStyleDeclaration.prototype,
                        ou = iu.setProperty;
                    tu.setAttribute = function(n, t) {
                        eu.call(this, n, t + "")
                    }, tu.setAttributeNS = function(n, t, e) {
                        ru.call(this, n, t, e + "")
                    }, iu.setProperty = function(n, t, e) {
                        ou.call(this, n, t + "", e)
                    }
                }
                Wo.ascending = function(n, t) {
                    return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
                }, Wo.descending = function(n, t) {
                    return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
                }, Wo.min = function(n, t) {
                    var e, r, i = -1,
                        o = n.length;
                    if (1 === arguments.length) {
                        for (; ++i < o && !(null != (e = n[i]) && e <= e);) e = void 0;
                        for (; ++i < o;) null != (r = n[i]) && e > r && (e = r)
                    } else {
                        for (; ++i < o && !(null != (e = t.call(n, n[i], i)) && e <= e);) e = void 0;
                        for (; ++i < o;) null != (r = t.call(n, n[i], i)) && e > r && (e = r)
                    }
                    return e
                }, Wo.max = function(n, t) {
                    var e, r, i = -1,
                        o = n.length;
                    if (1 === arguments.length) {
                        for (; ++i < o && !(null != (e = n[i]) && e <= e);) e = void 0;
                        for (; ++i < o;) null != (r = n[i]) && r > e && (e = r)
                    } else {
                        for (; ++i < o && !(null != (e = t.call(n, n[i], i)) && e <= e);) e = void 0;
                        for (; ++i < o;) null != (r = t.call(n, n[i], i)) && r > e && (e = r)
                    }
                    return e
                }, Wo.extent = function(n, t) {
                    var e, r, i, o = -1,
                        u = n.length;
                    if (1 === arguments.length) {
                        for (; ++o < u && !(null != (e = i = n[o]) && e <= e);) e = i = void 0;
                        for (; ++o < u;) null != (r = n[o]) && (e > r && (e = r), i < r && (i = r))
                    } else {
                        for (; ++o < u && !(null != (e = i = t.call(n, n[o], o)) && e <= e);) e = void 0;
                        for (; ++o < u;) null != (r = t.call(n, n[o], o)) && (e > r && (e = r), i < r && (i = r))
                    }
                    return [e, i]
                }, Wo.sum = function(n, t) {
                    var e, r = 0,
                        i = n.length,
                        o = -1;
                    if (1 === arguments.length)
                        for (; ++o < i;) isNaN(e = +n[o]) || (r += e);
                    else
                        for (; ++o < i;) isNaN(e = +t.call(n, n[o], o)) || (r += e);
                    return r
                }, Wo.mean = function(t, e) {
                    var r, i = t.length,
                        o = 0,
                        u = -1,
                        a = 0;
                    if (1 === arguments.length)
                        for (; ++u < i;) n(r = t[u]) && (o += (r - o) / ++a);
                    else
                        for (; ++u < i;) n(r = e.call(t, t[u], u)) && (o += (r - o) / ++a);
                    return a ? o : void 0
                }, Wo.quantile = function(n, t) {
                    var e = (n.length - 1) * t + 1,
                        r = Math.floor(e),
                        i = +n[r - 1],
                        o = e - r;
                    return o ? i + o * (n[r] - i) : i
                }, Wo.median = function(t, e) {
                    return arguments.length > 1 && (t = t.map(e)), t = t.filter(n), t.length ? Wo.quantile(t.sort(Wo.ascending), .5) : void 0
                }, Wo.bisector = function(n) {
                    return {
                        left: function(t, e, r, i) {
                            for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = t.length); r < i;) {
                                var o = r + i >>> 1;
                                n.call(t, t[o], o) < e ? r = o + 1 : i = o
                            }
                            return r
                        },
                        right: function(t, e, r, i) {
                            for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = t.length); r < i;) {
                                var o = r + i >>> 1;
                                e < n.call(t, t[o], o) ? i = o : r = o + 1
                            }
                            return r
                        }
                    }
                };
                var uu = Wo.bisector(function(n) {
                    return n
                });
                Wo.bisectLeft = uu.left, Wo.bisect = Wo.bisectRight = uu.right, Wo.shuffle = function(n) {
                    for (var t, e, r = n.length; r;) e = Math.random() * r-- | 0, t = n[r], n[r] = n[e], n[e] = t;
                    return n
                }, Wo.permute = function(n, t) {
                    for (var e = t.length, r = new Array(e); e--;) r[e] = n[t[e]];
                    return r
                }, Wo.pairs = function(n) {
                    for (var t, e = 0, r = n.length - 1, i = n[0], o = new Array(r < 0 ? 0 : r); e < r;) o[e] = [t = i, i = n[++e]];
                    return o
                }, Wo.zip = function() {
                    if (!(i = arguments.length)) return [];
                    for (var n = -1, e = Wo.min(arguments, t), r = new Array(e); ++n < e;)
                        for (var i, o = -1, u = r[n] = new Array(i); ++o < i;) u[o] = arguments[o][n];
                    return r
                }, Wo.transpose = function(n) {
                    return Wo.zip.apply(Wo, n)
                }, Wo.keys = function(n) {
                    var t = [];
                    for (var e in n) t.push(e);
                    return t
                }, Wo.values = function(n) {
                    var t = [];
                    for (var e in n) t.push(n[e]);
                    return t
                }, Wo.entries = function(n) {
                    var t = [];
                    for (var e in n) t.push({
                        key: e,
                        value: n[e]
                    });
                    return t
                }, Wo.merge = function(n) {
                    for (var t, e, r, i = n.length, o = -1, u = 0; ++o < i;) u += n[o].length;
                    for (e = new Array(u); --i >= 0;)
                        for (r = n[i], t = r.length; --t >= 0;) e[--u] = r[t];
                    return e
                };
                var au = Math.abs;
                Wo.range = function(n, t, r) {
                    if (arguments.length < 3 && (r = 1, arguments.length < 2 && (t = n, n = 0)), (t - n) / r === 1 / 0) throw new Error("infinite range");
                    var i, o = [],
                        u = e(au(r)),
                        a = -1;
                    if (n *= u, t *= u, r *= u, r < 0)
                        for (;
                            (i = n + r * ++a) > t;) o.push(i / u);
                    else
                        for (;
                            (i = n + r * ++a) < t;) o.push(i / u);
                    return o
                }, Wo.map = function(n) {
                    var t = new i;
                    if (n instanceof i) n.forEach(function(n, e) {
                        t.set(n, e)
                    });
                    else
                        for (var e in n) t.set(e, n[e]);
                    return t
                }, r(i, {
                    has: function(n) {
                        return cu + n in this
                    },
                    get: function(n) {
                        return this[cu + n]
                    },
                    set: function(n, t) {
                        return this[cu + n] = t
                    },
                    remove: function(n) {
                        return n = cu + n, n in this && delete this[n]
                    },
                    keys: function() {
                        var n = [];
                        return this.forEach(function(t) {
                            n.push(t)
                        }), n
                    },
                    values: function() {
                        var n = [];
                        return this.forEach(function(t, e) {
                            n.push(e)
                        }), n
                    },
                    entries: function() {
                        var n = [];
                        return this.forEach(function(t, e) {
                            n.push({
                                key: t,
                                value: e
                            })
                        }), n
                    },
                    forEach: function(n) {
                        for (var t in this) t.charCodeAt(0) === lu && n.call(this, t.substring(1), this[t])
                    }
                });
                var cu = "\0",
                    lu = cu.charCodeAt(0);
                Wo.nest = function() {
                    function n(t, a, c) {
                        if (c >= u.length) return r ? r.call(o, a) : e ? a.sort(e) : a;
                        for (var l, s, f, h, p = -1, g = a.length, d = u[c++], v = new i; ++p < g;)(h = v.get(l = d(s = a[p]))) ? h.push(s) : v.set(l, [s]);
                        return t ? (s = t(), f = function(e, r) {
                            s.set(e, n(t, r, c))
                        }) : (s = {}, f = function(e, r) {
                            s[e] = n(t, r, c)
                        }), v.forEach(f), s
                    }

                    function t(n, e) {
                        if (e >= u.length) return n;
                        var r = [],
                            i = a[e++];
                        return n.forEach(function(n, i) {
                            r.push({
                                key: n,
                                values: t(i, e)
                            })
                        }), i ? r.sort(function(n, t) {
                            return i(n.key, t.key)
                        }) : r
                    }
                    var e, r, o = {},
                        u = [],
                        a = [];
                    return o.map = function(t, e) {
                        return n(e, t, 0)
                    }, o.entries = function(e) {
                        return t(n(Wo.map, e, 0), 0)
                    }, o.key = function(n) {
                        return u.push(n), o
                    }, o.sortKeys = function(n) {
                        return a[u.length - 1] = n, o
                    }, o.sortValues = function(n) {
                        return e = n, o
                    }, o.rollup = function(n) {
                        return r = n, o
                    }, o
                }, Wo.set = function(n) {
                    var t = new o;
                    if (n)
                        for (var e = 0, r = n.length; e < r; ++e) t.add(n[e]);
                    return t
                }, r(o, {
                    has: function(n) {
                        return cu + n in this
                    },
                    add: function(n) {
                        return this[cu + n] = !0, n
                    },
                    remove: function(n) {
                        return n = cu + n, n in this && delete this[n]
                    },
                    values: function() {
                        var n = [];
                        return this.forEach(function(t) {
                            n.push(t)
                        }), n
                    },
                    forEach: function(n) {
                        for (var t in this) t.charCodeAt(0) === lu && n.call(this, t.substring(1))
                    }
                }), Wo.behavior = {}, Wo.rebind = function(n, t) {
                    for (var e, r = 1, i = arguments.length; ++r < i;) n[e = arguments[r]] = u(n, t, t[e]);
                    return n
                };
                var su = ["webkit", "ms", "moz", "Moz", "o", "O"];
                Wo.dispatch = function() {
                    for (var n = new l, t = -1, e = arguments.length; ++t < e;) n[arguments[t]] = s(n);
                    return n
                }, l.prototype.on = function(n, t) {
                    var e = n.indexOf("."),
                        r = "";
                    if (e >= 0 && (r = n.substring(e + 1), n = n.substring(0, e)), n) return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t);
                    if (2 === arguments.length) {
                        if (null == t)
                            for (n in this) this.hasOwnProperty(n) && this[n].on(r, null);
                        return this
                    }
                }, Wo.event = null, Wo.requote = function(n) {
                    return n.replace(fu, "\\$&")
                };
                var fu = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
                    hu = {}.__proto__ ? function(n, t) {
                        n.__proto__ = t
                    } : function(n, t) {
                        for (var e in t) n[e] = t[e]
                    },
                    pu = function(n, t) {
                        return t.querySelector(n)
                    },
                    gu = function(n, t) {
                        return t.querySelectorAll(n)
                    },
                    du = Qo[a(Qo, "matchesSelector")],
                    vu = function(n, t) {
                        return du.call(n, t)
                    };
                "function" == typeof Sizzle && (pu = function(n, t) {
                    return Sizzle(n, t)[0] || null
                }, gu = function(n, t) {
                    return Sizzle.uniqueSort(Sizzle(n, t))
                }, vu = Sizzle.matchesSelector), Wo.selection = function() {
                    return _u
                };
                var yu = Wo.selection.prototype = [];
                yu.select = function(n) {
                    var t, e, r, i, o = [];
                    n = d(n);
                    for (var u = -1, a = this.length; ++u < a;) {
                        o.push(t = []), t.parentNode = (r = this[u]).parentNode;
                        for (var c = -1, l = r.length; ++c < l;)(i = r[c]) ? (t.push(e = n.call(i, i.__data__, c, u)), e && "__data__" in i && (e.__data__ = i.__data__)) : t.push(null)
                    }
                    return g(o)
                }, yu.selectAll = function(n) {
                    var t, e, r = [];
                    n = v(n);
                    for (var i = -1, o = this.length; ++i < o;)
                        for (var u = this[i], a = -1, c = u.length; ++a < c;)(e = u[a]) && (r.push(t = Jo(n.call(e, e.__data__, a, i))), t.parentNode = e);
                    return g(r)
                };
                var mu = {
                    svg: "http://www.w3.org/2000/svg",
                    xhtml: "http://www.w3.org/1999/xhtml",
                    xlink: "http://www.w3.org/1999/xlink",
                    xml: "http://www.w3.org/XML/1998/namespace",
                    xmlns: "http://www.w3.org/2000/xmlns/"
                };
                Wo.ns = {
                    prefix: mu,
                    qualify: function(n) {
                        var t = n.indexOf(":"),
                            e = n;
                        return t >= 0 && (e = n.substring(0, t), n = n.substring(t + 1)), mu.hasOwnProperty(e) ? {
                            space: mu[e],
                            local: n
                        } : n
                    }
                }, yu.attr = function(n, t) {
                    if (arguments.length < 2) {
                        if ("string" == typeof n) {
                            var e = this.node();
                            return n = Wo.ns.qualify(n), n.local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n)
                        }
                        for (t in n) this.each(y(t, n[t]));
                        return this
                    }
                    return this.each(y(n, t))
                }, yu.classed = function(n, t) {
                    if (arguments.length < 2) {
                        if ("string" == typeof n) {
                            var e = this.node(),
                                r = (n = _(n)).length,
                                i = -1;
                            if (t = e.classList) {
                                for (; ++i < r;)
                                    if (!t.contains(n[i])) return !1
                            } else
                                for (t = e.getAttribute("class"); ++i < r;)
                                    if (!x(n[i]).test(t)) return !1;
                            return !0
                        }
                        for (t in n) this.each(M(t, n[t]));
                        return this
                    }
                    return this.each(M(n, t))
                }, yu.style = function(n, t, e) {
                    var r = arguments.length;
                    if (r < 3) {
                        if ("string" != typeof n) {
                            r < 2 && (t = "");
                            for (e in n) this.each(w(e, n[e], t));
                            return this
                        }
                        if (r < 2) return nu.getComputedStyle(this.node(), null).getPropertyValue(n);
                        e = ""
                    }
                    return this.each(w(n, t, e))
                }, yu.property = function(n, t) {
                    if (arguments.length < 2) {
                        if ("string" == typeof n) return this.node()[n];
                        for (t in n) this.each(k(t, n[t]));
                        return this
                    }
                    return this.each(k(n, t))
                }, yu.text = function(n) {
                    return arguments.length ? this.each("function" == typeof n ? function() {
                        var t = n.apply(this, arguments);
                        this.textContent = null == t ? "" : t
                    } : null == n ? function() {
                        this.textContent = ""
                    } : function() {
                        this.textContent = n
                    }) : this.node().textContent
                }, yu.html = function(n) {
                    return arguments.length ? this.each("function" == typeof n ? function() {
                        var t = n.apply(this, arguments);
                        this.innerHTML = null == t ? "" : t
                    } : null == n ? function() {
                        this.innerHTML = ""
                    } : function() {
                        this.innerHTML = n
                    }) : this.node().innerHTML
                }, yu.append = function(n) {
                    return n = S(n), this.select(function() {
                        return this.appendChild(n.apply(this, arguments))
                    })
                }, yu.insert = function(n, t) {
                    return n = S(n), t = d(t), this.select(function() {
                        return this.insertBefore(n.apply(this, arguments), t.apply(this, arguments) || null)
                    })
                }, yu.remove = function() {
                    return this.each(function() {
                        var n = this.parentNode;
                        n && n.removeChild(this)
                    })
                }, yu.data = function(n, t) {
                    function e(n, e) {
                        var r, o, u, a = n.length,
                            f = e.length,
                            h = Math.min(a, f),
                            p = new Array(f),
                            g = new Array(f),
                            d = new Array(a);
                        if (t) {
                            var v, y = new i,
                                m = new i,
                                x = [];
                            for (r = -1; ++r < a;) v = t.call(o = n[r], o.__data__, r), y.has(v) ? d[r] = o : y.set(v, o), x.push(v);
                            for (r = -1; ++r < f;) v = t.call(e, u = e[r], r), (o = y.get(v)) ? (p[r] = o, o.__data__ = u) : m.has(v) || (g[r] = E(u)), m.set(v, u), y.remove(v);
                            for (r = -1; ++r < a;) y.has(x[r]) && (d[r] = n[r])
                        } else {
                            for (r = -1; ++r < h;) o = n[r], u = e[r], o ? (o.__data__ = u, p[r] = o) : g[r] = E(u);
                            for (; r < f; ++r) g[r] = E(e[r]);
                            for (; r < a; ++r) d[r] = n[r]
                        }
                        g.update = p, g.parentNode = p.parentNode = d.parentNode = n.parentNode, c.push(g), l.push(p), s.push(d)
                    }
                    var r, o, u = -1,
                        a = this.length;
                    if (!arguments.length) {
                        for (n = new Array(a = (r = this[0]).length); ++u < a;)(o = r[u]) && (n[u] = o.__data__);
                        return n
                    }
                    var c = z([]),
                        l = g([]),
                        s = g([]);
                    if ("function" == typeof n)
                        for (; ++u < a;) e(r = this[u], n.call(r, r.parentNode.__data__, u));
                    else
                        for (; ++u < a;) e(r = this[u], n);
                    return l.enter = function() {
                        return c
                    }, l.exit = function() {
                        return s
                    }, l
                }, yu.datum = function(n) {
                    return arguments.length ? this.property("__data__", n) : this.property("__data__")
                }, yu.filter = function(n) {
                    var t, e, r, i = [];
                    "function" != typeof n && (n = N(n));
                    for (var o = 0, u = this.length; o < u; o++) {
                        i.push(t = []), t.parentNode = (e = this[o]).parentNode;
                        for (var a = 0, c = e.length; a < c; a++)(r = e[a]) && n.call(r, r.__data__, a, o) && t.push(r)
                    }
                    return g(i)
                }, yu.order = function() {
                    for (var n = -1, t = this.length; ++n < t;)
                        for (var e, r = this[n], i = r.length - 1, o = r[i]; --i >= 0;)(e = r[i]) && (o && o !== e.nextSibling && o.parentNode.insertBefore(e, o), o = e);
                    return this
                }, yu.sort = function(n) {
                    n = A.apply(this, arguments);
                    for (var t = -1, e = this.length; ++t < e;) this[t].sort(n);
                    return this.order()
                }, yu.each = function(n) {
                    return C(this, function(t, e, r) {
                        n.call(t, t.__data__, e, r)
                    })
                }, yu.call = function(n) {
                    var t = Jo(arguments);
                    return n.apply(t[0] = this, t), this
                }, yu.empty = function() {
                    return !this.node()
                }, yu.node = function() {
                    for (var n = 0, t = this.length; n < t; n++)
                        for (var e = this[n], r = 0, i = e.length; r < i; r++) {
                            var o = e[r];
                            if (o) return o
                        }
                    return null
                }, yu.size = function() {
                    var n = 0;
                    return this.each(function() {
                        ++n
                    }), n
                };
                var xu = [];
                Wo.selection.enter = z, Wo.selection.enter.prototype = xu, xu.append = yu.append, xu.empty = yu.empty, xu.node = yu.node, xu.call = yu.call, xu.size = yu.size, xu.select = function(n) {
                    for (var t, e, r, i, o, u = [], a = -1, c = this.length; ++a < c;) {
                        r = (i = this[a]).update, u.push(t = []), t.parentNode = i.parentNode;
                        for (var l = -1, s = i.length; ++l < s;)(o = i[l]) ? (t.push(r[l] = e = n.call(i.parentNode, o.__data__, l, a)), e.__data__ = o.__data__) : t.push(null)
                    }
                    return g(u)
                }, xu.insert = function(n, t) {
                    return arguments.length < 2 && (t = T(this)), yu.insert.call(this, n, t)
                }, yu.transition = function() {
                    for (var n, t, e = kc || ++Cc, r = [], i = Sc || {
                            time: Date.now(),
                            ease: He,
                            delay: 0,
                            duration: 250
                        }, o = -1, u = this.length; ++o < u;) {
                        r.push(n = []);
                        for (var a = this[o], c = -1, l = a.length; ++c < l;)(t = a[c]) && uo(t, c, e, i), n.push(t)
                    }
                    return ro(r, e)
                }, yu.interrupt = function() {
                    return this.each(L)
                }, Wo.select = function(n) {
                    var t = ["string" == typeof n ? pu(n, Ko) : n];
                    return t.parentNode = Qo, g([t])
                }, Wo.selectAll = function(n) {
                    var t = Jo("string" == typeof n ? gu(n, Ko) : n);
                    return t.parentNode = Qo, g([t])
                };
                var _u = Wo.select(Qo);
                yu.on = function(n, t, e) {
                    var r = arguments.length;
                    if (r < 3) {
                        if ("string" != typeof n) {
                            r < 2 && (t = !1);
                            for (e in n) this.each(q(e, n[e], t));
                            return this
                        }
                        if (r < 2) return (r = this.node()["__on" + n]) && r._;
                        e = !1
                    }
                    return this.each(q(n, t, e))
                };
                var Mu = Wo.map({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                });
                Mu.forEach(function(n) {
                    "on" + n in Ko && Mu.remove(n)
                });
                var bu = "onselectstart" in Ko ? null : a(Qo.style, "userSelect"),
                    wu = 0;
                Wo.mouse = function(n) {
                    return P(n, h())
                };
                var ku = /WebKit/.test(nu.navigator.userAgent) ? -1 : 0;
                Wo.touches = function(n, t) {
                    return arguments.length < 2 && (t = h().touches), t ? Jo(t).map(function(t) {
                        var e = P(n, t);
                        return e.identifier = t.identifier, e
                    }) : []
                }, Wo.behavior.drag = function() {
                    function n() {
                        this.on("mousedown.drag", u).on("touchstart.drag", a)
                    }

                    function t() {
                        return Wo.event.changedTouches[0].identifier
                    }

                    function e(n, t) {
                        return Wo.touches(n).filter(function(n) {
                            return n.identifier === t
                        })[0]
                    }

                    function r(n, t, e, r) {
                        return function() {
                            function u() {
                                var n = t(s, p),
                                    e = n[0] - d[0],
                                    r = n[1] - d[1];
                                v |= e | r, d = n, f({
                                    type: "drag",
                                    x: n[0] + c[0],
                                    y: n[1] + c[1],
                                    dx: e,
                                    dy: r
                                })
                            }

                            function a() {
                                y.on(e + "." + g, null).on(r + "." + g, null), m(v && Wo.event.target === h), f({
                                    type: "dragend"
                                })
                            }
                            var c, l = this,
                                s = l.parentNode,
                                f = i.of(l, arguments),
                                h = Wo.event.target,
                                p = n(),
                                g = null == p ? "drag" : "drag-" + p,
                                d = t(s, p),
                                v = 0,
                                y = Wo.select(nu).on(e + "." + g, u).on(r + "." + g, a),
                                m = D();
                            o ? (c = o.apply(l, arguments), c = [c.x - d[0], c.y - d[1]]) : c = [0, 0], f({
                                type: "dragstart"
                            })
                        }
                    }
                    var i = p(n, "drag", "dragstart", "dragend"),
                        o = null,
                        u = r(c, Wo.mouse, "mousemove", "mouseup"),
                        a = r(t, e, "touchmove", "touchend");
                    return n.origin = function(t) {
                        return arguments.length ? (o = t, n) : o
                    }, Wo.rebind(n, i, "on")
                };
                var Su = Math.PI,
                    Eu = 2 * Su,
                    Nu = Su / 2,
                    Au = 1e-6,
                    Cu = Au * Au,
                    zu = Su / 180,
                    Tu = 180 / Su,
                    Lu = Math.SQRT2,
                    qu = 2,
                    Ru = 4;
                Wo.interpolateZoom = function(n, t) {
                    function e(n) {
                        var t = n * m;
                        if (y) {
                            var e = I(d),
                                u = o / (qu * h) * (e * Y(Lu * t + d) - H(d));
                            return [r + u * l, i + u * s, o * e / I(Lu * t + d)]
                        }
                        return [r + n * l, i + n * s, o * Math.exp(Lu * t)]
                    }
                    var r = n[0],
                        i = n[1],
                        o = n[2],
                        u = t[0],
                        a = t[1],
                        c = t[2],
                        l = u - r,
                        s = a - i,
                        f = l * l + s * s,
                        h = Math.sqrt(f),
                        p = (c * c - o * o + Ru * f) / (2 * o * qu * h),
                        g = (c * c - o * o - Ru * f) / (2 * c * qu * h),
                        d = Math.log(Math.sqrt(p * p + 1) - p),
                        v = Math.log(Math.sqrt(g * g + 1) - g),
                        y = v - d,
                        m = (y || Math.log(c / o)) / Lu;
                    return e.duration = 1e3 * m, e
                }, Wo.behavior.zoom = function() {
                    function n(n) {
                        n.on(N, l).on(Pu + ".zoom", h).on(A, g).on("dblclick.zoom", d).on(z, s)
                    }

                    function t(n) {
                        return [(n[0] - k.x) / k.k, (n[1] - k.y) / k.k]
                    }

                    function e(n) {
                        return [n[0] * k.k + k.x, n[1] * k.k + k.y]
                    }

                    function r(n) {
                        k.k = Math.max(E[0], Math.min(E[1], n))
                    }

                    function i(n, t) {
                        t = e(t), k.x += n[0] - t[0], k.y += n[1] - t[1]
                    }

                    function o() {
                        M && M.domain(_.range().map(function(n) {
                            return (n - k.x) / k.k
                        }).map(_.invert)), w && w.domain(b.range().map(function(n) {
                            return (n - k.y) / k.k
                        }).map(b.invert))
                    }

                    function u(n) {
                        n({
                            type: "zoomstart"
                        })
                    }

                    function a(n) {
                        o(), n({
                            type: "zoom",
                            scale: k.k,
                            translate: [k.x, k.y]
                        })
                    }

                    function c(n) {
                        n({
                            type: "zoomend"
                        })
                    }

                    function l() {
                        function n() {
                            s = 1, i(Wo.mouse(r), h), a(o)
                        }

                        function e() {
                            f.on(A, nu === r ? g : null).on(C, null), p(s && Wo.event.target === l), c(o)
                        }
                        var r = this,
                            o = T.of(r, arguments),
                            l = Wo.event.target,
                            s = 0,
                            f = Wo.select(nu).on(A, n).on(C, e),
                            h = t(Wo.mouse(r)),
                            p = D();
                        L.call(r), u(o)
                    }

                    function s() {
                        function n() {
                            var n = Wo.touches(g);
                            return p = k.k, n.forEach(function(n) {
                                n.identifier in v && (v[n.identifier] = t(n))
                            }), n
                        }

                        function e() {
                            for (var t = Wo.event.changedTouches, e = 0, o = t.length; e < o; ++e) v[t[e].identifier] = null;
                            var u = n(),
                                c = Date.now();
                            if (1 === u.length) {
                                if (c - x < 500) {
                                    var l = u[0],
                                        s = v[l.identifier];
                                    r(2 * k.k), i(l, s), f(), a(d)
                                }
                                x = c
                            } else if (u.length > 1) {
                                var l = u[0],
                                    h = u[1],
                                    p = l[0] - h[0],
                                    g = l[1] - h[1];
                                y = p * p + g * g
                            }
                        }

                        function o() {
                            for (var n, t, e, o, u = Wo.touches(g), c = 0, l = u.length; c < l; ++c, o = null)
                                if (e = u[c], o = v[e.identifier]) {
                                    if (t) break;
                                    n = e, t = o
                                }
                            if (o) {
                                var s = (s = e[0] - n[0]) * s + (s = e[1] - n[1]) * s,
                                    f = y && Math.sqrt(s / y);
                                n = [(n[0] + e[0]) / 2, (n[1] + e[1]) / 2], t = [(t[0] + o[0]) / 2, (t[1] + o[1]) / 2], r(f * p)
                            }
                            x = null, i(n, t), a(d)
                        }

                        function h() {
                            if (Wo.event.touches.length) {
                                for (var t = Wo.event.changedTouches, e = 0, r = t.length; e < r; ++e) delete v[t[e].identifier];
                                for (var i in v) return void n()
                            }
                            b.on(_, null).on(M, null), w.on(N, l).on(z, s), S(), c(d)
                        }
                        var p, g = this,
                            d = T.of(g, arguments),
                            v = {},
                            y = 0,
                            m = Wo.event.changedTouches[0].identifier,
                            _ = "touchmove.zoom-" + m,
                            M = "touchend.zoom-" + m,
                            b = Wo.select(nu).on(_, o).on(M, h),
                            w = Wo.select(g).on(N, null).on(z, e),
                            S = D();
                        L.call(g), e(), u(d)
                    }

                    function h() {
                        var n = T.of(this, arguments);
                        m ? clearTimeout(m) : (L.call(this), u(n)), m = setTimeout(function() {
                            m = null, c(n)
                        }, 50), f();
                        var e = y || Wo.mouse(this);
                        v || (v = t(e)), r(Math.pow(2, .002 * ju()) * k.k), i(e, v), a(n)
                    }

                    function g() {
                        v = null
                    }

                    function d() {
                        var n = T.of(this, arguments),
                            e = Wo.mouse(this),
                            o = t(e),
                            l = Math.log(k.k) / Math.LN2;
                        u(n), r(Math.pow(2, Wo.event.shiftKey ? Math.ceil(l) - 1 : Math.floor(l) + 1)), i(e, o), a(n), c(n)
                    }
                    var v, y, m, x, _, M, b, w, k = {
                            x: 0,
                            y: 0,
                            k: 1
                        },
                        S = [960, 500],
                        E = Du,
                        N = "mousedown.zoom",
                        A = "mousemove.zoom",
                        C = "mouseup.zoom",
                        z = "touchstart.zoom",
                        T = p(n, "zoomstart", "zoom", "zoomend");
                    return n.event = function(n) {
                        n.each(function() {
                            var n = T.of(this, arguments),
                                t = k;
                            kc ? Wo.select(this).transition().each("start.zoom", function() {
                                k = this.__chart__ || {
                                    x: 0,
                                    y: 0,
                                    k: 1
                                }, u(n)
                            }).tween("zoom:zoom", function() {
                                var e = S[0],
                                    r = S[1],
                                    i = e / 2,
                                    o = r / 2,
                                    u = Wo.interpolateZoom([(i - k.x) / k.k, (o - k.y) / k.k, e / k.k], [(i - t.x) / t.k, (o - t.y) / t.k, e / t.k]);
                                return function(t) {
                                    var r = u(t),
                                        c = e / r[2];
                                    this.__chart__ = k = {
                                        x: i - r[0] * c,
                                        y: o - r[1] * c,
                                        k: c
                                    }, a(n)
                                }
                            }).each("end.zoom", function() {
                                c(n)
                            }) : (this.__chart__ = k, u(n), a(n), c(n))
                        })
                    }, n.translate = function(t) {
                        return arguments.length ? (k = {
                            x: +t[0],
                            y: +t[1],
                            k: k.k
                        }, o(), n) : [k.x, k.y]
                    }, n.scale = function(t) {
                        return arguments.length ? (k = {
                            x: k.x,
                            y: k.y,
                            k: +t
                        }, o(), n) : k.k
                    }, n.scaleExtent = function(t) {
                        return arguments.length ? (E = null == t ? Du : [+t[0], +t[1]], n) : E
                    }, n.center = function(t) {
                        return arguments.length ? (y = t && [+t[0], +t[1]], n) : y
                    }, n.size = function(t) {
                        return arguments.length ? (S = t && [+t[0], +t[1]], n) : S
                    }, n.x = function(t) {
                        return arguments.length ? (M = t, _ = t.copy(), k = {
                            x: 0,
                            y: 0,
                            k: 1
                        }, n) : M
                    }, n.y = function(t) {
                        return arguments.length ? (w = t, b = t.copy(), k = {
                            x: 0,
                            y: 0,
                            k: 1
                        }, n) : w
                    }, Wo.rebind(n, T, "on")
                };
                var ju, Du = [0, 1 / 0],
                    Pu = "onwheel" in Ko ? (ju = function() {
                        return -Wo.event.deltaY * (Wo.event.deltaMode ? 120 : 1)
                    }, "wheel") : "onmousewheel" in Ko ? (ju = function() {
                        return Wo.event.wheelDelta
                    }, "mousewheel") : (ju = function() {
                        return -Wo.event.detail
                    }, "MozMousePixelScroll");
                V.prototype.toString = function() {
                    return this.rgb() + ""
                }, Wo.hsl = function(n, t, e) {
                    return 1 === arguments.length ? n instanceof X ? B(n.h, n.s, n.l) : fn("" + n, hn, B) : B(+n, +t, +e)
                };
                var Uu = X.prototype = new V;
                Uu.brighter = function(n) {
                    return n = Math.pow(.7, arguments.length ? n : 1), B(this.h, this.s, this.l / n)
                }, Uu.darker = function(n) {
                    return n = Math.pow(.7, arguments.length ? n : 1), B(this.h, this.s, n * this.l)
                }, Uu.rgb = function() {
                    return $(this.h, this.s, this.l)
                }, Wo.hcl = function(n, t, e) {
                    return 1 === arguments.length ? n instanceof G ? W(n.h, n.c, n.l) : n instanceof Q ? tn(n.l, n.a, n.b) : tn((n = pn((n = Wo.rgb(n)).r, n.g, n.b)).l, n.a, n.b) : W(+n, +t, +e)
                };
                var Ou = G.prototype = new V;
                Ou.brighter = function(n) {
                    return W(this.h, this.c, Math.min(100, this.l + Fu * (arguments.length ? n : 1)))
                }, Ou.darker = function(n) {
                    return W(this.h, this.c, Math.max(0, this.l - Fu * (arguments.length ? n : 1)))
                }, Ou.rgb = function() {
                    return J(this.h, this.c, this.l).rgb()
                }, Wo.lab = function(n, t, e) {
                    return 1 === arguments.length ? n instanceof Q ? K(n.l, n.a, n.b) : n instanceof G ? J(n.l, n.c, n.h) : pn((n = Wo.rgb(n)).r, n.g, n.b) : K(+n, +t, +e)
                };
                var Fu = 18,
                    Hu = .95047,
                    Iu = 1,
                    Yu = 1.08883,
                    Zu = Q.prototype = new V;
                Zu.brighter = function(n) {
                    return K(Math.min(100, this.l + Fu * (arguments.length ? n : 1)), this.a, this.b)
                }, Zu.darker = function(n) {
                    return K(Math.max(0, this.l - Fu * (arguments.length ? n : 1)), this.a, this.b)
                }, Zu.rgb = function() {
                    return nn(this.l, this.a, this.b)
                }, Wo.rgb = function(n, t, e) {
                    return 1 === arguments.length ? n instanceof ln ? cn(n.r, n.g, n.b) : fn("" + n, cn, $) : cn(~~n, ~~t, ~~e)
                };
                var Vu = ln.prototype = new V;
                Vu.brighter = function(n) {
                    n = Math.pow(.7, arguments.length ? n : 1);
                    var t = this.r,
                        e = this.g,
                        r = this.b,
                        i = 30;
                    return t || e || r ? (t && t < i && (t = i), e && e < i && (e = i), r && r < i && (r = i), cn(Math.min(255, ~~(t / n)), Math.min(255, ~~(e / n)), Math.min(255, ~~(r / n)))) : cn(i, i, i)
                }, Vu.darker = function(n) {
                    return n = Math.pow(.7, arguments.length ? n : 1), cn(~~(n * this.r), ~~(n * this.g), ~~(n * this.b))
                }, Vu.hsl = function() {
                    return hn(this.r, this.g, this.b)
                }, Vu.toString = function() {
                    return "#" + sn(this.r) + sn(this.g) + sn(this.b)
                };
                var Bu = Wo.map({
                    aliceblue: 15792383,
                    antiquewhite: 16444375,
                    aqua: 65535,
                    aquamarine: 8388564,
                    azure: 15794175,
                    beige: 16119260,
                    bisque: 16770244,
                    black: 0,
                    blanchedalmond: 16772045,
                    blue: 255,
                    blueviolet: 9055202,
                    brown: 10824234,
                    burlywood: 14596231,
                    cadetblue: 6266528,
                    chartreuse: 8388352,
                    chocolate: 13789470,
                    coral: 16744272,
                    cornflowerblue: 6591981,
                    cornsilk: 16775388,
                    crimson: 14423100,
                    cyan: 65535,
                    darkblue: 139,
                    darkcyan: 35723,
                    darkgoldenrod: 12092939,
                    darkgray: 11119017,
                    darkgreen: 25600,
                    darkgrey: 11119017,
                    darkkhaki: 12433259,
                    darkmagenta: 9109643,
                    darkolivegreen: 5597999,
                    darkorange: 16747520,
                    darkorchid: 10040012,
                    darkred: 9109504,
                    darksalmon: 15308410,
                    darkseagreen: 9419919,
                    darkslateblue: 4734347,
                    darkslategray: 3100495,
                    darkslategrey: 3100495,
                    darkturquoise: 52945,
                    darkviolet: 9699539,
                    deeppink: 16716947,
                    deepskyblue: 49151,
                    dimgray: 6908265,
                    dimgrey: 6908265,
                    dodgerblue: 2003199,
                    firebrick: 11674146,
                    floralwhite: 16775920,
                    forestgreen: 2263842,
                    fuchsia: 16711935,
                    gainsboro: 14474460,
                    ghostwhite: 16316671,
                    gold: 16766720,
                    goldenrod: 14329120,
                    gray: 8421504,
                    green: 32768,
                    greenyellow: 11403055,
                    grey: 8421504,
                    honeydew: 15794160,
                    hotpink: 16738740,
                    indianred: 13458524,
                    indigo: 4915330,
                    ivory: 16777200,
                    khaki: 15787660,
                    lavender: 15132410,
                    lavenderblush: 16773365,
                    lawngreen: 8190976,
                    lemonchiffon: 16775885,
                    lightblue: 11393254,
                    lightcoral: 15761536,
                    lightcyan: 14745599,
                    lightgoldenrodyellow: 16448210,
                    lightgray: 13882323,
                    lightgreen: 9498256,
                    lightgrey: 13882323,
                    lightpink: 16758465,
                    lightsalmon: 16752762,
                    lightseagreen: 2142890,
                    lightskyblue: 8900346,
                    lightslategray: 7833753,
                    lightslategrey: 7833753,
                    lightsteelblue: 11584734,
                    lightyellow: 16777184,
                    lime: 65280,
                    limegreen: 3329330,
                    linen: 16445670,
                    magenta: 16711935,
                    maroon: 8388608,
                    mediumaquamarine: 6737322,
                    mediumblue: 205,
                    mediumorchid: 12211667,
                    mediumpurple: 9662683,
                    mediumseagreen: 3978097,
                    mediumslateblue: 8087790,
                    mediumspringgreen: 64154,
                    mediumturquoise: 4772300,
                    mediumvioletred: 13047173,
                    midnightblue: 1644912,
                    mintcream: 16121850,
                    mistyrose: 16770273,
                    moccasin: 16770229,
                    navajowhite: 16768685,
                    navy: 128,
                    oldlace: 16643558,
                    olive: 8421376,
                    olivedrab: 7048739,
                    orange: 16753920,
                    orangered: 16729344,
                    orchid: 14315734,
                    palegoldenrod: 15657130,
                    palegreen: 10025880,
                    paleturquoise: 11529966,
                    palevioletred: 14381203,
                    papayawhip: 16773077,
                    peachpuff: 16767673,
                    peru: 13468991,
                    pink: 16761035,
                    plum: 14524637,
                    powderblue: 11591910,
                    purple: 8388736,
                    red: 16711680,
                    rosybrown: 12357519,
                    royalblue: 4286945,
                    saddlebrown: 9127187,
                    salmon: 16416882,
                    sandybrown: 16032864,
                    seagreen: 3050327,
                    seashell: 16774638,
                    sienna: 10506797,
                    silver: 12632256,
                    skyblue: 8900331,
                    slateblue: 6970061,
                    slategray: 7372944,
                    slategrey: 7372944,
                    snow: 16775930,
                    springgreen: 65407,
                    steelblue: 4620980,
                    tan: 13808780,
                    teal: 32896,
                    thistle: 14204888,
                    tomato: 16737095,
                    turquoise: 4251856,
                    violet: 15631086,
                    wheat: 16113331,
                    white: 16777215,
                    whitesmoke: 16119285,
                    yellow: 16776960,
                    yellowgreen: 10145074
                });
                Bu.forEach(function(n, t) {
                    Bu.set(n, un(t))
                }), Wo.functor = vn, Wo.xhr = mn(yn), Wo.dsv = function(n, t) {
                    function e(n, e, o) {
                        arguments.length < 3 && (o = e, e = null);
                        var u = xn(n, t, null == e ? r : i(e), o);
                        return u.row = function(n) {
                            return arguments.length ? u.response(null == (e = n) ? r : i(n)) : e
                        }, u
                    }

                    function r(n) {
                        return e.parse(n.responseText)
                    }

                    function i(n) {
                        return function(t) {
                            return e.parse(t.responseText, n)
                        }
                    }

                    function u(t) {
                        return t.map(a).join(n)
                    }

                    function a(n) {
                        return c.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n
                    }
                    var c = new RegExp('["' + n + "\n]"),
                        l = n.charCodeAt(0);
                    return e.parse = function(n, t) {
                        var r;
                        return e.parseRows(n, function(n, e) {
                            if (r) return r(n, e - 1);
                            var i = new Function("d", "return {" + n.map(function(n, t) {
                                return JSON.stringify(n) + ": d[" + t + "]"
                            }).join(",") + "}");
                            r = t ? function(n, e) {
                                return t(i(n), e)
                            } : i
                        })
                    }, e.parseRows = function(n, t) {
                        function e() {
                            if (s >= c) return u;
                            if (i) return i = !1, o;
                            var t = s;
                            if (34 === n.charCodeAt(t)) {
                                for (var e = t; e++ < c;)
                                    if (34 === n.charCodeAt(e)) {
                                        if (34 !== n.charCodeAt(e + 1)) break;
                                        ++e
                                    }
                                s = e + 2;
                                var r = n.charCodeAt(e + 1);
                                return 13 === r ? (i = !0, 10 === n.charCodeAt(e + 2) && ++s) : 10 === r && (i = !0), n.substring(t + 1, e).replace(/""/g, '"')
                            }
                            for (; s < c;) {
                                var r = n.charCodeAt(s++),
                                    a = 1;
                                if (10 === r) i = !0;
                                else if (13 === r) i = !0, 10 === n.charCodeAt(s) && (++s, ++a);
                                else if (r !== l) continue;
                                return n.substring(t, s - a)
                            }
                            return n.substring(t)
                        }
                        for (var r, i, o = {}, u = {}, a = [], c = n.length, s = 0, f = 0;
                            (r = e()) !== u;) {
                            for (var h = []; r !== o && r !== u;) h.push(r), r = e();
                            t && !(h = t(h, f++)) || a.push(h)
                        }
                        return a
                    }, e.format = function(t) {
                        if (Array.isArray(t[0])) return e.formatRows(t);
                        var r = new o,
                            i = [];
                        return t.forEach(function(n) {
                            for (var t in n) r.has(t) || i.push(r.add(t))
                        }), [i.map(a).join(n)].concat(t.map(function(t) {
                            return i.map(function(n) {
                                return a(t[n])
                            }).join(n)
                        })).join("\n")
                    }, e.formatRows = function(n) {
                        return n.map(u).join("\n")
                    }, e
                }, Wo.csv = Wo.dsv(",", "text/csv"), Wo.tsv = Wo.dsv("\t", "text/tab-separated-values");
                var Xu, $u, Wu, Gu, Ju, Ku = nu[a(nu, "requestAnimationFrame")] || function(n) {
                    setTimeout(n, 17)
                };
                Wo.timer = function(n, t, e) {
                    var r = arguments.length;
                    r < 2 && (t = 0), r < 3 && (e = Date.now());
                    var i = e + t,
                        o = {
                            c: n,
                            t: i,
                            f: !1,
                            n: null
                        };
                    $u ? $u.n = o : Xu = o, $u = o, Wu || (Gu = clearTimeout(Gu), Wu = 1, Ku(Mn))
                }, Wo.timer.flush = function() {
                    bn(), wn()
                };
                var Qu = ".",
                    na = ",",
                    ta = [3, 3],
                    ea = "$",
                    ra = ["y", "z", "a", "f", "p", "n", "Âµ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(kn);
                Wo.formatPrefix = function(n, t) {
                    var e = 0;
                    return n && (n < 0 && (n *= -1), t && (n = Wo.round(n, Sn(n, t))), e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10), e = Math.max(-24, Math.min(24, 3 * Math.floor((e <= 0 ? e + 1 : e - 1) / 3)))), ra[8 + e / 3]
                }, Wo.round = function(n, t) {
                    return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n)
                }, Wo.format = function(n) {
                    var t = ia.exec(n),
                        e = t[1] || " ",
                        r = t[2] || ">",
                        i = t[3] || "",
                        o = t[4] || "",
                        u = t[5],
                        a = +t[6],
                        c = t[7],
                        l = t[8],
                        s = t[9],
                        f = 1,
                        h = "",
                        p = !1;
                    switch (l && (l = +l.substring(1)), (u || "0" === e && "=" === r) && (u = e = "0", r = "=", c && (a -= Math.floor((a - 1) / 4))), s) {
                        case "n":
                            c = !0, s = "g";
                            break;
                        case "%":
                            f = 100, h = "%", s = "f";
                            break;
                        case "p":
                            f = 100, h = "%", s = "r";
                            break;
                        case "b":
                        case "o":
                        case "x":
                        case "X":
                            "#" === o && (o = "0" + s.toLowerCase());
                        case "c":
                        case "d":
                            p = !0, l = 0;
                            break;
                        case "s":
                            f = -1, s = "r"
                    }
                    "#" === o ? o = "" : "$" === o && (o = ea), "r" != s || l || (s = "g"), null != l && ("g" == s ? l = Math.max(1, Math.min(21, l)) : "e" != s && "f" != s || (l = Math.max(0, Math.min(20, l)))), s = oa.get(s) || En;
                    var g = u && c;
                    return function(n) {
                        if (p && n % 1) return "";
                        var t = n < 0 || 0 === n && 1 / n < 0 ? (n = -n, "-") : i;
                        if (f < 0) {
                            var d = Wo.formatPrefix(n, l);
                            n = d.scale(n), h = d.symbol
                        } else n *= f;
                        n = s(n, l);
                        var v = n.lastIndexOf("."),
                            y = v < 0 ? n : n.substring(0, v),
                            m = v < 0 ? "" : Qu + n.substring(v + 1);
                        !u && c && (y = ua(y));
                        var x = o.length + y.length + m.length + (g ? 0 : t.length),
                            _ = x < a ? new Array(x = a - x + 1).join(e) : "";
                        return g && (y = ua(_ + y)), t += o, n = y + m, ("<" === r ? t + n + _ : ">" === r ? _ + t + n : "^" === r ? _.substring(0, x >>= 1) + t + n + _.substring(x) : t + (g ? n : _ + n)) + h
                    }
                };
                var ia = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
                    oa = Wo.map({
                        b: function(n) {
                            return n.toString(2)
                        },
                        c: function(n) {
                            return String.fromCharCode(n)
                        },
                        o: function(n) {
                            return n.toString(8)
                        },
                        x: function(n) {
                            return n.toString(16)
                        },
                        X: function(n) {
                            return n.toString(16).toUpperCase()
                        },
                        g: function(n, t) {
                            return n.toPrecision(t)
                        },
                        e: function(n, t) {
                            return n.toExponential(t)
                        },
                        f: function(n, t) {
                            return n.toFixed(t)
                        },
                        r: function(n, t) {
                            return (n = Wo.round(n, Sn(n, t))).toFixed(Math.max(0, Math.min(20, Sn(n * (1 + 1e-15), t))))
                        }
                    }),
                    ua = yn;
                if (ta) {
                    var aa = ta.length;
                    ua = function(n) {
                        for (var t = n.length, e = [], r = 0, i = ta[0]; t > 0 && i > 0;) e.push(n.substring(t -= i, t + i)), i = ta[r = (r + 1) % aa];
                        return e.reverse().join(na)
                    }
                }
                Wo.geo = {}, Nn.prototype = {
                    s: 0,
                    t: 0,
                    add: function(n) {
                        An(n, this.t, ca), An(ca.s, this.s, this), this.s ? this.t += ca.t : this.s = ca.t
                    },
                    reset: function() {
                        this.s = this.t = 0
                    },
                    valueOf: function() {
                        return this.s
                    }
                };
                var ca = new Nn;
                Wo.geo.stream = function(n, t) {
                    n && la.hasOwnProperty(n.type) ? la[n.type](n, t) : Cn(n, t)
                };
                var la = {
                        Feature: function(n, t) {
                            Cn(n.geometry, t)
                        },
                        FeatureCollection: function(n, t) {
                            for (var e = n.features, r = -1, i = e.length; ++r < i;) Cn(e[r].geometry, t)
                        }
                    },
                    sa = {
                        Sphere: function(n, t) {
                            t.sphere()
                        },
                        Point: function(n, t) {
                            n = n.coordinates, t.point(n[0], n[1], n[2])
                        },
                        MultiPoint: function(n, t) {
                            for (var e = n.coordinates, r = -1, i = e.length; ++r < i;) n = e[r], t.point(n[0], n[1], n[2])
                        },
                        LineString: function(n, t) {
                            zn(n.coordinates, t, 0)
                        },
                        MultiLineString: function(n, t) {
                            for (var e = n.coordinates, r = -1, i = e.length; ++r < i;) zn(e[r], t, 0)
                        },
                        Polygon: function(n, t) {
                            Tn(n.coordinates, t)
                        },
                        MultiPolygon: function(n, t) {
                            for (var e = n.coordinates, r = -1, i = e.length; ++r < i;) Tn(e[r], t)
                        },
                        GeometryCollection: function(n, t) {
                            for (var e = n.geometries, r = -1, i = e.length; ++r < i;) Cn(e[r], t)
                        }
                    };
                Wo.geo.area = function(n) {
                    return fa = 0, Wo.geo.stream(n, pa), fa
                };
                var fa, ha = new Nn,
                    pa = {
                        sphere: function() {
                            fa += 4 * Su
                        },
                        point: c,
                        lineStart: c,
                        lineEnd: c,
                        polygonStart: function() {
                            ha.reset(), pa.lineStart = Ln
                        },
                        polygonEnd: function() {
                            var n = 2 * ha;
                            fa += n < 0 ? 4 * Su + n : n, pa.lineStart = pa.lineEnd = pa.point = c
                        }
                    };
                Wo.geo.bounds = function() {
                    function n(n, t) {
                        x.push(_ = [s = n, h = n]), t < f && (f = t), t > p && (p = t)
                    }

                    function t(t, e) {
                        var r = qn([t * zu, e * zu]);
                        if (y) {
                            var i = jn(y, r),
                                o = [i[1], -i[0], 0],
                                u = jn(o, i);
                            Un(u), u = On(u);
                            var c = t - g,
                                l = c > 0 ? 1 : -1,
                                d = u[0] * Tu * l,
                                v = au(c) > 180;
                            if (v ^ (l * g < d && d < l * t)) {
                                var m = u[1] * Tu;
                                m > p && (p = m)
                            } else if (d = (d + 360) % 360 - 180, v ^ (l * g < d && d < l * t)) {
                                var m = -u[1] * Tu;
                                m < f && (f = m)
                            } else e < f && (f = e), e > p && (p = e);
                            v ? t < g ? a(s, t) > a(s, h) && (h = t) : a(t, h) > a(s, h) && (s = t) : h >= s ? (t < s && (s = t), t > h && (h = t)) : t > g ? a(s, t) > a(s, h) && (h = t) : a(t, h) > a(s, h) && (s = t)
                        } else n(t, e);
                        y = r, g = t
                    }

                    function e() {
                        M.point = t
                    }

                    function r() {
                        _[0] = s, _[1] = h, M.point = n, y = null
                    }

                    function i(n, e) {
                        if (y) {
                            var r = n - g;
                            m += au(r) > 180 ? r + (r > 0 ? 360 : -360) : r
                        } else d = n, v = e;
                        pa.point(n, e), t(n, e)
                    }

                    function o() {
                        pa.lineStart()
                    }

                    function u() {
                        i(d, v), pa.lineEnd(), au(m) > Au && (s = -(h = 180)), _[0] = s, _[1] = h, y = null
                    }

                    function a(n, t) {
                        return (t -= n) < 0 ? t + 360 : t
                    }

                    function c(n, t) {
                        return n[0] - t[0]
                    }

                    function l(n, t) {
                        return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
                    }
                    var s, f, h, p, g, d, v, y, m, x, _, M = {
                        point: n,
                        lineStart: e,
                        lineEnd: r,
                        polygonStart: function() {
                            M.point = i, M.lineStart = o, M.lineEnd = u, m = 0, pa.polygonStart()
                        },
                        polygonEnd: function() {
                            pa.polygonEnd(), M.point = n, M.lineStart = e, M.lineEnd = r, ha < 0 ? (s = -(h = 180), f = -(p = 90)) : m > Au ? p = 90 : m < -Au && (f = -90), _[0] = s, _[1] = h
                        }
                    };
                    return function(n) {
                        p = h = -(s = f = 1 / 0), x = [], Wo.geo.stream(n, M);
                        var t = x.length;
                        if (t) {
                            x.sort(c);
                            for (var e, r = 1, i = x[0], o = [i]; r < t; ++r) e = x[r], l(e[0], i) || l(e[1], i) ? (a(i[0], e[1]) > a(i[0], i[1]) && (i[1] = e[1]), a(e[0], i[1]) > a(i[0], i[1]) && (i[0] = e[0])) : o.push(i = e);
                            for (var u, e, g = -(1 / 0), t = o.length - 1, r = 0, i = o[t]; r <= t; i = e, ++r) e = o[r], (u = a(i[1], e[0])) > g && (g = u, s = e[0], h = i[1])
                        }
                        return x = _ = null, s === 1 / 0 || f === 1 / 0 ? [
                            [NaN, NaN],
                            [NaN, NaN]
                        ] : [
                            [s, f],
                            [h, p]
                        ]
                    }
                }(), Wo.geo.centroid = function(n) {
                    ga = da = va = ya = ma = xa = _a = Ma = ba = wa = ka = 0, Wo.geo.stream(n, Sa);
                    var t = ba,
                        e = wa,
                        r = ka,
                        i = t * t + e * e + r * r;
                    return i < Cu && (t = xa, e = _a, r = Ma, da < Au && (t = va, e = ya, r = ma), i = t * t + e * e + r * r, i < Cu) ? [NaN, NaN] : [Math.atan2(e, t) * Tu, F(r / Math.sqrt(i)) * Tu]
                };
                var ga, da, va, ya, ma, xa, _a, Ma, ba, wa, ka, Sa = {
                        sphere: c,
                        point: Hn,
                        lineStart: Yn,
                        lineEnd: Zn,
                        polygonStart: function() {
                            Sa.lineStart = Vn
                        },
                        polygonEnd: function() {
                            Sa.lineStart = Yn
                        }
                    },
                    Ea = Gn(Bn, tt, rt, [-Su, -Su / 2]),
                    Na = 1e9;
                Wo.geo.clipExtent = function() {
                    var n, t, e, r, i, o, u = {
                        stream: function(n) {
                            return i && (i.valid = !1), i = o(n), i.valid = !0, i
                        },
                        extent: function(a) {
                            return arguments.length ? (o = ut(n = +a[0][0], t = +a[0][1], e = +a[1][0], r = +a[1][1]), i && (i.valid = !1, i = null), u) : [
                                [n, t],
                                [e, r]
                            ]
                        }
                    };
                    return u.extent([
                        [0, 0],
                        [960, 500]
                    ])
                }, (Wo.geo.conicEqualArea = function() {
                    return ct(lt)
                }).raw = lt, Wo.geo.albers = function() {
                    return Wo.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
                }, Wo.geo.albersUsa = function() {
                    function n(n) {
                        var o = n[0],
                            u = n[1];
                        return t = null, e(o, u), t || (r(o, u), t) || i(o, u), t
                    }
                    var t, e, r, i, o = Wo.geo.albers(),
                        u = Wo.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
                        a = Wo.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
                        c = {
                            point: function(n, e) {
                                t = [n, e]
                            }
                        };
                    return n.invert = function(n) {
                        var t = o.scale(),
                            e = o.translate(),
                            r = (n[0] - e[0]) / t,
                            i = (n[1] - e[1]) / t;
                        return (i >= .12 && i < .234 && r >= -.425 && r < -.214 ? u : i >= .166 && i < .234 && r >= -.214 && r < -.115 ? a : o).invert(n)
                    }, n.stream = function(n) {
                        var t = o.stream(n),
                            e = u.stream(n),
                            r = a.stream(n);
                        return {
                            point: function(n, i) {
                                t.point(n, i), e.point(n, i), r.point(n, i)
                            },
                            sphere: function() {
                                t.sphere(), e.sphere(), r.sphere()
                            },
                            lineStart: function() {
                                t.lineStart(), e.lineStart(), r.lineStart()
                            },
                            lineEnd: function() {
                                t.lineEnd(), e.lineEnd(), r.lineEnd()
                            },
                            polygonStart: function() {
                                t.polygonStart(), e.polygonStart(), r.polygonStart()
                            },
                            polygonEnd: function() {
                                t.polygonEnd(), e.polygonEnd(), r.polygonEnd()
                            }
                        }
                    }, n.precision = function(t) {
                        return arguments.length ? (o.precision(t), u.precision(t), a.precision(t), n) : o.precision()
                    }, n.scale = function(t) {
                        return arguments.length ? (o.scale(t), u.scale(.35 * t), a.scale(t), n.translate(o.translate())) : o.scale()
                    }, n.translate = function(t) {
                        if (!arguments.length) return o.translate();
                        var l = o.scale(),
                            s = +t[0],
                            f = +t[1];
                        return e = o.translate(t).clipExtent([
                            [s - .455 * l, f - .238 * l],
                            [s + .455 * l, f + .238 * l]
                        ]).stream(c).point, r = u.translate([s - .307 * l, f + .201 * l]).clipExtent([
                            [s - .425 * l + Au, f + .12 * l + Au],
                            [s - .214 * l - Au, f + .234 * l - Au]
                        ]).stream(c).point, i = a.translate([s - .205 * l, f + .212 * l]).clipExtent([
                            [s - .214 * l + Au, f + .166 * l + Au],
                            [s - .115 * l - Au, f + .234 * l - Au]
                        ]).stream(c).point, n
                    }, n.scale(1070)
                };
                var Aa, Ca, za, Ta, La, qa, Ra = {
                        point: c,
                        lineStart: c,
                        lineEnd: c,
                        polygonStart: function() {
                            Ca = 0, Ra.lineStart = st
                        },
                        polygonEnd: function() {
                            Ra.lineStart = Ra.lineEnd = Ra.point = c, Aa += au(Ca / 2)
                        }
                    },
                    ja = {
                        point: ft,
                        lineStart: c,
                        lineEnd: c,
                        polygonStart: c,
                        polygonEnd: c
                    },
                    Da = {
                        point: gt,
                        lineStart: dt,
                        lineEnd: vt,
                        polygonStart: function() {
                            Da.lineStart = yt
                        },
                        polygonEnd: function() {
                            Da.point = gt, Da.lineStart = dt, Da.lineEnd = vt
                        }
                    };
                Wo.geo.path = function() {
                    function n(n) {
                        return n && ("function" == typeof a && o.pointRadius(+a.apply(this, arguments)), u && u.valid || (u = i(o)), Wo.geo.stream(n, u)), o.result()
                    }

                    function t() {
                        return u = null, n
                    }
                    var e, r, i, o, u, a = 4.5;
                    return n.area = function(n) {
                        return Aa = 0, Wo.geo.stream(n, i(Ra)), Aa
                    }, n.centroid = function(n) {
                        return va = ya = ma = xa = _a = Ma = ba = wa = ka = 0, Wo.geo.stream(n, i(Da)), ka ? [ba / ka, wa / ka] : Ma ? [xa / Ma, _a / Ma] : ma ? [va / ma, ya / ma] : [NaN, NaN]
                    }, n.bounds = function(n) {
                        return La = qa = -(za = Ta = 1 / 0), Wo.geo.stream(n, i(ja)), [
                            [za, Ta],
                            [La, qa]
                        ]
                    }, n.projection = function(n) {
                        return arguments.length ? (i = (e = n) ? n.stream || _t(n) : yn, t()) : e
                    }, n.context = function(n) {
                        return arguments.length ? (o = null == (r = n) ? new ht : new mt(n), "function" != typeof a && o.pointRadius(a), t()) : r
                    }, n.pointRadius = function(t) {
                        return arguments.length ? (a = "function" == typeof t ? t : (o.pointRadius(+t), +t), n) : a
                    }, n.projection(Wo.geo.albersUsa()).context(null)
                }, Wo.geo.transform = function(n) {
                    return {
                        stream: function(t) {
                            var e = new Mt(t);
                            for (var r in n) e[r] = n[r];
                            return e
                        }
                    }
                }, Mt.prototype = {
                    point: function(n, t) {
                        this.stream.point(n, t)
                    },
                    sphere: function() {
                        this.stream.sphere()
                    },
                    lineStart: function() {
                        this.stream.lineStart()
                    },
                    lineEnd: function() {
                        this.stream.lineEnd()
                    },
                    polygonStart: function() {
                        this.stream.polygonStart()
                    },
                    polygonEnd: function() {
                        this.stream.polygonEnd()
                    }
                }, Wo.geo.projection = wt, Wo.geo.projectionMutator = kt, (Wo.geo.equirectangular = function() {
                    return wt(Et)
                }).raw = Et.invert = Et, Wo.geo.rotation = function(n) {
                    function t(t) {
                        return t = n(t[0] * zu, t[1] * zu), t[0] *= Tu, t[1] *= Tu, t
                    }
                    return n = At(n[0] % 360 * zu, n[1] * zu, n.length > 2 ? n[2] * zu : 0), t.invert = function(t) {
                        return t = n.invert(t[0] * zu, t[1] * zu), t[0] *= Tu, t[1] *= Tu, t
                    }, t
                }, Nt.invert = Et, Wo.geo.circle = function() {
                    function n() {
                        var n = "function" == typeof r ? r.apply(this, arguments) : r,
                            t = At(-n[0] * zu, -n[1] * zu, 0).invert,
                            i = [];
                        return e(null, null, 1, {
                            point: function(n, e) {
                                i.push(n = t(n, e)), n[0] *= Tu, n[1] *= Tu
                            }
                        }), {
                            type: "Polygon",
                            coordinates: [i]
                        }
                    }
                    var t, e, r = [0, 0],
                        i = 6;
                    return n.origin = function(t) {
                        return arguments.length ? (r = t, n) : r
                    }, n.angle = function(r) {
                        return arguments.length ? (e = Lt((t = +r) * zu, i * zu), n) : t
                    }, n.precision = function(r) {
                        return arguments.length ? (e = Lt(t * zu, (i = +r) * zu), n) : i
                    }, n.angle(90)
                }, Wo.geo.distance = function(n, t) {
                    var e, r = (t[0] - n[0]) * zu,
                        i = n[1] * zu,
                        o = t[1] * zu,
                        u = Math.sin(r),
                        a = Math.cos(r),
                        c = Math.sin(i),
                        l = Math.cos(i),
                        s = Math.sin(o),
                        f = Math.cos(o);
                    return Math.atan2(Math.sqrt((e = f * u) * e + (e = l * s - c * f * a) * e), c * s + l * f * a)
                }, Wo.geo.graticule = function() {
                    function n() {
                        return {
                            type: "MultiLineString",
                            coordinates: t()
                        }
                    }

                    function t() {
                        return Wo.range(Math.ceil(o / v) * v, i, v).map(h).concat(Wo.range(Math.ceil(l / y) * y, c, y).map(p)).concat(Wo.range(Math.ceil(r / g) * g, e, g).filter(function(n) {
                            return au(n % v) > Au
                        }).map(s)).concat(Wo.range(Math.ceil(a / d) * d, u, d).filter(function(n) {
                            return au(n % y) > Au
                        }).map(f))
                    }
                    var e, r, i, o, u, a, c, l, s, f, h, p, g = 10,
                        d = g,
                        v = 90,
                        y = 360,
                        m = 2.5;
                    return n.lines = function() {
                        return t().map(function(n) {
                            return {
                                type: "LineString",
                                coordinates: n
                            }
                        })
                    }, n.outline = function() {
                        return {
                            type: "Polygon",
                            coordinates: [h(o).concat(p(c).slice(1), h(i).reverse().slice(1), p(l).reverse().slice(1))]
                        }
                    }, n.extent = function(t) {
                        return arguments.length ? n.majorExtent(t).minorExtent(t) : n.minorExtent()
                    }, n.majorExtent = function(t) {
                        return arguments.length ? (o = +t[0][0], i = +t[1][0], l = +t[0][1], c = +t[1][1], o > i && (t = o, o = i, i = t), l > c && (t = l, l = c, c = t), n.precision(m)) : [
                            [o, l],
                            [i, c]
                        ]
                    }, n.minorExtent = function(t) {
                        return arguments.length ? (r = +t[0][0], e = +t[1][0], a = +t[0][1], u = +t[1][1], r > e && (t = r, r = e, e = t), a > u && (t = a, a = u, u = t), n.precision(m)) : [
                            [r, a],
                            [e, u]
                        ]
                    }, n.step = function(t) {
                        return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep()
                    }, n.majorStep = function(t) {
                        return arguments.length ? (v = +t[0], y = +t[1], n) : [v, y]
                    }, n.minorStep = function(t) {
                        return arguments.length ? (g = +t[0], d = +t[1], n) : [g, d]
                    }, n.precision = function(t) {
                        return arguments.length ? (m = +t, s = Rt(a, u, 90), f = jt(r, e, m), h = Rt(l, c, 90), p = jt(o, i, m), n) : m
                    }, n.majorExtent([
                        [-180, -90 + Au],
                        [180, 90 - Au]
                    ]).minorExtent([
                        [-180, -80 - Au],
                        [180, 80 + Au]
                    ])
                }, Wo.geo.greatArc = function() {
                    function n() {
                        return {
                            type: "LineString",
                            coordinates: [t || r.apply(this, arguments), e || i.apply(this, arguments)]
                        }
                    }
                    var t, e, r = Dt,
                        i = Pt;
                    return n.distance = function() {
                        return Wo.geo.distance(t || r.apply(this, arguments), e || i.apply(this, arguments))
                    }, n.source = function(e) {
                        return arguments.length ? (r = e, t = "function" == typeof e ? null : e, n) : r
                    }, n.target = function(t) {
                        return arguments.length ? (i = t, e = "function" == typeof t ? null : t, n) : i
                    }, n.precision = function() {
                        return arguments.length ? n : 0
                    }, n
                }, Wo.geo.interpolate = function(n, t) {
                    return Ut(n[0] * zu, n[1] * zu, t[0] * zu, t[1] * zu)
                }, Wo.geo.length = function(n) {
                    return Pa = 0, Wo.geo.stream(n, Ua), Pa
                };
                var Pa, Ua = {
                        sphere: c,
                        point: c,
                        lineStart: Ot,
                        lineEnd: c,
                        polygonStart: c,
                        polygonEnd: c
                    },
                    Oa = Ft(function(n) {
                        return Math.sqrt(2 / (1 + n))
                    }, function(n) {
                        return 2 * Math.asin(n / 2)
                    });
                (Wo.geo.azimuthalEqualArea = function() {
                    return wt(Oa)
                }).raw = Oa;
                var Fa = Ft(function(n) {
                    var t = Math.acos(n);
                    return t && t / Math.sin(t)
                }, yn);
                (Wo.geo.azimuthalEquidistant = function() {
                    return wt(Fa)
                }).raw = Fa, (Wo.geo.conicConformal = function() {
                    return ct(Ht)
                }).raw = Ht, (Wo.geo.conicEquidistant = function() {
                    return ct(It)
                }).raw = It;
                var Ha = Ft(function(n) {
                    return 1 / n
                }, Math.atan);
                (Wo.geo.gnomonic = function() {
                    return wt(Ha)
                }).raw = Ha, Yt.invert = function(n, t) {
                    return [n, 2 * Math.atan(Math.exp(t)) - Nu]
                }, (Wo.geo.mercator = function() {
                    return Zt(Yt)
                }).raw = Yt;
                var Ia = Ft(function() {
                    return 1
                }, Math.asin);
                (Wo.geo.orthographic = function() {
                    return wt(Ia)
                }).raw = Ia;
                var Ya = Ft(function(n) {
                    return 1 / (1 + n)
                }, function(n) {
                    return 2 * Math.atan(n)
                });
                (Wo.geo.stereographic = function() {
                    return wt(Ya)
                }).raw = Ya, Vt.invert = function(n, t) {
                    return [-t, 2 * Math.atan(Math.exp(n)) - Nu]
                }, (Wo.geo.transverseMercator = function() {
                    var n = Zt(Vt),
                        t = n.center,
                        e = n.rotate;
                    return n.center = function(n) {
                        return n ? t([-n[1], n[0]]) : (n = t(), [-n[1], n[0]])
                    }, n.rotate = function(n) {
                        return n ? e([n[0], n[1], n.length > 2 ? n[2] + 90 : 90]) : (n = e(), [n[0], n[1], n[2] - 90])
                    }, n.rotate([0, 0])
                }).raw = Vt, Wo.geom = {}, Wo.geom.hull = function(n) {
                    function t(n) {
                        if (n.length < 3) return [];
                        var t, i, o, u, a, c, l, s, f, h, p, g, d = vn(e),
                            v = vn(r),
                            y = n.length,
                            m = y - 1,
                            x = [],
                            _ = [],
                            M = 0;
                        if (d === Bt && r === Xt) t = n;
                        else
                            for (o = 0, t = []; o < y; ++o) t.push([+d.call(this, i = n[o], o), +v.call(this, i, o)]);
                        for (o = 1; o < y; ++o)(t[o][1] < t[M][1] || t[o][1] == t[M][1] && t[o][0] < t[M][0]) && (M = o);
                        for (o = 0; o < y; ++o) o !== M && (c = t[o][1] - t[M][1], a = t[o][0] - t[M][0], x.push({
                            angle: Math.atan2(c, a),
                            index: o
                        }));
                        for (x.sort(function(n, t) {
                                return n.angle - t.angle
                            }), p = x[0].angle, h = x[0].index, f = 0, o = 1; o < m; ++o) {
                            if (u = x[o].index, p == x[o].angle) {
                                if (a = t[h][0] - t[M][0], c = t[h][1] - t[M][1], l = t[u][0] - t[M][0], s = t[u][1] - t[M][1], a * a + c * c >= l * l + s * s) {
                                    x[o].index = -1;
                                    continue
                                }
                                x[f].index = -1
                            }
                            p = x[o].angle, f = o, h = u
                        }
                        for (_.push(M), o = 0, u = 0; o < 2; ++u) x[u].index > -1 && (_.push(x[u].index), o++);
                        for (g = _.length; u < m; ++u)
                            if (!(x[u].index < 0)) {
                                for (; !$t(_[g - 2], _[g - 1], x[u].index, t);) --g;
                                _[g++] = x[u].index
                            }
                        var b = [];
                        for (o = g - 1; o >= 0; --o) b.push(n[_[o]]);
                        return b
                    }
                    var e = Bt,
                        r = Xt;
                    return arguments.length ? t(n) : (t.x = function(n) {
                        return arguments.length ? (e = n, t) : e
                    }, t.y = function(n) {
                        return arguments.length ? (r = n, t) : r
                    }, t)
                }, Wo.geom.polygon = function(n) {
                    return hu(n, Za), n
                };
                var Za = Wo.geom.polygon.prototype = [];
                Za.area = function() {
                    for (var n, t = -1, e = this.length, r = this[e - 1], i = 0; ++t < e;) n = r, r = this[t], i += n[1] * r[0] - n[0] * r[1];
                    return .5 * i
                }, Za.centroid = function(n) {
                    var t, e, r = -1,
                        i = this.length,
                        o = 0,
                        u = 0,
                        a = this[i - 1];
                    for (arguments.length || (n = -1 / (6 * this.area())); ++r < i;) t = a, a = this[r], e = t[0] * a[1] - a[0] * t[1], o += (t[0] + a[0]) * e, u += (t[1] + a[1]) * e;
                    return [o * n, u * n]
                }, Za.clip = function(n) {
                    for (var t, e, r, i, o, u, a = Jt(n), c = -1, l = this.length - Jt(this), s = this[l - 1]; ++c < l;) {
                        for (t = n.slice(), n.length = 0, i = this[c], o = t[(r = t.length - a) - 1], e = -1; ++e < r;) u = t[e], Wt(u, s, i) ? (Wt(o, s, i) || n.push(Gt(o, u, s, i)), n.push(u)) : Wt(o, s, i) && n.push(Gt(o, u, s, i)), o = u;
                        a && n.push(n[0]), s = i
                    }
                    return n
                };
                var Va, Ba, Xa, $a, Wa, Ga = [],
                    Ja = [];
                oe.prototype.prepare = function() {
                    for (var n, t = this.edges, e = t.length; e--;) n = t[e].edge, n.b && n.a || t.splice(e, 1);
                    return t.sort(ae), t.length
                }, ye.prototype = {
                    start: function() {
                        return this.edge.l === this.site ? this.edge.a : this.edge.b
                    },
                    end: function() {
                        return this.edge.l === this.site ? this.edge.b : this.edge.a
                    }
                }, me.prototype = {
                    insert: function(n, t) {
                        var e, r, i;
                        if (n) {
                            if (t.P = n, t.N = n.N, n.N && (n.N.P = t), n.N = t, n.R) {
                                for (n = n.R; n.L;) n = n.L;
                                n.L = t
                            } else n.R = t;
                            e = n
                        } else this._ ? (n = be(this._), t.P = null, t.N = n, n.P = n.L = t, e = n) : (t.P = t.N = null, this._ = t, e = null);
                        for (t.L = t.R = null, t.U = e, t.C = !0, n = t; e && e.C;) r = e.U, e === r.L ? (i = r.R, i && i.C ? (e.C = i.C = !1, r.C = !0, n = r) : (n === e.R && (_e(this, e), n = e, e = n.U), e.C = !1, r.C = !0, Me(this, r))) : (i = r.L, i && i.C ? (e.C = i.C = !1, r.C = !0, n = r) : (n === e.L && (Me(this, e), n = e, e = n.U), e.C = !1, r.C = !0, _e(this, r))), e = n.U;
                        this._.C = !1
                    },
                    remove: function(n) {
                        n.N && (n.N.P = n.P), n.P && (n.P.N = n.N), n.N = n.P = null;
                        var t, e, r, i = n.U,
                            o = n.L,
                            u = n.R;
                        if (e = o ? u ? be(u) : o : u, i ? i.L === n ? i.L = e : i.R = e : this._ = e, o && u ? (r = e.C, e.C = n.C, e.L = o, o.U = e, e !== u ? (i = e.U, e.U = n.U, n = e.R, i.L = n, e.R = u, u.U = e) : (e.U = i, i = e, n = e.R)) : (r = n.C, n = e), n && (n.U = i), !r) {
                            if (n && n.C) return void(n.C = !1);
                            do {
                                if (n === this._) break;
                                if (n === i.L) {
                                    if (t = i.R, t.C && (t.C = !1, i.C = !0, _e(this, i), t = i.R), t.L && t.L.C || t.R && t.R.C) {
                                        t.R && t.R.C || (t.L.C = !1, t.C = !0, Me(this, t), t = i.R), t.C = i.C, i.C = t.R.C = !1, _e(this, i), n = this._;
                                        break
                                    }
                                } else if (t = i.L, t.C && (t.C = !1, i.C = !0, Me(this, i), t = i.L), t.L && t.L.C || t.R && t.R.C) {
                                    t.L && t.L.C || (t.R.C = !1, t.C = !0, _e(this, t), t = i.L), t.C = i.C, i.C = t.L.C = !1, Me(this, i), n = this._;
                                    break
                                }
                                t.C = !0, n = i, i = i.U
                            } while (!n.C);
                            n && (n.C = !1)
                        }
                    }
                }, Wo.geom.voronoi = function(n) {
                    function t(n) {
                        var t = new Array(n.length),
                            r = a[0][0],
                            i = a[0][1],
                            o = a[1][0],
                            u = a[1][1];
                        return we(e(n), a).cells.forEach(function(e, a) {
                            var c = e.edges,
                                l = e.site,
                                s = t[a] = c.length ? c.map(function(n) {
                                    var t = n.start();
                                    return [t.x, t.y]
                                }) : l.x >= r && l.x <= o && l.y >= i && l.y <= u ? [
                                    [r, u],
                                    [o, u],
                                    [o, i],
                                    [r, i]
                                ] : [];
                            s.point = n[a]
                        }), t
                    }

                    function e(n) {
                        return n.map(function(n, t) {
                            return {
                                x: Math.round(o(n, t) / Au) * Au,
                                y: Math.round(u(n, t) / Au) * Au,
                                i: t
                            }
                        })
                    }
                    var r = Bt,
                        i = Xt,
                        o = r,
                        u = i,
                        a = Ka;
                    return n ? t(n) : (t.links = function(n) {
                        return we(e(n)).edges.filter(function(n) {
                            return n.l && n.r
                        }).map(function(t) {
                            return {
                                source: n[t.l.i],
                                target: n[t.r.i]
                            }
                        })
                    }, t.triangles = function(n) {
                        var t = [];
                        return we(e(n)).cells.forEach(function(e, r) {
                            for (var i, o, u = e.site, a = e.edges.sort(ae), c = -1, l = a.length, s = a[l - 1].edge, f = s.l === u ? s.r : s.l; ++c < l;) i = s, o = f, s = a[c].edge, f = s.l === u ? s.r : s.l, r < o.i && r < f.i && Se(u, o, f) < 0 && t.push([n[r], n[o.i], n[f.i]])
                        }), t
                    }, t.x = function(n) {
                        return arguments.length ? (o = vn(r = n), t) : r
                    }, t.y = function(n) {
                        return arguments.length ? (u = vn(i = n), t) : i
                    }, t.clipExtent = function(n) {
                        return arguments.length ? (a = null == n ? Ka : n, t) : a === Ka ? null : a
                    }, t.size = function(n) {
                        return arguments.length ? t.clipExtent(n && [
                            [0, 0], n
                        ]) : a === Ka ? null : a && a[1]
                    }, t)
                };
                var Ka = [
                    [-1e6, -1e6],
                    [1e6, 1e6]
                ];
                Wo.geom.delaunay = function(n) {
                    return Wo.geom.voronoi().triangles(n)
                }, Wo.geom.quadtree = function(n, t, e, r, i) {
                    function o(n) {
                        function o(n, t, e, r, i, o, u, a) {
                            if (!isNaN(e) && !isNaN(r))
                                if (n.leaf) {
                                    var c = n.x,
                                        s = n.y;
                                    if (null != c)
                                        if (au(c - e) + au(s - r) < .01) l(n, t, e, r, i, o, u, a);
                                        else {
                                            var f = n.point;
                                            n.x = n.y = n.point = null, l(n, f, c, s, i, o, u, a), l(n, t, e, r, i, o, u, a)
                                        }
                                    else n.x = e, n.y = r, n.point = t
                                } else l(n, t, e, r, i, o, u, a)
                        }

                        function l(n, t, e, r, i, u, a, c) {
                            var l = .5 * (i + a),
                                s = .5 * (u + c),
                                f = e >= l,
                                h = r >= s,
                                p = (h << 1) + f;
                            n.leaf = !1, n = n.nodes[p] || (n.nodes[p] = Ae()), f ? i = l : a = l, h ? u = s : c = s, o(n, t, e, r, i, u, a, c)
                        }
                        var s, f, h, p, g, d, v, y, m, x = vn(a),
                            _ = vn(c);
                        if (null != t) d = t, v = e, y = r, m = i;
                        else if (y = m = -(d = v = 1 / 0), f = [], h = [], g = n.length, u)
                            for (p = 0; p < g; ++p) s = n[p], s.x < d && (d = s.x), s.y < v && (v = s.y), s.x > y && (y = s.x), s.y > m && (m = s.y), f.push(s.x), h.push(s.y);
                        else
                            for (p = 0; p < g; ++p) {
                                var M = +x(s = n[p], p),
                                    b = +_(s, p);
                                M < d && (d = M), b < v && (v = b), M > y && (y = M), b > m && (m = b), f.push(M), h.push(b)
                            }
                        var w = y - d,
                            k = m - v;
                        w > k ? m = v + w : y = d + k;
                        var S = Ae();
                        if (S.add = function(n) {
                                o(S, n, +x(n, ++p), +_(n, p), d, v, y, m)
                            }, S.visit = function(n) {
                                Ce(n, S, d, v, y, m)
                            }, p = -1, null == t) {
                            for (; ++p < g;) o(S, n[p], f[p], h[p], d, v, y, m);
                            --p
                        } else n.forEach(S.add);
                        return f = h = n = s = null, S
                    }
                    var u, a = Bt,
                        c = Xt;
                    return (u = arguments.length) ? (a = Ee, c = Ne, 3 === u && (i = e, r = t, e = t = 0), o(n)) : (o.x = function(n) {
                        return arguments.length ? (a = n, o) : a
                    }, o.y = function(n) {
                        return arguments.length ? (c = n, o) : c
                    }, o.extent = function(n) {
                        return arguments.length ? (null == n ? t = e = r = i = null : (t = +n[0][0], e = +n[0][1], r = +n[1][0], i = +n[1][1]), o) : null == t ? null : [
                            [t, e],
                            [r, i]
                        ]
                    }, o.size = function(n) {
                        return arguments.length ? (null == n ? t = e = r = i = null : (t = e = 0, r = +n[0], i = +n[1]), o) : null == t ? null : [r - t, i - e]
                    }, o)
                }, Wo.interpolateRgb = ze, Wo.interpolateObject = Te, Wo.interpolateNumber = Le, Wo.interpolateString = qe;
                var Qa = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
                Wo.interpolate = Re, Wo.interpolators = [function(n, t) {
                    var e = typeof t;
                    return ("string" === e ? Bu.has(t) || /^(#|rgb\(|hsl\()/.test(t) ? ze : qe : t instanceof V ? ze : "object" === e ? Array.isArray(t) ? je : Te : Le)(n, t)
                }], Wo.interpolateArray = je;
                var nc = function() {
                        return yn
                    },
                    tc = Wo.map({
                        linear: nc,
                        poly: Ie,
                        quad: function() {
                            return Oe
                        },
                        cubic: function() {
                            return Fe
                        },
                        sin: function() {
                            return Ye
                        },
                        exp: function() {
                            return Ze
                        },
                        circle: function() {
                            return Ve
                        },
                        elastic: Be,
                        back: Xe,
                        bounce: function() {
                            return $e
                        }
                    }),
                    ec = Wo.map({ in: yn,
                        out: Pe,
                        "in-out": Ue,
                        "out-in": function(n) {
                            return Ue(Pe(n))
                        }
                    });
                Wo.ease = function(n) {
                    var t = n.indexOf("-"),
                        e = t >= 0 ? n.substring(0, t) : n,
                        r = t >= 0 ? n.substring(t + 1) : "in";
                    return e = tc.get(e) || nc, r = ec.get(r) || yn, De(r(e.apply(null, Go.call(arguments, 1))))
                }, Wo.interpolateHcl = We, Wo.interpolateHsl = Ge, Wo.interpolateLab = Je, Wo.interpolateRound = Ke, Wo.transform = function(n) {
                    var t = Ko.createElementNS(Wo.ns.prefix.svg, "g");
                    return (Wo.transform = function(n) {
                        if (null != n) {
                            t.setAttribute("transform", n);
                            var e = t.transform.baseVal.consolidate()
                        }
                        return new Qe(e ? e.matrix : rc)
                    })(n)
                }, Qe.prototype.toString = function() {
                    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
                };
                var rc = {
                    a: 1,
                    b: 0,
                    c: 0,
                    d: 1,
                    e: 0,
                    f: 0
                };
                Wo.interpolateTransform = rr, Wo.layout = {}, Wo.layout.bundle = function() {
                    return function(n) {
                        for (var t = [], e = -1, r = n.length; ++e < r;) t.push(ur(n[e]));
                        return t
                    }
                }, Wo.layout.chord = function() {
                    function n() {
                        var n, l, f, h, p, g = {},
                            d = [],
                            v = Wo.range(o),
                            y = [];
                        for (e = [], r = [], n = 0, h = -1; ++h < o;) {
                            for (l = 0, p = -1; ++p < o;) l += i[h][p];
                            d.push(l), y.push(Wo.range(o)), n += l
                        }
                        for (u && v.sort(function(n, t) {
                                return u(d[n], d[t])
                            }), a && y.forEach(function(n, t) {
                                n.sort(function(n, e) {
                                    return a(i[t][n], i[t][e])
                                })
                            }), n = (Eu - s * o) / n, l = 0, h = -1; ++h < o;) {
                            for (f = l, p = -1; ++p < o;) {
                                var m = v[h],
                                    x = y[m][p],
                                    _ = i[m][x],
                                    M = l,
                                    b = l += _ * n;
                                g[m + "-" + x] = {
                                    index: m,
                                    subindex: x,
                                    startAngle: M,
                                    endAngle: b,
                                    value: _
                                }
                            }
                            r[m] = {
                                index: m,
                                startAngle: f,
                                endAngle: l,
                                value: (l - f) / n
                            }, l += s
                        }
                        for (h = -1; ++h < o;)
                            for (p = h - 1; ++p < o;) {
                                var w = g[h + "-" + p],
                                    k = g[p + "-" + h];
                                (w.value || k.value) && e.push(w.value < k.value ? {
                                    source: k,
                                    target: w
                                } : {
                                    source: w,
                                    target: k
                                })
                            }
                        c && t()
                    }

                    function t() {
                        e.sort(function(n, t) {
                            return c((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2)
                        })
                    }
                    var e, r, i, o, u, a, c, l = {},
                        s = 0;
                    return l.matrix = function(n) {
                        return arguments.length ? (o = (i = n) && i.length, e = r = null, l) : i
                    }, l.padding = function(n) {
                        return arguments.length ? (s = n, e = r = null, l) : s
                    }, l.sortGroups = function(n) {
                        return arguments.length ? (u = n, e = r = null, l) : u
                    }, l.sortSubgroups = function(n) {
                        return arguments.length ? (a = n, e = null, l) : a
                    }, l.sortChords = function(n) {
                        return arguments.length ? (c = n, e && t(), l) : c
                    }, l.chords = function() {
                        return e || n(), e
                    }, l.groups = function() {
                        return r || n(), r
                    }, l
                }, Wo.layout.force = function() {
                    function n(n) {
                        return function(t, e, r, i) {
                            if (t.point !== n) {
                                var o = t.cx - n.x,
                                    u = t.cy - n.y,
                                    a = 1 / Math.sqrt(o * o + u * u);
                                if ((i - e) * a < d) {
                                    var c = t.charge * a * a;
                                    return n.px -= o * c, n.py -= u * c, !0
                                }
                                if (t.point && isFinite(a)) {
                                    var c = t.pointCharge * a * a;
                                    n.px -= o * c, n.py -= u * c
                                }
                            }
                            return !t.charge
                        }
                    }

                    function t(n) {
                        n.px = Wo.event.x, n.py = Wo.event.y, a.resume()
                    }
                    var e, r, i, o, u, a = {},
                        c = Wo.dispatch("start", "tick", "end"),
                        l = [1, 1],
                        s = .9,
                        f = ic,
                        h = oc,
                        p = -30,
                        g = .1,
                        d = .8,
                        v = [],
                        y = [];
                    return a.tick = function() {
                        if ((r *= .99) < .005) return c.end({
                            type: "end",
                            alpha: r = 0
                        }), !0;
                        var t, e, a, f, h, d, m, x, _, M = v.length,
                            b = y.length;
                        for (e = 0; e < b; ++e) a = y[e], f = a.source, h = a.target, x = h.x - f.x, _ = h.y - f.y, (d = x * x + _ * _) && (d = r * o[e] * ((d = Math.sqrt(d)) - i[e]) / d, x *= d, _ *= d, h.x -= x * (m = f.weight / (h.weight + f.weight)), h.y -= _ * m, f.x += x * (m = 1 - m), f.y += _ * m);
                        if ((m = r * g) && (x = l[0] / 2, _ = l[1] / 2, e = -1, m))
                            for (; ++e < M;) a = v[e], a.x += (x - a.x) * m, a.y += (_ - a.y) * m;
                        if (p)
                            for (pr(t = Wo.geom.quadtree(v), r, u), e = -1; ++e < M;)(a = v[e]).fixed || t.visit(n(a));
                        for (e = -1; ++e < M;) a = v[e], a.fixed ? (a.x = a.px, a.y = a.py) : (a.x -= (a.px - (a.px = a.x)) * s, a.y -= (a.py - (a.py = a.y)) * s);
                        c.tick({
                            type: "tick",
                            alpha: r
                        })
                    }, a.nodes = function(n) {
                        return arguments.length ? (v = n, a) : v
                    }, a.links = function(n) {
                        return arguments.length ? (y = n, a) : y
                    }, a.size = function(n) {
                        return arguments.length ? (l = n, a) : l
                    }, a.linkDistance = function(n) {
                        return arguments.length ? (f = "function" == typeof n ? n : +n, a) : f
                    }, a.distance = a.linkDistance, a.linkStrength = function(n) {
                        return arguments.length ? (h = "function" == typeof n ? n : +n, a) : h
                    }, a.friction = function(n) {
                        return arguments.length ? (s = +n, a) : s
                    }, a.charge = function(n) {
                        return arguments.length ? (p = "function" == typeof n ? n : +n, a) : p
                    }, a.gravity = function(n) {
                        return arguments.length ? (g = +n, a) : g
                    }, a.theta = function(n) {
                        return arguments.length ? (d = +n, a) : d
                    }, a.alpha = function(n) {
                        return arguments.length ? (n = +n, r ? r = n > 0 ? n : 0 : n > 0 && (c.start({
                            type: "start",
                            alpha: r = n
                        }), Wo.timer(a.tick)), a) : r
                    }, a.start = function() {
                        function n(n, r) {
                            if (!e) {
                                for (e = new Array(c), a = 0; a < c; ++a) e[a] = [];
                                for (a = 0; a < l; ++a) {
                                    var i = y[a];
                                    e[i.source.index].push(i.target), e[i.target.index].push(i.source)
                                }
                            }
                            for (var o, u = e[t], a = -1, l = u.length; ++a < l;)
                                if (!isNaN(o = u[a][n])) return o;
                            return Math.random() * r
                        }
                        var t, e, r, c = v.length,
                            s = y.length,
                            g = l[0],
                            d = l[1];
                        for (t = 0; t < c; ++t)(r = v[t]).index = t, r.weight = 0;
                        for (t = 0; t < s; ++t) r = y[t], "number" == typeof r.source && (r.source = v[r.source]), "number" == typeof r.target && (r.target = v[r.target]), ++r.source.weight, ++r.target.weight;
                        for (t = 0; t < c; ++t) r = v[t], isNaN(r.x) && (r.x = n("x", g)), isNaN(r.y) && (r.y = n("y", d)), isNaN(r.px) && (r.px = r.x), isNaN(r.py) && (r.py = r.y);
                        if (i = [], "function" == typeof f)
                            for (t = 0; t < s; ++t) i[t] = +f.call(this, y[t], t);
                        else
                            for (t = 0; t < s; ++t) i[t] = f;
                        if (o = [], "function" == typeof h)
                            for (t = 0; t < s; ++t) o[t] = +h.call(this, y[t], t);
                        else
                            for (t = 0; t < s; ++t) o[t] = h;
                        if (u = [], "function" == typeof p)
                            for (t = 0; t < c; ++t) u[t] = +p.call(this, v[t], t);
                        else
                            for (t = 0; t < c; ++t) u[t] = p;
                        return a.resume()
                    }, a.resume = function() {
                        return a.alpha(.1)
                    }, a.stop = function() {
                        return a.alpha(0)
                    }, a.drag = function() {
                        return e || (e = Wo.behavior.drag().origin(yn).on("dragstart.force", lr).on("drag.force", t).on("dragend.force", sr)), arguments.length ? void this.on("mouseover.force", fr).on("mouseout.force", hr).call(e) : e
                    }, Wo.rebind(a, c, "on")
                };
                var ic = 20,
                    oc = 1;
                Wo.layout.hierarchy = function() {
                    function n(t, u, a) {
                        var c = i.call(e, t, u);
                        if (t.depth = u, a.push(t), c && (l = c.length)) {
                            for (var l, s, f = -1, h = t.children = new Array(l), p = 0, g = u + 1; ++f < l;) s = h[f] = n(c[f], g, a), s.parent = t, p += s.value;
                            r && h.sort(r), o && (t.value = p)
                        } else delete t.children, o && (t.value = +o.call(e, t, u) || 0);
                        return t
                    }

                    function t(n, r) {
                        var i = n.children,
                            u = 0;
                        if (i && (a = i.length))
                            for (var a, c = -1, l = r + 1; ++c < a;) u += t(i[c], l);
                        else o && (u = +o.call(e, n, r) || 0);
                        return o && (n.value = u), u
                    }

                    function e(t) {
                        var e = [];
                        return n(t, 0, e), e
                    }
                    var r = yr,
                        i = dr,
                        o = vr;
                    return e.sort = function(n) {
                        return arguments.length ? (r = n, e) : r
                    }, e.children = function(n) {
                        return arguments.length ? (i = n, e) : i
                    }, e.value = function(n) {
                        return arguments.length ? (o = n, e) : o
                    }, e.revalue = function(n) {
                        return t(n, 0), n
                    }, e
                }, Wo.layout.partition = function() {
                    function n(t, e, r, i) {
                        var o = t.children;
                        if (t.x = e, t.y = t.depth * i, t.dx = r, t.dy = i, o && (u = o.length)) {
                            var u, a, c, l = -1;
                            for (r = t.value ? r / t.value : 0; ++l < u;) n(a = o[l], e, c = a.value * r, i), e += c
                        }
                    }

                    function t(n) {
                        var e = n.children,
                            r = 0;
                        if (e && (i = e.length))
                            for (var i, o = -1; ++o < i;) r = Math.max(r, t(e[o]));
                        return 1 + r
                    }

                    function e(e, o) {
                        var u = r.call(this, e, o);
                        return n(u[0], 0, i[0], i[1] / t(u[0])), u
                    }
                    var r = Wo.layout.hierarchy(),
                        i = [1, 1];
                    return e.size = function(n) {
                        return arguments.length ? (i = n, e) : i
                    }, gr(e, r)
                }, Wo.layout.pie = function() {
                    function n(o) {
                        var u = o.map(function(e, r) {
                                return +t.call(n, e, r)
                            }),
                            a = +("function" == typeof r ? r.apply(this, arguments) : r),
                            c = (("function" == typeof i ? i.apply(this, arguments) : i) - a) / Wo.sum(u),
                            l = Wo.range(o.length);
                        null != e && l.sort(e === uc ? function(n, t) {
                            return u[t] - u[n]
                        } : function(n, t) {
                            return e(o[n], o[t])
                        });
                        var s = [];
                        return l.forEach(function(n) {
                            var t;
                            s[n] = {
                                data: o[n],
                                value: t = u[n],
                                startAngle: a,
                                endAngle: a += t * c
                            }
                        }), s
                    }
                    var t = Number,
                        e = uc,
                        r = 0,
                        i = Eu;
                    return n.value = function(e) {
                        return arguments.length ? (t = e, n) : t
                    }, n.sort = function(t) {
                        return arguments.length ? (e = t, n) : e
                    }, n.startAngle = function(t) {
                        return arguments.length ? (r = t, n) : r
                    }, n.endAngle = function(t) {
                        return arguments.length ? (i = t, n) : i
                    }, n
                };
                var uc = {};
                Wo.layout.stack = function() {
                    function n(a, c) {
                        var l = a.map(function(e, r) {
                                return t.call(n, e, r)
                            }),
                            s = l.map(function(t) {
                                return t.map(function(t, e) {
                                    return [o.call(n, t, e), u.call(n, t, e)]
                                })
                            }),
                            f = e.call(n, s, c);
                        l = Wo.permute(l, f), s = Wo.permute(s, f);
                        var h, p, g, d = r.call(n, s, c),
                            v = l.length,
                            y = l[0].length;
                        for (p = 0; p < y; ++p)
                            for (i.call(n, l[0][p], g = d[p], s[0][p][1]), h = 1; h < v; ++h) i.call(n, l[h][p], g += s[h - 1][p][1], s[h][p][1]);
                        return a
                    }
                    var t = yn,
                        e = br,
                        r = wr,
                        i = Mr,
                        o = xr,
                        u = _r;
                    return n.values = function(e) {
                        return arguments.length ? (t = e, n) : t
                    }, n.order = function(t) {
                        return arguments.length ? (e = "function" == typeof t ? t : ac.get(t) || br, n) : e
                    }, n.offset = function(t) {
                        return arguments.length ? (r = "function" == typeof t ? t : cc.get(t) || wr, n) : r
                    }, n.x = function(t) {
                        return arguments.length ? (o = t, n) : o
                    }, n.y = function(t) {
                        return arguments.length ? (u = t, n) : u
                    }, n.out = function(t) {
                        return arguments.length ? (i = t, n) : i
                    }, n
                };
                var ac = Wo.map({
                        "inside-out": function(n) {
                            var t, e, r = n.length,
                                i = n.map(kr),
                                o = n.map(Sr),
                                u = Wo.range(r).sort(function(n, t) {
                                    return i[n] - i[t]
                                }),
                                a = 0,
                                c = 0,
                                l = [],
                                s = [];
                            for (t = 0; t < r; ++t) e = u[t], a < c ? (a += o[e], l.push(e)) : (c += o[e], s.push(e));
                            return s.reverse().concat(l)
                        },
                        reverse: function(n) {
                            return Wo.range(n.length).reverse()
                        },
                        default: br
                    }),
                    cc = Wo.map({
                        silhouette: function(n) {
                            var t, e, r, i = n.length,
                                o = n[0].length,
                                u = [],
                                a = 0,
                                c = [];
                            for (e = 0; e < o; ++e) {
                                for (t = 0, r = 0; t < i; t++) r += n[t][e][1];
                                r > a && (a = r), u.push(r)
                            }
                            for (e = 0; e < o; ++e) c[e] = (a - u[e]) / 2;
                            return c
                        },
                        wiggle: function(n) {
                            var t, e, r, i, o, u, a, c, l, s = n.length,
                                f = n[0],
                                h = f.length,
                                p = [];
                            for (p[0] = c = l = 0, e = 1; e < h; ++e) {
                                for (t = 0, i = 0; t < s; ++t) i += n[t][e][1];
                                for (t = 0, o = 0, a = f[e][0] - f[e - 1][0]; t < s; ++t) {
                                    for (r = 0, u = (n[t][e][1] - n[t][e - 1][1]) / (2 * a); r < t; ++r) u += (n[r][e][1] - n[r][e - 1][1]) / a;
                                    o += u * n[t][e][1]
                                }
                                p[e] = c -= i ? o / i * a : 0, c < l && (l = c)
                            }
                            for (e = 0; e < h; ++e) p[e] -= l;
                            return p
                        },
                        expand: function(n) {
                            var t, e, r, i = n.length,
                                o = n[0].length,
                                u = 1 / i,
                                a = [];
                            for (e = 0; e < o; ++e) {
                                for (t = 0, r = 0; t < i; t++) r += n[t][e][1];
                                if (r)
                                    for (t = 0; t < i; t++) n[t][e][1] /= r;
                                else
                                    for (t = 0; t < i; t++) n[t][e][1] = u
                            }
                            for (e = 0; e < o; ++e) a[e] = 0;
                            return a
                        },
                        zero: wr
                    });
                Wo.layout.histogram = function() {
                    function n(n, o) {
                        for (var u, a, c = [], l = n.map(e, this), s = r.call(this, l, o), f = i.call(this, s, l, o), o = -1, h = l.length, p = f.length - 1, g = t ? 1 : 1 / h; ++o < p;) u = c[o] = [], u.dx = f[o + 1] - (u.x = f[o]), u.y = 0;
                        if (p > 0)
                            for (o = -1; ++o < h;) a = l[o], a >= s[0] && a <= s[1] && (u = c[Wo.bisect(f, a, 1, p) - 1], u.y += g, u.push(n[o]));
                        return c
                    }
                    var t = !0,
                        e = Number,
                        r = Cr,
                        i = Nr;
                    return n.value = function(t) {
                        return arguments.length ? (e = t, n) : e
                    }, n.range = function(t) {
                        return arguments.length ? (r = vn(t), n) : r
                    }, n.bins = function(t) {
                        return arguments.length ? (i = "number" == typeof t ? function(n) {
                            return Ar(n, t)
                        } : vn(t), n) : i
                    }, n.frequency = function(e) {
                        return arguments.length ? (t = !!e, n) : t
                    }, n
                }, Wo.layout.tree = function() {
                    function n(n, o) {
                        function u(n, t) {
                            var r = n.children,
                                i = n._tree;
                            if (r && (o = r.length)) {
                                for (var o, a, l, s = r[0], f = s, h = -1; ++h < o;) l = r[h], u(l, a), f = c(l, a, f), a = l;
                                Ur(n);
                                var p = .5 * (s._tree.prelim + l._tree.prelim);
                                t ? (i.prelim = t._tree.prelim + e(n, t), i.mod = i.prelim - p) : i.prelim = p
                            } else t && (i.prelim = t._tree.prelim + e(n, t))
                        }

                        function a(n, t) {
                            n.x = n._tree.prelim + t;
                            var e = n.children;
                            if (e && (r = e.length)) {
                                var r, i = -1;
                                for (t += n._tree.mod; ++i < r;) a(e[i], t)
                            }
                        }

                        function c(n, t, r) {
                            if (t) {
                                for (var i, o = n, u = n, a = t, c = n.parent.children[0], l = o._tree.mod, s = u._tree.mod, f = a._tree.mod, h = c._tree.mod; a = Lr(a), o = Tr(o), a && o;) c = Tr(c), u = Lr(u), u._tree.ancestor = n, i = a._tree.prelim + f - o._tree.prelim - l + e(a, o), i > 0 && (Or(Fr(a, n, r), n, i), l += i, s += i), f += a._tree.mod, l += o._tree.mod, h += c._tree.mod, s += u._tree.mod;
                                a && !Lr(u) && (u._tree.thread = a, u._tree.mod += f - s), o && !Tr(c) && (c._tree.thread = o, c._tree.mod += l - h, r = n)
                            }
                            return r
                        }
                        var l = t.call(this, n, o),
                            s = l[0];
                        Pr(s, function(n, t) {
                            n._tree = {
                                ancestor: n,
                                prelim: 0,
                                mod: 0,
                                change: 0,
                                shift: 0,
                                number: t ? t._tree.number + 1 : 0
                            }
                        }), u(s), a(s, -s._tree.prelim);
                        var f = qr(s, jr),
                            h = qr(s, Rr),
                            p = qr(s, Dr),
                            g = f.x - e(f, h) / 2,
                            d = h.x + e(h, f) / 2,
                            v = p.depth || 1;
                        return Pr(s, i ? function(n) {
                            n.x *= r[0], n.y = n.depth * r[1], delete n._tree
                        } : function(n) {
                            n.x = (n.x - g) / (d - g) * r[0], n.y = n.depth / v * r[1], delete n._tree
                        }), l
                    }
                    var t = Wo.layout.hierarchy().sort(null).value(null),
                        e = zr,
                        r = [1, 1],
                        i = !1;
                    return n.separation = function(t) {
                        return arguments.length ? (e = t, n) : e
                    }, n.size = function(t) {
                        return arguments.length ? (i = null == (r = t), n) : i ? null : r
                    }, n.nodeSize = function(t) {
                        return arguments.length ? (i = null != (r = t), n) : i ? r : null
                    }, gr(n, t)
                }, Wo.layout.pack = function() {
                    function n(n, o) {
                        var u = e.call(this, n, o),
                            a = u[0],
                            c = i[0],
                            l = i[1],
                            s = null == t ? Math.sqrt : "function" == typeof t ? t : function() {
                                return t
                            };
                        if (a.x = a.y = 0, Pr(a, function(n) {
                                n.r = +s(n.value)
                            }), Pr(a, Vr), r) {
                            var f = r * (t ? 1 : Math.max(2 * a.r / c, 2 * a.r / l)) / 2;
                            Pr(a, function(n) {
                                n.r += f
                            }), Pr(a, Vr), Pr(a, function(n) {
                                n.r -= f
                            })
                        }
                        return $r(a, c / 2, l / 2, t ? 1 : 1 / Math.max(2 * a.r / c, 2 * a.r / l)), u
                    }
                    var t, e = Wo.layout.hierarchy().sort(Hr),
                        r = 0,
                        i = [1, 1];
                    return n.size = function(t) {
                        return arguments.length ? (i = t, n) : i
                    }, n.radius = function(e) {
                        return arguments.length ? (t = null == e || "function" == typeof e ? e : +e, n) : t
                    }, n.padding = function(t) {
                        return arguments.length ? (r = +t, n) : r
                    }, gr(n, e)
                }, Wo.layout.cluster = function() {
                    function n(n, o) {
                        var u, a = t.call(this, n, o),
                            c = a[0],
                            l = 0;
                        Pr(c, function(n) {
                            var t = n.children;
                            t && t.length ? (n.x = Jr(t), n.y = Gr(t)) : (n.x = u ? l += e(n, u) : 0, n.y = 0, u = n)
                        });
                        var s = Kr(c),
                            f = Qr(c),
                            h = s.x - e(s, f) / 2,
                            p = f.x + e(f, s) / 2;
                        return Pr(c, i ? function(n) {
                            n.x = (n.x - c.x) * r[0], n.y = (c.y - n.y) * r[1]
                        } : function(n) {
                            n.x = (n.x - h) / (p - h) * r[0], n.y = (1 - (c.y ? n.y / c.y : 1)) * r[1]
                        }), a
                    }
                    var t = Wo.layout.hierarchy().sort(null).value(null),
                        e = zr,
                        r = [1, 1],
                        i = !1;
                    return n.separation = function(t) {
                        return arguments.length ? (e = t, n) : e
                    }, n.size = function(t) {
                        return arguments.length ? (i = null == (r = t), n) : i ? null : r
                    }, n.nodeSize = function(t) {
                        return arguments.length ? (i = null != (r = t), n) : i ? r : null
                    }, gr(n, t)
                }, Wo.layout.treemap = function() {
                    function n(n, t) {
                        for (var e, r, i = -1, o = n.length; ++i < o;) r = (e = n[i]).value * (t < 0 ? 0 : t), e.area = isNaN(r) || r <= 0 ? 0 : r
                    }

                    function t(e) {
                        var o = e.children;
                        if (o && o.length) {
                            var u, a, c, l = f(e),
                                s = [],
                                h = o.slice(),
                                g = 1 / 0,
                                d = "slice" === p ? l.dx : "dice" === p ? l.dy : "slice-dice" === p ? 1 & e.depth ? l.dy : l.dx : Math.min(l.dx, l.dy);
                            for (n(h, l.dx * l.dy / e.value), s.area = 0;
                                (c = h.length) > 0;) s.push(u = h[c - 1]), s.area += u.area, "squarify" !== p || (a = r(s, d)) <= g ? (h.pop(), g = a) : (s.area -= s.pop().area, i(s, d, l, !1), d = Math.min(l.dx, l.dy), s.length = s.area = 0, g = 1 / 0);
                            s.length && (i(s, d, l, !0), s.length = s.area = 0), o.forEach(t)
                        }
                    }

                    function e(t) {
                        var r = t.children;
                        if (r && r.length) {
                            var o, u = f(t),
                                a = r.slice(),
                                c = [];
                            for (n(a, u.dx * u.dy / t.value), c.area = 0; o = a.pop();) c.push(o), c.area += o.area, null != o.z && (i(c, o.z ? u.dx : u.dy, u, !a.length), c.length = c.area = 0);
                            r.forEach(e)
                        }
                    }

                    function r(n, t) {
                        for (var e, r = n.area, i = 0, o = 1 / 0, u = -1, a = n.length; ++u < a;)(e = n[u].area) && (e < o && (o = e), e > i && (i = e));
                        return r *= r, t *= t, r ? Math.max(t * i * g / r, r / (t * o * g)) : 1 / 0
                    }

                    function i(n, t, e, r) {
                        var i, o = -1,
                            u = n.length,
                            a = e.x,
                            l = e.y,
                            s = t ? c(n.area / t) : 0;
                        if (t == e.dx) {
                            for ((r || s > e.dy) && (s = e.dy); ++o < u;) i = n[o], i.x = a, i.y = l, i.dy = s, a += i.dx = Math.min(e.x + e.dx - a, s ? c(i.area / s) : 0);
                            i.z = !0, i.dx += e.x + e.dx - a, e.y += s, e.dy -= s
                        } else {
                            for ((r || s > e.dx) && (s = e.dx); ++o < u;) i = n[o], i.x = a, i.y = l, i.dx = s, l += i.dy = Math.min(e.y + e.dy - l, s ? c(i.area / s) : 0);
                            i.z = !1, i.dy += e.y + e.dy - l, e.x += s, e.dx -= s
                        }
                    }

                    function o(r) {
                        var i = u || a(r),
                            o = i[0];
                        return o.x = 0, o.y = 0, o.dx = l[0], o.dy = l[1], u && a.revalue(o), n([o], o.dx * o.dy / o.value), (u ? e : t)(o), h && (u = i), i
                    }
                    var u, a = Wo.layout.hierarchy(),
                        c = Math.round,
                        l = [1, 1],
                        s = null,
                        f = ni,
                        h = !1,
                        p = "squarify",
                        g = .5 * (1 + Math.sqrt(5));
                    return o.size = function(n) {
                        return arguments.length ? (l = n, o) : l
                    }, o.padding = function(n) {
                        function t(t) {
                            var e = n.call(o, t, t.depth);
                            return null == e ? ni(t) : ti(t, "number" == typeof e ? [e, e, e, e] : e)
                        }

                        function e(t) {
                            return ti(t, n)
                        }
                        if (!arguments.length) return s;
                        var r;
                        return f = null == (s = n) ? ni : "function" == (r = typeof n) ? t : "number" === r ? (n = [n, n, n, n], e) : e, o
                    }, o.round = function(n) {
                        return arguments.length ? (c = n ? Math.round : Number, o) : c != Number
                    }, o.sticky = function(n) {
                        return arguments.length ? (h = n, u = null, o) : h
                    }, o.ratio = function(n) {
                        return arguments.length ? (g = n, o) : g
                    }, o.mode = function(n) {
                        return arguments.length ? (p = n + "", o) : p
                    }, gr(o, a)
                }, Wo.random = {
                    normal: function(n, t) {
                        var e = arguments.length;
                        return e < 2 && (t = 1), e < 1 && (n = 0),
                            function() {
                                var e, r, i;
                                do e = 2 * Math.random() - 1, r = 2 * Math.random() - 1, i = e * e + r * r; while (!i || i > 1);
                                return n + t * e * Math.sqrt(-2 * Math.log(i) / i)
                            }
                    },
                    logNormal: function() {
                        var n = Wo.random.normal.apply(Wo, arguments);
                        return function() {
                            return Math.exp(n())
                        }
                    },
                    bates: function(n) {
                        var t = Wo.random.irwinHall(n);
                        return function() {
                            return t() / n
                        }
                    },
                    irwinHall: function(n) {
                        return function() {
                            for (var t = 0, e = 0; e < n; e++) t += Math.random();
                            return t
                        }
                    }
                }, Wo.scale = {};
                var lc = {
                    floor: yn,
                    ceil: yn
                };
                Wo.scale.linear = function() {
                    return ci([0, 1], [0, 1], Re, !1)
                };
                var sc = {
                    s: 1,
                    g: 1,
                    p: 1,
                    r: 1,
                    e: 1
                };
                Wo.scale.log = function() {
                    return vi(Wo.scale.linear().domain([0, 1]), 10, !0, [1, 10])
                };
                var fc = Wo.format(".0e"),
                    hc = {
                        floor: function(n) {
                            return -Math.ceil(-n)
                        },
                        ceil: function(n) {
                            return -Math.floor(-n)
                        }
                    };
                Wo.scale.pow = function() {
                    return yi(Wo.scale.linear(), 1, [0, 1])
                }, Wo.scale.sqrt = function() {
                    return Wo.scale.pow().exponent(.5)
                }, Wo.scale.ordinal = function() {
                    return xi([], {
                        t: "range",
                        a: [
                            []
                        ]
                    })
                }, Wo.scale.category10 = function() {
                    return Wo.scale.ordinal().range(pc)
                }, Wo.scale.category20 = function() {
                    return Wo.scale.ordinal().range(gc)
                }, Wo.scale.category20b = function() {
                    return Wo.scale.ordinal().range(dc)
                }, Wo.scale.category20c = function() {
                    return Wo.scale.ordinal().range(vc)
                };
                var pc = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(an),
                    gc = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(an),
                    dc = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(an),
                    vc = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(an);
                Wo.scale.quantile = function() {
                    return _i([], [])
                }, Wo.scale.quantize = function() {
                    return Mi(0, 1, [0, 1])
                }, Wo.scale.threshold = function() {
                    return bi([.5], [0, 1])
                }, Wo.scale.identity = function() {
                    return wi([0, 1])
                }, Wo.svg = {}, Wo.svg.arc = function() {
                    function n() {
                        var n = t.apply(this, arguments),
                            o = e.apply(this, arguments),
                            u = r.apply(this, arguments) + yc,
                            a = i.apply(this, arguments) + yc,
                            c = (a < u && (c = u, u = a, a = c), a - u),
                            l = c < Su ? "0" : "1",
                            s = Math.cos(u),
                            f = Math.sin(u),
                            h = Math.cos(a),
                            p = Math.sin(a);
                        return c >= mc ? n ? "M0," + o + "A" + o + "," + o + " 0 1,1 0," + -o + "A" + o + "," + o + " 0 1,1 0," + o + "M0," + n + "A" + n + "," + n + " 0 1,0 0," + -n + "A" + n + "," + n + " 0 1,0 0," + n + "Z" : "M0," + o + "A" + o + "," + o + " 0 1,1 0," + -o + "A" + o + "," + o + " 0 1,1 0," + o + "Z" : n ? "M" + o * s + "," + o * f + "A" + o + "," + o + " 0 " + l + ",1 " + o * h + "," + o * p + "L" + n * h + "," + n * p + "A" + n + "," + n + " 0 " + l + ",0 " + n * s + "," + n * f + "Z" : "M" + o * s + "," + o * f + "A" + o + "," + o + " 0 " + l + ",1 " + o * h + "," + o * p + "L0,0Z"
                    }
                    var t = ki,
                        e = Si,
                        r = Ei,
                        i = Ni;
                    return n.innerRadius = function(e) {
                        return arguments.length ? (t = vn(e), n) : t
                    }, n.outerRadius = function(t) {
                        return arguments.length ? (e = vn(t), n) : e
                    }, n.startAngle = function(t) {
                        return arguments.length ? (r = vn(t), n) : r
                    }, n.endAngle = function(t) {
                        return arguments.length ? (i = vn(t), n) : i
                    }, n.centroid = function() {
                        var n = (t.apply(this, arguments) + e.apply(this, arguments)) / 2,
                            o = (r.apply(this, arguments) + i.apply(this, arguments)) / 2 + yc;
                        return [Math.cos(o) * n, Math.sin(o) * n]
                    }, n
                };
                var yc = -Nu,
                    mc = Eu - Au;
                Wo.svg.line = function() {
                    return Ai(yn)
                };
                var xc = Wo.map({
                    linear: Ci,
                    "linear-closed": zi,
                    step: Ti,
                    "step-before": Li,
                    "step-after": qi,
                    basis: Oi,
                    "basis-open": Fi,
                    "basis-closed": Hi,
                    bundle: Ii,
                    cardinal: Di,
                    "cardinal-open": Ri,
                    "cardinal-closed": ji,
                    monotone: $i
                });
                xc.forEach(function(n, t) {
                    t.key = n, t.closed = /-closed$/.test(n)
                });
                var _c = [0, 2 / 3, 1 / 3, 0],
                    Mc = [0, 1 / 3, 2 / 3, 0],
                    bc = [0, 1 / 6, 2 / 3, 1 / 6];
                Wo.svg.line.radial = function() {
                    var n = Ai(Wi);
                    return n.radius = n.x, delete n.x, n.angle = n.y, delete n.y, n
                }, Li.reverse = qi, qi.reverse = Li, Wo.svg.area = function() {
                    return Gi(yn)
                }, Wo.svg.area.radial = function() {
                    var n = Gi(Wi);
                    return n.radius = n.x, delete n.x, n.innerRadius = n.x0, delete n.x0, n.outerRadius = n.x1, delete n.x1, n.angle = n.y, delete n.y, n.startAngle = n.y0, delete n.y0, n.endAngle = n.y1, delete n.y1, n
                }, Wo.svg.chord = function() {
                    function n(n, a) {
                        var c = t(this, o, n, a),
                            l = t(this, u, n, a);
                        return "M" + c.p0 + r(c.r, c.p1, c.a1 - c.a0) + (e(c, l) ? i(c.r, c.p1, c.r, c.p0) : i(c.r, c.p1, l.r, l.p0) + r(l.r, l.p1, l.a1 - l.a0) + i(l.r, l.p1, c.r, c.p0)) + "Z"
                    }

                    function t(n, t, e, r) {
                        var i = t.call(n, e, r),
                            o = a.call(n, i, r),
                            u = c.call(n, i, r) + yc,
                            s = l.call(n, i, r) + yc;
                        return {
                            r: o,
                            a0: u,
                            a1: s,
                            p0: [o * Math.cos(u), o * Math.sin(u)],
                            p1: [o * Math.cos(s), o * Math.sin(s)]
                        }
                    }

                    function e(n, t) {
                        return n.a0 == t.a0 && n.a1 == t.a1
                    }

                    function r(n, t, e) {
                        return "A" + n + "," + n + " 0 " + +(e > Su) + ",1 " + t
                    }

                    function i(n, t, e, r) {
                        return "Q 0,0 " + r
                    }
                    var o = Dt,
                        u = Pt,
                        a = Ji,
                        c = Ei,
                        l = Ni;
                    return n.radius = function(t) {
                        return arguments.length ? (a = vn(t), n) : a
                    }, n.source = function(t) {
                        return arguments.length ? (o = vn(t), n) : o
                    }, n.target = function(t) {
                        return arguments.length ? (u = vn(t), n) : u
                    }, n.startAngle = function(t) {
                        return arguments.length ? (c = vn(t), n) : c
                    }, n.endAngle = function(t) {
                        return arguments.length ? (l = vn(t), n) : l
                    }, n
                }, Wo.svg.diagonal = function() {
                    function n(n, i) {
                        var o = t.call(this, n, i),
                            u = e.call(this, n, i),
                            a = (o.y + u.y) / 2,
                            c = [o, {
                                x: o.x,
                                y: a
                            }, {
                                x: u.x,
                                y: a
                            }, u];
                        return c = c.map(r), "M" + c[0] + "C" + c[1] + " " + c[2] + " " + c[3]
                    }
                    var t = Dt,
                        e = Pt,
                        r = Ki;
                    return n.source = function(e) {
                        return arguments.length ? (t = vn(e), n) : t
                    }, n.target = function(t) {
                        return arguments.length ? (e = vn(t), n) : e
                    }, n.projection = function(t) {
                        return arguments.length ? (r = t, n) : r
                    }, n
                }, Wo.svg.diagonal.radial = function() {
                    var n = Wo.svg.diagonal(),
                        t = Ki,
                        e = n.projection;
                    return n.projection = function(n) {
                        return arguments.length ? e(Qi(t = n)) : t
                    }, n
                }, Wo.svg.symbol = function() {
                    function n(n, r) {
                        return (wc.get(t.call(this, n, r)) || eo)(e.call(this, n, r))
                    }
                    var t = to,
                        e = no;
                    return n.type = function(e) {
                        return arguments.length ? (t = vn(e), n) : t
                    }, n.size = function(t) {
                        return arguments.length ? (e = vn(t), n) : e
                    }, n
                };
                var wc = Wo.map({
                    circle: eo,
                    cross: function(n) {
                        var t = Math.sqrt(n / 5) / 2;
                        return "M" + -3 * t + "," + -t + "H" + -t + "V" + -3 * t + "H" + t + "V" + -t + "H" + 3 * t + "V" + t + "H" + t + "V" + 3 * t + "H" + -t + "V" + t + "H" + -3 * t + "Z"
                    },
                    diamond: function(n) {
                        var t = Math.sqrt(n / (2 * Nc)),
                            e = t * Nc;
                        return "M0," + -t + "L" + e + ",0 0," + t + " " + -e + ",0Z"
                    },
                    square: function(n) {
                        var t = Math.sqrt(n) / 2;
                        return "M" + -t + "," + -t + "L" + t + "," + -t + " " + t + "," + t + " " + -t + "," + t + "Z"
                    },
                    "triangle-down": function(n) {
                        var t = Math.sqrt(n / Ec),
                            e = t * Ec / 2;
                        return "M0," + e + "L" + t + "," + -e + " " + -t + "," + -e + "Z"
                    },
                    "triangle-up": function(n) {
                        var t = Math.sqrt(n / Ec),
                            e = t * Ec / 2;
                        return "M0," + -e + "L" + t + "," + e + " " + -t + "," + e + "Z"
                    }
                });
                Wo.svg.symbolTypes = wc.keys();
                var kc, Sc, Ec = Math.sqrt(3),
                    Nc = Math.tan(30 * zu),
                    Ac = [],
                    Cc = 0;
                Ac.call = yu.call, Ac.empty = yu.empty, Ac.node = yu.node, Ac.size = yu.size, Wo.transition = function(n) {
                    return arguments.length ? kc ? n.transition() : n : _u.transition()
                }, Wo.transition.prototype = Ac, Ac.select = function(n) {
                    var t, e, r, i = this.id,
                        o = [];
                    n = d(n);
                    for (var u = -1, a = this.length; ++u < a;) {
                        o.push(t = []);
                        for (var c = this[u], l = -1, s = c.length; ++l < s;)(r = c[l]) && (e = n.call(r, r.__data__, l, u)) ? ("__data__" in r && (e.__data__ = r.__data__), uo(e, l, i, r.__transition__[i]), t.push(e)) : t.push(null)
                    }
                    return ro(o, i)
                }, Ac.selectAll = function(n) {
                    var t, e, r, i, o, u = this.id,
                        a = [];
                    n = v(n);
                    for (var c = -1, l = this.length; ++c < l;)
                        for (var s = this[c], f = -1, h = s.length; ++f < h;)
                            if (r = s[f]) {
                                o = r.__transition__[u], e = n.call(r, r.__data__, f, c), a.push(t = []);
                                for (var p = -1, g = e.length; ++p < g;)(i = e[p]) && uo(i, p, u, o), t.push(i)
                            }
                    return ro(a, u)
                }, Ac.filter = function(n) {
                    var t, e, r, i = [];
                    "function" != typeof n && (n = N(n));
                    for (var o = 0, u = this.length; o < u; o++) {
                        i.push(t = []);
                        for (var e = this[o], a = 0, c = e.length; a < c; a++)(r = e[a]) && n.call(r, r.__data__, a, o) && t.push(r)
                    }
                    return ro(i, this.id)
                }, Ac.tween = function(n, t) {
                    var e = this.id;
                    return arguments.length < 2 ? this.node().__transition__[e].tween.get(n) : C(this, null == t ? function(t) {
                        t.__transition__[e].tween.remove(n)
                    } : function(r) {
                        r.__transition__[e].tween.set(n, t)
                    })
                }, Ac.attr = function(n, t) {
                    function e() {
                        this.removeAttribute(a)
                    }

                    function r() {
                        this.removeAttributeNS(a.space, a.local)
                    }

                    function i(n) {
                        return null == n ? e : (n += "", function() {
                            var t, e = this.getAttribute(a);
                            return e !== n && (t = u(e, n), function(n) {
                                this.setAttribute(a, t(n))
                            })
                        })
                    }

                    function o(n) {
                        return null == n ? r : (n += "", function() {
                            var t, e = this.getAttributeNS(a.space, a.local);
                            return e !== n && (t = u(e, n), function(n) {
                                this.setAttributeNS(a.space, a.local, t(n))
                            })
                        })
                    }
                    if (arguments.length < 2) {
                        for (t in n) this.attr(t, n[t]);
                        return this
                    }
                    var u = "transform" == n ? rr : Re,
                        a = Wo.ns.qualify(n);
                    return io(this, "attr." + n, t, a.local ? o : i)
                }, Ac.attrTween = function(n, t) {
                    function e(n, e) {
                        var r = t.call(this, n, e, this.getAttribute(i));
                        return r && function(n) {
                            this.setAttribute(i, r(n))
                        }
                    }

                    function r(n, e) {
                        var r = t.call(this, n, e, this.getAttributeNS(i.space, i.local));
                        return r && function(n) {
                            this.setAttributeNS(i.space, i.local, r(n))
                        }
                    }
                    var i = Wo.ns.qualify(n);
                    return this.tween("attr." + n, i.local ? r : e)
                }, Ac.style = function(n, t, e) {
                    function r() {
                        this.style.removeProperty(n)
                    }

                    function i(t) {
                        return null == t ? r : (t += "", function() {
                            var r, i = nu.getComputedStyle(this, null).getPropertyValue(n);
                            return i !== t && (r = Re(i, t), function(t) {
                                this.style.setProperty(n, r(t), e)
                            })
                        })
                    }
                    var o = arguments.length;
                    if (o < 3) {
                        if ("string" != typeof n) {
                            o < 2 && (t = "");
                            for (e in n) this.style(e, n[e], t);
                            return this
                        }
                        e = ""
                    }
                    return io(this, "style." + n, t, i)
                }, Ac.styleTween = function(n, t, e) {
                    function r(r, i) {
                        var o = t.call(this, r, i, nu.getComputedStyle(this, null).getPropertyValue(n));
                        return o && function(t) {
                            this.style.setProperty(n, o(t), e)
                        }
                    }
                    return arguments.length < 3 && (e = ""), this.tween("style." + n, r)
                }, Ac.text = function(n) {
                    return io(this, "text", n, oo)
                }, Ac.remove = function() {
                    return this.each("end.transition", function() {
                        var n;
                        this.__transition__.count < 2 && (n = this.parentNode) && n.removeChild(this)
                    })
                }, Ac.ease = function(n) {
                    var t = this.id;
                    return arguments.length < 1 ? this.node().__transition__[t].ease : ("function" != typeof n && (n = Wo.ease.apply(Wo, arguments)), C(this, function(e) {
                        e.__transition__[t].ease = n
                    }))
                }, Ac.delay = function(n) {
                    var t = this.id;
                    return C(this, "function" == typeof n ? function(e, r, i) {
                        e.__transition__[t].delay = +n.call(e, e.__data__, r, i)
                    } : (n = +n, function(e) {
                        e.__transition__[t].delay = n
                    }))
                }, Ac.duration = function(n) {
                    var t = this.id;
                    return C(this, "function" == typeof n ? function(e, r, i) {
                        e.__transition__[t].duration = Math.max(1, n.call(e, e.__data__, r, i))
                    } : (n = Math.max(1, n), function(e) {
                        e.__transition__[t].duration = n
                    }))
                }, Ac.each = function(n, t) {
                    var e = this.id;
                    if (arguments.length < 2) {
                        var r = Sc,
                            i = kc;
                        kc = e, C(this, function(t, r, i) {
                            Sc = t.__transition__[e], n.call(t, t.__data__, r, i)
                        }), Sc = r, kc = i
                    } else C(this, function(r) {
                        var i = r.__transition__[e];
                        (i.event || (i.event = Wo.dispatch("start", "end"))).on(n, t)
                    });
                    return this
                }, Ac.transition = function() {
                    for (var n, t, e, r, i = this.id, o = ++Cc, u = [], a = 0, c = this.length; a < c; a++) {
                        u.push(n = []);
                        for (var t = this[a], l = 0, s = t.length; l < s; l++)(e = t[l]) && (r = Object.create(e.__transition__[i]), r.delay += r.duration, uo(e, l, o, r)), n.push(e)
                    }
                    return ro(u, o)
                }, Wo.svg.axis = function() {
                    function n(n) {
                        n.each(function() {
                            var n, l = Wo.select(this),
                                s = this.__chart__ || e,
                                f = this.__chart__ = e.copy(),
                                h = null == c ? f.ticks ? f.ticks.apply(f, a) : f.domain() : c,
                                p = null == t ? f.tickFormat ? f.tickFormat.apply(f, a) : yn : t,
                                g = l.selectAll(".tick").data(h, f),
                                d = g.enter().insert("g", ".domain").attr("class", "tick").style("opacity", Au),
                                v = Wo.transition(g.exit()).style("opacity", Au).remove(),
                                y = Wo.transition(g).style("opacity", 1),
                                m = ri(f),
                                x = l.selectAll(".domain").data([0]),
                                _ = (x.enter().append("path").attr("class", "domain"), Wo.transition(x));
                            d.append("line"), d.append("text");
                            var M = d.select("line"),
                                b = y.select("line"),
                                w = g.select("text").text(p),
                                k = d.select("text"),
                                S = y.select("text");
                            switch (r) {
                                case "bottom":
                                    n = ao, M.attr("y2", i), k.attr("y", Math.max(i, 0) + u), b.attr("x2", 0).attr("y2", i), S.attr("x", 0).attr("y", Math.max(i, 0) + u), w.attr("dy", ".71em").style("text-anchor", "middle"), _.attr("d", "M" + m[0] + "," + o + "V0H" + m[1] + "V" + o);
                                    break;
                                case "top":
                                    n = ao, M.attr("y2", -i), k.attr("y", -(Math.max(i, 0) + u)), b.attr("x2", 0).attr("y2", -i), S.attr("x", 0).attr("y", -(Math.max(i, 0) + u)), w.attr("dy", "0em").style("text-anchor", "middle"), _.attr("d", "M" + m[0] + "," + -o + "V0H" + m[1] + "V" + -o);
                                    break;
                                case "left":
                                    n = co, M.attr("x2", -i), k.attr("x", -(Math.max(i, 0) + u)), b.attr("x2", -i).attr("y2", 0), S.attr("x", -(Math.max(i, 0) + u)).attr("y", 0), w.attr("dy", ".32em").style("text-anchor", "end"), _.attr("d", "M" + -o + "," + m[0] + "H0V" + m[1] + "H" + -o);
                                    break;
                                case "right":
                                    n = co, M.attr("x2", i), k.attr("x", Math.max(i, 0) + u), b.attr("x2", i).attr("y2", 0), S.attr("x", Math.max(i, 0) + u).attr("y", 0), w.attr("dy", ".32em").style("text-anchor", "start"), _.attr("d", "M" + o + "," + m[0] + "H0V" + m[1] + "H" + o)
                            }
                            if (f.rangeBand) {
                                var E = f,
                                    N = E.rangeBand() / 2;
                                s = f = function(n) {
                                    return E(n) + N
                                }
                            } else s.rangeBand ? s = f : v.call(n, f);
                            d.call(n, s), y.call(n, f)
                        })
                    }
                    var t, e = Wo.scale.linear(),
                        r = zc,
                        i = 6,
                        o = 6,
                        u = 3,
                        a = [10],
                        c = null;
                    return n.scale = function(t) {
                        return arguments.length ? (e = t, n) : e
                    }, n.orient = function(t) {
                        return arguments.length ? (r = t in Tc ? t + "" : zc, n) : r
                    }, n.ticks = function() {
                        return arguments.length ? (a = arguments, n) : a
                    }, n.tickValues = function(t) {
                        return arguments.length ? (c = t, n) : c
                    }, n.tickFormat = function(e) {
                        return arguments.length ? (t = e, n) : t
                    }, n.tickSize = function(t) {
                        var e = arguments.length;
                        return e ? (i = +t, o = +arguments[e - 1], n) : i
                    }, n.innerTickSize = function(t) {
                        return arguments.length ? (i = +t, n) : i
                    }, n.outerTickSize = function(t) {
                        return arguments.length ? (o = +t, n) : o
                    }, n.tickPadding = function(t) {
                        return arguments.length ? (u = +t, n) : u
                    }, n.tickSubdivide = function() {
                        return arguments.length && n
                    }, n
                };
                var zc = "bottom",
                    Tc = {
                        top: 1,
                        right: 1,
                        bottom: 1,
                        left: 1
                    };
                Wo.svg.brush = function() {
                    function n(o) {
                        o.each(function() {
                            var o = Wo.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", i).on("touchstart.brush", i),
                                u = o.selectAll(".background").data([0]);
                            u.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), o.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                            var a = o.selectAll(".resize").data(v, yn);
                            a.exit().remove(), a.enter().append("g").attr("class", function(n) {
                                return "resize " + n
                            }).style("cursor", function(n) {
                                return Lc[n]
                            }).append("rect").attr("x", function(n) {
                                return /[ew]$/.test(n) ? -3 : null
                            }).attr("y", function(n) {
                                return /^[ns]/.test(n) ? -3 : null
                            }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), a.style("display", n.empty() ? "none" : null);
                            var s, f = Wo.transition(o),
                                h = Wo.transition(u);
                            c && (s = ri(c), h.attr("x", s[0]).attr("width", s[1] - s[0]), e(f)), l && (s = ri(l), h.attr("y", s[0]).attr("height", s[1] - s[0]), r(f)), t(f)
                        })
                    }

                    function t(n) {
                        n.selectAll(".resize").attr("transform", function(n) {
                            return "translate(" + s[+/e$/.test(n)] + "," + h[+/^s/.test(n)] + ")"
                        })
                    }

                    function e(n) {
                        n.select(".extent").attr("x", s[0]), n.selectAll(".extent,.n>rect,.s>rect").attr("width", s[1] - s[0])
                    }

                    function r(n) {
                        n.select(".extent").attr("y", h[0]), n.selectAll(".extent,.e>rect,.w>rect").attr("height", h[1] - h[0])
                    }

                    function i() {
                        function i() {
                            32 == Wo.event.keyCode && (A || (x = null, z[0] -= s[1], z[1] -= h[1], A = 2), f())
                        }

                        function p() {
                            32 == Wo.event.keyCode && 2 == A && (z[0] += s[1], z[1] += h[1], A = 0, f())
                        }

                        function v() {
                            var n = Wo.mouse(M),
                                i = !1;
                            _ && (n[0] += _[0], n[1] += _[1]), A || (Wo.event.altKey ? (x || (x = [(s[0] + s[1]) / 2, (h[0] + h[1]) / 2]), z[0] = s[+(n[0] < x[0])], z[1] = h[+(n[1] < x[1])]) : x = null), E && y(n, c, 0) && (e(k), i = !0), N && y(n, l, 1) && (r(k), i = !0), i && (t(k), w({
                                type: "brush",
                                mode: A ? "move" : "resize"
                            }))
                        }

                        function y(n, t, e) {
                            var r, i, a = ri(t),
                                c = a[0],
                                l = a[1],
                                f = z[e],
                                p = e ? h : s,
                                v = p[1] - p[0];
                            if (A && (c -= f, l -= v + f), r = (e ? d : g) ? Math.max(c, Math.min(l, n[e])) : n[e], A ? i = (r += f) + v : (x && (f = Math.max(c, Math.min(l, 2 * x[e] - r))), f < r ? (i = r, r = f) : i = f), p[0] != r || p[1] != i) return e ? u = null : o = null, p[0] = r, p[1] = i, !0
                        }

                        function m() {
                            v(), k.style("pointer-events", "all").selectAll(".resize").style("display", n.empty() ? "none" : null), Wo.select("body").style("cursor", null), T.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), C(), w({
                                type: "brushend"
                            })
                        }
                        var x, _, M = this,
                            b = Wo.select(Wo.event.target),
                            w = a.of(M, arguments),
                            k = Wo.select(M),
                            S = b.datum(),
                            E = !/^(n|s)$/.test(S) && c,
                            N = !/^(e|w)$/.test(S) && l,
                            A = b.classed("extent"),
                            C = D(),
                            z = Wo.mouse(M),
                            T = Wo.select(nu).on("keydown.brush", i).on("keyup.brush", p);
                        if (Wo.event.changedTouches ? T.on("touchmove.brush", v).on("touchend.brush", m) : T.on("mousemove.brush", v).on("mouseup.brush", m), k.interrupt().selectAll("*").interrupt(), A) z[0] = s[0] - z[0], z[1] = h[0] - z[1];
                        else if (S) {
                            var L = +/w$/.test(S),
                                q = +/^n/.test(S);
                            _ = [s[1 - L] - z[0], h[1 - q] - z[1]], z[0] = s[L], z[1] = h[q]
                        } else Wo.event.altKey && (x = z.slice());
                        k.style("pointer-events", "none").selectAll(".resize").style("display", null), Wo.select("body").style("cursor", b.style("cursor")), w({
                            type: "brushstart"
                        }), v()
                    }
                    var o, u, a = p(n, "brushstart", "brush", "brushend"),
                        c = null,
                        l = null,
                        s = [0, 0],
                        h = [0, 0],
                        g = !0,
                        d = !0,
                        v = qc[0];
                    return n.event = function(n) {
                        n.each(function() {
                            var n = a.of(this, arguments),
                                t = {
                                    x: s,
                                    y: h,
                                    i: o,
                                    j: u
                                },
                                e = this.__chart__ || t;
                            this.__chart__ = t, kc ? Wo.select(this).transition().each("start.brush", function() {
                                o = e.i, u = e.j, s = e.x, h = e.y, n({
                                    type: "brushstart"
                                })
                            }).tween("brush:brush", function() {
                                var e = je(s, t.x),
                                    r = je(h, t.y);
                                return o = u = null,
                                    function(i) {
                                        s = t.x = e(i), h = t.y = r(i), n({
                                            type: "brush",
                                            mode: "resize"
                                        })
                                    }
                            }).each("end.brush", function() {
                                o = t.i, u = t.j, n({
                                    type: "brush",
                                    mode: "resize"
                                }), n({
                                    type: "brushend"
                                })
                            }) : (n({
                                type: "brushstart"
                            }), n({
                                type: "brush",
                                mode: "resize"
                            }), n({
                                type: "brushend"
                            }))
                        })
                    }, n.x = function(t) {
                        return arguments.length ? (c = t, v = qc[!c << 1 | !l], n) : c
                    }, n.y = function(t) {
                        return arguments.length ? (l = t, v = qc[!c << 1 | !l], n) : l
                    }, n.clamp = function(t) {
                        return arguments.length ? (c && l ? (g = !!t[0], d = !!t[1]) : c ? g = !!t : l && (d = !!t), n) : c && l ? [g, d] : c ? g : l ? d : null
                    }, n.extent = function(t) {
                        var e, r, i, a, f;
                        return arguments.length ? (c && (e = t[0], r = t[1], l && (e = e[0], r = r[0]), o = [e, r], c.invert && (e = c(e), r = c(r)), r < e && (f = e, e = r, r = f), e == s[0] && r == s[1] || (s = [e, r])), l && (i = t[0], a = t[1], c && (i = i[1], a = a[1]), u = [i, a], l.invert && (i = l(i), a = l(a)), a < i && (f = i, i = a, a = f), i == h[0] && a == h[1] || (h = [i, a])), n) : (c && (o ? (e = o[0], r = o[1]) : (e = s[0], r = s[1], c.invert && (e = c.invert(e), r = c.invert(r)), r < e && (f = e, e = r, r = f))), l && (u ? (i = u[0], a = u[1]) : (i = h[0], a = h[1], l.invert && (i = l.invert(i), a = l.invert(a)), a < i && (f = i, i = a, a = f))), c && l ? [
                            [e, i],
                            [r, a]
                        ] : c ? [e, r] : l && [i, a])
                    }, n.clear = function() {
                        return n.empty() || (s = [0, 0], h = [0, 0], o = u = null), n
                    }, n.empty = function() {
                        return !!c && s[0] == s[1] || !!l && h[0] == h[1]
                    }, Wo.rebind(n, a, "on")
                };
                var Lc = {
                        n: "ns-resize",
                        e: "ew-resize",
                        s: "ns-resize",
                        w: "ew-resize",
                        nw: "nwse-resize",
                        ne: "nesw-resize",
                        se: "nwse-resize",
                        sw: "nesw-resize"
                    },
                    qc = [
                        ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
                        ["e", "w"],
                        ["n", "s"],
                        []
                    ],
                    Rc = Wo.time = {},
                    jc = Date,
                    Dc = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                lo.prototype = {
                    getDate: function() {
                        return this._.getUTCDate()
                    },
                    getDay: function() {
                        return this._.getUTCDay()
                    },
                    getFullYear: function() {
                        return this._.getUTCFullYear()
                    },
                    getHours: function() {
                        return this._.getUTCHours()
                    },
                    getMilliseconds: function() {
                        return this._.getUTCMilliseconds()
                    },
                    getMinutes: function() {
                        return this._.getUTCMinutes()
                    },
                    getMonth: function() {
                        return this._.getUTCMonth()
                    },
                    getSeconds: function() {
                        return this._.getUTCSeconds()
                    },
                    getTime: function() {
                        return this._.getTime()
                    },
                    getTimezoneOffset: function() {
                        return 0
                    },
                    valueOf: function() {
                        return this._.valueOf()
                    },
                    setDate: function() {
                        Pc.setUTCDate.apply(this._, arguments)
                    },
                    setDay: function() {
                        Pc.setUTCDay.apply(this._, arguments)
                    },
                    setFullYear: function() {
                        Pc.setUTCFullYear.apply(this._, arguments)
                    },
                    setHours: function() {
                        Pc.setUTCHours.apply(this._, arguments)
                    },
                    setMilliseconds: function() {
                        Pc.setUTCMilliseconds.apply(this._, arguments)
                    },
                    setMinutes: function() {
                        Pc.setUTCMinutes.apply(this._, arguments)
                    },
                    setMonth: function() {
                        Pc.setUTCMonth.apply(this._, arguments)
                    },
                    setSeconds: function() {
                        Pc.setUTCSeconds.apply(this._, arguments)
                    },
                    setTime: function() {
                        Pc.setTime.apply(this._, arguments)
                    }
                };
                var Pc = Date.prototype,
                    Uc = "%a %b %e %X %Y",
                    Oc = "%m/%d/%Y",
                    Fc = "%H:%M:%S",
                    Hc = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    Ic = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    Yc = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    Zc = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                Rc.year = so(function(n) {
                    return n = Rc.day(n), n.setMonth(0, 1), n
                }, function(n, t) {
                    n.setFullYear(n.getFullYear() + t)
                }, function(n) {
                    return n.getFullYear()
                }), Rc.years = Rc.year.range, Rc.years.utc = Rc.year.utc.range, Rc.day = so(function(n) {
                    var t = new jc(2e3, 0);
                    return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), t
                }, function(n, t) {
                    n.setDate(n.getDate() + t)
                }, function(n) {
                    return n.getDate() - 1
                }), Rc.days = Rc.day.range, Rc.days.utc = Rc.day.utc.range, Rc.dayOfYear = function(n) {
                    var t = Rc.year(n);
                    return Math.floor((n - t - 6e4 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5)
                }, Dc.forEach(function(n, t) {
                    n = n.toLowerCase(), t = 7 - t;
                    var e = Rc[n] = so(function(n) {
                        return (n = Rc.day(n)).setDate(n.getDate() - (n.getDay() + t) % 7), n
                    }, function(n, t) {
                        n.setDate(n.getDate() + 7 * Math.floor(t))
                    }, function(n) {
                        var e = Rc.year(n).getDay();
                        return Math.floor((Rc.dayOfYear(n) + (e + t) % 7) / 7) - (e !== t)
                    });
                    Rc[n + "s"] = e.range, Rc[n + "s"].utc = e.utc.range, Rc[n + "OfYear"] = function(n) {
                        var e = Rc.year(n).getDay();
                        return Math.floor((Rc.dayOfYear(n) + (e + t) % 7) / 7)
                    }
                }), Rc.week = Rc.sunday, Rc.weeks = Rc.sunday.range, Rc.weeks.utc = Rc.sunday.utc.range, Rc.weekOfYear = Rc.sundayOfYear, Rc.format = ho;
                var Vc = go(Hc),
                    Bc = vo(Hc),
                    Xc = go(Ic),
                    $c = vo(Ic),
                    Wc = go(Yc),
                    Gc = vo(Yc),
                    Jc = go(Zc),
                    Kc = vo(Zc),
                    Qc = /^%/,
                    nl = {
                        "-": "",
                        _: " ",
                        0: "0"
                    },
                    tl = {
                        a: function(n) {
                            return Ic[n.getDay()]
                        },
                        A: function(n) {
                            return Hc[n.getDay()]
                        },
                        b: function(n) {
                            return Zc[n.getMonth()]
                        },
                        B: function(n) {
                            return Yc[n.getMonth()]
                        },
                        c: ho(Uc),
                        d: function(n, t) {
                            return yo(n.getDate(), t, 2)
                        },
                        e: function(n, t) {
                            return yo(n.getDate(), t, 2)
                        },
                        H: function(n, t) {
                            return yo(n.getHours(), t, 2)
                        },
                        I: function(n, t) {
                            return yo(n.getHours() % 12 || 12, t, 2)
                        },
                        j: function(n, t) {
                            return yo(1 + Rc.dayOfYear(n), t, 3)
                        },
                        L: function(n, t) {
                            return yo(n.getMilliseconds(), t, 3)
                        },
                        m: function(n, t) {
                            return yo(n.getMonth() + 1, t, 2)
                        },
                        M: function(n, t) {
                            return yo(n.getMinutes(), t, 2)
                        },
                        p: function(n) {
                            return n.getHours() >= 12 ? "PM" : "AM"
                        },
                        S: function(n, t) {
                            return yo(n.getSeconds(), t, 2)
                        },
                        U: function(n, t) {
                            return yo(Rc.sundayOfYear(n), t, 2)
                        },
                        w: function(n) {
                            return n.getDay()
                        },
                        W: function(n, t) {
                            return yo(Rc.mondayOfYear(n), t, 2)
                        },
                        x: ho(Oc),
                        X: ho(Fc),
                        y: function(n, t) {
                            return yo(n.getFullYear() % 100, t, 2)
                        },
                        Y: function(n, t) {
                            return yo(n.getFullYear() % 1e4, t, 4)
                        },
                        Z: Fo,
                        "%": function() {
                            return "%"
                        }
                    },
                    el = {
                        a: mo,
                        A: xo,
                        b: wo,
                        B: ko,
                        c: So,
                        d: qo,
                        e: qo,
                        H: jo,
                        I: jo,
                        j: Ro,
                        L: Uo,
                        m: Lo,
                        M: Do,
                        p: Oo,
                        S: Po,
                        U: Mo,
                        w: _o,
                        W: bo,
                        x: Eo,
                        X: No,
                        y: Co,
                        Y: Ao,
                        Z: zo,
                        "%": Ho
                    },
                    rl = /^\s*\d+/,
                    il = Wo.map({
                        am: 0,
                        pm: 1
                    });
                ho.utc = Io;
                var ol = Io("%Y-%m-%dT%H:%M:%S.%LZ");
                ho.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Yo : ol, Yo.parse = function(n) {
                    var t = new Date(n);
                    return isNaN(t) ? null : t
                }, Yo.toString = ol.toString, Rc.second = so(function(n) {
                    return new jc(1e3 * Math.floor(n / 1e3))
                }, function(n, t) {
                    n.setTime(n.getTime() + 1e3 * Math.floor(t))
                }, function(n) {
                    return n.getSeconds()
                }), Rc.seconds = Rc.second.range, Rc.seconds.utc = Rc.second.utc.range, Rc.minute = so(function(n) {
                    return new jc(6e4 * Math.floor(n / 6e4))
                }, function(n, t) {
                    n.setTime(n.getTime() + 6e4 * Math.floor(t))
                }, function(n) {
                    return n.getMinutes()
                }), Rc.minutes = Rc.minute.range, Rc.minutes.utc = Rc.minute.utc.range, Rc.hour = so(function(n) {
                    var t = n.getTimezoneOffset() / 60;
                    return new jc(36e5 * (Math.floor(n / 36e5 - t) + t))
                }, function(n, t) {
                    n.setTime(n.getTime() + 36e5 * Math.floor(t))
                }, function(n) {
                    return n.getHours()
                }), Rc.hours = Rc.hour.range, Rc.hours.utc = Rc.hour.utc.range, Rc.month = so(function(n) {
                    return n = Rc.day(n), n.setDate(1), n
                }, function(n, t) {
                    n.setMonth(n.getMonth() + t)
                }, function(n) {
                    return n.getMonth()
                }), Rc.months = Rc.month.range, Rc.months.utc = Rc.month.utc.range;
                var ul = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
                    al = [
                        [Rc.second, 1],
                        [Rc.second, 5],
                        [Rc.second, 15],
                        [Rc.second, 30],
                        [Rc.minute, 1],
                        [Rc.minute, 5],
                        [Rc.minute, 15],
                        [Rc.minute, 30],
                        [Rc.hour, 1],
                        [Rc.hour, 3],
                        [Rc.hour, 6],
                        [Rc.hour, 12],
                        [Rc.day, 1],
                        [Rc.day, 2],
                        [Rc.week, 1],
                        [Rc.month, 1],
                        [Rc.month, 3],
                        [Rc.year, 1]
                    ],
                    cl = [
                        [ho("%Y"), Bn],
                        [ho("%B"), function(n) {
                            return n.getMonth()
                        }],
                        [ho("%b %d"), function(n) {
                            return 1 != n.getDate()
                        }],
                        [ho("%a %d"), function(n) {
                            return n.getDay() && 1 != n.getDate()
                        }],
                        [ho("%I %p"), function(n) {
                            return n.getHours()
                        }],
                        [ho("%I:%M"), function(n) {
                            return n.getMinutes()
                        }],
                        [ho(":%S"), function(n) {
                            return n.getSeconds()
                        }],
                        [ho(".%L"), function(n) {
                            return n.getMilliseconds()
                        }]
                    ],
                    ll = Bo(cl);
                al.year = Rc.year, Rc.scale = function() {
                    return Zo(Wo.scale.linear(), al, ll)
                };
                var sl = {
                        range: function(n, t, e) {
                            return Wo.range(+n, +t, e).map(Vo)
                        },
                        floor: yn,
                        ceil: yn
                    },
                    fl = al.map(function(n) {
                        return [n[0].utc, n[1]]
                    }),
                    hl = [
                        [Io("%Y"), Bn],
                        [Io("%B"), function(n) {
                            return n.getUTCMonth()
                        }],
                        [Io("%b %d"), function(n) {
                            return 1 != n.getUTCDate()
                        }],
                        [Io("%a %d"), function(n) {
                            return n.getUTCDay() && 1 != n.getUTCDate()
                        }],
                        [Io("%I %p"), function(n) {
                            return n.getUTCHours()
                        }],
                        [Io("%I:%M"), function(n) {
                            return n.getUTCMinutes()
                        }],
                        [Io(":%S"), function(n) {
                            return n.getUTCSeconds()
                        }],
                        [Io(".%L"), function(n) {
                            return n.getUTCMilliseconds()
                        }]
                    ],
                    pl = Bo(hl);
                return fl.year = Rc.year.utc, Rc.scale.utc = function() {
                    return Zo(Wo.scale.linear(), fl, pl)
                }, Wo.text = mn(function(n) {
                    return n.responseText
                }), Wo.json = function(n, t) {
                    return xn(n, "application/json", Xo, t)
                }, Wo.html = function(n, t) {
                    return xn(n, "text/html", $o, t)
                }, Wo.xml = mn(function(n) {
                    return n.responseXML
                }), Wo
            }()
        }, {}],
        4: [function(n, t, e) {
            n("./d3"), t.exports = d3,
                function() {
                    delete this.d3
                }()
        }, {
            "./d3": 3
        }],
        5: [function(n, t, e) {
            function r(n) {
                return null !== n && ("object" == typeof n || "function" == typeof n)
            }
            t.exports = r
        }, {}],
        6: [function(n, t, e) {
            function r() {
                for (var n = {}, t = 0; t < arguments.length; t++) {
                    var e = arguments[t];
                    if (o(e))
                        for (var r = i(e), u = 0; u < r.length; u++) {
                            var a = r[u];
                            n[a] = e[a]
                        }
                }
                return n
            }
            var i = n("object-keys"),
                o = n("./has-keys");
            t.exports = r
        }, {
            "./has-keys": 5,
            "object-keys": 8
        }],
        7: [function(n, t, e) {
            var r = Object.prototype.hasOwnProperty,
                i = Object.prototype.toString,
                o = function(n) {
                    var t = "function" == typeof n && !(n instanceof RegExp) || "[object Function]" === i.call(n);
                    return t || "undefined" == typeof window || (t = n === window.setTimeout || n === window.alert || n === window.confirm || n === window.prompt), t
                };
            t.exports = function(n, t) {
                if (!o(t)) throw new TypeError("iterator must be a function");
                var e, i, u = "string" == typeof n,
                    a = n.length,
                    c = arguments.length > 2 ? arguments[2] : null;
                if (a === +a)
                    for (e = 0; e < a; e++) null === c ? t(u ? n.charAt(e) : n[e], e, n) : t.call(c, u ? n.charAt(e) : n[e], e, n);
                else
                    for (i in n) r.call(n, i) && (null === c ? t(n[i], i, n) : t.call(c, n[i], i, n))
            }
        }, {}],
        8: [function(n, t, e) {
            t.exports = Object.keys || n("./shim")
        }, {
            "./shim": 10
        }],
        9: [function(n, t, e) {
            var r = Object.prototype.toString;
            t.exports = function n(t) {
                var e = r.call(t),
                    n = "[object Arguments]" === e;
                return n || (n = "[object Array]" !== e && null !== t && "object" == typeof t && "number" == typeof t.length && t.length >= 0 && "[object Function]" === r.call(t.callee)), n
            }
        }, {}],
        10: [function(n, t, e) {
            ! function() {
                "use strict";
                var e, r = Object.prototype.hasOwnProperty,
                    i = Object.prototype.toString,
                    o = n("./foreach"),
                    u = n("./isArguments"),
                    a = !{
                        toString: null
                    }.propertyIsEnumerable("toString"),
                    c = function() {}.propertyIsEnumerable("prototype"),
                    l = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
                e = function(n) {
                    var t = null !== n && "object" == typeof n,
                        e = "[object Function]" === i.call(n),
                        s = u(n),
                        f = [];
                    if (!t && !e && !s) throw new TypeError("Object.keys called on a non-object");
                    if (s) o(n, function(n) {
                        f.push(n)
                    });
                    else {
                        var h, p = c && e;
                        for (h in n) p && "prototype" === h || !r.call(n, h) || f.push(h)
                    }
                    if (a) {
                        var g = n.constructor,
                            d = g && g.prototype === n;
                        o(l, function(t) {
                            d && "constructor" === t || !r.call(n, t) || f.push(t)
                        })
                    }
                    return f
                }, t.exports = e
            }()
        }, {
            "./foreach": 7,
            "./isArguments": 9
        }]
    }, {}, [1])(1)
});