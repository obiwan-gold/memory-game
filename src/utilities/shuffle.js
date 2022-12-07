const shuffle = () => {
  // Assets array 8 objects
  const assets = [
    { image: "/assets/opman.jpg" },
    { image: "/assets/zoro.jpg" },
    { image: "/assets/regression.png" },
    { image: "/assets/red_riot.jpg" },
    { image: "/assets/naruto.jpg" },
    { image: "/assets/mthua.jpg" },
    { image: "/assets/monster.jpg" },
    { image: "/assets/mieruko.jpg" },
  ];
  // Game needs 16 so spread syntax to create 2 arrays
  return (
    [...assets, ...assets]
      // Shuffle randomly for array of obj
      .sort(() => Math.random() - 0.5)
      // React will use the id as a key
      .map((card) => ({ ...card, id: Math.random() }))
  );
};

export default shuffle;
