import { Component, Method } from '@stencil/core';
import type { ChristmasEvent } from './fetch';


// const baseUrl = "http://localhost:7071";
const baseUrl = "https://zeus-laurentia.azurewebsites.net"
const url = baseUrl + "/api/run/christmascard?token=7fb7ddbf-18a1-4c0d-bd76-0441dd09897c";

type Listener<T> = (inp: T) => void;

type Listeners = {
  letter: Listener<string>[];
  memories: Listener<ChristmasEvent[]>[];
}

export type ListenInput = {
  property: "letter",
  listener: Listener<string>
} | {
  property: "memory",
  listener: Listener<ChristmasEvent[]>
}

@Component({
  tag: 'data-store',
  shadow: true,
})
export class DataStore {

  data = {
    "letter": "Please wait while the elves load your letter. If this takes too long, please refresh the page or contact Martijn, as my code is probably broken.",
    "memories": []
  }

  listeners: Listeners = {
    "letter": [],
    "memories": []
  }


  fetch() {

    const isBroken = () => {
      this.data = {
        letter: "Hi! This page has no way of identifying you. Please use the url sent by Martijn. If this was a link sent by Martijn, please contact him, as he did something wrong. Merry Christmas!",
        memories: []
      };
      this.listeners.letter.forEach(listener => listener(this.data.letter))
    }

    let params = window.location.href.split('?');

    if (params.length === 1) {
      isBroken();
      return;
    }

    let queryString = new URLSearchParams(params[1]);

    if (!queryString.has("id")) {
      isBroken();
      return;
    }

    return fetch(url + "&id=" + queryString.get("id"))
      .then(i => i.json())
      .then(i => i.Reply.Result)
  }

  connectedCallback() {
    this.fetch().then((data) => {
      this.data = data;
      this.listeners.letter.forEach(listener => listener(this.data.letter))
      this.listeners.memories.forEach(listener => listener(this.data.memories))

    })
  }

  @Method()
  listen(func: ListenInput) {
    return new Promise(() => {
      if (func?.property === 'memory') {
        this.listeners.memories.push(func.listener);
        func.listener(this.data.memories)
      }
      if (func.property === 'letter') {
        this.listeners.letter.push(func.listener);
        func.listener(this.data.letter)
      }
    });
  }
}


