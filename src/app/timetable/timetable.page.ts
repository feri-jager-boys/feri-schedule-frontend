import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { ProgramDataSharingService } from '../../services/program-data-sharing.service'; // holds selectedProgram, selectedYear, classes

interface TimetableEntry{
  subject?: string;
  professor?: string;
  classroom?: string;
  rowSpan?: number;
}

interface TimetableSlot{
  time: string;
  monday?: TimetableEntry;
  tuesday?: TimetableEntry;
  wednesday?: TimetableEntry;
  thursday?: TimetableEntry;
  friday?: TimetableEntry;
}

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
  timetable: TimetableSlot[] = [];
  days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday')[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];


  constructor(public dataSharingService: ProgramDataSharingService) {}

  ngOnInit() {
    this.loadSharedData();
    this.initilizeTimetable();
  }

  private initilizeTimetable() {
    const times = [
      "7:00 - 8:00",
      "8:00 - 9:00",
      "9:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
      "17:00 - 18:00",
      "18:00 - 19:00",
      "19:00 - 20:00",
    ];
    this.timetable = times.map(time=>({time}));
  }

  ionViewWillEnter() {
    // load shared data and fetch timetable data if gradeId has changed (settings page)
    if (this.selectedGradeId !== this.dataSharingService.getSelectedGradeId()) {
      console.log('gradeId changed, fetching timetable data');
      this.loadSharedData();
      this.fetchTimetableData();
      this.populateTimetable();
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


  private populateTimetable(){
    const dayMapping: { [key: number]: Exclude<keyof TimetableSlot, 'time'> } ={
      0:'monday',
      1:'tuesday',
      2:'wednesday',
      3:'thursday',
      4:'friday'
    };
    this.timetableData.forEach(entry => {
      console.log("entry: ", entry);
      const day = dayMapping[entry.day];
  
      // Calculate start and end indices based on time
      const startIndex = this.getTimeIndex(entry.hourFrom);
      const endIndex = this.getTimeIndex(entry.hourTo) - 1;
  
      // Calculate row span
      const rowSpan = endIndex - startIndex + 1;
  
      // Fill the timetable slots with the entry data
      for (let i = startIndex; i <= endIndex; i++) {
        if (i === startIndex) {
          this.assignTimetableEntry(this.timetable[i], day, {
            subject: entry.subject,
            professor: entry.professor,
            classroom: entry.classroom,
            rowSpan: rowSpan
          });
        } else {
          this.assignTimetableEntry(this.timetable[i], day, { rowSpan: 0 });
        }
      }
    });
  }
  
private assignTimetableEntry(
  slot: TimetableSlot,
  day: Exclude<keyof TimetableSlot, 'time'>,
  entry: TimetableEntry
) {
  slot[day] = entry;
}

getTimetableEntry(slot: TimetableSlot, day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday') {
  return slot[day];
}


private getTimeIndex(time: string): number {
    const times = ["07:00", "08:00", "09:00", "10:00", "11:00"]; // Update based on your timetable slots
    return times.indexOf(time);
  }

}
