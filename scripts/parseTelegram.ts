import { readFileSync, writeFileSync } from 'fs';

export async function run() {
    const text = readFileSync("result.json", 'utf-8');
    
    const exports = JSON.parse(text) as Export;
    const result = exports.chats.list.find(i => i.name === "Avonturen in Corona");

    if (!result) {
        console.error("Chat not found");
        return;
    }
        
    function isUserMessage(message: Message): message is UserMessage {
        return message.type !== "service"
    }
    
    function isPhotoMessage(message: UserMessage): message is UserPhotoMessage {
        return "photo" in message;
    }

    function isVideoMessage(message: UserMessage): message is UserVideoMessage {
        return "mime_type" in message;
    }
    
    function unix(date: Date) {
        return date.getTime() / 1000
    }
    
    const eventMap: Record<number, Memory[]> = {};
    
    function add(mem: Memory, date: Date) {
        const key = unix(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    
        if (eventMap[key] === undefined) {
            eventMap[key] = [];
        }
    
        eventMap[key].push(mem);
    }
    
    result.messages
        .filter(message => isUserMessage(message))
        .map(i => i as UserMessage)
        .filter(message => Number.parseInt(message.date_unixtime) > unix(new Date(2022, 0)))
        .forEach(message => {
            let mem: Memory | undefined = undefined;
            if (isPhotoMessage(message)) {
                mem = {
                    caption: message.text,
                    height: message.height,
                    width: message.width,
                    url: message.photo
                }
            }

            if (isVideoMessage(message)) {
                mem = {
                    caption: message.text,
                    height: message.height,
                    width: message.width,
                    url: message.file,
                }
            }
    
            if (mem !== undefined) {
                add(mem, new Date(Date.parse(message.date)))
            }
        });
    
    writeFileSync("data.json", JSON.stringify(Object.values(eventMap).map<Event>((i, index) => {
        return { 
            name: index.toString(),
            mainImage: i.filter(i => i.url.endsWith("jpg")).find(() => true)?.url ?? "",
            items: i
        }
    })));

    const copyText = Object.values(eventMap)
        .flatMap(i => i)
        .map(i => i.url)
        .map(i => `cp ${i} upload/${i}`)
        .reduce((prev, news) => {
            return prev + "\n" + news;
        }, "");

    writeFileSync("copyText.txt", copyText);
}

run();

// Result Types

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


// Telegram Types

type Chat = {
    name: string
    messages: Message[]
}

type Chats = {
    list: Chat[]
}

type Export = {
    chats: Chats
}

type Message = UserMessage | UserPhotoMessage | UserVideoMessage | ServiceMessage;

type UserMessage = {
    type: "message",
    date: string,
    date_unixtime: string,
    text: string
}

type UserPhotoMessage = UserMessage & {
    photo: string
    width: number
    height: number
}

type UserVideoMessage = UserMessage & {
    "file": string,
    "thumbnail": string,
    "media_type": string,
    "mime_type": string,
    "duration_seconds": number,
    "width": number,
    "height": number,
}

type ServiceMessage = {
    type: "service"    
}