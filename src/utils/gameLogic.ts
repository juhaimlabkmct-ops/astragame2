
export interface LinkData {
    id: string;
    url: string;
    isSafe: boolean;
    spawnTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
}

// Categorized links by difficulty
const SAFE_LINKS = {
    easy: ["google.com", "youtube.com", "wikipedia.org", "amazon.in"],
    medium: ["github.com", "stackoverflow.com", "linkedin.com", "microsoft.com"],
    hard: ["kmct.edu.in", "astraietm.in", "kerala.gov.in", "ietm.in"]
};

const FAKE_LINKS = {
    // Easy to spot (obvious typos)
    easy: ["g00gle.com", "yotube.com", "amazn.com", "faceb00k.com"],
    // Medium difficulty (subtle changes)
    medium: ["googIe-login.net", "github-security.com", "stackoverflow.co", "microsofit.com"],
    // Hard to spot (very convincing)
    hard: ["google.corn", "github.co", "kmct-edu.in", "astra-ietm.in", "insta-verify.net"]
};

// Shuffle bag implementation for better randomization
class ShuffleBag<T> {
    private items: T[] = [];
    private currentIndex = 0;

    constructor(items: T[]) {
        this.refill(items);
    }

    private refill(items: T[]) {
        this.items = [...items];
        // Fisher-Yates shuffle
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        }
        this.currentIndex = 0;
    }

    next(): T {
        if (this.currentIndex >= this.items.length) {
            this.refill(this.items);
        }
        return this.items[this.currentIndex++];
    }
}

// Create shuffle bags
const safeBag = new ShuffleBag([...SAFE_LINKS.easy, ...SAFE_LINKS.medium, ...SAFE_LINKS.hard]);
const fakeBag = new ShuffleBag([...FAKE_LINKS.easy, ...FAKE_LINKS.medium, ...FAKE_LINKS.hard]);

export function generateLink(elapsedTimeMs: number = 0): LinkData {
    const difficulty = getDifficulty(elapsedTimeMs);

    // Dynamic safe/fake ratio based on difficulty
    // Early game: 50% safe, Late game: 30% safe
    const safeChance = Math.max(0.3, 0.5 - (difficulty.level * 0.02));
    const isSafe = Math.random() < safeChance;

    // Choose difficulty category based on game progress
    let linkDifficulty: 'easy' | 'medium' | 'hard';
    const rand = Math.random();

    if (difficulty.level < 3) {
        // Early game: mostly easy
        linkDifficulty = rand < 0.7 ? 'easy' : rand < 0.9 ? 'medium' : 'hard';
    } else if (difficulty.level < 6) {
        // Mid game: balanced
        linkDifficulty = rand < 0.3 ? 'easy' : rand < 0.7 ? 'medium' : 'hard';
    } else {
        // Late game: mostly hard
        linkDifficulty = rand < 0.1 ? 'easy' : rand < 0.4 ? 'medium' : 'hard';
    }

    // Get URL from appropriate category
    let rawUrl: string;
    if (isSafe) {
        const pool = SAFE_LINKS[linkDifficulty];
        rawUrl = pool[Math.floor(Math.random() * pool.length)];
    } else {
        const pool = FAKE_LINKS[linkDifficulty];
        rawUrl = pool[Math.floor(Math.random() * pool.length)];
    }

    // Calculate points based on difficulty and if it's safe/fake
    const basePoints = isSafe ? 1 : 0;
    const difficultyMultiplier = linkDifficulty === 'easy' ? 1 : linkDifficulty === 'medium' ? 1.5 : 2;
    const points = Math.floor(basePoints * difficultyMultiplier);

    return {
        id: Math.random().toString(36).substr(2, 9),
        url: rawUrl,
        isSafe,
        difficulty: linkDifficulty,
        points,
        spawnTime: Date.now()
    };
}

export function getDifficulty(elapsedTimeMs: number) {
    // Level up every 8 seconds for faster progression
    const level = Math.floor(elapsedTimeMs / 8000);

    // Progressive difficulty curve
    // Phase 1 (0-16s): Gentle introduction
    // Phase 2 (16-40s): Moderate challenge
    // Phase 3 (40s+): Intense pressure

    let spawnInterval: number;
    let maxLinks: number;

    if (level < 2) {
        // Phase 1: Easy mode
        spawnInterval = 2500 - (level * 300);
        maxLinks = 3;
    } else if (level < 5) {
        // Phase 2: Ramping up
        spawnInterval = Math.max(1200, 1900 - ((level - 2) * 250));
        maxLinks = 4;
    } else if (level < 8) {
        // Phase 3: High pressure
        spawnInterval = Math.max(800, 1200 - ((level - 5) * 150));
        maxLinks = 5;
    } else {
        // Phase 4: Expert mode
        spawnInterval = Math.max(500, 800 - ((level - 8) * 50));
        maxLinks = 6;
    }

    return {
        level,
        spawnInterval,
        maxLinks,
        description: getPhaseDescription(level)
    };
}

function getPhaseDescription(level: number): string {
    if (level < 2) return "LEARNING PHASE";
    if (level < 5) return "ACTIVE THREAT";
    if (level < 8) return "CRITICAL ALERT";
    return "SYSTEM OVERLOAD";
}

export function calculateComboBonus(streak: number): number {
    if (streak < 3) return 0;
    if (streak < 5) return 1;
    if (streak < 10) return 2;
    if (streak < 15) return 3;
    return 5;
}

export function checkRank(score: number): { rank: string, emoji: string, description: string } {
    if (score <= 10) return {
        rank: "Clickbait Victim",
        emoji: "🤡",
        description: "You fell for the oldest tricks!"
    };
    if (score <= 25) return {
        rank: "Suspicious User",
        emoji: "👀",
        description: "Getting better, stay alert!"
    };
    if (score <= 50) return {
        rank: "Security Aware",
        emoji: "🛡️",
        description: "You know your way around!"
    };
    if (score <= 80) return {
        rank: "Cyber Ninja",
        emoji: "🥷",
        description: "Impressive detection skills!"
    };
    return {
        rank: "Digital Guardian",
        emoji: "👑",
        description: "You're a cybersecurity master!"
    };
}
