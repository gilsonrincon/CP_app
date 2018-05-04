import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {
  baseUrl: string;
  constructor(public http: HttpClient) {
    this.baseUrl = "https://gilsonrincon.info/wp-json/wp/v2";
  }

  getPosts(){
    return this.http.get(this.baseUrl+'/posts');
  }

  getPostMedia(id){
    return this.http.get(this.baseUrl+'/media/'+id);
  }

  getPost(id){
    return this.http.get(this.baseUrl+'/posts/'+id);
  }
}
