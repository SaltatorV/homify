import { Component } from '@angular/core';
import { BackgroundCanvas } from "../background-canvas/background-canvas";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, BackgroundCanvas],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  standalone: true
})
export class MainLayout {

}
