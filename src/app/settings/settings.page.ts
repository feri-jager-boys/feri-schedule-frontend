import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IonModal } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { OverlayEventDetail } from '@ionic/core/components';

import { chevronForwardOutline, chevronBackOutline  } from 'ionicons/icons';

import { ProgramDataSharingService } from '../../services/program-data-sharing.service';  // holds selectedProgram, selectedYear, classes
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [ ExploreContainerComponent, CommonModule, FormsModule, IonicModule],
})
export class SettingsPage implements OnInit {
  @ViewChild('classOptionsModal') classOptionsModal!: IonModal;

  selectedProgram!: any;
  selectedYear!: number | null;
  
  programs: any = []                                                  // Array to hold the programs 
  years: number[] = [];                                               // Array to hold the years of program
  classes!: string[] | null;                                          // Array to hold the classes
  
  currentClassName: string | null = null;                             // Current class name for modal window
  selectedGradeId: string | null = null;                               // Current program/grade id

  constructor(public dataSharingService: ProgramDataSharingService) {
    addIcons({ chevronForwardOutline, chevronBackOutline });
  }

  ngOnInit() {
    // LoadSharedData on first initialization
    this.fetchPrograms();
    this.loadSharedData();
  }

  // Helper function to return the keys of 'classes' object
  objectKeys = (obj: object): string[] => Object.keys(obj);

  private loadSharedData() {
    this.selectedProgram = this.dataSharingService.getSelectedProgram();
    this.selectedYear = this.dataSharingService.getSelectedYear();
    this.classes = this.dataSharingService.getClasses();
  }

  private setSharedData() {
    this.dataSharingService.setSelectedGradeId(this.selectedGradeId);
    this.dataSharingService.setSelectedProgram(this.selectedProgram.name);
    this.dataSharingService.setSelectedYear(this.selectedYear);
    this.dataSharingService.setClasses(this.classes);
  }

  private async fetchPrograms() {
    try {
      const url = "http://localhost:3080/schedule/getprograms"
      const res = await fetch(url);
      const data = await res.json();
      this.programs = data;
    } catch (error) {
      console.error('Error while getting programs:', error);
    }
  }

  getProgramYears() {
    if (!this.selectedProgram) return;

    console.log('Fetching years for program: ' + this.selectedProgram.name);
    this.years = []; // Reset the years
    this.selectedYear = null; // Reset the selected year

    for (const gradeItem of this.selectedProgram.gradeItems) {
        this.years.push(gradeItem.grade);
    }
  }

  getProgramClasses() {
    if (!this.selectedProgram || !this.selectedYear) return;

    console.log('Fetching classes for program: ' + this.selectedProgram.name + ' year: ' + this.selectedYear);
    this.classes = []; // Reset the classes

    // gets GradeItem object for selected year
    const selectedGrade = this.selectedProgram.gradeItems.find((g: any) => g.grade === this.selectedYear);

    // save selected grade id
    this.selectedGradeId = selectedGrade.gradeId;

    // gets subjects array from GradeItem object
    this.classes = selectedGrade.subjects;
  }


  // Modal window functions
  openClassOptionsModal(className: string) {
    this.currentClassName = className;
    this.classOptionsModal.present();
  }

  closeClassOptionsModal() {
    this.classOptionsModal.dismiss(null, "confirm");
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm' && this.currentClassName) {
      console.log('Class options for class: ' + this.currentClassName);
    }
    this.currentClassName = null;
  }

  ionViewWillLeave() {
    // When changing tabs set the selected gradeID, programName, programYear, and classes in the data-sharing service

    // set shared data only if the selected program has changed
    if (this.dataSharingService.getSelectedGradeId() !== this.selectedGradeId) {
      this.setSharedData();
    }

  }

}
