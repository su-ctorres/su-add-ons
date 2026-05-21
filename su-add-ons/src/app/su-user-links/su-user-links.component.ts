import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';

interface SuUserLink {
  href: string;
  text: string;
  ariaLabel: string;
}

@Component({
  selector: 'su-user-links',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./su-user-links.component.scss']
})
export class SuUserLinksComponent implements OnInit, AfterViewInit {
  private links: SuUserLink[] = [];

  // Get configurable parameters
  constructor(@Inject('MODULE_PARAMETERS') public moduleParameters: any) {
    console.log('Raw moduleParameters:', moduleParameters); // Debug log

    this.links = [];

    // Build links from individual parameters
    let linkIndex = 1;
    while (moduleParameters[`href${linkIndex}`]) {
      const link: SuUserLink = {
        href: moduleParameters[`href${linkIndex}`],
        text: moduleParameters[`text${linkIndex}`] || `Link ${linkIndex}`,
        ariaLabel: moduleParameters[`ariaLabel${linkIndex}`] || `Go to Link ${linkIndex}`
      };
      this.links.push(link);
      linkIndex++;
    }

    console.log('Final links array:', this.links); // Debug log
  }

  ngOnInit() {
    this.setupMenuListener();
  }

  ngAfterViewInit() {
    setTimeout(() => this.setupMenuListener(), 100);
  }

  private setupMenuListener() {
    const userAreaButton = document.querySelector('nde-user-area button.user-area-btn');

    if (userAreaButton) {
      userAreaButton.addEventListener('click', () => {
        setTimeout(() => {
          this.addCustomLinksToMenu();
        }, 200);
      });
    }

    this.observeForMenu();
  }

  private observeForMenu() {
    const observer = new MutationObserver((mutations) => {
      const userMenu = document.querySelector('.user-area-sub-menu .mat-mdc-menu-content');

      if (userMenu && !userMenu.querySelector('.custom-su-user-links')) {
        this.addCustomLinksToMenu();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private addCustomLinksToMenu() {
    const menuContent = document.querySelector('.user-area-sub-menu .mat-mdc-menu-content');

    if (menuContent && !menuContent.querySelector('.custom-su-user-links') && this.links.length > 0) {
      const divider = document.createElement('mat-divider');
      divider.setAttribute('role', 'separator');
      divider.setAttribute('class', 'mat-divider nde-divider mat-divider-horizontal custom-su-user-links');
      divider.setAttribute('aria-orientation', 'horizontal');

      menuContent.appendChild(divider);

      // Add all links from configuration
      this.links.forEach(linkConfig => {
        const link = this.createMenuLink(linkConfig.href, linkConfig.text, linkConfig.ariaLabel);
        menuContent.appendChild(link);
      });
    }
  }

  private createMenuLink(href: string, text: string, ariaLabel: string): HTMLElement {
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.setAttribute('target', '_blank');
    link.setAttribute('tabindex', '0');
    link.setAttribute('class', 'mat-mdc-menu-item mat-focus-indicator ng-star-inserted custom-su-user-links');
    link.setAttribute('aria-label', ariaLabel);
    link.setAttribute('role', 'menuitem');
    link.setAttribute('aria-disabled', 'false');

    link.innerHTML = `
      <mat-icon role="img" class="mat-icon notranslate nde-mat-icon-size grey-icon-color-no-stroke account-option-icon mat-icon-no-color ng-star-inserted" aria-hidden="true">
       <svg height="100%" viewBox="0 -960 960 960" width="100%" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"></path></svg>
      </mat-icon>
      <span class="mat-mdc-menu-item-text">
        <span>${text}</span>
      </span>
      <div matripple="" class="mat-ripple mat-mdc-menu-ripple"></div>
    `;

    return link;
  }
}
