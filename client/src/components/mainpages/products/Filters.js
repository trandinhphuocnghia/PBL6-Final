import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import searchic from '../../../img/search.svg'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [isAdmin] = state.userAPI.isAdmin
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const [newsearch,setNewSearch] = state.productsAPI.newsearch
    const [isChangeSearch,setIsChangeSearch] = state.productsAPI.isChangeSearch
    const [listsearch,setListSearch] = state.productsAPI.listsearch
    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    console.log(listsearch.length);
    return (
        <div className="filter_menu">
            <div className="row">
              
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
              
            <div className="Searchbox">  
            {     isAdmin?
            <input  className="inputsearch" type="text" value={search} placeholder="Enter your search!"
            onChange={e => (
            setSearch(e.target.value.toLowerCase()))} />
            :
            <input  className="inputsearch" type="text" value={newsearch} placeholder="Enter your search!"
            onChange={e => {
            setNewSearch(e.target.value.toLowerCase())    
            setIsChangeSearch(true)
            }} />
            }
            </div>
            
            {
            newsearch === ""?
            ''
            :
            <div className="Searchlist">
                { listsearch.length > 0 ? 
                    listsearch.map(item=>(
                        <div className="Searchlist_item">
                            <Link to={`/detail/${item._id}`}><img src={item.mainimg.url}/></Link>
                            <Link to={`/detail/${item._id}`}><p>{item.title}</p></Link>
                        </div>
                    ))
                    : <p>Oops, not exist this product!</p>
                }
            </div>
            }
           

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
