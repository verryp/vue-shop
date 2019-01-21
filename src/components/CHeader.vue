<template>
    <!-- toolbar vuetify dengan warna primary -->
    <v-toolbar dark color="auto">

        <!-- header bagian kiri -->
        <!-- <v-toolbar-side-icon @click="setSideBar(!sideBar)"></v-toolbar-side-icon> -->
         <v-toolbar-side-icon @click="setSideBar(!sideBar)"></v-toolbar-side-icon> 

        <!-- header bagian tengah -->
        <v-toolbar-title class="white--text">Vshop</v-toolbar-title>

        <!-- separator biar header kanan rata kanan -->
        <v-spacer></v-spacer>

        <!-- header bagian kanan -->
        <v-btn icon>
            <v-badge left overlap color="pink">
                <span slot="badge">1</span>
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
            sideBar : 'sideBar'
        })
    },
}
</script>