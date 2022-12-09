const Icons = [
  "https://www.tvinsider.com/wp-content/uploads/2019/12/ss-Rupaul--scaled.jpg",
  "https://i.pinimg.com/736x/73/7c/37/737c3789cf5e25dcc250f16f44f2e626.jpg",
  "https://i.kym-cdn.com/entries/icons/facebook/000/029/729/nicki.jpg",
  "https://static.onecms.io/wp-content/uploads/sites/6/2015/11/nicki-minaj-2.jpg",
  "https://www.billboard.com/wp-content/uploads/2021/01/9-To-5-Dolly-Parton-billboard-1548-1609948296.jpg",
  "https://pbs.twimg.com/media/DqPweynWkAAr--d.jpg",
  "https://i.kym-cdn.com/entries/icons/original/000/026/667/momocens.jpg",
  "https://warwickboar.shorthandstories.com/our-10-favourite-gay-icons/assets/M30Jq3A4au/maxresdefault-1-1280x720.jpeg",
  "https://media.them.us/photos/5b9a9caca79bd90011762389/3:2/w_1620,h_1080,c_limit/TH_OneOffs_S02_E068_TrixieMattel_LGBTQuiz_091218_Video_Still_08.png",
  "https://britishlgbtawards.com/wp-content/uploads/2019/01/Dolly-parton-6892-500x500.jpg",
  "https://www.thefamouspeople.com/profiles/images/katya-zamolodchikova-1.jpg",
  "https://dramaqueennyc.files.wordpress.com/2015/07/alaska-5000.jpg?w=640",
  "https://deadline.com/wp-content/uploads/2022/08/Screen-Shot-2022-08-03-at-2.05.32-PM.png?w=681&h=383&crop=1",
  "https://www.thelist.com/img/gallery/how-victoria-porkchop-parker-left-a-lasting-impact-on-rupauls-drag-race/l-intro-1652828470.jpg",
  "https://i.ytimg.com/vi/9CjlRIfpx1U/maxresdefault.jpg",
  "https://thumb.spokesman.com/jaUk8KfOafH-K0bLGfQkxC66Vac=/1200x800/smart/media.spokesman.com/photos/2020/06/26/Bob_the_Drag_Queen_cropped.jpg",
  "https://i0.wp.com/i76.photobucket.com/albums/j11/NotPatrick/5th%20Anniversary/New%20Picture%2028_zpsasxqioa5.png",
  "https://dazedimg-dazedgroup.netdna-ssl.com/900/azure/dazed-prod/1280/3/1283985.jpg",
  "https://64.media.tumblr.com/67a9ebb5f8a3697b3b04c9ec7f9fca85/tumblr_inline_p7gkcqmIPf1robswo_500.png",
];

const generateBall = () => {
  const ball = {
    size: Math.floor(Math.random() * 350),
    color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`,
    opacity: Math.random() * 0.4,
    bottom: Math.floor(Math.random() * 1000),
    left: Math.floor(Math.random() * 1000),
    top: Math.floor(Math.random() * 1000),
    right: Math.floor(Math.random() * 1000),
    x: [
      Math.floor(Math.random() * (100 - -100 + 1) + -100),
      Math.floor(Math.random() * (300 - -300 + 1) + -300),
      Math.floor(Math.random() * (500 - -500 + 1) + -500),
      Math.floor(Math.random() * (700 - -700 + 1) + -700),
    ],
    y: [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * -200),
      Math.floor(Math.random() * 300),
      Math.floor(Math.random() * -400),
    ],
    duration: Math.floor(Math.random() * (30 - 20 + 1) + 20),
  };
  return ball;
};

const Balls = [];

for (let i = 0; i < 50; i++) {
  Balls.push(generateBall());
}

export { Icons, Balls };
