import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { ProgramDataSharingService } from '../../services/program-data-sharing.service'; // holds selectedProgram, selectedYear, classes


@Component({
  selector: 'app-tab2',
  templateUrl: 'timetable.page.html',
  styleUrls: ['timetable.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule]
})
export class TimetablePage {

  selectedProgram!: string | null;
  selectedYear!: number | null;
  classes!: { [className: string]: [string, boolean][] }; // which classes are selected to show in timetable

  timetable = [
    { time: '7:00 ', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '8:00 ', monday: 'Math', tuesday: 'Science', wednesday: 'History', thursday: 'Art', friday: 'PE' },
    { time: '9:00 ', monday: 'English', tuesday: 'Math', wednesday: 'Science', thursday: 'Music', friday: 'Geography' },
    { time: '10:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '11:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '12:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '13:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '14:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '15:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '16:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '17:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '18:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '19:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
    { time: '20:00', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
  ];

  constructor(public dataSharingService: ProgramDataSharingService) {}

  ngOnInit() {
    // load shared data (that is set in settings page) on first initialization
    this.loadSharedData();
  }

  ionViewWillEnter() {
    // Ensures loadSharedData is called every time the page is viewed
    this.loadSharedData();

    // debug check data
    console.log('Selected Program: ', this.selectedProgram);
    console.log('Selected Year: ', this.selectedYear);
    console.log('Classes: ', this.classes);

    // debug add subject to timetable
    this.addSubject('11:00', 'monday', 'Physics');
    this.addSubject('07:00', 'friday', 'History');
    this.addSubject('16:00', 'wednesday', 'Physics');
    this.addSubject('20:00', 'tuesday', 'Geography');
  }

  private loadSharedData() {
    this.selectedProgram = this.dataSharingService.getSelectedProgram();
    this.selectedYear = this.dataSharingService.getSelectedYear();
    this.classes = this.dataSharingService.getClasses();
  }

  // dynamically add subject to timetable
  addSubject(time: string, day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday', subject: string) {
    const slot = this.timetable.find(item => item.time === time);
    if (slot) {
      slot[day] = subject;
    }
  }

  // helper function to get object keys
  objectKeys = (obj: object): string[] => Object.keys(obj);

}
