import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/BankReg';
import Login from '../views/BankLogin';
import Home from '../views/BankHome';
import Profile from '../components/BankProfile';
import Transfer from '../components/BankTransfer';
import Notification from '../components/BankNotification';
const routes = [
  {
    path: '/',
    component: Register,
    name: 'register'
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/home/:id',
    component: Home,
    name: "home"

  },
  {
    path: '/profile/:id',
    component: Profile,
    name: "profile"
  },
  {
    path: '/transfer/:id',
    component: Transfer,
    name: "transfer"
  },
  {
    path: '/notification/:id',
    component: Notification,
    name: "notification"
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
