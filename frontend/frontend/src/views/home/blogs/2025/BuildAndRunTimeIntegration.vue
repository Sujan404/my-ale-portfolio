<template>

  <Head>
    <title>Build Time and Run Time Integration</title>
    <meta name="og:description" content="Vue catch all /404 Not Found Route" />
    <meta name="og:keywords"
      content="Software Engineer, Docker, HTML, CSS, Python, Vue, JavaScript, Build time, Runtime, Integration" />
  </Head>

  <!-- NavBar -->
  <div class="mb-3">
    <NavBar />
  </div>

  <!-- Body Part -->
  <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
    <h1 class="text-3xl">{{ BLOGS_INFO['buildAndRunTimeIntegration']['title'] }}</h1>
    <p id="read-text">
      {{ BLOGS_INFO['buildAndRunTimeIntegration']['date'] }} |
      {{ BLOGS_INFO['buildAndRunTimeIntegration']['readTime'] }} read
    </p>

    <!-- Introduction -->
    <section class="text-lg">
      <h2 class="my-3">
        When developing a web application, we often integrate third-party APIs, databases, and other
        services. These integrations can happen at two different stages:
      </h2>
      <ol class="my-3">
        <li>● Build-Time Integration (happens before the app is deployed)</li>
        <li>● Run-Time Integration (happens while the app is running)</li>
      </ol>
      <h2 class="my-3">
        Both have their own advantages and are used in different scenarios. Let’s break them down
        with simple explanations and technical examples.
      </h2>
    </section>

    <!-- Build-Time Integration -->
    <section class="text-lg">
      <div>
        <h2 class="my-3 font-bold">What is Build-Time Integration?</h2>
        <h2 class="my-3">
          Build-time integration happens before the application is deployed. It is mainly about
          compiling, bundling, or processing data during the build phase. Once the app is built, the
          integration is set and does not change until a new build is deployed.
        </h2>
      </div>
    </section>

    <!-- Example of Build Time Integration -->
    <section class="text-lg">
      <div>
        <h2 class="my-3 font-bold">
          Example: Fetching Static Content from an API at Build Time in Vue.js
        </h2>
        <h2 class="my-3">
          Consider a blog that fetches posts from an external API. Using a Vue.js build process, we
          can fetch the data before deployment and store it as static JSON:
        </h2>
        <h2 class="my-3">
          I have used <strong class="strong-text">Vue</strong> and
          <strong class="strong-text">Vite</strong> as a bundler.
        </h2>
      </div>
    </section>

    <!-- Technical Details for Build Time Integration -->
    <section class="text-lg">
      <div>
        <h2 class="my-2 font-bold">Technical Details</h2>
        <div class="flex flex-wrap justify-center my-5">
          <img :src="fileStructure" class="text-center" />
        </div>
        <h2 class="my-2">Before directly jumping to code part, the above file structure diagram shows a clear
          understanding of
          how the files are organized. This will clarify the paths that are later been mentioned as you keep further
          read.
        </h2>

        <div class="flex flex-wrap justify-center my-5">
          <img :src="FetchPostsSample" class="text-center" />
        </div>
        <h2 class="my-2">
          I have created <span class="strong-text">fetchPosts.js</span> in
          <span class="strong-text">src</span> directory.
        </h2>

        <!-- source one -->
        <div class="my-3">
          <button @click="copyOne" class="relative ml-auto block">
            <!-- by default, `copied` will be reset in 1.5s -->
            <span v-if="!copiedOne" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
            <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
          </button>
        </div>
        <div class="bg-gray-100 overflow-auto">
          <pre class="px-5 text-indigo-600">
                    {{ sourceOne }}
                </pre>
        </div>
        <h2 class="my-2">These process requires
          packages likes:
        </h2>
        <ul class="my-2">
          <li class="my-2">● fs: <a href="https://www.geeksforgeeks.org/node-js-file-system">Node.js File System</a>
          </li>
          <li class="my-2">● Axios: <a
              href="https://medium.com/@reggiecheston/a-beginners-guide-to-using-axios-in-node-js-simplifying-http-requests-441291fef064">Axios</a>
          </li>
          <li class="my-2">● path: <a href="https://nodejs.org/api/path.html">Path</a></li>
          <li class="my-2">● url: <a href="https://nodejs.org/api/url.html">Url</a></li>
        </ul>
        <!-- source Two -->
        <div class="my-3">
          <button @click="copyTwo" class="relative ml-auto block">
            <!-- by default, `copied` will be reset in 1.5s -->
            <span v-if="!copiedTwo" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
            <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
          </button>
        </div>
        <div class="bg-gray-100 overflow-auto">
          <pre class="px-5 text-indigo-600">
                    {{ sourceTwo }}
                </pre>
        </div>

        <h2 class="my-2">Add above code in scripts block in <span class="strong-text">Package.json</span>. Ignore the
          dev part, just add the build script.</h2>

        <h2 class="my-2">Bear in mind, the above build script has been customized. In my case, I have amended that line
          on existing build scripts but I have not
          shown the default build script. To get better understanding of npm scripts, please <a
            href="https://dev.to/paulasantamaria/mastering-npm-scripts-2chd">Click here</a>
        </h2>
        <h2 class="my-2">Add the custom line in build scripts to run function of <span
            class="strong-text">fetchPosts.js</span> </h2>


        <!-- source Three -->
        <div class="my-3">
          <button @click="copyThree" class="relative ml-auto block">
            <!-- by default, `copied` will be reset in 1.5s -->
            <span v-if="!copiedThree" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
            <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
          </button>
        </div>
        <div class="bg-gray-100 overflow-auto">
          <pre class="px-5 text-indigo-600">
                    {{ sourceThree }}
                </pre>
        </div>

        <h2 class="my-2">Run the above line of code in terminal to receive data in desginated directory where it is
          mentioned in the above <span class="strong-text">fetchPosts.js</span></h2>
        <h2 class="my-2">I have wrote lines of code to fetch data from <a
            href="https://jsonplaceholder.typicode.com/guide/">Jsonplaceholder</a>
          and stored to a variable and then store in <span class="strong-text">posts.json</span> in public folder. </h2>
        <div class="flex flex-wrap justify-center my-5">
          <img :src="PublicPostsJson" class="text-center" />
        </div>
        <div class="flex flex-wrap justify-center my-5">
          <img :src="PostsJsonData" class="text-center" />
        </div>
        <h2 class="my-2">The above data are retrieved from api during the building process. The building process is done
          by running <span class="italic">npm run build</span> script.</h2>
      </div>
    </section>
  </div>
  <Footer />
</template>
<script setup>
import NavBar from '@/views/home/Navigation.vue'
import Footer from '@/views/home/Footer.vue'
import fileStructure from '@/assets/images/2025/buildAndRunTimeIntegration/file_structure_for_build_and_runtime_integration_blog.png'
import FetchPostsSample from '@/assets/images/2025/buildAndRunTimeIntegration/fetchPostsSample.png'
import PublicPostsJson from '@/assets/images/2025/buildAndRunTimeIntegration/publicPostsJson.png'
import PostsJsonData from '@/assets/images/2025/buildAndRunTimeIntegration/postsJsonData.png'
import { Head } from '@unhead/vue/components'
import { BLOGS_INFO } from '@/stores/blogsStore'
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
const { text, copy, isSupported } = useClipboard()

const sourceOne = ref(`
import fs from 'fs'
import axios from 'axios'
import { join } from 'path';
import { fileURLToPath } from 'url';

async function fetchData() {
  try {
    console.log('Fetching posts from API...');
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

    // Receive actual directory path
    const dirname = fileURLToPath(new URL('.', import.meta.url));

    // Define the path where JSON will be saved
    const filePath = join(dirname, '../../public/blog/posts.json');

    // Convert response data to JSON and write it to public folder
    fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));

    console.log('Posts fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Execute the function
fetchData();
`)

const sourceTwo = ref(`
"scripts": {
    "dev": "vite",
    "build": "node src/blog/fetchPosts.js"
}
`)

const sourceThree = ref(`
npm run build
`)

const copiedOne = ref(false)
const copiedTwo = ref(false)
const copiedThree = ref(false)

const copyOne = () => {
  copy(sourceOne.value)
  copiedOne.value = true
  setTimeout(() => (copiedOne.value = false), 1500) // Reset after 1.5 seconds
}

const copyTwo = () => {
  copy(sourceTwo.value)
  copiedTwo.value = true
  setTimeout(() => (copiedTwo.value = false), 1500) // Reset after 1.5 seconds
}

const copyThree = () => {
  copy(sourceThree.value)
  copiedThree.value = true
  setTimeout(() => (copiedThree.value = false), 1500) // Reset after 1.5 seconds
}
</script>
