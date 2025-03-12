<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold text-center">Select a Tense</h1>
        <TenseSelection :tenses="tenses" :selectedTense="selectedTense" @select-tense="setTense" />

        <div>
            <div v-if="selectedTense == 'Present Simple'">
                Used for general facts, habits, and routines.
                Formula: Subject + V1 (Base form) + (s/es for he/she/it) + Object
                Examples:
                वह हर दिन स्कूल जाता है। → He goes to school every day.
                मैं क्रिकेट खेलता हूँ। → I play cricket.
            </div>
            <div v-if="selectedTense == 'Present Continous'">
                Used for actions happening right now or ongoing actions.
                Formula: Subject + is/am/are + V1 + ing + Object
                Examples:
                वह अभी पढ़ रहा है। → He is studying now.
                वे फुटबॉल खेल रहे हैं। → They are playing football.
            </div>
            <div v-if="selectedTense == 'Present Perfect'">
                Used for actions completed recently or experiences.
                Formula: Subject + has/have + V3 (Past Participle) + Object
                Examples:
                मैंने खाना खा लिया है। → I have eaten the food.
                उसने अपनी किताबें बेच दी हैं। → He has sold his books.
            </div>
            <div v-if="selectedTense == 'Present Perfect Continous'">
                Used for actions that started in the past and are still continuing.
                Formula: Subject + has/have been + V1 + ing + Object + since/for
                Examples:
                वह दो घंटे से गिटार बजा रहा है। → He has been playing the guitar for two hours.
                हम सुबह से काम कर रहे हैं। → We have been working since morning.
            </div>
            <h2 class="text-xl font-semibold text-center">Select Difficulty</h2>
            <DifficultySelection :levels="['Easy', 'Medium', 'Hard']" @select-difficulty="setDifficulty"
                :selectDifficulty="selectedDifficulty" />
        </div>

        <div>
            <Flashcard v-if="currentCard" :card="currentCard" />
            <div class="flex justify-evenly"><button v-if="cards.length > 1"
                    class="mt-4 bg-purple-500 text-white p-2 rounded-lg w-36" @click="nextCard">Next</button>
                <div style='width:100px'></div><button v-if="cards.length > 1"
                    class="mt-4 bg-purple-500 text-white p-2 rounded-lg w-36" @click="nextCard">Random</button>
            </div>
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
    loadCards();
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
    loadCards();
};

const setDifficulty = (difficulty) => {
    selectedDifficulty.value = difficulty;
    localStoragesetItem("difficulty", difficulty);
    currentIndex.value = 0;
    loadCards();
};


const loadCards = async () => {

    const data = await readExcel(config.public.excelFilePath);
    for (var key in data) {
        data[key].forEach(row => {
            cards.value = row;
        });
    }
    if (selectedTense.value != null) {
        if (selectedDifficulty.value != null) {
            cards.value = data[selectedTense.value].filter(item => item.Type.toLowerCase() === selectedDifficulty.value.toLowerCase());
        } else {
            cards.value = data[selectedTense.value];
        }
    }
    //cards.value = data[selectedTense.value].filter(item => item.Type.toLowerCase() === selectedDifficulty.value.toLowerCase());

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