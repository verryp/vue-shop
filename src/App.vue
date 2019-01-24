<!--<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
-->

<template>
  <v-app>
    <!-- komponen header -->
    <c-header/>

    <!-- komponen sidebar -->
    <c-side-bar/>

    <!-- konten utama -->
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view>

        </router-view>
      </v-slide-y-transition>
    </v-content>

    <!-- komponen footer -->
    <c-footer/>

    <!-- komponen alert -->
    <c-alert/>

    <keep-alive>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-botton-transition">
        <component :is="currentComponent"></component>
      </v-dialog>
    </keep-alive>

    <search />

  </v-app>
</template>

<script>
  import CHeader from '@/components/CHeader.vue'
  import CFooter from '@/components/CFooter.vue'
  import CSideBar from '@/components/CSideBar.vue'

  import { mapGetters, mapActions } from "vuex";

  export default {
    name : 'App',

    components: {
      CHeader, CFooter, CSideBar,
      CAlert: () => import('@/components/CAlert'),
      Search: () => import('@/views/Search.vue'),
      Login: () => import('@/views/Login.vue'),
      Register: () => import('@/views/Register.vue')
    },

    methods: {
      ...mapActions ({
        setStatusDialog: 'dialog/setStatus'
      })
    },

    computed: {
      ...mapGetters ({
        statusDialog: 'dialog/status',
        currentComponent: 'dialog/component'
      }),

      dialog: {
        get() {
          return this.statusDialog
        },

        set(value) {
          this.setStatusDialog(value)
        }
      }
    },
  }
</script>