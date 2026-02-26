<template>
    <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <div class="bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-3 flex items-center justify-between gap-4">
            
            <!-- Streak Section -->
            <div class="flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-500/20 shadow-inner">
                <span class="text-xl drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">🔥</span>
                <div>
                    <div class="text-[10px] font-bold uppercase tracking-wider text-orange-400">Streak</div>
                    <div class="text-sm font-bold text-orange-200 leading-none">{{ streak }} Days</div>
                </div>
            </div>

            <!-- Level & XP Progress Section -->
            <div class="flex-grow max-w-md">
                <div class="flex justify-between items-end mb-1 px-1">
                    <div class="flex items-center gap-1.5">
                        <div class="bg-indigo-500/20 text-indigo-300 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ring-1 ring-indigo-500/30">
                            {{ level }}
                        </div>
                        <span class="text-xs font-semibold text-indigo-300 uppercase tracking-wide">Level</span>
                    </div>
                    <div class="text-[10px] font-medium text-slate-400">
                        {{ Math.round(progressInfo.progressXP) }} / {{ Math.round(progressInfo.requiredXP) }} XP
                    </div>
                </div>
                
                <!-- Progress Bar -->
                <div class="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner flex relative border border-white/5">
                    <div class="absolute inset-0 bg-slate-800/50 backdrop-blur-sm z-0"></div>
                    <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 ease-out relative z-10" :style="`width: ${progressInfo.percentage}%`">
                        <div class="absolute inset-0 bg-white/20 w-full h-full" style="background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent); background-size: 1rem 1rem;"></div>
                    </div>
                </div>
            </div>

            <!-- Total XP -->
            <div class="flex items-center gap-2 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/20 shadow-inner">
                <span class="text-lg drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">✨</span>
                <div>
                    <div class="text-[10px] font-bold uppercase tracking-wider text-purple-400">Total</div>
                    <div class="text-sm font-bold text-purple-200 leading-none">{{ xp }} XP</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGamification } from '@/composables/useGamification';

const { xp, level, streak, getXPProgress } = useGamification();

// Recalculate progress info whenever XP changes
const progressInfo = computed(() => getXPProgress());
</script>
