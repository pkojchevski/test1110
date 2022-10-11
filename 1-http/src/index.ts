const API_URL = 'https://rickandmortyapi.com/api/episode';

export type Episode = {
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
};
export type Data = {
  info: string;
  results: Episode[];
};

async function fetchFromApi(apiUrl: string): Promise<void> {
  try {
    const data = await fetch(apiUrl);
    const dataJson: Data = await data.json();

    const episodes: Episode[] = await dataJson.results;
    const finalEpisodes = await Promise.all(
      episodes.map(async (episode: Episode) => {
        const characters: Array<string> = episode.characters;
        let names: Array<string> = [];

        await Promise.all(
          characters.map(async (char: string) => {
            const name = await fetch(char);
            const nameJson: string = await name.json();
            names.push(nameJson);
            return names;
          })
        );

        episode.characters = names;
        return episode;
      })
    );

    console.log({ finalEpisodes });
  } catch (err) {
    console.log({ err });
  }
}

fetchFromApi(API_URL);
