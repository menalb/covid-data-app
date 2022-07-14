interface ServiceInit {
    status: 'init';
}
interface ServiceLoading {
    status: 'loading';
}
interface ServiceLoaded<T> {
    status: 'loaded';
    payload: T;
}
interface ServiceLoadedEmpty {
    status: 'loadedempty';
}
interface ServiceError {
    status: 'error';
    error: Error;
}
export type ServiceStatus<T> =
    | ServiceInit
    | ServiceLoading
    | ServiceLoaded<T>
    | ServiceLoadedEmpty
    | ServiceError;

export type loadingStatus = "init" | "loading" | "error" | "loaded" | "loadedempty"