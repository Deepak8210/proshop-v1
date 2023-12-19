//-------------------menu--------------------//
const menuHandler = (menuRef, menuBar, closeRef) => {
  menuRef.current?.classList.add("menu-show");
  menuBar.current?.classList.add("hidden");
  closeRef.current?.classList.remove("hidden");
};

const menuBarCloseHandler = (menuRef, menuBar, closeRef) => {
  menuRef.current?.classList.remove("menu-show");
  menuBar.current?.classList.remove("hidden");
  closeRef.current?.classList.add("hidden");
};

//------------------search--------------------//
const searchCloseHandler = (searchRef) => {
  searchRef.current?.classList.remove("search-show");
};

const searchHandler = (menuRef, searchRef) => {
  searchRef.current?.classList.toggle("search-show");
  menuRef.current?.classList.remove("menu-show");
};

export { menuHandler, menuBarCloseHandler, searchCloseHandler, searchHandler };
