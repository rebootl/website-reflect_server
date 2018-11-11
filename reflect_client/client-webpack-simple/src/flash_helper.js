import { global_state } from './main.js';

export function flash(type, msg) {
  global_state.flash.type = type;
  global_state.flash.msg = msg;
  global_state.flash.shown = true;
}
