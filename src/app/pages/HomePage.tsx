import { useState, useEffect } from "react";
import axios from "axios";
import { MusicPlaylistCard } from "../components/MusicPlaylistCard";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

interface IMusicData {
  id: number;
  title: string;
  artist: string;
  image_path: string;
  audio_path: string;
}

export const HomePage = () => {
  const [musics, setMusics] = useState<IMusicData[]>([]); // Estado para armazenar as músicas
  const background = 'url("/assets/background2.jpg")';

  // Função para buscar as músicas da API
   
  const fetchMusics = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/musics");
      setMusics(response.data); // Armazenando os dados recebidos no estado
    } catch (error) {
      console.error("Erro ao buscar as músicas:", error);
    }
  };

  // Usando useEffect para fazer a requisição quando o componente for montado
  useEffect(() => {
    fetchMusics();
    console.log(musics);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="min-w-screen min-h-screen bg-center bg-cover bg-fixed"
      style={{ backgroundImage: background }}
    >
      <Navbar />
      <Sidebar />
      <section className="flex flex-col w-5/6 mx-auto py-10">
        <h2 className="font-bold text-white text-4xl mb-5">As mais ouvidas</h2>
        <main className="grid grid-flow-col auto-cols-max overflow-x-auto gap-2">
          {/* Mapeando os dados recebidos e renderizando os componentes MusicPlaylistCard */}
          {musics.map((music) => (
            <MusicPlaylistCard
              key={music.id}
              src={`http://127.0.0.1:8000/${music.image_path}`} // Caminho da imagem dinâmica
              title={music.title}
              author={music.artist}
            />
          ))}
        </main>
      </section>
    </div>
  );
};

{
  /* <section className="flex flex-col w-5/6 mx-auto py-10">
            <h2 className="font-bold text-white text-4xl mb-5">Seus favoritos</h2>
            <main className="grid grid-flow-col auto-cols-max overflow-x-auto gap-2">
            
                
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                /> 
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />

<MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />

<MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
           
            </main>
</section>
<section className="flex flex-col w-5/6 mx-auto py-10">
            <h2 className="font-bold text-white text-4xl mb-5">Playlists do Momento</h2>
            <main className="grid grid-flow-col auto-cols-max overflow-x-auto gap-2">
            
                
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                /> 
                <MusicPlaylistCard 
                    src="/assets/background.jpg"
                    title="Ahri Music 2024"
                    author="Ahri lol"
                />
           
            </main>
</section> */
}
