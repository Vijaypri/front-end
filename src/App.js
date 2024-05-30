import React from 'react';
import  questions  from './questions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      userAnswers: [],
      totalRuns: 0,
      averageScore: 0,
    };
  }

  handleAnswer = (isYes) => {
    this.setState(
      (prevState) => ({
        userAnswers: [...prevState.userAnswers, isYes],
      }),
      () => {
        const nextIndex = this.state.currentQuestionIndex + 1;
        if (nextIndex === questions.length) {
          this.calculateScore(this.state.userAnswers);
          this.setState({ currentQuestionIndex: 0, userAnswers: [] });
          this.setState({ totalRuns: this.state.totalRuns + 1 });
        } else {
          this.setState({ currentQuestionIndex: nextIndex });
        }
      }
    );
  };

  calculateScore = (answers) => {
    const yesCount = answers.filter((answer) => answer).length;
    const score = Math.round((yesCount / questions.length) * 100);
    console.log(`Your score for this run is: ${score}`); // Update this line for UI display
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.totalRuns !== this.state.totalRuns) {
      const allAnswers = [];
      for (let i = 0; i < this.state.totalRuns; i++) {
        // Simulate loading answers from storage (replace with actual logic)
        const runAnswers = [true, false, true]; // Replace with actual data fetching
        allAnswers.push(...runAnswers);
      }
      const totalYes = allAnswers.filter((answer) => answer).length;
      const overallAverage = Math.round((totalYes / (questions.length * this.state.totalRuns)) * 100);
      this.setState({ averageScore: overallAverage });
    }
  }

  render() {
    const currentQuestion = questions[this.state.currentQuestionIndex];

    return (
      <div>
        {currentQuestion ? (
          <>
            <h2>{currentQuestion.text}</h2>
            <button onClick={() => this.handleAnswer(true)}>Yes</button>
            <button onClick={() => this.handleAnswer(false)}>No</button>
          </>
        ) : (
          <>
            <h2>All Done!</h2>
            <p>Average Score across all runs: {this.state.averageScore}</p>
          </>
        )}
      </div>
    );
  }
}

export default App;

