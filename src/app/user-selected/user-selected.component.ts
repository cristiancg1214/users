import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-selected',
  templateUrl: './user-selected.component.html',
  styleUrls: ['./user-selected.component.css']
})
export class UserSelectedComponent implements OnInit {
  user: any = {}
  constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let login = this.activatedRoute.snapshot.params.login
    this.search(login)
  }
  search(user: string) {
    this.api.getUserByLogin(user).subscribe(data => {
      this.user = {
        login: data.login,
        image: data.avatar_url,
        page: data.html_url
      }

    })
  }
  
}
