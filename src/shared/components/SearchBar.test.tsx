import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe('SearchBar', () => {
    test('should render search bar correctly', () => {
        const {container} = render(<SearchBar onQuery={() => {}}></SearchBar>);
        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toMatchSnapshot();
        expect(screen.getByRole('button')).toMatchSnapshot(); 
    });
    test('should call onQUery with the correct value after 700ms', async () => {
        const inputValue = 'test';
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery}></SearchBar>);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: inputValue}});
        
        // await new Promise(resolve => setTimeout(resolve, 701));

        //! Prueba del debounce:
        //? Espera hasta que se aplique lo del useEffect (delay de 700ms)
        
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith(inputValue);
        });

    });
    test('should call only once with the last value (debounce)', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery}></SearchBar>);
        const input = screen.getByRole('textbox');

        //? Cada que se dispara un fireEvent, se reinicia el timer 
        //? para el debounce por 700ms. Hasta que pasen los 700ms 
        //? sin que se reinicie el contrador, no se activara la 
        //? funcion onQuery

        fireEvent.change(input, {target: {value: 't'}});
        fireEvent.change(input, {target: {value: 'te'}});
        fireEvent.change(input, {target: {value: 'tes'}});
        fireEvent.change(input, {target: {value: 'test'}});
        
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');
        });
    })
    test('should call onQuery when button clicked with the input value', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery}></SearchBar>);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'test'}});
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        //? Aquí no se ocupa usar wl await waitFor(){} debido
        //? a que el onQuery se llama instantaneo en el handleSearch()
        //? al hacer click en el button
        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');
    });
    test('should the input has the correct placeholder value', () => {
        
        const placeHolderValue = 'Buscar gif';

        render(<SearchBar onQuery={() => {}} placeholder={placeHolderValue}></SearchBar>)
        expect(screen.getByPlaceholderText(placeHolderValue))
    });
    test('should the input has default placeholder value', () => {
        
        render(<SearchBar onQuery={() => {}} ></SearchBar>)
        expect(screen.getByPlaceholderText('Buscar'))
    });
})