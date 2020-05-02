import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css'],
})
export class MapDialogComponent implements OnInit {
  isLoadingContent: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  toggleLoading() {
    this.isLoadingContent = false;
  }
  setCoordinates(coords) {
    this.data.coordinates = coords;
  }
  cancelAndClose() {
    this.dialogRef.close(null);
  }
}
