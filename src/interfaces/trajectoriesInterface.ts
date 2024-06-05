export interface ITrajectory {
    id: number
    taxi_id: number
    latitude?: number | null
    longitude?: number | null
    date?: Date | null
}

// Usando una función utilitaria de TypeScript llamada Pick, podemos crear un nuevo tipo de datos que solo incluya las propiedades que necesitamos. En este caso, necesitamos el taxi_id y la fecha.
export interface ITrajectoryGetDate extends Pick<ITrajectory, 'taxi_id' | 'date'> {}
