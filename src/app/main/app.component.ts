import { Component } from '@angular/core';
import { BoardService } from '../services/board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditCardComponent } from '../components/edit-card/edit-card.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCardComponent } from '../components/delete-card/delete-card.component';
import {Column, Card, defaultData} from '../models/schema.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  columns: Column[] = [];

  constructor(private _boardService: BoardService, private _dialog: MatDialog) {
    this.columns = this._boardService.getColumns();
  }

  onCardDrop(event: CdkDragDrop<Card[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given card to the target data array. This happens if
    // a card has been dropped on a different column.
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    // save changed data
    this._boardService.saveToLocalStorage(this.columns);
  }

  onColumnDrop(event: CdkDragDrop<Column[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // save changed data
    this._boardService.saveToLocalStorage(this.columns);
  }

  /**
   * An array of all column ids. Each id is associated with a `cdkDropList` for the
   * column cards. This property can be used to connect all drop lists together.
   */
  columnIds(): string[] {
    return this.columns.map(column => column.id);
  }

  addEditCard(card: Card, column: Column, edit = false) {
    // Use the injected dialog service to launch the previously created edit-card
    // component. Once the dialog closes, we assign the updated card data to
    // the specified card.
    this._dialog.open(EditCardComponent, {data: {card, edit}, width: '500px'})
      .afterClosed()
      .subscribe(newCardData => {
        if (newCardData != null && typeof newCardData == "object") {
          edit ? Object.assign(card, newCardData) : column.cards.push(newCardData);
        }

        // save changed data
        this._boardService.saveToLocalStorage(this.columns);

      });
  }

  deleteCard(card: Card, column: Column) {
    // Open a dialog
    this._dialog.open(DeleteCardComponent, {data: card, width: '500px'})
      .afterClosed()
      .subscribe(response => {
        // Wait for it to close and delete the card if the user agreed.
        if (response) {
          column.cards.splice(column.cards.indexOf(card), 1);

          // save changed data
          this._boardService.saveToLocalStorage(this.columns);
        }
      });
  }

}
