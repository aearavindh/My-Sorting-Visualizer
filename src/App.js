import { useState } from 'react';
import './App.css';
import Line from './Line';

function App() {
  const [elements, setElements] = useState([]);
  const [lastChangedIndex, setLastChangedIndex] = useState(null);

  const generateRandomArray = () => {
    setLastChangedIndex(null);
    let arr = [];
    for (let i=0;i<50;i++){
      arr[i] = Math.floor(Math.random() * 100 %25);
    }
    setElements(arr);
  }

  const bubbleSortArray = () => {
    let copy = elements;
    for(let i=0;i<copy.length-1;i++){
      for(let j=0;j<copy.length-1-i;j++){
          setTimeout(() => {
            if(copy[j]>copy[j+1]){
              let temp = copy[j];
              copy[j] = copy[j+1];
              copy[j+1] = temp;
              setLastChangedIndex(j+1);
              setElements([...copy]);
            }
          }, 2000);
      }
      setLastChangedIndex(null);
    }
    setElements([...copy]);
  }

  const insertionSortArray = () => {
    let copy = elements;
    for(let i=1;i<copy.length;i++) {
      setTimeout(() => {
        let key = copy[i];
        let j = i-1;

        while(j>=0 && copy[j]>key) {
          copy[j+1] = copy[j];
          setLastChangedIndex(j+1);
          j--;
          setElements([...copy]);
        }
        copy[j+1] = key;
        setLastChangedIndex(j+1);
        setElements([...copy]);
      }, 2000);
    }
    setLastChangedIndex(null);
    setElements([...copy]);
  }

  const selectionSortArray = () => {
    let copy = elements;
    for(let i=0;i<copy.length-1;i++) {
      setTimeout(() => {
        let min = i;
        for(let j=i+1;j<copy.length;j++) {
          if(copy[j]<copy[min])
            min = j;
        }

        let temp = copy[min];
        copy[min] = copy[i];
        copy[i] = temp;
        setLastChangedIndex(i);
        setElements([...copy]);
      }, 2000);
    }
    setLastChangedIndex(null);
    setElements([...copy]);
  }

  return (
    <div className="app">
      <header className="app_header">
        <button onClick={generateRandomArray}>Generate Random Array</button>
        <button onClick={bubbleSortArray}>Bubble Sort</button>
        <button onClick={insertionSortArray}>Insertion Sort</button>
        <button onClick={selectionSortArray}>Selection Sort</button>
        <button >Merge Sort</button>
        <button >Quick Sort</button>
      </header>
      <body className="app_body">
        {elements.length===0?<h1>Welcome to Sorting Visualizer</h1>:elements.map((a, index) => {
          return <Line key={index} height={a*20} number={a} color={lastChangedIndex===index? 'green': 'brown'} />;
        })}
      </body>
      <footer className="app_footer">
        <h6>aea</h6>
      </footer>
    </div>
  );
}

export default App;
