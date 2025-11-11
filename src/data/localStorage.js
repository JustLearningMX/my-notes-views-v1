export const localStorageObj = {
    dataNotes: (data) => { 
        window.localStorage.setItem(
            "dataNotes", JSON.stringify(data)
        );
    }
};