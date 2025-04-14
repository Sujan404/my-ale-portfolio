<template>

    <Head>
        <title>Vue.js Integration with WordPress</title>
        <meta name="og:description"
            content="How to integrate Vue.js with WordPress for dynamic front-end experiences" />
        <meta name="og:keywords"
            content="Vue.js, WordPress, Integration, Headless CMS, REST API, Frontend Development" />
    </Head>

    <!-- NavBar -->
    <div class="mb-3">
        <NavBar />
    </div>

    <!-- Body Part -->
    <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
        <h1 class="text-3xl">{{ BLOGS_INFO['wordPressVue']['title'] }}</h1>
        <p id="read-text">
            {{ BLOGS_INFO['wordPressVue']['date'] }} |
            {{ BLOGS_INFO['wordPressVue']['readTime'] }} read
        </p>

        <!-- Introduction -->
        <section class="text-lg">
            <h2 class="my-3">
                WordPress powers over 40% of the web, while Vue.js has become one of the most popular
                JavaScript frameworks. Combining WordPress's robust CMS capabilities with Vue's reactive
                frontend creates powerful, modern web applications.
            </h2>
            <h2 class="my-3">
                In this guide, we'll explore several practical approaches to integrate Vue with WordPress,
                from simple widgets to full headless architectures.
            </h2>
        </section>

        <!-- Why Integrate Vue with WordPress? -->
        <section class="text-lg">
            <div>
                <h2 class="my-3 font-bold">Why Integrate Vue with WordPress?</h2>
                <ol class="my-3">
                    <li>
                        ● <strong>Enhanced User Experience</strong>: Vue's reactivity creates smoother, more
                        app-like interfaces
                    </li>
                    <li>
                        ● <strong>Progressive Enhancement</strong>: Add Vue components to specific parts of your
                        site
                    </li>
                    <li>
                        ● <strong>Headless Possibilities</strong>: Use WordPress purely as a content backend
                    </li>
                    <li>
                        ● <strong>Developer Experience</strong>: Modern frontend development with a familiar CMS
                    </li>
                </ol>
            </div>
        </section>

        <!-- Method 1: Vue as a WordPress Plugin -->
        <section class="text-lg">
            <div>
                <h2 class="my-3 font-bold">Method 1: Vue as a WordPress Plugin (Simple Integration)</h2>
                <h2 class="my-3">
                    The simplest way to add Vue to WordPress is by enqueuing Vue directly in a plugin or
                    theme.
                </h2>

                <div class="my-3">
                    <button @click="copyMethod1Plugin" class="relative ml-auto block">
                        <span v-if="!copiedMethod1Plugin" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  // In your WordPress plugin or theme's functions.php
  function add_vue_to_wordpress() {
    // Enqueue Vue from CDN
    wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.min.js', array(), '3.2.47', true);
    
    // Enqueue your custom Vue app
    wp_enqueue_script('my-vue-app', plugin_dir_url(__FILE__) . 'js/my-vue-app.js', array('vue'), '1.0.0', true);
    
    // Localize data for Vue (optional)
    wp_localize_script('my-vue-app', 'wpData', array(
      'api_url' => rest_url('wp/v2/posts'),
      'nonce' => wp_create_nonce('wp_rest')
    ));
  }
  add_action('wp_enqueue_scripts', 'add_vue_to_wordpress');</pre>
                </div>

                <h2 class="my-3">Then create a simple Vue app in <code>my-vue-app.js</code>:</h2>

                <div class="my-3">
                    <button @click="copyMethod1JS" class="relative ml-auto block">
                        <span v-if="!copiedMethod1JS" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  // my-vue-app.js
  document.addEventListener('DOMContentLoaded', function() {
    const app = Vue.createApp({
      data() {
        return {
          posts: [],
          loading: true
        }
      },
      mounted() {
        fetch(wpData.api_url)
          .then(response => response.json())
          .then(data => {
            this.posts = data;
            this.loading = false;
          });
      }
    });
    
    // Mount to a specific div
    app.mount('#vue-app-container');
  });</pre>
                </div>

                <h2 class="my-3">Finally, add a container in your WordPress template:</h2>

                <div class="my-3">
                    <button @click="copyMethod1HTML" class="relative ml-auto block">
                        <span v-if="!copiedMethod1HTML" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  &lt;!-- In your WordPress template file --&gt;
  &lt;div id="vue-app-container"&gt;
    &lt;div v-if="loading"&gt;Loading...&lt;/div&gt;
    &lt;ul v-else&gt;
      &lt;li v-for="post in posts" :key="post.id"&gt;
        <!-- &lt;h3&gt;{{ post.title.rendered }}&lt;/h3&gt;
        &lt;div v-html="post.excerpt.rendered"&gt;&lt;/div&gt; -->
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;</pre>
                </div>
            </div>
        </section>

        <!-- Method 2: WordPress REST API with Vue SPA -->
        <section class="text-lg">
            <div>
                <h2 class="my-3 font-bold">
                    Method 2: WordPress REST API with Vue SPA (Advanced Integration)
                </h2>
                <h2 class="my-3">
                    For a more sophisticated approach, use WordPress as a headless CMS with a separate Vue
                    single-page application.
                </h2>

                <h3 class="my-2 font-bold">Step 1: Set Up WordPress REST API</h3>
                <p class="my-2">WordPress comes with REST API built-in. You can access posts at:</p>
                <code class="bg-gray-200 p-1 rounded">https://your-site.com/wp-json/wp/v2/posts</code>

                <h3 class="my-2 font-bold mt-4">Step 2: Create Vue App with Vue CLI</h3>
                <div class="my-3">
                    <button @click="copyMethod2Setup" class="relative ml-auto block">
                        <span v-if="!copiedMethod2Setup" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  # Create new Vue project
  vue create wordpress-vue-app
  
  # Install axios for HTTP requests
  npm install axios
  
  # Install vue-router for SPA navigation
  npm install vue-router</pre>
                </div>

                <h3 class="my-2 font-bold mt-4">Step 3: Configure Vue Router</h3>
                <div class="my-3">
                    <button @click="copyMethod2Router" class="relative ml-auto block">
                        <span v-if="!copiedMethod2Router" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  // src/router/index.js
  import { createRouter, createWebHistory } from 'vue-router'
  import BlogPosts from '../views/BlogPosts.vue'
  import SinglePost from '../views/SinglePost.vue'
  
  const routes = [
    { path: '/', component: BlogPosts },
    { path: '/post/:id', component: SinglePost }
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router</pre>
                </div>

                <h3 class="my-2 font-bold mt-4">Step 4: Create Vue Components</h3>
                <p class="my-2">Blog Posts Component:</p>
                <div class="my-3">
                    <button @click="copyMethod2Posts" class="relative ml-auto block">
                        <span v-if="!copiedMethod2Posts" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  <!-- &lt;template&gt;
    &lt;div&gt;
      &lt;h1&gt;Blog Posts&lt;/h1&gt;
      &lt;div v-if="loading"&gt;Loading...&lt;/div&gt;
      &lt;ul v-else&gt;
        &lt;li v-for="post in posts" :key="post.id"&gt;
          &lt;router-link :to="'/post/' + post.id"&gt;
            {{ post.title.rendered }}
          &lt;/router-link&gt;
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;\/template&gt; -->
  
  &lt;script&gt;
  import axios from 'axios'
  
  export default {
    data() {
      return {
        posts: [],
        loading: true
      }
    },
    async created() {
      try {
        const response = await axios.get('https://your-site.com/wp-json/wp/v2/posts')
        this.posts = response.data
        this.loading = false
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
  }
  &lt;/script&gt;</pre>
                </div>

                <p class="my-2 mt-4">Single Post Component:</p>
                <div class="my-3">
                    <button @click="copyMethod2Single" class="relative ml-auto block">
                        <span v-if="!copiedMethod2Single" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  <!-- &lt;template&gt;
    &lt;div v-if="post"&gt;
      &lt;h1&gt;{{ post.title.rendered }}&lt;/h1&gt;
      &lt;div v-html="post.content.rendered"&gt;&lt;/div&gt;
      &lt;router-link to="/"&gt;Back to Posts&lt;/router-link&gt;
    &lt;/div&gt;
    &lt;div v-else&gt;
      Loading...
    &lt;/div&gt;
  &lt;\/template&gt; -->
  
  &lt;script&gt;
  import axios from 'axios'
  
  export default {
    data() {
      return {
        post: null
      }
    },
    async created() {
      try {
        const response = await axios.get(
          `https://your-site.com/wp-json/wp/v2/posts/${this.$route.params.id}`
        )
        this.post = response.data
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }
  }
  &lt;/script&gt;</pre>
                </div>
            </div>
        </section>

        <!-- Method 3: Vue + WordPress with WPGraphQL -->
        <section class="text-lg">
            <div>
                <h2 class="my-3 font-bold">Method 3: Vue with WPGraphQL (Modern Approach)</h2>
                <h2 class="my-3">
                    For more complex data requirements, WPGraphQL provides a GraphQL API for WordPress,
                    offering more efficient data fetching.
                </h2>

                <h3 class="my-2 font-bold">Step 1: Install WPGraphQL Plugin</h3>
                <p class="my-2">
                    Install and activate the
                    <a href="https://www.wpgraphql.com/" class="text-blue-600">WPGraphQL</a> plugin in
                    WordPress.
                </p>

                <h3 class="my-2 font-bold mt-4">Step 2: Set Up Vue Apollo Client</h3>
                <div class="my-3">
                    <button @click="copyMethod3Setup" class="relative ml-auto block">
                        <span v-if="!copiedMethod3Setup" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  # Install required packages
  npm install @vue/apollo-composable graphql @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-vue-apollo</pre>
                </div>

                <h3 class="my-2 font-bold mt-4">Step 3: Configure Apollo Client</h3>
                <div class="my-3">
                    <button @click="copyMethod3Apollo" class="relative ml-auto block">
                        <span v-if="!copiedMethod3Apollo" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  // src/main.js
  import { createApp } from 'vue'
  import { ApolloClient, InMemoryCache } from '@apollo/client/core'
  import { DefaultApolloClient } from '@vue/apollo-composable'
  import App from './App.vue'
  
  const apolloClient = new ApolloClient({
    uri: 'https://your-site.com/graphql',
    cache: new InMemoryCache()
  })
  
  const app = createApp(App)
  app.provide(DefaultApolloClient, apolloClient)
  app.mount('#app')</pre>
                </div>

                <h3 class="my-2 font-bold mt-4">Step 4: Create GraphQL Queries</h3>
                <div class="my-3">
                    <button @click="copyMethod3Query" class="relative ml-auto block">
                        <span v-if="!copiedMethod3Query" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  // src/graphql/queries.js
  import { gql } from '@apollo/client/core'
  
  export const GET_POSTS = gql`
    query GetPosts {
      posts {
        nodes {
          id
          title
          excerpt
          date
          slug
        }
      }
    }
  `
  
  export const GET_POST = gql`
    query GetPost($id: ID!) {
      post(id: $id) {
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `</pre>
                </div>

                <h3 class="my-2 font-bold mt-4">Step 5: Use in Vue Components</h3>
                <div class="my-3">
                    <button @click="copyMethod3Component" class="relative ml-auto block">
                        <span v-if="!copiedMethod3Component"
                            class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  <!-- &lt;template&gt;
    &lt;div&gt;
      &lt;h1&gt;Blog Posts (GraphQL)&lt;/h1&gt;
      &lt;div v-if="loading"&gt;Loading...&lt;/div&gt;
      &lt;ul v-else&gt;
        &lt;li v-for="post in posts" :key="post.id"&gt;
          &lt;h3&gt;{{ post.title }}&lt;/h3&gt;
          &lt;div v-html="post.excerpt"&gt;&lt;/div&gt;
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;\/template&gt; -->
  
  &lt;script&gt;
  import { useQuery } from '@vue/apollo-composable'
  import { GET_POSTS } from '../graphql/queries'
  
  export default {
    setup() {
      const { result, loading, error } = useQuery(GET_POSTS)
      
      return {
        posts: result?.posts?.nodes || [],
        loading,
        error
      }
    }
  }
  &lt;/script&gt;</pre>
                </div>
            </div>
        </section>

        <!-- Deployment Options -->
        <section class="text-lg">
            <div>
                <h2 class="my-3 font-bold">Deployment Options</h2>
                <h3 class="my-2 font-bold">Option 1: Same Domain (Proxy Approach)</h3>
                <p class="my-2">
                    Configure your server to proxy API requests to WordPress while serving the Vue app from
                    the root.
                </p>

                <h3 class="my-2 font-bold mt-4">Option 2: Separate Domains (CORS Required)</h3>
                <p class="my-2">
                    Deploy Vue app on a different domain/subdomain and configure CORS in WordPress:
                </p>
                <div class="my-3">
                    <button @click="copyDeployCORS" class="relative ml-auto block">
                        <span v-if="!copiedDeployCORS" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  // In WordPress theme's functions.php
  function add_cors_http_header() {
      header("Access-Control-Allow-Origin: https://your-vue-app.com");
  }
  add_action('init', 'add_cors_http_header');</pre>
                </div>

                <h3 class="my-2 font-bold mt-4">Option 3: Static Site Generation</h3>
                <p class="my-2">Use Nuxt.js (Vue framework) with static site generation for better SEO:</p>
                <div class="my-3">
                    <button @click="copyDeployNuxt" class="relative ml-auto block">
                        <span v-if="!copiedDeployNuxt" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy
                            Code</span>
                        <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                    </button>
                </div>
                <div class="bg-gray-100 overflow-auto">
                    <pre class="px-5 text-indigo-600">
  // nuxt.config.js
  export default {
    target: 'static',
    generate: {
      async routes() {
        const { data } = await axios.get('https://your-site.com/wp-json/wp/v2/posts')
        return data.map(post => `/blog/${post.slug}`)
      }
    }
  }</pre>
                </div>
            </div>
        </section>

        <!-- Best Practices -->
        <section class="text-lg">
            <div>
                <h2 class="my-3 font-bold">Best Practices</h2>
                <ol class="my-3">
                    <li>
                        ● <strong>Caching</strong>: Implement caching for API responses to reduce server load
                    </li>
                    <li>● <strong>Authentication</strong>: Use JWT for protected WordPress endpoints</li>
                    <li>● <strong>Error Handling</strong>: Gracefully handle WordPress API failures</li>
                    <li>● <strong>Performance</strong>: Optimize images and lazy-load content</li>
                    <li>● <strong>SEO</strong>: Consider SSR with Nuxt.js for better search visibility</li>
                </ol>
            </div>
        </section>

        <!-- Conclusion -->
        <section class="text-lg">
            <div>
                <h2 class="my-3 font-bold">Conclusion</h2>
                <h2 class="my-3">
                    Integrating Vue with WordPress offers the best of both worlds: WordPress's powerful
                    content management with Vue's modern, reactive frontend capabilities. Whether you're
                    adding small interactive components or building a complete headless CMS solution, these
                    methods provide flexible options for every use case.
                </h2>
                <h2 class="my-3">
                    For simple projects, the plugin approach works well. For more complex applications,
                    consider the REST API or GraphQL methods. As your needs grow, you can progressively
                    enhance your integration while maintaining WordPress as your content backbone.
                </h2>
            </div>
        </section>
    </div>
    <Footer />
</template>

<script setup>
import NavBar from '@/views/home/Navigation.vue'
import Footer from '@/views/home/Footer.vue'
import { Head } from '@unhead/vue/components'
import { BLOGS_INFO } from '@/stores/blogsStore'
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

const { copy } = useClipboard()

// Copy functionality for all code blocks
const copiedStates = {
    method1Plugin: ref(false),
    method1JS: ref(false),
    method1HTML: ref(false),
    method2Setup: ref(false),
    method2Router: ref(false),
    method2Posts: ref(false),
    method2Single: ref(false),
    method3Setup: ref(false),
    method3Apollo: ref(false),
    method3Query: ref(false),
    method3Component: ref(false),
    deployCORS: ref(false),
    deployNuxt: ref(false)
}

const copyHandler = (text, state) => {
    copy(text)
    state.value = true
    setTimeout(() => (state.value = false), 1500)
}

// Method 1
const method1Plugin = `// In your WordPress plugin or theme's functions.php
  function add_vue_to_wordpress() {
    wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.min.js', array(), '3.2.47', true);
    wp_enqueue_script('my-vue-app', plugin_dir_url(__FILE__) . 'js/my-vue-app.js', array('vue'), '1.0.0', true);
    wp_localize_script('my-vue-app', 'wpData', array(
      'api_url' => rest_url('wp/v2/posts'),
      'nonce' => wp_create_nonce('wp_rest')
    ));
  }
  add_action('wp_enqueue_scripts', 'add_vue_to_wordpress');`

const method1JS = `document.addEventListener('DOMContentLoaded', function() {
    const app = Vue.createApp({
      data() {
        return {
          posts: [],
          loading: true
        }
      },
      mounted() {
        fetch(wpData.api_url)
          .then(response => response.json())
          .then(data => {
            this.posts = data;
            this.loading = false;
          });
      }
    });
    app.mount('#vue-app-container');
  });`

const method1HTML = `<div id="vue-app-container">
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title.rendered }}</h3>
        <div v-html="post.excerpt.rendered"></div>
      </li>
    </ul>
  </div>`

// Method 2
const method2Setup = `# Create new Vue project
  vue create wordpress-vue-app
  npm install axios vue-router`

const method2Router = `// src/router/index.js
  import { createRouter, createWebHistory } from 'vue-router'
  import BlogPosts from '../views/BlogPosts.vue'
  import SinglePost from '../views/SinglePost.vue'

  const routes = [
    { path: '/', component: BlogPosts },
    { path: '/post/:id', component: SinglePost }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  export default router`

const method2Posts = `<template>
    <div>
      <h1>Blog Posts</h1>
      <div v-if="loading">Loading...</div>
      <ul v-else>
        <li v-for="post in posts" :key="post.id">
          <router-link :to="'/post/' + post.id">
            {{ post.title.rendered }}
          </router-link>
        </li>
      </ul>
    </div>
  </template>

  <script>
  import axios from 'axios'

  export default {
    data() {
      return {
        posts: [],
        loading: true
      }
    },
    async created() {
      try {
        const response = await axios.get('https://your-site.com/wp-json/wp/v2/posts')
        this.posts = response.data
        this.loading = false
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
  }
  <\/script>`

const method2Single = `<template>
    <div v-if="post">
      <h1>{{ post.title.rendered }}</h1>
      <div v-html="post.content.rendered"></div>
      <router-link to="/">Back to Posts</router-link>
    </div>
    <div v-else>
      Loading...
    </div>
  </template>

  <script>
  import axios from 'axios'

  export default {
    data() {
      return {
        post: null
      }
    },
    async created() {
      try {
        const response = await axios.get(
          "https://your-site.com/wp-json/wp/v2/posts/\${this.$route.params.id}"
        )
this.post = response.data
      } catch (error) {
    console.error('Error fetching post:', error)
}
    }
  }
  <\/script>`

// Method 3
const method3Setup = `npm install @vue/apollo-composable graphql @graphql-codegen/cli
  @graphql-codegen/typescript @graphql-codegen/typescript-operations
  @graphql-codegen/typescript-vue-apollo`

const method3Apollo = `// src/main.js
  import { createApp } from 'vue'
  import { ApolloClient, InMemoryCache } from '@apollo/client/core'
  import { DefaultApolloClient } from '@vue/apollo-composable'
  import App from './App.vue'

  const apolloClient = new ApolloClient({
    uri: 'https://your-site.com/graphql',
    cache: new InMemoryCache()
  })

  const app = createApp(App)
  app.provide(DefaultApolloClient, apolloClient)
  app.mount('#app')`

const method3Query = `// src/graphql/queries.js
  import { gql } from '@apollo/client/core'

  export const GET_POSTS = gql\`
    query GetPosts {
      posts {
        nodes {
          id
          title
          excerpt
          date
          slug
        }
      }
    }
  \`

  export const GET_POST = gql\`
    query GetPost($id: ID!) {
      post(id: $id) {
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  \``

const method3Component = `<template>
    <div>
      <h1>Blog Posts (GraphQL)</h1>
      <div v-if="loading">Loading...</div>
      <ul v-else>
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <div v-html="post.excerpt"></div>
        </li>
      </ul>
    </div>
  </template>

  <script>
  import { useQuery } from '@vue/apollo-composable'
  import { GET_POSTS } from '../graphql/queries'

  export default {
    setup() {
      const { result, loading, error } = useQuery(GET_POSTS)

      return {
        posts: result?.posts?.nodes || [],
        loading,
        error
      }
    }
  }
  <\/script>`

// Deployment
const deployCORS = `// In WordPress theme's functions.php
  function add_cors_http_header() {
      header("Access-Control-Allow-Origin: https://your-vue-app.com");
  }
  add_action('init', 'add_cors_http_header');`

      const deployNuxt = `// nuxt.config.js
      export default {
        target: 'static',
        generate: {
          async routes() {
            const { data } = await axios.get('https://your-site.com/wp-json/wp/v2/posts')
            return data.map(post => "/blog/\${post.slug}")
          }
        }
      }
    `

  // Copy functions
  const copyMethod1Plugin = () => copyHandler(method1Plugin, copiedStates.method1Plugin)
  const copyMethod1JS = () => copyHandler(method1JS, copiedStates.method1JS)
  const copyMethod1HTML = () => copyHandler(method1HTML, copiedStates.method1HTML)
  const copyMethod2Setup = () => copyHandler(method2Setup, copiedStates.method2Setup)
  const copyMethod2Router = () => copyHandler(method2Router, copiedStates.method2Router)
  const copyMethod2Posts = () => copyHandler(method2Posts, copiedStates.method2Posts)
  const copyMethod2Single = () => copyHandler(method2Single, copiedStates.method2Single)
  const copyMethod3Setup = () => copyHandler(method3Setup, copiedStates.method3Setup)
  const copyMethod3Apollo = () => copyHandler(method3Apollo, copiedStates.method3Apollo)
  const copyMethod3Query = () => copyHandler(method3Query, copiedStates.method3Query)
  const copyMethod3Component = () => copyHandler(method3Component, copiedStates.method3Component)
  const copyDeployCORS = () => copyHandler(deployCORS, copiedStates.deployCORS)
  const copyDeployNuxt = () => copyHandler(deployNuxt, copiedStates.deployNuxt)
</script>

<style scoped>
.copy-code-btn {
    background-color: #4f46e5;
    transition: background-color 0.3s;
}

.copy-code-btn:hover {
    background-color: #4338ca;
}

.strong-text {
    color: #4f46e5;
    font-weight: bold;
}
</style>
