import { makeAutoObservable } from "mobx";
import {hydrateStore, makePersistable} from 'mobx-persist-store';

export class Library {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: Library.name,
            debugMode: false,
            properties: [
              'images',
              'videos',
              'audios',
            ],
          });
    }
    images = [];
    videos = [];
    audios = [];
    addImage = (image) => {
      this.images.push(image);
    }
    removeImage = (path) => {
      const listImage = [...this.images]
      const listAfterRemove = listImage.filter(item => item != path);
      this.images = listAfterRemove;
    }
    addVideo = (video) => {
      this.videos.push(video);
    }
    removeVideo = (path) => {
      const listVideo = [...this.videos]
      const listAfterRemove = listVideo.filter(item => item.path != path);
      this.videos = listAfterRemove;
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