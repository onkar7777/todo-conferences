import { useState, useEffect } from 'react';
import style from './styles.module.css';
import { EventCard } from './Component/Card';
import axios from 'axios';
import { serchData } from './Utils/constant';
function App() {
  let [filterHold, setFilterHold] = useState([]);
  let [events, setEvents] = useState([]);
  let [serch, setSerchData] = useState("")
  let [loader, setLoader] = useState(true);


  let getEvends = async () => {
    let { data } = await axios.get("https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences")
    let { free, paid } = data;
    console.log(data);
    let paiddata = paid.map(item => {
      let { confName, confStartDate, imageURL, venue, confUrl, city, country } = item;
      return {
        imageURL, confName, confStartDate, st: "paid", venue, confUrl, city, country
      }
    })
    let freedata = free.map(item => {
      let { confName, confStartDate, imageURL, venue, confUrl, city, country } = item;
      return {
        imageURL, confName, confStartDate, st: "free", venue, confUrl, city, country
      }
    })
    //console.log();
    setLoader(false)
    setEvents([...freedata, ...paiddata])
    setFilterHold([...freedata, ...paiddata])
  }
  useEffect(() => {
    getEvends()
  }, [])
  let serchEvents = () => {

    let filterSerch = filterHold.filter(items => {
      let checkvalues = items.city.toLowerCase();
      let checkvalues2 = items.confName.toLowerCase();

      let filterChecker = (serch, checkvalues) => {
        var patt = new RegExp(serch)
        return patt.test(checkvalues);
      }
      // console.log(res);
      if (filterChecker(serch, checkvalues) || filterChecker(serch, checkvalues2)) {
        return items
      }
    })
    // alert(serch)
    setEvents(filterSerch)
    console.log(filterSerch)
  }
  let filterBYPaidOrFree = (el) => {
    if (el === "free" || el === "paid") {
      let filteredData = filterHold.filter(item => {
        if (item.st === el) {
          return item
        }
      })
      setEvents(filteredData)

    } else {
      setEvents(filterHold)

    }
  }
  return (
    <div className={style.wrapper} >
      <div className={style.serchbox} >
        <div className={`ser ${style["search-box"]}`} >
          <input type="text" value={serch} onChange={(e) => setSerchData(e.target.value.toLowerCase())} placeholder="Serach here" />
          <button onClick={serchEvents} style={{ marginRight: "30px" }} > Search </button>
        </div>
        <div className="" >

          <select name="" onChange={(e) => filterBYPaidOrFree(e.target.value)} className={style["serch-thing"]} id="">
            <option value="">Search by Paid / Free</option>
            {
              serchData.map(item => <option key={item} value={item}> {item} </option>)
            }
          </select>
        </div>
      </div>
      <div className={style["conference-box"]} >
        {
          loader ? <h1>Loading ....</h1> : (

            events.length >= 1 ? (

              events.map((item, i) => <EventCard key={i} dataE={item} />)
            ) : (
              <h1> No Data Available </h1>
            )


          )
        }
      </div>
    </div>
  )
}

export default App;
