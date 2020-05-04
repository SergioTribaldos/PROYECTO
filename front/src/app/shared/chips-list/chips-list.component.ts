import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.css'],
})
export class ChipsListComponent implements OnInit {
  @Input()
  tagList: any;

  @Output()
  tagSelected = new EventEmitter<Array<string>>();

  selectedTags: object = {};
  selectedCategory: any;

  formControl = new FormControl();

  constructor() {}

  ngOnInit(): void {
    console.log(this.tagList);
  }

  toggleTag(tag: string) {
    this.selectedTags[tag] == tag
      ? delete this.selectedTags[tag]
      : (this.selectedTags[tag] = tag);

    this.formControl.setValue(Object.values(this.selectedTags));
    this.tagSelected.emit(this.formControl.value);
  }

  setCategoryAndResetTags(value: string) {
    this.selectedCategory = value;
    this.selectedTags = {};
    this.formControl.setValue('');
  }
}
