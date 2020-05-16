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

  @Input()
  multipleSelectionAllowed: boolean;

  @Output()
  tagSelected = new EventEmitter<Array<string>>();

  selectedTags: object = {};
  selectedCategory: any;

  formControl = new FormControl();

  constructor() {}

  ngOnInit(): void {}

  toggleTag(tag: string) {
    this.multipleSelectionAllowed
      ? this.selectTagOnMultipleMode(tag)
      : this.selectTagOnSingleMode(tag);

    this.setNullIfNoTagSelected();

    this.tagSelected.emit(this.formControl.value);
  }

  setCategoryAndResetTags(value: string) {
    this.selectedCategory = value;
    this.selectedTags = {};
    this.formControl.setValue('');
  }

  setNullIfNoTagSelected() {
    this.formControl.setValue(
      Object.values(this.selectedTags).length === 0
        ? null
        : Object.values(this.selectedTags)
    );
  }

  selectTagOnMultipleMode(tag: string) {
    this.selectedTags[tag] == tag
      ? delete this.selectedTags[tag]
      : (this.selectedTags[tag] = tag);
  }

  selectTagOnSingleMode(tag: string) {
    this.selectedTags = {};
    this.selectedTags[tag] = tag;
  }
}
