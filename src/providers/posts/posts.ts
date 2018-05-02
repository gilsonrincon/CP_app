import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PostsProvider Provider');
  }

  getPosts(){
    this.http.get('https://gilsonrincon.info/wp-json/wp/v2/posts').map(res => res).subscribe(data => {
      console.log(data);
    });
  }
}
