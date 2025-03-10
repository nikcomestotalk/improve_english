<template>
    <div class="flex justify-center items-center" style="height:40vh">
        <div class="relative perspective-1000 w-full h-full">
            <div :class="['flip-card', { 'rotate-y-180': flipped }]"
                class="w-full h-full transform-style-preserve-3d transition-transform duration-700">
                <!-- Front of the card (Hindi) -->
                <div id="front"
                    class="flip-card-front absolute w-full h-full bg-blue-500 flex justify-center items-center text-white text-xl font-semibold rounded-lg shadow-lg p-2"
                    @click="flipCard">
                    {{ card.Hindi }}
                </div>
                <!-- Back of the card (English) -->
                <div id="back"
                    class="flip-card-back absolute w-full h-full bg-green-500 flex justify-center items-center text-white text-xl font-semibold rounded-lg shadow-lg  transform rotate-y-180 backface-hidden p-2"
                    style="flex-direction: column;" @click="flipCard">
                    {{ card.English }} <BR /><BR /><BR /><BR />
                    <div class=" text-sm text-black italic w-full bottom-0"> {{ card.Explanation
                        }}</div>
                </div>
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
<script>
function flipCards() {
    // Toggle the 'flipped' class on the card container
    const flipCard = document.getElementById('flipCard');
    flipCard.classList.toggle('rotate-y-180');
}
</script>

<style>
/* Flip card container with 3D effect */
.flip-card {
    transition: transform 0.7s ease-in-out;
    transform-style: preserve-3d;
}

/* Make both front and back hidden when flipped */
.flip-card-front,
.flip-card-back {
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* The back side of the card */
.flip-card-back {
    transform: rotateY(180deg);
}

/* Applied when the card is flipped */
.rotate-y-180 {
    transform: rotateY(180deg);
}

/* Hide backface on both front and back */
.backface-hidden {
    backface-visibility: hidden;
}
</style>
