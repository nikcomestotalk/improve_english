<template>
    <div class="flex justify-center items-center h-[50vh] w-full max-w-2xl mx-auto px-4 cursor-pointer group" @click="flipCard">
        <div class="relative w-full h-full perspective-1000">
            <div :class="['flip-card w-full h-full absolute inset-0', { 'is-flipped': flipped }]">
                
                <!-- Front of the card (Hindi) -->
                <div class="flip-card-face flip-card-front bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl shadow-indigo-500/30 flex justify-center items-center text-white p-8 border border-white/10 overflow-hidden">
                    <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div class="absolute top-0 right-0 p-6 mix-blend-overlay opacity-30">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/></svg>
                    </div>
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center z-10 leading-tight tracking-tight drop-shadow-md">
                        {{ card.Hindi }}
                    </h2>
                </div>
                
                <!-- Back of the card (English) -->
                <div class="flip-card-face flip-card-back bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl shadow-2xl shadow-teal-500/30 flex flex-col justify-center items-center text-white p-8 border border-white/10 overflow-hidden">
                    <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    
                    <div class="flex-grow flex items-center justify-center z-10 w-full mb-8">
                        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-tight tracking-tight drop-shadow-md">
                            {{ card.English }}
                        </h2>
                    </div>

                    <div class="w-full relative z-10">
                        <div class="w-full h-px bg-white/20 mb-4 rounded-full"></div>
                        <div class="bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                            <div class="flex items-start gap-3">
                                <div class="mt-1 bg-white/20 p-1.5 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                                </div>
                                <div>
                                    <span class="text-xs font-semibold uppercase tracking-wider text-emerald-100/80 block mb-1">Explanation</span>
                                    <p class="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
                                        {{ card.Explanation }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Hover helper hint -->
            <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 text-slate-400 text-sm font-medium tracking-wide flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3"></path><path d="M18.36 5.64l-2.12 2.12"></path><path d="M21 12h-3"></path><path d="M18.36 18.36l-2.12-2.12"></path><path d="M12 21v-3"></path><path d="M5.64 18.36l2.12-2.12"></path><path d="M3 12h3"></path><path d="M5.64 5.64l2.12 2.12"></path></svg>
                Click to flip
            </div>
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

<style scoped>
.perspective-1000 {
    perspective: 1500px;
}

.flip-card {
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
}

.flip-card.is-flipped {
    transform: rotateY(180deg);
}

.flip-card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}

.flip-card-back {
    transform: rotateY(180deg);
}
</style>
