<template>
    <div class="flex flex-wrap gap-2 p-1 text-sm">
        <button v-for="tense in tenses" :key="tense"
            :class="{ 'bg-black': tense == selectedTense, 'bg-blue-500': tense != selectedTense }"
            class=" text-white p-3 rounded-lg" @click="$emit('select-tense', tense)">
            {{ tense }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    tenses: Array,
    selectedTense: String
});

</script>