<template>
    <div class="flex justify-center gap-4 p-4">
        <button v-for="level in levels" :key="level" class=" text-white p-3 rounded-lg"
            @click="$emit('select-difficulty', level)"
            :class="{ 'bg-black': level == selectDifficulty, 'bg-green-500': level != selectDifficulty }">
            {{ level }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    levels: Array,
    selectDifficulty: String
});
</script>