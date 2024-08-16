import { useEffect, useState } from "react";

export function usePromise<T>(promise: Promise<T>) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({} as T);

    useEffect(() => {
        promise
            .then((data) => {
                setData(data);
            }).finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { data, isLoading };
}
