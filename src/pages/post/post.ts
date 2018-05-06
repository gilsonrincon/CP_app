import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

	post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private postProvider: PostsProvider) {
    this.post = {
      id: this.navParams.data.id,
      content: "",
      title: "",
      media_url: ""
    };

    this.postProvider.getPost(this.post.id).subscribe(res => {
      let res_arr = [];
      res_arr.push(res);
      for(let k in res_arr){
        this.post.content = res_arr[k].content.rendered;
        this.post.title = res_arr[k].title.rendered;
        this.postImage(res_arr[k].featured_media);
      }
    });
  }

  postImage(id){
    this.postProvider.getPostMedia(id).subscribe(data => {
      let data_arr = [];
      data_arr.push(data);
      for(let k in data_arr)
        this.post.media_url = data_arr[k].source_url;
    });
  }

  ionViewDidLoad() {

  }

}
