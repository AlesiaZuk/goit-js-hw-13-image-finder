import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';

defaultModules.set(PNotifyMobile, {});
defaults.delay = 3000;

export default function showError() {
  error({
    text: `Images with this keyword don't exist, check your spelling!`,
  });
}
