import Footer from "./footer/page";

export default function Home() {
  const myStyle = {
    backgroundImage:
      "url('https://external-preview.redd.it/048HY1vXFxjEn2ChEDofRrSA4AhpVQUWE6d8T9Yu318.jpg?auto=webp&s=b2489f68dbd609c62c067b6ac920730c703dbd84')",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div style={myStyle}>
      <div className="Home">
        <div className="title">
          <h1>Home Page</h1>
          <h3>Welcome to NoAhGrAm</h3>
          <br />
          <div className="images">
            <img
              src="https://lh5.googleusercontent.com/proxy/dMdLD7d-s5DiBRAP3WMNzrHarav9y6LcGL440se-oWJYquiazOJ2mnr30DwGD_OhfOPWzGTww-Bbv2cwmiaz_fdqFd-zYVjB4chrokRR_IczG7E3hfiGpit8yjtcpAxhZfbJ7Q"
              alt="Wallpaper One"
            />
            <img
              src="https://c4.wallpaperflare.com/wallpaper/125/543/713/the-witcher-3-wild-hunt-video-games-geralt-of-rivia-landscape-wallpaper-preview.jpg"
              alt="Wallpaper Two"
            />
            <img
              src="https://c4.wallpaperflare.com/wallpaper/174/191/592/shadow-of-the-tomb-raider-tomb-raider-2018-video-games-concept-art-wallpaper-preview.jpg"
              alt="Wallpaper Three"
            />
          </div>
        </div>
        <br />
        <p className="mini-title">This is the place where you can:</p>
        <br />
        <ul>
          <li>• See Games</li>
          <li>• Create Your Own Profile</li>
          <li>• See What Games Are Good At The Minute</li>
          <li>• Create Your Own Game Post</li>
          <li>• Create Your Own Game Review</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}
