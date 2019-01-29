<template>
    <v-card>
        <v-toolbar dark>
            <v-btn icon dark @click.native="close">
                <v-icon>close</v-icon>
            </v-btn>
            <v-text-field v-model="keyword" @input="doSearch" hide-details append-icon="mic" flat label="Search" prepend-inner-icon="search" solo-inverted ref="txtSearch"></v-text-field>
        </v-toolbar>

        <v-divider></v-divider>

        <v-subheader v-if="keyword.length > 0">
            Hasil Pencarian "{{keyword}}"
        </v-subheader>

        <v-alert :value="items.length==0 && keyword.length>0" color="warning">
            Maap, keyword tidak ditemukan
        </v-alert>

        <!-- Div buat hasil pencarian -->
        <v-list two-line v-if="items.length>0">
            <template v-for="(item) in items">
                <v-list-tile :key="item.id" avatar @click="close" :to="'/book/'+item.slug">
                    <v-list-tile-avatar>
                        <img :src="getImage('/books-covers'+item.cover)" alt="">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'search',

    data() {
        return {
            keyword: '',
            items: []
        }
    },

    methods: {
        ...mapActions ({
            setStatusDialog: 'dialog/setStatus'
        }),

        close() {
            this.setStatusDialog(false)
        },

        doSearch() {
            let keyword = this.keyword

            if(keyword.length > 0) {
                this.axios.get('/books/search/'+keyword)
                    .then((response) => {
                        let books = response.data.data
                        this.items = books
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },

        computed: {
            ...mapGetters({
                statusDialog: 'dialog/status',
            })
        },

        // ? belum ngerti buat ngejelasinnya :v
        mounted(){
            if(this.$refs.txtSearch != undefined){
                this.$nextTick(() => this.$refs.txtSearch.focus())
            }
        },
    }
}
</script>