import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { PostsProvider } from '../../providers/posts/posts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	items: any[];
	texto: string;
  posts: string;

  constructor(public navCtrl: NavController, private postProvider: PostsProvider) {
  	this.items = [];
  	this.texto = "prueba";

  	for(let i = 0; i<= 10; i++){
  		this.items.push({
  			text: "Item N"+i,
  			id: i
  		});
  	}

    this.postProvider.getPosts();
  }

  ItemSelected(item){
  	this.navCtrl.push(PostPage, { item: item });
  }

}
