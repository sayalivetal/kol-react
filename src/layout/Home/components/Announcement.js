import React from "react";
import { imageUrl } from "../../../common/apis";

const Announcement = ({announcement}) => {

    let days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'];
    let  months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'];

        
    let a = new Date(announcement?.start_date)

    let day = days[a.getDay()]

    let month = months[a.getMonth()]
    let date = a.getDate()
    let year = a.getFullYear()
    let hours = a.getHours()
    let minute = a.getMinutes()
    let second = a.getSeconds()

    let x = (hours < 11 )?'AM':'PM'

        
  return (
    <div className="card mt-3 border-0">
      <div className="card-body pb-0">
        <div className="col-lg-12 px-4">
          <div className="row py-1">
            <div className="col-lg-7">
              <div className="card annoucement-card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8">
                      <h3>Announcement</h3>
                      <div className="live-stream">{announcement?.title || "Event Title"}</div>
                      <h4>
                        <b>{announcement?.description || "A Event Launch on"}</b>
                      </h4>
                      <ul className="date-list">
                        <li>
                          <div>{day || "Sun"}</div>
                          <div className="list-large-text">DAY</div>
                        </li>
                        <li className="">
                          <div>{month || "April"}</div>
                          <div className="list-large-text">{date || "1"}</div>
                        </li>
                        <li className="">
                          <div>{hours || "12"}</div>
                          <div className="list-large-text">{x || "AM"}</div>
                        </li>
                      </ul>
                    </div>

                    <div className="col-lg-4">
                      <div className="rounded-circle roundIcon">
                        <p className="annocement-text">Please Join <br />us on </p>
                        <span className="icon-block">
                          <i className={`bi bi-${announcement?.social_platform || "signpost-split-fill"}`}></i>
                          {/* <span className="youtube-bg"></span> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="stream-user">
                 <img
                  src={`${imageUrl}${announcement?.image || "/images/no-image.png"} `}
                  alt=""
                  className="stream-user-thumb"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
