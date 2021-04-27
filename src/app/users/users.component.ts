import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../app/services/api.service';
import { Response } from '../models/response.interface';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public canvas: any;
  public ctx: any;
  public labels: any = [];
  public prueba: any = [];
  public data: any = [];
  public dataCases: any = {
    chart1: [2000, 10000, 12000, 14000, 6000, 0, 0, 0, 0, 0, 0, 0],
    chart2: [200, 1000, 1200, 1400, 600, 0, 0, 0, 0, 0, 0, 0],
  };
  login: string = '';
  users: User[] = [];
  constructor(private api: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.loadUsers();
    this.createLineChart()
  }

  loadUsers() {
    let promise = new Promise((resolve, reject) => {
      this.api
        .getUsers()
        .toPromise()
        .then((res) => {
          this.users = res.slice(0, 10);

          this.users.forEach((element) => {
            this.labels.push(element.login);
            this.data.push({ user: element.login, followers: element.followers_url })

          });
          this.searchFollowers();
        })
        .catch((e) => alert('Error trayendo usuarios'));
    });
    return promise;
  }
  editar(datos: User) {
    this.login = datos.login;
    this.labels = [];
    this.router.navigate(['user-selected' + '/' + datos.login]);
  }

  search(user: string) {
    if (user === 'doublevpartners') {
      alert('Esta palabra está prohibida');
      return;
    }
    if (user.length >= 4) {
      this.api
        .getUserByLogin(user)
        .toPromise()
        .then((res) => {
          this.users = [res];
        })
        .catch((e) => {
          if (e.status === 404) {
            alert('Usuario no encontrado');
          } else {
            alert('Error de conexión');
          }
        });
    } else {
      alert('El valor mínimo de busqueda es de cuatro caracteres');
    }
  }
  onchange(user: any) {
    if (user.target.value === '') {
      this.loadUsers();
    }
  }
  private createLineChart() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          data: this.prueba
        },]
      },
      options: {
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    }
    });
  }

  searchFollowers() {
    for (let index = 0; index < this.data.length; index++) {

      this.api.getFollowers(this.data[index].followers).subscribe(result => {
        this.prueba.push(result.length)

      })
    }
    
  }
}

