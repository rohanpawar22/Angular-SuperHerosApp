import { Injectable } from '@angular/core';
import * as introJs from 'intro.js/intro.js';

declare var introJs: any;

@Injectable({
  providedIn: 'root'
})
export class IntroJsService {

  showIntro = true;
  showDetailsIntro = true;
  showBiographyIntro = true;

  constructor() { }

  introAboutApp(): void {
    if (this.showIntro == true) {
      const introTimeout = setTimeout(() => {
        introJs().setOptions({
          tooltipClass: 'customTooltip',
          highlightClass: 'customHighlight',
          exitOnOverlayClick: false,
          disableInteraction: false,
          steps: [
            {
              intro: 'Welcome to the SuperHeros App! Let me give you a quick tour.'
              // <button class="skip-btn" onclick="introJs().exit();">Skip Tour</button>
            },
            {
              element: document.getElementById('step1'),
              intro: 'Explore the list of superheroes from various universe.',
              position: 'right'
            },
            {
              element: document.getElementById('step2'),
              intro: 'Click on the Home icon to easily navigate back to the list page from anywhere.',
              position: 'right'
            },
            {
              element: document.getElementById('step3'),
              intro: 'Use this search bar to find your favorite superhero by name.',
              position: 'right'
            },
            {
              element: document.getElementById('step4'),
              intro: 'Here, you can view detailed information about a selected superhero.',
              position: 'right'
            },
            {
              element: document.getElementById('step5'),
              intro: 'Click on "Biography" to explore the biography of the selected superhero.',
              position: 'right'
            }
          ]
        }).oncomplete(() => {
          console.log('Intro completed');
          this.showIntro = false;
        }).onexit(() => {
          this.showIntro = false;
        }).start();

        clearTimeout(introTimeout);
      }, 200);
    }

  }

  introAboutDetails(): void {
    if (this.showDetailsIntro == true) {
      const introTimeout = setTimeout(() => {
        introJs().setOptions({
          tooltipClass: 'customTooltip',
          highlightClass: 'customHighlight',
          exitOnOverlayClick: false,
          disableInteraction: false,
          steps: [
            {
              intro: 'Welcome to the Details Page! Let me give you a quick tour.'
            },
            {
              element: document.getElementById('step6'),
              intro: 'Here you can see the superhero name.',
              position: 'right'
            },
            {
              element: document.getElementById('step7'),
              intro: 'Here you can view the superhero photo.',
              position: 'right'
            },
            {
              element: document.getElementById('step8'),
              intro: 'Here you can explore the superhero powers.',
              position: 'right'
            },
          ]
        }).oncomplete(() => {
          this.showDetailsIntro = false;
        }).onexit(() => {
          this.showDetailsIntro = false;
        }).start();

        clearTimeout(introTimeout);
      }, 200);
    }

  }

  introAboutBiography(): void {
    if (this.showBiographyIntro == true) {
      const introTimeout = setTimeout(() => {
        introJs().setOptions({
          tooltipClass: 'customTooltip',
          highlightClass: 'customHighlight',
          exitOnOverlayClick: false,
          disableInteraction: false,
          steps: [
            {
              intro: 'Welcome to the Biography Page! Let me give you a quick tour.'
            },
            {
              element: document.getElementById('step9'),
              intro: 'Here you can view the superhero photo.',
              position: 'right'
            },
            {
              element: document.getElementById('step10'),
              intro: 'Here you can see the superhero name.',
              position: 'right'
            },
            {
              element: document.getElementById('step11'),
              intro: 'Here you can see the superhero details.',
              position: 'right'
            },
          ]
        }).oncomplete(() => {
          this.showBiographyIntro = false;
        }).onexit(() => {
          this.showBiographyIntro = false;
        }).start();

        clearTimeout(introTimeout);
      }, 200);
    }

  }

  // introJs(): void {
  //   this.showIntro = false;
  //   this.showDetailsIntro = false;
  //   this.showBiographyIntro = false;
  // }

}
