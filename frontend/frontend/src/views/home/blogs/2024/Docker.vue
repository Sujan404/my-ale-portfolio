<template>
    <div>
        <Head>
            <title>Docker</title>
            <meta name="og:description" content="Why is Docker so popular?">
            <meta name="og:keywords" content="Software Engineer, Docker, HTML, CSS, Python, Vue, JavaScript, Bastion Host Architecture">
        </Head>
        <div class="mb-3">
            <NavBar />
        </div>
        <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
            <h1 class="text-3xl">
                Why is docker so popular?
            </h1>
            <p id="read-text">2024-10-29 | 2 min read</p>
            <div class="flex flex-wrap justify-center my-5">
                <img :src="imgUrl" class="text-center">
            </div>
            <h2 class="text-lg my-3">
                Docker is a service that bundles all the dependencies required in a container. As web had evolved from a plain black and white to colorful multifunctional
                application, it requires heaps of external pacakages and services. Lets compare a car that used be 20 years back and now. We can feel and see cars how beautiful, comfortable,
                reliable and functional they are now. Big companies do not solely depend on theirselves to produce a car, they partnered with many other small or big companies to produce such
                cars that comforts users. Same scenario is for web development. If you build a website soley depend on a plain javascript, it won't create a immense emotional and physical connection
                to application. Nowadays, developers use many external packages and services that someone already built and integrate them that saves time, budget and kick out unnecessay 
                burden we are holding.
            </h2>

            <h2 class="text-lg my-3">
                I remembered my senior software engineer, had once said "Don't invent wheel, build on top of it". Due to heavily depending on other external sources, it created burden to operate
                 the application. To mitigate issues that arise, docker has came to in introduction which is built by Goolge. Docker accumulates all the required resources like codes, external
                 dependencies packages, server, databases and many others and bundle in a container that increases the pace of development, testing, and deployment. If someone shares me his project, then
                I have to go through all the configurations and procedures to run the application, that consume time and effort. Instead if he shares the docker image to me, the time duration 
                is reduced by more than half.
            </h2>
        
        </div>
        <Footer />
    </div>
</template>

<script setup>
import imgUrl from "@/assets/images/2024/docker.png";
import NavBar from "@/views/home/Navigation.vue";
import Footer from "@/views/home/Footer.vue";
import { Head } from '@unhead/vue/components'
</script>