import { ModalCreateMusic } from "./ModalCreateMusic";

export const Navbar = () => {

  return (
    //bg-dark-10/90 h-24 w-full flex lg:justify-around justify-between p-4  md:p-12 lg:p-0 items-center text-lg absolute top-0

    <nav className="border-gray-200 bg-dark-10/90">
      <div className="max-w-screen flex flex-wrap items-center justify-between md:mx-2 lg:mx-20 p-4 text-lg h-24 ">
        <div className="flex space-x-2 md:space-x-10 items-center justify-start">
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center md:p-2 md:w-10 md:h-10 justify-center text-sm rounded-lg "
            data-drawer-target="drawer-navigation"
            data-drawer-show="drawer-navigation"
            aria-controls="drawer-navigation"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="#929292"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <a href="/" className="flex items-center space-x-3">
            <img src="/assets/icone.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold text-brand-color whitespace-nowrap text-white">
              Music Legends
            </span>
          </a>
        </div>

        <div className="flex md:order-1 md:-translate-x-10">
          {/* Botao pesquisa tela MD */}
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="#929292"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>

          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="#131313"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block md:w-44 p-2 ps-10 text-sm text-gray-900 border lg:hover:w-64 transition-transforme duration-1000 ease-in-out border-gray-10 rounded-lg bg-gray-10 placeholder:text-dark-10"
              placeholder="Busque por músicas ou playlists..."
            />
          </div>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2"
          id="navbar-search"
        >
          <div className="block text-white md:flex justify-end items-center gap-10 hidden">
            <button
              className="hover:text-brand-color"
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
            >
              Incluir
            </button>
            <a href="" className="hover:scale-110">
              <img
                src="https://via.placeholder.com/50x50"
                alt="profile"
                className="border rounded-full w-12"
              />
            </a>
          </div>
        </div>
      </div>
      <ModalCreateMusic />
    </nav>
  );
};
