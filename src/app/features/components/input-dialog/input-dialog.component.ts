import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-input-dialog',
  standalone:true,
  imports:[FormsModule],
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent {
  userInput = '';

  constructor(public dialogRef: MatDialogRef<InputDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.userInput);
  }
}
