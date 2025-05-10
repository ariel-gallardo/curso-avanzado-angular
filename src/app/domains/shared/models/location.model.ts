export interface Location {
  id: number
  name: string
  description: string
  latitude: number;
  longitude: number;
}

export interface LocationParams{
    lat: number
    lng: number
    size: number;
}

export interface LocationRequest{
  size: number
  origin: string
}