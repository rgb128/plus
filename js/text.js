'use strict';

const descriptionTextarea = document.querySelector('#text > textarea');
descriptionTextarea.oninput = (e) => {
    const value = descriptionTextarea.value || '';
    descriptionTextarea.setAttribute('rows', value.split('\n').length || 1);
    window.localStorage['descriptionText'] = value;
}

(() => {
    const value = window.localStorage['descriptionText'] || '';
    descriptionTextarea.setAttribute('rows', value.split('\n').length || 1);
    descriptionTextarea.value = value;
})();
