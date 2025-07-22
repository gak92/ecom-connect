import React, { useEffect } from "react";
import Footer from "../components/Footer";
import "../pageStyles/Home.css";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../features/products/productSlice";

// const products = [
//   {
//     _id: "6878d8136b7bada9e0517657",
//     name: "Fantastic Plastic Shirt",
//     description: "Chicken",
//     price: 598.2,
//     ratings: 3,
//     image: [
//       {
//         public_id: "d4b7df3f-46dc-4dd5-888f-823c6a33574b",
//         url: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
//         _id: "6878d8136b7bada9e0517658",
//       },
//     ],
//     category: "Practical",
//     stock: "0",
//     numOfReviews: 1,
//     reviews: [],
//     createdAt: "2025-07-17T11:01:39.728Z",
//     updatedAt: "2025-07-21T12:33:01.247Z",
//     __v: 1,
//   },
//   {
//     _id: "6878d8166b7bada9e051765a",
//     name: "Fantastic Wooden Shirt",
//     description: "Soap",
//     price: 300.43,
//     ratings: 1.5,
//     image: [
//       {
//         public_id: "f388aabb-5d04-42dd-b36b-a33b6cf32868",
//         url: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
//         _id: "6878d8166b7bada9e051765b",
//       },
//     ],
//     category: "Handmade",
//     stock: "1",
//     numOfReviews: 3,
//     reviews: [],
//     createdAt: "2025-07-17T11:01:42.161Z",
//     updatedAt: "2025-07-17T11:01:42.161Z",
//     __v: 0,
//   },
//   {
//     _id: "6878d81b6b7bada9e051765d",
//     name: "Gorgeous Frozen Pants",
//     description: "Computer",
//     price: 183.51,
//     ratings: 4.2,
//     image: [
//       {
//         public_id: "e73306a3-4ee8-42df-9ad3-9a242b5de6f6",
//         url: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
//         _id: "6878d81b6b7bada9e051765e",
//       },
//     ],
//     category: "Intelligent",
//     stock: "1",
//     numOfReviews: 0,
//     reviews: [],
//     createdAt: "2025-07-17T11:01:47.017Z",
//     updatedAt: "2025-07-17T11:01:47.017Z",
//     __v: 0,
//   },
// ];

function Home() {
  // Get product state from Redux store
  const { loading, error, products, productCount } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      <PageTitle title="Home - MERN Ecommerce" />
      <Navbar />
      <ImageSlider />
      <div className="home-container">
        <h2 className="home-heading">Trending Now</h2>
        <div className="home-product-container">
          {products.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
