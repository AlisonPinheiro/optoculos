<template>
    <div class="lente__filtro">
         <section class="grupo__passos">
            <ul class="passos">
                <li :class="passoAtual === indice ? 'atual' : '' "
                    :key="indice"
                    class="passos__items"
                    v-for="(passo, indice) in passos">
                    <div class="passos__circulo">
                        <button v-on:click="passoAtual = indice">

                            <i class="ico-check" v-if="passo.validado"></i>
                            <span v-else>
                           {{indice + 1 }}
                        </span>

                        </button>
                        <span>
                       {{passo.titulo}}
                    </span>

                    </div>
                </li>
            </ul>

        </section>
        <section class="grupo__filtros">
            <div class="filtros__passos">
                <!--                passo 1 -->
                <div class="filtros__passo um" v-show="passoAtual === 0">

                    <div class="titulo">Indicação</div>
                    <div class="filtro__opcoes">
                        <ul>
                            <li :key="indice" v-for="(valorFiltro, indice) in getFiltroDados('Indicacao').opcoes">
                                <input
                                        :id="valorFiltro"
                                        :name="passos[0].titulo"
                                        :value="valorFiltro"
                                        type="radio"
                                        v-model="valoresSelecionados['Indicacao'].valor"

                                />
                                <label
                                        :for="valorFiltro"

                                >
                                    <i></i>
                                    <span>
                                        {{valorFiltro}}
                                    </span>
                                </label>
                                <button
                                        @click="limpaFiltro('Indicacao')"
                                >
                                    x
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <!--                passo 2 -->
                <div class="filtros__passo dois" v-show="passoAtual === 1">

                    <!--                    titulo -->
                    <div class="titulo">{{valoresSelecionados['Indicacao'].valor + ' '}}Descarte</div>
                    <!--                    opcoes -->
                    <div class="filtro__opcoes">
                        <ul>
                            <li :key="indice"
                                v-for="(valorFiltro, indice) in getFiltroDados('Descarte').opcoes"
                                :class="valorFiltro">>
                                <input
                                        :id="valorFiltro"
                                        :name="passos[1].titulo"
                                        :value="valorFiltro"
                                        type="radio"
                                        v-model="valoresSelecionados['Descarte'].valor"/>
                                <label
                                        :for="valorFiltro"
                                >
                                    <i></i>
                                    <span>
                                        {{valorFiltro}}
                                    </span>
                                </label>
                                <button
                                        @click="limpaFiltro('Descarte')"
                                >
                                    x
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="filtros__passo tres" v-show="passoAtual === 2">
                    <div class="titulo">Escolha o Grau</div>
                    <div class="filtro__opcoes">

                        <input id="grau__distinto" type="checkbox" v-model="apenasUmGrau"/>
                        <label for="grau__distinto">
                            <i></i>
                            <span>
                                {{apenasUmGrau ? 'Quero apenas um grau' : 'Quero apenas um grau'}}
                            </span>
                        </label>

                        <div class="filtro__opcao">
                            <label>{{apenasUmGrau ? 'Ambos os olhos' : 'Olho esquerdo'}}</label>
                            <select v-model="valoresSelecionados['oeEsferico'].valor">
                                <option
                                        :key="indice"
                                        :value="valorFiltro"
                                        v-for="(valorFiltro, indice) in getFiltroDados('Esferico').opcoes"
                                >
                                    {{valorFiltro}}

                                </option>
                            </select>

                            <select v-if="valoresSelecionados['Indicacao'].valor === 'Astigmatismo'"
                                    v-model="valoresSelecionados['oeCilindrico'].valor">
                                <option :key="indice"
                                        v-for="(valorFiltro, indice) in getFiltroDados('Cilindrico').opcoes">
                                    {{valorFiltro}}
                                </option>
                            </select>

                            <select v-if="valoresSelecionados['Indicacao'].valor === 'Astigmatismo'"
                                    v-model="valoresSelecionados['oeEixo'].valor">
                                <option
                                        :key="indice"
                                        :value="valorFiltro"
                                        v-for="(valorFiltro, indice) in getFiltroDados('Eixo').opcoes"
                                >
                                    {{valorFiltro}}
                                </option>
                            </select>
                            <button @click="limpaSelects()">x</button>
                        </div>

                        <div class="filtro__opcao" v-if="!apenasUmGrau">
                            <label>Olho direito</label>
                            <select v-model="valoresSelecionados['odEsferico'].valor">
                                <option
                                        :key="indice"
                                        :value="valorFiltro"
                                        v-for="(valorFiltro, indice) in getFiltroDados('Esferico').opcoes"
                                >
                                    {{valorFiltro}}
                                </option>
                            </select>
                            <select v-if="valoresSelecionados['Indicacao'].valor === 'Astigmatismo'"
                                    v-model="valoresSelecionados['odCilindrico'].valor">
                                <option
                                        :key="indice"
                                        :value="valorFiltro"
                                        v-for="(valorFiltro, indice) in getFiltroDados('Cilindrico').opcoes"
                                >
                                    {{valorFiltro}}
                                </option>
                            </select>
                            <select v-if="valoresSelecionados['Indicacao'].valor === 'Astigmatismo'"
                                    v-model="valoresSelecionados['odEixo'].valor">

                                <option
                                        :key="indice"
                                        :value="valorFiltro"
                                        v-for="(valorFiltro, indice) in getFiltroDados('Eixo').opcoes"
                                >
                                    {{valorFiltro}}
                                </option>
                            </select>
                            <button @click="limpaSelects()">x</button>
                        </div>

                    </div>
                </div>
            </div>

        </section>

    </div>
</template>

<script>
    export default {
        name: 'lenteFiltro',
        data: function () {
            return {
                filtrosCategoria: {},
                filtrosLentes: [],
                valoresSelecionados: {
                    'Indicacao': {
                        'valor': '',
                        'mapEspecificacao': 'specificationFilter_151'
                    },
                    'Descarte': {
                        'valor': '',
                        'mapEspecificacao': 'specificationFilter_167'
                    },
                    'oeCilindrico': {
                        'valor': '',
                        'mapEspecificacao': 'specificationFilter_169'
                    },
                    'odCilindrico': {
                        'valor': '',
                        'mapEspecificacao': 'specificationFilter_169'
                    },
                    'oeEsferico': {
                        'valor': '',
                        'mapEspecificacao': 'specificationFilter_168'
                    },
                    'odEsferico': {
                        'valor': '',
                        'mapEspecificacao': 'specificationFilter_168'
                    },
                    'oeEixo': {
                        'valor': '',
                        'mapEspecificacao': 'specificationFilter_170'
                    },
                    'odEixo': {
                        'valor': '',
                        'mapEspecificacao': 'specificationFilter_170'
                    }

                },

                passoAtual: 0,
                apenasUmGrau: false
            };
        },
        watch: {
            valoresSelecionados: {
                deep: true,
                handler() {
                    const validoUm = this.valoresSelecionados['Indicacao'].valor !== '';
                    const validoDois = this.valoresSelecionados['Descarte'].valor !== '';

                    if (!validoUm || !validoDois) {
                        this.getFiltrosCategoria()
                    }

                    this.getProdutos()

                }
            }
        },
        computed: {
            facetsBuscaUrl() {
                let diretorio = '';
                let map = '';

                for (let valorFiltro in this.valoresSelecionados) {
                    if (this.valoresSelecionados[valorFiltro].valor !== '') {
                        diretorio += '/' + this.valoresSelecionados[valorFiltro].valor
                    }
                }
                for (let valorFiltro in this.valoresSelecionados) {
                    if (this.valoresSelecionados[valorFiltro].valor !== '') {
                        map += ',' + this.valoresSelecionados[valorFiltro].mapEspecificacao
                    }
                }

                if (diretorio !== '') {
                    return 'lentes-de-contato' + diretorio + '?map=c' + map;
                } else {
                    return '/lentes-de-contato?map=c';
                }

            }
            ,
            buscaUrl() {
                let url = '';

                for (let valorFiltro in this.valoresSelecionados) {
                    if (this.valoresSelecionados[valorFiltro].valor !== '') {
                        url += '&fq=' + this.valoresSelecionados[valorFiltro].mapEspecificacao + ':' + this.valoresSelecionados[valorFiltro].valor
                    }
                }
                url = 'C=/4/' + url;
                return url;
            }
            ,
            passos() {
                const indicacao = this.valoresSelecionados['Indicacao'].valor;
                const validoUm = indicacao !== '';
                const validoDois = this.valoresSelecionados['Descarte'].valor !== '';

                const oeEsferico = this.valoresSelecionados['oeEsferico'].valor !== '';
                const odEsferico = this.valoresSelecionados['odEsferico'].valor !== '';
                const oeCilindrico = this.valoresSelecionados['oeCilindrico'].valor !== '';
                const odCilindrico = this.valoresSelecionados['odCilindrico'].valor !== '';
                const oeEixo = this.valoresSelecionados['oeEixo'].valor !== '';
                const odEixo = this.valoresSelecionados['odEixo'].valor !== '';

                const validoesquerdo = indicacao === 'Astigmatismo' ? oeCilindrico && oeEsferico && oeEixo : oeEsferico;
                const validoDireito = indicacao === 'Astigmatismo' ? odCilindrico && odEsferico && odEixo : odEsferico;

                const validoTres = this.apenasUmGrau ? validoesquerdo : validoesquerdo && validoDireito;
                return [
                    {
                        'titulo': 'Indicacao',
                        'validado': validoUm,
                    },
                    {
                        'titulo': 'Descarte',
                        'validado': validoDois,
                    },
                    {
                        'titulo': 'Grau',
                        'validado': validoTres,
                    }
                ]
            }


        }
        ,
        methods: {
            filtrosSchema: function () {
                const opcoesFiltro = [
                    {
                        'titulo': 'Indicacao',
                        'valorFiltro': '151',
                        'map': 'specificationFilter_',
                        'opcoes': []
                    },
                    {
                        'titulo': 'Descarte',
                        'valorFiltro': '167',
                        'map': 'specificationFilter_',
                        'opcoes': []
                    },
                    {
                        'titulo': 'Cilindrico',
                        'valorFiltro': '169',
                        'map': 'specificationFilter_',
                        'opcoes': []
                    },
                    {
                        'titulo': 'Esferico',
                        'valorFiltro': '168',
                        'map': 'specificationFilter_',
                        'opcoes': []
                    },
                    {
                        'titulo': 'Eixo',
                        'valorFiltro': '170',
                        'map': 'specificationFilter_',
                        'opcoes': []
                    },

                ];


                if (this.filtrosCategoria.SpecificationFilters) {
                    // const validoUm = this.valoresSelecionados['Indicacao'].valor !== '';
                    // const validoDois = this.valoresSelecionados['Descarte'].valor !== '';

                    opcoesFiltro.map((passo) => {
                        passo.opcoes = this.filtrosCategoria.SpecificationFilters[passo.titulo].map((dadosFiltro) => {
                            return dadosFiltro.Name
                        })
                    });
                }

                this.filtrosLentes = opcoesFiltro;

                return opcoesFiltro;

            },
            getFiltrosCategoria: async function () {
                return await fetch(`/api/catalog_system/pub/facets/search/${this.facetsBuscaUrl}`,)
                    .then((response) => {
                        response.json().then(data => {
                            window.console.log(data);
                            this.filtrosCategoria = data;
                            this.filtrosSchema()
                        });

                    })
            },
            getProdutos: async function () {
                return await fetch(`/api/catalog_system/pub/products/search/${this.facetsBuscaUrl}`,)
                    .then((response) => {
                        response.json().then(data => {
                            window.console.log(data);
                        });

                    })
            },
            getFiltroDados: function (nomeFiltro) {
                let buscaFilto = this.filtrosLentes.filter((dadoFiltro, i) => {
                    this.filtrosLentes[i]['indice'] = i;
                    return dadoFiltro.titulo === nomeFiltro
                });

                return buscaFilto && buscaFilto[0] || {
                    'titulo': 'Carregando',
                    'valorFiltro': '167',
                    'valorSelecionado': '',
                    'map': 'specificationFilter_',
                    'opcoes': []
                }
            },
            limpaFiltro: function (filtro) {
                this.valoresSelecionados[filtro].valor = '';
                this.limpaSelects()
            },
            limpaSelects: function () {
                this.valoresSelecionados['oeCilindrico'].valor = '';
                this.valoresSelecionados['oeEsferico'].valor = '';
                this.valoresSelecionados['oeEixo'].valor = '';
                this.valoresSelecionados['odCilindrico'].valor = '';
                this.valoresSelecionados['odEsferico'].valor = '';
                this.valoresSelecionados['odEixo'].valor = '';
            }

        }
        ,
        components: {}
        ,
        created() {
            this.getFiltrosCategoria()
        }
    }
</script>

<style lang="scss">
    $color1: #3c3c3b;
    $color2: #989898;
    $color3: #c8c8c8;
    $color4: #3cb6f7;
    $color5: #43c6cc;
    $color6: #0dd0ae;
    $color7: #3ba5a8;
    $color8: #ff613b;
    $color9: #9a5bb3;
    $color10: #ffd01e;

    $mobile-size: 720px;
    $tablet-size: 1024px;
    $desktop-size: 1280px;
    $largedesktop-size: 1281px;

    #app {
        width: 80%;
        margin: 10% auto;

        .passos {
            display: flex;
            justify-content: center;
            transition: .3s all ease-in-out;
            max-width: 100%;
            padding-bottom: 30px;


            &:after {
                display: none;
            }

            &__items {
                display: flex;
                align-items: center;
                width: 100%;


                &:before {
                    content: '';
                    display: block;
                    height: 2px;
                    background-color: #ccc;
                    width: calc(100% - 32px);
                    transition: 1s all ease-in-out;
                }

                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: .8s all ease-in-out;
                    transition-delay: .3s;
                }

                &:first-child {
                    &:before {
                        display: none;
                    }

                    width: auto;
                }

                &.atual {
                    button {
                        border-color: $color5;
                        color: $color5;

                        &:before {
                            background-color: $color5;
                        }

                    }

                    &:before {
                        background-color: $color5;
                    }
                }


            }

            button {
                border-radius: 100%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                border: 3px solid #ccc;
                background: #fff;
                color: #ccc;


            }

            &__circulo {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                position: relative;

                > span {
                    position: absolute;
                    bottom: -20px;
                }
            }
        }


        .filtro {
            &__opcoes {
                > ul {
                    li {
                        position: relative;
                    }
                }
            }
        }

        select {
            padding: 10px;
            border: 1px solid #ccc;
            margin: 0 5px;

            option {
                &:hover {
                    box-shadow: 0 0 10px 100px #1882A8 inset;
                }
            }
        }

        input {
            display: none;

            & + label {
                cursor: pointer;
                width: 100%;
                display: flex;
                align-items: center;
                padding: 25px;
                border: 1px solid #e0e0e0;
                border-radius: 35px;
                background: #fff;
                font-weight: 700;
                margin: 0 0 10px;
                transition: .3s all ease-in-out;
                font-size: 12px;

                @media only screen and (max-width: $mobile-size) {
                    padding: 5px;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                }

                i {
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background-color: #d3d3d3;
                    margin-right: 10px;

                    @media only screen and (max-width: $mobile-size) {
                        display: none;
                    }
                }

                & + button {
                    visibility: hidden;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 72px;
                    height: 72px;
                    background: $color8;
                    border: 0;
                    cursor: pointer;
                    font-size: 23px;
                    font-weight: 700;
                    border-radius: 0 35px 35px 0;
                    color: #fff;
                    padding: 0;
                }
            }

            &:checked {
                + label {
                    background-color: #f8f8f8;
                    border-color: transparent;

                    i {
                        background-color: $color5;
                    }

                    @media only screen and (max-width: $mobile-size) {
                        background-color: $color5;

                        color: white;
                    }

                    & + button {
                        visibility: visible;
                        padding: 0;
                    }
                }
            }

        }

        .filtros__passo {
            &.tres {
                label {
                    min-width: 100px;
                }
            }
        }

    }
</style>
