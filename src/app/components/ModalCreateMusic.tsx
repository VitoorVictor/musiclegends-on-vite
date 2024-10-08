import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormDataState = {
  title: string ;
  artist: string ;
  album?: string | null;
  genre?: string | null;
  image: File | null;
  audio: File | null;
};

export const ModalCreateMusic: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    title: '',
    artist: '',
    album: null,
    genre: null,
    image: null,
    audio: null,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Função para lidar com o upload de imagem e criar a pré-visualização
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxLengthMB = 5 * 1024 * 1024;

      if (
        (file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg") &&
        file.size < maxLengthMB
      ) {
        setFormData((prevState) => ({
          ...prevState,
          image: file,
        }));
        setSelectedImage(URL.createObjectURL(file)); // Cria pré-visualização
      } else if (file.size > maxLengthMB) {
        toast.error("Selecione uma imagem com tamanho menor que 5MB");
      } else {
        toast.error("Selecione uma imagem no formato PNG, JPG ou JPEG");
      }
    } else {
      setSelectedImage(null); // Não exibe pré-visualização
      toast.error("Nenhuma imagem foi selecionada");
    }
  };

  // Função para lidar com o upload de áudio
  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Acessa o primeiro arquivo de áudio
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        audio: file,
      }));
    } else {
      toast.error("Nenhum arquivo de áudio selecionado");
    }
  };

  // Função para enviar o formulário
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    let valid = true;

    if (formData.title) {
      data.append("title", formData.title);
    } else {
      valid = false;
      toast.error("O campo título é obrigatório");
    }

    if (formData.artist) {
      data.append("artist", formData.artist);
    } else {
      valid = false;
      toast.error("O campo artista é obrigatório");
    }

    if (formData.album) {
      data.append("album", formData.album);
    }

    if (formData.genre) {
      data.append("genre", formData.genre);
    }

    if (formData.image) {
      data.append("image", formData.image);
    } else {
      valid = false;
      toast.error("É necessário selecionar uma imagem");
    }

    if (formData.audio) {
      data.append("audio", formData.audio);
    } else {
      valid = false;
      toast.error("É necessário selecionar um arquivo de áudio");
    }//aqui coloque um toast
    
    if (!valid) {
      return; // Para o envio se houver algum erro
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/musics", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Upload bem-sucedido!");
      } else {
        toast.error("Erro no upload.");
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro na resposta do servidor:", error.response?.data);
        toast.error("Erro na resposta do servidor");
      } else {
        toast.error("Erro desconhecido");
      }
    
      setFormData({
        title: '',
        artist: '',
        album: null,
        genre: null,
        image: null,
        audio: null,
      });
      setSelectedImage(null);}
  };


  return (
        <div
            id="default-modal"
            aria-hidden="true"
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-96 max-h-full">
              <div className="relative rounded-lg shadow bg-gray-800">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Criar Nova Música
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} >
                    <div className="flex items-center justify-center py-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Anexe os Arquivos a baixo
                        </h3>
                    </div>
                    <div className="relative flex justify-center mx-2 mb-2 gap-1">
                        <div className="flex justify-center items-center text-center">
                      <label
                        htmlFor="image-upload"
                        className="px-1 py-2 text-sm font-medium text-white focus:outline-none bg-gray-10 rounded-md hover:bg-gray-500 cursor-pointer "
                      >
                        Arquivo de Imagem
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageChange}
                        className="hidden"
                        required
                      />
                        </div>
                        <div className="flex justify-center items-center text-cente">
                        <label
                            htmlFor="src-upload"
                            className="px-1 py-2 text-sm font-medium text-white focus:outline-none bg-gray-10 rounded-md hover:bg-gray-500 cursor-pointer"
                        >
                            Arquivo de Áudio
                        </label>
                        <input
                            id="src-upload"
                            type="file"
                            accept="audio/*" // Aceita todos os tipos de arquivos de áudio
                            className="hidden"
                            onChange={handleAudioChange}
                            required
                        />
                        </div>
                  </div>

                  <div className="max-w-64 block justify-center h-72 rounded-lg bg-gray-10 mx-auto my-2">
                    <div className="h-4/5 rounded-lg relative flex flex-col items-center justify-start">
                      {/* Exibe a pré-visualização da imagem selecionada */}
                      {selectedImage && (
                        <img
                          className="h-full w-full object-center object-cover px-2 pt-2"
                          src={selectedImage}
                          alt="Imagem selecionada"
                        />
                      )}
                    </div>

                    <div className="relative m-auto px-5">
                      <div className="absolute w-full m-auto px-5 right-0 left-0 bottom-14">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          placeholder="Título"
                          className="h-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md placeholder:text-sm block w-full p-1.5"
                          onChange={(e) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              title: e.target.value,
                            }))
                          }
                          value={formData.title}
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="artist"
                          id="artist"
                          placeholder="Artista"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  placeholder:text-sm block w-full p-1.5"
                          onChange={(e) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              artist: e.target.value,
                            }))
                          }
                          value={formData.artist}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 text-white">
                      ola a
                  </div>

                  <div className="flex items-center p-4 md:p-5 border-t rounded-b dark:border-gray-600">
                    <button
                      type="submit"
                      className="text-white bg-brand-color hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                    >
                      Cadastrar
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contêiner para o Toastify */}
            <ToastContainer />

          </div>
    )

}