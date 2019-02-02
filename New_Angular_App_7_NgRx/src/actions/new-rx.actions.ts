import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { NewRx } from './../models/new-rx.model';

export const ADD_NEWRX = '[NEWRX] Add';
export const REMOVE_NEWRX = '[NEWRX] Remove';

export class AddNewrx implements Action {
  readonly type = ADD_NEWRX;

  constructor(public payload: NewRx) {}
}