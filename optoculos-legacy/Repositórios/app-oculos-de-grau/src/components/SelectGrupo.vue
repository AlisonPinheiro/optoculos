<template>
    <div class="refino">
        <fieldset>
            <h5 v-on:click="mostrarValores = !mostrarValores">
                {{chave}}
            </h5>
            <div class="refino__valores" v-show="mostrarValores">
                <div
                        :class="'refino__valor--' + chave"
                        v-bind:key="i"
                        v-for="(valor,i) in especificacao"
                >
                    <label>

                        <input type="checkbox">
                        <span>{{valor.Name}}</span>
                    </label>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: "SelectGrupo",
        data:function() {
            return {
                'mostrarValores': !true
            }

        },

        props: [
            'especificacao',
            'chave'
        ],
        computed: {}
    }
</script>

<style scoped lang="scss">

</style>