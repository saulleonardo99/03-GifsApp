import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe('useCounter', () => {
    test('should initialize with default value of 10', () => {
        //! Arrange
        const { result } = renderHook( () => useCounter());
        
        //! Assert
        expect(result.current.counter).toBe(10);
    });
    test('should initialize with value 20 ', () => {
        //! Arrange
        const initialValue = 20;
        const { result } = renderHook( () => useCounter(initialValue));
        
        //! Assert
        expect(result.current.counter).toBe(initialValue);
    });
    test('should increment counter when handleAdd is called', () => {
        //! Arrange
        const {result} = renderHook( () => useCounter());
        
        //! Act
        act(() => {
            result.current.handleAdd();
        });

        //! Assert
        expect(result.current.counter).toBe(11);
    });
    test('should decrement counter when handleSubtract is called', () => {
        //! Arrange
        const {result} = renderHook( () => useCounter());
        
        //! Act
        act(() => {
            result.current.handleSubtract();
        });

        //! Assert
        expect(result.current.counter).toBe(9);
    });
    test('should restart counter when handleReset is called', () => {
        //! Arrange
        const {result} = renderHook( () => useCounter());
        
        //! Act
        act(() => {
            result.current.handleSubtract();
            result.current.handleSubtract();
            result.current.handleSubtract();
            result.current.handleSubtract();
            result.current.handleSubtract();
        });
        //! Assert
        expect(result.current.counter).toBe(5);

        //! Act
        act(() => {
            result.current.handleReset();
        });

        //! Assert
        expect(result.current.counter).toBe(10);
    });
})