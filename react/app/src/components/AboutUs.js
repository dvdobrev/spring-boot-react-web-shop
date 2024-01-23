import shopingcartCSS from "../components/shoppingCart/shopincart.module.css";
import homeCSS from "../components/home/home.module.css";


export const AboutUs = () => {
    return (
        <div className={`${homeCSS["home-section"]}`}>
            <h1 className={`${shopingcartCSS["text"]}`}>About Us</h1>
            <h3 className={`${shopingcartCSS["text"]}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nulla fugiat fuga laboriosam consequatur suscipit molestias doloribus temporibus necessitatibus odit quae est delectus, modi quaerat incidunt voluptatem ipsum velit ipsam. Ea facilis ratione accusantium quisquam nisi nam officiis fuga nemo, doloremque soluta aliquam cumque harum dolores, eveniet, maiores iusto odio.
            </h3>
        </div>
    );
};
