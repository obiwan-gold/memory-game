import { useState, useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import shuffle from "./utilities/shuffle";
import useAppBadge from "./hooks/useAppBadge";

function App() {
  // Cards to show in the UI
  // State first called when intialized
  const [cards, setCards] = useState(shuffle); // Cards array from assets
  const [pickOne, setPickOne] = useState(null); // First selection
  const [pickTwo, setPickTwo] = useState(null); // Second selection
  const [disabled, setDisabled] = useState(false); // Delay handler
  const [wins, setWins] = useState(0); // Win streak
  const [setBadge, clearBadge] = useAppBadge();

  // Game Logic
  const handleClick = (card) => {
    // On Click, check if clicking is disabled
    if (!disabled) {
      // To figure out which one to pick, see if its already been set
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  // Succession of two clicks as a turn
  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check if the cards are the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    // Tear down to clear the time out so no conflicting times out between renders
    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo]);

  // On the condition, the player has found all the matching pairs
  useEffect(() => {
    // Filter out all the cards that have not been matched
    const checkWin = cards.filter((card) => !card.matched);

    if (cards.length && checkWin.length < 1) {
      console.log("A win is a win");
      setWins(wins + 1);
      handleTurn();
      setBadge();
      setCards(shuffle);
    }
  }, [cards, wins, setBadge]);

  const handleNewGame = () => {
    clearBadge();
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
      <div className="grid">
        {/* Loop over array */}
        {cards.map((card) => {
          const { image, id, matched } = card;
          return (
            <Card
              key={id}
              card={card}
              image={image}
              onClick={() => handleClick(card)}
              // L33: When two are selected, check if they match and if match, set matched to true.
              selected={card === pickOne || card === pickTwo || matched}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
