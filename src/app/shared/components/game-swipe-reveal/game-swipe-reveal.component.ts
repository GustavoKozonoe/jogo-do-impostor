import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-swipe-reveal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-swipe-reveal.component.html',
})
export class GameSwipeRevealComponent {
  @Input() isRevealed = false;
}
