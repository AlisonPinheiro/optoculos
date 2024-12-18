!(function (e) {
    var t = {};
    function n(o) {
        if (t[o]) return t[o].exports;
        var i = (t[o] = { i: o, l: !1, exports: {} });
        return e[o].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    (n.m = e),
        (n.c = t),
        (n.d = function (e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
        }),
        (n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (n.t = function (e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if ((n.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                for (var i in e)
                    n.d(
                        o,
                        i,
                        function (t) {
                            return e[t];
                        }.bind(null, i)
                    );
            return o;
        }),
        (n.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return n.d(t, "a", t), t;
        }),
        (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.p = ""),
        n((n.s = 0));
})([
    function (e, t) {
        (window.FitMix = new (function () {
            var e = function () {
                var e,
                    t,
                    n,
                    o,
                    i,
                    a,
                    r,
                    s = !1,
                    d = !1,
                    m = this,
                    p = null;
                (this.init = function (r, s, d, p) {
                    if (((n = r), (e = s), (a = p), (i = d).cid && (console.warn("usage of cid is deprecated, use apiKey instead"), (i.apiKey = i.cid)), !i.apiKey)) throw new Error("apiKey required parameter missing");
                    i.fbxAnalyticsExternalId = i.fbxAnalyticsExternalId || window.fbxAnalyticsExternalId || "";
                    var h = n + "?htmlContainerId=" + e;
                    (h += "&apiKey=" + i.apiKey),
                        (m.iframe = document.createElement("iframe")),
                        m.iframe.setAttribute("src", h),
                        m.iframe.setAttribute("scrolling", "no"),
                        m.iframe.setAttribute("frameborder", 0),
                        m.iframe.setAttribute("id", "fitmixWidgetIframeContainer"),
                        m.iframe.setAttribute("width", i.width ? i.width : "100%"),
                        m.iframe.setAttribute("height", i.height ? i.height : "100%"),
                        m.iframe.setAttribute("allow", "camera");
                    if (i.popupIntegration) {
                        var l = "position:fixed; z-index: 1000;",
                            u = "bottom",
                            f = "18px",
                            g = "right",
                            w = "18px",
                            y = "400px",
                            x = "300px";
                        "top" == i.popupIntegration.vertical && (u = "top"),
                            "left" == i.popupIntegration.horizontal && (g = "left"),
                            i.popupIntegration.verticalOffset && (f = i.popupIntegration.verticalOffset),
                            i.popupIntegration.horizontalOffset && (w = i.popupIntegration.horizontalOffset),
                            i.popupIntegration.width && (y = i.popupIntegration.width),
                            i.popupIntegration.height && (x = i.popupIntegration.height),
                            (l += u + ": " + f + ";"),
                            (l += g + ": " + w + ";"),
                            (l += "width: " + y + ";"),
                            (l += "height: " + x + ";"),
                            i.popupIntegration.centeredHorizontal && (l += "margin: auto; left: 0px; right: 0px;"),
                            i.popupIntegration.centeredVertical && (l += "margin: auto; top: 0px; bottom: 0px;"),
                            (m.iframe.style.cssText = "position:absolute; left:0px; right: 0px; top: 0px; bottom: 0px; box-shadow: 0 0 4px 0 rgba(0,0,0,0.5)");
                        var b = document.createElement("div");
                        (b.style.cssText = "position:absolute; background:rgb(230,230,230); height: 28px; width: 28px; right: -14px; top: -14px; background: white; border-radius: 50px; box-shadow: 0 0 2px 0 rgba(0,0,0,0.5)"),
                            b.setAttribute("id", "fitmixPopupIntegrationMenu"),
                            b.addEventListener("click", function () {
                                m.popupHide();
                            });
                        var I = document.createElement("div");
                        (I.innerHTML = "&#x2715;"),
                            (I.style.cssText = "position:absolute; color:black; right: 7px; top: 3px; cursor: pointer; font-size: 16px;"),
                            b.appendChild(I),
                            (m.frameContainer = document.createElement("div")),
                            (m.frameContainer.className = "frameContainer"),
                            (m.frameContainer.style.cssText = l),
                            m.frameContainer.appendChild(m.iframe),
                            m.frameContainer.appendChild(b);
                        var S =
                                "@media screen and (max-width:" +
                                y +
                                ") , (max-height:" +
                                x +
                                ")" +
                                "{#fitmixPopupIntegrationMenu { top: -14px !important; left: 0px !important; right: 0px !important; margin: auto; } .frameContainer {bottom: 0px !important;left: 0px !important;right: 0px !important;top: 20px !important;width: initial !important;height: initial !important; }} } }",
                            v = document.createElement("style");
                        (v.type = "text/css"), v.appendChild(document.createTextNode(S)), document.head.appendChild(v), (m.addedToDocument = !1);
                    } else {
                        if (!(t = document.getElementById(e))) throw new Error("element with id " + e + " does not exist");
                        for (; t.firstChild; ) t.removeChild(t.firstChild);
                        t.appendChild(m.iframe), (o = m.iframe.contentWindow);
                    }
                    window.addEventListener("message", c);
                }),
                    (this.popupInit = function () {
                        i.popupIntegration
                            ? m.addedToDocument
                                ? console.log("popup already ready")
                                : ((m.frameContainer.style.display = "none"), document.body.appendChild(m.frameContainer), (o = m.iframe.contentWindow), (m.addedToDocument = !0))
                            : console.log("available only with popupIntegration option");
                    }),
                    (this.popupHide = function () {
                        i.popupIntegration ? ((m.frameContainer.style.display = "none"), m.closeCamera()) : console.log("available only with popupIntegration option");
                    }),
                    (this.popupShow = function () {
                        i.popupIntegration
                            ? (m.addedToDocument ? m.openCamera() : (document.body.appendChild(m.frameContainer), (o = m.iframe.contentWindow), (m.addedToDocument = !0)), (m.frameContainer.style.display = "block"))
                            : console.log("available only with popupIntegration option");
                    }),
                    (this.setInitializeOptions = function (e) {
                        if (!o) throw new Error('call "init" method first');
                        var t = { methods: [] };
                        for (var n in e) "function" != typeof e[n] ? (t[n] = e[n]) : t.methods.push(n);
                        h({ method: "setInitializeOptions", params: t });
                    }),
                    (this.getVersion = function () {
                        return o && h({ method: "getVersion" }), "8.3.0";
                    }),
                    (this.openCamera = function (e) {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "openCamera", params: e });
                    }),
                    (this.pauseStream = function () {
                        h({ method: "pauseStream" });
                    }),
                    (this.resumeStream = function () {
                        h({ method: "resumeStream" });
                    }),
                    (this.startStream = function () {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "startStream" });
                    }),
                    (this.stopStream = function () {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "stopStream" });
                    }),
                    (this.closeCamera = function () {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "closeCamera" });
                    }),
                    (this.startTryOn = function () {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "startTryOn" });
                    }),
                    (this.stopTryOn = function () {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "stopTryOn" });
                    }),
                    (this.clearFrameInfo = function () {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "clearFrameInfo", params: null });
                    }),
                    (this.setFrameInfo = function (e) {
                        if (i.popupIntegration) {
                            if (!m.addedToDocument)
                                return (
                                    (p = function () {
                                        m.setFrameInfo(e);
                                    }),
                                    document.body.appendChild(m.frameContainer),
                                    (o = m.iframe.contentWindow),
                                    void (m.addedToDocument = !0)
                                );
                            m.popupShow();
                        }
                        h({ method: "setFrameInfo", params: e });
                    }),
                    (this.setFrame = function (e, t) {
                        m.setFrameInfo({ id: e, dataType: t });
                    }),
                    (this.setFrameID = function (e, t, n) {
                        m.setFrameInfo({ dataId: e, dataKey: t, dataType: n });
                    }),
                    (this.setTryonPicture = function (e, t) {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "setTryonPicture", params: { imgData: e, options: t } });
                    }),
                    (this.setLang = function (e) {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "setLang", params: { lang: e } });
                    }),
                    (this.setUiConfiguration = function (e) {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "setUiConfiguration", params: e });
                    }),
                    (this.getFrameDataById = function (e) {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "getFrameDataById", params: e });
                    }),
                    (this.getFrameDataBySku = function (e) {
                        console.log("getFrameDataBySku deprecated, use getFrameDataById instead"), m.getFrameDataById(e);
                    }),
                    (this.setFrameData = function (e) {
                        m.setFrameInfo(e);
                    }),
                    (this.loadEnvironmentMap = function (e) {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "loadEnvironmentMap", params: e });
                    }),
                    (this.addCss = function (e) {
                        if (!o) throw new Error('call "init" method first');
                        h({ method: "addCss", params: { styles: e } });
                    }),
                    (this.setCss = function (e) {
                        m.addCss(e);
                    }),
                    (this.remove = function (e) {
                        window.removeEventListener("message", c);
                        var n = t.firstChild;
                        n &&
                            ((n.onload = function () {
                                t.removeChild(n), (n = null), e && e();
                            }),
                            (n.src = "data:text/html;charset=utf-8,%3Chtml%3E%3Cbody%3E%3C/body%3E%3C/html%3E"));
                    }),
                    (this.getStatus = function () {
                        return r;
                    }),
                    (this.setMode = function (e) {
                        return !!d && (h({ method: "setMode", params: { mode: e } }), !0);
                    }),
                    (this.externalPhotoRender = function (e) {
                        h({ method: "externalPhotoRender", params: e });
                    }),
                    (this.setLensesAntireflection = function (e) {
                        d && h({ method: "setLensesAntireflection", params: { enable: e } });
                    }),
                    (this.setLensesInSolarMode = function () {
                        d && h({ method: "setLensesInSolarMode" });
                    }),
                    (this.setLensesInOpticalMode = function () {
                        d && h({ method: "setLensesInOpticalMode" });
                    }),
                    (this.setLensesInTintedMode = function (e, t, n, o) {
                        d && h({ method: "setLensesInTintedMode", params: { red: e, green: t, blue: n, alpha: o } });
                    }),
                    (this.setLensesInTintedMirrorMode = function (e, t, n, o, i, a, r, s) {
                        d && h({ method: "setLensesInTintedMirrorMode", params: { red: e, green: t, blue: n, alpha: o, specularRed: i, specularGreen: a, specularBlue: r, glossiness: s } });
                    }),
                    (this.setLensesPhotochromicWeight = function (e) {
                        d && h({ method: "setLensesPhotochromicWeight", params: { weight: e } });
                    }),
                    (this.registerLensesAnimation = function (e) {
                        d && h({ method: "registerLensesAnimation", params: e });
                    }),
                    (this.playLensesAnimation = function (e) {
                        d && h({ method: "playLensesAnimation", params: e });
                    }),
                    (this.setLensesAnimationPercentage = function (e) {
                        d && h({ method: "setLensesAnimationPercentage", params: e });
                    }),
                    (this.stopLensesAnimation = function () {
                        d && h({ method: "stopLensesAnimation" });
                    }),
                    (this.restoreLensesInitialMaterial = function () {
                        d && h({ method: "restoreLensesInitialMaterial" });
                    }),
                    (this.setPupillaryDistance = function (e) {
                        m.setUserInfo({ pupillaryDistance: e });
                    }),
                    (this.setUserInfo = function (e) {
                        h({ method: "setUserInfo", params: e });
                    }),
                    (this.setFramesPatternCoordinates = function (e) {
                        console.log("setFramesPatternCoordinates is deprecated");
                    }),
                    (this.setFramesPatternAvatar = function (e) {
                        console.log("setFramesPatternCoordinates is deprecated");
                    }),
                    (this.resetLive = function () {
                        d && h({ method: "resetLive" });
                    }),
                    (this.resetSession = function () {
                        h({ method: "resetSession" });
                    }),
                    (this.getSnapshot = function () {
                        h({ method: "getSnapshot" });
                    }),
                    (this.profileLive = function (e) {
                        h({ method: "profileLive", params: e });
                    }),
                    (this.completeProfile = function () {
                        h({ method: "completeProfile" });
                    }),
                    (this.getGrabbingImage = function () {
                        h({ method: "getGrabbingImage" });
                    }),
                    (this.resetDetection = function () {
                        h({ method: "resetDetection" });
                    }),
                    (this.setVideoGrabber = function () {
                        d && h({ method: "setVideoGrabber" });
                    }),
                    (this.setVideoSequence = function (e) {
                        d && h({ method: "setVideoSequence", params: e });
                    }),
                    (this.setVideoImage = function (e) {
                        d && h({ method: "setVideoImage", params: e });
                    }),
                    (this.setGrabberLiveMode = function () {
                        d && h({ method: "setGrabberLiveMode" });
                    }),
                    (this.getAnatomicalFitScore = function (e) {
                        d && h({ method: "getAnatomicalFitScore", params: e });
                    }),
                    (this.getFaceshape = function (e) {
                        d && h({ method: "getFaceshape", params: e });
                    }),
                    (this.resetFaceshape = function (e) {
                        d && h({ method: "resetFaceshape", params: e });
                    }),
                    (this.fsendDirect = function (e) {
                        h({ method: "fsendDirect", params: e });
                    }),
                    (this.reinitialize = function (e) {
                        h({ method: "reinitialize", params: e });
                    });
                var h = function (t) {
                        (t.from = e), o && o.postMessage(t, n);
                    },
                    c = function (t) {
                        var n = t.data;
                        if (n.from === e) {
                            var o,
                                h = n.method,
                                c = n.params;
                            if (("getOptions" === h && m.setInitializeOptions(i), s || "connect" !== h))
                                "disconnect" === h
                                    ? (s = !1)
                                    : "status" === h
                                    ? ((r = c.status), i.onStatus && i.onStatus(r))
                                    : "onModePhoto" === h
                                    ? i.onModePhoto && i.onModePhoto()
                                    : "onModeLive" === h
                                    ? i.onModeLive && i.onModeLive()
                                    : "onModeFaceshape" === h
                                    ? i.onModeFaceshape && i.onModeFaceshape()
                                    : "onPhotoRender" === h
                                    ? i.onPhotoRender && i.onPhotoRender(c)
                                    : "onExternalPhotoRender" === h
                                    ? i.onExternalPhotoRender && i.onExternalPhotoRender(c)
                                    : "onLiveStatus" === h
                                    ? i.onLiveStatus && i.onLiveStatus(c)
                                    : "onSnapshot" === h
                                    ? i.onSnapshot && i.onSnapshot(c)
                                    : "onProfileLive" === h
                                    ? i.onProfileLive && i.onProfileLive(c)
                                    : "onCompleteProfile" === h
                                    ? i.onCompleteProfile && i.onCompleteProfile(c)
                                    : "onGrabbingImage" === h
                                    ? i.onGrabbingImage && i.onGrabbingImage(c)
                                    : "onSetFramesPatternCoordinates" === h
                                    ? i.onSetFramesPatternCoordinates && i.onSetFramesPatternCoordinates(c)
                                    : "onGetFrameDataById" === h
                                    ? i.onGetFrameDataById
                                        ? i.onGetFrameDataById(c)
                                        : i.onGetFrameDataBySku && (console.log("onGetFrameDataBySku deprecated, use onGetFrameDataById instead"), i.onGetFrameDataBySku(c))
                                    : "onUiStatus" === h
                                    ? i.onUiStatus && i.onUiStatus(c)
                                    : "onSetObjectLoading" === h
                                    ? i.onSetObjectLoading && i.onSetObjectLoading(c)
                                    : "onLensesAnimationPlay" === h
                                    ? i.onLensesAnimationPlay && i.onLensesAnimationPlay(c)
                                    : "onOpenStream" === h
                                    ? i.onOpenStream && i.onOpenStream(c)
                                    : "onSwipe" === h
                                    ? i.onSwipe && i.onSwipe(c)
                                    : "onGetAnatomicalFitScore" === h
                                    ? i.onGetAnatomicalFitScore && i.onGetAnatomicalFitScore(c)
                                    : "onFaceShape" === h
                                    ? i.onFaceShape && i.onFaceShape(c)
                                    : "onGetFaceshape" === h
                                    ? i.onGetFaceshape && i.onGetFaceshape(c)
                                    : "onGetVersion" === h && i.onGetVersion && ((c["fitmix-api"] = "8.3.0"), i.onGetVersion(c));
                            else (s = !0), c && ((d = c.liveSupported), (o = c.advanced)), p && p(), a && a(d, o);
                        } else n.method;
                    };
            };
            (this.WIDGET_BASE_URL = "https://static.fittingbox.com"),
                (this.createWidget = function (t, n, o) {
                    if (!(-1 !== navigator.userAgent.indexOf("MSIE") || navigator.appVersion.indexOf("Trident/") > -1)) {
                        var i = new e();
                        try {
                            n.widgetUrl ? i.init(n.widgetUrl, t, n, o) : i.init(this.WIDGET_BASE_URL + "/widgets/fitmix/index.html", t, n, o);
                        } catch (e) {
                            throw new Error("FitMix.createWidget: " + e.message + " (please refer to integration documentation)");
                        }
                        return i;
                    }
                    setTimeout(function () {
                        document.getElementById(t).textContent = " Internet explorer is not supported.";
                    }, 1e3);
                }),
                (this.waitResource = function (e, t, n) {
                    if ((n || (n = { timeout: 1500 }), window["wait_" + e + "_TimerStart"])) {
                        if (new Date() - window["wait_" + e + "_TimerStart"] > n.timeout) return console.log("Waiting of", e, "has reach timeout"), delete window["wait_" + e + "_TimerStart"], void t();
                    } else window["wait_" + e + "_TimerStart"] = new Date();
                    window[e]
                        ? (console.log(e, "is now defined"), delete window["wait_" + e + "_TimerStart"], t())
                        : setTimeout(function () {
                              window.FitMix.waitResource(e, t, n);
                          }, 100);
                });
        })()),
            (e.exports = FitMix);
    },
]);
