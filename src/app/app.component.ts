import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myfirstapp';
  query = 'query {firstQuery}'
  private querySubscription!: Subscription;
  data = ''
  loading!: boolean;
 
  constructor(private apollo : Apollo){}
  
  
  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: gql`query {firstQuery}`
    }).valueChanges.subscribe(({data, loading}) => {
      // do stuff here
      this.loading = loading;
      this.data = data.firstQuery
    })
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
