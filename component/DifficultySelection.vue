<template>
    <div class="flex justify-center mt-8 mb-4">
        <div class="inline-flex p-1 space-x-1 bg-slate-800/70 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-inner">
            <button v-for="level in levels" :key="level" 
                @click="$emit('select-difficulty', level)"
                :class="[
                    'px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ease-out',
                    level === selectDifficulty 
                        ? level === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                        : level === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-sm'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 border border-transparent'
                ]">
                <div class="flex items-center gap-2">
                    <div v-if="level === selectDifficulty" class="w-1.5 h-1.5 rounded-full" :class="[
                        level === 'Easy' ? 'bg-emerald-400' : level === 'Medium' ? 'bg-amber-400' : 'bg-rose-400'
                    ]"></div>
                    {{ level }}
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    levels: Array,
    selectDifficulty: String
});
</script>