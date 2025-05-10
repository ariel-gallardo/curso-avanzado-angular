import {
  Component,
  input,
  signal,
  OnInit,
  AfterViewInit,
  OnDestroy,
  model,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.component.html',
})
export class CounterComponent implements OnInit, OnDestroy {
  duration = input.required<number>();
  message = model.required<string>();
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    afterNextRender(() => {
      this.counterRef = window.setInterval(() => {
        console.log('run interval');
        this.counter.update((statePrev) => statePrev + 1);
      }, 1000);
      // after render
      // hijos ya fueron pintandos
      console.log('ngAfterViewInit');
      console.log('-'.repeat(10));
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    if(this.counterRef) window.clearInterval(this.counterRef);
  }
 
  doSomething() {
    console.log('change duration');
    // async
  }

  sendMessageFromChild(){
    this.message.set('from child');
  }
}
