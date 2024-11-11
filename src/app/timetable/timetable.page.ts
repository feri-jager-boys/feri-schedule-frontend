import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { ProgramDataSharingService } from '../../services/program-data-sharing.service'; // holds selectedProgram, selectedYear, classes


@Component({
  selector: 'app-tab2',
  templateUrl: 'timetable.page.html',
  styleUrls: ['timetable.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule]
})
export class TimetablePage implements OnInit {

  selectedGradeId!: string | null;            // used to fetch weekly timetable
  selectedProgram!: string | null;            // name of the program
  selectedYear!: number | null;               // year of the program
  classes!: string[] | null;                  // classes in the program (TODO: implement filter)

  timetableData: any[] = [];                  // holds the timetable data
  
  timetableWeekNum = 3; // used to fetch weekly timetable
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
    this.loadSharedData();
  }

  ionViewWillEnter() {
    // load shared data and fetch timetable data if gradeId has changed (settings page)
    if (this.selectedGradeId !== this.dataSharingService.getSelectedGradeId()) {
      console.log('gradeId changed, fetching timetable data');
      this.loadSharedData();
      this.fetchTimetableData();
    }

  }

  private loadSharedData() {
    this.selectedGradeId = this.dataSharingService.getSelectedGradeId();
    this.selectedProgram = this.dataSharingService.getSelectedProgram();
    this.selectedYear = this.dataSharingService.getSelectedYear();
    this.classes = this.dataSharingService.getClasses();
  }

  private async fetchTimetableData() {
    if (!this.selectedGradeId || !this.timetableWeekNum) return;

    try {
      const url = `http://localhost:3080/schedule/getFull/${this.selectedGradeId}/${this.timetableWeekNum}`;
      const res = await fetch(url);
      const data = await res.json();
      this.timetableData = data;
      console.log("timetable data: ", this.timetableData); //debug
    } catch (error) {
      console.error('Error while getting timetable:', error);
    }
  }

  // dynamically add subject to timetable
  addSubject(time: string, day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday', subject: string) {
    const slot = this.timetable.find(item => item.time === time);
    if (slot) {
      slot[day] = subject;
    }
  }

}
