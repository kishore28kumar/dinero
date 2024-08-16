import { IdTokenResult } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from "reactfire";

export function useUserRole() {
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState("");
    const { status, data } = useUser();

    useEffect(() => {
        if (status === "success") {
            data?.getIdTokenResult(true)
                .then((token: IdTokenResult) => {
                    setRole(token.claims.role as string);
                }).finally(() => {
                    setIsLoading(false);
                });
        }
    }, [status]);

    return { role, isLoading };
}
