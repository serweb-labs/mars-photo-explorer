import { PhotoRover } from "src/app/core/nasa-photos/domain/photo-criteria.dto";

export type Cameras = 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI' | 'NAVCAM' | 'PANCAM' | 'MINITES';

export type Rovers = PhotoRover | null;

export interface Camera {
    id: Cameras
    name: string
}

export type FilterType = 'latest' | 'date' | 'sol'

interface CamMap {
    curiosity: Camera[]
    opportunity: Camera[]
    spirit: Camera[]
    
}

export const cameras: CamMap = {
    curiosity: [
        {id: "FHAZ", name: "Front Hazard Avoidance Camera" },
        {id: "RHAZ", name: "Rear Hazard Avoidance Camera" },
        {id: "MAST", name: "Mast Camera" },
        {id: "CHEMCAM", name: "Chemistry and Camera Complex" },
        {id: "MAHLI", name: "Mars Hand Lens Imager" },
        {id: "MARDI", name: "Mars Descent Imager" },
        {id: "NAVCAM", name: "Navigation Camera" },
    ],
    opportunity: [
        {id: "FHAZ", name: "Front Hazard Avoidance Camera" },
        {id: "RHAZ", name: "Rear Hazard Avoidance Camera" },
        {id: "NAVCAM", name: "Navigation Camera" },
        {id: "PANCAM", name: "Panoramic Camera" },
        {id: "MINITES", name: "Miniature Thermal Emission Spectrometer (Mini-TES)" },
    ],
    spirit: [
        {id: "FHAZ", name: "Front Hazard Avoidance Camera" },
        {id: "RHAZ", name: "Rear Hazard Avoidance Camera" },
        {id: "NAVCAM", name: "Navigation Camera" },
        {id: "PANCAM", name: "Panoramic Camera" },
        {id: "MINITES", name: "Miniature Thermal Emission Spectrometer (Mini-TES)" },
    ],
}

export type Partial<T> = {
    [P in keyof T]?: T[P];
};