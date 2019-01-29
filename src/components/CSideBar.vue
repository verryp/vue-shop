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

        <!-- jika user masih belum login, artinya guest state masih sama dengan nol -->
        <v-list v-if="guest">
            <!-- cuma tombol register -->
            <v-list-tile>
                <v-btn @click="register()" depressed block round color="success" class="white--text">
                    Register
                    <v-icon right dark>person_add</v-icon>
                </v-btn>
            </v-list-tile>

            <!-- cuma tombol login -->
            <v-list-tile>
                <v-btn @click="login()" depressed block round color="info" class="white--text">
                    Login
                    <v-icon right dark>lock_open</v-icon>
                </v-btn>
            </v-list-tile>
        </v-list>

        <!-- guest sudah berhasil login -->
        <v-list v-if="!guest">
            <v-list-tile>
                <v-list-tile-avatar>
                    <img src="getImage('/users/'+user.avatar)">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>
                        {{user.name}}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
                <v-btn block small round depressed color="error lighten-1" class="white--text" @click.stop="logout()">
                    Logout
                    <v-icon small rigth dark>settings_power</v-icon>
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
            sideBar     : 'slide/sideBar',
            
            // * buat auth
            user        : 'auth/user',
            guest       : 'auth/guest'
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
            setSideBar : 'slide/setSideBar',
            setComponent: 'dialog/setComponent',
            setStatusDialog: 'dialog/setStatus',

            // * auth
            setAuth: 'auth/setAuth',
            setAlert: 'alert/setAlert'
        }),

        login() {
            this.setSideBar(false)
            this.setComponent('login')
            this.setStatusDialog(true)
        },

        register() {
            this.setStatusDialog(true)
            this.setComponent('register')
            this.setSideBar(false)
        },

        logout() {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.user.api_token,
                },
            }
            this.axios.post('/logout', {}, config)
                .then(() => {
                    this.setAuth({})    // * kosongkan auth saat logout
                    this.setAlert({
                        status: true,
                        text: 'Logout berhasil',
                        type: 'success',
                    })
                    this.setSideBar(false)
                })
                .catch((error) => {
                    let responses = error.response
                    this.setAlert({
                        status: true,
                        text: responses.data.message,
                        type: 'error'
                    })
                })
        }
    },
}
</script>