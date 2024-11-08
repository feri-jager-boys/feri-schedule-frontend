import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgramDataSharingService {

  private selectedProgram: string | null = null;
  private selectedYear: number | null = null;
  private classes: { [className: string]: [string, boolean][] } = {};  // Array to hold the classes (className: [[RV1, true], ...])

  constructor() {}

  getSelectedProgram = (): string | null => this.selectedProgram;
  setSelectedProgram = (program: string | null) => this.selectedProgram = program;

  getSelectedYear = (): number | null => this.selectedYear;
  setSelectedYear = (year: number | null) => this.selectedYear = year;

  getClasses = (): { [className: string]: [string, boolean][] } => this.classes;
  setClasses = (classes: { [className: string]: [string, boolean][] }) => this.classes = classes;
}
