import style from '../styles.module.css';

export const EventCard = ({ dataE })=> {
    let { imageURL, confName, confStartDate , st ,venue, confUrl } = dataE;
   // console.log(dataE);
    return (
        <div className={style.card}>
        <img src={imageURL} alt="Image-permission-denied" style={{width:"100%" ,heigth:"250px"}} />
            <div className={style["card-container "]}>
              <h4 className={style["event-details"]}><b>{confName}</b></h4> 
              <p className={style["event-details"]} >{confStartDate}</p> 
              <p className={style["event-details"]}> { st === "free" ? "Free" : "Paid" } </p>
              <p className={style["event-details"]}> { venue } </p>
              <p className={style["event-details"]}> <a href={confUrl}>Conference Website</a> </p>
            </div>  
        </div>  
    )
}