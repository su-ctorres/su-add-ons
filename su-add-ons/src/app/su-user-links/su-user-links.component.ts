import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';

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
export class SuUserLinksComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly menuMarkerClass = 'custom-su-user-links';
  private readonly links: SuUserLink[] = [];
  private menuObserver?: MutationObserver;
  private readonly handleUserMenuClick = () => {
    setTimeout(() => this.addCustomLinksToMenu(), 200);
  };

  constructor(@Optional() @Inject('MODULE_PARAMETERS') moduleParameters?: Record<string, string>) {
    let linkIndex = 1;

    while (true) {
      const href = moduleParameters?.[`href${linkIndex}`];

      if (!href) {
        break;
      }

      this.links.push({
        href,
        text: moduleParameters?.[`text${linkIndex}`] || `Link ${linkIndex}`,
        ariaLabel: moduleParameters?.[`ariaLabel${linkIndex}`] || `Go to Link ${linkIndex}`
      });
      linkIndex++;
    }
  }

  ngOnInit(): void {
    this.setupMenuListener();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setupMenuListener(), 100);
  }

  ngOnDestroy(): void {
    document
      .querySelector('nde-user-area button.user-area-btn')
      ?.removeEventListener('click', this.handleUserMenuClick);
    this.menuObserver?.disconnect();
  }

  private setupMenuListener(): void {
    document
      .querySelector('nde-user-area button.user-area-btn')
      ?.addEventListener('click', this.handleUserMenuClick);

    this.observeForMenu();
  }

  private observeForMenu(): void {
    if (this.menuObserver) {
      return;
    }

    this.menuObserver = new MutationObserver(() => {
      const userMenu = document.querySelector('.user-area-sub-menu .mat-mdc-menu-content');

      if (userMenu && !userMenu.querySelector(`.${this.menuMarkerClass}`)) {
        this.addCustomLinksToMenu();
      }
    });

    this.menuObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private addCustomLinksToMenu(): void {
    const menuContent = document.querySelector('.user-area-sub-menu .mat-mdc-menu-content');

    if (!menuContent || menuContent.querySelector(`.${this.menuMarkerClass}`) || this.links.length === 0) {
      return;
    }

    const divider = document.createElement('mat-divider');
    divider.setAttribute('role', 'separator');
    divider.setAttribute('class', `mat-divider nde-divider mat-divider-horizontal ${this.menuMarkerClass}`);
    divider.setAttribute('aria-orientation', 'horizontal');
    menuContent.appendChild(divider);

    this.links.forEach((linkConfig) => {
      menuContent.appendChild(this.createMenuLink(linkConfig));
    });
  }

  private createMenuLink(linkConfig: SuUserLink): HTMLElement {
    const link = document.createElement('a');
    link.setAttribute('href', linkConfig.href);
    link.setAttribute('target', '_blank');
    link.setAttribute('tabindex', '0');
    link.setAttribute('class', `mat-mdc-menu-item mat-focus-indicator ng-star-inserted ${this.menuMarkerClass}`);
    link.setAttribute('aria-label', linkConfig.ariaLabel);
    link.setAttribute('role', 'menuitem');
    link.setAttribute('aria-disabled', 'false');

    link.innerHTML = `
      <mat-icon role="img" class="mat-icon notranslate nde-mat-icon-size grey-icon-color-no-stroke account-option-icon mat-icon-no-color ng-star-inserted" aria-hidden="true">
        <svg height="100%" viewBox="0 -960 960 960" width="100%" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"></path></svg>
      </mat-icon>
      <span class="mat-mdc-menu-item-text">
        <span>${linkConfig.text}</span>
      </span>
      <div matripple="" class="mat-ripple mat-mdc-menu-ripple"></div>
    `;

    return link;
  }
}
