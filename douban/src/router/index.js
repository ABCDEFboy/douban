import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/header/header'
import Deatil from '../components/deatils/deatil'
import Start from '../components/Start/start'
import Messages from '../components/Messages/messages'
import Search from '../components/search/search'
import Book from '../components/book/book'
import BookDeatil from '../components/book-deatil/bookDeatil'
import BookMessage from '../components/book-mssage/bookMessage'
import BookSeach from '../components/book-search/bookSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/header', name: 'Header', component: Header},
    {path: '/deatil', name: 'Deatil', component: Deatil},
    {path: '/start', name: 'Start', component: Start},
    {path: '/messages', name: 'Messages', component: Messages},
    {path: '/search', name: 'Search', component: Search},
    {path: '/book', name: 'Book', component: Book},
    {path: '/bookDeatil', name: 'BookDeatil', component: BookDeatil},
    {path: '/bookMessage', name: 'BookMessage', component: BookMessage},
    {path: '/bookSearch', name: 'BookSeach', component: BookSeach}
  ]
})
