import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { PostsProvider } from '../../providers/posts/posts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  postsList: any[];

  constructor(public navCtrl: NavController, private postProvider: PostsProvider) {
    this.postProvider.getPosts().subscribe(res => {
      //console.log(res);
      this.postsList = [];
      for(let key in res){
        let post = {title: res[key].title.rendered,
                    intro: res[key].excerpt.rendered,
                    media_id: res[key].featured_media
              };
        this.postsList.push(post);
      }
    });
  }

  postImage(id){
    let imgUrl = this.postProvider.baseUrl;
    
    return "";
  }

}
