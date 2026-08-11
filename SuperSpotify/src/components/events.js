import React from "react";

function Events({events})  {

return (
          <div className="listContainer events-container">
            <div className="title">
              <h2 className="titleText">Upcoming Shows</h2>
            </div>
            <div className="events-grid">
              {events.map(event => {
                const eventDate = new Date(event.datetime_local).toLocaleDateString(undefined, {
                  month: 'short', day: 'numeric', year: 'numeric'
                });
                return (
                  <div key={event.id} className="event-card">
                    <div className="event-info">
                      <div className="event-date">{eventDate}</div>
                      <div className="event-venue">{event.venue.name}</div>
                      <div className="event-location">{event.venue.display_location}</div>
                    </div>
                    <a 
                      href={event.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="event-btn"
                    >
                      Tickets
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

)


}

export default Events