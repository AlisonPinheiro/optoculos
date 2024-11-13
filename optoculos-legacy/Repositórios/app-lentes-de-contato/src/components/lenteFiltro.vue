<template>
  <div class="lente__filtro">
    <section class="grupo__passos">
      <ul class="passos">
        <li
          :class="[
            passo.validado ? 'preenchido' : '',
            passoAtual === indice ? 'atual' : '',
          ]"
          :key="indice"
          class="passos__items"
          v-for="(passo, indice) in passos"
        >
          <div class="passos__circulo">
            <button
              :class="
                indice === 0 || passos[indice - 1].validado
                  ? 'habilitado'
                  : 'desabilitado'
              "
              v-on:click="
                indice === 0 || passos[indice - 1].validado
                  ? (passoAtual = indice)
                  : false
              "
            >
              <i class="ico-check" v-if="passo.validado"></i>
              <span v-else>
                {{ indice + 1 }}
              </span>
            </button>
            <span>
              {{ passo.titulo }}
            </span>
          </div>
        </li>
      </ul>
    </section>
    <section class="grupo__filtros">
      <div class="filtros__passos">
        <!--                passo 1 -->
        <div class="filtros__passo um" v-show="passoAtual === 0">
          <div class="titulo__filtro">Indicação</div>
          <div class="filtro__opcoes">
            <ul>
              <li
                :key="indice"
                v-for="(valorFiltro, indice) in getFiltroDados('Indicacao')
                  .opcoes"
              >
                <input
                  :id="_uid + '__' + valorFiltro"
                  :name="_uid + '__' + passos[0].titulo"
                  :value="valorFiltro"
                  type="radio"
                  v-model="valoresSelecionados['Indicacao'].valor"
                />
                <label :for="_uid + '__' + valorFiltro" @click="passoAtual = 1">
                  <i class="ico-check"></i>
                  <span>
                    {{ valorFiltro }}
                  </span>
                </label>
                <button @click="[setPassoAtual(0), limpaFiltro('Indicacao')]">
                  <i class="ico-close"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!--                passo 2 -->
        <div class="filtros__passo dois" v-show="passoAtual === 1">
          <!--                    titulo -->
          <div class="titulo__filtro">
            {{ valoresSelecionados["Indicacao"].valor + " - " }}Descarte
          </div>
          <!--                    opcoes -->
          <div class="filtro__opcoes">
            <ul>
              <li
                :key="indice"
                v-for="(valorFiltro, indice) in getFiltroDados('Descarte')
                  .opcoes"
                :class="valorFiltro"
              >
                <input
                  :id="_uid + '__' + valorFiltro"
                  :name="_uid + '__' + passos[1].titulo"
                  :value="valorFiltro"
                  type="radio"
                  v-model="valoresSelecionados['Descarte'].valor"
                />
                <label
                  :for="_uid + '__' + valorFiltro"
                  @click="setPassoAtual(2)"
                >
                  <i class="ico-check"></i>
                  <span>
                    {{ valorFiltro }}
                  </span>
                </label>
                <button @click="[limpaFiltro('Descarte')]">
                  <i class="ico-close"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="filtros__passo tres" v-show="passoAtual === 2">
          <div class="titulo__filtro">
            {{ valoresSelecionados["Indicacao"].valor + " - " }} Escolha o Grau
          </div>
          <div class="filtro__opcoes">
            <div class="filtro__opcao">
              <select v-model="valoresSelecionados['Esferico'].valor">
                <option disabled selected value="">esférico</option>
                <option
                  :key="indice"
                  :value="valorFiltro"
                  v-for="(valorFiltro, indice) in getFiltroDados('Esferico')
                    .opcoes"
                >
                  {{ valorFiltro }}
                </option>
              </select>

              <!---->
              <select
                v-if="valoresSelecionados['Indicacao'].valor === 'Astigmatismo'"
                v-model="valoresSelecionados['Cilindrico'].valor"
              >
                <option disabled selected value="">cilindrico</option>
                <option
                  :key="indice"
                  v-for="(valorFiltro, indice) in getFiltroDados('Cilindrico')
                    .opcoes"
                >
                  {{ valorFiltro }}
                </option>
              </select>
              <!--v-if="valoresSelecionados['Indicacao'].valor === 'Astigmatismo'"-->
              <select
                v-if="valoresSelecionados['Indicacao'].valor === 'Astigmatismo'"
                v-model="valoresSelecionados['Eixo'].valor"
              >
                <option disabled selected value="">Eixo</option>
                <option
                  :key="indice"
                  :value="valorFiltro"
                  v-for="(valorFiltro, indice) in getFiltroDados('Eixo').opcoes"
                >
                  {{ valorFiltro }}
                </option>
              </select>
              <button
                class="limpaSelects"
                @click="[limpaSelects()]"
                v-if="passos[2].validado"
              >
                Limpar campos<i class="ico-close"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="filtros__passo tres" v-show="passoAtual === 3">
          <div class="titulo__filtro">Escolha seu produto</div>
          <div class="filtro__opcoes">
            <div class="filtro__opcao">
              <ul
                class="produto__encontrados"
                v-if="produtoEncontrados.length > 0"
              >
                <li
                  :key="indice"
                  v-for="(produto, indice) in produtoEncontrados"
                >
                  <input
                    :id="_uid + '__' + produto.productId"
                    :name="_uid + '__' + produto.productId"
                    :value="indice"
                    type="radio"
                    v-model="produtoSelecionado"
                  />
                  <label :for="_uid + '__' + produto.productId">
                    <div class="produto">
                      <div class="produto__imagem">
                        <img
                          :src="`/arquivos/ids/${produto.items[0].images[0].imageId}-300-300/${produto.items[0].images[0].imageId}.jpg`"
                          alt=""
                        />
                      </div>
                      <div class="produto__info">
                        <div class="produto__nome">
                          {{ produto.productName }}
                        </div>
                        <div class="produto__especificacoes">
                          <p>Material : {{ produto["Material"][0] }}</p>
                          <p>Cor - Propriedade : {{ produto["Cor"][0] }}</p>
                        </div>
                        <div class="produto__preco">
                          <div class="produto__preco--melhor">
                            R$
                            {{
                              produto.items[0].sellers[0].commertialOffer.Price
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
              <p v-else-if="!buscando">Nenhum resultado encontrado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="grupo__produtos"></section>
  </div>
</template>

<script>
export default {
  name: "lenteFiltro",
  data: function () {
    return {
      passoAtual: 0,
      filtrosCategoria: {},
      filtrosLentes: [],
      valoresSelecionados: {
        Indicacao: {
          valor: "",
          mapEspecificacao: "specificationFilter_151",
        },
        Descarte: {
          valor: "",
          mapEspecificacao: "specificationFilter_167",
        },
        Cilindrico: {
          valor: "",
          mapEspecificacao: "specificationFilter_169",
        },
        Esferico: {
          valor: "",
          mapEspecificacao: "specificationFilter_168",
        },
        Eixo: {
          valor: "",
          mapEspecificacao: "specificationFilter_170",
        },
      },
      produtoEncontrados: [],
      buscando: true,
      produtoSelecionado: null,
    };
  },
  watch: {
    produtoSelecionado() {
      this.$emit(
        "encontrado",
        this.produtoEncontrados[this.produtoSelecionado]
      );
    },
    valoresSelecionados: {
      deep: true,
      handler() {
        const validoUm = this.valoresSelecionados["Indicacao"].valor !== "";
        const validoDois = this.valoresSelecionados["Descarte"].valor !== "";

        const Esferico = this.valoresSelecionados["Esferico"].valor !== "";
        const Cilindrico = this.valoresSelecionados["Cilindrico"].valor !== "";
        const Eixo = this.valoresSelecionados["Eixo"].valor !== "";
        const validoTres =
          this.valoresSelecionados["Indicacao"].valor === "Astigmatismo"
            ? Cilindrico && Esferico && Eixo
            : Esferico;

        if (!validoUm || !validoDois) {
          this.getFiltrosCategoria();
          this.limpaSelects();
        }
        if (validoTres) {
          this.passoAtual = 3;

          this.getProdutos();
        }
        this.produtoSelecionado = null;
        this.produtoEncontrados = [];
        this.$emit("encontrado", null);
      },
    },
  },
  computed: {
    facetsBuscaUrl() {
      let diretorio = "";
      let map = "";

      for (let valorFiltro in this.valoresSelecionados) {
        if (this.valoresSelecionados[valorFiltro].valor !== "") {
          diretorio += "/" + this.valoresSelecionados[valorFiltro].valor;
        }
      }
      for (let valorFiltro in this.valoresSelecionados) {
        if (this.valoresSelecionados[valorFiltro].valor !== "") {
          map += "," + this.valoresSelecionados[valorFiltro].mapEspecificacao;
        }
      }

      if (diretorio !== "") {
        return "lentes-de-contato" + diretorio + "?map=c" + map;
      } else {
        return "/lentes-de-contato?map=c";
      }
    },
    buscaUrl() {
      let url = "";

      for (let valorFiltro in this.valoresSelecionados) {
        if (this.valoresSelecionados[valorFiltro].valor !== "") {
          url +=
            "&fq=" +
            this.valoresSelecionados[valorFiltro].mapEspecificacao +
            ":" +
            this.valoresSelecionados[valorFiltro].valor;
        }
      }
      url = "C=/4/" + url;
      return url;
    },
    passos() {
      const indicacao = this.valoresSelecionados["Indicacao"].valor;
      const validoUm = indicacao !== "";
      const validoDois = this.valoresSelecionados["Descarte"].valor !== "";

      const Esferico = this.valoresSelecionados["Esferico"].valor !== "";
      const Cilindrico = this.valoresSelecionados["Cilindrico"].valor !== "";
      const Eixo = this.valoresSelecionados["Eixo"].valor !== "";

      const validoesquerdo =
        indicacao === "Astigmatismo"
          ? Cilindrico && Esferico && Eixo
          : Esferico;

      const validoTres = validoesquerdo;

      return [
        {
          titulo: "Indicacao",
          validado: validoUm,
        },
        {
          titulo: "Descarte",
          validado: validoDois,
        },
        {
          titulo: "Grau",
          validado: validoTres,
        },
        {
          titulo: "Comprar",
          validado: validoTres,
        },
      ];
    },
  },
  methods: {
    filtrosSchema: function () {
      const opcoesFiltro = [
        {
          titulo: "Indicacao",
          valorFiltro: "151",
          map: "specificationFilter_",
          opcoes: [],
        },
        {
          titulo: "Descarte",
          valorFiltro: "167",
          map: "specificationFilter_",
          opcoes: [],
        },
        {
          titulo: "Cilindrico",
          valorFiltro: "169",
          map: "specificationFilter_",
          opcoes: [],
        },
        {
          titulo: "Esferico",
          valorFiltro: "168",
          map: "specificationFilter_",
          opcoes: [],
        },
        {
          titulo: "Eixo",
          valorFiltro: "170",
          map: "specificationFilter_",
          opcoes: [],
        },
      ];

      try {
        if (this.filtrosCategoria.SpecificationFilters) {
          opcoesFiltro.map((passo) => {
            passo.opcoes = this.filtrosCategoria.SpecificationFilters[
              passo.titulo
            ].map((dadosFiltro) => {
              return dadosFiltro.Name;
            });
          });
        }
      } catch (error) {
        console.error(error, "error found");
      }

      this.filtrosLentes = opcoesFiltro;

      return opcoesFiltro;
    },
    getFiltrosCategoria: async function () {
      return await fetch(
        `/api/catalog_system/pub/facets/search/lentes-de-contato?map=c`
      ).then((response) => {
        response.json().then((data) => {
          this.filtrosCategoria = data;
          this.filtrosSchema();
        });
      });
    },
    getProdutos: async function () {
      this.buscando = true;
      return await fetch(
        `/api/catalog_system/pub/products/search?${this.buscaUrl}`
      ).then((response) => {
        response.json().then((data) => {
          this.buscando = false;
          this.produtoEncontrados = data;
        });
      });
    },
    getFiltroDados: function (nomeFiltro) {
      let buscaFilto = this.filtrosLentes.filter((dadoFiltro, i) => {
        this.filtrosLentes[i]["indice"] = i;
        return dadoFiltro.titulo === nomeFiltro;
      });

      return (
        (buscaFilto && buscaFilto[0]) || {
          titulo: "Carregando",
          valorFiltro: "151",
          valorSelecionado: "",
          map: "specificationFilter_",
          opcoes: [],
        }
      );
    },
    limpaFiltro: function (filtro) {
      this.valoresSelecionados[filtro].valor = "";
      this.limpaSelects();
    },
    setPassoAtual: function (valPasso) {
      this.passoAtual = valPasso;
    },
    limpaSelects: function () {
      this.valoresSelecionados["Cilindrico"].valor = "";
      this.valoresSelecionados["Esferico"].valor = "";
      this.valoresSelecionados["Eixo"].valor = "";
    },
  },
  components: {},
  created() {
    this.getFiltrosCategoria();
  },
};
</script>
