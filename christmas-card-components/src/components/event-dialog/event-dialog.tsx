import { Component, h, Prop, Element, State } from '@stencil/core';
import { Event, Memory } from '../../types';

function per<T>(arr: T[], num: number): T[][] {
  // if (arr.length > num) {
  //   const slice = arr.splice(0, num);
  //   console.log(slice);
  //   return [slice].concat(per(arr.slice(num), num));
  // }
  // return arr.length > 0 ? [arr] : [];

  const res: T[][] = [];
  const res2 = arr.reduce((arr, val) => {
    if (arr.length === 0) {
      return [[val]];
    }

    if (arr[arr.length-1].length >= num) {
      arr.push([val]);
      return arr;
    }

    arr[arr.length-1].push(val);
    return arr;
  }, res);
  return res2;
}



type aMem = Memory & {
  actualWidth: number;
  actualHeight: number;
}

function size(mems: Memory[],split: number, length: number): aMem[] {

  function calc(index: number, aspects: number[], length: number) {
    function split<T>(arr: T[], func: (item: T, index: number) => boolean) {
      const match = [];
      const notMatch = [];

      arr.forEach((item, index) => {
        if (func(item, index)) {
          match.push(item);
        } else {
          notMatch.push(item);
        }
      })

      return [match, notMatch]
    }

    const res = split(aspects, (_, mindex) => mindex === index);
    const [[aspect], otherAsps] = res;
    
    const w = length / (1 + (otherAsps ?? []).reduce((o, n) => o + n, 0) / aspect)
    return {
      actualWidth: w,
      actualHeight: w / aspect
    };
  }

  while (mems.length < split) {
    mems.push({
      url: "Dummy",
      height: 900,
      width: 1200,
      caption: ""
    })
  }

  const aspects = mems.map(i => i.width / i.height);

  return mems.map((mem, index) => {
    return {
      ...mem,
      ...calc(index, aspects, length)

    }
  })
}

@Component({
  tag: 'event-dialog',
  styleUrl: 'event-dialog.scss',
  scoped: true
})
export class EventDialog {

  @Prop({
    attribute: "event"
  }) event: string;

  @Element() el: HTMLElement;

  @State() clientWidth: number;

  close() {
    this.el.parentElement.removeChild(this.el);
  }

  connectedCallback() {
    window.addEventListener('resize', () => {
      this.clientWidth = document.body.clientWidth;
    });
  }

  render() {
    const ev = JSON.parse(this.el.getAttribute("event")) as Event;

    const docWidth = document.body.clientWidth;
    let split = 3;
    if (docWidth < 1200 && docWidth > 900) {
      split = 2
    } else if (docWidth < 900) {
      split = 1
    }

    return (
      <div class="background" onClick={(ev) => {
        if ((ev.target as HTMLElement).className.includes && (ev.target as HTMLElement).className.includes("background")) {
          this.close();          
        }
      }}>
        <dialog class="event-dialog" data-isOpen="true" open>
          <header>

            <h2>🎄 {ev.name}</h2>
            <button class="close" onClick={() => this.close()}>
              <p class="close__text">Close</p>
              <CloseSVG />
            </button>
          </header>
          {
            per(ev.items.filter(i => i.width !== undefined && !i.url.includes("File not included")), split).map(row => <div class="row">
                {
                size(row, split, split == 1 ? document.body.clientWidth * 0.9 : document.body.clientWidth * 0.8).filter(i => i.url !== "Dummy").map(memory =>
                  <div class="img-wrapper" style={{
                    width: memory.actualWidth + "px",
                    height: memory.actualHeight + "px"
                  }}>
                      
                      <figure>
                        {
                        memory.url.endsWith("jpg") ? <img src={memory.url} loading="lazy" /> : <video controls autoplay playsinline muted loop src={memory.url}></video>
                      }
                      {memory.caption !== "" && <div class="caption-holder"><caption>{memory.caption}</caption><p class="info"><p class="circle">i</p></p></div>}
                        
                      </figure>
                    </div>
                  )
                }
              </div>
            )
          }
        </dialog>
      </div>
    );
  }

}

const CloseSVG = () => <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>;
