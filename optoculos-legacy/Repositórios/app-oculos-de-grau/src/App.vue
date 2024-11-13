<template>
  <div id="app">
    <section class="setps-number">
      <ul class="steps">
        <li
          :class="[
            passo >= indice ? 'atual' : '',
            passosProntos[indice] ? 'preenchido' : '',
          ]"
          :key="indice"
          class="steps__items"
          v-for="(step, indice) in stepsFilter"
        >
          <button
            v-on:click="
              passosProntos[indice - 1] || indice === 0
                ? (passo = indice)
                : false
            "
          >
            <i class="ico-check" v-if="passosProntos[indice]"></i>
            <span v-else>
              {{ indice + 1 }}
            </span>
            <span class="step__title">{{ stepsFilter[indice] }}</span>
          </button>
        </li>
      </ul>
    </section>

    <section class="filtros">
      <div
        :class="iEspecificacao.split(' ').join('').toLocaleLowerCase()"
        class="step__content"
        v-bind:key="iEspecificacao"
        v-for="(especificacao, iEspecificacao) in especificacoes"
        v-show="iEspecificacao === stepsFilter[passo]"
      >
        <h3 class="especificacao__titulo">{{ iEspecificacao }}</h3>
        <ul class="especificacoes">
          <li
            :class="filtro.Name.split(' ').join('-').toLocaleLowerCase()"
            :style="{ order: filtro.order }"
            class="especificacoes__item"
            v-bind:key="iFiltro"
            v-for="(filtro, iFiltro) in especificacao"
            v-show="filtroMarca(filtro.Name, iEspecificacao)"
          >
            <input
              :id="filtro.Name"
              :name="iEspecificacao"
              type="radio"
              v-model="passosProntos[stepsFilter.indexOf(iEspecificacao)]"
              v-on:change="
                [
                  setPasso(stepsFilter.indexOf(iEspecificacao)),
                  setEspecificacoes(iEspecificacao, iFiltro),
                ]
              "
            />
            <label :for="filtro.Name">
              <i></i>
              <span class="especificacoes__nome">{{ filtro.Name }}</span>
              <span class="especificacoes__descricao">{{
                filtro.description
              }}</span>
            </label>
          </li>
        </ul>
        <div class="setas">
          <button class="voltar" v-on:click="passo > 0 ? passo-- : (passo = 0)">
            <i>◄</i><span>Voltar </span>
          </button>
          <button
            class="btn"
            v-if="
              passosProntos[stepsFilter.indexOf(iEspecificacao)] &&
              stepsFilter.indexOf(iEspecificacao) < stepsFilter.length - 1
            "
            v-on:click="
              passo < stepsFilter.length - 1
                ? passo++
                : (passo = stepsFilter.length - 1)
            "
          >
            Continuar
          </button>
          <button
            :class="lente ? '' : 'indisponivel'"
            class="btn"
            v-on:click="comprar()"
            v-show="passosCompletos"
            v-text="
              lente &&
              lente.items[0].sellers[0].commertialOffer.AvailableQuantity > 0
                ? 'Comprar'
                : 'Combinação indisponível'
            "
          ></button>
        </div>
        <div class="adivice">
          Após a compra você receberá posteriormente um e-mail com orientações
          sobre o envio da receita e medidas ópticas.
        </div>
      </div>
    </section>
    <section class="produto__combinado">
      <div class="produto__imagem">
        <img
          :src="armacao.skus[0].image.replace('529-529', '400-300')"
          alt=""
        />
      </div>
      <div class="produto__nome">
        {{ armacao.name }}
      </div>
      <div class="produto__preco">
        <span class="produto__preco__texto"> Preço da armação: </span>
        <span class="produto__armacao__valor">
          R$ {{ intToReal(armacao.skus[0].bestPrice) }}
        </span>
      </div>
      <div
        class="produto__preco"
        v-if="
          lente && lente.items[0].sellers[0].commertialOffer.AvailableQuantity
        "
      >
        <span class="produto__preco__texto"> Preço da lente: </span>
        <span class="produto__lente__valor">
          R$
          {{
            intToReal(lente.items[0].sellers[0].commertialOffer.Price * 100 * 2)
          }}
          (par)
        </span>
      </div>
      <div class="produto__total" v-if="lente">
        <span class="produto__total__valor" v-if="total">
          Total: R$ {{ intToReal(total) }}
        </span>
      </div>
    </section>
  </div>
</template>


<script>
const mockSku = {
  productId: 2507,
  name: "Armação Opt Oculos MB3377 C1 55 - Azul",
  salesChannel: "1",
  available: true,
  displayMode: "especificacao",
  dimensions: [],
  dimensionsInputType: {},
  dimensionsMap: {},
  skus: [
    {
      sku: 2506,
      skuname: "Armação Opt Oculos MB3377 C1 55 - Azul",
      dimensions: {},
      available: true,
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
      image:
        "https://optoculos.vteximg.com.br/arquivos/ids/158283-529-529/ARMACOES-OPTOCULOS-MB3377-C1-55-1.jpg?v=636914551076870000",
      sellerId: "1",
      seller: "Opt Óculos",
      measures: {
        cubicweight: 1,
        height: 8.5,
        length: 21,
        weight: 400,
        width: 13,
      },
      unitMultiplier: 1,
      rewardValue: 0,
      values: [],
      discount: -19900,
      hasDiscount: false,
      validListPrice: false,
      validBestPrice: true,
    },
  ],
};
const sku = window.skuJson || mockSku;
const produtoLente = false;
export default {
  name: "pagina-produto",
  data() {
    return {
      especificacoes: {},
      especificacoesValores: [],
      passo: 0,
      stepsFilter: [
        "Categoria - Estilo",
        "Marcas",
        "Material",
        "Cor - Propriedade",
        "Tratamento",
      ],
      passosProntos: [false, false, false, false, false],
      account: "optoculos",
      armacao: sku,
      lente: produtoLente,
    };
  },
  methods: {
    intToReal: function (int) {
      var tmp = int + "";
      tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
      if (tmp.length > 6)
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
      return tmp;
    },
    filtros: async function () {
      function addProps(parseDescription, parseOrder) {
        return function (v) {
          v.description = parseDescription[v.Name] || "";
          v.order = parseOrder[v.Name] || 999;
          return v;
        };
      }

      return await fetch(
        `/api/catalog_system/pub/facets/search/lentes?map=c`
      ).then((response) => {
        response.json().then((data) => {
          console.log(data);
          let dadosEspecificacao = {
            "Categoria - Estilo": data.SpecificationFilters["Categoria"],
            Marcas: data["Brands"],
            Material: data.SpecificationFilters["Material"],
            "Cor - Propriedade": data.SpecificationFilters["Cor"],
            Tratamento: data.SpecificationFilters["Tratamento"],
          };

          // substituindo valores do map Marcas
          let parseValues = {
            "Varilux Comfort Max Blue Uv": 2000288,
            "Vs Acabadas": 2000121,
            "Visao Simples": 2000123,
            "Sirius Easy": 2000227,
            "Sirius Advance": 2000228,
          };

          parseOrder = {
            "Sirius Easy": 1,
            "Sirius Advance": 2,
            "Varilux Comfort Max Blue Uv": 3,
          };

          parseDescription = {
            "Sirius Easy": "Fabricação digital com maior precisão óptica",
            "Sirius Advance":
              "Lentes customizadas com maior campo visual para todas as distâncias",
            "Varilux Comfort Max Blue Uv":
              "Adaptação mais suave graças a tecnologia Wave 2.0",
          };

          dadosEspecificacao["Marcas"].map(function (v) {
            v.Value = parseValues[v.Name];
            return v;
          });

          dadosEspecificacao["Marcas"].map(
            addProps(parseDescription, parseOrder)
          );

          parseDescription = {
            Monofocais: "Lentes para Longe ou Perto",
            Progressivas:
              "Lentes multifocais para longe, média distância e perto",
          };

          dadosEspecificacao["Categoria - Estilo"].map(
            addProps(parseDescription, parseOrder)
          );

          parseDescription = {
            "Transitions Cinza":
              "Lentes que escurecem no sol e clareiam em ambientes internos",
          };

          dadosEspecificacao["Cor - Propriedade"].map(
            addProps(parseDescription, parseOrder)
          );

          // substituindo valores do map Material
          let parseOrder = {
            "Resina 1.50": 1,
            "Policarbonato 1.59": 2,
            "Resina 1.67": 3,
          };

          let parseDescription = {
            "Resina 1.50": "Lentes convencionais",
            "Policarbonato 1.59":
              "Lentes mais finas e com maior resistência a impactos",
            "Resina 1.67":
              "Lentes finíssimas, mais confortáveis e com melhor estética",
          };

          dadosEspecificacao["Material"].map(
            addProps(parseDescription, parseOrder)
          );

          // substituindo valores do map Tratamento
          parseOrder = {
            "Sem Tratamento": 1,
            Antirreflexo: 2,
            "Trio Easy Clean": 3,
            Stratus: 4,
            "Stratus Ultra": 5,
            "Crizal Sapphire": 6,
          };

          parseDescription = {
            Antirreflexo:
              "Redução dos reflexos indesejáveis, proporcionando maior nitidez e conforto visual. \n\nObs.: Exclusivo para lentes Monofocais",
            "Trio Easy Clean":
              "Redução dos reflexos indesejáveis, proporcionando maior nitidez e conforto visual. \n\nObs.: Exclusivo para Monofocais e Progressivas Varilux",
            Stratus:
              "Redução dos reflexo indesejáveis, proporcionando maior nitidez e conforto visual. \n\nObs.: Exclusivo para Progressivas Sirius",
            "Stratus Ultra":
              "Além de mais nítidas, são mais resistentes, mais fáceis de limpar e repelem a água e a poeira. \n\nObs.: Exclusivo para Progressivas Sirius",
            "Crizal Sapphire":
              "Máxima transparência, maior nitidez e mais fáceis de limpar. 2 anos de de garantia contra riscos* \n\nObs.: Exclusivo para Monofocais e Progressivas Varilux",
            "Sem Tratamento": "",
          };

          // parseObservation = {
          //     "Antirreflexo": "* Exclusivo para lentes Monofocais",
          //     "Trio Easy Clean": "* Exclusivo para Monofocais e Progressivas Varilux",
          //     "Stratus": "* Exclusivo para Progressivas Sirius",
          //     "Stratus Ultra": "* Exclusivo para Progressivas Sirius",
          //     "Crizal Sapphire": "* Exclusivo para Monofocais e Progressivas Varilux",
          //     "Sem Tratamento": ""
          // };

          dadosEspecificacao["Tratamento"].map(
            addProps(parseDescription, parseOrder)
          );

          this.especificacoes = dadosEspecificacao;
        });
      });
    },
    getLente: async function () {
      const that = this;
      const mapValores = this.especificacoesValores.map(function (v, i) {
        let chave = that.especificacoes[that.stepsFilter[i]][v].Map;
        let valor = that.especificacoes[that.stepsFilter[i]][v].Value;

        if (chave === "b") {
          chave = "B";
        } else {
          valor = valor.replace("%40dot%40", "%2E"); // ajusta o caracter original da VTEX)
        }
        console.log(chave, valor, "chave", "valor");
        return "fq=" + chave + ":" + valor;
      });

      console.log(mapValores, "mapValores");

      await fetch(
        `/api/catalog_system/pub/products/search?fq=C:/7/&${mapValores.join(
          "&"
        )}`
      )
        .then(function (resultado) {
          return resultado.json();
        })
        .then((data) => {
          console.log(data, "data");
          this.lente = (data.length > 0 && data[0]) || false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    comprar: function () {
      const armacaoSku = this.armacao.skus[0].sku;
      const lenteSku = this.lente.items[0].itemId;
      var items = [
        {
          id: armacaoSku,
          quantity: 1,
          seller: "1",
        },
        {
          id: lenteSku,
          quantity: 2,
          seller: "1",
        },
      ];

      window.vtexjs.checkout.getOrderForm().then(() => {
        window.vtexjs.checkout
          .addToCart(items, null, 1)
          .done((orderForm) => {
            const attachmentContent = {
              ["SkuArmacao"]: armacaoSku,
            };
            const ATTACHMENT_ID = "Observacao";
            orderForm.items.forEach((product, index) => {
              if (product.id == lenteSku) {
                window.vtexjs.checkout.addItemAttachment(
                  index,
                  ATTACHMENT_ID,
                  attachmentContent
                );
              }
            });
          })
          .done(function () {
            location.href = "/checkout";
          });
      });
    },
    setPasso: function (i) {
      this.passosProntos[i] = true;
    },
    setEspecificacoes: function (iEspecificacao, iFiltro) {
      this.especificacoesValores[this.stepsFilter.indexOf(iEspecificacao)] =
        iFiltro;
    },
    filtroMarca: function (nomeFiltro, iEspecificacao) {
      const valor =
        (this.especificacoes[this.stepsFilter[0]][
          this.especificacoesValores[0]
        ] &&
          this.especificacoes[this.stepsFilter[0]][
            this.especificacoesValores[0]
          ].Name) ||
        "";
      if (valor === "Progressivas" && iEspecificacao === this.stepsFilter[1]) {
        return (
          nomeFiltro === "Sirius Easy" ||
          nomeFiltro === "Varilux Comfort Max Blue Uv" ||
          nomeFiltro === "Sirius Advance"
        );
      } else if (
        valor === "Monofocais" &&
        iEspecificacao === this.stepsFilter[1]
      ) {
        if (this.passo === 0) {
          // se for o passo 2 e Monofocais o passo é pulado
          //this.passo = 2;
          this.especificacoesValores[1] = 1;
          this.passosProntos[1] = true;
        }

        return nomeFiltro === "Vs Acabadas";
      }
      return true;
    },
  },
  computed: {
    total() {
      console.log(this.lente);
      const valorArmacao = this.armacao.skus && this.armacao.skus[0].bestPrice;
      const valorLente =
        this.lente &&
        this.lente.items[0].sellers[0].commertialOffer.Price * 100;
      return valorLente * 2 + valorArmacao;
    },
    passosCompletos() {
      const completos = this.passosProntos.reduce(function (atual, proximo) {
        return atual && proximo;
      }, true);
      if (completos) {
        this.getLente();
      }
      return completos;
    },
  },
  filters: {},
  created() {
    this.especificacoes = this.filtros();
  },
};
</script>


<style scoped lang="scss">
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
  display: flex;
  flex-wrap: wrap;
  padding: 5%;
  @media only screen and (max-width: $mobile-size) {
    padding: 10px;
    padding-bottom: 100px;
  }

  section {
    width: 100%;

    &.setps-number {
      @media only screen and (max-width: $mobile-size) {
        order: 1;
        margin-top: 10px;
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        padding: 10px;
        background: #fff;
        box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.11);
      }
    }

    &.filtros {
      width: 60%;
      @media only screen and (max-width: $mobile-size) {
        order: 1;
        padding: 10px;
        border-radius: 10px;
        background: #f5f5f5;
      }
    }

    &.produto__combinado {
      width: 30%;
      margin-left: 10%;

      .produto__imagem {
        img {
          display: block;
          width: 100%;
          margin: 0 auto;
        }
      }

      @media only screen and (max-width: $mobile-size) {
        order: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        margin-left: 0;
      }
    }
  }

  @media only screen and (max-width: $mobile-size) {
    flex-direction: column;
    section {
      margin: 0;
      width: 100%;

      &.filtros,
      &.produto__combinado,
      &.produto__combinado {
        width: 100%;
      }
    }
  }
}

.especificacao__titulo {
  text-transform: uppercase;
  font-size: 16px;
  margin: 20px 0;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
}

.setps-number {
  margin: 50px;

  .steps {
    display: flex;
    justify-content: center;
    transition: 0.3s all ease-in-out;

    &:after {
      display: none;
    }

    &__items {
      display: flex;
      align-items: center;
      width: 100%;

      &:before {
        content: "";
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
        transition: 0.8s all ease-in-out;
        transition-delay: 0.3s;
        position: relative;

        .step__title {
          position: absolute;
          top: calc(100% + 10px);
          width: 160px;
        }
      }

      &:first-child {
        &:before {
          display: none;
        }

        width: auto;
      }

      &.preenchido,
      &.atual {
        button {
          border-color: $color5;
          color: $color5;

          &:before {
            background-color: $color5;
          }

          .step__title {
            color: $color5;
          }
        }

        &:before {
          background-color: $color5;
        }
      }

      &.preenchido.atual {
        button {
          border-color: $color5;
          background: $color5;
          color: #fff;
        }

        &:before {
          background-color: $color5;
        }

        + li:not(.preenchido) {
          &:before {
            background-color: $color5;
          }

          button {
            color: $color5;
            border-color: $color5;
          }
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
  }
}

.especificacoes {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &:after {
    display: none;
  }

  &__item {
    width: calc(50% - 5px);

    @media only screen and (max-width: $mobile-size) {
      width: 100%;
    }

    input {
      display: none;

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
        }
      }
    }

    label {
      cursor: pointer;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 25px;
      border: 1px solid #e0e0e0;
      border-radius: 35px;
      background: #fff;
      font-weight: 700;
      margin: 0 0 10px;
      transition: 0.3s all ease-in-out;
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

      .especificacoes {
        &__descricao {
          font-weight: normal;
          padding: 5px;
          width: 100%;
          white-space: pre-line;

          @media only screen and (min-width: $tablet-size) {
            padding: 5px 0 0 30px;
            min-height: 56px;
          }
        }
      }
    }
  }
}

button {
  padding: 15px 5px;
  background: transparent;
  border: 0;
  width: 230px;
  cursor: pointer;
}

.voltar {
  text-align: left;
  padding: 15px 0px;

  i {
    font-family: Arial;
  }
}

.btn {
  text-transform: uppercase;
  border-radius: 25px;
  color: #fff;
  font-weight: 700;
  background: $color5;
  margin-left: 10px;

  &.indisponivel {
    background-color: #989898;
  }
}

.setas {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  &:after {
    display: none;
  }

  @media only screen and (max-width: $mobile-size) {
    padding-top: 10px;
    border-top: 1px solid #ccc;
  }
}

.adivice {
  font-style: italic;
  font-size: 12px;
  text-align: center;
}

.produto {
  &__imagem {
    @media only screen and (max-width: $mobile-size) {
      margin: 10px 0;
      width: 50%;
    }
  }

  &__nome {
    font-size: 16px;
    color: #999;
    margin: 30px 0;
    @media only screen and (max-width: $mobile-size) {
      margin: 10px 0;
      width: 50%;
    }
  }

  &__lente {
    &__valor {
      font-weight: 600;
    }
  }

  &__armacao {
    &__valor {
      font-weight: 600;
    }
  }

  &__preco {
  }

  &__total {
    margin-top: 30px;

    &__valor {
      font-size: 20px;
      color: $color5;
    }
  }
}
</style>
