import data from "./data.json";

export type Data = {
    memories: ChristmasEvent[];
    letter: string;
}

export type ChristmasEvent = {
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

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export const exampleData = new Promise<Data>(async (resolve) => {
    await wait(3000);
    resolve({
        letter: `<h1>Merry Christmas</h1>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus debitis porro vero fuga libero dignissimos
            maiores, inventore sed natus velit nam quis deserunt! Inventore, hic commodi eius sint aspernatur cum.<br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus debitis porro vero fuga libero dignissimos
            maiores, inventore sed natus velit nam quis deserunt! Inventore, hic commodi eius sint aspernatur cum.<br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus debitis porro vero fuga libero dignissimos
            maiores, inventore sed natus velit nam quis deserunt! Inventore, hic commodi eius sint aspernatur cum.<br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus debitis porro vero fuga libero dignissimos
            maiores, inventore sed natus velit nam quis deserunt! Inventore, hic commodi eius sint aspernatur cum.<br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus debitis porro vero fuga libero dignissimos
            maiores, inventore sed natus velit nam quis deserunt! Inventore, hic commodi eius sint aspernatur cum.<br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus debitis porro vero fuga libero dignissimos
            maiores, inventore sed natus velit nam quis deserunt! Inventore, hic commodi eius sint aspernatur cum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus debitis porro vero fuga libero dignissimos
            maiores, inventore sed natus velit nam quis deserunt! Inventore, hic commodi eius sint aspernatur cum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus debitis porro vero fuga libero dignissimos
            maiores, inventore sed natus velit nam quis deserunt! Inventore, hic commodi eius sint aspernatur cum.
          </p>`,
        memories: data as ChristmasEvent[]
    });
})