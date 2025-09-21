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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div class="mb-3">
      <NavBar />
    </div>

    <!-- Mobile Table of Contents Toggle -->
    <div class="md:hidden fixed top-20 right-4 z-50">
      <button
        @click="toggleMobileToc"
        class="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Mobile TOC Overlay -->
    <div
      v-if="showMobileToc"
      class="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
      @click="closeMobileToc"
    >
      <div
        class="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
        @click.stop
      >
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">Table of Contents</h2>
            <button @click="closeMobileToc" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <nav class="space-y-2">
            <a
              v-for="item in tocItems"
              :key="item.id"
              class="block p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              :class="activeNav === item.id ? 'bg-blue-100 text-blue-700' : ''"
              @click="scrollToSection(item.id)"
            >
              <span class="text-sm">{{ item.title }}</span>
            </a>
          </nav>
        </div>
      </div>
    </div>

    <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
      <div class="mb-6">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
          {{ BLOGS_INFO['odoo_error']['title'] }}
        </h1>
        <p class="text-sm sm:text-base text-gray-600 mb-4">
          {{ BLOGS_INFO['odoo_error']['date'] }}| {{ BLOGS_INFO['odoo_error']['readTime'] }}
        </p>
      </div>

      <div class="flex flex-col lg:flex-row justify-between gap-8">
        <!-- Desktop Table of Contents -->
        <div class="hidden lg:block lg:w-80 flex-shrink-0">
          <nav class="sticky top-5 bg-gray-50 rounded-xl p-4 shadow-sm">
            <div class="bg-blue-500 rounded-lg p-3 mb-4">
              <h2 class="text-lg font-semibold text-white">Table of Contents</h2>
            </div>
            <div class="space-y-2">
              <a
                v-for="item in tocItems"
                :key="item.id"
                class="block p-3 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors text-sm"
                :class="activeNav === item.id ? 'bg-gray-300 text-gray-900' : ''"
                @click="scrollToSection(item.id)"
              >
                {{ item.title }}
              </a>
            </div>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 min-w-0">
          <!-- Content Sections -->
          <div class="prose prose-lg max-w-none">
            <section id="problem-statement" class="mb-12">
              <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Problem Statement</h2>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                In a recent project to deploy a containerized Odoo application, I ran into a series
                of errors that initially seemed disconnected but were in fact part of a cascading
                failure. The setup involved three main services managed by Docker Compose: Nginx (as
                a reverse proxy), Odoo (the application server), and Certbot (to handle SSL with
                Let's Encrypt). A simple docker-compose up command revealed a multi-layered problem,
                starting with Nginx and quickly showing deeper issues within the Odoo container. The
                log output was my primary diagnostic tool.
              </p>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                Initial logs showed the following:
              </p>
              <div class="my-6">
                <div class="relative">
                  <button
                    @click="copy(logSource)"
                    class="absolute top-2 right-2 z-10 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs transition-colors"
                  >
                    {{ copied ? 'Copied!' : 'Copy' }}
                  </button>
                  <pre
                    class="bg-gray-800 text-white p-4 rounded-lg text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap break-words"
                    >{{ logSource }}</pre
                  >
                </div>
              </div>
              <p class="text-base sm:text-lg leading-relaxed">
                This series of errors indicated three distinct problems: an Nginx configuration
                issue, an Odoo filesystem permission error, and an Odoo database schema error.
              </p>
            </section>

            <hr class="my-8 border-gray-200" />

            <section id="nginx-diagnosis" class="mb-12">
              <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
                Diagnosis: The Nginx Failure
              </h2>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                The Nginx error was the first to appear and, fortunately, the most straightforward.
              </p>
              <p class="text-base sm:text-lg mb-4 leading-relaxed flex flex-wrap items-baseline">
                <strong>Error Message:</strong>
                <code class="bg-gray-100 px-2 py-1 rounded text-sm break-all whitespace-normal">
                  cannot load certificate "/etc/letsencrypt/live/example.com/fullchain.pem"
                </code>
              </p>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                This error indicated that Nginx was looking for an SSL certificate file that didn't
                exist in its filesystem. This specific path (<code
                  class="bg-gray-100 px-2 py-1 rounded text-sm"
                  >/etc/letsencrypt/live/...</code
                >) is where Certbot, the service for obtaining free SSL certificates, stores its
                certificates. The root cause was a dependency issue: Nginx attempted to start
                <strong>before</strong> the Certbot container had successfully run and generated the
                certificate files.
              </p>
              <p class="text-base sm:text-lg leading-relaxed">
                <strong>Initial Hypothesis:</strong> The Nginx and Certbot containers were not
                properly synchronized. The Nginx service, as defined in
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">docker-compose.yml</code>, was
                likely starting and trying to access the certificate volume before Certbot had
                populated it.
              </p>
            </section>

            <hr class="my-8 border-gray-200" />

            <section id="odoo-diagnosis" class="mb-12">
              <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
                Diagnosis: The Odoo Permission Errors
              </h2>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                Next, the Odoo container repeatedly failed with a permission error.
              </p>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                <strong>Error Message:</strong>
                <code class="bg-gray-100 px-2 py-1 rounded text-sm"
                  >PermissionError: [Errno 13] Permission denied: '/var/lib/odoo/sessions'</code
                >
              </p>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                This is a classic file system permission issue. Odoo's
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">entrypoint.sh</code> script,
                which attempts to run Odoo as a non-root
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">odoo</code> user, couldn't write
                to the
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">/var/lib/odoo/sessions</code>
                directory. A check of the directory's ownership from the host system confirmed the
                problem: the
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">/var/lib/odoo</code> directory,
                likely mounted via a Docker volume, was owned by
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">root:root</code> and not the
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">odoo</code> user.
              </p>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                The
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">entrypoint.sh</code> script's
                logic to handle this was a common but flawed pattern:
              </p>
              <div class="my-6">
                <div class="relative">
                  <button
                    @click="copy(scriptSource)"
                    class="absolute top-2 right-2 z-10 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs transition-colors"
                  >
                    {{ copied ? 'Copied!' : 'Copy' }}
                  </button>
                  <pre
                    class="bg-gray-800 text-white p-4 rounded-lg text-xs sm:text-sm overflow-x-auto"
                    >{{ scriptSource }}</pre
                  >
                </div>
              </div>
              <p class="text-base sm:text-lg leading-relaxed">
                While this logic is intended to fix the ownership, it's not foolproof. In some
                Docker scenarios, the mounted volume might be created or re-created with host
                permissions (owned by root) after the chown command in the entrypoint.sh script
                runs, leading to a race condition. The correct approach is to set permissions at the
                image build stage.
              </p>
            </section>

            <hr class="my-8 border-gray-200" />

            <section id="database-diagnosis" class="mb-12">
              <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
                Diagnosis: The Database Errors
              </h2>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                The final layer of errors came from the Odoo application itself, after it seemingly
                overcame the permission issues for a moment.
              </p>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                <strong>Error Message:</strong>
                <code class="bg-gray-100 px-2 py-1 rounded text-sm"
                  >ERROR: relation "ir_module_module" does not exist</code
                >
              </p>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                Odoo connects to a PostgreSQL database. When a new database is created, it's empty.
                For Odoo to work, it requires a schema and core tables to be initialized. The
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">ir_module_module</code> table is
                part of the core
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">base</code> module and is
                fundamental for Odoo's operation. Its absence meant the database was connected but
                not yet provisioned. The
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">ERROR</code> log confirmed this.
                The hint was also in the initial Odoo log: "Database example_db not initialized, you
                can force it with
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">-i base</code>".
              </p>
              <p class="text-base sm:text-lg leading-relaxed">
                <strong>Initial Hypothesis:</strong> The Odoo container's startup command was
                missing the initial
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">-i base</code> flag, which is
                essential for creating the required database tables on the first run.
              </p>
            </section>

            <hr class="my-8 border-gray-200" />

            <section id="the-solution" class="mb-12">
              <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
                The Solution: Step-by-Step Fixes
              </h2>
              <p class="text-base sm:text-lg mb-6 leading-relaxed">
                With a clear diagnosis of each problem, the solution involved targeted changes to my
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">docker-compose.yml</code> file
                and the <code class="bg-gray-100 px-2 py-1 rounded text-sm">Dockerfile</code> for
                the Odoo service.
              </p>

              <h3 class="text-lg sm:text-xl font-bold mb-4 text-gray-800">
                1. Solving the Nginx SSL Error
              </h3>
              <p class="text-base sm:text-lg mb-6 leading-relaxed">
                To ensure Certbot runs before Nginx, I modified my
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">docker-compose.yml</code> to use
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">depends_on</code>. While this
                doesn't guarantee the service is ready, it helps. The more robust solution is to use
                a named volume that is shared between Certbot and Nginx and to ensure the Certbot
                container is configured to run at a high priority, or to have Nginx wait for the
                files to exist before starting. The simplest and most reliable fix for a development
                environment is to manually run the
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">certbot</code>
                container first, then start the rest of the stack.
              </p>
              <p class="text-base sm:text-lg mb-6 leading-relaxed">
                I have generate SSL certificate within docker container where nginx communicate with
                cerbot container.
                <a href="https://github.com/wmnnd/nginx-certbot/tree/master">Click here</a> to view
                the source code how to setup the docker container to generate SSL certificate.
              </p>
              <h3 class="text-lg sm:text-xl font-bold mb-4 text-gray-800">
                2. Solving the Odoo Permission Error
              </h3>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                Instead of relying on the a fragile runtime script, I moved the permission fixing
                logic directly into the Odoo
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">Dockerfile</code>. This ensures
                that when the Docker image is built, the directories are created and assigned the
                correct ownership and permissions, before the container even starts.
              </p>

              <div class="my-6">
                <div class="relative">
                  <button
                    @click="copy(dockerfileSource)"
                    class="absolute top-2 right-2 z-10 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs transition-colors"
                  >
                    {{ copied ? 'Copied!' : 'Copy' }}
                  </button>
                  <pre
                    class="bg-gray-800 text-white p-4 rounded-lg text-xs sm:text-sm overflow-x-auto"
                    >{{ dockerfileSource }}</pre
                  >
                </div>
              </div>

              <p class="text-base sm:text-lg mb-6 leading-relaxed">
                This change guarantees that the
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">/var/lib/odoo</code> directory
                and its contents are owned by the odoo user, eliminating the
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">PermissionError</code> entirely.
              </p>

              <h3 class="text-lg sm:text-xl font-bold mb-4 text-gray-800">
                3. Solving the Database Initialization Error
              </h3>
              <p class="text-base sm:text-lg mb-4 leading-relaxed">
                The solution to the missing tables was to force the Odoo container to initialize the
                database on its first startup. I modified the Odoo service in
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">docker-compose.yml</code> by
                adding a command that includes the
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">-i base</code> flag.
              </p>

              <div class="my-6">
                <div class="relative">
                  <button
                    @click="copy(composeSource)"
                    class="absolute top-2 right-2 z-10 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs transition-colors"
                  >
                    {{ copied ? 'Copied!' : 'Copy' }}
                  </button>
                  <pre
                    class="bg-gray-800 text-white p-4 rounded-lg text-xs sm:text-sm overflow-x-auto"
                    >{{ composeSource }}</pre
                  >
                </div>
              </div>

              <p class="text-base sm:text-lg leading-relaxed">
                After running
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">docker-compose up</code> once,
                the database was successfully initialized. I then removed the
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">-i base</code> flag from the
                command to ensure Odoo wouldn't attempt to re-initialize the database on subsequent
                restarts, which could cause data loss.
              </p>
            </section>

            <hr class="my-8 border-gray-200" />

            <section id="conclusion" class="mb-12">
              <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Conclusion</h2>
              <p class="text-base sm:text-lg leading-relaxed">
                This debugging process was a valuable lesson in the interdependencies of a
                multi-container application. By systematically addressing each error—starting with
                the most visible one and working my way down—I was able to uncover the underlying
                issues. The solutions, which involved refining the Dockerfile and Docker Compose
                configuration, not only fixed the immediate problem but also improved the robustness
                and security of the entire setup. This experience underscores the importance of a
                detailed log analysis and a solid understanding of container best practices,
                especially regarding permissions and service dependencies.
              </p>
              <p class="text-base sm:text-lg leading-relaxed">
                This experience underscores the importance of a detailed log analysis and a solid
                understanding of container best practices, especially regarding permissions and
                service dependencies. Beyond just fixing the symptoms, it's crucial to understand
                the root cause. This methodical approach is what truly transforms a fragile system
                into a resilient one.
              </p>
            </section>
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

const logSource =
  ref(`2025/08/27 14:05:43 [emerg] 14#14: cannot load certificate "/etc/letsencrypt/live/example.com/fullchain.pem": BIO_new_file() failed... 
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
USER odoo`)

const composeSource = ref(`
In docker-compose.yml
services:
odoo:
# ...
command: >
odoo-bin -c /usr/src/app/odoo/odoo.conf --limit-time-cpu=60 --limit-time-real=120 --db-filter=^example_db$ -i base`)

const { text, copy, copied, isSupported } = useClipboard()

const activeNav = ref('')
const showMobileToc = ref(false)

const tocItems = [
  { id: 'problem-statement', title: 'Problem Statement' },
  { id: 'nginx-diagnosis', title: 'Diagnosis: The Nginx Failure' },
  { id: 'odoo-diagnosis', title: 'Diagnosis: The Odoo Permission Errors' },
  { id: 'database-diagnosis', title: 'Diagnosis: The Database Errors' },
  { id: 'the-solution', title: 'The Solution: Step-by-Step Fixes' },
  { id: 'conclusion', title: 'Conclusion' }
]

const imgUrl = ref(
  'https://via.placeholder.com/800x400/374151/ffffff?text=Docker+Nginx+Odoo+Architecture'
)

onMounted(() => {
  window.addEventListener('scroll', handleNavBar)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleNavBar)
})

function handleNavBar() {
  for (const section of tocItems) {
    const element = document.getElementById(section.id)
    if (element) {
      if (window.scrollY + 150 >= element.offsetTop) {
        activeNav.value = section.id
      }
    }
  }
}

function toggleMobileToc() {
  showMobileToc.value = !showMobileToc.value
}

function closeMobileToc() {
  showMobileToc.value = false
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    closeMobileToc()
  }
}
</script>

<style scoped>
.prose {
  color: #374151;
}

.prose h2 {
  color: #111827;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.prose h3 {
  color: #1f2937;
}

.prose code {
  font-size: 0.875em;
  font-weight: 600;
}

pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.4;
}

/* Custom scrollbar for mobile TOC */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
