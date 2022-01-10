<template>
    <div class="container w-100 h-100 mt-5">
        <div class="row rounded" id="homeContainer">
            <div class="col-lg-3">
                <NavBar />
            </div>
            <div class="col-lg-9 p-3">
                <h3 class="text-center text-light">
                    <strong>TRANSFER HISTORY</strong>    
                </h3>
                <h3 v-if="user.transfer.length == 0" class="text-warning text-center mt-3" style="font-family: monospace">{{emptyHistory}}</h3>

                <div v-for="transfer in user.transfer" :key="transfer" class="d-inline-flex mt-3">
                        <div class="bg-secondary mx-1 rounded message">
                            <table class="table text-light">
                                <thead>
                                    <tr>
                                        <th>{{transfer.status}} ALERT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Sender:</td>
                                        <td>{{transfer.sender}}</td>
                                    </tr>
                                    <tr>
                                        <td>Receiver:</td>
                                        <td>{{transfer.receiver}}</td>
                                    </tr>
                                    <tr>
                                        <td>Amount:</td>
                                        <td>{{transfer.amount}}</td>
                                    </tr>
                                    <tr>
                                        <td>Time:</td>
                                        <td>{{transfer.time}}</td>
                                    </tr>
                                    <tr>
                                        <td>Date:</td>
                                        <td>{{transfer.date}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from '../components/HomeNavBar'; 
export default {
    data () {
        return {
            emptyHistory: "You havent made any transaction, make a transaction and come back here to check",
            debitTransfer: [],
            creditTransfer: [],
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    components: {
        NavBar
    }
}
</script>

<style>
#transferMessage {
    background-color: rgb(71, 66, 66);
    height: 60pt;
    width: 400pt;
}
.message {
    font-family: monospace;
    font-weight: bold;
}
</style>