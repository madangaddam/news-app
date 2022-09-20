import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsApp = ()=>{
    const categories=["business","entertainment","general","health","science","sports","technology"]
    const [articles,setArticles]=useState([])
    const [totalArticles,setTotalArticles]=useState(0)
    const [currentPage,setCurrentPage]=useState(undefined)
    const [selectedCategory,setSelectedCategory]=useState("general")
    
    const loadNews = (pageNo = 1)=>{
        axios({
           url:" https://newsapi.org/v2/top-headlines",
           method:"Get",
           params:{country:"in",
                apiKey:"cc082622d5414bb9959f95f16a5e2f85",
            },
            page:pageNo,
            category:selectedCategory
        }).then((res)=>{
            setArticles([...articles,...res.data.articles])
           setTotalArticles(res.data.totalResults)
           setCurrentPage(pageNo)
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    useEffect(()=>{loadNews()},[])
    useEffect(()=>{loadNews()},[selectedCategory])
    return(
        <div className="opacity-15 p-2 m-1 bg-black text-light fw-bold roudned" >
            <h1>News Application</h1>
            <div>
            {categories.map((category)=>{
                return(
                    <button style={{margin:"20px"}} onClick={()=>{
                        setArticles([])
                        setSelectedCategory(category)
                    }}>{category}</button>
                )
            })}
            </div>
            <InfiniteScroll
            className="d-flex justify-content-center bd-highlight mb-2" style={{display:"flex",flexWrap:"wrap",}}
                    dataLength={articles.length}
                    next={()=>{
                        loadNews(currentPage+1);
                    }}
                    hasMore={totalArticles != articles.length}
                    >
                {
                articles.map((articles,index)=>{
                    return(
                        <div className="card p-2 m-1 text-info fw-bold rounded" style={{width: "18rem",margin:"10px",height:"500px",backgroundColor:"#825E82"}} key={index}>
                            <img className="card-img-top" style={{width:"100%",height:"150px"}} src={articles.urlToImage} alt="Card image cap"/>
                            <div className="card-body" style={{height:"300px",overflow: "hidden"}}>
                                <h5 className="card-title" style={{font: "italic small-caps bold 16px/2 cursive",color:"#453545"}}>{articles.title}</h5>
                                <p className="card-text" style={{font:"italic 1.2em Fira Sans serif" }}>{articles.content}</p>
                            </div>
                            <div className="card-footer bg-success p-2 text-dark bg-opacity-50" style={{height:"50px"}}>
                                {articles.publishedAt}
                            </div>
                        </div>
						)
					}
                )
            }
            </InfiniteScroll>
		</div>
	)
}

export default NewsApp;