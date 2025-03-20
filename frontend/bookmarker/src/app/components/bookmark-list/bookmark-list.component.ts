import { Component } from '@angular/core';
import { RestServiceService } from '../../services/rest-service.service';
import { Bookmark } from '../../models/bookmark';

@Component({
  selector: 'app-bookmark-list',
  standalone: false,
  templateUrl: './bookmark-list.component.html',
  styleUrl: './bookmark-list.component.scss'
})
export class BookmarkListComponent {

  bookmarks: Bookmark[] = [];
  constructor(private restService: RestServiceService) { }

  ngOnInit() {
    this.restService.getBookmarks().then(bookmarks => {
      this.bookmarks = bookmarks; 
    });
  }
  deleteBookmark(bookmark: Bookmark) {
    // this.restService.deleteBookmark(bookmark).then(() => {
    //   this.bookmarks = this.bookmarks.filter(b => b.id !== bookmark.id);
    // });
    console.log('Delete bookmark: ' + bookmark.id);
  }
}
