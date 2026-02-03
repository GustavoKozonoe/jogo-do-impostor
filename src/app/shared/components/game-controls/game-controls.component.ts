import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-controls.component.html',
})
export class GameControlsComponent {
  @Input() isDone = false;
  @Input() isFirstPlayer = false;
  @Input() isRevealed = false;
  @Input() index = 0;
  @Input() players: string[] = [];

  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() restart = new EventEmitter<void>();
}
