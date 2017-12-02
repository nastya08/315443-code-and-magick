'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var setupOpenIcon = userDialogOpen.querySelector('.setup-open-icon');
var setupUserName = userDialog.querySelector('.setup-user-name');

var wizards = [];

var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');

var getRandomElement = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomWizards = function () {
  for (var i = 0; i < 4; i++) {
    wizards.push({
      name: WIZARD_NAMES[getRandomElement(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomElement(0, WIZARD_SURNAMES.length - 1)],
      coatColor: COAT_COLORS[getRandomElement(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[getRandomElement(0, EYES_COLORS.length - 1)]
    });
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var insertWizard = function () {
  var fragment = document.createDocumentFragment();

  getRandomWizards();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

insertWizard();

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target.tagName !== 'INPUT') {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupUserName.addEventListener('invalid', function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity('');
  }
});

setupUserName.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = COAT_COLORS[getRandomElement(0, COAT_COLORS.length - 1)];
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = EYES_COLORS[getRandomElement(0, EYES_COLORS.length - 1)];
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = FIREBALL_COLORS[getRandomElement(0, FIREBALL_COLORS.length - 1)];
});
