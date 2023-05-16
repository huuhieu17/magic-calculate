import { makeAutoObservable } from "mobx";
import {hydrateStore, makePersistable} from 'mobx-persist-store';

export class Library {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: Library.name,
            debugMode: false,
            properties: [
              'hotkey',
            ],
          });
    }
    images = [];
    videos = [];
    audios = [];
    addImage = (image) => {
      this.images.push(image);
    }
    removeImage = (index) => {
      this.images = this.images.splice(index, 1);
    }
    addVideo = (video) => {
      this.videos.push(video);
    }
    removeVideo = (index) => {
      this.videos = this.videos.splice(index, 1);
    }
    addAudio = (audio) => {
      this.audios.push(audio);
    }
    removeAudio = (index) => {
      this.audios = this.audios.splice(index, 1);
    }
    hydrate = async () => {
        await hydrateStore(this);
    };
}