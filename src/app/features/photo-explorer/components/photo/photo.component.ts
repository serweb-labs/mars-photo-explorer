import { Component, Input } from '@angular/core';
import { Photo } from '@core/nasa-photos/domain/photo.entity';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  @Input() photo: Photo;
  constructor() { }
}
