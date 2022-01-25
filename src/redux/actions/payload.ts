export interface PayloadProps {
    start: () => void;
    error: () => void;
    success: () => void;
    finally: () => void;
    data: any; 
}