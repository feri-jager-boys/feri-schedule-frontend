import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgramDataSharingService {

  private selectedGradeId: string | null = null;
  private selectedProgram: string | null = null;
  private selectedYear: number | null = null;
  private classes: string[] | null = null;

  constructor() {}

  getSelectedGradeId = (): string | null => this.selectedGradeId;
  setSelectedGradeId = (programId: string | null) => this.selectedGradeId = programId;

  getSelectedProgram = (): string | null => this.selectedProgram;
  setSelectedProgram = (program: string | null) => this.selectedProgram = program;

  getSelectedYear = (): number | null => this.selectedYear;
  setSelectedYear = (year: number | null) => this.selectedYear = year;

  getClasses = (): string[] | null => this.classes;
  setClasses = (classes: string[] | null) => this.classes = classes;
}
