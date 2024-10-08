import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import Loading from "./Loading";

const ItemListContainer = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        const db = getFirestore();
        const itemsCollection = collection(db, "items");
        const q = id ? query(itemsCollection, where("category", "==", id)) : itemsCollection;
        getDocs(q).then(snapShot => {
            if (snapShot.size > 0) {
                setItems(snapShot.docs.map(documento => ({id:documento.id, ...documento.data()})));
                setLoading(false);
            } else {
                console.log("Error");
            }
        })
    }, [id])


    return (
        <>
            {id ? "" : <Carousel/>}
            <div className="container">
                <div className="row">
                    {loading ? <Loading /> : <ItemList items={items} />}
                </div>
            </div>
        </>
        
    )
}

export default ItemListContainer