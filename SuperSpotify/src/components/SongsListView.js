import React from "react";
import Album from "./album";
import ScrollContainer from "./ScrollHorizontal";

function SongsList(props) {
 console.log("SongsList props:", props.frosted);
  const dataArray = props.songs || props.userData?.body?.tracks ||  [];
  console.log("SongsList props:", dataArray);
  const { updateId, color, artAlbums } = props;

  if (!dataArray.length) return null;

  return (
    <ScrollContainer>
      {dataArray.map((song, index) => {
        const uniqueKey = song?.track?.id || song?.id || song?.uri || index;
        return (
          <Album
            key={uniqueKey}
            updateId={updateId}
            song={song}
            color={color}
            artAlbums={artAlbums}
            frosted={props.frosted}
          />
        );
      })}
    </ScrollContainer>
  );
}

export default SongsList;