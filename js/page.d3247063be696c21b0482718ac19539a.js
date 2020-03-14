!function(s, i) {
    "use strict";
    "undefined" == typeof s.smg && (s.smg = {}),
    "undefined" == typeof s.smg.aem && (s.smg.aem = {}),
    "undefined" == typeof s.smg.aem.components && (s.smg.aem.components = {}),
    "undefined" == typeof s.smg.aem.components.rowset && (s.smg.aem.components.rowset = {});
    var e = s.smg.aem.varStatic
      , t = s.smg.aem.util
      , n = s.smg.aem.components.rowset;
    n.fourColumnLinks = function() {
        var n = {
            wrap: ".four-column-links",
            carousel: {
                wrap: ".js-four-column-links-carousel",
                slickOpts: {
                    rtl: i("html").hasClass("rtl"),
                    speed: 500,
                    useTransform: !0,
                    dots: !0,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: !0,
                    touchThreshold: 10,
                    adaptiveHeight: !0,
                    responsive: [{
                        breakpoint: e.RESPONSIVE.TABLET.WIDTH + 1,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: !1
                        }
                    }, {
                        breakpoint: e.RESPONSIVE.MOBILE.WIDTH + 1,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: !1
                        }
                    }]
                }
            },
            onSingleClass: "s-single-slide"
        };
        return {
            init: function(s, o) {
                (this.container = s).size() && (this.opts = t.def(n, o || {}),
                this.opts.carousel.slickOpts.speed = i("body").hasClass(e.SUPPORT.TOUCH_DEVICE) ? 150 : 500,
                this.setElements(),
                this.setBindEvents(),
                this.setSlick())
            },
            setElements: function() {
                this.IE_LT_8 = i("body").hasClass(e.SUPPORT.IE_LT_8),
                this.wrap = this.container.find(this.opts.wrap),
                this.carousel = this.wrap.find(this.opts.carousel.wrap)
            },
            setBindEvents: function() {
                navigator.userAgent.match(/iPhone/i) && i(s).on("orientationchange", i.proxy(this.slickVwRender, this))
            },
            setSlick: function() {
                this.carousel.on("init", i.proxy(this.onSlickInit, this)),
                this.carousel.slick(this.opts.carousel.slickOpts),
                this.IE_LT_8 && (this.carousel.on("beforeChange", i.proxy(function() {
                    this.onResizeListener()
                }, this)),
                this.carousel.on("afterChange", i.proxy(function() {
                    this.onResizeListener()
                }, this)),
                i(s).on("resize", i.proxy(this.onResizeListener, this)),
                this.onResizeListener())
            },
            onSlickInit: function(s, e) {
                1 === e.slideCount && i(e.$slider).addClass(this.opts.onSingleClass)
            },
            getSlidePadding: function() {
                var s = 1440
                  , i = 769
                  , e = 70
                  , n = 30
                  , o = (e - n) / (s - i)
                  , r = e - (s - t.winSize().w) * o;
                return Math.min(r, e)
            },
            onResizeListener: function() {
                var s = t.winSize().w
                  , i = (this.carousel.outerWidth(),
                this.carousel.find(".slick-slide"));
                if (768 >= s)
                    i.css({
                        padding: ""
                    });
                else {
                    var e = this.getSlidePadding();
                    i.css({
                        padding: "0 " + e + "px"
                    })
                }
            },
            slickVwRender: function() {
                var s = this;
                i.each(this.carousel, function() {
                    var e = i(this).slick("slickCurrentSlide");
                    i(this).slick("unslick").slick(s.opts.carousel.slickOpts),
                    e && i(this).slick("slickGoTo", e, !0)
                })
            }
        }
    }(),
    i(function() {})
}(window, window.jQuery);
!function(e, t) {
    if (!(t("#pd-semi-related-insights").length <= 0)) {
        "undefined" == typeof e.smg.aem.semi && (e.smg.aem.semi = {}),
        "undefined" == typeof e.smg.aem.semi.page && (e.smg.aem.semi.page = {}),
        "undefined" == typeof e.smg.aem.semi.page.util && (e.smg.aem.semi.page.util = {});
        var i = e.smg.aem.semi.page.util
          , n = t("#scene7domain").val()
          , a = "";
        a = "page-solution" === t("#tempTitle").val() ? "solutions" : "products";
        var s = Granite.HTTP.getPath();
        s = s.replace("/content/samsung", "").replace("/" + I18N_HINT, "").replace("/" + I18N_HINT.replace("-", "/"), "");
        var l = s.charAt(s.length - 1);
        "/" === l && (s = s.slice(0, -1));
        var r = new Object
          , m = new Array;
        r.path = s,
        m.push(r);
        for (var o = s.split("/"), g = o.length - 1; g > 0; g--) {
            var u = o[g];
            if ("" !== u) {
                var r = new Object;
                s = s.substring(0, s.length - (u.length + 1)),
                "" !== s && (r.path = s,
                m.push(r))
            }
        }
        var c = "semi";
        "cn" == siteCode && (c = "semicn");
        var h = "site=" + c + "&page=pcd&count=4&" + a + "=" + encodeURIComponent(JSON.stringify(m));
        t.ajax({
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "jQuery1910499421933433041_1385598221584",
            cache: !0,
            timeout: 2e4,
            url: t("#newSearchDomain").val() + "/insightdetail",
            data: h,
            success: function(e) {
                200 === e.response.statusCode && drawRelatedInsights(e.response.resultData.resultList)
            }
        }),
        drawRelatedInsights = function(a) {
            var s = "";
            if (null !== a) {
                for (var l = a[0].relatedInsightContentList, r = 0; r < l.length; r++) {
                    var m = l[r].modelList[0]
                      , o = m.modelDesc;
                    null === o && (o = "");
                    var g = l[r].contentsInfo.toLowerCase()
                      , u = m.kvTitle;
                    (null === u || "" === u) && (u = l[r].title);
                    var c = i.getLinkUrl(m.linkURL);
                    s += '<div class="four-column-links__slide">',
                    s += '<div class="four-column-links__img-wrap">',
                    s += '<a href="' + c + '"  data-omni="' + g + '_image" title="Go to Insight, ' + u + " " + g + ' Page">',
                    s += '<img class="js-img-src js-img-lazy" width="298" height="200" alt="' + m.thumbUrlAlt + '"',
                    s += 'data-src-pc="' + thumbUrlChk(imgDomain(n, m.thumbUrl)) + '"',
                    s += 'data-src-mobile="' + thumbUrlChk(imgDomain(n, m.thumbUrl)) + '"',
                    s += 'src="' + thumbUrlChk(imgDomain(n, m.thumbUrl)) + '">',
                    s += "<noscript>",
                    s += '<img alt="' + m.thumbUrlAlt + '" src="' + thumbUrlChk(imgDomain(n, m.thumbUrl)) + '">',
                    s += "</noscript>",
                    s += "</a>",
                    s += "</div>",
                    s += '<div class="four-column-links__text-wrap">',
                    s += '<a href="' + c + '" data-omni="' + g + '_link" title="Go to Insight, ' + u + " " + g + ' Page"><h3 class="four-column-links__slide-title">' + u + "</h3></a>",
                    s += '<p class="four-column-links__text-body">' + o + "</p>",
                    s += '<a href="' + c + '" data-omni="' + g + '_learn more"  class="four-column-links__text-link" title="Go to Insight,  ' + u + " " + g + ' Page">' + Granite.I18n.get("LEARN MORE", null, I18N_HINT) + "</a>",
                    s += "</div>",
                    s += "</div>"
                }
                t("#relatedInsights").html(s)
            } else
                t("#pd-semi-related-insights").hide();
            e.smg.aem.components.rowset.fourColumnLinks.init(t("body"))
        }
        ,
        imgDomain = function(e, t) {
            var i = "";
            return null !== t && "" !== t && (i = t.indexOf("http:") > -1 ? t : e + t),
            i
        }
        ,
        thumbUrlChk = function(e) {
            return e.indexOf(".jpg") > -1 ? e.indexOf("$ORIGIN_JPG$") < 0 && (e = e.replace(".jpg", ".jpg?$ORIGIN_JPG$")) : e.indexOf(".png") > -1 && e.indexOf("$ORIGIN_PNG$") < 0 && (e = e.replace(".png", ".png?$ORIGIN_PNG$")),
            e
        }
    }
}(window, $);
!function(s, i) {
    "use strict";
    "undefined" == typeof s.smg && (s.smg = {}),
    "undefined" == typeof s.smg.aem && (s.smg.aem = {}),
    "undefined" == typeof s.smg.aem.components && (s.smg.aem.components = {}),
    "undefined" == typeof s.smg.aem.components.rowset && (s.smg.aem.components.rowset = {});
    var t = s.smg.aem.varStatic
      , e = s.smg.aem.util
      , n = s.smg.aem.components.rowset;
    n.fourColumnLinksStatic = function() {
        var n = {
            wrap: ".four-column-links-static",
            carousel: {
                wrap: ".js-four-column-links-static-carousel",
                slickOpts: {
                    rtl: i("html").hasClass("rtl"),
                    speed: 500,
                    useTransform: !0,
                    dots: !0,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: !0,
                    touchThreshold: 10,
                    adaptiveHeight: !0,
                    responsive: [{
                        breakpoint: t.RESPONSIVE.TABLET.WIDTH + 1,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: !1
                        }
                    }, {
                        breakpoint: t.RESPONSIVE.MOBILE.WIDTH + 1,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: !1
                        }
                    }]
                }
            },
            onSingleClass: "s-single-slide"
        };
        return {
            init: function(s, o) {
                (this.container = s).size() && (this.opts = e.def(n, o || {}),
                this.opts.carousel.slickOpts.speed = i("body").hasClass(t.SUPPORT.TOUCH_DEVICE) ? 150 : 500,
                this.setElements(),
                this.setBindEvents(),
                this.setSlick())
            },
            setElements: function() {
                this.IE_LT_8 = i("body").hasClass(t.SUPPORT.IE_LT_8),
                this.wrap = this.container.find(this.opts.wrap),
                this.carousel = this.wrap.find(this.opts.carousel.wrap)
            },
            setBindEvents: function() {
                navigator.userAgent.match(/iPhone/i) && i(s).on("orientationchange", i.proxy(this.slickVwRender, this))
            },
            setSlick: function() {
                this.carousel.on("init", i.proxy(this.onSlickInit, this)),
                this.carousel.slick(this.opts.carousel.slickOpts),
                this.IE_LT_8 && (this.carousel.on("beforeChange", i.proxy(function() {
                    this.onResizeListener()
                }, this)),
                this.carousel.on("afterChange", i.proxy(function() {
                    this.onResizeListener()
                }, this)),
                i(s).on("resize", i.proxy(this.onResizeListener, this)),
                this.onResizeListener())
            },
            onSlickInit: function(s, t) {
                1 === t.slideCount && i(t.$slider).addClass(this.opts.onSingleClass)
            },
            getSlidePadding: function() {
                var s = 1440
                  , i = 769
                  , t = 70
                  , n = 30
                  , o = (t - n) / (s - i)
                  , r = t - (s - e.winSize().w) * o;
                return Math.min(r, t)
            },
            onResizeListener: function() {
                var s = e.winSize().w
                  , i = (this.carousel.outerWidth(),
                this.carousel.find(".slick-slide"));
                if (768 >= s)
                    i.css({
                        padding: ""
                    });
                else {
                    var t = this.getSlidePadding();
                    i.css({
                        padding: "0 " + t + "px"
                    })
                }
            },
            slickVwRender: function() {
                var s = this;
                i.each(this.carousel, function() {
                    var t = i(this).slick("slickCurrentSlide");
                    i(this).slick("unslick").slick(s.opts.carousel.slickOpts),
                    t && i(this).slick("slickGoTo", t, !0)
                })
            }
        }
    }(),
    i(function() {
        n.fourColumnLinksStatic.init(i("body"))
    })
}(window, window.jQuery);
!function(t, e) {
    "use strict";
    "undefined" == typeof t.smg && (t.smg = {}),
    "undefined" == typeof t.smg.aem && (t.smg.aem = {}),
    "undefined" == typeof t.smg.aem.components && (t.smg.aem.components = {}),
    "undefined" == typeof t.smg.aem.components.shop && (t.smg.aem.components.shop = {});
    var i = t.smg.aem.varStatic
      , s = t.smg.aem.util
      , n = t.smg.aem.components.shop;
    n.featureStandard = function() {
        var n = e(window)
          , o = (n.height(),
        function() {
            return e("body", parent.document).find("#ContentScrollView").length
        }())
          , r = !1
          , a = {
            wrap: ".feature-standard",
            orientation: "vertical",
            element: ".animation-element",
            leftData: "s-img-align-left",
            rightData: "s-img-align-right",
            carousel: {
                wrap: ".js-feature-standard-carousel",
                slickOpts: {
                    rtl: e("html").hasClass("rtl"),
                    dots: !0,
                    infinite: !1,
                    speed: 500,
                    arrows: !0,
                    adaptiveHeight: !0,
                    responsive: [{
                        breakpoint: i.RESPONSIVE.MOBILE.WIDTH + 1,
                        settings: {
                            arrows: !1
                        }
                    }]
                }
            },
            popArea: {
                openBtns: ".js-pop-btn",
                closeBtns: ".js-pop-close"
            }
        };
        return {
            init: function(t, e) {
                (this.container = t).size() && (this.opts = s.def(a, e || {}),
                this.setElements(),
                this.setBindEvents(),
                this.setSlick(),
                this.checkIn())
            },
            setElements: function() {
                this.wrap = e(this.opts.wrap),
                this.carousel = this.wrap.find(this.opts.carousel.wrap),
                this.animationElements = this.wrap.find(this.opts.element),
                this.animationClass = this.opts.animation,
                this.eLeftNum = 0,
                this.eRightNum = 0,
                this.resizeTimeout = null
            },
            setBindEvents: function() {
                e(t).on("resize scroll", e.proxy(this.checkIn, this)),
                r || (r = !0,
                o ? e(t).on("resize orientationchange", e.proxy(this.onResizeListener, this)) : (e(t).on("resize orientationchange", e.proxy(this.onResizeListener, this)),
                e(t).on("load", e.proxy(this.setArrowPosition, this))))
            },
            setArrowPosition: function(i) {
                var s, n, o, r, a, c, h, l, d, p, f;
                this.wrap.find(".slick-arrow").css("top", "auto");
                for (var u = 0; u < this.carousel.length; u++)
                    if (s = this.carousel.eq(u),
                    l = s.outerHeight(!0),
                    a = s.find(".slick-active"),
                    o = a.find(".feature-standard__text-wrap"),
                    n = o.next().find(".js-img-src"),
                    r = s.find(".slick-arrow"),
                    d = r.height(),
                    f = parseInt(r.css("bottom")),
                    p = s.closest(this.opts.wrap).find(".feature-standard__disclaimer-wrap").height(),
                    n.length) {
                        h = parseInt(s.css("paddingBottom")),
                        c = n.height() / 2 - d / 2 + h,
                        e(t).off("resize orientationchange", e.proxy(this.onResizeListener, this));
                        var m = this;
                        r.animate({
                            bottom: c,
                            avoidCSSTransitions: !0
                        }, {
                            duration: this.opts.carousel.slickOpts.speed,
                            complete: function() {
                                setTimeout(function() {
                                    e(t).on("resize orientationchange", e.proxy(m.onResizeListener, m))
                                }, 300)
                            }
                        })
                    } else {
                        c = l / 2 + p - d / 2,
                        e(t).off("resize orientationchange", e.proxy(this.onResizeListener, this));
                        var m = this;
                        r.animate({
                            bottom: c,
                            avoidCSSTransitions: !0
                        }, {
                            duration: this.opts.carousel.slickOpts.speed,
                            complete: function() {
                                setTimeout(function() {
                                    e(t).on("resize orientationchange", e.proxy(m.onResizeListener, m))
                                }, 300)
                            }
                        })
                    }
            },
            setSlick: function() {
                for (var t = 0; t < this.carousel.length; t++)
                    this.carousel.eq(t).hasClass("slick-initialized") || this.carousel.eq(t).on("init", e.proxy(this.slickInit, this)).slick(this.opts.carousel.slickOpts).on("beforeChange", e.proxy(this.onBeforeChange, this)).on("afterChange", e.proxy(this.slidecomPleteFunc, this))
            },
            onBeforeChange: function(i, s, n, o) {
                if (n !== o) {
                    var r, a = e(s.$slides), c = a.filter('[data-slick-index="' + n + '"]'), h = e(s.$slider), o = a.filter('[data-slick-index="' + o + '"]'), l = h.find(".slick-arrow"), d = c.find(".feature-standard__text-wrap"), p = o.find(".feature-standard__text-wrap"), f = p.next().find(".js-img-src"), u = d.next().find(".js-img-src"), m = l.height(), g = (parseInt(l.css("bottom")),
                    o.closest(this.opts.wrap).find(".feature-standard__disclaimer-wrap").height()), w = g + h.find(".slick-dots").height() + parseInt(h.find(".slick-dots").css("bottom")), v = o.outerHeight(!0), k = parseInt(h.css("paddingBottom"));
                    if (!u.length && f.length || u.length && f.length) {
                        r = f.height() / 2 - m / 2 + k,
                        e(t).off("resize orientationchange", e.proxy(this.onResizeListener, this));
                        var x = this;
                        l.animate({
                            bottom: r,
                            avoidCSSTransitions: !0
                        }, {
                            duration: this.opts.carousel.slickOpts.speed,
                            complete: function() {
                                setTimeout(function() {
                                    e(t).on("resize orientationchange", e.proxy(x.onResizeListener, x))
                                }, 300)
                            }
                        })
                    } else if (!u.length && !f.length || u.length && !f.length) {
                        r = (v + w) / 2 - l.height() / 2 + g,
                        e(t).off("resize orientationchange", e.proxy(this.onResizeListener, this));
                        var x = this;
                        l.animate({
                            bottom: r,
                            avoidCSSTransitions: !0
                        }, {
                            duration: this.opts.carousel.slickOpts.speed,
                            complete: function() {
                                setTimeout(function() {
                                    e(t).on("resize orientationchange", e.proxy(x.onResizeListener, x))
                                }, 300)
                            }
                        })
                    }
                    window.bcjQuery ? window.bcjQuery(c).find(this.opts.popArea.closeBtns).trigger("click") : c.find(this.opts.popArea.closeBtns).trigger("click")
                }
            },
            slickInit: function(t, i) {
                var s = e(t.currentTarget)
                  , n = s.find(".slick-prev")
                  , o = s.find(".slick-next")
                  , r = s.find("." + i.options.dotsClass)
                  , a = r.children();
                n.attr("data-omni", "feature benefit:left_arrow"),
                o.attr("data-omni", "feature benefit:right_arrow");
                for (var c = 0; c < a.length; c++)
                    !function(t) {
                        a.eq(t).find("button").attr("data-omni", "feature benefit rolling:index_" + (t + 1))
                    }(c);
                e(i.$list).closest(this.opts.carousel.wrap).size() && (e(i.$slides).find(".s-view-video").off("click", e.proxy(this.onSlickVideoClick, this)),
                e(i.$slides).find(".s-view-video").on("click", e.proxy(this.onSlickVideoClick, this)))
            },
            onSlickVideoClick: function(t) {
                t.preventDefault();
                var i, s, n = e(t.currentTarget), o = n.find(".js-video");
                o.size() && (i = o.data("vid-data"),
                s = e("#" + i.divID),
                s.size() && (s.attr("tabindex", -1),
                s.focus()))
            },
            onResizeListener: function() {
                t.clearTimeout(this.resizeTimeout),
                this.resizeTimeout = t.setTimeout(e.proxy(function() {
                    this.setArrowPosition(!0)
                }, this), 300)
            },
            slidecomPleteFunc: function() {
                "undefined" != typeof t.smg.aem.components.product && ("undefined" != typeof t.smg.aem.components.product.productAnchorNavNonPirce && t.smg.aem.components.product.productAnchorNavNonPirce.scrollManager.setTargetPosition(),
                "undefined" != typeof t.smg.aem.components.product.productAnchorNav && t.smg.aem.components.product.productAnchorNav.scrollManager.setTargetPosition())
            },
            checkIn: function() {
                var t = this
                  , i = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
                  , s = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + i;
                e.each(t.animationElements, function() {
                    var n = e(this)
                      , o = n.closest(".feature-standard")
                      , r = n.outerHeight()
                      , a = n.offset().top
                      , c = n.css("left")
                      , h = a + r;
                    if (h >= i && s >= a + r / 2) {
                        if (o.hasClass(t.opts.rightData)) {
                            if ("20px" == c) {
                                if ("-webkit-transform" == n.css("transition-property"))
                                    return;
                                n.animate({
                                    left: "0px"
                                }, 1e3),
                                t.eLeftNum = 1
                            }
                        } else if (o.hasClass(t.opts.leftData) && 0 == t.eRightNum) {
                            if ("-webkit-transform" == n.css("transition-property"))
                                return;
                            n.animate({
                                left: "0px"
                            }, 1e3),
                            t.eRightNum = 1
                        }
                    } else
                        (i > h || a > s) && (o.hasClass(t.opts.rightData) ? (n.css({
                            left: "20px"
                        }),
                        t.eLeftNum = 0) : o.hasClass(t.opts.leftData) && (n.css({
                            left: "-20px"
                        }),
                        t.eRightNum = 0))
                })
            }
        }
    }(),
    e(function() {
        n.featureStandard.init(e("body"))
    })
}(window, window.jQuery);
!function(t, a) {
    "use strict";
    "undefined" == typeof t.smg && (t.smg = {}),
    "undefined" == typeof t.smg.aem && (t.smg.aem = {}),
    "undefined" == typeof t.smg.aem.components && (t.smg.aem.components = {}),
    "undefined" == typeof t.smg.aem.components.common && (t.smg.aem.components.common = {});
    var e = t.smg.aem.varStatic
      , i = t.smg.aem.util
      , n = t.smg.aem.customEvent
      , s = t.smg.aem.components.common;
    s.tabDefault = function() {
        var s = {
            tabDefaultWrap: ".tab-default",
            tabDefaultNav: ".tab-default__wrap",
            tabDefaultNavIndex: 0,
            scrollMoveDelay: 900
        };
        return {
            init: function(t, e) {
                var l = this;
                if ((this.container = t).size()) {
                    this.opts = i.def(s, e || {}),
                    this.tabDefaultWrap = a(this.opts.tabDefaultWrap),
                    this.tabDefaultNav = a(this.opts.tabDefaultNav),
                    this.tabDefaultNavCont = this.tabDefaultNav.find(".tab-default__wrap__nav ul"),
                    this.tabDefaultNavItem = this.tabDefaultNav.find(".tab-default__wrap__nav li"),
                    this.tabDefaultNavBar = this.tabDefaultNav.find(".tab-default__wrap__nav__tab__bar"),
                    this.tabDefaultNavGo = this.tabDefaultNavItem.find("a"),
                    this.tabDefaultNavOpenBtn = this.tabDefaultNav.find(".tab-default__wrap__nav__tab__open button");
                    var f = window.location.pathname;
                    f = f.split("/");
                    var v = "" != f[f.length - 1] ? f[f.length - 1] : f[f.length - 2];
                    v = v.replace(".html", ""),
                    this.tabDefaultNavGo.removeAttr("title"),
                    this.tabDefaultNavItem.each(function(t) {
                        var e = a(this)
                          , i = e.find("a").attr("href").split("/");
                        i = i[i.length - 1].replace(".html", ""),
                        i == v && (l.opts.tabDefaultNavIndex = t)
                    }),
                    this.tabDefaultNavItem.length && this.tabDefaultNavCont.length && (this.setBindEvents(),
                    l.tabDefaultNavPos(),
                    this.IS_MOBILE_MODE = !1,
                    this.container.on(n.RESPONSIVE.CHANGE, a.proxy(this.onResponsiveChange, this)),
                    this.container.trigger(n.RESPONSIVE.GET_STATUS))
                }
            },
            setElements: function() {
                this.tabDefaultWrap = a(this.opts.tabDefaultWrap),
                this.tabDefaultNav = a(this.opts.tabDefaultNav),
                this.tabDefaultNavCont = this.tabDefaultNav.find(".tab-default__wrap__nav ul"),
                this.tabDefaultNavItem = this.tabDefaultNav.find(".tab-default__wrap__nav li"),
                this.tabDefaultNavBar = this.tabDefaultNav.find(".tab-default__wrap__nav__tab__bar"),
                this.tabDefaultNavGo = this.tabDefaultNavItem.find("a"),
                this.tabDefaultNavOpenBtn = this.tabDefaultNav.find(".tab-default__wrap__nav__tab__open button")
            },
            setBindEvents: function() {
                a(t).on("resize orientationchange load", a.proxy(this.tabDefaultNavPos, this));
                var e, i = this;
                this.tabDefaultNavItem.off("click").on("click", function(t) {
                    e = a(this).index(),
                    i.tabDefaultNavGoTo(t, e)
                }),
                this.tabDefaultNavOpenBtn.off("click").on("click", a.proxy(this.tabDefaultNavOpen, this))
            },
            tabDefaultNavPos: function(t) {
                var a = this.opts.tabDefaultNavIndex;
                this.tabDefaultNavItem.find("a").hasClass("active") && (a = this.tabDefaultNavItem.find(".active").parent().index()),
                this.tabDefaultNavOpenBtn.html(this.tabDefaultNavItem.find(".active").html()),
                this.tabDefaultNavOpenBtn.removeClass("active"),
                this.tabDefaultNavOpenBtn.find(".blind").text("Expand"),
                this.IS_MOBILE_MODE ? this.tabDefaultNavCont.slideUp(300) : this.tabDefaultNavCont.stop().css("display", ""),
                this.tabDefaultNavItem.find("a").removeClass("active"),
                this.tabDefaultNavItem.find("a").attr("title", ""),
                this.tabDefaultNavItem.find("a").parent().removeClass("mo-hide"),
                this.tabDefaultNavItem.eq(a).find("a").attr("title", "Selected"),
                this.tabDefaultNavItem.eq(a).find("a").addClass("active"),
                this.tabDefaultNavItem.eq(a).find("a").parent().addClass("mo-hide"),
                this.tabDefaultNavBar.css("left", this.tabDefaultNavItem.eq(a).position().left + this.tabDefaultNavItem.eq(a).width() / 2 - this.tabDefaultNavBar.width() / 2)
            },
            tabDefaultNavGoTo: function(t, e) {
                a(t.currentTarget);
                this.tabDefaultNavItem.find("a").removeClass("active"),
                this.tabDefaultNavItem.eq(e).find("a").addClass("active"),
                this.tabDefaultNavItem.find("a").attr("title", ""),
                this.tabDefaultNavItem.eq(e).find("a").attr("title", "Selected"),
                this.tabDefaultNavItem.find("a").parent().removeClass("mo-hide"),
                this.tabDefaultNavItem.eq(e).find("a").parent().addClass("mo-hide"),
                this.tabDefaultNavBar.css("left", this.tabDefaultNavItem.eq(e).position().left + this.tabDefaultNavItem.eq(e).width() / 2 - this.tabDefaultNavBar.width() / 2),
                this.tabDefaultNavOpenBtn.find(".nav-name").text(this.tabDefaultNavItem.eq(e).find("a").text()),
                this.IS_MOBILE_MODE ? (this.tabDefaultNavOpenBtn.removeClass("active"),
                this.tabDefaultNavOpenBtn.parent().removeClass("active"),
                this.tabDefaultNavCont.slideUp(300)) : (this.tabDefaultNavOpenBtn.removeClass("active"),
                this.tabDefaultNavOpenBtn.parent().removeClass("active"),
                this.tabDefaultNavCont.stop().css("display", ""))
            },
            tabDefaultNavOpen: function(t) {
                this.tabDefaultNavOpenBtn.hasClass("active") ? (this.tabDefaultNavOpenBtn.removeClass("active"),
                this.tabDefaultNavOpenBtn.parent().removeClass("active"),
                this.tabDefaultNavCont.slideUp(300),
                this.tabDefaultNavOpenBtn.find(".blind").text("Expand"),
                this.tabDefaultNavOpenBtn.attr("title", "Expand Anchor Menu")) : (this.tabDefaultNavOpenBtn.addClass("active"),
                this.tabDefaultNavOpenBtn.parent().addClass("active"),
                this.tabDefaultNavCont.slideDown(300),
                this.tabDefaultNavOpenBtn.find(".blind").text("Collapse"),
                this.tabDefaultNavOpenBtn.attr("title", "Collapse Anchor Menu"))
            },
            onResponsiveChange: function(t, a) {
                this.IS_MOBILE_MODE = a.RESPONSIVE_NAME === e.RESPONSIVE.MOBILE.NAME ? !0 : !1,
                a.RESPONSIVE_GNB_NAME === e.RESPONSIVE.GNB.NAME,
                this.tabDefaultNavPos()
            }
        }
    }(),
    a(function() {
        s.tabDefault.init(a(".tab-default"))
    })
}(window, window.jQuery);
!function(n, a) {
    "use strict";
    "undefined" == typeof n.smg && (n.smg = {}),
    "undefined" == typeof n.smg.aem && (n.smg.aem = {}),
    "undefined" == typeof n.smg.aem.components && (n.smg.aem.components = {}),
    "undefined" == typeof n.smg.aem.components.common && (n.smg.aem.components.common = {});
    var t = n.smg.aem.varStatic
      , e = n.smg.aem.util
      , o = n.smg.aem.customEvent
      , s = n.smg.aem.components.common;
    s.anchorMenu = function() {
        var r = {
            anchorMenuWrap: ".anchor-standard",
            anchorMenuNav: ".anchor-standard__wrap",
            scrollMoveDelay: 900
        }
          , i = {
            init: function() {
                this.setElmts(),
                this.bindEvts()
            },
            setElmts: function() {
                this.wrap = a(r.anchorMenuWrap),
                this.contactBtn = this.wrap.find(".anchor-standard__wrap__nav__contact-us"),
                this.contactLayer = this.wrap.find(".anchor-standard__calltoaction"),
                this.contactClose = this.wrap.find(".layer__close")
            },
            bindEvts: function() {
                this.resizeListener(),
                this.contactToggle(),
                this.contactLayerClose()
            },
            resizeListener: function() {
                a(n).on("resize", a.proxy(this.layerOff, this))
            },
            contactToggle: function() {
                var t = this;
                this.contactBtn.on("click", function(e) {
                    t.scrollTop = a(".anchor-standard__wrap").offset().top,
                    t.winScrollTop = a(n).scrollTop(),
                    t.contactLayer.is(":visible") ? t.layerOff() : t.winScrollTop < t.scrollTop && a("html, body").stop().animate({
                        scrollTop: t.scrollTop
                    }, {
                        duration: r.scrollMoveDelay,
                        complete: function() {}
                    })
                })
            },
            contactLayerClose: function() {
                var n = this;
                this.contactClose.on("click", function(a) {
                    a.preventDefault(),
                    n.layerOff()
                })
            },
            layerOn: function() {
                this.contactLayer.css({
                    display: "block",
                    top: this.wrap.find(".anchor-standard__wrap__nav").outerHeight(),
                    height: a(n).outerHeight() - this.wrap.find(".anchor-standard__wrap__nav").outerHeight()
                }),
                a("body, html").css("overflow", "hidden"),
                s.anchorMenu.anchorMenuNavPos()
            },
            layerOff: function() {
                this.contactLayer.css({
                    display: "",
                    top: "",
                    height: ""
                }),
                a("body, html").css("overflow", "")
            }
        };
        return {
            init: function(n, t) {
                (this.container = n).size() && (this.opts = e.def(r, t || {}),
                this.setElements(),
                this.setBindEvents(),
                this.IS_MOBILE_MODE = !1,
                this.container.on(o.RESPONSIVE.CHANGE, a.proxy(this.onResponsiveChange, this)),
                this.container.trigger(o.RESPONSIVE.GET_STATUS),
                i.init())
            },
            setElements: function() {
                this.anchorMenuWrap = a(this.opts.anchorMenuWrap),
                this.anchorMenuNav = a(this.opts.anchorMenuNav),
                this.anchorMenuNavCont = this.anchorMenuNav.find(".anchor-standard__wrap__nav ul"),
                this.anchorMenuNavItem = this.anchorMenuNav.find(".anchor-standard__wrap__nav li"),
                this.anchorMenuNavBar = this.anchorMenuNav.find(".anchor-standard__wrap__nav__tab__bar"),
                this.anchorMenuNavGo = this.anchorMenuNavItem.find("a"),
                this.anchorMenuNavOpenBtn = this.anchorMenuNav.find(".anchor-standard__wrap__nav__tab__open button")
            },
            setBindEvents: function() {
                a(n).on("scroll", a.proxy(this.anchorMenuNavPos, this)),
                a(n).on("resize orientationchange load", a.proxy(this.anchorMenuNavPos, this)),
                this.anchorMenuNavGo.on("click", a.proxy(this.anchorMenuNavGoTo, this)),
                this.anchorMenuNavOpenBtn.on("click", a.proxy(this.anchorMenuNavOpen, this))
            },
            anchorMenuNavPos: function(t) {
                var e = []
                  , o = 0
                  , s = 0
                  , r = this.anchorMenuNav.height();
                this.anchorMenuNavOpenBtn.removeClass("active"),
                this.anchorMenuNavOpenBtn.find(".blind").text("Expand"),
                this.IS_MOBILE_MODE ? this.anchorMenuNavCont.slideUp(300) : this.anchorMenuNavCont.css("display", ""),
                this.anchorMenuWrap.css("height", r),
                this.anchorMenuWrap.offset().top <= a(n).scrollTop() ? (this.anchorMenuNav.addClass("anchor-standard__wrap__fixed"),
                a(".cm-breadcrumb.semi-breadcrumb").addClass("cm-breadcrumb__wrap__fixed").css("top", r)) : (this.anchorMenuNav.removeClass("anchor-standard__wrap__fixed"),
                a(".cm-breadcrumb.semi-breadcrumb").removeClass("cm-breadcrumb__wrap__fixed").css("top", "auto"));
                for (var o = 0, i = this.anchorMenuNavItem.length - 1; i >= 0; i--) {
                    var h = this.anchorMenuNavItem.eq(i).find("a").attr("href");
                    a(h).offset().top <= a(n).scrollTop() + r ? (e[o] = i,
                    o++,
                    s = Math.max.apply(null, e)) : this.anchorMenuWrap.offset().top > a(n).scrollTop() && (s = 0)
                }
                this.anchorMenuNavItem.find("a").removeClass("active"),
                this.anchorMenuNavItem.eq(s).find("a").addClass("active"),
                this.anchorMenuNavBar.css("left", this.anchorMenuNavItem.eq(0).width() * s + this.anchorMenuNavItem.eq(s).width() / 2 - this.anchorMenuNavBar.width() / 2),
                this.anchorMenuNavOpenBtn.find(".nav-name").text(this.anchorMenuNavItem.eq(s).find("a").text())
            },
            anchorMenuNavGoTo: function(n) {
                n.preventDefault();
                var t = a(n.currentTarget);
                a("html, body").stop().animate({
                    scrollTop: a(t.attr("href")).offset().top - this.anchorMenuNav.height() + 1
                }, 500),
                i.layerOff()
            },
            anchorMenuNavOpen: function(n) {
                this.anchorMenuNavOpenBtn.hasClass("active") ? (this.anchorMenuNavOpenBtn.removeClass("active"),
                this.anchorMenuNavCont.slideUp(300),
                this.anchorMenuNavOpenBtn.find(".blind").text("Expand"),
                this.anchorMenuNavOpenBtn.attr("title", "Expand Anchor Menu")) : (this.anchorMenuNavOpenBtn.addClass("active"),
                this.anchorMenuNavCont.slideDown(300),
                this.anchorMenuNavOpenBtn.find(".blind").text("Collapse"),
                this.anchorMenuNavOpenBtn.attr("title", "Collapse Anchor Menu"),
                i.layerOff())
            },
            onResponsiveChange: function(n, a) {
                this.IS_MOBILE_MODE = a.RESPONSIVE_NAME === t.RESPONSIVE.MOBILE.NAME ? !0 : !1,
                a.RESPONSIVE_GNB_NAME === t.RESPONSIVE.GNB.NAME,
                this.anchorMenuNavPos()
            }
        }
    }(),
    a(function() {
        s.anchorMenu.init(a(".anchor-standard"))
    })
}(window, window.jQuery);
!function(s, i) {
    "use strict";
    "undefined" == typeof s.smg && (s.smg = {}),
    "undefined" == typeof s.smg.aem && (s.smg.aem = {}),
    "undefined" == typeof s.smg.aem.components && (s.smg.aem.components = {}),
    "undefined" == typeof s.smg.aem.components.hero && (s.smg.aem.components.hero = {});
    var e = s.smg.aem.varStatic
      , t = s.smg.aem.util
      , n = s.smg.aem.components.hero;
    n.carousel = function() {
        var n = {
            wrap: ".hero-carousel",
            carousel: {
                wrap: ".js-prd-eco-high-carousel",
                slickOpts: {
                    rtl: i("html").hasClass("rtl"),
                    speed: 500,
                    useTransform: !0,
                    dots: !0,
                    arrows: !0,
                    slidesToShow: 1,
                    infinite: !0,
                    initialSlide: 0,
                    adaptiveHeight: !0,
                    responsive: [{
                        breakpoint: e.RESPONSIVE.MOBILE.WIDTH + 1,
                        settings: {
                            variableWidth: !1,
                            centerMode: !1,
                            arrows: !1
                        }
                    }]
                }
            },
            onSingleClass: "s-single-slide"
        };
        return {
            init: function(s, o) {
                (this.container = s).size() && (this.opts = t.def(n, o || {}),
                this.opts.carousel.slickOpts.speed = i("body").hasClass(e.SUPPORT.TOUCH_DEVICE) ? 150 : 500,
                this.setElements(),
                this.setBindEvents(),
                this.setSlick())
            },
            setElements: function() {
                this.IE_LT_8 = i("body").hasClass(e.SUPPORT.IE_LT_8),
                this.wrap = this.container.find(this.opts.wrap),
                this.carousel = this.wrap.find(this.opts.carousel.wrap)
            },
            setBindEvents: function() {
                navigator.userAgent.match(/iPhone/i) && i(s).on("orientationchange", i.proxy(this.slickVwRender, this))
            },
            setSlick: function() {
                this.carousel.on("init", i.proxy(this.onSlickInit, this)),
                this.carousel.slick(this.opts.carousel.slickOpts);
                var e = 0;
                this.carousel.on("beforeChange", i.proxy(function(s, i, t) {
                    e = t
                }, this)),
                this.carousel.on("afterChange", i.proxy(function(s, i, t) {
                    var n = i.$slides.eq(e);
                    n.find(".js-pop-close").trigger("click")
                }, this)),
                this.IE_LT_8 && (this.carousel.on("beforeChange", i.proxy(function(s, i, t) {
                    e = t,
                    this.onResizeListener()
                }, this)),
                this.carousel.on("afterChange", i.proxy(function(s, i, t) {
                    var n = i.$slides.eq(e);
                    n.find(".js-pop-close").trigger("click"),
                    this.onResizeListener()
                }, this)),
                i(s).on("resize", i.proxy(this.onResizeListener, this)),
                this.onResizeListener())
            },
            onSlickInit: function(s, e) {
                1 === e.slideCount && i(e.$slider).addClass(this.opts.onSingleClass)
            },
            getSlidePadding: function() {
                var s = 1440
                  , i = 769
                  , e = 70
                  , n = 30
                  , o = (e - n) / (s - i)
                  , r = e - (s - t.winSize().w) * o;
                return Math.min(r, e)
            },
            onResizeListener: function() {
                var s = t.winSize().w
                  , i = (this.carousel.outerWidth(),
                this.carousel.find(".slick-slide"));
                if (768 >= s)
                    i.css({
                        padding: ""
                    });
                else {
                    var e = this.getSlidePadding();
                    i.css({
                        padding: "0 " + e + "px"
                    })
                }
            },
            slickVwRender: function() {
                var s = this;
                i.each(this.carousel, function() {
                    var e = i(this).slick("slickCurrentSlide");
                    i(this).slick("unslick").slick(s.opts.carousel.slickOpts),
                    e && i(this).slick("slickGoTo", e, !0)
                })
            }
        }
    }(),
    i(function() {
        i(".hero-carousel").length && (i(".hero-carousel").each(function(s) {
            i(this).addClass("kv-visual" + s)
        }),
        n.carousel.init(i("body")))
    })
}(window, window.jQuery);
!function(e, i) {
    "use strict";
    "undefined" == typeof e.smg && (e.smg = {}),
    "undefined" == typeof e.smg.aem && (e.smg.aem = {}),
    "undefined" == typeof e.smg.aem.components && (e.smg.aem.components = {}),
    "undefined" == typeof e.smg.aem.components.marketing && (e.smg.aem.components.marketing = {});
    var t = (e.smg.aem.varStatic,
    e.smg.aem.util,
    e.smg.aem.customEvent,
    e.smg.aem.components.marketing);
    t.staticVideo = function() {
        var t = {
            init: function() {
                this.orientationchangeListener()
            },
            orientationchangeListener: function() {
                i(e).on("orientationchange", function(t) {
                    i(e).trigger("resize")
                })
            }
        }
          , n = {
            body: "body",
            evt: {
                connect: {},
                responsiveMgr: {
                    responsiveChange: "responsiveChange"
                }
            }
        }
          , s = {
            getObjectInfo: function() {
                return {
                    responsiveName: this.responsiveName,
                    device: this.device
                }
            },
            init: function() {
                this.constants(),
                this.bindEvts(),
                this.defSetup()
            },
            constants: function() {
                this.device = {
                    mobile: {
                        support: !0,
                        name: "mobile",
                        width: 768
                    },
                    tablet: {
                        support: !1,
                        name: "tablet",
                        width: 1280
                    },
                    desktop: {
                        support: !0,
                        name: "desktop"
                    }
                },
                this.evt = n.evt.responsiveMgr
            },
            bindEvts: function() {
                this.resizeListener()
            },
            defSetup: function() {
                this.responsiveChange()
            },
            resizeListener: function() {
                i(e).on("resize", i.proxy(this.responsiveChange, this))
            },
            responsiveChange: function() {
                var t, s = e.document, o = e.innerWidth || s.documentElement.clientWidth || s.body.clientWidthp;
                if (this.device.mobile.support && o <= this.device.mobile.width)
                    t = this.device.mobile.name;
                else if (this.device.tablet.support && o <= this.device.tablet.width)
                    t = this.device.tablet.name;
                else {
                    if (!this.device.desktop.support)
                        return;
                    t = this.device.desktop.name
                }
                var a = {
                    responsiveName: ""
                };
                this.responsiveName ? this.responsiveName !== t && (this.responsiveName = t,
                a.responsiveName = this.responsiveName,
                i(n.evt.connect).trigger(this.evt.responsiveChange, a)) : (this.responsiveName = t,
                a.responsiveName = this.responsiveName,
                i(n.evt.connect).trigger(this.evt.responsiveChange, a))
            }
        }
          , o = {
            init: function() {
                this.setElmts(),
                this.bindEvts()
            },
            setElmts: function() {
                this.containers = i(".static-video")
            },
            bindEvts: function() {
                this.playVideoListener()
            },
            playVideoListener: function() {
                var e = this;
                e.onVideo()
            },
            onVideo: function(e) {
                var t = s.getObjectInfo();
                this.containers.each(function(e) {
                    var n = i(this).find(".static-video__video")
                      , s = n.find(".s-video")
                      , o = s.closest(".static-video").find(".static-video__figure .s-image");
                    if (t.responsiveName === t.device.mobile.name) {
                        s.attr("muted", !0);
                        var e = e;
                        s.attr("id", "s-video" + e),
                        s.css({
                            display: "none"
                        }),
                        o.css({
                            display: "block"
                        })
                    } else
                        s.attr("muted", !1);
                    s.find("source").on("error", function() {
                        s.css({
                            display: "none"
                        }),
                        o.css({
                            display: "block"
                        })
                    })
                }),
                this.containers.waypoint({
                    handler: function(e) {
                        if ("down" == e) {
                            var n = i(this.element).find(".static-video__video")
                              , s = n.find(".s-video")
                              , o = s.closest(".static-video").find(".static-video__figure .s-image");
                            t.responsiveName === t.device.mobile.name ? s.attr("muted", !0) : s.attr("muted", !1);
                            var a = function() {
                                s[0].currentTime = 0,
                                s[0].play()
                            };
                            try {
                                a()
                            } catch (r) {
                                s.on("loadedmetadata", a),
                                s[0].load(),
                                s.css({
                                    display: "none"
                                }),
                                o.css({
                                    display: "block"
                                })
                            }
                        }
                    },
                    offset: "60%"
                })
            },
            onVideoReplay: function() {
                var e = s.getObjectInfo();
                this.containers.end().find("video").each(function() {
                    e.responsiveName === e.device.mobile.name ? i(this).attr("muted", !0) : i(this).attr("muted", !1),
                    this.currentTime = 0,
                    this.pause(),
                    this.play()
                })
            }
        }
          , a = function(e) {
            (this.container = e).size() && (t.init(),
            s.init(),
            o.init())
        };
        return {
            init: a
        }
    }(),
    i(function() {
        t.staticVideo.init(i("body"))
    })
}(window, window.jQuery);
!function(t, i) {
    function n() {
        var t = this;
        this.loadScript = function(t, n) {
            i.ajax({
                url: t,
                dataType: "script",
                success: function(t, i, n) {},
                error: function(t) {}
            })
        }
        ,
        this.init = function() {
            i("[data-script-src]").each(function() {
                for (var n = i(this), c = n.attr("data-script-src").split(","), r = 0; r < c.length; r++)
                    !function() {
                        var n = i.trim(c[r]);
                        "" != n && t.loadScript(n, function() {})
                    }()
            })
        }
    }
    i(function() {
        if (i("[data-script-src]").length) {
            var t = new n;
            t.init()
        }
    })
}(window, jQuery);
!function(i, t) {
    "use strict";
    "undefined" == typeof i.smg && (i.smg = {}),
    "undefined" == typeof i.smg.aem && (i.smg.aem = {}),
    "undefined" == typeof i.smg.aem.components && (i.smg.aem.components = {}),
    "undefined" == typeof i.smg.aem.components.product && (i.smg.aem.components.product = {});
    var s = i.smg.aem.varStatic
      , h = i.smg.aem.util
      , o = i.smg.aem.customEvent
      , e = i.smg.aem.components.product;
    e.specHighlight = function() {
        var e = {
            isRTL: t("html").hasClass("rtl"),
            wrap: ".spec-highlight",
            expandBtnSelector: ".spec-highlight__btn-wrap > .s-ico-down",
            hideBtnSelector: ".spec-highlight__btn-wrap > .s-ico-up",
            detailedSpecSelector: ".hidden-specs-list",
            tooltipSelector: ".spec-highlight__highlights-info",
            tooltipTarget: ".spec-highlight__highlights-info-desc",
            expandClass: "s-ico-down",
            hideClass: "s-ico-up",
            showText: "Show More Specs",
            hideText: "Hide More Specs",
            responsiveSize: s.RESPONSIVE.MOBILE.WIDTH
        };
        return {
            init: function(i, t) {
                (this.container = i).size() && (this.opts = h.def(e, t || {}),
                this.setElements(),
                this.setBindEvents(),
                this.setSpecsHighlignt())
            },
            setElements: function() {
                this.$wrap = t(this.opts.wrap),
                this.$tooltip = this.$wrap.find(this.opts.tooltipSelector),
                this.$tooltipTarget = this.$wrap.find(this.opts.tooltipTarget),
                this.$tooltipVisible = this.$wrap.find(this.opts.tooltipTarget + ":visible"),
                this.winWidth = t(window).width(),
                this.detailWrapLeft = this.$wrap.find(this.opts.detailedSpecSelector).position().left,
                this.touchDeviceChk = t("body").hasClass(s.SUPPORT.TOUCH_DEVICE),
                this.pcAnchorObj = t(t(".product-anchor-nav-nonprice").size() ? ".product-anchor-nav-nonprice" : ".product-anchor-nav"),
                this.moAnchorObj = t(t(".product-anchor-nav-nonprice-mo").size() ? ".product-anchor-nav-nonprice-mo" : ".product-anchor-nav-mo")
            },
            setBindEvents: function() {
                this.IS_MOBILE_MODE = !1,
                this.container.on(o.RESPONSIVE.CHANGE, t.proxy(this.onResponsiveChange, this)),
                this.container.trigger(o.RESPONSIVE.GET_STATUS),
                this.tooltipEvent(),
                this.resizeFunc(),
                t(i).on("resize orientationchange", t.proxy(function() {
                    this.container.on(o.RESPONSIVE.CHANGE, t.proxy(this.onResponsiveChange, this)),
                    this.container.trigger(o.RESPONSIVE.GET_STATUS),
                    this.touchDeviceChk = t("body").hasClass(s.SUPPORT.TOUCH_DEVICE),
                    this.resizeFunc(),
                    this.tooltipEvent(!0)
                }, this))
            },
            resizeFunc: function() {
                this.anchorHeightChk()
            },
            anchorHeightChk: function() {
                this.anchorHeight = h.winSize().w <= this.opts.responsiveSize ? this.moAnchorObj.outerHeight(!0) : this.pcAnchorObj.outerHeight(!0),
                null === this.anchorHeight && (this.anchorHeight = 0)
            },
            tooltipEvent: function(i) {
                {
                    var s = this;
                    t(window).width()
                }
                if (this.IS_MOBILE_MODE) {
                    if (s.$tooltip.each(function() {
                        t(this).off("click"),
                        t(this).on({
                            click: function(i) {
                                i.preventDefault();
                                var h = t(this).closest("li").find(".spec-highlight__highlights-info-desc")
                                  , o = h.css("display");
                                if (o && "none" != o && "undefined" != o) {
                                    var e = t(this).closest("em")
                                      , n = t(this).closest("li")
                                      , l = n.find(".spec-highlight__highlights-info-desc");
                                    l.css("display", "none"),
                                    t(this).removeClass("spec-highlight__highlights-info-on")
                                } else {
                                    var n = (t(this).outerWidth(),
                                    t(this).closest("li"))
                                      , e = t(this).closest("em")
                                      , p = e.attr("class")
                                      , l = e.siblings(".spec-highlight__highlights-info-desc")
                                      , c = e.position()
                                      , g = 0
                                      , a = (t(this).data("tooltip-pos"),
                                    c.left);
                                    "spec-highlight__highlights-title" == p ? g = c.top + t(this).position().top + 24 + 7 : "spec-highlight__highlights-sub-title" == p ? g = c.top + t(this).position().top + 46 : "spec-highlight__highlights-sub-title--grey" == p && (g = c.top + t(this).position().top + 50),
                                    a = 16,
                                    s.setTargetOff(),
                                    l.css({
                                        top: g,
                                        position: "absolute",
                                        display: "block",
                                        "z-index": 10
                                    }),
                                    s.opts.isRTL ? l.css("right", a) : l.css("left", a),
                                    t(this).addClass("spec-highlight__highlights-info-on")
                                }
                            }
                        })
                    }),
                    i)
                        for (var h = s.$wrap.find(this.opts.tooltipTarget + ":visible"), o = h.length, e = 0; o > e; e++)
                            !function(i) {
                                var t = h.eq(e).prev().find(".spec-highlight__highlights-info")
                                  , o = t.closest("li").find(".spec-highlight__highlights-info-desc")
                                  , n = o.css("display");
                                if ("block" == n) {
                                    var l = (t.outerWidth(),
                                    t.closest("li"),
                                    t.closest("em"))
                                      , p = l.attr("class")
                                      , c = l.siblings(".spec-highlight__highlights-info-desc")
                                      , g = l.position()
                                      , a = 0
                                      , r = (t.data("tooltip-pos"),
                                    g.left);
                                    "spec-highlight__highlights-title" == p ? a = g.top + t.position().top + 24 + 7 : "spec-highlight__highlights-sub-title" == p ? a = g.top + t.position().top + 46 : "spec-highlight__highlights-sub-title--grey" == p && (a = g.top + t.position().top + 50),
                                    r = 16,
                                    c.css({
                                        top: a
                                    }),
                                    s.opts.isRTL ? c.css("right", r) : c.css("left", r)
                                }
                            }(e)
                } else if (s.$tooltip.each(function() {
                    t(this).off("click"),
                    t(this).on({
                        click: function(i) {
                            i.preventDefault();
                            var h = t(this).closest("li").find(".spec-highlight__highlights-info-desc")
                              , o = h.css("display");
                            if (o && "none" != o && "undefined" != o) {
                                var e = t(this).closest("li")
                                  , n = e.find(".spec-highlight__highlights-info-desc");
                                n.css("display", "none"),
                                t(this).removeClass("spec-highlight__highlights-info-on")
                            } else {
                                var e = (t(this).outerWidth(),
                                t(this).closest("li"))
                                  , l = t(this).closest("em")
                                  , p = l.attr("class")
                                  , n = l.siblings(".spec-highlight__highlights-info-desc")
                                  , c = l.outerWidth()
                                  , g = l.position()
                                  , a = 0
                                  , r = (t(this).data("tooltip-pos"),
                                n.outerWidth())
                                  , d = e.outerWidth()
                                  , f = t(".spec-highlight__wrap").width() + t(".spec-highlight__wrap").position().left
                                  , _ = s.opts.isRTL ? f - (g.left + c) : g.left
                                  , u = _ + r;
                                "spec-highlight__highlights-title" == p ? a = g.top + t(this).position().top + 24 + 8 - 1 : ("spec-highlight__highlights-sub-title" == p || "spec-highlight__highlights-sub-title--grey" == p) && (a = g.top + t(this).position().top + 24 + 13 + 13),
                                u > f && (_ = _ - r + d + 1),
                                s.setTargetOff(),
                                n.css({
                                    top: a,
                                    display: "block",
                                    position: "absolute",
                                    "z-index": 10
                                }),
                                s.opts.isRTL ? n.css("right", _) : n.css("left", _),
                                t(this).addClass("spec-highlight__highlights-info-on")
                            }
                        }
                    })
                }),
                i)
                    for (var h = s.$wrap.find(this.opts.tooltipTarget + ":visible"), o = h.length, e = 0; o > e; e++)
                        !function(i) {
                            var o = h.eq(e).prev().find(".spec-highlight__highlights-info")
                              , n = o.closest("li").find(".spec-highlight__highlights-info-desc")
                              , l = n.css("display");
                            if ("block" == l) {
                                var p = (o.outerWidth(),
                                o.closest("li"))
                                  , c = o.closest("em")
                                  , g = c.attr("class")
                                  , a = c.position()
                                  , r = c.siblings(".spec-highlight__highlights-info-desc")
                                  , d = c.outerWidth()
                                  , a = c.position()
                                  , f = 0
                                  , _ = (o.data("tooltip-pos"),
                                r.outerWidth())
                                  , u = p.outerWidth()
                                  , m = t(".spec-highlight__wrap").width() + t(".spec-highlight__wrap").position().left
                                  , v = s.opts.isRTL ? m - (a.left + d) : a.left
                                  , b = v + _;
                                "spec-highlight__highlights-title" == g ? f = a.top + o.position().top + 24 + 8 - 1 : ("spec-highlight__highlights-sub-title" == g || "spec-highlight__highlights-sub-title--grey" == g) && (f = a.top + o.position().top + 24 + 13 + 13),
                                b > m && (v = v - _ + u + 1),
                                r.css({
                                    top: f
                                }),
                                s.opts.isRTL ? r.css("right", v) : r.css("left", v)
                            }
                        }(e)
            },
            setTargetOff: function() {
                this.$tooltipTarget.css("display", "none"),
                this.$tooltip.removeClass("spec-highlight__highlights-info-on")
            },
            setSpecsHighlignt: function() {
                var i = this;
                i.$wrap.each(function() {
                    var s = t(this)
                      , h = s.find(i.opts.expandBtnSelector)
                      , o = s.find(i.opts.hideBtnSelector)
                      , e = s.find(i.opts.detailedSpecSelector);
                    i.onExpandBtnEvent(s, h, e),
                    i.onHideBtnEvent(s, o, h, e)
                })
            },
            onExpandBtnEvent: function(i, s, h) {
                var o = this;
                t(s).on("click", function(e) {
                    e.preventDefault();
                    var n = Math.ceil(i.offset().top - o.anchorHeight);
                    t(this).hasClass(o.opts.expandClass) ? (h.slideDown({
                        duration: 500,
                        progress: function() {
                            for (var i = o.$wrap.find(o.opts.tooltipTarget + ":visible"), t = i.length, s = 0; t > s; s++)
                                !function(t) {
                                    var h = i.eq(s).prev().find(".spec-highlight__highlights-info")
                                      , o = h.closest("li").find(".spec-highlight__highlights-info-desc")
                                      , e = o.css("display")
                                      , n = h.closest("em")
                                      , l = n.siblings(".spec-highlight__highlights-info-desc")
                                      , p = n.attr("class")
                                      , c = n.position()
                                      , g = 0;
                                    "block" == e && ("spec-highlight__highlights-title" == p ? g = c.top + h.position().top + 24 + 8 - 1 : ("spec-highlight__highlights-sub-title" == p || "spec-highlight__highlights-sub-title--grey" == p) && (g = c.top + h.position().top + 24 + 13 + 13),
                                    l.css({
                                        top: g
                                    }))
                                }(s)
                        },
                        complete: t.proxy(o.slidecomPleteFunc, o)
                    }),
                    setTimeout(function() {
                        s.text(o.opts.hideText).removeClass(o.opts.expandClass).addClass(o.opts.hideClass)
                    }, 500)) : (t("html, body").animate({
                        scrollTop: n
                    }, 500, t.proxy(o.slidecomPleteFunc, o)),
                    setTimeout(function() {
                        h.slideUp({
                            duration: 500,
                            progress: function() {
                                for (var i = o.$wrap.find(o.opts.tooltipTarget + ":visible"), t = i.length, s = 0; t > s; s++)
                                    !function(t) {
                                        var h = i.eq(s).prev().find(".spec-highlight__highlights-info")
                                          , o = h.closest("li").find(".spec-highlight__highlights-info-desc")
                                          , e = o.css("display")
                                          , n = h.closest("em")
                                          , l = n.siblings(".spec-highlight__highlights-info-desc")
                                          , p = n.attr("class")
                                          , c = n.position()
                                          , g = 0;
                                        "block" == e && ("spec-highlight__highlights-title" == p ? g = c.top + h.position().top + 24 + 8 - 1 : ("spec-highlight__highlights-sub-title" == p || "spec-highlight__highlights-sub-title--grey" == p) && (g = c.top + h.position().top + 24 + 13 + 13),
                                        l.css({
                                            top: g
                                        }))
                                    }(s)
                            },
                            complete: t.proxy(o.slidecomPleteFunc, o)
                        }),
                        s.text(o.opts.showText).removeClass(o.opts.hideClass).addClass(o.opts.expandClass)
                    }, 500))
                })
            },
            slidecomPleteFunc: function() {
                "undefined" != typeof i.smg.aem.components.product && ("undefined" != typeof i.smg.aem.components.product.productAnchorNavNonPirce && i.smg.aem.components.product.productAnchorNavNonPirce.scrollManager.setTargetPosition(),
                "undefined" != typeof i.smg.aem.components.product.productAnchorNav && i.smg.aem.components.product.productAnchorNav.scrollManager.setTargetPosition())
            },
            onHideBtnEvent: function(i, s, h, o) {
                var e = this;
                t(s).on("click", function(s) {
                    s.preventDefault();
                    var n = Math.ceil(i.offset().top - e.anchorHeight);
                    t("html, body").animate({
                        scrollTop: n
                    }, 500, t.proxy(e.slidecomPleteFunc, e)),
                    setTimeout(function() {
                        o.slideUp({
                            duration: 500,
                            progress: function() {
                                for (var i = e.$wrap.find(e.opts.tooltipTarget + ":visible"), t = i.length, s = 0; t > s; s++)
                                    !function(t) {
                                        var h = i.eq(s).prev().find(".spec-highlight__highlights-info")
                                          , o = h.closest("li").find(".spec-highlight__highlights-info-desc")
                                          , e = o.css("display")
                                          , n = h.closest("em")
                                          , l = n.siblings(".spec-highlight__highlights-info-desc")
                                          , p = n.attr("class")
                                          , c = n.position()
                                          , g = 0;
                                        "block" == e && ("spec-highlight__highlights-title" == p ? g = c.top + h.position().top + 24 + 8 - 1 : ("spec-highlight__highlights-sub-title" == p || "spec-highlight__highlights-sub-title--grey" == p) && (g = c.top + h.position().top + 24 + 13 + 13),
                                        l.css({
                                            top: g
                                        }))
                                    }(s)
                            },
                            complete: t.proxy(e.slidecomPleteFunc, e)
                        }),
                        h.text(e.opts.showText).removeClass(e.opts.hideClass).addClass(e.opts.expandClass)
                    }, 500)
                })
            },
            onResponsiveChange: function(i, t) {
                this.IS_MOBILE_MODE = t.RESPONSIVE_NAME === s.RESPONSIVE.MOBILE.NAME ? !0 : !1
            }
        }
    }(),
    t(function() {
        t(".spec-highlight").length && e.specHighlight.init(t(".spec-highlight"))
    })
}(window, window.jQuery);
!function(i, s) {
    "use strict";
    "undefined" == typeof i.smg && (i.smg = {}),
    "undefined" == typeof i.smg.aem && (i.smg.aem = {}),
    "undefined" == typeof i.smg.aem.components && (i.smg.aem.components = {}),
    "undefined" == typeof i.smg.aem.components.shop && (i.smg.aem.components.shop = {});
    var e = i.smg.aem.varStatic
      , t = i.smg.aem.util
      , n = i.smg.aem.customEvent
      , c = i.smg.aem.components.shop;
    c.primarySelection = function() {
        var i = {
            carousel: {
                wrap: ".js-primary-selection-carousel",
                slides: ".primary-selection__product-ct",
                setSlickSlideNum: 1,
                slickOpts: {
                    rtl: s("html").hasClass("rtl"),
                    speed: 500,
                    useTransform: !0,
                    dots: !0,
                    infinite: !1,
                    arrows: !1,
                    adaptiveHeight: !0
                }
            },
            cssClass: {
                hasSlick: "slick-initialized"
            }
        };
        return {
            init: function(n, c) {
                (this.container = n).size() && (this.opts = t.def(i, c || {}),
                this.opts.carousel.slickOpts.speed = s("body").hasClass(e.SUPPORT.TOUCH_DEVICE) ? 150 : 500,
                this.detectSize(),
                this.setElements(),
                this.setBindEvents())
            },
            setElements: function() {
                this.carousel = this.container.find(this.opts.carousel.wrap)
            },
            detectSize: function() {
                var i = s(".primary-selection");
                i.each(function() {
                    s(this).find(".primary-selection__product"),
                    s(this).find(".primary-selection__product-ct")
                })
            },
            setBindEvents: function() {
                this.container.on(n.RESPONSIVE.CHANGE, s.proxy(this.onResponsiveChange, this)),
                this.container.trigger(n.RESPONSIVE.GET_STATUS)
            },
            setSlick: function() {
                var i, e, t, n = this;
                s.each(this.carousel, function() {
                    i = s(this),
                    e = n.hasSlick(i),
                    t = i.find(n.opts.carousel.slides).size(),
                    !e && t >= n.opts.carousel.setSlickSlideNum && (i.on("beforeChange", s.proxy(n.onSlickBeforeChange, n)),
                    i.on("init", s.proxy(n.onSlickInit, n)),
                    i.slick(n.opts.carousel.slickOpts))
                })
            },
            onSlickInit: function(i, e) {
                var t = s(e.$slides).filter(":not(.slick-active)");
                this.setSlickSlideOut(t, 0)
            },
            onSlickBeforeChange: function(i, e, t, n) {
                if (t != n) {
                    var c = s(e.$slides)
                      , t = c.eq(t)
                      , n = c.eq(n);
                    this.setSlickSlideIn(n),
                    this.setSlickSlideOut(t)
                }
            },
            setSlickSlideIn: function(i, s) {
                s = s || 0 === s ? s : 300;
                var e = i.children("img")
                  , t = i.children("div");
                e.size() && e.stop().delay(s).animate({
                    opacity: 1
                }, s),
                t.size() && t.stop().delay(s).animate({
                    opacity: 1
                }, s)
            },
            setSlickSlideOut: function(i, s) {
                s = s || 0 === s ? s : 300;
                var e = i.children("img")
                  , t = i.children("div");
                e.size() && e.stop().delay(s).animate({
                    opacity: .5
                }, s),
                t.size() && t.stop().delay(s).animate({
                    opacity: 0
                }, s)
            },
            unSlick: function() {
                var i, e, t = this;
                s.each(this.carousel, function() {
                    i = s(this),
                    e = t.hasSlick(i),
                    e && (i.off("beforeChange", s.proxy(t.onSlickBeforeChange, t)),
                    t.setSlickSlideIn(i.find(".slick-slide"), 0),
                    i.slick("unslick"))
                })
            },
            onResponsiveChange: function(i, s) {
                this.responsiveDeivceName = s.RESPONSIVE_NAME,
                this.responsiveDeivceName === e.RESPONSIVE.MOBILE.NAME ? this.setSlick() : this.unSlick()
            },
            hasSlick: function(i) {
                return i.hasClass(this.opts.cssClass.hasSlick)
            },
            slickVwRender: function() {
                var i, e, t, n = this;
                s.each(this.carousel, function() {
                    i = s(this),
                    e = n.hasSlick(i),
                    e && (t = i.slick("slickCurrentSlide"),
                    i.slick("unslick").slick(n.opts.carousel.slickOpts),
                    t && i.slick("slickGoTo", t, !0))
                })
            }
        }
    }(),
    s(function() {
        c.primarySelection.init(s("body"))
    })
}(window, window.jQuery);
!function(n, e) {
    var t, o;
    e.uaMatch = function(n) {
        n = n.toLowerCase();
        var e = /(chrome)[ \/]([\w.]+)/.exec(n) || /(webkit)[ \/]([\w.]+)/.exec(n) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(n) || /(msie) ([\w.]+)/.exec(n) || n.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n) || [];
        return {
            browser: e[1] || "",
            version: e[2] || "0"
        }
    }
    ,
    t = e.uaMatch(navigator.userAgent),
    o = {},
    t.browser && (o[t.browser] = !0,
    o.version = t.version),
    o.chrome ? o.webkit = !0 : o.webkit && (o.safari = !0),
    e.browser = o
}(window, window.jQuery),
function(n, e, t) {
    function o(n) {
        return n = n || location.href,
        "#" + n.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var i, r = "hashchange", c = document, s = n.event.special, a = c.documentMode, u = "on" + r in e && (a === t || a > 7);
    n.fn[r] = function(n) {
        return n ? this.bind(r, n) : this.trigger(r)
    }
    ,
    n.fn[r].delay = 50,
    s[r] = n.extend(s[r], {
        setup: function() {
            return u ? !1 : void n(i.start)
        },
        teardown: function() {
            return u ? !1 : void n(i.stop)
        }
    }),
    i = function() {
        function i() {
            var t = o()
              , c = l(d);
            t !== d ? (m(d = t, c),
            n(e).trigger(r)) : c !== d && (location.href = location.href.replace(/#.*/, "") + c),
            s = setTimeout(i, n.fn[r].delay)
        }
        var s, a = {}, d = o(), f = function(n) {
            return n
        }, m = f, l = f;
        return a.start = function() {
            s || i()
        }
        ,
        a.stop = function() {
            s && clearTimeout(s),
            s = t
        }
        ,
        n.browser.msie && !u && function() {
            var e, t;
            a.start = function() {
                e || (t = n.fn[r].src,
                t = t && t + o(),
                e = n('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                    t || m(o()),
                    i()
                }).attr("src", t || "javascript:0").insertAfter("body")[0].contentWindow,
                c.onpropertychange = function() {
                    try {
                        "title" === event.propertyName && (e.document.title = c.title)
                    } catch (n) {}
                }
                )
            }
            ,
            a.stop = f,
            l = function() {
                return o(e.location.href)
            }
            ,
            m = function(t, o) {
                var i = e.document
                  , s = n.fn[r].domain;
                t !== o && (i.title = c.title,
                i.open(),
                s && i.write('<script>document.domain="' + s + '"</script>'),
                i.close(),
                e.location.hash = t)
            }
        }(),
        a
    }()
}(jQuery, this),
function(n, e) {
    "use strict";
    "undefined" == typeof n.smg && (n.smg = {}),
    "undefined" == typeof n.smg.aem && (n.smg.aem = {}),
    "undefined" == typeof n.smg.aem.templates && (n.smg.aem.templates = {}),
    "undefined" == typeof n.smg.aem.components && (n.smg.aem.components = {});
    var t = n.smg.aem.varStatic
      , o = (n.smg.aem.util,
    n.smg.aem.customEvent,
    n.smg.aem.components);
    o.accordion = function() {
        var n;
        return {
            aboutAccordion: function(n) {
                e(n).each(function() {
                    var n = e(this)
                      , t = n.children("li")
                      , o = n.find(".s-cont");
                    t.each(function() {
                        var n = e(this)
                          , i = n.children("h3").find("a")
                          , r = i.find("span")
                          , c = n.find(".s-cont");
                        i.off("click.accordion").on({
                            "click.accordion": function() {
                                return c.is(":hidden") ? (o.not(c).stop(!0, !0).slideUp(200),
                                t.not(n).children("h3").find("a").find("span").removeClass("s-icon-minus").addClass("s-icon-plus"),
                                i.attr("title", "Collapse Anchor Menu"),
                                c.stop(!0, !0).slideDown(200),
                                r.removeClass("s-icon-plus").addClass("s-icon-minus")) : (i.attr("title", "Expand Anchor Menu"),
                                c.stop(!0, !0).slideUp(200),
                                r.removeClass("s-icon-minus").addClass("s-icon-plus")),
                                !1
                            }
                        })
                    })
                })
            },
            onResponsiveChange: function(e, o) {
                n = o.RESPONSIVE_NAME === t.RESPONSIVE.MOBILE.NAME ? !0 : !1
            }
        }
    }(),
    e(function() {
        o.accordion.aboutAccordion(".s-list-expand")
    })
}(window, window.jQuery);
!function(t, n) {
    var e, o;
    n.uaMatch = function(t) {
        t = t.toLowerCase();
        var n = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
        return {
            browser: n[1] || "",
            version: n[2] || "0"
        }
    }
    ,
    e = n.uaMatch(navigator.userAgent),
    o = {},
    e.browser && (o[e.browser] = !0,
    o.version = e.version),
    o.chrome ? o.webkit = !0 : o.webkit && (o.safari = !0),
    n.browser = o
}(window, window.jQuery),
function(t, n, e) {
    function o(t) {
        return t = t || location.href,
        "#" + t.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var i, a = "hashchange", r = document, s = t.event.special, c = r.documentMode, u = "on" + a in n && (c === e || c > 7);
    t.fn[a] = function(t) {
        return t ? this.bind(a, t) : this.trigger(a)
    }
    ,
    t.fn[a].delay = 50,
    s[a] = t.extend(s[a], {
        setup: function() {
            return u ? !1 : void t(i.start)
        },
        teardown: function() {
            return u ? !1 : void t(i.stop)
        }
    }),
    i = function() {
        function i() {
            var e = o()
              , r = m(d);
            e !== d ? (l(d = e, r),
            t(n).trigger(a)) : r !== d && (location.href = location.href.replace(/#.*/, "") + r),
            s = setTimeout(i, t.fn[a].delay)
        }
        var s, c = {}, d = o(), f = function(t) {
            return t
        }, l = f, m = f;
        return c.start = function() {
            s || i()
        }
        ,
        c.stop = function() {
            s && clearTimeout(s),
            s = e
        }
        ,
        t.browser.msie && !u && function() {
            var n, e;
            c.start = function() {
                n || (e = t.fn[a].src,
                e = e && e + o(),
                n = t('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                    e || l(o()),
                    i()
                }).attr("src", e || "javascript:0").insertAfter("body")[0].contentWindow,
                r.onpropertychange = function() {
                    try {
                        "title" === event.propertyName && (n.document.title = r.title)
                    } catch (t) {}
                }
                )
            }
            ,
            c.stop = f,
            m = function() {
                return o(n.location.href)
            }
            ,
            l = function(e, o) {
                var i = n.document
                  , s = t.fn[a].domain;
                e !== o && (i.title = r.title,
                i.open(),
                s && i.write('<script>document.domain="' + s + '"</script>'),
                i.close(),
                n.location.hash = e)
            }
        }(),
        c
    }()
}(jQuery, this),
function(t, n) {
    "use strict";
    "undefined" == typeof t.smg && (t.smg = {}),
    "undefined" == typeof t.smg.aem && (t.smg.aem = {}),
    "undefined" == typeof t.smg.aem.templates && (t.smg.aem.templates = {}),
    "undefined" == typeof t.smg.aem.components.aboutsamsung && (t.smg.aem.components.aboutsamsung = {});
    var e = t.smg.aem.varStatic
      , o = (t.smg.aem.util,
    t.smg.aem.customEvent)
      , i = t.smg.aem.components.aboutsamsung;
    i.downloadListExpand = function() {
        function i(t) {
            var n = t.find(".s-icon-plus")
              , e = n.find(".blind");
            t.addClass("on"),
            n.removeClass().addClass("s-icon-minus"),
            e.text(n.attr("data-after-text")),
            t.attr("title", "Collapse Anchor Menu")
        }
        function a(t) {
            var n = t.find(".s-icon-minus")
              , e = n.find(".blind");
            t.removeClass("on"),
            n.removeClass().addClass("s-icon-plus"),
            e.text(n.attr("data-text")),
            t.attr("title", "Expand Anchor Menu")
        }
        var r;
        return {
            aboutAccordion: function(s, c) {
                function u() {
                    location.hash && n(location.hash).size() && n.each(n(s), function(t) {
                        var e = "#" + n(this).closest("li").attr("id");
                        return e && e === location.hash ? (c = t,
                        f = !0,
                        n(s).eq(c).trigger("click"),
                        r === !0 && setTimeout(function() {
                            d.count || d.move(n(s).eq(c))
                        }, 10),
                        !1) : void 0
                    })
                }
                s = s,
                c = c || 0,
                this.container = n("body"),
                r = !1,
                this.container.on(o.RESPONSIVE.CHANGE, n.proxy(this.onResponsiveChange, this)),
                this.container.trigger(o.RESPONSIVE.GET_STATUS);
                var d = {
                    loading: function(t) {
                        d.count = 0,
                        n(s).eq(t).trigger("click")
                    },
                    click: function(t) {
                        var e = t.currentTarget
                          , o = e.hash;
                        n(e).hasClass("on") ? this.close(o, e) : (this.init(o, s),
                        this.open(o, e))
                    },
                    init: function(t, o) {
                        n("html").hasClass(e.CSS.AEM_AUTHOR_MODE) || n(o).each(function() {
                            var t = n(this).attr("href");
                            n(t).slideUp(),
                            a(n(this))
                        })
                    },
                    open: function(t, e) {
                        i(n(e)),
                        n(t).stop().slideDown(function() {
                            d.count > 0 && r === !0 && d.move(e),
                            d.count = 1
                        })
                    },
                    close: function(t, e) {
                        a(n(e)),
                        n(t).stop().slideUp()
                    },
                    move: function(t) {
                        var e = n(t).offset().top - n(".anchor-standard:visible").outerHeight();
                        n("html, body").stop().animate({
                            scrollTop: e
                        }, 700)
                    }
                };
                n(s).on("click", function(t) {
                    return d.click(t),
                    !1
                });
                var f = !1;
                n(t).on("hashchange", function() {
                    u()
                }),
                u(),
                f || d.loading(c)
            },
            onResponsiveChange: function(t, n) {
                r = n.RESPONSIVE_NAME === e.RESPONSIVE.MOBILE.NAME ? !0 : !1
            }
        }
    }(),
    n(function() {
        i.downloadListExpand.aboutAccordion(".download-list-expand h3 a")
    })
}(window, window.jQuery);
!function(s, i) {
    "use strict";
    "undefined" == typeof s.smg && (s.smg = {}),
    "undefined" == typeof s.smg.aem && (s.smg.aem = {}),
    "undefined" == typeof s.smg.aem.components && (s.smg.aem.components = {}),
    "undefined" == typeof s.smg.aem.components.hero && (s.smg.aem.components.hero = {});
    var e = s.smg.aem.varStatic
      , t = s.smg.aem.util
      , n = s.smg.aem.components.hero;
    n.staticCarouselImageview = function() {
        var n = {
            wrap: ".static-carousel-imageview",
            carousel: {
                wrap: ".js-static-carousel-imageview-carousel",
                slickOpts: {
                    rtl: i("html").hasClass("rtl"),
                    speed: 500,
                    useTransform: !0,
                    dots: !0,
                    arrows: !0,
                    slidesToShow: 1,
                    infinite: !0,
                    initialSlide: 0,
                    adaptiveHeight: !0,
                    responsive: [{
                        breakpoint: e.RESPONSIVE.MOBILE.WIDTH + 1,
                        settings: {
                            variableWidth: !1,
                            centerMode: !1,
                            arrows: !1
                        }
                    }]
                }
            },
            onSingleClass: "s-single-slide"
        };
        return {
            init: function(s, o) {
                (this.container = s).size() && (this.opts = t.def(n, o || {}),
                this.opts.carousel.slickOpts.speed = i("body").hasClass(e.SUPPORT.TOUCH_DEVICE) ? 150 : 500,
                this.setElements(),
                this.setBindEvents(),
                this.setSlick())
            },
            setElements: function() {
                this.IE_LT_8 = i("body").hasClass(e.SUPPORT.IE_LT_8),
                this.wrap = this.container.find(this.opts.wrap),
                this.carousel = this.wrap.find(this.opts.carousel.wrap)
            },
            setBindEvents: function() {
                navigator.userAgent.match(/iPhone/i) && i(s).on("orientationchange", i.proxy(this.slickVwRender, this))
            },
            setSlick: function() {
                this.carousel.on("init", i.proxy(this.onSlickInit, this)),
                this.carousel.slick(this.opts.carousel.slickOpts),
                this.IE_LT_8 && (this.carousel.on("beforeChange", i.proxy(function() {
                    this.onResizeListener()
                }, this)),
                this.carousel.on("afterChange", i.proxy(function() {
                    this.onResizeListener()
                }, this)),
                i(s).on("resize", i.proxy(this.onResizeListener, this)),
                this.onResizeListener())
            },
            onSlickInit: function(s, e) {
                1 === e.slideCount && i(e.$slider).addClass(this.opts.onSingleClass)
            },
            getSlidePadding: function() {
                var s = 1440
                  , i = 769
                  , e = 70
                  , n = 30
                  , o = (e - n) / (s - i)
                  , a = e - (s - t.winSize().w) * o;
                return Math.min(a, e)
            },
            onResizeListener: function() {
                var s = t.winSize().w
                  , i = (this.carousel.outerWidth(),
                this.carousel.find(".slick-slide"));
                if (768 >= s)
                    i.css({
                        padding: ""
                    });
                else {
                    var e = this.getSlidePadding();
                    i.css({
                        padding: "0 " + e + "px"
                    })
                }
            },
            slickVwRender: function() {
                var s = this;
                i.each(this.carousel, function() {
                    var e = i(this).slick("slickCurrentSlide");
                    i(this).slick("unslick").slick(s.opts.carousel.slickOpts),
                    e && i(this).slick("slickGoTo", e, !0)
                })
            }
        }
    }(),
    i(function() {
        n.staticCarouselImageview.init(i("body"))
    })
}(window, window.jQuery);
