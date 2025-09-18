<template>
  <div>
    <Head>
      <title>Mastering Bash HereDoc: A Complete Guide for System Administrators</title>
      <meta
        name="og:description"
        content="As a system administrator working with complex cloud architectures, you've
                    probably faced the challenge of executing multiple commands across different
                    servers in a single shell script. Enter Bash HereDoc - a powerful feature that
                    can transform how you handle multi-line input and streamline your automation
                    workflows."
      />
      <meta
        name="og:keywords"
        content="Docker, Nginx, Odoo, SSL, Let's Encrypt, Permissions, PostgreSQL, troubleshooting, Linux, Shell Script, DevOps"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div class="mb-3">
      <NavBar />
    </div>
    <div class="bg-gray-50 min-h-screen">
      <div class="lg:hidden fixed top-4 right-4 z-50">
        <button
          @click="toggleMobileToc()"
          class="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
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

      <div
        id="mobileToc"
        class="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
        :class="{ hidden: isMobileTocHidden }"
        @click="closeMobileToc()"
      >
        <div
          class="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl overflow-y-auto"
          @click.stop=""
        >
          <div class="p-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-bold">Table of Contents</h2>
              <button @click="closeMobileToc()" class="text-gray-500 hover:text-gray-700">
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
            <nav class="space-y-2" id="mobileTocNav">
              <a
                v-for="section in sections"
                :key="section.id"
                :href="'#' + section.id"
                class="block py-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                @click="closeMobileToc()"
              >
                {{ section.title }}
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {{BLOGS_INFO['bash_here_doc']['title']}}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
              >Shell Scripting</span
            >
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium"
              >Linux</span
            >
            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium"
              >DevOps</span
            >
            <span>{{BLOGS_INFO['bash_here_doc']['date']}} | {{BLOGS_INFO['bash_here_doc']['readTime']}}</span>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          <div class="hidden lg:block lg:w-80 flex-shrink-0">
            <nav class="sticky top-8 bg-white rounded-xl p-6 shadow-sm border">
              <div class="bg-blue-600 rounded-lg p-4 mb-6">
                <h2 class="text-lg font-semibold text-white">Table of Contents</h2>
              </div>
              <div class="space-y-2" id="desktopTocNav">
                <a
                  v-for="section in sections"
                  :key="section.id"
                  :href="'#' + section.id"
                  class="block py-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {{ section.title }}
                </a>
              </div>
            </nav>
          </div>

          <article class="flex-1 min-w-0">
            <div class="bg-white rounded-xl p-6 sm:p-8 shadow-sm border">
              <div class="prose prose-lg max-w-none">
                <section id="introduction" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">
                    Why Bash HereDoc is a Game-Changer
                  </h2>
                  <p class="text-lg leading-relaxed mb-4">
                    As a system administrator working with complex cloud architectures, you've
                    probably faced the challenge of executing multiple commands across different
                    servers in a single shell script. Enter Bash HereDoc - a powerful feature that
                    can transform how you handle multi-line input and streamline your automation
                    workflows.
                  </p>
                  <p class="text-lg leading-relaxed mb-6">
                    Imagine having to access a public bastion host, then jump to private subnets,
                    executing a series of commands in one seamless operation. HereDoc makes this not
                    just possible, but elegant and maintainable. It's truly a life-saving method for
                    DevOps professionals and system administrators.
                  </p>
                  <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-blue-700">
                          <strong>Pro Tip:</strong> HereDoc isn't just about multi-line strings -
                          it's about creating maintainable, readable scripts that can handle complex
                          deployment scenarios with ease.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="what-is-heredoc" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">What is Bash HereDoc?</h2>
                  <p class="text-lg leading-relaxed mb-4">
                    Bash HereDoc (Here Document) is a redirection method that allows you to pass
                    multiple lines of input to a command. It's particularly useful when you need to:
                  </p>
                  <ul class="list-disc pl-6 mb-6 space-y-2 text-lg">
                    <li>Execute multiple commands in sequence</li>
                    <li>Create configuration files with dynamic content</li>
                    <li>Send complex input to interactive programs</li>
                    <li>Maintain formatting in multi-line text</li>
                  </ul>
                  <h3 class="text-xl font-semibold mb-4">Basic Syntax</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.basicSyntax)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="basicSyntax"
                    ><code>command << DELIMITER
content line 1
content line 2
content line 3
DELIMITER</code></pre>
                  </div>
                  <p class="text-lg leading-relaxed">
                    The `DELIMITER` (commonly `EOF`) marks both the beginning and end of the input.
                    Everything between these delimiters is treated as input to the preceding
                    command.
                  </p>
                </section>

                <section id="understanding-eof" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Understanding EOF in HereDoc</h2>
                  <p class="text-lg leading-relaxed mb-4">
                    EOF (End Of File) is the most common delimiter used in HereDoc. While you can
                    use any word as a delimiter, EOF has become the standard convention because it
                    clearly indicates the end of the input block.
                  </p>
                  <h3 class="text-xl font-semibold mb-4">Basic EOF Example</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.eofExample)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="eofExample"
                    ><code>#!/bin/bash
cat << EOF > output.txt
This is line 1
This is line 2
Variables like $USER work here
EOF</code></pre>
                  </div>
                  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                    <p class="text-sm text-yellow-700">
                      <strong>Important:</strong> The closing EOF must be on its own line with no
                      leading or trailing characters, including spaces or tabs.
                    </p>
                  </div>
                </section>

                <section id="quoted-unquoted-eof" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">
                    Quoted vs Unquoted EOF: Understanding the Difference
                  </h2>
                  <p class="text-lg leading-relaxed mb-6">
                    One of the most crucial concepts in HereDoc is understanding when to use quoted
                    vs unquoted delimiters. This determines whether variable expansion occurs within
                    your HereDoc block.
                  </p>
                  <h3 class="text-xl font-semibold mb-4">
                    Unquoted EOF (Variable Expansion Enabled)
                  </h3>
                  <div class="relative mb-4">
                    <button
                      @click="copyCode($refs.unquotedEof)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="unquotedEof"
                    ><code>#!/bin/bash
USERNAME="admin"
cat << EOF
Welcome $USERNAME!
Current date: $(date)
Home directory: $HOME
EOF</code></pre>
                  </div>
                  <p class="text-base mb-6 bg-gray-100 p-3 rounded">
                    <strong>Output:</strong> Variables and commands are expanded, showing actual
                    values.
                  </p>
                  <h3 class="text-xl font-semibold mb-4">Quoted EOF (Literal Text)</h3>
                  <div class="relative mb-4">
                    <button
                      @click="copyCode($refs.quotedEof)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="quotedEof"
                    ><code>#!/bin/bash
USERNAME="admin"
cat << 'EOF'
Welcome $USERNAME!
Current date: $(date)
Home directory: $HOME
EOF</code></pre>
                  </div>
                  <p class="text-base mb-6 bg-gray-100 p-3 rounded">
                    <strong>Output:</strong> Literal text with $USERNAME, $(date), and $HOME printed
                    as-is.
                  </p>
                  <div class="bg-green-50 border-l-4 border-green-400 p-4 my-6">
                    <p class="text-sm text-green-700">
                      <strong>Best Practice:</strong> Use quoted delimiters when creating
                      configuration files or scripts where you want to preserve literal dollar signs
                      and backticks.
                    </p>
                  </div>
                </section>

                <section id="real-world-use-cases" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Real-World Use Cases</h2>
                  <h3 class="text-xl font-semibold mb-4">
                    1. Bastion Host to Private Subnet Access
                  </h3>
                  <p class="text-lg leading-relaxed mb-4">
                    Here's how HereDoc solves the classic cloud architecture challenge of accessing
                    private resources through a bastion host:
                  </p>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.bastionHost)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="bastionHost"
                    ><code>#!/bin/bash
BASTION_HOST="bastion.company.com"
PRIVATE_SERVER="10.0.1.100"
APP_VERSION="v2.1.0"

ssh -t $BASTION_HOST << EOF
    echo "Connected to bastion host"
    ssh -t $PRIVATE_SERVER << INNER_EOF
        echo "Now on private server"
        sudo systemctl stop myapp
        docker pull myapp:$APP_VERSION
        docker run -d --name myapp myapp:$APP_VERSION
        sudo systemctl start myapp
        echo "Deployment complete"
        exit
INNER_EOF
    echo "Disconnecting from bastion"
    exit
EOF</code></pre>
                  </div>
                  <h3 class="text-xl font-semibold mb-4">
                    2. Dynamic Configuration File Generation
                  </h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.configFile)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="configFile"
                    ><code>#!/bin/bash
DB_HOST="prod-db.company.com"
DB_NAME="production"
API_KEY="abc123def456"

cat << EOF > /etc/myapp/config.yml
database:
  host: $DB_HOST
  name: $DB_NAME
  port: 5432
  
api:
  key: $API_KEY
  timeout: 30
  
logging:
  level: info
  file: /var/log/myapp/app.log
EOF</code></pre>
                  </div>
                  <h3 class="text-xl font-semibold mb-4">3. Docker Container Management</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.dockerManagement)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="dockerManagement"
                    ><code>#!/bin/bash
CONTAINER_NAME="webapp"
IMAGE_TAG="latest"

docker exec -i $CONTAINER_NAME bash << EOF
    # Update package lists
    apt-get update
    
    # Install new dependencies
    apt-get install -y curl wget
    
    # Configure application
    echo "ENVIRONMENT=production" >> /app/.env
    echo "DEBUG=false" >> /app/.env
    
    # Restart services
    supervisorctl restart all
    
    echo "Container configuration complete"
EOF</code></pre>
                  </div>
                </section>

                <section id="nested-heredoc" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">
                    Advanced Technique: Nested HereDoc
                  </h2>
                  <p class="text-lg leading-relaxed mb-4">
                    Nested HereDoc allows you to embed one HereDoc inside another, enabling complex
                    multi-level operations. This is particularly powerful for creating configuration
                    files that include content from other files or commands.
                  </p>
                  <div class="bg-red-50 border-l-4 border-red-400 p-4 my-6">
                    <p class="text-sm text-red-700">
                      <strong>Critical Rule:</strong> Space is required between nested delimiters to
                      separate them properly. Notice the space between `NESTED_EOF` and `EOF` in the
                      examples below.
                    </p>
                  </div>
                  <h3 class="text-xl font-semibold mb-4">Basic Nested Example</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.basicNested)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="basicNested"
                    ><code>#!/bin/bash

# Create individual log files
cat << EOF > file1.log
This is file1 nested heredoc content.
Server: $(hostname)
Date: $(date)
EOF

cat << EOF > file2.log
This is file2 nested heredoc content!!!
Process count: $(ps aux | wc -l)
Disk usage: $(df -h /)
EOF

# Combine them into a master log file
cat << EOF >> file3.log
This is the beginning of the master log file
========================================
$(cat << NESTED_EOF
File 1 Contents:
$(< file1.log)

File 2 Contents:
$(< file2.log)
NESTED_EOF
)
========================================
This is the end of the master log file.
EOF</code></pre>
                  </div>
                  <h3 class="text-xl font-semibold mb-4">Advanced Nested Configuration</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    Here's a more complex example that demonstrates creating a Docker Compose file
                    with embedded configuration:
                  </p>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.advancedNested)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="advancedNested"
                    ><code>#!/bin/bash
APP_NAME="mywebapp"
DB_PASSWORD="secure_password_123"
NGINX_CONFIG_PATH="/etc/nginx/nginx.conf"

# Generate docker-compose.yml with nested configurations
cat << EOF > docker-compose.yml
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - nginx_config:/etc/nginx/nginx.conf
    depends_on:
      - app

  app:
    image: $APP_NAME:latest
    environment:
$(cat << NESTED_EOF
      - DATABASE_URL=postgresql://user:$DB_PASSWORD@db:5432/myapp
      - REDIS_URL=redis://redis:6379/0
      - APP_ENV=production
NESTED_EOF
)
    depends_on:
      - db
      - redis

  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: $DB_PASSWORD
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  nginx_config:
  postgres_data:
EOF</code></pre>
                  </div>
                </section>

                <section id="docker-best-practices" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">
                    Docker Volume Management Best Practices
                  </h2>
                  <p class="text-lg leading-relaxed mb-4">
                    An important note about Docker management: always clean up unused volumes to
                    prevent disk space issues and maintain a clean environment.
                  </p>
                  <h3 class="text-xl font-semibold mb-4">Automated Volume Cleanup Script</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.volumeCleanup)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="volumeCleanup"
                    ><code>#!/bin/bash

# Function to clean unused Docker resources
cleanup_docker() {
    cat << EOF
Starting Docker cleanup process...
================================
EOF
    
    echo "Removing stopped containers..."
    docker container prune -f
    
    echo "Removing unused images..."
    docker image prune -a -f
    
    echo "Removing unused volumes..."
    docker volume prune -f
    
    echo "Removing unused networks..."
    docker network prune -f
    
    cat << EOF
================================
Docker cleanup completed!
Disk space freed: $(docker system df)
EOF
}

# Execute cleanup
cleanup_docker</code></pre>
                  </div>
                  <h3 class="text-xl font-semibold mb-4">Volume Status Check</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.volumeStatus)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="volumeStatus"
                    ><code>#!/bin/bash

# Generate volume report using HereDoc
cat << EOF > docker-volume-report.txt
Docker Volume Report
Generated: $(date)
==================

Active Volumes:
$(docker volume ls)

Unused Volumes:
$(docker volume ls -q -f dangling=true)

System Usage:
$(docker system df -v)

Recommendations:
- Remove unused volumes with: docker volume prune
- Remove specific volume with: docker volume rm VOLUME_NAME
- Always backup important volumes before cleanup
EOF

echo "Volume report generated: docker-volume-report.txt"</code></pre>
                  </div>
                </section>

                <section id="common-pitfalls" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Common Pitfalls and Solutions</h2>
                  <div class="space-y-6">
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 class="text-lg font-semibold text-red-600 mb-3">
                        ❌ Pitfall 1: Indented EOF Delimiter
                      </h3>
                      <div class="relative mb-4">
                        <pre
                          class="bg-red-50 text-red-800 p-3 rounded overflow-x-auto"
                          ref="pitfall1"
                        ><code># This will NOT work
cat << EOF
    Content here
    EOF # ← This is indented and will cause an error!</code></pre>
                      </div>
                      <h4 class="text-sm font-semibold text-green-600 mb-2">✅ Solution:</h4>
                      <div class="relative">
                        <pre
                          class="bg-green-50 text-green-800 p-3 rounded overflow-x-auto"
                          ref="pitfall1Solution"
                        ><code># This WILL work
cat << EOF
    Content here
EOF</code></pre>
                      </div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 class="text-lg font-semibold text-red-600 mb-3">
                        ❌ Pitfall 2: Missing Space in Nested Delimiters
                      </h3>
                      <div class="relative mb-4">
                        <pre
                          class="bg-red-50 text-red-800 p-3 rounded overflow-x-auto"
                          ref="pitfall2"
                        ><code># This will cause confusion
cat << EOF
$(cat << NESTED_EOF # ← No space, hard to read
content
NESTED_EOFEOF) # ← Confusing end markers
EOF</code></pre>
                      </div>
                      <h4 class="text-sm font-semibold text-green-600 mb-2">✅ Solution:</h4>
                      <div class="relative">
                        <pre
                          class="bg-green-50 text-green-800 p-3 rounded"
                          ref="pitfall2Solution"
                        ><code># This is clear and correct
cat << EOF
$(cat << NESTED_EOF
content
NESTED_EOF
)
EOF</code></pre>
                      </div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 class="text-lg font-semibold text-red-600 mb-3">
                        ❌ Pitfall 3: Unintended Variable Expansion
                      </h3>
                      <div class="relative mb-4">
                        <pre
                          class="bg-red-50 text-red-800 p-3 rounded overflow-x-auto"
                          ref="pitfall3"
                        ><code># Variables get expanded when you don't want them to
cat << EOF > script.sh
#!/bin/bash
echo "User is $USER" # ← $USER gets expanded immediately
EOF</code></pre>
                      </div>
                      <h4 class="text-sm font-semibold text-green-600 mb-2">✅ Solution:</h4>
                      <div class="relative">
                        <pre
                          class="bg-green-50 text-green-800 p-3 rounded overflow-x-auto"
                          ref="pitfall3Solution"
                        ><code># Use quoted delimiter to preserve literal text
cat << 'EOF' > script.sh
#!/bin/bash
echo "User is $USER" # ← $USER preserved as literal text
EOF</code></pre>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="performance-tips" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">
                    Performance Tips and Best Practices
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 class="text-lg font-semibold text-blue-800 mb-3">🚀 Performance</h3>
                      <ul class="text-sm text-blue-700 space-y-2">
                        <li>• Use specific delimiters instead of generic ones</li>
                        <li>• Avoid deeply nested HereDocs when possible</li>
                        <li>• Consider file size when creating large configurations</li>
                        <li>• Use quoted delimiters when variable expansion isn't needed</li>
                      </ul>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 class="text-lg font-semibold text-green-800 mb-3">🛡️ Security</h3>
                      <ul class="text-sm text-green-700 space-y-2">
                        <li>• Never include passwords in unquoted HereDocs</li>
                        <li>• Use environment variables for sensitive data</li>
                        <li>• Validate input before using in HereDocs</li>
                        <li>• Be careful with user-provided delimiters</li>
                      </ul>
                    </div>
                  </div>
                  <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-yellow-800 mb-3">📝 Maintainability</h3>
                    <ul class="text-sm text-yellow-700 space-y-2">
                      <li>
                        • Use descriptive delimiter names (e.g., `CONFIG_EOF` instead of `EOF`)
                      </li>
                      <li>• Comment complex nested structures</li>
                      <li>• Keep HereDoc blocks reasonably short</li>
                      <li>• Consider breaking very large blocks into functions</li>
                    </ul>
                  </div>
                </section>

                <section id="conclusion" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Conclusion</h2>
                  <p class="text-lg leading-relaxed mb-4">
                    Bash HereDoc is an indispensable tool for system administrators and DevOps
                    engineers. It simplifies complex tasks by allowing you to embed multi-line
                    strings and commands directly into your scripts. By mastering concepts like
                    quoted vs. unquoted delimiters and nested HereDocs, you can create scripts that
                    are not only more powerful but also more readable and maintainable. This guide
                    has shown you the basics and several real-world examples, from managing Docker
                    containers to performing multi-level SSH operations. Use these techniques to
                    streamline your workflows, automate repetitive tasks, and focus on more
                    strategic challenges in your infrastructure.
                  </p>
                </section>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/views/home/Navigation.vue'
import Footer from '@/views/home/Footer.vue'
import { Head } from '@unhead/vue/components'
import { BLOGS_INFO } from '@/stores/blogsStore'

// State Management
const isMobileTocHidden = ref(true)
const sections = ref([])

// Dynamic Code Block Refs
const basicSyntax = ref(null)
const eofExample = ref(null)
const unquotedEof = ref(null)
const quotedEof = ref(null)
const bastionHost = ref(null)
const configFile = ref(null)
const dockerManagement = ref(null)
const basicNested = ref(null)
const advancedNested = ref(null)
const volumeCleanup = ref(null)
const volumeStatus = ref(null)
const pitfall1 = ref(null)
const pitfall1Solution = ref(null)
const pitfall2 = ref(null)
const pitfall2Solution = ref(null)
const pitfall3 = ref(null)
const pitfall3Solution = ref(null)

// Methods
const generateToc = () => {
  const allSections = document.querySelectorAll('section[id]')
  sections.value = Array.from(allSections).map((section) => ({
    id: section.id,
    title: section.querySelector('h2').innerText
  }))
}

const toggleMobileToc = () => {
  isMobileTocHidden.value = !isMobileTocHidden.value
  document.body.style.overflow = isMobileTocHidden.value ? 'auto' : 'hidden'
}

const closeMobileToc = () => {
  isMobileTocHidden.value = true
  document.body.style.overflow = 'auto'
}

const copyCode = (preElement) => {
  if (preElement && preElement.querySelector('code')) {
    const code = preElement.querySelector('code').innerText
    navigator.clipboard
      .writeText(code)
      .then(() => {
        // Find the copy button associated with this pre element
        const button = preElement.previousElementSibling
        if (button) {
          button.textContent = 'Copied!'
          setTimeout(() => {
            button.textContent = 'Copy'
          }, 2000)
        }
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
        const button = preElement.previousElementSibling
        if (button) {
          button.textContent = 'Error!'
        }
      })
  }
}

// Lifecycle Hook
onMounted(() => {
  generateToc()
})
</script>

<style scoped>
/*
This section is optional, as the Tailwind CSS classes handle most of the styling.
However, you can add any component-specific styles here if needed.
*/
.prose {
  color: #374151;
}
.prose h1,
.prose h2,
.prose h3 {
  color: #111827;
}
.prose h2 {
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}
.prose code {
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-weight: 600;
}
pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.4;
  background-color: #111827; /* Tailwind's gray-900 */
  color: #f3f4f6; /* Tailwind's gray-100 */
}
.copy-btn {
  transition: all 0.2s ease;
}
.copy-btn:hover {
  background-color: #4b5563;
}
</style>
