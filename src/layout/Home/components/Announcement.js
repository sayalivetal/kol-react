import React from "react";

const Announcement = ({announcement}) => {
    console.log(announcement);
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
    console.log(a);
    let day = days[a.getDay()]
console.log(day);
    let month = months[a.getMonth()]
    let date = a.getDate()
    let year = a.getFullYear()
    let hours = a.getHours()
    let minute = a.getMinutes()
    let second = a.getSeconds()

    let x = (hours < 11 )?'AM':'PM'
    console.log(x);
        
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
                      <div className="live-stream">Live Stream</div>
                      <h2>
                        <b>A Product Launch</b>
                      </h2>
                      <ul className="date-list">
                        <li>
                          <div>{day}</div>
                          <div className="list-large-text">DAY</div>
                        </li>
                        <li className="">
                          <div>{month}</div>
                          <div className="list-large-text">{date}</div>
                        </li>
                        <li className="">
                          <div>{hours}</div>
                          <div className="list-large-text">{x}</div>
                        </li>
                      </ul>
                    </div>

                    <div className="col-lg-4">
                      <div className="rounded-circle roundIcon">
                        <p className="annocement-text">Watch me on youtube</p>
                        <span className="icon-block">
                          {" "}
                          <i className="bi bi-youtube youtube-circle-icon"></i>
                          <span className="youtube-bg"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="stream-user">
                <div className="stream-user-circle">&nbsp;</div>
                <img
                  src={announcement?.image}
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
