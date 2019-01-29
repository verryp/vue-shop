<template>
    <v-card>
        <v-toolbar dark>
            <v-btn icon dark @click="close">
                <v-icon>close</v-icon>
            </v-btn>

            <v-toolbar-title>Keranjang Belanja Anda</v-toolbar-title>

            <v-spacer/>
        </v-toolbar>

        <v-divider></v-divider>

        <div v-if="countCart===0">
            <v-alert value="true" color="success" icon="new_releases">
                Keranjang belanja kosong!
            </v-alert>
        </div>

        <div v-else>
            <v-list two-line>
                <template v-for="item in carts">
                    <v-list-tile :key="item.id" avatar>
                        <v-list-tile-avatar>
                            <img :src="getImage('/books-covers/'+item.cover)">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            <v-list-tile-sub-title>
                                Rp. {{item.price.toLocaleString('id-ID')}}
                                <span style="float:right">
                                    <v-btn icon small rounded depressed @click.stop="removeCart(item)">
                                        <v-icon dark color="error">remove_circle</v-icon>
                                    </v-btn>

                                    {{item.quantity}}

                                    <v-btn icon small rounded depressed @click.stop="addCart(item)">
                                        <v-icon dark color="success">add_circle</v-icon>
                                    </v-btn>
                                </span>
                            </v-list-tile-sub-title>

                            <v-list-tile-sub-title>
                                <v-divider/>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-list-tile-action-text>{{ item.weight }} Kg</v-list-tile-action-text>
                        </v-list-tile-action>
                    </v-list-tile>
                </template>
            </v-list>

            <v-card>
                <v-layout row wrap>
                    <v-flex xs6 text-xs-center>

                        Total Harga : ({{totalQuantity}} item(s))
                        <div class="title">
                            {{totalPrice.toLocaleString('id-ID')}}
                        </div>
                    </v-flex>

                    <v-flex xs6 text-xs-center>
                        <v-btn color="pink" dark @click="checkout">
                            <v-icon>check_circle</v-icon> &nbsp;
                            Checkout
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </div>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    name: 'cart',

    computed: {
        ...mapGetters({
            carts: 'cart/carts',
            countCart: 'cart/count',
            totalPrice: 'cart/totalPrice',
            totalHeight: 'cart/totalHeight',
            totalQuantity: 'cart/totalQuantity'
        }),
    },

    methods: {
        ...mapActions({
            setStatusDialog: 'dialog/setStatus',
            setAlert: 'alert/setAlert',
            setCart: 'cart/setCart',
            removeCart: 'cart/remove',
            addCart: 'cart/add'
        }),

        close() {
            this.setStatusDialog(false)
        },

        checkout(){
            this.close()
            this.$router.push("/checkout")
        }
    },
}
</script>