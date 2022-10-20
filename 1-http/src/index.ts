const API_URL_EPISODES = 'https://rickandmortyapi.com/api/episode';

export type Episode = {
  air_date: string;
  characters: Character[] | string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
};
export type Data = {
  info: {
    count: string;
    next: string | null;
    prev: string | null;
    pages: number;
  };
  results: Episode[];
};
export type FetchedCharacter = {
  url: string;
  charObj: Character;
};

async function fetchAllData(url: string): Promise<Episode[]> {
  const responseJson = await fetch(url);
  const response: Data = await responseJson.json();

  const respJson: Response[] = await Promise.all(
    Array.from(Array(response.info.pages), (_, i) =>
      fetch(`${url}?page=${i + 1}`)
    )
  );
  const responses: Data[] = await Promise.all(
    respJson.map(async (response): Promise<Data> => await response.json())
  );

  return responses.map((res): Episode[] => res.results).flat();
}

async function fetchFromApi(apiUrl: string): Promise<void> {
  try {
    const episodes: Episode[] = await fetchAllData(apiUrl);
    const fetchedCharacters = new Map();
    const finalEpisodes: Episode[] = await Promise.all(
      episodes.map(async (episode: Episode): Promise<Episode> => {
        const characters: Array<string | Character> = episode.characters;
        await Promise.all(
          characters.map(
            async (
              char: string | Character
            ): Promise<Map<string, Character>> => {
              const name = await fetch(char as string);
              const nameJson: Character = await name.json();
              fetchedCharacters.set(char as string, nameJson);
              // console.log({ fetchedCharacters }, fetchedCharacters.size);
              return fetchedCharacters;
            }
          )
        );

        episode.characters = episode.characters.map(
          (charac: string | Character): Character =>
            fetchedCharacters.get(charac as string)
        );
        return episode;
      })
    );

    console.log({ finalEpisodes });
  } catch (err) {
    console.log({ err });
  }
}

fetchFromApi(API_URL_EPISODES);
