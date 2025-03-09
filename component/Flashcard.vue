<template>
    <div class="flex justify-center items-center " style="height:70h">
        <div class="relative w-96 h-48 bg-green-400 text-black shadow-lg rounded-lg flex items-center justify-center p-5 text-lg cursor-pointer"
            @click="flipCard">
            <transition name="fade">
                <p v-if="!flipped">{{ card.Hindi }}</p>
                <p v-else>{{ card.English }}</p>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    card: Object,
});

const flipped = ref(false);

const flipCard = () => {
    flipped.value = !flipped.value;
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>