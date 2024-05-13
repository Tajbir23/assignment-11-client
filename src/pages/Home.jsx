import { Helmet } from "react-helmet"
import Categories from "./Categories"
import PopularBook from "./PopularBook"
import Slider from "./Slider"
import Subscribe from "./Subscribe"


const Home = () => {
  return (
    <div>
    <Helmet>
      <title>Home</title>
    </Helmet>
      <Slider />
      <Categories />
      <PopularBook />
      <Subscribe />
    </div>
  )
}

export default Home