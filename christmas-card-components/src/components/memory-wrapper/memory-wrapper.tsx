import { Component, h, State } from '@stencil/core';
import { ChristmasEvent } from '../data-store/fetch';

@Component({
  tag: 'memory-wrapper',
  styleUrl: "event-wrapper.scss",
  shadow: false,
})
export class MemoryWrapper {

  @State()
  data: ChristmasEvent[] = [];

  connectedCallback() {
    document.getElementsByTagName("data-store")[0].listen({
      property: 'memory',
      listener: (a) => this.onData(a)
    });
  }
  onData(memories: ChristmasEvent[]): void {
    this.data = memories;
    // console.log(this.data);
  }

  render() {
    if (this.data.length == 0) {
      return;
    }

    return (
      <div class="event-wrapper">
        <h1>My Year in pictures</h1>
        <div class="flex">
          {
            this.data.map(event =>
              <christmas-event ev={event as any} />)
          }
        </div>
      </div>
    );
  }

}
