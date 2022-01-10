<template>
    <nav class="navbar navbar-expand-lg rounded">
        <button class="navbar-toggler bg-info" type="button" data-toggle="collapse" data-target="#navBar">
            <span class="navbar-toggler-icon">NAV</span>
        </button>

        <div class="collapse navbar-collapse" id="navBar">
            <ul class="nav">
                <li class="navbar-brand mx-auto">
                    <img src="../components/images/WorldBank.jpg" alt="logo" class="w-100 h-100" />
                </li>
        <!-- Home route -->
                <li class="nav-item" @click="home">
                    <router-link :to="{name: 'home', params: {id: user.firstName}}" class="mt-3 nav-link text-light rounded" :style="navColors.homeColor">
                        <img src="../components/images/Home.png" alt="Home" class="navImage" />
                        <span class="p-4 h4 navLabel">HOME</span>
                    </router-link>
                </li>
        <!-- Profile route -->
                <li class="nav-item" @click="profile" >
                    <router-link :to="{name: 'profile', params: {id: user.firstName}}" class="mt-3 nav-link text-light rounded" :style="navColors.profileColor">
                        <img src="../components/images/Profile.png" alt="Profile" class="navImage" />
                        <span class="p-4 h4 navLabel">PROFILE</span>
                    </router-link>
                </li>
        <!-- Transfer route   -->
                <li class="nav-item" @click="transfer">
                    <router-link :to="{name: 'transfer', params: {id: user.firstName}}" class="mt-3 nav-link text-light rounded" :style="navColors.transferColor">
                        <img src="../components/images/Transfer.png" alt="Transfer" class="navImage" />
                        <span class="p-4 h4 navLabel">TRANSFER</span>
                    </router-link>
                </li>
        <!-- Notification route    -->
                <li class="nav-item" @click="notification" >
                    <router-link :to="{name: 'notification', params: {id: user.firstName}}" class="mt-3 nav-link text-light rounded" :style="navColors.transferColor" >
                        <img src="../components/images/Notification.png" alt="Notification" class="navImage" />
                        <span class="p-4 h4 navLabel">NOTIFICATION</span>
                    </router-link>
                </li>
        <!-- Log Out -->
                <li class="nav-item">
                    <router-link :to="{name: 'home'}" class="mt-3 nav-link text-light" @click="logOut()">
                        <img src="../components/images/Logout.png" alt="Log Out" class="navImage" />
                        <span class="p-4 h4 navLabel">LOG OUT</span>
                    </router-link>
                </li>
            </ul>
            
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data () {
        return {
            navColors: {}
        }
    },
    methods:  {
        logOut () {
            this.$router.push({name: "login"});
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
}
</script>

<style>
.navImage {
    height: 30px;
    width: 30px;
}
.navLabel {
    font-size: 1.3em;
    font-weight: bold;
}
</style>