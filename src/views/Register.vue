<template>
    <v-card>
        <v-toolbar dark>
            <v-btn icon dark @click.native="close">
                <v-icon>close</v-icon>
            </v-btn>

            <v-toolbar-title>Register dan Ayo Habiskan Uangmu!</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="name" :rules="nameRules" :counter="255" label="Name" required append-icon="person"></v-text-field>
                <v-text-field v-model="username" hint="At least 3 characters" counter :rules="usernamaRules" label="Username" required append-icon="person_outline"></v-text-field>

                <v-layout row wrap class="light--text">
                    <v-checkbox v-model="selected" label="ADMIN" value="ADMIN"></v-checkbox>
                    <v-checkbox v-model="selected" label="STAFF" value="STAFF"></v-checkbox>
                    <v-checkbox v-model="selected" label="CUSTOMER" value="CUSTOMER"></v-checkbox>
                </v-layout>
                <p>{{selected}}</p>

                <v-text-field v-model="phone" :rules="phoneRules" label="Phone" required append-icon="phone"></v-text-field>

                <v-textarea v-model="address" label="Address" :rules="addressRules" required append-icon="home"></v-textarea>
                 
                 <v-text-field type="file" v-model="avatar" label="Avatar" :rules="avatarRules" append-icon="person_add"></v-text-field>



                <v-text-field v-model="email" :rules="emailRules" label="E-Mail" required append-icon="email"></v-text-field>
                <v-text-field v-model="password" :append-icon="showPassword ? 'visibility' : 'visibility_off'" :rules="passwordRules" :type="showPassword ? 'text' : 'password'" label="Password" hint="At least 6 characters" counter @click:append="showPassword = !showPassword"></v-text-field>
                <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do You agree with our Privacy Policy?" required></v-checkbox>
                
                <div class="text-xs-center">
                    <v-btn color="primary" :disabled="!valid" @click="submit">
                        Submit
                        <v-icon right dark>person_add</v-icon>
                    </v-btn>

                    <v-btn @click="clear">clear</v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
    name: 'register',

    data() {
        return {
            valid: true,

            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 255) || 'Nama harus kurang dari 255 karakter'
            ],
            
            username: '',
            usernameRules: [
                v => !!v || 'Username is required',
                v => (v && v.length < 3) || 'Username minimal 3 karakter'
            ],

            selected: [],

            showPassword: false,
            password: '',
            passwordRules: [
                v => !!v || 'Password required',
                v => (v && v.length >= 5) || 'Minimal 5 karakter',
            ],

            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail harus valid'
            ],

            phone: '',
            phoneRules: [
                v => !!v || 'Phoene required',
            ],

            address: '',
            addressRules: [
                v => !!v || 'Address required'
            ],

            avatar: '',

            checkbox: false,
        }
    },

    computed: {
        ...mapGetters({
            user: 'auth/user'
        }),
    },

    methods: {
        ...mapActions({
            setAlert: 'alert/setAlert',
            setStatusDialog: 'dialog/setStatus',
            setAuth: 'auth/setAuth'
        }),

        close() {
            this.setStatusDialog(false)
        },

        submit() {
            if(this.$refs.form.validate()) { // ? $refs berfungsi untuk mengakses method dari komponen lain
                let formData = new FormData()
                formData.set('name', this.name)
                formData.set('email', this.email)
                formData.set('password', this.password)

                this.axios.post('/register', formData)
                    .then((response) => {
                        let data_user = response.data.data
                        this.setAuth(data_user)
                        this.setAlert({
                            status: true,
                            text: 'register berhasil',
                            type: 'success'
                        })
                        this.close()
                    })
                    .catch((error) => {
                        console.log(error)
                        let responses = error.response
                        this.setAlert({
                            status: true,
                            text: responses.data.message,
                            // text: 'register gagal',
                            type: 'error'
                        })
                    })
            }
        },

        clear() {
            this.$refs.form.reset()
        }
    },
}
</script>
