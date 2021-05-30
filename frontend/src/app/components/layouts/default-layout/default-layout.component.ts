import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayout implements OnInit {
  appitems = [
    {
      label: 'Услуги',
      items: [
        {
          label: 'Услуги',
          icon: 'list',
          hrefTargetType: '_blank',
          link: '/service/services',
        },
        {
          label: 'Группы услуг',
          icon: 'folder',
          hrefTargetType: '_blank',
          link: '/service/groups',
        },
        {
          label: 'Дерево услуг',
          icon: 'account_tree',
          hrefTargetType: '_blank',
          link: '/service/tree',
        },
      ]
    },
    {
      label: 'Операторы',
      icon: 'people_alt',
      link: '/operators',
      hrefTargetType: '_blank'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
