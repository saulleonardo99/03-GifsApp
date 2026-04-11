import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";

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
        const consoleLogSpy = vi
            .spyOn(console,'log')
            .mockImplementation(() => {})
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
})