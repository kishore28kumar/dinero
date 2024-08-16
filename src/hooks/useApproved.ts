import { IdTokenResult } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from "reactfire";

export function useApproved() {
    const [isLoading, setIsLoading] = useState(true);
    const [approved, setApproved] = useState(false);
    const { status, data } = useUser();

    useEffect(() => {
        if (status === "success") {
            data?.getIdTokenResult(true)
                .then((token: IdTokenResult) => {
                    setApproved(token.claims.approved ? token.claims.approved as boolean : false);
                }).finally(() => {
                    setIsLoading(false);
                });
        }
    }, [status]);

    return { approved, isLoading };
}
