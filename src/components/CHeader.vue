<template>
    <!-- toolbar vuetify dengan warna gelap -->
    <v-toolbar dark>

        <!-- header bagian kiri -->
        <!-- <v-toolbar-side-icon @click="setSideBar(!sideBar)"></v-toolbar-side-icon> -->
         <v-toolbar-side-icon v-if="isHome" @click="setSideBar(!sideBar)"></v-toolbar-side-icon> 

         <v-btn v-if="!isHome" icon @click="$router.go(-1)">
             <v-icon>arrow_back</v-icon>
         </v-btn>

        <!-- header bagian tengah -->
        <!-- <v-toolbar-title class="white--text">{{appName}}</v-toolbar-title> -->
        <v-toolbar-title class="white--text">Vshop</v-toolbar-title>

        <!-- separator biar header kanan rata kanan -->
        <v-spacer></v-spacer>

        <!-- header bagian kanan -->
        <v-btn icon>
            <v-badge left overlap color="pink">
                <span slot="badge" v-if="countCart>0">{{ countCart }}</span>
                <v-icon>shopping_cart</v-icon>
            </v-badge>
        </v-btn>

        <!-- kolom pencarian di bawah header -->
        <v-text-field slot="extension" hide-details append-icon="mic" flat label="Search" prepend-inner-icon="search" solo-inverted></v-text-field>
    </v-toolbar>
</template>


<script>

import { mapGetters, mapActions } from "vuex";

export default {
    name: 'c-header',

    methods: {
        ...mapActions({
            setSideBar : 'setSideBar',
        }),
    },

    computed: {
        ...mapGetters({
            sideBar : 'sideBar',
            countCart: 'cart/count'
        }),

        isHome() {
            return (this.$route.path === '/')
        },
    },
}
</script>