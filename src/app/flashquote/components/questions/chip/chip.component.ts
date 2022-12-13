import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectBroker } from 'src/app/flashquote/selectors';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit{
  @Input() selected: boolean;
  styles: any

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getBroker()
  }

  getBroker() {
    this.store.pipe(select(selectBroker)).subscribe(broker => {
      this.styles = broker.styles.chips
    })
  }
}
