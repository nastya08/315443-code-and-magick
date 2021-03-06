'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var wizards = [];

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
