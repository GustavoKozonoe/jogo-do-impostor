import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-flip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-flip-card.component.html',
})
export class GameFlipCardComponent {
  @Input() isRevealed = false;
  @Input() backClass: string | string[] | Record<string, boolean> = '';

  @Output() reveal = new EventEmitter<void>();
  @Output() hide = new EventEmitter<void>();

  private touchStartY = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.changedTouches[0].clientY;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndY = event.changedTouches[0].clientY;
    const diff = this.touchStartY - touchEndY;

    if (diff > 50 && !this.isRevealed) {
      this.reveal.emit();
    }

    if (diff < -50 && this.isRevealed) {
      this.hide.emit();
    }
  }
}
