export interface RestPhotoReponse {
    photos: {
        id: number
        img_src: string
        rover: {
            name: string
        }
        camera: {
            full_name: string,
            name: 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI' | 'NAVCAM' | 'PANCAM' | 'MINITES'
        },
        earth_date: string
        sol: number
    }[]
}