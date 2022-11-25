import { useState, useEffect } from 'react';
import Collection from './Collection'
import './index.scss';



function App() {
  const [pages, setPages] = useState(1);
  const [categories, setCategories] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [searchValue, setSearchValue] = useState('');


  const cat = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]

  const categoryS = categories ? `category=${categories}` : '';

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://637cc0a672f3ce38eaac7f38.mockapi.io/phpto?page=${pages}&limit=3&${categoryS}`)
      .then(res => res.json())
      .then(json => {

        setCollection(json)
      })
      .catch(err => {
        console.warn(err)
      })
      .finally(() => setIsLoading(false))
  }, [categories, pages])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cat.map((item, i) => (<li onClick={() => {
              setCategories(i)
              setPages(1)
            }} className={`${categories == i ? 'active' : ''} `} key={item.name}>{item.name}</li>))
          }
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
          isLoading ? <h2>Loading content...</h2> :
            collection.filter(item => {
              return item.name.toLowerCase().includes(searchValue.toLowerCase())
            }).map((obj, i) =>
              (<Collection key={i} name={obj.name} images={obj.photos} />))
        }
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, i) => {
            return <li onClick={() => setPages(i + 1)} className={pages == i + 1 ? 'active' : ''}>{i + 1}</li>
          })
        }
      </ul>
    </div>
  );
}

export default App;



function sum(arr) {
  if (arr.length == 0) {
    return 0;
  } else {

    arr.shift();
    return 1 + sum(arr);
  }
}
console.log(sum([1, 2, 100, 2]))

function sort(arr) {
  if (arr.length == 2) {
    return arr[0] > arr[1] ? arr[0] : arr[1]
  } else {
    arr.shift()
    const subsort = sort(arr);
    return arr[0] > subsort ? arr[0] : subsort
  }

}
console.log(sort([1, 2, 100, 200]))


