export type Event = {
    name: string,
    mainImage: string,
    items: Memory[];
}

export type Memory = {
    caption: string;
    url: string;
    width: number;
    height: number;
}