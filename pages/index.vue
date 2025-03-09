<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold text-center">Select a Tense</h1>
        <TenseSelection :tenses="tenses" :selectedTense="selectedTense" @select-tense="setTense" />

        <div v-if="selectedTense">
            <h2 class="text-xl font-semibold text-center">Select Difficulty</h2>
            <DifficultySelection :levels="['Easy', 'Medium', 'Hard']" @select-difficulty="setDifficulty"
                :selectDifficulty="selectedDifficulty" />
        </div>

        <div v-if="selectedDifficulty">
            <Flashcard v-if="currentCard" :card="currentCard" />
            <button v-if="cards.length > 1" class="mt-4 bg-purple-500 text-white p-2 rounded-lg"
                @click="nextCard">Next</button>
            <div style='width:100px'></div><button v-if="cards.length > 1"
                class="mt-4 bg-purple-500 text-white p-2 rounded-lg" @click="nextCard">Random</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from '#app';
import { readExcel } from '~/utils/excelReader';
import TenseSelection from '@/component/TenseSelection.vue';
import DifficultySelection from '@/component/DifficultySelection.vue';
import Flashcard from '@/component/Flashcard.vue';
const tenses = ref([]);
const selectedTense = ref(null);
const selectedDifficulty = ref(null);
const cards = ref([]);
const currentIndex = ref(0);

const config = useRuntimeConfig();

onMounted(async () => {
    console.log(config.public.excelFilePath)
    const data = await readExcel(config.public.excelFilePath);
    console.log("IAM HERE ");
    tenses.value = Object.keys(data);
    updateTensesFromStorage();
});

const updateTensesFromStorage = () => {
    var isTenseSet = localStoragegetItem('tense') ?? null;
    var isDifficulty = localStoragegetItem("difficulty") ?? null;
    var cardIndex = localStoragegetItem("cardindex") ?? 0;
    if (isTenseSet != null || isTenseSet != "") {
        setTense(isTenseSet);
        if (isDifficulty != null || isDifficulty != "") {
            setDifficulty(isDifficulty);
        }
        if (cardIndex != null || cardIndex != "" || cardIndex != 0) {
            currentIndex.value = cardIndex;
        }

    }
}
const setTense = (tense) => {
    selectedTense.value = tense;
    localStoragesetItem("tense", tense);
    localStoragesetItem("difficulty", null);
    selectedDifficulty.value = null;
};

const setDifficulty = (difficulty) => {
    selectedDifficulty.value = difficulty;
    localStoragesetItem("difficulty", difficulty);
    currentIndex.value = 0;
    loadCards();
};

const loadCards = async () => {

    const data = await readExcel(config.public.excelFilePath);
    cards.value = data[selectedTense.value].filter(item => item.Type.toLowerCase() === selectedDifficulty.value.toLowerCase());

};

const currentCard = computed(() => cards.value[currentIndex.value]);

const nextCard = () => {

    if (currentIndex.value < cards.value.length - 1) {
        currentIndex.value++;
    } else {
        currentIndex.value = 0;
    }
    localStoragesetItem("cardindex", currentIndex.value);
};
const randomCard = () => {
    currentIndex.value = Math.floor(Math.random() * cards.value.length);
};
const localStoragegetItem = (vars) => {
    if (process.client) {
        return localStorage.getItem(vars);
    }
    return null;
};
const localStoragesetItem = (vars, vals) => {
    if (process.client) {
        return localStorage.setItem(vars, vals);
    }
    return null;
};
</script>