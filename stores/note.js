import { makeAutoObservable } from "mobx";
import {hydrateStore, makePersistable} from 'mobx-persist-store';

export class Note {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: Note.name,
            debugMode: false,
            properties: [
              'notes',
            ],
          });
    }
    notes = [];
    addNotes = (note) => {
      this.notes.push(note);
    }
    updateNote = (id, data) => {
      const list = [...this.notes];
      const noteIndex = list.findIndex(item => item.id === id);
      if(noteIndex === -1 ) return;
      list[noteIndex] = data;
      this.notes = list;
    }
    removeNote= (id) => {
      const list = [...this.notes];
      console.log(list);
      this.notes = list.filter(item => item.id !== id);
    }
    hydrate = async () => {
        await hydrateStore(this);
    };
}