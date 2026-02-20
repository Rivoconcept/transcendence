export interface Fruit {
    id: number;
    name: string;
}

export type FruitContextType = {
    fruits: Fruit[];
    addFruit: (name: string) => void;
    deleteFruit: (id: number) => void;
}