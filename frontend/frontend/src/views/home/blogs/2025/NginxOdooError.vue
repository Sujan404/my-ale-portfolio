<template>
  <div>
    <Head>
      <title>Solving the Docker Nginx, Odoo, and Database Cascade Error</title>
      <meta
        name="og:description"
        content="A detailed, technical guide on debugging and resolving a complex series of Docker errors involving Nginx certificate failures, Odoo permission issues, and an uninitialized PostgreSQL database."
      />
      <meta
        name="og:keywords"
        content="Docker, Nginx, Odoo, SSL, Let's Encrypt, Permissions, PostgreSQL, troubleshooting, Docker Compose, portfolio"
      />
    </Head>
    <div class="mb-3">
      <NavBar />
    </div>
    <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
      <h1 class="text-3xl">Solving the Docker Nginx, Odoo, and Database Cascade Error</h1>
      <p id="read-text">September 4, 2025 | 8 min read</p>
      <div class="flex justify-between">
        <div class="relative mr-8 my-5 max-md:hidden">
          <nav class="sticky top-5 bg-gray-100 rounded-xl flex flex-col p-1">
            <div class="bg-blue-500 rounded-xl p-3 my-1">
              <h2 class="text-lg my-3 text-white">Table of Contents</h2>
            </div>
            <a
              class="p-3 hover:bg-gray-500 hover:rounded-xl cursor-pointer hover:text-white"
              href="#problem-statement"
              :class="activeNav === 'problem-statement' ? 'bg-gray-500 rounded-xl text-white' : ''"
            >
              <span class="text-md">Problem Statement</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer hover:text-white"
              href="#nginx-diagnosis"
              :class="activeNav === 'nginx-diagnosis' ? 'bg-gray-500 rounded-xl text-white' : ''"
            >
              <span class="text-md">Diagnosis: The Nginx Failure</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer hover:text-white"
              href="#odoo-diagnosis"
              :class="activeNav === 'odoo-diagnosis' ? 'bg-gray-500 rounded-xl text-white' : ''"
            >
              <span class="text-md">Diagnosis: The Odoo Permission Errors</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer hover:text-white"
              href="#database-diagnosis"
              :class="activeNav === 'database-diagnosis' ? 'bg-gray-500 rounded-xl text-white' : ''"
            >
              <span class="text-md">Diagnosis: The Database Errors</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer hover:text-white"
              href="#the-solution"
              :class="activeNav === 'the-solution' ? 'bg-gray-500 rounded-xl text-white' : ''"
            >
              <span class="text-md">The Solution: Step-by-Step Fixes</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer hover:text-white"
              href="#conclusion"
              :class="activeNav === 'conclusion' ? 'bg-gray-500 rounded-xl text-white' : ''"
            >
              <span class="text-md">Conclusion</span>
            </a>
          </nav>
        </div>
        <div class="md:ml-8">
          <div class="flex flex-wrap justify-center my-5">
            <img
              :src="imgUrl"
              class="text-center"
              alt="Diagram illustrating the dependencies and failure points of a Dockerized Nginx, Odoo, and Certbot setup."
            />
          </div>
          <div>
            <div id="problem-statement">
              <section>
                <h1 class="text-xl my-3 font-bold">Problem Statement</h1>
                <p class="text-lg my-3">
                  In a recent project to deploy a containerized Odoo application, I ran into a
                  series of errors that initially seemed disconnected but were in fact part of a
                  cascading failure. The setup involved three main services managed by Docker
                  Compose: Nginx (as a reverse proxy), Odoo (the application server), and Certbot
                  (to handle SSL with Let's Encrypt). A simple docker-compose up command revealed a
                  multi-layered problem, starting with Nginx and quickly showing deeper issues
                  within the Odoo container. The log output was my primary diagnostic tool.
                </p>
                <p class="text-lg my-3">Initial logs showed the following:</p>
                <div class="my-3 w-full overflow-auto">
                  <pre class="bg-gray-800 text-white p-4 rounded-md text-sm">
                    {{ logSource }}
</pre>
                </div>
                <p class="text-lg my-3">
                  This series of errors indicated three distinct problems: an Nginx configuration
                  issue, an Odoo filesystem permission error, and an Odoo database schema error.
                </p>
              </section>
            </div>

            <hr class="my-6" />

            <div id="nginx-diagnosis">
              <section>
                <h1 class="text-xl my-3 font-bold">Diagnosis: The Nginx Failure</h1>
                <p class="text-lg my-3">
                  The Nginx error was the first to appear and, fortunately, the most
                  straightforward.
                </p>
                <p class="text-lg my-3">
                  **Error Message:** `cannot load certificate
                  "/etc/letsencrypt/live/testing.softwaresharktech.com/fullchain.pem"`
                </p>
                <p class="text-lg my-3">
                  This error indicated that Nginx was looking for an SSL certificate file that
                  didn't exist in its filesystem. This specific path (`/etc/letsencrypt/live/...`)
                  is where Certbot, the service for obtaining free SSL certificates, stores its
                  certificates. The root cause was a dependency issue: Nginx attempted to start
                  **before** the Certbot container had successfully run and generated the
                  certificate files.
                </p>
                <p class="text-lg my-3">
                  **Initial Hypothesis:** The Nginx and Certbot containers were not properly
                  synchronized. The Nginx service, as defined in `docker-compose.yml`, was likely
                  starting and trying to access the certificate volume before Certbot had populated
                  it.
                </p>
              </section>
            </div>

            <hr class="my-6" />

            <div id="odoo-diagnosis">
              <section>
                <h1 class="text-xl my-3 font-bold">Diagnosis: The Odoo Permission Errors</h1>
                <p class="text-lg my-3">
                  Next, the Odoo container repeatedly failed with a permission error.
                </p>
                <p class="text-lg my-3">
                  **Error Message:** `PermissionError: [Errno 13] Permission denied:
                  '/var/lib/odoo/sessions'`
                </p>
                <p class="text-lg my-3">
                  This is a classic file system permission issue. Odoo's `entrypoint.sh` script,
                  which attempts to run Odoo as a non-root `odoo` user, couldn't write to the
                  `/var/lib/odoo/sessions` directory. A check of the directory's ownership from the
                  host system confirmed the problem: the `/var/lib/odoo` directory, likely mounted
                  via a Docker volume, was owned by `root:root` and not the `odoo` user.
                </p>
                <p class="text-lg my-3">
                  The `entrypoint.sh` script's logic to handle this was a common but flawed pattern:
                </p>
                <div class="my-3">
                  <button @click="copy(scriptSource)" class="relative top-0 ml-auto block">
                    <span v-if="!copied" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
                    <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                  </button>
                </div>
                <div class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm min-w-0">
                  <pre>{{ scriptSource }}</pre>
                </div>
                <p class="text-lg my-3">
                  While this logic is intended to fix the ownership, it's not foolproof. In some
                  Docker scenarios, the mounted volume might be created or re-created with host
                  permissions (owned by root) after the chown command in the entrypoint.sh script
                  runs, leading to a race condition. The correct approach is to set permissions at
                  the image build stage.
                </p>
              </section>
            </div>

            <hr class="my-6" />

            <div id="database-diagnosis">
              <section>
                <h1 class="text-xl my-3 font-bold">Diagnosis: The Database Errors</h1>
                <p class="text-lg my-3">
                  The final layer of errors came from the Odoo application itself, after it
                  seemingly overcame the permission issues for a moment.
                </p>
                <p class="text-lg my-3">
                  **Error Message:** `ERROR: relation "ir_module_module" does not exist`
                </p>
                <p class="text-lg my-3">
                  Odoo connects to a PostgreSQL database. When a new database is created, it's
                  empty. For Odoo to work, it requires a schema and core tables to be initialized.
                  The `ir_module_module` table is part of the core `base` module and is fundamental
                  for Odoo's operation. Its absence meant the database was connected but not yet
                  provisioned. The `ERROR` log confirmed this. The hint was also in the initial Odoo
                  log: "Database geo_tracker_db_18_new not initialized, you can force it with `-i
                  base`".
                </p>
                <p class="text-lg my-3">
                  **Initial Hypothesis:** The Odoo container's startup command was missing the
                  initial `-i base` flag, which is essential for creating the required database
                  tables on the first run.
                </p>
              </section>
            </div>

            <hr class="my-6" />

            <div id="the-solution">
              <section>
                <h1 class="text-xl my-3 font-bold">The Solution: Step-by-Step Fixes</h1>
                <p class="text-lg my-3">
                  With a clear diagnosis of each problem, the solution involved targeted changes to
                  my `docker-compose.yml` file and the `Dockerfile` for the Odoo service.
                </p>
                <h2 class="text-lg my-3 font-bold">1. Solving the Nginx SSL Error</h2>
                <p class="text-lg my-3">
                  To ensure Certbot runs before Nginx, I modified my `docker-compose.yml` to use
                  `depends_on`. While this doesn't guarantee the service is ready, it helps. The
                  more robust solution is to use a named volume that is shared between Certbot and
                  Nginx and to ensure the Certbot container is configured to run at a high priority,
                  or to have Nginx wait for the files to exist before starting. The simplest and
                  most reliable fix for a development environment is to manually run the `certbot`
                  container first, then start the rest of the stack.
                </p>
                <h2 class="text-lg my-3 font-bold">2. Solving the Odoo Permission Error</h2>
                <p class="text-lg my-3">
                  Instead of relying on the a fragile runtime script, I moved the permission fixing
                  logic directly into the Odoo `Dockerfile`. This ensures that when the Docker image
                  is built, the directories are created and assigned the correct ownership and
                  permissions, before the container even starts.
                </p>
                <div class="my-3">
                  <button @click="copy(dockerfileSource)" class="relative top-0 ml-auto block">
                    <span v-if="!copied" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
                    <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                  </button>
                </div>
                <div class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm min-w-0">
                  <pre>{{ dockerfileSource }}</pre>
                </div>
                <p class="text-lg my-3">
                  This change guarantees that the `/var/lib/odoo` directory and its contents are
                  owned by the odoo user, eliminating the `PermissionError` entirely.
                </p>
                <h2 class="text-lg my-3 font-bold">3. Solving the Database Initialization Error</h2>
                <p class="text-lg my-3">
                  The solution to the missing tables was to force the Odoo container to initialize
                  the database on its first startup. I modified the Odoo service in
                  `docker-compose.yml` by adding a command that includes the `-i base` flag.
                </p>
                <div class="my-3">
                  <button @click="copy(composeSource)" class="relative top-0 ml-auto block">
                    <span v-if="!copied" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
                    <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                  </button>
                </div>
                <div class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm min-w-0">
                  <pre>{{ composeSource }}</pre>
                </div>
                <p class="text-lg my-3">
                  After running `docker-compose up` once, the database was successfully initialized.
                  I then removed the `-i base` flag from the command to ensure Odoo wouldn't attempt
                  to re-initialize the database on subsequent restarts, which could cause data loss.
                </p>
              </section>
            </div>

            <hr class="my-6" />

            <div id="conclusion">
              <section>
                <h1 class="text-xl my-3 font-bold">Conclusion</h1>
                <p class="text-lg my-3">
                  This debugging process was a valuable lesson in the interdependencies of a
                  multi-container application. By systematically addressing each error—starting with
                  the most visible one and working my way down—I was able to uncover the underlying
                  issues. The solutions, which involved refining the Dockerfile and Docker Compose
                  configuration, not only fixed the immediate problem but also improved the
                  robustness and security of the entire setup. This experience underscores the
                  importance of a detailed log analysis and a solid understanding of container best
                  practices, especially regarding permissions and service dependencies.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useClipboard } from '@vueuse/core'
import NavBar from '@/views/home/Navigation.vue'
import Footer from '@/views/home/Footer.vue'
import { Head } from '@unhead/vue/components'
import { BLOGS_INFO } from '@/stores/blogsStore'

const logSource = ref(`2025/08/27 14:05:43 [emerg] 14#14: cannot load certificate "/etc/letsencrypt/live/testing.softwaresharktech.com/fullchain.pem": BIO_new_file() failed... 
PermissionError: [Errno 13] Permission denied: '/var/lib/odoo/sessions' 
ERROR: relation "ir_module_module" does not exist`)

const scriptSource = ref(`if [ "$(id -u)" = "0" ]; then 
chown -R odoo:odoo /var/lib/odoo /var/log/odoo /usr/src/app exec su -s /bin/bash odoo -c "python3 ..." 
fi`)

const dockerfileSource = ref(`

In Dockerfile-odoo18
USER root
RUN mkdir -p /var/lib/odoo/sessions && \\
mkdir -p /var/lib/odoo/filestore && \\
chown -R odoo:odoo /var/lib/odoo
USER odoo
`)

const composeSource = ref(`

In docker-compose.yml
services:
odoo:
# ...
command: >
odoo-bin -c /usr/src/app/odoo/odoo.conf --limit-time-cpu=60 --limit-time-real=120 --db-filter=^geo_tracker_db_18_new$ -i base
`)

const { text, copy, copied, isSupported } = useClipboard()

var activeNav = ref('')
const sections = [
  'problem-statement',
  'nginx-diagnosis',
  'odoo-diagnosis',
  'database-diagnosis',
  'the-solution',
  'conclusion'
]

onMounted(() => {
  window.addEventListener('scroll', handleNavBar)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleNavBar)
})

function handleNavBar() {
  for (var section of sections) {
    var element = document.getElementById(section)
    if (element) {
      if (window.scrollY + 100 >= element.offsetTop) {
        activeNav.value = section
      }
    }
  }
}
</script>