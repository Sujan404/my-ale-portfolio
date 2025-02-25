<template>
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between">
        <Splitter class="mb-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <SplitterPanel class="flex flex-col items-center justify-center min-w-screen-md sm:p-6 xl:p-8">
                <fwb-input v-model="message" placeholder="edit me" label="Edit me" />
                <div class="flex justify-around">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose color</label>
                    <ColorPicker v-model="selectedColor" label="Choose color" />
                </div>
                
                <button @click="savePageAttributes"
                    class="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-700 focus:ring focus:ring-teal-100 text-white rounded-md text-lg tracking-wide">Save</button>
            </SplitterPanel>
            <SplitterPanel class="flex items-center justify-center p-4 sm:p-6 xl:p-8">

                <div class="w-full min-h-60">

                    <p ref="el" class="text-5xl! text-$vp-c-brand font-800" :style="{ color: '#' + selectedColor }"
                        v-tooltip.top="'I am testing'">
                        {{ message }}
                    </p>
                </div>
            </SplitterPanel>
        </Splitter>



    </div>
</template>
<script setup>
import { FwbInput } from 'flowbite-vue'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { SAVE_CUSTOMIZE_PAGE_ATTRIBUTES } from '@/mutations'
// import { userHideContentStore } from '@/stores/hideContentuser'
import { ref, watch } from 'vue'
import { apolloClient } from "@/apollo-config"; // Import Apollo Client

// const hideContentUser = userHideContentStore()
// hideContentUser.setHideContent(true)

const message = ref('I am animating the text')
const selectedColor = ref('#000000')

async function savePageAttributes() {
    await apolloClient.mutate({
        mutation: SAVE_CUSTOMIZE_PAGE_ATTRIBUTES,
        variables: {
            userId: 1,
            attributes: JSON.stringify({
                "class": "red",
                "style": "inline-block"
            })
        }
    })
}
</script>