export class Preloader {
  preloaderComponent = document.createElement('div');

  setPreloader() {
    this.preloaderComponent.className = 'preloader-animation';
    const element = document.querySelector('.main-content') as HTMLElement;
    element.append(this.preloaderComponent);
  }

  removePreloader() {
    this.preloaderComponent.remove();
  }
}
