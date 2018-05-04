import { Component } from '@angular/core';
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
      id: this.navParams.get('id'),
      content: "",
      media_url: "",
      title: "",
      image: ""
    };

    this.postProvider.getPost(this.post.id).subscribe(res => {
      console.log(res);
      this.post.content = res.content.rendered;
      this.post.title = res.title.rendered;

    });
  }

  ionViewDidLoad() {

  }

}
