(function (e) {
    function s(s) {
        for (var a, r, n = s[0], c = s[1], l = s[2], u = 0, f = []; u < n.length; u++) (r = n[u]), Object.prototype.hasOwnProperty.call(o, r) && o[r] && f.push(o[r][0]), (o[r] = 0);
        for (a in c) Object.prototype.hasOwnProperty.call(c, a) && (e[a] = c[a]);
        p && p(s);
        while (f.length) f.shift()();
        return i.push.apply(i, l || []), t();
    }
    function t() {
        for (var e, s = 0; s < i.length; s++) {
            for (var t = i[s], a = !0, n = 1; n < t.length; n++) {
                var c = t[n];
                0 !== o[c] && (a = !1);
            }
            a && (i.splice(s--, 1), (e = r((r.s = t[0]))));
        }
        return e;
    }
    var a = {},
        o = { app: 0 },
        i = [];
    function r(s) {
        if (a[s]) return a[s].exports;
        var t = (a[s] = { i: s, l: !1, exports: {} });
        return e[s].call(t.exports, t, t.exports, r), (t.l = !0), t.exports;
    }
    (r.m = e),
        (r.c = a),
        (r.d = function (e, s, t) {
            r.o(e, s) || Object.defineProperty(e, s, { enumerable: !0, get: t });
        }),
        (r.r = function (e) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (r.t = function (e, s) {
            if ((1 & s && (e = r(e)), 8 & s)) return e;
            if (4 & s && "object" === typeof e && e && e.__esModule) return e;
            var t = Object.create(null);
            if ((r.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: e }), 2 & s && "string" != typeof e))
                for (var a in e)
                    r.d(
                        t,
                        a,
                        function (s) {
                            return e[s];
                        }.bind(null, a)
                    );
            return t;
        }),
        (r.n = function (e) {
            var s =
                e && e.__esModule
                    ? function () {
                          return e["default"];
                      }
                    : function () {
                          return e;
                      };
            return r.d(s, "a", s), s;
        }),
        (r.o = function (e, s) {
            return Object.prototype.hasOwnProperty.call(e, s);
        }),
        (r.p = "/arquivos/");
    var n = (window["webpackJsonp"] = window["webpackJsonp"] || []),
        c = n.push.bind(n);
    (n.push = s), (n = n.slice());
    for (var l = 0; l < n.length; l++) s(n[l]);
    var p = c;
    i.push([0, "chunk-vendors"]), t();
})({
    0: function (e, s, t) {
        e.exports = t("56d7");
    },
    "15a8": function (e, s, t) {},
    "56d7": function (e, s, t) {
        "use strict";
        t.r(s);
        t("cadf"), t("551c"), t("f751"), t("097d");
        var a = t("2b0e"),
            o = function () {
                var e = this,
                    s = e.$createElement,
                    t = e._self._c || s;
                return t("div", { attrs: { id: "app" } }, [
                    t("link", { attrs: { href: "https://optoculos.vtexcommercestable.com.br/arquivos/style-optoculos.css", rel: "stylesheet", type: "text/css" } }),
                    t("section", { staticClass: "setps-number" }, [
                        t(
                            "ul",
                            { staticClass: "steps" },
                            e._l(e.stepsFilter, function (s, a) {
                                return t("li", { key: a, staticClass: "steps__items", class: [e.passo >= a ? "atual" : "", e.passosProntos[a] ? "preenchido" : ""] }, [
                                    t(
                                        "button",
                                        {
                                            on: {
                                                click: function (s) {
                                                    (e.passosProntos[a - 1] || 0 === a) && (e.passo = a);
                                                },
                                            },
                                        },
                                        [
                                            e.passosProntos[a] ? t("i", { staticClass: "ico-check" }) : t("span", [e._v("\n                         " + e._s(a + 1) + "\n                      ")]),
                                            t("span", { staticClass: "step__title" }, [e._v(e._s(e.stepsFilter[a]))]),
                                        ]
                                    ),
                                ]);
                            }),
                            0
                        ),
                    ]),
                    t(
                        "section",
                        { staticClass: "filtros" },
                        e._l(e.especificacoes, function (s, a) {
                            return t(
                                "div",
                                {
                                    directives: [{ name: "show", rawName: "v-show", value: a === e.stepsFilter[e.passo], expression: "iEspecificacao === stepsFilter[passo]" }],
                                    key: a,
                                    staticClass: "step__content",
                                    class: a.split(" ").join("").toLocaleLowerCase(),
                                },
                                [
                                    t("h3", { staticClass: "especificacao__titulo" }, [e._v(e._s(a))]),
                                    t(
                                        "ul",
                                        { staticClass: "especificacoes" },
                                        e._l(s, function (s, o) {
                                            return t(
                                                "li",
                                                {
                                                    directives: [{ name: "show", rawName: "v-show", value: e.filtroMarca(s.Name, a), expression: "filtroMarca(filtro.Name,iEspecificacao)" }],
                                                    key: o,
                                                    staticClass: "especificacoes__item",
                                                    class: s.Name.split(" ").join("-").toLocaleLowerCase(),
                                                    style: { order: s.order },
                                                },
                                                [
                                                    t("input", {
                                                        directives: [{ name: "model", rawName: "v-model", value: e.passosProntos[e.stepsFilter.indexOf(a)], expression: "passosProntos[stepsFilter.indexOf(iEspecificacao)]" }],
                                                        attrs: { id: s.Name, name: a, type: "radio" },
                                                        domProps: { checked: e._q(e.passosProntos[e.stepsFilter.indexOf(a)], null) },
                                                        on: {
                                                            change: [
                                                                function (s) {
                                                                    e.$set(e.passosProntos, e.stepsFilter.indexOf(a), null);
                                                                },
                                                                function (s) {
                                                                    e.setPasso(e.stepsFilter.indexOf(a)), e.setEspecificacoes(a, o);
                                                                },
                                                            ],
                                                        },
                                                    }),
                                                    t("label", { attrs: { for: s.Name } }, [
                                                        t("i"),
                                                        t("span", { staticClass: "especificacoes__nome" }, [e._v(e._s(s.Name))]),
                                                        t("span", { staticClass: "especificacoes__descricao" }, [e._v(e._s(s.description))]),
                                                    ]),
                                                ]
                                            );
                                        }),
                                        0
                                    ),
                                    t("div", { staticClass: "setas" }, [
                                        t(
                                            "button",
                                            {
                                                staticClass: "voltar",
                                                on: {
                                                    click: function (s) {
                                                        e.passo > 0 ? e.passo-- : (e.passo = 0);
                                                    },
                                                },
                                            },
                                            [t("i", [e._v("<")]), t("span", [e._v("Voltar ")])]
                                        ),
                                        e.passosProntos[e.stepsFilter.indexOf(a)] && e.stepsFilter.indexOf(a) < e.stepsFilter.length - 1
                                            ? t(
                                                  "button",
                                                  {
                                                      staticClass: "btn",
                                                      on: {
                                                          click: function (s) {
                                                              e.passo < e.stepsFilter.length - 1 ? e.passo++ : (e.passo = e.stepsFilter.length - 1);
                                                          },
                                                      },
                                                  },
                                                  [e._v("\n          Continuar\n        ")]
                                              )
                                            : e._e(),
                                        t("button", {
                                            directives: [{ name: "show", rawName: "v-show", value: e.passosCompletos, expression: "passosCompletos" }],
                                            staticClass: "btn",
                                            class: e.lente ? "" : "indisponivel",
                                            domProps: { textContent: e._s(e.lente && e.lente.items[0].sellers[0].commertialOffer.AvailableQuantity > 0 ? "Comprar" : "Combinação indisponível") },
                                            on: {
                                                click: function (s) {
                                                    return e.comprar();
                                                },
                                            },
                                        }),
                                    ]),
                                    t("div", { staticClass: "adivice" }, [e._v("Após a compra você receberá posteriormente um e-mail com orientações sobre o envio da receita e medidas ópticas.")]),
                                ]
                            );
                        }),
                        0
                    ),
                    t("section", { staticClass: "produto__combinado" }, [
                        t("div", { staticClass: "produto__imagem" }, [t("img", { attrs: { src: e.armacao.skus[0].image.replace("529-529", "400-300"), alt: "" } })]),
                        t("div", { staticClass: "produto__nome" }, [e._v("\n      " + e._s(e.armacao.name) + "\n    ")]),
                        t("div", { staticClass: "produto__preco" }, [
                            t("span", { staticClass: "produto__preco__texto" }, [e._v("\n              Preço da armação:\n              ")]),
                            t("span", { staticClass: "produto__armacao__valor" }, [e._v("\n                  R$ " + e._s(e.intToReal(e.armacao.skus[0].bestPrice)) + "\n\n              ")]),
                        ]),
                        e.lente && e.lente.items[0].sellers[0].commertialOffer.AvailableQuantity
                            ? t("div", { staticClass: "produto__preco" }, [
                                  t("span", { staticClass: "produto__preco__texto" }, [e._v("\n              Preço da lente:\n              ")]),
                                  t("span", { staticClass: "produto__lente__valor" }, [e._v("\n                  R$ " + e._s(e.intToReal(100 * e.lente.items[0].sellers[0].commertialOffer.Price * 2)) + " (par)\n              ")]),
                              ])
                            : e._e(),
                        e.lente
                            ? t("div", { staticClass: "produto__total" }, [e.total ? t("span", { staticClass: "produto__total__valor" }, [e._v("\n                  Total: R$ " + e._s(e.intToReal(e.total)) + "\n              ")]) : e._e()])
                            : e._e(),
                    ]),
                ]);
            },
            i = [],
            r = (t("96cf"), t("3b8d")),
            n =
                (t("a481"),
                {
                    productId: 2507,
                    name: "Armação Opt Oculos MB3377 C1 55 - Azul",
                    salesChannel: "1",
                    available: !0,
                    displayMode: "especificacao",
                    dimensions: [],
                    dimensionsInputType: {},
                    dimensionsMap: {},
                    skus: [
                        {
                            sku: 2506,
                            skuname: "Armação Opt Oculos MB3377 C1 55 - Azul",
                            dimensions: {},
                            available: !0,
                            availablequantity: 5,
                            cacheVersionUsedToCallCheckout: "604ef0257b5f3f59ea8fd7c28bae090b_",
                            listPriceFormated: "R$ 0,00",
                            listPrice: 0,
                            taxFormated: "R$ 0,00",
                            taxAsInt: 0,
                            bestPriceFormated: "R$ 199,00",
                            bestPrice: 19900,
                            installments: 6,
                            installmentsValue: 3316,
                            installmentsInsterestRate: 0,
                            image: "https://optoculos.vteximg.com.br/arquivos/ids/158283-529-529/ARMACOES-OPTOCULOS-MB3377-C1-55-1.jpg?v=636914551076870000",
                            sellerId: "1",
                            seller: "Opt óculos",
                            measures: { cubicweight: 1, height: 8.5, length: 21, weight: 400, width: 13 },
                            unitMultiplier: 1,
                            rewardValue: 0,
                            values: [],
                            discount: -19900,
                            hasDiscount: !1,
                            validListPrice: !1,
                            validBestPrice: !0,
                        },
                    ],
                }),
            c = window.skuJson || n,
            l = !1,
            p = {
                name: "pagina-produto",
                data: function () {
                    return {
                        especificacoes: {},
                        especificacoesValores: [],
                        passo: 0,
                        stepsFilter: ["Categoria - Estilo", "Marcas", "Material", "Cor - Propriedade", "Tratamento"],
                        passosProntos: [!1, !1, !1, !1, !1],
                        account: "optoculos",
                        armacao: c,
                        lente: l,
                    };
                },
                methods: {
                    intToReal: function (e) {
                        var s = e + "";
                        return (s = s.replace(/([0-9]{2})$/g, ",$1")), s.length > 6 && (s = s.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")), s;
                    },
                    filtros: (function () {
                        var e = Object(r["a"])(
                            regeneratorRuntime.mark(function e() {
                                var s,
                                    t = this;
                                return regeneratorRuntime.wrap(function (e) {
                                    while (1)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    (s = function (e, s) {
                                                        return function (t) {
                                                            return (t.description = e[t.Name] || ""), (t.order = s[t.Name] || 999), t;
                                                        };
                                                    }),
                                                    (e.next = 3),
                                                    fetch("/api/catalog_system/pub/facets/search/lentes?map=c").then(function (e) {
                                                        e.json().then(function (e) {
                                                            var a = {
                                                                    "Categoria - Estilo": e.SpecificationFilters["Categoria"],
                                                                    Marcas: e["Brands"],
                                                                    Material: e.SpecificationFilters["Material"],
                                                                    "Cor - Propriedade": e.SpecificationFilters["Cor"],
                                                                    Tratamento: e.SpecificationFilters["Tratamento"],
                                                                },
                                                                o = { "Varilux Comfort": 2000059, "Vs Acabadas": 2000121, "Visao Simples": 2000123, "Sirius Easy": 2000227, "Sirius Advance": 2000228 };
                                                            (i = { "Sirius Easy": 1, "Sirius Advance": 2, "Varilux Comfort": 3 }),
                                                                (r = {
                                                                    "Sirius Easy": "Fabricação digital com maior precisão óptica",
                                                                    "Sirius Advance": "Lentes customizadas com maior campo visual para todas as distâncias",
                                                                    "Varilux Comfort": "Adaptação mais suave graças a tecnologia Wave 2.0",
                                                                }),
                                                                a["Marcas"].map(function (e) {
                                                                    return (e.Value = o[e.Name]), e;
                                                                }),
                                                                a["Marcas"].map(s(r, i)),
                                                                (r = { Monofocais: "Lentes para Longe ou Perto", Progressivas: "Lentes multifocais para longe, média distância e perto" }),
                                                                a["Categoria - Estilo"].map(s(r, i)),
                                                                (r = { "Transitions Cinza": "Lentes que escurecem no sol e clareiam em ambientes internos" }),
                                                                a["Cor - Propriedade"].map(s(r, i));
                                                            var i = { "Resina 1.50": 1, "Policarbonato 1.59": 2, "Resina 1.67": 3 },
                                                                r = {
                                                                    "Resina 1.50": "Lentes convencionais",
                                                                    "Policarbonato 1.59": "Lentes mais finas e com maior resistência a impactos",
                                                                    "Resina 1.67": "Lentes finíssimas, mais confortáveis e com melhor estética",
                                                                };
                                                            a["Material"].map(s(r, i)),
                                                                (i = { "Sem Tratamento": 1, Antirreflexo: 2, "Trio Easy Clean": 3, Stratus: 4, "Stratus Ultra": 5, "Crizal Sapphire": 6 }),
                                                                (r = {
                                                                    Antirreflexo: "Redução dos reflexos indesejáveis, proporcionando maior nitidez e conforto visual. \n\nObs.: Exclusivo para lentes Monofocais",
                                                                    "Trio Easy Clean": "Redução dos reflexos indesejáveis, proporcionando maior nitidez e conforto visual. \n\nObs.: Exclusivo para Monofocais e Progressivas Varilux",
                                                                    Stratus: "Redução dos reflexo indesejáveis, proporcionando maior nitidez e conforto visual. \n\nObs.: Exclusivo para Progressivas Sirius",
                                                                    "Stratus Ultra": "Além de mais ní­tidas, são mais resistentes, mais fáceis de limpar e repelem a água e a poeira. \n\nObs.: Exclusivo para Progressivas Sirius",
                                                                    "Crizal Sapphire":
                                                                        "Máxima transparência, maior nitidez e mais fáceis de limpar. 2 anos de de garantia contra riscos* \n\nObs.: Exclusivo para Monofocais e Progressivas Varilux",
                                                                    "Sem Tratamento": "",
                                                                }),
                                                                a["Tratamento"].map(s(r, i)),
                                                                (t.especificacoes = a);
                                                        });
                                                    })
                                                );
                                            case 3:
                                                return e.abrupt("return", e.sent);
                                            case 4:
                                            case "end":
                                                return e.stop();
                                        }
                                }, e);
                            })
                        );
                        function s() {
                            return e.apply(this, arguments);
                        }
                        return s;
                    })(),
                    getLente: (function () {
                        var e = Object(r["a"])(
                            regeneratorRuntime.mark(function e() {
                                var s,
                                    t,
                                    a = this;
                                return regeneratorRuntime.wrap(
                                    function (e) {
                                        while (1)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return (
                                                        (s = this),
                                                        (t = this.especificacoesValores.map(function (e, t) {
                                                            var a = s.especificacoes[s.stepsFilter[t]][e].Map,
                                                                o = s.especificacoes[s.stepsFilter[t]][e].Value;
                                                            return "b" === a ? (a = "B") : (o = o.replace("%40dot%40", "%2E")), "fq=" + a + ":" + o;
                                                        })),
                                                        (e.next = 4),
                                                        fetch("/api/catalog_system/pub/products/search?fq=C:/7/&".concat(t.join("&")))
                                                            .then(function (e) {
                                                                return e.json();
                                                            })
                                                            .then(function (e) {
                                                                a.lente = (e.length > 0 && e[0]) || !1;
                                                            })
                                                            .catch(function (e) {
                                                                console.log(e);
                                                            })
                                                    );
                                                case 4:
                                                case "end":
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    this
                                );
                            })
                        );
                        function s() {
                            return e.apply(this, arguments);
                        }
                        return s;
                    })(),
                    comprar: function () {
                        var e = this,
                            s = [
                                { id: this.armacao.skus[0].sku, quantity: 1, seller: "1" },
                                { id: this.lente.items[0].itemId, quantity: 2, seller: "1" },
                            ];
                        window.vtexjs.checkout.getOrderForm().done(function () {
                            window.vtexjs.checkout.addToCart(s, null, 1).done(function (s) {
                                var t = { SkuArmacao: e.armacao.skus[0].sku };
                                window.vtexjs.checkout.addItemAttachment(s.items.length - 1, "Observacao", t, null, !1).done(function () {
                                    location.href = "/checkout";
                                });
                            });
                        });
                    },
                    setPasso: function (e) {
                        this.passosProntos[e] = !0;
                    },
                    setEspecificacoes: function (e, s) {
                        this.especificacoesValores[this.stepsFilter.indexOf(e)] = s;
                    },
                    filtroMarca: function (e, s) {
                        var t = (this.especificacoes[this.stepsFilter[0]][this.especificacoesValores[0]] && this.especificacoes[this.stepsFilter[0]][this.especificacoesValores[0]].Name) || "";
                        return "Progressivas" === t && s === this.stepsFilter[1]
                            ? "Sirius Easy" === e || "Varilux Comfort" === e || "Sirius Advance" === e
                            : "Monofocais" !== t || s !== this.stepsFilter[1] || (0 === this.passo && ((this.especificacoesValores[1] = 1), (this.passosProntos[1] = !0)), "Vs Acabadas" === e);
                    },
                },
                computed: {
                    total: function () {
                        var e = this.armacao.skus && this.armacao.skus[0].bestPrice,
                            s = this.lente && 100 * this.lente.items[0].sellers[0].commertialOffer.Price;
                        return 2 * s + e;
                    },
                    passosCompletos: function () {
                        var e = this.passosProntos.reduce(function (e, s) {
                            return e && s;
                        }, !0);
                        return e && this.getLente(), e;
                    },
                },
                filters: {},
                created: function () {
                    this.especificacoes = this.filtros();
                },
            },
            u = p,
            f = (t("9825"), t("2877")),
            m = Object(f["a"])(u, o, i, !1, null, "ccb44ec6", null),
            d = m.exports,
            v = t("8c4f"),
            h = function () {
                var e = this,
                    s = e.$createElement,
                    t = e._self._c || s;
                return t("div", { staticClass: "produto" }, [
                    t(
                        "div",
                        { staticClass: "filterOptions" },
                        e._l(e.filtros.SpecificationFilters, function (e, s) {
                            return t("ul", { key: e.Map, staticClass: "refino" }, [t("selectGrupo", { attrs: { especificacao: e, chave: s } })], 1);
                        }),
                        0
                    ),
                ]);
            },
            _ = [],
            b = function () {
                var e = this,
                    s = e.$createElement,
                    t = e._self._c || s;
                return t("div", { staticClass: "refino" }, [
                    t("fieldset", [
                        t(
                            "h5",
                            {
                                on: {
                                    click: function (s) {
                                        e.mostrarValores = !e.mostrarValores;
                                    },
                                },
                            },
                            [e._v("\n            " + e._s(e.chave) + "\n        ")]
                        ),
                        t(
                            "div",
                            { directives: [{ name: "show", rawName: "v-show", value: e.mostrarValores, expression: "mostrarValores" }], staticClass: "refino__valores" },
                            e._l(e.especificacao, function (s, a) {
                                return t("div", { key: a, class: "refino__valor--" + e.chave }, [t("label", [t("input", { attrs: { type: "checkbox" } }), t("span", [e._v(e._s(s.Name))])])]);
                            }),
                            0
                        ),
                    ]),
                ]);
            },
            C = [],
            g = {
                name: "SelectGrupo",
                data: function () {
                    return { mostrarValores: !1 };
                },
                props: ["especificacao", "chave"],
                computed: {},
            },
            x = g,
            P = Object(f["a"])(x, b, C, !1, null, "6574a210", null),
            y = P.exports,
            w = { name: "pagina-produto", props: ["filtros"], components: { selectGrupo: y }, created: function () {} },
            O = w,
            k = Object(f["a"])(O, h, _, !1, null, null, null),
            S = k.exports;
        a["a"].use(v["a"]);
        var F = new v["a"]({ mode: "history", base: "/arquivos/", routes: [{ path: "/lentes-de-contato", name: "lentes-de-contato", component: S }] });
        (a["a"].config.productionTip = !1),
            new a["a"]({
                router: F,
                render: function (e) {
                    return e(d);
                },
            }).$mount("#app");
    },
    9825: function (e, s, t) {
        "use strict";
        var a = t("15a8"),
            o = t.n(a);
        o.a;
    },
});
//# sourceMappingURL=app.e8547d1f.js.map
