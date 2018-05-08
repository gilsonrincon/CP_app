import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { PostsProvider } from '../../providers/posts/posts';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  postsList: any[];
  onLine: boolean;
  constructor(public navCtrl: NavController, private postProvider: PostsProvider, private storage: Storage, private network: Network) {
    this.onLine = false;
  }

  ionViewDidEnter(){
    console.log('evento');
    this.network.onConnect().subscribe(data => {
      this.onLine = true;
      console.log(data);
    }, error => {
      console.log(error);
    });
    this.network.onDisconnect().subscribe(data => {
      this.onLine = false;
      console.log(data);
    }, error => {
      console.log(error)
    });
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

      this.storage.set('postsList', this.postsList);
    });
  }

  readMoreClick(id){
    this.navCtrl.push(PostPage, {
      id: id
    });
  }
}
