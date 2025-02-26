import { createRouter, createWebHistory } from 'vue-router'
import BastionHost from '@/views/home/blogs/2024/BastionHost.vue'
import Proxy from '@/views/home/blogs/2025/Proxy.vue'
import Docker from '@/views/home/blogs/2024/Docker.vue'
import HotReloadVueContainer from '@/views/home/blogs/2024/HotReloadVueContainer.vue'
import VueCatch404 from '@/views/home/blogs/2024/NotFound.vue'
import VueComponentSEOCSR from '@/views/home/blogs/2024/VueComponentSEOCSR.vue'
import CssFlex from '@/views/home/blogs/2024/CSSFlex.vue'
import NavBar from '@/views/home/Navigation.vue'
import AboutMe from '@/views/home/AboutMe.vue'
import Footer from '@/views/home/Footer.vue'
import BlogsCollection from '@/views/home/BlogsCollection.vue'
import Error from '@/views/home/Error.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: NavBar,
        a: AboutMe,
        b: Footer
      },
      meta: {
        title: 'Home Page - Example App',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      }
    },
    {
      path: '/blogs-collection',
      name: 'BlogsCollection',
      component: BlogsCollection
    },
    {
      path: '/2024/bastion-host-architecture',
      name: 'BastionHost',
      component: BastionHost
    },
    {
      path: '/2024/docker',
      name: 'Docker',
      component: Docker
    },
    {
      path: '/2024/hot-reload-vue-with-vite-in-docker-container',
      name: 'HotReloadVueContainer',
      component: HotReloadVueContainer
    },
    {
      path: '/2024/css-flex',
      name: 'CssFlex',
      component: CssFlex
    },
    {
      path: '/2024/vue-catch-all-404',
      name: 'VueCatch404',
      component: VueCatch404
    },
    {
      path: '/2024/vue-component-seo-csr',
      name: 'VueComponentSEOCSR',
      component: VueComponentSEOCSR
    },
    {
      path: '/2025/proxy-vs-reverse-proxy',
      name: 'Proxy',
      component: Proxy
    },
    // Catch-all route for undefined paths
    {
      path: '/:pathMatch(.*)*',
      name: 'Error',
      component: Error
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  next()
})

export default router
