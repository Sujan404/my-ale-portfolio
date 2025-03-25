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
        <div class="flex flex-wrap justify-center my-5">
          <img :src="PublicPostsJson" class="text-center" />
        </div>
        <h2 class="my-2">I have wrote lines of code to fetch data from <a
            href="https://jsonplaceholder.typicode.com/guide/">Jsonplaceholder</a>
          and stored to a variable and then store in <span class="strong-text">posts.json</span> in public folder. </h2>

        <!-- source Four -->
        <div class="my-3">
          <button @click="copyFour" class="relative ml-auto block">
            <!-- by default, `copied` will be reset in 1.5s -->
            <span v-if="!copiedFour" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
            <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
          </button>
        </div>
        <div class="bg-gray-100 overflow-auto">
          <pre class="px-5 text-indigo-600">
                    {{ sourceFour }}
                </pre>
        </div>

        <h2 class="my-2">Create a vue file and paste above code. It fetches data from <span
            class="strong-text">posts.json</span> then data can be manipulated to display or process any action.</h2>

        <div class="flex flex-wrap justify-center my-5">
          <img :src="PostsJsonData" class="text-center" />
        </div>
        <h2 class="my-2">The above data are retrieved from api during the building process. The building process is done
          by running <span class="italic">npm run build</span> script.</h2>
      </div>
    </section>

    <!-- Run-time Integration -->
    <section class="text-lg">
      <div>
        <h2 class="my-3 font-bold">What is Run-Time Integration?</h2>
        <h2 class="my-3">
          Run-time integration happens while the application is running. The app dynamically fetches data or interacts
          with external services as users interact with it.
        </h2>
      </div>
    </section>

    <!-- Example of Run Time Integration -->
    <section class="text-lg">
      <div>
        <h2 class="font-bold">
          Example: Fetching Data on User Request in Vue.js
        </h2>
        <h2 class="my-2">
          Using Vue with the Composition API, if we want to fetch posts dynamically when a user visits the page, we can
          do:
        </h2>
        <h2 class="my-3">
          I have used <strong class="strong-text">Vue</strong> and
          <strong class="strong-text">Vite</strong> as a bundler.
        </h2>
      </div>
    </section>

    <!-- Technical Details for Run Time Integration -->
    <section class="text-lg">
      <div>
        <h2 class="my-2 font-bold">Technical Details</h2>
        <h2 class="my-2">There will be slight differences while setuping for run-time integration compared to
          build-time integration. As you can read above where, I have customized build scripts in <span
            class="strong-text">package.json</span>, created <span class="strong-text">fetchPosts.js</span>
          to fetch and store
          in public directory, and run <span class="strong-text italic">npm run build</span>
          . But for run-time integration, it is different. Let’s get into to see how it is done.
        </h2>

        <!-- source Five -->
        <div class="my-3">
          <button @click="copyFive" class="relative ml-auto block">
            <!-- by default, `copied` will be reset in 1.5s -->
            <span v-if="!copiedFive" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
            <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
          </button>
        </div>
        <div class="bg-gray-100 overflow-auto">
          <pre class="px-5 text-indigo-600">
                    {{ sourceFive }}
                </pre>
        </div>

        <h2 class="my-2">Looking over build-time integration, all the data were collected and ready to use before an
          application is
          ready to run while in run-time integration, the data are collected on the fly after an application is ready to
          run.
          In simple words for above example, the data are collected only when user action hits to the url that is linked
          to the above page.</h2>
      </div>
    </section>

    <!--  key difference between run-time and build-time integration -->
    <section class="text-lg">
      <h2 class="font-bold">Comparision</h2>
      <div class="flex justify-center">
        <table class="table-auto">
          <thead>
            <tr>
              <th class="p-3"></th>
              <th class="p-3">Build Time Integration</th>
              <th class="p-3">Run Time Integration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-3">Data</td>
              <td class="p-3">Data is fetched once at build time</td>
              <td class="p-3">Data is fetched on each request</td>
            </tr>
            <tr>
              <td class="p-3">Performance</td>
              <td class="p-3">Faster, as it serves pre-built content</td>
              <td class="p-3">Slower, as it makes API calls in real time</td>
            </tr>
            <tr>
              <td class="p-3">Use cases</td>
              <td class="p-3">Blogs, marketing pages, documentation</td>
              <td class="p-3">Dashboards, user-specific content, live updates</td>
            </tr>
          </tbody>
        </table>
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

const sourceFour = ref(`
<template>
    <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
    <h1 class="text-3xl my-3"> Example of Build Time Integration</h1>
    <ul>
    <li class="my-2" v-for="post in posts" :key="post.id">
        <p>● ID: {{ post.id }}</p>
        <p>● title: {{ post.title }}</p>
        <p>● body: {{ post.body }}</p>
    </li>
  </ul>
</div>
</template>
<script setup>
import { ref } from 'vue';
import posts from '../../../../public/blog/posts.json' 
<\/script>`)  // \ (forward slash is used for skipping reserved symbols)

const sourceFive = ref(`
<template>
  <ul>
    <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const posts = ref([]);

onMounted(async () => {
  const res = await fetch('https://api.example.com/posts');
  posts.value = await res.json();
});
<\/script>
`)    // \ (forward slash is used for skipping reserved symbols)


const copiedOne = ref(false)
const copiedTwo = ref(false)
const copiedThree = ref(false)
const copiedFour = ref(false)
const copiedFive = ref(false)

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

const copyFour = () => {
  copy(sourceFour.value)
  copiedFour.value = true
  setTimeout(() => (copiedFour.value = false), 1500) // Reset after 1.5 seconds
}

const copyFive = () => {
  copy(sourceFive.value)
  copiedFive.value = true
  setTimeout(() => (copiedFive.value = false), 1500)  // Reset after 1.5 seconds
}

</script>
