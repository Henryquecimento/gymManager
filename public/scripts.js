const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

// Pagination

function paginate(selectedPage, totalPages) {
  let pages = [],
    oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    // A currentPage, está mopdificando-se a cada loop, ela é dinâmica /
    // o select é que está 'fixo'
    // exemplo: selecionei pagina 1, mas o loop com array vai continuar
    //a ser executado, caso esteja dentro da condição(select = 1 e
    // currentPage = 4, tendo o PagesAfter falso e não executa o IF), até o
    // 20 (aqui o oldPage será então o 3)

    if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
      /*
       * selectedPage = 6, --> 5 and 4 will be the two numbers before selectedPage AND 7 and 8 the after ones
       * 1 and 8 will be the OldPages
       * 4 and 20 will be the CurrentPages
       */
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }

      // Para ser EXIBIDO o número antes ou depois(quando tem só um número para
      // aparecer) do currentPage (teste select = 16 ou 5)
      // 17,18, (( 19 )) ,20
      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
        // or currentPage -1
      }

      pages.push(currentPage);

      oldPage = currentPage;
      /*
       * na primeira vez(1) que é executado o loop, oldPage é undefined, ou seja,
       * o "..." não é executado
       * na segunda vez(2), o oldPage tem valor = 1 (antigo currentPage)
       */
    }
  }

  return pages;
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;

  const pages = paginate(page, total);

  let elements = "";

  for (let page of pages) {
    if (String(page).includes('...')) {
      elements += `<span>${page}</span>`;
    } else {
      if (filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
      } else {
        elements += `<a href="?page=${page}">${page}</a>`;
      }
    }

  }

  pagination.innerHTML = elements;


}

const pagination = document.querySelector(".pagination");

if (pagination) {
  createPagination(pagination);
}