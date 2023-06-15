import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Input() title: string;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
