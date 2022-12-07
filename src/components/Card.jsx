const Card = ({ image, selected, onClick }) => {
  return (
    // UI where card has selected class ONLY when selected is truthy
    <div className="card">
      <div className={selected && "selected"}>
        <img src={image} alt="" className="card-face" />

        <img
          src={"/assets/doge.jpg"}
          className="card-back"
          onClick={onClick}
          alt=""
        />
      </div>
    </div>
  );
};

export default Card;
