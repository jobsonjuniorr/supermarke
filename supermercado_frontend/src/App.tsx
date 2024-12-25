import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from "./app/homepage/page"
import RegisterSale from "./app/prodctsale/page"
import SaleList from "./app/deletesale/page"
import CreateCategory from "./app/createcategory/page"
import CreateProduct from "./app/createproduct/page"


function App() {
 
  return (
   <Router>
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/productsale" element={<RegisterSale/>}/>
        <Route path="/saleslist" element={<SaleList/>}/>
        <Route path="/category" element={<CreateCategory/>}/>
        <Route path="/registerProduct" element={<CreateProduct/>}/>
    </Routes>
   </Router>
  )
}

export default App
