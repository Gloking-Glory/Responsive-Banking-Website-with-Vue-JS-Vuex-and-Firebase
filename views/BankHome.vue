<template>
    <div class="container h-100 w-100 mt-5">
        <div class="row rounded" id="homeContainer">
            <div class="col-lg-3 rounded homeNav">
                <NavBar />
            </div>
            
            <div class="col-lg-9">
                <div class="row">
                    <div class="col-lg-12 p-3">
                        <h2 class="text-uppercase" style="font-weight: bold;">{{user.firstName + " " + user.lastName}}</h2>
                        <p style="font-size: .9em">Last login: {{newDate}}</p>

                        <div id="welcomeContainer" class="rounded text-light row">
                            <div class="p-3 col-lg-6" style="font-family: Monospace;">
                                <h3>Welcome back, {{user.lastName}}</h3>
                                <p>Check your transactions and manage all your activities here</p>
                            </div>
                            <div class="col-lg-6 d-lg-block d-none">
                                <img src="../components/images/image6.png" alt="building" style="width: 400px; margin-top: -25pt; height: 200px" />
                            </div>
                        </div>
                    </div>

                    <div class="row mx-auto">
                        <div id="displayProfile" class="col-lg-6 rounded mx-auto mb-3">
                            <div class="p-3 d-flex">
                                <div>
                                    <img :src="profileImage" alt="Profile Image" style="height: 120px; width: 120px" />
                                </div>
                                <div class="p-3 text-center">
                                    <h3 class="text-light text-uppercase profileInfo">{{user.firstName}}</h3>
                                    <h3 class="text-light text-uppercase profileInfo">{{user.lastName}}</h3>
                                </div>
                            </div>
                            <div class="p-3 d-flex" style="margin-top: -25pt">
                                <div>
                                    <h4 style="font-weight: bold; color: rgb(90,7,150);" class="mt-3">E-MAIL:</h4>
                                    <h4 style="font-weight: bold; color: rgb(90,7,150)" class="mt-3">DOB:</h4>
                                    
                                </div>
                                <div style="margin-left: 40pt;">
                                    <h4 class="mt-3 text-light">{{user.email}}</h4>
                                    <h4 class="mt-3 text-light">{{user.dob}}</h4>
                                </div>
                            </div>   
                        </div>
                        
                        <div class="col-lg-6">
                            <div class="d-flex mx-auto">
                                <div class="text-center w-50 rounded actInfoContainer">
                                    <h6 class="mt-2">ACCOUNT</h6>
                                    <h4>NUMBER</h4>
                                    <h2 class="text-light">{{user.actNumber}}</h2>
                                </div>
                                <div class="text-center rounded w-50 actInfoContainer" style="margin-left: 10pt;">
                                    <h6 class="mt-2">ACCOUNT</h6>
                                    <h4>BALANCE</h4>
                                    <h2 class="text-light"><span style="text-decoration: double line-through">N</span>{{user.balance}}</h2>
                                </div>
                            </div>

                            <div class="mt-2 rounded transactionContainer">
                                <div class="p-2 text-center">
                                    <h4>Last Transaction</h4>
                                    <strong class="text-light">{{message}}</strong>

                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from '../components/HomeNavBar';
import axios from 'axios';
export default {
    data () {
        return {
            newDate: Date(),
            message: "",
        }
    },
    mounted () {
        axios.get(`https://vue-bank-project-default-rtdb.firebaseio.com/allUser/${this.user.id}.json`).then (res => {
            let userData = res.data;
            let minTransfer = [];
            if (userData.transfer.length > 3) {
                for (let i = 0; i < 3; i++) {
                    minTransfer.push(userData.transfer[i]);
                }
                axios.patch(`https://vue-bank-project-default-rtdb.firebaseio.com/allUser/${this.user.id}.json`, {transfer: minTransfer});
            }
// set up last transaction for home page message 
            let lastMessage = userData.transfer.slice(-1);
            let {status, time, date, amount, sender, receiver} = lastMessage[0];
            this.message = `${status} ALERT: Time: ${time}, Date: ${date}, Amount: ${amount}, Sender: ${sender}, Receiver: ${receiver}`;
        });
    },
    computed: {
        ...mapGetters(["user", "profileImage"])
    },
    components: {
        NavBar,
    }
}
</script>

<style>
#homeContainer {
    background-color: rgb(101,150,229);
}
.homeNav {
    background-color: rgb(91,140,219);
}
#welcomeContainer {
    background-color: rgb(57,57,125);
    height: 100pt;
}
#displayProfile {
    background-color: rgb(63,123,195);
}
.profileInfo {
    font-weight: bold;
}
.actInfoContainer {
    background-color: rgb(63,123,195);
    font-family: serif;
    font-weight: bolder;
}
.transactionContainer {
    background-color: rgb(63,123,195);
}
</style>