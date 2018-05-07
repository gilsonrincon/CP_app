import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { PostsProvider } from '../../providers/posts/posts';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  postsList: any[];
  useLocalData: boolean;

  constructor(public navCtrl: NavController, private postProvider: PostsProvider, private storage: Storage) {
    if(storage.keys.length == 0) this.useLocalData = false;
    else this.useLocalData = true;
  }

  ionViewDidLoad(){
    if(this.useLocalData == false){
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
    }else{
      this.storage.get('postsList').then((val) => {
        console.log(val);
        this.postsList = val;
      });

      let post = {title: 'Artículo 1',
                  intro: 'Descripción',
                  media_id: 1,
                  id: 2,
                  media_url: "https://secure.gravatar.com/avatar/8410228932b0b1164f11441c6f4a334a"
            };
      this.postsList.push(post);
    }
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
