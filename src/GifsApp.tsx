import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import type { Gif } from "./gifs/interfaces/gif.interface"


export const GifsApp = () => {
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifs, setGifs] = useState<Gif[]>([]);
    const handleTermClicked = (term: string) => {
        console.log({term});
    } 
    const handleSearch = async (query: string) => {
        query = query.toLowerCase().trim();

        if(query.length === 0) return;

        if(previousTerms.includes(query)) return;
        
        
        setPreviousTerms((prev) => {
            const updated = [query, ...prev];
            return updated.slice(0,8);
        })

        const gifs = await getGifsByQuery(query);
        setGifs([...gifs])
    }
    return (
        <>
            {/* Header */}
            <CustomHeader title="Buscador de gifs" description="Descubre y comparte el Gif perfecto" />
            {/* Search */}
            <SearchBar 
                placeholder="Buscar gifs"
                onQuery= {handleSearch}
            />
            {/* Búsquedas previas */}
            <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked}/>
            {/* Gifs */}
            <GifList gifs={gifs} />
        </>
    )
}