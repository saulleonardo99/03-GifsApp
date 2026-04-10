import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";

describe('CutstomHeader', () => {
    const title = 'titulo de prueba';
    test('should render the title correctly', () => {
        //! Arrange
        //!Assert
        render(<CustomHeader title={title}/>);
        //!Act
        expect(screen.getByText(title)).toBeDefined();
    });

    test('should render the description when provided', () => {
        //! Arrange
        const description = 'descripción de prueba';
        //!Assert
        render(<CustomHeader title={title} description={description}/>);
        //!Act
        expect(screen.getByText(description)).toBeDefined();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);
    });

    test('should not render description when not provided', () => {
        //! Arrange
        //! Assert
        const {container} = render(<CustomHeader title={title}></CustomHeader>)
        const p = container.querySelector('p');
        //! Act
        expect(p).toBeNull();
        
    })
})