const mapKey = document.head.querySelector("[name=maps_api]").content;

export const fetchRoutes = () => {
    return(
        $.ajax({
            method: "GET",
            url: `api/routes`
        })
    );
};

export const fetchRoute = (id) => {
    return(
        $.ajax({
            method: "GET",
            url: `api/routes/${id}`
        })
    );
};

export const deleteRoute = (id) => {
    return(
        $.ajax({
            method: "DELETE",
            url: `api/routes/${id}`
        })
    );
};

export const createRoute = (route) => {
    return(
        $.ajax({
            method: "POST",
            url: `api/routes`,
            data: { route }
        })
    );
};

