import previewView from './previewView';
import View from './View';

const icons = new URL('../../img/icons.svg', import.meta.url);
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your search! Please try again';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
