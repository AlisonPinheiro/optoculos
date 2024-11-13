<template>
    <div class="produto">
        <div class="filterOptions">

            <ul class="refino" v-bind:key="filtro.Map" v-for="(filtro,chave) in filtros.SpecificationFilters">
                <selectGrupo :especificacao="filtro" :chave="chave">
                </selectGrupo>

            </ul>
        </div>

    </div>
</template>

<script>
    import selectGrupo from '../components/SelectGrupo'

    export default {
        name: 'pagina-produto',
        props: [
            'filtros'
        ],

        components: {
            selectGrupo
        },
        created() {


        }
    }
</script>

<style lang="scss">

</style>
