import { Component, Element, Prop, h } from '@stencil/core';
import { ChristmasEvent } from '../data-store/fetch';

@Component({
  tag: 'christmas-event',
  scoped: false,
  shadow: false,
})
export class ChristmasEventComponent {

  @Element() el: HTMLElement;

  @Prop() ev: ChristmasEvent;

  click() {
    const dialog = document.createElement("event-dialog");
    document.getElementById("modals").appendChild(dialog);
    dialog.setAttribute("event", JSON.stringify(this.ev));
  }


  render() {
    return (<div class="event" style={{
          backgroundImage: `linear-gradient(#00000057, #00000057), url(${this.ev.mainImage})`
        }} onClick={() => this.click()}>
        <div class="box grid">

          <div class="vertical-line line" />
          <div class="horizontal-line line" />
          </div>
        <div class="box flex content">
          <img class="bow" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fred-christmas-bow-png-hd-bow-tie-red-christmas-transparent-png-512.png&f=1&nofb=1" />
            <h3>{this.ev.name}</h3>
          </div>
        </div>)
    
  }
}
