export interface PlayerStats {
    id: string;
    name: string;
    wins: number;
    battles: number;
}

export const dummyLeaderboard: PlayerStats[] = [
    { id: "1", name: "Kaela", wins: 19, battles: 23 },
    { id: "2", name: "Thorgar", wins: 15, battles: 20 },
    { id: "3", name: "Elaria", wins: 13, battles: 19 },
    { id: "4", name: "Brambok", wins: 9, battles: 18 },
    { id: "5", name: "Dreadbone", wins: 6, battles: 12 },
    { id: "6", name: "Zarith", wins: 4, battles: 9 },
];
