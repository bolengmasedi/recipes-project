import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    templateUrl: './header.component.html',
    selector: 'app-header',
})
export class HeaderComponent {
  title = "Header";
  collapsed = true;
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}