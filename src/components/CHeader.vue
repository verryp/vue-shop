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
        <v-toolbar-title class="white--text">{{appName}}</v-toolbar-title>

        <!-- separator biar header kanan rata kanan -->
        <v-spacer></v-spacer>

        <!-- header bagian kanan -->
        <v-btn icon @click="cart()">
            <v-badge left overlap color="pink">
                <span slot="badge" v-if="countCart>0">{{ countCart }}</span>
                <v-icon>shopping_cart</v-icon>
            </v-badge>
        </v-btn>

        <!-- kolom pencarian di bawah header -->
        <v-text-field v-if="isHome" @click="search()" slot="extension" hide-details append-icon="mic" flat label="Search" prepend-inner-icon="search" solo-inverted></v-text-field>
    </v-toolbar>
</template>


<script>

import { mapGetters, mapActions } from "vuex";

export default {
    name: 'c-header',

    methods: {
        ...mapActions({
            setSideBar : 'slide/setSideBar',
            setStatusDialog: 'dialog/setStatus',
            setComponent: 'dialog/setComponent'
        }),

        search() {
            this.setSideBar(false)
            this.setComponent('search')
            this.setStatusDialog(true)
        },

        cart() {
            this.setStatusDialog(true)
            this.setComponent('cart')
            this.setSideBar(false)
        }
    },

    computed: {
        ...mapGetters({
            sideBar : 'slide/sideBar',
            countCart: 'cart/count',
        }),

        isHome() {
            return (this.$route.path === '/')
        },
    },
}
</script>