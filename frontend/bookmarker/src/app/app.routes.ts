import { Routes } from '@angular/router';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: 'bookmarks', component: BookmarkListComponent },
    { path: 'about', component: AboutComponent },
    { path: '', redirectTo: '/bookmarks', pathMatch: 'full' },
    { path: '**', redirectTo: '/bookmarks' }
];
