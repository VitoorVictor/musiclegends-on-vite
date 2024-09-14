import React from "react";

interface IMusicPlaylistCardProps {
    src: string,
    title: string,
    author?: string,
    description?: string,
}

export const MusicPlaylistCard:React.FC<IMusicPlaylistCardProps> = (props) => {
  return (
    <div className="w-52 block justify-center h-64 rounded-lg bg-gray-900/60 hover:bg-gray-800/80 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl overflow-hidden relative group cursor-pointer">
      <a href="#" className="relative rounded-lg overflow-hidden">
        <img
          className="h-4/6 w-full object-center object-cover"
          src={props.src}
          alt={props.title}
        />
        {/* <img src="/assets/icone.png" alt="logo" width="30px" className="absolute top-2 left-2 opacity-0 group-hover:opacity-70"/> */}
        <div className="absolute top-16 left-20 p-2 opacity-0 group-hover:opacity-100 rounded-full bg-red-500 transition-all duration-500 ease-in-out">
          <svg
            width="30"
            height="30"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 7.47751V40.5225C14.0049 40.7862 14.0792 41.044 14.2155 41.2698C14.3518 41.4956 14.5452 41.6814 14.7762 41.8086C15.0073 41.9358 15.2678 41.9999 15.5314 41.9943C15.7951 41.9887 16.0527 41.9138 16.2781 41.7769L43.2931 25.2544C43.5089 25.1238 43.6874 24.9397 43.8112 24.72C43.9351 24.5002 44.0001 24.2523 44.0001 24C44.0001 23.7478 43.9351 23.4998 43.8112 23.2801C43.6874 23.0603 43.5089 22.8762 43.2931 22.7456L16.2781 6.22314C16.0527 6.08628 15.7951 6.01128 15.5314 6.00571C15.2678 6.00013 15.0073 6.06418 14.7762 6.19139C14.5452 6.3186 14.3518 6.50448 14.2155 6.73028C14.0792 6.95608 14.0049 7.21382 14 7.47751Z"
              fill="#FFF"
              stroke="#FFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </a>
      <div className="bg-gray-900/60 p-4 rounded-b-lg w-full flex flex-col items-start">
        <a href="#" className="block mb-2">
          <h5 className="text-lg font-bold text-white truncate hover:underline">
            {props.title}
          </h5>
        </a>
        {props.author && (
          <p className="text-sm text-gray-200 truncate hover:underline">
            {props.author}
          </p>
        )}
        {props.description && (
          <p className="text-xs text-gray-300 truncate hover:underline">
            {props.description}
          </p>
        )}
      </div>
    </div>
  );
};


// meu 

{/* <div className="max-w-52 block justify-center h-64 rounded-lg hover:bg-gray-10/30 bg-gray-10/60">
        <a href="#" className="rounded-xl">
          <img
            className="rounded-lg h-4/5 object-center object-cover px-2 pt-2"
            src={props.src}
            alt={props.title}
          />
        </a>
        <div className="relative px-5">
          <a href="#" className="absolute bottom-8">
            <h5 className="mb-2 text-lg font-bold text-white">
              {props.title}
            </h5>
          </a>
          {props.author && (
            <p className="mt-1 text-white">{props.author}</p>
          )}
          {props.description && (
            <p className="mt-1 text-sm text-white">{props.description}</p>
          )}
        </div>
      </div> */}

// chat 1
{/* <div className="block h-80 rounded-lg bg-gray-900/60 hover:bg-gray-800/80 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl overflow-hidden">
    <a href="#" className="relative block h-48 w-48">
      <img
        className="absolute inset-0 w-full h-full object-cover border-4 border-gray-700"
        src={props.src}
        alt={props.title}
      />
    </a>
    <div className="relative px-4 py-3">
      <a href="#" className="block">
        <h5 className="text-lg font-bold text-white truncate">{props.title}</h5>
      </a>
      {props.author && (
        <p className="text-sm font-medium text-gray-400 mt-1">{props.author}</p>
      )}
      {props.description && (
        <p className="mt-2 text-xs text-gray-300">{props.description}</p>
      )}
    </div>
  </div> */}