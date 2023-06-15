import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { Card } from '../../models/schema.model';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {card: Card, edit: boolean},
    private dialogRef: MatDialogRef<EditCardComponent>,
    public formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    const card = this.data && this.data.card ? this.data.card : null;
    this.formGroup = this.formBuilder.group({
      title: [card && card.title ? card.title : '', Validators.required],
      description: [card && card.description ? card.description : '', Validators.required]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }

}

