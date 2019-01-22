
export const signup = athlete => {
    return(
        $.ajax({
            method: "POST",
            url: 'api/athletes',
            data: { athlete }
        })
    );
};

export const login = athlete => {
    return(
        $.ajax({
            method: "POST",
            url: 'api/session',
            data: { athlete }
        })
    );
};

export const logout = () => {
    return(
        $.ajax({
            method: "DELETE",
            url: 'api/session'
        })
    );
};

