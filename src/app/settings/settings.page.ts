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

  selectedProgram!: string | null;
  selectedYear!: number | null;
  classes!: { [className: string]: [string, boolean][] };

  programs: {[programName: string]: number[]} = this.loadPrograms();  // Array to hold the programs 
  years: number[] = [];                                               // Array to hold the years of program
  
  currentClassName: string | null = null;                             // Current class name for modal window

  constructor(public dataSharingService: ProgramDataSharingService) {
    addIcons({ chevronForwardOutline, chevronBackOutline });
  }

  ngOnInit() {
    // LoadSharedData on first initialization
    this.loadSharedData();
  }

  private loadSharedData() {
    this.selectedProgram = this.dataSharingService.getSelectedProgram();
    this.selectedYear = this.dataSharingService.getSelectedYear();
    this.classes = this.dataSharingService.getClasses();
  }

  // Helper function to return the keys of 'classes' object
  objectKeys = (obj: object): string[] => Object.keys(obj);

  private loadPrograms() {
    return {
      'ELEKTROTEHNIKA (BU10)': [1, 2, 3],
      'ELEKTROTEHNIKA (BV10)': [1, 2, 3],
      'INFORMATIKA IN PODATKOVNE TEHNOLOGIJE (BU80)': [1, 2, 3],
      'INFORMATIKA IN PODATKOVNE TEHNOLOGIJE (BV80)': [1, 2, 3],
      'MEDIJSKE KOMUNIKACIJE (BU50)': [1, 2, 3],
      'RAČUNALNIŠTVO IN INFORMACIJSKE TEHNOLOGIJE (BU20)': [1, 2, 3],
      'RAČUNALNIŠTVO IN INFORMACIJSKE TEHNOLOGIJE (BV20)': [1, 2, 3],
      'TELEKOMUNIKACIJE (BU40)': [1, 2, 3],
      'MEHATRONIKA (BU70)': [1, 2, 3],
      'MEHATRONIKA (BV70)': [1, 2, 3],
      'MEHATRONIKA (BMM7) - 2. stopnja': [1, 2],
      'ELEKTROTEHNIKA (BM10) - 2. stopnja': [1, 2],
      'INFORMATIKA IN PODATKOVNE TEHNOLOGIJE (BM80) - 2. stopnja': [1, 2],
      'MEDIJSKE KOMUNIKACIJE (BM50) - 2. stopnja': [1, 2],
      'RAČUNALNIŠTVO IN INFORMACIJSKE TEHNOLOGIJE (BM20) - 2. stopnja': [1, 2],
      'TELEKOMUNIKACIJE (BM40) - 2. stopnja': [1, 2],
      'ERASMUS': [1],
      'KOOD': [1],
      'ATHENA': [1],
    };
  }

  fetchProgramYears() {
    if (!this.selectedProgram) return;

    console.log('Fetching years for program: ' + this.selectedProgram);
    this.selectedYear = null; // Reset the selected year

    this.years = this.programs[this.selectedProgram];
  }

  fetchProgramClasses() {
    if (!this.selectedProgram || !this.selectedYear) return;

    console.log('Fetching classes for program: ' + this.selectedProgram + ' year: ' + this.selectedYear);
    this.classes = {}; // Reset the classes

    // TODO: API call to fetch classes and RV groups
    // classname: [[group, visibility], [group, visibility], ...]
    this.classes = {
      'RAZVOJ IN UPRAVLJANJE PROGRAMSKIH SISTEMOV': [
        ['RV1', true],
        ['RV2', true],
        ['RV3', true],
        ['RV4', true]],
      'IZBRANI ALGORITMI': [
        ['RV1', true], 
        ['RV2', true], 
        ['RV3', true], 
        ['RV4', true]],
      'SPLETNE TEHNOLOGIJE': [
        ['RV1', true], 
        ['RV2', true], 
        ['RV3', true], 
        ['RV4', true], 
        ['RV5', true]],
      'RAČUNALNIŠKA MULTIMEDIA': [
        ['RV1', true], 
        ['RV2', true], 
        ['RV3', true], 
        ['RV4', true]],
      'DOMENSKO SPECIFIČNI MODELIRNI JEZIKI': [
        ['RV1', true], 
        ['RV2', true], 
        ['RV3', true], 
        ['RV4', true]],
    };

    // Setup the classes
    for (const className in this.classes) {
      this.classes[className].unshift(['Predavanje', true]); // Add 'Predavanje' to each class
    }
    // console.log(this.classes); // Debug
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
      console.log('Class options:', this.classes[this.currentClassName]); // when closing the modal log the class options
    }
    this.currentClassName = null;
  }

  ionViewWillLeave() {
    // When changing tabs set the selected program, year, and classes in the data-sharing service
    this.dataSharingService.setSelectedProgram(this.selectedProgram);
    this.dataSharingService.setSelectedYear(this.selectedYear);
    this.dataSharingService.setClasses(this.classes);
  }

}
