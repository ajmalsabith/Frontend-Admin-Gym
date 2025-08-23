// import { animate, state, style, transition, trigger } from '@angular/animations';
// import { AsyncPipe, NgTemplateOutlet, SlicePipe } from '@angular/common';
// import {
//   ChangeDetectionStrategy,
//   Component,
//   Input,
//   ViewEncapsulation,
//   inject,
// } from '@angular/core';
// import { MatRippleModule } from '@angular/material/core';
// import { MatIconModule } from '@angular/material/icon';
// import { RouterLink, RouterLinkActive } from '@angular/router';
// import { TranslateModule } from '@ngx-translate/core';
// import { NgxPermissionsModule } from 'ngx-permissions';

// import { MenuService } from '@core';
// import { NavAccordionItemDirective } from './nav-accordion-item.directive';
// import { NavAccordionToggleDirective } from './nav-accordion-toggle.directive';
// import { NavAccordionDirective } from './nav-accordion.directive';

// @Component({
//   selector: 'app-sidemenu',
//   templateUrl: './sidemenu.component.html',
//   styleUrl: './sidemenu.component.scss',
//   encapsulation: ViewEncapsulation.None,
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   standalone: true,
//   imports: [
//     AsyncPipe,
//     SlicePipe,
//     NgTemplateOutlet,
//     RouterLink,
//     RouterLinkActive,
//     NgxPermissionsModule,
//     MatIconModule,
//     MatRippleModule,
//     TranslateModule,
//     NavAccordionDirective,
//     NavAccordionItemDirective,
//     NavAccordionToggleDirective,
//   ],
//   animations: [
//     trigger('expansion', [
//       state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
//       state('expanded', style({ height: '*', visibility: '' })),
//       transition(
//         'expanded <=> collapsed, void => collapsed',
//         animate('225ms cubic-bezier(0.4,0,0.2,1)')
//       ),
//     ]),
//   ],
// })
// export class SidemenuComponent {
//   // The ripple effect makes page flashing on mobile
//   @Input() ripple = false;

//   private readonly menu = inject(MenuService);

//   menu$ = this.menu.getAll();

//   buildRoute = this.menu.buildRoute;
// }



import { animate, state, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, NgTemplateOutlet, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
  ViewChildren,
  QueryList,
  OnInit,
  OnDestroy
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MenuService } from '@core';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';
import { NavAccordionToggleDirective } from './nav-accordion-toggle.directive';
import { NavAccordionDirective } from './nav-accordion.directive';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    SlicePipe,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgxPermissionsModule,
    MatIconModule,
    MatRippleModule,
    TranslateModule,
    NavAccordionDirective,
    NavAccordionItemDirective,
    NavAccordionToggleDirective,
  ],
  animations: [
    trigger('expansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: '' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4,0,0.2,1)')
      ),
    ]),
  ],
})
export class SidemenuComponent implements OnInit, OnDestroy {
  @Input() ripple = false;

  private readonly menu = inject(MenuService);
  private readonly router = inject(Router);
  private routerSub!: Subscription;

  menu$ = this.menu.getAll();
  buildRoute = this.menu.buildRoute;

  @ViewChildren(NavAccordionItemDirective) navItems!: QueryList<NavAccordionItemDirective>;

  // ngOnInit(): void {
  //   // Close all submenus on every navigation
  //   this.routerSub = this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       this.navItems?.forEach(item => (item.expanded = false));
  //     });
  // }
  ngOnInit(): void {
  // Keep only the submenu related to the current route open
  this.routerSub = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const currentUrl = this.router.url;

      this.navItems?.forEach(item => {
        // Check if this item's route is part of the current URL
        const isParentOfActiveRoute =
          !!item.route && currentUrl.includes(item.route);

        item.expanded = isParentOfActiveRoute;
      });
    });
}


  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
