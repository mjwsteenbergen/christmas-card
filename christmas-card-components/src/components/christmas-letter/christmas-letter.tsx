import { Component, State, Element } from '@stencil/core';

@Component({
  tag: 'christmas-letter',
  shadow: false,
})
export class ChristmasLetter {
  @State()
  data: string = "";

  @Element()
  element: HTMLElement;

  connectedCallback() {
    document.getElementsByTagName("data-store")[0].listen({
      property: 'letter',
      listener: (a) => this.onData(a)
    });
  }

  onData(inp: string) {
    // console.log("ChristmasLetter", "return", inp, this.data)
    this.data = inp;
  }

  render() {
    this.element.innerHTML = this.data;
  }

}
