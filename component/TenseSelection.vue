<template>
    <div class="w-full max-w-4xl mx-auto my-6 px-4 space-y-4">
        <!-- Parent Tenses (Primary Categories) -->
        <div>
            <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 text-center sm:text-left ml-1">Select Timeframe</h3>
            <div class="grid grid-cols-3 sm:flex sm:flex-wrap gap-1.5 sm:gap-2 p-1.5 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/5 shadow-inner">
                <button v-for="parent in ['Present', 'Past', 'Future']" :key="parent"
                    :class="[
                        'relative px-2 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ease-out whitespace-nowrap overflow-hidden text-ellipsis',
                        parent === selectedParent 
                            ? 'text-white shadow-md' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                    ]" 
                    @click="$emit('select-parent', parent)">
                    <!-- Active background pill -->
                    <div v-if="parent === selectedParent" 
                        class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl z-0" 
                        style="transform: scale(1); opacity: 1; transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)">
                    </div>
                    <!-- On mobile, don't show " Tense", just "Present"/"Past"/"Future" to save space -->
                    <span class="relative z-10"><span class="sm:hidden">{{ parent }}</span><span class="hidden sm:inline">{{ parent }} Tense</span></span>
                </button>
            </div>
        </div>

        <!-- Child Tenses (Specific Types) -->
        <div v-if="selectedParent && getChildTenses(selectedParent).length > 0">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 text-center sm:text-left ml-1 mt-4">Specific {{ selectedParent }} Tense (Optional)</h3>
            <div class="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2 p-1.5 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/5 w-full">
                <button 
                    :class="[
                        'px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-200 ease-out truncate max-w-[45%]',
                        !selectedChild 
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 border border-transparent'
                    ]"
                    @click="$emit('select-child', null)">
                    All Types
                </button>

                <button v-for="child in getChildTenses(selectedParent)" :key="child"
                    :class="[
                        'px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-200 ease-out truncate max-w-[48%]',
                        child === selectedChild 
                            ? 'bg-slate-700/80 text-white border border-slate-500/50 shadow-sm' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 border border-transparent'
                    ]" 
                    @click="$emit('select-child', child)">
                    {{ formatChildName(child, selectedParent) }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    tenses: Array,
    selectedParent: String,
    selectedChild: String
});

defineEmits(['select-parent', 'select-child']);

// Helper to filter raw tenses based on keyword (Past, Present, Future)
const getChildTenses = (parentCategory) => {
    if (!parentCategory) return [];
    return props.tenses.filter(t => t.toLowerCase().includes(parentCategory.toLowerCase()));
};

// Helper to strip out the obvious words so the pill isn't too long
// e.g., "Present Continuous Tense" -> "Continuous"
const formatChildName = (fullName, parentName) => {
    let name = fullName;
    name = name.replace(new RegExp(parentName, 'ig'), '').trim();
    name = name.replace(/Tense/ig, '').trim();
    
    // If we stripped everything, just return the name, but usually it works
    return name || fullName;
};
</script>