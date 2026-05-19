const __vite__mapDeps = (
    i,
    m = __vite__mapDeps,
    d = m.f || (m.f = ["assets/index-ewhffO5v.js", "assets/index-Dfge2KJB.css"])
) => i.map((i) => d[i]);
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) a(s);
    new MutationObserver((s) => {
        for (const i of s)
            if (i.type === "childList")
                for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && a(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(s) {
        const i = {};
        return (
            s.integrity && (i.integrity = s.integrity),
            s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
            s.crossOrigin === "use-credentials"
                ? (i.credentials = "include")
                : s.crossOrigin === "anonymous"
                  ? (i.credentials = "omit")
                  : (i.credentials = "same-origin"),
            i
        );
    }
    function a(s) {
        if (s.ep) return;
        s.ep = !0;
        const i = n(s);
        fetch(s.href, i);
    }
})();
const Md = "modulepreload",
    Dd = function (e) {
        return "/" + e;
    },
    Ji = {},
    Fd = function (t, n, a) {
        let s = Promise.resolve();
        if (n && n.length > 0) {
            document.getElementsByTagName("link");
            const o = document.querySelector("meta[property=csp-nonce]"),
                l = (o == null ? void 0 : o.nonce) || (o == null ? void 0 : o.getAttribute("nonce"));
            s = Promise.allSettled(
                n.map((c) => {
                    if (((c = Dd(c)), c in Ji)) return;
                    Ji[c] = !0;
                    const d = c.endsWith(".css"),
                        v = d ? '[rel="stylesheet"]' : "";
                    if (document.querySelector(`link[href="${c}"]${v}`)) return;
                    const h = document.createElement("link");
                    if (
                        ((h.rel = d ? "stylesheet" : Md),
                        d || (h.as = "script"),
                        (h.crossOrigin = ""),
                        (h.href = c),
                        l && h.setAttribute("nonce", l),
                        document.head.appendChild(h),
                        d)
                    )
                        return new Promise((f, x) => {
                            h.addEventListener("load", f),
                                h.addEventListener("error", () => x(new Error(`Unable to preload CSS for ${c}`)));
                        });
                })
            );
        }
        function i(o) {
            const l = new Event("vite:preloadError", { cancelable: !0 });
            if (((l.payload = o), window.dispatchEvent(l), !l.defaultPrevented)) throw o;
        }
        return s.then((o) => {
            for (const l of o || []) l.status === "rejected" && i(l.reason);
            return t().catch(i);
        });
    };
function Od(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var yl = { exports: {} },
    xa = {},
    jl = { exports: {} },
    I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dr = Symbol.for("react.element"),
    Wd = Symbol.for("react.portal"),
    Bd = Symbol.for("react.fragment"),
    qd = Symbol.for("react.strict_mode"),
    Ud = Symbol.for("react.profiler"),
    $d = Symbol.for("react.provider"),
    Vd = Symbol.for("react.context"),
    Hd = Symbol.for("react.forward_ref"),
    Qd = Symbol.for("react.suspense"),
    Gd = Symbol.for("react.memo"),
    Xd = Symbol.for("react.lazy"),
    eo = Symbol.iterator;
function Yd(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (eo && e[eo]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var wl = {
        isMounted: function () {
            return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
    },
    Nl = Object.assign,
    kl = {};
function Nn(e, t, n) {
    (this.props = e), (this.context = t), (this.refs = kl), (this.updater = n || wl);
}
Nn.prototype.isReactComponent = {};
Nn.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
            "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
    this.updater.enqueueSetState(this, e, t, "setState");
};
Nn.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Sl() {}
Sl.prototype = Nn.prototype;
function si(e, t, n) {
    (this.props = e), (this.context = t), (this.refs = kl), (this.updater = n || wl);
}
var ii = (si.prototype = new Sl());
ii.constructor = si;
Nl(ii, Nn.prototype);
ii.isPureReactComponent = !0;
var to = Array.isArray,
    bl = Object.prototype.hasOwnProperty,
    oi = { current: null },
    Cl = { key: !0, ref: !0, __self: !0, __source: !0 };
function El(e, t, n) {
    var a,
        s = {},
        i = null,
        o = null;
    if (t != null)
        for (a in (t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t))
            bl.call(t, a) && !Cl.hasOwnProperty(a) && (s[a] = t[a]);
    var l = arguments.length - 2;
    if (l === 1) s.children = n;
    else if (1 < l) {
        for (var c = Array(l), d = 0; d < l; d++) c[d] = arguments[d + 2];
        s.children = c;
    }
    if (e && e.defaultProps) for (a in ((l = e.defaultProps), l)) s[a] === void 0 && (s[a] = l[a]);
    return { $$typeof: dr, type: e, key: i, ref: o, props: s, _owner: oi.current };
}
function Kd(e, t) {
    return { $$typeof: dr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function li(e) {
    return typeof e == "object" && e !== null && e.$$typeof === dr;
}
function Zd(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
        "$" +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var no = /\/+/g;
function Da(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? Zd("" + e.key) : t.toString(36);
}
function Mr(e, t, n, a, s) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var o = !1;
    if (e === null) o = !0;
    else
        switch (i) {
            case "string":
            case "number":
                o = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case dr:
                    case Wd:
                        o = !0;
                }
        }
    if (o)
        return (
            (o = e),
            (s = s(o)),
            (e = a === "" ? "." + Da(o, 0) : a),
            to(s)
                ? ((n = ""),
                  e != null && (n = e.replace(no, "$&/") + "/"),
                  Mr(s, t, n, "", function (d) {
                      return d;
                  }))
                : s != null &&
                  (li(s) &&
                      (s = Kd(
                          s,
                          n + (!s.key || (o && o.key === s.key) ? "" : ("" + s.key).replace(no, "$&/") + "/") + e
                      )),
                  t.push(s)),
            1
        );
    if (((o = 0), (a = a === "" ? "." : a + ":"), to(e)))
        for (var l = 0; l < e.length; l++) {
            i = e[l];
            var c = a + Da(i, l);
            o += Mr(i, t, n, c, s);
        }
    else if (((c = Yd(e)), typeof c == "function"))
        for (e = c.call(e), l = 0; !(i = e.next()).done; )
            (i = i.value), (c = a + Da(i, l++)), (o += Mr(i, t, n, c, s));
    else if (i === "object")
        throw (
            ((t = String(e)),
            Error(
                "Objects are not valid as a React child (found: " +
                    (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) +
                    "). If you meant to render a collection of children, use an array instead."
            ))
        );
    return o;
}
function gr(e, t, n) {
    if (e == null) return e;
    var a = [],
        s = 0;
    return (
        Mr(e, a, "", "", function (i) {
            return t.call(n, i, s++);
        }),
        a
    );
}
function Jd(e) {
    if (e._status === -1) {
        var t = e._result;
        (t = t()),
            t.then(
                function (n) {
                    (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n));
                },
                function (n) {
                    (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n));
                }
            ),
            e._status === -1 && ((e._status = 0), (e._result = t));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
}
var me = { current: null },
    Dr = { transition: null },
    eu = { ReactCurrentDispatcher: me, ReactCurrentBatchConfig: Dr, ReactCurrentOwner: oi };
function zl() {
    throw Error("act(...) is not supported in production builds of React.");
}
I.Children = {
    map: gr,
    forEach: function (e, t, n) {
        gr(
            e,
            function () {
                t.apply(this, arguments);
            },
            n
        );
    },
    count: function (e) {
        var t = 0;
        return (
            gr(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            gr(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!li(e)) throw Error("React.Children.only expected to receive a single React element child.");
        return e;
    },
};
I.Component = Nn;
I.Fragment = Bd;
I.Profiler = Ud;
I.PureComponent = si;
I.StrictMode = qd;
I.Suspense = Qd;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = eu;
I.act = zl;
I.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var a = Nl({}, e.props),
        s = e.key,
        i = e.ref,
        o = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((i = t.ref), (o = oi.current)),
            t.key !== void 0 && (s = "" + t.key),
            e.type && e.type.defaultProps)
        )
            var l = e.type.defaultProps;
        for (c in t) bl.call(t, c) && !Cl.hasOwnProperty(c) && (a[c] = t[c] === void 0 && l !== void 0 ? l[c] : t[c]);
    }
    var c = arguments.length - 2;
    if (c === 1) a.children = n;
    else if (1 < c) {
        l = Array(c);
        for (var d = 0; d < c; d++) l[d] = arguments[d + 2];
        a.children = l;
    }
    return { $$typeof: dr, type: e.type, key: s, ref: i, props: a, _owner: o };
};
I.createContext = function (e) {
    return (
        (e = {
            $$typeof: Vd,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
        }),
        (e.Provider = { $$typeof: $d, _context: e }),
        (e.Consumer = e)
    );
};
I.createElement = El;
I.createFactory = function (e) {
    var t = El.bind(null, e);
    return (t.type = e), t;
};
I.createRef = function () {
    return { current: null };
};
I.forwardRef = function (e) {
    return { $$typeof: Hd, render: e };
};
I.isValidElement = li;
I.lazy = function (e) {
    return { $$typeof: Xd, _payload: { _status: -1, _result: e }, _init: Jd };
};
I.memo = function (e, t) {
    return { $$typeof: Gd, type: e, compare: t === void 0 ? null : t };
};
I.startTransition = function (e) {
    var t = Dr.transition;
    Dr.transition = {};
    try {
        e();
    } finally {
        Dr.transition = t;
    }
};
I.unstable_act = zl;
I.useCallback = function (e, t) {
    return me.current.useCallback(e, t);
};
I.useContext = function (e) {
    return me.current.useContext(e);
};
I.useDebugValue = function () {};
I.useDeferredValue = function (e) {
    return me.current.useDeferredValue(e);
};
I.useEffect = function (e, t) {
    return me.current.useEffect(e, t);
};
I.useId = function () {
    return me.current.useId();
};
I.useImperativeHandle = function (e, t, n) {
    return me.current.useImperativeHandle(e, t, n);
};
I.useInsertionEffect = function (e, t) {
    return me.current.useInsertionEffect(e, t);
};
I.useLayoutEffect = function (e, t) {
    return me.current.useLayoutEffect(e, t);
};
I.useMemo = function (e, t) {
    return me.current.useMemo(e, t);
};
I.useReducer = function (e, t, n) {
    return me.current.useReducer(e, t, n);
};
I.useRef = function (e) {
    return me.current.useRef(e);
};
I.useState = function (e) {
    return me.current.useState(e);
};
I.useSyncExternalStore = function (e, t, n) {
    return me.current.useSyncExternalStore(e, t, n);
};
I.useTransition = function () {
    return me.current.useTransition();
};
I.version = "18.3.1";
jl.exports = I;
var z = jl.exports;
const Vt = Od(z);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tu = z,
    nu = Symbol.for("react.element"),
    ru = Symbol.for("react.fragment"),
    au = Object.prototype.hasOwnProperty,
    su = tu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    iu = { key: !0, ref: !0, __self: !0, __source: !0 };
function Pl(e, t, n) {
    var a,
        s = {},
        i = null,
        o = null;
    n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
    for (a in t) au.call(t, a) && !iu.hasOwnProperty(a) && (s[a] = t[a]);
    if (e && e.defaultProps) for (a in ((t = e.defaultProps), t)) s[a] === void 0 && (s[a] = t[a]);
    return { $$typeof: nu, type: e, key: i, ref: o, props: s, _owner: su.current };
}
xa.Fragment = ru;
xa.jsx = Pl;
xa.jsxs = Pl;
yl.exports = xa;
var r = yl.exports,
    ds = {},
    Al = { exports: {} },
    be = {},
    Rl = { exports: {} },
    Tl = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
    function t(C, T) {
        var L = C.length;
        C.push(T);
        e: for (; 0 < L; ) {
            var O = (L - 1) >>> 1,
                W = C[O];
            if (0 < s(W, T)) (C[O] = T), (C[L] = W), (L = O);
            else break e;
        }
    }
    function n(C) {
        return C.length === 0 ? null : C[0];
    }
    function a(C) {
        if (C.length === 0) return null;
        var T = C[0],
            L = C.pop();
        if (L !== T) {
            C[0] = L;
            e: for (var O = 0, W = C.length, lt = W >>> 1; O < lt; ) {
                var Ye = 2 * (O + 1) - 1,
                    At = C[Ye],
                    Ke = Ye + 1,
                    vr = C[Ke];
                if (0 > s(At, L))
                    Ke < W && 0 > s(vr, At)
                        ? ((C[O] = vr), (C[Ke] = L), (O = Ke))
                        : ((C[O] = At), (C[Ye] = L), (O = Ye));
                else if (Ke < W && 0 > s(vr, L)) (C[O] = vr), (C[Ke] = L), (O = Ke);
                else break e;
            }
        }
        return T;
    }
    function s(C, T) {
        var L = C.sortIndex - T.sortIndex;
        return L !== 0 ? L : C.id - T.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var i = performance;
        e.unstable_now = function () {
            return i.now();
        };
    } else {
        var o = Date,
            l = o.now();
        e.unstable_now = function () {
            return o.now() - l;
        };
    }
    var c = [],
        d = [],
        v = 1,
        h = null,
        f = 3,
        x = !1,
        w = !1,
        k = !1,
        R = typeof setTimeout == "function" ? setTimeout : null,
        m = typeof clearTimeout == "function" ? clearTimeout : null,
        u = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function p(C) {
        for (var T = n(d); T !== null; ) {
            if (T.callback === null) a(d);
            else if (T.startTime <= C) a(d), (T.sortIndex = T.expirationTime), t(c, T);
            else break;
            T = n(d);
        }
    }
    function g(C) {
        if (((k = !1), p(C), !w))
            if (n(c) !== null) (w = !0), $e(y);
            else {
                var T = n(d);
                T !== null && he(g, T.startTime - C);
            }
    }
    function y(C, T) {
        (w = !1), k && ((k = !1), m(E), (E = -1)), (x = !0);
        var L = f;
        try {
            for (p(T), h = n(c); h !== null && (!(h.expirationTime > T) || (C && !Y())); ) {
                var O = h.callback;
                if (typeof O == "function") {
                    (h.callback = null), (f = h.priorityLevel);
                    var W = O(h.expirationTime <= T);
                    (T = e.unstable_now()), typeof W == "function" ? (h.callback = W) : h === n(c) && a(c), p(T);
                } else a(c);
                h = n(c);
            }
            if (h !== null) var lt = !0;
            else {
                var Ye = n(d);
                Ye !== null && he(g, Ye.startTime - T), (lt = !1);
            }
            return lt;
        } finally {
            (h = null), (f = L), (x = !1);
        }
    }
    var S = !1,
        b = null,
        E = -1,
        _ = 5,
        A = -1;
    function Y() {
        return !(e.unstable_now() - A < _);
    }
    function de() {
        if (b !== null) {
            var C = e.unstable_now();
            A = C;
            var T = !0;
            try {
                T = b(!0, C);
            } finally {
                T ? Ie() : ((S = !1), (b = null));
            }
        } else S = !1;
    }
    var Ie;
    if (typeof u == "function")
        Ie = function () {
            u(de);
        };
    else if (typeof MessageChannel < "u") {
        var Ee = new MessageChannel(),
            Gt = Ee.port2;
        (Ee.port1.onmessage = de),
            (Ie = function () {
                Gt.postMessage(null);
            });
    } else
        Ie = function () {
            R(de, 0);
        };
    function $e(C) {
        (b = C), S || ((S = !0), Ie());
    }
    function he(C, T) {
        E = R(function () {
            C(e.unstable_now());
        }, T);
    }
    (e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (C) {
            C.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            w || x || ((w = !0), $e(y));
        }),
        (e.unstable_forceFrameRate = function (C) {
            0 > C || 125 < C
                ? console.error(
                      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                  )
                : (_ = 0 < C ? Math.floor(1e3 / C) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return f;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(c);
        }),
        (e.unstable_next = function (C) {
            switch (f) {
                case 1:
                case 2:
                case 3:
                    var T = 3;
                    break;
                default:
                    T = f;
            }
            var L = f;
            f = T;
            try {
                return C();
            } finally {
                f = L;
            }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (C, T) {
            switch (C) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    C = 3;
            }
            var L = f;
            f = C;
            try {
                return T();
            } finally {
                f = L;
            }
        }),
        (e.unstable_scheduleCallback = function (C, T, L) {
            var O = e.unstable_now();
            switch (
                (typeof L == "object" && L !== null
                    ? ((L = L.delay), (L = typeof L == "number" && 0 < L ? O + L : O))
                    : (L = O),
                C)
            ) {
                case 1:
                    var W = -1;
                    break;
                case 2:
                    W = 250;
                    break;
                case 5:
                    W = 1073741823;
                    break;
                case 4:
                    W = 1e4;
                    break;
                default:
                    W = 5e3;
            }
            return (
                (W = L + W),
                (C = { id: v++, callback: T, priorityLevel: C, startTime: L, expirationTime: W, sortIndex: -1 }),
                L > O
                    ? ((C.sortIndex = L),
                      t(d, C),
                      n(c) === null && C === n(d) && (k ? (m(E), (E = -1)) : (k = !0), he(g, L - O)))
                    : ((C.sortIndex = W), t(c, C), w || x || ((w = !0), $e(y))),
                C
            );
        }),
        (e.unstable_shouldYield = Y),
        (e.unstable_wrapCallback = function (C) {
            var T = f;
            return function () {
                var L = f;
                f = T;
                try {
                    return C.apply(this, arguments);
                } finally {
                    f = L;
                }
            };
        });
})(Tl);
Rl.exports = Tl;
var ou = Rl.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var lu = z,
    Se = ou;
function N(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
}
var Ll = new Set(),
    Qn = {};
function Ht(e, t) {
    hn(e, t), hn(e + "Capture", t);
}
function hn(e, t) {
    for (Qn[e] = t, e = 0; e < t.length; e++) Ll.add(t[e]);
}
var rt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    us = Object.prototype.hasOwnProperty,
    cu =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    ro = {},
    ao = {};
function du(e) {
    return us.call(ao, e) ? !0 : us.call(ro, e) ? !1 : cu.test(e) ? (ao[e] = !0) : ((ro[e] = !0), !1);
}
function uu(e, t, n, a) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return a
                ? !1
                : n !== null
                  ? !n.acceptsBooleans
                  : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
        default:
            return !1;
    }
}
function pu(e, t, n, a) {
    if (t === null || typeof t > "u" || uu(e, t, n, a)) return !0;
    if (a) return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t;
        }
    return !1;
}
function fe(e, t, n, a, s, i, o) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = a),
        (this.attributeNamespace = s),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = i),
        (this.removeEmptyString = o);
}
var se = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
        se[e] = new fe(e, 0, !1, e, null, !1, !1);
    });
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
].forEach(function (e) {
    var t = e[0];
    se[t] = new fe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    se[e] = new fe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
    se[e] = new fe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
        se[e] = new fe(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
    se[e] = new fe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
    se[e] = new fe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
    se[e] = new fe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
    se[e] = new fe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ci = /[\-:]([a-z])/g;
function di(e) {
    return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(ci, di);
        se[t] = new fe(t, 1, !1, e, null, !1, !1);
    });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
    var t = e.replace(ci, di);
    se[t] = new fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(ci, di);
    se[t] = new fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
    se[e] = new fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
se.xlinkHref = new fe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (e) {
    se[e] = new fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ui(e, t, n, a) {
    var s = se.hasOwnProperty(t) ? se[t] : null;
    (s !== null
        ? s.type !== 0
        : a || !(2 < t.length) || (t[0] !== "o" && t[0] !== "O") || (t[1] !== "n" && t[1] !== "N")) &&
        (pu(t, n, s, a) && (n = null),
        a || s === null
            ? du(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
            : s.mustUseProperty
              ? (e[s.propertyName] = n === null ? (s.type === 3 ? !1 : "") : n)
              : ((t = s.attributeName),
                (a = s.attributeNamespace),
                n === null
                    ? e.removeAttribute(t)
                    : ((s = s.type),
                      (n = s === 3 || (s === 4 && n === !0) ? "" : "" + n),
                      a ? e.setAttributeNS(a, t, n) : e.setAttribute(t, n))));
}
var ot = lu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    xr = Symbol.for("react.element"),
    Yt = Symbol.for("react.portal"),
    Kt = Symbol.for("react.fragment"),
    pi = Symbol.for("react.strict_mode"),
    ps = Symbol.for("react.profiler"),
    _l = Symbol.for("react.provider"),
    Il = Symbol.for("react.context"),
    mi = Symbol.for("react.forward_ref"),
    ms = Symbol.for("react.suspense"),
    fs = Symbol.for("react.suspense_list"),
    fi = Symbol.for("react.memo"),
    dt = Symbol.for("react.lazy"),
    Ml = Symbol.for("react.offscreen"),
    so = Symbol.iterator;
function bn(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (so && e[so]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var Q = Object.assign,
    Fa;
function _n(e) {
    if (Fa === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            Fa = (t && t[1]) || "";
        }
    return (
        `
` +
        Fa +
        e
    );
}
var Oa = !1;
function Wa(e, t) {
    if (!e || Oa) return "";
    Oa = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (
                ((t = function () {
                    throw Error();
                }),
                Object.defineProperty(t.prototype, "props", {
                    set: function () {
                        throw Error();
                    },
                }),
                typeof Reflect == "object" && Reflect.construct)
            ) {
                try {
                    Reflect.construct(t, []);
                } catch (d) {
                    var a = d;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (d) {
                    a = d;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (d) {
                a = d;
            }
            e();
        }
    } catch (d) {
        if (d && a && typeof d.stack == "string") {
            for (
                var s = d.stack.split(`
`),
                    i = a.stack.split(`
`),
                    o = s.length - 1,
                    l = i.length - 1;
                1 <= o && 0 <= l && s[o] !== i[l];

            )
                l--;
            for (; 1 <= o && 0 <= l; o--, l--)
                if (s[o] !== i[l]) {
                    if (o !== 1 || l !== 1)
                        do
                            if ((o--, l--, 0 > l || s[o] !== i[l])) {
                                var c =
                                    `
` + s[o].replace(" at new ", " at ");
                                return (
                                    e.displayName &&
                                        c.includes("<anonymous>") &&
                                        (c = c.replace("<anonymous>", e.displayName)),
                                    c
                                );
                            }
                        while (1 <= o && 0 <= l);
                    break;
                }
        }
    } finally {
        (Oa = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? _n(e) : "";
}
function mu(e) {
    switch (e.tag) {
        case 5:
            return _n(e.type);
        case 16:
            return _n("Lazy");
        case 13:
            return _n("Suspense");
        case 19:
            return _n("SuspenseList");
        case 0:
        case 2:
        case 15:
            return (e = Wa(e.type, !1)), e;
        case 11:
            return (e = Wa(e.type.render, !1)), e;
        case 1:
            return (e = Wa(e.type, !0)), e;
        default:
            return "";
    }
}
function hs(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case Kt:
            return "Fragment";
        case Yt:
            return "Portal";
        case ps:
            return "Profiler";
        case pi:
            return "StrictMode";
        case ms:
            return "Suspense";
        case fs:
            return "SuspenseList";
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
            case Il:
                return (e.displayName || "Context") + ".Consumer";
            case _l:
                return (e._context.displayName || "Context") + ".Provider";
            case mi:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e || ((e = t.displayName || t.name || ""), (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
                    e
                );
            case fi:
                return (t = e.displayName || null), t !== null ? t : hs(e.type) || "Memo";
            case dt:
                (t = e._payload), (e = e._init);
                try {
                    return hs(e(t));
                } catch {}
        }
    return null;
}
function fu(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return (
                (e = t.render),
                (e = e.displayName || e.name || ""),
                t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
            );
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return hs(t);
        case 8:
            return t === pi ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t;
    }
    return null;
}
function St(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return "";
    }
}
function Dl(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function hu(e) {
    var t = Dl(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        a = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var s = n.get,
            i = n.set;
        return (
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return s.call(this);
                },
                set: function (o) {
                    (a = "" + o), i.call(this, o);
                },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
                getValue: function () {
                    return a;
                },
                setValue: function (o) {
                    a = "" + o;
                },
                stopTracking: function () {
                    (e._valueTracker = null), delete e[t];
                },
            }
        );
    }
}
function yr(e) {
    e._valueTracker || (e._valueTracker = hu(e));
}
function Fl(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        a = "";
    return e && (a = Dl(e) ? (e.checked ? "true" : "false") : e.value), (e = a), e !== n ? (t.setValue(e), !0) : !1;
}
function Gr(e) {
    if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")) return null;
    try {
        return e.activeElement || e.body;
    } catch {
        return e.body;
    }
}
function vs(e, t) {
    var n = t.checked;
    return Q({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
    });
}
function io(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        a = t.checked != null ? t.checked : t.defaultChecked;
    (n = St(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: a,
            initialValue: n,
            controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null,
        });
}
function Ol(e, t) {
    (t = t.checked), t != null && ui(e, "checked", t, !1);
}
function gs(e, t) {
    Ol(e, t);
    var n = St(t.value),
        a = t.type;
    if (n != null)
        a === "number"
            ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
            : e.value !== "" + n && (e.value = "" + n);
    else if (a === "submit" || a === "reset") {
        e.removeAttribute("value");
        return;
    }
    t.hasOwnProperty("value")
        ? xs(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && xs(e, t.type, St(t.defaultValue)),
        t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function oo(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var a = t.type;
        if (!((a !== "submit" && a !== "reset") || (t.value !== void 0 && t.value !== null))) return;
        (t = "" + e._wrapperState.initialValue), n || t === e.value || (e.value = t), (e.defaultValue = t);
    }
    (n = e.name),
        n !== "" && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== "" && (e.name = n);
}
function xs(e, t, n) {
    (t !== "number" || Gr(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = "" + e._wrapperState.initialValue)
            : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var In = Array.isArray;
function cn(e, t, n, a) {
    if (((e = e.options), t)) {
        t = {};
        for (var s = 0; s < n.length; s++) t["$" + n[s]] = !0;
        for (n = 0; n < e.length; n++)
            (s = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== s && (e[n].selected = s),
                s && a && (e[n].defaultSelected = !0);
    } else {
        for (n = "" + St(n), t = null, s = 0; s < e.length; s++) {
            if (e[s].value === n) {
                (e[s].selected = !0), a && (e[s].defaultSelected = !0);
                return;
            }
            t !== null || e[s].disabled || (t = e[s]);
        }
        t !== null && (t.selected = !0);
    }
}
function ys(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
    return Q({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function lo(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(N(92));
            if (In(n)) {
                if (1 < n.length) throw Error(N(93));
                n = n[0];
            }
            t = n;
        }
        t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: St(n) };
}
function Wl(e, t) {
    var n = St(t.value),
        a = St(t.defaultValue);
    n != null &&
        ((n = "" + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        a != null && (e.defaultValue = "" + a);
}
function co(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Bl(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml";
    }
}
function js(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
        ? Bl(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
          ? "http://www.w3.org/1999/xhtml"
          : e;
}
var jr,
    ql = (function (e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
            ? function (t, n, a, s) {
                  MSApp.execUnsafeLocalFunction(function () {
                      return e(t, n, a, s);
                  });
              }
            : e;
    })(function (e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
        else {
            for (
                jr = jr || document.createElement("div"),
                    jr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
                    t = jr.firstChild;
                e.firstChild;

            )
                e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
    });
function Gn(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var Fn = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
    },
    vu = ["Webkit", "ms", "Moz", "O"];
Object.keys(Fn).forEach(function (e) {
    vu.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Fn[t] = Fn[e]);
    });
});
function Ul(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
        ? ""
        : n || typeof t != "number" || t === 0 || (Fn.hasOwnProperty(e) && Fn[e])
          ? ("" + t).trim()
          : t + "px";
}
function $l(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var a = n.indexOf("--") === 0,
                s = Ul(n, t[n], a);
            n === "float" && (n = "cssFloat"), a ? e.setProperty(n, s) : (e[n] = s);
        }
}
var gu = Q(
    { menuitem: !0 },
    {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
    }
);
function ws(e, t) {
    if (t) {
        if (gu[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(N(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(N(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
                throw Error(N(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(N(62));
    }
}
function Ns(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0;
    }
}
var ks = null;
function hi(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var Ss = null,
    dn = null,
    un = null;
function uo(e) {
    if ((e = mr(e))) {
        if (typeof Ss != "function") throw Error(N(280));
        var t = e.stateNode;
        t && ((t = ka(t)), Ss(e.stateNode, e.type, t));
    }
}
function Vl(e) {
    dn ? (un ? un.push(e) : (un = [e])) : (dn = e);
}
function Hl() {
    if (dn) {
        var e = dn,
            t = un;
        if (((un = dn = null), uo(e), t)) for (e = 0; e < t.length; e++) uo(t[e]);
    }
}
function Ql(e, t) {
    return e(t);
}
function Gl() {}
var Ba = !1;
function Xl(e, t, n) {
    if (Ba) return e(t, n);
    Ba = !0;
    try {
        return Ql(e, t, n);
    } finally {
        (Ba = !1), (dn !== null || un !== null) && (Gl(), Hl());
    }
}
function Xn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var a = ka(n);
    if (a === null) return null;
    n = a[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (a = !a.disabled) ||
                ((e = e.type), (a = !(e === "button" || e === "input" || e === "select" || e === "textarea"))),
                (e = !a);
            break e;
        default:
            e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(N(231, t, typeof n));
    return n;
}
var bs = !1;
if (rt)
    try {
        var Cn = {};
        Object.defineProperty(Cn, "passive", {
            get: function () {
                bs = !0;
            },
        }),
            window.addEventListener("test", Cn, Cn),
            window.removeEventListener("test", Cn, Cn);
    } catch {
        bs = !1;
    }
function xu(e, t, n, a, s, i, o, l, c) {
    var d = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, d);
    } catch (v) {
        this.onError(v);
    }
}
var On = !1,
    Xr = null,
    Yr = !1,
    Cs = null,
    yu = {
        onError: function (e) {
            (On = !0), (Xr = e);
        },
    };
function ju(e, t, n, a, s, i, o, l, c) {
    (On = !1), (Xr = null), xu.apply(yu, arguments);
}
function wu(e, t, n, a, s, i, o, l, c) {
    if ((ju.apply(this, arguments), On)) {
        if (On) {
            var d = Xr;
            (On = !1), (Xr = null);
        } else throw Error(N(198));
        Yr || ((Yr = !0), (Cs = d));
    }
}
function Qt(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
        e = t;
        do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
        while (e);
    }
    return t.tag === 3 ? n : null;
}
function Yl(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null)) return t.dehydrated;
    }
    return null;
}
function po(e) {
    if (Qt(e) !== e) throw Error(N(188));
}
function Nu(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = Qt(e)), t === null)) throw Error(N(188));
        return t !== e ? null : e;
    }
    for (var n = e, a = t; ; ) {
        var s = n.return;
        if (s === null) break;
        var i = s.alternate;
        if (i === null) {
            if (((a = s.return), a !== null)) {
                n = a;
                continue;
            }
            break;
        }
        if (s.child === i.child) {
            for (i = s.child; i; ) {
                if (i === n) return po(s), e;
                if (i === a) return po(s), t;
                i = i.sibling;
            }
            throw Error(N(188));
        }
        if (n.return !== a.return) (n = s), (a = i);
        else {
            for (var o = !1, l = s.child; l; ) {
                if (l === n) {
                    (o = !0), (n = s), (a = i);
                    break;
                }
                if (l === a) {
                    (o = !0), (a = s), (n = i);
                    break;
                }
                l = l.sibling;
            }
            if (!o) {
                for (l = i.child; l; ) {
                    if (l === n) {
                        (o = !0), (n = i), (a = s);
                        break;
                    }
                    if (l === a) {
                        (o = !0), (a = i), (n = s);
                        break;
                    }
                    l = l.sibling;
                }
                if (!o) throw Error(N(189));
            }
        }
        if (n.alternate !== a) throw Error(N(190));
    }
    if (n.tag !== 3) throw Error(N(188));
    return n.stateNode.current === n ? e : t;
}
function Kl(e) {
    return (e = Nu(e)), e !== null ? Zl(e) : null;
}
function Zl(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
        var t = Zl(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var Jl = Se.unstable_scheduleCallback,
    mo = Se.unstable_cancelCallback,
    ku = Se.unstable_shouldYield,
    Su = Se.unstable_requestPaint,
    K = Se.unstable_now,
    bu = Se.unstable_getCurrentPriorityLevel,
    vi = Se.unstable_ImmediatePriority,
    ec = Se.unstable_UserBlockingPriority,
    Kr = Se.unstable_NormalPriority,
    Cu = Se.unstable_LowPriority,
    tc = Se.unstable_IdlePriority,
    ya = null,
    Ge = null;
function Eu(e) {
    if (Ge && typeof Ge.onCommitFiberRoot == "function")
        try {
            Ge.onCommitFiberRoot(ya, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
}
var We = Math.clz32 ? Math.clz32 : Au,
    zu = Math.log,
    Pu = Math.LN2;
function Au(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((zu(e) / Pu) | 0)) | 0;
}
var wr = 64,
    Nr = 4194304;
function Mn(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e;
    }
}
function Zr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var a = 0,
        s = e.suspendedLanes,
        i = e.pingedLanes,
        o = n & 268435455;
    if (o !== 0) {
        var l = o & ~s;
        l !== 0 ? (a = Mn(l)) : ((i &= o), i !== 0 && (a = Mn(i)));
    } else (o = n & ~s), o !== 0 ? (a = Mn(o)) : i !== 0 && (a = Mn(i));
    if (a === 0) return 0;
    if (t !== 0 && t !== a && !(t & s) && ((s = a & -a), (i = t & -t), s >= i || (s === 16 && (i & 4194240) !== 0)))
        return t;
    if ((a & 4 && (a |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= a; 0 < t; ) (n = 31 - We(t)), (s = 1 << n), (a |= e[n]), (t &= ~s);
    return a;
}
function Ru(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1;
    }
}
function Tu(e, t) {
    for (var n = e.suspendedLanes, a = e.pingedLanes, s = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
        var o = 31 - We(i),
            l = 1 << o,
            c = s[o];
        c === -1 ? (!(l & n) || l & a) && (s[o] = Ru(l, t)) : c <= t && (e.expiredLanes |= l), (i &= ~l);
    }
}
function Es(e) {
    return (e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function nc() {
    var e = wr;
    return (wr <<= 1), !(wr & 4194240) && (wr = 64), e;
}
function qa(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function ur(e, t, n) {
    (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - We(t)),
        (e[t] = n);
}
function Lu(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements);
    var a = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var s = 31 - We(n),
            i = 1 << s;
        (t[s] = 0), (a[s] = -1), (e[s] = -1), (n &= ~i);
    }
}
function gi(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
        var a = 31 - We(n),
            s = 1 << a;
        (s & t) | (e[a] & t) && (e[a] |= t), (n &= ~s);
    }
}
var F = 0;
function rc(e) {
    return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var ac,
    xi,
    sc,
    ic,
    oc,
    zs = !1,
    kr = [],
    vt = null,
    gt = null,
    xt = null,
    Yn = new Map(),
    Kn = new Map(),
    pt = [],
    _u =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
            " "
        );
function fo(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            vt = null;
            break;
        case "dragenter":
        case "dragleave":
            gt = null;
            break;
        case "mouseover":
        case "mouseout":
            xt = null;
            break;
        case "pointerover":
        case "pointerout":
            Yn.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Kn.delete(t.pointerId);
    }
}
function En(e, t, n, a, s, i) {
    return e === null || e.nativeEvent !== i
        ? ((e = { blockedOn: t, domEventName: n, eventSystemFlags: a, nativeEvent: i, targetContainers: [s] }),
          t !== null && ((t = mr(t)), t !== null && xi(t)),
          e)
        : ((e.eventSystemFlags |= a), (t = e.targetContainers), s !== null && t.indexOf(s) === -1 && t.push(s), e);
}
function Iu(e, t, n, a, s) {
    switch (t) {
        case "focusin":
            return (vt = En(vt, e, t, n, a, s)), !0;
        case "dragenter":
            return (gt = En(gt, e, t, n, a, s)), !0;
        case "mouseover":
            return (xt = En(xt, e, t, n, a, s)), !0;
        case "pointerover":
            var i = s.pointerId;
            return Yn.set(i, En(Yn.get(i) || null, e, t, n, a, s)), !0;
        case "gotpointercapture":
            return (i = s.pointerId), Kn.set(i, En(Kn.get(i) || null, e, t, n, a, s)), !0;
    }
    return !1;
}
function lc(e) {
    var t = _t(e.target);
    if (t !== null) {
        var n = Qt(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = Yl(n)), t !== null)) {
                    (e.blockedOn = t),
                        oc(e.priority, function () {
                            sc(n);
                        });
                    return;
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
            }
        }
    }
    e.blockedOn = null;
}
function Fr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Ps(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var a = new n.constructor(n.type, n);
            (ks = a), n.target.dispatchEvent(a), (ks = null);
        } else return (t = mr(n)), t !== null && xi(t), (e.blockedOn = n), !1;
        t.shift();
    }
    return !0;
}
function ho(e, t, n) {
    Fr(e) && n.delete(t);
}
function Mu() {
    (zs = !1),
        vt !== null && Fr(vt) && (vt = null),
        gt !== null && Fr(gt) && (gt = null),
        xt !== null && Fr(xt) && (xt = null),
        Yn.forEach(ho),
        Kn.forEach(ho);
}
function zn(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null), zs || ((zs = !0), Se.unstable_scheduleCallback(Se.unstable_NormalPriority, Mu)));
}
function Zn(e) {
    function t(s) {
        return zn(s, e);
    }
    if (0 < kr.length) {
        zn(kr[0], e);
        for (var n = 1; n < kr.length; n++) {
            var a = kr[n];
            a.blockedOn === e && (a.blockedOn = null);
        }
    }
    for (
        vt !== null && zn(vt, e),
            gt !== null && zn(gt, e),
            xt !== null && zn(xt, e),
            Yn.forEach(t),
            Kn.forEach(t),
            n = 0;
        n < pt.length;
        n++
    )
        (a = pt[n]), a.blockedOn === e && (a.blockedOn = null);
    for (; 0 < pt.length && ((n = pt[0]), n.blockedOn === null); ) lc(n), n.blockedOn === null && pt.shift();
}
var pn = ot.ReactCurrentBatchConfig,
    Jr = !0;
function Du(e, t, n, a) {
    var s = F,
        i = pn.transition;
    pn.transition = null;
    try {
        (F = 1), yi(e, t, n, a);
    } finally {
        (F = s), (pn.transition = i);
    }
}
function Fu(e, t, n, a) {
    var s = F,
        i = pn.transition;
    pn.transition = null;
    try {
        (F = 4), yi(e, t, n, a);
    } finally {
        (F = s), (pn.transition = i);
    }
}
function yi(e, t, n, a) {
    if (Jr) {
        var s = Ps(e, t, n, a);
        if (s === null) Za(e, t, a, ea, n), fo(e, a);
        else if (Iu(s, e, t, n, a)) a.stopPropagation();
        else if ((fo(e, a), t & 4 && -1 < _u.indexOf(e))) {
            for (; s !== null; ) {
                var i = mr(s);
                if ((i !== null && ac(i), (i = Ps(e, t, n, a)), i === null && Za(e, t, a, ea, n), i === s)) break;
                s = i;
            }
            s !== null && a.stopPropagation();
        } else Za(e, t, a, null, n);
    }
}
var ea = null;
function Ps(e, t, n, a) {
    if (((ea = null), (e = hi(a)), (e = _t(e)), e !== null))
        if (((t = Qt(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = Yl(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return (ea = e), null;
}
function cc(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (bu()) {
                case vi:
                    return 1;
                case ec:
                    return 4;
                case Kr:
                case Cu:
                    return 16;
                case tc:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var ft = null,
    ji = null,
    Or = null;
function dc() {
    if (Or) return Or;
    var e,
        t = ji,
        n = t.length,
        a,
        s = "value" in ft ? ft.value : ft.textContent,
        i = s.length;
    for (e = 0; e < n && t[e] === s[e]; e++);
    var o = n - e;
    for (a = 1; a <= o && t[n - a] === s[i - a]; a++);
    return (Or = s.slice(e, 1 < a ? 1 - a : void 0));
}
function Wr(e) {
    var t = e.keyCode;
    return (
        "charCode" in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function Sr() {
    return !0;
}
function vo() {
    return !1;
}
function Ce(e) {
    function t(n, a, s, i, o) {
        (this._reactName = n),
            (this._targetInst = s),
            (this.type = a),
            (this.nativeEvent = i),
            (this.target = o),
            (this.currentTarget = null);
        for (var l in e) e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(i) : i[l]));
        return (
            (this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1)
                ? Sr
                : vo),
            (this.isPropagationStopped = vo),
            this
        );
    }
    return (
        Q(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
                    (this.isDefaultPrevented = Sr));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
                    (this.isPropagationStopped = Sr));
            },
            persist: function () {},
            isPersistent: Sr,
        }),
        t
    );
}
var kn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
    },
    wi = Ce(kn),
    pr = Q({}, kn, { view: 0, detail: 0 }),
    Ou = Ce(pr),
    Ua,
    $a,
    Pn,
    ja = Q({}, pr, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Ni,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0
                ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                : e.relatedTarget;
        },
        movementX: function (e) {
            return "movementX" in e
                ? e.movementX
                : (e !== Pn &&
                      (Pn && e.type === "mousemove"
                          ? ((Ua = e.screenX - Pn.screenX), ($a = e.screenY - Pn.screenY))
                          : ($a = Ua = 0),
                      (Pn = e)),
                  Ua);
        },
        movementY: function (e) {
            return "movementY" in e ? e.movementY : $a;
        },
    }),
    go = Ce(ja),
    Wu = Q({}, ja, { dataTransfer: 0 }),
    Bu = Ce(Wu),
    qu = Q({}, pr, { relatedTarget: 0 }),
    Va = Ce(qu),
    Uu = Q({}, kn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    $u = Ce(Uu),
    Vu = Q({}, kn, {
        clipboardData: function (e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
    }),
    Hu = Ce(Vu),
    Qu = Q({}, kn, { data: 0 }),
    xo = Ce(Qu),
    Gu = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
    },
    Xu = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
    },
    Yu = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Ku(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Yu[e]) ? !!t[e] : !1;
}
function Ni() {
    return Ku;
}
var Zu = Q({}, pr, {
        key: function (e) {
            if (e.key) {
                var t = Gu[e.key] || e.key;
                if (t !== "Unidentified") return t;
            }
            return e.type === "keypress"
                ? ((e = Wr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
                : e.type === "keydown" || e.type === "keyup"
                  ? Xu[e.keyCode] || "Unidentified"
                  : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Ni,
        charCode: function (e) {
            return e.type === "keypress" ? Wr(e) : 0;
        },
        keyCode: function (e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
            return e.type === "keypress" ? Wr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
    }),
    Ju = Ce(Zu),
    ep = Q({}, ja, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
    }),
    yo = Ce(ep),
    tp = Q({}, pr, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Ni,
    }),
    np = Ce(tp),
    rp = Q({}, kn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ap = Ce(rp),
    sp = Q({}, ja, {
        deltaX: function (e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
        },
        deltaY: function (e) {
            return "deltaY" in e
                ? e.deltaY
                : "wheelDeltaY" in e
                  ? -e.wheelDeltaY
                  : "wheelDelta" in e
                    ? -e.wheelDelta
                    : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
    }),
    ip = Ce(sp),
    op = [9, 13, 27, 32],
    ki = rt && "CompositionEvent" in window,
    Wn = null;
rt && "documentMode" in document && (Wn = document.documentMode);
var lp = rt && "TextEvent" in window && !Wn,
    uc = rt && (!ki || (Wn && 8 < Wn && 11 >= Wn)),
    jo = " ",
    wo = !1;
function pc(e, t) {
    switch (e) {
        case "keyup":
            return op.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1;
    }
}
function mc(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Zt = !1;
function cp(e, t) {
    switch (e) {
        case "compositionend":
            return mc(t);
        case "keypress":
            return t.which !== 32 ? null : ((wo = !0), jo);
        case "textInput":
            return (e = t.data), e === jo && wo ? null : e;
        default:
            return null;
    }
}
function dp(e, t) {
    if (Zt)
        return e === "compositionend" || (!ki && pc(e, t)) ? ((e = dc()), (Or = ji = ft = null), (Zt = !1), e) : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
            }
            return null;
        case "compositionend":
            return uc && t.locale !== "ko" ? null : t.data;
        default:
            return null;
    }
}
var up = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
};
function No(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!up[e.type] : t === "textarea";
}
function fc(e, t, n, a) {
    Vl(a),
        (t = ta(t, "onChange")),
        0 < t.length && ((n = new wi("onChange", "change", null, n, a)), e.push({ event: n, listeners: t }));
}
var Bn = null,
    Jn = null;
function pp(e) {
    bc(e, 0);
}
function wa(e) {
    var t = tn(e);
    if (Fl(t)) return e;
}
function mp(e, t) {
    if (e === "change") return t;
}
var hc = !1;
if (rt) {
    var Ha;
    if (rt) {
        var Qa = "oninput" in document;
        if (!Qa) {
            var ko = document.createElement("div");
            ko.setAttribute("oninput", "return;"), (Qa = typeof ko.oninput == "function");
        }
        Ha = Qa;
    } else Ha = !1;
    hc = Ha && (!document.documentMode || 9 < document.documentMode);
}
function So() {
    Bn && (Bn.detachEvent("onpropertychange", vc), (Jn = Bn = null));
}
function vc(e) {
    if (e.propertyName === "value" && wa(Jn)) {
        var t = [];
        fc(t, Jn, e, hi(e)), Xl(pp, t);
    }
}
function fp(e, t, n) {
    e === "focusin" ? (So(), (Bn = t), (Jn = n), Bn.attachEvent("onpropertychange", vc)) : e === "focusout" && So();
}
function hp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return wa(Jn);
}
function vp(e, t) {
    if (e === "click") return wa(t);
}
function gp(e, t) {
    if (e === "input" || e === "change") return wa(t);
}
function xp(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var qe = typeof Object.is == "function" ? Object.is : xp;
function er(e, t) {
    if (qe(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e),
        a = Object.keys(t);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
        var s = n[a];
        if (!us.call(t, s) || !qe(e[s], t[s])) return !1;
    }
    return !0;
}
function bo(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
}
function Co(e, t) {
    var n = bo(e);
    e = 0;
    for (var a; n; ) {
        if (n.nodeType === 3) {
            if (((a = e + n.textContent.length), e <= t && a >= t)) return { node: n, offset: t - e };
            e = a;
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e;
                }
                n = n.parentNode;
            }
            n = void 0;
        }
        n = bo(n);
    }
}
function gc(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
              ? !1
              : t && t.nodeType === 3
                ? gc(e, t.parentNode)
                : "contains" in e
                  ? e.contains(t)
                  : e.compareDocumentPosition
                    ? !!(e.compareDocumentPosition(t) & 16)
                    : !1
        : !1;
}
function xc() {
    for (var e = window, t = Gr(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string";
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = Gr(e.document);
    }
    return t;
}
function Si(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
        t &&
        ((t === "input" &&
            (e.type === "text" ||
                e.type === "search" ||
                e.type === "tel" ||
                e.type === "url" ||
                e.type === "password")) ||
            t === "textarea" ||
            e.contentEditable === "true")
    );
}
function yp(e) {
    var t = xc(),
        n = e.focusedElem,
        a = e.selectionRange;
    if (t !== n && n && n.ownerDocument && gc(n.ownerDocument.documentElement, n)) {
        if (a !== null && Si(n)) {
            if (((t = a.start), (e = a.end), e === void 0 && (e = t), "selectionStart" in n))
                (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
            else if (((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)) {
                e = e.getSelection();
                var s = n.textContent.length,
                    i = Math.min(a.start, s);
                (a = a.end === void 0 ? i : Math.min(a.end, s)),
                    !e.extend && i > a && ((s = a), (a = i), (i = s)),
                    (s = Co(n, i));
                var o = Co(n, a);
                s &&
                    o &&
                    (e.rangeCount !== 1 ||
                        e.anchorNode !== s.node ||
                        e.anchorOffset !== s.offset ||
                        e.focusNode !== o.node ||
                        e.focusOffset !== o.offset) &&
                    ((t = t.createRange()),
                    t.setStart(s.node, s.offset),
                    e.removeAllRanges(),
                    i > a ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
            }
        }
        for (t = [], e = n; (e = e.parentNode); )
            e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
            (e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top);
    }
}
var jp = rt && "documentMode" in document && 11 >= document.documentMode,
    Jt = null,
    As = null,
    qn = null,
    Rs = !1;
function Eo(e, t, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Rs ||
        Jt == null ||
        Jt !== Gr(a) ||
        ((a = Jt),
        "selectionStart" in a && Si(a)
            ? (a = { start: a.selectionStart, end: a.selectionEnd })
            : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
              (a = {
                  anchorNode: a.anchorNode,
                  anchorOffset: a.anchorOffset,
                  focusNode: a.focusNode,
                  focusOffset: a.focusOffset,
              })),
        (qn && er(qn, a)) ||
            ((qn = a),
            (a = ta(As, "onSelect")),
            0 < a.length &&
                ((t = new wi("onSelect", "select", null, t, n)), e.push({ event: t, listeners: a }), (t.target = Jt))));
}
function br(e, t) {
    var n = {};
    return (n[e.toLowerCase()] = t.toLowerCase()), (n["Webkit" + e] = "webkit" + t), (n["Moz" + e] = "moz" + t), n;
}
var en = {
        animationend: br("Animation", "AnimationEnd"),
        animationiteration: br("Animation", "AnimationIteration"),
        animationstart: br("Animation", "AnimationStart"),
        transitionend: br("Transition", "TransitionEnd"),
    },
    Ga = {},
    yc = {};
rt &&
    ((yc = document.createElement("div").style),
    "AnimationEvent" in window ||
        (delete en.animationend.animation, delete en.animationiteration.animation, delete en.animationstart.animation),
    "TransitionEvent" in window || delete en.transitionend.transition);
function Na(e) {
    if (Ga[e]) return Ga[e];
    if (!en[e]) return e;
    var t = en[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in yc) return (Ga[e] = t[n]);
    return e;
}
var jc = Na("animationend"),
    wc = Na("animationiteration"),
    Nc = Na("animationstart"),
    kc = Na("transitionend"),
    Sc = new Map(),
    zo =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
            " "
        );
function Ct(e, t) {
    Sc.set(e, t), Ht(t, [e]);
}
for (var Xa = 0; Xa < zo.length; Xa++) {
    var Ya = zo[Xa],
        wp = Ya.toLowerCase(),
        Np = Ya[0].toUpperCase() + Ya.slice(1);
    Ct(wp, "on" + Np);
}
Ct(jc, "onAnimationEnd");
Ct(wc, "onAnimationIteration");
Ct(Nc, "onAnimationStart");
Ct("dblclick", "onDoubleClick");
Ct("focusin", "onFocus");
Ct("focusout", "onBlur");
Ct(kc, "onTransitionEnd");
hn("onMouseEnter", ["mouseout", "mouseover"]);
hn("onMouseLeave", ["mouseout", "mouseover"]);
hn("onPointerEnter", ["pointerout", "pointerover"]);
hn("onPointerLeave", ["pointerout", "pointerover"]);
Ht("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ht("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ht("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ht("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ht("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ht("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Dn =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
            " "
        ),
    kp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Dn));
function Po(e, t, n) {
    var a = e.type || "unknown-event";
    (e.currentTarget = n), wu(a, t, void 0, e), (e.currentTarget = null);
}
function bc(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var a = e[n],
            s = a.event;
        a = a.listeners;
        e: {
            var i = void 0;
            if (t)
                for (var o = a.length - 1; 0 <= o; o--) {
                    var l = a[o],
                        c = l.instance,
                        d = l.currentTarget;
                    if (((l = l.listener), c !== i && s.isPropagationStopped())) break e;
                    Po(s, l, d), (i = c);
                }
            else
                for (o = 0; o < a.length; o++) {
                    if (
                        ((l = a[o]),
                        (c = l.instance),
                        (d = l.currentTarget),
                        (l = l.listener),
                        c !== i && s.isPropagationStopped())
                    )
                        break e;
                    Po(s, l, d), (i = c);
                }
        }
    }
    if (Yr) throw ((e = Cs), (Yr = !1), (Cs = null), e);
}
function q(e, t) {
    var n = t[Ms];
    n === void 0 && (n = t[Ms] = new Set());
    var a = e + "__bubble";
    n.has(a) || (Cc(t, e, 2, !1), n.add(a));
}
function Ka(e, t, n) {
    var a = 0;
    t && (a |= 4), Cc(n, e, a, t);
}
var Cr = "_reactListening" + Math.random().toString(36).slice(2);
function tr(e) {
    if (!e[Cr]) {
        (e[Cr] = !0),
            Ll.forEach(function (n) {
                n !== "selectionchange" && (kp.has(n) || Ka(n, !1, e), Ka(n, !0, e));
            });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Cr] || ((t[Cr] = !0), Ka("selectionchange", !1, t));
    }
}
function Cc(e, t, n, a) {
    switch (cc(t)) {
        case 1:
            var s = Du;
            break;
        case 4:
            s = Fu;
            break;
        default:
            s = yi;
    }
    (n = s.bind(null, t, n, e)),
        (s = void 0),
        !bs || (t !== "touchstart" && t !== "touchmove" && t !== "wheel") || (s = !0),
        a
            ? s !== void 0
                ? e.addEventListener(t, n, { capture: !0, passive: s })
                : e.addEventListener(t, n, !0)
            : s !== void 0
              ? e.addEventListener(t, n, { passive: s })
              : e.addEventListener(t, n, !1);
}
function Za(e, t, n, a, s) {
    var i = a;
    if (!(t & 1) && !(t & 2) && a !== null)
        e: for (;;) {
            if (a === null) return;
            var o = a.tag;
            if (o === 3 || o === 4) {
                var l = a.stateNode.containerInfo;
                if (l === s || (l.nodeType === 8 && l.parentNode === s)) break;
                if (o === 4)
                    for (o = a.return; o !== null; ) {
                        var c = o.tag;
                        if (
                            (c === 3 || c === 4) &&
                            ((c = o.stateNode.containerInfo), c === s || (c.nodeType === 8 && c.parentNode === s))
                        )
                            return;
                        o = o.return;
                    }
                for (; l !== null; ) {
                    if (((o = _t(l)), o === null)) return;
                    if (((c = o.tag), c === 5 || c === 6)) {
                        a = i = o;
                        continue e;
                    }
                    l = l.parentNode;
                }
            }
            a = a.return;
        }
    Xl(function () {
        var d = i,
            v = hi(n),
            h = [];
        e: {
            var f = Sc.get(e);
            if (f !== void 0) {
                var x = wi,
                    w = e;
                switch (e) {
                    case "keypress":
                        if (Wr(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        x = Ju;
                        break;
                    case "focusin":
                        (w = "focus"), (x = Va);
                        break;
                    case "focusout":
                        (w = "blur"), (x = Va);
                        break;
                    case "beforeblur":
                    case "afterblur":
                        x = Va;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        x = go;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        x = Bu;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        x = np;
                        break;
                    case jc:
                    case wc:
                    case Nc:
                        x = $u;
                        break;
                    case kc:
                        x = ap;
                        break;
                    case "scroll":
                        x = Ou;
                        break;
                    case "wheel":
                        x = ip;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        x = Hu;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        x = yo;
                }
                var k = (t & 4) !== 0,
                    R = !k && e === "scroll",
                    m = k ? (f !== null ? f + "Capture" : null) : f;
                k = [];
                for (var u = d, p; u !== null; ) {
                    p = u;
                    var g = p.stateNode;
                    if (
                        (p.tag === 5 &&
                            g !== null &&
                            ((p = g), m !== null && ((g = Xn(u, m)), g != null && k.push(nr(u, g, p)))),
                        R)
                    )
                        break;
                    u = u.return;
                }
                0 < k.length && ((f = new x(f, w, null, n, v)), h.push({ event: f, listeners: k }));
            }
        }
        if (!(t & 7)) {
            e: {
                if (
                    ((f = e === "mouseover" || e === "pointerover"),
                    (x = e === "mouseout" || e === "pointerout"),
                    f && n !== ks && (w = n.relatedTarget || n.fromElement) && (_t(w) || w[at]))
                )
                    break e;
                if (
                    (x || f) &&
                    ((f = v.window === v ? v : (f = v.ownerDocument) ? f.defaultView || f.parentWindow : window),
                    x
                        ? ((w = n.relatedTarget || n.toElement),
                          (x = d),
                          (w = w ? _t(w) : null),
                          w !== null && ((R = Qt(w)), w !== R || (w.tag !== 5 && w.tag !== 6)) && (w = null))
                        : ((x = null), (w = d)),
                    x !== w)
                ) {
                    if (
                        ((k = go),
                        (g = "onMouseLeave"),
                        (m = "onMouseEnter"),
                        (u = "mouse"),
                        (e === "pointerout" || e === "pointerover") &&
                            ((k = yo), (g = "onPointerLeave"), (m = "onPointerEnter"), (u = "pointer")),
                        (R = x == null ? f : tn(x)),
                        (p = w == null ? f : tn(w)),
                        (f = new k(g, u + "leave", x, n, v)),
                        (f.target = R),
                        (f.relatedTarget = p),
                        (g = null),
                        _t(v) === d &&
                            ((k = new k(m, u + "enter", w, n, v)), (k.target = p), (k.relatedTarget = R), (g = k)),
                        (R = g),
                        x && w)
                    )
                        t: {
                            for (k = x, m = w, u = 0, p = k; p; p = Xt(p)) u++;
                            for (p = 0, g = m; g; g = Xt(g)) p++;
                            for (; 0 < u - p; ) (k = Xt(k)), u--;
                            for (; 0 < p - u; ) (m = Xt(m)), p--;
                            for (; u--; ) {
                                if (k === m || (m !== null && k === m.alternate)) break t;
                                (k = Xt(k)), (m = Xt(m));
                            }
                            k = null;
                        }
                    else k = null;
                    x !== null && Ao(h, f, x, k, !1), w !== null && R !== null && Ao(h, R, w, k, !0);
                }
            }
            e: {
                if (
                    ((f = d ? tn(d) : window),
                    (x = f.nodeName && f.nodeName.toLowerCase()),
                    x === "select" || (x === "input" && f.type === "file"))
                )
                    var y = mp;
                else if (No(f))
                    if (hc) y = gp;
                    else {
                        y = hp;
                        var S = fp;
                    }
                else
                    (x = f.nodeName) &&
                        x.toLowerCase() === "input" &&
                        (f.type === "checkbox" || f.type === "radio") &&
                        (y = vp);
                if (y && (y = y(e, d))) {
                    fc(h, y, n, v);
                    break e;
                }
                S && S(e, f, d),
                    e === "focusout" &&
                        (S = f._wrapperState) &&
                        S.controlled &&
                        f.type === "number" &&
                        xs(f, "number", f.value);
            }
            switch (((S = d ? tn(d) : window), e)) {
                case "focusin":
                    (No(S) || S.contentEditable === "true") && ((Jt = S), (As = d), (qn = null));
                    break;
                case "focusout":
                    qn = As = Jt = null;
                    break;
                case "mousedown":
                    Rs = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    (Rs = !1), Eo(h, n, v);
                    break;
                case "selectionchange":
                    if (jp) break;
                case "keydown":
                case "keyup":
                    Eo(h, n, v);
            }
            var b;
            if (ki)
                e: {
                    switch (e) {
                        case "compositionstart":
                            var E = "onCompositionStart";
                            break e;
                        case "compositionend":
                            E = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            E = "onCompositionUpdate";
                            break e;
                    }
                    E = void 0;
                }
            else
                Zt
                    ? pc(e, n) && (E = "onCompositionEnd")
                    : e === "keydown" && n.keyCode === 229 && (E = "onCompositionStart");
            E &&
                (uc &&
                    n.locale !== "ko" &&
                    (Zt || E !== "onCompositionStart"
                        ? E === "onCompositionEnd" && Zt && (b = dc())
                        : ((ft = v), (ji = "value" in ft ? ft.value : ft.textContent), (Zt = !0))),
                (S = ta(d, E)),
                0 < S.length &&
                    ((E = new xo(E, e, null, n, v)),
                    h.push({ event: E, listeners: S }),
                    b ? (E.data = b) : ((b = mc(n)), b !== null && (E.data = b)))),
                (b = lp ? cp(e, n) : dp(e, n)) &&
                    ((d = ta(d, "onBeforeInput")),
                    0 < d.length &&
                        ((v = new xo("onBeforeInput", "beforeinput", null, n, v)),
                        h.push({ event: v, listeners: d }),
                        (v.data = b)));
        }
        bc(h, t);
    });
}
function nr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function ta(e, t) {
    for (var n = t + "Capture", a = []; e !== null; ) {
        var s = e,
            i = s.stateNode;
        s.tag === 5 &&
            i !== null &&
            ((s = i),
            (i = Xn(e, n)),
            i != null && a.unshift(nr(e, i, s)),
            (i = Xn(e, t)),
            i != null && a.push(nr(e, i, s))),
            (e = e.return);
    }
    return a;
}
function Xt(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function Ao(e, t, n, a, s) {
    for (var i = t._reactName, o = []; n !== null && n !== a; ) {
        var l = n,
            c = l.alternate,
            d = l.stateNode;
        if (c !== null && c === a) break;
        l.tag === 5 &&
            d !== null &&
            ((l = d),
            s
                ? ((c = Xn(n, i)), c != null && o.unshift(nr(n, c, l)))
                : s || ((c = Xn(n, i)), c != null && o.push(nr(n, c, l)))),
            (n = n.return);
    }
    o.length !== 0 && e.push({ event: t, listeners: o });
}
var Sp = /\r\n?/g,
    bp = /\u0000|\uFFFD/g;
function Ro(e) {
    return (typeof e == "string" ? e : "" + e)
        .replace(
            Sp,
            `
`
        )
        .replace(bp, "");
}
function Er(e, t, n) {
    if (((t = Ro(t)), Ro(e) !== t && n)) throw Error(N(425));
}
function na() {}
var Ts = null,
    Ls = null;
function _s(e, t) {
    return (
        e === "textarea" ||
        e === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
    );
}
var Is = typeof setTimeout == "function" ? setTimeout : void 0,
    Cp = typeof clearTimeout == "function" ? clearTimeout : void 0,
    To = typeof Promise == "function" ? Promise : void 0,
    Ep =
        typeof queueMicrotask == "function"
            ? queueMicrotask
            : typeof To < "u"
              ? function (e) {
                    return To.resolve(null).then(e).catch(zp);
                }
              : Is;
function zp(e) {
    setTimeout(function () {
        throw e;
    });
}
function Ja(e, t) {
    var n = t,
        a = 0;
    do {
        var s = n.nextSibling;
        if ((e.removeChild(n), s && s.nodeType === 8))
            if (((n = s.data), n === "/$")) {
                if (a === 0) {
                    e.removeChild(s), Zn(t);
                    return;
                }
                a--;
            } else (n !== "$" && n !== "$?" && n !== "$!") || a++;
        n = s;
    } while (n);
    Zn(t);
}
function yt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
            if (t === "/$") return null;
        }
    }
    return e;
}
function Lo(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--;
            } else n === "/$" && t++;
        }
        e = e.previousSibling;
    }
    return null;
}
var Sn = Math.random().toString(36).slice(2),
    Qe = "__reactFiber$" + Sn,
    rr = "__reactProps$" + Sn,
    at = "__reactContainer$" + Sn,
    Ms = "__reactEvents$" + Sn,
    Pp = "__reactListeners$" + Sn,
    Ap = "__reactHandles$" + Sn;
function _t(e) {
    var t = e[Qe];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
        if ((t = n[at] || n[Qe])) {
            if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
                for (e = Lo(e); e !== null; ) {
                    if ((n = e[Qe])) return n;
                    e = Lo(e);
                }
            return t;
        }
        (e = n), (n = e.parentNode);
    }
    return null;
}
function mr(e) {
    return (e = e[Qe] || e[at]), !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e;
}
function tn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(N(33));
}
function ka(e) {
    return e[rr] || null;
}
var Ds = [],
    nn = -1;
function Et(e) {
    return { current: e };
}
function U(e) {
    0 > nn || ((e.current = Ds[nn]), (Ds[nn] = null), nn--);
}
function B(e, t) {
    nn++, (Ds[nn] = e.current), (e.current = t);
}
var bt = {},
    ce = Et(bt),
    xe = Et(!1),
    Wt = bt;
function vn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return bt;
    var a = e.stateNode;
    if (a && a.__reactInternalMemoizedUnmaskedChildContext === t) return a.__reactInternalMemoizedMaskedChildContext;
    var s = {},
        i;
    for (i in n) s[i] = t[i];
    return (
        a &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = s)),
        s
    );
}
function ye(e) {
    return (e = e.childContextTypes), e != null;
}
function ra() {
    U(xe), U(ce);
}
function _o(e, t, n) {
    if (ce.current !== bt) throw Error(N(168));
    B(ce, t), B(xe, n);
}
function Ec(e, t, n) {
    var a = e.stateNode;
    if (((t = t.childContextTypes), typeof a.getChildContext != "function")) return n;
    a = a.getChildContext();
    for (var s in a) if (!(s in t)) throw Error(N(108, fu(e) || "Unknown", s));
    return Q({}, n, a);
}
function aa(e) {
    return (
        (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || bt),
        (Wt = ce.current),
        B(ce, e),
        B(xe, xe.current),
        !0
    );
}
function Io(e, t, n) {
    var a = e.stateNode;
    if (!a) throw Error(N(169));
    n ? ((e = Ec(e, t, Wt)), (a.__reactInternalMemoizedMergedChildContext = e), U(xe), U(ce), B(ce, e)) : U(xe),
        B(xe, n);
}
var Je = null,
    Sa = !1,
    es = !1;
function zc(e) {
    Je === null ? (Je = [e]) : Je.push(e);
}
function Rp(e) {
    (Sa = !0), zc(e);
}
function zt() {
    if (!es && Je !== null) {
        es = !0;
        var e = 0,
            t = F;
        try {
            var n = Je;
            for (F = 1; e < n.length; e++) {
                var a = n[e];
                do a = a(!0);
                while (a !== null);
            }
            (Je = null), (Sa = !1);
        } catch (s) {
            throw (Je !== null && (Je = Je.slice(e + 1)), Jl(vi, zt), s);
        } finally {
            (F = t), (es = !1);
        }
    }
    return null;
}
var rn = [],
    an = 0,
    sa = null,
    ia = 0,
    ze = [],
    Pe = 0,
    Bt = null,
    et = 1,
    tt = "";
function Rt(e, t) {
    (rn[an++] = ia), (rn[an++] = sa), (sa = e), (ia = t);
}
function Pc(e, t, n) {
    (ze[Pe++] = et), (ze[Pe++] = tt), (ze[Pe++] = Bt), (Bt = e);
    var a = et;
    e = tt;
    var s = 32 - We(a) - 1;
    (a &= ~(1 << s)), (n += 1);
    var i = 32 - We(t) + s;
    if (30 < i) {
        var o = s - (s % 5);
        (i = (a & ((1 << o) - 1)).toString(32)),
            (a >>= o),
            (s -= o),
            (et = (1 << (32 - We(t) + s)) | (n << s) | a),
            (tt = i + e);
    } else (et = (1 << i) | (n << s) | a), (tt = e);
}
function bi(e) {
    e.return !== null && (Rt(e, 1), Pc(e, 1, 0));
}
function Ci(e) {
    for (; e === sa; ) (sa = rn[--an]), (rn[an] = null), (ia = rn[--an]), (rn[an] = null);
    for (; e === Bt; )
        (Bt = ze[--Pe]), (ze[Pe] = null), (tt = ze[--Pe]), (ze[Pe] = null), (et = ze[--Pe]), (ze[Pe] = null);
}
var ke = null,
    Ne = null,
    $ = !1,
    Oe = null;
function Ac(e, t) {
    var n = Ae(5, null, null, 0);
    (n.elementType = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Mo(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return (
                (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
                t !== null ? ((e.stateNode = t), (ke = e), (Ne = yt(t.firstChild)), !0) : !1
            );
        case 6:
            return (
                (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (ke = e), (Ne = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = Bt !== null ? { id: et, overflow: tt } : null),
                      (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
                      (n = Ae(18, null, null, 0)),
                      (n.stateNode = t),
                      (n.return = e),
                      (e.child = n),
                      (ke = e),
                      (Ne = null),
                      !0)
                    : !1
            );
        default:
            return !1;
    }
}
function Fs(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Os(e) {
    if ($) {
        var t = Ne;
        if (t) {
            var n = t;
            if (!Mo(e, t)) {
                if (Fs(e)) throw Error(N(418));
                t = yt(n.nextSibling);
                var a = ke;
                t && Mo(e, t) ? Ac(a, n) : ((e.flags = (e.flags & -4097) | 2), ($ = !1), (ke = e));
            }
        } else {
            if (Fs(e)) throw Error(N(418));
            (e.flags = (e.flags & -4097) | 2), ($ = !1), (ke = e);
        }
    }
}
function Do(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    ke = e;
}
function zr(e) {
    if (e !== ke) return !1;
    if (!$) return Do(e), ($ = !0), !1;
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type), (t = t !== "head" && t !== "body" && !_s(e.type, e.memoizedProps))),
        t && (t = Ne))
    ) {
        if (Fs(e)) throw (Rc(), Error(N(418)));
        for (; t; ) Ac(e, t), (t = yt(t.nextSibling));
    }
    if ((Do(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(N(317));
        e: {
            for (e = e.nextSibling, t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Ne = yt(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
                }
                e = e.nextSibling;
            }
            Ne = null;
        }
    } else Ne = ke ? yt(e.stateNode.nextSibling) : null;
    return !0;
}
function Rc() {
    for (var e = Ne; e; ) e = yt(e.nextSibling);
}
function gn() {
    (Ne = ke = null), ($ = !1);
}
function Ei(e) {
    Oe === null ? (Oe = [e]) : Oe.push(e);
}
var Tp = ot.ReactCurrentBatchConfig;
function An(e, t, n) {
    if (((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(N(309));
                var a = n.stateNode;
            }
            if (!a) throw Error(N(147, e));
            var s = a,
                i = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i
                ? t.ref
                : ((t = function (o) {
                      var l = s.refs;
                      o === null ? delete l[i] : (l[i] = o);
                  }),
                  (t._stringRef = i),
                  t);
        }
        if (typeof e != "string") throw Error(N(284));
        if (!n._owner) throw Error(N(290, e));
    }
    return e;
}
function Pr(e, t) {
    throw (
        ((e = Object.prototype.toString.call(t)),
        Error(N(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)))
    );
}
function Fo(e) {
    var t = e._init;
    return t(e._payload);
}
function Tc(e) {
    function t(m, u) {
        if (e) {
            var p = m.deletions;
            p === null ? ((m.deletions = [u]), (m.flags |= 16)) : p.push(u);
        }
    }
    function n(m, u) {
        if (!e) return null;
        for (; u !== null; ) t(m, u), (u = u.sibling);
        return null;
    }
    function a(m, u) {
        for (m = new Map(); u !== null; ) u.key !== null ? m.set(u.key, u) : m.set(u.index, u), (u = u.sibling);
        return m;
    }
    function s(m, u) {
        return (m = kt(m, u)), (m.index = 0), (m.sibling = null), m;
    }
    function i(m, u, p) {
        return (
            (m.index = p),
            e
                ? ((p = m.alternate),
                  p !== null ? ((p = p.index), p < u ? ((m.flags |= 2), u) : p) : ((m.flags |= 2), u))
                : ((m.flags |= 1048576), u)
        );
    }
    function o(m) {
        return e && m.alternate === null && (m.flags |= 2), m;
    }
    function l(m, u, p, g) {
        return u === null || u.tag !== 6
            ? ((u = os(p, m.mode, g)), (u.return = m), u)
            : ((u = s(u, p)), (u.return = m), u);
    }
    function c(m, u, p, g) {
        var y = p.type;
        return y === Kt
            ? v(m, u, p.props.children, g, p.key)
            : u !== null &&
                (u.elementType === y || (typeof y == "object" && y !== null && y.$$typeof === dt && Fo(y) === u.type))
              ? ((g = s(u, p.props)), (g.ref = An(m, u, p)), (g.return = m), g)
              : ((g = Qr(p.type, p.key, p.props, null, m.mode, g)), (g.ref = An(m, u, p)), (g.return = m), g);
    }
    function d(m, u, p, g) {
        return u === null ||
            u.tag !== 4 ||
            u.stateNode.containerInfo !== p.containerInfo ||
            u.stateNode.implementation !== p.implementation
            ? ((u = ls(p, m.mode, g)), (u.return = m), u)
            : ((u = s(u, p.children || [])), (u.return = m), u);
    }
    function v(m, u, p, g, y) {
        return u === null || u.tag !== 7
            ? ((u = Ft(p, m.mode, g, y)), (u.return = m), u)
            : ((u = s(u, p)), (u.return = m), u);
    }
    function h(m, u, p) {
        if ((typeof u == "string" && u !== "") || typeof u == "number")
            return (u = os("" + u, m.mode, p)), (u.return = m), u;
        if (typeof u == "object" && u !== null) {
            switch (u.$$typeof) {
                case xr:
                    return (
                        (p = Qr(u.type, u.key, u.props, null, m.mode, p)), (p.ref = An(m, null, u)), (p.return = m), p
                    );
                case Yt:
                    return (u = ls(u, m.mode, p)), (u.return = m), u;
                case dt:
                    var g = u._init;
                    return h(m, g(u._payload), p);
            }
            if (In(u) || bn(u)) return (u = Ft(u, m.mode, p, null)), (u.return = m), u;
            Pr(m, u);
        }
        return null;
    }
    function f(m, u, p, g) {
        var y = u !== null ? u.key : null;
        if ((typeof p == "string" && p !== "") || typeof p == "number") return y !== null ? null : l(m, u, "" + p, g);
        if (typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
                case xr:
                    return p.key === y ? c(m, u, p, g) : null;
                case Yt:
                    return p.key === y ? d(m, u, p, g) : null;
                case dt:
                    return (y = p._init), f(m, u, y(p._payload), g);
            }
            if (In(p) || bn(p)) return y !== null ? null : v(m, u, p, g, null);
            Pr(m, p);
        }
        return null;
    }
    function x(m, u, p, g, y) {
        if ((typeof g == "string" && g !== "") || typeof g == "number")
            return (m = m.get(p) || null), l(u, m, "" + g, y);
        if (typeof g == "object" && g !== null) {
            switch (g.$$typeof) {
                case xr:
                    return (m = m.get(g.key === null ? p : g.key) || null), c(u, m, g, y);
                case Yt:
                    return (m = m.get(g.key === null ? p : g.key) || null), d(u, m, g, y);
                case dt:
                    var S = g._init;
                    return x(m, u, p, S(g._payload), y);
            }
            if (In(g) || bn(g)) return (m = m.get(p) || null), v(u, m, g, y, null);
            Pr(u, g);
        }
        return null;
    }
    function w(m, u, p, g) {
        for (var y = null, S = null, b = u, E = (u = 0), _ = null; b !== null && E < p.length; E++) {
            b.index > E ? ((_ = b), (b = null)) : (_ = b.sibling);
            var A = f(m, b, p[E], g);
            if (A === null) {
                b === null && (b = _);
                break;
            }
            e && b && A.alternate === null && t(m, b),
                (u = i(A, u, E)),
                S === null ? (y = A) : (S.sibling = A),
                (S = A),
                (b = _);
        }
        if (E === p.length) return n(m, b), $ && Rt(m, E), y;
        if (b === null) {
            for (; E < p.length; E++)
                (b = h(m, p[E], g)), b !== null && ((u = i(b, u, E)), S === null ? (y = b) : (S.sibling = b), (S = b));
            return $ && Rt(m, E), y;
        }
        for (b = a(m, b); E < p.length; E++)
            (_ = x(b, m, E, p[E], g)),
                _ !== null &&
                    (e && _.alternate !== null && b.delete(_.key === null ? E : _.key),
                    (u = i(_, u, E)),
                    S === null ? (y = _) : (S.sibling = _),
                    (S = _));
        return (
            e &&
                b.forEach(function (Y) {
                    return t(m, Y);
                }),
            $ && Rt(m, E),
            y
        );
    }
    function k(m, u, p, g) {
        var y = bn(p);
        if (typeof y != "function") throw Error(N(150));
        if (((p = y.call(p)), p == null)) throw Error(N(151));
        for (var S = (y = null), b = u, E = (u = 0), _ = null, A = p.next(); b !== null && !A.done; E++, A = p.next()) {
            b.index > E ? ((_ = b), (b = null)) : (_ = b.sibling);
            var Y = f(m, b, A.value, g);
            if (Y === null) {
                b === null && (b = _);
                break;
            }
            e && b && Y.alternate === null && t(m, b),
                (u = i(Y, u, E)),
                S === null ? (y = Y) : (S.sibling = Y),
                (S = Y),
                (b = _);
        }
        if (A.done) return n(m, b), $ && Rt(m, E), y;
        if (b === null) {
            for (; !A.done; E++, A = p.next())
                (A = h(m, A.value, g)),
                    A !== null && ((u = i(A, u, E)), S === null ? (y = A) : (S.sibling = A), (S = A));
            return $ && Rt(m, E), y;
        }
        for (b = a(m, b); !A.done; E++, A = p.next())
            (A = x(b, m, E, A.value, g)),
                A !== null &&
                    (e && A.alternate !== null && b.delete(A.key === null ? E : A.key),
                    (u = i(A, u, E)),
                    S === null ? (y = A) : (S.sibling = A),
                    (S = A));
        return (
            e &&
                b.forEach(function (de) {
                    return t(m, de);
                }),
            $ && Rt(m, E),
            y
        );
    }
    function R(m, u, p, g) {
        if (
            (typeof p == "object" && p !== null && p.type === Kt && p.key === null && (p = p.props.children),
            typeof p == "object" && p !== null)
        ) {
            switch (p.$$typeof) {
                case xr:
                    e: {
                        for (var y = p.key, S = u; S !== null; ) {
                            if (S.key === y) {
                                if (((y = p.type), y === Kt)) {
                                    if (S.tag === 7) {
                                        n(m, S.sibling), (u = s(S, p.props.children)), (u.return = m), (m = u);
                                        break e;
                                    }
                                } else if (
                                    S.elementType === y ||
                                    (typeof y == "object" && y !== null && y.$$typeof === dt && Fo(y) === S.type)
                                ) {
                                    n(m, S.sibling),
                                        (u = s(S, p.props)),
                                        (u.ref = An(m, S, p)),
                                        (u.return = m),
                                        (m = u);
                                    break e;
                                }
                                n(m, S);
                                break;
                            } else t(m, S);
                            S = S.sibling;
                        }
                        p.type === Kt
                            ? ((u = Ft(p.props.children, m.mode, g, p.key)), (u.return = m), (m = u))
                            : ((g = Qr(p.type, p.key, p.props, null, m.mode, g)),
                              (g.ref = An(m, u, p)),
                              (g.return = m),
                              (m = g));
                    }
                    return o(m);
                case Yt:
                    e: {
                        for (S = p.key; u !== null; ) {
                            if (u.key === S)
                                if (
                                    u.tag === 4 &&
                                    u.stateNode.containerInfo === p.containerInfo &&
                                    u.stateNode.implementation === p.implementation
                                ) {
                                    n(m, u.sibling), (u = s(u, p.children || [])), (u.return = m), (m = u);
                                    break e;
                                } else {
                                    n(m, u);
                                    break;
                                }
                            else t(m, u);
                            u = u.sibling;
                        }
                        (u = ls(p, m.mode, g)), (u.return = m), (m = u);
                    }
                    return o(m);
                case dt:
                    return (S = p._init), R(m, u, S(p._payload), g);
            }
            if (In(p)) return w(m, u, p, g);
            if (bn(p)) return k(m, u, p, g);
            Pr(m, p);
        }
        return (typeof p == "string" && p !== "") || typeof p == "number"
            ? ((p = "" + p),
              u !== null && u.tag === 6
                  ? (n(m, u.sibling), (u = s(u, p)), (u.return = m), (m = u))
                  : (n(m, u), (u = os(p, m.mode, g)), (u.return = m), (m = u)),
              o(m))
            : n(m, u);
    }
    return R;
}
var xn = Tc(!0),
    Lc = Tc(!1),
    oa = Et(null),
    la = null,
    sn = null,
    zi = null;
function Pi() {
    zi = sn = la = null;
}
function Ai(e) {
    var t = oa.current;
    U(oa), (e._currentValue = t);
}
function Ws(e, t, n) {
    for (; e !== null; ) {
        var a = e.alternate;
        if (
            ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
                : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
            e === n)
        )
            break;
        e = e.return;
    }
}
function mn(e, t) {
    (la = e),
        (zi = sn = null),
        (e = e.dependencies),
        e !== null && e.firstContext !== null && (e.lanes & t && (ge = !0), (e.firstContext = null));
}
function Te(e) {
    var t = e._currentValue;
    if (zi !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), sn === null)) {
            if (la === null) throw Error(N(308));
            (sn = e), (la.dependencies = { lanes: 0, firstContext: e });
        } else sn = sn.next = e;
    return t;
}
var It = null;
function Ri(e) {
    It === null ? (It = [e]) : It.push(e);
}
function _c(e, t, n, a) {
    var s = t.interleaved;
    return s === null ? ((n.next = n), Ri(t)) : ((n.next = s.next), (s.next = n)), (t.interleaved = n), st(e, a);
}
function st(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        (e.childLanes |= t), (n = e.alternate), n !== null && (n.childLanes |= t), (n = e), (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
}
var ut = !1;
function Ti(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
    };
}
function Ic(e, t) {
    (e = e.updateQueue),
        t.updateQueue === e &&
            (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
            });
}
function nt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function jt(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), D & 2)) {
        var s = a.pending;
        return s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)), (a.pending = t), st(e, n);
    }
    return (
        (s = a.interleaved),
        s === null ? ((t.next = t), Ri(a)) : ((t.next = s.next), (s.next = t)),
        (a.interleaved = t),
        st(e, n)
    );
}
function Br(e, t, n) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
        var a = t.lanes;
        (a &= e.pendingLanes), (n |= a), (t.lanes = n), gi(e, n);
    }
}
function Oo(e, t) {
    var n = e.updateQueue,
        a = e.alternate;
    if (a !== null && ((a = a.updateQueue), n === a)) {
        var s = null,
            i = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
            do {
                var o = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null,
                };
                i === null ? (s = i = o) : (i = i.next = o), (n = n.next);
            } while (n !== null);
            i === null ? (s = i = t) : (i = i.next = t);
        } else s = i = t;
        (n = { baseState: a.baseState, firstBaseUpdate: s, lastBaseUpdate: i, shared: a.shared, effects: a.effects }),
            (e.updateQueue = n);
        return;
    }
    (e = n.lastBaseUpdate), e === null ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t);
}
function ca(e, t, n, a) {
    var s = e.updateQueue;
    ut = !1;
    var i = s.firstBaseUpdate,
        o = s.lastBaseUpdate,
        l = s.shared.pending;
    if (l !== null) {
        s.shared.pending = null;
        var c = l,
            d = c.next;
        (c.next = null), o === null ? (i = d) : (o.next = d), (o = c);
        var v = e.alternate;
        v !== null &&
            ((v = v.updateQueue),
            (l = v.lastBaseUpdate),
            l !== o && (l === null ? (v.firstBaseUpdate = d) : (l.next = d), (v.lastBaseUpdate = c)));
    }
    if (i !== null) {
        var h = s.baseState;
        (o = 0), (v = d = c = null), (l = i);
        do {
            var f = l.lane,
                x = l.eventTime;
            if ((a & f) === f) {
                v !== null &&
                    (v = v.next =
                        { eventTime: x, lane: 0, tag: l.tag, payload: l.payload, callback: l.callback, next: null });
                e: {
                    var w = e,
                        k = l;
                    switch (((f = t), (x = n), k.tag)) {
                        case 1:
                            if (((w = k.payload), typeof w == "function")) {
                                h = w.call(x, h, f);
                                break e;
                            }
                            h = w;
                            break e;
                        case 3:
                            w.flags = (w.flags & -65537) | 128;
                        case 0:
                            if (((w = k.payload), (f = typeof w == "function" ? w.call(x, h, f) : w), f == null))
                                break e;
                            h = Q({}, h, f);
                            break e;
                        case 2:
                            ut = !0;
                    }
                }
                l.callback !== null &&
                    l.lane !== 0 &&
                    ((e.flags |= 64), (f = s.effects), f === null ? (s.effects = [l]) : f.push(l));
            } else
                (x = { eventTime: x, lane: f, tag: l.tag, payload: l.payload, callback: l.callback, next: null }),
                    v === null ? ((d = v = x), (c = h)) : (v = v.next = x),
                    (o |= f);
            if (((l = l.next), l === null)) {
                if (((l = s.shared.pending), l === null)) break;
                (f = l), (l = f.next), (f.next = null), (s.lastBaseUpdate = f), (s.shared.pending = null);
            }
        } while (!0);
        if (
            (v === null && (c = h),
            (s.baseState = c),
            (s.firstBaseUpdate = d),
            (s.lastBaseUpdate = v),
            (t = s.shared.interleaved),
            t !== null)
        ) {
            s = t;
            do (o |= s.lane), (s = s.next);
            while (s !== t);
        } else i === null && (s.shared.lanes = 0);
        (Ut |= o), (e.lanes = o), (e.memoizedState = h);
    }
}
function Wo(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var a = e[t],
                s = a.callback;
            if (s !== null) {
                if (((a.callback = null), (a = n), typeof s != "function")) throw Error(N(191, s));
                s.call(a);
            }
        }
}
var fr = {},
    Xe = Et(fr),
    ar = Et(fr),
    sr = Et(fr);
function Mt(e) {
    if (e === fr) throw Error(N(174));
    return e;
}
function Li(e, t) {
    switch ((B(sr, t), B(ar, e), B(Xe, fr), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : js(null, "");
            break;
        default:
            (e = e === 8 ? t.parentNode : t), (t = e.namespaceURI || null), (e = e.tagName), (t = js(t, e));
    }
    U(Xe), B(Xe, t);
}
function yn() {
    U(Xe), U(ar), U(sr);
}
function Mc(e) {
    Mt(sr.current);
    var t = Mt(Xe.current),
        n = js(t, e.type);
    t !== n && (B(ar, e), B(Xe, n));
}
function _i(e) {
    ar.current === e && (U(Xe), U(ar));
}
var V = Et(0);
function da(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")) return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t;
        } else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
}
var ts = [];
function Ii() {
    for (var e = 0; e < ts.length; e++) ts[e]._workInProgressVersionPrimary = null;
    ts.length = 0;
}
var qr = ot.ReactCurrentDispatcher,
    ns = ot.ReactCurrentBatchConfig,
    qt = 0,
    H = null,
    J = null,
    te = null,
    ua = !1,
    Un = !1,
    ir = 0,
    Lp = 0;
function ie() {
    throw Error(N(321));
}
function Mi(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!qe(e[n], t[n])) return !1;
    return !0;
}
function Di(e, t, n, a, s, i) {
    if (
        ((qt = i),
        (H = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (qr.current = e === null || e.memoizedState === null ? Dp : Fp),
        (e = n(a, s)),
        Un)
    ) {
        i = 0;
        do {
            if (((Un = !1), (ir = 0), 25 <= i)) throw Error(N(301));
            (i += 1), (te = J = null), (t.updateQueue = null), (qr.current = Op), (e = n(a, s));
        } while (Un);
    }
    if (((qr.current = pa), (t = J !== null && J.next !== null), (qt = 0), (te = J = H = null), (ua = !1), t))
        throw Error(N(300));
    return e;
}
function Fi() {
    var e = ir !== 0;
    return (ir = 0), e;
}
function He() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return te === null ? (H.memoizedState = te = e) : (te = te.next = e), te;
}
function Le() {
    if (J === null) {
        var e = H.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = J.next;
    var t = te === null ? H.memoizedState : te.next;
    if (t !== null) (te = t), (J = e);
    else {
        if (e === null) throw Error(N(310));
        (J = e),
            (e = {
                memoizedState: J.memoizedState,
                baseState: J.baseState,
                baseQueue: J.baseQueue,
                queue: J.queue,
                next: null,
            }),
            te === null ? (H.memoizedState = te = e) : (te = te.next = e);
    }
    return te;
}
function or(e, t) {
    return typeof t == "function" ? t(e) : t;
}
function rs(e) {
    var t = Le(),
        n = t.queue;
    if (n === null) throw Error(N(311));
    n.lastRenderedReducer = e;
    var a = J,
        s = a.baseQueue,
        i = n.pending;
    if (i !== null) {
        if (s !== null) {
            var o = s.next;
            (s.next = i.next), (i.next = o);
        }
        (a.baseQueue = s = i), (n.pending = null);
    }
    if (s !== null) {
        (i = s.next), (a = a.baseState);
        var l = (o = null),
            c = null,
            d = i;
        do {
            var v = d.lane;
            if ((qt & v) === v)
                c !== null &&
                    (c = c.next =
                        {
                            lane: 0,
                            action: d.action,
                            hasEagerState: d.hasEagerState,
                            eagerState: d.eagerState,
                            next: null,
                        }),
                    (a = d.hasEagerState ? d.eagerState : e(a, d.action));
            else {
                var h = {
                    lane: v,
                    action: d.action,
                    hasEagerState: d.hasEagerState,
                    eagerState: d.eagerState,
                    next: null,
                };
                c === null ? ((l = c = h), (o = a)) : (c = c.next = h), (H.lanes |= v), (Ut |= v);
            }
            d = d.next;
        } while (d !== null && d !== i);
        c === null ? (o = a) : (c.next = l),
            qe(a, t.memoizedState) || (ge = !0),
            (t.memoizedState = a),
            (t.baseState = o),
            (t.baseQueue = c),
            (n.lastRenderedState = a);
    }
    if (((e = n.interleaved), e !== null)) {
        s = e;
        do (i = s.lane), (H.lanes |= i), (Ut |= i), (s = s.next);
        while (s !== e);
    } else s === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function as(e) {
    var t = Le(),
        n = t.queue;
    if (n === null) throw Error(N(311));
    n.lastRenderedReducer = e;
    var a = n.dispatch,
        s = n.pending,
        i = t.memoizedState;
    if (s !== null) {
        n.pending = null;
        var o = (s = s.next);
        do (i = e(i, o.action)), (o = o.next);
        while (o !== s);
        qe(i, t.memoizedState) || (ge = !0),
            (t.memoizedState = i),
            t.baseQueue === null && (t.baseState = i),
            (n.lastRenderedState = i);
    }
    return [i, a];
}
function Dc() {}
function Fc(e, t) {
    var n = H,
        a = Le(),
        s = t(),
        i = !qe(a.memoizedState, s);
    if (
        (i && ((a.memoizedState = s), (ge = !0)),
        (a = a.queue),
        Oi(Bc.bind(null, n, a, e), [e]),
        a.getSnapshot !== t || i || (te !== null && te.memoizedState.tag & 1))
    ) {
        if (((n.flags |= 2048), lr(9, Wc.bind(null, n, a, s, t), void 0, null), ne === null)) throw Error(N(349));
        qt & 30 || Oc(n, t, s);
    }
    return s;
}
function Oc(e, t, n) {
    (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = H.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }), (H.updateQueue = t), (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Wc(e, t, n, a) {
    (t.value = n), (t.getSnapshot = a), qc(t) && Uc(e);
}
function Bc(e, t, n) {
    return n(function () {
        qc(t) && Uc(e);
    });
}
function qc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !qe(e, n);
    } catch {
        return !0;
    }
}
function Uc(e) {
    var t = st(e, 1);
    t !== null && Be(t, e, 1, -1);
}
function Bo(e) {
    var t = He();
    return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: or,
            lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = Mp.bind(null, H, e)),
        [t.memoizedState, e]
    );
}
function lr(e, t, n, a) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: a, next: null }),
        (t = H.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }), (H.updateQueue = t), (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
              n === null
                  ? (t.lastEffect = e.next = e)
                  : ((a = n.next), (n.next = e), (e.next = a), (t.lastEffect = e))),
        e
    );
}
function $c() {
    return Le().memoizedState;
}
function Ur(e, t, n, a) {
    var s = He();
    (H.flags |= e), (s.memoizedState = lr(1 | t, n, void 0, a === void 0 ? null : a));
}
function ba(e, t, n, a) {
    var s = Le();
    a = a === void 0 ? null : a;
    var i = void 0;
    if (J !== null) {
        var o = J.memoizedState;
        if (((i = o.destroy), a !== null && Mi(a, o.deps))) {
            s.memoizedState = lr(t, n, i, a);
            return;
        }
    }
    (H.flags |= e), (s.memoizedState = lr(1 | t, n, i, a));
}
function qo(e, t) {
    return Ur(8390656, 8, e, t);
}
function Oi(e, t) {
    return ba(2048, 8, e, t);
}
function Vc(e, t) {
    return ba(4, 2, e, t);
}
function Hc(e, t) {
    return ba(4, 4, e, t);
}
function Qc(e, t) {
    if (typeof t == "function")
        return (
            (e = e()),
            t(e),
            function () {
                t(null);
            }
        );
    if (t != null)
        return (
            (e = e()),
            (t.current = e),
            function () {
                t.current = null;
            }
        );
}
function Gc(e, t, n) {
    return (n = n != null ? n.concat([e]) : null), ba(4, 4, Qc.bind(null, t, e), n);
}
function Wi() {}
function Xc(e, t) {
    var n = Le();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return a !== null && t !== null && Mi(t, a[1]) ? a[0] : ((n.memoizedState = [e, t]), e);
}
function Yc(e, t) {
    var n = Le();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return a !== null && t !== null && Mi(t, a[1]) ? a[0] : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Kc(e, t, n) {
    return qt & 21
        ? (qe(n, t) || ((n = nc()), (H.lanes |= n), (Ut |= n), (e.baseState = !0)), t)
        : (e.baseState && ((e.baseState = !1), (ge = !0)), (e.memoizedState = n));
}
function _p(e, t) {
    var n = F;
    (F = n !== 0 && 4 > n ? n : 4), e(!0);
    var a = ns.transition;
    ns.transition = {};
    try {
        e(!1), t();
    } finally {
        (F = n), (ns.transition = a);
    }
}
function Zc() {
    return Le().memoizedState;
}
function Ip(e, t, n) {
    var a = Nt(e);
    if (((n = { lane: a, action: n, hasEagerState: !1, eagerState: null, next: null }), Jc(e))) ed(t, n);
    else if (((n = _c(e, t, n, a)), n !== null)) {
        var s = pe();
        Be(n, e, a, s), td(n, t, a);
    }
}
function Mp(e, t, n) {
    var a = Nt(e),
        s = { lane: a, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Jc(e)) ed(t, s);
    else {
        var i = e.alternate;
        if (e.lanes === 0 && (i === null || i.lanes === 0) && ((i = t.lastRenderedReducer), i !== null))
            try {
                var o = t.lastRenderedState,
                    l = i(o, n);
                if (((s.hasEagerState = !0), (s.eagerState = l), qe(l, o))) {
                    var c = t.interleaved;
                    c === null ? ((s.next = s), Ri(t)) : ((s.next = c.next), (c.next = s)), (t.interleaved = s);
                    return;
                }
            } catch {
            } finally {
            }
        (n = _c(e, t, s, a)), n !== null && ((s = pe()), Be(n, e, a, s), td(n, t, a));
    }
}
function Jc(e) {
    var t = e.alternate;
    return e === H || (t !== null && t === H);
}
function ed(e, t) {
    Un = ua = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
}
function td(e, t, n) {
    if (n & 4194240) {
        var a = t.lanes;
        (a &= e.pendingLanes), (n |= a), (t.lanes = n), gi(e, n);
    }
}
var pa = {
        readContext: Te,
        useCallback: ie,
        useContext: ie,
        useEffect: ie,
        useImperativeHandle: ie,
        useInsertionEffect: ie,
        useLayoutEffect: ie,
        useMemo: ie,
        useReducer: ie,
        useRef: ie,
        useState: ie,
        useDebugValue: ie,
        useDeferredValue: ie,
        useTransition: ie,
        useMutableSource: ie,
        useSyncExternalStore: ie,
        useId: ie,
        unstable_isNewReconciler: !1,
    },
    Dp = {
        readContext: Te,
        useCallback: function (e, t) {
            return (He().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: Te,
        useEffect: qo,
        useImperativeHandle: function (e, t, n) {
            return (n = n != null ? n.concat([e]) : null), Ur(4194308, 4, Qc.bind(null, t, e), n);
        },
        useLayoutEffect: function (e, t) {
            return Ur(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return Ur(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = He();
            return (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
        },
        useReducer: function (e, t, n) {
            var a = He();
            return (
                (t = n !== void 0 ? n(t) : t),
                (a.memoizedState = a.baseState = t),
                (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t,
                }),
                (a.queue = e),
                (e = e.dispatch = Ip.bind(null, H, e)),
                [a.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = He();
            return (e = { current: e }), (t.memoizedState = e);
        },
        useState: Bo,
        useDebugValue: Wi,
        useDeferredValue: function (e) {
            return (He().memoizedState = e);
        },
        useTransition: function () {
            var e = Bo(!1),
                t = e[0];
            return (e = _p.bind(null, e[1])), (He().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
            var a = H,
                s = He();
            if ($) {
                if (n === void 0) throw Error(N(407));
                n = n();
            } else {
                if (((n = t()), ne === null)) throw Error(N(349));
                qt & 30 || Oc(a, t, n);
            }
            s.memoizedState = n;
            var i = { value: n, getSnapshot: t };
            return (
                (s.queue = i),
                qo(Bc.bind(null, a, i, e), [e]),
                (a.flags |= 2048),
                lr(9, Wc.bind(null, a, i, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = He(),
                t = ne.identifierPrefix;
            if ($) {
                var n = tt,
                    a = et;
                (n = (a & ~(1 << (32 - We(a) - 1))).toString(32) + n),
                    (t = ":" + t + "R" + n),
                    (n = ir++),
                    0 < n && (t += "H" + n.toString(32)),
                    (t += ":");
            } else (n = Lp++), (t = ":" + t + "r" + n.toString(32) + ":");
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
    },
    Fp = {
        readContext: Te,
        useCallback: Xc,
        useContext: Te,
        useEffect: Oi,
        useImperativeHandle: Gc,
        useInsertionEffect: Vc,
        useLayoutEffect: Hc,
        useMemo: Yc,
        useReducer: rs,
        useRef: $c,
        useState: function () {
            return rs(or);
        },
        useDebugValue: Wi,
        useDeferredValue: function (e) {
            var t = Le();
            return Kc(t, J.memoizedState, e);
        },
        useTransition: function () {
            var e = rs(or)[0],
                t = Le().memoizedState;
            return [e, t];
        },
        useMutableSource: Dc,
        useSyncExternalStore: Fc,
        useId: Zc,
        unstable_isNewReconciler: !1,
    },
    Op = {
        readContext: Te,
        useCallback: Xc,
        useContext: Te,
        useEffect: Oi,
        useImperativeHandle: Gc,
        useInsertionEffect: Vc,
        useLayoutEffect: Hc,
        useMemo: Yc,
        useReducer: as,
        useRef: $c,
        useState: function () {
            return as(or);
        },
        useDebugValue: Wi,
        useDeferredValue: function (e) {
            var t = Le();
            return J === null ? (t.memoizedState = e) : Kc(t, J.memoizedState, e);
        },
        useTransition: function () {
            var e = as(or)[0],
                t = Le().memoizedState;
            return [e, t];
        },
        useMutableSource: Dc,
        useSyncExternalStore: Fc,
        useId: Zc,
        unstable_isNewReconciler: !1,
    };
function De(e, t) {
    if (e && e.defaultProps) {
        (t = Q({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
function Bs(e, t, n, a) {
    (t = e.memoizedState),
        (n = n(a, t)),
        (n = n == null ? t : Q({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ca = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? Qt(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var a = pe(),
            s = Nt(e),
            i = nt(a, s);
        (i.payload = t), n != null && (i.callback = n), (t = jt(e, i, s)), t !== null && (Be(t, e, s, a), Br(t, e, s));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var a = pe(),
            s = Nt(e),
            i = nt(a, s);
        (i.tag = 1),
            (i.payload = t),
            n != null && (i.callback = n),
            (t = jt(e, i, s)),
            t !== null && (Be(t, e, s, a), Br(t, e, s));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = pe(),
            a = Nt(e),
            s = nt(n, a);
        (s.tag = 2), t != null && (s.callback = t), (t = jt(e, s, a)), t !== null && (Be(t, e, a, n), Br(t, e, a));
    },
};
function Uo(e, t, n, a, s, i, o) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
            ? e.shouldComponentUpdate(a, i, o)
            : t.prototype && t.prototype.isPureReactComponent
              ? !er(n, a) || !er(s, i)
              : !0
    );
}
function nd(e, t, n) {
    var a = !1,
        s = bt,
        i = t.contextType;
    return (
        typeof i == "object" && i !== null
            ? (i = Te(i))
            : ((s = ye(t) ? Wt : ce.current), (a = t.contextTypes), (i = (a = a != null) ? vn(e, s) : bt)),
        (t = new t(n, i)),
        (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = Ca),
        (e.stateNode = t),
        (t._reactInternals = e),
        a &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = s),
            (e.__reactInternalMemoizedMaskedChildContext = i)),
        t
    );
}
function $o(e, t, n, a) {
    (e = t.state),
        typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a),
        typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a),
        t.state !== e && Ca.enqueueReplaceState(t, t.state, null);
}
function qs(e, t, n, a) {
    var s = e.stateNode;
    (s.props = n), (s.state = e.memoizedState), (s.refs = {}), Ti(e);
    var i = t.contextType;
    typeof i == "object" && i !== null ? (s.context = Te(i)) : ((i = ye(t) ? Wt : ce.current), (s.context = vn(e, i))),
        (s.state = e.memoizedState),
        (i = t.getDerivedStateFromProps),
        typeof i == "function" && (Bs(e, t, i, n), (s.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
            typeof s.getSnapshotBeforeUpdate == "function" ||
            (typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function") ||
            ((t = s.state),
            typeof s.componentWillMount == "function" && s.componentWillMount(),
            typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(),
            t !== s.state && Ca.enqueueReplaceState(s, s.state, null),
            ca(e, n, s, a),
            (s.state = e.memoizedState)),
        typeof s.componentDidMount == "function" && (e.flags |= 4194308);
}
function jn(e, t) {
    try {
        var n = "",
            a = t;
        do (n += mu(a)), (a = a.return);
        while (a);
        var s = n;
    } catch (i) {
        s =
            `
Error generating stack: ` +
            i.message +
            `
` +
            i.stack;
    }
    return { value: e, source: t, stack: s, digest: null };
}
function ss(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Us(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var Wp = typeof WeakMap == "function" ? WeakMap : Map;
function rd(e, t, n) {
    (n = nt(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var a = t.value;
    return (
        (n.callback = function () {
            fa || ((fa = !0), (Js = a)), Us(e, t);
        }),
        n
    );
}
function ad(e, t, n) {
    (n = nt(-1, n)), (n.tag = 3);
    var a = e.type.getDerivedStateFromError;
    if (typeof a == "function") {
        var s = t.value;
        (n.payload = function () {
            return a(s);
        }),
            (n.callback = function () {
                Us(e, t);
            });
    }
    var i = e.stateNode;
    return (
        i !== null &&
            typeof i.componentDidCatch == "function" &&
            (n.callback = function () {
                Us(e, t), typeof a != "function" && (wt === null ? (wt = new Set([this])) : wt.add(this));
                var o = t.stack;
                this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
            }),
        n
    );
}
function Vo(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
        a = e.pingCache = new Wp();
        var s = new Set();
        a.set(t, s);
    } else (s = a.get(t)), s === void 0 && ((s = new Set()), a.set(t, s));
    s.has(n) || (s.add(n), (e = em.bind(null, e, t, n)), t.then(e, e));
}
function Ho(e) {
    do {
        var t;
        if (((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)), t)) return e;
        e = e.return;
    } while (e !== null);
    return null;
}
function Qo(e, t, n, a, s) {
    return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = s), e)
        : (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 && (n.alternate === null ? (n.tag = 17) : ((t = nt(-1, 1)), (t.tag = 2), jt(n, t, 1))),
                (n.lanes |= 1)),
          e);
}
var Bp = ot.ReactCurrentOwner,
    ge = !1;
function ue(e, t, n, a) {
    t.child = e === null ? Lc(t, null, n, a) : xn(t, e.child, n, a);
}
function Go(e, t, n, a, s) {
    n = n.render;
    var i = t.ref;
    return (
        mn(t, s),
        (a = Di(e, t, n, a, i, s)),
        (n = Fi()),
        e !== null && !ge
            ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~s), it(e, t, s))
            : ($ && n && bi(t), (t.flags |= 1), ue(e, t, a, s), t.child)
    );
}
function Xo(e, t, n, a, s) {
    if (e === null) {
        var i = n.type;
        return typeof i == "function" &&
            !Gi(i) &&
            i.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = i), sd(e, t, i, a, s))
            : ((e = Qr(n.type, null, a, t, t.mode, s)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((i = e.child), !(e.lanes & s))) {
        var o = i.memoizedProps;
        if (((n = n.compare), (n = n !== null ? n : er), n(o, a) && e.ref === t.ref)) return it(e, t, s);
    }
    return (t.flags |= 1), (e = kt(i, a)), (e.ref = t.ref), (e.return = t), (t.child = e);
}
function sd(e, t, n, a, s) {
    if (e !== null) {
        var i = e.memoizedProps;
        if (er(i, a) && e.ref === t.ref)
            if (((ge = !1), (t.pendingProps = a = i), (e.lanes & s) !== 0)) e.flags & 131072 && (ge = !0);
            else return (t.lanes = e.lanes), it(e, t, s);
    }
    return $s(e, t, n, a, s);
}
function id(e, t, n) {
    var a = t.pendingProps,
        s = a.children,
        i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden")
        if (!(t.mode & 1))
            (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), B(ln, we), (we |= n);
        else {
            if (!(n & 1073741824))
                return (
                    (e = i !== null ? i.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
                    (t.updateQueue = null),
                    B(ln, we),
                    (we |= e),
                    null
                );
            (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
                (a = i !== null ? i.baseLanes : n),
                B(ln, we),
                (we |= a);
        }
    else i !== null ? ((a = i.baseLanes | n), (t.memoizedState = null)) : (a = n), B(ln, we), (we |= a);
    return ue(e, t, s, n), t.child;
}
function od(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
}
function $s(e, t, n, a, s) {
    var i = ye(n) ? Wt : ce.current;
    return (
        (i = vn(t, i)),
        mn(t, s),
        (n = Di(e, t, n, a, i, s)),
        (a = Fi()),
        e !== null && !ge
            ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~s), it(e, t, s))
            : ($ && a && bi(t), (t.flags |= 1), ue(e, t, n, s), t.child)
    );
}
function Yo(e, t, n, a, s) {
    if (ye(n)) {
        var i = !0;
        aa(t);
    } else i = !1;
    if ((mn(t, s), t.stateNode === null)) $r(e, t), nd(t, n, a), qs(t, n, a, s), (a = !0);
    else if (e === null) {
        var o = t.stateNode,
            l = t.memoizedProps;
        o.props = l;
        var c = o.context,
            d = n.contextType;
        typeof d == "object" && d !== null ? (d = Te(d)) : ((d = ye(n) ? Wt : ce.current), (d = vn(t, d)));
        var v = n.getDerivedStateFromProps,
            h = typeof v == "function" || typeof o.getSnapshotBeforeUpdate == "function";
        h ||
            (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
                typeof o.componentWillReceiveProps != "function") ||
            ((l !== a || c !== d) && $o(t, o, a, d)),
            (ut = !1);
        var f = t.memoizedState;
        (o.state = f),
            ca(t, a, o, s),
            (c = t.memoizedState),
            l !== a || f !== c || xe.current || ut
                ? (typeof v == "function" && (Bs(t, n, v, a), (c = t.memoizedState)),
                  (l = ut || Uo(t, n, l, a, f, c, d))
                      ? (h ||
                            (typeof o.UNSAFE_componentWillMount != "function" &&
                                typeof o.componentWillMount != "function") ||
                            (typeof o.componentWillMount == "function" && o.componentWillMount(),
                            typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()),
                        typeof o.componentDidMount == "function" && (t.flags |= 4194308))
                      : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
                        (t.memoizedProps = a),
                        (t.memoizedState = c)),
                  (o.props = a),
                  (o.state = c),
                  (o.context = d),
                  (a = l))
                : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), (a = !1));
    } else {
        (o = t.stateNode),
            Ic(e, t),
            (l = t.memoizedProps),
            (d = t.type === t.elementType ? l : De(t.type, l)),
            (o.props = d),
            (h = t.pendingProps),
            (f = o.context),
            (c = n.contextType),
            typeof c == "object" && c !== null ? (c = Te(c)) : ((c = ye(n) ? Wt : ce.current), (c = vn(t, c)));
        var x = n.getDerivedStateFromProps;
        (v = typeof x == "function" || typeof o.getSnapshotBeforeUpdate == "function") ||
            (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
                typeof o.componentWillReceiveProps != "function") ||
            ((l !== h || f !== c) && $o(t, o, a, c)),
            (ut = !1),
            (f = t.memoizedState),
            (o.state = f),
            ca(t, a, o, s);
        var w = t.memoizedState;
        l !== h || f !== w || xe.current || ut
            ? (typeof x == "function" && (Bs(t, n, x, a), (w = t.memoizedState)),
              (d = ut || Uo(t, n, d, a, f, w, c) || !1)
                  ? (v ||
                        (typeof o.UNSAFE_componentWillUpdate != "function" &&
                            typeof o.componentWillUpdate != "function") ||
                        (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(a, w, c),
                        typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(a, w, c)),
                    typeof o.componentDidUpdate == "function" && (t.flags |= 4),
                    typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
                  : (typeof o.componentDidUpdate != "function" ||
                        (l === e.memoizedProps && f === e.memoizedState) ||
                        (t.flags |= 4),
                    typeof o.getSnapshotBeforeUpdate != "function" ||
                        (l === e.memoizedProps && f === e.memoizedState) ||
                        (t.flags |= 1024),
                    (t.memoizedProps = a),
                    (t.memoizedState = w)),
              (o.props = a),
              (o.state = w),
              (o.context = c),
              (a = d))
            : (typeof o.componentDidUpdate != "function" ||
                  (l === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != "function" ||
                  (l === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
              (a = !1));
    }
    return Vs(e, t, n, a, i, s);
}
function Vs(e, t, n, a, s, i) {
    od(e, t);
    var o = (t.flags & 128) !== 0;
    if (!a && !o) return s && Io(t, n, !1), it(e, t, i);
    (a = t.stateNode), (Bp.current = t);
    var l = o && typeof n.getDerivedStateFromError != "function" ? null : a.render();
    return (
        (t.flags |= 1),
        e !== null && o ? ((t.child = xn(t, e.child, null, i)), (t.child = xn(t, null, l, i))) : ue(e, t, l, i),
        (t.memoizedState = a.state),
        s && Io(t, n, !0),
        t.child
    );
}
function ld(e) {
    var t = e.stateNode;
    t.pendingContext ? _o(e, t.pendingContext, t.pendingContext !== t.context) : t.context && _o(e, t.context, !1),
        Li(e, t.containerInfo);
}
function Ko(e, t, n, a, s) {
    return gn(), Ei(s), (t.flags |= 256), ue(e, t, n, a), t.child;
}
var Hs = { dehydrated: null, treeContext: null, retryLane: 0 };
function Qs(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function cd(e, t, n) {
    var a = t.pendingProps,
        s = V.current,
        i = !1,
        o = (t.flags & 128) !== 0,
        l;
    if (
        ((l = o) || (l = e !== null && e.memoizedState === null ? !1 : (s & 2) !== 0),
        l ? ((i = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (s |= 1),
        B(V, s & 1),
        e === null)
    )
        return (
            Os(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
                ? (t.mode & 1 ? (e.data === "$!" ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1), null)
                : ((o = a.children),
                  (e = a.fallback),
                  i
                      ? ((a = t.mode),
                        (i = t.child),
                        (o = { mode: "hidden", children: o }),
                        !(a & 1) && i !== null ? ((i.childLanes = 0), (i.pendingProps = o)) : (i = Pa(o, a, 0, null)),
                        (e = Ft(e, a, n, null)),
                        (i.return = t),
                        (e.return = t),
                        (i.sibling = e),
                        (t.child = i),
                        (t.child.memoizedState = Qs(n)),
                        (t.memoizedState = Hs),
                        e)
                      : Bi(t, o))
        );
    if (((s = e.memoizedState), s !== null && ((l = s.dehydrated), l !== null))) return qp(e, t, o, a, l, s, n);
    if (i) {
        (i = a.fallback), (o = t.mode), (s = e.child), (l = s.sibling);
        var c = { mode: "hidden", children: a.children };
        return (
            !(o & 1) && t.child !== s
                ? ((a = t.child), (a.childLanes = 0), (a.pendingProps = c), (t.deletions = null))
                : ((a = kt(s, c)), (a.subtreeFlags = s.subtreeFlags & 14680064)),
            l !== null ? (i = kt(l, i)) : ((i = Ft(i, o, n, null)), (i.flags |= 2)),
            (i.return = t),
            (a.return = t),
            (a.sibling = i),
            (t.child = a),
            (a = i),
            (i = t.child),
            (o = e.child.memoizedState),
            (o = o === null ? Qs(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }),
            (i.memoizedState = o),
            (i.childLanes = e.childLanes & ~n),
            (t.memoizedState = Hs),
            a
        );
    }
    return (
        (i = e.child),
        (e = i.sibling),
        (a = kt(i, { mode: "visible", children: a.children })),
        !(t.mode & 1) && (a.lanes = n),
        (a.return = t),
        (a.sibling = null),
        e !== null && ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a
    );
}
function Bi(e, t) {
    return (t = Pa({ mode: "visible", children: t }, e.mode, 0, null)), (t.return = e), (e.child = t);
}
function Ar(e, t, n, a) {
    return (
        a !== null && Ei(a),
        xn(t, e.child, null, n),
        (e = Bi(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function qp(e, t, n, a, s, i, o) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (a = ss(Error(N(422)))), Ar(e, t, o, a))
            : t.memoizedState !== null
              ? ((t.child = e.child), (t.flags |= 128), null)
              : ((i = a.fallback),
                (s = t.mode),
                (a = Pa({ mode: "visible", children: a.children }, s, 0, null)),
                (i = Ft(i, s, o, null)),
                (i.flags |= 2),
                (a.return = t),
                (i.return = t),
                (a.sibling = i),
                (t.child = a),
                t.mode & 1 && xn(t, e.child, null, o),
                (t.child.memoizedState = Qs(o)),
                (t.memoizedState = Hs),
                i);
    if (!(t.mode & 1)) return Ar(e, t, o, null);
    if (s.data === "$!") {
        if (((a = s.nextSibling && s.nextSibling.dataset), a)) var l = a.dgst;
        return (a = l), (i = Error(N(419))), (a = ss(i, a, void 0)), Ar(e, t, o, a);
    }
    if (((l = (o & e.childLanes) !== 0), ge || l)) {
        if (((a = ne), a !== null)) {
            switch (o & -o) {
                case 4:
                    s = 2;
                    break;
                case 16:
                    s = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    s = 32;
                    break;
                case 536870912:
                    s = 268435456;
                    break;
                default:
                    s = 0;
            }
            (s = s & (a.suspendedLanes | o) ? 0 : s),
                s !== 0 && s !== i.retryLane && ((i.retryLane = s), st(e, s), Be(a, e, s, -1));
        }
        return Qi(), (a = ss(Error(N(421)))), Ar(e, t, o, a);
    }
    return s.data === "$?"
        ? ((t.flags |= 128), (t.child = e.child), (t = tm.bind(null, e)), (s._reactRetry = t), null)
        : ((e = i.treeContext),
          (Ne = yt(s.nextSibling)),
          (ke = t),
          ($ = !0),
          (Oe = null),
          e !== null && ((ze[Pe++] = et), (ze[Pe++] = tt), (ze[Pe++] = Bt), (et = e.id), (tt = e.overflow), (Bt = t)),
          (t = Bi(t, a.children)),
          (t.flags |= 4096),
          t);
}
function Zo(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), Ws(e.return, t, n);
}
function is(e, t, n, a, s) {
    var i = e.memoizedState;
    i === null
        ? (e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: a, tail: n, tailMode: s })
        : ((i.isBackwards = t),
          (i.rendering = null),
          (i.renderingStartTime = 0),
          (i.last = a),
          (i.tail = n),
          (i.tailMode = s));
}
function dd(e, t, n) {
    var a = t.pendingProps,
        s = a.revealOrder,
        i = a.tail;
    if ((ue(e, t, a.children, n), (a = V.current), a & 2)) (a = (a & 1) | 2), (t.flags |= 128);
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13) e.memoizedState !== null && Zo(e, n, t);
                else if (e.tag === 19) Zo(e, n, t);
                else if (e.child !== null) {
                    (e.child.return = e), (e = e.child);
                    continue;
                }
                if (e === t) break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
            }
        a &= 1;
    }
    if ((B(V, a), !(t.mode & 1))) t.memoizedState = null;
    else
        switch (s) {
            case "forwards":
                for (n = t.child, s = null; n !== null; )
                    (e = n.alternate), e !== null && da(e) === null && (s = n), (n = n.sibling);
                (n = s),
                    n === null ? ((s = t.child), (t.child = null)) : ((s = n.sibling), (n.sibling = null)),
                    is(t, !1, s, n, i);
                break;
            case "backwards":
                for (n = null, s = t.child, t.child = null; s !== null; ) {
                    if (((e = s.alternate), e !== null && da(e) === null)) {
                        t.child = s;
                        break;
                    }
                    (e = s.sibling), (s.sibling = n), (n = s), (s = e);
                }
                is(t, !0, n, null, i);
                break;
            case "together":
                is(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function $r(e, t) {
    !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function it(e, t, n) {
    if ((e !== null && (t.dependencies = e.dependencies), (Ut |= t.lanes), !(n & t.childLanes))) return null;
    if (e !== null && t.child !== e.child) throw Error(N(153));
    if (t.child !== null) {
        for (e = t.child, n = kt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
            (e = e.sibling), (n = n.sibling = kt(e, e.pendingProps)), (n.return = t);
        n.sibling = null;
    }
    return t.child;
}
function Up(e, t, n) {
    switch (t.tag) {
        case 3:
            ld(t), gn();
            break;
        case 5:
            Mc(t);
            break;
        case 1:
            ye(t.type) && aa(t);
            break;
        case 4:
            Li(t, t.stateNode.containerInfo);
            break;
        case 10:
            var a = t.type._context,
                s = t.memoizedProps.value;
            B(oa, a._currentValue), (a._currentValue = s);
            break;
        case 13:
            if (((a = t.memoizedState), a !== null))
                return a.dehydrated !== null
                    ? (B(V, V.current & 1), (t.flags |= 128), null)
                    : n & t.child.childLanes
                      ? cd(e, t, n)
                      : (B(V, V.current & 1), (e = it(e, t, n)), e !== null ? e.sibling : null);
            B(V, V.current & 1);
            break;
        case 19:
            if (((a = (n & t.childLanes) !== 0), e.flags & 128)) {
                if (a) return dd(e, t, n);
                t.flags |= 128;
            }
            if (
                ((s = t.memoizedState),
                s !== null && ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
                B(V, V.current),
                a)
            )
                break;
            return null;
        case 22:
        case 23:
            return (t.lanes = 0), id(e, t, n);
    }
    return it(e, t, n);
}
var ud, Gs, pd, md;
ud = function (e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            (n.child.return = n), (n = n.child);
            continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t) return;
            n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
    }
};
Gs = function () {};
pd = function (e, t, n, a) {
    var s = e.memoizedProps;
    if (s !== a) {
        (e = t.stateNode), Mt(Xe.current);
        var i = null;
        switch (n) {
            case "input":
                (s = vs(e, s)), (a = vs(e, a)), (i = []);
                break;
            case "select":
                (s = Q({}, s, { value: void 0 })), (a = Q({}, a, { value: void 0 })), (i = []);
                break;
            case "textarea":
                (s = ys(e, s)), (a = ys(e, a)), (i = []);
                break;
            default:
                typeof s.onClick != "function" && typeof a.onClick == "function" && (e.onclick = na);
        }
        ws(n, a);
        var o;
        n = null;
        for (d in s)
            if (!a.hasOwnProperty(d) && s.hasOwnProperty(d) && s[d] != null)
                if (d === "style") {
                    var l = s[d];
                    for (o in l) l.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
                } else
                    d !== "dangerouslySetInnerHTML" &&
                        d !== "children" &&
                        d !== "suppressContentEditableWarning" &&
                        d !== "suppressHydrationWarning" &&
                        d !== "autoFocus" &&
                        (Qn.hasOwnProperty(d) ? i || (i = []) : (i = i || []).push(d, null));
        for (d in a) {
            var c = a[d];
            if (((l = s != null ? s[d] : void 0), a.hasOwnProperty(d) && c !== l && (c != null || l != null)))
                if (d === "style")
                    if (l) {
                        for (o in l) !l.hasOwnProperty(o) || (c && c.hasOwnProperty(o)) || (n || (n = {}), (n[o] = ""));
                        for (o in c) c.hasOwnProperty(o) && l[o] !== c[o] && (n || (n = {}), (n[o] = c[o]));
                    } else n || (i || (i = []), i.push(d, n)), (n = c);
                else
                    d === "dangerouslySetInnerHTML"
                        ? ((c = c ? c.__html : void 0),
                          (l = l ? l.__html : void 0),
                          c != null && l !== c && (i = i || []).push(d, c))
                        : d === "children"
                          ? (typeof c != "string" && typeof c != "number") || (i = i || []).push(d, "" + c)
                          : d !== "suppressContentEditableWarning" &&
                            d !== "suppressHydrationWarning" &&
                            (Qn.hasOwnProperty(d)
                                ? (c != null && d === "onScroll" && q("scroll", e), i || l === c || (i = []))
                                : (i = i || []).push(d, c));
        }
        n && (i = i || []).push("style", n);
        var d = i;
        (t.updateQueue = d) && (t.flags |= 4);
    }
};
md = function (e, t, n, a) {
    n !== a && (t.flags |= 4);
};
function Rn(e, t) {
    if (!$)
        switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null; ) t.alternate !== null && (n = t), (t = t.sibling);
                n === null ? (e.tail = null) : (n.sibling = null);
                break;
            case "collapsed":
                n = e.tail;
                for (var a = null; n !== null; ) n.alternate !== null && (a = n), (n = n.sibling);
                a === null ? (t || e.tail === null ? (e.tail = null) : (e.tail.sibling = null)) : (a.sibling = null);
        }
}
function oe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        a = 0;
    if (t)
        for (var s = e.child; s !== null; )
            (n |= s.lanes | s.childLanes),
                (a |= s.subtreeFlags & 14680064),
                (a |= s.flags & 14680064),
                (s.return = e),
                (s = s.sibling);
    else
        for (s = e.child; s !== null; )
            (n |= s.lanes | s.childLanes), (a |= s.subtreeFlags), (a |= s.flags), (s.return = e), (s = s.sibling);
    return (e.subtreeFlags |= a), (e.childLanes = n), t;
}
function $p(e, t, n) {
    var a = t.pendingProps;
    switch ((Ci(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return oe(t), null;
        case 1:
            return ye(t.type) && ra(), oe(t), null;
        case 3:
            return (
                (a = t.stateNode),
                yn(),
                U(xe),
                U(ce),
                Ii(),
                a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
                (e === null || e.child === null) &&
                    (zr(t)
                        ? (t.flags |= 4)
                        : e === null ||
                          (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                          ((t.flags |= 1024), Oe !== null && (ni(Oe), (Oe = null)))),
                Gs(e, t),
                oe(t),
                null
            );
        case 5:
            _i(t);
            var s = Mt(sr.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                pd(e, t, n, a, s), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            else {
                if (!a) {
                    if (t.stateNode === null) throw Error(N(166));
                    return oe(t), null;
                }
                if (((e = Mt(Xe.current)), zr(t))) {
                    (a = t.stateNode), (n = t.type);
                    var i = t.memoizedProps;
                    switch (((a[Qe] = t), (a[rr] = i), (e = (t.mode & 1) !== 0), n)) {
                        case "dialog":
                            q("cancel", a), q("close", a);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            q("load", a);
                            break;
                        case "video":
                        case "audio":
                            for (s = 0; s < Dn.length; s++) q(Dn[s], a);
                            break;
                        case "source":
                            q("error", a);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            q("error", a), q("load", a);
                            break;
                        case "details":
                            q("toggle", a);
                            break;
                        case "input":
                            io(a, i), q("invalid", a);
                            break;
                        case "select":
                            (a._wrapperState = { wasMultiple: !!i.multiple }), q("invalid", a);
                            break;
                        case "textarea":
                            lo(a, i), q("invalid", a);
                    }
                    ws(n, i), (s = null);
                    for (var o in i)
                        if (i.hasOwnProperty(o)) {
                            var l = i[o];
                            o === "children"
                                ? typeof l == "string"
                                    ? a.textContent !== l &&
                                      (i.suppressHydrationWarning !== !0 && Er(a.textContent, l, e),
                                      (s = ["children", l]))
                                    : typeof l == "number" &&
                                      a.textContent !== "" + l &&
                                      (i.suppressHydrationWarning !== !0 && Er(a.textContent, l, e),
                                      (s = ["children", "" + l]))
                                : Qn.hasOwnProperty(o) && l != null && o === "onScroll" && q("scroll", a);
                        }
                    switch (n) {
                        case "input":
                            yr(a), oo(a, i, !0);
                            break;
                        case "textarea":
                            yr(a), co(a);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof i.onClick == "function" && (a.onclick = na);
                    }
                    (a = s), (t.updateQueue = a), a !== null && (t.flags |= 4);
                } else {
                    (o = s.nodeType === 9 ? s : s.ownerDocument),
                        e === "http://www.w3.org/1999/xhtml" && (e = Bl(n)),
                        e === "http://www.w3.org/1999/xhtml"
                            ? n === "script"
                                ? ((e = o.createElement("div")),
                                  (e.innerHTML = "<script></script>"),
                                  (e = e.removeChild(e.firstChild)))
                                : typeof a.is == "string"
                                  ? (e = o.createElement(n, { is: a.is }))
                                  : ((e = o.createElement(n)),
                                    n === "select" &&
                                        ((o = e), a.multiple ? (o.multiple = !0) : a.size && (o.size = a.size)))
                            : (e = o.createElementNS(e, n)),
                        (e[Qe] = t),
                        (e[rr] = a),
                        ud(e, t, !1, !1),
                        (t.stateNode = e);
                    e: {
                        switch (((o = Ns(n, a)), n)) {
                            case "dialog":
                                q("cancel", e), q("close", e), (s = a);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                q("load", e), (s = a);
                                break;
                            case "video":
                            case "audio":
                                for (s = 0; s < Dn.length; s++) q(Dn[s], e);
                                s = a;
                                break;
                            case "source":
                                q("error", e), (s = a);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                q("error", e), q("load", e), (s = a);
                                break;
                            case "details":
                                q("toggle", e), (s = a);
                                break;
                            case "input":
                                io(e, a), (s = vs(e, a)), q("invalid", e);
                                break;
                            case "option":
                                s = a;
                                break;
                            case "select":
                                (e._wrapperState = { wasMultiple: !!a.multiple }),
                                    (s = Q({}, a, { value: void 0 })),
                                    q("invalid", e);
                                break;
                            case "textarea":
                                lo(e, a), (s = ys(e, a)), q("invalid", e);
                                break;
                            default:
                                s = a;
                        }
                        ws(n, s), (l = s);
                        for (i in l)
                            if (l.hasOwnProperty(i)) {
                                var c = l[i];
                                i === "style"
                                    ? $l(e, c)
                                    : i === "dangerouslySetInnerHTML"
                                      ? ((c = c ? c.__html : void 0), c != null && ql(e, c))
                                      : i === "children"
                                        ? typeof c == "string"
                                            ? (n !== "textarea" || c !== "") && Gn(e, c)
                                            : typeof c == "number" && Gn(e, "" + c)
                                        : i !== "suppressContentEditableWarning" &&
                                          i !== "suppressHydrationWarning" &&
                                          i !== "autoFocus" &&
                                          (Qn.hasOwnProperty(i)
                                              ? c != null && i === "onScroll" && q("scroll", e)
                                              : c != null && ui(e, i, c, o));
                            }
                        switch (n) {
                            case "input":
                                yr(e), oo(e, a, !1);
                                break;
                            case "textarea":
                                yr(e), co(e);
                                break;
                            case "option":
                                a.value != null && e.setAttribute("value", "" + St(a.value));
                                break;
                            case "select":
                                (e.multiple = !!a.multiple),
                                    (i = a.value),
                                    i != null
                                        ? cn(e, !!a.multiple, i, !1)
                                        : a.defaultValue != null && cn(e, !!a.multiple, a.defaultValue, !0);
                                break;
                            default:
                                typeof s.onClick == "function" && (e.onclick = na);
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                a = !!a.autoFocus;
                                break e;
                            case "img":
                                a = !0;
                                break e;
                            default:
                                a = !1;
                        }
                    }
                    a && (t.flags |= 4);
                }
                t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return oe(t), null;
        case 6:
            if (e && t.stateNode != null) md(e, t, e.memoizedProps, a);
            else {
                if (typeof a != "string" && t.stateNode === null) throw Error(N(166));
                if (((n = Mt(sr.current)), Mt(Xe.current), zr(t))) {
                    if (
                        ((a = t.stateNode),
                        (n = t.memoizedProps),
                        (a[Qe] = t),
                        (i = a.nodeValue !== n) && ((e = ke), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                Er(a.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !== !0 &&
                                    Er(a.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    i && (t.flags |= 4);
                } else (a = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(a)), (a[Qe] = t), (t.stateNode = a);
            }
            return oe(t), null;
        case 13:
            if (
                (U(V),
                (a = t.memoizedState),
                e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
            ) {
                if ($ && Ne !== null && t.mode & 1 && !(t.flags & 128)) Rc(), gn(), (t.flags |= 98560), (i = !1);
                else if (((i = zr(t)), a !== null && a.dehydrated !== null)) {
                    if (e === null) {
                        if (!i) throw Error(N(318));
                        if (((i = t.memoizedState), (i = i !== null ? i.dehydrated : null), !i)) throw Error(N(317));
                        i[Qe] = t;
                    } else gn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
                    oe(t), (i = !1);
                } else Oe !== null && (ni(Oe), (Oe = null)), (i = !0);
                if (!i) return t.flags & 65536 ? t : null;
            }
            return t.flags & 128
                ? ((t.lanes = n), t)
                : ((a = a !== null),
                  a !== (e !== null && e.memoizedState !== null) &&
                      a &&
                      ((t.child.flags |= 8192),
                      t.mode & 1 && (e === null || V.current & 1 ? ee === 0 && (ee = 3) : Qi())),
                  t.updateQueue !== null && (t.flags |= 4),
                  oe(t),
                  null);
        case 4:
            return yn(), Gs(e, t), e === null && tr(t.stateNode.containerInfo), oe(t), null;
        case 10:
            return Ai(t.type._context), oe(t), null;
        case 17:
            return ye(t.type) && ra(), oe(t), null;
        case 19:
            if ((U(V), (i = t.memoizedState), i === null)) return oe(t), null;
            if (((a = (t.flags & 128) !== 0), (o = i.rendering), o === null))
                if (a) Rn(i, !1);
                else {
                    if (ee !== 0 || (e !== null && e.flags & 128))
                        for (e = t.child; e !== null; ) {
                            if (((o = da(e)), o !== null)) {
                                for (
                                    t.flags |= 128,
                                        Rn(i, !1),
                                        a = o.updateQueue,
                                        a !== null && ((t.updateQueue = a), (t.flags |= 4)),
                                        t.subtreeFlags = 0,
                                        a = n,
                                        n = t.child;
                                    n !== null;

                                )
                                    (i = n),
                                        (e = a),
                                        (i.flags &= 14680066),
                                        (o = i.alternate),
                                        o === null
                                            ? ((i.childLanes = 0),
                                              (i.lanes = e),
                                              (i.child = null),
                                              (i.subtreeFlags = 0),
                                              (i.memoizedProps = null),
                                              (i.memoizedState = null),
                                              (i.updateQueue = null),
                                              (i.dependencies = null),
                                              (i.stateNode = null))
                                            : ((i.childLanes = o.childLanes),
                                              (i.lanes = o.lanes),
                                              (i.child = o.child),
                                              (i.subtreeFlags = 0),
                                              (i.deletions = null),
                                              (i.memoizedProps = o.memoizedProps),
                                              (i.memoizedState = o.memoizedState),
                                              (i.updateQueue = o.updateQueue),
                                              (i.type = o.type),
                                              (e = o.dependencies),
                                              (i.dependencies =
                                                  e === null
                                                      ? null
                                                      : { lanes: e.lanes, firstContext: e.firstContext })),
                                        (n = n.sibling);
                                return B(V, (V.current & 1) | 2), t.child;
                            }
                            e = e.sibling;
                        }
                    i.tail !== null && K() > wn && ((t.flags |= 128), (a = !0), Rn(i, !1), (t.lanes = 4194304));
                }
            else {
                if (!a)
                    if (((e = da(o)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                            (a = !0),
                            (n = e.updateQueue),
                            n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                            Rn(i, !0),
                            i.tail === null && i.tailMode === "hidden" && !o.alternate && !$)
                        )
                            return oe(t), null;
                    } else
                        2 * K() - i.renderingStartTime > wn &&
                            n !== 1073741824 &&
                            ((t.flags |= 128), (a = !0), Rn(i, !1), (t.lanes = 4194304));
                i.isBackwards
                    ? ((o.sibling = t.child), (t.child = o))
                    : ((n = i.last), n !== null ? (n.sibling = o) : (t.child = o), (i.last = o));
            }
            return i.tail !== null
                ? ((t = i.tail),
                  (i.rendering = t),
                  (i.tail = t.sibling),
                  (i.renderingStartTime = K()),
                  (t.sibling = null),
                  (n = V.current),
                  B(V, a ? (n & 1) | 2 : n & 1),
                  t)
                : (oe(t), null);
        case 22:
        case 23:
            return (
                Hi(),
                (a = t.memoizedState !== null),
                e !== null && (e.memoizedState !== null) !== a && (t.flags |= 8192),
                a && t.mode & 1 ? we & 1073741824 && (oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : oe(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(N(156, t.tag));
}
function Vp(e, t) {
    switch ((Ci(t), t.tag)) {
        case 1:
            return ye(t.type) && ra(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
        case 3:
            return (
                yn(),
                U(xe),
                U(ce),
                Ii(),
                (e = t.flags),
                e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 5:
            return _i(t), null;
        case 13:
            if ((U(V), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
                if (t.alternate === null) throw Error(N(340));
                gn();
            }
            return (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
        case 19:
            return U(V), null;
        case 4:
            return yn(), null;
        case 10:
            return Ai(t.type._context), null;
        case 22:
        case 23:
            return Hi(), null;
        case 24:
            return null;
        default:
            return null;
    }
}
var Rr = !1,
    le = !1,
    Hp = typeof WeakSet == "function" ? WeakSet : Set,
    P = null;
function on(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null);
            } catch (a) {
                X(e, t, a);
            }
        else n.current = null;
}
function Xs(e, t, n) {
    try {
        n();
    } catch (a) {
        X(e, t, a);
    }
}
var Jo = !1;
function Qp(e, t) {
    if (((Ts = Jr), (e = xc()), Si(e))) {
        if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
        else
            e: {
                n = ((n = e.ownerDocument) && n.defaultView) || window;
                var a = n.getSelection && n.getSelection();
                if (a && a.rangeCount !== 0) {
                    n = a.anchorNode;
                    var s = a.anchorOffset,
                        i = a.focusNode;
                    a = a.focusOffset;
                    try {
                        n.nodeType, i.nodeType;
                    } catch {
                        n = null;
                        break e;
                    }
                    var o = 0,
                        l = -1,
                        c = -1,
                        d = 0,
                        v = 0,
                        h = e,
                        f = null;
                    t: for (;;) {
                        for (
                            var x;
                            h !== n || (s !== 0 && h.nodeType !== 3) || (l = o + s),
                                h !== i || (a !== 0 && h.nodeType !== 3) || (c = o + a),
                                h.nodeType === 3 && (o += h.nodeValue.length),
                                (x = h.firstChild) !== null;

                        )
                            (f = h), (h = x);
                        for (;;) {
                            if (h === e) break t;
                            if (
                                (f === n && ++d === s && (l = o),
                                f === i && ++v === a && (c = o),
                                (x = h.nextSibling) !== null)
                            )
                                break;
                            (h = f), (f = h.parentNode);
                        }
                        h = x;
                    }
                    n = l === -1 || c === -1 ? null : { start: l, end: c };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (Ls = { focusedElem: e, selectionRange: n }, Jr = !1, P = t; P !== null; )
        if (((t = P), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)) (e.return = t), (P = e);
        else
            for (; P !== null; ) {
                t = P;
                try {
                    var w = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (w !== null) {
                                    var k = w.memoizedProps,
                                        R = w.memoizedState,
                                        m = t.stateNode,
                                        u = m.getSnapshotBeforeUpdate(t.elementType === t.type ? k : De(t.type, k), R);
                                    m.__reactInternalSnapshotBeforeUpdate = u;
                                }
                                break;
                            case 3:
                                var p = t.stateNode.containerInfo;
                                p.nodeType === 1
                                    ? (p.textContent = "")
                                    : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(N(163));
                        }
                } catch (g) {
                    X(t, t.return, g);
                }
                if (((e = t.sibling), e !== null)) {
                    (e.return = t.return), (P = e);
                    break;
                }
                P = t.return;
            }
    return (w = Jo), (Jo = !1), w;
}
function $n(e, t, n) {
    var a = t.updateQueue;
    if (((a = a !== null ? a.lastEffect : null), a !== null)) {
        var s = (a = a.next);
        do {
            if ((s.tag & e) === e) {
                var i = s.destroy;
                (s.destroy = void 0), i !== void 0 && Xs(t, n, i);
            }
            s = s.next;
        } while (s !== a);
    }
}
function Ea(e, t) {
    if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
        var n = (t = t.next);
        do {
            if ((n.tag & e) === e) {
                var a = n.create;
                n.destroy = a();
            }
            n = n.next;
        } while (n !== t);
    }
}
function Ys(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n;
        }
        typeof t == "function" ? t(e) : (t.current = e);
    }
}
function fd(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), fd(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
            ((t = e.stateNode), t !== null && (delete t[Qe], delete t[rr], delete t[Ms], delete t[Pp], delete t[Ap])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
}
function hd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function el(e) {
    e: for (;;) {
        for (; e.sibling === null; ) {
            if (e.return === null || hd(e.return)) return null;
            e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            (e.child.return = e), (e = e.child);
        }
        if (!(e.flags & 2)) return e.stateNode;
    }
}
function Ks(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
        (e = e.stateNode),
            t
                ? n.nodeType === 8
                    ? n.parentNode.insertBefore(e, t)
                    : n.insertBefore(e, t)
                : (n.nodeType === 8 ? ((t = n.parentNode), t.insertBefore(e, n)) : ((t = n), t.appendChild(e)),
                  (n = n._reactRootContainer),
                  n != null || t.onclick !== null || (t.onclick = na));
    else if (a !== 4 && ((e = e.child), e !== null))
        for (Ks(e, t, n), e = e.sibling; e !== null; ) Ks(e, t, n), (e = e.sibling);
}
function Zs(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (a !== 4 && ((e = e.child), e !== null))
        for (Zs(e, t, n), e = e.sibling; e !== null; ) Zs(e, t, n), (e = e.sibling);
}
var re = null,
    Fe = !1;
function ct(e, t, n) {
    for (n = n.child; n !== null; ) vd(e, t, n), (n = n.sibling);
}
function vd(e, t, n) {
    if (Ge && typeof Ge.onCommitFiberUnmount == "function")
        try {
            Ge.onCommitFiberUnmount(ya, n);
        } catch {}
    switch (n.tag) {
        case 5:
            le || on(n, t);
        case 6:
            var a = re,
                s = Fe;
            (re = null),
                ct(e, t, n),
                (re = a),
                (Fe = s),
                re !== null &&
                    (Fe
                        ? ((e = re),
                          (n = n.stateNode),
                          e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
                        : re.removeChild(n.stateNode));
            break;
        case 18:
            re !== null &&
                (Fe
                    ? ((e = re),
                      (n = n.stateNode),
                      e.nodeType === 8 ? Ja(e.parentNode, n) : e.nodeType === 1 && Ja(e, n),
                      Zn(e))
                    : Ja(re, n.stateNode));
            break;
        case 4:
            (a = re), (s = Fe), (re = n.stateNode.containerInfo), (Fe = !0), ct(e, t, n), (re = a), (Fe = s);
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!le && ((a = n.updateQueue), a !== null && ((a = a.lastEffect), a !== null))) {
                s = a = a.next;
                do {
                    var i = s,
                        o = i.destroy;
                    (i = i.tag), o !== void 0 && (i & 2 || i & 4) && Xs(n, t, o), (s = s.next);
                } while (s !== a);
            }
            ct(e, t, n);
            break;
        case 1:
            if (!le && (on(n, t), (a = n.stateNode), typeof a.componentWillUnmount == "function"))
                try {
                    (a.props = n.memoizedProps), (a.state = n.memoizedState), a.componentWillUnmount();
                } catch (l) {
                    X(n, t, l);
                }
            ct(e, t, n);
            break;
        case 21:
            ct(e, t, n);
            break;
        case 22:
            n.mode & 1 ? ((le = (a = le) || n.memoizedState !== null), ct(e, t, n), (le = a)) : ct(e, t, n);
            break;
        default:
            ct(e, t, n);
    }
}
function tl(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Hp()),
            t.forEach(function (a) {
                var s = nm.bind(null, e, a);
                n.has(a) || (n.add(a), a.then(s, s));
            });
    }
}
function Me(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var a = 0; a < n.length; a++) {
            var s = n[a];
            try {
                var i = e,
                    o = t,
                    l = o;
                e: for (; l !== null; ) {
                    switch (l.tag) {
                        case 5:
                            (re = l.stateNode), (Fe = !1);
                            break e;
                        case 3:
                            (re = l.stateNode.containerInfo), (Fe = !0);
                            break e;
                        case 4:
                            (re = l.stateNode.containerInfo), (Fe = !0);
                            break e;
                    }
                    l = l.return;
                }
                if (re === null) throw Error(N(160));
                vd(i, o, s), (re = null), (Fe = !1);
                var c = s.alternate;
                c !== null && (c.return = null), (s.return = null);
            } catch (d) {
                X(s, t, d);
            }
        }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) gd(t, e), (t = t.sibling);
}
function gd(e, t) {
    var n = e.alternate,
        a = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if ((Me(t, e), Ve(e), a & 4)) {
                try {
                    $n(3, e, e.return), Ea(3, e);
                } catch (k) {
                    X(e, e.return, k);
                }
                try {
                    $n(5, e, e.return);
                } catch (k) {
                    X(e, e.return, k);
                }
            }
            break;
        case 1:
            Me(t, e), Ve(e), a & 512 && n !== null && on(n, n.return);
            break;
        case 5:
            if ((Me(t, e), Ve(e), a & 512 && n !== null && on(n, n.return), e.flags & 32)) {
                var s = e.stateNode;
                try {
                    Gn(s, "");
                } catch (k) {
                    X(e, e.return, k);
                }
            }
            if (a & 4 && ((s = e.stateNode), s != null)) {
                var i = e.memoizedProps,
                    o = n !== null ? n.memoizedProps : i,
                    l = e.type,
                    c = e.updateQueue;
                if (((e.updateQueue = null), c !== null))
                    try {
                        l === "input" && i.type === "radio" && i.name != null && Ol(s, i), Ns(l, o);
                        var d = Ns(l, i);
                        for (o = 0; o < c.length; o += 2) {
                            var v = c[o],
                                h = c[o + 1];
                            v === "style"
                                ? $l(s, h)
                                : v === "dangerouslySetInnerHTML"
                                  ? ql(s, h)
                                  : v === "children"
                                    ? Gn(s, h)
                                    : ui(s, v, h, d);
                        }
                        switch (l) {
                            case "input":
                                gs(s, i);
                                break;
                            case "textarea":
                                Wl(s, i);
                                break;
                            case "select":
                                var f = s._wrapperState.wasMultiple;
                                s._wrapperState.wasMultiple = !!i.multiple;
                                var x = i.value;
                                x != null
                                    ? cn(s, !!i.multiple, x, !1)
                                    : f !== !!i.multiple &&
                                      (i.defaultValue != null
                                          ? cn(s, !!i.multiple, i.defaultValue, !0)
                                          : cn(s, !!i.multiple, i.multiple ? [] : "", !1));
                        }
                        s[rr] = i;
                    } catch (k) {
                        X(e, e.return, k);
                    }
            }
            break;
        case 6:
            if ((Me(t, e), Ve(e), a & 4)) {
                if (e.stateNode === null) throw Error(N(162));
                (s = e.stateNode), (i = e.memoizedProps);
                try {
                    s.nodeValue = i;
                } catch (k) {
                    X(e, e.return, k);
                }
            }
            break;
        case 3:
            if ((Me(t, e), Ve(e), a & 4 && n !== null && n.memoizedState.isDehydrated))
                try {
                    Zn(t.containerInfo);
                } catch (k) {
                    X(e, e.return, k);
                }
            break;
        case 4:
            Me(t, e), Ve(e);
            break;
        case 13:
            Me(t, e),
                Ve(e),
                (s = e.child),
                s.flags & 8192 &&
                    ((i = s.memoizedState !== null),
                    (s.stateNode.isHidden = i),
                    !i || (s.alternate !== null && s.alternate.memoizedState !== null) || ($i = K())),
                a & 4 && tl(e);
            break;
        case 22:
            if (
                ((v = n !== null && n.memoizedState !== null),
                e.mode & 1 ? ((le = (d = le) || v), Me(t, e), (le = d)) : Me(t, e),
                Ve(e),
                a & 8192)
            ) {
                if (((d = e.memoizedState !== null), (e.stateNode.isHidden = d) && !v && e.mode & 1))
                    for (P = e, v = e.child; v !== null; ) {
                        for (h = P = v; P !== null; ) {
                            switch (((f = P), (x = f.child), f.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    $n(4, f, f.return);
                                    break;
                                case 1:
                                    on(f, f.return);
                                    var w = f.stateNode;
                                    if (typeof w.componentWillUnmount == "function") {
                                        (a = f), (n = f.return);
                                        try {
                                            (t = a),
                                                (w.props = t.memoizedProps),
                                                (w.state = t.memoizedState),
                                                w.componentWillUnmount();
                                        } catch (k) {
                                            X(a, n, k);
                                        }
                                    }
                                    break;
                                case 5:
                                    on(f, f.return);
                                    break;
                                case 22:
                                    if (f.memoizedState !== null) {
                                        rl(h);
                                        continue;
                                    }
                            }
                            x !== null ? ((x.return = f), (P = x)) : rl(h);
                        }
                        v = v.sibling;
                    }
                e: for (v = null, h = e; ; ) {
                    if (h.tag === 5) {
                        if (v === null) {
                            v = h;
                            try {
                                (s = h.stateNode),
                                    d
                                        ? ((i = s.style),
                                          typeof i.setProperty == "function"
                                              ? i.setProperty("display", "none", "important")
                                              : (i.display = "none"))
                                        : ((l = h.stateNode),
                                          (c = h.memoizedProps.style),
                                          (o = c != null && c.hasOwnProperty("display") ? c.display : null),
                                          (l.style.display = Ul("display", o)));
                            } catch (k) {
                                X(e, e.return, k);
                            }
                        }
                    } else if (h.tag === 6) {
                        if (v === null)
                            try {
                                h.stateNode.nodeValue = d ? "" : h.memoizedProps;
                            } catch (k) {
                                X(e, e.return, k);
                            }
                    } else if (
                        ((h.tag !== 22 && h.tag !== 23) || h.memoizedState === null || h === e) &&
                        h.child !== null
                    ) {
                        (h.child.return = h), (h = h.child);
                        continue;
                    }
                    if (h === e) break e;
                    for (; h.sibling === null; ) {
                        if (h.return === null || h.return === e) break e;
                        v === h && (v = null), (h = h.return);
                    }
                    v === h && (v = null), (h.sibling.return = h.return), (h = h.sibling);
                }
            }
            break;
        case 19:
            Me(t, e), Ve(e), a & 4 && tl(e);
            break;
        case 21:
            break;
        default:
            Me(t, e), Ve(e);
    }
}
function Ve(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (hd(n)) {
                        var a = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(N(160));
            }
            switch (a.tag) {
                case 5:
                    var s = a.stateNode;
                    a.flags & 32 && (Gn(s, ""), (a.flags &= -33));
                    var i = el(e);
                    Zs(e, i, s);
                    break;
                case 3:
                case 4:
                    var o = a.stateNode.containerInfo,
                        l = el(e);
                    Ks(e, l, o);
                    break;
                default:
                    throw Error(N(161));
            }
        } catch (c) {
            X(e, e.return, c);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function Gp(e, t, n) {
    (P = e), xd(e);
}
function xd(e, t, n) {
    for (var a = (e.mode & 1) !== 0; P !== null; ) {
        var s = P,
            i = s.child;
        if (s.tag === 22 && a) {
            var o = s.memoizedState !== null || Rr;
            if (!o) {
                var l = s.alternate,
                    c = (l !== null && l.memoizedState !== null) || le;
                l = Rr;
                var d = le;
                if (((Rr = o), (le = c) && !d))
                    for (P = s; P !== null; )
                        (o = P),
                            (c = o.child),
                            o.tag === 22 && o.memoizedState !== null
                                ? al(s)
                                : c !== null
                                  ? ((c.return = o), (P = c))
                                  : al(s);
                for (; i !== null; ) (P = i), xd(i), (i = i.sibling);
                (P = s), (Rr = l), (le = d);
            }
            nl(e);
        } else s.subtreeFlags & 8772 && i !== null ? ((i.return = s), (P = i)) : nl(e);
    }
}
function nl(e) {
    for (; P !== null; ) {
        var t = P;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            le || Ea(5, t);
                            break;
                        case 1:
                            var a = t.stateNode;
                            if (t.flags & 4 && !le)
                                if (n === null) a.componentDidMount();
                                else {
                                    var s = t.elementType === t.type ? n.memoizedProps : De(t.type, n.memoizedProps);
                                    a.componentDidUpdate(s, n.memoizedState, a.__reactInternalSnapshotBeforeUpdate);
                                }
                            var i = t.updateQueue;
                            i !== null && Wo(t, i, a);
                            break;
                        case 3:
                            var o = t.updateQueue;
                            if (o !== null) {
                                if (((n = null), t.child !== null))
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode;
                                    }
                                Wo(t, o, n);
                            }
                            break;
                        case 5:
                            var l = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = l;
                                var c = t.memoizedProps;
                                switch (t.type) {
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        c.autoFocus && n.focus();
                                        break;
                                    case "img":
                                        c.src && (n.src = c.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var d = t.alternate;
                                if (d !== null) {
                                    var v = d.memoizedState;
                                    if (v !== null) {
                                        var h = v.dehydrated;
                                        h !== null && Zn(h);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(N(163));
                    }
                le || (t.flags & 512 && Ys(t));
            } catch (f) {
                X(t, t.return, f);
            }
        }
        if (t === e) {
            P = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            (n.return = t.return), (P = n);
            break;
        }
        P = t.return;
    }
}
function rl(e) {
    for (; P !== null; ) {
        var t = P;
        if (t === e) {
            P = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            (n.return = t.return), (P = n);
            break;
        }
        P = t.return;
    }
}
function al(e) {
    for (; P !== null; ) {
        var t = P;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        Ea(4, t);
                    } catch (c) {
                        X(t, n, c);
                    }
                    break;
                case 1:
                    var a = t.stateNode;
                    if (typeof a.componentDidMount == "function") {
                        var s = t.return;
                        try {
                            a.componentDidMount();
                        } catch (c) {
                            X(t, s, c);
                        }
                    }
                    var i = t.return;
                    try {
                        Ys(t);
                    } catch (c) {
                        X(t, i, c);
                    }
                    break;
                case 5:
                    var o = t.return;
                    try {
                        Ys(t);
                    } catch (c) {
                        X(t, o, c);
                    }
            }
        } catch (c) {
            X(t, t.return, c);
        }
        if (t === e) {
            P = null;
            break;
        }
        var l = t.sibling;
        if (l !== null) {
            (l.return = t.return), (P = l);
            break;
        }
        P = t.return;
    }
}
var Xp = Math.ceil,
    ma = ot.ReactCurrentDispatcher,
    qi = ot.ReactCurrentOwner,
    Re = ot.ReactCurrentBatchConfig,
    D = 0,
    ne = null,
    Z = null,
    ae = 0,
    we = 0,
    ln = Et(0),
    ee = 0,
    cr = null,
    Ut = 0,
    za = 0,
    Ui = 0,
    Vn = null,
    ve = null,
    $i = 0,
    wn = 1 / 0,
    Ze = null,
    fa = !1,
    Js = null,
    wt = null,
    Tr = !1,
    ht = null,
    ha = 0,
    Hn = 0,
    ei = null,
    Vr = -1,
    Hr = 0;
function pe() {
    return D & 6 ? K() : Vr !== -1 ? Vr : (Vr = K());
}
function Nt(e) {
    return e.mode & 1
        ? D & 2 && ae !== 0
            ? ae & -ae
            : Tp.transition !== null
              ? (Hr === 0 && (Hr = nc()), Hr)
              : ((e = F), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : cc(e.type))), e)
        : 1;
}
function Be(e, t, n, a) {
    if (50 < Hn) throw ((Hn = 0), (ei = null), Error(N(185)));
    ur(e, n, a),
        (!(D & 2) || e !== ne) &&
            (e === ne && (!(D & 2) && (za |= n), ee === 4 && mt(e, ae)),
            je(e, a),
            n === 1 && D === 0 && !(t.mode & 1) && ((wn = K() + 500), Sa && zt()));
}
function je(e, t) {
    var n = e.callbackNode;
    Tu(e, t);
    var a = Zr(e, e === ne ? ae : 0);
    if (a === 0) n !== null && mo(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = a & -a), e.callbackPriority !== t)) {
        if ((n != null && mo(n), t === 1))
            e.tag === 0 ? Rp(sl.bind(null, e)) : zc(sl.bind(null, e)),
                Ep(function () {
                    !(D & 6) && zt();
                }),
                (n = null);
        else {
            switch (rc(a)) {
                case 1:
                    n = vi;
                    break;
                case 4:
                    n = ec;
                    break;
                case 16:
                    n = Kr;
                    break;
                case 536870912:
                    n = tc;
                    break;
                default:
                    n = Kr;
            }
            n = Cd(n, yd.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
    }
}
function yd(e, t) {
    if (((Vr = -1), (Hr = 0), D & 6)) throw Error(N(327));
    var n = e.callbackNode;
    if (fn() && e.callbackNode !== n) return null;
    var a = Zr(e, e === ne ? ae : 0);
    if (a === 0) return null;
    if (a & 30 || a & e.expiredLanes || t) t = va(e, a);
    else {
        t = a;
        var s = D;
        D |= 2;
        var i = wd();
        (ne !== e || ae !== t) && ((Ze = null), (wn = K() + 500), Dt(e, t));
        do
            try {
                Zp();
                break;
            } catch (l) {
                jd(e, l);
            }
        while (!0);
        Pi(), (ma.current = i), (D = s), Z !== null ? (t = 0) : ((ne = null), (ae = 0), (t = ee));
    }
    if (t !== 0) {
        if ((t === 2 && ((s = Es(e)), s !== 0 && ((a = s), (t = ti(e, s)))), t === 1))
            throw ((n = cr), Dt(e, 0), mt(e, a), je(e, K()), n);
        if (t === 6) mt(e, a);
        else {
            if (
                ((s = e.current.alternate),
                !(a & 30) &&
                    !Yp(s) &&
                    ((t = va(e, a)), t === 2 && ((i = Es(e)), i !== 0 && ((a = i), (t = ti(e, i)))), t === 1))
            )
                throw ((n = cr), Dt(e, 0), mt(e, a), je(e, K()), n);
            switch (((e.finishedWork = s), (e.finishedLanes = a), t)) {
                case 0:
                case 1:
                    throw Error(N(345));
                case 2:
                    Tt(e, ve, Ze);
                    break;
                case 3:
                    if ((mt(e, a), (a & 130023424) === a && ((t = $i + 500 - K()), 10 < t))) {
                        if (Zr(e, 0) !== 0) break;
                        if (((s = e.suspendedLanes), (s & a) !== a)) {
                            pe(), (e.pingedLanes |= e.suspendedLanes & s);
                            break;
                        }
                        e.timeoutHandle = Is(Tt.bind(null, e, ve, Ze), t);
                        break;
                    }
                    Tt(e, ve, Ze);
                    break;
                case 4:
                    if ((mt(e, a), (a & 4194240) === a)) break;
                    for (t = e.eventTimes, s = -1; 0 < a; ) {
                        var o = 31 - We(a);
                        (i = 1 << o), (o = t[o]), o > s && (s = o), (a &= ~i);
                    }
                    if (
                        ((a = s),
                        (a = K() - a),
                        (a =
                            (120 > a
                                ? 120
                                : 480 > a
                                  ? 480
                                  : 1080 > a
                                    ? 1080
                                    : 1920 > a
                                      ? 1920
                                      : 3e3 > a
                                        ? 3e3
                                        : 4320 > a
                                          ? 4320
                                          : 1960 * Xp(a / 1960)) - a),
                        10 < a)
                    ) {
                        e.timeoutHandle = Is(Tt.bind(null, e, ve, Ze), a);
                        break;
                    }
                    Tt(e, ve, Ze);
                    break;
                case 5:
                    Tt(e, ve, Ze);
                    break;
                default:
                    throw Error(N(329));
            }
        }
    }
    return je(e, K()), e.callbackNode === n ? yd.bind(null, e) : null;
}
function ti(e, t) {
    var n = Vn;
    return (
        e.current.memoizedState.isDehydrated && (Dt(e, t).flags |= 256),
        (e = va(e, t)),
        e !== 2 && ((t = ve), (ve = n), t !== null && ni(t)),
        e
    );
}
function ni(e) {
    ve === null ? (ve = e) : ve.push.apply(ve, e);
}
function Yp(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var a = 0; a < n.length; a++) {
                    var s = n[a],
                        i = s.getSnapshot;
                    s = s.value;
                    try {
                        if (!qe(i(), s)) return !1;
                    } catch {
                        return !1;
                    }
                }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) (n.return = t), (t = n);
        else {
            if (t === e) break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) return !0;
                t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
        }
    }
    return !0;
}
function mt(e, t) {
    for (t &= ~Ui, t &= ~za, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
        var n = 31 - We(t),
            a = 1 << n;
        (e[n] = -1), (t &= ~a);
    }
}
function sl(e) {
    if (D & 6) throw Error(N(327));
    fn();
    var t = Zr(e, 0);
    if (!(t & 1)) return je(e, K()), null;
    var n = va(e, t);
    if (e.tag !== 0 && n === 2) {
        var a = Es(e);
        a !== 0 && ((t = a), (n = ti(e, a)));
    }
    if (n === 1) throw ((n = cr), Dt(e, 0), mt(e, t), je(e, K()), n);
    if (n === 6) throw Error(N(345));
    return (e.finishedWork = e.current.alternate), (e.finishedLanes = t), Tt(e, ve, Ze), je(e, K()), null;
}
function Vi(e, t) {
    var n = D;
    D |= 1;
    try {
        return e(t);
    } finally {
        (D = n), D === 0 && ((wn = K() + 500), Sa && zt());
    }
}
function $t(e) {
    ht !== null && ht.tag === 0 && !(D & 6) && fn();
    var t = D;
    D |= 1;
    var n = Re.transition,
        a = F;
    try {
        if (((Re.transition = null), (F = 1), e)) return e();
    } finally {
        (F = a), (Re.transition = n), (D = t), !(D & 6) && zt();
    }
}
function Hi() {
    (we = ln.current), U(ln);
}
function Dt(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), Cp(n)), Z !== null))
        for (n = Z.return; n !== null; ) {
            var a = n;
            switch ((Ci(a), a.tag)) {
                case 1:
                    (a = a.type.childContextTypes), a != null && ra();
                    break;
                case 3:
                    yn(), U(xe), U(ce), Ii();
                    break;
                case 5:
                    _i(a);
                    break;
                case 4:
                    yn();
                    break;
                case 13:
                    U(V);
                    break;
                case 19:
                    U(V);
                    break;
                case 10:
                    Ai(a.type._context);
                    break;
                case 22:
                case 23:
                    Hi();
            }
            n = n.return;
        }
    if (
        ((ne = e),
        (Z = e = kt(e.current, null)),
        (ae = we = t),
        (ee = 0),
        (cr = null),
        (Ui = za = Ut = 0),
        (ve = Vn = null),
        It !== null)
    ) {
        for (t = 0; t < It.length; t++)
            if (((n = It[t]), (a = n.interleaved), a !== null)) {
                n.interleaved = null;
                var s = a.next,
                    i = n.pending;
                if (i !== null) {
                    var o = i.next;
                    (i.next = s), (a.next = o);
                }
                n.pending = a;
            }
        It = null;
    }
    return e;
}
function jd(e, t) {
    do {
        var n = Z;
        try {
            if ((Pi(), (qr.current = pa), ua)) {
                for (var a = H.memoizedState; a !== null; ) {
                    var s = a.queue;
                    s !== null && (s.pending = null), (a = a.next);
                }
                ua = !1;
            }
            if (
                ((qt = 0),
                (te = J = H = null),
                (Un = !1),
                (ir = 0),
                (qi.current = null),
                n === null || n.return === null)
            ) {
                (ee = 1), (cr = t), (Z = null);
                break;
            }
            e: {
                var i = e,
                    o = n.return,
                    l = n,
                    c = t;
                if (((t = ae), (l.flags |= 32768), c !== null && typeof c == "object" && typeof c.then == "function")) {
                    var d = c,
                        v = l,
                        h = v.tag;
                    if (!(v.mode & 1) && (h === 0 || h === 11 || h === 15)) {
                        var f = v.alternate;
                        f
                            ? ((v.updateQueue = f.updateQueue),
                              (v.memoizedState = f.memoizedState),
                              (v.lanes = f.lanes))
                            : ((v.updateQueue = null), (v.memoizedState = null));
                    }
                    var x = Ho(o);
                    if (x !== null) {
                        (x.flags &= -257), Qo(x, o, l, i, t), x.mode & 1 && Vo(i, d, t), (t = x), (c = d);
                        var w = t.updateQueue;
                        if (w === null) {
                            var k = new Set();
                            k.add(c), (t.updateQueue = k);
                        } else w.add(c);
                        break e;
                    } else {
                        if (!(t & 1)) {
                            Vo(i, d, t), Qi();
                            break e;
                        }
                        c = Error(N(426));
                    }
                } else if ($ && l.mode & 1) {
                    var R = Ho(o);
                    if (R !== null) {
                        !(R.flags & 65536) && (R.flags |= 256), Qo(R, o, l, i, t), Ei(jn(c, l));
                        break e;
                    }
                }
                (i = c = jn(c, l)), ee !== 4 && (ee = 2), Vn === null ? (Vn = [i]) : Vn.push(i), (i = o);
                do {
                    switch (i.tag) {
                        case 3:
                            (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                            var m = rd(i, c, t);
                            Oo(i, m);
                            break e;
                        case 1:
                            l = c;
                            var u = i.type,
                                p = i.stateNode;
                            if (
                                !(i.flags & 128) &&
                                (typeof u.getDerivedStateFromError == "function" ||
                                    (p !== null &&
                                        typeof p.componentDidCatch == "function" &&
                                        (wt === null || !wt.has(p))))
                            ) {
                                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                                var g = ad(i, l, t);
                                Oo(i, g);
                                break e;
                            }
                    }
                    i = i.return;
                } while (i !== null);
            }
            kd(n);
        } catch (y) {
            (t = y), Z === n && n !== null && (Z = n = n.return);
            continue;
        }
        break;
    } while (!0);
}
function wd() {
    var e = ma.current;
    return (ma.current = pa), e === null ? pa : e;
}
function Qi() {
    (ee === 0 || ee === 3 || ee === 2) && (ee = 4),
        ne === null || (!(Ut & 268435455) && !(za & 268435455)) || mt(ne, ae);
}
function va(e, t) {
    var n = D;
    D |= 2;
    var a = wd();
    (ne !== e || ae !== t) && ((Ze = null), Dt(e, t));
    do
        try {
            Kp();
            break;
        } catch (s) {
            jd(e, s);
        }
    while (!0);
    if ((Pi(), (D = n), (ma.current = a), Z !== null)) throw Error(N(261));
    return (ne = null), (ae = 0), ee;
}
function Kp() {
    for (; Z !== null; ) Nd(Z);
}
function Zp() {
    for (; Z !== null && !ku(); ) Nd(Z);
}
function Nd(e) {
    var t = bd(e.alternate, e, we);
    (e.memoizedProps = e.pendingProps), t === null ? kd(e) : (Z = t), (qi.current = null);
}
function kd(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
            if (((n = Vp(n, t)), n !== null)) {
                (n.flags &= 32767), (Z = n);
                return;
            }
            if (e !== null) (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            else {
                (ee = 6), (Z = null);
                return;
            }
        } else if (((n = $p(n, t, we)), n !== null)) {
            Z = n;
            return;
        }
        if (((t = t.sibling), t !== null)) {
            Z = t;
            return;
        }
        Z = t = e;
    } while (t !== null);
    ee === 0 && (ee = 5);
}
function Tt(e, t, n) {
    var a = F,
        s = Re.transition;
    try {
        (Re.transition = null), (F = 1), Jp(e, t, n, a);
    } finally {
        (Re.transition = s), (F = a);
    }
    return null;
}
function Jp(e, t, n, a) {
    do fn();
    while (ht !== null);
    if (D & 6) throw Error(N(327));
    n = e.finishedWork;
    var s = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(N(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var i = n.lanes | n.childLanes;
    if (
        (Lu(e, i),
        e === ne && ((Z = ne = null), (ae = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
            Tr ||
            ((Tr = !0),
            Cd(Kr, function () {
                return fn(), null;
            })),
        (i = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || i)
    ) {
        (i = Re.transition), (Re.transition = null);
        var o = F;
        F = 1;
        var l = D;
        (D |= 4),
            (qi.current = null),
            Qp(e, n),
            gd(n, e),
            yp(Ls),
            (Jr = !!Ts),
            (Ls = Ts = null),
            (e.current = n),
            Gp(n),
            Su(),
            (D = l),
            (F = o),
            (Re.transition = i);
    } else e.current = n;
    if (
        (Tr && ((Tr = !1), (ht = e), (ha = s)),
        (i = e.pendingLanes),
        i === 0 && (wt = null),
        Eu(n.stateNode),
        je(e, K()),
        t !== null)
    )
        for (a = e.onRecoverableError, n = 0; n < t.length; n++)
            (s = t[n]), a(s.value, { componentStack: s.stack, digest: s.digest });
    if (fa) throw ((fa = !1), (e = Js), (Js = null), e);
    return (
        ha & 1 && e.tag !== 0 && fn(),
        (i = e.pendingLanes),
        i & 1 ? (e === ei ? Hn++ : ((Hn = 0), (ei = e))) : (Hn = 0),
        zt(),
        null
    );
}
function fn() {
    if (ht !== null) {
        var e = rc(ha),
            t = Re.transition,
            n = F;
        try {
            if (((Re.transition = null), (F = 16 > e ? 16 : e), ht === null)) var a = !1;
            else {
                if (((e = ht), (ht = null), (ha = 0), D & 6)) throw Error(N(331));
                var s = D;
                for (D |= 4, P = e.current; P !== null; ) {
                    var i = P,
                        o = i.child;
                    if (P.flags & 16) {
                        var l = i.deletions;
                        if (l !== null) {
                            for (var c = 0; c < l.length; c++) {
                                var d = l[c];
                                for (P = d; P !== null; ) {
                                    var v = P;
                                    switch (v.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            $n(8, v, i);
                                    }
                                    var h = v.child;
                                    if (h !== null) (h.return = v), (P = h);
                                    else
                                        for (; P !== null; ) {
                                            v = P;
                                            var f = v.sibling,
                                                x = v.return;
                                            if ((fd(v), v === d)) {
                                                P = null;
                                                break;
                                            }
                                            if (f !== null) {
                                                (f.return = x), (P = f);
                                                break;
                                            }
                                            P = x;
                                        }
                                }
                            }
                            var w = i.alternate;
                            if (w !== null) {
                                var k = w.child;
                                if (k !== null) {
                                    w.child = null;
                                    do {
                                        var R = k.sibling;
                                        (k.sibling = null), (k = R);
                                    } while (k !== null);
                                }
                            }
                            P = i;
                        }
                    }
                    if (i.subtreeFlags & 2064 && o !== null) (o.return = i), (P = o);
                    else
                        e: for (; P !== null; ) {
                            if (((i = P), i.flags & 2048))
                                switch (i.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        $n(9, i, i.return);
                                }
                            var m = i.sibling;
                            if (m !== null) {
                                (m.return = i.return), (P = m);
                                break e;
                            }
                            P = i.return;
                        }
                }
                var u = e.current;
                for (P = u; P !== null; ) {
                    o = P;
                    var p = o.child;
                    if (o.subtreeFlags & 2064 && p !== null) (p.return = o), (P = p);
                    else
                        e: for (o = u; P !== null; ) {
                            if (((l = P), l.flags & 2048))
                                try {
                                    switch (l.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Ea(9, l);
                                    }
                                } catch (y) {
                                    X(l, l.return, y);
                                }
                            if (l === o) {
                                P = null;
                                break e;
                            }
                            var g = l.sibling;
                            if (g !== null) {
                                (g.return = l.return), (P = g);
                                break e;
                            }
                            P = l.return;
                        }
                }
                if (((D = s), zt(), Ge && typeof Ge.onPostCommitFiberRoot == "function"))
                    try {
                        Ge.onPostCommitFiberRoot(ya, e);
                    } catch {}
                a = !0;
            }
            return a;
        } finally {
            (F = n), (Re.transition = t);
        }
    }
    return !1;
}
function il(e, t, n) {
    (t = jn(n, t)), (t = rd(e, t, 1)), (e = jt(e, t, 1)), (t = pe()), e !== null && (ur(e, 1, t), je(e, t));
}
function X(e, t, n) {
    if (e.tag === 3) il(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                il(t, e, n);
                break;
            } else if (t.tag === 1) {
                var a = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == "function" ||
                    (typeof a.componentDidCatch == "function" && (wt === null || !wt.has(a)))
                ) {
                    (e = jn(n, e)),
                        (e = ad(t, e, 1)),
                        (t = jt(t, e, 1)),
                        (e = pe()),
                        t !== null && (ur(t, 1, e), je(t, e));
                    break;
                }
            }
            t = t.return;
        }
}
function em(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t),
        (t = pe()),
        (e.pingedLanes |= e.suspendedLanes & n),
        ne === e &&
            (ae & n) === n &&
            (ee === 4 || (ee === 3 && (ae & 130023424) === ae && 500 > K() - $i) ? Dt(e, 0) : (Ui |= n)),
        je(e, t);
}
function Sd(e, t) {
    t === 0 && (e.mode & 1 ? ((t = Nr), (Nr <<= 1), !(Nr & 130023424) && (Nr = 4194304)) : (t = 1));
    var n = pe();
    (e = st(e, t)), e !== null && (ur(e, t, n), je(e, n));
}
function tm(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), Sd(e, n);
}
function nm(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var a = e.stateNode,
                s = e.memoizedState;
            s !== null && (n = s.retryLane);
            break;
        case 19:
            a = e.stateNode;
            break;
        default:
            throw Error(N(314));
    }
    a !== null && a.delete(t), Sd(e, n);
}
var bd;
bd = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || xe.current) ge = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128)) return (ge = !1), Up(e, t, n);
            ge = !!(e.flags & 131072);
        }
    else (ge = !1), $ && t.flags & 1048576 && Pc(t, ia, t.index);
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var a = t.type;
            $r(e, t), (e = t.pendingProps);
            var s = vn(t, ce.current);
            mn(t, n), (s = Di(null, t, a, e, s, n));
            var i = Fi();
            return (
                (t.flags |= 1),
                typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      ye(a) ? ((i = !0), aa(t)) : (i = !1),
                      (t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null),
                      Ti(t),
                      (s.updater = Ca),
                      (t.stateNode = s),
                      (s._reactInternals = t),
                      qs(t, a, e, n),
                      (t = Vs(null, t, a, !0, i, n)))
                    : ((t.tag = 0), $ && i && bi(t), ue(null, t, s, n), (t = t.child)),
                t
            );
        case 16:
            a = t.elementType;
            e: {
                switch (
                    ($r(e, t),
                    (e = t.pendingProps),
                    (s = a._init),
                    (a = s(a._payload)),
                    (t.type = a),
                    (s = t.tag = am(a)),
                    (e = De(a, e)),
                    s)
                ) {
                    case 0:
                        t = $s(null, t, a, e, n);
                        break e;
                    case 1:
                        t = Yo(null, t, a, e, n);
                        break e;
                    case 11:
                        t = Go(null, t, a, e, n);
                        break e;
                    case 14:
                        t = Xo(null, t, a, De(a.type, e), n);
                        break e;
                }
                throw Error(N(306, a, ""));
            }
            return t;
        case 0:
            return (a = t.type), (s = t.pendingProps), (s = t.elementType === a ? s : De(a, s)), $s(e, t, a, s, n);
        case 1:
            return (a = t.type), (s = t.pendingProps), (s = t.elementType === a ? s : De(a, s)), Yo(e, t, a, s, n);
        case 3:
            e: {
                if ((ld(t), e === null)) throw Error(N(387));
                (a = t.pendingProps), (i = t.memoizedState), (s = i.element), Ic(e, t), ca(t, a, null, n);
                var o = t.memoizedState;
                if (((a = o.element), i.isDehydrated))
                    if (
                        ((i = {
                            element: a,
                            isDehydrated: !1,
                            cache: o.cache,
                            pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                            transitions: o.transitions,
                        }),
                        (t.updateQueue.baseState = i),
                        (t.memoizedState = i),
                        t.flags & 256)
                    ) {
                        (s = jn(Error(N(423)), t)), (t = Ko(e, t, a, n, s));
                        break e;
                    } else if (a !== s) {
                        (s = jn(Error(N(424)), t)), (t = Ko(e, t, a, n, s));
                        break e;
                    } else
                        for (
                            Ne = yt(t.stateNode.containerInfo.firstChild),
                                ke = t,
                                $ = !0,
                                Oe = null,
                                n = Lc(t, null, a, n),
                                t.child = n;
                            n;

                        )
                            (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
                else {
                    if ((gn(), a === s)) {
                        t = it(e, t, n);
                        break e;
                    }
                    ue(e, t, a, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                Mc(t),
                e === null && Os(t),
                (a = t.type),
                (s = t.pendingProps),
                (i = e !== null ? e.memoizedProps : null),
                (o = s.children),
                _s(a, s) ? (o = null) : i !== null && _s(a, i) && (t.flags |= 32),
                od(e, t),
                ue(e, t, o, n),
                t.child
            );
        case 6:
            return e === null && Os(t), null;
        case 13:
            return cd(e, t, n);
        case 4:
            return (
                Li(t, t.stateNode.containerInfo),
                (a = t.pendingProps),
                e === null ? (t.child = xn(t, null, a, n)) : ue(e, t, a, n),
                t.child
            );
        case 11:
            return (a = t.type), (s = t.pendingProps), (s = t.elementType === a ? s : De(a, s)), Go(e, t, a, s, n);
        case 7:
            return ue(e, t, t.pendingProps, n), t.child;
        case 8:
            return ue(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return ue(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (
                    ((a = t.type._context),
                    (s = t.pendingProps),
                    (i = t.memoizedProps),
                    (o = s.value),
                    B(oa, a._currentValue),
                    (a._currentValue = o),
                    i !== null)
                )
                    if (qe(i.value, o)) {
                        if (i.children === s.children && !xe.current) {
                            t = it(e, t, n);
                            break e;
                        }
                    } else
                        for (i = t.child, i !== null && (i.return = t); i !== null; ) {
                            var l = i.dependencies;
                            if (l !== null) {
                                o = i.child;
                                for (var c = l.firstContext; c !== null; ) {
                                    if (c.context === a) {
                                        if (i.tag === 1) {
                                            (c = nt(-1, n & -n)), (c.tag = 2);
                                            var d = i.updateQueue;
                                            if (d !== null) {
                                                d = d.shared;
                                                var v = d.pending;
                                                v === null ? (c.next = c) : ((c.next = v.next), (v.next = c)),
                                                    (d.pending = c);
                                            }
                                        }
                                        (i.lanes |= n),
                                            (c = i.alternate),
                                            c !== null && (c.lanes |= n),
                                            Ws(i.return, n, t),
                                            (l.lanes |= n);
                                        break;
                                    }
                                    c = c.next;
                                }
                            } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
                            else if (i.tag === 18) {
                                if (((o = i.return), o === null)) throw Error(N(341));
                                (o.lanes |= n),
                                    (l = o.alternate),
                                    l !== null && (l.lanes |= n),
                                    Ws(o, n, t),
                                    (o = i.sibling);
                            } else o = i.child;
                            if (o !== null) o.return = i;
                            else
                                for (o = i; o !== null; ) {
                                    if (o === t) {
                                        o = null;
                                        break;
                                    }
                                    if (((i = o.sibling), i !== null)) {
                                        (i.return = o.return), (o = i);
                                        break;
                                    }
                                    o = o.return;
                                }
                            i = o;
                        }
                ue(e, t, s.children, n), (t = t.child);
            }
            return t;
        case 9:
            return (
                (s = t.type),
                (a = t.pendingProps.children),
                mn(t, n),
                (s = Te(s)),
                (a = a(s)),
                (t.flags |= 1),
                ue(e, t, a, n),
                t.child
            );
        case 14:
            return (a = t.type), (s = De(a, t.pendingProps)), (s = De(a.type, s)), Xo(e, t, a, s, n);
        case 15:
            return sd(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (a = t.type),
                (s = t.pendingProps),
                (s = t.elementType === a ? s : De(a, s)),
                $r(e, t),
                (t.tag = 1),
                ye(a) ? ((e = !0), aa(t)) : (e = !1),
                mn(t, n),
                nd(t, a, s),
                qs(t, a, s, n),
                Vs(null, t, a, !0, e, n)
            );
        case 19:
            return dd(e, t, n);
        case 22:
            return id(e, t, n);
    }
    throw Error(N(156, t.tag));
};
function Cd(e, t) {
    return Jl(e, t);
}
function rm(e, t, n, a) {
    (this.tag = e),
        (this.key = n),
        (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = a),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
}
function Ae(e, t, n, a) {
    return new rm(e, t, n, a);
}
function Gi(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
}
function am(e) {
    if (typeof e == "function") return Gi(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === mi)) return 11;
        if (e === fi) return 14;
    }
    return 2;
}
function kt(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = Ae(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t), (n.type = e.type), (n.flags = 0), (n.subtreeFlags = 0), (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
    );
}
function Qr(e, t, n, a, s, i) {
    var o = 2;
    if (((a = e), typeof e == "function")) Gi(e) && (o = 1);
    else if (typeof e == "string") o = 5;
    else
        e: switch (e) {
            case Kt:
                return Ft(n.children, s, i, t);
            case pi:
                (o = 8), (s |= 8);
                break;
            case ps:
                return (e = Ae(12, n, t, s | 2)), (e.elementType = ps), (e.lanes = i), e;
            case ms:
                return (e = Ae(13, n, t, s)), (e.elementType = ms), (e.lanes = i), e;
            case fs:
                return (e = Ae(19, n, t, s)), (e.elementType = fs), (e.lanes = i), e;
            case Ml:
                return Pa(n, s, i, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                        case _l:
                            o = 10;
                            break e;
                        case Il:
                            o = 9;
                            break e;
                        case mi:
                            o = 11;
                            break e;
                        case fi:
                            o = 14;
                            break e;
                        case dt:
                            (o = 16), (a = null);
                            break e;
                    }
                throw Error(N(130, e == null ? e : typeof e, ""));
        }
    return (t = Ae(o, n, t, s)), (t.elementType = e), (t.type = a), (t.lanes = i), t;
}
function Ft(e, t, n, a) {
    return (e = Ae(7, e, a, t)), (e.lanes = n), e;
}
function Pa(e, t, n, a) {
    return (e = Ae(22, e, a, t)), (e.elementType = Ml), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e;
}
function os(e, t, n) {
    return (e = Ae(6, e, null, t)), (e.lanes = n), e;
}
function ls(e, t, n) {
    return (
        (t = Ae(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }),
        t
    );
}
function sm(e, t, n, a, s) {
    (this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = qa(0)),
        (this.expirationTimes = qa(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
                0),
        (this.entanglements = qa(0)),
        (this.identifierPrefix = a),
        (this.onRecoverableError = s),
        (this.mutableSourceEagerHydrationData = null);
}
function Xi(e, t, n, a, s, i, o, l, c) {
    return (
        (e = new sm(e, t, n, l, c)),
        t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
        (i = Ae(3, null, null, t)),
        (e.current = i),
        (i.stateNode = e),
        (i.memoizedState = {
            element: a,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
        }),
        Ti(i),
        e
    );
}
function im(e, t, n) {
    var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Yt, key: a == null ? null : "" + a, children: e, containerInfo: t, implementation: n };
}
function Ed(e) {
    if (!e) return bt;
    e = e._reactInternals;
    e: {
        if (Qt(e) !== e || e.tag !== 1) throw Error(N(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (ye(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(N(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if (ye(n)) return Ec(e, n, t);
    }
    return t;
}
function zd(e, t, n, a, s, i, o, l, c) {
    return (
        (e = Xi(n, a, !0, e, s, i, o, l, c)),
        (e.context = Ed(null)),
        (n = e.current),
        (a = pe()),
        (s = Nt(n)),
        (i = nt(a, s)),
        (i.callback = t ?? null),
        jt(n, i, s),
        (e.current.lanes = s),
        ur(e, s, a),
        je(e, a),
        e
    );
}
function Aa(e, t, n, a) {
    var s = t.current,
        i = pe(),
        o = Nt(s);
    return (
        (n = Ed(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = nt(i, o)),
        (t.payload = { element: e }),
        (a = a === void 0 ? null : a),
        a !== null && (t.callback = a),
        (e = jt(s, t, o)),
        e !== null && (Be(e, s, o, i), Br(e, s, o)),
        o
    );
}
function ga(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function ol(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function Yi(e, t) {
    ol(e, t), (e = e.alternate) && ol(e, t);
}
function om() {
    return null;
}
var Pd =
    typeof reportError == "function"
        ? reportError
        : function (e) {
              console.error(e);
          };
function Ki(e) {
    this._internalRoot = e;
}
Ra.prototype.render = Ki.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(N(409));
    Aa(e, t, null, null);
};
Ra.prototype.unmount = Ki.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        $t(function () {
            Aa(null, e, null, null);
        }),
            (t[at] = null);
    }
};
function Ra(e) {
    this._internalRoot = e;
}
Ra.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = ic();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < pt.length && t !== 0 && t < pt[n].priority; n++);
        pt.splice(n, 0, e), n === 0 && lc(e);
    }
};
function Zi(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ta(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
}
function ll() {}
function lm(e, t, n, a, s) {
    if (s) {
        if (typeof a == "function") {
            var i = a;
            a = function () {
                var d = ga(o);
                i.call(d);
            };
        }
        var o = zd(t, a, e, 0, null, !1, !1, "", ll);
        return (e._reactRootContainer = o), (e[at] = o.current), tr(e.nodeType === 8 ? e.parentNode : e), $t(), o;
    }
    for (; (s = e.lastChild); ) e.removeChild(s);
    if (typeof a == "function") {
        var l = a;
        a = function () {
            var d = ga(c);
            l.call(d);
        };
    }
    var c = Xi(e, 0, !1, null, null, !1, !1, "", ll);
    return (
        (e._reactRootContainer = c),
        (e[at] = c.current),
        tr(e.nodeType === 8 ? e.parentNode : e),
        $t(function () {
            Aa(t, c, n, a);
        }),
        c
    );
}
function La(e, t, n, a, s) {
    var i = n._reactRootContainer;
    if (i) {
        var o = i;
        if (typeof s == "function") {
            var l = s;
            s = function () {
                var c = ga(o);
                l.call(c);
            };
        }
        Aa(t, o, e, s);
    } else o = lm(n, t, e, s, a);
    return ga(o);
}
ac = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Mn(t.pendingLanes);
                n !== 0 && (gi(t, n | 1), je(t, K()), !(D & 6) && ((wn = K() + 500), zt()));
            }
            break;
        case 13:
            $t(function () {
                var a = st(e, 1);
                if (a !== null) {
                    var s = pe();
                    Be(a, e, 1, s);
                }
            }),
                Yi(e, 1);
    }
};
xi = function (e) {
    if (e.tag === 13) {
        var t = st(e, 134217728);
        if (t !== null) {
            var n = pe();
            Be(t, e, 134217728, n);
        }
        Yi(e, 134217728);
    }
};
sc = function (e) {
    if (e.tag === 13) {
        var t = Nt(e),
            n = st(e, t);
        if (n !== null) {
            var a = pe();
            Be(n, e, t, a);
        }
        Yi(e, t);
    }
};
ic = function () {
    return F;
};
oc = function (e, t) {
    var n = F;
    try {
        return (F = e), t();
    } finally {
        F = n;
    }
};
Ss = function (e, t, n) {
    switch (t) {
        case "input":
            if ((gs(e, n), (t = n.name), n.type === "radio" && t != null)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                    n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0;
                    t < n.length;
                    t++
                ) {
                    var a = n[t];
                    if (a !== e && a.form === e.form) {
                        var s = ka(a);
                        if (!s) throw Error(N(90));
                        Fl(a), gs(a, s);
                    }
                }
            }
            break;
        case "textarea":
            Wl(e, n);
            break;
        case "select":
            (t = n.value), t != null && cn(e, !!n.multiple, t, !1);
    }
};
Ql = Vi;
Gl = $t;
var cm = { usingClientEntryPoint: !1, Events: [mr, tn, ka, Vl, Hl, Vi] },
    Tn = { findFiberByHostInstance: _t, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" },
    dm = {
        bundleType: Tn.bundleType,
        version: Tn.version,
        rendererPackageName: Tn.rendererPackageName,
        rendererConfig: Tn.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: ot.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return (e = Kl(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: Tn.findFiberByHostInstance || om,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Lr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Lr.isDisabled && Lr.supportsFiber)
        try {
            (ya = Lr.inject(dm)), (Ge = Lr);
        } catch {}
}
be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = cm;
be.createPortal = function (e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Zi(t)) throw Error(N(200));
    return im(e, t, null, n);
};
be.createRoot = function (e, t) {
    if (!Zi(e)) throw Error(N(299));
    var n = !1,
        a = "",
        s = Pd;
    return (
        t != null &&
            (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (s = t.onRecoverableError)),
        (t = Xi(e, 1, !1, null, null, n, !1, a, s)),
        (e[at] = t.current),
        tr(e.nodeType === 8 ? e.parentNode : e),
        new Ki(t)
    );
};
be.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(N(188)) : ((e = Object.keys(e).join(",")), Error(N(268, e)));
    return (e = Kl(t)), (e = e === null ? null : e.stateNode), e;
};
be.flushSync = function (e) {
    return $t(e);
};
be.hydrate = function (e, t, n) {
    if (!Ta(t)) throw Error(N(200));
    return La(null, e, t, !0, n);
};
be.hydrateRoot = function (e, t, n) {
    if (!Zi(e)) throw Error(N(405));
    var a = (n != null && n.hydratedSources) || null,
        s = !1,
        i = "",
        o = Pd;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (s = !0),
            n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
        (t = zd(t, null, e, 1, n ?? null, s, !1, i, o)),
        (e[at] = t.current),
        tr(e),
        a)
    )
        for (e = 0; e < a.length; e++)
            (n = a[e]),
                (s = n._getVersion),
                (s = s(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, s])
                    : t.mutableSourceEagerHydrationData.push(n, s);
    return new Ra(t);
};
be.render = function (e, t, n) {
    if (!Ta(t)) throw Error(N(200));
    return La(null, e, t, !1, n);
};
be.unmountComponentAtNode = function (e) {
    if (!Ta(e)) throw Error(N(40));
    return e._reactRootContainer
        ? ($t(function () {
              La(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[at] = null);
              });
          }),
          !0)
        : !1;
};
be.unstable_batchedUpdates = Vi;
be.unstable_renderSubtreeIntoContainer = function (e, t, n, a) {
    if (!Ta(n)) throw Error(N(200));
    if (e == null || e._reactInternals === void 0) throw Error(N(38));
    return La(e, t, n, !1, a);
};
be.version = "18.3.1-next-f1338f8080-20240426";
function Ad() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ad);
        } catch (e) {
            console.error(e);
        }
}
Ad(), (Al.exports = be);
var Rd = Al.exports,
    cl = Rd;
(ds.createRoot = cl.createRoot), (ds.hydrateRoot = cl.hydrateRoot);
const um = "/uploads/portrait-estefano.png",
    pm = "/uploads/portrait-estefano-light.png",
    dl = { heroOverlay: um, heroOverlayLight: pm },
    ul = {
        hero: {
            back: [
                {
                    id: "b1",
                    pos: { top: "8%", right: "6%" },
                    size: 140,
                    shape: "hex",
                    speed: 0.12,
                    rot: 18,
                    drift: 18,
                    tone: "accent",
                    deep: !0,
                },
                {
                    id: "b2",
                    pos: { top: "40%", right: "22%" },
                    size: 170,
                    shape: "diamond",
                    speed: 0.08,
                    rot: 25,
                    drift: 22,
                    tone: "warm",
                    deep: !0,
                },
                {
                    id: "b3",
                    pos: { top: "66%", right: "32%" },
                    size: 90,
                    shape: "hex",
                    speed: 0.26,
                    rot: 10,
                    drift: 14,
                    tone: "warm",
                },
                {
                    id: "b4",
                    pos: { bottom: "12%", right: "40%" },
                    size: 70,
                    shape: "tri-down",
                    speed: 0.4,
                    rot: 0,
                    drift: 12,
                    tone: "accent",
                },
                {
                    id: "b5",
                    pos: { top: "16%", right: "36%" },
                    size: 80,
                    shape: "diamond",
                    speed: 0.3,
                    rot: 20,
                    drift: 16,
                    tone: "warm",
                },
                {
                    id: "b6",
                    pos: { top: "32%", right: "12%" },
                    size: 18,
                    shape: "diamond",
                    speed: 0.55,
                    rot: 25,
                    tone: "accent",
                },
            ],
            front: [
                {
                    id: "f1",
                    pos: { top: "34%", right: "6%" },
                    size: 100,
                    shape: "hex",
                    speed: -0.32,
                    rot: 8,
                    drift: 13,
                    tone: "accent",
                },
                {
                    id: "f2",
                    pos: { top: "12%", right: "22%" },
                    size: 80,
                    shape: "diamond",
                    speed: -0.45,
                    rot: -22,
                    drift: 11,
                    tone: "accent",
                },
                {
                    id: "f3",
                    pos: { bottom: "22%", right: "16%" },
                    size: 60,
                    shape: "tri-down",
                    speed: -0.55,
                    rot: 0,
                    drift: 10,
                    tone: "warm",
                },
                {
                    id: "f4",
                    pos: { top: "60%", right: "40%" },
                    size: 50,
                    shape: "tri",
                    speed: -0.42,
                    rot: 15,
                    drift: 9,
                    tone: "warm",
                },
                {
                    id: "f5",
                    pos: { bottom: "8%", right: "8%" },
                    size: 40,
                    shape: "diamond",
                    speed: -0.78,
                    rot: 45,
                    drift: 8,
                    tone: "accent",
                },
                {
                    id: "f6",
                    pos: { top: "8%", right: "42%" },
                    size: 14,
                    shape: "tri",
                    speed: -0.88,
                    rot: 0,
                    tone: "accent",
                },
            ],
        },
        about: {
            back: [
                {
                    id: "ab1",
                    pos: { top: "6%", right: "4%" },
                    size: 130,
                    shape: "hex",
                    speed: 0.1,
                    rot: 22,
                    drift: 24,
                    tone: "accent",
                    deep: !0,
                },
                {
                    id: "ab2",
                    pos: { top: "44%", left: "-3%" },
                    size: 110,
                    shape: "diamond",
                    speed: 0.06,
                    rot: 18,
                    drift: 22,
                    tone: "warm",
                    deep: !0,
                },
                {
                    id: "ab3",
                    pos: { bottom: "12%", right: "8%" },
                    size: 80,
                    shape: "hex",
                    speed: 0.18,
                    rot: 10,
                    drift: 18,
                    tone: "warm",
                },
                {
                    id: "ab4",
                    pos: { top: "26%", left: "32%" },
                    size: 50,
                    shape: "tri",
                    speed: 0.22,
                    rot: 8,
                    drift: 16,
                    tone: "soft",
                },
                {
                    id: "ab5",
                    pos: { bottom: "26%", left: "12%" },
                    size: 60,
                    shape: "diamond",
                    speed: 0.14,
                    rot: 35,
                    drift: 20,
                    tone: "soft",
                },
            ],
            front: [
                {
                    id: "af1",
                    pos: { top: "9%", left: "6%" },
                    size: 34,
                    shape: "tri-down",
                    speed: -0.28,
                    rot: 0,
                    drift: 14,
                    tone: "accent",
                },
                {
                    id: "af2",
                    pos: { top: "52%", right: "3%" },
                    size: 28,
                    shape: "diamond",
                    speed: -0.42,
                    rot: -18,
                    drift: 12,
                    tone: "warm",
                },
                {
                    id: "af3",
                    pos: { bottom: "8%", left: "44%" },
                    size: 18,
                    shape: "diamond",
                    speed: -0.55,
                    rot: 45,
                    drift: 10,
                    tone: "accent",
                },
                {
                    id: "af4",
                    pos: { top: "72%", left: "62%" },
                    size: 14,
                    shape: "tri",
                    speed: -0.62,
                    rot: 10,
                    tone: "accent",
                },
            ],
        },
        contact: {
            back: [
                {
                    id: "ct_b1",
                    pos: { top: "8%", left: "4%" },
                    size: 140,
                    shape: "hex",
                    speed: 0.12,
                    rot: 18,
                    drift: 18,
                    tone: "accent",
                    deep: !0,
                },
                {
                    id: "ct_b2",
                    pos: { top: "44%", left: "20%" },
                    size: 170,
                    shape: "diamond",
                    speed: 0.08,
                    rot: 25,
                    drift: 22,
                    tone: "warm",
                    deep: !0,
                },
                {
                    id: "ct_b3",
                    pos: { top: "66%", left: "44%" },
                    size: 90,
                    shape: "hex",
                    speed: 0.26,
                    rot: 10,
                    drift: 14,
                    tone: "warm",
                },
                {
                    id: "ct_b4",
                    pos: { bottom: "14%", left: "30%" },
                    size: 70,
                    shape: "tri-down",
                    speed: 0.4,
                    rot: 0,
                    drift: 12,
                    tone: "accent",
                },
                {
                    id: "ct_b5",
                    pos: { top: "20%", right: "10%" },
                    size: 80,
                    shape: "diamond",
                    speed: 0.3,
                    rot: 20,
                    drift: 16,
                    tone: "warm",
                },
                {
                    id: "ct_b6",
                    pos: { top: "60%", right: "26%" },
                    size: 18,
                    shape: "diamond",
                    speed: 0.55,
                    rot: 25,
                    tone: "accent",
                },
            ],
            front: [
                {
                    id: "ct_f1",
                    pos: { top: "30%", left: "8%" },
                    size: 100,
                    shape: "hex",
                    speed: -0.32,
                    rot: 8,
                    drift: 13,
                    tone: "accent",
                },
                {
                    id: "ct_f2",
                    pos: { top: "12%", left: "32%" },
                    size: 80,
                    shape: "diamond",
                    speed: -0.45,
                    rot: -22,
                    drift: 11,
                    tone: "accent",
                },
                {
                    id: "ct_f3",
                    pos: { bottom: "20%", left: "52%" },
                    size: 60,
                    shape: "tri-down",
                    speed: -0.55,
                    rot: 0,
                    drift: 10,
                    tone: "warm",
                },
                {
                    id: "ct_f4",
                    pos: { top: "56%", left: "70%" },
                    size: 50,
                    shape: "tri",
                    speed: -0.42,
                    rot: 15,
                    drift: 9,
                    tone: "warm",
                },
                {
                    id: "ct_f5",
                    pos: { bottom: "10%", right: "8%" },
                    size: 40,
                    shape: "diamond",
                    speed: -0.78,
                    rot: 45,
                    drift: 8,
                    tone: "accent",
                },
                {
                    id: "ct_f6",
                    pos: { top: "10%", right: "30%" },
                    size: 14,
                    shape: "tri",
                    speed: -0.88,
                    rot: 0,
                    tone: "accent",
                },
            ],
        },
        career: {
            back: [
                {
                    id: "cb1",
                    pos: { top: "5%", right: "4%" },
                    size: 130,
                    shape: "hex",
                    speed: 0.1,
                    rot: 22,
                    drift: 24,
                    tone: "accent",
                    deep: !0,
                },
                {
                    id: "cb2",
                    pos: { top: "32%", left: "-3%" },
                    size: 110,
                    shape: "diamond",
                    speed: 0.06,
                    rot: 18,
                    drift: 22,
                    tone: "warm",
                    deep: !0,
                },
                {
                    id: "cb3",
                    pos: { top: "58%", right: "-2%" },
                    size: 100,
                    shape: "hex",
                    speed: 0.08,
                    rot: 14,
                    drift: 26,
                    tone: "accent",
                    deep: !0,
                },
                {
                    id: "cb4",
                    pos: { bottom: "8%", right: "10%" },
                    size: 80,
                    shape: "hex",
                    speed: 0.18,
                    rot: 10,
                    drift: 18,
                    tone: "warm",
                },
                {
                    id: "cb5",
                    pos: { top: "20%", left: "32%" },
                    size: 50,
                    shape: "tri",
                    speed: 0.22,
                    rot: 8,
                    drift: 16,
                    tone: "soft",
                },
                {
                    id: "cb6",
                    pos: { bottom: "30%", left: "12%" },
                    size: 60,
                    shape: "diamond",
                    speed: 0.14,
                    rot: 35,
                    drift: 20,
                    tone: "soft",
                },
            ],
            front: [
                {
                    id: "cf1",
                    pos: { top: "8%", left: "6%" },
                    size: 34,
                    shape: "tri-down",
                    speed: -0.28,
                    rot: 0,
                    drift: 14,
                    tone: "accent",
                },
                {
                    id: "cf2",
                    pos: { top: "40%", right: "5%" },
                    size: 28,
                    shape: "diamond",
                    speed: -0.42,
                    rot: -18,
                    drift: 12,
                    tone: "warm",
                },
                {
                    id: "cf3",
                    pos: { top: "66%", left: "8%" },
                    size: 22,
                    shape: "tri",
                    speed: -0.5,
                    rot: 18,
                    drift: 11,
                    tone: "accent",
                },
                {
                    id: "cf4",
                    pos: { bottom: "8%", left: "42%" },
                    size: 18,
                    shape: "diamond",
                    speed: -0.55,
                    rot: 45,
                    drift: 10,
                    tone: "accent",
                },
                {
                    id: "cf5",
                    pos: { top: "78%", left: "60%" },
                    size: 14,
                    shape: "tri",
                    speed: -0.62,
                    rot: 10,
                    tone: "accent",
                },
            ],
        },
    },
    mm = {
        tri: "polyshape--tri",
        "tri-down": "polyshape--tri-down",
        diamond: "polyshape--diamond",
        hex: "polyshape--hex",
    },
    pl = { soft: "polyshape--tone-soft", accent: "polyshape--tone-accent", warm: "polyshape--tone-warm" };
function fm({ pos: e, size: t, speed: n, rot: a, drift: s }, i) {
    const o = {
        "--shape-size": `${t}px`,
        "--shape-speed": n,
        "--shape-rot": `${a}deg`,
        "--intro-delay": `${i * 90}ms`,
    };
    return (
        e.top !== void 0 && (o.top = e.top),
        e.bottom !== void 0 && (o.bottom = e.bottom),
        e.left !== void 0 && (o.left = e.left),
        e.right !== void 0 && (o.right = e.right),
        s && ((o["--drift-duration"] = `${s}s`), (o["--drift-delay"] = `${(i * 0.7) % 4}s`)),
        o
    );
}
function hm(e) {
    return [
        "polyshape",
        mm[e.shape] || "polyshape--tri",
        pl[e.tone] || pl.soft,
        e.drift ? "polyshape--drift" : "",
        e.deep ? "polyshape--deep" : "",
    ]
        .filter(Boolean)
        .join(" ");
}
function Ue({ depth: e = "back", variant: t = "hero", intro: n = !0 }) {
    const a = z.useRef(null),
        i = (ul[t] || ul.hero)[e] || [];
    z.useEffect(() => {
        const l = a.current;
        if (!l || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let c = 0,
            d = Number.NaN;
        function v() {
            c = 0;
            const f = -l.getBoundingClientRect().top;
            f !== d && ((d = f), l.style.setProperty("--scroll-y", `${f}px`));
        }
        function h() {
            c || (c = requestAnimationFrame(v));
        }
        return (
            v(),
            window.addEventListener("scroll", h, { passive: !0 }),
            window.addEventListener("resize", h, { passive: !0 }),
            () => {
                window.removeEventListener("scroll", h),
                    window.removeEventListener("resize", h),
                    c && cancelAnimationFrame(c);
            }
        );
    }, []);
    const o = ["hero-poly", `hero-poly--${e}`, `hero-poly--variant-${t}`, n ? "hero-poly--intro" : ""]
        .filter(Boolean)
        .join(" ");
    return r.jsx("div", {
        ref: a,
        className: o,
        "aria-hidden": "true",
        children: i.map((l, c) => r.jsx("span", { className: hm(l), style: fm(l, c) }, l.id)),
    });
}
function Pt(e, t = {}) {
    if (typeof window > "u") return;
    const n = window.gtag;
    if (typeof n == "function")
        try {
            n("event", e, t);
        } catch {}
}
function Ln(e, t = "") {
    Pt("contact_click", { channel: e, location: t });
}
function Ot(e, t = "") {
    Pt("cta_click", { label: e, location: t });
}
function vm(e) {
    Pt("theme_toggle", { theme: e });
}
function ml(e) {
    Pt("nav_click", { section: e });
}
const fl = new Set();
function gm(e) {
    fl.has(e) || (fl.add(e), Pt("section_view", { section: e }));
}
function xm(e, t) {
    Pt("recommendation_open", { author: e, index: t });
}
function hl(e) {
    Pt("recommendation_navigate", { direction: e });
}
function Td(e) {
    if ((Pt("case_view", { case: e }), typeof window < "u" && typeof window.gtag == "function"))
        try {
            window.gtag("event", "page_view", {
                page_location: window.location.href,
                page_path: window.location.pathname,
                page_title: document.title,
            });
        } catch {}
}
const ym = ["UX Research Leader", "Product Design Specialist", "DesignOps Strategist",  "AI Product Builder", "Google UX Design Certified",  "Mestre em Design",];
function jm({ words: e }) {
    const [t, n] = z.useState(""),
        [a, s] = z.useState(0),
        [i, o] = z.useState("typing");
    return (
        z.useEffect(() => {
            if (typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                n(e[0]);
                return;
            }
            const c = e[a];
            let d;
            if (i === "typing")
                if (t.length < c.length) {
                    const v = t.length > 0 ? t[t.length - 1] : "";
                    d = setTimeout(() => n(c.slice(0, t.length + 1)), wm(v));
                } else o("holding");
            else
                i === "holding"
                    ? (d = setTimeout(() => o("erasing"), 1500))
                    : i === "erasing"
                      ? t.length > 0
                          ? (d = setTimeout(() => n(c.slice(0, t.length - 1)), Nm()))
                          : o("between")
                      : i === "between" &&
                        (d = setTimeout(() => {
                            s((v) => (v + 1) % e.length), o("typing");
                        }, 360));
            return () => clearTimeout(d);
        }, [t, i, a, e]),
        r.jsxs("span", {
            className: "herov2-typer",
            "aria-hidden": "true",
            "data-no-edit": "true",
            children: [
                r.jsx("span", { className: "herov2-typer-text", children: t || "​" }),
                r.jsx("span", { className: "herov2-typer-caret", "aria-hidden": "true" }),
            ],
        })
    );
}
function wm(e) {
    let t = 14 + Math.random() * 28;
    return (
        e === " " && (t += 60),
        ",.;:".includes(e) && (t += 110),
        Math.random() < 0.08 && (t += 90 + Math.random() * 130),
        t
    );
}
function Nm() {
    return 10 + Math.random() * 12;
}
function km({ theme: e, setTheme: t }) {
    return r.jsxs("header", {
        className: "herov2 herov2--cinematic",
        id: "top",
        children: [
            r.jsx(Ue, { depth: "back" }),
            r.jsxs("div", {
                className: "herov2-bg",
                children: [
                    r.jsx("img", {
                        className: "herov2-bg-img herov2-bg-img--dark",
                        src: dl.heroOverlay,
                        alt: "Estéfano Pietragalla",
                    }),
                    r.jsx("img", {
                        className: "herov2-bg-img herov2-bg-img--light",
                        src: dl.heroOverlayLight,
                        alt: "",
                        "aria-hidden": "true",
                    }),
                    r.jsx("div", { className: "herov2-bg-vignette", "aria-hidden": "true" }),
                ],
            }),
            r.jsx(Ue, { depth: "front" }),
            r.jsxs("div", {
                className: "herov2-cinematic-eyebrow",
                "aria-hidden": "true",
                children: [
                    r.jsx("span", { className: "t-mono", children: "EP" }),
                    r.jsx("span", { className: "t-mono", children: "2026 / 05" }),
                ],
            }),
            t && r.jsx("div", { className: "herov2-theme-toggle", children: r.jsx(_a, { theme: e, onChange: t }) }),
            r.jsxs("div", {
                className: "herov2-cinematic-content",
                children: [
                    r.jsxs("div", {
                        className: "herov2-eyebrow-stack",
                        children: [
                            r.jsxs("div", {
                                className: "herov2-eyebrow",
                                children: [
                                    r.jsx("span", { className: "herov2-eyebrow-rule", "aria-hidden": "true" }),
                                    r.jsx(jm, { words: ym }),
                                    r.jsx("span", { className: "sr-only", children: "UX Research Leader" }),
                                ],
                            }),
                            r.jsx("div", { className: "herov2-eyebrow-loc", children: "Brasília, BR" }),
                        ],
                    }),
                    r.jsxs("h1", {
                        className: "herov2-title herov2-title--cinematic",
                        children: [
                            "Estéfano",
                            r.jsx("br", {}),
                            "Pietragalla",
                            r.jsx("span", { className: "ital", children: "." }),
                        ],
                    }),
                    r.jsxs("p", {
                        className: "herov2-sub herov2-sub--cinematic",
                        children: [
                            "Construo produtos digitais complexos aliando UX Research, estratégia e resultados de negócio. Já liderei frentes estratégicas de design em instituições como ",
                            r.jsx("strong", { children: "Caixa Econômica Federal" }),
                            ", ",
                            r.jsx("strong", { children: "CNP Seguros Holding Brasil" }),
                            " e",
                            " ",
                            r.jsx("strong", { children: "Tribunal de Contas da União" }),
                            ". Acredito que a excelência em produto se faz com processos de DesignOps, autonomia e confiança.",
                        ],
                    }),
                    r.jsx("div", {
                        className: "herov2-status-row",
                        children: r.jsxs("span", {
                            className: "hero-status",
                            children: [
                                r.jsx("span", { className: "hero-status-dot", "aria-hidden": "true" }),
                                "Disponível para conversas",
                            ],
                        }),
                    }),
                    r.jsx("div", {
                        className: "herov2-cta",
                        children: r.jsxs("a", {
                            href: "#contato",
                            className: "btn btn-primary herov2-cta-main",
                            onClick: () => Ot("vamos_conversar", "hero"),
                            children: ["Vamos conversar", r.jsx("span", { "aria-hidden": "true", children: "→" })],
                        }),
                    }),
                ],
            }),
        ],
    });
}
const Sm = [
    {
        n: "i.",
        h: "Liderança humanizada antes de tudo.",
        p: "Bem‑estar e confiança nos liderados geram resultados mais significativos. Engajamento e pertencimento são ativos intangíveis valiosos.",
        shape: "hex",
    },
    {
        n: "ii.",
        h: "Métricas são inegociáveis.",
        p: "Sem métrica, design vira opinião. Medir entrega e impacto é o que justifica o trabalho do time e evidencia o que cada designer move dentro de um projeto. É essa evidência que transforma esforço em reconhecimento real, e mantém o time conectado ao que o negócio precisa.",
        shape: "diamond",
    },
    {
        n: "iii.",
        h: "O comportamento do usuário guia o produto.",
        p: "Acompanhar o comportamento do usuário é a forma mais consistente de gerar insight e dar direção concreta ao roadmap. Um produto bom de verdade nasce do equilíbrio entre o que o negócio precisa e o que o usuário sinaliza, nenhuma das duas pontas se sustenta sozinha.",
        shape: "tri",
    },
    {
        n: "iv.",
        h: "Liderança constrói ponte entre as áreas.",
        p: "Design, tech, produto e negócio têm o mesmo objetivo, mas raramente falam a mesma língua. Cada área persegue o resultado por um caminho próprio, e quando essa conversa não está bem alinhada vira ruído dentro do produto. Construir essa ponte e manter todos olhando pro mesmo lugar é uma das funções mais críticas da liderança.",
        shape: "diamond",
    },
    {
        n: "v.",
        h: "Acessibilidade, design system e testes não são luxo.",
        p: "São pilares estratégicos no roadmap, desde o primeiro dia. É o que sustenta escala com qualidade, mantém a dívida técnica sob controle e transforma acessibilidade em inclusão real para o usuário.",
        shape: "hex",
    },
    {
        n: "vi.",
        h: "IA potencializa o processo de design.",
        p: "IA multiplica a capacidade de execução, mas é o processo de design que dirige onde essa força é aplicada. Sem essa direção, ela acelera o caminho errado com a mesma velocidade do certo, e o resultado final deixa de atender o produto.",
        shape: "tri-down",
    },
];
function bm({ shape: e, className: t = "" }) {
    return r.jsx("span", { className: `manifesto-glyph manifesto-glyph--${e} ${t}`, "aria-hidden": "true" });
}
function Cm({ items: e = Sm }) {
    return r.jsxs("section", {
        className: "section section--with-poly manifesto-v",
        id: "manifesto",
        "aria-labelledby": "manifesto-h",
        children: [
            r.jsx(Ue, { depth: "back", variant: "contact", intro: !1 }),
            r.jsxs("div", {
                className: "container",
                children: [
                    r.jsxs("div", {
                        className: "section-label reveal",
                        children: [
                            r.jsx("span", { className: "section-label-num", children: "04 —" }),
                            r.jsx("span", { className: "section-label-title", children: "No que acredito" }),
                        ],
                    }),
                    r.jsxs("h2", {
                        id: "manifesto-h",
                        className: "reveal manifesto-title",
                        children: [
                            "Manifesto — ",
                            r.jsx("span", { className: "manifesto-title-it", children: "seis princípios" }),
                            " não‑negociáveis.",
                        ],
                    }),
                    r.jsxs("div", {
                        className: "manifesto-constellation",
                        children: [
                            r.jsx("svg", {
                                className: "manifesto-constellation-lines",
                                viewBox: "0 0 100 100",
                                preserveAspectRatio: "none",
                                "aria-hidden": "true",
                                children: r.jsx("path", {
                                    d: "M 16 12 L 60 14 L 38 36 L 78 38 L 18 60 L 54 62",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "0.18",
                                    strokeDasharray: "0.6 0.8",
                                    vectorEffect: "non-scaling-stroke",
                                }),
                            }),
                            e.map((t, n) =>
                                r.jsxs(
                                    "article",
                                    {
                                        className: "manifesto-c-card reveal",
                                        "data-stagger": Math.min(5, n),
                                        "data-pos": n + 1,
                                        children: [
                                            r.jsx("span", { className: "manifesto-num", children: t.n }),
                                            r.jsx("h3", { className: "manifesto-h", children: t.h }),
                                            r.jsx("p", { className: "manifesto-p", children: t.p }),
                                        ],
                                    },
                                    t.n
                                )
                            ),
                        ],
                    }),
                ],
            }),
            r.jsx(Ue, { depth: "front", variant: "contact", intro: !1 }),
        ],
    });
}
function hr(e, t = []) {
    z.useEffect(() => {
        const n = e.current;
        if (!n) return;
        const a = n.querySelectorAll(".reveal, .mask-reveal, .split-word");
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            a.forEach((o) => o.classList.add("is-in"));
            return;
        }
        const i = new IntersectionObserver(
            (o) => {
                o.forEach((l) => {
                    l.isIntersecting && (l.target.classList.add("is-in"), i.unobserve(l.target));
                });
            },
            { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
        );
        return a.forEach((o) => i.observe(o)), () => i.disconnect();
    }, [e, ...t]);
}
function Lt({ children: e, delayStart: t = 0, className: n = "" }) {
    const s = String(e).split(" ");
    return r.jsx("span", {
        className: n,
        children: s.map((i, o) =>
            r.jsxs(
                Vt.Fragment,
                {
                    children: [
                        r.jsx("span", {
                            className: "split-word",
                            "data-d": Math.min(7, t + o),
                            children: r.jsx("span", { children: i }),
                        }),
                        o < s.length - 1 ? " " : "",
                    ],
                },
                o
            )
        ),
    });
}
function _a({ theme: e, onChange: t }) {
    const n = z.useRef(null),
        a = (s) => {
            const i = e === "dark" ? "light" : "dark";
            vm(i);
            const o = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (!document.startViewTransition || o) {
                t(i);
                return;
            }
            const l = n.current.getBoundingClientRect(),
                c = l.left + l.width / 2,
                d = l.top + l.height / 2,
                v = Math.hypot(Math.max(c, window.innerWidth - c), Math.max(d, window.innerHeight - d));
            document.documentElement.style.setProperty("--vt-x", c + "px"),
                document.documentElement.style.setProperty("--vt-y", d + "px"),
                document.documentElement.style.setProperty("--vt-r", v + "px"),
                document.documentElement.classList.add("vt-active"),
                document
                    .startViewTransition(() => t(i))
                    .finished.finally(() => {
                        document.documentElement.classList.remove("vt-active");
                    });
        };
    return r.jsx("button", {
        ref: n,
        className: "theme-toggle",
        onClick: a,
        "aria-label": e === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro",
        "aria-pressed": e === "dark",
        children:
            e === "dark"
                ? r.jsxs("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "1.6",
                      "aria-hidden": "true",
                      children: [
                          r.jsx("circle", { cx: "12", cy: "12", r: "4" }),
                          r.jsx("path", {
                              d: "M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
                          }),
                      ],
                  })
                : r.jsx("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "1.6",
                      "aria-hidden": "true",
                      children: r.jsx("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" }),
                  }),
    });
}
function Em({
    caption: e = "PORTRAIT · placeholder cinematográfico",
    className: t = "",
    small: n = !1,
    image: a = null,
    showGlyphs: s = !0,
}) {
    const i = !!a;
    return r.jsxs("div", {
        className: `portrait ${i ? "has-image " : ""}${t}`,
        role: "img",
        "aria-label": "Foto profissional placeholder, tratamento editorial em tons quentes",
        children: [
            i && r.jsx("img", { className: "portrait-img", src: a, alt: "", loading: "lazy", decoding: "async" }),
            s && !n && r.jsx("span", { className: "glyph tl", children: "RA" }),
            s && r.jsx("span", { className: "glyph br", children: "04" }),
            r.jsx("span", { className: "portrait-label", children: e }),
        ],
    });
}
function Ia({ theme: e, setTheme: t, heroVisible: n = !1, activeSection: a = "top", hrefBase: s = "" }) {
    const i = (o) => ({
        href: `${s}#${o}`,
        className: a === o ? "is-active" : void 0,
        "aria-current": a === o ? "page" : void 0,
        onClick: () => ml(o),
    });
    return r.jsxs("nav", {
        className: `nav${n ? " nav--hero-visible" : ""}`,
        "aria-label": "Navegação principal",
        children: [
            r.jsx("a", {
                href: `${s}#top`,
                className: "nav-logo",
                "aria-label": "Estéfano Pietragalla — início",
                onClick: () => ml("top"),
                children: r.jsxs("span", {
                    className: "nav-logo-mark",
                    children: ["ep", r.jsx("span", { className: "nav-logo-mark-dot", children: "." })],
                }),
            }),
            r.jsxs("div", {
                className: "nav-links",
                children: [
                    r.jsx("a", { ...i("sobre"), children: "Sobre" }),
                    r.jsx("a", { ...i("carreira"), children: "Carreira" }),
                    r.jsx("a", { ...i("cases"), children: "Cases" }),
                    r.jsx("a", { ...i("manifesto"), children: "Manifesto" }),
                    r.jsx("a", { ...i("recomendacoes"), children: "Recomendações" }),
                    r.jsx("a", { ...i("contato"), children: "Contato" }),
                ],
            }),
            r.jsxs("div", {
                className: "nav-end",
                children: [
                    r.jsx(_a, { theme: e, onChange: t }),
                    r.jsxs("a", {
                        href: `${s}#contato`,
                        className: "btn btn-primary",
                        style: { padding: "10px 18px", fontSize: 14 },
                        onClick: () => Ot("vamos_conversar", "nav"),
                        children: ["Vamos conversar", r.jsx("span", { "aria-hidden": "true", children: "→" })],
                    }),
                ],
            }),
        ],
    });
}
function zm({ brand: e, label: t }) {
    return r.jsx("span", { className: `brand-logo brand-logo--${e}`, role: "img", "aria-label": t });
}
function Pm() {
    const e = [
            { brand: "boticario", label: "Grupo Boticário" },
            { brand: "ame", label: "Ame Digital" },
            { brand: "wine", label: "Wine.com.br" },
            { brand: "folha", label: "Folha Vitória" },
            { brand: "gazeta", label: "Rede Gazeta" },
            { brand: "pmv", label: "Prefeitura de Vitória/ES" },
            { brand: "setur", label: "Setur — Secretaria de Turismo do ES" },
            { brand: "detran", label: "Detran|ES" },
        ],
        t = [...e, ...e];
    return r.jsx("div", {
        className: "marquee",
        "aria-label": "Empresas onde atuei",
        children: r.jsx("div", {
            className: "marquee-track",
            children: t.map((n, a) =>
                r.jsx(
                    "span",
                    {
                        className: "marquee-item",
                        title: n.label,
                        children: r.jsx(zm, { brand: n.brand, label: n.label }),
                    },
                    a
                )
            ),
        }),
    });
}
function Am() {
    return r.jsxs("section", {
        className: "section section--with-poly",
        id: "sobre",
        "aria-labelledby": "sobre-h",
        children: [
            r.jsx(Ue, { depth: "back", variant: "about", intro: !1 }),
            r.jsxs("div", {
                className: "container",
                children: [
                    r.jsxs("div", {
                        className: "section-label reveal",
                        children: [
                            r.jsx("span", { className: "section-label-num", children: "01 —" }),
                            r.jsx("span", { className: "section-label-title", children: "Sobre" }),
                        ],
                    }),
                    r.jsxs("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "clamp(32px, 6vw, 96px)",
                            alignItems: "start",
                        },
                        className: "about-grid",
                        children: [
                            r.jsxs("h2", {
                                id: "sobre-h",
                                className: "reveal",
                                style: {
                                    fontFamily: "var(--font-display)",
                                    fontSize: "clamp(28px, 4vw, 52px)",
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.1,
                                    fontWeight: 600,
                                    margin: 0,
                                    textWrap: "balance",
                                },
                                children: [
                                    "UX Research aprofundado e processos de design: embasamento científico e alinhamento estratégico geram resultados ",
                                    r.jsx("span", {
                                        style: { color: "var(--accent-2)", fontStyle: "italic" },
                                        children: "significativos",
                                    }),
                                    ".",
                                ],
                            }),
                            r.jsxs("div", {
                                className: "reveal",
                                "data-stagger": "1",
                                style: {
                                    color: "var(--fg-soft)",
                                    fontSize: "16px",
                                    lineHeight: 1.6,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                },
                                children: [
                                    r.jsxs("p", {
                                        children: [
                                            "São mais de 7 anos construindo produtos digitais em ambientes de alta complexidade, em uma jornada que se consolidou no desenho de sistemas governamentais e no DesignOps dentro do TCU, passou pela reestruturação estratégica e mapeamento de jornadas na CNP Seguros e, desde então, vem se aprofundando em ecossistemas financeiros de grande escala e soluções B2B no  ",
                                            r.jsx("strong", {
                                                children: "Banco do Brasil e na Caixa Econômica Federal ",
                                            }),
                                            ".",
                                        ],
                                    }),
                                    r.jsx("p", {
                                        children:
                                            "Como especialista em UX Research e Product Design, lidero processos de Discovery contínuo e metodologias de investigação que conectam as necessidades dos usuários à estratégia de negócio. Através do alinhamento com lideranças, organizo dados complexos em insights acionáveis, estabelecendo processos transparentes e estruturados de pesquisa para garantir a evolução contínua da maturidade de design e a entrega de resultados reais.",
                                    }),
                                    r.jsx("div", {
                                        className: "skills-grid",
                                        style: { marginTop: 12 },
                                        children: [
                                            "Ecossistemas de alta complexidade",
                                            "Alinhamento estratégico",
                                            "Design Systems & Tokens",
                                            "Banking PJ & SaaS B2B",
                                            "Métricas de Sucesso & KPIs",
                                            "DesignOps aplicado",
                                            "Acessibilidade (WCAG & eMAG)",
                                            "UX Research & Discovery",
                                            "Data Visualization & Dashboards",
                                            "Multiplataforma (Web & Mobile)"
                                        ].map((e) => r.jsx("span", { className: "skill", children: e }, e)),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    r.jsxs("div", {
                        className: "stats-grid",
                        style: { marginTop: "clamp(56px, 9vw, 112px)" },
                        children: [
                            r.jsxs("div", {
                                className: "stat-cell reveal",
                                children: [
                                    r.jsx("div", { className: "stat-num", children: "+200" }),
                                    r.jsx("div", { className: "stat-unit", children: "projetos" }),
                                    r.jsx("div", {
                                        className: "stat-label",
                                        children: "entregues ao longo da carreira*",
                                    }),
                                ],
                            }),
                            
                            r.jsxs("div", {
                                className: "stat-cell reveal",
                                "data-stagger": "1",
                                children: [
                                    r.jsx("div", { className: "stat-num", children: "+40" }),
                                    r.jsx("div", { className: "stat-unit", children: "designers" }),
                                    r.jsx("div", {
                                        className: "stat-label",
                                        children: "liderados ao longo da carreira",
                                    }),
                                ],
                            }),
                            r.jsxs("div", {
                                className: "stat-cell reveal",
                                "data-stagger": "2",
                                children: [
                                    r.jsx("div", { className: "stat-num", children: "8" }),
                                    r.jsx("div", { className: "stat-unit", children: "anos" }),
                                    r.jsx("div", {
                                        className: "stat-label",
                                        children: "liderando processos de experiência do usuário.",
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            r.jsx(Ue, { depth: "front", variant: "about", intro: !1 }),
            r.jsx("style", {
                children: `
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `,
            }),
        ],
    });
}
function Rm() {
    const e = [
        {
            year: "2022 — 2025",
            from: 2022,
            to: 2025,
            co: "Grupo Boticário",
            mark: "GB",
            tone: "#A31621",
            role: "UX Lead · E‑commerce",
            desc: r.jsxs(r.Fragment, {
                children: [
                    r.jsxs("p", {
                        className: "career-desc",
                        children: [
                            "Atuei como UX Lead de e‑commerce (App e Web), liderando a evolução da experiência de compra em um contexto multi‑squad e multi‑marca, conectando ",
                            r.jsx("strong", { children: "estratégia de produto, discovery e delivery" }),
                            " para gerar impacto em conversão e qualidade de experiência.",
                        ],
                    }),
                    r.jsxs("p", {
                        className: "career-desc",
                        children: [
                            "Conduzi iniciativas de redesign e evolução de jornadas críticas de marcas como ",
                            r.jsx("strong", {
                                children: "O Boticário, Quem disse Berenice, Beleza na Web, Dr. Jones e Eudora",
                            }),
                            " com foco em reduzir fricção e aumentar performance.",
                        ],
                    }),
                    r.jsx("p", {
                        className: "career-desc",
                        children:
                            "Entre nossas frentes de trabalho também estavam a expansão do uso do Design System em todo o ecossistema do e‑commerce, a implementação de métricas de experiência, a evolução da acessibilidade da plataforma e a padronização do trabalho entre diferentes squads.",
                    }),
                ],
            }),
            stats: [
                ["9", "DESIGNERS"],
                ["10", "SQUADS"],
                ["3", "uNIDADES DE NEGÓCIO"],
            ],
            tags: [
                "E‑commerce",
                "Product Design",
                "UX Leadership",
                "App + Web",
                "Omnichannel",
                "Design System (Foundations)",
                "Conversion & CRO",
                "Personalization",
                "Accessibility",
                "Cross‑squad Collaboration",
            ],
        },
        {
            year: "2021 — 2022",
            from: 2021,
            to: 2022,
            co: "Ame Digital",
            mark: "AD",
            tone: "#FF6B1A",
            role: "UX Lead · BU Shopper (Americanas)",
            desc: r.jsxs(r.Fragment, {
                children: [
                    r.jsxs("p", {
                        className: "career-desc",
                        children: [
                            "Coordenei o chapter de UX da ",
                            r.jsx("strong", { children: "BU Shopper" }),
                            ", a unidade que reunia descoberta, marketplace, programa de fidelidade, mobilidade urbana, carteira, serviços financeiros e onboarding sob o mesmo teto do ",
                            r.jsx("strong", { children: "super app da Ame Digital" }),
                            ". O escopo cruzava ",
                            r.jsx("strong", { children: "sete frentes paralelas" }),
                            ", cada uma com sua dinâmica própria de squad, PO e tecnologia.",
                        ],
                    }),
                    r.jsx("p", {
                        className: "career-desc",
                        children:
                            "Estruturamos o chapter, com base em metodologias ágeis, syncs semanais para e capacitação dedicada em análise de dados. Trouxe também, ferramentas de análise do comportamento do usuário para a operação, dando ao time a capacidade de observar sessões reais e transformar dado bruto em decisão de design, em vez de depender só de funis quantitativos.",
                    }),
                ],
            }),
            stats: [
                ["8", "designers"],
                ["7", "squads"],
            ],
            tags: ["Super app", "Fintech", "Loyalty", "PIX", "Mobilidade"],
        },
        {
            year: "2015 — 2021",
            from: 2015,
            to: 2021,
            co: "Wine.com.br",
            mark: "W",
            tone: "#7A1B1B",
            role: "Senior Designer → UX Lead",
            desc: r.jsxs(r.Fragment, {
                children: [
                    r.jsx("p", {
                        className: "career-desc",
                        children:
                            "Na Wine, fui de Senior UX Designer à líder do time, sendo responsável pela construção do setor de UX do zero, definindo práticas, padrões, modelos de trabalho e toda mecânica necessária para o funcionamento de um time de UX.",
                    }),
                    r.jsxs("p", {
                        className: "career-desc",
                        children: [
                            "Nosso time foi responsável por uma das maiores alavancagens de produtos digitais da história da empresa, onde entregamos o ",
                            r.jsx("strong", { children: "App Wine" }),
                            " do zero, redesign da interface do e‑commerce, mudança de plataforma, criação do programa relacionamento (",
                            r.jsx("strong", { children: "WineUp" }),
                            "), evolução do programa de assinatura recorrente (",
                            r.jsx("strong", { children: "Clube Wine" }),
                            ") e até um jogo interativo para os usuários.",
                        ],
                    }),
                    r.jsxs("p", {
                        className: "career-desc",
                        children: [
                            "Além disso, nosso time foi responsável por iniciar a estruturação, medição e implementação de ferramentas de análise do comportamento do usuário como ",
                            r.jsx("strong", { children: "heatmaps e gravações de tela" }),
                            ", transformando esses dados em uma fonte constante de insight.",
                        ],
                    }),
                ],
            }),
            stats: [
                ["12", "designers"],
                ["6", "anos"],
                ["1º", "DS"],
            ],
            tags: ["Mobile", "DS", "Loyalty", "B2B", "Liderança"],
        },
        {
            year: "2014 — 2015",
            from: 2014,
            to: 2015,
            co: "Rede Vitória",
            mark: "RV",
            tone: "#1B4D80",
            role: "Coordenador de Design · Folha Vitória",
            desc: r.jsxs(r.Fragment, {
                children: [
                    r.jsxs("p", {
                        className: "career-desc",
                        children: [
                            "Atuei como Coordenador de Design da ",
                            r.jsx("strong", { children: "Rede Vitória" }),
                            ", grupo de mídia capixaba, com foco no jornal online ",
                            r.jsx("strong", { children: "Folha Vitória" }),
                            " e seus produtos digitais. Fui ponte entre redação, comercial e tecnologia, traduzindo necessidades editoriais em interfaces e fluxos consistentes para o leitor.",
                        ],
                    }),
                    r.jsxs("p", {
                        className: "career-desc",
                        children: [
                            "Conduzi melhorias de experiência do usuário e ",
                            r.jsx("strong", { children: "arquitetura da informação" }),
                            " das editorias, fluxos de leitura e mecanismos de descoberta em um contexto de jornalismo online de alta cadência. Coordenei o trabalho criativo do time no dia a dia, equilibrando demandas editoriais recorrentes e evoluções estruturais do produto.",
                        ],
                    }),
                ],
            }),
            stats: [],
            tags: ["Editorial", "Web", "Content", "Front‑end", "End‑to‑end", "CMS", "Analytics", "Design System"],
        },
        {
            year: "2008 — 2014",
            from: 2008,
            to: 2014,
            co: "Agências Digitais",
            mark: "A",
            tone: "#3D3527",
            role: "UI Designer → Líder de UX",
            desc: r.jsxs(r.Fragment, {
                children: [
                    r.jsxs("p", {
                        className: "career-desc",
                        children: [
                            "Atravessei seis anos em agências do Espírito Santo (",
                            r.jsx("strong", { children: "ebrand, Fivecom e 4Ps" }),
                            "), atendendo desde marcas regionais até clientes de porte nacional e global como ",
                            r.jsx("strong", { children: "Google, Coca‑Cola e Itaú" }),
                            ". A trajetória começou em web design e foi se aprofundando em UI, arquitetura da informação e design de interação até chegar, na 4Ps, à liderança criativa do time.",
                        ],
                    }),
                    r.jsxs("p", {
                        className: "career-desc",
                        children: [
                            "Foi também onde tive a primeira incursão consistente em produto mobile, com projetos para ",
                            r.jsx("strong", { children: "iPhone e Android" }),
                            " nos primórdios do ecossistema iOS/Android no Brasil. Operei o ciclo completo de projeto em agência, do briefing e cronograma até criação, execução e métricas, com escopos que iam de hotsites e banners a aplicações mobile.",
                        ],
                    }),
                ],
            }),
            stats: [
                ["6", "anos"],
                ["3", "agências"],
                ["1", "prêmio Colibri"],
            ],
            tags: ["Campanha", "Hotsite", "Mobile early days"],
        },
    ];
    return r.jsxs("section", {
        className: "section section--with-poly",
        id: "carreira",
        "aria-labelledby": "carreira-h",
        children: [
            r.jsx(Ue, { depth: "back", variant: "career", intro: !1 }),
            r.jsxs("div", {
                className: "container",
                children: [
                    r.jsxs("div", {
                        className: "section-label reveal",
                        children: [
                            r.jsx("span", { className: "section-label-num", children: "02 —" }),
                            r.jsx("span", { className: "section-label-title", children: "Carreira" }),
                        ],
                    }),
                    r.jsxs("h2", {
                        id: "carreira-h",
                        className: "reveal",
                        style: {
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(32px, 5vw, 72px)",
                            letterSpacing: "-0.025em",
                            lineHeight: 1.05,
                            fontWeight: 600,
                            margin: 0,
                            marginBottom: "clamp(30px, 6vw, 63px)",
                            textWrap: "balance",
                            maxWidth: "20ch",
                        },
                        children: [
                            "Uma trajetória entre ",
                            r.jsx("span", {
                                style: { color: "var(--accent-2)", fontStyle: "italic" },
                                children: "agências, jornais online e gigantes do varejo",
                            }),
                            ".",
                        ],
                    }),
                ],
            }),
            r.jsx(Pm, {}),
            r.jsx("div", {
                className: "container",
                children: r.jsx("div", {
                    className: "career-rail",
                    role: "list",
                    children: e.map((t, n) =>
                        r.jsxs(
                            "article",
                            {
                                className: "career-row reveal",
                                "data-stagger": Math.min(5, n),
                                role: "listitem",
                                children: [
                                    r.jsxs("div", {
                                        className: "career-row-rail",
                                        children: [
                                            r.jsx("div", {
                                                className: "career-row-mark",
                                                style: { background: t.tone },
                                                children: r.jsx("span", { children: t.mark }),
                                            }),
                                            n < e.length - 1 &&
                                                r.jsx("div", { className: "career-row-line", "aria-hidden": "true" }),
                                        ],
                                    }),
                                    r.jsxs("div", {
                                        className: "career-row-meta",
                                        children: [
                                            r.jsx("div", { className: "career-year", children: t.year }),
                                            r.jsx("div", {
                                                className: "career-tags",
                                                children: t.tags.map((a) =>
                                                    r.jsx("span", { className: "career-tag", children: a }, a)
                                                ),
                                            }),
                                        ],
                                    }),
                                    r.jsxs("div", {
                                        className: "career-row-body",
                                        children: [
                                            r.jsx("div", { className: "career-co", children: t.co }),
                                            r.jsx("div", { className: "career-role", children: t.role }),
                                            typeof t.desc == "string"
                                                ? t.desc
                                                      .split(
                                                          `

`
                                                      )
                                                      .map((a, s) =>
                                                          r.jsx("p", { className: "career-desc", children: a }, s)
                                                      )
                                                : t.desc,
                                            t.stats.length > 0 &&
                                                r.jsx("div", {
                                                    className: "career-stats",
                                                    children: t.stats.map(([a, s]) =>
                                                        r.jsxs(
                                                            "div",
                                                            {
                                                                className: "career-stat",
                                                                children: [
                                                                    r.jsx("span", {
                                                                        className: "career-stat-n",
                                                                        children: a,
                                                                    }),
                                                                    r.jsx("span", {
                                                                        className: "career-stat-l",
                                                                        children: s,
                                                                    }),
                                                                ],
                                                            },
                                                            s
                                                        )
                                                    ),
                                                }),
                                        ],
                                    }),
                                ],
                            },
                            n
                        )
                    ),
                }),
            }),
            r.jsx(Ue, { depth: "front", variant: "career", intro: !1 }),
        ],
    });
}
function Tm() {
    return r.jsxs("section", {
        className: "section bg-deep section--with-poly",
        id: "cases",
        "aria-labelledby": "cases-h",
        children: [
            r.jsx(Ue, { depth: "back", variant: "about", intro: !1 }),
            r.jsxs("div", {
                className: "container",
                children: [
                    r.jsxs("div", {
                        className: "section-label reveal",
                        children: [
                            r.jsx("span", { className: "section-label-num", children: "03 —" }),
                            r.jsx("span", { className: "section-label-title", children: "Cases selecionados" }),
                        ],
                    }),
                    r.jsxs("h2", {
                        id: "cases-h",
                        className: "reveal cases-wip-title",
                        children: [
                            "Trabalho que ",
                            r.jsx("span", { className: "cases-wip-italic", children: "move" }),
                            " o ponteiro.",
                        ],
                    }),
                    r.jsx("div", {
                        className: "cases-grid reveal",
                        "data-stagger": "1",
                        children: r.jsxs("a", {
                            href: "/cases/wine",
                            className: "project",
                            onClick: () => Ot("ver_case_wine", "cases_grid"),
                            children: [
                                r.jsxs("div", {
                                    className: "project-cover has-image",
                                    children: [
                                        r.jsx("img", {
                                            className: "cover-img",
                                            src: "/uploads/case-wine-context.jpg",
                                            alt: "",
                                            "aria-hidden": "true",
                                            loading: "lazy",
                                            decoding: "async",
                                        }),
                                        r.jsxs("span", {
                                            className: "project-badge",
                                            "aria-hidden": "true",
                                            children: [
                                                r.jsx("span", {
                                                    className: "project-badge-pulse",
                                                    "aria-hidden": "true",
                                                }),
                                                "Primeiro case publicado",
                                            ],
                                        }),
                                        r.jsx("span", {
                                            className: "cover-meta",
                                            "aria-hidden": "true",
                                            children: "Case / 01",
                                        }),
                                        r.jsx("span", {
                                            className: "cover-wordmark",
                                            "aria-hidden": "true",
                                            children: "Wine",
                                        }),
                                        r.jsx("span", { className: "glyph", children: "01" }),
                                    ],
                                }),
                                r.jsxs("div", {
                                    className: "project-meta",
                                    children: [
                                        r.jsx("div", {
                                            className: "project-eyebrow",
                                            children: "Wine.com.br · UX Lead · 2018—2021",
                                        }),
                                        r.jsx("div", {
                                            className: "project-title",
                                            children: "Do zero a 70% das vendas digitais — App Wine",
                                        }),
                                        r.jsxs("div", {
                                            className: "project-tags",
                                            children: [
                                                r.jsx("span", { className: "project-tag", children: "E‑COMMERCE" }),
                                                r.jsx("span", { className: "project-tag", children: "DESIGN SYSTEM" }),
                                                r.jsx("span", { className: "project-tag", children: "LOYALTY" }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                ],
            }),
        ],
    });
}
const G = [
    {
        kind: "feature",
        avatar: "/uploads/avatars/leandro-coradini.jpg",
        pullQuote: "Um líder excepcional que valoriza a pessoa antes do colaborador.",
        quote: "Estéfano Pietragalla, então líder do time de UX da Wine, acreditou no meu potencial e me convidou para integrar sua equipe, inicialmente como PJ e, posteriormente, me efetivou no time interno. Além de um profissional extremamente competente e estrategista, é um líder excepcional que valoriza a pessoa antes do colaborador. É também uma pessoa incrível, acessível e muito gente boa, que sempre pondera com equilíbrio suas decisões e conduz o time com empatia e clareza. Trabalhar com ele é ter ao lado alguém de confiança, que inspira, motiva e cria um ambiente saudável para que todos entreguem o seu melhor. Qualquer profissional que tenha a oportunidade de trabalhar com o Estéfano terá, sem dúvida, uma experiência enriquecedora tanto no aspecto profissional quanto pessoal.",
        author: "Leandro Coradini",
        role: "Product Designer · Wine",
    },
    {
        kind: "feature",
        avatar: "/uploads/avatars/victor-zumbano.jpg",
        pullQuote: "Sob a liderança do Estéfano, tive uma das melhores experiências profissionais da minha vida.",
        quote: "Sob a liderança do Estéfano, tive uma das melhores experiências profissionais da minha vida. Dono de uma capacidade e conhecimento técnico gigante, sempre tem como objetivo a entrega direcionada a grandes resultados, em conjunto da qualidade visual e estratégica, além de ser um ser humano excepcional, daqueles que você com certeza tem vontade de levar para a vida. Muito obrigado por todo o conhecimento e amizade!",
        author: "Victor Zumbano",
        role: "Lead Product Designer · Ame Digital",
    },
    {
        kind: "regular",
        avatar: "/uploads/avatars/gabriel-gomes.jpg",
        pullQuote: "Sem sombra de dúvida um dos designers mais talentosos que conheço.",
        quote: "Sem sombra de dúvida um dos designers mais talentosos que conheço. Estéfano é um cara criativo, focado e esforçado, que está a sempre preocupado com a qualidade de suas entregas. A combinação desses atributos resulta em trabalhos impecáveis e que sempre surpreendem às expectativas. Além de ser um grande profissional, também é uma pessoa extraordinária, fácil de se relacionar, e que se preocupa genuinamente em ajudar as pessoas à sua volta. Me considero um cara de sorte por tê-lo conhecido, e de ter tido a oportunidade de trabalhar com ele em vários projetos.",
        author: "Gabriel Gomes",
        role: "Backend Engineer · Fishbrain",
    },
    {
        kind: "regular",
        avatar: "/uploads/avatars/joao-zanon-jr.jpg",
        pullQuote: "Estéfano, como profissional, pode ser definido em uma palavra: organização.",
        quote: "Estéfano, como profissional, pode ser definido em uma palavra: organização. Programar um projeto que teve sua interface desenvolvida por ele é certeza de uma transição fluida, sem retrabalhos e com tempo otimizado, pois ele já deixa o projeto totalmente pronto para ser programado. Tem um talento nato para sua profissão e busca sempre melhorar suas habilidades, estudando sempre o que há de mais novo em sua área de atuação. Estéfano é um profissional que eu recomendo de olhos fechados.",
        author: "João Zanon Jr",
        role: "Arquiteto de Soluções",
    },
    {
        kind: "regular",
        avatar: "/uploads/avatars/wesley-morais.jpg",
        pullQuote: "Estéfano = excelente profissional.",
        quote: "Um cara prestativo, criativo, ágil, inteligente, pensador, detalhista, enfim, possui habilidades essenciais para um bom profissional e competência no designer. Resumindo: Estéfano = excelente profissional.",
        author: "Wesley Morais",
        role: "Produto, Marketing e Tecnologia",
    },
    {
        kind: "regular",
        avatar: "/uploads/avatars/luana-sena.jpg",
        pullQuote: "O que mais o destaca como UX Lead é sua humanidade.",
        quote: "Trabalhei com o Rê por mais de um ano no Grupo Boticário e o que mais o destaca como UX Lead é sua humanidade. Em ambientes de alta pressão e constantes mudanças, o Estéfano sempre priorizou o bem-estar das pessoas e a saúde do time. Ele possui uma alta inteligência emocional, sendo aquele líder que ouve de verdade e busca criar um ambiente de acolhimento, mesmo nos momentos mais desafiadores. Se você busca um líder que realmente se importa com o fator humano por trás do design, o Rê é a pessoa!",
        author: "Luana Sena",
        role: "UX Leader · Grupo Boticário",
    },
    {
        kind: "regular",
        avatar: "/uploads/avatars/gabriel-pinheiro.jpg",
        pullQuote: "Capacidade técnica aliada a uma sensibilidade humana que transforma equipes.",
        quote: "Estéfano é um profissional incrível, uma capacidade técnica aliada a uma sensibilidade humana que transforma a maneira como as equipes trabalham e colaboram para resolver problemas. Tenho acompanhado a carreira de Estéfano a bastante tempo e sempre vejo ele se desenvolvendo e absorvendo novos conhecimentos para se tornar não apenas um colaborador diferenciado, mas um líder capaz de gerar impacto. Recomendo o Estéfano para empresas que queiram criar equipes de alta performance mantendo o foco em colaboração e também saúde individual e qualidade das entregas.",
        author: "Gabriel Pinheiro",
        role: "Product Specialist · Autor & Speaker",
    },
];
function vl({ src: e, name: t, size: n = "card" }) {
    const [a, s] = z.useState(!1),
        i = t
            .split(" ")
            .map((l) => l[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase(),
        o = !e || a;
    return r.jsx("span", {
        className: `recos-avatar recos-avatar--${n}`,
        "aria-hidden": "true",
        children: o
            ? r.jsx("span", { className: "recos-avatar-initials", children: i })
            : r.jsx("img", { src: e, alt: "", loading: "lazy", decoding: "async", onError: () => s(!0) }),
    });
}
const Lm = {
        back: [
            {
                id: "rb1",
                pos: { top: "8%", left: "6%" },
                size: 140,
                shape: "hex",
                speed: 0.22,
                rot: 18,
                drift: 18,
                tone: "warm",
                deep: !0,
            },
            {
                id: "rb2",
                pos: { top: "55%", left: "22%" },
                size: 90,
                shape: "diamond",
                speed: 0.35,
                rot: 25,
                drift: 14,
                tone: "accent",
            },
            {
                id: "rb3",
                pos: { top: "20%", right: "10%" },
                size: 110,
                shape: "hex",
                speed: 0.2,
                rot: -12,
                drift: 22,
                tone: "warm",
                deep: !0,
            },
            {
                id: "rb4",
                pos: { bottom: "16%", right: "26%" },
                size: 70,
                shape: "tri-down",
                speed: 0.4,
                rot: 0,
                drift: 12,
                tone: "accent",
            },
            {
                id: "rb5",
                pos: { top: "70%", left: "55%" },
                size: 50,
                shape: "diamond",
                speed: 0.28,
                rot: 35,
                drift: 20,
                tone: "soft",
            },
        ],
        front: [
            {
                id: "rf1",
                pos: { top: "32%", left: "4%" },
                size: 36,
                shape: "tri",
                speed: 0.85,
                rot: 12,
                drift: 13,
                tone: "accent",
            },
            {
                id: "rf2",
                pos: { top: "75%", left: "48%" },
                size: 26,
                shape: "diamond",
                speed: 1.1,
                rot: -22,
                tone: "accent",
            },
            {
                id: "rf3",
                pos: { top: "10%", right: "18%" },
                size: 24,
                shape: "tri-down",
                speed: 0.95,
                rot: 0,
                drift: 11,
                tone: "warm",
            },
            {
                id: "rf4",
                pos: { bottom: "26%", right: "6%" },
                size: 18,
                shape: "diamond",
                speed: 1.3,
                rot: 45,
                tone: "accent",
            },
            {
                id: "rf5",
                pos: { top: "50%", right: "38%" },
                size: 14,
                shape: "tri",
                speed: 1.45,
                rot: 0,
                tone: "accent",
            },
        ],
    },
    _m = {
        tri: "polyshape--tri",
        "tri-down": "polyshape--tri-down",
        diamond: "polyshape--diamond",
        hex: "polyshape--hex",
    },
    Im = { soft: "polyshape--tone-soft", accent: "polyshape--tone-accent", warm: "polyshape--tone-warm" };
function gl({ depth: e }) {
    const t = Lm[e] || [];
    return r.jsx("div", {
        className: `recos-poly recos-poly--${e}`,
        "aria-hidden": "true",
        children: t.map((n, a) => {
            const s = [
                    "polyshape",
                    _m[n.shape],
                    Im[n.tone],
                    n.drift ? "polyshape--drift" : "",
                    n.deep ? "polyshape--deep" : "",
                ]
                    .filter(Boolean)
                    .join(" "),
                i = { "--shape-size": `${n.size}px`, "--shape-rot": `${n.rot}deg`, "--shape-speed": n.speed };
            return (
                n.pos.top !== void 0 && (i.top = n.pos.top),
                n.pos.bottom !== void 0 && (i.bottom = n.pos.bottom),
                n.pos.left !== void 0 && (i.left = n.pos.left),
                n.pos.right !== void 0 && (i.right = n.pos.right),
                n.drift && ((i["--drift-duration"] = `${n.drift}s`), (i["--drift-delay"] = `${(a * 0.7) % 4}s`)),
                r.jsx("span", { className: s, style: i }, n.id)
            );
        }),
    });
}
const Mm = 3;
function Dm() {
    const e = z.useRef(null),
        t = z.useRef(null),
        n = z.useRef(null),
        a = z.useRef(null),
        s = z.useRef(1 / G.length),
        i = z.useRef(null);
    i.current === null && (i.current = Math.floor(Math.random() * G.length));
    const [o, l] = z.useState(G.length + i.current),
        c = o % G.length,
        [d, v] = z.useState(null),
        h = z.useRef(null),
        f = z.useRef(null),
        x = z.useRef(null),
        w = z.useCallback((p, g) => {
            (h.current = g.currentTarget), v(p), xm(G[p].author, p + 1);
        }, []),
        k = z.useCallback(() => {
            v(null);
        }, []);
    z.useEffect(() => {
        var y;
        if (d === null) return;
        const p = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            g = (S) => {
                if (S.key === "Escape") {
                    k();
                    return;
                }
                if (S.key !== "Tab") return;
                const b = x.current;
                if (!b) return;
                const E = b.querySelectorAll(p);
                if (!E.length) return;
                const _ = E[0],
                    A = E[E.length - 1];
                S.shiftKey && document.activeElement === _
                    ? (S.preventDefault(), A.focus())
                    : !S.shiftKey && document.activeElement === A && (S.preventDefault(), _.focus());
            };
        return (
            document.addEventListener("keydown", g),
            (document.body.style.overflow = "hidden"),
            (y = f.current) == null || y.focus(),
            () => {
                var S;
                document.removeEventListener("keydown", g),
                    (document.body.style.overflow = ""),
                    (S = h.current) == null || S.focus();
            }
        );
    }, [d, k]);
    const R = z.useCallback(() => {
        const p = n.current;
        if (!p) return 0;
        const g = p.children,
            y = G.length;
        return g.length < y * 2 ? 0 : g[y].offsetLeft - g[0].offsetLeft;
    }, []);
    z.useLayoutEffect(() => {
        const p = n.current;
        if (!p) return;
        const g = p.children,
            y = G.length;
        if (g.length < y * 2) return;
        const S = g[y + i.current],
            b = S.offsetLeft + S.offsetWidth / 2 - p.clientWidth / 2;
        p.scrollLeft = Math.max(0, b);
    }, []),
        z.useEffect(() => {
            const p = n.current;
            if (!p) return;
            let g = null,
                y = null;
            const S = () => {
                    g = null;
                    const _ = R();
                    if (_ <= 0) return;
                    const A = p.scrollLeft,
                        Y = G.length,
                        Ie = (((A % _) + _) % _) / _;
                    t.current && t.current.style.setProperty("--track-progress", String(Ie));
                    const Ee = p.children,
                        Gt = A + p.clientWidth / 2,
                        $e = p.clientWidth * 0.5 || 1;
                    let he = 0,
                        C = 1 / 0;
                    for (let W = 0; W < Ee.length; W++) {
                        const lt = Ee[W],
                            Ye = lt.offsetLeft + lt.offsetWidth / 2,
                            At = Math.abs(Ye - Gt);
                        At < C && ((C = At), (he = W));
                        const Ke = Math.min(1, At / $e);
                        lt.style.setProperty("--cover-distance", Ke.toFixed(3));
                    }
                    const L = ((he % Y) + 1) / Y,
                        O = a.current;
                    O &&
                        (L < s.current - 0.01
                            ? ((O.style.transition = "none"),
                              O.offsetWidth,
                              (O.style.transform = `scaleX(${L})`),
                              (O.style.transition = ""))
                            : (O.style.transform = `scaleX(${L})`),
                        (s.current = L)),
                        l((W) => (W === he ? W : he));
                },
                b = () => {
                    const _ = R();
                    if (_ <= 0) return;
                    const A = G.length,
                        Y = p.children;
                    if (Y.length < A * 3) return;
                    const de = p.scrollLeft,
                        Ie = de + p.clientWidth / 2;
                    let Ee = 0,
                        Gt = 1 / 0;
                    for (let he = 0; he < Y.length; he++) {
                        const C = Y[he].offsetLeft + Y[he].offsetWidth / 2,
                            T = Math.abs(C - Ie);
                        T < Gt && ((Gt = T), (Ee = he));
                    }
                    let $e = 0;
                    Ee < A * 0.5 ? ($e = _) : Ee >= A * 2.5 && ($e = -_),
                        $e !== 0 &&
                            (p.classList.add("is-wrapping"),
                            (p.scrollLeft = de + $e),
                            S(),
                            requestAnimationFrame(() => {
                                p.classList.remove("is-wrapping");
                            }));
                },
                E = () => {
                    g || (g = requestAnimationFrame(S)), clearTimeout(y), (y = setTimeout(b, 200));
                };
            return (
                S(),
                p.addEventListener("scroll", E, { passive: !0 }),
                window.addEventListener("resize", S),
                () => {
                    g && cancelAnimationFrame(g),
                        clearTimeout(y),
                        p.removeEventListener("scroll", E),
                        window.removeEventListener("resize", S);
                }
            );
        }, [R]);
    const m = z.useCallback((p) => {
            const g = n.current;
            if (!g) return;
            const y = g.children;
            if (!y.length) return;
            const b = g.scrollLeft + g.clientWidth / 2;
            let E = 0,
                _ = 1 / 0;
            for (let de = 0; de < y.length; de++) {
                const Ie = y[de].offsetLeft + y[de].offsetWidth / 2,
                    Ee = Math.abs(Ie - b);
                Ee < _ && ((_ = Ee), (E = de));
            }
            const A = y[E + p];
            if (!A) return;
            const Y = A.offsetLeft + A.offsetWidth / 2;
            g.scrollTo({ left: Y - g.clientWidth / 2, behavior: "smooth" });
        }, []),
        u = z.useCallback(
            (p) => {
                if (p.key === "ArrowRight") p.preventDefault(), m(1);
                else if (p.key === "ArrowLeft") p.preventDefault(), m(-1);
                else if (p.key === "Home") {
                    p.preventDefault();
                    const g = n.current,
                        y = g == null ? void 0 : g.children;
                    if (!y) return;
                    const S = G.length,
                        b = y[S];
                    b && g.scrollTo({ left: b.offsetLeft + b.offsetWidth / 2 - g.clientWidth / 2, behavior: "smooth" });
                } else if (p.key === "End") {
                    p.preventDefault();
                    const g = n.current,
                        y = g == null ? void 0 : g.children;
                    if (!y) return;
                    const S = G.length,
                        b = y[S * 2 - 1];
                    b && g.scrollTo({ left: b.offsetLeft + b.offsetWidth / 2 - g.clientWidth / 2, behavior: "smooth" });
                }
            },
            [m]
        );
    return r.jsxs("section", {
        ref: e,
        className: "recos-section",
        id: "recomendacoes",
        "aria-labelledby": "quotes-h",
        children: [
            r.jsxs("div", {
                ref: t,
                className: "recos-pin",
                children: [
                    r.jsx(gl, { depth: "back" }),
                    r.jsxs("div", {
                        className: "container recos-head",
                        children: [
                            r.jsxs("div", {
                                className: "section-label reveal",
                                children: [
                                    r.jsx("span", { className: "section-label-num", children: "05 —" }),
                                    r.jsx("span", { className: "section-label-title", children: "Recomendações" }),
                                ],
                            }),
                            r.jsxs("h2", {
                                id: "quotes-h",
                                className: "recos-title reveal",
                                "data-stagger": "1",
                                children: [
                                    "Não sou eu quem está dizendo.",
                                    " ",
                                    r.jsx("span", {
                                        className: "recos-title-it",
                                        children: "Ouça quem trabalhou comigo.",
                                    }),
                                ],
                            }),
                        ],
                    }),
                    r.jsx("div", {
                        className: "recos-stage",
                        role: "region",
                        "aria-label": "Carrossel de recomendações",
                        "aria-roledescription": "carrossel",
                        children: r.jsx("div", {
                            ref: n,
                            className: "recos-track",
                            tabIndex: "0",
                            role: "group",
                            "aria-label": "Cards de recomendação. Use as setas esquerda e direita para navegar.",
                            onKeyDown: u,
                            children: Array.from({ length: Mm }).flatMap((p, g) =>
                                G.map((y, S) => {
                                    const b = g * G.length + S,
                                        E = S + 1;
                                    return r.jsxs(
                                        "article",
                                        {
                                            className: `recos-card recos-card--${y.kind}${b === o ? " is-active" : ""}`,
                                            "data-index": String(E).padStart(2, "0"),
                                            "aria-roledescription": "slide",
                                            "aria-label": `${E} de ${G.length}`,
                                            "aria-hidden": g !== 1 || void 0,
                                            children: [
                                                r.jsx("span", {
                                                    className: "recos-quote-mark",
                                                    "aria-hidden": "true",
                                                    children: "“",
                                                }),
                                                r.jsx("p", { className: "recos-quote", children: y.pullQuote }),
                                                r.jsxs("div", {
                                                    className: "recos-author",
                                                    children: [
                                                        r.jsx("span", {
                                                            className: "recos-author-line",
                                                            "aria-hidden": "true",
                                                        }),
                                                        r.jsxs("div", {
                                                            className: "recos-author-row",
                                                            children: [
                                                                r.jsx(vl, {
                                                                    src: y.avatar,
                                                                    name: y.author,
                                                                    size: "card",
                                                                }),
                                                                r.jsxs("div", {
                                                                    className: "recos-author-meta",
                                                                    children: [
                                                                        r.jsx("div", {
                                                                            className: "recos-author-name",
                                                                            children: y.author,
                                                                        }),
                                                                        r.jsx("div", {
                                                                            className: "recos-author-role",
                                                                            children: y.role,
                                                                        }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                r.jsxs("button", {
                                                    type: "button",
                                                    className: "recos-read-more",
                                                    onClick: (_) => w(S, _),
                                                    "aria-label": `Ler depoimento completo de ${y.author}`,
                                                    tabIndex: g === 1 ? 0 : -1,
                                                    children: [
                                                        "Ler completa ",
                                                        r.jsx("span", { "aria-hidden": "true", children: "↗" }),
                                                    ],
                                                }),
                                            ],
                                        },
                                        `${g}-${S}`
                                    );
                                })
                            ),
                        }),
                    }),
                    r.jsxs("div", {
                        className: "container recos-foot",
                        children: [
                            r.jsx("div", {
                                className: "recos-progress",
                                "aria-hidden": "true",
                                children: r.jsx("div", { ref: a, className: "recos-progress-bar" }),
                            }),
                            r.jsxs("div", {
                                className: "recos-counter",
                                "aria-hidden": "true",
                                children: [
                                    r.jsx("span", {
                                        className: "recos-counter-cur",
                                        children: String(c + 1).padStart(2, "0"),
                                    }),
                                    r.jsx("span", { className: "recos-counter-sep", children: "/" }),
                                    r.jsx("span", {
                                        className: "recos-counter-tot",
                                        children: String(G.length).padStart(2, "0"),
                                    }),
                                ],
                            }),
                            r.jsxs("div", {
                                className: "recos-sr-status",
                                "aria-live": "polite",
                                "aria-atomic": "true",
                                children: ["Recomendação ", c + 1, " de ", G.length, ": ", G[c].author],
                            }),
                            r.jsxs("div", {
                                className: "recos-nav",
                                role: "group",
                                "aria-label": "Navegação do carrossel",
                                children: [
                                    r.jsx("button", {
                                        type: "button",
                                        className: "recos-nav-btn",
                                        onClick: () => {
                                            hl("prev"), m(-1);
                                        },
                                        "aria-label": "Recomendação anterior",
                                        children: r.jsx("svg", {
                                            width: "18",
                                            height: "18",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "1.6",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            "aria-hidden": "true",
                                            children: r.jsx("path", { d: "M15 18l-6-6 6-6" }),
                                        }),
                                    }),
                                    r.jsx("button", {
                                        type: "button",
                                        className: "recos-nav-btn",
                                        onClick: () => {
                                            hl("next"), m(1);
                                        },
                                        "aria-label": "Próxima recomendação",
                                        children: r.jsx("svg", {
                                            width: "18",
                                            height: "18",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "1.6",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            "aria-hidden": "true",
                                            children: r.jsx("path", { d: "M9 6l6 6-6 6" }),
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    r.jsx(gl, { depth: "front" }),
                ],
            }),
            d !== null &&
                r.jsx("div", {
                    className: "recos-modal",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "recos-modal-name",
                    onClick: k,
                    children: r.jsxs("div", {
                        ref: x,
                        className: "recos-modal-card",
                        onClick: (p) => p.stopPropagation(),
                        children: [
                            r.jsx("button", {
                                ref: f,
                                type: "button",
                                className: "recos-modal-close",
                                onClick: k,
                                "aria-label": "Fechar depoimento",
                                children: r.jsx("span", { "aria-hidden": "true", children: "×" }),
                            }),
                            r.jsx("span", { className: "recos-quote-mark", "aria-hidden": "true", children: "“" }),
                            r.jsx("p", { className: "recos-modal-quote", children: G[d].quote }),
                            r.jsxs("div", {
                                className: "recos-author",
                                children: [
                                    r.jsx("span", { className: "recos-author-line", "aria-hidden": "true" }),
                                    r.jsxs("div", {
                                        className: "recos-author-row",
                                        children: [
                                            r.jsx(vl, { src: G[d].avatar, name: G[d].author, size: "modal" }),
                                            r.jsxs("div", {
                                                className: "recos-author-meta",
                                                children: [
                                                    r.jsx("div", {
                                                        id: "recos-modal-name",
                                                        className: "recos-author-name",
                                                        children: G[d].author,
                                                    }),
                                                    r.jsx("div", {
                                                        className: "recos-author-role",
                                                        children: G[d].role,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
        ],
    });
}
function Ma() {
    return r.jsxs("footer", {
        className: "footer section--with-poly",
        id: "contato",
        children: [
            r.jsx(Ue, { depth: "back", variant: "contact", intro: !1 }),
            r.jsxs("div", {
                className: "container",
                children: [
                    r.jsxs("div", {
                        className: "footer-grid",
                        children: [
                            r.jsxs("div", {
                                className: "footer-cta reveal",
                                children: [
                                    "Vamos",
                                    r.jsx("br", {}),
                                    r.jsxs("a", {
                                        href: "mailto:epietragalla@gmail.com",
                                        onClick: () => Ln("email", "footer_cta"),
                                        children: [
                                            "conversar",
                                            r.jsx("span", { style: { color: "var(--accent)" }, children: "." }),
                                        ],
                                    }),
                                ],
                            }),
                            r.jsxs("nav", {
                                className: "footer-links reveal",
                                "data-stagger": "1",
                                "aria-label": "Contato",
                                children: [
                                    r.jsx("span", {
                                        className: "t-eyebrow",
                                        style: { marginBottom: 8 },
                                        children: "Contato",
                                    }),
                                    r.jsxs("a", {
                                        href: "mailto:epietragalla@gmail.com",
                                        onClick: () => Ln("email", "footer"),
                                        children: [
                                            r.jsx("span", {
                                                className: "arrow",
                                                "aria-hidden": "true",
                                                children: "↗",
                                            }),
                                            " epietragalla@gmail.com",
                                        ],
                                    }),
                                    r.jsxs("a", {
                                        href: "https://wa.me/5561981794586",
                                        target: "_blank",
                                        rel: "noopener",
                                        onClick: () => Ln("whatsapp", "footer"),
                                        children: [
                                            r.jsx("span", {
                                                className: "arrow",
                                                "aria-hidden": "true",
                                                children: "↗",
                                            }),
                                            " (27) 99252‑6466",
                                        ],
                                    }),
                                    r.jsxs("a", {
                                        href: "https://www.linkedin.com/in/rcalcantara",
                                        target: "_blank",
                                        rel: "noopener",
                                        onClick: () => Ln("linkedin", "footer"),
                                        children: [
                                            r.jsx("span", {
                                                className: "arrow",
                                                "aria-hidden": "true",
                                                children: "↗",
                                            }),
                                            " LinkedIn",
                                        ],
                                    }),
                                    r.jsxs("a", {
                                        href: "https://epietragalla.medium.com",
                                        target: "_blank",
                                        rel: "noopener",
                                        onClick: () => Ln("medium", "footer"),
                                        children: [
                                            r.jsx("span", {
                                                className: "arrow",
                                                "aria-hidden": "true",
                                                children: "↗",
                                            }),
                                            " Medium",
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    r.jsxs("div", {
                        className: "footer-fine",
                        children: [
                            r.jsxs("span", {
                                children: ["© ", new Date().getFullYear(), " Estéfano Pietragalla · Brasíla, Df — Brasil"],
                            }),
                            r.jsxs("span", {
                                className: "ai-tag",
                                children: [
                                    r.jsx("span", { className: "ai-dot", "aria-hidden": "true" }),
                                    "Made with AI",
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            r.jsx(Ue, { depth: "front", variant: "contact", intro: !1 }),
        ],
    });
}
function Fm({ initialTheme: e = "light" }) {
    const t = z.useRef(null),
        [n, a] = z.useState(e),
        [s, i] = z.useState(!0),
        [o, l] = z.useState("top");
    return (
        hr(t),
        z.useEffect(() => {
            document.documentElement.dataset.theme = n;
        }, [n]),
        z.useEffect(() => {
            const c = document.getElementById("top");
            if (!c || typeof IntersectionObserver > "u") return;
            const d = new IntersectionObserver(([v]) => i(v.isIntersecting), { threshold: 0 });
            return d.observe(c), () => d.disconnect();
        }, []),
        z.useEffect(() => {
            if (typeof IntersectionObserver > "u") return;
            const d = ["top", "sobre", "carreira", "cases", "manifesto", "recomendacoes", "contato"]
                .map((h) => document.getElementById(h))
                .filter(Boolean);
            if (d.length === 0) return;
            const v = new IntersectionObserver(
                (h) => {
                    for (const f of h) f.isIntersecting && (l(f.target.id), gm(f.target.id));
                },
                { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
            );
            return d.forEach((h) => v.observe(h)), () => v.disconnect();
        }, []),
        r.jsxs("div", {
            ref: t,
            children: [
                r.jsx("a", { href: "#main", className: "skip-link", children: "Pular para conteúdo" }),
                r.jsx(Ia, { theme: n, setTheme: a, heroVisible: s, activeSection: o }),
                r.jsxs("main", {
                    id: "main",
                    tabIndex: "-1",
                    children: [
                        r.jsx("div", { className: "container", children: r.jsx(km, { theme: n, setTheme: a }) }),
                        r.jsx(Am, {}),
                        r.jsx(Rm, {}),
                        r.jsx(Tm, {}),
                        r.jsx(Cm, {}),
                        r.jsx(Dm, {}),
                    ],
                }),
                r.jsx(Ma, {}),
            ],
        })
    );
}
function Om({ children: e, label: t }) {
    const [n, a] = z.useState(!1),
        s = async () => {
            try {
                await navigator.clipboard.writeText(e), a(!0), setTimeout(() => a(!1), 1200);
            } catch {}
        };
    return r.jsxs("button", {
        type: "button",
        onClick: s,
        className: "ds-code",
        "aria-label": `Copiar ${t || e}`,
        title: "Clique para copiar",
        children: [
            r.jsx("span", { children: e }),
            r.jsx("span", { className: "ds-code-state", "aria-hidden": "true", children: n ? "copiado" : "copy" }),
        ],
    });
}
function _e({ id: e, num: t, label: n, title: a, lead: s, children: i }) {
    return r.jsxs("section", {
        className: "ds-section",
        id: e,
        "aria-labelledby": `${e}-h`,
        children: [
            r.jsxs("header", {
                className: "ds-section-head reveal",
                children: [
                    r.jsxs("div", {
                        className: "section-label",
                        style: { marginBottom: 16 },
                        children: [
                            r.jsxs("span", { className: "section-label-num", children: [t, " —"] }),
                            r.jsx("span", { className: "section-label-title", children: n }),
                        ],
                    }),
                    r.jsx("h2", { id: `${e}-h`, className: "ds-section-title", children: a }),
                    s && r.jsx("p", { className: "ds-section-lead", children: s }),
                ],
            }),
            r.jsx("div", { className: "ds-section-body", children: i }),
        ],
    });
}
function M({ title: e, hint: t, children: n, span: a = 1, dense: s = !1 }) {
    return r.jsxs("article", {
        className: `ds-block ds-span-${a} ${s ? "is-dense" : ""}`,
        children: [
            r.jsxs("header", {
                className: "ds-block-head",
                children: [r.jsx("h3", { children: e }), t && r.jsx("p", { children: t })],
            }),
            r.jsx("div", { className: "ds-block-body", children: n }),
        ],
    });
}
const cs = [
    { id: "intro", num: "00", label: "Introdução" },
    { id: "brand", num: "01", label: "Marca" },
    { id: "color", num: "02", label: "Cor" },
    { id: "typography", num: "03", label: "Tipografia" },
    { id: "space", num: "04", label: "Espaço" },
    { id: "radius", num: "05", label: "Raio" },
    { id: "elevation", num: "06", label: "Elevação" },
    { id: "motion", num: "07", label: "Movimento" },
    { id: "icons", num: "08", label: "Iconografia" },
    { id: "components", num: "09", label: "Componentes" },
    { id: "patterns", num: "10", label: "Padrões" },
    { id: "accessibility", num: "11", label: "Acessibilidade" },
    { id: "voice", num: "12", label: "Voz & Conteúdo" },
];
function Wm() {
    const [e, t] = z.useState(cs[0].id);
    return (
        z.useEffect(() => {
            const n = cs.map((s) => s.id),
                a = new IntersectionObserver(
                    (s) => {
                        s.forEach((i) => {
                            i.isIntersecting && t(i.target.id);
                        });
                    },
                    { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
                );
            return (
                n.forEach((s) => {
                    const i = document.getElementById(s);
                    i && a.observe(i);
                }),
                () => a.disconnect()
            );
        }, []),
        r.jsxs("nav", {
            className: "ds-side",
            "aria-label": "Seções do design system",
            children: [
                r.jsx("div", { className: "ds-side-title", children: "Sumário" }),
                r.jsx("ol", {
                    className: "ds-side-list",
                    children: cs.map((n) =>
                        r.jsx(
                            "li",
                            {
                                className: e === n.id ? "is-active" : "",
                                children: r.jsxs("a", {
                                    href: `#${n.id}`,
                                    children: [
                                        r.jsx("span", { className: "ds-side-num", children: n.num }),
                                        r.jsx("span", { className: "ds-side-label", children: n.label }),
                                    ],
                                }),
                            },
                            n.id
                        )
                    ),
                }),
            ],
        })
    );
}
function Bm({ theme: e, setTheme: t }) {
    return r.jsxs("header", {
        className: "ds-topbar",
        "aria-label": "Barra do design system",
        children: [
            r.jsxs("a", {
                href: "/",
                className: "ds-topbar-back",
                "aria-label": "Voltar para o portfolio",
                children: [
                    r.jsx("span", { "aria-hidden": "true", children: "←" }),
                    r.jsx("span", { className: "ds-topbar-back-label", children: "Portfolio" }),
                ],
            }),
            r.jsxs("div", {
                className: "ds-topbar-title",
                children: [
                    r.jsx("span", { className: "nav-logo-mark", "aria-hidden": "true", children: "R" }),
                    r.jsxs("div", {
                        children: [
                            r.jsx("div", { className: "ds-topbar-name", children: "Design System" }),
                            r.jsx("div", { className: "ds-topbar-meta", children: "Estéfano Pietragalla · v1.0 · 2025" }),
                        ],
                    }),
                ],
            }),
            r.jsxs("div", {
                className: "ds-topbar-end",
                children: [
                    r.jsxs("span", {
                        className: "chip",
                        children: [r.jsx("span", { className: "chip-dot", "aria-hidden": "true" }), "Em produção"],
                    }),
                    r.jsx(_a, { theme: e, onChange: t }),
                ],
            }),
        ],
    });
}
function qm() {
    return r.jsx(_e, {
        id: "brand",
        num: "01",
        label: "Marca",
        title: "Liderança em Product Design — editorial, sóbrio, com calor humano.",
        lead: "O sistema MP072 é o ferramental visual do portfolio de Estéfano Pietragalla. Combina o rigor de uma identidade editorial moderna (grafia precisa, números monoespaçados) com toques cinematográficos (paleta quente, gradientes em mesh, italics serifados) para sustentar uma narrativa de carreira de 20+ anos.",
        children: r.jsxs("div", {
            className: "ds-grid",
            children: [
                r.jsx(M, {
                    title: "Pilares",
                    hint: "O que o sistema deve sustentar.",
                    children: r.jsxs("ul", {
                        className: "ds-list",
                        children: [
                            r.jsxs("li", {
                                children: [
                                    r.jsx("strong", { children: "Editorial." }),
                                    " Tipografia conduz a leitura. Hierarquia clara, números mono, italics como acento.",
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("strong", { children: "Humano." }),
                                    " Calor cromático (Coral, Truffle) sobre base escura/cremosa. Voz na primeira pessoa.",
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("strong", { children: "Métrico." }),
                                    " Números grandes, dados explícitos. Cada tela mostra o impacto.",
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("strong", { children: "Acessível." }),
                                    " WCAG 2.2 AA por padrão. Foco visível, motion reduzido, alvos ≥ 44px.",
                                ],
                            }),
                        ],
                    }),
                }),
                r.jsx(M, {
                    title: "Logotipo",
                    hint: "Marca tipográfica + selo.",
                    children: r.jsxs("div", {
                        className: "ds-logo-stage",
                        children: [
                            r.jsxs("div", {
                                className: "ds-logo-row",
                                children: [
                                    r.jsx("span", { className: "nav-logo-mark", "aria-hidden": "true", children: "R" }),
                                    r.jsxs("div", {
                                        children: [
                                            r.jsx("div", { className: "ds-logo-name", children: "Estéfano Pietragalla" }),
                                            r.jsx("div", {
                                                className: "ds-logo-sub",
                                                children: "Product Design Lead · Vitória, BR",
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            r.jsxs("div", {
                                className: "ds-logo-grid",
                                children: [
                                    r.jsxs("div", {
                                        className: "ds-logo-cell",
                                        children: [
                                            r.jsx("span", { className: "nav-logo-mark", children: "R" }),
                                            r.jsx("small", { children: "Selo / 28px" }),
                                        ],
                                    }),
                                    r.jsxs("div", {
                                        className: "ds-logo-cell",
                                        children: [
                                            r.jsx("span", {
                                                className: "nav-logo-mark",
                                                style: { width: 44, height: 44, fontSize: 18 },
                                                children: "R",
                                            }),
                                            r.jsx("small", { children: "Selo / 44px" }),
                                        ],
                                    }),
                                    r.jsxs("div", {
                                        className: "ds-logo-cell",
                                        children: [
                                            r.jsx("span", {
                                                className: "nav-logo-mark",
                                                style: { width: 64, height: 64, fontSize: 26, borderRadius: 14 },
                                                children: "R",
                                            }),
                                            r.jsx("small", { children: "Selo / 64px" }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
            ],
        }),
    });
}
const Um = [
        { name: "Palladian", token: "--c-palladian", hex: "#EEE9DF", role: "Base clara · papel cremoso" },
        { name: "Palladian Soft", token: "--c-palladian-soft", hex: "#F4F0E8", role: "Camada elevada (light)" },
        { name: "Oatmeal", token: "--c-oatmeal", hex: "#C9C1B1", role: "Mute / divisores quentes" },
        { name: "Coral", token: "--c-coral", hex: "#FF8A6E", role: "Accent principal (dark) · pop quente" },
        {
            name: "Burning Flame",
            token: "--c-burning-flame",
            hex: "#FFB162",
            role: "Legado decorativo (substituído por Coral)",
        },
        { name: "Truffle", token: "--c-truffle", hex: "#A35139", role: "Accent texto (light)" },
        { name: "Truffle Deep", token: "--accent-2", hex: "#7A3624", role: "Accent body text (light)" },
        { name: "Blue Fantastic", token: "--c-blue-fantastic", hex: "#2C3B4D", role: "Profundidade fria · tinta" },
        { name: "Abyssal", token: "--c-abyssal", hex: "#1B2632", role: "Texto (light) · accent ink (dark)" },
        { name: "Abyssal Deeper", token: "--c-abyssal-deeper", hex: "#131C26", role: "Elevação 1 · --bg-soft" },
        { name: "Abyssal Black", token: "--c-abyssal-black", hex: "#080C12", role: "Base escura · --bg" },
    ],
    $m = [
        {
            title: "Plano de fundo",
            items: [
                { token: "--bg", desc: "Fundo principal" },
                { token: "--bg-soft", desc: "Fundo secundário" },
                { token: "--bg-elev", desc: "Cards, superfícies elevadas" },
            ],
        },
        {
            title: "Texto",
            items: [
                { token: "--fg", desc: "Texto principal" },
                { token: "--fg-soft", desc: "Body — 82% de contraste" },
                { token: "--fg-mute", desc: "Apoio · meta · captions" },
                { token: "--fg-faint", desc: "Decorativo · marcas d'água" },
            ],
        },
        {
            title: "Linhas",
            items: [
                { token: "--line", desc: "Bordas / divisores" },
                { token: "--line-strong", desc: "Bordas marcadas / hover" },
            ],
        },
        {
            title: "Acento",
            items: [
                { token: "--accent", desc: "Ação primária · highlight" },
                { token: "--accent-2", desc: "Italics, números, body accents" },
                { token: "--accent-warm", desc: "Decorativo quente (constante)" },
                { token: "--accent-ink", desc: "Texto sobre acento" },
            ],
        },
    ];
function Vm() {
    return r.jsxs(_e, {
        id: "color",
        num: "02",
        label: "Cor",
        title: "Paleta MP072 — base + acento quente.",
        lead: "A paleta opera em dois temas. No claro, o Palladian (creme) ancora a tipografia em Truffle profundo; o Coral fica reservado a usos decorativos para preservar contraste. No escuro, a inversão acontece sobre o Abyssal: o Coral assume o papel de acento principal — um pêssego rosado quente sobre fundo frio. Burning Flame permanece na paleta como legado, mas não é mais o accent ativo.",
        children: [
            r.jsxs("div", {
                className: "ds-block-head",
                children: [
                    r.jsx("h3", { children: "Paleta da marca" }),
                    r.jsx("p", { children: "Nove cores nomeadas. Use os tokens semânticos sempre que possível." }),
                ],
            }),
            r.jsx("div", {
                className: "ds-swatch-grid",
                children: Um.map((e) =>
                    r.jsxs(
                        "figure",
                        {
                            className: "ds-swatch",
                            children: [
                                r.jsx("div", {
                                    className: "ds-swatch-chip",
                                    style: { background: e.hex },
                                    "aria-hidden": "true",
                                    children: r.jsx("span", { className: "ds-swatch-hex", children: e.hex }),
                                }),
                                r.jsxs("figcaption", {
                                    children: [
                                        r.jsx("div", { className: "ds-swatch-name", children: e.name }),
                                        r.jsx("div", { className: "ds-swatch-role", children: e.role }),
                                        r.jsx(Om, { label: `token ${e.name}`, children: `var(${e.token})` }),
                                    ],
                                }),
                            ],
                        },
                        e.token
                    )
                ),
            }),
            r.jsxs("div", {
                className: "ds-block-head",
                style: { marginTop: 56 },
                children: [
                    r.jsx("h3", { children: "Tokens semânticos" }),
                    r.jsx("p", {
                        children:
                            "Cada token resolve para luz ou escuro automaticamente. Use-os no produto — nunca use um valor de hex direto.",
                    }),
                ],
            }),
            r.jsx("div", {
                className: "ds-semantic-themes",
                children: ["light", "dark"].map((e) =>
                    r.jsxs(
                        "div",
                        {
                            className: "ds-semantic-theme ds-themed",
                            "data-theme": e,
                            children: [
                                r.jsxs("div", {
                                    className: "ds-semantic-theme-head",
                                    children: [
                                        r.jsx("span", {
                                            className: "t-eyebrow",
                                            children: e === "light" ? "Tema · Claro" : "Tema · Escuro",
                                        }),
                                        r.jsxs("span", {
                                            className: "ds-semantic-meta",
                                            children: ['data-theme="', e, '"'],
                                        }),
                                    ],
                                }),
                                r.jsx("div", {
                                    className: "ds-semantic-preview",
                                    children: $m.map((t) =>
                                        r.jsxs(
                                            "div",
                                            {
                                                className: "ds-semantic-group",
                                                children: [
                                                    r.jsx("div", {
                                                        className: "ds-semantic-group-title",
                                                        children: t.title,
                                                    }),
                                                    t.items.map((n) =>
                                                        r.jsxs(
                                                            "div",
                                                            {
                                                                className: "ds-semantic-row",
                                                                children: [
                                                                    r.jsx("span", {
                                                                        className: "ds-semantic-chip",
                                                                        style: { background: `var(${n.token})` },
                                                                        "aria-hidden": "true",
                                                                    }),
                                                                    r.jsx("code", { children: n.token }),
                                                                    r.jsx("span", {
                                                                        className: "ds-semantic-desc",
                                                                        children: n.desc,
                                                                    }),
                                                                ],
                                                            },
                                                            n.token
                                                        )
                                                    ),
                                                ],
                                            },
                                            t.title
                                        )
                                    ),
                                }),
                            ],
                        },
                        e
                    )
                ),
            }),
            r.jsxs("div", {
                className: "ds-block-head",
                style: { marginTop: 56 },
                children: [
                    r.jsx("h3", { children: "Combinações aprovadas" }),
                    r.jsx("p", { children: "Pares testados para body text. Razão de contraste mínima 4.5:1 (AA)." }),
                ],
            }),
            r.jsxs("div", {
                className: "ds-contrast-grid",
                children: [
                    r.jsxs("div", {
                        className: "ds-contrast",
                        style: { background: "var(--c-palladian)", color: "var(--c-abyssal)" },
                        children: [
                            r.jsx("span", {
                                className: "t-eyebrow",
                                style: { color: "rgba(27,38,50,0.66)" },
                                children: "Palladian + Abyssal",
                            }),
                            r.jsx("strong", { children: "Aa" }),
                            r.jsx("small", { children: "14.6 : 1 — body, headlines" }),
                        ],
                    }),
                    r.jsxs("div", {
                        className: "ds-contrast",
                        style: { background: "var(--c-palladian)", color: "#7A3624" },
                        children: [
                            r.jsx("span", {
                                className: "t-eyebrow",
                                style: { color: "rgba(27,38,50,0.66)" },
                                children: "Palladian + Truffle Deep",
                            }),
                            r.jsx("strong", { children: "Aa" }),
                            r.jsx("small", { children: "5.7 : 1 — accent body text" }),
                        ],
                    }),
                    r.jsxs("div", {
                        className: "ds-contrast",
                        style: { background: "var(--c-abyssal)", color: "var(--c-palladian)" },
                        children: [
                            r.jsx("span", {
                                className: "t-eyebrow",
                                style: { color: "rgba(238,233,223,0.62)" },
                                children: "Abyssal + Palladian",
                            }),
                            r.jsx("strong", { children: "Aa" }),
                            r.jsx("small", { children: "14.6 : 1 — body, headlines" }),
                        ],
                    }),
                    r.jsxs("div", {
                        className: "ds-contrast",
                        style: { background: "var(--c-abyssal)", color: "var(--c-coral)" },
                        children: [
                            r.jsx("span", {
                                className: "t-eyebrow",
                                style: { color: "rgba(238,233,223,0.62)" },
                                children: "Abyssal + Coral",
                            }),
                            r.jsx("strong", { children: "Aa" }),
                            r.jsx("small", { children: "6.7 : 1 — accent (dark)" }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
const Hm = [
    {
        name: "Display 1",
        spec: "Hanken Grotesk 600 · 144/.92 · -0.035em",
        sample: "Vinte anos desenhando experiências.",
        style: { fontSize: "clamp(56px, 9vw, 144px)", lineHeight: 0.92, letterSpacing: "-0.035em", fontWeight: 600 },
    },
    {
        name: "Display 2",
        spec: "Hanken Grotesk 600 · 88/.98 · -0.03em",
        sample: "Trabalho que moveu o ponteiro.",
        style: { fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 600 },
    },
    {
        name: "Heading 1",
        spec: "Hanken Grotesk 600 · 72/1.05 · -0.025em",
        sample: "Uma trajetória entre agências e gigantes.",
        style: { fontSize: "clamp(32px, 5vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 600 },
    },
    {
        name: "Heading 2",
        spec: "Hanken Grotesk 600 · 52/1.10 · -0.02em",
        sample: "Liderança humanizada antes de tudo.",
        style: { fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 600 },
    },
    {
        name: "Heading 3",
        spec: "Hanken Grotesk 600 · 32/1.10 · -0.015em",
        sample: "Redesign do e‑commerce — App + Site.",
        style: { fontSize: "clamp(22px, 3vw, 32px)", lineHeight: 1.1, letterSpacing: "-0.015em", fontWeight: 600 },
    },
    {
        name: "Body Lead",
        spec: "Hanken Grotesk 400 · 19/1.55",
        sample: "Há mais de 20 anos construindo produtos digitais — de agências atendendo Google e Coca-Cola a operações em escala como Wine, Ame e Boticário.",
        style: { fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55 },
    },
    {
        name: "Body",
        spec: "Hanken Grotesk 400 · 16/1.60",
        sample: "Acompanhamento próximo, feedbacks claros, metas e métricas. Decisões boas vêm de evidência, não de opinião.",
        style: { fontSize: 16, lineHeight: 1.6 },
    },
    {
        name: "Body Small",
        spec: "Hanken Grotesk 400 · 15/1.55",
        sample: "Engajamento e pertencimento são ativos intangíveis valiosos.",
        style: { fontSize: 15, lineHeight: 1.55 },
    },
    {
        name: "Eyebrow",
        spec: "Cascadia Code 500 · 12 · 0.12em UC",
        sample: "01 — Sobre",
        style: {
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
        },
    },
    {
        name: "Mono Label",
        spec: "Cascadia Code 500 · 11 · 0.18em UC",
        sample: "RA / 2026 · CASE 03",
        style: {
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
        },
    },
];
function Qm() {
    return r.jsxs(_e, {
        id: "typography",
        num: "03",
        label: "Tipografia",
        title: "Hanken Grotesk sustenta toda a hierarquia.",
        lead: "Hanken Grotesk (sans) faz display, headings e body. Cascadia Code carrega meta, números e eyebrows. Italics da própria Hanken são usados como acento — sempre em --accent-2 — para diferenciar uma única palavra dentro de um título.",
        children: [
            r.jsx("div", {
                className: "ds-grid",
                children: r.jsx(M, {
                    title: "Famílias",
                    span: 3,
                    children: r.jsxs("div", {
                        className: "ds-font-stage",
                        children: [
                            r.jsxs("div", {
                                className: "ds-font-card",
                                children: [
                                    r.jsx("div", {
                                        className: "ds-font-aa",
                                        style: { fontFamily: "var(--font-display)" },
                                        children: "Aa",
                                    }),
                                    r.jsxs("div", {
                                        className: "ds-font-meta",
                                        children: [
                                            r.jsx("div", { className: "ds-font-name", children: "Hanken Grotesk" }),
                                            r.jsx("div", {
                                                className: "ds-font-spec",
                                                children: "Sans · 400 / 500 / 600 / 700 / 800",
                                            }),
                                            r.jsx("div", {
                                                className: "ds-font-role",
                                                children: "Display · Heading · Body",
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            r.jsxs("div", {
                                className: "ds-font-card",
                                children: [
                                    r.jsx("div", {
                                        className: "ds-font-aa",
                                        style: { fontFamily: "var(--font-mono)" },
                                        children: "Aa",
                                    }),
                                    r.jsxs("div", {
                                        className: "ds-font-meta",
                                        children: [
                                            r.jsx("div", { className: "ds-font-name", children: "Cascadia Code" }),
                                            r.jsx("div", { className: "ds-font-spec", children: "Mono · 400 / 500" }),
                                            r.jsx("div", {
                                                className: "ds-font-role",
                                                children: "Eyebrow · Meta · Números",
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            r.jsxs("div", {
                                className: "ds-font-card",
                                children: [
                                    r.jsx("div", {
                                        className: "ds-font-aa",
                                        style: {
                                            fontStyle: "italic",
                                            fontFamily: "var(--font-display)",
                                            fontWeight: 500,
                                        },
                                        children: "Aa",
                                    }),
                                    r.jsxs("div", {
                                        className: "ds-font-meta",
                                        children: [
                                            r.jsx("div", { className: "ds-font-name", children: "Hanken Italic" }),
                                            r.jsx("div", { className: "ds-font-spec", children: "Sans · italic 500" }),
                                            r.jsx("div", {
                                                className: "ds-font-role",
                                                children: "Acento dentro do título",
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
            }),
            r.jsxs("div", {
                className: "ds-block-head",
                style: { marginTop: 40 },
                children: [
                    r.jsx("h3", { children: "Escala" }),
                    r.jsxs("p", {
                        children: [
                            "Tamanhos fluidos com ",
                            r.jsx("code", { children: "clamp()" }),
                            ". Linha-base e tracking ajustados para densidade editorial.",
                        ],
                    }),
                ],
            }),
            r.jsx("div", {
                className: "ds-type-scale",
                children: Hm.map((e) =>
                    r.jsxs(
                        "div",
                        {
                            className: "ds-type-row",
                            children: [
                                r.jsxs("div", {
                                    className: "ds-type-meta",
                                    children: [
                                        r.jsx("div", { className: "ds-type-name", children: e.name }),
                                        r.jsx("div", { className: "ds-type-spec", children: e.spec }),
                                    ],
                                }),
                                r.jsx("div", { className: "ds-type-sample", style: e.style, children: e.sample }),
                            ],
                        },
                        e.name
                    )
                ),
            }),
            r.jsxs("div", {
                className: "ds-block-head",
                style: { marginTop: 40 },
                children: [
                    r.jsx("h3", { children: "Acento italic" }),
                    r.jsxs("p", {
                        children: [
                            "Reservado para uma palavra-chave por título. Usa ",
                            r.jsx("code", { children: "--accent-2" }),
                            " (claro) ou ",
                            r.jsx("code", { children: "--accent" }),
                            " (escuro).",
                        ],
                    }),
                ],
            }),
            r.jsx("div", {
                className: "ds-italic-demo",
                children: r.jsxs("p", {
                    children: [
                        "Acredito em liderança humanizada — onde bem‑estar e confiança geram resultados",
                        " ",
                        r.jsx("span", {
                            style: { color: "var(--accent-2)", fontStyle: "italic", fontWeight: 500 },
                            children: "significativos",
                        }),
                        ".",
                    ],
                }),
            }),
        ],
    });
}
const Gm = [
    { token: "--s-1", px: 4 },
    { token: "--s-2", px: 8 },
    { token: "--s-3", px: 12 },
    { token: "--s-4", px: 16 },
    { token: "--s-5", px: 24 },
    { token: "--s-6", px: 32 },
    { token: "--s-7", px: 48 },
    { token: "--s-8", px: 64 },
    { token: "--s-9", px: 96 },
    { token: "--s-10", px: 128 },
    { token: "--s-11", px: 160 },
];
function Xm() {
    return r.jsx(_e, {
        id: "space",
        num: "04",
        label: "Espaço",
        title: "Escala progressiva — base 4 com saltos editoriais.",
        lead: "O ritmo respira. Saltos de 4 → 8 → 12 → 16 atendem componentes; 24 → 32 → 48 → 64 articulam blocos; 96 → 128 → 160 separam seções inteiras. Container máximo de 1280px com padding fluido entre 20 e 48px.",
        children: r.jsx("div", {
            className: "ds-space-list",
            children: Gm.map((e) =>
                r.jsxs(
                    "div",
                    {
                        className: "ds-space-row",
                        children: [
                            r.jsx("code", { children: e.token }),
                            r.jsx("span", { className: "ds-space-bar", style: { width: e.px }, "aria-hidden": "true" }),
                            r.jsxs("span", { className: "ds-space-px", children: [e.px, "px"] }),
                        ],
                    },
                    e.token
                )
            ),
        }),
    });
}
const Ym = [
    { token: "--r-sm", px: 6, role: "Inputs · code chips" },
    { token: "--r-md", px: 12, role: "Botões internos · containers médios" },
    { token: "--r-lg", px: 20, role: "Cards · cover de cases" },
    { token: "--r-xl", px: 32, role: "Hero · case-cover" },
    { token: "--r-full", px: 999, role: "Pills · chips · botões CTA" },
];
function Km() {
    return r.jsx(_e, {
        id: "radius",
        num: "05",
        label: "Raio",
        title: "Cinco passos do brutalismo ao pill.",
        lead: "Use o menor raio que ainda comunica a função. Pills são reservados a CTAs e chips; raios maiores para superfícies ‘objeto’ (cards, covers, blocos editoriais).",
        children: r.jsx("div", {
            className: "ds-radius-grid",
            children: Ym.map((e) =>
                r.jsxs(
                    "figure",
                    {
                        className: "ds-radius-cell",
                        children: [
                            r.jsx("div", {
                                className: "ds-radius-shape",
                                style: { borderRadius: e.px === 999 ? 999 : e.px },
                                "aria-hidden": "true",
                            }),
                            r.jsxs("figcaption", {
                                children: [
                                    r.jsx("code", { children: e.token }),
                                    r.jsx("span", { children: e.px === 999 ? "999px" : `${e.px}px` }),
                                    r.jsx("small", { children: e.role }),
                                ],
                            }),
                        ],
                    },
                    e.token
                )
            ),
        }),
    });
}
function Zm() {
    const e = [
        { name: "Plano", token: "—", shadow: "none" },
        {
            name: "Cartão",
            token: "card border + bg-elev",
            shadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px -12px rgba(0,0,0,0.20)",
        },
        {
            name: "Hero",
            token: "hero-portrait--editorial",
            shadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 24px 60px -24px rgba(0,0,0,0.35)",
        },
        {
            name: "Overlay",
            token: "hero-portrait--overlay",
            shadow: "0 1px 0 rgba(255,177,98,0.10) inset, 0 60px 80px -30px rgba(0,0,0,0.55)",
        },
        { name: "Mockup", token: "phone drop-shadow", shadow: "0 30px 60px rgba(0,0,0,0.35)" },
    ];
    return r.jsxs(_e, {
        id: "elevation",
        num: "06",
        label: "Elevação & superfícies",
        title: "Sombras curadas e cards de vidro.",
        lead: "Elevação clássica usa inset + drop-shadow calibrados por contexto (cartão, hero, overlay, mockup). Para superfícies sobre conteúdo decorativo (polígonos, imagens), o sistema usa glass — translúcido + backdrop blur — pra dar profundidade sem competir.",
        children: [
            r.jsx(M, {
                title: "Sombras",
                hint: "Cinco papéis de elevação ligados a contextos reais — não uma escala 1–6 genérica.",
                children: r.jsx("div", {
                    className: "ds-elev-grid",
                    children: e.map((t) =>
                        r.jsxs(
                            "figure",
                            {
                                className: "ds-elev-cell",
                                children: [
                                    r.jsx("div", { className: "ds-elev-card", style: { boxShadow: t.shadow } }),
                                    r.jsxs("figcaption", {
                                        children: [
                                            r.jsx("strong", { children: t.name }),
                                            r.jsx("code", { children: t.token }),
                                        ],
                                    }),
                                ],
                            },
                            t.name
                        )
                    ),
                }),
            }),
            r.jsxs(M, {
                title: "Surface · glass",
                hint: "Tratamento translúcido + backdrop blur usado em todos os cards (manifesto, recomendações, cases WIP, project tile, quote) e na nav. O conteúdo decorativo (polígonos, imagens) atrás aparece borrado, dando profundidade sem competir com o texto.",
                children: [
                    r.jsxs("div", {
                        className: "ds-glass-stage",
                        "aria-hidden": "true",
                        children: [
                            r.jsx("span", {
                                className:
                                    "polyshape polyshape--hex polyshape--tone-warm polyshape--deep ds-glass-shape",
                                style: { top: "12%", left: "8%", width: 110, height: 110, transform: "rotate(18deg)" },
                            }),
                            r.jsx("span", {
                                className: "polyshape polyshape--diamond polyshape--tone-accent ds-glass-shape",
                                style: { top: "55%", left: "32%", width: 80, height: 80, transform: "rotate(25deg)" },
                            }),
                            r.jsx("span", {
                                className: "polyshape polyshape--tri polyshape--tone-warm ds-glass-shape",
                                style: { top: "20%", right: "14%", width: 60, height: 60, transform: "rotate(-12deg)" },
                            }),
                            r.jsx("span", {
                                className: "polyshape polyshape--diamond polyshape--tone-accent ds-glass-shape",
                                style: {
                                    bottom: "12%",
                                    right: "8%",
                                    width: 40,
                                    height: 40,
                                    transform: "rotate(45deg)",
                                },
                            }),
                            r.jsxs("article", {
                                className: "ds-glass-card",
                                children: [
                                    r.jsx("span", { className: "manifesto-num", children: "aa." }),
                                    r.jsx("h3", { className: "manifesto-h", children: "Glass surface." }),
                                    r.jsx("p", {
                                        className: "manifesto-p",
                                        children:
                                            "color‑mix sobre --bg-elev a 55% + backdrop blur 18px saturate 1.2. Borda sutil em --fg a 10%.",
                                    }),
                                ],
                            }),
                        ],
                    }),
                    r.jsxs("ul", {
                        className: "ds-list ds-list-mono",
                        style: { marginTop: 16 },
                        children: [
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: "--glass-bg" }),
                                    r.jsx("span", { children: "color-mix(in oklab, --bg-elev 55%, transparent)" }),
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: "--glass-bg-active" }),
                                    r.jsx("span", { children: "color-mix(in oklab, --bg-elev 78%, transparent)" }),
                                    r.jsx("small", { children: "hover, is-active" }),
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: "--glass-border" }),
                                    r.jsx("span", { children: "color-mix(in srgb, --fg 10%, transparent)" }),
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: "--glass-blur" }),
                                    r.jsx("span", { children: "blur(18px) saturate(1.2)" }),
                                ],
                            }),
                        ],
                    }),
                    r.jsxs("div", {
                        className: "ds-tip",
                        children: [
                            r.jsx("strong", { children: "Quando usar." }),
                            " Sempre que houver conteúdo decorativo atrás (polígonos, imagens, gradiente). Em fundos planos o efeito fica sutil, mas mantém a coerência. Fallback automático pra ",
                            r.jsx("code", { children: "--bg-elev" }),
                            " sólido em browsers sem ",
                            r.jsx("code", { children: "backdrop-filter" }),
                            ".",
                        ],
                    }),
                ],
            }),
        ],
    });
}
function Jm() {
    const [e, t] = z.useState(0);
    return r.jsx(_e, {
        id: "motion",
        num: "07",
        label: "Movimento",
        title: "Curvas suaves, durações editoriais.",
        lead: "O movimento é discreto e direcional — quase sempre opacidade + translação Y, em easing out. Reveal quando entra na viewport; transição circular (View Transitions API) para mudança de tema.",
        children: r.jsxs("div", {
            className: "ds-grid",
            children: [
                r.jsx(M, {
                    title: "Durações",
                    children: r.jsxs("ul", {
                        className: "ds-list ds-list-mono",
                        children: [
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: "--dur-fast" }),
                                    r.jsx("span", { children: "200ms" }),
                                    r.jsx("small", { children: "hover, micro" }),
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: "--dur" }),
                                    r.jsx("span", { children: "380ms" }),
                                    r.jsx("small", { children: "padrão de UI" }),
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: "--dur-slow" }),
                                    r.jsx("span", { children: "720ms" }),
                                    r.jsx("small", { children: "reveal de seções" }),
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: "--dur-slower" }),
                                    r.jsx("span", { children: "1100ms" }),
                                    r.jsx("small", { children: "mask reveal" }),
                                ],
                            }),
                        ],
                    }),
                }),
                r.jsx(M, {
                    title: "Easings",
                    children: r.jsxs("ul", {
                        className: "ds-list ds-list-mono",
                        children: [
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: "--ease-out" }),
                                    r.jsx("span", { children: "cubic-bezier(.22, 1, .36, 1)" }),
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: "--ease-in-out" }),
                                    r.jsx("span", { children: "cubic-bezier(.65, 0, .35, 1)" }),
                                ],
                            }),
                        ],
                    }),
                }),
                r.jsxs(M, {
                    title: "Variáveis JS-driven",
                    hint: "Algumas animações são dirigidas por JS lendo posição de scroll/cursor. O JS escreve numa CSS var; o CSS resolve a interpolação. Padrão usado em paralaxe e cover-flow.",
                    children: [
                        r.jsxs("ul", {
                            className: "ds-list ds-list-mono",
                            children: [
                                r.jsxs("li", {
                                    children: [
                                        r.jsx("code", { children: "--scroll-y" }),
                                        r.jsx("span", { children: "0..1" }),
                                        r.jsx("small", { children: "paralaxe vertical do hero (window scroll)" }),
                                    ],
                                }),
                                r.jsxs("li", {
                                    children: [
                                        r.jsx("code", { children: "--track-progress" }),
                                        r.jsx("span", { children: "0..1" }),
                                        r.jsx("small", {
                                            children:
                                                "posição do scroll dentro de um set do carrossel de recomendações; alimenta paralaxe horizontal dos polígonos",
                                        }),
                                    ],
                                }),
                                r.jsxs("li", {
                                    children: [
                                        r.jsx("code", { children: "--cover-distance" }),
                                        r.jsx("span", { children: "0..1" }),
                                        r.jsx("small", {
                                            children:
                                                "distância normalizada do card ao centro do track; CSS deriva scale, translateY e opacity (efeito cover-flow estilo Apple)",
                                        }),
                                    ],
                                }),
                                r.jsxs("li", {
                                    children: [
                                        r.jsx("code", { children: "--shape-speed" }),
                                        r.jsx("span", { children: "0.2..1.5" }),
                                        r.jsx("small", {
                                            children:
                                                "multiplicador estático por polígono — define se ele responde mais (front) ou menos (back) à --track-progress / --scroll-y",
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        r.jsxs("div", {
                            className: "ds-tip",
                            children: [
                                r.jsx("strong", { children: "Por quê via CSS var?" }),
                                " Mantém o transform fora do React render (atualizado via ",
                                r.jsx("code", { children: "requestAnimationFrame" }),
                                " direto no DOM), preserva 60fps em listas grandes e permite que o CSS continue dono da resposta visual (tipo curva, escala, opacidade). React fica só com o estado discreto (índice ativo, contador).",
                            ],
                        }),
                    ],
                }),
                r.jsxs(M, {
                    title: "Reveal demo",
                    hint: "Toque em ‘Replay’ para ver o reveal em ação.",
                    children: [
                        r.jsxs("button", {
                            type: "button",
                            className: "btn btn-ghost",
                            onClick: () => t((n) => n + 1),
                            children: ["Replay ", r.jsx("span", { "aria-hidden": "true", children: "↻" })],
                        }),
                        r.jsxs(
                            "div",
                            {
                                className: "ds-motion-stage",
                                children: [
                                    r.jsxs("div", {
                                        className: "ds-motion-block",
                                        children: [
                                            r.jsx("span", {
                                                className: "split-word is-in",
                                                "data-d": "0",
                                                children: r.jsx("span", {
                                                    style: { animation: "ds-rise 900ms var(--ease-out)" },
                                                    children: "Hello,",
                                                }),
                                            }),
                                            " ",
                                            r.jsx("span", {
                                                className: "split-word is-in",
                                                "data-d": "1",
                                                children: r.jsx("span", {
                                                    style: { animation: "ds-rise 900ms var(--ease-out) 80ms both" },
                                                    children: "this",
                                                }),
                                            }),
                                            " ",
                                            r.jsx("span", {
                                                className: "split-word is-in",
                                                "data-d": "2",
                                                children: r.jsx("span", {
                                                    style: { animation: "ds-rise 900ms var(--ease-out) 160ms both" },
                                                    children: "is",
                                                }),
                                            }),
                                            " ",
                                            r.jsx("span", {
                                                className: "split-word is-in",
                                                "data-d": "3",
                                                children: r.jsx("span", {
                                                    style: {
                                                        animation: "ds-rise 900ms var(--ease-out) 240ms both",
                                                        color: "var(--accent-2)",
                                                        fontStyle: "italic",
                                                    },
                                                    children: "motion",
                                                }),
                                            }),
                                            ".",
                                        ],
                                    }),
                                    r.jsx("div", {
                                        className: "ds-motion-mask",
                                        style: { animation: "ds-mask 1100ms var(--ease-out) 200ms both" },
                                    }),
                                ],
                            },
                            e
                        ),
                    ],
                }),
            ],
        }),
    });
}
function ef() {
    const e = ({ children: t, label: n }) =>
        r.jsxs("figure", {
            className: "ds-icon-cell",
            children: [
                r.jsx("div", { className: "ds-icon-frame", "aria-hidden": "true", children: t }),
                r.jsx("figcaption", { children: n }),
            ],
        });
    return r.jsx(_e, {
        id: "icons",
        num: "08",
        label: "Iconografia",
        title: "Glifos editoriais, não ícones de toolbar.",
        lead: "O sistema prefere glifos tipográficos a ícones decorativos. Setas e símbolos vêm direto do texto (↗ → ↓ ↻ ▸). Quando precisa de ícone, é stroke 1.6px, contornos abertos, em currentColor.",
        children: r.jsxs("div", {
            className: "ds-icon-grid",
            children: [
                r.jsx(e, { label: "↗ Externo", children: "↗" }),
                r.jsx(e, { label: "→ Avançar", children: "→" }),
                r.jsx(e, { label: "↓ Download", children: "↓" }),
                r.jsx(e, { label: "↻ Replay", children: "↻" }),
                r.jsx(e, { label: "▸ Highlight", children: "▸" }),
                r.jsx(e, { label: "• Status", children: "●" }),
                r.jsx(e, {
                    label: "Sun (theme)",
                    children: r.jsxs("svg", {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.6",
                        children: [
                            r.jsx("circle", { cx: "12", cy: "12", r: "4" }),
                            r.jsx("path", {
                                d: "M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
                            }),
                        ],
                    }),
                }),
                r.jsx(e, {
                    label: "Moon (theme)",
                    children: r.jsx("svg", {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.6",
                        children: r.jsx("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" }),
                    }),
                }),
            ],
        }),
    });
}
function tf() {
    return r.jsxs(_e, {
        id: "components",
        num: "09",
        label: "Componentes",
        title: "Os blocos atômicos do portfolio.",
        lead: "Cada componente está em uso real no site. Aqui mostro variações canônicas, estados e quando aplicar.",
        children: [
            r.jsxs(M, {
                title: "Botões",
                hint: "Primário (CTA) e ghost (secundário). Ambos são pill-shaped, com altura mínima 44px.",
                children: [
                    r.jsxs("div", {
                        className: "ds-row",
                        children: [
                            r.jsxs("a", {
                                href: "#cta",
                                className: "btn btn-primary",
                                children: ["Vamos conversar ", r.jsx("span", { "aria-hidden": "true", children: "→" })],
                            }),
                            r.jsxs("a", {
                                href: "#cta",
                                className: "btn btn-ghost",
                                children: [
                                    "Baixar CV ",
                                    r.jsx("span", { "aria-hidden": "true", className: "t-mono", children: ".pdf" }),
                                ],
                            }),
                            r.jsx("button", {
                                type: "button",
                                className: "btn btn-primary",
                                disabled: !0,
                                style: { opacity: 0.4, pointerEvents: "none" },
                                children: "Desabilitado",
                            }),
                        ],
                    }),
                    r.jsxs("div", {
                        className: "ds-tip",
                        children: [
                            r.jsx("strong", { children: "Quando usar." }),
                            " Apenas ",
                            r.jsx("em", { children: "uma" }),
                            " ação primária por contexto. Ghost para ação secundária ou retorno. Setas (→ ↓ ↗) reforçam direção: → para avançar, ↓ para download/scroll, ↗ para abrir externo.",
                        ],
                    }),
                ],
            }),
            r.jsxs(M, {
                title: "Chips & status",
                hint: "Container fluido com fundo elevado. O dot pisca o estado.",
                children: [
                    r.jsxs("div", {
                        className: "ds-row",
                        children: [
                            r.jsxs("span", {
                                className: "chip",
                                children: [
                                    r.jsx("span", { className: "chip-dot", "aria-hidden": "true" }),
                                    "Disponível para conversas",
                                ],
                            }),
                            r.jsx("span", { className: "chip", children: "UX Lead · 2018–2025" }),
                            r.jsx("span", { className: "chip", children: "e‑commerce · loyalty · IA" }),
                        ],
                    }),
                    r.jsxs("div", {
                        className: "ds-tip",
                        children: [
                            r.jsx("strong", { children: "Quando usar." }),
                            " Status do disponível, contexto de cargo, sumário de áreas. Mono sobre fundo elevado, sem cor de marca — ficam discretos por design.",
                        ],
                    }),
                ],
            }),
            r.jsxs(M, {
                title: "Skill pills",
                hint: "Pílulas outlined em accent + mono. Vocabulário de competência, não status.",
                children: [
                    r.jsx("div", {
                        className: "ds-row",
                        children: [
                            "E‑commerce",
                            "Liderança",
                            "Design Systems",
                            "Loyalty",
                            "OKRs",
                            "IA aplicada",
                            "Acessibilidade",
                            "Métricas",
                        ].map((e) => r.jsx("span", { className: "skill", children: e }, e)),
                    }),
                    r.jsxs("div", {
                        className: "ds-tip",
                        children: [
                            r.jsx("strong", { children: "Quando usar." }),
                            " Para listas curtas de skills/áreas onde o accent reforça que aquele conjunto é uma ",
                            r.jsx("em", { children: "declaração" }),
                            " (o que eu faço), não uma informação operacional (status, tag de filtro). Hover preenche levemente em accent. Diferencia-se do ",
                            r.jsx("code", { children: ".chip" }),
                            " pelo outline colorido e fundo transparente.",
                        ],
                    }),
                ],
            }),
            r.jsx(M, {
                title: "Theme toggle",
                hint: "Botão circular 40x40. Dispara View Transitions API com clip-path circular a partir do botão.",
                children: r.jsxs("div", {
                    className: "ds-row",
                    children: [
                        r.jsx(nf, {}),
                        r.jsxs("small", {
                            children: ["Persistência em localStorage (", r.jsx("code", { children: "rn-theme" }), ")."],
                        }),
                    ],
                }),
            }),
            r.jsx(M, {
                title: "Section label",
                hint: "Numeração editorial em mono — abre toda seção principal.",
                children: r.jsxs("div", {
                    className: "section-label",
                    children: [
                        r.jsx("span", { className: "section-label-num", children: "03 —" }),
                        r.jsx("span", { className: "section-label-title", children: "Cases selecionados" }),
                    ],
                }),
            }),
            r.jsx(M, {
                title: "Hero eyebrow + título",
                hint: "Eyebrow com traço fino · título em SplitWords (animação por palavra).",
                children: r.jsxs("div", {
                    className: "ds-hero-mini",
                    children: [
                        r.jsxs("div", {
                            className: "hero-eyebrow",
                            children: [
                                r.jsx("span", { children: "Product Design Lead" }),
                                r.jsx("span", { "aria-hidden": "true", children: "/" }),
                                r.jsx("span", { children: "Vitória, BR" }),
                            ],
                        }),
                        r.jsxs("div", {
                            className: "hero-title",
                            style: { fontSize: "clamp(40px, 6vw, 88px)" },
                            children: [
                                r.jsx(Lt, { children: "Liderança" }),
                                " ",
                                r.jsx("span", {
                                    className: "ital",
                                    children: r.jsx(Lt, { delayStart: 2, children: "significativa" }),
                                }),
                                ".",
                            ],
                        }),
                    ],
                }),
            }),
            r.jsx(M, {
                title: "Números & stat cells",
                hint: "Tipografia display gigante + label mono. Borda superior fina marca a baseline editorial.",
                children: r.jsxs("div", {
                    className: "stats-grid",
                    children: [
                        r.jsxs("div", {
                            className: "stat-cell",
                            children: [
                                r.jsx("div", { className: "stat-num", children: "20+" }),
                                r.jsx("div", { className: "stat-unit", children: "anos" }),
                                r.jsx("div", {
                                    className: "stat-label",
                                    children: "de experiência em produtos digitais.",
                                }),
                            ],
                        }),
                        r.jsxs("div", {
                            className: "stat-cell",
                            children: [
                                r.jsx("div", { className: "stat-num", children: "R$ 35,7" }),
                                r.jsx("div", { className: "stat-unit", children: "bilhões" }),
                                r.jsx("div", {
                                    className: "stat-label",
                                    children: "GMV do e‑commerce do Grupo Boticário.",
                                }),
                            ],
                        }),
                        r.jsxs("div", {
                            className: "stat-cell",
                            children: [
                                r.jsx("div", { className: "stat-num", children: "12" }),
                                r.jsx("div", { className: "stat-unit", children: "designers" }),
                                r.jsx("div", { className: "stat-label", children: "construídos do zero na Wine." }),
                            ],
                        }),
                    ],
                }),
            }),
            r.jsx(M, {
                title: "Manifesto card · constelação",
                hint: "Glass surface, número romano compacto em mono uppercase, título display 700 com tracking tight, parágrafo de apoio. No layout completo, 6 cards se distribuem num grid assimétrico de 12 colunas conectados por linhas SVG dashed.",
                children: r.jsxs("div", {
                    className: "ds-manifesto-preview",
                    children: [
                        r.jsxs("article", {
                            className: "manifesto-c-card",
                            children: [
                                r.jsx("span", { className: "manifesto-num", children: "i." }),
                                r.jsx("h3", {
                                    className: "manifesto-h",
                                    children: "Liderança humanizada antes de tudo.",
                                }),
                                r.jsx("p", {
                                    className: "manifesto-p",
                                    children:
                                        "Bem‑estar e confiança nos liderados geram resultados mais significativos.",
                                }),
                            ],
                        }),
                        r.jsxs("article", {
                            className: "manifesto-c-card",
                            children: [
                                r.jsx("span", { className: "manifesto-num", children: "ii." }),
                                r.jsx("h3", { className: "manifesto-h", children: "Métricas são inegociáveis." }),
                                r.jsx("p", {
                                    className: "manifesto-p",
                                    children: "Entender entregas e impactos é o que dá reconhecimento aos designers.",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            r.jsx(M, {
                title: "Manifesto glyphs",
                hint: "Vocabulário de quatro shapes (hex, diamond, tri, tri‑down) usado como marcador de cada princípio. Mesmas formas dos polígonos do hero/footer, em escala reduzida.",
                children: r.jsx("div", {
                    className: "ds-glyph-row",
                    children: [
                        { shape: "hex", label: "hex" },
                        { shape: "diamond", label: "diamond" },
                        { shape: "tri", label: "tri" },
                        { shape: "tri-down", label: "tri‑down" },
                    ].map((e) =>
                        r.jsxs(
                            "div",
                            {
                                className: "ds-glyph-cell",
                                children: [
                                    r.jsx(bm, { shape: e.shape, className: "ds-glyph-sample" }),
                                    r.jsx("span", { className: "ds-glyph-label", children: e.label }),
                                ],
                            },
                            e.shape
                        )
                    ),
                }),
            }),
            r.jsx(M, {
                title: "Project tile",
                hint: "Cover com gradiente mesh + grain. Wordmark editorial. Glifo gigante de fundo.",
                children: r.jsxs("a", {
                    href: "#case",
                    className: "project",
                    style: { maxWidth: 480 },
                    children: [
                        r.jsxs("div", {
                            className: "project-cover botica",
                            children: [
                                r.jsx("span", {
                                    className: "cover-wordmark",
                                    "aria-hidden": "true",
                                    children: "Boticário",
                                }),
                                r.jsx("span", {
                                    className: "cover-meta",
                                    "aria-hidden": "true",
                                    children: "CASE / 01",
                                }),
                                r.jsx("span", { className: "glyph", children: "01" }),
                            ],
                        }),
                        r.jsxs("div", {
                            className: "project-meta",
                            children: [
                                r.jsx("div", {
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 11,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        color: "var(--accent)",
                                    },
                                    children: "Grupo Boticário · 2022—2025",
                                }),
                                r.jsx("div", {
                                    className: "project-title",
                                    children: "Redesign do e‑commerce — App + Site",
                                }),
                                r.jsxs("div", {
                                    className: "project-tags",
                                    children: [
                                        r.jsx("span", { className: "project-tag", children: "E‑COMMERCE" }),
                                        r.jsx("span", { className: "project-tag", children: "DESIGN SYSTEM" }),
                                        r.jsx("span", { className: "project-tag", children: "OMNICHANNEL" }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            r.jsx(M, {
                title: "Career row",
                hint: "Marca circular tonal + ano mono + corpo com tags e estatísticas.",
                children: r.jsx("div", {
                    className: "career-rail",
                    style: { maxWidth: 920 },
                    children: r.jsxs("article", {
                        className: "career-row",
                        children: [
                            r.jsx("div", {
                                className: "career-row-rail",
                                children: r.jsx("div", {
                                    className: "career-row-mark",
                                    style: { background: "#A31621" },
                                    children: r.jsx("span", { children: "GB" }),
                                }),
                            }),
                            r.jsxs("div", {
                                className: "career-row-meta",
                                children: [
                                    r.jsx("div", { className: "career-year", children: "2022 — 2025" }),
                                    r.jsx("div", {
                                        className: "career-tags",
                                        children: ["E‑commerce", "DS", "IA"].map((e) =>
                                            r.jsx("span", { className: "career-tag", children: e }, e)
                                        ),
                                    }),
                                ],
                            }),
                            r.jsxs("div", {
                                className: "career-row-body",
                                children: [
                                    r.jsx("div", { className: "career-co", children: "Grupo Boticário" }),
                                    r.jsx("div", { className: "career-role", children: "UX Lead · E‑commerce" }),
                                    r.jsx("p", {
                                        className: "career-desc",
                                        children:
                                            "Líder de UX dos e‑commerces (App e Site) das marcas do grupo. Redesign completo da plataforma, IA para alt text e evolução de omnicanalidade.",
                                    }),
                                    r.jsxs("div", {
                                        className: "career-stats",
                                        children: [
                                            r.jsxs("div", {
                                                className: "career-stat",
                                                children: [
                                                    r.jsx("span", { className: "career-stat-n", children: "+19%" }),
                                                    r.jsx("span", { className: "career-stat-l", children: "GMV YoY" }),
                                                ],
                                            }),
                                            r.jsxs("div", {
                                                className: "career-stat",
                                                children: [
                                                    r.jsx("span", { className: "career-stat-n", children: "230+" }),
                                                    r.jsx("span", { className: "career-stat-l", children: "telas" }),
                                                ],
                                            }),
                                            r.jsxs("div", {
                                                className: "career-stat",
                                                children: [
                                                    r.jsx("span", { className: "career-stat-n", children: "4" }),
                                                    r.jsx("span", { className: "career-stat-l", children: "marcas" }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
            }),
            r.jsx(M, {
                title: "Quote / depoimento (legacy)",
                hint: "Aspa serifada gigante em --accent. Texto em display, autor em mono. Glass surface compartilhado. Usado em case-detail.",
                children: r.jsxs("div", {
                    className: "quote",
                    style: { maxWidth: 720 },
                    children: [
                        r.jsx("div", { className: "quote-mark", "aria-hidden": "true", children: '"' }),
                        r.jsx("p", {
                            className: "quote-text",
                            children:
                                "Estéfano é uma liderança rara — combina visão estratégica, técnica afiada e cuidado genuíno com cada pessoa do time.",
                        }),
                        r.jsxs("div", {
                            className: "quote-author",
                            children: [
                                r.jsx("span", { className: "quote-author-avatar", "aria-hidden": "true" }),
                                r.jsxs("div", {
                                    children: [
                                        r.jsx("div", {
                                            style: { color: "var(--fg)", fontWeight: 600 },
                                            children: "Liderado · Wine",
                                        }),
                                        r.jsx("div", { children: "Senior Product Designer" }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            r.jsxs(M, {
                title: "Recomendação card",
                hint: "Glass surface, dimensão compacta. Aspas tipográficas grandes em --accent-warm, texto em display, autor com avatar circular + linha decorativa accent + nome italic + role mono uppercase. Variante feature ganha gradient com tinta accent. Index mono no canto superior direito. Botão `Ler completa` abre modal com depoimento integral.",
                children: [
                    r.jsxs("div", {
                        className: "ds-recos-preview",
                        children: [
                            r.jsxs("article", {
                                className: "recos-card recos-card--regular is-active",
                                "data-index": "01",
                                children: [
                                    r.jsx("span", {
                                        className: "recos-quote-mark",
                                        "aria-hidden": "true",
                                        children: "“",
                                    }),
                                    r.jsx("p", {
                                        className: "recos-quote",
                                        children:
                                            "Estéfano é uma liderança rara. Combina visão estratégica, técnica afiada e cuidado genuíno com cada pessoa do time.",
                                    }),
                                    r.jsxs("div", {
                                        className: "recos-author",
                                        children: [
                                            r.jsx("span", { className: "recos-author-line", "aria-hidden": "true" }),
                                            r.jsxs("div", {
                                                className: "recos-author-row",
                                                children: [
                                                    r.jsx("span", {
                                                        className: "recos-avatar recos-avatar--card",
                                                        "aria-hidden": "true",
                                                        children: r.jsx("span", {
                                                            className: "recos-avatar-initials",
                                                            children: "LW",
                                                        }),
                                                    }),
                                                    r.jsxs("div", {
                                                        className: "recos-author-meta",
                                                        children: [
                                                            r.jsx("div", {
                                                                className: "recos-author-name",
                                                                children: "Liderado · Wine",
                                                            }),
                                                            r.jsx("div", {
                                                                className: "recos-author-role",
                                                                children: "Senior Product Designer",
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    r.jsxs("span", {
                                        className: "recos-read-more",
                                        "aria-hidden": "true",
                                        children: ["Ler completa ", r.jsx("span", { children: "↗" })],
                                    }),
                                ],
                            }),
                            r.jsxs("article", {
                                className: "recos-card recos-card--feature",
                                "data-index": "02",
                                children: [
                                    r.jsx("span", {
                                        className: "recos-quote-mark",
                                        "aria-hidden": "true",
                                        children: "“",
                                    }),
                                    r.jsx("p", {
                                        className: "recos-quote",
                                        children:
                                            "Trabalhar com Estéfano é entender que design, tech e negócio falam a mesma língua quando há método.",
                                    }),
                                    r.jsxs("div", {
                                        className: "recos-author",
                                        children: [
                                            r.jsx("span", { className: "recos-author-line", "aria-hidden": "true" }),
                                            r.jsxs("div", {
                                                className: "recos-author-row",
                                                children: [
                                                    r.jsx("span", {
                                                        className: "recos-avatar recos-avatar--card",
                                                        "aria-hidden": "true",
                                                        children: r.jsx("span", {
                                                            className: "recos-avatar-initials",
                                                            children: "SB",
                                                        }),
                                                    }),
                                                    r.jsxs("div", {
                                                        className: "recos-author-meta",
                                                        children: [
                                                            r.jsx("div", {
                                                                className: "recos-author-name",
                                                                children: "Stakeholder · Grupo Boticário",
                                                            }),
                                                            r.jsx("div", {
                                                                className: "recos-author-role",
                                                                children: "Product Manager",
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    r.jsxs("span", {
                                        className: "recos-read-more",
                                        "aria-hidden": "true",
                                        children: ["Ler completa ", r.jsx("span", { children: "↗" })],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    r.jsxs("div", {
                        className: "ds-tip",
                        children: [
                            r.jsx("strong", { children: "Estados." }),
                            " ",
                            r.jsx("code", { children: ".is-active" }),
                            " (foco visual no card centralizado) muda ",
                            r.jsx("code", { children: "border-color" }),
                            " pra accent, eleva o card via ",
                            r.jsx("code", { children: "box-shadow" }),
                            " e troca a cor do index. ",
                            r.jsx("code", { children: ".recos-card--feature" }),
                            " ganha gradient com tinta accent e tipografia maior. Em ",
                            r.jsx("code", { children: "prefers-reduced-motion: reduce" }),
                            " o cover-flow é desligado.",
                        ],
                    }),
                ],
            }),
            r.jsxs(M, {
                title: "WIP card · Em construção",
                hint: "Card único usado quando uma seção ainda não tem conteúdo final. Status com pulse, headline curta, parágrafo de explicação e link de redirecionamento. Glass surface igual aos demais cards.",
                children: [
                    r.jsxs("div", {
                        className: "cases-wip-card",
                        style: { maxWidth: 720 },
                        children: [
                            r.jsxs("div", {
                                className: "cases-wip-status",
                                children: [
                                    r.jsx("span", { className: "cases-wip-pulse", "aria-hidden": "true" }),
                                    r.jsx("span", { children: "Em construção" }),
                                ],
                            }),
                            r.jsx("h3", { className: "cases-wip-h", children: "Estou montando os cases com cuidado." }),
                            r.jsx("p", {
                                className: "cases-wip-p",
                                children:
                                    "Cada case vai mostrar contexto, decisões de design, métricas de impacto e o processo por trás.",
                            }),
                            r.jsxs("a", {
                                href: "#components",
                                className: "cases-wip-link",
                                children: [
                                    "Enquanto isso, ver a carreira ",
                                    r.jsx("span", { "aria-hidden": "true", children: "→" }),
                                ],
                            }),
                        ],
                    }),
                    r.jsxs("div", {
                        className: "ds-tip",
                        children: [
                            r.jsx("strong", { children: "Quando usar." }),
                            " Substitui temporariamente uma seção com conteúdo crítico mas ainda inacabado. Mantém a presença da seção (anchor, label, headline) e indica honestamente que tem mais por vir, sem esconder a lacuna.",
                        ],
                    }),
                ],
            }),
            r.jsx(M, {
                title: "Marquee de marcas",
                hint: "Tipografia display gigante, dot acentuado entre itens, 38s loop.",
                children: r.jsx("div", {
                    className: "marquee",
                    "aria-hidden": "true",
                    children: r.jsx("div", {
                        className: "marquee-track",
                        children: [...Array(2)].map((e, t) =>
                            r.jsx(
                                Vt.Fragment,
                                {
                                    children: [
                                        "Grupo Boticário",
                                        "Ame Digital",
                                        "Wine.com.br",
                                        "Google",
                                        "Coca‑Cola",
                                        "Itaú",
                                    ].map((n, a) =>
                                        r.jsx("span", { className: "marquee-item", children: n }, `${t}-${a}`)
                                    ),
                                },
                                t
                            )
                        ),
                    }),
                }),
            }),
            r.jsx(M, {
                title: "Portrait placeholder",
                hint: "Quando não há foto: gradiente mesh quente + grão fílmico + glifos R / 04.",
                children: r.jsx("div", {
                    style: { maxWidth: 320, aspectRatio: "3/4" },
                    children: r.jsx(Em, { className: "hero-portrait--editorial", caption: "VAR · EDITORIAL" }),
                }),
            }),
        ],
    });
}
function nf() {
    const [e, t] = z.useState(document.documentElement.dataset.theme || "dark");
    return (
        z.useEffect(() => {
            const n = new MutationObserver(() => {
                t(document.documentElement.dataset.theme || "dark");
            });
            return (
                n.observe(document.documentElement, { attributes: !0, attributeFilter: ["data-theme"] }),
                () => n.disconnect()
            );
        }, []),
        r.jsx(_a, {
            theme: e,
            onChange: (n) => {
                document.documentElement.dataset.theme = n;
                try {
                    localStorage.setItem("rn-theme", n);
                } catch {}
                t(n);
            },
        })
    );
}
function rf() {
    return r.jsxs(_e, {
        id: "patterns",
        num: "10",
        label: "Padrões",
        title: "Composições recorrentes no produto.",
        lead: "Os blocos abaixo se repetem ao longo do portfolio e dos cases. Cada padrão tem uma combinação fixa de label + título + corpo com regras claras de espaçamento.",
        children: [
            r.jsx(M, {
                title: "Section pattern",
                hint: "Section label numerado + título display + body de apoio. Padding vertical fluido (64–140px).",
                children: r.jsxs("div", {
                    className: "ds-pattern-frame",
                    children: [
                        r.jsxs("div", {
                            className: "section-label",
                            children: [
                                r.jsx("span", { className: "section-label-num", children: "02 —" }),
                                r.jsx("span", { className: "section-label-title", children: "Carreira" }),
                            ],
                        }),
                        r.jsxs("h2", {
                            style: {
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(32px, 5vw, 64px)",
                                letterSpacing: "-0.025em",
                                lineHeight: 1.05,
                                fontWeight: 600,
                                margin: 0,
                                maxWidth: "20ch",
                                textWrap: "balance",
                            },
                            children: [
                                "Uma trajetória entre ",
                                r.jsx("span", {
                                    style: { color: "var(--accent-2)", fontStyle: "italic" },
                                    children: "agências, jornais e gigantes do varejo",
                                }),
                                ".",
                            ],
                        }),
                    ],
                }),
            }),
            r.jsx(M, {
                title: "Hero variants",
                hint: "Quatro tratamentos de hero — cada um adequado a um contexto editorial.",
                children: r.jsx("div", {
                    className: "ds-hero-variants",
                    children: [
                        {
                            v: "editorial",
                            title: "A · Editorial",
                            desc: "Split 1.3fr/1fr. Foto retrato + tipografia ao lado.",
                        },
                        {
                            v: "overlay",
                            title: "B · Overlay",
                            desc: "Foto ocupa metade direita, sangrando para fora. Tipografia em primeiro plano.",
                        },
                        {
                            v: "typo",
                            title: "C · Typográfico",
                            desc: "Apenas tipografia gigante; foto vira faixa cinematográfica abaixo.",
                        },
                        {
                            v: "mono",
                            title: "D · Mono",
                            desc: "Brutalista. Cascadia Code no título, foto duotone, raio quase nulo.",
                        },
                    ].map((e) =>
                        r.jsxs(
                            "figure",
                            {
                                className: "ds-hero-thumb",
                                children: [
                                    r.jsxs("div", {
                                        className: `portrait hero-portrait--${e.v}`,
                                        style: { aspectRatio: "16/9" },
                                        children: [
                                            r.jsx("span", { className: "glyph tl", children: "RA" }),
                                            r.jsxs("span", {
                                                className: "portrait-label",
                                                children: ["VAR · ", e.v.toUpperCase()],
                                            }),
                                        ],
                                    }),
                                    r.jsxs("figcaption", {
                                        children: [
                                            r.jsx("strong", { children: e.title }),
                                            r.jsx("small", { children: e.desc }),
                                        ],
                                    }),
                                ],
                            },
                            e.v
                        )
                    ),
                }),
            }),
            r.jsx(M, {
                title: "Cover treatments",
                hint: "Gradient mesh por marca + wordmark + glifo numérico. Sempre com grain de filme.",
                children: r.jsx("div", {
                    className: "ds-cover-row",
                    children: [
                        { cls: "botica", brand: "Boticário", n: "01" },
                        { cls: "wine", brand: "Wine", n: "02" },
                        { cls: "loyalty", brand: "Wine Up", n: "03" },
                    ].map((e) =>
                        r.jsx(
                            "div",
                            {
                                className: "project",
                                style: { flex: "1 1 280px" },
                                children: r.jsxs("div", {
                                    className: `project-cover ${e.cls}`,
                                    children: [
                                        r.jsx("span", {
                                            className: "cover-wordmark",
                                            "aria-hidden": "true",
                                            children: e.brand,
                                        }),
                                        r.jsxs("span", {
                                            className: "cover-meta",
                                            "aria-hidden": "true",
                                            children: ["CASE / ", e.n],
                                        }),
                                        r.jsx("span", { className: "glyph", children: e.n }),
                                    ],
                                }),
                            },
                            e.cls
                        )
                    ),
                }),
            }),
            r.jsx(M, {
                title: "Footer CTA",
                hint: "Frase grande encerra o site com link sublinhado animando do canto esquerdo.",
                children: r.jsx("div", {
                    className: "ds-pattern-frame",
                    children: r.jsxs("div", {
                        className: "footer-cta",
                        style: { fontSize: "clamp(40px, 6vw, 72px)" },
                        children: [
                            "Vamos",
                            r.jsx("br", {}),
                            r.jsxs("a", {
                                href: "#contato",
                                children: [
                                    "conversar",
                                    r.jsx("span", { style: { color: "var(--accent)" }, children: "." }),
                                ],
                            }),
                        ],
                    }),
                }),
            }),
        ],
    });
}
function af() {
    return r.jsx(_e, {
        id: "accessibility",
        num: "11",
        label: "Acessibilidade",
        title: "WCAG 2.2 AA é base, não bônus.",
        lead: "Cada componente nasce com foco visível, contraste 4.5:1+, alvos de toque ≥ 44px e suporte a redução de motion. As decoraçoes ficam hidden a leitores de tela; o conteúdo significativo é semântico.",
        children: r.jsxs("div", {
            className: "ds-grid",
            children: [
                r.jsxs(M, {
                    title: "Foco visível",
                    children: [
                        r.jsxs("div", {
                            className: "ds-row",
                            style: { flexWrap: "wrap" },
                            children: [
                                r.jsxs("button", {
                                    type: "button",
                                    className: "btn btn-primary",
                                    style: { outline: "2px solid var(--accent)", outlineOffset: 3 },
                                    children: ["CTA focado ", r.jsx("span", { "aria-hidden": "true", children: "→" })],
                                }),
                                r.jsx("a", {
                                    href: "#",
                                    className: "btn btn-ghost",
                                    style: { outline: "2px solid var(--accent)", outlineOffset: 3 },
                                    children: "Link focado",
                                }),
                                r.jsx("button", {
                                    type: "button",
                                    className: "theme-toggle",
                                    style: { outline: "2px solid var(--accent)", outlineOffset: 3 },
                                    "aria-label": "Demo",
                                    children: r.jsxs("svg", {
                                        width: "16",
                                        height: "16",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "1.6",
                                        children: [
                                            r.jsx("circle", { cx: "12", cy: "12", r: "4" }),
                                            r.jsx("path", {
                                                d: "M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
                                            }),
                                        ],
                                    }),
                                }),
                            ],
                        }),
                        r.jsxs("p", {
                            className: "ds-tip-p",
                            children: [
                                "Outline 2px ",
                                r.jsx("code", { children: "var(--accent)" }),
                                " com offset 3px. Em superfícies escuras, o anel usa ",
                                r.jsx("code", { children: "--accent-warm" }),
                                " para garantir visibilidade.",
                            ],
                        }),
                    ],
                }),
                r.jsxs(M, {
                    title: "Skip link",
                    children: [
                        r.jsx("div", {
                            className: "ds-skip-stage",
                            children: r.jsx("a", {
                                href: "#",
                                className: "skip-link",
                                style: { position: "static", top: 0, display: "inline-block" },
                                children: "Pular para conteúdo",
                            }),
                        }),
                        r.jsxs("p", {
                            className: "ds-tip-p",
                            children: [
                                "Primeiro elemento focável da página. Aparece com ",
                                r.jsx("code", { children: ":focus" }),
                                ", fixo no topo.",
                            ],
                        }),
                    ],
                }),
                r.jsx(M, {
                    title: "Motion reduzido",
                    hint: "Toda animação é desligada quando o usuário pede.",
                    children: r.jsx("pre", {
                        className: "ds-pre",
                        children: r.jsx("code", {
                            children: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
  .marquee-track { animation: none !important; }
  .reveal { opacity: 1; transform: none; }
}`,
                        }),
                    }),
                }),
                r.jsx(M, {
                    title: "Forced colors / High contrast",
                    children: r.jsxs("p", {
                        className: "ds-tip-p",
                        children: [
                            "No modo Windows High Contrast, bordas críticas viram ",
                            r.jsx("code", { children: "1px solid CanvasText" }),
                            " e marcas tonais usam ",
                            r.jsx("code", { children: "forced-color-adjust: none" }),
                            ". O foco vira ",
                            r.jsx("code", { children: "3px solid Highlight" }),
                            ".",
                        ],
                    }),
                }),
                r.jsx(M, {
                    title: "Carrossel — teclado",
                    hint: "Padrão APG ‘carousel with auto-rotation’. Sem auto-rotação aqui; o usuário dirige a navegação.",
                    children: r.jsxs("ul", {
                        className: "ds-list",
                        children: [
                            r.jsxs("li", {
                                children: [
                                    r.jsx("strong", { children: "Tab" }),
                                    " → entra no track (",
                                    r.jsx("code", { children: "tabIndex=0" }),
                                    ") e depois nos botões prev/next.",
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("strong", { children: "← / →" }),
                                    " → card anterior/próximo. ",
                                    r.jsx("code", { children: "preventDefault" }),
                                    " evita rolagem horizontal nativa.",
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("strong", { children: "Home / End" }),
                                    " → primeiro/último card do set central.",
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    "Live region oculta (",
                                    r.jsx("code", { children: ".recos-sr-status" }),
                                    ", ",
                                    r.jsx("code", { children: 'aria-live="polite"' }),
                                    ") anuncia o card atual quando o snap assenta.",
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    "Cards dos sets duplicados ficam com ",
                                    r.jsx("code", { children: 'aria-hidden="true"' }),
                                    " e ",
                                    r.jsx("code", { children: "tabIndex=-1" }),
                                    " nos botões internos — leitores de tela enxergam apenas N depoimentos únicos.",
                                ],
                            }),
                        ],
                    }),
                }),
                r.jsx(M, {
                    title: "Modal — focus trap",
                    hint: "Modal de depoimento integral isola o foco enquanto aberto.",
                    children: r.jsxs("ul", {
                        className: "ds-list",
                        children: [
                            r.jsxs("li", {
                                children: [
                                    r.jsx("strong", { children: "Esc" }),
                                    " fecha o modal e devolve o foco ao botão que abriu.",
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("strong", { children: "Tab / Shift+Tab" }),
                                    " circulam entre elementos focáveis dentro do modal — não vazam pra página atrás.",
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: 'role="dialog"' }),
                                    " + ",
                                    r.jsx("code", { children: 'aria-modal="true"' }),
                                    " + ",
                                    r.jsx("code", { children: "aria-labelledby" }),
                                    " apontando pro nome do recomendante.",
                                ],
                            }),
                            r.jsxs("li", {
                                children: [
                                    r.jsx("code", { children: 'document.body.style.overflow = "hidden"' }),
                                    " trava o scroll de fundo enquanto aberto.",
                                ],
                            }),
                        ],
                    }),
                }),
            ],
        }),
    });
}
function sf() {
    const e = [
        { yes: "Vamos conversar →", no: "Submit", why: "Direto, em primeira pessoa, com seta direcional." },
        { yes: "Baixar CV .pdf", no: "Download arquivo", why: "Especifica o quê e o formato em mono." },
        { yes: "Disponível para conversas", no: "Aceitando propostas", why: "Postura aberta, sem urgência comercial." },
        {
            yes: "Trabalho que moveu o ponteiro.",
            no: "Meus projetos.",
            why: "Verbo concreto, evidencia impacto antes do volume.",
        },
        {
            yes: "Liderança humanizada antes de tudo.",
            no: "Pessoas em primeiro lugar.",
            why: "Específico e autoral; foge do clichê.",
        },
    ];
    return r.jsx(_e, {
        id: "voice",
        num: "12",
        label: "Voz & Conteúdo",
        title: "Tom editorial — primeira pessoa, números explícitos, verbo no presente.",
        lead: "O conteúdo do site é um manifesto curto: cada parágrafo tem um propósito de venda (eu existo · eu lidero · eu meço · eu acredito). Português coloquial mas rigoroso. Italics economizados; emoji ausentes.",
        children: r.jsx("div", {
            className: "ds-voice-grid",
            children: e.map((t) =>
                r.jsxs(
                    "div",
                    {
                        className: "ds-voice-cell",
                        children: [
                            r.jsxs("div", {
                                className: "ds-voice-yes",
                                children: [
                                    r.jsx("span", { className: "ds-voice-tag is-yes", children: "faça" }),
                                    r.jsx("p", { children: t.yes }),
                                ],
                            }),
                            r.jsxs("div", {
                                className: "ds-voice-no",
                                children: [
                                    r.jsx("span", { className: "ds-voice-tag is-no", children: "evite" }),
                                    r.jsx("p", { children: t.no }),
                                ],
                            }),
                            r.jsx("small", { className: "ds-voice-why", children: t.why }),
                        ],
                    },
                    t.yes
                )
            ),
        }),
    });
}
function of() {
    return r.jsxs("section", {
        className: "ds-intro",
        id: "intro",
        children: [
            r.jsxs("div", {
                className: "ds-intro-eyebrow",
                children: [
                    r.jsx("span", { children: "MP072 Design System" }),
                    r.jsx("span", { "aria-hidden": "true", children: "/" }),
                    r.jsx("span", { children: "v1.0" }),
                    r.jsx("span", { "aria-hidden": "true", children: "/" }),
                    r.jsx("span", { children: "Abr 2025" }),
                ],
            }),
            r.jsxs("h1", {
                className: "ds-intro-title",
                children: [
                    r.jsx(Lt, { children: "Sistema" }),
                    " ",
                    r.jsx(Lt, { delayStart: 1, children: "visual" }),
                    " ",
                    r.jsx("span", {
                        style: { color: "var(--accent-2)", fontStyle: "italic" },
                        children: r.jsx(Lt, { delayStart: 2, children: "editorial" }),
                    }),
                    r.jsx("br", {}),
                    r.jsx(Lt, { delayStart: 4, children: "do" }),
                    " ",
                    r.jsx(Lt, { delayStart: 5, children: "portfolio." }),
                ],
            }),
            r.jsx("p", {
                className: "ds-intro-lead",
                children:
                    "Esta é a documentação visual do design system que sustenta o portfolio de Estéfano Pietragalla. Ele é editorial por intenção — tipografia conduz, números sustentam o argumento, e o calor cromático humaniza a leitura. Cada token e componente está em produção; nada aqui é exemplo decorativo.",
            }),
            r.jsxs("div", {
                className: "ds-intro-meta",
                children: [
                    r.jsxs("div", {
                        children: [
                            r.jsx("span", { className: "t-eyebrow", children: "Stack" }),
                            r.jsx("div", { children: "React 18 · Vite · CSS variables" }),
                        ],
                    }),
                    r.jsxs("div", {
                        children: [
                            r.jsx("span", { className: "t-eyebrow", children: "Tipos" }),
                            r.jsx("div", { children: "Hanken Grotesk · Cascadia Code" }),
                        ],
                    }),
                    r.jsxs("div", {
                        children: [
                            r.jsx("span", { className: "t-eyebrow", children: "Temas" }),
                            r.jsx("div", { children: "Light · Dark" }),
                        ],
                    }),
                    r.jsxs("div", {
                        children: [
                            r.jsx("span", { className: "t-eyebrow", children: "A11y" }),
                            r.jsx("div", { children: "WCAG 2.2 AA · LBI" }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
function lf({ theme: e, setTheme: t }) {
    const n = z.useRef(null);
    return (
        hr(n),
        z.useEffect(() => {
            const a = () => {
                const s = window.location.hash.replace("#", ""),
                    i = s && document.getElementById(s);
                i && i.scrollIntoView({ behavior: "smooth", block: "start" });
            };
            return window.addEventListener("hashchange", a), () => window.removeEventListener("hashchange", a);
        }, []),
        r.jsxs("div", {
            ref: n,
            className: "ds-root",
            children: [
                r.jsx("a", { href: "#intro", className: "skip-link", children: "Pular para conteúdo" }),
                r.jsx(Bm, { theme: e, setTheme: t }),
                r.jsxs("div", {
                    className: "ds-shell",
                    children: [
                        r.jsx(Wm, {}),
                        r.jsxs("main", {
                            className: "ds-main",
                            tabIndex: "-1",
                            children: [
                                r.jsx(of, {}),
                                r.jsx(qm, {}),
                                r.jsx(Vm, {}),
                                r.jsx(Qm, {}),
                                r.jsx(Xm, {}),
                                r.jsx(Km, {}),
                                r.jsx(Zm, {}),
                                r.jsx(Jm, {}),
                                r.jsx(ef, {}),
                                r.jsx(tf, {}),
                                r.jsx(rf, {}),
                                r.jsx(af, {}),
                                r.jsx(sf, {}),
                                r.jsxs("footer", {
                                    className: "ds-end",
                                    children: [
                                        r.jsx("span", { className: "t-eyebrow", children: "— Fim do documento" }),
                                        r.jsx("p", { children: "Sistema MP072 · 2025 · Estéfano Pietragalla" }),
                                        r.jsxs("a", {
                                            href: "/",
                                            className: "btn btn-ghost",
                                            children: [
                                                "Voltar para o portfolio ",
                                                r.jsx("span", { "aria-hidden": "true", children: "↗" }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        })
    );
}
function cf({ title: e, description: t, canonical: n, ogImage: a, jsonLd: s }) {
    z.useEffect(() => {
        const i = document.title,
            o = document.querySelector('meta[name="description"]'),
            l = o == null ? void 0 : o.getAttribute("content"),
            c = document.querySelector('link[rel="canonical"]'),
            d = c == null ? void 0 : c.getAttribute("href"),
            v = document.querySelector('meta[property="og:title"]'),
            h = v == null ? void 0 : v.getAttribute("content"),
            f = document.querySelector('meta[property="og:description"]'),
            x = f == null ? void 0 : f.getAttribute("content"),
            w = document.querySelector('meta[property="og:url"]'),
            k = w == null ? void 0 : w.getAttribute("content"),
            R = document.querySelector('meta[property="og:image"]'),
            m = R == null ? void 0 : R.getAttribute("content");
        e && (document.title = e),
            t && o && o.setAttribute("content", t),
            n && c && c.setAttribute("href", n),
            e && v && v.setAttribute("content", e),
            t && f && f.setAttribute("content", t),
            n && w && w.setAttribute("content", n),
            a && R && R.setAttribute("content", a);
        let u = null;
        return (
            s &&
                ((u = document.createElement("script")),
                (u.type = "application/ld+json"),
                (u.dataset.injected = "case"),
                (u.textContent = JSON.stringify(s)),
                document.head.appendChild(u)),
            () => {
                (document.title = i),
                    o && l != null && o.setAttribute("content", l),
                    c && d != null && c.setAttribute("href", d),
                    v && h != null && v.setAttribute("content", h),
                    f && x != null && f.setAttribute("content", x),
                    w && k != null && w.setAttribute("content", k),
                    R && m != null && R.setAttribute("content", m),
                    u && u.parentNode && u.parentNode.removeChild(u);
            }
        );
    }, [e, t, n, a, s]);
}
const ri = {
        title: "Case Wine — App Wine, 0 a 70% das vendas digitais · Estéfano Pietragalla",
        description:
            "Como UX Lead na Wine.com.br entre 2018 e 2021, liderei o primeiro app nativo da marca: do MVP ao MLP, do release controlado ao app responsável por 70% das vendas digitais e R$ 161 mi de receita líquida no 3T21.",
        canonical: "https://epietragalla.com/cases/wine",
        ogImage: "https://epietragalla.com/uploads/case-wine-hero-iphone15pro.webp",
    },
    df = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "App Wine — case completo",
        headline: "Do zero a 70% das vendas digitais — App Wine (2018–2021)",
        url: ri.canonical,
        image: ri.ogImage,
        inLanguage: "pt-BR",
        datePublished: "2026-05-11",
        author: { "@type": "Person", name: "Estéfano Pietragalla", url: "https://epietragalla.com/" },
        about: ["Product Design", "Mobile App", "Design System", "E-commerce", "Loyalty"],
        keywords: "Wine.com.br, App Wine, Product Design, UX Lead, Design System, Loyalty, WineUP, E-commerce mobile",
    },
    uf = {
        eyebrow: "CasE · Wine.com.br · UX Lead · 2018—2021",
        headline: {
            pre: "Do zero a 70% das vendas digitais — Como liderei a criação e a evolução do ",
            em: "App Wine",
            post: ".",
        },
        subtitle: "Da prancheta em 2018 à consolidação como principal canal digital em 2021",
        lede: "Como UX Leader à frente do projeto, liderei o ciclo completo do primeiro aplicativo nativo da Wine: pesquisa, definição de escopo, lançamento controlado, lançamento público e três anos de evolução.",
        meta: [
            ["Papel", "UX Lead · Product Design"],
            ["Período", "2018 — set/2021"],
            ["Time", "3-12 designers"],
            ["Release", "MVP 2018 · Público 2019"],
        ],
        cover: {
            src: "/uploads/case-wine-hero-iphone15pro.webp",
            caption: "Wine.com.br · App nativo iOS / Android · 2018–2021",
        },
        context: {
            id: "contexto",
            eyebrow: "01 · Contexto · Brasil 2018",
            title: "Contexto: o mercado brasileiro de vinho em 2018",
            paragraphs: [
                "O Brasil consumia cerca de **2 litros de vinho per capita por ano, contra 50L da França**. Não era só uma questão de poder de compra, era uma barreira cultural. Vocabulário técnico, multiplicidade de uvas e *terroirs*, regras de harmonização — tudo somado criava uma fricção cognitiva que afastava o iniciante. Vinho ainda era percebido como bebida elitista, restrita a ocasiões excepcionais.",
                "A Wine, **maior clube de assinatura de vinhos do mundo**, tinha uma operação digital madura, porém presa ao desktop. Site sem versão responsiva, aplicativo inexistente e um concorrente direto com o app já consolidado no mercado.",
            ],
            image: "caseWineContext",
            imageSrc: "/uploads/case-wine-context.jpg",
            imageAlt: "Contexto histórico — cultura do vinho no Brasil 2018",
        },
        problem: {
            id: "problema",
            eyebrow: "02 · O problema",
            title: "Estamos atrasados, precisamos chegar.",
            quote: "Como projetar uma experiência em app, num momento em que o desktop já não acompanhava o comportamento do nosso cliente?",
            intro: "Precisava entregar uma experiência mobile nativa que fizesse três coisas ao mesmo tempo:",
            bullets: [
                "Facilitar a gestão da assinatura (WineBox)",
                "Criar um hábito de compra avulsa fluido no e-commerce",
                "Educar o consumidor iniciante sem intimidá-lo",
            ],
        },
        research: {
            id: "pesquisa",
            eyebrow: "03 · Pesquisa & descoberta",
            title: "Escuta qualificada antes do design",
            intro: "Antes de criar qualquer tela, conduzi com o time uma rodada de pesquisa apoiada em estudos qualitativos contratados pela Wine e em entrevistas com a nossa base de sócios. E alguns pontos ficaram muito claros para nós:",
            cols: [
                {
                    title: "Prioridades dos clientes",
                    items: [
                        "Comprar (transacional)",
                        "Acompanhar pedidos",
                        "Gerenciar a assinatura",
                        "Descobrir o mundo do vinho",
                    ],
                },
                {
                    title: "Fricções da jornada",
                    items: [
                        "Dificuldade em descrever o próprio paladar",
                        "Insegurança ao escolher um rótulo desconhecido",
                        "Desejo de aprender sobre vinho sem se sentir julgado",
                    ],
                },
            ],
            footnote: "Estudos qualitativos: Consumoteca (2017), Lumens (2015), DPZT (2017), New Content (2018).",
            image: "caseWineResearch",
            imageSrc: "/uploads/case-wine-research.webp",
            imageAlt: "Pesquisa qualitativa e entrevistas com sócios",
        },
        strategy: {
            id: "estrategia",
            eyebrow: "04 · Estratégia",
            title: "MVP transacional, MLP em sequência",
            intro: "A discussão central de escopo foi entre **MVP** e **MLP**    — o mínimo viável ou o mínimo amável. O lançamento era muito sensível, tecnicamente muitas coisas poderiam falhar e como era o primeiro aplicativo da empresa, optamos por um lançamento em duas ondas:",
            waves: [
                {
                    n: "I",
                    when: "Fim de 2018",
                    title: "Release controlado",
                    body: "Base fechada de sócios. Objetivo único: validar o ambiente, a estabilidade do checkout e a integração com os sistemas legados.",
                },
                {
                    n: "II",
                    when: "2019",
                    title: "Lançamento público",
                    body: "E-commerce e gestão de conta completos, abrindo caminho para um roadmap de engajamento que viria nas releases seguintes.",
                },
            ],
            callout: {
                eyebrow: "Trade-off doloroso",
                body: "Nosso time queria embarcar o MLP já no primeiro release, mas em conversas com o time de tecnologia, decidimos postergar. Sem estabilidade transacional comprovada, qualquer feature de descoberta vira ruído. Foi a decisão certa — o release controlado expôs problemas de performance que teriam comprometido a percepção da marca se aparecessem em produção aberta.",
            },
        },
        launch: {
            id: "lancamento",
            eyebrow: "05 · Entregamos · 2018—2019",
            title: "Três pilares no primeiro release",
            pillars: [
                {
                    n: "I",
                    title: "Onboarding como antídoto ao paradoxo da escolha",
                    body: "A barreira cognitiva mapeada na pesquisa virou nossa primeira aposta de design. O onboarding rodava no primeiro acesso e capturava preferências sensoriais — acidez, corpo, ocasiões de consumo. Aquele dado alimentaria o motor de recomendação e transformaria o catálogo intimidador em uma curadoria sob medida.",
                },
                {
                    n: "II",
                    title: "Wine Design System v1",
                    body: "Para sustentar a velocidade de iteração que o MLP exigiria, criei a primeira versão do Wine Design System. Saímos de uma biblioteca solta para uma fundação tokenizada — tipografia, cor, espaçamento, comportamento de componentes — que permitiu aos squads construir features novas sem reabrir discussão de fundamentos. Foi o entregável menos visível do projeto e provavelmente o mais alavancador para tudo que veio depois.",
                },
                {
                    n: "III",
                    title: "E-commerce e gestão de conta",
                    body: "Toda a camada transacional do app: vitrine, checkout, pedidos, endereços, cartões, gestão da assinatura WineBox. A fundação que precisava estar estável antes de qualquer feature de descoberta entrar em produção.",
                },
            ],
            image: "caseWineLaunch",
            imageSrc: "/uploads/case-wine-launch.webp",
            imageAlt: "Primeiros releases do App Wine — 2018-2019",
        },
        evolution: {
            id: "evolucao",
            eyebrow: "06 · Evolução · 2019—2021",
            title: "Roadmap de engajamento em ondas",
            intro: "Com a base transacional estável, o roadmap de engajamento entrou em produção em ondas. Funcionalidades antes previstas na estruturação do MLP começaram a ser lançadas e, a cada release, feedbacks dos usuários alimentaram o backlog. ",
            waves: [
                {
                    n: "I",
                    title: "WineUP",
                    body: "Programa de cashback gamificado: cashback ancorado, missões (*quests*), status social e multiplicadores para sócios do clube.",
                },
                {
                    n: "II",
                    title: "Desafio Wine",
                    body: "Quiz de perguntas e respostas no formato de jogo. O usuário aprende sobre vinho enquanto avança na plataforma e ganha pontos no WineUP.",
                },
                {
                    n: "III",
                    title: "Phygital / O2O via geolocalização",
                    body: "Integração com as lojas físicas. O app detecta proximidade, reconfigura o feed para mostrar o estoque da loja mais próxima, viabiliza retirada e self-service no PDV.",
                },
                {
                    n: "IV",
                    title: "Wineverso",
                    body: "Portal de conteúdo nativo no app: podcasts, *terroirs*, harmonizações, entrevistas com enólogos. Educa o usuário de forma passiva e abre espaço para *upsell* de linhas premium.",
                },
                {
                    n: "V",
                    title: "Wine Scanner",
                    body: "Leitura de rótulos via reconhecimento de imagem com IA, transformando o app em ferramenta de utilidade diária.",
                },
                {
                    n: "VI",
                    title: "Adega Virtual",
                    body: "Favoritos e histórico pessoal de degustações, acionando o efeito dotação.",
                },
            ],
            note: "",
            image: "caseWineEvolution",
            imageSrc: "/uploads/case-wine-evolution.webp",
            imageAlt: "Evolução do produto em ondas — 2019-2021",
        },
        signals: {
            id: "sinais",
            eyebrow: "07 · Lançamento e primeiros sinais",
            title: "Adoção orgânica antes do roadmap completo",
            paragraphs: [
                "O app entrou em release controlado no fim de 2018 e foi publicado para o público em 2019, com o e-commerce e a gestão de conta funcionando. Os usuários migraram rapidamente do mobile web para o aplicativo e começaram a pedir as features que o roadmap já previa.",
                "A boa notícia foi exatamente essa. O pedido orgânico dos usuários bateu com o que a pesquisa havia antecipado — o roadmap não precisava ser reinventado, só precisava ser executado.",
            ],
            stores: [
                { eyebrow: "App Store · iOS", rating: "4.8", reviews: "47 mil avaliações" },
                { eyebrow: "Google Play · Android", rating: "4.7", reviews: "62 mil avaliações" },
            ],
        },
        results: {
            id: "resultados",
            eyebrow: "08 · Resultados · até 3T21",
            title: "De base zero a canal principal em três anos",
            intro: "A consolidação se acelerou em 2020 e 2021, com a pandemia ampliando a base de consumidores digitais de vinho. Com o crescimento do consumo, a arquitetura segurou o choque sem reescrita estrutural e pavimentou o caminho para números recorde de vendas, tornando o app o principal canal de vendas da empresa.",
            bigNumbers: [
                {
                    pre: "",
                    num: "70",
                    sup: "%",
                    unit: "vendas digitais via app",
                    label: "no 3T21, com base zero antes do lançamento",
                },
                {
                    pre: "+",
                    num: "225",
                    sup: "%",
                    unit: "EBITDA Ajustado · 1T21",
                    label: "alavancagem operacional puxada pelo mobile",
                },
                { pre: "", num: "130", sup: "%", unit: "crescimento de faturamento", label: "2019 - 2021" },
                { pre: "+", num: "1", suf: " mi", unit: "downloads", label: "abril/2021" },
            ],
            tableTitle: "Quadro completo de indicadores acompanhados",
            table: [
                ["Usuários ativos recorrentes", "60% da base", "3T21"],
                ["Receita líquida trimestral", "R$ 96,8 mi → R$ 161 mi", "1T21 → 3T21"],
                ["Crescimento de receita", "+64,4% / +69%", "1T21 / 3T21"],
                ["EBITDA Ajustado", "+224,9% / +138,5%", "1T21 / 3T21"],
                ["Prejuízo líquido", "−92,4%", "1T21 vs 1T20"],
                ["Same-store sales lojas físicas", "+185%", "orgânico"],
                ["Participação mobile nas vendas digitais", "60% → 70%", "1T21 → 3T21"],
                ["CAPEX investido em TI", "R$ 2,15 mi de R$ 2,3 mi (~93%)", "1T21"],
            ],
            pullStat: {
                headline: "93% do CAPEX em tecnologia.",
                body: "Deixa claro que o produto digital virou o eixo da estratégia da companhia.",
            },
        },
        awards: {
            id: "premios",
            eyebrow: "09 · Validação externa",
            title: "Prêmios e reconhecimentos",
            cards: [
                {
                    name: "E-Commerce Brasil",
                    year: "2020 / 21",
                    category: "Finalista ao lado de Amazon, Mercado Livre e Magazine Luiza",
                    feature: !0,
                },
                { name: "Shop! Global Awards", year: "2021", category: "Varejo Phygital" },
                { name: "Prêmio iBest", year: "2021", category: "Categoria Supermercados" },
                { name: "Ebit NielsenIQ", year: "2020 / 21", category: "Loja Diamante · Lojas Mais Queridas" },
                { name: "Assinaturas Awards", year: "2020", category: "Clube Wine" },
            ],
        },
        learnings: {
            id: "aprendizados",
            eyebrow: "10 · O que aprendi",
            title: "O que sustentei. O que faria diferente.",
            items: [
                {
                    n: "I",
                    title: "Defender o MVP foi mais difícil que defender o MLP",
                    body: "Em produto, o time geralmente quer entregar o belo. Sustentar o necessário, e adiar o desejável para a release seguinte, foi o papel que mais me cobrou capital político.",
                },
                {
                    n: "II",
                    title: "Design System antes de roadmap",
                    body: "Investir na fundação invisível libera velocidade exponencial nos meses seguintes. Foi o entregável que mais rendeu ao longo de toda a evolução do produto.",
                },
                {
                    n: "III",
                    title: "Pesquisa qualitativa antiga ainda vale",
                    body: "Os relatórios de 2015 a 2018 continuaram bons preditores do comportamento de 2019–2021. Comportamento humano envelhece mais devagar do que se pensa.",
                },
                {
                    n: "IV",
                    title: "O que eu faria diferente",
                    body: "Documentar o roadmap de engajamento com mais profundidade conceitual, não só em backlog. E focar mais no tagueamento do GA e ferramentas analíticas para geração de insights.",
                },
            ],
        },
    };
function _r(e) {
    if (!e) return null;
    const t = [],
        n = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let a = 0,
        s,
        i = 0;
    for (; (s = n.exec(e)) !== null; ) {
        s.index > a && t.push(e.slice(a, s.index));
        const o = s[0];
        o.startsWith("**")
            ? t.push(r.jsx("strong", { children: o.slice(2, -2) }, i++))
            : t.push(r.jsx("em", { children: o.slice(1, -1) }, i++)),
            (a = s.index + o.length);
    }
    return a < e.length && t.push(e.slice(a)), t;
}
function pf({ waves: e }) {
    return r.jsxs("div", {
        className: "v-luxe-timeline v-luxe-timeline--rail reveal",
        role: "list",
        children: [
            r.jsx("div", { className: "v-luxe-rail-line", "aria-hidden": "true" }),
            e.map((t) =>
                r.jsxs(
                    "article",
                    {
                        className: "v-luxe-rail-stop",
                        role: "listitem",
                        children: [
                            r.jsx("span", { className: "v-luxe-rail-when", children: t.when }),
                            r.jsx("span", { className: "v-luxe-rail-dot", "aria-hidden": "true" }),
                            r.jsx("h3", { className: "v-luxe-rail-title", children: t.title }),
                            r.jsx("p", { className: "v-luxe-rail-body", children: t.body }),
                        ],
                    },
                    t.n
                )
            ),
        ],
    });
}
function mf() {
    return r.jsxs("div", {
        className: "v-luxe-stat2l v-luxe-stat2l--bars reveal",
        children: [
            r.jsx("p", { className: "v-luxe-stat2l-eyebrow", children: "Consumo per capita de vinho · litros / ano" }),
            r.jsxs("div", {
                className: "v-luxe-stat2l-bar",
                children: [
                    r.jsx("span", { className: "v-luxe-stat2l-bar-label", children: "Brasil · 2018" }),
                    r.jsx("div", {
                        className: "v-luxe-stat2l-bar-track",
                        children: r.jsx("div", {
                            className: "v-luxe-stat2l-bar-fill",
                            style: { "--w": "4%" },
                            "aria-hidden": "true",
                        }),
                    }),
                    r.jsx("span", { className: "v-luxe-stat2l-bar-num", children: "2L" }),
                ],
            }),
            r.jsxs("div", {
                className: "v-luxe-stat2l-bar",
                children: [
                    r.jsx("span", { className: "v-luxe-stat2l-bar-label", children: "França · 2018" }),
                    r.jsx("div", {
                        className: "v-luxe-stat2l-bar-track",
                        children: r.jsx("div", {
                            className: "v-luxe-stat2l-bar-fill v-luxe-stat2l-bar-fill--full",
                            style: { "--w": "100%" },
                            "aria-hidden": "true",
                        }),
                    }),
                    r.jsx("span", { className: "v-luxe-stat2l-bar-num", children: "50L" }),
                ],
            }),
        ],
    });
}
function ff({ value: e, duration: t = 1800 }) {
    const n = parseFloat(e),
        a = z.useRef(null),
        [s, i] = z.useState("0.0");
    z.useEffect(() => {
        var h;
        const c = a.current;
        if (!c) return;
        if ((h = window.matchMedia) == null ? void 0 : h.call(window, "(prefers-reduced-motion: reduce)").matches) {
            i(n.toFixed(1));
            return;
        }
        const v = new IntersectionObserver(
            ([f]) => {
                if (!f.isIntersecting) return;
                v.disconnect();
                const x = performance.now(),
                    w = (R) => 1 - Math.pow(1 - R, 3),
                    k = (R) => {
                        const m = Math.min(1, (R - x) / t);
                        i((n * w(m)).toFixed(1)), m < 1 && requestAnimationFrame(k);
                    };
                requestAnimationFrame(k);
            },
            { threshold: 0.45 }
        );
        return v.observe(c), () => v.disconnect();
    }, [n, t]);
    const [o, l] = s.split(".");
    return r.jsxs("span", {
        ref: a,
        className: "v-luxe-rating-num",
        "aria-label": `${n.toFixed(1)} de 5`,
        children: [
            r.jsx("span", { className: "v-luxe-rating-int", children: o }),
            r.jsxs("span", { className: "v-luxe-rating-dec", children: [".", l] }),
        ],
    });
}
function hf({ items: e }) {
    return r.jsx("div", {
        className: "v-luxe-stores reveal",
        "data-stagger": "2",
        role: "list",
        children: e.map((t, n) => {
            const a = (parseFloat(t.rating) / 5) * 100;
            return r.jsxs(
                "article",
                {
                    className: "v-luxe-store",
                    role: "listitem",
                    children: [
                        r.jsx("span", { className: "v-luxe-store-eyebrow", children: t.eyebrow }),
                        r.jsxs("div", {
                            className: "v-luxe-store-figure",
                            children: [
                                r.jsx(ff, { value: t.rating }),
                                r.jsx("span", {
                                    className: "v-luxe-store-scale",
                                    "aria-hidden": "true",
                                    children: "/ 5",
                                }),
                            ],
                        }),
                        r.jsx("div", {
                            className: "v-luxe-store-bar",
                            "aria-hidden": "true",
                            children: r.jsx("span", {
                                className: "v-luxe-store-bar-fill",
                                style: { "--pct": `${a}%` },
                            }),
                        }),
                        r.jsx("span", { className: "v-luxe-store-meta", children: t.reviews }),
                    ],
                },
                n
            );
        }),
    });
}
function vf({ src: e, alt: t, onClose: n }) {
    const a = z.useRef(null),
        s = z.useRef({ active: !1, moved: !1, startX: 0, startY: 0, scrollX: 0, scrollY: 0 }),
        [i, o] = z.useState(!1),
        l = () => {
            i || (o(!0), window.setTimeout(n, 220));
        };
    if (
        (z.useEffect(() => {
            const f = (w) => {
                w.key === "Escape" && l();
            };
            document.addEventListener("keydown", f);
            const x = document.body.style.overflow;
            return (
                (document.body.style.overflow = "hidden"),
                () => {
                    document.removeEventListener("keydown", f), (document.body.style.overflow = x);
                }
            );
        }, [n]),
        typeof document > "u")
    )
        return null;
    const c = (f) => {
            var w;
            if (f.pointerType !== "mouse") return;
            const x = a.current;
            x &&
                ((s.current = {
                    active: !0,
                    moved: !1,
                    startX: f.clientX,
                    startY: f.clientY,
                    scrollX: x.scrollLeft,
                    scrollY: x.scrollTop,
                }),
                (w = x.setPointerCapture) == null || w.call(x, f.pointerId),
                x.classList.add("is-dragging"),
                f.preventDefault());
        },
        d = (f) => {
            const x = s.current;
            if (!x.active) return;
            const w = a.current;
            if (!w) return;
            const k = f.clientX - x.startX,
                R = f.clientY - x.startY;
            !x.moved && Math.hypot(k, R) > 4 && (x.moved = !0),
                (w.scrollLeft = x.scrollX - k),
                (w.scrollTop = x.scrollY - R);
        },
        v = () => {
            const f = s.current;
            if (!f.active) return;
            f.active = !1;
            const x = a.current;
            x && x.classList.remove("is-dragging");
        },
        h = i ? " is-exiting" : "";
    return Rd.createPortal(
        r.jsxs(r.Fragment, {
            children: [
                r.jsx("div", {
                    ref: a,
                    className: `v-luxe-lightbox${h}`,
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "Imagem ampliada",
                    onPointerDown: c,
                    onPointerMove: d,
                    onPointerUp: v,
                    onPointerCancel: v,
                    onClick: (f) => {
                        if (s.current.moved) {
                            s.current.moved = !1;
                            return;
                        }
                        (f.target === f.currentTarget || f.target.classList.contains("v-luxe-lightbox-scroll")) && l();
                    },
                    children: r.jsx("div", {
                        className: "v-luxe-lightbox-scroll",
                        children: r.jsx("img", {
                            className: "v-luxe-lightbox-img",
                            src: e,
                            alt: t || "",
                            draggable: !1,
                        }),
                    }),
                }),
                r.jsx("button", {
                    type: "button",
                    className: `v-luxe-lightbox-close${h}`,
                    onClick: l,
                    "aria-label": "Fechar imagem ampliada",
                    autoFocus: !0,
                    children: r.jsx("svg", {
                        width: "22",
                        height: "22",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        "aria-hidden": "true",
                        children: r.jsx("path", { d: "M6 6l12 12M18 6L6 18" }),
                    }),
                }),
            ],
        }),
        document.body
    );
}
function Ir({ src: e, alt: t, caption: n, jobName: a, variant: s }) {
    const i = `v-luxe-figure reveal${s ? ` v-luxe-figure--${s}` : ""}`,
        [o, l] = z.useState(!1),
        c = s === "bleed" && !!e;
    return r.jsxs("figure", {
        className: i,
        "data-stagger": "1",
        children: [
            r.jsx("div", {
                className: `v-luxe-figure-frame${e ? "" : " is-placeholder"}`,
                children: e
                    ? c
                        ? r.jsx("button", {
                              type: "button",
                              className: "v-luxe-figure-zoom",
                              onClick: () => l(!0),
                              "aria-label": t ? `Ampliar imagem: ${t}` : "Ampliar imagem",
                              children: r.jsx("img", { src: e, alt: t || "", loading: "lazy", decoding: "async" }),
                          })
                        : r.jsx("img", { src: e, alt: t || "", loading: "lazy", decoding: "async" })
                    : r.jsxs(r.Fragment, {
                          children: [
                              r.jsx("span", { className: "v-luxe-figure-label", children: "Imagem em produção" }),
                              r.jsxs("span", {
                                  className: "v-luxe-figure-hint",
                                  children: [
                                      "Job: ",
                                      r.jsx("code", { children: a }),
                                      " · gerar via Nano Banana ou",
                                      " ",
                                      r.jsxs("code", { children: ["npm run gen:images -- --only=", a] }),
                                  ],
                              }),
                          ],
                      }),
            }),
            n && r.jsx("figcaption", { className: "v-luxe-figure-caption", children: n }),
            o && r.jsx(vf, { src: e, alt: t, onClose: () => l(!1) }),
        ],
    });
}
function gf({ theme: e, setTheme: t }) {
    const n = z.useRef(null);
    hr(n),
        cf({ ...ri, jsonLd: df }),
        z.useEffect(() => {
            Td("wine");
        }, []);
    const [a, s] = z.useState(!0);
    z.useEffect(() => {
        const o = document.getElementById("top");
        if (!o || typeof IntersectionObserver > "u") return;
        const l = new IntersectionObserver(([c]) => s(c.isIntersecting), { threshold: 0 });
        return l.observe(o), () => l.disconnect();
    }, []);
    const i = uf;
    return r.jsxs("div", {
        ref: n,
        children: [
            r.jsx("a", { href: "#main", className: "skip-link", children: "Pular para conteúdo" }),
            r.jsx(Ia, { theme: e, setTheme: t, hrefBase: "/", heroVisible: a }),
            r.jsx("main", {
                id: "main",
                tabIndex: "-1",
                className: "case-wine-page",
                children: r.jsx("article", {
                    className: "v-luxe",
                    children: r.jsxs("div", {
                        className: "v-luxe-flow",
                        children: [
                            r.jsxs("header", {
                                id: "top",
                                className: "v-luxe-hero reveal",
                                children: [
                                    r.jsx("span", { className: "v-luxe-eyebrow", children: i.eyebrow }),
                                    r.jsxs("h1", {
                                        className: "v-luxe-headline",
                                        children: [
                                            i.headline.pre,
                                            r.jsx("em", { children: i.headline.em }),
                                            i.headline.post,
                                        ],
                                    }),
                                    r.jsx("p", { className: "v-luxe-subtitle", children: i.subtitle }),
                                    r.jsx("p", { className: "v-luxe-lede", children: i.lede }),
                                    r.jsx("div", {
                                        className: "v-luxe-meta",
                                        children: i.meta.map(([o, l]) =>
                                            r.jsxs(
                                                "div",
                                                {
                                                    className: "v-luxe-meta-cell",
                                                    children: [
                                                        r.jsx("span", { className: "v-luxe-meta-key", children: o }),
                                                        r.jsx("span", { className: "v-luxe-meta-val", children: l }),
                                                    ],
                                                },
                                                o
                                            )
                                        ),
                                    }),
                                    r.jsxs("figure", {
                                        className: "v-luxe-cover reveal",
                                        children: [
                                            r.jsx("img", {
                                                src: i.cover.src,
                                                alt: "Mockup do App Wine em iPhone 15 Pro, fundo neutro",
                                                loading: "lazy",
                                                decoding: "async",
                                            }),
                                            r.jsx("figcaption", {
                                                className: "v-luxe-cover-caption",
                                                children: i.cover.caption,
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            r.jsxs("section", {
                                id: i.context.id,
                                className: "v-luxe-section v-luxe-section--split",
                                children: [
                                    r.jsxs("header", {
                                        className: "v-luxe-section-head reveal",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-section-eyebrow",
                                                children: i.context.eyebrow,
                                            }),
                                            r.jsx("h2", {
                                                className: "v-luxe-section-title v-luxe-section-title--wide",
                                                children: i.context.title,
                                            }),
                                        ],
                                    }),
                                    r.jsxs("div", {
                                        className: "v-luxe-split",
                                        children: [
                                            r.jsxs("div", {
                                                className: "v-luxe-split-text",
                                                children: [
                                                    r.jsx(mf, {}),
                                                    r.jsx("div", {
                                                        className: "v-luxe-prose reveal",
                                                        "data-stagger": "1",
                                                        children: i.context.paragraphs.map((o, l) =>
                                                            r.jsx("p", { children: _r(o) }, l)
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            r.jsx("div", {
                                                className: "v-luxe-split-figure",
                                                children: r.jsx(Ir, {
                                                    src: i.context.imageSrc,
                                                    alt: i.context.imageAlt,
                                                    caption: i.context.imageAlt,
                                                    jobName: i.context.image,
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            r.jsxs("section", {
                                id: i.problem.id,
                                className: "v-luxe-section",
                                children: [
                                    r.jsxs("header", {
                                        className: "v-luxe-section-head reveal",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-section-eyebrow",
                                                children: i.problem.eyebrow,
                                            }),
                                            r.jsx("h2", {
                                                className: "v-luxe-section-title",
                                                children: i.problem.title,
                                            }),
                                        ],
                                    }),
                                    r.jsxs("blockquote", {
                                        className: "v-luxe-pullquote reveal",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-pullquote-mark",
                                                "aria-hidden": "true",
                                                children: '"',
                                            }),
                                            r.jsx("p", { children: i.problem.quote }),
                                        ],
                                    }),
                                    r.jsxs("div", {
                                        className: "v-luxe-prose v-luxe-prose--center reveal",
                                        "data-stagger": "1",
                                        children: [
                                            r.jsx("p", { children: i.problem.intro }),
                                            r.jsx("ul", {
                                                className: "v-luxe-list",
                                                children: i.problem.bullets.map((o) => r.jsx("li", { children: o }, o)),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            r.jsx("section", {
                                id: i.research.id,
                                className: "v-luxe-section v-luxe-section--split v-luxe-section--split-head",
                                children: r.jsxs("div", {
                                    className: "v-luxe-split",
                                    children: [
                                        r.jsxs("div", {
                                            className: "v-luxe-split-text",
                                            children: [
                                                r.jsxs("header", {
                                                    className: "v-luxe-section-head reveal",
                                                    children: [
                                                        r.jsx("span", {
                                                            className: "v-luxe-section-eyebrow",
                                                            children: i.research.eyebrow,
                                                        }),
                                                        r.jsx("h2", {
                                                            className: "v-luxe-section-title",
                                                            children: i.research.title,
                                                        }),
                                                    ],
                                                }),
                                                r.jsx("div", {
                                                    className: "v-luxe-prose reveal",
                                                    "data-stagger": "1",
                                                    children: r.jsx("p", { children: i.research.intro }),
                                                }),
                                                r.jsx("div", {
                                                    className: "v-luxe-twocol reveal",
                                                    "data-stagger": "2",
                                                    children: i.research.cols.map((o) =>
                                                        r.jsxs(
                                                            "div",
                                                            {
                                                                className: "v-luxe-twocol-cell",
                                                                children: [
                                                                    r.jsx("h3", {
                                                                        className: "v-luxe-twocol-title",
                                                                        children: o.title,
                                                                    }),
                                                                    r.jsx("ul", {
                                                                        className: "v-luxe-list",
                                                                        children: o.items.map((l) =>
                                                                            r.jsx("li", { children: l }, l)
                                                                        ),
                                                                    }),
                                                                ],
                                                            },
                                                            o.title
                                                        )
                                                    ),
                                                }),
                                                r.jsx("p", {
                                                    className: "v-luxe-footnote v-luxe-footnote--left reveal",
                                                    "data-stagger": "3",
                                                    children: i.research.footnote,
                                                }),
                                            ],
                                        }),
                                        r.jsx("div", {
                                            className: "v-luxe-split-figure",
                                            children: r.jsx(Ir, {
                                                src: i.research.imageSrc,
                                                alt: i.research.imageAlt,
                                                caption: i.research.imageAlt,
                                                jobName: i.research.image,
                                            }),
                                        }),
                                    ],
                                }),
                            }),
                            r.jsxs("section", {
                                id: i.strategy.id,
                                className: "v-luxe-section",
                                children: [
                                    r.jsxs("header", {
                                        className: "v-luxe-section-head reveal",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-section-eyebrow",
                                                children: i.strategy.eyebrow,
                                            }),
                                            r.jsx("h2", {
                                                className: "v-luxe-section-title",
                                                children: i.strategy.title,
                                            }),
                                        ],
                                    }),
                                    r.jsx("div", {
                                        className: "v-luxe-prose v-luxe-prose--center reveal",
                                        "data-stagger": "1",
                                        children: r.jsx("p", { children: _r(i.strategy.intro) }),
                                    }),
                                    r.jsx(pf, { waves: i.strategy.waves }),
                                    r.jsxs("aside", {
                                        className: "v-luxe-callout reveal",
                                        "data-stagger": "3",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-callout-eyebrow",
                                                children: i.strategy.callout.eyebrow,
                                            }),
                                            r.jsx("p", { children: i.strategy.callout.body }),
                                        ],
                                    }),
                                ],
                            }),
                            r.jsxs("section", {
                                id: i.launch.id,
                                className: "v-luxe-section v-luxe-section--wide",
                                children: [
                                    r.jsxs("header", {
                                        className: "v-luxe-section-head reveal",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-section-eyebrow",
                                                children: i.launch.eyebrow,
                                            }),
                                            r.jsx("h2", {
                                                className: "v-luxe-section-title",
                                                children: i.launch.title,
                                            }),
                                        ],
                                    }),
                                    r.jsx("div", {
                                        className: "v-luxe-pillars",
                                        children: i.launch.pillars.map((o, l) =>
                                            r.jsxs(
                                                "div",
                                                {
                                                    className: "v-luxe-pillar reveal",
                                                    "data-stagger": Math.min(5, l + 1),
                                                    children: [
                                                        r.jsx("div", { className: "v-luxe-pillar-num", children: o.n }),
                                                        r.jsx("h3", { children: o.title }),
                                                        r.jsx("p", { children: o.body }),
                                                    ],
                                                },
                                                o.n
                                            )
                                        ),
                                    }),
                                    r.jsx(Ir, {
                                        src: i.launch.imageSrc,
                                        alt: i.launch.imageAlt,
                                        caption: i.launch.imageAlt,
                                        jobName: i.launch.image,
                                        variant: "bleed",
                                    }),
                                ],
                            }),
                            r.jsxs("section", {
                                id: i.evolution.id,
                                className: "v-luxe-section",
                                children: [
                                    r.jsxs("header", {
                                        className: "v-luxe-section-head reveal",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-section-eyebrow",
                                                children: i.evolution.eyebrow,
                                            }),
                                            r.jsx("h2", {
                                                className: "v-luxe-section-title",
                                                children: i.evolution.title,
                                            }),
                                        ],
                                    }),
                                    r.jsx("div", {
                                        className: "v-luxe-prose v-luxe-prose--center reveal",
                                        "data-stagger": "1",
                                        children: r.jsx("p", { children: _r(i.evolution.intro) }),
                                    }),
                                    r.jsx("ol", {
                                        className: "v-luxe-roadmap reveal",
                                        "data-stagger": "2",
                                        children: i.evolution.waves.map((o) =>
                                            r.jsxs(
                                                "li",
                                                {
                                                    className: "v-luxe-roadmap-item",
                                                    children: [
                                                        r.jsx("span", {
                                                            className: "v-luxe-roadmap-num",
                                                            children: o.n,
                                                        }),
                                                        r.jsx("h3", {
                                                            className: "v-luxe-roadmap-title",
                                                            children: o.title,
                                                        }),
                                                        r.jsx("p", {
                                                            className: "v-luxe-roadmap-body",
                                                            children: _r(o.body),
                                                        }),
                                                    ],
                                                },
                                                o.n
                                            )
                                        ),
                                    }),
                                    r.jsx("p", {
                                        className: "v-luxe-attribution reveal",
                                        "data-stagger": "3",
                                        children: i.evolution.note,
                                    }),
                                    r.jsx(Ir, {
                                        src: i.evolution.imageSrc,
                                        alt: i.evolution.imageAlt,
                                        caption: i.evolution.imageAlt,
                                        jobName: i.evolution.image,
                                        variant: "bleed",
                                    }),
                                ],
                            }),
                            r.jsxs("section", {
                                id: i.signals.id,
                                className: "v-luxe-section",
                                children: [
                                    r.jsxs("header", {
                                        className: "v-luxe-section-head reveal",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-section-eyebrow",
                                                children: i.signals.eyebrow,
                                            }),
                                            r.jsx("h2", {
                                                className: "v-luxe-section-title",
                                                children: i.signals.title,
                                            }),
                                        ],
                                    }),
                                    r.jsx("div", {
                                        className: "v-luxe-prose v-luxe-prose--center reveal",
                                        "data-stagger": "1",
                                        children: i.signals.paragraphs.map((o, l) => r.jsx("p", { children: o }, l)),
                                    }),
                                    r.jsx(hf, { items: i.signals.stores }),
                                ],
                            }),
                            r.jsxs("section", {
                                id: i.results.id,
                                className: "v-luxe-section v-luxe-section--wide",
                                children: [
                                    r.jsxs("header", {
                                        className: "v-luxe-section-head reveal",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-section-eyebrow",
                                                children: i.results.eyebrow,
                                            }),
                                            r.jsx("h2", {
                                                className: "v-luxe-section-title",
                                                children: i.results.title,
                                            }),
                                        ],
                                    }),
                                    r.jsx("div", {
                                        className: "v-luxe-prose v-luxe-prose--center reveal",
                                        "data-stagger": "1",
                                        children: r.jsx("p", { children: i.results.intro }),
                                    }),
                                    r.jsx("div", {
                                        className: "v-luxe-stats reveal",
                                        "data-stagger": "2",
                                        "aria-label": "Indicadores de impacto",
                                        children: i.results.bigNumbers.map((o, l) =>
                                            r.jsxs(
                                                "div",
                                                {
                                                    className: "v-luxe-stat",
                                                    children: [
                                                        r.jsxs("div", {
                                                            className: "v-luxe-stat-num",
                                                            children: [
                                                                o.pre,
                                                                o.num,
                                                                o.sup && r.jsx("sup", { children: o.sup }),
                                                                o.suf &&
                                                                    r.jsx("span", {
                                                                        className: "v-luxe-stat-suf",
                                                                        children: o.suf,
                                                                    }),
                                                            ],
                                                        }),
                                                        r.jsx("div", {
                                                            className: "v-luxe-stat-unit",
                                                            children: o.unit,
                                                        }),
                                                        r.jsx("div", {
                                                            className: "v-luxe-stat-label",
                                                            children: o.label,
                                                        }),
                                                    ],
                                                },
                                                l
                                            )
                                        ),
                                    }),
                                    r.jsxs("div", {
                                        className: "v-luxe-table reveal",
                                        "data-stagger": "3",
                                        children: [
                                            r.jsx("h3", {
                                                className: "v-luxe-table-title",
                                                children: i.results.tableTitle,
                                            }),
                                            r.jsxs("table", {
                                                children: [
                                                    r.jsx("thead", {
                                                        children: r.jsxs("tr", {
                                                            children: [
                                                                r.jsx("th", { scope: "col", children: "Indicador" }),
                                                                r.jsx("th", { scope: "col", children: "Resultado" }),
                                                                r.jsx("th", { scope: "col", children: "Janela" }),
                                                            ],
                                                        }),
                                                    }),
                                                    r.jsx("tbody", {
                                                        children: i.results.table.map(([o, l, c]) =>
                                                            r.jsxs(
                                                                "tr",
                                                                {
                                                                    children: [
                                                                        r.jsx("td", { children: o }),
                                                                        r.jsx("td", {
                                                                            className: "v-luxe-table-val",
                                                                            children: l,
                                                                        }),
                                                                        r.jsx("td", {
                                                                            className: "v-luxe-table-when",
                                                                            children: c,
                                                                        }),
                                                                    ],
                                                                },
                                                                o
                                                            )
                                                        ),
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    r.jsxs("aside", {
                                        className: "v-luxe-callout v-luxe-callout--pullstat reveal",
                                        "data-stagger": "4",
                                        children: [
                                            r.jsx("strong", { children: i.results.pullStat.headline }),
                                            r.jsx("p", { children: i.results.pullStat.body }),
                                            i.results.pullStat.extra &&
                                                r.jsx("p", {
                                                    className: "v-luxe-callout-extra",
                                                    children: i.results.pullStat.extra,
                                                }),
                                        ],
                                    }),
                                ],
                            }),
                            r.jsxs("section", {
                                id: i.awards.id,
                                className: "v-luxe-section v-luxe-section--awards",
                                children: [
                                    r.jsxs("header", {
                                        className: "v-luxe-section-head reveal",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-section-eyebrow",
                                                children: i.awards.eyebrow,
                                            }),
                                            r.jsx("h2", {
                                                className: "v-luxe-section-title",
                                                children: i.awards.title,
                                            }),
                                        ],
                                    }),
                                    r.jsx("div", {
                                        className: "v-luxe-awards-bento reveal",
                                        "data-stagger": "1",
                                        children: i.awards.cards.map((o, l) =>
                                            r.jsxs(
                                                "article",
                                                {
                                                    className: `v-luxe-award-card${o.feature ? " is-feature" : ""}`,
                                                    children: [
                                                        r.jsx("span", {
                                                            className: "v-luxe-award-year",
                                                            children: o.year,
                                                        }),
                                                        r.jsx("h3", {
                                                            className: "v-luxe-award-name",
                                                            children: o.name,
                                                        }),
                                                        r.jsx("p", {
                                                            className: "v-luxe-award-category",
                                                            children: o.category,
                                                        }),
                                                    ],
                                                },
                                                o.name
                                            )
                                        ),
                                    }),
                                ],
                            }),
                            r.jsxs("section", {
                                id: i.learnings.id,
                                className: "v-luxe-section v-luxe-section--learnings",
                                children: [
                                    r.jsxs("header", {
                                        className: "v-luxe-section-head reveal",
                                        children: [
                                            r.jsx("span", {
                                                className: "v-luxe-section-eyebrow",
                                                children: i.learnings.eyebrow,
                                            }),
                                            r.jsx("h2", {
                                                className: "v-luxe-section-title",
                                                children: i.learnings.title,
                                            }),
                                        ],
                                    }),
                                    r.jsx("div", {
                                        className: "v-luxe-learnings",
                                        children: i.learnings.items.map((o, l) =>
                                            r.jsxs(
                                                "article",
                                                {
                                                    className: "v-luxe-learning reveal",
                                                    "data-stagger": Math.min(5, l + 1),
                                                    children: [
                                                        r.jsx("div", {
                                                            className: "v-luxe-learning-num",
                                                            children: o.n,
                                                        }),
                                                        r.jsx("h3", { children: o.title }),
                                                        r.jsx("p", { children: o.body }),
                                                    ],
                                                },
                                                o.n
                                            )
                                        ),
                                    }),
                                ],
                            }),
                            r.jsx("div", {
                                className: "v-luxe-tail v-luxe-tail--actions",
                                children: r.jsx("a", {
                                    href: "/#cases",
                                    className: "v-luxe-tail-link",
                                    onClick: () => Ot("voltar_cases", "case_wine"),
                                    children: "← Voltar aos cases",
                                }),
                            }),
                        ],
                    }),
                }),
            }),
            r.jsx(Ma, {}),
        ],
    });
}
const xf = {
    title: "Case Wine — leitura rápida (2 min) · Estéfano Pietragalla",
    description:
        "Versão de 2 minutos do case Wine. Como UX Lead, liderei o app que respondeu por 70% das vendas digitais e mais de 1 milhão de downloads em 2021.",
    canonical: "https://epietragalla.com/cases/wine/rapida",
    ogImage: "https://epietragalla.com/uploads/case-wine-luxe-hero.jpg",
};
function yf({ title: e, description: t, canonical: n, ogImage: a }) {
    z.useEffect(() => {
        const s = document.title,
            i = document.querySelector('meta[name="description"]'),
            o = i == null ? void 0 : i.getAttribute("content"),
            l = document.querySelector('link[rel="canonical"]'),
            c = l == null ? void 0 : l.getAttribute("href"),
            d = document.querySelector('meta[property="og:title"]'),
            v = d == null ? void 0 : d.getAttribute("content"),
            h = document.querySelector('meta[property="og:description"]'),
            f = h == null ? void 0 : h.getAttribute("content"),
            x = document.querySelector('meta[property="og:url"]'),
            w = x == null ? void 0 : x.getAttribute("content"),
            k = document.querySelector('meta[property="og:image"]'),
            R = k == null ? void 0 : k.getAttribute("content");
        return (
            (document.title = e),
            i && i.setAttribute("content", t),
            l && l.setAttribute("href", n),
            d && d.setAttribute("content", e),
            h && h.setAttribute("content", t),
            x && x.setAttribute("content", n),
            k && k.setAttribute("content", a),
            () => {
                (document.title = s),
                    i && o != null && i.setAttribute("content", o),
                    l && c != null && l.setAttribute("href", c),
                    d && v != null && d.setAttribute("content", v),
                    h && f != null && h.setAttribute("content", f),
                    x && w != null && x.setAttribute("content", w),
                    k && R != null && k.setAttribute("content", R);
            }
        );
    }, [e, t, n, a]);
}
const jf = {
    eyebrow: "Case · 01 / 03 — Wine.com.br · UX Lead · 2018—2021 · leitura rápida",
    headline: {
        pre: "Do zero a 70% das vendas digitais — Como liderei a criação e a evolução do ",
        em: "App Wine",
        post: ".",
    },
    lede: "Versão de 2 minutos. Como product designer à frente do projeto entre 2018 e setembro de 2021, liderei o ciclo completo do primeiro app nativo da Wine: pesquisa, escopo, lançamento e três anos de evolução.",
    meta: [
        ["Papel", "UX Lead"],
        ["Período", "2018 — 2021"],
        ["Time", "12 designers · 7 squads"],
        ["Release", "MVP fim/2018 · público 2019"],
    ],
    cover: { src: "/uploads/case-wine-luxe-hero.jpg", caption: "Wine.com.br · App nativo iOS / Android · 2018–2021" },
    stats: [
        {
            pre: "",
            num: "70",
            sup: "%",
            unit: "vendas digitais via app",
            label: "no 3T21, com base zero antes do lançamento público em 2019",
        },
        {
            pre: "+",
            num: "225",
            sup: "%",
            unit: "EBITDA Ajustado · 1T21",
            label: "alavancagem operacional puxada pelo mobile",
        },
        {
            pre: "R$ ",
            num: "161",
            suf: " mi",
            unit: "receita líquida 3T21",
            label: "+69% interanual · R$ 58 mi recorrentes do Clube Wine",
        },
        {
            pre: "+",
            num: "1",
            suf: " mi",
            unit: "downloads",
            label: "em abril/2021, cinco meses após o lançamento público",
        },
    ],
    decisions: [
        {
            numeral: "I",
            title: "Onboarding-quiz como porta de entrada",
            body: "Capturei preferências sensoriais do usuário no primeiro acesso e alimentei o motor de recomendação WineBox com percentual de match em cada rótulo. Catálogo intimidador virou seleção curada.",
        },
        {
            numeral: "II",
            title: "Wine Design System v1",
            body: "Construí a primeira fundação tokenizada da empresa (tipografia, cor, espaçamento, componentes). Foi o entregável menos visível e o mais alavancador para tudo que veio depois.",
        },
        {
            numeral: "III",
            title: "WineUP — gamificação como motor de retenção",
            body: "Programa de cashback, missões e status hierárquico desenhado pra ser sistema nervoso do app, não anexo. Sócios passaram a gastar 51% a mais em compras adjacentes ao clube.",
        },
        {
            numeral: "IV",
            title: "Phygital O2O — 13 lojas como extensão do app",
            body: "Geolocalização reconfigura o estoque exibido, click-and-collect e same-day delivery. Loja física virou hub logístico do app e o SSS (vendas same-store) cresceu 185% no ano.",
        },
    ],
    awards: [
        "Shop! Global Awards 2021 — Phygital",
        "Prêmio iBest 2021 — Categoria Supermercados",
        "E-Commerce Brasil 2020 / 21 — finalista ao lado de Amazon e Magazine Luiza",
        "Ebit NielsenIQ 2020 / 21 — Loja Diamante",
    ],
};
function wf({ theme: e, setTheme: t }) {
    const n = z.useRef(null);
    hr(n),
        yf(xf),
        z.useEffect(() => {
            Td("wine_rapida");
        }, []);
    const a = jf;
    return r.jsxs("div", {
        ref: n,
        children: [
            r.jsx("a", { href: "#main", className: "skip-link", children: "Pular para conteúdo" }),
            r.jsx(Ia, { theme: e, setTheme: t, hrefBase: "/" }),
            r.jsx("main", {
                id: "main",
                tabIndex: "-1",
                className: "case-wine-page",
                children: r.jsxs("article", {
                    className: "v-luxe",
                    children: [
                        r.jsxs("div", {
                            className: "v-luxe-switch reveal",
                            children: [
                                r.jsx("span", {
                                    className: "v-luxe-switch-active",
                                    children: "Leitura rápida · 2 min",
                                }),
                                r.jsxs("a", {
                                    href: "/cases/wine",
                                    className: "v-luxe-switch-link",
                                    onClick: () => Ot("ler_completo", "case_wine_rapida"),
                                    children: [
                                        "Ler o case completo",
                                        r.jsx("span", { "aria-hidden": "true", children: "→" }),
                                    ],
                                }),
                            ],
                        }),
                        r.jsxs("header", {
                            className: "v-luxe-hero reveal",
                            children: [
                                r.jsx("span", { className: "v-luxe-eyebrow", children: a.eyebrow }),
                                r.jsxs("h1", {
                                    className: "v-luxe-headline",
                                    children: [
                                        a.headline.pre,
                                        r.jsx("em", { children: a.headline.em }),
                                        a.headline.post,
                                    ],
                                }),
                                r.jsx("p", { className: "v-luxe-lede", children: a.lede }),
                                r.jsx("div", {
                                    className: "v-luxe-meta",
                                    children: a.meta.map(([s, i]) =>
                                        r.jsxs(
                                            "div",
                                            {
                                                className: "v-luxe-meta-cell",
                                                children: [
                                                    r.jsx("span", { className: "v-luxe-meta-key", children: s }),
                                                    r.jsx("span", { className: "v-luxe-meta-val", children: i }),
                                                ],
                                            },
                                            s
                                        )
                                    ),
                                }),
                                r.jsxs("figure", {
                                    className: "v-luxe-cover reveal",
                                    "data-stagger": "2",
                                    children: [
                                        r.jsx("img", {
                                            src: a.cover.src,
                                            alt: "Hero do case Wine — App Wine, projeto liderado por Estéfano Pietragalla entre 2018 e 2021",
                                            loading: "lazy",
                                            decoding: "async",
                                        }),
                                        r.jsx("figcaption", {
                                            className: "v-luxe-cover-caption",
                                            children: a.cover.caption,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        r.jsx("section", {
                            className: "v-luxe-stats reveal",
                            "aria-label": "Indicadores de impacto",
                            children: a.stats.map((s, i) =>
                                r.jsxs(
                                    "div",
                                    {
                                        className: "v-luxe-stat",
                                        children: [
                                            r.jsxs("div", {
                                                className: "v-luxe-stat-num",
                                                children: [
                                                    s.pre,
                                                    s.num,
                                                    s.sup && r.jsx("sup", { children: s.sup }),
                                                    s.suf &&
                                                        r.jsx("span", {
                                                            className: "v-luxe-stat-suf",
                                                            children: s.suf,
                                                        }),
                                                ],
                                            }),
                                            r.jsx("div", { className: "v-luxe-stat-unit", children: s.unit }),
                                            r.jsx("div", { className: "v-luxe-stat-label", children: s.label }),
                                        ],
                                    },
                                    i
                                )
                            ),
                        }),
                        r.jsx("section", {
                            className: "v-luxe-decisions",
                            children: a.decisions.map((s) =>
                                r.jsxs(
                                    "div",
                                    {
                                        className: "v-luxe-decision reveal",
                                        children: [
                                            r.jsx("div", { className: "v-luxe-decision-numeral", children: s.numeral }),
                                            r.jsx("h2", { children: s.title }),
                                            r.jsx("p", { children: s.body }),
                                        ],
                                    },
                                    s.numeral
                                )
                            ),
                        }),
                        r.jsxs("section", {
                            className: "v-luxe-awards reveal",
                            children: [
                                r.jsx("span", {
                                    className: "v-luxe-awards-eyebrow",
                                    children: "Reconhecimentos da indústria",
                                }),
                                r.jsx("div", {
                                    className: "v-luxe-awards-list",
                                    children: a.awards.map((s) => r.jsx("span", { children: s }, s)),
                                }),
                            ],
                        }),
                        r.jsxs("div", {
                            className: "v-luxe-tail v-luxe-tail--actions",
                            children: [
                                r.jsxs("a", {
                                    href: "/cases/wine",
                                    className: "v-luxe-tail-link v-luxe-tail-link--primary",
                                    onClick: () => Ot("ler_completo_footer", "case_wine_rapida"),
                                    children: [
                                        "Ler o case completo",
                                        r.jsx("span", { "aria-hidden": "true", children: "→" }),
                                    ],
                                }),
                                r.jsx("a", {
                                    href: "/#cases",
                                    className: "v-luxe-tail-link",
                                    onClick: () => Ot("voltar_cases", "case_wine_rapida"),
                                    children: "← Voltar aos cases",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            r.jsx(Ma, {}),
        ],
    });
}
function Nf({ dark: e = !1, time: t = "9:41" }) {
    const n = e ? "#fff" : "#000";
    return r.jsxs("div", {
        style: {
            display: "flex",
            gap: 154,
            alignItems: "center",
            justifyContent: "center",
            padding: "21px 24px 19px",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 20,
            width: "100%",
        },
        children: [
            r.jsx("div", {
                style: {
                    flex: 1,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 1.5,
                },
                children: r.jsx("span", {
                    style: {
                        fontFamily: '-apple-system, "SF Pro", system-ui',
                        fontWeight: 590,
                        fontSize: 17,
                        lineHeight: "22px",
                        color: n,
                    },
                    children: t,
                }),
            }),
            r.jsxs("div", {
                style: {
                    flex: 1,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                    paddingTop: 1,
                    paddingRight: 1,
                },
                children: [
                    r.jsxs("svg", {
                        width: "19",
                        height: "12",
                        viewBox: "0 0 19 12",
                        children: [
                            r.jsx("rect", { x: "0", y: "7.5", width: "3.2", height: "4.5", rx: "0.7", fill: n }),
                            r.jsx("rect", { x: "4.8", y: "5", width: "3.2", height: "7", rx: "0.7", fill: n }),
                            r.jsx("rect", { x: "9.6", y: "2.5", width: "3.2", height: "9.5", rx: "0.7", fill: n }),
                            r.jsx("rect", { x: "14.4", y: "0", width: "3.2", height: "12", rx: "0.7", fill: n }),
                        ],
                    }),
                    r.jsxs("svg", {
                        width: "17",
                        height: "12",
                        viewBox: "0 0 17 12",
                        children: [
                            r.jsx("path", {
                                d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
                                fill: n,
                            }),
                            r.jsx("path", {
                                d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
                                fill: n,
                            }),
                            r.jsx("circle", { cx: "8.5", cy: "10.5", r: "1.5", fill: n }),
                        ],
                    }),
                    r.jsxs("svg", {
                        width: "27",
                        height: "13",
                        viewBox: "0 0 27 13",
                        children: [
                            r.jsx("rect", {
                                x: "0.5",
                                y: "0.5",
                                width: "23",
                                height: "12",
                                rx: "3.5",
                                stroke: n,
                                strokeOpacity: "0.35",
                                fill: "none",
                            }),
                            r.jsx("rect", { x: "2", y: "2", width: "20", height: "9", rx: "2", fill: n }),
                            r.jsx("path", {
                                d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
                                fill: n,
                                fillOpacity: "0.4",
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
function kf({ children: e, dark: t = !1, style: n = {} }) {
    return r.jsxs("div", {
        style: {
            height: 44,
            minWidth: 44,
            borderRadius: 9999,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: t
                ? "0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)"
                : "0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)",
            ...n,
        },
        children: [
            r.jsx("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    borderRadius: 9999,
                    backdropFilter: "blur(12px) saturate(180%)",
                    WebkitBackdropFilter: "blur(12px) saturate(180%)",
                    background: t ? "rgba(120,120,128,0.28)" : "rgba(255,255,255,0.5)",
                },
            }),
            r.jsx("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    borderRadius: 9999,
                    boxShadow: t
                        ? "inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)"
                        : "inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)",
                    border: t ? "0.5px solid rgba(255,255,255,0.15)" : "0.5px solid rgba(0,0,0,0.06)",
                },
            }),
            r.jsx("div", {
                style: { position: "relative", zIndex: 1, display: "flex", alignItems: "center", padding: "0 4px" },
                children: e,
            }),
        ],
    });
}
function Sf({ title: e = "Title", dark: t = !1, trailingIcon: n = !0 }) {
    const a = t ? "rgba(255,255,255,0.6)" : "#404040",
        s = t ? "#fff" : "#000",
        i = (o) =>
            r.jsx(kf, {
                dark: t,
                children: r.jsx("div", {
                    style: { width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" },
                    children: o,
                }),
            });
    return r.jsxs("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: 10,
            paddingTop: 62,
            paddingBottom: 10,
            position: "relative",
            zIndex: 5,
        },
        children: [
            r.jsxs("div", {
                style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" },
                children: [
                    i(
                        r.jsx("svg", {
                            width: "12",
                            height: "20",
                            viewBox: "0 0 12 20",
                            fill: "none",
                            style: { marginLeft: -1 },
                            children: r.jsx("path", {
                                d: "M10 2L2 10l8 8",
                                stroke: a,
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                            }),
                        })
                    ),
                    n &&
                        i(
                            r.jsxs("svg", {
                                width: "22",
                                height: "6",
                                viewBox: "0 0 22 6",
                                children: [
                                    r.jsx("circle", { cx: "3", cy: "3", r: "2.5", fill: a }),
                                    r.jsx("circle", { cx: "11", cy: "3", r: "2.5", fill: a }),
                                    r.jsx("circle", { cx: "19", cy: "3", r: "2.5", fill: a }),
                                ],
                            })
                        ),
                ],
            }),
            r.jsx("div", {
                style: {
                    padding: "0 16px",
                    fontFamily: "-apple-system, system-ui",
                    fontSize: 34,
                    fontWeight: 700,
                    lineHeight: "41px",
                    color: s,
                    letterSpacing: 0.4,
                },
                children: e,
            }),
        ],
    });
}
function ai({ children: e, width: t = 402, height: n = 874, dark: a = !1, title: s, keyboard: i = !1 }) {
    return r.jsxs("div", {
        style: {
            width: t,
            height: n,
            borderRadius: 48,
            overflow: "hidden",
            position: "relative",
            background: a ? "#000" : "#F2F2F7",
            boxShadow: "0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)",
            fontFamily: "-apple-system, system-ui, sans-serif",
            WebkitFontSmoothing: "antialiased",
        },
        children: [
            r.jsx("div", {
                style: {
                    position: "absolute",
                    top: 11,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 126,
                    height: 37,
                    borderRadius: 24,
                    background: "#000",
                    zIndex: 50,
                },
            }),
            r.jsx("div", {
                style: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 },
                children: r.jsx(Nf, { dark: a }),
            }),
            r.jsxs("div", {
                style: { height: "100%", display: "flex", flexDirection: "column" },
                children: [
                    s !== void 0 && r.jsx(Sf, { title: s, dark: a }),
                    r.jsx("div", { style: { flex: 1, overflow: "auto" }, children: e }),
                    i && r.jsx(bf, { dark: a }),
                ],
            }),
            r.jsx("div", {
                style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 60,
                    height: 34,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    paddingBottom: 8,
                    pointerEvents: "none",
                },
                children: r.jsx("div", {
                    style: {
                        width: 139,
                        height: 5,
                        borderRadius: 100,
                        background: a ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.25)",
                    },
                }),
            }),
        ],
    });
}
function bf({ dark: e = !1 }) {
    const t = e ? "rgba(255,255,255,0.7)" : "#595959",
        n = e ? "rgba(255,255,255,0.6)" : "#333",
        a = e ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.85)",
        s = {
            shift: r.jsx("svg", {
                width: "19",
                height: "17",
                viewBox: "0 0 19 17",
                children: r.jsx("path", { d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z", fill: t }),
            }),
            del: r.jsxs("svg", {
                width: "23",
                height: "17",
                viewBox: "0 0 23 17",
                children: [
                    r.jsx("path", {
                        d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
                        fill: "none",
                        stroke: t,
                        strokeWidth: "1.6",
                        strokeLinejoin: "round",
                    }),
                    r.jsx("path", { d: "M10 5l7 7M17 5l-7 7", stroke: t, strokeWidth: "1.6", strokeLinecap: "round" }),
                ],
            }),
            ret: r.jsx("svg", {
                width: "20",
                height: "14",
                viewBox: "0 0 20 14",
                children: r.jsx("path", {
                    d: "M18 1v6H4m0 0l4-4M4 7l4 4",
                    fill: "none",
                    stroke: "#fff",
                    strokeWidth: "1.8",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                }),
            }),
        },
        i = (l, { w: c, flex: d, ret: v, fs: h = 25, k: f } = {}) =>
            r.jsx(
                "div",
                {
                    style: {
                        height: 42,
                        borderRadius: 8.5,
                        flex: d ? 1 : void 0,
                        width: c,
                        minWidth: 0,
                        background: v ? "#08f" : a,
                        boxShadow: "0 1px 0 rgba(0,0,0,0.075)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: '-apple-system, "SF Compact", system-ui',
                        fontSize: h,
                        fontWeight: 458,
                        color: v ? "#fff" : t,
                    },
                    children: l,
                },
                f
            ),
        o = (l, c = 0) =>
            r.jsx("div", {
                style: { display: "flex", gap: 6.5, justifyContent: "center", padding: `0 ${c}px` },
                children: l.map((d) => i(d, { flex: !0, k: d })),
            });
    return r.jsxs("div", {
        style: {
            position: "relative",
            zIndex: 15,
            borderRadius: 27,
            overflow: "hidden",
            padding: "11px 0 2px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: e
                ? "0 -2px 20px rgba(0,0,0,0.09)"
                : "0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)",
        },
        children: [
            r.jsx("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    borderRadius: 27,
                    backdropFilter: "blur(12px) saturate(180%)",
                    WebkitBackdropFilter: "blur(12px) saturate(180%)",
                    background: e ? "rgba(120,120,128,0.14)" : "rgba(255,255,255,0.25)",
                },
            }),
            r.jsx("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    borderRadius: 27,
                    boxShadow: e
                        ? "inset 1.5px 1.5px 1px rgba(255,255,255,0.15)"
                        : "inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)",
                    border: e ? "0.5px solid rgba(255,255,255,0.15)" : "0.5px solid rgba(0,0,0,0.06)",
                    pointerEvents: "none",
                },
            }),
            r.jsx("div", {
                style: {
                    display: "flex",
                    gap: 20,
                    alignItems: "center",
                    padding: "8px 22px 13px",
                    width: "100%",
                    boxSizing: "border-box",
                    position: "relative",
                },
                children: ['"The"', "the", "to"].map((l, c) =>
                    r.jsxs(
                        Vt.Fragment,
                        {
                            children: [
                                c > 0 &&
                                    r.jsx("div", { style: { width: 1, height: 25, background: "#ccc", opacity: 0.3 } }),
                                r.jsx("div", {
                                    style: {
                                        flex: 1,
                                        textAlign: "center",
                                        fontFamily: "-apple-system, system-ui",
                                        fontSize: 17,
                                        color: n,
                                        letterSpacing: -0.43,
                                        lineHeight: "22px",
                                    },
                                    children: l,
                                }),
                            ],
                        },
                        c
                    )
                ),
            }),
            r.jsxs("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 13,
                    padding: "0 6.5px",
                    width: "100%",
                    boxSizing: "border-box",
                    position: "relative",
                },
                children: [
                    o(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]),
                    o(["a", "s", "d", "f", "g", "h", "j", "k", "l"], 20),
                    r.jsxs("div", {
                        style: { display: "flex", gap: 14.25, alignItems: "center" },
                        children: [
                            i(s.shift, { w: 45, k: "shift" }),
                            r.jsx("div", {
                                style: { display: "flex", gap: 6.5, flex: 1 },
                                children: ["z", "x", "c", "v", "b", "n", "m"].map((l) => i(l, { flex: !0, k: l })),
                            }),
                            i(s.del, { w: 45, k: "del" }),
                        ],
                    }),
                    r.jsxs("div", {
                        style: { display: "flex", gap: 6, alignItems: "center" },
                        children: [
                            i("ABC", { w: 92.25, fs: 18, k: "abc" }),
                            i("", { flex: !0, k: "space" }),
                            i(s.ret, { w: 92.25, ret: !0, k: "ret" }),
                        ],
                    }),
                ],
            }),
            r.jsx("div", { style: { height: 56, width: "100%", position: "relative" } }),
        ],
    });
}
const j = {
    red: "#A31621",
    redDk: "#7A0F18",
    gold: "#C8A14A",
    cream: "#F7F1E6",
    ink: "#1A0F12",
    paper: "#FFFFFF",
    soft: "#FAF5EE",
    line: "rgba(26,15,18,0.08)",
};
function Cf({ title: e }) {
    return r.jsxs("div", {
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px 12px",
            background: j.paper,
            borderBottom: `1px solid ${j.line}`,
        },
        children: [
            r.jsxs("span", {
                style: {
                    fontFamily: "Georgia,serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: j.red,
                    letterSpacing: "-0.02em",
                },
                children: ["botica", r.jsx("span", { style: { color: j.gold }, children: "·" })],
            }),
            r.jsxs("div", {
                style: { display: "flex", gap: 14, color: j.ink },
                children: [
                    r.jsx("span", { style: { fontSize: 18 }, children: "🔍" }),
                    r.jsx("span", { style: { fontSize: 18 }, children: "♡" }),
                    r.jsxs("span", {
                        style: { fontSize: 18, position: "relative" },
                        children: [
                            "🛍",
                            r.jsx("span", {
                                style: {
                                    position: "absolute",
                                    top: -6,
                                    right: -8,
                                    width: 14,
                                    height: 14,
                                    borderRadius: 99,
                                    background: j.red,
                                    color: "white",
                                    fontSize: 9,
                                    display: "grid",
                                    placeItems: "center",
                                    fontWeight: 700,
                                },
                                children: "2",
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
function Ld({ active: e = "home" }) {
    const t = [
        ["home", "Início", "⌂"],
        ["search", "Buscar", "⌕"],
        ["club", "Clube", "✦"],
        ["bag", "Sacola", "🛍"],
        ["me", "Eu", "○"],
    ];
    return r.jsx("div", {
        style: {
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            padding: "10px 8px 14px",
            background: j.paper,
            borderTop: `1px solid ${j.line}`,
        },
        children: t.map(([n, a, s]) =>
            r.jsxs(
                "div",
                {
                    style: {
                        textAlign: "center",
                        color: n === e ? j.red : "rgba(26,15,18,0.5)",
                        fontFamily: "ui-sans-serif,system-ui,sans-serif",
                        fontSize: 10,
                        fontWeight: 500,
                    },
                    children: [
                        r.jsx("div", { style: { fontSize: 20, lineHeight: 1 }, children: s }),
                        r.jsx("div", { style: { marginTop: 4 }, children: a }),
                    ],
                },
                n
            )
        ),
    });
}
function _d() {
    return r.jsxs("div", {
        style: { background: j.soft, height: "100%", display: "flex", flexDirection: "column" },
        children: [
            r.jsx(Cf, {}),
            r.jsxs("div", {
                style: { flex: 1, overflow: "hidden", padding: "12px 0 0" },
                children: [
                    r.jsxs("div", {
                        style: {
                            margin: "0 16px 16px",
                            borderRadius: 20,
                            overflow: "hidden",
                            background: `linear-gradient(135deg, ${j.red}, ${j.redDk})`,
                            padding: "20px 18px",
                            color: "white",
                            position: "relative",
                        },
                        children: [
                            r.jsx("div", {
                                style: {
                                    fontFamily: "ui-monospace,monospace",
                                    fontSize: 10,
                                    letterSpacing: "0.18em",
                                    opacity: 0.7,
                                },
                                children: "SEMANA DO BELEZA",
                            }),
                            r.jsxs("div", {
                                style: {
                                    fontFamily: "Georgia,serif",
                                    fontSize: 26,
                                    fontWeight: 700,
                                    marginTop: 8,
                                    lineHeight: 1.05,
                                    letterSpacing: "-0.01em",
                                },
                                children: [
                                    "até 40% off em",
                                    r.jsx("br", {}),
                                    r.jsx("em", { style: { color: j.gold }, children: "perfumaria" }),
                                ],
                            }),
                            r.jsx("div", {
                                style: {
                                    display: "inline-block",
                                    marginTop: 14,
                                    padding: "8px 14px",
                                    background: "white",
                                    color: j.red,
                                    borderRadius: 99,
                                    fontSize: 12,
                                    fontWeight: 700,
                                },
                                children: "aproveitar →",
                            }),
                            r.jsx("div", {
                                style: {
                                    position: "absolute",
                                    right: -6,
                                    top: 14,
                                    width: 70,
                                    height: 96,
                                    background: j.gold,
                                    borderRadius: "12px 12px 8px 8px",
                                    opacity: 0.85,
                                },
                            }),
                            r.jsx("div", {
                                style: {
                                    position: "absolute",
                                    right: 14,
                                    top: 6,
                                    width: 32,
                                    height: 14,
                                    background: j.cream,
                                    borderRadius: 4,
                                },
                            }),
                        ],
                    }),
                    r.jsx("div", {
                        style: { display: "flex", gap: 8, padding: "0 16px 16px", overflowX: "auto" },
                        children: ["Perfumes", "Maquiagem", "Cabelos", "Corpo", "Rosto", "Kits"].map((e, t) =>
                            r.jsx(
                                "div",
                                {
                                    style: {
                                        padding: "8px 14px",
                                        borderRadius: 99,
                                        background: t === 0 ? j.ink : j.paper,
                                        color: t === 0 ? j.paper : j.ink,
                                        fontSize: 12,
                                        fontWeight: 500,
                                        whiteSpace: "nowrap",
                                        border: `1px solid ${j.line}`,
                                    },
                                    children: e,
                                },
                                e
                            )
                        ),
                    }),
                    r.jsxs("div", {
                        style: {
                            padding: "0 16px 12px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                        },
                        children: [
                            r.jsx("div", {
                                style: { fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 600, color: j.ink },
                                children: "Em alta",
                            }),
                            r.jsx("div", {
                                style: { fontSize: 11, color: j.red, fontWeight: 600 },
                                children: "ver tudo →",
                            }),
                        ],
                    }),
                    r.jsx("div", {
                        style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 16px" },
                        children: [
                            { c: "#E8D9CC", g: "#7A0F18", n: "Lily Eau de Parfum", p: "R$ 219,90" },
                            { c: "#F2E0DA", g: "#A31621", n: "Match Hidratante", p: "R$  89,90" },
                        ].map((e) =>
                            r.jsxs(
                                "div",
                                {
                                    style: { background: j.paper, borderRadius: 14, padding: 10 },
                                    children: [
                                        r.jsx("div", {
                                            style: {
                                                aspectRatio: "1",
                                                background: e.c,
                                                borderRadius: 10,
                                                position: "relative",
                                            },
                                            children: r.jsx("div", {
                                                style: {
                                                    position: "absolute",
                                                    left: "30%",
                                                    right: "30%",
                                                    top: "20%",
                                                    bottom: "10%",
                                                    background: e.g,
                                                    borderRadius: "8px 8px 4px 4px",
                                                },
                                            }),
                                        }),
                                        r.jsx("div", {
                                            style: {
                                                fontSize: 11,
                                                marginTop: 8,
                                                color: j.ink,
                                                fontWeight: 500,
                                                lineHeight: 1.2,
                                            },
                                            children: e.n,
                                        }),
                                        r.jsx("div", {
                                            style: { fontSize: 12, marginTop: 4, color: j.red, fontWeight: 700 },
                                            children: e.p,
                                        }),
                                    ],
                                },
                                e.n
                            )
                        ),
                    }),
                ],
            }),
            r.jsx(Ld, { active: "home" }),
        ],
    });
}
function Id() {
    return r.jsxs("div", {
        style: { background: j.paper, height: "100%", display: "flex", flexDirection: "column" },
        children: [
            r.jsxs("div", {
                style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px" },
                children: [
                    r.jsx("span", { style: { fontSize: 22, color: j.ink }, children: "‹" }),
                    r.jsx("span", {
                        style: {
                            fontFamily: "ui-monospace,monospace",
                            fontSize: 10,
                            letterSpacing: "0.16em",
                            color: "rgba(26,15,18,0.5)",
                        },
                        children: "PERFUMARIA / FEMININO",
                    }),
                    r.jsx("span", { style: { fontSize: 18, color: j.ink }, children: "♡" }),
                ],
            }),
            r.jsxs("div", {
                style: { flex: 1, overflow: "hidden" },
                children: [
                    r.jsxs("div", {
                        style: {
                            aspectRatio: "1",
                            background: `linear-gradient(160deg, ${j.cream}, #E8D9CC)`,
                            position: "relative",
                            margin: "0 16px",
                            borderRadius: 18,
                        },
                        children: [
                            r.jsx("div", {
                                style: {
                                    position: "absolute",
                                    left: "32%",
                                    right: "32%",
                                    top: "12%",
                                    bottom: "8%",
                                    background: `linear-gradient(180deg, ${j.red}, ${j.redDk})`,
                                    borderRadius: "10px 10px 6px 6px",
                                    boxShadow: "0 18px 36px -10px rgba(122,15,24,0.4)",
                                },
                            }),
                            r.jsx("div", {
                                style: {
                                    position: "absolute",
                                    left: "40%",
                                    right: "40%",
                                    top: "6%",
                                    height: 22,
                                    background: j.gold,
                                    borderRadius: 4,
                                },
                            }),
                            r.jsx("div", {
                                style: {
                                    position: "absolute",
                                    left: 0,
                                    right: 0,
                                    bottom: 12,
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 4,
                                },
                                children: [0, 1, 2, 3].map((e) =>
                                    r.jsx(
                                        "span",
                                        {
                                            style: {
                                                width: e === 0 ? 16 : 6,
                                                height: 6,
                                                borderRadius: 99,
                                                background: e === 0 ? j.ink : "rgba(26,15,18,0.25)",
                                            },
                                        },
                                        e
                                    )
                                ),
                            }),
                        ],
                    }),
                    r.jsxs("div", {
                        style: { padding: "20px 18px 0" },
                        children: [
                            r.jsx("div", {
                                style: {
                                    fontFamily: "ui-monospace,monospace",
                                    fontSize: 10,
                                    letterSpacing: "0.16em",
                                    color: j.gold,
                                    fontWeight: 600,
                                },
                                children: "EAU DE PARFUM · 75ML",
                            }),
                            r.jsxs("div", {
                                style: {
                                    fontFamily: "Georgia,serif",
                                    fontSize: 24,
                                    fontWeight: 700,
                                    marginTop: 6,
                                    lineHeight: 1.05,
                                    color: j.ink,
                                    letterSpacing: "-0.01em",
                                },
                                children: ["Lily ", r.jsx("em", { style: { color: j.red }, children: "Absolu" })],
                            }),
                            r.jsxs("div", {
                                style: { marginTop: 4, fontSize: 11, color: "rgba(26,15,18,0.55)" },
                                children: [
                                    "★ ★ ★ ★ ★ ",
                                    r.jsx("span", { style: { marginLeft: 6 }, children: "4.9 · 2.341 avaliações" }),
                                ],
                            }),
                            r.jsxs("div", {
                                style: { marginTop: 14, display: "flex", alignItems: "baseline", gap: 8 },
                                children: [
                                    r.jsx("span", {
                                        style: {
                                            fontSize: 11,
                                            color: "rgba(26,15,18,0.4)",
                                            textDecoration: "line-through",
                                        },
                                        children: "R$ 369,90",
                                    }),
                                    r.jsx("span", {
                                        style: {
                                            fontFamily: "Georgia,serif",
                                            fontSize: 24,
                                            fontWeight: 700,
                                            color: j.red,
                                        },
                                        children: "R$ 219,90",
                                    }),
                                    r.jsx("span", {
                                        style: {
                                            background: j.gold,
                                            color: j.ink,
                                            fontSize: 10,
                                            fontWeight: 700,
                                            padding: "2px 6px",
                                            borderRadius: 4,
                                        },
                                        children: "-40%",
                                    }),
                                ],
                            }),
                            r.jsx("div", {
                                style: { fontSize: 11, color: "rgba(26,15,18,0.6)", marginTop: 4 },
                                children: "ou 6x R$ 36,65 sem juros",
                            }),
                            r.jsxs("div", {
                                style: {
                                    marginTop: 18,
                                    padding: "10px 12px",
                                    background: j.soft,
                                    borderRadius: 10,
                                    fontSize: 11,
                                    color: j.ink,
                                },
                                children: [
                                    "🚚 ",
                                    r.jsx("b", { children: "Frete grátis" }),
                                    " em compras acima de R$ 199 · entrega em 2 dias úteis",
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            r.jsxs("div", {
                style: {
                    padding: "12px 16px 16px",
                    background: j.paper,
                    borderTop: `1px solid ${j.line}`,
                    display: "flex",
                    gap: 8,
                },
                children: [
                    r.jsx("button", {
                        style: {
                            flex: 1,
                            padding: "14px",
                            borderRadius: 12,
                            background: j.red,
                            color: "white",
                            border: 0,
                            fontSize: 14,
                            fontWeight: 600,
                        },
                        children: "adicionar à sacola",
                    }),
                    r.jsx("button", {
                        style: {
                            width: 48,
                            padding: "14px",
                            borderRadius: 12,
                            background: j.paper,
                            color: j.ink,
                            border: `1px solid ${j.line}`,
                            fontSize: 18,
                        },
                        children: "♡",
                    }),
                ],
            }),
        ],
    });
}
function Ef() {
    return r.jsxs("div", {
        style: { background: j.soft, height: "100%", display: "flex", flexDirection: "column" },
        children: [
            r.jsxs("div", {
                style: {
                    padding: "12px 14px",
                    background: j.paper,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    borderBottom: `1px solid ${j.line}`,
                },
                children: [
                    r.jsx("span", { style: { fontSize: 22, color: j.ink }, children: "‹" }),
                    r.jsxs("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 12px",
                            borderRadius: 99,
                            background: j.soft,
                            border: `1px solid ${j.line}`,
                        },
                        children: [
                            r.jsx("span", { style: { fontSize: 14 }, children: "🔍" }),
                            r.jsx("span", { style: { fontSize: 13, color: j.ink }, children: "perfume floral" }),
                            r.jsx("span", {
                                style: { marginLeft: "auto", color: "rgba(26,15,18,0.4)", fontSize: 16 },
                                children: "×",
                            }),
                        ],
                    }),
                ],
            }),
            r.jsx("div", {
                style: { display: "flex", gap: 8, padding: "10px 14px", overflowX: "auto", background: j.paper },
                children: [
                    ["Filtros", "⚙"],
                    ["Preço", ""],
                    ["Marca", ""],
                    ["Avaliação", "★"],
                    ["Ordenar", "↕"],
                ].map((e, t) =>
                    r.jsxs(
                        "div",
                        {
                            style: {
                                padding: "6px 12px",
                                borderRadius: 99,
                                border: `1px solid ${j.line}`,
                                background: t === 0 ? j.ink : j.paper,
                                color: t === 0 ? j.paper : j.ink,
                                fontSize: 11,
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                display: "flex",
                                gap: 4,
                                alignItems: "center",
                            },
                            children: [
                                e[1] && r.jsx("span", { children: e[1] }),
                                e[0],
                                t === 0 &&
                                    r.jsx("span", {
                                        style: {
                                            background: j.red,
                                            color: "white",
                                            fontSize: 9,
                                            padding: "0 5px",
                                            borderRadius: 99,
                                        },
                                        children: "3",
                                    }),
                            ],
                        },
                        t
                    )
                ),
            }),
            r.jsxs("div", {
                style: { flex: 1, padding: "14px 14px 0", overflow: "hidden" },
                children: [
                    r.jsxs("div", {
                        style: { fontSize: 11, color: "rgba(26,15,18,0.6)", marginBottom: 10 },
                        children: [
                            r.jsx("b", { style: { color: j.ink }, children: "187 resultados" }),
                            " · ordenado por relevância",
                        ],
                    }),
                    r.jsx("div", {
                        style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
                        children: [
                            { c: "#E8D9CC", g: j.red, n: "Lily Absolu", p: "R$ 219,90", o: "R$ 369,90" },
                            { c: "#F2E0DA", g: j.gold, n: "Floratta Blue", p: "R$ 159,90", o: null },
                            { c: "#FAF5EE", g: j.redDk, n: "Coffee Woman", p: "R$ 189,90", o: "R$ 239,90" },
                            { c: "#E8D9CC", g: j.ink, n: "Malbec Original", p: "R$ 199,90", o: null },
                        ].map((e, t) =>
                            r.jsxs(
                                "div",
                                {
                                    style: { background: j.paper, borderRadius: 12, padding: 8 },
                                    children: [
                                        r.jsxs("div", {
                                            style: {
                                                aspectRatio: "1",
                                                background: e.c,
                                                borderRadius: 8,
                                                position: "relative",
                                            },
                                            children: [
                                                r.jsx("div", {
                                                    style: {
                                                        position: "absolute",
                                                        left: "30%",
                                                        right: "30%",
                                                        top: "16%",
                                                        bottom: "10%",
                                                        background: e.g,
                                                        borderRadius: "6px 6px 3px 3px",
                                                    },
                                                }),
                                                e.o &&
                                                    r.jsx("span", {
                                                        style: {
                                                            position: "absolute",
                                                            top: 6,
                                                            left: 6,
                                                            background: j.gold,
                                                            color: j.ink,
                                                            fontSize: 9,
                                                            fontWeight: 700,
                                                            padding: "2px 5px",
                                                            borderRadius: 3,
                                                        },
                                                        children: "OFERTA",
                                                    }),
                                            ],
                                        }),
                                        r.jsx("div", {
                                            style: { fontSize: 11, marginTop: 6, color: j.ink, fontWeight: 500 },
                                            children: e.n,
                                        }),
                                        r.jsxs("div", {
                                            style: { display: "flex", alignItems: "baseline", gap: 4, marginTop: 4 },
                                            children: [
                                                e.o &&
                                                    r.jsx("span", {
                                                        style: {
                                                            fontSize: 9,
                                                            color: "rgba(26,15,18,0.4)",
                                                            textDecoration: "line-through",
                                                        },
                                                        children: e.o,
                                                    }),
                                                r.jsx("span", {
                                                    style: { fontSize: 11, color: j.red, fontWeight: 700 },
                                                    children: e.p,
                                                }),
                                            ],
                                        }),
                                    ],
                                },
                                t
                            )
                        ),
                    }),
                ],
            }),
            r.jsx(Ld, { active: "search" }),
        ],
    });
}
function zf() {
    return r.jsxs("div", {
        style: { background: j.soft, height: "100%", display: "flex", flexDirection: "column" },
        children: [
            r.jsxs("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: j.paper,
                    borderBottom: `1px solid ${j.line}`,
                },
                children: [
                    r.jsx("span", { style: { fontSize: 22, color: j.ink }, children: "‹" }),
                    r.jsx("span", {
                        style: { fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 600, color: j.ink },
                        children: "Finalizar compra",
                    }),
                    r.jsx("span", { style: { width: 22 } }),
                ],
            }),
            r.jsx("div", {
                style: { display: "flex", justifyContent: "center", gap: 6, padding: "14px 16px", background: j.paper },
                children: ["Sacola", "Entrega", "Pagamento"].map((e, t) =>
                    r.jsxs(
                        Vt.Fragment,
                        {
                            children: [
                                r.jsxs("div", {
                                    style: { display: "flex", alignItems: "center", gap: 6 },
                                    children: [
                                        r.jsx("div", {
                                            style: {
                                                width: 22,
                                                height: 22,
                                                borderRadius: 99,
                                                background: t <= 1 ? j.red : "rgba(26,15,18,0.1)",
                                                color: t <= 1 ? "white" : "rgba(26,15,18,0.5)",
                                                display: "grid",
                                                placeItems: "center",
                                                fontSize: 11,
                                                fontWeight: 700,
                                            },
                                            children: t + 1,
                                        }),
                                        r.jsx("span", {
                                            style: {
                                                fontSize: 11,
                                                color: t === 1 ? j.ink : "rgba(26,15,18,0.5)",
                                                fontWeight: t === 1 ? 600 : 400,
                                            },
                                            children: e,
                                        }),
                                    ],
                                }),
                                t < 2 &&
                                    r.jsx("span", {
                                        style: {
                                            width: 12,
                                            height: 1,
                                            background: "rgba(26,15,18,0.2)",
                                            alignSelf: "center",
                                        },
                                    }),
                            ],
                        },
                        e
                    )
                ),
            }),
            r.jsxs("div", {
                style: { flex: 1, overflow: "hidden", padding: "12px 16px" },
                children: [
                    r.jsxs("div", {
                        style: {
                            background: j.paper,
                            padding: 14,
                            borderRadius: 12,
                            marginBottom: 12,
                            border: `1px solid ${j.line}`,
                        },
                        children: [
                            r.jsx("div", {
                                style: {
                                    fontFamily: "ui-monospace,monospace",
                                    fontSize: 10,
                                    letterSpacing: "0.14em",
                                    color: j.gold,
                                    fontWeight: 600,
                                },
                                children: "ENDEREÇO DE ENTREGA",
                            }),
                            r.jsx("div", {
                                style: { marginTop: 8, fontSize: 13, color: j.ink, fontWeight: 600 },
                                children: "Casa · Maria Silva",
                            }),
                            r.jsxs("div", {
                                style: { fontSize: 11, color: "rgba(26,15,18,0.6)", marginTop: 2, lineHeight: 1.4 },
                                children: [
                                    "Rua das Flores, 247 · Apto 802",
                                    r.jsx("br", {}),
                                    "Pinheiros · São Paulo / SP · 05422-000",
                                ],
                            }),
                            r.jsx("div", {
                                style: { fontSize: 11, color: j.red, marginTop: 8, fontWeight: 600 },
                                children: "alterar →",
                            }),
                        ],
                    }),
                    r.jsx("div", {
                        style: {
                            fontFamily: "ui-monospace,monospace",
                            fontSize: 10,
                            letterSpacing: "0.14em",
                            color: "rgba(26,15,18,0.55)",
                            margin: "16px 4px 8px",
                            fontWeight: 600,
                        },
                        children: "OPÇÃO DE ENTREGA",
                    }),
                    [
                        { n: "Expressa · 1 dia útil", p: "R$ 19,90", sel: !1 },
                        { n: "Padrão · 2 dias úteis", p: "Grátis", sel: !0, hl: !0 },
                        { n: "Retirar em loja · hoje", p: "Grátis", sel: !1 },
                    ].map((e, t) =>
                        r.jsxs(
                            "div",
                            {
                                style: {
                                    background: j.paper,
                                    padding: "12px 14px",
                                    borderRadius: 10,
                                    marginBottom: 6,
                                    border: e.sel ? `1.5px solid ${j.red}` : `1px solid ${j.line}`,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                },
                                children: [
                                    r.jsx("div", {
                                        style: {
                                            width: 18,
                                            height: 18,
                                            borderRadius: 99,
                                            border: `2px solid ${e.sel ? j.red : "rgba(26,15,18,0.2)"}`,
                                            display: "grid",
                                            placeItems: "center",
                                        },
                                        children:
                                            e.sel &&
                                            r.jsx("div", {
                                                style: { width: 8, height: 8, borderRadius: 99, background: j.red },
                                            }),
                                    }),
                                    r.jsx("div", {
                                        style: { flex: 1 },
                                        children: r.jsx("div", {
                                            style: { fontSize: 12, color: j.ink, fontWeight: e.sel ? 600 : 400 },
                                            children: e.n,
                                        }),
                                    }),
                                    r.jsx("div", {
                                        style: { fontSize: 12, color: e.hl ? j.red : j.ink, fontWeight: 600 },
                                        children: e.p,
                                    }),
                                ],
                            },
                            t
                        )
                    ),
                ],
            }),
            r.jsxs("div", {
                style: { padding: "14px 16px 16px", background: j.paper, borderTop: `1px solid ${j.line}` },
                children: [
                    r.jsxs("div", {
                        style: { display: "flex", justifyContent: "space-between", marginBottom: 10 },
                        children: [
                            r.jsx("span", {
                                style: { fontSize: 12, color: "rgba(26,15,18,0.6)" },
                                children: "Total (2 itens)",
                            }),
                            r.jsx("span", {
                                style: { fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 700, color: j.ink },
                                children: "R$ 309,80",
                            }),
                        ],
                    }),
                    r.jsx("button", {
                        style: {
                            width: "100%",
                            padding: "14px",
                            borderRadius: 12,
                            background: j.red,
                            color: "white",
                            border: 0,
                            fontSize: 14,
                            fontWeight: 600,
                        },
                        children: "continuar para pagamento →",
                    }),
                ],
            }),
        ],
    });
}
function Pf() {
    const e = [
        { c: r.jsx(_d, {}), l: "Home", n: "01" },
        { c: r.jsx(Id, {}), l: "Produto", n: "02" },
        { c: r.jsx(Ef, {}), l: "Busca", n: "03" },
        { c: r.jsx(zf, {}), l: "Checkout", n: "04" },
    ];
    return r.jsx("div", {
        className: "boti-mockups",
        children: r.jsx("div", {
            className: "boti-mockups-row",
            children: e.map((t, n) =>
                r.jsxs(
                    "figure",
                    {
                        className: "boti-mockup-cell reveal",
                        "data-stagger": Math.min(5, n),
                        children: [
                            r.jsx(ai, { width: 260, height: 552, children: t.c }),
                            r.jsxs("figcaption", {
                                children: [
                                    r.jsx("span", { className: "boti-mockup-num", children: t.n }),
                                    r.jsx("span", { className: "boti-mockup-label", children: t.l }),
                                ],
                            }),
                        ],
                    },
                    n
                )
            ),
        }),
    });
}
function Af() {
    const e = z.useRef(null);
    return (
        hr(e),
        r.jsxs("div", {
            ref: e,
            className: "case-detail",
            children: [
                r.jsx(Ia, { theme: "light", setTheme: () => {} }),
                r.jsxs("article", {
                    style: { paddingTop: 120 },
                    children: [
                        r.jsxs("header", {
                            className: "container",
                            style: { paddingBlock: "clamp(48px, 8vw, 120px)" },
                            children: [
                                r.jsx("div", {
                                    className: "reveal",
                                    style: { marginBottom: 32 },
                                    children: r.jsx("a", {
                                        href: "#cases",
                                        style: {
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 13,
                                            color: "var(--fg-soft)",
                                            display: "inline-flex",
                                            gap: 8,
                                        },
                                        children: "← voltar aos cases",
                                    }),
                                }),
                                r.jsx("div", {
                                    className: "t-eyebrow reveal",
                                    style: { marginBottom: 24 },
                                    children: "Grupo Boticário · UX Lead · 2022 — 2025",
                                }),
                                r.jsxs("h1", {
                                    className: "reveal",
                                    style: {
                                        fontFamily: "var(--font-display)",
                                        fontSize: "clamp(40px, 7vw, 112px)",
                                        letterSpacing: "-0.035em",
                                        lineHeight: 0.95,
                                        fontWeight: 600,
                                        margin: 0,
                                        textWrap: "balance",
                                    },
                                    children: [
                                        "Redesign do e‑commerce —",
                                        r.jsx("br", {}),
                                        r.jsx("span", {
                                            style: { fontStyle: "italic", color: "var(--accent-2)" },
                                            children: "App e Site",
                                        }),
                                        " de todas as marcas.",
                                    ],
                                }),
                                r.jsx("div", {
                                    className: "reveal",
                                    "data-stagger": "2",
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                        gap: 24,
                                        marginTop: 64,
                                        paddingTop: 32,
                                        borderTop: "1px solid var(--line)",
                                    },
                                    children: [
                                        ["Papel", "UX Lead"],
                                        ["Período", "Ago 2022 — Ago 2025"],
                                        ["Time", "8 designers + Ops + Writing + Research"],
                                        ["Marcas", "O Boticário · Beleza na Web · QDB · Eudora"],
                                    ].map(([t, n]) =>
                                        r.jsxs(
                                            "div",
                                            {
                                                children: [
                                                    r.jsx("div", {
                                                        className: "t-eyebrow",
                                                        style: { marginBottom: 6 },
                                                        children: t,
                                                    }),
                                                    r.jsx("div", {
                                                        style: { fontSize: 16, color: "var(--fg)" },
                                                        children: n,
                                                    }),
                                                ],
                                            },
                                            t
                                        )
                                    ),
                                }),
                            ],
                        }),
                        r.jsx("div", {
                            className: "container reveal mask-reveal",
                            children: r.jsxs("div", {
                                className: "case-cover",
                                children: [
                                    r.jsxs("div", {
                                        className: "case-cover-text",
                                        children: [
                                            r.jsx("div", {
                                                className: "t-eyebrow",
                                                style: { marginBottom: 12, color: "rgba(255,255,255,0.7)" },
                                                children: "amostra · mockup ficcional · 4 telas",
                                            }),
                                            r.jsxs("p", {
                                                style: {
                                                    fontFamily: "var(--font-display)",
                                                    fontSize: "clamp(20px, 2vw, 26px)",
                                                    lineHeight: 1.25,
                                                    color: "white",
                                                    margin: 0,
                                                    fontWeight: 500,
                                                    textWrap: "balance",
                                                },
                                                children: [
                                                    "Modular, consistente entre App e Site, escalando para ",
                                                    r.jsx("em", {
                                                        style: { color: "var(--accent)" },
                                                        children: "quatro marcas",
                                                    }),
                                                    " do grupo.",
                                                ],
                                            }),
                                            r.jsx("div", {
                                                style: { display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap" },
                                                children: [
                                                    ["230+", "telas"],
                                                    ["4", "marcas"],
                                                    ["+19%", "GMV"],
                                                ].map(([t, n]) =>
                                                    r.jsxs(
                                                        "div",
                                                        {
                                                            children: [
                                                                r.jsx("div", {
                                                                    style: {
                                                                        fontFamily: "var(--font-display)",
                                                                        fontSize: 32,
                                                                        fontWeight: 700,
                                                                        color: "white",
                                                                        letterSpacing: "-0.03em",
                                                                    },
                                                                    children: t,
                                                                }),
                                                                r.jsx("div", {
                                                                    style: {
                                                                        fontFamily: "var(--font-mono)",
                                                                        fontSize: 10,
                                                                        letterSpacing: "0.14em",
                                                                        color: "rgba(255,255,255,0.6)",
                                                                        textTransform: "uppercase",
                                                                        marginTop: 2,
                                                                    },
                                                                    children: n,
                                                                }),
                                                            ],
                                                        },
                                                        n
                                                    )
                                                ),
                                            }),
                                        ],
                                    }),
                                    r.jsxs("div", {
                                        className: "case-cover-phones",
                                        "aria-hidden": "true",
                                        children: [
                                            r.jsx("div", {
                                                className: "case-cover-phone case-cover-phone--front",
                                                children: r.jsx(ai, {
                                                    width: 300,
                                                    height: 640,
                                                    children: r.jsx(Id, {}),
                                                }),
                                            }),
                                            r.jsx("div", {
                                                className: "case-cover-phone case-cover-phone--back",
                                                children: r.jsx(ai, {
                                                    width: 280,
                                                    height: 600,
                                                    children: r.jsx(_d, {}),
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        }),
                        r.jsxs("section", {
                            className: "container section",
                            children: [
                                r.jsxs("div", {
                                    className: "section-label reveal",
                                    style: { marginBottom: 16 },
                                    children: [
                                        r.jsx("span", { className: "section-label-num", children: "→" }),
                                        r.jsx("span", {
                                            className: "section-label-title",
                                            children: "Amostra de telas",
                                        }),
                                    ],
                                }),
                                r.jsxs("h2", {
                                    className: "reveal",
                                    style: {
                                        fontFamily: "var(--font-display)",
                                        fontSize: "clamp(28px, 4.5vw, 56px)",
                                        letterSpacing: "-0.025em",
                                        lineHeight: 1.05,
                                        fontWeight: 600,
                                        margin: 0,
                                        marginBottom: 12,
                                        textWrap: "balance",
                                    },
                                    children: [
                                        "Quatro ",
                                        r.jsx("em", {
                                            style: { color: "var(--accent-2)" },
                                            children: "fluxos centrais",
                                        }),
                                        " do e‑commerce.",
                                    ],
                                }),
                                r.jsx("p", {
                                    className: "reveal",
                                    "data-stagger": "1",
                                    style: {
                                        fontSize: 16,
                                        lineHeight: 1.6,
                                        color: "var(--fg-soft)",
                                        maxWidth: "62ch",
                                        margin: "0 0 48px",
                                    },
                                    children:
                                        "Mockups ficcionais que ilustram a linguagem do redesign — modular, hierarquia clara, paleta unificada e affordances consistentes entre Home, PDP, Busca e Checkout.",
                                }),
                                r.jsx(Pf, {}),
                            ],
                        }),
                        r.jsxs("section", {
                            className: "container section",
                            style: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "clamp(24px, 5vw, 80px)" },
                            children: [
                                r.jsx("aside", {
                                    className: "reveal",
                                    children: r.jsx("div", {
                                        className: "t-eyebrow",
                                        style: { marginBottom: 12 },
                                        children: "O problema",
                                    }),
                                }),
                                r.jsx("div", {
                                    className: "reveal",
                                    "data-stagger": "1",
                                    children: r.jsx("p", {
                                        style: {
                                            fontSize: "clamp(18px, 1.6vw, 22px)",
                                            lineHeight: 1.55,
                                            margin: 0,
                                            color: "var(--fg)",
                                            textWrap: "pretty",
                                        },
                                        children:
                                            "A interface e as funcionalidades do e‑commerce estavam defasadas em relação à concorrência. Não havia consistência visual entre páginas, plataformas, App e Site — e nenhuma modularidade. Aplicar qualquer evolução técnica ou visual era extremamente complexo.",
                                    }),
                                }),
                            ],
                        }),
                        r.jsxs("section", {
                            className: "container",
                            children: [
                                r.jsxs("div", {
                                    className: "reveal egos-block",
                                    style: {
                                        background: "var(--bg-soft)",
                                        borderRadius: "var(--r-xl)",
                                        padding: "clamp(32px, 6vw, 80px)",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "clamp(24px, 4vw, 64px)",
                                        alignItems: "center",
                                    },
                                    children: [
                                        r.jsxs("div", {
                                            children: [
                                                r.jsx("div", {
                                                    className: "t-eyebrow",
                                                    style: { marginBottom: 16 },
                                                    children: "O desafio real",
                                                }),
                                                r.jsxs("p", {
                                                    style: {
                                                        fontSize: 20,
                                                        lineHeight: 1.5,
                                                        margin: 0,
                                                        color: "var(--fg)",
                                                        fontFamily: "var(--font-display)",
                                                        fontWeight: 500,
                                                        letterSpacing: "-0.01em",
                                                    },
                                                    children: [
                                                        "Você pode pensar que é difícil entender o usuário. ",
                                                        r.jsx("span", {
                                                            style: { color: "var(--accent-2)" },
                                                            children:
                                                                "Nossa maior dificuldade foi conciliar produto, tech e negócio",
                                                        }),
                                                        " — criar uma interface modular, consistente e desejada pelo usuário, mas viável de implementar sem atolar o backlog.",
                                                    ],
                                                }),
                                            ],
                                        }),
                                        r.jsxs("div", {
                                            style: {
                                                position: "relative",
                                                aspectRatio: "1 / 1",
                                                maxWidth: 400,
                                                margin: "0 auto",
                                                width: "100%",
                                            },
                                            children: [
                                                [
                                                    {
                                                        l: "Tech",
                                                        s: { top: "8%", left: "50%", transform: "translateX(-50%)" },
                                                    },
                                                    { l: "Negócio", s: { top: "55%", left: "0%" } },
                                                    { l: "Design", s: { top: "55%", right: "0%" } },
                                                    {
                                                        l: "Produto",
                                                        s: { bottom: "0%", left: "50%", transform: "translateX(-50%)" },
                                                    },
                                                ].map((t, n) =>
                                                    r.jsx(
                                                        "div",
                                                        {
                                                            style: {
                                                                position: "absolute",
                                                                ...t.s,
                                                                padding: "10px 18px",
                                                                borderRadius: 999,
                                                                border: "1px solid var(--line-strong)",
                                                                background: "var(--bg-elev)",
                                                                fontFamily: "var(--font-mono)",
                                                                fontSize: 13,
                                                                fontWeight: 500,
                                                            },
                                                            children: t.l,
                                                        },
                                                        n
                                                    )
                                                ),
                                                r.jsx("div", {
                                                    style: {
                                                        position: "absolute",
                                                        inset: "30%",
                                                        borderRadius: 999,
                                                        border: "2px dashed var(--accent)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontFamily: "var(--font-display)",
                                                        fontWeight: 600,
                                                        fontSize: 18,
                                                        color: "var(--accent-2)",
                                                    },
                                                    children: "Usuário",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                r.jsx("style", {
                                    children:
                                        "@media (max-width: 800px) { .egos-block { grid-template-columns: 1fr !important; } }",
                                }),
                            ],
                        }),
                        r.jsxs("section", {
                            className: "container section",
                            style: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "clamp(24px, 5vw, 80px)" },
                            children: [
                                r.jsx("aside", {
                                    className: "reveal",
                                    children: r.jsx("div", {
                                        className: "t-eyebrow",
                                        style: { marginBottom: 12 },
                                        children: "Estratégia",
                                    }),
                                }),
                                r.jsxs("div", {
                                    className: "reveal",
                                    "data-stagger": "1",
                                    children: [
                                        r.jsxs("h2", {
                                            style: {
                                                fontFamily: "var(--font-display)",
                                                fontSize: "clamp(28px, 4vw, 48px)",
                                                letterSpacing: "-0.02em",
                                                lineHeight: 1.05,
                                                fontWeight: 600,
                                                margin: 0,
                                                marginBottom: 24,
                                                textWrap: "balance",
                                            },
                                            children: [
                                                "Uma ",
                                                r.jsx("span", {
                                                    style: { fontStyle: "italic", color: "var(--accent-2)" },
                                                    children: "interface conceito",
                                                }),
                                                " à frente de seu tempo — implementada aos poucos.",
                                            ],
                                        }),
                                        r.jsx("p", {
                                            style: {
                                                fontSize: 17,
                                                lineHeight: 1.6,
                                                color: "var(--fg-soft)",
                                                maxWidth: "62ch",
                                                margin: 0,
                                            },
                                            children:
                                                "Desenvolvemos uma série de quick wins de aplicação imediata, traçando uma estratégia de curto, médio e longo prazo, respeitando a capacidade de cada squad. Mapeamos dores via NPS, CSAT e atendimento; entrevistamos lovers & haters; e paralelizamos desejos do usuário versus negócio com stakeholders.",
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        r.jsx("section", {
                            className: "container",
                            children: r.jsx("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                    gap: 0,
                                    borderTop: "1px solid var(--line)",
                                },
                                children: [
                                    ["230+", "telas funcionais — App e Site"],
                                    ["2 anos", "de backlog para as squads"],
                                    ["10", "entrevistas em profundidade"],
                                    ["1.000+", "respostas de NPS / CSAT analisadas"],
                                    ["+19%", "GMV em 2024 vs. 2023"],
                                    ["+127%", "vendas em pico (11/11)"],
                                ].map(([t, n], a) =>
                                    r.jsxs(
                                        "div",
                                        {
                                            className: "reveal",
                                            "data-stagger": Math.min(5, a),
                                            style: {
                                                padding: "32px 24px",
                                                borderRight: "1px solid var(--line)",
                                                borderBottom: "1px solid var(--line)",
                                            },
                                            children: [
                                                r.jsx("div", {
                                                    style: {
                                                        fontFamily: "var(--font-display)",
                                                        fontWeight: 700,
                                                        fontSize: "clamp(36px, 5vw, 72px)",
                                                        letterSpacing: "-0.04em",
                                                        lineHeight: 0.95,
                                                    },
                                                    children: t,
                                                }),
                                                r.jsx("div", {
                                                    className: "t-eyebrow",
                                                    style: { marginTop: 12 },
                                                    children: n,
                                                }),
                                            ],
                                        },
                                        a
                                    )
                                ),
                            }),
                        }),
                        r.jsxs("section", {
                            className: "container section",
                            children: [
                                r.jsxs("div", {
                                    className: "quote reveal",
                                    children: [
                                        r.jsx("div", { className: "quote-mark", "aria-hidden": "true", children: '"' }),
                                        r.jsx("p", {
                                            className: "quote-text",
                                            children:
                                                "Mensurar resultado pulverizado por anos é complexo, mas o crescimento do canal digital fala por si: o e‑commerce do grupo se consolidou como pilar da estratégia omnichannel, com R$ 35,7bi de GMV em 2024 (+19% YoY).",
                                        }),
                                        r.jsxs("div", {
                                            className: "quote-author",
                                            children: [
                                                r.jsx("span", {
                                                    className: "quote-author-avatar",
                                                    "aria-hidden": "true",
                                                }),
                                                r.jsxs("div", {
                                                    children: [
                                                        r.jsx("div", {
                                                            style: { color: "var(--fg)", fontWeight: 600 },
                                                            children: "Fonte",
                                                        }),
                                                        r.jsx("div", {
                                                            children: "Sala de imprensa do Grupo Boticário",
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                r.jsx("p", {
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 12,
                                        color: "var(--fg-mute)",
                                        marginTop: 24,
                                        textAlign: "center",
                                    },
                                    children: "* LGPD e diretrizes corporativas não permitem mostrar telas finais.",
                                }),
                            ],
                        }),
                        r.jsxs("section", {
                            className: "container section",
                            style: { borderTop: "1px solid var(--line)" },
                            children: [
                                r.jsx("div", {
                                    className: "t-eyebrow reveal",
                                    style: { marginBottom: 16, color: "var(--accent-2)" },
                                    children: "Bônus · IA aplicada",
                                }),
                                r.jsx("h2", {
                                    className: "reveal",
                                    style: {
                                        fontFamily: "var(--font-display)",
                                        fontSize: "clamp(28px, 4.5vw, 56px)",
                                        letterSpacing: "-0.025em",
                                        lineHeight: 1.05,
                                        fontWeight: 600,
                                        margin: 0,
                                        marginBottom: 32,
                                        textWrap: "balance",
                                    },
                                    children: "IA na descrição de imagens — acessibilidade que escala.",
                                }),
                                r.jsxs("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "clamp(24px, 4vw, 64px)",
                                    },
                                    className: "ai-grid",
                                    children: [
                                        r.jsxs("div", {
                                            className: "reveal",
                                            children: [
                                                r.jsx("div", {
                                                    className: "t-eyebrow",
                                                    style: { marginBottom: 8 },
                                                    children: "Problema",
                                                }),
                                                r.jsx("p", {
                                                    style: {
                                                        fontSize: 17,
                                                        lineHeight: 1.6,
                                                        color: "var(--fg-soft)",
                                                        margin: 0,
                                                    },
                                                    children:
                                                        "A equipe de content tinha dificuldade em criar alt text para banners e imagens — pouco tempo, baixa qualidade, prejudicando acessibilidade.",
                                                }),
                                            ],
                                        }),
                                        r.jsxs("div", {
                                            className: "reveal",
                                            "data-stagger": "1",
                                            children: [
                                                r.jsx("div", {
                                                    className: "t-eyebrow",
                                                    style: { marginBottom: 8 },
                                                    children: "Solução",
                                                }),
                                                r.jsx("p", {
                                                    style: {
                                                        fontSize: 17,
                                                        lineHeight: 1.6,
                                                        color: "var(--fg-soft)",
                                                        margin: 0,
                                                    },
                                                    children:
                                                        "Botão no backoffice que descreve a imagem via IA, calibrado por regras de negócio e listas de palavras proibidas. Trabalho conjunto de tech + design.",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                r.jsx("style", {
                                    children:
                                        "@media (max-width: 800px) { .ai-grid { grid-template-columns: 1fr !important; } }",
                                }),
                            ],
                        }),
                    ],
                }),
                r.jsx(Ma, {}),
            ],
        })
    );
}
const Rf = Vt.lazy(() =>
        Fd(() => import("./index-ewhffO5v.js"), __vite__mapDeps([0, 1])).then((e) => ({ default: e.WineApp }))
    ),
    Tf = null;
function Lf() {
    try {
        const e = localStorage.getItem("rn-theme");
        if (e === "light" || e === "dark") return e;
    } catch {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function xl() {
    const e = window.location.pathname.replace(/\/+$/, "");
    return e === "/cases/wine/rapida"
        ? "case-wine-rapida"
        : e === "/cases/wine"
          ? "case-wine"
          : e === "/wine/designsystem" || e.startsWith("/wine/designsystem/")
            ? "wine-ds"
            : e === "/designsystem" || e.startsWith("/designsystem/")
              ? "designsystem"
              : "portfolio";
}
function _f() {
    const [e, t] = z.useState(Lf),
        [n, a] = z.useState(xl);
    z.useEffect(() => {
        document.documentElement.dataset.theme = e;
        try {
            localStorage.setItem("rn-theme", e);
        } catch {}
    }, [e]),
        z.useEffect(() => {
            const o = () => a(xl());
            return window.addEventListener("popstate", o), () => window.removeEventListener("popstate", o);
        }, []);
    let s;
    n === "designsystem"
        ? (s = r.jsx(lf, { theme: e, setTheme: t }))
        : n === "case-wine"
          ? (s = r.jsx(gf, { theme: e, setTheme: t }))
          : n === "case-wine-rapida"
            ? (s = r.jsx(wf, { theme: e, setTheme: t }))
            : n === "case-detail-boticario"
              ? (s = r.jsx(Af, {}))
              : n === "wine-ds"
                ? (s = r.jsx(Vt.Suspense, { fallback: null, children: r.jsx(Rf, {}) }))
                : (s = r.jsx(Fm, { heroVariant: "overlay", initialTheme: e }));
    const i = Tf;
    return r.jsxs(r.Fragment, { children: [s, i] });
}
ds.createRoot(document.getElementById("root")).render(r.jsx(Vt.StrictMode, { children: r.jsx(_f, {}) }));
export { r as j, z as r };
