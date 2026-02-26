import { ref, watch, onMounted } from 'vue';
import confetti from 'canvas-confetti';

export function useGamification() {
    const xp = ref(0);
    const level = ref(1);
    const streak = ref(0);
    const lastActiveDate = ref(null);

    // XP thresholds for levels 1-10, can formulaically calculate beyond 10
    // Level 1: 0 XP
    // Level 2: 100 XP
    // Level 3: 250 XP
    // Level 4: 450 XP
    // Level 5: 700 XP, etc.
    const xpThresholds = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];

    // Load from Local Storage on mount (client-side only)
    onMounted(() => {
        if (process.client) {
            const savedData = localStorage.getItem('gamification_data');
            if (savedData) {
                try {
                    const parsed = JSON.parse(savedData);
                    xp.value = parsed.xp || 0;
                    level.value = parsed.level || 1;
                    streak.value = parsed.streak || 0;
                    lastActiveDate.value = parsed.lastActiveDate || null;
                } catch (e) {
                    console.error("Error parsing gamification data", e);
                }
            }
            checkStreak();
        }
    });

    // Save state whenever it changes
    watch([xp, level, streak, lastActiveDate], () => {
        if (process.client) {
            localStorage.setItem('gamification_data', JSON.stringify({
                xp: xp.value,
                level: level.value,
                streak: streak.value,
                lastActiveDate: lastActiveDate.value
            }));
        }
    }, { deep: true });

    const checkStreak = () => {
        const todayStr = new Date().toDateString();

        if (!lastActiveDate.value) {
            // First time active
            lastActiveDate.value = todayStr;
            streak.value = 1;
            return;
        }

        if (lastActiveDate.value === todayStr) {
            // Already active today, do nothing
            return;
        }

        // Check if yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastActiveDate.value === yesterday.toDateString()) {
            // Active yesterday, increment streak
            streak.value += 1;
            lastActiveDate.value = todayStr;
            triggerStreakAnimation();
        } else {
            // Missed a day or more, reset streak
            streak.value = 1;
            lastActiveDate.value = todayStr;
        }
    };

    const addXP = (amount) => {
        xp.value += amount;

        // Check for level up
        let newLevel = 1;
        for (let i = 0; i < xpThresholds.length; i++) {
            if (xp.value >= xpThresholds[i]) {
                newLevel = i + 1;
            } else {
                break;
            }
        }

        // If beyond standard array, formulate
        if (xp.value >= xpThresholds[xpThresholds.length - 1]) {
            // Simple linear curve for extreme levels
            newLevel = xpThresholds.length + Math.floor((xp.value - xpThresholds[xpThresholds.length - 1]) / 600);
        }

        if (newLevel > level.value) {
            level.value = newLevel;
            triggerLevelUpAnimation();
        }
    };

    const triggerLevelUpAnimation = () => {
        if (process.client) {
            const duration = 3000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#8b5cf6', '#10b981', '#f59e0b']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#8b5cf6', '#10b981', '#f59e0b']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    };

    const triggerStreakAnimation = () => {
        if (process.client) {
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.1 },
                colors: ['#f97316', '#ef4444', '#eab308'] // Fire colors
            });
        }
    };

    // Calculate progress to next level
    const getXPProgress = () => {
        let currentLevelBaseXP = 0;
        let nextLevelXP = 100;

        if (level.value <= xpThresholds.length - 1) {
            currentLevelBaseXP = xpThresholds[level.value - 1];
            nextLevelXP = xpThresholds[level.value];
        } else {
            // Fallback for extreme levels
            currentLevelBaseXP = xpThresholds[xpThresholds.length - 1] + ((level.value - xpThresholds.length) * 600);
            nextLevelXP = currentLevelBaseXP + 600;
        }

        const xpInCurrentLevel = xp.value - currentLevelBaseXP;
        const xpNeededForLevel = nextLevelXP - currentLevelBaseXP;
        const percentage = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForLevel) * 100));

        return {
            currentXP: xp.value,
            progressXP: xpInCurrentLevel,
            requiredXP: xpNeededForLevel,
            percentage
        };
    };

    return {
        xp,
        level,
        streak,
        addXP,
        checkStreak,
        getXPProgress
    };
}
