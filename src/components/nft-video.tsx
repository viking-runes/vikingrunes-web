const NftVideo = () => {
  return (
    <video controls={false} width="100%" height="auto" autoPlay={true} muted loop={true}>
      {/* <video width="100%" height="auto" autoPlay={true} muted controls> */}
      <source src="/assets/video-60k.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default NftVideo;
