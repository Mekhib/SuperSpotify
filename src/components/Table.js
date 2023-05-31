import Table from "react-bootstrap/Table";
import "../css/table.css";
import Image from "react-bootstrap/Image";
import LoadingSpinner from "./LoadingSpinner";


function TableView(props,{data, updateId}) {
   const tracks = props.data.body?.tracks || props.data.body; 
   console.log(props)
    function convert(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return seconds == 60
        ? minutes + 1 + ":00"
        : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    console.log("tracks", tracks)
    if(tracks.items) {
     return (
       <Table responsive="true" hover="true" striped="true" size="sm">
         <thead>
           <th>Song</th>
           <th>Artist</th>
           <th>Album</th>
           <th>Time</th>
         </thead>
         <tbody>
           {tracks &&
             tracks.items.map(( track ) => {
               track = track.track || track
               console.log('haa',track)
               return (
                 <tr onClick={() => updateId(track.uri)}>
                   <td className="imageName">
                     <Image
                       src={track.album.images[0].url}
                       thumbnail
                       responsive
                       className="globalImage1"
                       style={{ width: "7%" }}
                     />
                     <h2>{track.name}</h2>
                   </td>
                   <td className="artistName align-middle">
                     <div className="align-middle">
                       {track.artists && track.artists.length !== 1
                         ? track.artists.map((artist) => {
                             return `${artist.name}; `;
                           })
                         : `${track.artists[0].name}`}
                     </div>
                   </td>
                   <td className="trackName align-middle">
                     <div>{track.album.name}</div>
                   </td>
                   <td className="time align-middle">
                     <div>{convert(track.duration_ms)}</div>
                   </td>
                 </tr>
               );
             })}
         </tbody>
       </Table>
     );
    }
     else {
       return <LoadingSpinner />;
     }
}

export default TableView