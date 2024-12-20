export const getEnvVariables=()=>{

    //const VITE_API_URL='https://calenderappbackend300.up.railway.app/api'

     const VITE_API_URL=import.meta.env.VITE_API_URL;
     const MODE='';

    return {
        VITE_API_URL,
        MODE
    }

}