import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {
    const {
        previousTerms, 
        gifs, 
        handleSearch, 
        handleTermClicked 
    } = useGifs();
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