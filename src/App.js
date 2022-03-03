import { useEffect, useState } from "react";
import "./App.css";
import Line from "./Line";

function App() {
  const [elements, setElements] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [generateButton, setGenerateButton] = useState(false);
  const [lastChangedIndex, setLastChangedIndex] = useState(null);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 600px)").matches
  );
  let [numberOfLines, setNumberOfLines] = useState(50);

  useEffect(() => {
    window
      .matchMedia("(min-width: 600px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    if (matches) {
      setNumberOfLines(50);
    } else {
      setNumberOfLines(25);
    }
  }, [matches]);

  const generateRandomArray = () => {
    setLastChangedIndex(null);
    let arr = [];
    for (let i = 0; i < numberOfLines; i++) {
      arr[i] = Math.floor((Math.random() * 100) % 25);
    }
    setElements(arr);
    setDisabled(false);
  };

  const sleep = (seconds) => {
    const waitUntil = new Date().getTime() + seconds * 1000;
    while (new Date().getTime() < waitUntil) {
      // do nothing
    }
  };

  const bubbleSortArray = () => {
    setDisabled(true);
    setGenerateButton(true);
    let copy = elements;
    for (let i = 0; i < copy.length - 1; i++) {
      for (let j = 0; j < copy.length - 1 - i; j++) {
        setTimeout(() => {
          if (copy[j] > copy[j + 1]) {
            let temp = copy[j];
            copy[j] = copy[j + 1];
            copy[j + 1] = temp;
            setLastChangedIndex(j + 1);
            setElements([...copy]);
          }
          sleep(0.01);
          if (i === numberOfLines - 2) {
            setDisabled(false);
            setGenerateButton(false);
          }
        }, 500);
      }
      setLastChangedIndex(null);
    }
    setElements([...copy]);
  };

  const insertionSortArray = () => {
    setDisabled(true);
    setGenerateButton(true);
    let copy = elements;
    for (let i = 1; i < copy.length; i++) {
      setTimeout(() => {
        let key = copy[i];
        let j = i - 1;

        while (j >= 0 && copy[j] > key) {
          copy[j + 1] = copy[j];
          setLastChangedIndex(j + 1);
          j--;
          setElements([...copy]);
        }
        copy[j + 1] = key;
        setLastChangedIndex(j + 1);
        setElements([...copy]);
        sleep(0.2);
        if (i === numberOfLines - 1) {
          setDisabled(false);
          setGenerateButton(false);
        }
      }, 500);
    }
    setLastChangedIndex(null);
    setElements([...copy]);
  };

  const selectionSortArray = async () => {
    setDisabled(true);
    setGenerateButton(true);
    let copy = elements;
    for (let i = 0; i < copy.length - 1; i++) {
      setTimeout(() => {
        let min = i;
        for (let j = i + 1; j < copy.length; j++) {
          if (copy[j] < copy[min]) min = j;
        }

        let temp = copy[min];
        copy[min] = copy[i];
        copy[i] = temp;
        setLastChangedIndex(i);
        setElements([...copy]);
        sleep(0.2);
        if (i === numberOfLines - 2) {
          setDisabled(false);
          setGenerateButton(false);
        }
      }, 500);
    }
    setLastChangedIndex(null);
    setElements([...copy]);
  };

  return (
    <div className="app">
      <header className="app_header">
        <button disabled={generateButton} onClick={generateRandomArray}>
          Generate Random Array
        </button>
        <button disabled={disabled} onClick={bubbleSortArray}>
          Bubble Sort
        </button>
        <button disabled={disabled} onClick={insertionSortArray}>
          Insertion Sort
        </button>
        <button disabled={disabled} onClick={selectionSortArray}>
          Selection Sort
        </button>
        {/* <button >Merge Sort</button>
        <button >Quick Sort</button> */}
      </header>
      <div className="app_body">
        {elements.length === 0 ? (
          <h3 className="app_body--placeholder">
            Welcome to Sorting Visualizer{" "}
            {matches ? "" : "(Please view in computer for better experience)"}
          </h3>
        ) : (
          elements.map((a, index) => {
            return (
              <Line
                key={index}
                height={a * 20}
                number={a}
                color={lastChangedIndex === index ? "green" : "#66374e"}
              />
            );
          })
        )}
      </div>
      <footer className="app_footer">
        <h3>Aravindh A E</h3>
      </footer>
    </div>
  );
}

export default App;
