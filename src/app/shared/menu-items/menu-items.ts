import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'user', type: 'link', name: 'Users', icon: 'people' },
  { state: 'group', type: 'link', name: 'Groups', icon: 'view_comfy' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
