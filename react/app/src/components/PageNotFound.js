import homeCSS from "../components/home/home.module.css";


export const PageNotFound = () => {
    return (
        <h1 style={{color: "white"}} className={`${homeCSS["home-section"]}`}>PAGE NOT FOUND</h1>
    );
};
