<template>
  <div>
    <Head>
      <title>Complete Guide: Troubleshooting Docker, Nginx, and Let's Encrypt SSL Certificate Issues</title>
      <meta
        name="og:description"
        content="A comprehensive guide to resolving common Docker containerization issues, Nginx configuration problems, and Let's Encrypt SSL certificate generation failures. Learn how to debug connection refused errors, fix PostgreSQL permissions, and successfully deploy Odoo with HTTPS."
      />
      <meta
        name="og:keywords"
        content="Docker, Nginx, Odoo, SSL, Let's Encrypt, Certbot, PostgreSQL, DevOps, Linux, System Administration, Troubleshooting, Container Management, HTTPS, Port 80, Connection Refused"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div class="mb-3">
      <NavBar />
    </div>
    <!-- <div class="bg-gray-50 min-h-screen"> -->
      <div class="md:hidden fixed top-4 right-4 z-50">
        <button
          @click="toggleMobileToc"
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
        class="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
        :class="{ hidden: isMobileTocHidden }"
        @click="closeMobileToc()"
      >
        <div
          class="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
          @click.stop=""
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

      <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {{ BLOGS_INFO['odoo_nginx_domin']['title'] }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
              >Docker</span
            >
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium"
              >DevOps</span
            >
            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium"
              >SSL/TLS</span
            >
            <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium"
              >Troubleshooting</span
            >
            <span>{{ BLOGS_INFO['odoo_nginx_domin']['date'] }} | {{ BLOGS_INFO['odoo_error']['readTime'] }}</span>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row justify-between gap-8">
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
                    The Challenge: When SSL Certificates Won't Generate
                  </h2>
                  <p class="text-lg leading-relaxed mb-4">
                    You've containerized your Odoo application with Docker, configured Nginx as a reverse proxy, and you're ready to secure it with Let's Encrypt SSL certificates. But then you hit the dreaded error:
                  </p>
                  <div class="bg-red-50 border-l-4 border-red-400 p-4 my-6">
                    <pre class="text-sm text-red-800 whitespace-pre-wrap">Type: connection
Detail: Fetching http://yourdomain.com/.well-known/acme-challenge/[token]: Connection refused</pre>
                  </div>
                  <p class="text-lg leading-relaxed mb-4">
                    This scenario is more common than you might think. The issue typically stems from a chicken-and-egg problem: Nginx won't start because it's configured to use SSL certificates that don't exist yet, but you can't get SSL certificates because Nginx isn't running to serve the ACME challenge files.
                  </p>
                  <p class="text-lg leading-relaxed mb-6">
                    In this comprehensive guide, we'll walk through the entire troubleshooting process, from identifying the root cause to implementing a robust solution that prevents this issue from happening again.
                  </p>
                  <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-blue-700">
                          <strong>What You'll Learn:</strong> By the end of this guide, you'll understand how to diagnose Docker networking issues, fix Nginx configuration problems, resolve PostgreSQL permission errors, and implement a foolproof SSL certificate generation workflow.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="understanding-the-problem" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Understanding the Problem</h2>
                  <h3 class="text-xl font-semibold mb-4">How Let's Encrypt Certificate Validation Works</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    Let's Encrypt uses the ACME (Automated Certificate Management Environment) protocol to verify domain ownership. The HTTP-01 challenge method works as follows:
                  </p>
                  <ol class="list-decimal pl-6 mb-6 space-y-2 text-lg">
                    <li>Certbot creates a temporary file in <code>.well-known/acme-challenge/</code></li>
                    <li>Let's Encrypt's servers try to fetch this file via HTTP (port 80)</li>
                    <li>If successful, Let's Encrypt issues the certificate</li>
                    <li>If the connection fails, you get a "connection refused" error</li>
                  </ol>
                  <h3 class="text-xl font-semibold mb-4">The Chicken-and-Egg Problem</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    The typical deployment failure scenario looks like this:
                  </p>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <div class="space-y-4">
                      <div class="flex items-start">
                        <span class="text-red-500 font-bold text-xl mr-3">❌</span>
                        <div>
                          <p class="font-semibold">Nginx Configuration References Non-Existent Certificates</p>
                          <p class="text-sm text-gray-600">Your nginx.conf has SSL directives pointing to certificate files that don't exist yet</p>
                        </div>
                      </div>
                      <div class="flex items-start">
                        <span class="text-red-500 font-bold text-xl mr-3">❌</span>
                        <div>
                          <p class="font-semibold">Nginx Fails to Start</p>
                          <p class="text-sm text-gray-600">Nginx crashes immediately on startup because it can't load the missing SSL certificates</p>
                        </div>
                      </div>
                      <div class="flex items-start">
                        <span class="text-red-500 font-bold text-xl mr-3">❌</span>
                        <div>
                          <p class="font-semibold">Port 80 Remains Closed</p>
                          <p class="text-sm text-gray-600">Since Nginx isn't running, port 80 never opens for HTTP traffic</p>
                        </div>
                      </div>
                      <div class="flex items-start">
                        <span class="text-red-500 font-bold text-xl mr-3">❌</span>
                        <div>
                          <p class="font-semibold">Let's Encrypt Can't Reach Your Server</p>
                          <p class="text-sm text-gray-600">Certificate validation fails with "Connection refused"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="initial-diagnosis" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Initial Diagnosis: Checking the Symptoms</h2>
                  <h3 class="text-xl font-semibold mb-4">Step 1: Verify Port 80 Status</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    The first diagnostic step is to check if port 80 is actually listening on your server:
                  </p>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.checkPort)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="checkPort"
                    ><code># Check what's listening on port 80
sudo ss -tlnp | grep :80

# Alternative using netstat
sudo netstat -tlnp | grep :80

# Check with lsof
sudo lsof -i :80</code></pre>
                  </div>
                  <p class="text-lg leading-relaxed mb-4">
                    <strong>Expected output if working:</strong>
                  </p>
                  <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <pre class="text-sm text-green-800">tcp  LISTEN  0.0.0.0:80  0.0.0.0:*  users:(("docker-proxy",pid=12345,fd=7))</pre>
                  </div>
                  <p class="text-lg leading-relaxed mb-6">
                    <strong>Problem indicator:</strong> If you get no output or see nothing listening on port 80, that's your issue.
                  </p>
                  
                  <h3 class="text-xl font-semibold mb-4">Step 2: Check Docker Container Status</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.dockerStatus)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="dockerStatus"
                    ><code># Check all containers
docker compose ps

# Check with docker ps
docker ps -a

# Inspect specific container ports
docker port your-nginx-container</code></pre>
                  </div>
                  <p class="text-lg leading-relaxed mb-4">
                    Look for containers with "Restarting" status - this indicates a crash loop:
                  </p>
                  <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <pre class="text-sm text-red-800">NAME                STATUS
nginx-container    Restarting (1) 10 seconds ago</pre>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">Step 3: Examine Container Logs</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.dockerLogs)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="dockerLogs"
                    ><code># Check nginx logs
docker compose logs nginx --tail=50

# Check for SSL certificate errors
docker logs your-nginx-container 2>&1 | grep -i "ssl\|certificate"</code></pre>
                  </div>
                  <p class="text-lg leading-relaxed mb-4">
                    The telltale error message:
                  </p>
                  <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <pre class="text-sm text-red-800 whitespace-pre-wrap">nginx: [emerg] cannot load certificate "/etc/letsencrypt/live/domain.com/fullchain.pem": 
BIO_new_file() failed (SSL: error:80000002:system library::No such file or directory)</pre>
                  </div>
                </section>

                <section id="postgresql-permissions" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Bonus Issue: PostgreSQL Permission Problems</h2>
                  <p class="text-lg leading-relaxed mb-4">
                    While troubleshooting the SSL issue, you might also encounter PostgreSQL container failures:
                  </p>
                  <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <pre class="text-sm text-red-800">mkdir: cannot create directory '/var/lib/postgresql/data': Permission denied</pre>
                  </div>
                  <h3 class="text-xl font-semibold mb-4">Why This Happens</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    PostgreSQL containers run as user ID 999 by default. If your Docker volume has incorrect permissions, the container can't initialize the database.
                  </p>
                  <h3 class="text-xl font-semibold mb-4">The Fix</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.postgresqlFix)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="postgresqlFix"
                    ><code># Stop all containers
docker compose down

# Fix permissions on the volume
docker run --rm \
  -v your-project_odoo-db-data:/data \
  -u root \
  alpine chown -R 999:999 /data

# Or remove and recreate the volume
docker volume rm your-project_odoo-db-data
docker compose up -d</code></pre>
                  </div>
                </section>

                <section id="nginx-configuration-solution" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">The Solution: Smart Nginx Configuration</h2>
                  <h3 class="text-xl font-semibold mb-4">Strategy: HTTP-First, HTTPS-Later</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    The key to solving this problem is to configure Nginx to start in HTTP-only mode when certificates don't exist, then switch to HTTPS after obtaining them.
                  </p>
                  
                  <h3 class="text-xl font-semibold mb-4">Approach 1: Manual Configuration (Quick Fix)</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    Temporarily comment out SSL sections in your nginx configuration:
                  </p>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.nginxHttpOnly)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="nginxHttpOnly"
                    ><code>upstream odoo-backend {
    server odoo19:8069;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    client_max_body_size 600M;
    
    # ACME challenge location for Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        try_files $uri $uri/ =404;
    }

    # Proxy to Odoo (comment out SSL redirect)
    location / {
        proxy_pass http://odoo-backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Comment out SSL server block until certificates exist
# server {
#     listen 443 ssl;
#     server_name yourdomain.com;
#     ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
#     ...
# }</code></pre>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">Approach 2: Smart Entrypoint Script (Recommended)</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    Create a Docker entrypoint script that automatically detects whether certificates exist and configures Nginx accordingly:
                  </p>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.entrypointScript)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="entrypointScript"
                    ><code>#!/bin/sh
set -e

echo "🔍 Checking for SSL certificates..."

# Create webroot for certbot
mkdir -p /var/www/certbot/.well-known/acme-challenge

# Check if SSL certificates exist
if [ -f "/etc/letsencrypt/live/yourdomain.com/fullchain.pem" ]; then
    echo "✅ SSL certificates found — running with HTTPS..."
    
    # Use configuration with SSL
    cat > /etc/nginx/conf.d/default.conf << 'NGINX_CONF'
# HTTP - Redirect to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://odoo19:8069;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX_CONF

else
    echo "⚠️  No SSL certs found — running in HTTP-only mode..."
    
    # Use HTTP-only configuration
    cat > /etc/nginx/conf.d/default.conf << 'NGINX_CONF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://odoo19:8069;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX_CONF

fi

echo "🚀 Starting Nginx..."
exec nginx -g 'daemon off;'</code></pre>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">Update Your Dockerfile</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.dockerfile)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="dockerfile"
                    ><code>FROM nginx:latest

# Install netcat for health checks
RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Copy entrypoint script
COPY docker_odoo/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Remove default config
RUN rm -f /etc/nginx/conf.d/default.conf

EXPOSE 80 443

ENTRYPOINT ["/docker-entrypoint.sh"]</code></pre>
                  </div>
                </section>

                <section id="ssl-certificate-generation" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Obtaining SSL Certificates</h2>
                  <h3 class="text-xl font-semibold mb-4">Step 1: Verify Port 80 Accessibility</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    Before requesting certificates, verify that Let's Encrypt can reach your server:
                  </p>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.verifyAccess)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="verifyAccess"
                    ><code># Create test file
docker compose exec nginx sh -c \
  'mkdir -p /var/www/certbot/.well-known/acme-challenge/ && \
   echo "test123" > /var/www/certbot/.well-known/acme-challenge/test.txt'

# Test locally
curl http://localhost/.well-known/acme-challenge/test.txt

# Test from internet
curl http://yourdomain.com/.well-known/acme-challenge/test.txt</code></pre>
                  </div>
                  <p class="text-lg leading-relaxed mb-6">
                    If both tests return "test123", you're ready to proceed. If the external test fails, check your firewall settings.
                  </p>

                  <h3 class="text-xl font-semibold mb-4">Step 2: Use Staging Environment First</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    Let's Encrypt has rate limits (5 certificates per domain per week). Always test with their staging server first:
                  </p>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.stagingCert)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="stagingCert"
                    ><code># Request staging certificate
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your@email.com \
  --agree-tos \
  --no-eff-email \
  --staging \
  -d yourdomain.com \
  -d www.yourdomain.com</code></pre>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">Step 3: Get Production Certificate</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    Once staging succeeds, get the real certificate:
                  </p>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.prodCert)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="prodCert"
                    ><code># Delete staging certificate
docker compose run --rm certbot delete --cert-name yourdomain.com

# Get production certificate (remove --staging flag)
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your@email.com \
  --agree-tos \
  --no-eff-email \
  -d yourdomain.com \
  -d www.yourdomain.com</code></pre>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">Step 4: Restart Nginx</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.restartNginx)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="restartNginx"
                    ><code># If using smart entrypoint script, just restart
docker compose restart nginx

# Verify HTTPS is working
curl -I https://yourdomain.com</code></pre>
                  </div>
                </section>

                <section id="complete-docker-compose" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Complete Docker Compose Configuration</h2>
                  <p class="text-lg leading-relaxed mb-4">
                    Here's a complete, production-ready docker-compose.yml for Odoo with Nginx and automatic SSL:
                  </p>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.dockerCompose)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="dockerCompose"
                    ><code>version: '3.8'

services:
  db:
    image: postgres:15
    container_name: odoo-db
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres_data:/var/lib/postgresql/data/pgdata
    networks:
      - odoo-network
    restart: unless-stopped

  odoo:
    image: odoo:17
    container_name: odoo-app
    depends_on:
      - db
    environment:
      - HOST=${POSTGRES_HOST}
      - USER=${POSTGRES_USER}
      - PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - odoo_data:/var/lib/odoo
      - ./addons:/mnt/extra-addons
    networks:
      - odoo-network
    restart: unless-stopped

  nginx:
    build:
      context: .
      dockerfile: Dockerfile-nginx
    container_name: odoo-nginx
    depends_on:
      - odoo
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    networks:
      - odoo-network
    restart: unless-stopped

  certbot:
    image: certbot/certbot
    container_name: odoo-certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
    networks:
      - odoo-network

networks:
  odoo-network:
    driver: bridge

volumes:
  postgres_data:
  odoo_data:</code></pre>
                  </div>
                </section>

                <section id="firewall-configuration" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Firewall and Network Configuration</h2>
                  <h3 class="text-xl font-semibold mb-4">UFW Configuration</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.ufwConfig)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="ufwConfig"
                    ><code># Check firewall status
sudo ufw status

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Verify
sudo ufw status numbered</code></pre>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">Cloud Provider Security Groups</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    If you're using a cloud provider (AWS, DigitalOcean, etc.), ensure your security group allows inbound traffic:
                  </p>
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 class="font-semibold text-blue-800 mb-3">Required Inbound Rules:</h4>
                    <ul class="space-y-2 text-sm text-blue-700">
                      <li><strong>Type:</strong> HTTP | <strong>Protocol:</strong> TCP | <strong>Port:</strong> 80 | <strong>Source:</strong> 0.0.0.0/0</li>
                      <li><strong>Type:</strong> HTTPS | <strong>Protocol:</strong> TCP | <strong>Port:</strong> 443 | <strong>Source:</strong> 0.0.0.0/0</li>
                      <li><strong>Type:</strong> SSH | <strong>Protocol:</strong> TCP | <strong>Port:</strong> 22 | <strong>Source:</strong> Your IP</li>
                    </ul>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">DNS Configuration</h3>
                  <p class="text-lg leading-relaxed mb-4">
                    Verify your DNS records point to your server:
                  </p>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.dnsCheck)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="dnsCheck"
                    ><code># Check your public IP
curl ifconfig.me

# Check DNS resolution
dig +short yourdomain.com
dig +short www.yourdomain.com

# Both should return your server's public IP</code></pre>
                  </div>
                </section>

                <section id="troubleshooting-checklist" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Complete Troubleshooting Checklist</h2>
                  <div class="space-y-4">
                    <div class="bg-white border-l-4 border-blue-500 p-4 shadow-sm">
                      <h3 class="font-semibold text-blue-800 mb-2">🔍 Network & Connectivity</h3>
                      <ul class="space-y-1 text-sm text-gray-700">
                        <li>☐ Port 80 is listening: <code>sudo ss -tlnp | grep :80</code></li>
                        <li>☐ DNS records point to correct IP</li>
                        <li>☐ Firewall allows ports 80 and 443</li>
                        <li>☐ Cloud security group configured correctly</li>
                        <li>☐ Can access test file from internet</li>
                      </ul>
                    </div>

                    <div class="bg-white border-l-4 border-green-500 p-4 shadow-sm">
                      <h3 class="font-semibold text-green-800 mb-2">🐳 Docker & Containers</h3>
                      <ul class="space-y-1 text-sm text-gray-700">
                        <li>☐ All containers running: <code>docker compose ps</code></li>
                        <li>☐ No containers in restart loop</li>
                        <li>☐ Nginx logs show no errors</li>
                        <li>☐ PostgreSQL started successfully</li>
                        <li>☐ Ports mapped correctly in docker-compose.yml</li>
                      </ul>
                    </div>

                    <div class="bg-white border-l-4 border-purple-500 p-4 shadow-sm">
                      <h3 class="font-semibold text-purple-800 mb-2">🔐 SSL & Certificates</h3>
                      <ul class="space-y-1 text-sm text-gray-700">
                        <li>☐ Nginx config doesn't reference non-existent certificates</li>
                        <li>☐ Certbot webroot path matches nginx config</li>
                        <li>☐ ACME challenge directory exists and is accessible</li>
                        <li>☐ Tested with staging server first</li>
                        <li>☐ Certificate files created in correct location</li>
                      </ul>
                    </div>

                    <div class="bg-white border-l-4 border-orange-500 p-4 shadow-sm">
                      <h3 class="font-semibold text-orange-800 mb-2">⚙️ Configuration</h3>
                      <ul class="space-y-1 text-sm text-gray-700">
                        <li>☐ Nginx syntax is valid: <code>docker compose exec nginx nginx -t</code></li>
                        <li>☐ Volume permissions are correct (PostgreSQL)</li>
                        <li>☐ Environment variables properly set</li>
                        <li>☐ No typos in domain names</li>
                        <li>☐ Entrypoint script has execute permissions</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="automation-scripts" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Automation Scripts</h2>
                  <h3 class="text-xl font-semibold mb-4">Complete Diagnostic Script</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.diagnosticScript)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="diagnosticScript"
                    ><code>#!/bin/bash

echo "=========================================="
echo "SSL Certificate Diagnostic Tool"
echo "=========================================="

# Check public IP
echo -e "\n1. Your Public IP:"
curl -s ifconfig.me
echo ""

# Check DNS
echo -e "\n2. DNS Records:"
for domain in yourdomain.com www.yourdomain.com; do
    echo "$domain → $(dig +short $domain)"
done

# Check firewall
echo -e "\n3. Firewall Status:"
if command -v ufw &> /dev/null; then
    sudo ufw status | grep -E "80|443"
else
    echo "UFW not installed"
fi

# Check ports
echo -e "\n4. Ports Listening:"
sudo ss -tlnp | grep -E ":(80|443)"

# Check Docker containers
echo -e "\n5. Docker Container Status:"
docker compose ps 2>/dev/null || docker ps

# Test webroot accessibility
echo -e "\n6. Creating Test File:"
docker compose exec nginx sh -c \
    'mkdir -p /var/www/certbot/.well-known/acme-challenge/ && \
     echo "test123" > /var/www/certbot/.well-known/acme-challenge/test.txt'

echo -e "\n7. Local Access Test:"
curl -s http://localhost/.well-known/acme-challenge/test.txt || echo "FAILED"

echo -e "\n8. Internet Access Test:"
curl -s --connect-timeout 5 http://yourdomain.com/.well-known/acme-challenge/test.txt || echo "FAILED"

echo -e "\n=========================================="
echo "Diagnosis Complete"
echo "=========================================="</code></pre>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">Deployment Script</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.deployScript)"
                      class="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>
                    <pre
                      class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                      ref="deployScript"
                    ><code>#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Stop existing containers
echo "📦 Stopping containers..."
docker compose down

# Fix PostgreSQL permissions
echo "🔧 Fixing PostgreSQL permissions..."
docker run --rm \
  -v $(pwd)/postgres_data:/data \
  -u root \
  alpine chown -R 999:999 /data

# Build and start
echo "🏗️  Building and starting containers..."
docker compose build nginx
docker compose up -d

# Wait for services
echo "⏳ Waiting for services to start..."
sleep 30

# Check status
echo "✅ Container status:"
docker compose ps

# Test port 80
echo "🔍 Testing port 80..."
if curl -s http://localhost/.well-known/acme-challenge/test.txt > /dev/null; then
    echo "✅ Port 80 is accessible"
else
    echo "❌ Port 80 test failed"
    exit 1
fi

# Get SSL certificate
echo "🔐 Obtaining SSL certificate..."
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your@email.com \
  --agree-tos \
  --no-eff-email \
  -d yourdomain.com \
  -d www.yourdomain.com

# Restart nginx
echo "🔄 Restarting nginx..."
docker compose restart nginx

echo "🎉 Deployment complete!"</code></pre>
                  </div>
                </section>

                <section id="best-practices" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Best Practices and Recommendations</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 class="text-lg font-semibold text-blue-800 mb-3">🛡️ Security</h3>
                      <ul class="text-sm text-blue-700 space-y-2">
                        <li>• Use strong TLS protocols (TLSv1.2+)</li>
                        <li>• Implement rate limiting in Nginx</li>
                        <li>• Keep Docker images updated</li>
                        <li>• Use secrets for sensitive data</li>
                        <li>• Enable HSTS headers</li>
                        <li>• Regular security audits</li>
                      </ul>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 class="text-lg font-semibold text-green-800 mb-3">⚡ Performance</h3>
                      <ul class="text-sm text-green-700 space-y-2">
                        <li>• Enable Nginx caching</li>
                        <li>• Use HTTP/2</li>
                        <li>• Compress responses with gzip</li>
                        <li>• Set appropriate client_max_body_size</li>
                        <li>• Configure connection pooling</li>
                        <li>• Monitor resource usage</li>
                      </ul>
                    </div>

                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h3 class="text-lg font-semibold text-purple-800 mb-3">📊 Monitoring</h3>
                      <ul class="text-sm text-purple-700 space-y-2">
                        <li>• Set up certificate expiration alerts</li>
                        <li>• Monitor container health</li>
                        <li>• Log aggregation and analysis</li>
                        <li>• Track SSL handshake times</li>
                        <li>• Monitor disk space for volumes</li>
                        <li>• Use health check endpoints</li>
                      </ul>
                    </div>

                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h3 class="text-lg font-semibold text-orange-800 mb-3">🔄 Maintenance</h3>
                      <ul class="text-sm text-orange-700 space-y-2">
                        <li>• Automate certificate renewal</li>
                        <li>• Regular backup of volumes</li>
                        <li>• Document configuration changes</li>
                        <li>• Test disaster recovery procedures</li>
                        <li>• Keep docker-compose.yml in version control</li>
                        <li>• Schedule regular system updates</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="common-errors" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Common Errors and Solutions</h2>
                  <div class="space-y-6">
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 class="text-lg font-semibold text-red-600 mb-3">
                        Error: "Connection refused"
                      </h3>
                      <p class="text-sm text-gray-700 mb-2"><strong>Cause:</strong> Port 80 not accessible from internet</p>
                      <p class="text-sm text-gray-700 mb-2"><strong>Solution:</strong></p>
                      <ul class="list-disc pl-6 text-sm text-gray-600 space-y-1">
                        <li>Check if nginx is running</li>
                        <li>Verify firewall rules</li>
                        <li>Check cloud security groups</li>
                        <li>Ensure DNS points to correct IP</li>
                      </ul>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 class="text-lg font-semibold text-red-600 mb-3">
                        Error: "cannot load certificate"
                      </h3>
                      <p class="text-sm text-gray-700 mb-2"><strong>Cause:</strong> Nginx trying to load non-existent SSL certificates</p>
                      <p class="text-sm text-gray-700 mb-2"><strong>Solution:</strong></p>
                      <ul class="list-disc pl-6 text-sm text-gray-600 space-y-1">
                        <li>Use smart entrypoint script</li>
                        <li>Comment out SSL config initially</li>
                        <li>Verify certificate paths</li>
                        <li>Check file permissions</li>
                      </ul>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 class="text-lg font-semibold text-red-600 mb-3">
                        Error: "too many certificates already issued"
                      </h3>
                      <p class="text-sm text-gray-700 mb-2"><strong>Cause:</strong> Hit Let's Encrypt rate limit (5 certs/week)</p>
                      <p class="text-sm text-gray-700 mb-2"><strong>Solution:</strong></p>
                      <ul class="list-disc pl-6 text-sm text-gray-600 space-y-1">
                        <li>Wait until rate limit resets</li>
                        <li>Use staging server for testing</li>
                        <li>Consider using different domain</li>
                        <li>Check for duplicate requests</li>
                      </ul>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 class="text-lg font-semibold text-red-600 mb-3">
                        Error: PostgreSQL "Permission denied"
                      </h3>
                      <p class="text-sm text-gray-700 mb-2"><strong>Cause:</strong> Incorrect volume permissions</p>
                      <p class="text-sm text-gray-700 mb-2"><strong>Solution:</strong></p>
                      <ul class="list-disc pl-6 text-sm text-gray-600 space-y-1">
                        <li>Fix with: <code>chown -R 999:999 volume-path</code></li>
                        <li>Or recreate the volume</li>
                        <li>Check PGDATA path in environment</li>
                        <li>Ensure volume is properly mounted</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="conclusion" class="mb-12">
                  <h2 class="text-2xl sm:text-3xl font-bold mb-6">Conclusion</h2>
                  <p class="text-lg leading-relaxed mb-4">
                    I have been working through the challenges of deploying Odoo with Nginx and SSL in Docker containers, and I wanted to share the solutions I've found to common pitfalls. Having said that, the issues I have faced could be different for others depending on their specific environment and configurations.
                  </p>
                  <p class="text-lg leading-relaxed mb-4">
                    Deploying containerized applications with proper SSL configuration doesn't have to be a nightmare. The key lessons from this troubleshooting journey are:
                  </p>
                  <ol class="list-decimal pl-6 mb-6 space-y-3 text-lg">
                    <li><strong>Start Simple:</strong> Always begin with HTTP-only configuration before adding SSL complexity</li>
                    <li><strong>Automate Wisely:</strong> Use smart entrypoint scripts that handle certificate detection automatically</li>
                    <li><strong>Test Thoroughly:</strong> Verify port accessibility and use Let's Encrypt staging before production</li>
                    <li><strong>Document Everything:</strong> Keep detailed notes of your configuration for future reference</li>
                    <li><strong>Monitor Continuously:</strong> Set up alerts for certificate expiration and service health</li>
                  </ol>
                  <p class="text-lg leading-relaxed mb-4">
                    By implementing the solutions presented in this guide, you'll have a robust, production-ready deployment that handles SSL certificates gracefully. The smart entrypoint script ensures that your application can start in HTTP mode when certificates don't exist, obtain them through Let's Encrypt, and automatically switch to HTTPS once available.
                  </p>
                  <div class="bg-green-50 border-l-4 border-green-400 p-4 my-6">
                    <p class="text-sm text-green-700">
                      <strong>Pro Tip:</strong> Save your working configuration in version control and create a deployment checklist. Future deployments will be much smoother when you have a proven process to follow.
                    </p>
                  </div>
                  <p class="text-lg leading-relaxed">
                    Remember: every error message is a learning opportunity. The troubleshooting skills you've gained from resolving these issues will serve you well in future DevOps challenges. Happy deploying! 🚀
                  </p>
                </section>
              </div>
            </div>
          </article>
        </div>
      </div>
    <!-- </div> -->
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
const checkPort = ref(null)
const dockerStatus = ref(null)
const dockerLogs = ref(null)
const postgresqlFix = ref(null)
const nginxHttpOnly = ref(null)
const entrypointScript = ref(null)
const dockerfile = ref(null)
const verifyAccess = ref(null)
const stagingCert = ref(null)
const prodCert = ref(null)
const restartNginx = ref(null)
const dockerCompose = ref(null)
const ufwConfig = ref(null)
const dnsCheck = ref(null)
const diagnosticScript = ref(null)
const deployScript = ref(null)

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
  // document.body.style.overflow = isMobileTocHidden.value ? 'auto' : 'hidden'
}

const closeMobileToc = () => {
  isMobileTocHidden.value = true
  // document.body.style.overflow = 'auto'
}

const copyCode = (preElement) => {
  if (preElement && preElement.querySelector('code')) {
    const code = preElement.querySelector('code').innerText
    navigator.clipboard
      .writeText(code)
      .then(() => {
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
  background-color: #000000;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-weight: 600;
  color: #ffffff;
}
pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
  background-color: #111827;
  color: #f3f4f6;
}
.copy-btn {
  transition: all 0.2s ease;
}
.copy-btn:hover {
  background-color: #4b5563;
}
</style>