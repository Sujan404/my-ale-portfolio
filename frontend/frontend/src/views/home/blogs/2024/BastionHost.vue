<template>
    <div>
        <Head>
            <title>Bastion Host Architecture</title>
            <meta name="og:description" content="Bastion Host Architecture">
            <meta name="og:keywords" content="Software Engineer, Docker, HTML, CSS, Python, Vue, JavaScript, Bastion Host Architecture">
        </Head>
        <div class="mb-3">
            <NavBar />
        </div>
        <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
            <h1 class="text-3xl">
                Bastion Host Architecture
            </h1>
            <p id="read-text">2024-10-30 | 2 min read</p>
            <div class="flex flex-wrap justify-center my-5">
                <img :src="imgUrl" class="text-center">
            </div>
            <h2 class="text-lg my-3">
                I have learnt about Bastion Host architecture even though it is outdated.
                The reason I learnt this architecture was to get my hand dirty with AWS.
                It was quite hectic and interesting journey to learn but it was fruitful at the end.
                I familarised all the questionable terminology I had in mind about AWS.
                In this article, I am writing brief description about what I have learnt.
            </h2>
            <ul>
                <li class="my-2">
                    <p>
                        ● <span class="font-bold"> Private Cloud (VPC)</span>: It is like a home network where Internet Service Providers
                        provide network. Same concept, where public cloud providers provide a isolated virtual
                        network.
                    </p>
                </li>
                <li class="my-2">
                    <p>● <span class="font-bold">Gateway</span>: It is the bridge between VPC (Virtual Private Cloud) and the internet. A
                        user will be only connected to a VPC resources via an internet gateway.
                        It supports IPv4 and IPv6.
                    </p>
                </li>
                <li class="my-2">
                    <p>
                        ● <span class="font-bold">Route Table</span>: Route table is a set of rules that determines where network traffic should be
                        directed. This table defines destination and target connections.
                    </p>
                </li>
                <li class="my-2">
                    <p>
                        ● <span class="font-bold">Subnet</span>: A subnet, or subnetwork, is a network inside network. VPC itself is a virtual
                        network and inside VPC, there can be other networks which is called subnets.
                        Based on above diagram, there are two types of subnets, private and public. If subnet is
                        connect to internet gateway via routes, then it is considered public subent as it is
                        connected to internet;
                        While a private subnet is hidden from outsiders which means is not connected to internet.
                    </p>
                </li>
                <li class="my-2">
                    <p>
                        ● <span class="font-bold">Load Balancer</span>: A load balancer enables distribution of network traffic dynamically across
                        resources. As show in above diagram, when load balancer distributes network to relevant
                        resources when a external user request a service.
                    </p>
                </li>
                <li class="my-2">
                    <p>
                        ● <span class="font-bold">NAT (Network Address Translation) Gateway</span>: The purpose of using NAT gateway is to initiate
                        a
                        internet connection outside to VPC from private subnet while remaining fully private.
                        For instance, git repo can be pulled to private subnet where private subnet initiate the
                        connection to internet. But external services cannot initiate a
                        connection with this instances. It is used only with IPv4 traffic.
                    </p>
                </li>
            </ul>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import imgUrl from "@/assets/images/2024/bastion.png";
import NavBar from "@/views/home/Navigation.vue";
import Footer from "@/views/home/Footer.vue";
import { Head } from '@unhead/vue/components'
</script>