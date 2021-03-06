import React, { useState } from "react";
import { useParams } from "react-router-dom";
//import { Link } from "react-router-dom";
import {connect} from "react-redux"
import {addBasket} from "../../actions/addActions"
// eslint-disable-next-line no-undef
//const apiBaseURL = process.env.Rea

const initialState = {
  id:"",
  nom: "",
  prix:"",
  taille:"",
  image:"",
  stock:""
};

const Produit = (props) => {
  const [detailProduit, setDetailProduit] = useState(initialState);
  const { id } = useParams();
  console.log(id);
  const getProduit = catid => {
    fetch(`/api/categories/detail/${catid}`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        console.log("détail produit", data);

        setDetailProduit(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    
    getProduit(id);
  }, [id]);
 // console.log("image",detailProduit.Products[0].image)
  return (
    <>
       <h3>{detailProduit.nom}</h3>


      <img className="imagecaftan" src={detailProduit.image} alt=''/>    

      <div className="detail">Prix:{detailProduit.prix}</div>
      <div className="Descriptif">Descriptif:{detailProduit.descriptif}</div>

      <a onClick={()=>props.addBasket(detailProduit.nom)} className="addToCart" href="#">Ajouter au Panier</a>
    </>
  );
};
export default connect(null,{addBasket})(Produit);

