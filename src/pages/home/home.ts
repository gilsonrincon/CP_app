import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	items: any[];
	texto: string;

  constructor(public navCtrl: NavController) {
  	this.items = [];
  	this.texto = "prueba";

  	for(let i = 0; i<= 10; i++){
  		this.items.push({
  			text: "Item N"+i,
  			id: i
  		});
  	}

  }

  ItemSelected(item){
  	this.navCtrl.push(PostPage, { item: item });
  }

}
