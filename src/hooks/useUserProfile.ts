import { useEffect, useState } from "react";

// Example of a custom hook for business logic
export function useUserProfile(userId: any) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            // const userData = await fetchUserProfile(userId);
            // setUser(userData);
            setIsLoading(false);
        }

        fetchUser();
    }, [userId]);

    return { user, isLoading };
}

// Reference,
// https://www.dhiwise.com/post/mastering-the-art-of-separating-ui-and-logic-in-react