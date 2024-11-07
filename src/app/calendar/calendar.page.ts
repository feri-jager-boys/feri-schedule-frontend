import { Component } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-calendar-page',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss'],
  standalone: true,
  imports: [ ExploreContainerComponent, CommonModule, FormsModule, IonicModule],
})
export class CalendarPage {
  selectedDate: string = new Date().toISOString();
  noteText: string = '';
  notes: {[key: string]:{text:string, color:string}[]} = {};
  selectedColor: string = 'blue';

  constructor(){}

  onDateChange(){

  }

  addNote(){
    if(!this.noteText.trim()){
      return;
    }

    const dateKey = this.selectedDate.split('T')[0];
    if(!this.notes[dateKey]){
      this.notes[dateKey] = [];
    }

    this.notes[dateKey].push({text: this.noteText.trim(), 
    color: this.selectedColor});
    this.noteText = '';
  }

  getNotesForDate(date: string){
    const dateKey = date.split('T')[0];
    return this.notes[dateKey]?.map(note => note.text) || [];
  }

  editNote(index: number){
    const dateKey = this.selectedDate.split('T')[0];
    const note = this.notes[dateKey][index];
    this.noteText = note.text;
    this.selectedColor = note.color;
    this.notes[dateKey].splice(index,1);
  }

  deleteNote(index: number){
    const dateKey = this.selectedDate.split('T')[0];
    this.notes[dateKey].splice(index,1);
  }
}

