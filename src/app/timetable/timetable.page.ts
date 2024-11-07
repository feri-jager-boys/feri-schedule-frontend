import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'timetable.page.html',
  styleUrls: ['timetable.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule]
})
export class TimetablePage {

  timetable = [
    { time: '8:00 AM', monday: 'Math', tuesday: 'Science', wednesday: 'History', thursday: 'Art', friday: 'PE' },
    { time: '9:00 AM', monday: 'English', tuesday: 'Math', wednesday: 'Science', thursday: 'Music', friday: 'Geography' },
  ];

  //constructor() {}

}
