<template>
    <v-footer dark height="auto">
        <v-flex xs12>
            <v-card flat tile class="secondary darken-1 white--text text-xs-center">

                <!-- menu ikon media social -->
                <v-card-text>
                    <v-btn v-for="(sosmed, index) in sosmeds" :key="index" :href="sosmed.route" class="mx-3 white--text" icon>
                        <v-icon size="24px">{{ sosmed.icon }}</v-icon>
                    </v-btn>
                </v-card-text>

                <!-- deskripsi aplikasi -->
                <v-card-text  v-if="isHome" class="white--text pt-0">
                    <p>Front-end dari larashop dari support by vuetify</p>
                </v-card-text>

                <v-layout justify-center row wrap>

                    <!-- link menu halaman aplikasi -->
                    <v-btn v-for="link in links" :key="link" color="white" flat round>
                        {{link}}
                    </v-btn>

                    <!-- teks copyright -->
                    <v-flex secondary darken-2 py-3 text-xs-center white--text xs12>
                        &copy;2019 - Vshop by <strong>VDev</strong> powered by <code>Vuetify</code>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        sosmeds: [
            {
                icon: 'fab fa-facebook', 
                route: 'facebook.com/vrryp'
            },
            {
                icon: 'fab fa-twitter', 
                route: 'twitter.com/vrry'
            },
            {
                icon: 'fab fa-linkedin', 
                route: 'linkedin.com/in/vrry'
            },
            {
                icon: 'fab fa-instagram', 
                route: 'instagram.com/vrry_'
            },            
        ],

        links: [
            'Home',
            'About Us',
            'Services',
            'Contact Us'
        ]
    }),
}
</script>