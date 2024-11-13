<template>
  <div id="app">

    <div class="head__acoes">
      <div class="fieldset__distinto">
        <input id="grau__distinto" type="checkbox" v-model="apenasUmGrau"/>
        <label for="grau__distinto">
          <i class="ico-check"></i>
          <span>
                {{apenasUmGrau ? 'Mesmo grau nos dois olhos' : 'Quero apenas um grau'}}
            </span>
        </label>
      </div>
      <button @click="comprar()" class="btn"
              v-if="apenasUmGrau && olhoA !== null || olhoA && olhoB ">Comprar
      </button>
    </div>
    <div :class="apenasUmGrau ? 'um_grau' : 'dois_graus'" class="grupo__olhos">
      <div class="olho__a">
        <p>{{apenasUmGrau ? '': 'Olho direito'}}</p>
        <lenteFiltro :passo-atual="propPassoAtual" v-on:encontrado="setOlhoA" />
        <button v-if="!apenasUmGrau && olhoA !== null || olhoA && olhoB " @click="comprar()" class="btn">Comprar</button>
      </div>
      <div class="olho__b" v-if="!apenasUmGrau">
        <p>Olho esquerdo</p>
        <lenteFiltro :passo-atual="propPassoAtual" v-on:encontrado="setOlhoB" />
        <button v-if="!apenasUmGrau && olhoB !== null" @click="comprar()" class="btn">Comprar</button>
      </div>
      
    </div>

  </div>
</template>

<script>

  import lenteFiltro from './components/lenteFiltro'

  export default {
    name: 'app',
    data: function () {
      return {
        passoAtual: 0,
        apenasUmGrau: true,
        olhoA: null,
        olhoB: null
      }
    },
    computed: {
      propPassoAtual () {
        return this.passoAtual
      },
      passos () {
        const validoUm = false
        const validoDois = false
        const validoTres = false

        return [
          {
            'titulo': 'Indicação',
            'validado': validoUm
          },
          {
            'titulo': 'Descarte',
            'validado': validoDois
          },
          {
            'titulo': 'Grau',
            'validado': validoTres
          }
        ]
      }
    },
    components: {
      lenteFiltro
    }, methods: {
      setOlhoA: function (produto) {
        window.console.log(produto)
        this.olhoA = produto
      },
      setOlhoB: function (produto) {
        window.console.log(produto)
        this.olhoB = produto
      },
      comprar: function () {
        var items = []
        if (this.apenasUmGrau) {
          items.push({
            id: this.olhoA.items[0].itemId,
            quantity: 1,
            seller: '1'
          })
        } else {
          items.push({
            id: this.olhoA.items[0].itemId,
            quantity: 1,
            seller: '1'
          })

          items.push({
            id: this.olhoB.items[0].itemId,
            quantity: 1,
            seller: '1'
          })
        }

        window.vtexjs.checkout.addToCart(items, null, 1).done(function () {
          location.href = '/checkout'
        })
      }
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
    margin: 50px auto;

    @media only screen and (max-width: $mobile-size) {
      width: calc(100% - 20px);
    }

    .head__acoes {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      &:after {
        display: none;
      }

      .fieldset__distinto {
        width: calc(100% - 5px);
        margin-right: 5px;
      }

      label {
        margin-bottom: 0;

      }

      .btn {
        width: calc(100% - 5px);
        padding: 10px;
        margin-left: 5px;
        cursor: pointer;
      }
    }

    .passos {
      display: flex;
      justify-content: center;
      transition: .3s all ease-in-out;
      max-width: 100%;
      padding-bottom: 30px;
      width: 70%;
      margin: 20px auto;
      @media only screen and (max-width: $mobile-size) {
        margin: 5px auto;
        width: calc(100% - 30px);
      }


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

          &.desabilitado {
            cursor: no-drop;
          }
        }

        &:first-child {
          &:before {
            display: none;
          }

          width: auto;
        }

        &.preenchido, &.atual {
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

        &.atual {

          button {
            border-color: $color5;
            background: $color5;
            color: #fff;

          }

          &:before {
            background-color: $color5;
          }

          + li {
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

    .grupo__olhos {
      display: flex;
      justify-content: space-between;

      @media only screen and (max-width: $mobile-size) {
        flex-wrap: wrap;
        flex-direction: column;

      }


      &:after {
        display: none;
      }


      > * {
        width: calc(100% - 5px);
        border: 1.5px solid rgba($color7, 1);
        padding: 20px;
        border-radius: 30px;
        transition: all ease-in-out .2s;

        > p {
          margin: 10px 0;
          font-size: 20px;
          font-weight: 600;
          text-transform: uppercase;
          color: $color7;
        }

        @media only screen and (max-width: $mobile-size) {
          border-radius: 0;
          margin-bottom: 15px;
          padding: 10px;

          > p {
            text-align: center;
            padding: 5px;
            margin: 0 0 30px 0;
            border-bottom: 2px solid;
          }
        }
      }

      &.dois_graus {
        > * {
          width: calc(50% - 5px);

          @media only screen and (max-width: $mobile-size) {
            flex-direction: column;
            width: 100%;
          }
        }
      }
    }

    .titulo__filtro {
      text-transform: uppercase;
      font-size: 16px;
      margin: 20px 0;
      @media only screen and (max-width: $mobile-size) {
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        margin: 10px 0;
      }
    }

    .filtro {

      &__opcoes {
        > ul {
              display: flex;
              flex-direction: column;
          li {
            position: relative;
            &.Mensal{
              order: 1;
            }
          }
        }
      }
    }


    button {
      border-radius: 20px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #ccc;
      background: #fff;
      color: #ccc;

      &.btn {
        text-transform: uppercase;
        border-radius: 35px;
        color: #fff;
        font-weight: 700;
        background: $color5;
        margin-left: 5px;
      }

      &.limpaSelects {
        background-color: #ccc;
      }

    }

    select {
      width: 100%;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      margin-right: 5px;
      background: #fff;
      border-radius: 20px;
      padding: 20px;

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
          padding: 10px;
          font-size: 16px;
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

          @media only screen and (max-width: $mobile-size) {
            width: 30px;
            height: 30px;
            font-size: 12px;
            border-radius: 100%;
            right: 5px;
            top: 5px;
          }
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

    label {
      padding: 0;
      width: 100%;
      overflow: hidden;

      @media only screen and (max-width: $mobile-size) {
        border-radius: 20px;
        text-align: left;
      }

      i {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;

        &::before {
          opacity: 0;
          font-size: 7px
        }
      }

    }

    input:checked + label {
      background-color: #eeeeee;
      color: $color7;
      border-color: transparent;

      i {
        &::before {
          opacity: 1;

        }
      }

      .produto {
        &__info {
          width: calc(100% - 80px);
          border-left-color: #fff;


          @media only screen and (max-width: $mobile-size) {
            border-left-color: transparent;
            width: 100%;
          }
        }
      }

    }


    .filtro__opcao {
      display: flex;
      flex-direction: column;


      @media only screen and (max-width: $mobile-size) {
        flex-wrap: wrap;
        select {
          width: 100%;
          margin-bottom: 10px;
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

    .produto__encontrados {
      width: calc(100% - 20px);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      @media only screen and (max-width: $mobile-size) {
        width: 100%;
      }

      &:after {
        display: none;
      }

      li {
        width: 100%;
      }


      .produto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        &__imagem {
          width: 150px;
          overflow: hidden;
          border-radius: 15px;
          background-color: #e0e0e0;

          img {
            display: block;
            width: 100%;
            height: auto;
          }

          @media only screen and (max-width: $mobile-size) {
          }
        }

        &__info {
          width: calc(100% - 80px);
          padding: 25px;
          @media only screen and (max-width: $mobile-size) {
            width: 100%;
            border-left: 0;
          }
        }

        &__nome {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 7px;
        }

        &__especificacoes {
          margin-bottom: 5px;
          font-size: 12px;
          font-weight: 400;
        }

        &__preco {
          &--melhor {
            font-weight: 600;
            font-size: 16px;
            margin: 5px 0;
          }
        }
      }


    }


  }
</style>

