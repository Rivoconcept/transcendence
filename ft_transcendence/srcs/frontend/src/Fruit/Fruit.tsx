import { useEffect, useState } from "react";
import FruitForm from "./FruitForm";
import FruitList from "./FruitList";

export default function Fruit() {

    const [posts, setPosts] = useState([]);

    const getPost = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        const data = await res.json();
        
        setPosts(data);
    };

    useEffect(() => {
        getPost();
    }, []);

    return (
        <>
            <h1>Liste des Fruits</h1>
            <FruitList />
            <FruitForm />
            <div>
                {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
                ))}
            </div>

        </>
    );
}
