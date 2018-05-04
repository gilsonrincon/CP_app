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
                    media_id: res[key].featured_media,
                    media_url: ""
              };
        this.postImage(res[key].featured_media,key);
        this.postsList.push(post);
      }
    });
  }

  postImage(id, index){
    this.postProvider.getPostMedia(id).subscribe(data => {
      this.postsList[index].media_url = data.source_url;
    });
  }

}
