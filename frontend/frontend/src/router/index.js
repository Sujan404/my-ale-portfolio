import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/App.vue'
import PostView from '../views/main/Post.vue'
import CategoryView from '@/views/main/Category.vue'
import TagView from '@/views/main/Tag.vue'
import AllCategoriesView from '@/views/main/AllCategories.vue'
import AllTagsView from '@/views/main/AllTags.vue'
import SignInView from '@/views/user/SignIn.vue'
import SignUpView from '@/views/user/SignUp.vue'
import ProfileView from '@/views/user/Profile.vue'
import GenerateText from '@/views/user/services/GenerateText.vue'
import CustomizePage from '@/views/user/services/CustomizePage.vue'
import CustomizeViewPage from '@/views/user/services/customize-page/ViewPage.vue'
import CreateCustomizePage from '@/views/user/services/customize-page/CreatePage.vue'
import UserView from '@/views/user/User.vue'
import BastionHost from '@/views/home/blogs/2024/BastionHost.vue'
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
import { userUserStore } from '@/stores/user'
import { CURRENT_USER } from '@/queries'
import { apolloClient } from '@/apollo-config'
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/category/:category',
      name: 'Category',
      component: CategoryView
    },
    {
      path: '/tag',
      name: 'Tag',
      component: TagView
    },
    {
      path: '/categories',
      name: 'Categories',
      component: AllCategoriesView
    },
    {
      path: '/tags',
      name: 'Tags',
      component: AllTagsView
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignInView
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUpView
    },
    {
      path: '/user/:userId',
      name: 'User',
      component: UserView,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'generate-text',
          name: 'GenerateText',
          component: GenerateText
        },
        {
          path: 'customize-page',
          name: 'CustomizePage',
          component: CustomizePage,
          children:[
            {
              path: 'view-page',
              name: 'ViewPage',
              component: CustomizeViewPage
            },
            {
              path: 'create-page',
              name: 'CreatePage',
              component: CreateCustomizePage
            }
          ]
        }
      ]
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
    // Catch-all route for undefined paths
    {
      path: '/:pathMatch(.*)*',
      name: 'Error',
      component: Error
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = userUserStore()
  const token = localStorage.getItem('token')
  const isLoggedIn = userStore.getUser
  // If user is logged in and has token
  if (isLoggedIn && token) {
    try {
      const queriedUser = await apolloClient.query({
        query: CURRENT_USER,
        variables: {
          userId: parseInt(isLoggedIn['id'])
        }
      })
      const queriedToken = queriedUser.data.user[0]['activeJwt']
      // Redirect to /user if trying to access /signin while already signed in
      if (to.path === '/signin' && token === queriedToken) {
        return next({ name: 'User' ,params: { userId: isLoggedIn['id'] }} )
      }

      // Handle protected routes
      if (to.meta.requiresAuth) {
        if (token === queriedToken) {
          return next() // User is authenticated
        }
        else {
          //  when url is redirect then it doesnot start over again so it prevent from deleting user information
          if (!isLoggedIn) {
          //   // Invalid token, redirect to sign-in
            return next({
              path: '/signin',
              query: { redirect: to.fullPath }
            })
          }
        }
      }
    } catch (error) {
      if (error.networkError?.statusCode === 401) {
        const errorMessage = error.networkError.result?.errors?.[0]?.message || 'Unauthorized'
        alert(errorMessage)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return next({ path: '/signin', query: { message: errorMessage } })
      } else {
        console.error('An unexpected error occurred:', error)
        return next(false) // Cancel navigation on error
      }
    }
  }

  // Non-authenticated or public route
  if (!isLoggedIn && to.meta.requiresAuth) {
    console.log("I am not logged in")
    return next({
      path: '/signin',
      query: { redirect: to.fullPath }
    })
  }
  // Allow access to non-protected routes
  next()
})

export default router
