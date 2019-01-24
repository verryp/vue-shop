<template>
    <v-card>
        <v-toolbar dark>
            <v-btn icon dark @click="close">
                <v-icon>close</v-icon>
            </v-btn>

            <v-toolbar-title>Login dan Mulailah Habisin Duit!</v-toolbar-title>
        </v-toolbar>

        <v-diviber></v-diviber>

        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required append-icon="email"></v-text-field>
                <v-text-field v-model="password" :append-icon="showPassword ? 'visibility' : 'visibility_off'" :rules="passwordRules" 
                :type="showPassword ? 'text' : 'password'" 
                label="Password" 
                hint="Minimal 6 karakter" 
                counter @click:append = "showPassword = !showPassword">
                </v-text-field>

                <div class="text-xs-center">
                    <v-btn color="accent lighten-1" :disabled="!valid" @click="submit">
                        Login
                        <v-icon right dark>lock_open</v-icon>
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: 'login',

    data() {
        return {
            valid: true,
            email: 'vdev@gmail.com',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
            ],

            showPassword: false,
            password: '',
            passwordRules: [
                v => !!v || 'Password required.',
                v => (v && v.length >= 5) || 'Min 5 characters',
            ],
        }
    },

    computed: {
        ...mapGetters ({
            user: 'auth/user',
        })
    },

    methods: {
        ...mapActions ({
            setAlert : 'alert/setAlert',
            setStatusDialog: 'dialog/setStatus',
            setAuth: 'auth/setAuth'
        }),

        close() {
            this.setStatusDialog(false)
        },

        submit() {
            if(this.$refs.form.validate()) {
                let formData = {
                    'email' : this.email,
                    'password' : this.password
                }

                this.axios.post('/login', formData)
                    .then((response) => {
                        let data_user = response.data.data
                        
                        this.setAuth(data_user) 
                        
                        if(this.user.id > 0) {
                            this.setAlert({
                                status: true,
                                text: 'Login Berhasil',
                                type: 'success',
                            })

                            this.setStatusDialog(false)
                        } else {
                            this.setAlert({
                                status: true,
                                text: 'Login gagal',
                                type: 'error',
                            })
                        }
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
        }
    },
}
</script>
