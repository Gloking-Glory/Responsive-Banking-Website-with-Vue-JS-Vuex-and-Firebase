<template>
    <div class="container rounded w-100 h-100">
        <div id="regContainer" class="row mx-auto my-auto text-center rounded mt-3">
            <div class="col-lg-6 d-none d-lg-block p-0">
                <img src="../components/images/moneyPic.jpg"  class="rounded w-100 h-100" />              
            </div>
            <div class="col-lg-6">
                <label class="mt-3 h5 desc">FIRST NAME: </label>
                <input v-model="info.firstName" placeholder="First Name" class="form-control w-75 mx-auto infoInput" /> 

                <label class="mt-3 h5 desc">LAST NAME: </label>
                <input v-model="info.lastName" placeholder="Last Name" class="form-control w-75 mx-auto infoInput" />
                    
                <label class="mt-3 h5 desc">E-MAIL:</label>
                <input v-model="info.email" placeholder="Email" class="form-control w-75 mx-auto infoInput" />
                <h5 class="error">{{emailExist}}</h5>

                <label class="mt-3 h5 desc">DATE OF BIRTH:</label>
                <input v-model="info.dob" type="Date" class="form-control w-75 mx-auto infoInput text-uppercase" />
                    
                <label class="mt-3 h5 desc">PASSWORD: </label>
                <input v-model="info.password" type="password" placeholder="Password"  class="form-control w-75 mx-auto infoInput" />

                <label class="mt-3 h5 desc">CONFIRM PASSWORD:</label>
                <input v-model="confirmPassword" type="password" placeholder="Confirm Password"  class="form-control w-75 mx-auto infoInput" />
                <h5 class="error"><strong>{{passNotMatch}}</strong></h5>
                    
                <button @click="register" class="mt-2 btn bg-danger bg-success text-light regBtn" type="submit">REGISTER</button> <br>
                <router-link :to="{name: 'login'}" class="h5 text-danger">Already have an account? Log in</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            info: {firstName: "", lastName: "", email: "", password: "", actNumber: "", balance: 50000, dob: ""},
            confirmPassword: "",
            emailExist: "",
            passNotMatch: "",
            allUser: []
        }
    },
    mounted () {
        axios.get("https://vue-bank-project-default-rtdb.firebaseio.com/allUser.json").then(res => {
            let users = [];
            let userData = res.data;
            for (const val in userData) {
                users.push({...userData[val], id: val})
            }
            this.allUser = users;
        })
    },
    updated () {
        axios.get("https://vue-bank-project-default-rtdb.firebaseio.com/allUser.json").then(res => {
            let user = [];
            let userData = res.data;
            for (const val in userData) {
                user.push({...userData[val], id: val});
            }
            this.allUser = user;
        })
    },
    methods: {
        register () {
            let {allUser, confirmPassword, info} = this;
            let {firstName, lastName, password, dob, email} = info;
// check if form input is not empty before proceeding
            if (firstName !== "" && lastName !== "" && password !== "" && dob !== "" && email !== "") {
                for (let i = 0; i < allUser.length; i++) {
// checking email if already exist
                    if (allUser[i].email == email) {
                        this.emailExist = "Email Already Exist";
                        return;
                    } else {
                        this.emailExist = "";
                    }
                }
// check password and confirm password if match before proceeding
                if (password !== confirmPassword) {
                    this.passNotMatch = "Password doesn't match";
                    return;
                } else {
                    this.passNotMatch = "";
                }
// set up acccount number for user
                for (let i = 0; i < 10; i++) {
                    let account = Math.floor(Math.random() * 10);
                    info.actNumber += account;
                }
// post user information to firebase database
                axios.post("https://vue-bank-project-default-rtdb.firebaseio.com/allUser.json", info);
                axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArLnfKXaNRmQ2C1aG4mSQOIl5-d1O5xoY")
            }
            this.info = {firstName: "", lastName: "", email: "", password: "", actNumber: "", balance: 50000, dob: ""};
            this.confirmPassword = "";
            this.$router.push({name: "login"});
        }
    }
}
</script>

<style>
#regContainer {
    background-color: rgb(159,182,188);
}
.regBtn {
    font-weight: bold;
}
.desc {
    color: rgb(6,77,102);
    font-weight: bold;
    font-size: 1.2em;
}
.error {
    color: rgb(6,77,102);
}
</style>