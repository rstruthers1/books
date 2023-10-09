import VideoShow from "./VideoShow";


const videoList = ({videos}) => {
  const renderedVideos = videos ? videos.map(video => {
    return <VideoShow
        key={video.id} 
        video={video}
    />
  }) : []
  
  return (
      <div className="book-list">
        {renderedVideos}
      </div>
  )
}

export default videoList;
