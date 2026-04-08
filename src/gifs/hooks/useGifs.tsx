import  { useState } from 'react'
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';
import type { Gif } from '../interfaces/gif.interface';

export const useGifs = () => {
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifs, setGifs] = useState<Gif[]>([]);
    const handleTermClicked = (term: string) => {
        console.log({ term });
    }
    const handleSearch = async (query: string = '') => {
        query = query.toLowerCase().trim();

        if (query.length === 0) return;

        if (previousTerms.includes(query)) return;


        setPreviousTerms((prev) => {
            const updated = [query, ...prev];
            return updated.slice(0, 8);
        })

        const gifs = await getGifsByQuery(query);
        setGifs([...gifs])
    }
    return {
        //! Properties
        previousTerms,
        gifs,
        //! Methods / Actions
        handleSearch,
        handleTermClicked
    }
}
