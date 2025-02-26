
<template>
    <div class="card">
        <Paginator :rows=rows :totalRecords=totalRecords template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        @page="onPageChange" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"/>
    </div>
</template>

<script setup>
defineProps(['rows', 'totalRecords'])
const emit = defineEmits(['page'])

const onPageChange = (event) => {
    emit('page', event);
};
</script>
