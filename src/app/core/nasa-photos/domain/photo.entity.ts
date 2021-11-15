export interface Photo {
    date: Date
    sol: number
    cameraId: 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI' | 'NAVCAM' | 'PANCAM' | 'MINITES'
    cameraName: string
    src: string
    rover: string
    id: number
}