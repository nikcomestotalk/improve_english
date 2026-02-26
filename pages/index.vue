<template>
    <div class="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <!-- Background decorative blobs -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] mix-blend-screen"></div>
            <div class="absolute bottom-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-purple-500/20 blur-[120px] mix-blend-screen"></div>
            <div class="absolute top-[30%] left-[20%] w-[20%] h-[20%] rounded-full bg-emerald-500/10 blur-[80px] mix-blend-screen"></div>
        </div>

        <UserStats />

        <div class="max-w-4xl mx-auto mt-16">
            <!-- Header Section -->
            <header class="text-center mb-12">
                <h1 class="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 tracking-tight mb-4 inline-block drop-shadow-sm">
                    Master English
                </h1>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto">Select a tense and difficulty below to start practicing with interactive flashcards.</p>
            </header>

            <!-- Selections -->
            <div class="space-y-8 mb-12">
                <TenseSelection :tenses="tenses" :selectedParent="selectedParentTense" :selectedChild="selectedChildTense" @select-parent="setParentTense" @select-child="setChildTense" />
                
                <!-- Formula and Info Cards -->
                <Transition name="fade-slide" mode="out-in">
                    <!-- Only show specific grammar definitions if a specific child tense is selected -->
                    <div v-if="selectedChildTense" :key="selectedChildTense" class="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden relative group">
                        <!-- Decorative subtle gradient in the box -->
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div class="relative z-10 flex flex-col md:flex-row gap-8">
                            <!-- Definition & Formula -->
                            <div class="flex-1 space-y-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                                <div class="flex items-center gap-2 mb-2">
                                    <div class="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                                    </div>
                                    <h3 class="text-lg font-semibold text-slate-200">Usage & Formula</h3>
                                </div>
                                <p class="text-slate-400 leading-relaxed text-sm">
                                    <template v-if="selectedChildTense == 'Present Simple'">Used for general facts, habits, and routines.</template>
                                    <template v-else-if="selectedChildTense == 'Present Continous'">Used for actions happening right now or ongoing actions.</template>
                                    <template v-else-if="selectedChildTense == 'Present Perfect'">Used for actions completed recently or experiences.</template>
                                    <template v-else-if="selectedChildTense == 'Present Perfect Continous'">Used for actions that started in the past and are still continuing.</template>
                                    <template v-else-if="selectedChildTense == 'Past Perfect Continuous Tense'">Used for actions that were ongoing in the past and continued up to another point in the past.</template>
                                    <template v-else-if="selectedChildTense == 'Past Perfect Tense'">Used for actions that were completed before another action in the past.</template>
                                    <template v-else-if="selectedChildTense == 'Past Continuous Tense'">Used for actions that were ongoing in the past.</template>
                                    <template v-else-if="selectedChildTense == 'Simple Past Tense'">Used for actions that were completed in the past.</template>
                                    <template v-else-if="selectedChildTense == 'Future Simple Tense'">Used for actions that will happen in the future.</template>
                                    <template v-else-if="selectedChildTense == 'Future Continuous Tense'">Used for actions that will be ongoing in the future.</template>
                                    <template v-else-if="selectedChildTense == 'Future Perfect Tense'">Used for actions that will be completed before a certain time in the future.</template>
                                    <template v-else-if="selectedChildTense == 'Future Perfect Continuous Tense'">Used for actions that will be ongoing up to a certain point in the future.</template>
                                </p>
                                
                                <div class="bg-indigo-950/40 border border-indigo-500/20 rounded-lg p-3 font-mono text-xs sm:text-sm text-indigo-200 mt-4 overflow-x-auto shadow-inner">
                                    <template v-if="selectedChildTense == 'Present Simple'">Subject + V1 (Base form) + (s/es) + Object</template>
                                    <template v-else-if="selectedChildTense == 'Present Continous'">Subject + is/am/are + V1 + ing + Object</template>
                                    <template v-else-if="selectedChildTense == 'Present Perfect'">Subject + has/have + V3 (Past Participle) + Object</template>
                                    <template v-else-if="selectedChildTense == 'Present Perfect Continous'">Subject + has/have been + V1 + ing + Object + since/for</template>
                                    <template v-else-if="selectedChildTense == 'Past Perfect Continuous Tense'">Subject + had + been + Verb(ing) + Object</template>
                                    <template v-else-if="selectedChildTense == 'Past Perfect Tense'">Subject + had + Verb(Past Participle) + Object</template>
                                    <template v-else-if="selectedChildTense == 'Past Continuous Tense'">Subject + was/were + Verb(ing) + Object</template>
                                    <template v-else-if="selectedChildTense == 'Simple Past Tense'">Subject + Verb(Past Form) + Object</template>
                                    <template v-else-if="selectedChildTense == 'Future Simple Tense'">Subject + will/shall + V1 (Base form) + Object</template>
                                    <template v-else-if="selectedChildTense == 'Future Continuous Tense'">Subject + will/shall be + V1 + ing + Object</template>
                                    <template v-else-if="selectedChildTense == 'Future Perfect Tense'">Subject + will/shall have + V3 (Past Participle) + Object</template>
                                    <template v-else-if="selectedChildTense == 'Future Perfect Continuous Tense'">Subject + will/shall have been + V1 + ing + Object + since/for</template>
                                </div>
                            </div>

                            <!-- Examples -->
                            <div class="flex-1 space-y-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    </div>
                                    <h3 class="text-lg font-semibold text-slate-200">Examples</h3>
                                </div>
                                <div class="space-y-3">
                                    <template v-if="selectedChildTense == 'Present Simple'">
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">वह हर दिन स्कूल जाता है।</span> <span class="text-emerald-300 font-medium">He goes to school every day.</span></div>
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">मैं क्रिकेट खेलता हूँ।</span> <span class="text-emerald-300 font-medium">I play cricket.</span></div>
                                    </template>
                                    <template v-else-if="selectedChildTense == 'Present Continous'">
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">वह अभी पढ़ रहा है।</span> <span class="text-emerald-300 font-medium">He is studying now.</span></div>
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">वे फुटबॉल खेल रहे हैं।</span> <span class="text-emerald-300 font-medium">They are playing football.</span></div>
                                    </template>
                                    <template v-else-if="selectedChildTense == 'Present Perfect'">
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">मैंने खाना खा लिया है।</span> <span class="text-emerald-300 font-medium">I have eaten the food.</span></div>
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">उसने अपनी किताबें बेच दी हैं।</span> <span class="text-emerald-300 font-medium">He has sold his books.</span></div>
                                    </template>
                                    <template v-else-if="selectedChildTense == 'Present Perfect Continous'">
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">वह दो घंटे से गिटार बजा रहा है।</span> <span class="text-emerald-300 font-medium">He has been playing the guitar for two hours.</span></div>
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">हम सुबह से काम कर रहे हैं।</span> <span class="text-emerald-300 font-medium">We have been working since morning.</span></div>
                                    </template>
                                    <template v-else-if="selectedChildTense == 'Future Simple Tense'">
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">मैं कल बाज़ार जाऊंगा।</span> <span class="text-emerald-300 font-medium">I will go to the market tomorrow.</span></div>
                                    </template>
                                    <template v-else-if="selectedChildTense == 'Future Continuous Tense'">
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">जब तुम आओगे, मैं सो रहा होऊंगा।</span> <span class="text-emerald-300 font-medium">I will be sleeping when you arrive.</span></div>
                                    </template>
                                    <template v-else-if="selectedChildTense == 'Future Perfect Tense'">
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">मैं रात 8 बजे तक अपना होमवर्क पूरा कर चुका होऊंगा।</span> <span class="text-emerald-300 font-medium">I will have completed my homework by 8 PM.</span></div>
                                    </template>
                                    <template v-else-if="selectedChildTense == 'Future Perfect Continuous Tense'">
                                        <div class="bg-black/20 rounded-lg p-3 text-sm border border-white/5"><span class="text-slate-400 block mb-1">अगले महीने मुझे यहां रहते हुए 5 साल हो चुके होंगे।</span> <span class="text-emerald-300 font-medium">I will have been living here for 5 years by next month.</span></div>
                                    </template>
                                    <!-- Fallback for other tenses without explicit examples -->
                                    <template v-else>
                                        <div class="h-full flex items-center justify-center text-slate-500 text-sm italic py-4">
                                            Select cards below to see examples.
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>

                <!-- Show difficulty selection only if a parent is selected -->
                <DifficultySelection v-if="selectedParentTense" :levels="['Easy', 'Medium', 'Hard']" @select-difficulty="setDifficulty" :selectDifficulty="selectedDifficulty" />
            </div>

            <!-- Flashcard Area -->
            <Transition name="fade-slide" mode="out-in">
                <div v-if="currentCard" class="mt-8 mb-16">
                    <Flashcard :card="currentCard" :key="currentCard.Hindi" />
                    
                    <!-- Controls -->
                    <div class="flex justify-center items-center gap-6 mt-12 w-full max-w-md mx-auto">
                        <button v-if="cards.length > 1" @click="randomCard" class="group flex items-center justify-center gap-2 px-6 py-3.5 w-40 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all duration-300 border border-slate-600 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-180 transition-transform duration-500"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
                            Random
                        </button>
                        
                        <button v-if="cards.length > 1" @click="nextCard" class="group flex items-center justify-center gap-2 px-6 py-3.5 w-40 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-95 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform duration-300"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </div>

                    <!-- Progress Indicator -->
                    <div v-if="cards.length > 0" class="mt-8 text-center text-slate-500 text-sm font-medium">
                        Card {{ currentIndex + 1 }} of {{ cards.length }}
                    </div>
                </div>
            </Transition>
            
            <!-- Empty State -->
            <div v-if="!selectedParentTense && !currentCard" class="text-center py-20 px-4 border border-dashed border-slate-700 rounded-2xl bg-slate-800/20">
                <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <h3 class="text-lg font-medium text-slate-300 mb-2">Ready to learn?</h3>
                <p class="text-slate-500 max-w-sm mx-auto">Select a timeframe from above to load your first set of flashcards.</p>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useHead, useSeoMeta, useFetch } from '#app';
// Removed client-side excelReader as server now handles it
import TenseSelection from '@/component/TenseSelection.vue';
import DifficultySelection from '@/component/DifficultySelection.vue';
import Flashcard from '@/component/Flashcard.vue';
import UserStats from '@/component/UserStats.vue';
import { useGamification } from '@/composables/useGamification';

const { addXP } = useGamification();

const tenses = ref([]);
const selectedParentTense = ref('Present');
const selectedChildTense = ref(null);

const selectedDifficulty = ref(null);
const cards = ref([]);
const currentIndex = ref(0);

// Fetch data Server-Side
const { data: excelData } = await useFetch('/api/tenses');

// Global SEO Metadata
useHead({
  htmlAttrs: { lang: 'en' }
});

useSeoMeta({
  title: 'Master English Tenses | Interactive Grammar Flashcards',
  ogTitle: 'Master English Tenses | Interactive Grammar Flashcards',
  description: 'Boost your fluency with interactive, gamified English grammar flashcards. Master past, present, and future tenses easily with Hindi translations.',
  ogDescription: 'Boost your fluency with interactive, gamified English grammar flashcards. Master past, present, and future tenses easily with Hindi translations.',
  twitterCard: 'summary_large_image',
});

// Reactively set tenses keys based on fetched data
// and trigger an initial card load so SSR renders Present tense HTML
watch(() => excelData.value, (newData) => {
    if (newData) {
        tenses.value = Object.keys(newData);
        loadCards();
    }
}, { immediate: true });

onMounted(() => {
    updateTensesFromStorage();
});

const updateTensesFromStorage = () => {
    var isParentSet = localStoragegetItem('parentTense');
    var isChildSet = localStoragegetItem('childTense');
    var isDifficulty = localStoragegetItem("difficulty");
    var cardIndex = localStoragegetItem("cardindex");
    
    let needsReload = false;
    
    // Only update if it's explicitly saved and different
    if (isParentSet !== null && isParentSet !== "") {
        selectedParentTense.value = isParentSet;
        needsReload = true;
    }
    
    if (isChildSet !== null && isChildSet !== "" && isChildSet !== "null") {
        selectedChildTense.value = isChildSet;
        needsReload = true;
    }
    
    if (isDifficulty !== null && isDifficulty !== "") {
        selectedDifficulty.value = isDifficulty;
        needsReload = true;
    }
    
    if (cardIndex !== null && cardIndex !== "" && cardIndex !== "0") {
        currentIndex.value = parseInt(cardIndex);
    }
    
    if (needsReload) {
        loadCards();
    }
}

const setParentTense = (parent) => {
    selectedParentTense.value = parent;
    localStoragesetItem("parentTense", parent);
    // When changing parent, reset child & reload cards immediately
    selectedChildTense.value = null;
    localStoragesetItem("childTense", null);
    selectedDifficulty.value = null;
    localStoragesetItem("difficulty", null);
    currentIndex.value = 0;
    
    loadCards();
};

const setChildTense = (child) => {
    selectedChildTense.value = child;
    localStoragesetItem("childTense", child);
    localStoragesetItem("difficulty", null);
    selectedDifficulty.value = null;
    currentIndex.value = 0;
    loadCards();
};

const setDifficulty = (difficulty) => {
    selectedDifficulty.value = difficulty;
    localStoragesetItem("difficulty", difficulty);
    currentIndex.value = 0;
    loadCards();
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function loadCards() {
    const data = excelData.value;
    if (!data) return;
    
    // Clear old cards first
    cards.value = [];
    
    if (selectedParentTense.value != null) {
        let pool = [];
        
        if (selectedChildTense.value != null && data[selectedChildTense.value]) {
            // Only from specific child
            pool = [...data[selectedChildTense.value]];
        } else {
            // Aggregate from all children of the parent
            const matchingTenses = tenses.value.filter(t => t.toLowerCase().includes(selectedParentTense.value.toLowerCase()));
            matchingTenses.forEach(t => {
                if (data[t]) {
                    pool = pool.concat(data[t]);
                }
            });
            // Shuffle so we get sentences mixed evenly from different tenses
            pool = shuffleArray(pool);
        }

        if (selectedDifficulty.value != null) {
            cards.value = pool.filter(item => item.Type && item.Type.toLowerCase() === selectedDifficulty.value.toLowerCase());
        } else {
            cards.value = pool;
        }
    }
};

const currentCard = computed(() => cards.value[currentIndex.value] || null);

const nextCard = () => {
    if (currentIndex.value < cards.value.length - 1) {
        currentIndex.value++;
    } else {
        currentIndex.value = 0;
    }
    localStoragesetItem("cardindex", currentIndex.value);
    addXP(10);
};

const randomCard = () => {
    currentIndex.value = Math.floor(Math.random() * cards.value.length);
    localStoragesetItem("cardindex", currentIndex.value);
    addXP(10);
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

<style scoped>
/* Vue Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>