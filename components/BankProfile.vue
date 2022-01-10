<template>
    <div class="container w-100 h-100 mt-5">
        <div class="row rounded" id="homeContainer">
            <div class="col-lg-3 rounded homeNav">
                <NavBar />
            </div>
            <div class="col-lg-9 row">
                <div class="col-lg-5 p-3">
                    <div style="font-family: monospace;">
                        <img :src="profileImage" style="width: 200px; height: 200px; margin-left: auto; margin-right: auto; display: block;" class="rounded-circle" alt="Profile Image" />

                        <h3 class="text-center">{{user.firstName + " " + user.lastName}}</h3>
                        <h5 class="text-center">Account Number: {{user.actNumber}}</h5>

                        <p class="mt-2 text-center">Upload New Picture</p>
                        <input type="file" class="form-control" @change="e => newImage = e.target.value.slice(12)" />
                            
                        <button @click="uploadImage()" class="mt-4 text-center btn bg-success text-light" style="margin-right: auto; margin-left: auto; display: block;">UPLOAD IMAGE</button>
                    </div>
                </div>

                <div class="col-lg-7 p-3">
                    <div v-if="editShow == 'showInfo'">
                        <table class="table" id="infoTable">
                            <tbody>
                                <tr>
                                    <td>First Name</td>
                                    <td class="text-light">{{user.firstName}}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td class="text-light">{{user.lastName}}</td>
                                </tr>
                                <tr>
                                    <td>E-Mail</td>
                                    <td class="text-light">{{user.email}} </td>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td class="text-light">{{user.dob}}</td>
                                </tr>
                            </tbody>
                        </table>

                        <button class="btn bg-success text-light" style="font-weight: bold;" @click="()=> this.editShow = 'infoEdit'">
                            EDIT INFO
                        </button>
                        <button class="btn bg-success text-light mx-3" style="font-weight: bold;" @click="()=>this.editShow = 'editPassword'">
                            CHANGE PASSWORD
                        </button>
                        <button class="btn bg-success text-light mt-3" style="font-weight: bold;" @click="()=> this.editShow = 'transferPassword'">
                            CHANGE TRANSFER PASSWORD
                        </button>
                    </div>
                            
                    <div v-if="editShow == 'infoEdit'" class="text-center">
                        <div class="text-center">
                            <label class="editLabel">First Name:</label>
                            <input v-model="newInfo.firstName" class="mt-3 form-control w-75 mx-auto profileInput" placeholder="First Name" />
                                    
                            <label class="mt-3 editLabel">Last Name:</label>
                            <input v-model="newInfo.lastName" class="mt-3 form-control w-75 mx-auto profileInput" placeholder="Last Name" />
                                    
                            <label class="mt-3 editLabel">E-Mail:</label>
                            <input v-model="newInfo.email" class="mt-3 form-control w-75 mx-auto profileInput" placeholder="E-Mail" />

                            <label class="mt-3 editLabel">Date of Birth:</label>
                            <input v-model="newInfo.dob" type="Date" class="mt-3 w-75 mx-auto form-control profileInput text-uppercase" />
                                    
                            <button @click="saveChanges('info')" class="mt-3 btn bg-danger text-light" style="font-weight: bold;">SAVE CHANGES</button>

                            <button class="mt-3 btn bg-danger text-light mx-3" style="font-weight: bold;" @click="()=> editShow = 'showInfo' ">
                                CANCEL
                            </button>
                        </div>
                    </div>

                    <div v-if="editShow == 'editPassword'" class="text-center">
                        <label class="mt-3 editLabel">OLD PASSWORD</label>
                        <input v-model="accountPassword.oldPassword" placeholder="Old Password" :type="inputType" class="form-control w-75 mx-auto mt-3" />

                        <label class="mt-3 editLabel">NEW PASSWORD</label>
                        <input v-model="accountPassword.newPassword" placeholder="New Password" :type="inputType" class="form-control w-75 mx-auto mt-3" />

                        <label class="mt-3 editLabel">CONFIRM NEW PASSWORD</label>
                        <input v-model="accountPassword.confirmNewPassword" :type="inputType" placeholder="Confirm New Password" class="form-control w-75 mx-auto mt-3" />
                        
                        <button class="btn text-light mt-2" style="font-weight: bold;"  @click="this.inputType = inputType == 'password' ? 'text' : 'password'">Show Password </button>

                        <p class="h5 text-light">{{errorMessage}}</p>
                        <button class="mt-3 btn bg-danger text-light" style="font-weight: bold;" @click="saveChanges('password')">
                            SAVE CHANGES
                        </button>
                        <button class="mt-3 btn bg-danger text-light mx-3" style="font-weight: bold;" @click="()=> editShow = 'showInfo' ">
                            CANCEL
                        </button>
                    </div>

                    <div v-if="editShow == 'transferPassword'" class="text-center">
                        <div v-if="user.transferPassword">
                            <label class="mt-3 editLabel">OLD TRANSFER PASSWORD</label>
                            <input v-model="transferPassword.oldPassword" placeholder="Old Transfer Password" class="form-control mt-3 w-75 mx-auto" />
                        </div>

                        <label class="mt-3 editLabel">NEW TRANSFER PASSWORD</label>
                        <input v-model="transferPassword.newPassword" placeholder="New Transfer Password" class="form-control mt-3 w-75 mx-auto" type="password" />

                        <label class="mt-3 editLabel">CONFIRM NEW TRANSFER PASSWORD</label>
                        <input v-model="transferPassword.confirmNewPassword" placeholder="Confirm New Transfer Password" class="form-control mt-3 w-75 mx-auto" type="password" />

                        <p class="h5 text-light">{{errorMessage}}</p>
                        <button class="mt-3 btn bg-danger text-light mx-3" style="font-weight: bold;" @click="saveChanges('transferPassword')">SAVE CHANGES</button>
                        <button class="mt-3 btn bg-danger text-light mx-3" style="font-weight: bold;" @click="()=> this.editShow = 'showInfo' ">CANCEL</button>
                    </div>
                    <div v-if="editShow == 'success'" class="my-auto mx-auto">
                        <div class="card">
                            <div class="card-header bg-warning text-center">
                                <strong class="h4 text-success">CHANGE SUCCESSFUL</strong>
                            </div>
                            <div class="card-body">
                                <h5>{{successMessage}}</h5>
                            </div>
                            <div class="card-footer text-center">
                                <button @click="this.$router.push({name: 'home', params: {id: user.firstName}})" class="btn text-success" style="font-weight: bold;">
                                    CLICK HERE TO CONTINUE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import NavBar from '../components/HomeNavBar';
export default {
    data () {
        return {
            newInfo: {},
            accountPassword: {oldPassword: "", newPassword: "", confirmNewPassword: ""},
            transferPassword: {oldPassword: "", newPassword: "", confirmNewPassword: ""},
            successMessage: "",
            inputType: "password",
            errorMessage: "",
            editShow: "showInfo",
            newImage: "",
        }
    },
    mounted () {
        let {firstName, lastName, email, dob} = this.user;
        this.successMessage = "";
        this.newInfo = {firstName, lastName, email, dob};
    },
    updated () {
        axios.get(`https://vue-bank-project-default-rtdb.firebaseio.com/allUser/${this.user.id}.json`).then (res => {
            this.$store.dispatch("setUserInfo", res.data);
        });
    },
    methods: {
        uploadImage () {
          this.$store.dispatch("setProfilePic", require(`../components/images/${this.newImage}`))
        },
        saveChanges (val) {
            let {user, newInfo} = this;
            let {firstName, lastName, dob, email} = newInfo;

            if (val == "info") {
// save new user information provided in place of the old one
                axios.patch(`https://vue-bank-project-default-rtdb.firebaseio.com/allUser/${user.id}.json`, {firstName, lastName, email, dob});
                this.successMessage = "Dear customer, you have successfully change your account information";
                this.editShow = 'success';
            } else if (val == 'password') {
                let {oldPassword, newPassword, confirmNewPassword} = this.accountPassword;
// check if old password is correct
                if (oldPassword !== user.password) {
                    this.errorMessage = `The Old Password you entered is not correct`;
                    return;
                }
// check if new password match
                if (newPassword !== confirmNewPassword)  {
                    this.errorMessage = `The New Password you entered does not match each other`;
                    return;
                }
// save password changes
                axios.patch(`https://vue-bank-project-default-rtdb.firebaseio.com/allUser/${user.id}.json`, {password: newPassword});
                this.successMessage = "Dear customer, you have succesfully change your account password";
                this.editShow = 'success';
            } else {
                let {user} = this;
                let {oldPassword, newPassword, confirmNewPassword} = this.transferPassword;
// check if user already have transfer password to set new transfer password
                if (user.transferPassword) {
                    if (oldPassword !== "" && newPassword !== "" && confirmNewPassword !== "") {
// check if old transfer password is correct 
                        if (oldPassword !== user.transferPassword) {
                            this.errorMessage = "The old password you entered is not correct";
                            return;
                        }
// check if new password match
                        if (newPassword !== confirmNewPassword) {
                            this.errorMessage = "The password you entered does not match";
                            return;
                        }
// save changes for transfer password
                        axios.patch(`https://vue-bank-project-default-rtdb.firebaseio.com/allUser/${user.id}.json`, {transferPassword: newPassword});
                        this.successMessage = "Dear customer, you have successfully change your transfer password";
                        this.editShow = "success";
                    }
                } else {
// if user havent set transfer password before, then check if new transfer password match 
                    if (newPassword !== "" && confirmNewPassword !== "") {
                        if (newPassword !== confirmNewPassword) {
                            this.errorMessage = "The password you entered does not match";
                            return;
                        }
// save changes for transfer password
                        axios.patch(`https://vue-bank-project-default-rtdb.firebaseio.com/allUser/${user.id}.json`, {transferPassword: newPassword});
                        this.successMessage = "Dear customer, you have successfully change your transfer password";
                        this.editShow = "success";
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters(['user', 'profileImage'])
    },
    components: {
        NavBar
    }
}
</script>

<style>
.profileInput {
    font-size: 1em;
}
#infoTable {
    font-family: monospace;
    font-size: 1.5em;
    font-weight: bold;
}
.editLabel {
    font-family: serif;
    font-size: 1.3em;
    font-weight: bold;
    color: #fff;
}
</style>