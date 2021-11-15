export type PhotoCamera = 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI' | 'NAVCAM' | 'PANCAM' | 'MINITES'
export type PhotoRover =  'curiosity' | 'opportunity' | 'spirit';
export interface PhotoCriteria {
    page?: number
    camera?: PhotoCamera
    sol?: number
    term?: string
    date?: Date
    rover: PhotoRover
}