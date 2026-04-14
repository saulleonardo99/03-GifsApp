import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifsACtions from './../actions/get-gifs-by-query.action';
describe('useGifs', () => {
    test('should return default values and methods', () => {
        //! Arrange
        const { result } = renderHook(() => useGifs());
        
        //! Assert
        //? Variables
        expect(result.current.gifs).toBeDefined();
        expect(result.current.previousTerms).toBeDefined();
        //? Methods
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    });
    test('should return a list gifs', async () => {
        //! Arrange
        const { result } = renderHook(() =>  useGifs());
        
        //! Act
        await act(async () => {
            await result.current.handleSearch('goku');
        })

        //! Assert
        expect(result.current.gifs.length).toBe(10);

    });
    test('should return a list gifs when handleTermClicked is called', async () => {
        //! Arrange
        const { result } = renderHook(() =>  useGifs());
        
        //! Act
        await act(async () => {
            await result.current.handleTermClicked('goku');
        })

        //! Assert
        expect(result.current.gifs.length).toBe(10);

    });
    test('should return a list of gifs from cache', async () => {
        //! Arrange
        const {result} = renderHook(() => useGifs());

        //! Act
        await act(async() => {
            await result.current.handleTermClicked('goku');
        })
        
        //! Assert
        expect(result.current.gifs.length).toBe(10);


        vi.spyOn(gifsACtions, 'getGifsByQuery')
            .mockRejectedValue(new Error('This is my custom error'));

        //! Act
        await act(async() => {
            await result.current.handleTermClicked('goku');
        })
        
        //! Assert
        expect(result.current.gifs.length).toBe(10);
    });
    test('should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs());
        vi.spyOn(gifsACtions, 'getGifsByQuery')
            .mockResolvedValue([]);
        await act(async () => {
            await result.current.handleSearch('goku1');
        })
        await act(async () => {
            await result.current.handleSearch('goku2');
        })
        await act(async () => {
            await result.current.handleSearch('goku3');
        })
        await act(async () => {
            await result.current.handleSearch('goku4');
        })
        await act(async () => {
            await result.current.handleSearch('goku5');
        })
        await act(async () => {
            await result.current.handleSearch('goku6');
        })
        await act(async () => {
            await result.current.handleSearch('goku7');
        })
        await act(async () => {
            await result.current.handleSearch('goku8');
        })
        await act(async () => {
            await result.current.handleSearch('goku9');
        })
        console.log(result.current.previousTerms);
        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual(
            [
                'goku9', 'goku8',
                'goku7', 'goku6',
                'goku5', 'goku4',
                'goku3', 'goku2'
            ]
        )
    })
})