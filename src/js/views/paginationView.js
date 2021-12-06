import View from './View';
const icons = new URL('../../img/icons.svg', import.meta.url);

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      //console.log(btn);
      const goToPage = +btn.dataset.goto;
      //console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    //console.log(curPage, numPages);
    // page 1, and there are other pages

    if (curPage === 1 && numPages > 1) {
      return this.renderNext(curPage);
    }
    // page 1, and there are No other pages
    if (curPage === 1 && numPages === 1) {
      return '';
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return this.renderPer(curPage);
    }
    // other page
    if (curPage < numPages) {
      return this.renderPer(curPage) + this.renderNext(curPage);
    }
  }

  renderPer(curPage) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        curPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>`;
  }

  renderNext(curPage) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        curPage + 1
      }">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
  }
}

export default new PaginationView();
