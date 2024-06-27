import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-alert",
    templateUrl: "./alert.component.html",
    styleUrls: ["./alert.component.css"]
})
export class AlertComponent {
    /**
     * Input message that should be settable from outside the component
     */
    @Input() message: string = "";
    @Output() closeError = new EventEmitter<void>();

    closeAlert() {
        this.closeError.emit();
    }
}