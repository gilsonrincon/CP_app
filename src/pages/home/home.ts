import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { PostsProvider } from '../../providers/posts/posts';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  postsList: any[];

  constructor(public navCtrl: NavController, private postProvider: PostsProvider) {

  }

  ionViewDidLoad(){
    this.postProvider.getPosts().subscribe(res => {
      this.postsList = [];
      for(let key in res){
        let post = {title: res[key].title.rendered,
                    intro: res[key].excerpt.rendered,
                    media_id: res[key].featured_media,
                    id: res[key].id,
                    media_url: ""
              };
        this.postImage(res[key].featured_media,key);
        this.postsList.push(post);
      }
    });
  }

  postImage(id, index){
    this.postProvider.getPostMedia(id).subscribe(data => {
      let data2 = [];
      data2.push(data);
      for(let k in data2){
          this.postsList[index].media_url = data2[k].guid.rendered;
      }



    });
  }

  readMoreClick(id){
    this.navCtrl.push(PostPage, {
      id: id
    });
  }

}
