<template>
    <div id="container" class='container rounded w-100 h-100'>
        <div class="row mt-5 text-center text-light">
            <div class="col-lg-6 p-0 d-none d-lg-block">
                <img src="../components/images/wardabank.jpg" class="w-100 h-100 rounded" />
            </div>
            <div class="col-lg-6">
                <label class="mt-5 h4 formDesc">
                    <strong>E-MAIL/ACCOUNT NUMBER:</strong>
                </label>
                <input v-model="logID" placeholder="E-Mail / Account Number" class="form-control w-75 mx-auto logInput" />

                <label class="mt-4 h4 formDesc">
                    <strong>PASSWORD:</strong>
                </label>
                <input v-model="logPass" placeholder="Password" type="password" class="form-control w-75 mx-auto logInput" />
                <h5 class="mt-3 text-light">{{incorrectLogin}}</h5>
                    
                <input class="mt-4 btn-info btn text-light logBtn" @click="login
                    
                    " type="submit" value="LOGIN" />
                <br><br>
                    
                <router-link :to="{name: 'register'}" class="h5 text-light">
                    Don't have an account? Sign up
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            logID: "",
            logPass: "",
            incorrectLogin: "",
            allUser: []
        }
    },
    mounted () {
        axios.get("https://vue-bank-project-default-rtdb.firebaseio.com/allUser.json").then(res => {
            let user = [];
            let getUser = res.data;
            for (const val in getUser) {
                user.push({...getUser[val], id: val});
            }
            this.allUser = user;
        })
    },
    methods: {
        login () {
            let {logID, logPass, allUser} = this;
// check all registered user email to confirm if email entered exist
            let userEmail = allUser.find(val => val.email == logID || val.actNumber == logID);
            if (userEmail) {
// check entered password is correct is user exist with the email
                if (userEmail.password !== logPass) {
                    this.incorrectLogin = "Incorrect Password";
                    return;
                } else {
// set user information to local storage and vuex store
                    this.$store.dispatch("setUserInfo", {...userEmail});
                    localStorage.setItem("user", JSON.stringify(userEmail.id));
                }
                this.logID = "";
                this.logPass = "";
            } else {
// error message if email is not found
                this.incorrectLogin = "Email and Password does not exist";
                this.$router.push({name: "login"});
                return;
            }
// go to home page if successful login
            this.$router.push({name: "home", params: {id: userEmail.firstName}});
        }
    }
}
</script>

<style>
#container {
    background-color: rgb(47,99,136);
}
.logInput {
    font-size: 1.2em;
}
.logBtn {
    font-family: Monospace;
    font-weight: bold;
    font-size: 1.4em;
}
.formDesc {
    font-family: Monospace;
    text-align: center;
}
</style>