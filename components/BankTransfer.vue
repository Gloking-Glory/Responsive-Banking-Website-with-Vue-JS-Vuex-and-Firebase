<template>
    <div class="mt-5 w-100 h-100 container">
        <div class="row rounded" id="transferPage">
            <div class="col-lg-3 ">
                <NavBar />
            </div>
            <div class="col-lg-9 my-auto mx-auto row">
                <div class="col-6 mb-4 p-3">
                    <img src="../components/images/moneytransfer.jpg" alt="Money Transfer" class="w-100 h-100" />
                </div>
                
                <div class="col-lg-6 p-3">
                    <div v-if="transferConfirm == 'details'">
                        <label class="detailLabel">RECEIVER ACCOUNT NUMBER: </label>
                        <input v-model="recActNum" placeholder="Receiver Account Number" type="number" class="mt-2 form-control transferInput" @input="recDetails" />

                        <label class="mt-3 detailLabel">RECEIVER ACCOUNT NAME:</label>
                        <input class="text-uppercase form-control transferInput" :value="receiverName" disabled/>
                            
                        <label class="mt-3 detailLabel">AMOUNT TO TRANSFER: </label>
                        <input v-model="transferPrice" placeholder="Transfer Price" class="mt-2 form-control transferInput" type="number" />
                        <h5 class="detailLabel mt-3">{{message}}</h5>

                        <button v-if="transferMessage" class="btn detailLabel" @click="this.$router.push({name: 'profile', params: {id: user.firstName}})">Dear customer, you haven't set up your transfer password, please click here to go to your profile and set it up</button>
                        <button @click="transfer" class="mt-2 btn bg-danger text-light transferBtn">TRANSFER</button>
                    </div>

                    <div v-if="transferConfirm == 'confirmPassword'">
                        <h5 class="detailLabel">{{message}}</h5>
                        <label class="detailLabel mt-3">Enter Transfer Password</label>
                        <input v-model="confirmPassword" class="mt-2 form-control transferInput" type="password" />
                        <h5 class="detailLabel">{{passwordMessage}}</h5>
                        <button class="btn bg-danger text-light transferBtn mt-3" @click="()=> {this.transferConfirm = 'details'; this.message = '' }">CANCEL</button>
                        <button @click="transfer" class="mt-2 btn bg-danger text-light transferBtn">TRANSFER</button>
                    </div>

                    <div v-if="transferConfirm == 'success'" class="card">
                        <div class="card-header bg-warning">
                            <h5 class="text-success text-center" style="font-weight: bold;" >TRANSFER SUCCESSFULL</h5>
                        </div>
                        <div class="card-body">
                            <table class="table myTable">
                                <tbody>
                                    <tr>
                                        <td>Transaction Time:</td>
                                        <td>{{transferTime}}</td>
                                    </tr>
                                    <tr>
                                        <td>Transfer Date:</td>
                                        <td>{{transferDate}}</td>
                                    </tr>
                                    <tr>
                                        <td>Amount:</td>
                                        <td>{{transferPrice}}</td>
                                    </tr>
                                    <tr>
                                        <td>Sender Account Name:</td>
                                        <td>{{`${user.firstName} ${user.lastName}`}}</td>
                                    </tr>
                                    <tr>
                                        <td>Sender Account Number:</td>
                                        <td>{{user.actNumber}}</td>
                                    </tr>
                                    <tr>
                                        <td>Receiver Account Name:</td>
                                        <td>{{receiverName}}</td>
                                    </tr>
                                    <tr>
                                        <td>Receiver Account Number:</td>
                                        <td>{{recActNum}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="card-footer text-center">
                            <button class="btn  text-success" @click="this.$router.push({name: 'home', params: {id: user.firstName}})" style="font-weight: bold;">
                                CLICK HERE TO COTINUE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import NavBar from '../components/HomeNavBar';
export default {
    data () {
        return {
            recActNum: "",
            transferPrice: "",
            confirmPassword: "",
            transferConfirm: "details",
            successTransfer: false,
            transferDate: "",
            transferTime: "",
            receiverName: "",
            message: "",
            passwordMessage: "",
            transferMessage: false,
            allUser: []
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    mounted () {
        if (Object.keys(this.user).length == 0) {
            this.$router.push({name: 'login'});
        }
        axios.get("https://vue-bank-project-default-rtdb.firebaseio.com/allUser.json").then (res => {
            let users = [];
            let usersData = res.data;
            for (const val in usersData) {
                users.push({...usersData[val], id: val});
            }
            this.allUser = users;
        });
    },
    updated () {
        axios.get(`https://vue-bank-project-default-rtdb.firebaseio.com/allUser/${this.user.id}.json`).then (res => {
            this.$store.dispatch("setUserInfo", res.data);
        });
    },
    methods: {
// set receiver Details
        recDetails () {
            let {recActNum} = this;
            axios.get("https://vue-bank-project-default-rtdb.firebaseio.com/allUser.json").then(res => {
                let user = [];
                let allDetails = res.data;
                for (const val in allDetails) {
                    user.push(allDetails[val]);
                }
                let findReceiver = user.find(val => val.actNumber == recActNum);
                if (findReceiver) {
                    let {firstName, lastName} = findReceiver;
                    this.receiverName = `${firstName} ${lastName}`;
                } else {
                    this.receiverName = "";
                }
            })
        },
        transfer () {
            let {recActNum, user, transferPrice, receiverName, confirmPassword} = this;
            
            let userName = `${user.firstName} ${user.lastName}`;
// stop transfer if account number is not found
            if (this.receiverName == "") {
                this.message = "The account number you entered is not found";
                return;
            }
// stop transfer if transfer amount is not valid
            if (transferPrice == "") {
                this.message = "Invalid Transfer Amount";
                return;
            }
// stop transfer if user is sending money to his account number
            if (recActNum == user.actNumber) {
                this.message = "Dear Customer, you can't transfer to yourself";
                return;
            }
// check if transfer amount is sufficient to balance
            if (transferPrice > user.balance) {
                this.message = `Dear Customer, you have insufficient balance for the transfer, your balance is ${user.balance}`;
                return;
            }
// check if user has set up transfer password
            if (!user.transferPassword) {
                this.transferMessage = true;
                this.message = "";
                return;
            }
// set up input to enter transfer password before confirm transfer
            if (this.transferConfirm == 'details') {
                this.message = `Dear customer, you are about to transfer ${transferPrice} to ${this.receiverName}, enter your transfer password to continue`;
                this.transferConfirm = 'confirmPassword';
                return;
            } else {
                this.transferConfirm = 'details';
                this.message = "";
            }
// check if user transfer password is correct
            if (confirmPassword !== user.transferPassword) {
                this.passwordMessage = "The transfer password you entered is incorrect, please try again";
                this.transferConfirm = 'confirmPassword';
                return;
            }
            
// all user information to find receiver and add up transfer price
            axios.get("https://vue-bank-project-default-rtdb.firebaseio.com/allUser.json").then (res=> {
                let allUser = [];
                let details = res.data;
                for (const val in details) {
                    allUser.push({...details[val], id: val});
                }
                let receiver = allUser.find(val => val.actNumber == recActNum);
//  set transfer date and time and transferInfo
                let date = new Date;
                this.transferTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                this.transferDate = `${date.getDate()}:${date.getMonth()+1}:${date.getFullYear()}`;
                let transferInfo = {sender: userName, receiver: receiverName, amount: transferPrice, date: this.transferDate, time: this.transferTime, status: "", balance: ""};

// add to receiver balance the transfer amount and set transfer info
                axios.patch(`https://vue-bank-project-default-rtdb.firebaseio.com/allUser/${receiver.id}.json`, 
                    {
                        balance: +receiver.balance + +transferPrice, 
                        transfer: (receiver.transfer) ? 
                            [...receiver.transfer, {...transferInfo, status: "CREDIT", balance: receiver.balance}] : 
                            [{...transferInfo, status: "CREDIT", balance: +receiver.balance + +transferPrice}]
                    }
                );
// deduct user balance (sender) from the transfer amount and set transfer info
                axios.patch(`https://vue-bank-project-default-rtdb.firebaseio.com/allUser/${user.id}.json`, 
                    {
                        balance: +user.balance - +transferPrice,
                        transfer: (user.transfer) ? 
                            [...user.transfer, {...transferInfo, status: "DEBIT", balance: user.balance}] : 
                            [{...transferInfo, status: "DEBIT", balance: +user.balance - +transferPrice}]
                    }
                );
// show transaction receipt for successful transfer
                this.transferConfirm = "success";
            });
        }
    },
    components: {
        NavBar
    }
}
</script>

<style>
#transferPage {
    background-color: rgb(63,123,195);
}
.transferInput {
    font-family: monospace;
    font-weight: bold;
}
.detailLabel {
    font-family: monospace;
    font-weight: bold;
    font-size: 1.3em;
    color: #fff;
}
.transferBtn {
    font-family: monospace;
    font-weight: bold;
    font-size: 1.3em;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.myTable {
    font-family: monospace;
    font-weight: bold;
}
</style>