<template>
    <!-- v-navigation-drawer merupakan component bawaan vuetify fungsinya buat sidebar -->
    <v-navigation-drawer v-model="drawer" absolute fixed clipped>

        <!-- header toolbar pada sidebar biar lebih jos -->
        <v-toolbar dark color="auto">
            <v-btn icon @click="drawer=false">
                <v-icon class="white--text">close</v-icon>
            </v-btn>

            <v-toolbar-title>{{appName}}</v-toolbar-title>
        </v-toolbar>

        <v-list>

            <!-- cuma tombol register -->
            <v-list-tile>
                <v-btn depressed block round color="success" class="white--text">
                    Register
                    <v-icon right dark>person_add</v-icon>
                </v-btn>
            </v-list-tile>

            <!-- cuma tombol login -->
            <v-list-tile>
                <v-btn depressed block round color="info" class="white--text">
                    Login
                    <v-icon right dark>lock_open</v-icon>
                </v-btn>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-vinder></v-vinder>

            <!-- menu navigasi pada properti data items -->
            <v-list-tile v-for="(item, index) in items" :key="index" :href="item.route" :to="{name: item.route}">

                <v-list-tile-action>
                    <v-icon>
                        {{item.icon}}
                    </v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>
                        {{item.title}}
                    </v-list-tile-title>
                </v-list-tile-content>

            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
// * import map getter dan map action dari vuex
import { mapGetters, mapActions } from "vuex";

export default {
    name : 'c-side-bar',

    data: () => ({
        // * variabel untuk mengatur visibilitas dari sidebar
        // drawer: true,

        // * variabel berisi daftar menu navigasi dari sidebar
        items: [
            {
                title: 'Home', 
                icon: 'dashboard', 
                route: 'home'
            },
            {
                title: 'About', 
                icon: 'question_answer', 
                route: 'about'
            },
        ]
    }),

    computed: {
        // * mapping state sideBar menggunakan map getter
        ...mapGetters({
            sideBar     : 'sideBar',
        }),

        // * ubah properti data drawer menjadi computed dimana nilainya membaca dari state sidebar
        drawer: {
            get(){
                return this.sideBar
            },

            set(value){
                this.setSideBar(value)
            }
        },
    },

    methods: {
        ...mapActions({
            setSideBar : 'setSideBar',
        }),
    },
}
</script>